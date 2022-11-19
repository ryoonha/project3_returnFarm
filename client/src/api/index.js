import axios from "axios";
import { setInterceptors } from "./common/interceptors";

function createInstanceWithAuth(url, type) {
  const instance = axios.create({
    baseURL: `http://localhost:4000/${url}`,
  });
  return setInterceptors(instance, type);
}

//http://localhost:4000/
export const instance = createInstanceWithAuth();
export const sign = createInstanceWithAuth("sign");
export const user = createInstanceWithAuth("user");
export const game = createInstanceWithAuth("game");
export const nft = createInstanceWithAuth("nft");
export const transaction = createInstanceWithAuth("transaction");
