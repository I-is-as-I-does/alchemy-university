
const {toHex} = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const secp = require('ethereum-cryptography/secp256k1')

function getAddress(publicKey, inHex = false) {
    var a = publicKey.slice(1)
    a = keccak256(a)
    a = a.slice(-20)
    if(inHex){
        a = '0x'+toHex(a)
    }
    return a
}

async function getMsgHash(inHex = false, msg = 'I authorize this transaction'){
    var msgHash = await secp.utils.sha256(msg);
    if(inHex){
       toHex(msgHash)
    }
    return msgHash
}


module.exports = {getMsgHash, getAddress}