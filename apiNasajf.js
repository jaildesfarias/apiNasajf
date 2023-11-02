const https = require('https');
const http = require('http');
const url = require('url');

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    const queryObject = url.parse(req.url, true).query;
    const catalogParam = queryObject.catalog || '';
     
    const apiUrl = 'https://epic.gsfc.nasa.gov/archive/natural/2015/10/31/png/epic_1b_20151031074844.png';

    https.get(apiUrl, (resp) => {
        let dados = '';

        resp.on('data', (chunk) => {
            dados += chunk;
        });
        
        resp.on('end', () => {
            res.write('<img src="' + apiUrl + '" alt="Imagem da NASA">');
            res.end();
        });
        
    }).on("error", (err) => {
        console.log("Error: " + err.message);
        res.end('Erro ao fazer a requisição');
    });
    
}).listen(8081)

console.log('Servidor rodando em http://localhost:8081');
