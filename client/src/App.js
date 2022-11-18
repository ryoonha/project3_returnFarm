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

  useEffect(() => {
    localStorage.clear();
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
