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


//====================================
//サーバーの処理
//====================================
// 公開フォルダの指定
app.use(express.static(__dirname + '/public'));

server.listen(PORT, () => {
    console.log('サーバー稼働中...')
});