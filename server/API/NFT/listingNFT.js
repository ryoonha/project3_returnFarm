// require("dotenv").config();
const Web3 = require("web3");
const rpcURL = "https://goerli.infura.io/v3/b03f802e554f441786b51c437837bfe4"  
const web3 = new Web3(rpcURL);
const db=require('../sequelize/models');

const contract721ABI =require("../../smartContract/abi/erc721abi.json");
const contract721Address = "0x75f5fecAC06f1036bF06483c37DcD0881dFE16B5"

const serverAddress = '0x7842eBB02dAC50D732B0d337c8D9a92ade5cF755';

const getEthBalanceOf = async (address) => {
	return await web3.eth.getBalance(address)
	.then(result => {
		return (parseInt(result))
	});                        
}

const listingNFT = async (req, res) => {

	const data =req.body;
	const tokenId = data.tokenID
    const address = data.address

	const callUserData = await db['users'].findOne({where:{address:data.address}})
    const userPrivateKey = callUserData.dataValues.privateKey; 

    const ethBalance = await getEthBalanceOf(fromAddress)
	const serverEtherBalance = await getEthBalanceOf(serverAddress)
    console.log('server eth Balance : ' + serverEtherBalance ) 
	console.log('user eth Balance : ' + ethBalance)
	console.log('user token Balance : ' +tokenBalance)
	

    //id, nft_name, selling_price, address, metadata_url, img_url, created_url

	if (ethBalance < 1000000000000000){
		console.log('Insufficient gas')
		return res.status(400).send('가스비가 부족합니다. Faucet을 이용하세요')
	} else {
        try{				
            const getGasAmountForExchange=  () => {
                const contract = new web3.eth.Contract(contract721ABI, contract721Address);
                gasAmount = contract.methods.setApprovalForAll(serverAddress, true).estimateGas({ from: address })
                return gasAmount
            }
            const callApproveGas = await getGasAmountForExchange()
            const gasforApprove = Math.round(callApproveGas*1.3)
            console.log(gasforApprove)
            
            let contract721 = new web3.eth.Contract(contract721ABI, contract721Address, {from: address} ); 
            let data721 = contract721.methods.setApprovalForAll(serverAddress, true).encodeABI(); //(recipient, tokenuri, 가격)
            let rawTransaction721 = {"to": contract721Address, "gas": gasforApprove, "data": data721 }; 
            const signedTx = await web3.eth.accounts.signTransaction(rawTransaction721, userPrivateKey)
            web3.eth.sendSignedTransaction(signedTx.rawTransaction) //mintNFT(recipient, tokenURI, price)
            .then(req => { 
                db['nft_market'].create({
                    // id:?????,
                    nft_name:data.nftName,
                    selling_price:data.sellingPrice,
                    address:data.address,
                    metadata_url:data.metadataUrl,
                    img_url:data.imgUrl,
                })
                console.log('판매 등록 성공')
                return res.status(200).send("판매 등록 성공");
                })
            .catch(err => {return res.status(400).send("실패. 1분 후에 재시도 하세요");})		
		} catch(err){
			console.log("web3에러");
			console.log(err);
			} 	
	}			
} 

module.exports = {
    listingNFT
}





