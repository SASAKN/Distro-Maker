# Distro-Maker
A Easy Linux distro Build Tool.  
今は、「localhost:1337/api」で、Linuxでのみ作成することができます。
Dockerコンテナーも用意していますのでお待ちください。
まだこれはベータ版のためこれを実行したことによってPCが破壊される恐れがあるため、気軽に実行しないでください。(VM推奨)
# How to Run?
`
git clone https://github.com/SASAKN/Distro-Maker.git

sudo chmod 775 ./factory.sh 

sudo apt install nodejs npm 

sudo node ./server.js

open localhost:1337/api 
`