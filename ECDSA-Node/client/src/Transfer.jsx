import { useState } from "react";
import server from "./server";

function Transfer({  address, signature, recovery, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [feedback, setFeedback] = useState("");
  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {
      const {
        data: { feedback, newbalance },
      } = await server.post(`send`, {
        address: address,
        signature: signature,
        recovery: recovery,
        amount: parseInt(sendAmount),
        recipient,
      });
  
      if(newbalance !== -1){
        setBalance(newbalance);
      }
     
      setFeedback(feedback)
      setSendAmount(0)
      setRecipient("")
    } catch (ex) {
      setFeedback(ex.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type recipient address"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
      <div className="info">Feedback: {feedback}</div>
    </form>
  );
}

export default Transfer;
