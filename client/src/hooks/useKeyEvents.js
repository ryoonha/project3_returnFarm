import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleItem } from "../stores/reducers/gameSlice";
import { handleTopMenu, modalChange } from "../stores/reducers/stateSlice";

let keySave = null;
const UseKeyEvents = () => {
  const dispatch = useDispatch();
  const bag = useSelector((state) => state.user.bag);
  const scroll = useSelector((state) => state.game.selectScroll);
  const modalCheck = useSelector((state) => state.state.modalCheck);
  const topMenuSelect = useSelector((state) => state.state.topMenuSelect);
  // const item = useSelector((state) => state.game.selectItem);

  const event = (e) => {
    if (modalCheck.length === 0 && topMenuSelect === null) {
      const num = Number(e.key);
      if (e.key === "F2" && !keySave) {
        keySave = e.key;
        dispatch(modalChange({ change: "screenshot" }));
      } else if (e.key === "F2") {
        keySave = null;
        dispatch(modalChange({ change: "" }));
      } else if (/\d/.test(num - 1) && bag[num - 1 + scroll]) {
        dispatch(handleItem({ item: [num - 1, bag[num - 1].item_name] }));
      }
      // else if (e.key === "i") {
      //   dispatch(handleTopMenu({ select: "Inventory" }));
      // } else if (e.key === "p") {
      //   dispatch(handleTopMenu({ select: "Status" }));
      // } else if (e.key === "c") {
      //   dispatch(handleTopMenu({ select: "Chatting" }));
      // } else if (e.key === "e") {
      //   dispatch(handleTopMenu({ select: "Exchange" }));
      // } else if (e.key === "n") {
      //   dispatch(handleTopMenu({ select: "NftList" }));
      // } else if (e.key === "t") {
      //   dispatch(handleTopMenu({ select: "TokenExchange" }));
      // } else if (e.key === "[") {
      //   dispatch(handleTopMenu({ select: "NftExchange" }));
      // } else if (e.key === "]") {
      //   dispatch(handleTopMenu({ select: "NftCreate" }));
      // }
    }
  };

  // const MouseEvent = (e) => {
  //   console.log(e);
  // };

  useEffect(() => {
    document.addEventListener("keydown", (e) => event(e));
    return () => document.removeEventListener("keydown", (e) => event(e));
  }, []);

  // useEffect(() => {
  //   document.addEventListener("click", (e) => MouseEvent(e));
  //   return () => document.removeEventListener("click", (e) => MouseEvent(e));
  // }, []);
};

export default UseKeyEvents;
