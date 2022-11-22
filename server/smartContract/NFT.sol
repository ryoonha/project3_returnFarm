// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract NFTLootBox is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    IERC20 token;
    uint256 fee;
    uint256 nftPrice;
    

   constructor() ERC721("returnFarmNFT", "RFN") {
    }
    
    function mintNFT(address serveraddress, string memory tokenURI, uint256 mintingPrice) public returns (uint256) {
        fee = mintingPrice;
        require(token.balanceOf(msg.sender) >= fee, "insufficient token for minting");

        token.transferFrom(msg.sender, serveraddress, fee);
        
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    function buyNFT(address owner, address buyer, uint256 tokenId, uint256 price) public returns (bool) {
        nftPrice = price;
        require(token.balanceOf(buyer) >= nftPrice, "insufficient token");

        token.transferFrom(buyer, owner, nftPrice*995/1000);
        token.transferFrom(buyer, msg.sender, nftPrice*5/1000);
        transferFrom(owner, buyer, tokenId);

        return true;
    }

    function setToken (address tokenAddress) public onlyOwner returns (bool) {
        require(tokenAddress != address(0x0));
        token = IERC20(tokenAddress);
        return true;
    }

    function showTokenAmount (address recipient) public view returns (uint256) {
        return token.balanceOf(recipient);
    }

    function check (address recipient) public view returns (bool) {
        return token.balanceOf(recipient) > nftPrice;
    }
}


  