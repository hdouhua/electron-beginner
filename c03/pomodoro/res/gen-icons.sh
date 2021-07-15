# !/bin/env/bash
#
# requiresite:
#   ImageMagick
#
# ./gen-icons.sh icon.png
#

[ -d icons.iconset ] && rm -rf icons.iconset
mkdir icons.iconset

sips -z 16 16 $1 --out icons.iconset/icon_16x16.png
sips -z 32 32 $1 --out icons.iconset/icon_16x16@2x.png
sips -z 32 32 $1 --out icons.iconset/icon_32x32.png
sips -z 64 64 $1 --out icons.iconset/icon_32x32@2x.png
sips -z 64 64 $1 --out icons.iconset/icon_64x64.png
sips -z 128 128 $1 --out icons.iconset/icon_64x64@2x.png
sips -z 128 128 $1 --out icons.iconset/icon_128x128.png
sips -z 256 256 $1 --out icons.iconset/icon_128x128@2x.png
sips -z 256 256 $1 --out icons.iconset/icon_256x256.png
sips -z 512 512 $1 --out icons.iconset/icon_256x256@2x.png
sips -z 512 512 $1 --out icons.iconset/icon_512x512.png
sips -z 1024 1024 $1 --out icons.iconset/icon_512x512@2x.png
sips -z 1024 1024 $1 --out icons.iconset/icon_1024x1024.png
sips -z 2048 2048 $1 --out icons.iconset/icon_1024x1024@2x.png

iconutil -c icns -o icon.icns icons.iconset

magick -background none $1 -resize 256x256 icon.ico
