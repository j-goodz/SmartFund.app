pragma solidity ^0.5.0;
// import './SafeMath.sol';

/** @title SmartFundFactory dApp */
contract SmartFundFactory {                                             // Declaration of Crypto Fund Factory Contract
    constructor() public {
        factoryOwner = msg.sender;                                     // Sets the deploying developer as contract owner 
    }

    address[] smartFunds;
    mapping(uint => Fund) public FundList;               
    
    function getSmartFunds() public view returns (address[] ) {
        return smartFunds;
    }

    // using SafeMath for uint256;                                                  
    address factoryOwner;                                           
    bool isStopped = false;                                
    uint public fundCount;                                    
    uint defaultOpenFee = 0.05;
    uint defaultCloseFee = 0.01;
    enum FoundState {Open, Closed}                           
    struct Allocation {                                   
        string ticker;                                         
        uint amount;                                       
    }
    struct Fund {                                         
        address funderAccount;                                  
        uint seedAmount;                                           
        uint openDateUnixTimestamp;
        uint closeDateUnixTimestamp;
        Allocation[] openAllocation;
        Allocation[] closeAllocation;
        FundState fundState;                                      
    }                                                          

    modifier verifyBountyOwner (uint _bountyId) { 
        require (msg.sender == BountyList[_bountyId].bountyPoster); _; 
    }

    function createSmartFund(
        string memory _smartFundName, 
        string memory _seedAmount,
        uint memory _openFee,
        uint _closeFee,
        address _fundOwner,
        Allocation _openAllocation,
        address _parentAddress
    ) public payable returns (string) {
        // isEnough modifier
        uint creationTimestamp = getDateTime();
        address newSmartFund = new SmartFund(
             _smartFundName, 
            _seedAmount,
            _openFee,
            _closeFee,
            _fundOwner,
            creationTimestamp,
            _openAllocation,
            _parentAddress
        );            
        smartFunds.push(newSmartFund);   
        return address(newSmartFund);
    }
    
    function getDateTime() public returns (uint256){
        return now;
    }


}

// child / FundAccount
// set openAllocation
// set seedFunder
// accept funding
// close/liquidate
// - send split to partentseed funder (minus fees) * fund title
// - update parent data?

contract SmartFund {                                            
    // constructor() public {
    //     // parentContract = this.address
    // }
    
    constructor(
        string _smartFundName, 
        string _seedAmount,
        uint _openFee,
        uint _closeFee,
        address _fundOwner,
        uint _timestamp,
        Allocation _openAllocation,
        string _parentAddress

    ) public {
        smartFundName = _smartFundName;
        seedAmount = _seedAmount;
        openFee = _openFee;
        closeFee = _closeFee;
        fundOwner = _fundOwner;
        openDateUnixTimestamp = _timestamp;
        openAllocation = _openAllocation;
        fundState = Open;
        parentContract = _parentAddress;// INSECURE
    }
    
    // using SafeMath for uint256;                                            
    string smartFundName; 
    address parentContract;
    address fundOwner;                        
    uint seedAmount;                                         
    uint openDateUnixTimestamp;
    uint closeDateUnixTimestamp;
    Allocation[] openAllocation;
    Allocation[] closeAllocation;
    uint openFee;
    uint closeFee;
    FoundState fundState;

    enum FoundState {Open, Closed}                       

    // struct Allocation {                                  
    //     string ticker;                                    
    //     uint amount;
    //     uint price;
    // }

    function acceptOpenAllocations(
    ) public payable stoppedInEmergency() returns (bool) {
        // get allocations and use oracle to confirm prices are accurate, return true if accurate
        return true;
    }

    function liquidateFund() public returns (bool) {
        //send fundOwner holdings - fees
        // send contractFactory remaining holdings
        // update parentData?
    }

    /// @dev                        
    function() public payable {}

}   
