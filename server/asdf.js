import https from "https";
import httpProxy from "http-proxy";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cert = fs.readFileSync(__dirname + "/../certificates/localhost.crt");
const key = fs.readFileSync(__dirname + "/../certificates/localhost.key");

const options = {
  target: "http://localhost:3001",
  ws: true,
  ssl: {
    key,
    cert,
  },
};

const proxy = new httpProxy.createProxyServer(options);

const customServer = https
  .createServer(options.ssl, function (req, res) {
    proxy.web(req, res);
  })
  .listen(3000, "127.0.0.1");

customServer.on("upgrade", function (req, socket, head) {
  proxy.ws(req, socket, head);
});
