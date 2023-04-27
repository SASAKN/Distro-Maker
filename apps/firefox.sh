wget https://download.mozilla.org/?product=firefox-latest-ssl&os=linux64&lang=ja&_gl=1*19cx649*_ga*MjU4MDIwOTMwLjE2NjA3MjI0Njg.*_ga_MQ7767QQQW*MTY2MTQ2ODY5OS4yLjEuMTY2MTQ2ODcxNC4wLjAuMA..
tar xvf firefox-*.tar.bz2
mv firefox /opt
ln -s /opt/firefox/firefox /usr/local/bin/firefox
wget https://raw.githubusercontent.com/mozilla/sumo-kb/main/install-firefox-linux/firefox.desktop -P /usr/local/share/applications