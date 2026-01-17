// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title ContractRegistry
 * @dev Immutable registry for contract hashes and signers
 * Stores document hashes, signer addresses, and status
 */
contract ContractRegistry {
    enum Status { PENDING, SIGNED, EXECUTED, TERMINATED }

    struct ContractRecord {
        string contractId;
        bytes32 documentHash;
        address[] signers;
        Status status;
        uint256 timestamp;
        string ipfsHash; // For storing full document on IPFS
    }

    mapping(string => ContractRecord) public contracts;
    mapping(bytes32 => bool) public hashExists;
    string[] public contractIds;

    event ContractRegistered(
        string indexed contractId,
        bytes32 documentHash,
        address[] signers,
        uint256 timestamp
    );

    event ContractStatusUpdated(
        string indexed contractId,
        Status newStatus,
        uint256 timestamp
    );

    event SignerAdded(
        string indexed contractId,
        address signer,
        uint256 timestamp
    );

    /**
     * @dev Register a new contract with hash and signers
     */
    function registerContract(
        string memory _contractId,
        bytes32 _documentHash,
        address[] memory _signers,
        string memory _ipfsHash
    ) external {
        require(
            contracts[_contractId].timestamp == 0,
            "Contract ID already exists"
        );
        require(_signers.length > 0, "At least one signer required");
        require(!hashExists[_documentHash], "Document hash already registered");

        contracts[_contractId] = ContractRecord({
            contractId: _contractId,
            documentHash: _documentHash,
            signers: _signers,
            status: Status.PENDING,
            timestamp: block.timestamp,
            ipfsHash: _ipfsHash
        });

        hashExists[_documentHash] = true;
        contractIds.push(_contractId);

        emit ContractRegistered(_contractId, _documentHash, _signers, block.timestamp);
    }

    /**
     * @dev Update contract status (only by signers)
     */
    function updateStatus(string memory _contractId, Status _newStatus) external {
        ContractRecord storage record = contracts[_contractId];
        require(record.timestamp != 0, "Contract does not exist");
        require(isSigner(_contractId, msg.sender), "Not authorized");

        record.status = _newStatus;
        emit ContractStatusUpdated(_contractId, _newStatus, block.timestamp);
    }

    /**
     * @dev Add additional signer
     */
    function addSigner(string memory _contractId, address _newSigner) external {
        ContractRecord storage record = contracts[_contractId];
        require(record.timestamp != 0, "Contract does not exist");
        require(isSigner(_contractId, msg.sender), "Not authorized");

        record.signers.push(_newSigner);
        emit SignerAdded(_contractId, _newSigner, block.timestamp);
    }

    /**
     * @dev Check if address is a signer
     */
    function isSigner(string memory _contractId, address _address) public view returns (bool) {
        ContractRecord storage record = contracts[_contractId];
        for (uint i = 0; i < record.signers.length; i++) {
            if (record.signers[i] == _address) {
                return true;
            }
        }
        return false;
    }

    /**
     * @dev Verify document hash matches registered hash
     */
    function verifyHash(string memory _contractId, bytes32 _documentHash) external view returns (bool) {
        return contracts[_contractId].documentHash == _documentHash;
    }

    /**
     * @dev Get contract details
     */
    function getContract(string memory _contractId) external view returns (
        string memory contractId,
        bytes32 documentHash,
        address[] memory signers,
        Status status,
        uint256 timestamp,
        string memory ipfsHash
    ) {
        ContractRecord storage record = contracts[_contractId];
        return (
            record.contractId,
            record.documentHash,
            record.signers,
            record.status,
            record.timestamp,
            record.ipfsHash
        );
    }

    /**
     * @dev Get total registered contracts
     */
    function getTotalContracts() external view returns (uint256) {
        return contractIds.length;
    }
}
