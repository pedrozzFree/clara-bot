/*
Projeto: Clara Base
Data: 05/03/25
Criador: PedrozzMods
Descrição: Um projeto para pessoas que estão começando a fazer bots
*/
//============( CONSTS NESCESSÁRIAS )===========\\
const fs = require('fs')
const chalk = require('chalk')
const moment = require('moment-timezone');
const axios = require('axios');
const fetch = require('node-fetch');
const os = require('os');
const speed = require('performance-now');
const cfonts = require('cfonts');
const request = require('request');
const { exec, spawn, execSync } = require('child_process');
const { prefixo, botName, donoName, fotoM } = require('./config.json')
const botVersion = "2.0.5"

//============( MENSAGENS RAPIDAS )===========\\
const msg = {
  espere: "*𝙰𝚐𝚞𝚎𝚗𝚝𝚊 𝚊𝚒, 𝙸𝚛𝚞𝚖𝚒𝚗𝚑𝚊! 𝙴𝚜𝚝𝚘𝚞 𝚏𝚊𝚣𝚎𝚗𝚍𝚘 𝚖𝚘𝚗𝚝𝚎 𝚍𝚎 𝚌𝚘𝚒𝚜𝚊𝚜 𝚊𝚘 𝚖𝚎𝚜𝚖𝚘 𝚝𝚎𝚖𝚙𝚘!*",
  dono: "*𝙴𝚒𝚒𝚒 𝚟𝚘𝚌𝚎 𝚗𝚊𝚘 𝚎 𝚘 𝙸𝚛𝚞𝚖𝚒𝚗𝚑𝚊, 𝚜𝚊𝚒 𝚜𝚊𝚒*",
  grupo: "*𝙾𝚋𝚊! 𝚄𝚖 𝚐𝚛𝚞𝚙𝚘! 𝙸𝚛𝚞𝚖𝚒𝚗𝚑𝚊, 𝚟𝚊𝚖𝚘𝚜 𝚊𝚙𝚛𝚘𝚟𝚎𝚒𝚝𝚊𝚛 𝚎 𝚏𝚊𝚣𝚎𝚛 𝚍𝚊𝚗ç𝚊𝚜 𝚖𝚊𝚐𝚒𝚌𝚊𝚜!!*",
  premium: "*𝙾𝚑! 𝚀𝚞𝚎𝚖 𝚜𝚊𝚋𝚎 𝚏𝚒𝚌𝚊𝚗𝚍𝚘 𝙿𝚛𝚎𝚖𝚒𝚞𝚖 𝚟𝚘𝚌𝚎̂ 𝚐𝚊𝚗𝚑𝚎 𝚖𝚊𝚒𝚜 𝚌𝚘𝚖𝚒𝚍𝚊? 𝙴𝚞 𝚝𝚎𝚗𝚝𝚊𝚛𝚒𝚊!*",
  query: "*𝙷𝚖𝚖... 𝙸𝚛𝚞𝚖𝚒𝚗𝚑𝚊, 𝚎𝚜𝚌𝚘𝚗𝚍𝚎𝚞 𝚘𝚚𝚞𝚎 𝚍𝚎𝚟𝚒𝚊 𝚎𝚜𝚌𝚛𝚎𝚟𝚎𝚛! 𝙿𝚛𝚘𝚟𝚊 𝚍𝚎 𝚗𝚘𝚟𝚘, 𝚘𝚔?*",
  privado: "*𝙴𝚑? 𝙸𝚜𝚜𝚘 𝚜ó 𝚏𝚞𝚗𝚌𝚒𝚘𝚗𝚊 𝚎𝚖 𝚙𝚛𝚒𝚟𝚊𝚍𝚘?🤔 𝙴𝚗𝚝ã𝚘 𝚖𝚎 𝚎𝚗𝚟𝚒𝚊 𝚞𝚖𝚊 𝚖𝚎𝚗𝚜𝚊𝚐𝚎𝚖, 𝙸𝚛𝚞𝚖𝚒𝚗𝚑𝚊!*",
  adm: "*𝙲𝚘𝚖𝚘 𝚊𝚜𝚜𝚒𝚖 𝚜ó 𝚊𝚍𝚖𝚒𝚗𝚜? 𝙸𝚛𝚞𝚖𝚒𝚗𝚑𝚊, 𝚏𝚊𝚣 𝚍𝚎 𝚖𝚒𝚖 𝚞𝚖𝚊 𝚊𝚍𝚖 𝚖𝚊𝚐𝚒𝚒𝚘𝚜𝚊!!*",
  error: "*𝙰𝚒 𝚖𝚎𝚞 𝚍𝚎𝚖𝚘𝚗𝚒𝚘 😱! 𝙰𝚌𝚘𝚗𝚝𝚎𝚌𝚎𝚞 𝚞𝚖 𝚎𝚛𝚛𝚘! 𝙼𝚊𝚜 𝚗ã𝚘 𝚜𝚎 𝚙𝚛𝚎𝚘𝚌𝚞𝚙𝚎, 𝚎𝚞 𝚜𝚘𝚞 𝚍𝚎𝚖𝚘̂𝚗𝚒𝚘 𝚍𝚊 𝚏𝚞𝚗𝚎𝚜𝚝𝚛𝚞𝚎𝚍𝚊! 𝚃𝚎𝚗𝚝𝚎 𝚍𝚎 𝚗𝚘𝚟𝚘!*",
  botadm: "*𝙴𝚞 𝚙𝚛𝚎𝚌𝚒𝚜𝚘 𝚜𝚎𝚛 𝚊𝚍𝚖? 𝙾𝚋𝚊! 𝙸𝚛𝚞𝚖𝚒𝚗𝚑𝚊, 𝚖𝚎 𝚏𝚊𝚣 𝚊𝚍𝚖 𝚋𝚎𝚖 𝚛á𝚙𝚒𝚍𝚘!*"
};

//============( MENSAGENS DA API )===========\\
const msgApi = {
erro: "Desculpe, ocorreu um erro ao processar sua solicitação.",
paraQ: "Parece que falta um parâmetro obrigatório na sua solicitação.",
esperar: "Aguarde um momento enquanto processamos sua solicitação..."
}

//============( MENSAGENS DA CLARA )===========\\
const msgClara = [
  "Iruminha, me dá atenção!!",
  "Iruminhaaaaaaaa!",
  "Você quer um docinho?",
  "Eu trouxe um monte de doces! Vamos dividir!",
  "Hehehe, eu sou a melhor amiga do Iruminha!",
  "Pew pew pew! Magia especial da Clara!!",
  "Eu vou fazer algo incrível! Olha só!",
  "Se tiver brincadeira, eu tô dentro!",
  "Iruminha, você não pode me ignorar!",
  "Alis-chan, vamos brincar juntas com o Iruminha?",
  "Eu sou cheia de energia! Sempre pronta pra ação!",
  "Vamos fazer um show super divertido!",
  "Quer ver um truque incrível? Tcharam!",
  "Corre, corre, corre! Vamos brincar!",
  "Eu sou a rainha das brincadeiras!",
  "Magia surpresa! Você nunca sabe o que vai acontecer!",
  "Se tiver diversão, a Clara tá lá!",
  "Quem precisa de lógica quando se tem imaginação?",
  "Eu posso pegar qualquer coisa do meu bolso mágico!",
  "Iruminha, me ajuda a pensar em algo divertido!",
  "Alis-chan, você tem que sorrir mais!",
  "Que tal um jogo super doido? Eu invento as regras!",
  "Eu sou a chefe do Clube da Diversão!",
  "Vamos transformar a escola inteira em um parque de diversões!",
  "Eu tenho uma ideia GENIAL... só preciso lembrar qual era!",
  "Iruminha, vamos fazer um teatro musical agora!",
  "Olha só, uma dança nova! *gira sem parar*",
  "Magia mágica claríssima, apareçaaa!",
  "Se eu correr muito rápido, será que viro um foguete?",
  "Aposto que ninguém tem um bolso mágico tão legal quanto o meu!",
  "Iruminha, me segura, tô muito animada!!!",
  "Por que andar se a gente pode PULAR?",
  "Eu poderia ficar parada, mas isso é muito chato!",
  "Vamos brincar de esconde-esconde! Eu me escondo, e você tenta me achar... Boa sorte!",
  "Alis-chan, Iruminha, fiquem comigo pra sempre, tá?",
  "Se eu bater palmas bem rápido, será que faço um tornado?",
  "Eu tive uma ideia... Mas esqueci de novo!",
  "Eu nunca fico sem energia! É impossível!",
  "Comida grátis? EU TO DENTRO!",
  "Se eu pudesse, comeria doce no café da manhã, almoço e jantar!",
  "Iruminha, se eu desaparecesse, você sentiria minha falta, né?",
  "Eu sou a melhor no jogo de quem fala mais rápido!",
  "Eu sou um raio de energia infinita!",
  "Se a diversão fosse um esporte, eu seria campeã mundial!",
  "Não precisa de motivo pra ser feliz, só precisa de diversão!"
];
//============( DATA E HORA )===========\\
const data = moment.tz('America/Sao_Paulo').format('DD/MM/YYYY');
const hora = moment.tz('America/Sao_Paulo').format('HH:mm:ss');

//============( MENSAGEM DE HORA )===========\\
if(hora > "00:00:00"){
var timed = 'Boa Madrugada 🌆' 
} 
if(hora > "05:30:00"){
var timed = 'Bom Dia 🏙️' 
}
if(hora > "12:00:00"){
var timed = 'Boa Tarde 🌇' 
}
if(hora > "19:00:00"){
var timed = 'Boa Noite 🌃' 
}           

//============( BANNER TERMINAL )===========\\
//CORES DO CONSOLE
var corzinhas = ["red", "green", "yellow", "blue", "magenta", "cyan", "white"]
const cor1 = corzinhas[Math.floor(Math.random() * (corzinhas.length))]	
const cor2 = corzinhas[Math.floor(Math.random() * (corzinhas.length))]
const cor3 = corzinhas[Math.floor(Math.random() * (corzinhas.length))]	
const cor4 = corzinhas[Math.floor(Math.random() * (corzinhas.length))]
const cor13 = corzinhas[Math.floor(Math.random() * (corzinhas.length))]	

const banner = cfonts.render("Clara Base", {
  font: 'tiny',
  align: 'center',
  colors: ['whiteBright', 'redBright']
});
const banner2 = cfonts.render((`${timed}`), {
font: 'console',
align: "center",
gradient: [`${cor3}`, `${cor4}`]
});                
const banner3 = cfonts.render((`©2025 Copyright by Pedrozz_Mods`), {
font: 'console',
align: 'center',
gradient: ['red', 'magenta']
});

//============( PING )===========\\
const cpuUsage = (os.loadavg()[0]).toFixed(2);
const totalThreads = os.cpus().length;
const totalMemory = (os.totalmem() / Math.pow(1024, 3)).toFixed(2);
const freeMemory = (os.freemem() / Math.pow(1024, 3)).toFixed(2);
const nodeVersion = process.version;
const platform = os.platform();
const hostname = os.hostname();
let HostOuNao;
if (hostname === "localhost") {
HostOuNao = "Termux"
} else {
HostOuNao = "Hospedagem paga"
}

function formatTime(seconds) {
const days = Math.floor(seconds / (3600 * 24));
const hours = Math.floor((seconds % (3600 * 24)) / 3600);
const minutes = Math.floor((seconds % 3600) / 60);
const secs = Math.floor(seconds % 60);
return `${days}d ${hours}h ${minutes}m ${secs}s`;
}

const uptime = process.uptime();

let timestamp = speed();
let latensi = speed() - timestamp;
const velocidadeBot = latensi.toFixed(4);

//============( CONSOLES )===========\\
//VERDE
const consoleVerde = (texto) => {console.log(chalk.green(texto))}
const consoleVerde2 = (texto, texto2) => {console.log(chalk.black(chalk.bgGreen(texto)), chalk.black(chalk.white(texto2)))}
//VERMELHO
const consoleVermelho = (texto) => {console.log(chalk.red(texto))}
const consoleVermelho2 = (texto, texto2) => {console.log(chalk.black(chalk.bgRed(texto)), chalk.black(chalk.white(texto2)))}
//AMARELO
const consoleAmarelo = (texto) => {console.log(chalk.yellow(texto))}
const consoleAmarelo2 = (texto, texto2) => {console.log(chalk.black(chalk.bgYellow(texto)), chalk.black(chalk.white(texto2)))}
//AZUL
const consoleAzul = (texto) => {console.log(chalk.blue(texto))}
const consoleAzul2 = (texto, texto2) => {console.log(chalk.black(chalk.bgBlue(texto)), chalk.black(chalk.white(texto2)))}
//CONSOLE DE ERRO
const consoleErro = (texto) => {console.log(chalk.black(chalk.bgRed(`[ ERRO ]`)), chalk.black(chalk.white(`Erro: ${texto}`)))}
//CONSOLE DE AVISO
//CONSOLE DE ERRO
const consoleInfo = (texto) => {console.log(chalk.black(chalk.bgBlue(`[ INFO ]`)), chalk.black(chalk.white(texto)))}
//CONSOLE DE AVISO
const consoleAviso = (texto) => {console.log(chalk.black(chalk.bgYellow(`[ AVISO ]`)), chalk.black(chalk.white(texto)))}
//CONSOLE DE SUCESSO
const consoleSucesso = (texto) => {console.log(chalk.black(chalk.bgGreen(`[ SUCESSO ]`)), chalk.black(chalk.white(texto)))}
//CONSOLE DE ONLINE 
const consoleOnline = (texto) => {console.log(chalk.black(chalk.bgGreen(`[ ONLINE ]`)), chalk.black(chalk.white(texto)))}

//============( GETBUFFER )===========\\
const getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (err) {
		return err
	}
}

//============( FETCHJSON )===========\\
async function fetchJson (url, options) {
    try {
        options ? options : {}
        const res = await axios({
            method: 'GET',
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            },
            ...options
        })
        return res.data
    } catch (err) {
        return err
    }
}

//============( SELOS )===========\\
//personalizado 
const selo = {key: {fromMe: false, participant: '0@s.whatsapp.net'}, message: { "extendedTextMessage": {"text": `Bot: ${botName}\nDono: ${donoName}\nVersao: ${botVersion}`,"title": null,'thumbnailUrl': null}}}
//pedrozz Mods
const seloCriador = {"key": {"participant": "556199317165@s.whatsapp.net","remoteJid": "status@broadcast", "fromMe": false,},"message": {
"contactMessage": {
"displayName": "Pedrozz Mods", "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:;Chat GPT;;;\nFN:Pedrozz Mods\nitem1.TEL;waid=556199317165:556199317165\nitem1.X-ABLabel:Celular\nEND:VCARD`, "contextInfo": {"forwardingScore": 1,"isForwarded": true}}}};
//ais
const seloGpt = {"key": {"participant": "18002428478@s.whatsapp.net","remoteJid": "status@broadcast", "fromMe": false,},"message": {
"contactMessage": {
"displayName": "Chat GPT", "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:;Chat GPT;;;\nFN:Chat GPT\nitem1.TEL;waid=18002428478:18002428478\nitem1.X-ABLabel:Celular\nEND:VCARD`, "contextInfo": {"forwardingScore": 1,"isForwarded": true}}}};

//Pedrozz mods
const seloMeta = {"key": {"participant": "13135550002@s.whatsapp.net","remoteJid": "status@broadcast", "fromMe": false,},"message": {
"contactMessage": {
"displayName": "Meta IA", "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:;Chat GPT;;;\nFN:Meta IA\nitem1.TEL;waid=13135550002:13135550002\nitem1.X-ABLabel:Celular\nEND:VCARD`, "contextInfo": {"forwardingScore": 1,"isForwarded": true}}}};

//Pedrozz mods
const seloLuzia = {"key": {"participant": "5511972553036@s.whatsapp.net","remoteJid": "status@broadcast", "fromMe": false,},"message": {
"contactMessage": {
"displayName": "LuzIA", "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:;Chat GPT;;;\nFN:LuzIA\nitem1.TEL;waid=5511972553036:5511972553036\nitem1.X-ABLabel:Celular\nEND:VCARD`, "contextInfo": {"forwardingScore": 1,"isForwarded": true}}}};

//Pedrozz mods
const seloLaura = {"key": {"participant": "556191969269@s.whatsapp.net","remoteJid": "status@broadcast", "fromMe": false,},"message": {
"contactMessage": {
"displayName": "Laura AI", "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:;Laura AI;;;\nFN:Laura AI\nitem1.TEL;waid=556191969269:556191969269\nitem1.X-ABLabel:Celular\nEND:VCARD`, "contextInfo": {"forwardingScore": 1,"isForwarded": true}}}};

//Pedrozz Mods 
const seloCopilot = {"key": {"participant": "18772241042@s.whatsapp.net","remoteJid": "status@broadcast", "fromMe": false,},"message": {
"contactMessage": {
"displayName": "Microsoft Copilot", "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:;Microsoft Copilot;;;\nFN:Microsoft Copilot\nitem1.TEL;waid=18772241042:18772241042\nitem1.X-ABLabel:Celular\nEND:VCARD`, "contextInfo": {"forwardingScore": 1,"isForwarded": true}}}};
//bancos
const seloNubank = {"key": {"participant": "551150390444@s.whatsapp.net","remoteJid": "status@broadcast", "fromMe": false,},"message": {
"contactMessage": {
"displayName": "Nubank", "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:;Nubank;;;\nFN:Nubank\nitem1.TEL;waid=551150390444:551150390444\nitem1.X-ABLabel:Celular\nEND:VCARD`, "contextInfo": {"forwardingScore": 1,"isForwarded": true}}}};
const seloBb = {"key": {"participant": "556140040001@s.whatsapp.net","remoteJid": "status@broadcast", "fromMe": false,},"message": {
"contactMessage": {
"displayName": "Banco do Brasil", "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:;Banco Do Brasil;;;\nFN:Banco do Brasil\nitem1.TEL;waid=556140040001:556140040001\nitem1.X-ABLabel:Celular\nEND:VCARD`, "contextInfo": {"forwardingScore": 1,"isForwarded": true}}}};
const seloBradesco = {"key": {"participant": "551133350237@s.whatsapp.net","remoteJid": "status@broadcast", "fromMe": false,},"message": {
"contactMessage": {
"displayName": "Bradesco", "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:;Bradesco;;;\nFN:Bradesco\nitem1.TEL;waid=551133350237:551133350237\nitem1.X-ABLabel:Celular\nEND:VCARD`, "contextInfo": {"forwardingScore": 1,"isForwarded": true}}}};
const seloSantander = {"key": {"participant": "551140043535@s.whatsapp.net","remoteJid": "status@broadcast", "fromMe": false,},"message": {
"contactMessage": {
"displayName": "Santander", "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:;Santander;;;\nFN:Santander\nitem1.TEL;waid=551140043535:551140043535\nitem1.X-ABLabel:Celular\nEND:VCARD`, "contextInfo": {"forwardingScore": 1,"isForwarded": true}}}};
const seloItau = {"key": {"participant": "551140044828@s.whatsapp.net","remoteJid": "status@broadcast", "fromMe": false,},"message": {
"contactMessage": {
"displayName": "Itaú", "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:;Itaú;;;\nFN:Itaú\nitem1.TEL;waid=551140044828:551140044828\nitem1.X-ABLabel:Celular\nEND:VCARD`, "contextInfo": {"forwardingScore": 1,"isForwarded": true}}}};

module.exports = { botVersion, msg, msgClara, msgApi, consoleVerde, consoleVerde2, consoleVermelho, consoleVermelho2, consoleAmarelo, consoleAmarelo2, consoleAzul, consoleAzul2, consoleErro, consoleAviso, consoleInfo, consoleOnline, consoleSucesso, fetchJson, getBuffer, timed, data, hora, selo, seloCriador, seloMeta, seloGpt, seloLuzia, seloLaura, seloCopilot, seloNubank, seloBb, seloBradesco, seloSantander, seloItau, cpuUsage, totalThreads, totalMemory, freeMemory, nodeVersion, platform, hostname, HostOuNao, formatTime, uptime, velocidadeBot, latensi, timestamp, os, speed, banner, banner2, banner3 }