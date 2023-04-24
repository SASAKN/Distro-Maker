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
//関数
//Linuxでの実行方法
function linuxrun() {
    execSync('sudo bash -c "./factory.sh"', (err, stdout, stderr) => {
        if (err) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        location.href = 'public/finish.html';
    });
}
function runerorr() {
    //エラー発生。
    location.href = 'public/404.html';
}
//ポート番号
const PORT = process.env.PORT || 1337;

//====================================
//ソケットの処理
//====================================
let usercount = 0;
io.on('connection', function (socket) {
    console.log('1台の接続');
    socket.on('create', function (distro) {
        usercount++;
        //次、インターネットからダウンロードを実装するために必要。
        const distrofolder = distro + usercount;
        //DIstroMakerは、Factoryを実行します。
        //クロスプラットフォーム
        switch (process.platform) {
            case 'linux':
                linuxrun();
                break;
            case 'darwin':
                runerorr();
                console.log('Mac OS 12にまだ対応していません。');
                break;
            case 'win32':
                runerorr();
                console.log('Windowsにまだ対応していません。');
                break;
            default:
                runerorr();
                break;
        };
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