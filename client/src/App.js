import "@fortawesome/fontawesome-free/js/all.js";
import { useEffect, useState } from "react";
import "./App.css";
import Index from "./components/canvas/Canvas";
import Interface from "./components/common/Interface";
import Sign from "./components/common/sign/Sign";
import Modal from "./components/modals/Modal";
import { disconnectSocket, SocketIo } from "./libs/socketio";

function App() {
  const [loginCheck, setLoginCheck] = useState(false);
  // const {token } = useSelector(state => state.state.myInfo);

  useEffect(() => {
    localStorage.clear();
    // if (JSON.parse(localStorage.getItem("token"))) {
    //   setLoginCheck(true);
    // } else {
    //   localStorage.clear();
    // }
    // console.log(JSON.parse(localStorage.getItem("token")));
    return () => {
      disconnectSocket();
    };
  }, []);

  return (
    <>
      {loginCheck ? (
        <>
          <Interface />
          <Index />
        </>
      ) : (
        <Sign setLoginCheck={setLoginCheck} />
      )}
      <Modal />
      <SocketIo />
    </>
  );
}

export default App;
