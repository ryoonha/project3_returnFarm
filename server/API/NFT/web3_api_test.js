// const { userTokenTransfer } = require("../api/userToKenTransfer")
// userTokenTransfer('0x989C339d2CecA0D919Df26FDF1fF97b3384C2Bc0', '0x163164CB5442a3D087B2562Ccfb8A44F2Ea0E8C8' ,'0xc777e02a6ac8881887144110de80c6bc7433e71256b11cfabfa89f2fbbc9dbe1', 10)
import dotenv from "dotenv";
dotenv.config();
const Web3 = require("web3");
const rpcURL = "https://goerli.infura.io/v3/b03f802e554f441786b51c437837bfe4";//process.env.INFURA_KEY;
const web3 = new Web3(rpcURL);
// console.log(process.env.INFURA_KEY)
// const db=require('../sequelize/models');

const erc20ABI = require("../../smartContract/abi/erc20abi.json");
const erc721ABI = require("../../smartContract/abi/erc721abi.json");

const erc20Address = "0x2e31c765e77457BBa686B4831627d929f56F3024";
const erc721Address = "0x6645e7C6cc65888E8c41793CfBEEd5946bcBb47C";
const serverAddress = '0x7842eBB02dAC50D732B0d337c8D9a92ade5cF755';
const privateKey = process.env.PRIVATEKEY;
const fromAddress = '0x1C7291C03d2B250C7AD6559A361Ddd32Ca445700';

const contract20 = new web3.eth.Contract(erc20ABI, erc20Address)
const contract721 = new web3.eth.Contract(erc721ABI, erc721Address)

const result = async () => {
	try{
		//creating contract object
		let contract = new web3.eth.Contract(erc20ABI,erc20Address, {from: '0x7842eBB02dAC50D732B0d337c8D9a92ade5cF755'} ); 
		let data = contract.methods.approve(erc721Address, 10000000000).encodeABI(); //Create the data for token transaction.
		let rawTransaction = {"to": erc20Address, "gas": 500000, "data": data }; 

		const signedTx =await web3.eth.accounts.signTransaction(rawTransaction, '70ea2b470dd1cfe21eea37bc200d7534c4d447e5038df3e053dc8fb5d67ac812');
		web3.eth.sendSignedTransaction(signedTx.rawTransaction);
		
		return signedTx;
		} catch(err){
			console.log("web3에러");
			console.log(err);
		} 
		
}

// result()

const result3 = async () => {
	try{
		//creating contract object
		let contract = new web3.eth.Contract(erc721ABI, erc721Address, {from: serverAddress} ); 
		let data = contract.methods.setToken(erc20Address).encodeABI(); //Create the data for token transaction.
		let rawTransaction = {"to": erc721Address, "gas": 30000, "data": data }; 

		const signedTx =await web3.eth.accounts.signTransaction(rawTransaction, privateKey);
		web3.eth.sendSignedTransaction(signedTx.rawTransaction);
		
		return signedTx;
		} catch(err){

			console.log("web3에러");
			console.log(err);
		} 
		
}

// result3()

const result2 = async () => {
	try{
		//creating contract object
		let contract = new web3.eth.Contract(erc20ABI,erc20Address, {from: '0x9AaeFB2A0D5DFa9aA536cCD27186d68507c9138f'} ); 
		let data = contract.methods.approve('0x7618BA71B1688704b4363DfD09efEa071806FEa2', 100000).encodeABI(); //Create the data for token transaction.
		let rawTransaction = {"to": erc20Address, "gas": 100000, "data": data }; 

		const signedTx =await web3.eth.accounts.signTransaction(rawTransaction, "0xe6892560c962d3eb03f4f0e2faf69bf5ac74f97a1da82e6aa54854a803940ad0");
		web3.eth.sendSignedTransaction(signedTx.rawTransaction);
		
		return signedTx;
		} catch(err){
			console.log("web3에러");
			console.log(err);
		} 
		
} 



// console.log(contract721.methods)


// 1. 서버 계정으로 erc721 계정에 / erc20 - approve  - vs에서 한번만 해주면 됨 위에 result() 
// => caller : server, on : erc20, what : approve(erc721contractaddress)

// 2. 서버 계정으로 erc721 계정이 erc20 / erc721 - settoken - 리믹스에서 한번만 해주면 됨 
// => caller : server, on : erc721, what : settoken(erc20contractaddress) 

// 3. 구매자 계정으로 erc721 컨트랙트 계정 / erc20 - approve - 매번 해줘야함 -> mintNFT함수로  
// => caller : buyer, on : erc20, what : approve(approve721contractaddress) 

// 4. 서버 계정이 구매자 계정으로 민트 / erc721 - mintNFT - 매번 해줘야 함 -> mintNFT함수로 
// => caller : server, on : erc721, what : minNFT(buyer, tokenuri, price)

// 5. DB 업데이트 *만들어진 첫번째 nft의 tokenId는 1 

// console.log(contract20.methods)

// const getTOKENBalanceOf = async () => {
// 	return await contract20.methods.balanceOf('0x1C7291C03d2B250C7AD6559A361Ddd32Ca445700').call()
// 	.then(result => {
// 		console.log(result)
// 	});                        
// }
// getTOKENBalanceOf()


const ownerOfNFT = async () => {
	return await contract721.methods.ownerOf(4).call()
	.then(result => {
		console.log(result)
	});                        
}

const getethBalanceOf = async () => {
	return await web3.eth.getBalance('0x7842eBB02dAC50D732B0d337c8D9a92ade5cF755')
	.then(result => {
		console.log(parseInt(result))
	});                        
}

// getethBalanceOf()
// ownerOfNFT()
// result2()


const getGasPrice = async () => {
	return await web3.eth.getGasPrice()
	.then(result => {
		console.log(parseInt(result))
	});                        
}

// getGasPrice()

// const getGasPrice2 = async () => {
// 	return  contract721.methods.mintNFT(fromAddress, 'https://ipfs.io/ipfs/QmcYsYn5kzUYvioqC43vc5eisSyS8xMPgcu5agaFE6koCu?filename=%E1%84%82%E1%85%A9%E1%84%8C%E1%85%B5%E1%84%89%E1%85%A5%E1%86%AB.png', 10).estimateGas(
//         {
//             from: '0x7842eBB02dAC50D732B0d337c8D9a92ade5cF755',
//             gasPrice:1000000000000000
//         }, function(error, estimatedGas) {
		
// 			console.log(estimatedGas)
//         }
//     )
// 	.then(result => {
// 		console.log(result)
// 	});                        
// }

// getGasPrice2


const getGasAmountForContractCall = async () => {
    const contract = new web3.eth.Contract(erc721ABI, erc721Address);
    gasAmount = await contract.methods.mintNFT(fromAddress, 'https://ipfs.io/ipfs/QmcYsYn5kzUYvioqC43vc5eisSyS8xMPgcu5agaFE6koCu?filename=%E1%84%82%E1%85%A9%E1%84%8C%E1%85%B5%E1%84%89%E1%85%A5%E1%86%AB.png', 10).estimateGas({ from: fromAddress });
    console.log (gasAmount)
}


// getGasAmountForContractCall()

const gasPrice = async () => {
	await web3.eth.getGasPrice()
	.then(result => console.log(result))
	
} 
// gasPrice()


// const contract721 = new web3.eth.Contract(erc721ABI, erc721Address)

const getmethods = async () => {
	return await contract721.methods.tokenURI(1).call()
	.then(result => {
		console.log(result)
	});                        
}

//유저가 nft를 만드는데


getmethods()

console.log(contract721.methods)




// for ( let a = 0; a < asset.length; a++){
// 	asset[]
// }