bitcoin-qt -regtest &
bitcoin-qt -regtest -rpcconnect=9334 -datadir=./alice &
bitcoin-qt -regtest -rpcconnect=9333 -datadir=./bob &