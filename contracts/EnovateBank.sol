// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.9;

import "./EnovateToken.sol";

contract EnovateBank {
    address private owner;
    EnovateToken private enovateToken;

    mapping(address => uint) public depositStart;
    mapping(address => uint) public TotalInterest;
    mapping(address => uint) public etherBalanceOf;
    mapping(address => uint) public collateralEther;
    mapping(address => uint) public totalDeposit;
    mapping(address => uint) public totalTokensMinted;

    mapping(address => bool) public isDeposited;
    mapping(address => bool) public isBorrowed;

    event Deposit(address indexed user, uint etherAmount, uint timeStart);
    event Withdraw(address indexed user, uint etherAmount);
    event Borrow(address indexed user, uint collateralEtherAmount, uint borrowedTokenAmount);
    event PayOff(address indexed user, uint fee);
    event TokenBurn(address indexed user, uint tokenAmount);

     address[] depositors;


    modifier onlyOwner() {
        require(msg.sender == owner, "Error: Caller is not the owner of the contract.");
        _;
    }

    constructor(EnovateToken _enovateToken) {
        owner = msg.sender;
        enovateToken = _enovateToken;
    }


    function depositETH() payable public {
        require(msg.value > 0, 'Error, invalid amount');
        uint256 depositAmount = msg.value;
        if (isDeposited[msg.sender] == true){
            CalculateInterest(msg.sender);
        } 
        etherBalanceOf[msg.sender] += depositAmount;
        depositStart[msg.sender] = block.timestamp;
        totalDeposit[msg.sender] += depositAmount;
        isDeposited[msg.sender] = true; //activate deposit status
        depositors.push(msg.sender);
        emit Deposit(msg.sender, depositAmount, block.timestamp);
    }

    function CalculateInterest(address userAdd) internal {
        uint256 INTEREST_RATE = 10; // 10% annual interest rate
        uint256 DECIMALS = 10 ** 18; // ETH has 18 decimals
        uint256 currentDeposit = etherBalanceOf[userAdd];
        
        require (etherBalanceOf[userAdd] != 0, "no valid deposit yet");

        uint256 periodOfDeposite = block.timestamp - depositStart[userAdd];
       // uint256 interest = currentDeposit * INTEREST_RATE * periodOfDeposite / (365 days * DECIMALS);
        uint256 interest = currentDeposit * INTEREST_RATE * periodOfDeposite / (1 days * DECIMALS); // daliy 

        TotalInterest[userAdd] += interest;

         if (etherBalanceOf[msg.sender] < 0){
            depositStart[msg.sender] = 0;
        } else{
            depositStart[msg.sender] = block.timestamp;
        }
    }


    function withdrawETH(uint256 _amount) public {
        require(isDeposited[msg.sender] == true, 'Error: no previous deposit');
        require(etherBalanceOf[msg.sender] >= _amount, 'Error: invalide amount');
        CalculateInterest(msg.sender);
        etherBalanceOf[msg.sender] = etherBalanceOf[msg.sender] - _amount;

        if (etherBalanceOf[msg.sender] <= 0){
            isDeposited[msg.sender] = false; //reset deposit status
        }
        address payable recipient = payable(msg.sender);
        recipient.transfer(_amount);

        emit Withdraw(msg.sender, _amount);
    }

    function borrow(uint _collateralEtherAmount) public payable {
        require(msg.sender != address(0) && msg.value > 0, 'Error: invalid address, amount, or value sent');
        require(isBorrowed[msg.sender] == false, 'Error: loan already active');
        uint tokensToMint = _collateralEtherAmount; //Mint the same value as the collateral
        enovateToken.mint(msg.sender, tokensToMint);
        collateralEther[msg.sender] = _collateralEtherAmount;
        isBorrowed[msg.sender] = true;
        totalTokensMinted[msg.sender] += tokensToMint;

        emit Borrow(msg.sender, _collateralEtherAmount, tokensToMint);
    }

    function payoffToken() public payable {
        require(isBorrowed[msg.sender], 'Error: no active loan');
        uint fee = collateralEther[msg.sender] * 90 / 100; //takes a service fee of 10%
        uint tokensToBurn = totalTokensMinted[msg.sender] * 95 / 100; // 95% Burn of minted tokens, the custome is gifted 5% token
        
        enovateToken.burn(msg.sender, tokensToBurn);
        totalTokensMinted[msg.sender] -= tokensToBurn;
        payable(msg.sender).transfer(collateralEther[msg.sender] - fee);
        collateralEther[msg.sender] = 0;
        isBorrowed[msg.sender] = false;

        emit PayOff(msg.sender, fee);
        emit TokenBurn(msg.sender, tokensToBurn);
    }

    function getETHBalanceOf(address userAdd) public view returns (uint256) {
        return etherBalanceOf[userAdd];
    }

    function getTotalInterest(address userAdd) public view returns (uint256) {
        return TotalInterest[userAdd];
    }
     function getEnovateToken(address Useradd) public view returns (uint) {
        return enovateToken.balanceOf(Useradd);
    }
  
    function getContractEtherBalance() public view returns (uint256) {
      return address(this).balance;
    }

    function getAddresses() public view returns (address[] memory) {
        return depositors;
    }


}