//NÃO MEXA NO (donoName, botName, prefixo, timed, data, hora) SE NÃO SOUBER PARA OQ SERVE, MEXA SOMENTE NO TEXTO DO MENU
const menu = ( donoName, botName, prefixo, timed, data, hora, totalCmd, moji, emoji ) => { 
return `╭━°𖠁°✮•| ⪧𖠁⊰ |•✮°𖠁°━╮
┝⊰ ➪ 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐂̧𝐎̃𝐄𝐒
╰━°𖠁°✮•| ⪧𖠁⊰ |•✮°𖠁°━╯
┃┝⋆⃟ۜ🍏 ${timed}
┃┝⋆⃟ۜ🍏 Bot: ${botName}
┃┝⋆⃟ۜ🍏 Prefix: ${prefixo}
┃┝⋆⃟ۜ🍏 Dono: ${donoName}
┃┝⋆⃟ۜ🍏 Hora: ${hora}
┃┝⋆⃟ۜ🍏 Data: ${data}
┃┝⋆⃟ۜ🍏 Total cmd: ${totalCmd}
┃╰━━━─────━━━╯
╰━°𖠁°✮•| ⪧𖠁⊰ |•✮°𖠁°━╯
╭━°𖠁°✮•| ⪧𖠁⊰ |•✮°𖠁°━╮
┝⊰ ➪ 𝐌𝐄𝐍𝐔 𝐏𝐑𝐈𝐍𝐂𝐈𝐏𝐀𝐋
╰━°𖠁°✮•| ⪧𖠁⊰ |•✮°𖠁°━╯   
┃╭━━━─────━━━╮
┃┝⋆⃟ۜ🍏 menuadm ➝ Menu do ADM
┃┝⋆⃟ۜ🍏 menudono ➝ Menu do DONO
┃┝⋆⃟ۜ🍏 menujogos ➝ Menu dos GAME
┃┝⋆⃟ۜ🍏 developer ➝ Info do Criador
┃╰━━━─────━━━╯
╰━°𖠁°✮•| ⪧𖠁⊰ |•✮°𖠁°━╯
╭━°𖠁°✮•| ⪧𖠁⊰ |•✮°𖠁°━╮
┝⊰ ➪ 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃
╰━°𖠁°✮•| ⪧𖠁⊰ |•✮°𖠁°━╯   
┃╭━━━─────━━━╮
┃┝⋆⃟ۜ🍏 play (nome da música)
┃┝⋆⃟ۜ🍏 play2 (nome da música)
┃┝⋆⃟ۜ🍏 play3 (nome da música)
┃┝⋆⃟ۜ🍏 play4 (nome da música)
┃┝⋆⃟ۜ🍏 play5 (nome da música)
┃┝⋆⃟ۜ🍏 play6 (nome da música)
┃┝⋆⃟ۜ🍏 playvd (Nome do vídeo)
┃┝⋆⃟ۜ🍏 playvd2 (Nome do vídeo)
┃┝⋆⃟ۜ🍏 ytmp3 (link do vídeo)
┃┝⋆⃟ۜ🍏 ytcanal (nome do canal)
┃┝⋆⃟ۜ🍏 tiktokvd (url do vídeo)
┃┝⋆⃟ۜ🍏 tiktokad (url do vídeo)
┃┝⋆⃟ۜ🍏 tiktok2 (url do vídeo)
┃┝⋆⃟ۜ🍏 aptoide (Nome do aplicativo)
┃╰━━━─────━━━╯
╰━°𖠁°✮•| ⪧𖠁⊰ |•✮°𖠁°━╯
╭━°𖠁°✮•| ⪧𖠁⊰ |•✮°𖠁°━╮
┝⊰ ➪ 𝐏𝐄𝐒𝐐𝐔𝐈𝐒𝐀
╰━°𖠁°✮•| ⪧𖠁⊰ |•✮°𖠁°━╯   
┃╭━━━─────━━━╮
┃┝⋆⃟ۜ🍏 filme (nome do filme)
┃┝⋆⃟ۜ🍏 serie (nome da série)
┃┝⋆⃟ۜ🍏 wikipedia (pesquisa)
┃┝⋆⃟ۜ🍏 wallpaper (nome)
┃┝⋆⃟ۜ🍏 google (pesquisa)
┃┝⋆⃟ۜ🍏 pensador (pesquisa)
┃┝⋆⃟ۜ🍏 playstore (nome do app)
┃╰━━━─────━━━╯
╰━°𖠁°✮•| ⪧𖠁⊰ |•✮°𖠁°━╯
╭━°𖠁°✮•| ⪧𖠁⊰ |•✮°𖠁°━╮
┝⊰ ➪  𝐂𝐎𝐍𝐒𝐔𝐋𝐓𝐀𝐒
╰━°𖠁°✮•| ⪧𖠁⊰ |•✮°𖠁°━╯   
┃╭━━━─────━━━╮
┃┝⋆⃟ۜ🍏 nome (Dados)
┃┝⋆⃟ۜ🍏 nome2 (Dados)
┃┝⋆⃟ۜ🍏 cpf (Dados)
┃┝⋆⃟ۜ🍏 titulo_eleitor (Dados)
┃┝⋆⃟ۜ🍏 nome_mae (Dados)
┃┝⋆⃟ۜ🍏 telefone (Dados)
┃╰━━━─────━━━╯
╰━°𖠁°✮•| ⪧𖠁⊰ |•✮°𖠁°━╯
╭━°𖠁°✮•| ⪧𖠁⊰ |•✮°𖠁°━╮
┝⊰ ➪ 𝐎𝐔𝐓𝐑𝐎𝐒 𝐂𝐌𝐃
╰━°𖠁°✮•| ⪧𖠁⊰ |•✮°𖠁°━╯   
┃╭━━━─────━━━╮
┃┝⋆⃟ۜ🍏 metadinha
┃┝⋆⃟ۜ🍏 gerarnick
┃┝⋆⃟ۜ🍏 tradutor
┃┝⋆⃟ۜ🍏 tts
┃┝⋆⃟ۜ🍏 cuttly
┃┝⋆⃟ۜ🍏 cep
┃┝⋆⃟ۜ🍏 spamngl
┃╰━━━─────━━━╯
╰━°𖠁°✮•| ⪧𖠁⊰ |•✮°𖠁°━╯
╭━°𖠁°✮•| ⪧𖠁⊰ |•✮°𖠁°━╮
┝⊰ ➪ 𝐈𝐍𝐓𝐄𝐋𝐈𝐆𝐄𝐍𝐂𝐈𝐀 𝐀𝐑𝐓𝐈𝐅𝐈𝐂𝐈𝐀𝐋
╰━°𖠁°✮•| ⪧𖠁⊰ |•✮°𖠁°━╯   
┃╭━━━─────━━━╮
┃┝⋆⃟ۜ🍏 dalle (Prompt)
┃┝⋆⃟ۜ🍏 dallev2 (Prompt)
┃┝⋆⃟ۜ🍏 3d (Prompt)
┃┝⋆⃟ۜ🍏 tattoo (Prompt)
┃┝⋆⃟ۜ🍏 cartoon (Prompt)
┃┝⋆⃟ۜ🍏 ghibli (Prompt)
┃┝⋆⃟ۜ🍏 fantasia (Prompt)
┃┝⋆⃟ۜ🍏 imagine-ia (Prompt)
┃┝⋆⃟ۜ🍏 gpt (Prompt)
┃┝⋆⃟ۜ🍏 gpt2 (Prompt)
┃┝⋆⃟ۜ🍏 gemini (Prompt)
┃┝⋆⃟ۜ🍏 llama (Prompt)
┃┝⋆⃟ۜ🍏 llama2 (Prompt)
┃┝⋆⃟ۜ🍏 sqlcode (Prompt)
┃┝⋆⃟ۜ🍏 mistral (Prompt)
┃┝⋆⃟ۜ🍏 deepseek (Prompt)
┃┝⋆⃟ۜ🍏 deepseek-code (Prompt)
┃╰━━━─────━━━╯
╰━°𖠁°✮•| ⪧𖠁⊰ |•✮°𖠁°━╯
╭━°𖠁°✮•| ⪧𖠁⊰ |•✮°𖠁°━╮
┝⊰ ➪ 𝐅𝐈𝐆𝐔𝐑𝐈𝐍𝐇𝐀𝐒
╰━°𖠁°✮•| ⪧𖠁⊰ |•✮°𖠁°━╯   
┃╭━━━─────━━━╮
┃┝⋆⃟ۜ🍏 s (Texto)
┃┝⋆⃟ۜ🍏 stickerp (Texto)
┃┝⋆⃟ۜ🍏 attp (Texto)
┃┝⋆⃟ۜ🍏 attp2 (Texto)
┃┝⋆⃟ۜ🍏 attp3 (Texto)
┃┝⋆⃟ۜ🍏 attp4 (Texto)
┃┝⋆⃟ۜ🍏 attp5 (Texto)
┃┝⋆⃟ۜ🍏 figubebe (Num)
┃┝⋆⃟ۜ🍏 figucoreana (Num)
┃┝⋆⃟ۜ🍏 figuanime (Num)
┃┝⋆⃟ۜ🍏 figuanimais (Num)
┃┝⋆⃟ۜ🍏 figudesenho (Num)
┃┝⋆⃟ۜ🍏 figuraiva (Num)
┃┝⋆⃟ۜ🍏 figuroblox (Num)
┃┝⋆⃟ۜ🍏 figurandom (Num)
┃┝⋆⃟ۜ🍏 figu+18 (Num)
┃┝⋆⃟ۜ🍏 figumemes2 (Num)
┃┝⋆⃟ۜ🍏 figuanime2 (Num)
┃┝⋆⃟ۜ🍏 figucoreanas2 (Num)
┃┝⋆⃟ۜ🍏 figugatos (Num)
┃┝⋆⃟ۜ🍏 figubts (Num)
┃╰━━━─────━━━╯
╰━°𖠁°✮•| ⪧𖠁⊰ |•✮°𖠁°━╯
╭━°𖠁°✮•| ⪧𖠁⊰ |•✮°𖠁°━╮
┝⊰ ➪ 𝐂𝐌𝐃 +𝟏𝟖
╰━°𖠁°✮•| ⪧𖠁⊰ |•✮°𖠁°━╯   
┃╭━━━─────━━━╮
┃┝⋆⃟ۜ🍏 onlyimg
┃┝⋆⃟ۜ🍏 foto18
┃┝⋆⃟ۜ🍏 video18
┃┝⋆⃟ۜ🍏 hentai
┃┝⋆⃟ۜ🍏 trap 
┃┝⋆⃟ۜ🍏 wifu 
┃┝⋆⃟ۜ🍏 blowjob 
┃┝⋆⃟ۜ🍏 neko
┃┝⋆⃟ۜ🍏 hanal 
┃┝⋆⃟ۜ🍏 anal 
┃┝⋆⃟ۜ🍏 pussy 
┃┝⋆⃟ۜ🍏 hentai
┃┝⋆⃟ۜ🍏 thigh 
┃┝⋆⃟ۜ🍏 boobs 
┃┝⋆⃟ۜ🍏 ass 
┃┝⋆⃟ۜ🍏 kanna 
┃┝⋆⃟ۜ🍏 4k 
┃┝⋆⃟ۜ🍏 hthigh 
┃┝⋆⃟ۜ🍏 tentacle 
┃┝⋆⃟ۜ🍏 hboobs
┃┝⋆⃟ۜ🍏 holo 
┃┝⋆⃟ۜ🍏 hass 
┃┝⋆⃟ۜ🍏 pgif 
┃┝⋆⃟ۜ🍏 yaoi
┃┝⋆⃟ۜ🍏 hneko 
┃┝⋆⃟ۜ🍏 hkitsune 
┃┝⋆⃟ۜ🍏 kemonomimi
┃┝⋆⃟ۜ🍏 hanalvizu 
┃┝⋆⃟ۜ🍏 analvizu 
┃┝⋆⃟ۜ🍏 pussyvizu 
┃┝⋆⃟ۜ🍏 hentaivizu
┃┝⋆⃟ۜ🍏 thighvizu 
┃┝⋆⃟ۜ🍏 boobsvizu 
┃┝⋆⃟ۜ🍏 assvizu 
┃┝⋆⃟ۜ🍏 kannavizu 
┃┝⋆⃟ۜ🍏 4kvizu 
┃┝⋆⃟ۜ🍏 hthighvizu 
┃┝⋆⃟ۜ🍏 tentaclevizu 
┃┝⋆⃟ۜ🍏 hboobsvizu
┃┝⋆⃟ۜ🍏 holovizu 
┃┝⋆⃟ۜ🍏 hassvizu 
┃┝⋆⃟ۜ🍏 pgifvizu 
┃┝⋆⃟ۜ🍏 yaoivizu
┃┝⋆⃟ۜ🍏 hnekovizu 
┃┝⋆⃟ۜ🍏 hkitsunevizu 
┃┝⋆⃟ۜ🍏 kemonomimivizu
┃┝⋆⃟ۜ🍏 plaquinha
┃┝⋆⃟ۜ🍏 plaquinha2
┃┝⋆⃟ۜ🍏 plaquinha3
┃┝⋆⃟ۜ🍏 plaquinha4
┃┝⋆⃟ۜ🍏 plaquinha5
┃┝⋆⃟ۜ🍏 plaquinha6
┃┝⋆⃟ۜ🍏 plaquinha7
┃┝⋆⃟ۜ🍏 plaquinha8
┃┝⋆⃟ۜ🍏 plaquinha9
┃┝⋆⃟ۜ🍏 plaquinha10
┃┝⋆⃟ۜ🍏 plaquinha11
┃┝⋆⃟ۜ🍏 plaquinha12
┃┝⋆⃟ۜ🍏 plaquinha12
┃┝⋆⃟ۜ🍏 plaquinha14
┃┝⋆⃟ۜ🍏 plaquinha15
┃┝⋆⃟ۜ🍏 plaquinha16
┃╰━━━─────━━━╯
╰━°𖠁°✮•| ⪧𖠁⊰ |•✮°𖠁°━╯
`
}
exports.menu = menu
///By pedrozz Mods

//NÃO MEXA NO (donoName, botName, prefixo, timed, data, hora) SE NÃO SOUBER PARA OQ SERVE, MEXA SOMENTE NO TEXTO DO MENU
const menuAdm = ( donoName, botName, prefixo, timed, data, hora, totalCmd, moji, emoji ) => { 
return `╭━°𖠁°✮•| ⪧𖠁⊰ |•✮°𖠁°━╮
┝⊰ ➪ 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐂̧𝐎̃𝐄𝐒
╰━°𖠁°✮•| ⪧𖠁⊰ |•✮°𖠁°━╯   
┃╭━━━─────━━━╮
┃┝⋆⃟ۜ🍏 ${timed}
┃┝⋆⃟ۜ🍏 Bot: ${botName}
┃┝⋆⃟ۜ🍏 Prefix: ${prefixo}
┃┝⋆⃟ۜ🍏 Dono: ${donoName}
┃┝⋆⃟ۜ🍏 Hora: ${hora}
┃┝⋆⃟ۜ🍏 Data: ${data}
┃┝⋆⃟ۜ🍏 Total cmd: ${totalCmd}
┃╰━━━─────━━━╯
╰━°𖠁°✮•| ⪧𖠁⊰ |•✮°𖠁°━╯
╭━°𖠁°✮•| ⪧𖠁⊰ |•✮°𖠁°━╮
┝⊰ ➪ 𝐂𝐎𝐌𝐀𝐍𝐃𝐎𝐒 𝐀𝐃𝐌
╰━°𖠁°✮•| ⪧𖠁⊰ |•✮°𖠁°━╯   
┃╭━━━─────━━━╮
┃┝⋆⃟ۜ🍏 ban (@)
┃┝⋆⃟ۜ🍏 grupo a/f
┃┝⋆⃟ۜ🍏 antilink 1/0
┃┝⋆⃟ۜ🍏 bemvindo 1/0
┃┝⋆⃟ۜ🍏 legendabv (Texto)
┃┝⋆⃟ۜ🍏 legendasaiu (Texto)
┃┝⋆⃟ۜ🍏 resetlink (Reset o link do gp)
┃┝⋆⃟ۜ🍏 nomegp (Novo nome ao grupo)
┃┝⋆⃟ۜ🍏 delet (Apagar mensagens)
┃┝⋆⃟ۜ🍏 grupin (30𝑠 | 1𝑚 | 5𝑚 | 10𝑚 | 30𝑚 | 1ℎ | 3ℎ | 12ℎ)
┃╰━━━─────━━━╯
╰━°𖠁°✮•| ⪧𖠁⊰ |•✮°𖠁°━╯`
}
exports.menuAdm = menuAdm
///By pedrozz Mods

//NÃO MEXA NO (donoName, botName, prefixo, timed, data, hora) SE NÃO SOUBER PARA OQ SERVE, MEXA SOMENTE NO TEXTO DO MENU
const menuDono = ( donoName, botName, prefixo, timed, data, hora, totalCmd, moji, emoji ) => { 
return `╭━°𖠁°✮•| ⪧𖠁⊰ |•✮°𖠁°━╮
┝⊰ ➪ 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐂̧𝐎̃𝐄𝐒
╰━°𖠁°✮•| ⪧𖠁⊰ |•✮°𖠁°━╯   
┃╭━━━─────━━━╮
┃┝⋆⃟ۜ🍏 ${timed}
┃┝⋆⃟ۜ🍏 Bot: ${botName}
┃┝⋆⃟ۜ🍏 Prefix: ${prefixo}
┃┝⋆⃟ۜ🍏 Dono: ${donoName}
┃┝⋆⃟ۜ🍏 Hora: ${hora}
┃┝⋆⃟ۜ🍏 Data: ${data}
┃┝⋆⃟ۜ🍏 Total cmd: ${totalCmd}
┃╰━━━─────━━━╯
╰━°𖠁°✮•| ⪧𖠁⊰ |•✮°𖠁°━╯
╭━°𖠁°✮•| ⪧𖠁⊰ |•✮°𖠁°━╮
┝⊰ ➪ 𝐂𝐎𝐌𝐀𝐍𝐃𝐎𝐒 𝐃𝐎𝐍𝐎
╰━°𖠁°✮•| ⪧𖠁⊰ |•✮°𖠁°━╯   
┃╭━━━─────━━━╮
┃┝⋆⃟ۜ🍏 reset (reinicia o bot)
┃┝⋆⃟ۜ🍏 dark (info sobre a api)
┃┝⋆⃟ۜ🍏 ping (velocidade do bot)
┃╰━━━─────━━━╯
╰━°𖠁°✮•| ⪧𖠁⊰ |•✮°𖠁°━╯`
}
exports.menuDono = menuDono
///By pedrozz Mods

//NÃO MEXA NO (donoName, botName, prefixo, timed, data, hora) SE NÃO SOUBER PARA OQ SERVE, MEXA SOMENTE NO TEXTO DO MENU
const menuJogos = ( donoName, botName, prefixo, timed, data, hora, totalCmd, moji, emoji ) => { 
return `╭━°𖠁°✮•| ⪧𖠁⊰ |•✮°𖠁°━╮
┝⊰ ➪ 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐂̧𝐎̃𝐄𝐒
╰━°𖠁°✮•| ⪧𖠁⊰ |•✮°𖠁°━╯   
┃╭━━━─────━━━╮
┃┝⋆⃟ۜ🍏 ${timed}
┃┝⋆⃟ۜ🍏 Bot: ${botName}
┃┝⋆⃟ۜ🍏 Prefix: ${prefixo}
┃┝⋆⃟ۜ🍏 Dono: ${donoName}
┃┝⋆⃟ۜ🍏 Hora: ${hora}
┃┝⋆⃟ۜ🍏 Data: ${data}
┃┝⋆⃟ۜ🍏 Total cmd: ${totalCmd}
┃╰━━━─────━━━╯
╰━°𖠁°✮•| ⪧𖠁⊰ |•✮°𖠁°━╯
╭━°𖠁°✮•| ⪧𖠁⊰ |•✮°𖠁°━╮
┝⊰ ➪ 𝐌𝐄𝐍𝐔 𝐉𝐎𝐆𝐎𝐒
╰━°𖠁°✮•| ⪧𖠁⊰ |•✮°𖠁°━╯   
┃╭━━━─────━━━╮
┃┝⋆⃟ۜ🍏 comando
┃╰━━━─────━━━╯
╰━°𖠁°✮•| ⪧𖠁⊰ |•✮°𖠁°━╯`
}
exports.menuJogos = menuJogos
///By pedrozz Mods