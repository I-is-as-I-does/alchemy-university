
const {toHex} = require("ethereum-cryptography/utils");
const secp = require("ethereum-cryptography/secp256k1");
const {getMsgHash }= require('../utils')

//@doc
// $ node sign-msg.js {private key}

async function getSignature(privKey){
    const hash = await getMsgHash(true)
    const sign = await secp.sign(hash, privKey, {recovered:true});
        return {signature:toHex(sign[0]), recovery:sign[1]}
}

getSignature(process.argv[2]).then(sign => console.log(sign))
