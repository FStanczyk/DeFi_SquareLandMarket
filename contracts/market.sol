// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../contracts/Land.sol";

contract Land is SquareLand{
    address immutable public owner;
    
    // Rows * Columns = how many square lands will be on the map
    uint256 constant public rows = 8;
    uint256 constant public columns = 12;

    constructor(uint256 _initialPrice) SquareLand(_initialPrice){
        owner = msg.sender;

        for (uint i = 0; i < rows; i++)
            for (uint j = 0; j < columns; j++)
                _mint(owner, i, j);
    }
}

contract SquareMarket{
    
    address immutable public owner;

    //Currency we will use ot buy/sell square lands
    ERC20 immutable public SMD;

    //Land we will buy/sell
    SquareLand immutable public LAND;

   
    uint256 constant public rows = 8;
    uint256 constant public columns = 12;


    constructor(address _tokenAddr, address _landAddress){
        SMD = ERC20(_tokenAddr);
        LAND = SquareLand(_landAddress);
        owner = msg.sender;
    }

    /**
     * @notice this function requires the market to beapproved to sell land and transfer token
     */
    function buy(uint x, uint y) public {
        uint256 price =(LAND).priceOf(x, y);
        require((SMD).balanceOf(msg.sender) >= price, "SquareMarket: insufficient balance");

        address _seller = (LAND).ownerOf(x, y);
        (LAND)._transferFrom(_seller, msg.sender, x, y);
        (SMD).transferFrom(msg.sender, _seller, price);
    }  


    /**
     * @notice this function does not require any approvals for the market
     */
    function _changePrice(uint x, uint y, uint _price) public {
        require((LAND).ownerOf(x, y) == msg.sender, "SquareMarket: not allowed");
        (LAND)._changePrice(x, y, _price);
    }




}
