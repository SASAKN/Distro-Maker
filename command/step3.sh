#!/bin/bash
#Step3
#ディレクトリーの作成
cd ${script_dir}
mkdir -p image/{casper,isolinux,install}

#カーネルイメージのコピー
sudo cp chroot/boot/vmlinuz-**-**-generic image/casper/vmlinuz
sudo cp chroot/boot/initrd.img-**-**-generic image/casper/initrd

#Grubの設定
cd ${script_dir}
touch image/ubuntu

#Grub.cfgを書く
cat <<EOF > image/isolinux/grub.cfg

search --set=root --file /ubuntu

insmod all_video

set default="0"
set timeout=30

menuentry "${os_label1}" {
   linux /casper/vmlinuz boot=casper maybe-ubiquity quiet splash ---
   initrd /casper/initrd
}

menuentry "${os_label2}" {
   linux /casper/vmlinuz boot=casper only-ubiquity ---
   initrd /casper/initrd
}

menuentry "${os_label3}" {
   linux /casper/vmlinuz boot=casper integrity-check quiet splash ---
   initrd /casper/initrd
}

menuentry "${os_label4}" {
   linux16 /install/memtest86+
}

menuentry "${os_label5}" {
   insmod part_gpt
   insmod search_fs_uuid
   insmod chain
   loopback loop /install/memtest86
   chainloader (loop,gpt1)/efi/boot/BOOTX64.efi
}
EOF

#マニフェスト作成
cd ${script_dir}
sudo chroot chroot dpkg-query -W --showformat='${Package} ${Version}\n' | sudo tee image/casper/filesystem.manifest
sudo cp -v ${script_dir}/image/casper/filesystem.manifest image/casper/filesystem.manifest-desktop
for package in $remove_package; do
   sudo sed -i "/$package/d" image/casper/filesystem.manifest-desktop
done
#Step3 終了