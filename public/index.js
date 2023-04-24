var socket = io();
var distroname = document.getElementById('distro').value;
//SOcket.ioの利用について。
//SOcket.ioは、「clean」、「create」「connect」、「remove」「login」、「logout」を用意する。
document.getElementById('submit').addEventListener('click', function(e){
    e.preventDefault();
    socket.emit('create', distroname);
    distroname = '';
   // location.href = './404.html';
});
socket.on('disconnect', ()=>{
    socket.emit('logout');
});