// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title MilestoneEscrow
 * @dev Milestone-based escrow for contract payments
 * Releases funds only when milestones are completed
 */
contract MilestoneEscrow {
    enum MilestoneStatus { PENDING, COMPLETED, DISPUTED }

    struct Milestone {
        string description;
        uint256 amount;
        MilestoneStatus status;
        uint256 completedAt;
    }

    address public client;
    address public contractor;
    uint256 public totalAmount;
    uint256 public releasedAmount;
    bool public isActive;

    Milestone[] public milestones;

    event FundsDeposited(address indexed depositor, uint256 amount, uint256 timestamp);
    event MilestoneCompleted(uint256 indexed milestoneId, uint256 amount, uint256 timestamp);
    event FundsReleased(address indexed recipient, uint256 amount, uint256 timestamp);
    event DisputeRaised(uint256 indexed milestoneId, uint256 timestamp);
    event EscrowCancelled(uint256 refundAmount, uint256 timestamp);

    modifier onlyClient() {
        require(msg.sender == client, "Only client can call this");
        _;
    }

    modifier onlyContractor() {
        require(msg.sender == contractor, "Only contractor can call this");
        _;
    }

    modifier onlyActive() {
        require(isActive, "Escrow is not active");
        _;
    }

    /**
     * @dev Constructor to initialize escrow
     */
    constructor(
        address _contractor,
        string[] memory _milestoneDescriptions,
        uint256[] memory _milestoneAmounts
    ) payable {
        require(_contractor != address(0), "Invalid contractor address");
        require(
            _milestoneDescriptions.length == _milestoneAmounts.length,
            "Milestone arrays length mismatch"
        );
        require(_milestoneDescriptions.length > 0, "At least one milestone required");

        client = msg.sender;
        contractor = _contractor;
        isActive = true;

        uint256 total = 0;
        for (uint i = 0; i < _milestoneDescriptions.length; i++) {
            require(_milestoneAmounts[i] > 0, "Milestone amount must be > 0");
            milestones.push(Milestone({
                description: _milestoneDescriptions[i],
                amount: _milestoneAmounts[i],
                status: MilestoneStatus.PENDING,
                completedAt: 0
            }));
            total += _milestoneAmounts[i];
        }

        totalAmount = total;
        require(msg.value >= totalAmount, "Insufficient funds deposited");

        emit FundsDeposited(msg.sender, msg.value, block.timestamp);
    }

    /**
     * @dev Client marks milestone as completed and releases funds
     */
    function completeMilestone(uint256 _milestoneId) external onlyClient onlyActive {
        require(_milestoneId < milestones.length, "Invalid milestone ID");
        Milestone storage milestone = milestones[_milestoneId];
        require(milestone.status == MilestoneStatus.PENDING, "Milestone not pending");

        milestone.status = MilestoneStatus.COMPLETED;
        milestone.completedAt = block.timestamp;

        uint256 amount = milestone.amount;
        releasedAmount += amount;

        // Transfer funds to contractor
        payable(contractor).transfer(amount);

        emit MilestoneCompleted(_milestoneId, amount, block.timestamp);
        emit FundsReleased(contractor, amount, block.timestamp);

        // Deactivate if all milestones completed
        if (releasedAmount >= totalAmount) {
            isActive = false;
        }
    }

    /**
     * @dev Contractor raises dispute on milestone
     */
    function raiseDispute(uint256 _milestoneId) external onlyContractor onlyActive {
        require(_milestoneId < milestones.length, "Invalid milestone ID");
        Milestone storage milestone = milestones[_milestoneId];
        require(milestone.status == MilestoneStatus.PENDING, "Milestone not pending");

        milestone.status = MilestoneStatus.DISPUTED;
        emit DisputeRaised(_milestoneId, block.timestamp);
    }

    /**
     * @dev Get milestone details
     */
    function getMilestone(uint256 _milestoneId) external view returns (
        string memory description,
        uint256 amount,
        MilestoneStatus status,
        uint256 completedAt
    ) {
        require(_milestoneId < milestones.length, "Invalid milestone ID");
        Milestone storage milestone = milestones[_milestoneId];
        return (
            milestone.description,
            milestone.amount,
            milestone.status,
            milestone.completedAt
        );
    }

    /**
     * @dev Get total milestones
     */
    function getTotalMilestones() external view returns (uint256) {
        return milestones.length;
    }

    /**
     * @dev Get remaining balance in escrow
     */
    function getRemainingBalance() external view returns (uint256) {
        return address(this).balance;
    }

    /**
     * @dev Cancel escrow and refund remaining funds to client (emergency)
     */
    function cancelEscrow() external onlyClient onlyActive {
        uint256 remaining = address(this).balance;
        isActive = false;
        
        if (remaining > 0) {
            payable(client).transfer(remaining);
        }

        emit EscrowCancelled(remaining, block.timestamp);
    }

    /**
     * @dev Fallback to receive additional funds
     */
    receive() external payable {
        emit FundsDeposited(msg.sender, msg.value, block.timestamp);
    }
}
