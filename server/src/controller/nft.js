import { imgUpload, jsonUpload } from "../web3/ipfs";

const mint = async (req, res, next) => {
  const { name, description, attributes } = req.body;
  const file = req.file;
  const imgURI = await imgUpload(file ? file.buffer : file);
  const metadata = {
    name: name,
    description: description,
    image: imgURI,
    attributes: attributes,
  };
  const jsonData = JSON.stringify(metadata);
  const tokenURI = await jsonUpload(jsonData); // 메타데이터 cid
  // -> DB에서 privatekey 조회하는 함수 자리
  // -> 스마트 컨트랙트 자리

  if ("스마트 컨트랙트 return 값으로 핸들링") {
    res.status(200).send("민팅 성공!");
  } else {
    res.status(400).send("민팅 실패ㅠ");
  }
};

const nftExchange = async (req, res, next) => {};

const nftBuy = async (req, res, next) => {};

const nftList = async (req, res, next) => {
  const { user_id } = req.body;
};

const nftSell = async (req, res, next) => {};
