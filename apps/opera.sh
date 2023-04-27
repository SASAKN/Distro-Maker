apt update
apt install wget -y
wget -qO- https://deb.opera.com/archive.key | apt-key add - 
echo deb https://deb.opera.com/opera-stable/ stable non-free | tee /etc/apt/sources.list.d/opera.list 
apt update
apt install oprera-stable