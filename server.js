'use strict';
//各種モジュールの読み込み
const express = require('express');
const http = require('http');
const fs = require('fs');
const { execSync } = require('child_process');
const socketIO = require('socket.io');

//オブジェクトの作成
const app = express();
const server = http.Server(app);
const io = socketIO(server);

//ポート番号
const PORT = process.env.PORT || 1337;

//====================================
//ソケットの処理
//====================================

//ユーザーのカウント
let usercount = 0;

io.on('connection', (socket) => {
    console.log('接続されました。');
    //プロジェクト名
    let projectname = '';

    //切断したとき
    socket.on('disconnect', () => {
        console.log('接続が切断されました。');
        if (projectname) {
            //ユーザーカウントを減らす
            usercount--;
            //ログを作成。
            const log = {
                distroname: projectname
            };
            //それをクライアントに送信
            io.emit('dicrease user', log);
        }
    });
    //ディストリビューションを作成するイベントが起きた時
    socket.on('create distro', (projectname_) => {
        console.log('ユーザーが、新しいディストリビューションを作成しようとしています。');
        //コネクションごとにプロジェクトネームを設定
        projectname = projectname_;

        //ユーザー数の更新
        usercount++;

        //インターネットからダウンロード
        //現時点では、まだ同時実行不可能。

        //スクリプトの実行
        //これを消すと作動しなくなるため注意
        /* execSync('sudo bash -c "./factory.sh"', (err, stdout, stderr) => {
            if (err) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            location.href = 'public/finish.html';
        }); */
    });
});
//====================================
//サーバーの処理
//====================================

// 公開フォルダの指定
app.use(express.static(__dirname + '/public'));

server.listen(PORT, () => {
    console.log('サーバー稼働中...')
});