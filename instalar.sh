#!/bin/bash
# Definindo cores
NOCOLOR='\033[0m'
RED='\033[0;31m'
GREEN='\033[0;32m'
ORANGE='\033[0;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
PLTREMTGRAY='\033[0;37m'
DARKGRAY='\033[1;30m'
PLTREMTGREEN='\033[1;32m'
YELLOW='\033[1;33m'
PLTREMTRED='\033[1;34m'
PLTREMTPURPLE='\033[1;35m'
PLTREMTCYAN='\033[1;36m'
WHITE='\033[1;37m'

clear
sleep 2
echo  "${GREEN}Agora estarei iniciando o processo de instalação...${NOCOLOR}"
sleep 3
clear
sleep 2

echo  "${GREEN}\nAperte em ok,depois marque a 3° ou 1° caixinha"
sleep 2
clear
sleep 2
termux-change-repo
clear
sleep 2

echo  "${GREEN}\nAgora faz a permissão para o termux acessar os teus arquivos"
sleep 2
clear
sleep 2
termux-setup-storage
clear
sleep 2
echo  "${RED}AGORA VOCÊ ESTARÁ SENDO HACKEADO HAHAHA${NOCOLOR}"
sleep 2
echo  "${GREEN}Brincadeira 😜"
sleep 2
echo "Terminando o processo de instalação kk${NOCOLOR}"
sleep 2
clear

echo  "${GREEN}\nEstarei Executando: pkg install git"
sleep 2
clear
sleep 2
pkg install git
clear
sleep 2

echo  "${GREEN}\nEstarei Executando: pkg upgrade -y"
sleep 2
clear
sleep 2
pkg upgrade -y
clear
sleep 1

echo  "${GREEN}\nEstarei Executando: pkg update -y"
sleep 2
clear
sleep 2
pkg update -y
clear
sleep 2

echo  "${GREEN}\nEstarei Executando: pkg install nodejs -y"
sleep 2
clear
sleep 2
pkg install nodejs -y
clear
sleep 3

echo  "${GREEN}\nEstarei Executando: pkg install ffmpeg -y para o bot poder fazer figurinhas.."
sleep 2
clear
sleep 2
pkg install ffmpeg -y
clear
sleep 2

echo  "${GREEN}\nEstarei Executando: pkg install nodejs-lts -y"
sleep 2
clear
sleep 2
pkg install nodejs-lts -y
clear
sleep 4
clear

echo  "${GREEN}$nome, terminei o processo de instalação...${NOCOLOR}"
sleep 2

echo  "${GREEN}Ei! não se esqueça,Pedrozz_Mods Domina😎${NOCOLOR}"

sleep 2
echo  "${GREEN}Agora estarei iniciando o bot${NOCOLOR}"

sh start.sh