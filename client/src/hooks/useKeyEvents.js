import { useDispatch } from "react-redux";
import { modalChange } from "../stores/reducers/modalSlice";

let keySave = null;
const useKeyEvents = () => {
  const dispatch = useDispatch();
  document.addEventListener("keydown", (e) => {
    if (e.key === "F2" && !keySave) {
      keySave = e.key;
      dispatch(modalChange({ change: "screenshot" }));
    } else if (e.key === "F2") {
      keySave = null;
      dispatch(modalChange({ change: false }));
    }
  });
};

export default useKeyEvents;
