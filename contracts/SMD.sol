// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SquareMarketDollar is ERC20 {

    address immutable public owner;


    constructor (uint _supply) ERC20("SMD", "SquareMarketDollar"){
        owner = msg.sender;
        _mint(owner, _supply);
    }


    function mint(uint _amount) external {
        require(msg.sender == owner, "SMD: Only owner");
        _mint(owner, _amount);
    }
}