# Bitcoin Regtest Environment

Video of presentation can be found [here](https://www.youtube.com/watch?v=sbupEpL6-J4&feature=youtu.be).

Transcript of presentation can be found [here](http://diyhpl.us/wiki/transcripts/austin-bitcoin-developers/2018-08-17-richard-bondi-bitcoin-cli-regtest/).

Note: instead of 'generate', use 'generatetoaddress'

For more discussion of regtest and how it compares to the proposed signet see [here](http://diyhpl.us/wiki/transcripts/bitcoin-core-dev-tech/2019-06-07-signet/) and [here](https://bitcoin.stackexchange.com/questions/89640/what-are-the-key-differences-between-regtest-and-the-proposed-signet).

### Introduction

The goal of this presentation is to set up a development environment, where you can run multiple nodes
in a simulated environment without having to sync to testnet.  We will set up 3 nodes and experiment
with the cli/rpc commands to send transactions between nodes and analyze the makeup of a transaction.

### Install Bitcoin Core

If you don't have the Bitcoin Core software installed on your computer, you can install it [here](https://bitcoin.org/en/download).

Remember to add bitcoind and bitcoin-cli to your path. If you don't know how, raise your hand.

### Run 3 Regtest Nodes

This script runs 3 regtest nodes

`bash run.sh`


### Command Sequence

##### Balances

(as regtest, preceed following commands with `bitcoin-cli -regtest`)

Just the three of us?

`getpeerinfo`

How much money do we have?

`getbalance`

Looks like we're broke. Anyone know why?

Have there been any blocks mined? Without blocks we're all broke!

`getblockchaininfo`

First, we need to grab an address from someone to mine to:

`getnewaddress`

Notice that the height is 0. This means we need to mine some blocks. In regtest we can mine without POW:

`generatetoaddress 1 <address generated above>`

Now we're rich -- 50 bitcoins!

`getbalance`

Still 0. What happened? In bitcoin we have a 100 block maturity time for newly mined coinbase transactions ([explanation](https://en.bitcoin.it/wiki/Block_chain)

Let's mine 100 more (to any address in our network) -- giving us 1 mature transaction

`generatetoaddress 100 <address>`

Are we rich yet?

`getbalance`

Yes, we are rich!

##### Transactions

We ran 3 nodes. The default regtest node now has 50 bitcoins, but Alice and Bob are still broke. In fact, they don't even have bitcoin addresses yet.

To run bitcoin-cli commands _as alice_, you can `source aliases.sh`, which will create `alice-cli` and `bob-cli` terminal aliases that run `bitcoin-cli` commands with the correct parameters for Bob and Alice.

`alice-cli getbalance`

Alice is broke as expected

`alice-cli getnewaddress`

Let's send Alice some coin

`bitcoin-cli -regtest sendtoaddress  <alice's address from above> 1`

`alice-cli getbalance`

Alice is still broke

`alice-cli listunspent 0` 

The 0 is for minimum confirmations, now we see Alice's transaction as unconfirmed, it will show in her balance once a block is mined.

Exercise: send a transaction from Alice to Bob and verify that Bob has received

### Additional Topics

makeup of a transaction

run `simulate.js` and show how it is useful

create, sign and send raw transactions

create, sign and send multisig transaction

### Install nodes-debug(optional)

This project is a little easier to use than `bitcoin-cli`. If you'd like, install it:

`git clone https://github.com/rsbondi/nodes-debug.git`

##### Run the app

`cd nodes-debug`

`npm run dev`

or follow the readme to build and run the binary

### Optionally using bitcoin-qt

Assuming bitcoin-qt is in your path and you are in the project directory with no instances running

`./qt.sh`

### Optionally simulate

`node simulate.js` will randomly create transaction and mine on default regtest node.  This will give more of a real world feel with mempool transactions and blocks getting automatically mined.  Be sure that before running you mine enough on the default node with the `generate` command so it will have money to spend

### Additional resources

[Learning-Bitcoin-from-the-Command-Line](https://github.com/ChristopherA/Learning-Bitcoin-from-the-Command-Line)
This is a good hardcore deep dive into the CLI

[A Map of the Bitcoin Core RPC API across Versions](https://masonicboom.github.io/btcrpcapi/)
A nice tabular view of all the RPC commands and the history of changes, showing deprecation, removal and addition of commands per version.
