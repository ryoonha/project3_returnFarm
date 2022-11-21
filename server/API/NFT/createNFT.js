import { create as ipfsHttpClient } from 'ipfs-http-client';
const Web3 = require("web3");
const rpcURL = "https://goerli.infura.io/v3/b03f802e554f441786b51c437837bfe4";
const web3 = new Web3(rpcURL);
<<<<<<< HEAD

// import { create } from 'ipfs-http-client';

// const ipfs = create('/ip4/127.0.0.1/tcp/5001');

// const imgUpload = async (img) => {
//   if(!Buffer.isBuffer(img)) return null;
//   const addFile = await ipfs.add(img);
//   const initUri = "https://ipfs.io/ipfs/";
//   const mkUrl = initUri + addFile.cid;
//   return mkUrl;
// }
import db from "../../src/db_Process/sign.db";
=======
const ipfs = ipfsHttpClient('/ip4/127.0.0.1/tcp/5001');
>>>>>>> d558fe0399eced391c292f939d31e0e9d62b057e
const User = require("../../models/user");
const fs = require('fs');

<<<<<<< HEAD
const contract20ABI = require("../../smartContract/abi/erc20abi.json");
const contract20Address = "0x2e31c765e77457BBa686B4831627d929f56F3024";
const contract721ABI = require("../../smartContract/abi/erc721abi.json");
const contract721Address = "0x75f5fecAC06f1036bF06483c37DcD0881dFE16B5";
=======
const ipfsUpload = async (img) => { 
  const addFile = await ipfs.add(img);
  const initUri = "https://ipfs.io/ipfs/";
  const mkUrl = initUri + addFile.cid;
  return mkUrl;
}

const serverAddress = '0xA90dB6734F77B38cccf7346419491d8a2A0Babee';	
const contract20ABI = require("../../smartContract/abi/erc20abi.json");
const contract20Address = "0x2e31c765e77457BBa686B4831627d929f56F3024"
const contract721ABI =require("../../smartContract/abi/erc721abi.json");
const contract721Address = "0x6645e7C6cc65888E8c41793CfBEEd5946bcBb47C"

>>>>>>> d558fe0399eced391c292f939d31e0e9d62b057e

const getethBalanceOf = async (address) => {
  return await web3.eth.getBalance(address).then((result) => {
    return parseInt(result);
  });
};

const getTOKENBalanceOf = async (address) => {
  const contract20 = new web3.eth.Contract(contract20ABI, contract20Address);
  return await contract20.methods
    .balanceOf(address)
    .call()
    .then((result) => {
      return parseInt(result);
    });
};

const setTimeoutPromise = (ms) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(), ms);
	});
}

const createNFT = async (req, res) => {
<<<<<<< HEAD
  console.log(req.body.fromAddress);
  const data = req.body;
  const fromAddress = data.fromAddress;
  const name = data.name;
  const img_url = data.imgURL; //imgurl ipfs주소
  const description = data.description;

  // const metadata = await client.store({
  // 	tokenId : 1,
  // 	name : name,
  // 	image: new File([img_url], `${name}.jpg`, { type: 'image/jpg' }),
  // 	description : description,
  // // })
  // console.log(metadata.url)
  // const tokenURI = metadata.url

  const callPrivateKey = await User.findOne({
    where: { address: data.fromAddress },
  });
  const userPrivateKey = callPrivateKey.dataValues.private_key;
  console.log(userPrivateKey);

  const ethBalance = await getethBalanceOf(fromAddress);
  const tokenBalance = await getTOKENBalanceOf(fromAddress);

  console.log("user eth Balance : " + ethBalance);
  console.log("user token Balance : " + tokenBalance);

  // if (ethBalance < 1000000000000000){
  // 	console.log('Insufficient gas')
  // 	return res.status(400).send('가스비가 부족합니다. Faucet을 이용하세요')
  // } else {
  // 	if (tokenBalance <= 1) {
  // 		console.log('Insufficient IP')
  // 		return res.status(400).send('NFT 제작 비용이 부족합니다.')
  // 	} else {
  // 		try{
  // 			const getMintGasAmount=  () => {
  // 				const contract = new web3.eth.Contract(contract721ABI, contract721Address);
  // 				gasAmount = contract.methods.mintNFT(serverAddress, tokenURI, 1).estimateGas({ from: fromAddress })
  // 				return gasAmount
  // 			}
  // 			const callMintGas = await getMintGasAmount()
  // 			const mintGas = Math.round(callMintGas*1.3)
  // 			console.log(mintGas)

  // 			let contract721 = new web3.eth.Contract(contract721ABI, contract721Address, {from: fromAddress} );
  // 			let data721 = contract721.methods.mintNFT(serverAddress, tokenURI, 11).encodeABI(); //(recipient, tokenuri, 가격)
  // 			let rawTransaction721 = {"to": contract721Address, "gas": mintGas, "data": data721 };
  // 			const signedTx = await web3.eth.accounts.signTransaction(rawTransaction721, userPrivateKey)
  // 			web3.eth.sendSignedTransaction(signedTx.rawTransaction)
  // 			.then(req => {
  // 				console.log('wow 민트성공')
  // 				return res.status(200).send("민트 성공");
  // 				})
  // 			.catch(err => {return res.status(400).send("실패. 1분 후에 재시도 하세요");})

  // 	} catch(err){
  // 		console.log("web3에러");
  // 		console.log(err);
  // 		}
  // 	}
  // }
};
=======
	const data =req.body;
	const address = data.address; 
	const name = data.name
	const description = data.description
	console.log(data)
	
	let testFile = fs.readFileSync(`uploads/${req.file.filename}`, null)
	let testBuffer = Buffer.from(testFile); //new Buffer -> Buffer.from
	const ipfsImgUrl = await ipfsUpload(testBuffer)
	console.log('ipfsImgurl : ', ipfsImgUrl)

	const metadata = {
		name: name,
		description : description,
		image : ipfsImgUrl,
	}
	
	const src = JSON.stringify(metadata)
	console.log(src)
	const metadataUrl = await ipfsUpload(src)
	console.log('metadatUrl : ', metadataUrl)
	const tokenURI = metadataUrl
	
	const callPrivateKey = await User.findOne({where:{address:address}})
	const userPrivateKey = callPrivateKey.dataValues.private_key; 
	
	const ethBalance = await getethBalanceOf(address)
	const tokenBalance = await getTOKENBalanceOf(address)
	
	console.log('user eth Balance : ' + ethBalance)
	console.log('user token Balance : ' +tokenBalance)

	fs.unlink(`uploads/${req.file.filename}`, err => {
		console.log(err)
	});

	if (ethBalance < 1000000000000000){
		console.log('Insufficient gas')
		return res.status(400).send('가스비가 부족합니다. Faucet을 이용하세요')
	} else {
		if (tokenBalance <= 1) {
			console.log('Insufficient IP')
			return res.status(400).send('NFT 제작 비용이 부족합니다.')
		} else {
			try{
				const getApproveGasAmount = () => {
					const contract = new web3.eth.Contract(contract20ABI, contract20Address);
					const gasAmount = contract.methods.approve(contract721Address, 1).estimateGas({ from: address })
					return gasAmount
				}
				const callApproveGas = await getApproveGasAmount()
				const approveGas = Math.round(callApproveGas*1.3)
				console.log('Gas Estimation for Approve : ', approveGas)
				
				//erc20 -> erc721 approve (buyer의 토큰으로 owner의 NFT를 구매할 있게 approve)
				let contract = new web3.eth.Contract(contract20ABI, contract20Address, {from: address} ); 
				let contractData = contract.methods.approve(contract721Address, 1).encodeABI(); //Create the data for token transaction.
				let rawTransaction = {"to": contract20Address, "gas": approveGas, "data": contractData }; 
				
				web3.eth.accounts.signTransaction(rawTransaction, userPrivateKey)
				.then(signedTx => web3.eth.sendSignedTransaction(signedTx.rawTransaction))			
				
				await setTimeoutPromise(30000)	

				const getMintGasAmount=  () => {
					const contract = new web3.eth.Contract(contract721ABI, contract721Address);
					const gasAmount = contract.methods.mintNFT(serverAddress, tokenURI, 1).estimateGas({ from: address })
					return gasAmount
				}
				const callMintGas = await getMintGasAmount()
				const mintGas = Math.round(callMintGas*1.3)
				console.log('Gas Estimation for Mint : ', mintGas)
				
				let contract721 = new web3.eth.Contract(contract721ABI, contract721Address, {from: address} ); 
				let data721 = contract721.methods.mintNFT(serverAddress, tokenURI, 1).encodeABI(); //(recipient, tokenuri, 가격)
				let rawTransaction721 = {"to": contract721Address, "gas": mintGas, "data": data721 }; 
				const signedTx = await web3.eth.accounts.signTransaction(rawTransaction721, userPrivateKey)
				web3.eth.sendSignedTransaction(signedTx.rawTransaction) 
				.then(req => { 
					console.log('wow 민트성공')
					return res.status(200).send(tokenURI);
					})
				.catch(err => {
					console.log('민트 실패')
					return res.status(400).send("실패. 1분 후에 재시도 하세요");})
				
		} catch(err){
			console.log("web3에러");
			console.log(err);
			} 
		}
	}
			
} 
>>>>>>> d558fe0399eced391c292f939d31e0e9d62b057e

export { createNFT };
