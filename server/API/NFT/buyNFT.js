import dotenv from "dotenv";
dotenv.config();

const Web3 = require("web3");
const rpcURL = "https://goerli.infura.io/v3/b03f802e554f441786b51c437837bfe4"  
const web3 = new Web3(rpcURL);
const User = require("../../models/user");
const Market_nft = require("../../models/market_nft");

const contract721ABI =require("../../smartContract/abi/erc721abi.json");
const contract20ABI =require("../../smartContract/abi/erc20abi.json");

const contract721Address = "0x6645e7C6cc65888E8c41793CfBEEd5946bcBb47C"
const contract20Address = "0x2e31c765e77457BBa686B4831627d929f56F3024"

const serverAddress = '0xA90dB6734F77B38cccf7346419491d8a2A0Babee';
const privateKey = process.env.PRIVATEKEY

const getethBalanceOf = async (address) => {
	return await web3.eth.getBalance(address)
	.then(result => {
		return (parseInt(result))
	});                        
}

const getTOKENBalanceOf = async (address) => {
	const contract20 = new web3.eth.Contract(contract20ABI, contract20Address)
	return await contract20.methods.balanceOf(address).call()
	.then(result => {
		return parseInt(result)
	});                        
}

const setTimeoutPromise = (ms) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(), ms);
	});
}

const buyNFT = async (req, res) => {
    
    const data =req.body;
	const owner = data.ownerAddress;
    const buyer = data.buyerAddress;
    const nft = data.nftId;
    const tokenId = parseInt(data.tokenId);
    const sellingPrice = parseInt(data.sellingPrice)

	console.log(data)
    const callBuyerData = await User.findOne({where:{address:buyer}})
    const callBuyerPrivateKey = callBuyerData.dataValues.private_key;
	const buyerPrivateKey = callBuyerPrivateKey.slice(0, 64)
	
    const callOwnerData = await User.findOne({where:{address:owner}})
    const ownerPrivateKey = callOwnerData.dataValues.private_key; 

    const buyerEtherBalance = await getethBalanceOf(buyer)
	const serverEtherBalance = await getethBalanceOf(serverAddress)
	const tokenBalance = await getTOKENBalanceOf(buyer)
    
	console.log('server eth Balance : ' + serverEtherBalance ) 
	console.log('buyer eth Balance : ' + buyerEtherBalance)
	console.log('buyer token Balance : ' + tokenBalance)

	if (buyerEtherBalance < 1000000000000000){
		console.log('Insufficient gas')
		return res.status(400).send('가스비가 부족합니다.')
	} else {
		if (tokenBalance < sellingPrice) {
			console.log('Insufficient IP')
			return res.status(400).send('보유하신 IP개수가 부족합니다.')
		} else {
			try{
				const getApproveGasAmount = () => {
					const contract = new web3.eth.Contract(contract20ABI, contract20Address);
					const gasAmount = contract.methods.approve(contract721Address, sellingPrice).estimateGas({ from: buyer })
					return gasAmount
				}
				const callApproveGas = await getApproveGasAmount()
				const approveGas = Math.round(callApproveGas*1.3)
				console.log(approveGas)
				
				//erc20 -> erc721 approve (buyer의 토큰으로 owner의 NFT를 구매할 있게 approve)
				let buyerContract = new web3.eth.Contract(contract20ABI, contract20Address, {from: buyer} ); 
				let buyerContractData = buyerContract.methods.approve(contract721Address, sellingPrice).encodeABI(); //Create the data for token transaction.
				let rawTransaction = {"to": contract20Address, "gas": approveGas, "data": buyerContractData }; 
				
				web3.eth.accounts.signTransaction(rawTransaction, buyerPrivateKey)
				.then(signedTx => web3.eth.sendSignedTransaction(signedTx.rawTransaction))			
				
				await setTimeoutPromise(30000)	

				const getGasAmountForBuy=  () => {
					const contract = new web3.eth.Contract(contract721ABI, contract721Address);
					const gasAmount = contract.methods.buyNFT(owner, buyer, tokenId, sellingPrice).estimateGas({ from: serverAddress })
					return gasAmount
				}

				const callGasForBuy = await getGasAmountForBuy()
				const gasforBuy = Math.round(callGasForBuy*1.2)
				console.log('approve 성공' + gasforBuy)
				
				let contract721 = new web3.eth.Contract(contract721ABI, contract721Address, {from: serverAddress} ); 
				let data721 = contract721.methods.buyNFT(owner, buyer, tokenId, sellingPrice).encodeABI(); //(recipient, tokenuri, 가격)
				let rawTransaction721 = {"to": contract721Address, "gas": gasforBuy, "data": data721 }; 
				const signedTx = await web3.eth.accounts.signTransaction(rawTransaction721, privateKey)
				web3.eth.sendSignedTransaction(signedTx.rawTransaction) //mintNFT(recipient, tokenURI, price)
				.then(req => { 
					console.log('NFT 구매 성공')
					User.decrement({token_amount:sellingPrice},{where:{address:buyer}});
                    User.increment({token_amount:sellingPrice*0.95},{where:{address:owner}});
					Market_nft.destroy({where:{nft_name:nft}})
					return res.status(200).send("구매 성공");  
					// return true;  
					})
				.catch(err => {return res.status(400).send("실패. 1분 후에 재시도 하세요");})
				
		} catch(err){
			console.log("web3에러");
			console.log(err);
			} 
		}
	}
			
} 

export { buyNFT };



