'use strict';
//各種モジュールの読み込み
const express = require('express');
const http = require('http');
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
    console.log('connection');
    //プロジェクト名
    let projectname = '';

    //切断したとき
    socket.on('disconnect', () => {
        console.log('接続が切断されました。');
    });
});