const http = require('http')

const server = http.createServer((req, res) => {
    const funcName = req.url.replace("/", "");
    res.end(`${funcName}('hello')`);
});

server.listen(3000)