pip3 install pyserial 
pip3 install intelhex
pip3 install python-magic
wget {{sonoff_zb_dongle_url}}
unzip {{donglezipfile}}
cd {{donglezipfile}}
./cc2538-bsl.py -p /dev/ttyUSB0 -e -v -w --bootloader-sonoff-usb ~/{{donglezipfile}}.hex