'use strict'

const inherits = require('util').inherits
const HookedWalletSofTxSubprovider = require('web3-provider-engine/subproviders/hooked-wallet-softx')

module.exports = WalletSubprovider

inherits(WalletSubprovider, HookedWalletSofTxSubprovider)

function WalletSubprovider (wallet, opts) {
  opts = opts || {}

  opts.getAccounts = function (cb) {
    cb(null, [ wallet.getAddressString() ])
  }

  opts.getPrivateKey = function (address, cb) {
    if (address !== wallet.getAddressString()) {
      cb(new Error('Account not found'))
    } else {
      cb(null, wallet.getPrivateKey())
    }
  }

  WalletSubprovider.super_.call(this, opts)
}
