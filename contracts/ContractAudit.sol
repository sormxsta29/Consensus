// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title ContractAudit
 * @dev Immutable audit trail for contract versions, approvals, and signatures
 * Theme 3: Blockchain Integration - Trust and Auditability
 */
contract ContractAudit {
    struct ContractVersion {
        uint256 versionNumber;
        bytes32 contentHash;
        address creator;
        uint256 timestamp;
        string metadata; // JSON with additional info
        bool finalized;
    }

    struct Approval {
        address approver;
        string role; // "Reviewer", "Approver", "Signer"
        uint256 timestamp;
        bytes32 versionHash;
        string comment;
        bytes signature; // Optional: ECDSA signature
    }

    struct AuditEvent {
        string eventType; // "created", "modified", "approved", "rejected", "finalized"
        address actor;
        uint256 timestamp;
        bytes32 versionHash;
        string details;
    }

    // contractId => version => ContractVersion
    mapping(string => mapping(uint256 => ContractVersion)) public contractVersions;
    
    // contractId => version => approvals
    mapping(string => mapping(uint256 => Approval[])) public versionApprovals;
    
    // contractId => audit events
    mapping(string => AuditEvent[]) public auditTrail;
    
    // contractId => latest version number
    mapping(string => uint256) public latestVersion;
    
    // contractId => finalized version
    mapping(string => uint256) public finalizedVersion;
    
    // Hash => exists (for public verification)
    mapping(bytes32 => bool) public hashExists;
    
    // Hash => contractId (for reverse lookup)
    mapping(bytes32 => string) public hashToContract;

    event VersionCreated(
        string indexed contractId,
        uint256 indexed versionNumber,
        bytes32 contentHash,
        address creator,
        uint256 timestamp
    );

    event ApprovalRecorded(
        string indexed contractId,
        uint256 indexed versionNumber,
        address approver,
        string role,
        uint256 timestamp
    );

    event VersionFinalized(
        string indexed contractId,
        uint256 indexed versionNumber,
        bytes32 contentHash,
        uint256 timestamp
    );

    event AuditEventLogged(
        string indexed contractId,
        string eventType,
        address actor,
        uint256 timestamp
    );

    /**
     * @dev Create a new contract version with hash
     */
    function createVersion(
        string memory _contractId,
        bytes32 _contentHash,
        string memory _metadata
    ) public returns (uint256) {
        uint256 newVersion = latestVersion[_contractId] + 1;
        
        contractVersions[_contractId][newVersion] = ContractVersion({
            versionNumber: newVersion,
            contentHash: _contentHash,
            creator: msg.sender,
            timestamp: block.timestamp,
            metadata: _metadata,
            finalized: false
        });
        
        latestVersion[_contractId] = newVersion;
        hashExists[_contentHash] = true;
        hashToContract[_contentHash] = _contractId;
        
        // Log audit event
        _logAuditEvent(_contractId, "created", msg.sender, _contentHash, "New version created");
        
        emit VersionCreated(_contractId, newVersion, _contentHash, msg.sender, block.timestamp);
        
        return newVersion;
    }

    /**
     * @dev Record an approval for a contract version
     */
    function recordApproval(
        string memory _contractId,
        uint256 _versionNumber,
        string memory _role,
        string memory _comment,
        bytes memory _signature
    ) public {
        require(_versionNumber <= latestVersion[_contractId], "Version does not exist");
        require(!contractVersions[_contractId][_versionNumber].finalized, "Version already finalized");
        
        bytes32 versionHash = contractVersions[_contractId][_versionNumber].contentHash;
        
        Approval memory newApproval = Approval({
            approver: msg.sender,
            role: _role,
            timestamp: block.timestamp,
            versionHash: versionHash,
            comment: _comment,
            signature: _signature
        });
        
        versionApprovals[_contractId][_versionNumber].push(newApproval);
        
        // Log audit event
        string memory details = string(abi.encodePacked("Approved by ", _role));
        _logAuditEvent(_contractId, "approved", msg.sender, versionHash, details);
        
        emit ApprovalRecorded(_contractId, _versionNumber, msg.sender, _role, block.timestamp);
    }

    /**
     * @dev Finalize a contract version (immutable)
     */
    function finalizeVersion(
        string memory _contractId,
        uint256 _versionNumber
    ) public {
        require(_versionNumber <= latestVersion[_contractId], "Version does not exist");
        require(!contractVersions[_contractId][_versionNumber].finalized, "Already finalized");
        require(msg.sender == contractVersions[_contractId][_versionNumber].creator, "Only creator can finalize");
        
        contractVersions[_contractId][_versionNumber].finalized = true;
        finalizedVersion[_contractId] = _versionNumber;
        
        bytes32 versionHash = contractVersions[_contractId][_versionNumber].contentHash;
        
        // Log audit event
        _logAuditEvent(_contractId, "finalized", msg.sender, versionHash, "Version finalized");
        
        emit VersionFinalized(_contractId, _versionNumber, versionHash, block.timestamp);
    }

    /**
     * @dev Internal function to log audit events
     */
    function _logAuditEvent(
        string memory _contractId,
        string memory _eventType,
        address _actor,
        bytes32 _versionHash,
        string memory _details
    ) internal {
        AuditEvent memory newEvent = AuditEvent({
            eventType: _eventType,
            actor: _actor,
            timestamp: block.timestamp,
            versionHash: _versionHash,
            details: _details
        });
        
        auditTrail[_contractId].push(newEvent);
        
        emit AuditEventLogged(_contractId, _eventType, _actor, block.timestamp);
    }

    /**
     * @dev Verify a hash exists on-chain (public verification)
     */
    function verifyHash(bytes32 _hash) public view returns (bool exists, string memory contractId, uint256 timestamp) {
        if (hashExists[_hash]) {
            string memory cId = hashToContract[_hash];
            uint256 version = latestVersion[cId];
            
            // Find the version with this hash
            for (uint256 i = 1; i <= version; i++) {
                if (contractVersions[cId][i].contentHash == _hash) {
                    return (true, cId, contractVersions[cId][i].timestamp);
                }
            }
        }
        return (false, "", 0);
    }

    /**
     * @dev Get all approvals for a version
     */
    function getApprovals(string memory _contractId, uint256 _versionNumber) 
        public 
        view 
        returns (Approval[] memory) 
    {
        return versionApprovals[_contractId][_versionNumber];
    }

    /**
     * @dev Get audit trail for a contract
     */
    function getAuditTrail(string memory _contractId) 
        public 
        view 
        returns (AuditEvent[] memory) 
    {
        return auditTrail[_contractId];
    }

    /**
     * @dev Get version details
     */
    function getVersion(string memory _contractId, uint256 _versionNumber)
        public
        view
        returns (ContractVersion memory)
    {
        return contractVersions[_contractId][_versionNumber];
    }

    /**
     * @dev Get contract info
     */
    function getContractInfo(string memory _contractId)
        public
        view
        returns (uint256 latest, uint256 finalized, uint256 totalEvents)
    {
        return (
            latestVersion[_contractId],
            finalizedVersion[_contractId],
            auditTrail[_contractId].length
        );
    }
}
