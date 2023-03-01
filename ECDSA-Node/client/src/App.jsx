import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [signature, setSignature] = useState("");
  const [recovery, setRecovery] = useState("");
  return (
    <div className="app">
      <Wallet
        balance={balance}
        signature={signature}
        recovery={recovery}
        setRecovery={setRecovery}
        setSignature={setSignature}
        setBalance={setBalance}
      />
      <Transfer setBalance={setBalance} signature={signature} recovery={recovery} />
    </div>
  );
}

export default App;
