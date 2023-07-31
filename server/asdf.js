var https = require('https'),
    httpProxy = require('http-proxy'),
    fs = require('fs');

const cert = fs.readFileSync(__dirname + '/../certificates/localhost.crt');
const key = fs.readFileSync(__dirname + '/../certificates/localhost.key');

const options = {
  target: "http://localhost:3001",
  ws: true,
  ssl: {
    key,
    cert,
  },
};

const proxy = new httpProxy.createProxyServer(options);

const customServer = https.createServer(options.ssl, function(req, res) {
  proxy.web(req, res)
})
.listen(3000, '127.0.0.1');

customServer.on('upgrade', function (req, socket, head) {
  proxy.ws(req, socket, head)
});