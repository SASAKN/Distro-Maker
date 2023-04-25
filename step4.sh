#!/bin/bash
#Step 4
#OSを圧縮
sudo mksquashfs chroot image/casper/filesystem.squashfs

#filesystem.sizeの作成
printf $(sudo du -sx --block-size=1 chroot | cut -f1) >image/casper/filesystem.size

#インストールファイル作成
cd ${script_dir}
cat <<EOF >image/README.diskdefines
#define DISKNAME  ${os_name}
#define TYPE  binary
#define TYPEbinary  1
#define ARCH  amd64
#define ARCHamd64  1
#define DISKNUM  1
#define DISKNUM1  1
#define TOTALNUM  0
#define TOTALNUM0  1
EOF
#終了