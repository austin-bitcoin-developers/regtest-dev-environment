# Bitcoin Regtest Environment

### Install Bitcoin Core

If you don't have the Bitcoin Core software installed on your computer, you can install it [here](https://bitcoin.org/en/download).

Remember to add bitcoind and bitcoin-cli to your path. If you don't know how, raise your hand.

### Run 3 Regtest Nodes

This script runs 3 regtest nodes

`bash run.sh`


### Command Sequence

##### Balances

(as regtest)

Just the three of us?

`getpeerinfo`

How much money do we have?

`getbalance`

Looks like we're broke. Anyone know why?

Have there been any blocks mined? Without blocks we're all broke!

`getblockchaininfo`

Notice that the height is 0. This means we need to mine some blocks. In regtest we can mine without POW:

`generate 1`

Now we're rich -- 50 bitcoins!

`getbalance`

Still 0. What happened? In bitcoin we have a 100 block maturity time for newly mined coinbase transactions ([explanation](https://en.bitcoin.it/wiki/Block_chain)

Let's mine 100 more -- giving us 1 mature transaction

`generate 100`

Are we rich yet?

`getbalance`

Yes, we are rich!

##### Transactions

We ran 3 nodes. The default regtest node now has 50 bitcoins, but Alice and Bob are still broke. In fact, they don't even have bitcoin addresses yet.

To run bitcoin-cli commands _as alice_, you can `source aliases.sh`, which will create `alice-cli` and `bob-cli` terminal aliases that run `bitcoin-cli` commands with the correct parameters for Bob and Alice.

`alice-cli getbalance`

FIXME: finish

### Install btc-debug

This project is a little easier to use than `bitcoin-cli`. If you'd like, install it:

`git clone https://github.com/rsbondi/btc-debug`

* Follow the README.md

Run 3 windows
* npm start -- -port=9332
* npm start -- -port=9333
* npm start -- -port=9334

FIXME:
* npm start -- -port=9332
* npm start -- -port=9333 -name=alice
* npm start -- -port=9334 -name=bob
