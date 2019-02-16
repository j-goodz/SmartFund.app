pragma solidity ^0.4.24;
import './SafeMath.sol';

/** @title CryptoFundFactory dApp */
contract CryptoFundFactory {                                             // Declaration of Crypto Fund Factory Contract
    constructor() public {
        factoryOwner = msg.sender;                                     // Sets the deploying developer as contract owner 
    }

    using SafeMath for uint256;                                 // SafeMath library prevents overflow when working with uint                     
    address factoryOwner;                                           
    bool isStopped = false;                                
    uint public fundCount;                                    
    uint defaultOpenFee = 0.5;
    uint defaultCloseFee = 0.1;
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
        Allocation openAllocation [];
        Allocation closeAllocation [];
        FundState fundState;                                      
    }                                                          

    mapping(uint => Fund) public FundList;               


    // event AcceptSubmission (uint bountyId, uint submissionId);

    modifier verifyBountyOwner (uint _bountyId) { 
        require (msg.sender == BountyList[_bountyId].bountyPoster); _; 
    }
    


//FRONT END: 
    // wait/ timeout for funding
    // wait for confirmations
 

// FRONT END CALLS FACTORY:
    // 1 Generate new address & send transaction to initiate new FundContract
    /** @dev                        Creates a new BountyItem to which users can submit HunterSubmission solutions.
    *   @param _title               Title of a new BountyItem.
    *   @return boolean             Returns true if function is executes successfully.
    */
    function updateFundOwner() public  returns (bool) {
    }

//FRONT END: 
    // set fund open date
    // set fund allocation
    // set seedFunder 


//FRONT END CALLS FACTORY: 
    // send seed funds to new FoundAccount
    /** @dev                        Creates a new BountyItem to which users can submit HunterSubmission solutions.
    *   @param _title               Title of a new BountyItem.
    *   @return boolean             Returns true if function is executes successfully.
    */
    function updateFundOwner() public  returns (bool) {
    }

    /// @dev                        Fallback function, which accepts ether when sent to contract.
    function() public payable {}


}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////
// child / FundAccount
// set openAllocation
// set seedFunder
// accept funding
// close/liquidate
// - send split to partentseed funder (minus fees) * fund title
// - update parent data?

contract CryptoFund {                                             // Declaration of Crypto Fund Factory Contract
    constructor() public {
        parentContract = msg.sender;
        // openDateUnixTimestamp = openDateUnixTimes - how?
    }

    using SafeMath for uint256;                                 // SafeMath library prevents overflow when working with uint                     
    string title; 
    address parentContract;
    address fundOwner;                                              // Specifies the owner address of the contract
    uint seedAmount;                                            // Reward Amount for submitting an accepted HunterSubmission. 
    uint openDateUnixTimestamp
    uint closeDateUnixTimestamp
    Allocation openAllocation []
    Allocation closeAllocation [] 
    uint openFee;
    uint closeFee;
    FoundState fundState;

    enum FoundState {Open, Closed}                             // Current state of a BountyItem.

    struct Allocation {                                   // Declaration of HunterSubmission struct type
        string ticker;                                            // Solution body of text.
        uint amount;                                         // Address of a Bounty Hunter.
    }

    /** @dev                        Creates a new BountyItem to which users can submit HunterSubmission solutions.
    *   @param _title               Title of a new BountyItem.
    *   @param _description         Description of a new BountyItem.
    *   @param _bountyAmount        Bounty award amount for a new BountyItem.
    *   @return boolean             Returns true if function is executes successfully.
    */
    function acceptInitialAllocation(string _title, string _description, uint _bountyAmount) public payable stoppedInEmergency() returns (bool) {
        bountyCount++;
        var newBountyItem = BountyItem(msg.sender, _title, _description, _bountyAmount, BountyState.Open, 0);
        BountyList[bountyCount] = newBountyItem;
        emit CreateBounty(bountyCount, msg.sender, _title, _description, _bountyAmount, BountyState.Open, 0);
        return true;
    }

    /** @dev                        Creates a new BountyItem to which users can submit HunterSubmission solutions.
    *   @param _title               Title of a new BountyItem.
    *   @return boolean             Returns true if function is executes successfully.
    */
    function updateFundOwner() public  returns (bool) {
    }

    /** @dev                        Creates a new BountyItem to which users can submit HunterSubmission solutions.
    *   @param _title               Title of a new BountyItem.
    *   @return boolean             Returns true if function is executes successfully.
    */
    function updateFundOwner() public returns (bool) {
    }


    /** @dev                        Creates a new BountyItem to which users can submit HunterSubmission solutions.
    *   @param _title               Title of a new BountyItem.
    *   @return boolean             Returns true if function is executes successfully.
    */
    function liquidateFund() public returns (bool) {
        //send fundOwner holdings - fees
        // send contractFactory remaining holdings
        // update parentData?
    }

    /// @dev                        Fallback function, which accepts ether when sent to contract.
    function() public payable {}

}   
