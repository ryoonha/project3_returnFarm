const Web3 = require("web3");
const rpcURL = "https://goerli.infura.io/v3/b03f802e554f441786b51c437837bfe4"  
const web3 = new Web3(rpcURL);
const User = require("../../models/user");

const contract721ABI =require("../../smartContract/abi/erc721abi.json");
const contract721Address = "0x6645e7C6cc65888E8c41793CfBEEd5946bcBb47C"

const getEthBalanceOf = async (address) => {
	return await web3.eth.getBalance(address)
	.then(result => {
		return (parseInt(result))
	});                        
}

const exchangeNFT = async (req, res) => {

	const data =req.body;
	const fromAddress = data.fromAddress; 
    const toAddress = data.toAddress; 
	const tokenId = parseInt(data.tokenId);
    
	const callUserData = await User.findOne({where:{address:fromAddress}})
    const callUserPrivateKey = callUserData.dataValues.private_key; 
    const userPrivateKey = callUserPrivateKey.slice(0, 64)
    console.log(userPrivateKey)
    console.log(tokenId)

    const ethBalance = await getEthBalanceOf(fromAddress)
	console.log('user eth Balance : ' + ethBalance)	
	
	if (ethBalance < 1000000000000000){
		console.log('Insufficient gas')
		return res.status(400).send('가스비가 부족합니다. Faucet을 이용하세요')
	} else {
        try{				
            const getGasAmountForExchange = () => {
                const contract = new web3.eth.Contract(contract721ABI, contract721Address);
                const gasAmount = contract.methods.transferFrom(fromAddress, toAddress, tokenId).estimateGas({ fromAddress })
                return gasAmount
            }
            const callExchangeGas = await getGasAmountForExchange()
            const exchangeGas = Math.round(callExchangeGas*1.3)
            console.log(exchangeGas)
            
            let contract721 = new web3.eth.Contract(contract721ABI, contract721Address, {from: fromAddress} ); 
            let data721 = contract721.methods.transferFrom(fromAddress, toAddress, tokenId).encodeABI(); //(recipient, tokenuri, 가격)
            let rawTransaction721 = {"to": contract721Address, "gas": exchangeGas, "data": data721 }; 

            web3.eth.accounts.signTransaction(rawTransaction721, userPrivateKey)
            .then(signedTx => web3.eth.sendSignedTransaction(signedTx.rawTransaction))
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

export { exchangeNFT };




