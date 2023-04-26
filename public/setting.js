const socket = io();
document.getElementById('distroname').addEventListener('submit', (e)=>{
    e.preventDefault();
    //DistroNameの取得
    const distroname = document.getElementById('distro');
    const value = distroname.value;
    console.log(value);
});