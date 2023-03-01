const secp = require("ethereum-cryptography/secp256k1");
const {toHex} = require("ethereum-cryptography/utils");
const {getAddress} = require("../utils");

function getKeys(){
    const private = secp.utils.randomPrivateKey()
    const public = secp.getPublicKey(private)
    const k = {}
    k.private = toHex(private)
    k.public = toHex(public)
    k.address = getAddress(public, true)
    return k
}

console.log(getKeys())