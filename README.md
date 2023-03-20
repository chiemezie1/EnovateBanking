# EnovateBanking
Enovate Bank and Enovate Token Contracts

Overview:
Enovate Bank and Enovate Token are smart contracts built on the Ethereum blockchain. These contracts aim to provide a secure and decentralized banking system that allows users to access financial services without relying on traditional banking institutions.

Enovate Bank:
Enovate Bank is a smart contract that acts as a decentralized bank. It allows users to deposit and withdraw funds, earn interest on their deposits, and borrow funds against their deposited assets. The contract is secured by the Ethereum blockchain, ensuring transparency and immutability of all transactions.

Features of Enovate Bank:

Deposits: Users can deposit funds into their Enovate Bank account by calling the 'deposit' function in the contract. The deposited funds are converted into Enovate Tokens, which can be withdrawn or used to borrow funds.
Withdrawals: Users can withdraw their deposited funds by calling the 'withdraw' function in the contract. The withdrawn funds are converted back into the original currency and sent to the user's Ethereum wallet.
Interest: Users can earn interest on their deposited funds by calling the 'earnInterest' function in the contract. The interest rate is fixed and is calculated based on the amount of Enovate Tokens deposited and the duration of the deposit.
Borrowing: Users can borrow funds against their deposited assets by calling the 'borrow' function in the contract. The borrowed funds are issued in Enovate Tokens and can be used for any purpose. The borrower is required to pay back the borrowed amount along with interest within a specified time period.
Enovate Token:
Enovate Token is a smart contract that acts as a decentralized currency. It is an ERC-20 token that can be used for payments, transfers, and as collateral for borrowing funds from Enovate Bank. The contract is secured by the Ethereum blockchain, ensuring transparency and immutability of all transactions.

Features of Enovate Token:

Minting: Enovate Tokens can be minted by users who have been granted the 'MINTER_ROLE' by the contract administrator. The minted tokens are added to the total supply of Enovate Tokens and can be used for any purpose.
Burning: Enovate Tokens can be burned by users who have been granted the 'BURNER_ROLE' by the contract administrator. The burned tokens are removed from the total supply of Enovate Tokens and cannot be used again.
Role-based access control: The contract administrator can grant




