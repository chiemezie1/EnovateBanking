// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract EnovateToken is ERC20, ERC20Burnable, AccessControl {
  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

  constructor() ERC20("EnovateToken", "E-novate") {
    _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    _setupRole(MINTER_ROLE, msg.sender);
  }

  function mint(address account, uint256 amount) public {
    require(hasRole(MINTER_ROLE, msg.sender), "Caller is not a minter");
    _mint(account, amount);
  }

  function burn(address account, uint256 amount) public {
    require(hasRole(MINTER_ROLE, msg.sender), "Caller is not a burner");
    _burn(account, amount);
  }
  
  function grantMinterRole(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
    grantRole(MINTER_ROLE, account);
  }

  function revokeMinterRole(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
    revokeRole(MINTER_ROLE, account);
  }
}
