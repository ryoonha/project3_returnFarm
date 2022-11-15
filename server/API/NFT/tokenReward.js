require("dotenv").config();
const Web3 = require("web3");
const rpcURL = "https://goerli.infura.io/v3/b03f802e554f441786b51c437837bfe4"  //API KEY 교체!!
const web3 = new Web3(rpcURL);
const contractABI =require("../../smartContract/abi/erc20abi.json");
const privateKey = "06e62f2d492e32a888379a37f6a32c3c2efa0f586e712434a1387313419e20a8"

const tokenReward = async (req, res) => {

	const data =req.body;
	const address = data.address; 
	const sellingPrice = data.sellingPrice

	const contractAddress = "0x2e31c765e77457BBa686B4831627d929f56F3024"; // erc20 토큰 컨트랙트
	const serverAddress = '0x7842eBB02dAC50D732B0d337c8D9a92ade5cF755'; // 서버 계정

	try{
		const getGasAmount = async () => {
			const contract = new web3.eth.Contract(contractABI, contractAddress);
			const gasAmount = await contract.methods.transfer(address, sellingPrice).estimateGas({ from: serverAddress })
			return gasAmount
		}
		const gasAmount = await getGasAmount()

		//creating contract object
		let contract = new web3.eth.Contract(contractABI,contractAddress, {from: serverAddress} ); 
		let data = contract.methods.transfer(address, sellingPrice).encodeABI(); //Create the data for token transaction.
		let rawTransaction = {"to": contractAddress, "gas": gasAmount, "data": data }; 

		//밸런스 확인 
		const getTOKENBalanceOf = async (address) => {
			return await contract.methods.balanceOf(address).call();                        
		}   
		const signedTx =await web3.eth.accounts.signTransaction(rawTransaction, privateKey);

		web3.eth.sendSignedTransaction(signedTx.rawTransaction)
		.then(req => {
			getTOKENBalanceOf(address)
			.then (balance => {
				console.log(address + "Token Balance: " + balance);
			})
		})
		return signedTx;
	} catch(err){
        console.log("web3에러");
        console.log(err);
		return res.status(400).send('1분 뒤에 시도하세요')
    } 
}

module.exports = {
    tokenReward
}
