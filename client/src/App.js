import "@fortawesome/fontawesome-free/js/all.js";
import { useEffect, useState } from "react";
import "./App.css";
import Index from "./components/canvas/Canvas";
import Interface from "./components/common/Interface";
import Sign from "./components/common/sign/Sign";

function App() {
  const [loginCheck, setLoginCheck] = useState(true);

  useEffect(() => {}, []);
  return (
    <>
      {loginCheck ? (
        <>
          <Interface />
          <Index />
        </>
      ) : (
        <Sign />
      )}
    </>
  );
}

export default App;
