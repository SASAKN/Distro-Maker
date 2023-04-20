//クライアントのソケットの処理
const socket = io.connect();
socket.on('connect', () => {
        console.log('接続しました。');
});
function createdistro(){
    console.log('Distro Maker のサーバーのソケットに接続しました。');
    
    socket.emit( 'create distro',  );
}

