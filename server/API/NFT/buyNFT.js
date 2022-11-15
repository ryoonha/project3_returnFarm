// require("dotenv").config();
const Web3 = require("web3");
const rpcURL = "https://goerli.infura.io/v3/b03f802e554f441786b51c437837bfe4"  
const web3 = new Web3(rpcURL);
const db=require('../sequelize/models');

const contract721ABI =require("../abi/erc721abi.json");
const contract20ABI =require("../abi/erc20abi.json");

const contract721Address = "0x75f5fecAC06f1036bF06483c37DcD0881dFE16B5"
const contract20Address = "0x2e31c765e77457BBa686B4831627d929f56F3024"

const serverAddress = '0x7842eBB02dAC50D732B0d337c8D9a92ade5cF755';
const privateKey = '06e62f2d492e32a888379a37f6a32c3c2efa0f586e712434a1387313419e20a8' //privatekey 교체 

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

const buyNFT = async (req, res) => {
    
    const data =req.body;
	const owner = data.owner_address;
    const buyer = data.buyer_address;
    const nft = data.nft_id;
    const tokenId = parseInt(data.token_id);
    const sellingPrice = parseInt(data.selling_price)

    const callBuyerData = await db['users'].findOne({where:{address:data.buyer}})
    const buyerPrivateKey = callBuyerData.dataValues.privateKey; 

    const callOwnerData = await db['users'].findOne({where:{address:data.owner}})
    const ownerPrivateKey = callOwnerData.dataValues.privateKey; 

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
			console.log('Insufficient HT')
			return res.status(400).send('보유하신 HT개수가 부족합니다.')
		} else {
			try{
				const getApproveGasAmount = () => {
					const contract = new web3.eth.Contract(contract20ABI, contract20Address);
					gasAmount = contract.methods.approve(contract721Address, sellingPrice).estimateGas({ from: buyer })
					return gasAmount
				}
				const callApproveGas = await getApproveGasAmount()
				const approveGas = Math.round(callApproveGas*1.3)
				console.log(approveGas)

				//erc20 -> erc721 approve (owner의 NFT를 buyer가 구매할 있게 approve)
				let buyerContract = new web3.eth.Contract(contract721ABI, contract721Address, {from: buyer} ); 
				let buyerContractData = buyerContract.methods.approve(contract721Address, sellingPrice).encodeABI(); //Create the data for token transaction.
				let rawTransaction = {"to": contract721Address, "gas": approveGas, "data": buyerContractData }; 
				const signedTx20 = await web3.eth.accounts.signTransaction(rawTransaction, buyerPrivateKey);

				web3.eth.sendSignedTransaction(signedTx20.rawTransaction) //approve(erc721)
				const setTimeoutPromise = (ms) => {
					return new Promise((resolve, reject) => {
						setTimeout(() => resolve(), ms);
					});
					}
				await setTimeoutPromise(30000)	

				const getGasAmountForBuy=  () => {
					const contract = new web3.eth.Contract(contract721ABI, contract721Address);
					gasAmount = contract.methods.buyNFT(owner, buyer, tokenId, sellingPrice).estimateGas({ from: serverAddress })
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
					db['users'].decrement({token_amount:sellingPrice},{where:{address:buyer}});
                    db['users'].increment({token_amount:sellingPrice*0.95},{where:{address:owner}});
					db['nft_market'].destroy({where:{nft_name:nft}})
					return res.status(200).send("민트 성공");  
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

module.exports = {
    buyNFT
}


// 1. 서버 계정으로 erc721 계정에 / erc20 - approve  - vs에서 한번만 해주면 됨 위에 result() 
// => caller : server, on : erc20, what : approve(erc721contractaddress)

// 2. 서버 계정으로 erc721 계정이 erc20 / erc721 - settoken - 리믹스에서 한번만 해주면 됨 
// => caller : server, on : erc721, what : settoken(erc20contractaddress) 

// 3. 구매자 계정으로 erc721 컨트랙트 계정 / erc20 - approve - 매번 해줘야함 -> mintNFT함수로  
// => caller : buyer, on : erc20, what : approve(approve721contractaddress) 

// 4. 서버 계정이 구매자 계정으로 민트 / erc721 - mintNFT - 매번 해줘야 함 -> mintNFT함수로 
// => caller : server, on : erc721, what : minNFT(buyer, tokenuri, price)

// 5. DB 업데이트 *만들어진 첫번째 nft의 tokenId는 1 


