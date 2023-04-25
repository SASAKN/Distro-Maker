#!/bin/bash
#==========Step2 ベースに変更を加える。
#ファイルシステムのマウント
sudo mount --bind /dev chroot/dev
sudo mount --bind /run chroot/run

#スクリプト実行
cd ${script_dir}
sudo chroot chroot bash /root/chroot.sh

#マウントを解除
sudo umount chroot/dev
sudo umount chroot/run
#Step2 終了