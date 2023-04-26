var socket = io();
const distroname = document.getElementById('distro');
//SOcket.ioの利用について。
//SOcket.ioは、「clean」、「create」「connect」、「remove」「login」、「logout」を用意する。
document.getElementById('submit').addEventListener('click', function(e){
    e.preventDefault();
    socket.emit('create', distroname.value);
    value = '';
   // location.href = './404.html';
});
socket.on('wait', ()=>{
    //待つ処理。
});