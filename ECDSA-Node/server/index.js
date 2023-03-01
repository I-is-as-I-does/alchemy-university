const secp = require('ethereum-cryptography/secp256k1')
const { getAddress, getMsgHash } = require('./utils')

const express = require('express')
const app = express()
const cors = require('cors')
const port = 3042

app.use(cors())
app.use(express.json())

const balances = {
  '0x7c7cd3422e271779bec277171c39559e5df600d5': 100,
  '0xfdf08933847023af25001a965a7afbb671228da8': 50,
  '0xdfd87f7ab220a3aa86e309affc5ebe1a11c89253': 75,
}

const FAIL = { address: '', balance: 0, status: 'unauthorized transaction' }

app.post('/check', (req, res) => {
  const { signature, recovery } = req.body
  checkSignedMsg(signature, recovery).then((response) => {
    res.status(200).send(response)
  })
})

app.post('/send', (req, res) => {
  const { signature, recovery, recipient, amount } = req.body

  checkSignedMsg(signature, recovery).then((response) => {
    if (response.address) {
      var ret = {feedback: '', newbalance: -1}

      if (recipient === response.address) {
        ret.feedback = 'recipient must differ from sender'
      } else if (!balances[recipient]) {
        ret.feedback = 'unknown recipient'
      } else if (response.balance < amount) {
        ret.feedback = 'not enough funds'
      } else {
        balances[response.address] -= amount
        balances[recipient] += amount
        ret.newbalance = balances[response.address]
        ret.feedback = `${amount} eth sent to ${recipient}`
      }
    }
    res.status(200).send(ret)
  })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
})

async function checkSignedMsg(signature, recovery) {

 

  try {
  const msgHash = await getMsgHash()
  const pubKey = secp.recoverPublicKey(msgHash, signature, Number.parseInt(recovery))
  
  if (secp.verify(signature, msgHash, pubKey)) {
    const address = getAddress(pubKey, true)
    if (balances.hasOwnProperty(address)) {
      return { address, balance: balances[address], status: 'verified' }
    }
  }
  return FAIL 
} catch {
  return FAIL
}
}
