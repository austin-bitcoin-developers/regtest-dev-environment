const http = require('http')
const fs = require('fs')
const os = require('os')
let host, port, user, password, nblocks, ntx

const args = process.argv.reduce((o, c) => {
  const a = c.match(/^-([^=]+)=(.+)$/)
  if (a) o[a[1]] = a[2]
  return o
}, {})

const config = fs.readFileSync(args.config || `${os.homedir()}/.bitcoin/bitcoin.conf`, 'utf8');
config.split('\n').forEach(line => {
  let rpcuser = line.match(/^\s?rpcuser\s?=\s?([^#]+)$/)
  if (rpcuser) user = rpcuser[1]
  let rpcpass = line.match(/^\s?rpcpassword\s?=\s?([^#]+)$/)
  if (rpcpass) password = rpcpass[1]
})

port = args.port || '18443'
host = args.host || '127.0.0.1'

function randInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const addrtypes = ["legacy", "p2sh-segwit", "bech32"]

let spendtimer
async function spend() {
    const amt = Math.floor((Math.random()*200000000))/100000000
    let sendto = await rpcPost({ method: 'getnewaddress', params: ["", addrtypes[randInt(3)]] })
    const newtx = await rpcPost({ method: 'sendtoaddress', params: [sendto.result, amt] })
    console.log('new tx', newtx.result, sendto.result, amt)
    if(spendtimer) clearTimeout(spendtimer)
    spendtimer = setTimeout(spend, randInt(10)*1000)
}

let minetimer
const MINE_INTERVAL = 5*60*1000
async function mine() {
    const block = await rpcPost({ method: 'generate', params: [1] })
    console.log('block mined', block.result[0])
    if(minetimer) clearTimeout(minetimer)
    minetimer = setTimeout(mine, MINE_INTERVAL)
}

setTimeout(mine, MINE_INTERVAL)

spend()

function rpcPost(payload) {
  payload.jsonrpc = "1.0"
  return new Promise(function (resolve, reject) {
    let post_req = http.request({
      host: host,
      port: port,
      path: '/',
      method: 'POST',
      headers: {
        "Content-type": "text/plain",
        "Authorization": "Basic " + Buffer.from(`${user}:${password}`, 'binary').toString('base64')
      }
    }, function (res) {
      let out = ''

      res.on('data', function (chunk) {
        out += chunk
      });

      res.on('end', () => {
        let obj = JSON.parse(out)
        resolve(obj)
      });

    });

    post_req.on('error', (err) => {
      console.log('something bad happened', err.message)
    });
    post_req.write(JSON.stringify(payload));
    post_req.end();
  });

}