import server from "./server";
import { useState } from "react";

function Wallet({ balance, setBalance, signature, setSignature, recovery, setRecovery }) {
  const [status, setStatus] = useState("");
  const [address, setAddress] = useState("");
  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function check(evt) {
    evt.preventDefault();
    if(!recovery || !signature){
      setStatus("Please enter signed message and recovery number");
      setAddress("")
      setBalance(0);
    }
    else {
      const {
        data: { status, balance, address },
      } = await server.post(`check`, {signature, recovery});
      setStatus(status);
      setBalance(balance);
      setAddress(address)
      
    } 
    
  }

  return (
    <form className="container wallet" onSubmit={check}>
      <h1>Signature</h1>

      <label>
        Signed Message
        <textarea placeholder="Copy/paste your signed message here." value={signature} onChange={setValue(setSignature)}></textarea>
      </label>

      <label>
        Recovery Number
        <input placeholder="Recovery number provided with the signed message." value={recovery} onChange={setValue(setRecovery)}></input>
      </label>

      <input type="submit" className="button" value="Check" />
      <div className="info">Status: {status}</div>
      <div className="info">Address: {address}</div>
      <div className="info">Balance: {balance}</div>
    </form>
  );
}

export default Wallet;
