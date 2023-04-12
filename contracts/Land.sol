// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract SquareLand{

    mapping(uint256=> mapping(uint256=>address)) public  _ownerOf;
    mapping(uint256=> mapping(uint256=>uint256)) public _priceOf;
    mapping(uint256=> mapping(uint256=>address)) public _approved;
    mapping(address=>uint256) public _balanceOf;
    uint256 immutable _defaultPrice; // default price while minting 

    constructor(uint256 _initPrice) {
        _defaultPrice = _initPrice;
    }

    function _exists(uint256 _x, uint256 _y) internal view returns (bool){
        return _ownerOf[_x][_y] != address(0);
    }

    function priceOf(uint256 _x, uint256 _y) public view returns(uint256){
        require(_exists(_x, _y), "SquareLand: This land does not exists");
        return _priceOf[_x][_y];
    }

    function ownerOf(uint256 _x, uint256 _y) public view returns (address){
        require(_exists(_x, _y), "SquareLand: This land does not exists");
        return _ownerOf[_x][_y];
    }


    function approved(uint256 _x, uint256 _y) public view returns (address){
        require(_exists(_x, _y), "SquareLand: This land does not exists");
        return _approved[_x][_y];
    }


    function _mint(address _to, uint256 _x, uint256 _y) virtual internal {
        require(!_exists(_x, _y), "SquareLand: This land already exists");
        require(_to != address(0), "SquareLand: incorrect address");

        _ownerOf[_x][_y] = _to;
        _priceOf[_x][_y] = _defaultPrice;
        _balanceOf[msg.sender] += 1; 
    }

    /**
     * this function is equal to Put on sale - basically gives permission to the 
     * market(or any other approved contract) to sell the land
     */
    function _approve(address _toApprove, uint256 _x, uint256 _y) virtual public {
        require(msg.sender == _ownerOf[_x][_y], "SquareLand: Not allowed");
        require(_approved[_x][_y] != _toApprove, "SquareLand: Already approved");

        _approved[_x][_y] = _toApprove;
    }

    /**
     * put off sale - market(or any other approved contract) will no longer be able to sell
     */
    function _desapprove(address _toDesapprove, uint256 _x, uint _y) virtual public {
        require(msg.sender == _ownerOf[_x][_y], "SquareLand: Not allowed");
        require(_approved[_x][_y] == _toDesapprove, "SquareLand: Already not approved");

        _approved[_x][_y] = address(0);
    }


    /**
     * I assume this function will be called by market(or any other approved contract)
     */
    function _transferFrom(address _from, address _to, uint256 _x, uint256 _y) virtual public {
        require(_approved[_x][_y] == msg.sender || _ownerOf[_x][_y] == msg.sender, "SquareLand: not allowed");
        require(_ownerOf[_x][_y] == _from, "SquareLand: not an owner");
        require(_to != address(0), "SquareLand: incorrect address");
        require(_exists(_x, _y), "SquareLand: This land does not exists");

        _approved[_x][_y] = address(0); //clear approvals
        _ownerOf[_x][_y] = _to;         //change owner

        if(_balanceOf[_from] != 0){
             _balanceOf[_from] -= 1;
        }
        _balanceOf[_to] += 1;
    }


    function _transfer(address _to, uint256 _x, uint256 _y) virtual external {
        require(_ownerOf[_x][_y] == msg.sender, "SquareLand: not allowed");
        require(_to != address(0), "SquareLand: incorrect address");
        require(_exists(_x, _y), "SquareLand: This land does not exists");

        _approved[_x][_y] = address(0); //clear approvals
        _ownerOf[_x][_y] = _to;         //change owner
    }


    function _changePrice(uint256 _x, uint256 _y, uint256 _price) virtual public {
        require(_approved[_x][_y] == msg.sender || _ownerOf[_x][_y] == msg.sender, "SquareLand: not allowed");
        _priceOf[_x][_y] = _price;
    }
}