require("dotenv").config();
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

const createNFT = async (req, res) => {
	const data =req.body;
	const fromAddress = data.fromAddress; 
	const tokenURI = data.tokenURI; //메타데이터 json ipfs주소 
	const callPrivateKey = await db['user'].findOne({where:{address:data.fromAddress}})
	const userPrivateKey = callPrivateKey.dataValues.privateKey; 
	const id = callPrivateKey.user_id
	const callUser_id = await db['nft'].findOne({where:{metadata_url:tokenURI}})
	const ethBalance = await getethBalanceOf(fromAddress)
	const serverEtherBalance = await getethBalanceOf(serverAddress)
	const tokenBalance = await getTOKENBalanceOf(fromAddress)
	
	console.log('server eth Balance : ' + serverEtherBalance ) 
	console.log('user eth Balance : ' + ethBalance)
	console.log('user token Balance : ' +tokenBalance)

	if (ethBalance < 1000000000000000){
		console.log('Insufficient gas')
		return res.status(400).send('가스비가 부족합니다. Faucet을 이용하세요')
	} else {
		if (tokenBalance <= 10) {
			console.log('Insufficient HT')
			return res.status(400).send('EIT 11개 부터 사용 가능합니다. 포스팅으로 EIT를 채굴하세요')
		} else {
			try{
				const getApproveGasAmount = () => {
					const contract = new web3.eth.Contract(contract20ABI, contract20Address);
					gasAmount = contract.methods.approve(contract721Address, 10000).estimateGas({ from: fromAddress })
					return gasAmount
				}
				const callApproveGas = await getApproveGasAmount()
				const approveGas = Math.round(callApproveGas*1.3)
				console.log(approveGas)

				//erc20 -> erc721 approve (사용자의 토큰을 민팅에 사용할 수 있게 설정)
				let contract20 = new web3.eth.Contract(contract20ABI, contract20Address, {from: fromAddress} ); 
				let data20 = contract20.methods.approve(contract721Address, 100000000).encodeABI(); //Create the data for token transaction.
				let rawTransaction = {"to": contract20Address, "gas": approveGas, "data": data20 }; 
				const signedTx20 = await web3.eth.accounts.signTransaction(rawTransaction, userPrivateKey);

				web3.eth.sendSignedTransaction(signedTx20.rawTransaction) //approve(erc721)
				function setTimeoutPromise(ms) {
					return new Promise((resolve, reject) => {
						setTimeout(() => resolve(), ms);
					});
					}
				await setTimeoutPromise(30000)					
				const getMintGasAmount=  () => {
					const contract = new web3.eth.Contract(contract721ABI, contract721Address);
					gasAmount = contract.methods.mintNFT(fromAddress, tokenURI, 10).estimateGas({ from: serverAddress })
					return gasAmount
				}
				const callMintGas = await getMintGasAmount()
				const mintGas = Math.round(callMintGas*1.3)
				console.log(mintGas)
				
				let contract721 = new web3.eth.Contract(contract721ABI, contract721Address, {from: serverAddress} ); 
				let data721 = contract721.methods.mintNFT(fromAddress, tokenURI, 10).encodeABI(); //(recipient, tokenuri, 가격)
				let rawTransaction721 = {"to": contract721Address, "gas": mintGas, "data": data721 }; 
				const signedTx = await web3.eth.accounts.signTransaction(rawTransaction721, privateKey)
				web3.eth.sendSignedTransaction(signedTx.rawTransaction) //mintNFT(recipient, tokenURI, price)
				.then(req => { 
					console.log('wow 민트성공')
					db['user'].decrement({token_amount:10},{where:{address:fromAddress}});
					db['nft'].update({user_id:id}, {where:{metadata_url:tokenURI}})
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
    createNFT
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


