//必要なパッケージの読み込み
let http = require('http');
let express = require('express');
const socketIO = require('socket.io');
let { execSync } = require('child_process');
//オブジェクトの作成
const app = express();
const server = http.Server( app );
const io = socketIO( server );

//----------------------------------------------------------
//ここからソケットの処理
//----------------------------------------------------------


//ソケット用のサーバーを起動。
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
app.use( express.static( __dirname + '/public' ) );
server.listen(1337, 'localhost');
//APIをルーティングで作れば簡単に通信できる。