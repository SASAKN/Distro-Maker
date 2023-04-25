#!/bin/bash

#=====Step1 ベースの作成。

script_dir="$(dirname "$(readlink -f "$0")")"
source ${script_dir}/config.sh
cd ${script_dir}
mkdir image
mkdir out
mkdir chroot
source ${script_dir}/deps.sh
cd ${script_dir}
sudo debootstrap \
   --arch=$os_arch \
   --variant=minbase \
   $os_codename \
   chroot \
   $os_repository

sudo cp -a ${script_dir}/setting/${setting_name}/file/ ${script_dir}/chroot/root/file/
sudo cp -a ${script_dir}/setting/${setting_name}/copyfs/ ${script_dir}/chroot/root/copyfs/
sudo cp ${script_dir}/setting/${setting_name}/chroot.sh ${script_dir}/chroot/root/chroot.sh
sudo cp ${script_dir}/setting/${setting_name}/final.sh ${script_dir}/chroot/root/final.sh
sudo cp ${script_dir}/setting/${setting_name}/deps.list ${script_dir}/chroot/root/deps.list
sudo cp ${script_dir}/setting/${setting_name}/package.list ${script_dir}/chroot/root/package.list
sudo cp ${script_dir}/setting/${setting_name}/debconf.config ${script_dir}/chroot/root/debconf.config
sudo cp ${script_dir}/config.sh ${script_dir}/chroot/root/config.sh

#Distro Makerでの通信がされます。