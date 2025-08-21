/*
Projeto: Clara Base
Data: 05/03/25
Criador: PedrozzMods
Descrição: Um projeto para pessoas que estão começando a fazer bots
*/
const { prefixo, botName, donoName, numeroDono, fotoM, BaseApiDark, BaseApiSpeed, BaseApiMoon, Speed_Apikey, MoonKey, DARK_USERNAME, DARK_APIKEY, emoji, isBotao } = require('./dono/config.json')

//★・・・・・・★・・・ BAILEYS ・・・★・・・・・・★
const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, makeInMemoryStore, DisconnectReason, makeCacheableSignalKeyStore, PHONENUMBER_MCC, delay, prepareWAMessageMedia, downloadContentFromMessage } = require('baileys-mod')
const baileys = require('baileys-mod');

const fs = require('fs');
const pino = require('pino');
const Pino = pino;
const axios = require('axios');
const path = require("path");
const chalk = require('chalk')
const cfonts = require('cfonts');
const color = (text, color) => { return !color ? chalk.green(text) : chalk.keyword(color)(text) };
const request = require('request');
const { exec, spawn, execSync } = require('child_process');

const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./clara/js/lib/exif')
const { imageToWebp2, videoToWebp2, writeExifImg2, writeExifVid2 } = require('./clara/js/lib/exif2')

//PARA CONEXÃO DO NÚMERO 
const PhoneNumber = require('awesome-phonenumber')
let phoneNumber = "557792142954"
const pairingCode = !!phoneNumber || process.argv.includes("--pairing-code")
const useMobile = process.argv.includes("--mobile")
const readline = require("readline")
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))
const NodeCache = require("node-cache")
//★・・・・・・★・・・ CONSTS ・・・★・・・・・・★

const { menu, menuAdm, menuDono, menuJogos } = require('./dono/menus.js');
const { botVersion, msg, msgClara, msgApi, consoleVerde, consoleVerde2, consoleVermelho, consoleVermelho2, consoleAmarelo, consoleAmarelo2, consoleAzul, consoleAzul2, consoleErro, consoleAviso, consoleInfo, consoleOnline, consoleSucesso, fetchJson, getBuffer, timed, data, hora, selo, seloCriador, seloMeta, seloGpt, seloLuzia, seloLaura, seloCopilot, seloNubank, seloBb, seloBradesco, seloSantander, seloItau, cpuUsage, totalThreads, totalMemory, freeMemory, nodeVersion, platform, hostname, HostOuNao, formatTime, uptime, velocidadeBot, latensi, timestamp, os, speed, banner, banner2, banner3 } = require('./dono/dodo.js')
//
//★・・・・・・★・・・ JONES ・・・★・・・・・・★
const prefix = prefixo;

const totalCmd = "176";
const fotomenu = "./clara/imagem/menu.png";
var mojirandon = ["🍥", "🍓", "🧸", "♥️", "🍒", "🧁", "🍉"]
const moji = mojirandon[Math.floor(Math.random() * (mojirandon.length))]	

// ★・・・・・・★・・・ INÍCIO ・・・★・・・・・・★
async function iniciarJogosClara() {
const store = makeInMemoryStore({ logger: pino().child({ level: 'debug', stream: 'store' }) });
const { state, saveCreds } = await useMultiFileAuthState('./dono/clara-conexao');
const { version } = await fetchLatestBaileysVersion();
const msgRetryCounterCache = new NodeCache()

//★・・・・・・★・・・ CONEXÃO ・・・★・・・・・・★
const clara = makeWASocket({
 version,
 auth: {
creds: state.creds,
keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' })),
 },
 logger: pino({ level: 'silent' }),
 printQRInTerminal: !process.argv.includes("--code"),
 mobile: false,
 browser: ['Ubuntu','Edge','125.0.0.0'],
 generateHighQualityLinkPreview: true,
 msgRetryCounterCache,
 connectTimeoutMs: 60000,
 defaultQueryTimeoutMs: 0,
 keepAliveIntervalMs: 20000,
 patchMessageBeforeSending: (message) => {
const requiresPatch = !!(message.buttonsMessage || message.templateMessage || message.listMessage);
if (requiresPatch) {
  message = {
 viewOnceMessage: {
message: {
  messageContextInfo: {
 deviceListMetadataVersion: 2,
 deviceListMetadata: {},
  },
  ...message,
},
 },
  };
}
return message;
 },
  });

//======CONEXÃO POR CODE=========\\
if (!clara.authState.creds.registered) {
  console.clear();
  console.log(chalk.red('\n═══════════════════════════════════════════════════════'));
  console.log(chalk.bgRed.white(' INÍCIO DO EMPARELHAMENTO '));
  console.log(chalk.red('═══════════════════════════════════════════════════════\n'));

  rl.question(chalk.hex('#ff0044')('📱  Número do bot: '), async (phoneNumber) => {
 if (!phoneNumber) {
console.log('\nNenhum número inserido. conexão cancelada.');
rl.close();
process.exit(1);
 }

 const NumeroLimpo = phoneNumber.replace(/[^0-9]/g, '');
 console.log('\nChamando o código...');
 let code = await clara.requestPairingCode(NumeroLimpo);
code = code?.match(/.{1,4}/g)?.join("-") || code;
 console.log(chalk.green('\nCódigo de emparelhamento: ') + chalk.bold.white(code));
 rl.close();
  });
}

///==========BOT========//
const sock = clara;
const client = clara;
const laura = clara;

clara.ev.on('creds.update', saveCreds);
clara.ev.on('chats.set', () => consoleSucesso('✔️ Conversas carregadas.'));
clara.ev.on('contacts.set', () => consoleSucesso('✔️ Contatos carregados.'));

clara.ev.on('group-participants.update', async (bemVindo) => {
try {
const { id, action } = bemVindo;
const from = id;
const isGroup = from.endsWith('@g.us');
const groupMetadata = isGroup ? await clara.groupMetadata(from): ""
const groupName = isGroup  ? groupMetadata.subject: ""
const sender = bemVindo.participants[0];
const PastaDeGrupos2 = `./clara/json/grupos/ativos/${from}.json`
const ArquivosDosGrupos2 = isGroup ? JSON.parse(fs.readFileSync(PastaDeGrupos2)) : undefined;
const BemVindoAcao = isGroup ? ArquivosDosGrupos2[0].bemVindo[0] : undefined;

if (BemVindoAcao.ativo) {
if (action === "add") {
textin = BemVindoAcao.entrou
.replace('%numero%', sender.split('@')[0])
.replace('%nomeGrupo%', groupName)
imagem = `${BaseApiDark}/api/canva/bem-vindo2?titulo=${groupName}&avatar=https://files.catbox.moe/u48f99.jpg&fundo=https://files.catbox.moe/5yf152.jpg&nome=${sender.split('@')[0]}&desc=Seja%20bem-vindo%20usu%C3%A1rio&apikey=${DARK_APIKEY}`
clara.sendMessage(from, {image: {url: imagem}, caption: textin})
} else if (action === "remove"){
textin = BemVindoAcao.entrou
.replace('%numero%', sender.split('@')[0])
.replace('%nomeGrupo%', groupName)
imagem = `${BaseApiDark}/api/canva/bem-vindo2?titulo=${groupName}&avatar=https://files.catbox.moe/u48f99.jpg&fundo=https://files.catbox.moe/5yf152.jpg&nome=${sender.split('@')[0]}&desc=Até mais usuário 👋&apikey=${DARK_APIKEY}`
clara.sendMessage(from, {image: {url: imagem}, caption: textin})
}

}//
} catch (e) {
consoleErro(e)
}
})

const getFileBuffer = async (mediakey, MediaType) => {
const stream = await downloadContentFromMessage(mediakey, MediaType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
return buffer
}
let statusReset = { executado: false, id: null };

async function inicial() {
try {
    if (fs.existsSync('status.json')) {
        statusReset = JSON.parse(fs.readFileSync('status.json', 'utf8'));
    }
} catch (err) {
}
if (statusReset.executado && statusReset.id) {
try {
await clara.sendMessage(statusReset.id, {text: "𝙵𝚞𝚒 𝚛𝚎𝚒𝚗𝚒𝚌𝚒𝚊𝚍𝚊 𝚌𝚘𝚖 𝚜𝚞𝚌𝚎𝚜𝚜𝚘 𝚎 𝚓𝚊 𝚝𝚘𝚞 𝚙𝚛𝚘𝚗𝚝𝚊 𝚙𝚊𝚛𝚊 𝚘 𝚜𝚎𝚛𝚟𝚒𝚌𝚘 😋"});
fs.unlinkSync("status.json")
} catch (err) {
console.error("Erro ao enviar mensagem pós-reset:", err);
}
}
}
//★・・・・・・★・・・ COMEÇO ・・・★・・・・・・★
clara.ev.on('messages.upsert', async (slaMeuNobre) => {
try {
const msgBotPadrao = slaMeuNobre.messages[0];
const from = msgBotPadrao.key.remoteJid;
const info = slaMeuNobre.messages[0];
const key = { remoteJid: info.key.remoteJid,id: info.key.id, participant: info.key.participant };
//PARA VIZUALIZAR AS MENSAGENS ENVIADAS AO BOT
verMsg = false;
if(verMsg) {
await moon.readMessages([info.key]);
} else {
if(from == "status@broadcast") return;
}
const type = baileys.getContentType(info.message);
//★・・・・・・★・・・ BODY ・・・★・・・・・・★

const body = type === "conversation" ? info.message.conversation : type === "viewOnceMessageV2" ? info.message.viewOnceMessageV2.message.imageMessage ? info.message.viewOnceMessageV2.message.imageMessage.caption : info.message.viewOnceMessageV2.message.videoMessage.caption : type === "imageMessage" ? info.message.imageMessage.caption : type === "videoMessage" ? info.message.videoMessage.caption : type === "extendedTextMessage" ? info.message.extendedTextMessage.text : type === "viewOnceMessage" ? info.message.viewOnceMessage.message.videoMessage ? info.message.viewOnceMessage.message.videoMessage.caption : info.message.viewOnceMessage.message.imageMessage.caption : type === "documentWithCaptionMessage" ? info.message.documentWithCaptionMessage.message.documentMessage.caption : type === "buttonsMessage" ? info.message.buttonsMessage.imageMessage.caption : type === "buttonsResponseMessage" ? info.message.buttonsResponseMessage.selectedButtonId : type === "listResponseMessage" ? info.message.listResponseMessage.singleSelectReply.selectedRowId : type === "templateButtonReplyMessage" ? info.message.templateButtonReplyMessage.selectedId : type === "groupInviteMessage" ? info.message.groupInviteMessage.caption : type === "pollCreationMessageV3" ? info.message.pollCreationMessageV3 : type === "interactiveResponseMessage" ? JSON.parse(info.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id : type === "text" ? info.text : ""

function getGroupAdmins(participants) {
admins = []
for (let i of participants) {
if(i.admin == 'admin') admins.push(i.id)
if(i.admin == 'superadmin') admins.push(i.id)
}
return admins
}
//★・・・・・・★・・・ PRINCP CONST ・・・★・・・・・・★
if (!msgBotPadrao.message) return;
const dono = `${numeroDono}@s.whatsapp.net`
const isGroup = from.endsWith('@g.us');
const groupMetadata = isGroup ? await clara.groupMetadata(from): ""
const participants = isGroup ? await groupMetadata.participants : ''
const groupName = isGroup  ? groupMetadata.subject: ""
const groupDesc = isGroup ? groupMetadata.desc : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const sender = msgBotPadrao.key.participant || from;
const content = msgBotPadrao.message.conversation || msgBotPadrao.message.extendedTextMessage?.text || '';
const removerMaiusculas = (texto) => texto.toLowerCase();
const isCmd = content.startsWith(prefixo)
const cmd = isCmd ? content.slice(1).trim().split(/ +/).shift().toLocaleLowerCase() : null
const comando = cmd;
const botz = msgBotPadrao.key.fromMe;
const types = Object.keys(msgBotPadrao.message)[0];
const pushname = info.pushName ? info.pushName : ""
const numeroBot = clara.user.id.split(":")[0]+"@s.whatsapp.net"
const clarinha = numeroBot.replace("@s.whatsapp.net", "");
const args = content.trim().split(/ +/).slice(1);
const q = args.join(' ')
const isDono = dono.includes(sender);
const isGroupAdmins = groupAdmins.includes(sender) || false
const isAdm = groupAdmins.includes(sender) || false  
const isBotGroupAdmins = groupAdmins.includes(numeroBot) || false

// FUNÇÕES DE MARCAÇÕES \\
const menc_prt = info.message?.extendedTextMessage?.contextInfo?.participant
const menc_jid = args?.join(" ").replace("@", "") + "@s.whatsapp.net"
const menc_jid2 = info.message?.extendedTextMessage?.contextInfo?.mentionedJid
const sender_ou_n = q.includes("@") ? menc_jid : sender
const menc_os2 = q.includes("@") ? menc_jid : menc_prt 
//★・・・・・・★・・・ CONST/FUNC ・・・★・・・・・・★
var texto_exato = (type === 'conversation') ? info.message.conversation : (type === 'extendedTextMessage') ? info.message.extendedTextMessage.text : ''
const texto = texto_exato.slice(0).trim().split(/ +/).shift().toLowerCase()

//SIMULA ESCRITA
async function escrever (texto) {
await clara.sendPresenceUpdate('composing', from) 
await esperar(1000)   
clara.sendMessage(from, { text: texto }, {quoted: info})
}
//ENVIA UMA MENSAGEM 
const enviar = (texto) => {
clara.sendMessage(from, { text: texto }, {quoted: info})
}
//ENVIA UMA IMAGEM SIMPLES 
const enviarImg = async (link) => {
await clara.sendMessage(from, {image: {url: link}}, {quoted: info})
}
//ENVIA UMA IMAGEM COM TEXTO 
const enviarImg2 = async (link, texto) => {
await clara.sendMessage(from, {image: {url: link}, caption: texto}, {quoted: info})
}
//ENVIA UM VÍDEO SIMPLES 
const enviarVd = async (link) => {
await clara.sendMessage(from, {video: {url: link }, mimetype: "video/mp4", fileName: "video.mp4"}, {quoted: info})
}
//ENVIA UM VIDEO COM TEXTO
const enviarVd2 = async (link, texto) => {
await clara.sendMessage(from, {video: {url: link }, caption: texto, mimetype: "video/mp4", fileName: "video.mp4"}, {quoted: info})
}
//ENVIA UM ÁUDIO
const enviarAd = async (link) => {
await clara.sendMessage(from, {audio: {url: link }, mimetype: "audio/mpeg"}, {quoted: info})
}
//CAUSA UM DELAY ENTRE FUNÇÃO 
const esperar = async (tempo) => {
return new Promise(funcao => setTimeout(funcao, tempo));
}
//REAGE A UMA MENSAGEM
const reagir = (reassao) => {
clara.sendMessage(from, {react: {text: reassao, key: info.key}})}

const claraMsgRandom = `${msgClara[Math.floor(Math.random() * msgClara.length)]}`

//===========BOTOES==========//
async function botaoNormal(laura, id, texto, link, botoes) {
var fotin = await prepareWAMessageMedia({ image: {url: link} }, { upload: clara.waUploadToServer })
await await clara.relayMessage(
id,{ interactiveMessage: { header: { title: "", subtitle: '', hasMediaAttachment: true, imageMessage: fotin.imageMessage
},body: { text: texto },
footer : { "text": `𝗢𝗳𝗲𝗿𝗲𝗰𝗶𝗺𝗲𝗻𝘁𝗼: ${botName}` },
nativeFlowMessage: {
buttons: botoes.map(botao => ( { name: "quick_reply", buttonParamsJson: JSON.stringify({ display_text: botao.display_text, id: botao.id })} )),
},messageParamsJson: "", },},{});
}

async function botaoLista(laura, id, texto, url, titulo, titulo2, rows){
const fotin = await prepareWAMessageMedia( { image: { url: url } }, { upload: clara.waUploadToServer } );
const msgLista = { interactiveMessage: { header: { title: "", subtitle: '', hasMediaAttachment: true, imageMessage: fotin.imageMessage }, body: { text: texto }, footer: { text: `𝗢𝗳𝗲𝗿𝗲𝗰𝗶𝗺𝗲𝗻𝘁𝗼: ${botName}` }, nativeFlowMessage: { buttons: [{ name: "single_select", buttonParamsJson: JSON.stringify({ title: titulo, sections: [{ title: titulo2, rows }]})}],messageParamsJson: ""}}};
await clara.relayMessage(id, msgLista, {});
}

async function botaoUrl(laura, id, foto, titulo, botoes) {
const fotin = await prepareWAMessageMedia({ image: { url: foto } },{ upload: clara.waUploadToServer });
await clara.relayMessage(id, { interactiveMessage: { header: { hasMediaAttachment: true, imageMessage: fotin.imageMessage }, body: { text: titulo }, footer: { text: `𝗢𝗳𝗲𝗿𝗲𝗰𝗶𝗺𝗲𝗻𝘁𝗼: ${botName}` }, nativeFlowMessage: { buttons: botoes.map(botao => ({ name: "cta_url", buttonParamsJson: JSON.stringify({ display_text: botao.name, url: botao.url, merchant_url: botao.url }) })) }, messageParamsJson: "" } }, {});
}

async function botaoCopia(laura, id, foto, titulo, botoes) {
const fotin = await prepareWAMessageMedia({ image: { url: foto } }, { upload: clara.waUploadToServer });
await clara.relayMessage(id, { interactiveMessage: { header: { hasMediaAttachment: true, imageMessage: fotin.imageMessage }, body: { text: titulo }, footer: { text: `𝗢𝗳𝗲𝗿𝗲𝗰𝗶𝗺𝗲𝗻𝘁𝗼: ${botName}` }, nativeFlowMessage: { buttons: botoes.map(botao => ({ name: "cta_copy", buttonParamsJson: JSON.stringify({ display_text: botao.name, id: botao.id, copy_code: botao.copy }) })) }, messageParamsJson: ""}}, {});
}

//★・・・・★・・・ CRIAÇÃO DE STICK・・・★・・・・★
const sendStickerFromUrl = async(to, url) => {
try {
var names = Date.now() / 10000;
var download = function (uri, filename, callback) {
request.head(uri, function (err, res, body) {
request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
});
};
download(url, './sticker' + names + '.png', async function () {
let filess = './sticker' + names + '.png'
let asw = './sticker' + names + '.webp'
exec(`ffmpeg -i ${filess} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 800:800 ${asw}`, (err) => {
let media = fs.readFileSync(asw)
clara.sendMessage(to, {sticker: media}, {sendEphemeral: true, contextInfo: { forwardingScore: 50, isForwarded: true}, quoted: selo})
fs.unlinkSync(filess)
fs.unlinkSync(asw)
});
});
} catch (e) {
console.log(e)
}
}

const sendImageAsSticker = async (laura, jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0);
 let buffer;
 if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options);
} else {
buffer = await imageToWebp(buff);
}

await clara.sendMessage(jid, {sticker: {url: buffer}, ...options}, {quoted})
return buffer;
};

const sendVideoAsSticker = async (laura, jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0);
 let buffer;
 if (options && (options.packname || options.author)) {
buffer = await writeExifVid(buff, options);
} else {
buffer = await videoToWebp(buff);
}

await clara.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer;
}

const sendImageAsSticker2 = async (laura, jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0);
 let buffer;
 if (options && (options.packname || options.author)) {
buffer = await writeExifImg2(buff, options);
} else {
buffer = await imageToWebp2(buff);
}

await clara.sendMessage(jid, {sticker: {url: buffer}, ...options}, {quoted})
return buffer;
};

const sendVideoAsSticker2 = async (laura, jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0);
 let buffer;
 if (options && (options.packname || options.author)) {
buffer = await writeExifVid2(buff, options);
} else {
buffer = await videoToWebp2(buff);
}

await clara.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer;
}

//DELETA ARQUIVO(O NOME JÁ DIZ KKK)
async function DLT_FL(file) {
    try { 
        fs.unlinkSync(file);
    } catch (error) {}
}
//★・・・・・・★・・・ GRUPOS ・・・★・・・・・・★
const pastinhaDosGrupos = './clara/json/grupos/ativos/';
if (!fs.existsSync(pastinhaDosGrupos)){
    fs.mkdirSync(pastinhaDosGrupos, { recursive: true });
}

const PastaDeGrupos = `${pastinhaDosGrupos}${from}.json`;
if (isGroup && !fs.existsSync(PastaDeGrupos)) {
    var datea = [{
        name: groupName, antilink: false,
        bemVindo: [{
            ativo: false,
            foto: "LINK",
            entrou: "Seja bem vindo(a) %numero%",
            saiu: "Até mais 👋 %numero%"
        }]
    }];
    fs.writeFileSync(PastaDeGrupos, JSON.stringify(datea, null, 2) + '\n');
}

const ArquivosDosGrupos = isGroup && fs.existsSync(PastaDeGrupos) 
    ? JSON.parse(fs.readFileSync(PastaDeGrupos)) 
    : undefined;

function ModificaGrupo(index) {
    fs.writeFileSync(PastaDeGrupos, JSON.stringify(index, null, 2) + '\n');
}
function setNes(index){
fs.writeFileSync(nescj, JSON.stringify(index, null, 2) + '\n')}

////★・・・・・・★・・・ CONSTS GRUPOS ・・・★・・・・・・★
const isAntiLink = isGroup ? ArquivosDosGrupos[0].antilink : undefined
const BemVindoAcao = isGroup ? ArquivosDosGrupos[0].bemVindo[0] : undefined;
const isBemVindo = isGroup ? ArquivosDosGrupos[0].bemVindo[0].ativo : undefined;
//★・・・・・・★・・・ FUNÇÕES GRUPOS・・・★・・・・・・★

if (isAntiLink) {
const UrlLinks = ["https://", "wa.me", "http://"];
for (let link of UrlLinks) {
if (content.includes(link)) {
enviar(`Links não são permitidos aqui, toma um ban sinistro kkk`)
await clara.sendMessage(from, {delete: {remoteJid: from, fromMe: false, id: info.key.id, participant: sender}})
await esperar(1000)
await clara.groupParticipantsUpdate(from, [sender], "remove")
}
}
}

//★・・・・★・・・ LOG DE MENSAGEM ・・・★・・・・★
if (!isCmd && !isGroup && !info.key.fromMe) console.log(
  color('\n┏━━━━━💌°❀•°:｡🌸｡:°•❀°💌━━━━━┓', 'lightpink'), '\n',
  color(' 💬 𝙼𝙴𝙽𝚂𝙰𝙶𝙴𝙼 𝙽𝙾 𝙿𝚅 💌', 'magenta'), '\n',
  color(' 🧸 𝑵𝒖́𝒎𝒆𝒓𝒐:', 'lightpink'), color(sender.split("@")[0], 'red'), '\n',
  color(' 🧸 𝑼𝒔𝒖𝒂́𝒓𝒊𝒐:', 'lightpink'), color(pushname, 'cyan'), '\n',
  color(' 🧸 𝑯𝒐𝒓𝒂́𝒓𝒊𝒐:', 'lightpink'), color(hora, 'cyan'), '\n',
  color(' 🧸 𝑴𝒆𝒏𝒔𝒂𝒈𝒆𝒎:', 'lightpink'), color(body, 'cyan'), '\n',
  color(' 🧸 𝐕𝐞𝐥𝐨𝐜𝐢𝐝𝐚𝐝𝐞:', 'lightpink'), color(`${latensi.toFixed(4)} s`, 'cyan'), '\n',
  color('┗━━━━━💌°❀•°:｡🌸｡:°•❀°💌━━━━━┛', 'lightpink'), '\n'
);

if (!isCmd && isGroup && !info.key.fromMe) console.log(
  color('\n┏━━━━━💬°❀•°:｡🌸｡:°•❀°💬━━━━━┓', 'lightblue'), '\n',
  color(' 💬 𝚖𝚎𝚗𝚜𝚊𝚐𝚎𝚖 𝚗𝚘 𝚐𝚛𝚞𝚙𝚘 💌', 'cyan'), '\n',
  color(' 🎀 𝑮𝒓𝒖𝒑𝒐:', 'lightblue'), color(groupName, 'cyan'), '\n',
  color(' 🎀 𝑵𝒖́𝒎𝒆𝒓𝒐:', 'lightblue'), color(sender.split("@")[0], 'red'), '\n',
  color(' 🎀 𝑼𝒔𝒖𝒂́𝒓𝒊𝒐:', 'lightblue'), color(pushname, 'cyan'), '\n',
  color(' 🎀 𝑯𝒐𝒓𝒂́𝒓𝒊𝒐:', 'lightblue'), color(hora, 'cyan'), '\n',
  color(' 🎀 𝑴𝒆𝒏𝒔𝒂𝒈𝒆𝒎:', 'lightblue'), color(body, 'cyan'), '\n',
  color(' 🎀 𝐕𝐞𝐥𝐨𝐜𝐢𝐝𝐚𝐝𝐞:', 'lightblue'), color(`${latensi.toFixed(4)} s`, 'cyan'), '\n',
  color('┗━━━━━💬°❀•°:｡🌸｡:°•❀°💬━━━━━┛', 'lightblue'), '\n'
);

if (!isGroup && isCmd) console.log(
  color('\n┏━━━━━🌷°❀•°:｡🌸｡:°•❀°🌷━━━━━┓', 'lightpink'), '\n',
  color(' 💖 𝙲𝙾𝙼𝙰𝙽𝙳𝙾 𝙽𝙾 𝙿𝚅 💌', 'magenta'), '\n',
  color(' 🧸 𝑼𝒔𝒖𝒂́𝒓𝒊𝒐:', 'lightpink'), color(pushname, 'cyan'), '\n',
  color(' 🧸 𝑵𝒖́𝒎𝒆𝒓𝒐:', 'lightpink'), color(sender.split("@")[0], 'red'), '\n',
  color(' 🧸 𝑪𝒐𝒎𝒂𝒏𝒅𝒐:', 'lightpink'), color(comando || "nenhum", 'cyan'), '\n',
  color(' 🧸 𝑯𝒐𝒓𝒂́𝒓𝒊𝒐:', 'lightpink'), color(hora, 'cyan'), '\n',
  color(' 🧸 𝐕𝐞𝐥𝐨𝐜𝐢𝐝𝐚𝐝𝐞:', 'lightpink'), color(`${latensi.toFixed(4)} s`, 'cyan'), '\n',
  color('┗━━━━━🌷°❀•°:｡🌸｡:°•❀°🌷━━━━━┛', 'lightpink'), '\n'
);

if (isCmd && isGroup) console.log(
  color('\n┏━━━━━🎀°❀•°:｡🌷｡:°•❀°🎀━━━━━┓', 'lightblue'), '\n',
  color(' 💖 𝚌𝚘𝚖𝚊𝚗𝚍𝚘 𝚗𝚘 𝚐𝚛𝚞𝚙𝚘 💌', 'cyan'), '\n',
  color(' 🎀 𝑮𝒓𝒖𝒑𝒐:', 'lightblue'), color(groupName, 'red'), '\n',
  color(' 🎀 𝑵𝒖́𝒎𝒆𝒓𝒐:', 'lightblue'), color(sender.split("@")[0], 'red'), '\n',
  color(' 🎀 𝑼𝒔𝒖𝒂́𝒓𝒊𝒐:', 'lightblue'), color(pushname, 'gold'), '\n',
  color(' 🎀 𝑪𝒐𝒎𝒂𝒏𝒅𝒐:', 'lightblue'), color(comando || "nenhum", 'gold'), '\n',
  color(' 🎀 𝑯𝒐𝒓𝒂́𝒓𝒊𝒐:', 'lightblue'), color(hora, 'gold'), '\n',
  color(' 🎀 𝐕𝐞𝐥𝐨𝐜𝐢𝐝𝐚𝐝𝐞:', 'lightblue'), color(`${latensi.toFixed(4)} s`, 'cyan'), '\n',
  color('┗━━━━━🎀°❀•°:｡🌷｡:°•❀°🎀━━━━━┛', 'lightblue'), '\n'
);

//img do usuário
async function ppimg() {
try {
slaw = await clara.profilePictureUrl(`${sender.split('@')[0]}@c.us`, 'image');
shortpc = await axios.get(`https://tinyurl.com/api-create.php?url=${slaw}`);
return shortpc.data;
} catch(e) {
return 'https://telegra.ph/file/9c472f0ed2499de52e2f5.jpg';
}
}

//★・・・・・・★・・・ COMANDOS ・・・★・・・・・・★
switch (cmd) {

case 'developer':
reagir('👩‍💻')
TextoDeveloper = `⋆⃟ۜNome: Pedrozz Mods 🧸
⋆⃟ۜCanal YT: https://www.youtube.com/@pedrozz_Mods
⋆⃟ۜInsta: https://instagram.com/pedrozz_13755
⋆⃟ۜNumero: Wa.me/556199317165
⋆⃟ۜLinguagens: Java(+/-), python, lua, nodejs.
⋆⃟ۜMais usada: nodejs`
await clara.sendMessage(from, {image: {url: "https://files.catbox.moe/h9y5k2.jpg" }, caption: TextoDeveloper}, {quoted: seloCriador})
break

case 'msg': {
if (!isDono) return enviar(msg.dono)
const mensagem = q;
if (mensagem.startsWith('{') && mensagem.endsWith('}')) {
const comando = mensagem.substring(1, mensagem.length - 1);
try {
enviar("Executando codigo...")
await esperar(1000)
const resultado = eval(comando);
} catch (erro) {
enviar(msg.error)
console.log(chalk.black(chalk.bgRed(`[ ERRO ]`)), chalk.black(chalk.white(`Erro: ${erro.message}`)))
}
} else {
enviar(`Formato inválido! Use ${prefix + comando} {comando}`);
}}

break;

//★・・・・・・★・・・ MENUS ・・・★・・・・・・★

case 'menu':
reagir(emoji)
if (isBotao) {
botaoLista(laura, from, menu(donoName, botName, prefixo, timed, data, hora, totalCmd, moji, emoji ), fotomenu, "COMANDOS", "Escolha uma opção:", [
{ header: `⋆⃟ۜ${emoji} Menu`, title: "Menu", description: "", id: `${prefix}menu`},
{ header: `⋆⃟ۜ${emoji} Menu Adm`, title: "Menuadm", description: "", id: `${prefix}menuadm`},
{ header: `⋆⃟ۜ${emoji} Menu Dono`, title: "Menudono", description: "", id: `${prefix}menudono`},
{ header: `⋆⃟ۜ${emoji} Menu Jogos`, title: "MenuJogos", description: "", id: `${prefix}menujogos`}
])
} else {
await clara.sendMessage(from, { image: {url: fotomenu}, caption: menu(donoName, botName, prefixo, timed, data, hora, totalCmd, moji, emoji ) }, {quoted: seloNubank});
}
break;

case 'menuadm':
if (!isGroup) return enviar(msg.grupo);
if (!isGroupAdmins && !isDono) return enviar(msg.adm)
reagir(emoji)
enviar("𝙲𝚊𝚕𝚖𝚊, 𝙲𝚊𝚕𝚖𝚊 𝚚𝚞𝚎 𝚟𝚘𝚌𝚎 𝚎 𝚒𝚖𝚙𝚘𝚛𝚝𝚊𝚗𝚝𝚎, 𝚝𝚘𝚖𝚎 𝚎𝚜𝚜𝚎 𝚖𝚎𝚗𝚞 𝚊𝚚𝚞𝚒 𝚑𝚎𝚑𝚎")
if (isBotao) {
botaoLista(laura, from, menuAdm(donoName, botName, prefixo, timed, data, hora, totalCmd, moji, emoji ), fotomenu, "COMANDOS", "Escolha uma opção:", [
{ header: `⋆⃟ۜ${emoji} Menu`, title: "Menu", description: "", id: `${prefix}menu`},
{ header: `⋆⃟ۜ${emoji} Menu Dono`, title: "Menudono", description: "", id: `${prefix}menudono`},
{ header: `⋆⃟ۜ${emoji} Menu Jogos`, title: "MenuJogos", description: "", id: `${prefix}menujogos`}
])
} else {
await clara.sendMessage(from, { image: {url: fotomenu}, caption: menuAdm(donoName, botName, prefixo, timed, data, hora, totalCmd, moji, emoji ) }, {quoted: seloNubank});
}
break;

case 'menudono':
if (!isDono) return enviar(msg.dono)
reagir(emoji)
enviar(`𝙼𝚎𝚗𝚞 𝚍𝚘𝚗𝚘 𝚊 𝚌𝚊𝚖𝚒𝚗𝚑𝚘𝚘𝚘𝚘𝚘 🎶`)
if (isBotao) {
botaoLista(laura, from, menuDono(donoName, botName, prefixo, timed, data, hora, totalCmd, moji, emoji ), fotomenu, "COMANDOS", "Escolha uma opção:", [
{ header: `⋆⃟ۜ${emoji} Menu`, title: "Menu", description: "", id: `${prefix}menu`},
{ header: `⋆⃟ۜ${emoji} Menu Adm`, title: "Menuadm", description: "", id: `${prefix}menuadm`},
{ header: `⋆⃟ۜ${emoji} Menu Jogos`, title: "MenuJogos", description: "", id: `${prefix}menujogos`}
])
} else {
await clara.sendMessage(from, { image: {url: fotomenu}, caption: menuDono(donoName, botName, prefixo, timed, data, hora, totalCmd, moji, emoji ) }, {quoted: seloNubank});
}
break

case 'menujogos':
case 'brincadeiras':
await carregamento("Envinado seu menu de jogos 🕹️")
reagir(emoji)
if (isBotao) {
botaoLista(laura, from, menuJogos(donoName, botName, prefixo, timed, data, hora, totalCmd, moji, emoji ), fotomenu, "COMANDOS", "Escolha uma opção:", [
{ header: `⋆⃟ۜ${emoji} Menu`, title: "Menu", description: "", id: `${prefix}menu`},
{ header: `⋆⃟ۜ${emoji} Menu Adm`, title: "Menuadm", description: "", id: `${prefix}menuadm`},
{ header: `⋆⃟ۜ${emoji} Menu Dono`, title: "Menudono", description: "", id: `${prefix}menudono`}
])
} else {
await clara.sendMessage(from, { image: {url: fotomenu}, caption: menuJogos(donoName, botName, prefixo, timed, data, hora, totalCmd, moji, emoji ) }, {quoted: seloNubank});
}
break

//COMANDOS COM API
//★・・・・・・★・・・ DOWNLOAD ・・・★・・・・・・★
case 'play':
if (!q) return enviar(msg.query)
reagir("🕓")
api = await fetchJson(`${BaseApiDark}/api/pesquisa/youtube?query=${q}&apikey=${DARK_APIKEY}`)
data5 = api.resultado[0];
enviar(`*Calma ai iruminha, já estou enviando a música ${data5.title}*`)
await clara.sendMessage(from, {audio: {url: `${BaseApiDark}/api/download/youtube-audio?url=${data5.url}&apikey=${DARK_APIKEY}` }, mimetype: "audio/mpeg", 
headerType: 4, 
contextInfo: { 
externalAdReply: { 
title: "🎶 𝐂𝐥𝐚𝐫𝐚 𝐌𝐮𝐬𝐢𝐜 🎶", 
body: data5.title, 
thumbnailUrl: data5.image, 
mediaType: 1,
renderLargerThumbnail: true,
mediaUrl: data5.url, 
sourceUrl: data5.url}}}, 
{quoted: selo}).catch(e => {
consoleErro(e)
enviar("deu erro")
reagir("❌")
})
reagir("✅")
break

case 'play2':
if (!q) return enviar(msg.query)
try {
api = await fetchJson(`${BaseApiDark}/api/pesquisa/youtube?query=${q}&apikey=${DARK_APIKEY}`)
api2 = api.resultado[0];
textoPlay = `*lıl.ılı.lıll「🎶 𝐂𝐥𝐚𝐫𝐚 𝐌𝐮𝐬𝐢𝐜 🎶」llı.ıllı.ılı*
                ↻     ⊲  Ⅱ  ⊳     ↺
             
*🔍⃟ 𝙴𝚗𝚌𝚘𝚗𝚝𝚛𝚊𝚍𝚘:* *_${api.resultado.length}_*             
*📄⃟ 𝚃𝚒𝚝𝚞𝚕𝚘:* *_${api2.title}_*
*🕑⃟ 𝙳𝚞𝚛𝚊𝚌𝚊𝚘:* _*${api2.timestamp}*_
*📱⃟ 𝙲𝚊𝚗𝚊𝚕:* _*${api2.author.name}*_
*🟢⃟ 𝙳𝚎𝚜𝚌𝚛𝚒𝚌𝚊𝚘:* _*${api2.description}*_\n\n
*🎭⃟ 𝙲𝚛𝚒𝚊𝚍𝚘𝚛: ${donoName}*`
await clara.sendMessage(from, {image: {url: `${BaseApiDark}/api/canva/musicCardPz?titulo=${api2.title}&autor=${api2.author.name}&tempo=${api2.timestamp}&imagem=${api2.image}&apikey=${DARK_APIKEY}`}, caption: textoPlay}, {quoted: selo})
await enviar("*Ja estou enviando seu áudio*")
await enviarAd(`${BaseApiDark}/api/download/youtube-audio?url=${api2.url}&apikey=${DARK_APIKEY}`)
} catch (e) {
consoleErro(e)
enviar(msg.error)
}
break

case 'play3':
if (!q) return enviar(msg.query)
try {
api = await fetchJson(`${BaseApiDark}/api/pesquisa/youtube?query=${q}&apikey=${DARK_APIKEY}`)
api2 = api.resultado[0];
await enviar("*Ja estou enviando seu áudio*")
await enviarAd(`${BaseApiDark}/api/download/youtube-audio?url=${api2.url}&apikey=${DARK_APIKEY}`)
} catch (e) {
consoleErro(e)
enviar(msg.error)
}
break

case 'br':
await clara.relayMessage(from,
{interactiveMessage: {
body: { text: `Seu texto aqui
`,
},nativeFlowMessage: {
buttons: [{
name: "quick_reply",
buttonParamsJson: JSON.stringify({
display_text: "Nome do botão aqui",
id: `Comando aqui`
}),},
{
name: "quick_reply",
buttonParamsJson: JSON.stringify({
display_text: "Nome do botão aqui",
id: `Comando aqui`
}),}, 
            ],
            messageParamsJson: "",
          },
        },
      },
      {}
    ).then((r) => console.log(r));
    
const buttons = [
  { buttonId: 'id1', buttonText: { displayText: 'Button 1' }, type: 1 },
  { buttonId: 'id2', buttonText: { displayText: 'Button 2' }, type: 1 }
]

const buttonMessage = {
    image: { url: fotomenu }, // image: buffer or path
    caption: "Hi it's button message with image",
    footer: 'Hello World',
    buttons,
    headerType: 1,
    viewOnce: true
}

await sock.sendMessage(clara, buttonMessage, { quoted: null })
break

case 'play4':
if(!q) return enviar(`Use \n*Exemplo:*   ${prefix + comando} melo de pato branco`)
reagir("🕓")
api = await fetchJson(`${BaseApiSpeed}/api/pesquisa/youtube?nome=${q}&apikey=${Speed_Apikey}`)
data5 = api.resultado[0];
await clara.sendMessage(from, {audio: {url: `${BaseApiSpeed}/api/download/playv3?url=${data5.url}&apikey=${Speed_Apikey}` }, mimetype: "audio/mpeg", 
headerType: 4, 
contextInfo: { 
externalAdReply: { 
title: `🎶 𝐂𝐥𝐚𝐫𝐚 𝐌𝐮𝐬𝐢𝐜 🎶`, 
body: `📄⃟ 𝚃𝚒𝚝𝚞𝚕𝚘: ${data5.title}}`, 
showAdAttribution: true, 
thumbnailUrl: data5.image, 
mediaType: 1,
renderLargerThumbnail: true,
mediaUrl: data5.url, 
sourceUrl: data5.url}}}, 
{quoted: selo}).catch(e => {
enviar(msg.error)
consoleErro(e)
reagir("❌")
})
reagir("✅")
break

case 'play5':
if(!q) return enviar(`Use \n*Exemplo:*   ${prefix + comando} melo de pato branco`)
reagir("🕓")
api = await fetchJson(`${BaseApiSpeed}/api/pesquisa/youtube?nome=${q}&apikey=${Speed_Apikey}`)
data5 = api.resultado[0];
await clara.sendMessage(from, {audio: {url: `${BaseApiSpeed}/api/download/playv3?url=${data5.url}&apikey=${Speed_Apikey}` }, mimetype: "audio/mpeg" }, {quoted: selo}).catch(e => {
return enviar(msg.error)
reagir("❌")
})
reagir("✅")
break

case 'play6':
if (!q) return enviar(msg.query)
reagir(emoji)
apiS = await fetchJson(`${BaseApiMoon}/api/pesquisa/youtube?query=${q}&apikey=${MoonKey}`)
data5 = apiS.data.resultado[0]
TextoPlay = `
*lıl.ılı.lıll「🎶 𝐂𝐥𝐚𝐫𝐚 𝐌𝐮𝐬𝐢𝐜 🎶」llı.ıllı.ılı*
                ↻     ⊲  Ⅱ  ⊳     ↺
             
*🔍⃟ 𝙴𝚗𝚌𝚘𝚗𝚝𝚛𝚊𝚍𝚘:* *_${apiS.data.resultado.length}_*             
*📄⃟ 𝚃𝚒𝚝𝚞𝚕𝚘:* *_${data5.title}_*
*🕑⃟ 𝙳𝚞𝚛𝚊𝚌𝚊𝚘:* _*${data5.timestamp}*_
*📱⃟ 𝙲𝚊𝚗𝚊𝚕:* _*${data5.author.name}*_
*🟢⃟ 𝙳𝚎𝚜𝚌𝚛𝚒𝚌𝚊𝚘:* _*${data5.description}*_\n\n
*🎭⃟ 𝙲𝚛𝚒𝚊𝚍𝚘𝚛: ${donoName}*
`
enviarImg2(apiS.data.resultado[0].image, TextoPlay)
await esperar(2000)
await enviar("*Envindo o seu Áudio...*")
apiD = `https://moonlight-api.onrender.com/api/download/ytMp3?apikey=${MoonKey}&url=${apiS.data.resultado[0].url}`
enviarAd(apiD)
reagir("✅")
break

case 'ytmp3': 
if (!q) return enviar('cade o link do vídeo do YouTube que você deseja baixar o áudio?')
enviar('aguarde um instante!');
try{
speedApi = await fetchJson(`${BaseApiSpeed}/api/download/playv3?url=${q}&apikey=${Speed_Apikey}`);
await clara.sendMessage(from, {audio: {url: speedApi.resultado.download.url}, mimetype: "audio/mpeg"}, {quoted:info})
} catch (e) {
console.log(e)
return enviar('ocorreu um erro ao baixar o seu áudio.')
}
break;

case 'ytcanal':
if (!q) return enviar('Falta o nome do canal que deseja puxar as informações....')
reagir(emoji)
try {
api = await fetchJson(`${BaseApiSpeed}/api/pesquisa/youtubeCanal?nome=${q}&apikey=${Speed_Apikey}`)
textoA = `lıl.ılı.lıll「${emoji} 𝐒𝐏𝐄𝐄𝐃𝐂𝐋𝐎𝐔𝐃 𝐀𝐏𝐈 ${emoji}」llı.ıllı.ılı
${emoji}⃝᭄꥓〭➳ 𝐶𝑎𝑛𝑎𝑙: ${api.resultado.details.title}
${emoji}⃝᭄꥓〭➳ 𝐵𝑖𝑜𝑔𝑟𝑎𝑓𝑖𝑎: ${api.resultado.details.description}
${emoji}⃝᭄꥓〭➳ 𝑈𝑟𝑙 𝐶𝑢𝑠𝑡𝑜𝑚: ${api.resultado.details.customUrl}
${emoji}⃝᭄꥓〭➳ 𝑇𝑜𝑡𝑎𝑙 𝑣𝑖𝑠𝑢𝑎𝑙𝑖𝑧𝑎𝑐𝑎𝑜: ${api.resultado.statistics.viewCount}
${emoji}⃝᭄꥓〭➳ 𝐼𝑛𝑠𝑐𝑟𝑖𝑡𝑜𝑠: ${api.resultado.statistics.subscriberCount}
${emoji}⃝᭄꥓〭➳ 𝑇𝑜𝑡𝑎𝑙 𝑑𝑒 𝑣𝑖𝑑𝑒𝑜𝑠: ${api.resultado.statistics.videoCount}`
clara.sendMessage(from, {image: {url: api.resultado.image }, caption: textoA}, {quoted: selo});
} catch (erro) {
reagir("❌")
console.log("Deu erro:" + erro)
enviar(msg.error)
}
break

case 'playvd':  case 'play_video':
if(!q) return enviar(`- Exemplo: ${prefix}playvd (nome do vídeo)`)
reagir("🕓")
data1 = await fetchJson(`${BaseApiDark}/api/pesquisa/youtube?query=${q}&apikey=${DARK_APIKEY}`)
data5 = data1.resultado[0]
var bla = `*lıl.ılı.lıll「🎵 𝐏𝐋𝐀𝐘 𝐕𝐈𝐃𝐄𝐎 🎵」llı.ıllı.ılı*
                ↻     ⊲  Ⅱ  ⊳     ↺
             
*🔍⃟ 𝙴𝚗𝚌𝚘𝚗𝚝𝚛𝚊𝚍𝚘:* *_${data1.resultado.length}_*             
*📄⃟ 𝚃𝚒𝚝𝚞𝚕𝚘:* *_${data5.title}_*
*🕑⃟ 𝙳𝚞𝚛𝚊𝚌𝚊𝚘:* _*${data5.timestamp}*_
*📱⃟ 𝙲𝚊𝚗𝚊𝚕:* _*${data5.author.name}*_
*🟢⃟ 𝙳𝚎𝚜𝚌𝚛𝚒𝚌𝚊𝚘:* _*${data5.description}*_\n\n
*🎭⃟ 𝙲𝚛𝚒𝚊𝚍𝚘𝚛: ${donoName}*`
await clara.sendMessage(from, {image: {url: data5.image}, caption: bla}, {quoted: info})
await clara.sendMessage(from, {video: {url: `${BaseApiDark}/api/download/youtube-video?url=${data5.url}&apikey=${DARK_APIKEY}`}, mimetype: "video/mp4", fileName: "play.mp4"}, {quoted: selo}).catch(e => {
return enviar("Erro..")
reagir("❌")
})
reagir("✅")
break

case 'playvd2':  case 'play_video2':
if(!q) return enviar(`- Exemplo: ${prefix}playvd (nome do vídeo)`)
reagir("🕓")
data1 = await fetchJson(`${BaseApiDark}/api/pesquisa/youtube?query=${q}&apikey=${DARK_APIKEY}`)
data5 = data1.resultado[0]
await clara.sendMessage(from, {video: {url: `${BaseApiDark}/api/download/youtube-video?url=${data5.url}&apikey=${DARK_APIKEY}`}, mimetype: "video/mp4", fileName: "play.mp4"}, {quoted: selo}).catch(e => {
return enviar("Erro..")
reagir("❌")
})
reagir("✅")
break

case 'playvd3':  case 'play_video3':
if(!q) return enviar(`- Exemplo: ${prefix}playvd (nome do vídeo)`)
reagir("🕓")
data1 = await fetchJson(`${BaseApiDark}/api/pesquisa/youtube?query=${q}&apikey=${DARK_APIKEY}`)
data5 = data1.resultado[0]
enviar("enviando em seu pv...")
await clara.sendMessage(from, {sender: {url: `${BaseApiDark}/api/download/youtube-video?url=${data5.url}&apikey=${DARK_APIKEY}`}, mimetype: "video/mp4", fileName: "play.mp4"}, {quoted: selo}).catch(e => {
return enviar("Erro..")
reagir("❌")
})
reagir("✅")
break

case 'tiktok':
if (!q) return enviar(`Você precisa fornecer o link do TikTok! 🧐`);
reagir("🕓");
try {
api = await fetchJson(`${BaseApiDark}/api/download/tiktok/v3?url=${q}&version=v2&apikey=${DARK_APIKEY}`);        
if (!api.resultado || !api.resultado.video) {
return enviar(`Erro ao tentar baixar o vídeo do TikTok! 🚫`);}
const video1 = await getBuffer(api.resultado.video);
await clara.sendMessage(from, {video: video1,mimetype: "video/mp4",fileName: "ttk.mp4"}, { quoted: selo });
await esperar(2000)
enviar("*Enviando o audio....*")
await enviarAd(api.resultado.video)
reagir("👍")
} catch (e) {
console.log(e);
return enviar('Ocorreu um erro ao tentar baixar o vídeo do TikTok! 🚫');
}
break;

case 'tiktok2':
if (!q) return enviar(`Falta o link do vídeo do tiktok\n*EXEMPLO:*\n${prefix+comando} https://www.tiktok.com/@melissaseabra/video/7434923210119859511`)
try {
api = await fetchJson(`${BaseApiDark}/api/download/tiktokV2?url=${q}&apikey=${DARK_APIKEY}`)
Tyexto = `${emoji}⃟ *Título*: ${api.resultado.title}
${emoji}⃟ *Link Vídeo*: ${api.resultado.link}
${emoji}⃟ *Tamanho*: ${api.resultado.sem_tamanho_wm}
${emoji}⃟ *Hd*: ${api.resultado.tamanho_hd}
${emoji}⃟ *Visualização*: ${api.resultado.views}
${emoji}⃟ *Comentarios*: ${api.resultado.comentario}
${emoji}⃟ *Compartilhado*: ${api.resultado.compartilhar}
${emoji}⃟ *Download:* ${api.resultado.download}
${emoji}⃟ *Saves:* ${api.resultado.save}
${emoji}⃟ *Hora do post*: ${api.resultado.hora_de_criacao}`
reagir("🟢")
clara.sendMessage(from, {video: {url: api.resultado.sem_marcadagua}, caption: Tyexto, mimetype: "video/mp4"}, {quoted: selo})
await esperar(2000)
enviar("*Enviando o audio....*")
await enviarAd(api.resultado.musica)
} catch (erro) {
reagir("⚠️")
enviar(msg.error)
console.log("Deu erro aqui: " + erro)
}
break

case 'aptoide':
if (!q) return enviar(`cade o nome do app ou jogo meu jovem?🧐`)
reagir('🕵️‍♂️')
api = await fetchJson(`${BaseApiDark}/api/download/aplicativos?id=${q}&apikey=${DARK_APIKEY}`)
zi = `
❥ ${emoji}Nome do app: ${api.resultado.appName}
❥ ${emoji}Desenvolvedor: ${api.resultado.appDeveloper}
❥ ${emoji}Link do app logo a cima e só clicar`
clara.sendMessage(from, {image: {url: api.resultado.image }, caption: zi,
contextInfo: {
externalAdReply: {
title: api.resultado.appName,
body: `❥ ${emoji}Bot: ${botName}`,
sourceUrl: api.resultado.download, 
mediaType: 1,
}}}).catch(e => {
console.log(e)
enviar(`deu erro ao tentar procurar o app ${q} ou a api caiu`)  
})
break

case 'spamngl': {
var [nick, num, mensa] = q.split("/");
if (!nick || !num || !mensa) return enviar(`Falta alguns dos parâmetros "nick, num e mensagem" EX: ${prefix + comando} darkstarsapi/3/pedrozzMods`);
try {
const resposta = await fetchJson(`${BaseApiDark}/api/tools/ngl?nick=${nick}&repet=${num}&mensagem=${mensa}&apikey=${DARK_APIKEY}`);
enviar(`- *${resposta.mensagem}*`);
} catch (e) {
console.log(e)
enviar("Deu erro ao enviar o spam no ngl do usuário...")
}
}
break

//★・・・・・・★・・ IAS ・・・★・・・・・★
case 'gemini':
if (!q) return enviar('digite oque você quer perguntar pro gemini.')
try{
api = await fetch(`${BaseApiDark}/api/gemini?texto=${q}&apikey=${DARK_APIKEY}`)
data2 = await api.json()
clara.sendMessage(from, {text: data2.resposta}, {quoted: selo})
} catch (e) {
console.log(e)
return enviar(msg.error)
}
break;

case 'gpt': case 'chatgpt':
if (!q) return enviar("cadê o texto depois do comando?")
try {
reagir(emoji)
api = await fetch(`${BaseApiDark}/api/gpt?apikey=${DARK_APIKEY}&texto=${q}`)
dati = await api.json()
clara.sendMessage(from, {text: dati.resultado}, {quoted: selo})
} catch (erro) {
reagir("❌")
console.log(erro)
enviar(msg.error)
}
break

case 'gpt2': case 'chatgpt2':
if (!q) return enviar("cadê o texto depois do comando?")
try {
reagir(emoji)
prompt = `A partir de agora, você é uma IA chamada "Sucubus Bot" uma menina vindo das rosas, é você é uma sucubo. Evite informações desnecessárias e concentre-se em fornecer explicações concisas e úteis.`
api = await fetch(`${BaseApiDark}/api/gptPrompt?apikey=${DARK_APIKEY}&texto=${q}&prompt=${prompt}`)
dati = await api.json()
clara.sendMessage(from, {text: dati.resposta}, {quoted: selo})
} catch (erro) {
reagir("❌")
console.log(erro)
enviar(msg.error)
}
break

case 'llama':
case 'llama2':
case 'sqlcode':
case 'mistral':
case 'deepseek':
case 'deepseek-code':
if (!q) return enviar("cadê o texto depois do comando?")
try {
reagir(emoji)
api = await fetch(`${BaseApiDark}/api/ai/texto/${comando}?query=${q}&apikey=${DARK_APIKEY}`)
dati = await api.json()
clara.sendMessage(from, {text: dati.resultado.resposta}, {quoted: selo})
} catch (erro) {
reagir("❌")
console.log(erro)
enviar(msg.error)
}
break

case 'dalle':
case 'dallev2':
case '3d':
case 'tattoo':
case 'cartoon':
case 'ghibli':
case 'fantasia':
case 'imagine-ia':
if (!q) return enviar("Me infome o prompt para a geração da imagem...")
if (comando === "imagine-ia") {
try {
reagir("🤖")
api = await fetchJson(`${BaseApiDark}/api/ai/imagem/imagine?prompt=${q}&apikey=${DARK_APIKEY}`)
await enviar('*_Gerando imagem usando inteligência artificial_*')
enviarImg2(api.resultado.imagemUrl, api.resultado.info)
} catch (e) {
reagir("🔴");
console.log(e)
enviar(msg.error);
}
} else {
try {
reagir("🤖")
await enviar('*_Gerando imagem usando inteligência artificial_*')
await enviarImg(`${BaseApiDark}/api/ai/imagem/${comando}?prompt=${q}&apikey=${DARK_APIKEY}`)
} catch (e) {
reagir("🔴");
console.log(e)
enviar(msg.error);
}
}
break

//★・・・・★・・ CONSULTA ・・★・・・・★
case 'nome':
case 'nome2':
case 'cpf':
case 'titulo_eleitor':
case 'nome_mae':
case 'telefone':
if (!q) return enviar("Cade o dado a ser examinado?")
reagir("👩‍💻")
try {
await enviar("> by: Dark Stars Api\n- *Fazendo a sua consulta....*")
api = await fetchJson(`${BaseApiDark}/api/consulta/${comando}?query=${q}&apikey=${DARK_APIKEY}`);
await enviar(api.resultado);
} catch (e) {
reagir("🔴");
enviar('Deu erro ao fazer a sua consulta...');
console.log(e);
}
break
//★・・・・・・★・・ PESQUISA ・・・★・・・・・★
case 'filme':
if (!q) return enviar (`Cade o nome do filme jovem?🧐`)
reagir('📽️')
api = await fetchJson (`${BaseApiDark}/api/filme?nome=${q}&apikey=${DARK_APIKEY}`)
clara.sendMessage(from, {image: {url: api.imagem}, caption: 
`📛 *Nome:* ${api.Nome}
🎭 *Nome Original:* ${api.Nome_original}
📅 *Data de Lançamento:* ${api.Lançamento}
⭐ *Avaliação:** ${api.Avaliações}
🔞 *Conteúdo Adulto?:* ${api.Classificação_adulta}
🌐 *Linguagem Original:* ${api.Linguagem_oficial}
📖 *Sinopse:*
${api.Sinopse}`}, {quoted: selo})
break

case 'wikipedia':
if (!q) return enviar (`Cade o nome da pesquisa jovem?🧐`)
reagir('🔗')
api = await fetchJson(`${BaseApiDark}/api/pesquisa/wikipedia?query=${q}&apikey=${DARK_APIKEY}`)
clara.sendMessage(from, {image: {url: 'https://pngimg.com/uploads/wikipedia/wikipedia_PNG35.png'}, caption: 
`❥ ${emoji}Sobre: ${q}
❥ ${emoji}RESULTADO: ${api.resultado.pesquisaText}`}, {quoted: selo})
break

case 'wallpaper':
if (!q) return enviar (`Cade o nome da pesquisa jovem?🧐`)
reagir('💭')
api = await fetchJson(`${BaseApiDark}/api/pesquisa/wallpaper?query=${q}&apikey=${DARK_APIKEY}`)
var resultadoRandom = api.resultado[Math.floor(Math.random() * api.resultado.length)] 
clara.sendMessage(from, {image: {url: resultadoRandom}, caption: `❥ Aqui o seu wallpaper 🥰`}, {quoted: selo})
break

case 'serie':
if (!q) return enviar(`Cade o nome da série em jovem?🧐`)
reagir('📽️')
api = await fetchJson(`${BaseApiDark}/api/serie?nome=${q}&apikey=${DARK_APIKEY}`)
clara.sendMessage(from, {image: {url: api.imagem}, caption: 
`📛 *Nome:* ${api.Nome}
🎭 *Nome Original:* ${api.Nome_original}
📅 *Data de Lançamento:* ${api.Lançamento}
⭐ *Avaliação:** ${api.Avaliações}
🔞 *Conteúdo Adulto?:* ${api.Classificação_adulta}
🌐 *Linguagem Original:* ${api.Linguagem_oficial}
📖 *Sinopse:*
${api.Sinopse}`}, {quoted: selo}).catch(e => {
console.log(e)
enviar(`nao achei a serie ${q}`)  
})
break

case 'google':
if (!q) return enviar(`cade o nome da pesquisa meu jovem?🧐`)
reagir('🕵️‍♂️')
api = await fetchJson(`${BaseApiDark}/api/pesquisa/google?query=${q}&apikey=${DARK_APIKEY}`)
var resultadoRandom = api.resultado[Math.floor(Math.random() * api.resultado.length)]
zi = `❥ ${emoji}Total de resultados (${api.resultado.length})\n
❥ ${emoji}Título: ${resultadoRandom.title}
❥ ${emoji}Trecho: ${resultadoRandom.snippet}
❥ ${emoji}Link do app logo a cima e só clicar`
clara.sendMessage(from, {image: {url: fotomenu}, caption: zi,
contextInfo: {
externalAdReply: {title: api.resultado[0].title,body: `❥ ${emoji}Bot: ${botName}`,sourceUrl: resultadoRandom.link, mediaType: 1,}}}).catch(e => {
console.log(e)
enviar(`deu erro ao tentar procurar o tema do ${q} ou a api caiu`)  
})
break

case 'playstore':
if (!q) return enviar(`cade o nome do app ou jogo meu jovem?🧐`)
reagir('🕵️‍♂️')
api = await fetchJson(`${BaseApiDark}/api/pesquisa/playstore?nome=${q}&apikey=${DARK_APIKEY}`)
zi = `❥ ${emoji}Total de resultados (${api.pesquisa.resultado[0].length})\n
❥ ${emoji}Nome: ${api.pesquisa.resultado[0].nome}
❥ ${emoji}Desenvolvedor: ${api.pesquisa.resultado[0].desenvolvedor}
❥ ${emoji}Classificação: ${api.pesquisa.resultado[0].estrelas} estrelas
❥ ${emoji}Link do app logo a cima e só clicar`
clara.sendMessage(from, {image: {url: api.pesquisa.resultado[0].imagem }, caption: zi,
contextInfo: {
externalAdReply: {
title: api.pesquisa.resultado[0].nome,
body: `❥ ${emoji}Bot: ${botName}`,
sourceUrl: api.pesquisa.resultado[0].link, 
mediaType: 1,
}}}).catch(e => {
console.log(e)
enviar(`deu erro ao tentar procurar o app ${q} ou a api caiu`)  
})
break

case 'pensador':
try {
if(!q) return enviar(`Use como exemplo: *${prefix+comando} Amor*`);
api2 = await fetchJson(`${BaseApiDark}/api/pesquisa/pensador?query=${q}&apikey=${DARK_APIKEY}`)
enviar(`🔍 *Pesquisa:* ${q} - *[ Pensador ]*\nTotal de frases encontradas: ${api2.resultado.length}\n${"•\t".repeat(24)}\n\n
🗣️ *Frase:* "_${api2.resultado[0].frase}_\n\n
${"•\t".repeat(24)}`)
} catch (e) {
enviar(`Error`)
console.log(e)
}
break

//★・・・・・・★・・ OUTROS ・・・★・・・・・★
case 'metadinha':
reagir('💗')
enviar(`ja estou enviando as suas metadinhas💗`)
await esperar(2000)
api = await fetchJson(`${BaseApiDark}/api/metadinha?apikey=${DARK_APIKEY}`)
clara.sendMessage(from, {image: {url: api.masculina }, caption: `Aqui está sua metadinha "masculina" 🤵`})
clara.sendMessage(from, {image: {url: api.feminina }, caption: `Aqui está sua metadinha "feminina" 👸`})
break

case 'simih':
reagir(`${emoji}`)
api = await fetchJson(`${BaseApiDark}/api/outros/simih?language=pt&text=${q}&apikey=${DARK_APIKEY}`)
enviar(api.resultado)
break

case 'gerarnick':
{
if (!q) return enviar(`Exemple\n${prefix+comando} Pedrozz`)
let fontep = await fetchJson(`${BaseApiDark}/api/outros/styletext?nome=${q}&apikey=${DARK_APIKEY}`)
let pedrozzMods =`*𝐍𝐢𝐜𝐤𝐬 𝐆𝐞𝐫𝐚𝐝𝐨𝐬*\n\n`
for (let x of fontep) {
pedrozzMods +=`❥ ${emoji}𝐑𝐞𝐬𝐮𝐥𝐭𝐚𝐝𝐨: ${x}\n`
}
enviar(pedrozzMods)
}
break

case 'tradutor':
if (!q) return enviar(`Cade o texto para ser traduzido?`)
api = await fetchJson(`${BaseApiDark}/api/outros/translate?ling=pt&text=${q}&apikey=${DARK_APIKEY}`)
enviar(`❥ ${emoji}Texto traduzido por: ${botName}\n\n❥ ${emoji}Tradução:${api.result}`)
break

case 'tts':
if (!q) return enviar (`cade o texto?`)
clara.sendMessage(from, {audio: {url: `${BaseApiDark}/api/gtts?ling=pt&text=${q}&apikey=${DARK_APIKEY}` }, mimetype: "audio/mpeg",}, 
{quoted: selo})
break

case 'cuttly':
if (!q) return enviar('cade o link?')
api = await fetchJson(`${BaseApiDark}/api/outros/cuttly?link=${q}&apikey=${DARK_APIKEY}`)
enviar(`Aqui seu link encurtado: ${api.result}`)
break

case 'cep':
if(!q) return enviar('cade o cep?')
api = await fetchJson(`${BaseApiDark}/api/outros/cep/v2?code=${q}&apikey=${DARK_APIKEY}`)
enviar('enviando as informações...')
await esperar(2000)
enviar(`Cep: ${api.resultado.cep}
Propriedade: ${api.resultado.state}
Cidade: ${api.resultado.city}
Vizinhança: ${api.resultado.neighborhood}
Rua: ${api.resultado.street}
Serviço: ${api.resultadoservice}`)

///★・・・・・・★・・ FIGURINHAS・・・★・・・・・★

case 'st':
case 'stk':
case 'sticker':
case 's':{
var RSM = info.message?.extendedTextMessage?.contextInfo?.quotedMessage
var boij2 = RSM?.imageMessage || info.message?.imageMessage || RSM?.viewOnceMessageV2?.message?.imageMessage || info.message?.viewOnceMessageV2?.message?.imageMessage || info.message?.viewOnceMessage?.message?.imageMessage || RSM?.viewOnceMessage?.message?.imageMessage
var boij = RSM?.videoMessage || info.message?.videoMessage || RSM?.viewOnceMessageV2?.message?.videoMessage || info.message?.viewOnceMessageV2?.message?.videoMessage || info.message?.viewOnceMessage?.message?.videoMessage || RSM?.viewOnceMessage?.message?.videoMessage
let packin;
let author23;
if (`${sender.split("@")[0]}` === numeroDono) {
packin =  q ? q?.split("/")[0] : botName
author23 = q ? q?.split("/")[1] : q?.split("/")[0] ? '' : `♥️ ${donoName}`
} else {
packin =  q ? q?.split("/")[0] : `${emoji} ⃟𝙱𝚘𝚝: ${botName}\n🤖⃟ 𝙽𝚞𝚖𝚎𝚛𝚘 𝚋𝚘𝚝: ${numeroBot.split('@')[0]}`
author23 = q ? q?.split("/")[1] : q?.split("/")[0] ? '' : `\n\n👤⃟𝙿𝚎𝚍𝚒𝚍𝚘 𝚙𝚘𝚛: ${pushname}\n👑⃟𝙲𝚛𝚒𝚊𝚍𝚘𝚛: 𝙿𝚎𝚍𝚛𝚘𝚣𝚣 𝙼𝚘𝚍𝚜`
}
if(boij2){
reagir('💭')
enviar('Hum.... espere um minutinho ai 😚')
owgi = await getFileBuffer(boij2, 'image')
let encmediaa = await sendImageAsSticker2(clara, from, owgi, info, { packname:packin, author:author23})
await DLT_FL(encmediaa)
} else if(boij && boij.seconds < 11){
owgi = await getFileBuffer(boij, 'video')
let encmedia = await sendVideoAsSticker2(clara, from, owgi, info, { packname:packin, author:author23})
await DLT_FL(encmedia)
reagir(emoji)
} else {
return enviar(`Marque uma foto ou o vídeo(menor que 10s) para fazer sua figurinha com o comando: ${prefix+comando}`)
}
}
break

case 'emojimix': {
var [emj1e, emj2e] = q.split("+")
if(!q.includes("+")) return enviar(`Olá, está faltando o +\nExemplo: ${prefix+comando} 😪+🤣`)
reagir(emoji)
try {
api = await fetchJson(`${BaseApiSpeed}/sticker/emojimix?emoji1=${encodeURIComponent(emj1e)}&emoji2=${encodeURIComponent(emj2e)}&apikey=${Speed_Apikey}`)
buffer = await getBuffer(api.resultado.emojimixUrl)
sendStickerFromUrl(from, api.resultado.emojimixUrl)
} catch (e) {
console.error("Erro ao buscar emoji:", e);
}
}
break;

case 'emojimix2':
if (!q) return enviar(msg.query)
reagir(emoji)
try {
api = await fetch(`${BaseApiSpeed}/sticker/emojimix2?emoji=${q}&apikey=${Speed_Apikey}`);
let d = await api.json();
for (let ap of d.resultado.stickers) {
sendStickerFromUrl(from, ap.stickerUrl)
}
} catch (e) {
console.error("Erro ao buscar emoji:", e);
}
break;

case "attp":
case "attp2":
case "attp3":
case "attp4":
case "attp5":
if (!q) return enviar("Cade o texto para a sticker?")
try {
enviar("*Criando sua Figurinha animada*")
clara.sendMessage(from, { sticker: { url: `${BaseApiDark}/api/sticker/canva/${comando}?texto=${encodeURIComponent(q)}&apikey=${DARK_APIKEY}`} })
} catch (e) {
console.log(e)
enviar("erro ao criar a figurinha")
}
break

case 'stickerp': case 'sp': {
if (!q) return enviar("Cade o parâmetros da pesquisa da sticker?")
try {
await enviar(`- *Trazendo sua sticker no tema ${q}, aguarde um segundo...*`)
const ApiSticker = `${BaseApiDark}/sticker/pesquisa?query=${encodeURIComponent(q)}&apikey=${DARK_APIKEY}`
await clara.sendMessage(from, {sticker: {url: ApiSticker}}, {quoted: info})
} catch (e) {
console.log("Deu erro na solicitação: " + e );
enviar("Deu erro ao tentar buscar sticker...")
}
}
break 

case 'figubebe':
if (!q) return enviar("Insira a quantidade de figurinhas que deseja que eu envie!")
if (!Number(args[0]) || Number(q.trim()) > 100) return enviar("Digite a quantidade de figurinhas que deseja que eu envie.. não pode mais de 100..")
enviar('Enviando as figurinhas no seu pv meu jovem...')
async function sla3() {
clara.sendMessage(sender, { sticker: { url: `${BaseApiDark}/sticker/figu_bebe?apikey=${DARK_APIKEY}`} })}
for (i = 0; i < q; i++) {
await esperar(2000)
sla3()
}
break

case 'figucoreana':
if (!q) return enviar("Insira a quantidade de figurinhas que deseja que eu envie!")
if (!Number(args[0]) || Number(q.trim()) > 100) return enviar("Digite a quantidade de figurinhas que deseja que eu envie.. não pode mais de 100..")
enviar('Enviando as figurinhas no seu pv meu jovem...')
async function sla4() {
clara.sendMessage(sender, { sticker: { url: `${BaseApiDark}/sticker/figu_coreana?apikey=${DARK_APIKEY}`} })}
for (i = 0; i < q; i++) {
await esperar(2000)
sla4()
}
break

case 'figuanime':{
if (!q) return enviar("Insira a quantidade de figurinhas que deseja que eu envie!")
if (!Number(args[0]) || Number(q.trim()) > 100) return enviar("Digite a quantidade de figurinhas que deseja que eu envie.. não pode mais de 100..")
enviar('Enviando as figurinhas no seu pv meu jovem...')
async function sla5() {
clara.sendMessage(sender, { sticker: { url: `${BaseApiDark}/sticker/figu_anime?apikey=${DARK_APIKEY}`} })}
for (i = 0; i < q; i++) {
await esperar(2000)
sla5()
}
}
break

case 'figuanimais':
if (!q) return enviar("Insira a quantidade de figurinhas que deseja que eu envie!")
if (!Number(args[0]) || Number(q.trim()) > 100) return enviar("Digite a quantidade de figurinhas que deseja que eu envie.. não pode mais de 100..")
enviar('Enviando as figurinhas no seu pv meu jovem...')
async function sla6() {
clara.sendMessage(sender, { sticker: { url: `${BaseApiDark}/sticker/figu_animais?apikey=${DARK_APIKEY}`} })}
for (i = 0; i < q; i++) {
await esperar(2000)
sla6()
}
break

case 'figudesenho':
if (!q) return enviar("Insira a quantidade de figurinhas que deseja que eu envie!")
if (!Number(args[0]) || Number(q.trim()) > 100) return enviar("Digite a quantidade de figurinhas que deseja que eu envie.. não pode mais de 100..")
enviar('Enviando as figurinhas no seu pv meu jovem...')
async function sla7() {
clara.sendMessage(sender, { sticker: { url: `${BaseApiDark}/sticker/figu_animais?apikey=${DARK_APIKEY}`} })}
for (i = 0; i < q; i++) {
await esperar(2000)
sla7()
}
break

case 'figuraiva':
if (!q) return enviar("Insira a quantidade de figurinhas que deseja que eu envie!")
if (!Number(args[0]) || Number(q.trim()) > 100) return enviar("Digite a quantidade de figurinhas que deseja que eu envie.. não pode mais de 100..")
enviar('Enviando as figurinhas no seu pv meu jovem...')
async function sla8() {
clara.sendMessage(sender, { sticker: { url: `${BaseApiDark}/sticker/figu_raiva?apikey=${DARK_APIKEY}`} })}
for (i = 0; i < q; i++) {
await esperar(2000)
sla8()
}
break

case 'figuroblox':
if (!q) return enviar("Insira a quantidade de figurinhas que deseja que eu envie!")
if (!Number(args[0]) || Number(q.trim()) > 100) return enviar("Digite a quantidade de figurinhas que deseja que eu envie.. não pode mais de 100..")
enviar('Enviando as figurinhas no seu pv meu jovem...')
async function sla9() {
clara.sendMessage(sender, { sticker: { url: `${BaseApiDark}/sticker/figu_roblox?apikey=${DARK_APIKEY}`} })}
for (i = 0; i < q; i++) {
await esperar(2000)
sla9()
}
break

case 'figu18': {
if (!q) return enviar("Insira a quantidade de figurinhas que deseja que eu envie!")
if (!Number(args[0]) || Number(q.trim()) > 100) return enviar("Digite a quantidade de figurinhas que deseja que eu envie.. não pode mais de 100..")
enviar('Enviando as figurinhas no seu pv meu jovem...')
async function sla9() {
sendStickerFromUrl(sender, `${BaseApiSpeed}/api/18/pgif?apikey=${Speed_Apikey}`)
}
for (i = 0; i < q; i++) {
await esperar(2000)
sla9()
}
}
break

case 'figurandom': case 'figu+18': case 'figumemes2': case 'figuanime2': case 'figucoreanas2': case 'figugatos': case 'figubts': {
if (!q) return enviar("Insira a quantidade de figurinhas que deseja que eu envie!");
if (!Number(args[0]) || Number(q.trim()) > 10) {
return enviar("Digite uma quantidade válida de figurinhas (máximo de 10).");
}
const config = {
figurandom: { pastaName: 'random', NomeFig: 'ramdon', max: 585 },
'figu+18': { pastaName: '+18', NomeFig: 'figurinhas', max: 89 },
figumemes2: { pastaName: 'memes', NomeFig: 'figurinhas', max: 49 },
figuanime2: { pastaName: 'animes', NomeFig: 'figurinhas', max: 220 },
figucoreanas2: { pastaName: 'coreanas', NomeFig: 'figurinhas', max: 73 },
figugatos: { pastaName: 'gatos', NomeFig: 'figurinhas', max: 108 },
figubts: { pastaName: 'bts', NomeFig: 'figurinhas', max: 30 },
};

const { pastaName, NomeFig, max } = config[comando];

async function enviarSticker(numero) {
const url = `https://pedrozz13755.github.io/Arquivos_web/figurinhas/${pastaName}/${NomeFig}${numero}.webp`;
await clara.sendMessage(from, { sticker: { url } });
}
for (let i = 0; i < q; i++) {
const numero = Math.floor(Math.random() * max);
await enviarSticker(numero);
await esperar(680); 
}
}
break;

//★・・・・・・★・・ COMANDOS +18・・・★・・・・・★
case 'plaquinha': case 'plaquinha2': case 'plaquinha3': case 'plaquinha4': case 'plaquinha5': case 'plaquinha6': case 'plaquinha7': case 'plaquinha8': case 'plaquinha9': case 'plaquinha10': case 'plaquinha11': case 'plaquinha12': case 'plaquinha13': case 'plaquinha14': case 'plaquinha15': case 'plaquinha16':
if (!q) return enviar('Cade o seu nick?')
reagir('😈')
enviar('espere um momento ai meu consagrado')
clara.sendMessage(from, {image: {url: `${BaseApiDark}/api/${cmd}?texto=${q}&apikey=${DARK_APIKEY}`}, caption: 'Sua plaquinha está pronta 😈'}, {quoted: selo})
break

case 'onlyimg':
reagir('😈')
enviar('espere um momento ai meu consagrado')
clara.sendMessage(from, {image: {url: `${BaseApiDark}/api/only?apikey=${DARK_APIKEY}`}, caption: `Aqui sua imagem +18 😈`}, {quoted: selo})
break

case 'foto18':
reagir('😈')
enviar('espere um momento ai meu consagrado')
clara.sendMessage(from, {image: {url: `${BaseApiDark}/api/foto18?apikey=${DARK_APIKEY}`}, caption: `Aqui sua imagem +18 😈`}, {quoted: selo})
break

case 'video18':
reagir('😈')
enviar('espere um momento ai meu consagrado')
api = await fetchJson(`${BaseApiDark}/api/video18?apikey=${DARK_APIKEY}`)
clara.sendMessage(from, {video: {url: api.resultado}, mimetype: "video/mp4", fileName: "x.mp4"}, {quoted: selo})
break

case 'hentai':
reagir('😈')
enviar('espere um momento ai meu consagrado')
clara.sendMessage(from, {image: {url: `${BaseApiDark}/api/hentai-random?apikey=${DARK_APIKEY}`}, caption: `Aqui sua imagem +18 😈`}, {quoted: selo})
break

case 'trap': case 'wifu': case 'blowjob': case 'neko':
reagir("😈")
enviar('Estou enviando já seu safadinho 😈')
clara.sendMessage(from, { image: {url: `http://br2.bronxyshost.com:4109/api/1o8/${cmd}&apikey=${DARK_APIKEY}` },caption: `Aqui o sua imagem de ótima qualidade 😈`}, { quoted: selo })
break

case 'hanal': case 'anal': case 'pussy': case 'hentai': case 'thigh': case 'boobs': case 'ass': case 'kanna': case '4k': case 'hthigh': case 'tentacle': case 'hboobs': case 'holo': case 'hass': case 'pgif': case 'yaoi': case 'hneko': case 'hkitsune': case 'kemonomimi':
reagir("😈")
clara.sendMessage(from, { image: {url: `http://br2.bronxyshost.com:4109/api/18/${cmd}?apikey=${DARK_APIKEY}` },caption: `Aqui o sua imagem de ótima qualidade 😈`}, { quoted: selo })
break

case 'hanalvizu': case 'analvizu': case 'pussyvizu': case 'hentaivizu': case 'thighvizu': case 'boobsvizu': case 'assvizu': case 'kannavizu': case '4kvizu': case 'hthighvizu': case 'tentaclevizu': case 'hboobsvizu': case 'holovizu': case 'hassvizu': case 'pgifvizu': case 'yaoivizu': case 'hnekovizu': case 'hkitsunevizu': case 'kemonomimivizu':
reagir("😈")
hentai2 = comando.replace("vizu", "");
clara.sendMessage(from, {image: {url: `http://br2.bronxyshost.com:4109/api/18/${hentai2}?apikey=${DARK_APIKEY}`}, viewOnce: true, caption: "Aqui o sua imagem de ótima qualidade 😈"}, {quoted: info});
break
//FIM DOS COMANDOS COM API
//★・・・・・・★・・・ COMANDOS ADM ・・・★・・・・・★
case 'ban': case 'kick':
if(!isBotGroupAdmins) return emviar(msg.botadm)
if(!isGroupAdmins && !isDono) return enviar(msg.adm)
if (!isGroupAdmins && !isDono) return enviar(msg.adm)
try {
if(!menc_os2 || menc_jid2[1]) return enviar("Marque a mensagem do usuário ou marque o @ dele.., lembre de só marcar um usuário...")
if(!JSON.stringify(groupMembers).includes(menc_os2)) return enviar("𝚅𝚒𝚒𝚡𝚡! 𝙴𝚜𝚜𝚎 𝚍𝚊𝚒 𝚓𝚊 𝚝𝚊 𝚌𝚘𝚖 𝚘 𝚝𝚒𝚗𝚑𝚘𝚜𝚘 𝚔𝚔.")
if(numeroBot.includes(menc_os2)) return enviar('𝙴𝚒𝚒𝚒! 𝚂𝚘𝚞 𝚍𝚎𝚜𝚌𝚊𝚛𝚝𝚊𝚟𝚎𝚕 𝚗𝚊𝚘 𝚔𝚔')
if(numeroDono.includes(menc_os2)) return enviar('*𝙽𝚊𝚘 𝚝𝚘𝚞 𝚐𝚘𝚜𝚝𝚊𝚗𝚍𝚘 𝚍𝚒𝚜𝚜𝚘, 𝚟𝚘𝚌𝚎 𝚝𝚊 𝚝𝚎𝚗𝚍𝚘 𝚍𝚊𝚛 𝚋𝚊𝚗 𝚗𝚘 𝚒𝚛𝚞𝚖𝚒𝚗𝚑𝚊??*')
clara.groupParticipantsUpdate(from, [menc_os2], "remove") 
clara.sendMessage(from, {text: `*𝙴𝚜𝚜𝚎 𝚊𝚒 𝚏𝚘𝚒 𝚌𝚊𝚗𝚝𝚊𝚛 𝚌𝚘𝚖 𝚘 𝚝𝚒𝚗𝚑𝚘𝚜𝚘 𝚔𝚔𝚔*`, mentions: [sender]}) 
} catch (e) {
console.log(e)
}
break

case 'grupo':
if (!isGroup) return enviar(msg.grupo)
if (!isBotGroupAdmins) return enviar(msg.botadm)
if (!isGroupAdmins && !isDono) return enviar(msg.adm)
try {
if (q === "a"){
await reagir("🔓")
await clara.groupSettingUpdate(from, "not_announcement")
enviar(`𝙾 𝚐𝚛𝚞𝚙𝚘 𝚏𝚘𝚒 𝚊𝚋𝚎𝚛𝚝𝚘 🔓`)
}
if (q === "f") {
await reagir("🔒")
await clara.groupSettingUpdate(from, "announcement")
enviar(`𝙾 𝚐𝚛𝚞𝚙𝚘 𝚏𝚘𝚒 𝚏𝚎𝚌𝚑𝚊𝚍𝚘 🔒`)
} else {
enviar(`𝙿𝚊𝚛𝚊 𝚙𝚘𝚍𝚎𝚛 𝚊𝚋𝚛𝚒𝚛 𝚘 𝚐𝚛𝚞𝚙𝚘 𝚞𝚜𝚎: ${prefix + comando} a\n𝙴 𝚙𝚊𝚛𝚊 𝚘 𝚏𝚎𝚌𝚑𝚊𝚛 𝚞𝚜𝚎: ${prefix + comando} f`)
}
} catch(e) {
reagir("⚠️")
consoleErro(e)
enviar(msg.error)
}
break

case 'resetlink': {
if (!isGroup) return enviar(msg.grupo)
if (!isBotGroupAdmins) return enviar(msg.botadm)
if (!isGroupAdmins && !isDono) return enviar(msg.adm)
try {
await clara.groupRevokeInvite(from)
enviar(`*Link de convite resetado com sucesso*`)
} catch(e) {
console.log(e)
enviar(`algo deu errado`)
}
}
break

case 'nomegp':
if (!isGroup) return enviar(msg.grupo);
if (!isGroupAdmins && !isDono) return enviar(msg.adm)
if (!isBotGroupAdmins) return enviar(msg.botadm)
if (!q) return enviar(msg.query)
await clara.groupUpdateSubject(from, `${q}`)
await clara.sendMessage(from, {text: '*𝙽𝚘𝚖𝚎 𝚍𝚘 𝚐𝚛𝚞𝚙𝚘 𝚊𝚕𝚝𝚎𝚛𝚊𝚍𝚘 𝚌𝚘𝚖 𝚜𝚞𝚌𝚎𝚜𝚜𝚘*'})
break

case 'deletar': case 'del':  case 'd': case 'apagar':
if(!isGroupAdmins && !isDono) return enviar(msg.adm)
if(!menc_prt) return enviar("𝙵𝚊𝚕𝚝𝚊 𝚖𝚊𝚛𝚌𝚊𝚛 𝚊 𝚖𝚎𝚗𝚜𝚊𝚐𝚎𝚖 𝚍𝚘 𝚎𝚕𝚎𝚖𝚎𝚗𝚝𝚘...")
await clara.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.message.extendedTextMessage.contextInfo.stanzaId, participant: menc_prt}})
reagir("🗑")
break

case 'grupin':
if (!isGroupAdmins && !isDono) return enviar(msg.adm)
if (!q) return enviar("Cade o parâmetro de tempo?")
reagir("🔧")
switch(q) {
case '30s': {
clara.groupSettingUpdate(from, "announcement")
enviar('O grupo foi fechado por 30 segundos, Até logo rapeize 👋')
await esperar(30000); //30 segundos 
clara.groupSettingUpdate(from, "not_announcement")
enviar('O grupo ta online de novo meus jovem 😎')
}
break
case '1m':
clara.groupSettingUpdate(from, "announcement")
enviar('O grupo foi fechado por 1 minuto, Até logo rapeize 👋')
await esperar(60000); //1 Minuto
clara.groupSettingUpdate(from, "not_announcement")
enviar('O grupo ta online de novo meus jovem 😎')
break
case '2m':
clara.groupSettingUpdate(from, "announcement")
enviar('O grupo foi fechado por 2 minutos, Até logo rapeize 👋')
await esperar(120000); //2 Minutos
clara.groupSettingUpdate(from, "not_announcement")
enviar('O grupo ta online de novo meus jovem 😎')
break
case '5m':
clara.groupSettingUpdate(from, "announcement")
enviar('O grupo foi fechado por 5 minutos, Até logo rapeize 👋')
await esperar(300000); //5 Minutos
clara.groupSettingUpdate(from, "not_announcement")
enviar('O grupo ta online de novo meus jovem 😎')
break
case '10m':
clara.groupSettingUpdate(from, "announcement")
enviar('O grupo foi fechado por 10 minutos, Até logo rapeize 👋')
await esperar(600000); //10 Minutos 
clara.groupSettingUpdate(from, "not_announcement")
enviar('O grupo ta online de novo meus jovem 😎')
break
case '20m':
clara.groupSettingUpdate(from, "announcement")
enviar('O grupo foi fechado por 20 minutos, Até logo rapeize 👋')
await esperar(1200000); //20 Minutos
clara.groupSettingUpdate(from, "not_announcement")
enviar('O grupo ta online de novo meus jovem 😎')
break
case '30m':
clara.groupSettingUpdate(from, "announcement")
enviar('O grupo foi fechado por 30 minutos, Até logo rapeize 👋')
await esperar(13800000); //30 Minutos
clara.groupSettingUpdate(from, "not_announcement")
enviar('O grupo ta online de novo meus jovem 😎')
break
case '1h':
clara.groupSettingUpdate(from, "announcement")
enviar('O grupo foi fechado por 1 hora, Até logo rapeize 👋')
await esperar(27600000); //1 Hora
clara.groupSettingUpdate(from, "not_announcement")
enviar('O grupo ta online de novo meus jovem 😎')
break
case '3h':
await clara.groupSettingUpdate(from, "announcement")
enviar('O grupo foi fechado por 3 horas, Até logo rapeize 👋')
await esperar(82800000); //3 Horas
await clara.groupSettingUpdate(from, "not_announcement")
enviar('O grupo ta online de novo meus jovem 😎')
break
case '5h':
await clara.groupSettingUpdate(from, "announcement")
enviar('O grupo foi fechado por 5 horas, Até logo rapeize 👋')
await esperar(138000000); //30 segundos 
await clara.groupSettingUpdate(from, "not_announcement")
enviar('O grupo ta online de novo meus jovem 😎')
break
case '12h':
await clara.groupSettingUpdate(from, "announcement")
enviar('O grupo foi fechado por 12 horas, Até logo rapeize 👋')
await esperar(331200000); //12 Horas
await clara.groupSettingUpdate(from, "not_announcement")
enviar('O grupo ta online de novo meus jovem 😎')
break
}
break

//ATIVAR / DESATIVAR
case 'bemvindo':
case 'welcome':
if(!isGroup) return enviar(msg.grupo)
if(!isBotGroupAdmins) return enviar(msg.botadm)
if(!isGroupAdmins && !isDono) return enviar(msg.adm)
if(args.length < 1) return enviar(`${prefix + comando} 1 para ativar, 0 para desativar.`)
if(Number(args[0]) === 1) {
if(isBemVindo) return enviar('Essa função já está ativada')
ArquivosDosGrupos[0].bemVindo[0].ativo = true
ModificaGrupo(ArquivosDosGrupos)
enviar('*_A função de bem vindo foi ativada com sucesso nesse grupo 😋_*')
} else if(Number(args[0]) === 0) {
if(!isBemVindo) return enviar('Essa função já está desativada')
ArquivosDosGrupos[0].bemVindo[0].ativo = false
ModificaGrupo(ArquivosDosGrupos)
enviar('*_A função de bem vindo foi desativada com sucesso nesse grupo 😋_*')
} else {
enviar(`_*${prefix + comando} 1 para ativar, 0 para desativar.*_`)
}
break

case 'legendabv':
if(!isGroup) return enviar(msg.grupo)
if(!isGroupAdmins && !isDono) return enviar(msg.adm)
if(!q) return enviar(msg.query)
if(isBemVindo) {
ArquivosDosGrupos[0].bemVindo[0].entrou = q
ModificaGrupo(ArquivosDosGrupos)
enviar('*_Pronto_*\n*_Legenda atualizada com sucesso pae 😎_*')
} else {
enviar(`Ative o bemvindo primeiro `)
}
break

case 'legendasaiu':
if(!isGroup) return enviar(msg.grupo)
if(!isGroupAdmins && !isDono) return enviar(msg.adm)
if(!q) return enviar(msg.query)
if(isBemVindo) {
ArquivosDosGrupos[0].bemVindo[0].saiu = q
ModificaGrupo(ArquivosDosGrupos)
enviar('*_Legenda de Saida atualizada_*')
} else {
enviar(`Ative o bemvindo primeiro`
)
}
break

case 'antilink':
if(!isGroup) return enviar(msg.grupo)
if(!isGroupAdmins) return enviar(msg.adm)
if(!isBotGroupAdmins) return enviar(msg.botadm)
if(q.length < 1) return enviar(`${prefix + cmd} 1 para ativar, 0 para desativar.`)
if(Number(q[0]) === 1) {
if(isAntiLink) return enviar('Isso já ta ativo iruminha')
ArquivosDosGrupos[0].antilink = true
ModificaGrupo(ArquivosDosGrupos)
enviar('_A função de antilink foi ativada com sucesso nesse grupo 😋_*.')
} else if(Number(q[0]) === 0) {
if(!isAntiLink) return enviar('Isso já ta off 😪')
ArquivosDosGrupos[0].antilink = false
ModificaGrupo(ArquivosDosGrupos)
enviar('_A função de antilink foi desativada com sucesso nesse grupo 😋_*')
} else {
enviar(`${prefix + cmd} 1 para ativar, 0 para desativar.`)
}
break

//★・・・・・・★・・・ COMANDOS DONO ・・・★・・・・・★

case 'dark': //Para o próprio usuário 
if (!isDono) return enviar(msg.dono)
await clara.sendMessage(from, { 
text: `🕵️‍♂️ *Processando consulta...* \nAguarde enquanto verificamos as tuas informações.` 
}, { quoted: info });
    
try {
api = await fetchJson(`${BaseApiDark}/infoMy?username=${DARK_USERNAME}`);
InfoUser = `🎯 *𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐂̧𝐎̃𝐄𝐒 𝐃𝐎 𝐔𝐒𝐔𝐀́𝐑𝐈𝐎* 🎯

👤 *Username:* ${DARK_USERNAME}
📋 *Request:* ${api.request || "Nenhuma"}
⚙️ *Plano Básico:* ${api.basico || "Não"}
💎 *Plano VIP:* ${api.premium || "Não"}
🏅 *Plano Gold:* ${api.gold || "Não"}
👑 *Administrador:* ${api.adm || "Não"}
💬 *Nível:* ${api.nivel || "Indefinido"}
⏳ *Tempo Restante do Plano:* ${ api.TempoPlano || "Sem plano"} dia(s)
${api.banido ? `🚫 *Usuário Banido* \n⏱️ *Tempo de Banimento:* ${api.tempo_bam} dias\n📌 *Motivo:* ${api.motivo_ban}` : ""}
🧑‍💻 *Criador do Sistema:* Pedrozz_Mods`;
if (api.status) {
fotoPerfil = `${BaseApiDark}/api/canva/bem-vindo2?titulo=${DARK_USERNAME}&avatar=${api.fotoDePerfil}&fundo=${api.banner}&nome=Status Usuário&desc=Req: ${api.request}&apikey=${DARK_APIKEY}`
await clara.sendMessage(from, {image: { url: fotoPerfil },caption: InfoUser});
} else {
await enviar(msg.error)
}
} catch (e) {
enviar(msg.error);
console.error(e);
}
break;

case 'reset':
if (!isDono && !info.key.fromMe) return enviar(msg.dono);
consoleInfo("Reiniciando sistema.....");
enviar(`Reiniciando o sistema...`);
await esperar(1000)
statusReset = { executado: true, id: from };
fs.writeFileSync('status.json', JSON.stringify(statusReset));
setTimeout(() => { process.exit(0) }, 1000);
break;

case 'ping': {
if(!isDono) return enviar(msg.dono)
await clara.sendMessage(from, {text: '*𝙲𝚊𝚕𝚌𝚞𝚕𝚊𝚗𝚍𝚘 𝚒𝚗𝚏𝚘𝚛𝚖𝚊𝚌𝚘𝚎𝚜*'});
//LATÊNCIA DO BOT
r = (Date.now() / 1000) - info.messageTimestamp
//DESEMPENHO DO BOT
let desempenhoBot = 'Rápido';
if (velocidadeBot >= 1.000 && velocidadeBot < 2.000) {
desempenhoBot = 'Razoável';
} else if (velocidadeBot >= 2.000 && velocidadeBot < 4.000) {
desempenhoBot = 'Lento';
} else if (velocidadeBot >= 4.000) {
desempenhoBot = 'Muito Lento';
}
const porcentagemDesempenho = `${desempenhoBot === 'Rápido' ? '100% 🟢' : desempenhoBot === 'Razoável' ? '50% 🟡' : '20% 🔴'}`;

//FOTO DO PING USANDO A API
pingUrl = `${BaseApiDark}/pingcard?perfil=https://files.catbox.moe/asf99y.jpg&backgroundImg=https://files.catbox.moe/b42zrg.jpg&speed=${latensi.toFixed(4)}&bot=Clara Bot&uptime=${formatTime(uptime)}&memory=${totalMemory}&system=${os.type()}&apikey=${DARK_APIKEY}`
//TEXTO DO PING
const pingResponse = `╭━°𖠁°✮•| ⪧𝐏𝐈𝐍𝐆 𝐃𝐎 𝐁𝐎𝐓⊰ |•✮°𖠁°━╮
┃╭━━━─────━━━╮
┃┝🤖̘̓ͅ᪾⃟⋮⧶ *Versão do Bot:* _${botVersion}_
┃┝🤖̘̓ͅ᪾⃟⋮⧶ *Nome do Bot:* _${botName}_
┃┝👑̘̓ͅ᪾⃟⋮⧶ *Dono do Bot*: _${donoName}_
┃┝⏱️̘̓ͅ᪾⃟⋮⧶ *Velocidade de resposta:* _${latensi.toFixed(4)} segundos._
┃┝⚡̘̓ͅ᪾⃟⋮⧶ *Tempo online do bot:* _${formatTime(uptime)}_
┃┝💻̘̓ͅ᪾⃟⋮⧶ *Sistema Operacional:* _${os.type()}_
┃┝📂̘̓ͅ᪾⃟⋮⧶ *Versão do SO:* _${os.release()}_
┃┝📊̘̓ͅ᪾⃟⋮⧶ *Porcentagem de desempenho:* _${porcentagemDesempenho}_
┃┝💾̘̓ͅ᪾⃟⋮⧶ *Memória RAM total:* _${totalMemory} GB_
┃┝💾̘̓ͅ᪾⃟⋮⧶ *Memória RAM disponível:* _${freeMemory} GB_
┃┝🖥️̘̓ͅ᪾⃟⋮⧶ *Uso da CPU:* _${cpuUsage}%_
┃┝🔄̘̓ͅ᪾⃟⋮⧶ *Threads Ativas:* _${totalThreads}_
┃┝💻̘̓ͅ᪾⃟⋮⧶ *Hospedagem:* _${HostOuNao}_
┃┝🛠️̘̓ͅ᪾⃟⋮⧶ *Versão Node.js:* _${nodeVersion}_
┃┝🖥️̘̓ͅ᪾⃟⋮⧶ *Plataforma:* _${platform}_
┃╰━━━─────━━━╯
╰━°𖠁°✮•| ⪧𝐏𝐈𝐍𝐆 𝐃𝐎 𝐁𝐎𝐓⊰ |•✮°𖠁°━╯`;
//ENVIA AS INFORMAÇÕES PARA O USUÁRIO
await clara.sendMessage(from, {image: {url: pingUrl}, caption: pingResponse}, {quoted: selo});
}
break;

case "repet":
  if (!q) return enviar("Cadê o texto?");
  var [texto1, texto2, texto3] = q.split("/");
  texto2 = parseInt(texto2);
  texto3 = parseInt(texto3);

  function coracaoPiramide() {
    const texto = texto1;
    const linhas = texto2;
    let resultado = "";
    for (let ciclo = 0; ciclo < texto3; ciclo++) {
      for (let i = 0; i < linhas; i++) {
        resultado += " ".repeat(i * 4) + texto + "\n";
      }
      for (let i = linhas - 2; i >= 0; i--) {
        resultado += " ".repeat(i * 4) + texto + "\n";
      }
    }
    clara.sendMessage(from, { text: resultado });
  }
  coracaoPiramide();
  break;

//\\
//★・・・・・・★・・ MSG NO COMANDO ・・・★・・・・・★
default:
if (isCmd) {
reagir("🔴")
clara.sendMessage(from, {sticker: {url: "./clara/figurinhas/clara6.webp"}})
clara.sendMessage(from, {text: "*𝙼𝚎𝚞 𝚍𝚎𝚖𝚘𝚗𝚒𝚘, 𝚖𝚊𝚜 𝚟𝚘𝚌𝚎 𝚎 𝚋𝚞𝚛𝚛𝚘, 𝚑𝚎𝚒𝚗? 𝙺𝚔𝚔𝚔𝚔! 𝙲𝚘𝚖𝚊𝚗𝚍𝚘 𝚎𝚛𝚛𝚊𝚍𝚘! 𝚃𝚎𝚗𝚝𝚊 𝚍𝚊𝚛 𝚞𝚖𝚊 𝚘𝚕𝚑𝚊𝚍𝚊 𝚗𝚘 𝚖𝚎𝚗𝚞 𝚎 𝚙𝚎𝚐𝚊 𝚞𝚖 𝚍𝚘𝚌𝚒𝚗𝚑𝚘... 𝙳𝙴 𝙶𝚁𝙰𝙲𝙰! ~𝙷𝚎𝚑𝚎𝚑𝚎~*"})
}
break;
}
//★・・・・・・★・・・ IF ・・・★・・・・・・★
if (!botz && texto.includes(`sticker`)) {
{
var RSM = info.message?.extendedTextMessage?.contextInfo?.quotedMessage
var boij2 = RSM?.imageMessage || info.message?.imageMessage || RSM?.viewOnceMessageV2?.message?.imageMessage || info.message?.viewOnceMessageV2?.message?.imageMessage || info.message?.viewOnceMessage?.message?.imageMessage || RSM?.viewOnceMessage?.message?.imageMessage
var boij = RSM?.videoMessage || info.message?.videoMessage || RSM?.viewOnceMessageV2?.message?.videoMessage || info.message?.viewOnceMessageV2?.message?.videoMessage || info.message?.viewOnceMessage?.message?.videoMessage || RSM?.viewOnceMessage?.message?.videoMessage
let packin;
let author23;
if (`${sender.split("@")[0]}` === numeroDono) {
packin =  q ? q?.split("/")[0] : botName
author23 = q ? q?.split("/")[1] : q?.split("/")[0] ? '' : `♥️ ${donoName}`
} else {
packin =  q ? q?.split("/")[0] : `${emoji} ⃟𝙱𝚘𝚝: ${botName}\n🤖⃟ 𝙽𝚞𝚖𝚎𝚛𝚘 𝚋𝚘𝚝: ${numeroBot.split('@')[0]}`
author23 = q ? q?.split("/")[1] : q?.split("/")[0] ? '' : `\n\n👤⃟𝙿𝚎𝚍𝚒𝚍𝚘 𝚙𝚘𝚛: ${pushname}\n👑⃟𝙲𝚛𝚒𝚊𝚍𝚘𝚛: 𝙿𝚎𝚍𝚛𝚘𝚣𝚣 𝙼𝚘𝚍𝚜`
}
if(boij2){
reagir('💭')
enviar('Hum.... espere um minutinho ai 😚')
owgi = await getFileBuffer(boij2, 'image')
let encmediaa = await sendImageAsSticker2(clara, from, owgi, info, { packname:packin, author:author23})
await DLT_FL(encmediaa)
} else if(boij && boij.seconds < 11){
owgi = await getFileBuffer(boij, 'video')
let encmedia = await sendVideoAsSticker2(clara, from, owgi, info, { packname:packin, author:author23})
await DLT_FL(encmedia)
reagir(emoji)
} else {
return enviar(`Marque uma foto ou o vídeo(menor que 10s) para fazer sua figurinha com o comando: ${prefix+comando}`)
}
}
}
if (!botz && texto.includes(`kill`)) {
if(!isBotGroupAdmins) return emviar(msg.botadm)
if(!isGroupAdmins && !isDono) return enviar(msg.adm)
if (!isGroupAdmins && !isDono) return enviar(msg.adm)
try {
if(!menc_os2 || menc_jid2[1]) return enviar("Marque a mensagem do usuário ou marque o @ dele.., lembre de só marcar um usuário...")
if(!JSON.stringify(groupMembers).includes(menc_os2)) return enviar("𝚅𝚒𝚒𝚡𝚡! 𝙴𝚜𝚜𝚎 𝚍𝚊𝚒 𝚓𝚊 𝚝𝚊 𝚌𝚘𝚖 𝚘 𝚝𝚒𝚗𝚑𝚘𝚜𝚘 𝚔𝚔.")
if(numeroBot.includes(menc_os2)) return enviar('𝙴𝚒𝚒𝚒! 𝚂𝚘𝚞 𝚍𝚎𝚜𝚌𝚊𝚛𝚝𝚊𝚟𝚎𝚕 𝚗𝚊𝚘 𝚔𝚔')
if(numeroDono.includes(menc_os2)) return enviar('*𝙽𝚊𝚘 𝚝𝚘𝚞 𝚐𝚘𝚜𝚝𝚊𝚗𝚍𝚘 𝚍𝚒𝚜𝚜𝚘, 𝚟𝚘𝚌𝚎 𝚝𝚊 𝚝𝚎𝚗𝚍𝚘 𝚍𝚊𝚛 𝚋𝚊𝚗 𝚗𝚘 𝚒𝚛𝚞𝚖𝚒𝚗𝚑𝚊??*')
clara.groupParticipantsUpdate(from, [menc_os2], "remove") 
clara.sendMessage(from, {text: `*𝙴𝚜𝚜𝚎 𝚊𝚒 𝚏𝚘𝚒 𝚌𝚊𝚗𝚝𝚊𝚛 𝚌𝚘𝚖 𝚘 𝚝𝚒𝚗𝚑𝚘𝚜𝚘 𝚔𝚔𝚔*`, mentions: [sender]}) 
} catch (e) {
console.log(e)
}
}

if (!botz && texto.includes(`grupo`)) {
go = body.replace('grupo ', '')
console.log(go)
if (!isGroup) return enviar(msg.grupo)
if (!isBotGroupAdmins) return enviar(msg.botadm)
if (!isGroupAdmins && !isDono) return enviar(msg.adm)
try {
if (go === "a"){
await reagir("🔓")
await clara.groupSettingUpdate(from, "not_announcement")
enviar(`𝙾 𝚐𝚛𝚞𝚙𝚘 𝚏𝚘𝚒 𝚊𝚋𝚎𝚛𝚝𝚘 🔓`)
}
if (go === "f") {
await reagir("🔒")
await clara.groupSettingUpdate(from, "announcement")
enviar(`𝙾 𝚐𝚛𝚞𝚙𝚘 𝚏𝚘𝚒 𝚏𝚎𝚌𝚑𝚊𝚍𝚘 🔒`)
} else {
enviar(`𝙿𝚊𝚛𝚊 𝚙𝚘𝚍𝚎𝚛 𝚊𝚋𝚛𝚒𝚛 𝚘 𝚐𝚛𝚞𝚙𝚘 𝚞𝚜𝚎: grupo a\n𝙴 𝚙𝚊𝚛𝚊 𝚘 𝚏𝚎𝚌𝚑𝚊𝚛 𝚞𝚜𝚎: grupo f`)
}
} catch(e) {
reagir("⚠️")
consoleErro(e)
enviar(msg.error)
}
}
//
if (!botz && texto.includes(`@${clarinha}`)) {
try {
clara2 = content.replace(`@${clarinha}`, "");
Prompt = `
A partir de agora, você é uma IA chamada "Valac Clara" uma personagem do anime "mairimashita iruma-kun". Evite informações desnecessárias e concentre-se em fornecer explicações concisas e úteis.

${clara2}`
api = await fetch(`${BaseApiDark}/api/gemini?texto=${Prompt}&apikey=${DARK_APIKEY}
`)
data2 = await api.json()
await reagir(emoji)
await clara.sendMessage(from, {text: data2.resposta}, {quoted: seloMeta})
} catch (e) {
consoleErro(e)
enviar(`Deu erro ao enviar a resposta`)
reagir("❌")
}
}

//★・・・・・・★・・・ FINAL ・・・★・・・・・・★
} catch (error) {
console.error('Erro ao processar mensagem:', error);
}
});

//★・・・・・・★・・・ CONEXÃO ・・・★・・・・・・★
clara.ev.on('connection.update', (update) => {
const { connection, lastDisconnect } = update;
if (connection === 'open') {//CONEXÃO ABERTA
consoleInfo("Conexão estabelecida...")
inicial();
console.log(banner.string, banner2.string, banner3.string)
consoleSucesso("Bot conectado com sucesso 🧁")
} else if (connection === "connecting") {//TENTANDO CONECTAR
console.log(``)
consoleInfo(`Estabelecendo conexão com o whatsapp...`)
} else if (connection === 'close') {//CONEXÃO FECHADA
const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
if (shouldReconnect) {
consoleInfo('Tentando reconectar...');
iniciarJogosClara();
} else {
consoleErro('Desconectado. Finalizando...');
}}
});
}


//🚀 Iniciar Bot
iniciarJogosClara();
//★・・・・・★・・・ ATUALIZAÇÃO ・・・★・・・・・★
fs.watchFile(__filename, (curr, prev) => {
  if (curr.mtime.getTime() !== prev.mtime.getTime()) {
    consoleAviso('index editada, reiniciando...');
    process.exit();
  }
});

fs.watchFile('./dono/menus.js', (curr, prev) => {
  if (curr.mtime.getTime() !== prev.mtime.getTime()) {
    consoleAviso('menu editado, reiniciando...');
    process.exit();
  }
});

fs.watchFile('./dono/dodo.js', (curr, prev) => {
  if (curr.mtime.getTime() !== prev.mtime.getTime()) {
    consoleAviso('dodo editado, reiniciando...');
    process.exit();
  }
});
//★・・・・・・★・・・ FIM... ・・・★・・・・・・★
//PEDROZZMODS FEZ ISSO AQUI 👋