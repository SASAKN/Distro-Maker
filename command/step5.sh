#/bin/bash
#Step 5
#UEFI GRUB image 作成
cd ${script_dir}/image
grub-mkstandalone \
   --format=x86_64-efi \
   --output=isolinux/bootx64.efi \
   --locales="" \
   --fonts="" \
   "boot/grub/grub.cfg=isolinux/grub.cfg"

#FAT16 UEFI image 作成
(
   cd isolinux &&
      dd if=/dev/zero of=efiboot.img bs=1M count=10 &&
      sudo mkfs.vfat efiboot.img &&
      LC_CTYPE=C mmd -i efiboot.img efi efi/boot &&
      LC_CTYPE=C mcopy -i efiboot.img ./bootx64.efi ::efi/boot/
)

#BIOS用イメージ作成
grub-mkstandalone \
   --format=i386-pc \
   --output=isolinux/core.img \
   --install-modules="linux16 linux normal iso9660 biosdisk memdisk search tar ls" \
   --modules="linux16 linux normal iso9660 biosdisk search" \
   --locales="" \
   --fonts="" \
   "boot/grub/grub.cfg=isolinux/grub.cfg"

#cdboot.img作成
cd ${script_dir}/image
cat /usr/lib/grub/i386-pc/cdboot.img isolinux/core.img >isolinux/bios.img

#md5sumCheck!
cd ${script_dir}/image
sudo /bin/bash -c "(find . -type f -print0 | xargs -0 md5sum | grep -v -e 'md5sum.txt' -e 'bios.img' -e 'efiboot.img' > md5sum.txt)"

#ISO作成
sudo xorriso \
   -as mkisofs \
   -iso-level 3 \
   -full-iso9660-filenames \
   -volid "${os_name}" \
   -output "../out/factory.iso" \
   -eltorito-boot boot/grub/bios.img \
   -no-emul-boot \
   -boot-load-size 4 \
   -boot-info-table \
   --eltorito-catalog boot/grub/boot.cat \
   --grub2-boot-info \
   --grub2-mbr /usr/lib/grub/i386-pc/boot_hybrid.img \
   -eltorito-alt-boot \
   -e EFI/efiboot.img \
   -no-emul-boot \
   -append_partition 2 0xef isolinux/efiboot.img \
   -m "isolinux/efiboot.img" \
   -m "isolinux/bios.img" \
   -graft-points \
   "/EFI/efiboot.img=isolinux/efiboot.img" \
   "/boot/grub/bios.img=isolinux/bios.img" \
   "."

#終わり