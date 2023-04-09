//DistroMaker 0.01
var {exec} = require('child_process');
exec('pwd', (err, stdout, stderr) => {
    if(err) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});