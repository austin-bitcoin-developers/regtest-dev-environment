# Bitcoin Regtest Environment

### Install Bitcoin Core

If you don't have the Bitcoin Core software installed on your computer, you can install it [here](https://bitcoin.org/en/download).

### Run 3 Regtest Nodes

This script runs 3 regtest nodes

`bash run.sh`


### Command Sequence

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
