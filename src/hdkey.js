const HDKey = require('hdkey')
const Wallet = require('./index.js')

function SophonHDKey () {
}

/*
 * Horrible wrapping.
 */
function fromHDKey (hdkey) {
  var ret = new SophonHDKey()
  ret._hdkey = hdkey
  return ret
}

SophonHDKey.fromMasterSeed = function (seedBuffer) {
  return fromHDKey(HDKey.fromMasterSeed(seedBuffer))
}

SophonHDKey.fromExtendedKey = function (base58key) {
  return fromHDKey(HDKey.fromExtendedKey(base58key))
}

SophonHDKey.prototype.privateExtendedKey = function () {
  if (!this._hdkey.privateExtendedKey) {
    throw new Error('This is a public key only wallet')
  }
  return this._hdkey.privateExtendedKey
}

SophonHDKey.prototype.publicExtendedKey = function () {
  return this._hdkey.publicExtendedKey
}

SophonHDKey.prototype.derivePath = function (path) {
  return fromHDKey(this._hdkey.derive(path))
}

SophonHDKey.prototype.deriveChild = function (index) {
  return fromHDKey(this._hdkey.deriveChild(index))
}

SophonHDKey.prototype.getWallet = function () {
  if (this._hdkey._privateKey) {
    return Wallet.fromPrivateKey(this._hdkey._privateKey)
  } else {
    return Wallet.fromPublicKey(this._hdkey._publicKey, true)
  }
}

module.exports = SophonHDKey
