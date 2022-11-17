import "@fortawesome/fontawesome-free/js/all.js";
import { Suspense, useEffect, useState } from "react";
import "./App.css";
import Index from "./components/canvas/Canvas";
import Interface from "./components/common/Interface";
import Sign from "./components/common/sign/Sign";
import Modal from "./components/modals/Modal";
import { disconnectSocket, SocketIo } from "./libs/socketio";

function App() {
  const [loginCheck, setLoginCheck] = useState(false);

  const item = {
    item_name: "사과",
    item_count: "1",
    quality: "1",
    time: "2022/11/17/05/23",
  };
  console.log(item);
  console.log(JSON.stringify(item));

  const tile = {
    seed: null,
    add: [],
    estimated_time: "2022/11/17/05/23",
  };
  console.log(tile);
  console.log(JSON.stringify(tile));
  console.log(JSON.parse(JSON.stringify(tile)));

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
