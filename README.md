# Bitcoin Regtest Environment

### Install Bitcoin Core

If you don't have the Bitcoin Core software installed on your computer, you can install it [here](https://bitcoin.org/en/download).

### Run 3 Regtest Nodes

In 3 separate terminal windows

* `bitcoind -regtest`
* `bash alice/run.sh`
* `bash bob/run.sh`


### Install btc-debug

This project is a little easier to use than `bitcoin-cli`. If you'd like, install it:

`git clone https://github.com/rsbondi/btc-debug`

* Follow the README.md
* npm start -- -port=9334
 
