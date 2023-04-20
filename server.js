//必要なパッケージの読み込み
let http = require('http');
let fs = require('fs');
const socket = require('socket.io');
let { execSync } = require('child_process');

//----------------------------------------------------------
//ここからソケットの処理
//----------------------------------------------------------


//ソケット用のサーバーを起動。
const io = socket(server);
let usercount = 0; //ユーザー数
//ソケットのコネクションを作成。
io.on('connection', (socket) => {
    console.log('クライアントが、接続されました');
    let projectname = ''; //コネクションに対するプロジェクト名
    //接続解除の処理
    socket.on('disconnect', () => {
        console.log('クライアントが減りました。');
        //ユーザー数を減らす
        usercount--;
        //システムログを作成
        let log = {
            user: usercount
        };
        //クライアントに、システムメッセージを送信。
        io.emit('decrease user', log);
    });
    socket.on('create distro', (distroname_) => {
        console.log('ディストリビューションの設定が新規作成されました。');
        //コネクションごとにDistroMakerのディストリビューション名を作成。
        projectname = distroname_;
        //ユーザー数を増やす
        usercount++;
        //プロジェクトが作成されたことを示すログを作成。
        let log = {
            //ディストリビューションの名前
            distroname: projectname
        };
        //クライアントに、ディストリビューションの名前を送信
        io.emit('create project', log);
    });
});

//----------------------------------------------------------
//ここからサーバーの処理
//----------------------------------------------------------

//URLを取得して、ファイル形式に合わせた表示を行う
function typeget(_url) {
    //このサーバーで扱えるファイル形式
    var types = {
        ".html": "text/html",
        ".css": "text/css",
        ".js": "text/javascript",
        ".png": "image/png",
        ".gif": "image/gif",
        ".svg": "svg+xml"
    };
    //タイプから見つけ出す
    for (var type in types) {
        if (_url.endsWith(type)) {
            return types[type];
        }
    }
    //もしそれになければプレーンテキストとして表示
    return 'text/plain';
}
//リクエストを受信した時
var server = http.createServer(function (req, res) {
    //リクエストが、/で終わるならば、index.htmlをつける、そうでなければURLを表示。
    var url = 'public' + (req.url.endsWith('/') ? req.url + 'index.html' : req.url);
    //URLを表示
    console.log(url);
    //指定されたURLのファイルがあるのであれば
    if (fs.existsSync(url)) {
        //ファイルを読み込み、エラーとデータの変数に分ける。
        fs.readFile(url, (err, data) => {
            //エラーでなければ
            if (!err) {
                //正常に通信できたということを伝える。
                res.writeHead(200, { 'Content-Type': typeget(url) });
                res.end(data);
                //ルーティングAPI呼び出し
            } else if (url === 'public/api') {
                res.writeHead(200, { 'Content-Type': typeget(url) });
                res.end(data);
                //DistroMakerのコア
                execSync('sudo bash -c "./factory.sh"', (err, stdout, stderr) => {
                    if (err) {
                        console.log(`stderr: ${stderr}`);
                        return;
                    }
                    console.log(`stdout: ${stdout}`);
                    location.href = '../finish.html';
                });
            } else {
                res.statusCode = 500;
                res.end();
            }
        });
    } else {
        res.statusCode = 404;
        res.end();
    }
});
server.listen(1337, 'localhost');
//APIをルーティングで作れば簡単に通信できる。