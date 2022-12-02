import dotenv from "dotenv";
dotenv.config();
const Web3 = require("web3");
const rpcURL = "https://goerli.infura.io/v3/b03f802e554f441786b51c437837bfe4";
const web3 = new Web3(rpcURL);
const User = require("../../models/user");

const serverAddress = "0xA90dB6734F77B38cccf7346419491d8a2A0Babee";
const privateKey = process.env.PRIVATEKEY;

const contract20Address = "0x2e31c765e77457BBa686B4831627d929f56F3024";
const contract20ABI = require("../../smartContract/abi/erc20abi.json");

const getTOKENBalanceOf = async (address) => {
  const contract20 = new web3.eth.Contract(contract20ABI, contract20Address);
  return await contract20.methods
    .balanceOf(address)
    .call()
    .then((result) => {
      return parseInt(result);
    });
};

const tokenExchange = async (req, res) => {
  const data = req.body;
  const address = data.address;
  const amount = parseInt(data.amount);

  const callUserData = await User.findOne({ where: { address: address } });
  const userTokenAmount = callUserData.dataValues.haes_sal_amount;
  console.log(userTokenAmount, "✨");

  const serverTokenBalance = await getTOKENBalanceOf(serverAddress);
  console.log("server token Balance : " + serverTokenBalance);

  if (userTokenAmount < amount) {
    console.log("Insufficient HT");
    return res.status(400).send("햇살이 부족합니다");
  } else {
    try {
      const getGasAmountForExchange = () => {
        const contract = new web3.eth.Contract(
          contract20ABI,
          contract20Address
        );
        const gasAmount = contract.methods
          .transfer(address, amount)
          .estimateGas({ from: serverAddress });
        return gasAmount;
      };
      const callGasforExchange = await getGasAmountForExchange();
      const gasforExchange = Math.round(callGasforExchange * 1.3);
      console.log(gasforExchange);

      let contract20 = new web3.eth.Contract(contract20ABI, contract20Address, {
        from: serverAddress,
      });
      let data20 = contract20.methods.transfer(address, amount).encodeABI(); //(recipient, tokenuri, 가격)
      let rawTransaction20 = {
        to: contract20Address,
        gas: gasforExchange,
        data: data20,
      };
      const signedTx = await web3.eth.accounts.signTransaction(
        rawTransaction20,
        privateKey
      );
      web3.eth
        .sendSignedTransaction(signedTx.rawTransaction)
        .then((req) => {
          User.decrement(
            { haes_sal_amount: amount },
            { where: { address: address } }
          );
          User.increment(
            { ip_amount: amount },
            { where: { address: address } }
          );
          console.log("교환 선공");
          return res.status(200).send("교환 선공");
        })
        .catch((err) => {
          return res.status(400).send("실패. 1분 후에 재시도 하세요");
        });
    } catch (err) {
      console.log("web3에러");
      console.log(err);
      res.status(400).send("실패. 1분 후에 재시도 하세요");
    }
  }
};

export { tokenExchange };
