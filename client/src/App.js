import "@fortawesome/fontawesome-free/js/all.js";
import { useEffect, useState } from "react";
import "./App.css";
import Index from "./components/canvas/Canvas";
import Interface from "./components/common/Interface";
import Sign from "./components/common/sign/Sign";
import { disconnectSocket, socket } from "./libs/socketio";

function App() {
  const [loginCheck, setLoginCheck] = useState(false);
  if (localStorage.userData) {
    console.log(localStorage);
    console.log(JSON.parse(localStorage.userData));
  }
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
    </>
  );
}

export default App;
