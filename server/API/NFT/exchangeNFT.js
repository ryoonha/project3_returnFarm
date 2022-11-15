// require("dotenv").config();
const Web3 = require("web3");
const rpcURL = "https://goerli.infura.io/v3/b03f802e554f441786b51c437837bfe4"  
const web3 = new Web3(rpcURL);
const db=require('../sequelize/models');

const contract721ABI =require("../abi/erc721abi.json");
const contract721Address = "0x75f5fecAC06f1036bF06483c37DcD0881dFE16B5"

const serverAddress = '0x7842eBB02dAC50D732B0d337c8D9a92ade5cF755';

const getEthBalanceOf = async (address) => {
	return await web3.eth.getBalance(address)
	.then(result => {
		return (parseInt(result))
	});                        
}

const exchangeNFT = async (req, res) => {

	const data =req.body;
	const fromAddress = data.from_Address; 
    const toAddress = data.to_Address; 
	const tokenId = parseInt(data.token_id);

	const callUserData = await db['users'].findOne({where:{address:data.fromAddress}})
    const userPrivateKey = callUserData.dataValues.privateKey; 

    const ethBalance = await getEthBalanceOf(fromAddress)
	const serverEtherBalance = await getEthBalanceOf(serverAddress)
    console.log('server eth Balance : ' + serverEtherBalance ) 
	console.log('user eth Balance : ' + ethBalance)
	console.log('user token Balance : ' +tokenBalance)
	
	
	if (ethBalance < 1000000000000000){
		console.log('Insufficient gas')
		return res.status(400).send('가스비가 부족합니다. Faucet을 이용하세요')
	} else {
        try{				
            const getGasAmountForExchange=  () => {
                const contract = new web3.eth.Contract(contract721ABI, contract721Address);
                gasAmount = contract.methods.transferFrom(fromAddress, toAddress, tokenId).estimateGas({ from: fromAddress })
                return gasAmount
            }
            const callExchangeGas = await getGasAmountForExchange()
            const exchangeGas = Math.round(callExchangeGas*1.3)
            console.log(exchangeGas)
            
            let contract721 = new web3.eth.Contract(contract721ABI, contract721Address, {from: fromAddress} ); 
            let data721 = contract721.methods.transferFrom(fromAddress, toAddress, tokenId).encodeABI(); //(recipient, tokenuri, 가격)
            let rawTransaction721 = {"to": contract721Address, "gas": exchangeGas, "data": data721 }; 
            const signedTx = await web3.eth.accounts.signTransaction(rawTransaction721, userPrivateKey)
            web3.eth.sendSignedTransaction(signedTx.rawTransaction) //mintNFT(recipient, tokenURI, price)
            .then(req => { 
                console.log('NFT 전송 성공')
                return res.status(200).send("NFT 전송 성공");
                // return true;  
                })
            .catch(err => {return res.status(400).send("실패. 1분 후에 재시도 하세요");})		
		} catch(err){
			console.log("web3에러");
			console.log(err);
			} 	
	}			
} 

module.exports = {
    exchangeNFT
}



