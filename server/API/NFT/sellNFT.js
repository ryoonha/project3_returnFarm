const Web3 = require("web3");
const rpcURL = "https://goerli.infura.io/v3/b03f802e554f441786b51c437837bfe4"  
const web3 = new Web3(rpcURL);
const User = require("../../models/user");
const Market_nft = require("../../models/market_nft");

const contract721ABI =require("../../smartContract/abi/erc721abi.json");
const contract721Address = "0x6645e7C6cc65888E8c41793CfBEEd5946bcBb47C"

const serverAddress = '0xA90dB6734F77B38cccf7346419491d8a2A0Babee';

const getEthBalanceOf = async (address) => {
	return await web3.eth.getBalance(address)
	.then(result => {
		return (parseInt(result))
	});                        
}

const sellNFT = async (req, res) => {

	const data =req.body;
	const tokenId = data.tokenID
    const address = data.address
    const name = data.nftName
    const selling_price = parseInt(data.sellingPrice)
    const metadata_url = data.metadataUrl
    const imgUrl = data.imgUrl

	const callUserData = await User.findOne({where:{address:address}})
    const userPrivateKey = callUserData.dataValues.private_key; 
    console.log(userPrivateKey)
    console.log(tokenId, address, name, selling_price, metadata_url, imgUrl)
    const ethBalance = await getEthBalanceOf(address)
	const serverEtherBalance = await getEthBalanceOf(serverAddress)
    console.log('server eth Balance : ' + serverEtherBalance ) 
	console.log('user eth Balance : ' + ethBalance)


	if (ethBalance < 1000000000000000){
		console.log('Insufficient gas')
		return res.status(400).send('가스비가 부족합니다. Faucet을 이용하세요')
	} else {
        try{				
            const getGasAmountForExchange=  () => {
                const contract = new web3.eth.Contract(contract721ABI, contract721Address);
                const gasAmount = contract.methods.approve(serverAddress, tokenId).estimateGas({ from: address })
                return gasAmount
            }
            const callApproveGas = await getGasAmountForExchange()
            const gasforApprove = Math.round(callApproveGas*1.3)
            console.log(gasforApprove)
            
            let contract721 = new web3.eth.Contract(contract721ABI, contract721Address, {from: address} ); 
            let data721 = contract721.methods.approve(serverAddress, tokenId).encodeABI(); //(recipient, tokenuri, 가격)
            let rawTransaction721 = {"to": contract721Address, "gas": gasforApprove, "data": data721 }; 
            const signedTx = await web3.eth.accounts.signTransaction(rawTransaction721, userPrivateKey)
            web3.eth.sendSignedTransaction(signedTx.rawTransaction) //mintNFT(recipient, tokenURI, price)
            .then(req => { 
                Market_nft.create({
                    nft_name:name,
                    selling_price:selling_price,
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

export { sellNFT };



