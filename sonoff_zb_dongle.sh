pip3 install pyserial 
pip3 install intelhex
pip3 install python-magic
wget https://raw.githubusercontent.com/Koenkk/Z-Stack-firmware/master/coordinator/Z-Stack_3.x.0/bin/CC1352P2_CC2652P_launchpad_coordinator_20220219.zip
unzip CC1352P2_CC2652P_launchpad_coordinator_20220219.zip
cd CC1352P2_CC2652P_launchpad_coordinator_20220219.zip
./cc2538-bsl.py -p /dev/ttyUSB0 -e -v -w --bootloader-sonoff-usb ~/CC1352P2_CC2652P_launchpad_coordinator_20220219.hex