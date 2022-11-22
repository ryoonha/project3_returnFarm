const Web3 = require("web3");
const rpcURL = "https://goerli.infura.io/v3/b03f802e554f441786b51c437837bfe4"  
const web3 = new Web3(rpcURL);

const contract721ABI =require("../../smartContract/abi/erc721abi.json");
const contract721Address = "0x6645e7C6cc65888E8c41793CfBEEd5946bcBb47C"
const contract721 = new web3.eth.Contract(contract721ABI, contract721Address)

const NFTList = async (req, res) => {
    const data =req.body;
    const address = data.fromAddress;
    
    const options = {method: 'GET'};
    fetch(`https://testnets-api.opensea.io/api/v1/assets?owner=${address}&order_direction=desc&offset=0&limit=20&include_orders=false`, options)
    .then(response => response.json())
    .then( async (response) => {
        let assetsURI = []   
        for ( let i = 0; i < response.assets.length; i++){
            if (response.assets[i].asset_contract.name == 'returnFarmNFT'){
                let tokenID = parseInt(response.assets[i].token_id)
                console.log('😎', tokenID)
                let callMetadata = await contract721.methods.tokenURI(tokenID).call()
                .then(result => {
                console.log(result)
                return result
                })
                assetsURI.push(callMetadata)   
            }   
        }
        return assetsURI
    })
    .then(result=>{
        console.log('😃',result)
        return res.status(200).send(result)   
    })
    .catch(err => console.error(err)); 
}

export { NFTList };