pragma solidity ^0.4.19; //0.4.26commit //4.22
pragma experimental ABIEncoderV2;
import "./Oraclize.sol";
// import './SafeMath.sol';


// contract SmartFundFactory {
contract SmartFundFactory is usingOraclize {
    // constructor() {
    function SmartFundFactory() {
        factoryOwner = msg.sender;
        // smartFundCount = 0;
        tickerCount = 5;
        tickerList[1] = 'BTC';
        tickerList[2] = 'ETH';
        tickerList[3] = 'XRP';
        tickerList[4] = 'BCH';
        tickerList[5] = 'LTC';
        // tickerList[6] = 'USDT';
        // tickerList[7] = 'EOS';
        // tickerList[8] = 'BNB';
        // tickerList[9] = 'BSV';
        // tickerList[10] = 'XMR';
        // tickerList[11] = 'ADA';
        // tickerList[12] = 'XLM';
        // tickerList[13] = 'TRX';
        // tickerList[14] = 'HT';
        // tickerList[15] = 'DASH';
        // tickerList[16] = 'ETC';
        // tickerList[17] = 'XTZ';
        // tickerList[18] = 'MIOTA';
        // tickerList[19] = 'ATOM';
        // tickerList[20] = 'LINK';
    }

    // using SafeMath for uint256;
    address factoryOwner;
    mapping(uint => string) public tickerList;
    uint public tickerCount;
    mapping(uint => Fund) public smartFundContracts;
    uint public smartFundCount;
    uint public defaultOpenFee = 5;
    uint public defaultCloseFee = 1;
    enum FundState {Pending, Open, Closed}
    enum QueryStatus {Pending, Complete}

    event LogNewOraclizeQuery(uint fundId, uint tickerId, string description);


    event NewSmartFundAdded(
        uint indexed findId,
        address indexed funderAccount,
        string smartFundName,
        uint seedAmount,
        uint openDateUnixTimestamp,
        uint closeDateUnixTimestamp,
        uint assetCount,
        FundState fundState,
        uint openFee,
        uint closeFee
    );

    event SmartFundLiquidated(
        uint indexed findId,
        address indexed funderAccount,
        string smartFundName,
        uint seedAmount,
        string defaultFiat,
        uint openDateUnixTimestamp,
        uint closeDateUnixTimestamp,
        uint assetCount,
        FundState fundState,
        uint openFee,
        uint closeFee
    );

    event LiquidationAllocation(
        uint findId,
        uint tickerId,
        uint amount,
        uint ethPrice
    );

    event NewAllocation(
        uint fundId,
        uint tickerId,
        uint amount,
        uint percent,
        uint ethPrice,
        bytes32 queryId,
        QueryStatus queryStatus
    );

    struct Allocation {
        uint tickerId;
        uint amount;
        uint percent;
        uint ethPrice;
        bytes32 queryId;
        QueryStatus queryStatus;
    }

    struct Price {
        uint amount;
        uint decimals;
    }

    struct Fund {
        address funderAccount;
        string smartFundName;
        uint seedAmount;
        uint openDateUnixTimestamp;
        uint closeDateUnixTimestamp;
        uint assetCount;
        mapping (uint => Allocation) openAllocation;
        mapping (uint => Allocation) closeAllocation;
        FundState fundState;
        uint openFee;
        uint closeFee;
    }

    uint public tempCount;
    uint public allocationCount;

    function initNewSmartFund(string _smartFundName, uint256[2][] _allocations) external payable returns (bool) {
        // smartFundCount = smartFundCount + 1;
        // if (oraclize_getPrice("URL") > this.balance) {
        //     LogNewOraclizeQuery("Oraclize query was NOT sent, please add some ETH to cover for the query fee");
        //     revert();
        // }
        // require(_allocations.length > 0, "No allocations found");
        // check to make sure fiat and crypto tickes are in validaion list
        // require all allocation percents sum to 100
        // require tickerId <= ticker count
        // check that address(this).balance is >= msg.value

        smartFundCount++;
        Fund newFund;
        newFund.fundState = FundState.Pending;
        newFund.funderAccount = msg.sender;
        newFund.smartFundName = _smartFundName;
        newFund.seedAmount = msg.value;
        newFund.openDateUnixTimestamp = now;
        // newFund.closeDateUnixTimestamp = 0;
        newFund.openFee = defaultOpenFee;
        newFund.closeFee = defaultCloseFee;
        // newFund.assetCount = 0;
        newFund.assetCount = _allocations.length;

        smartFundContracts[smartFundCount] = newFund;

        for(uint i = 0 ; i <= _allocations.length-1 ; i++){
            uint newTickerId = _allocations[i][0];
            uint newPercent = _allocations[i][1];
            uint amount = 0;
            uint ethPrice = 0;

            tempCount= tempCount + _allocations[i][1];
            allocationCount++;

            bytes32 newQueryId;
            // newQueryId = oraclize_query(
            //     "URL",
            //     strConcat(
            //         "json(https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH",
            //         tickerList[newTickerId],
            //         ").RAW.ETH.",
            //         tickerList[newTickerId],
            //         ".PRICE"
            //     ),
            //     smartFundCount
            // );
            // LogNewOraclizeQuery(smartFundCount, newTickerId, "Oraclize query sent");

            var newAllocation = Allocation(newTickerId, amount, newPercent, ethPrice, newQueryId, QueryStatus.Pending);
            // smartFundContracts[smartFundCount].openAllocation[smartFundContracts[smartFundCount].assetCount] = newAllocation;
            smartFundContracts[smartFundCount].openAllocation[i+1] = newAllocation;
            emit NewAllocation(smartFundCount, newTickerId, amount, newPercent, ethPrice, newQueryId, QueryStatus.Pending);
        }

        return true;
    }

    function getOpenAllocation(uint _fundId, uint _allocationId) view returns(uint, uint, uint, uint, bytes32, QueryStatus) {
        return (
            smartFundContracts[_fundId].openAllocation[_allocationId].tickerId,
            smartFundContracts[_fundId].openAllocation[_allocationId].amount,
            smartFundContracts[_fundId].openAllocation[_allocationId].percent,
            smartFundContracts[_fundId].openAllocation[_allocationId].ethPrice,
            smartFundContracts[_fundId].openAllocation[_allocationId].queryId,
            smartFundContracts[_fundId].openAllocation[_allocationId].queryStatus
        );
    }

    // function __callback(bytes32 queryId, string resultString, uint _fundId) {
    //     if (msg.sender != oraclize_cbAddress()) revert();

    //     // // add more logic to manage close allocations

    //     // // find the smartFund allocation, then update allocation values
    //     // for (uint i = 1; i <= smartFundContracts[_fundId].assetCount; i++) {
    //     //     if (queryId == smartFundContracts[_fundId].openAllocation[i].queryId) {
    //     //         smartFundContracts[_fundId].openAllocation[i].ethPrice = parseInt(resultString);
    //     //         uint spendEth = smartFundContracts[_fundId].seedAmount * smartFundContracts[_fundId].openAllocation[i].percent;
    //     //         smartFundContracts[_fundId].openAllocation[i].amount = spendEth * smartFundContracts[_fundId].openAllocation[i].ethPrice;
    //     //     }
    //     // }

    //     // // check if all allocation calls are complete, if so set fund state to open
    //     // var fundOpened = true;
    //     // for (uint s = 1; s <= smartFundContracts[_fundId].assetCount; s++) {
    //     //     if (smartFundContracts[_fundId].openAllocation[s].queryStatus == QueryStatus.Complete) {
    //     //         if (s == smartFundContracts[_fundId].assetCount) {
    //     //             smartFundContracts[_fundId].fundState = FundState.Open;
    //     //         }
    //     //     } else {
    //     //         fundOpened = false;
    //     //     }
    //     // }
    //     // logNewSmartFund(_fundId);
    // }

    // function logNewSmartFund(uint _index) pure {
        // emit NewSmartFundAdded(
        //     _index,
        //     smartFundContracts[_index].funderAccount,
        //     smartFundContracts[_index].smartFundName,
        //     smartFundContracts[_index].seedAmount,
        //     smartFundContracts[_index].openDateUnixTimestamp,
        //     smartFundContracts[_index].closeDateUnixTimestamp,
        //     smartFundContracts[_index].assetCount,
        //     smartFundContracts[_index].fundState,
        //     smartFundContracts[_index].openFee,
        //     smartFundContracts[_index].closeFee
        // );

        // if (smartFundContracts[_index].assetCount >= 1){
        //     for(uint i=1 ; i <= smartFundContracts[_index].assetCount ; i++){
        //         // emit NewAllocation(
        //         //     _index,
        //         //     smartFundContracts[_index].openAllocation[i].tickerId,
        //         //     smartFundContracts[_index].openAllocation[i].amount,
        //         //     smartFundContracts[_index].openAllocation[i].ethPrice
        //         // );
        //     }
        // }

    // }
    // function logLiquidatedSmartFund(uint _index){
    //     // emit NewSmartFundAdded(
    //     //     _index,
    //     //     smartFundContracts[_index].funderAccount,
    //     //     smartFundContracts[_index].smartFundName,
    //     //     smartFundContracts[_index].seedAmount,
    //     //     smartFundContracts[_index].openDateUnixTimestamp,
    //     //     smartFundContracts[_index].closeDateUnixTimestamp,
    //     //     smartFundContracts[_index].assetCount,
    //     //     smartFundContracts[_index].fundState,
    //     //     smartFundContracts[_index].openFee,
    //     //     smartFundContracts[_index].closeFee
    //     // );

    //     // if (smartFundContracts[_index].assetCount >= 1){
    //     //     for(uint i=1 ; i <= smartFundContracts[_index].assetCount ; i++){
    //     //         emit NewAllocation(
    //     //             _index,
    //     //             smartFundContracts[_index].closeAllocation[i].ticker,
    //     //             smartFundContracts[_index].closeAllocation[i].amount,
    //     //             smartFundContracts[_index].closeAllocation[i].ethPrice
    //     //         );
    //     //     }
    //     // }
    // }

    // function closeSmartFund(uint _index) public returns(bool) {
    //     //verify msg.sender matches funderAccount of index
    //     // pass open and close allocation parameters to child contract
    //     // send fee to parent contract address on liquidation
    //     //send closing fees for child contrat to use for liquidation
    //     smartFundContracts[_index].closeDateUnixTimestamp = now;
    //     smartFundContracts[_index].fundState = FundState.Closed;

    //     return true;
    // //     // calculate fees to collect
    // //     // send this.balance to funderAccount minus fees
    // //     // send remaining fee balannce to parent contract
    // //     // - send split to partentseed funder (minus fees) * fund title?
    // }

    function() external payable { }
}


