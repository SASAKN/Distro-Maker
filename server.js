//必要なパッケージの読み込み
let http = require('http');
let fs = require('fs');
//サーバー作成
let server = http.createServer();
//リクエストを受信した時
server.on('request', function (req, res) {
    let filename = '';
    if (req.url === '/') {
        filename = 'index.html';
    }
    //ファイル読み込み
    fs.readFile(__dirname + '/' + filename, 'utf-8', function (err, data) {
        //エラー
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.write('404 Page Not Found!');
            return res.end();
        }
        //成功時
        res.writeHead(200,{'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    });
});
server.listen(1337, 'localhost');