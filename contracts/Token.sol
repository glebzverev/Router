// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC20{

    address public owner;

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC20(_name, _symbol) { 
        owner = msg.sender;
    }

    function mint(address buyer, uint256 buyerAmount) external{
        _mint(buyer, buyerAmount);
    }

    function burn(address burner, uint256 burnAmount) external{
        _burn(burner, burnAmount);
    }
}