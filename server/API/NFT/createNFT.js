// require("dotenv").config();
const Web3 = require("web3");
const rpcURL = "https://goerli.infura.io/v3/b03f802e554f441786b51c437837bfe4";
const web3 = new Web3(rpcURL);

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
const User = require("../../models/user");

const contract20ABI = require("../../smartContract/abi/erc20abi.json");
const contract20Address = "0x2e31c765e77457BBa686B4831627d929f56F3024";
const contract721ABI = require("../../smartContract/abi/erc721abi.json");
const contract721Address = "0x75f5fecAC06f1036bF06483c37DcD0881dFE16B5";

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

const createNFT = async (req, res) => {
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

export { createNFT };
