case 'botaocopia':
await clara.relayMessage(from,
{interactiveMessage: {
body: { text: `Seu texto aqui`,
},nativeFlowMessage: {
buttons: [{

"name": "cta_copy",
"buttonParamsJson": "{\"display_text\":\"Nome do botão aqui\",\"id\":\"Texto para copiar ou comando aqui\",\"copy_code\":\"Texto para copiar aqui\"}"
 }
 
],
messageParamsJson: "",
},
},
},
{}
).then((r) => console.log(r));
break

case 'botaourl':
await clara.relayMessage(from,
{interactiveMessage: {
body: { text: `Seu texto aqui`,
},nativeFlowMessage: {
buttons: [{
"name": "cta_url",
"buttonParamsJson": "{\"display_text\":\"Nome do botão aqui\",\"url\":\"URL aqui\",\"merchant_url\":\"URL aqui\"}"
 }
],
messageParamsJson: "",
},
},
},
{}
).then((r) => console.log(r));
break

case 'botaocomando':
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
break

case 'botaolista':
await clara.relayMessage(from,
{interactiveMessage: {
body: { text: `Seu texto aqui`,
},nativeFlowMessage: {
buttons: [{


name: "single_select",
buttonParamsJson: JSON.stringify({
 title: "Nome da lista aqui",
 sections: [{
 title: "Título da seção aqui",
rows: [{
header: "Título do cabeçalho aqui",
title: "Título principal aqui",
 description: "Descrição aqui",
 id: `Comando aqui`},
{
header: "Título do cabeçalho aqui",
title: "Título principal aqui",
 description: "Descrição aqui",
id: `Comando aqui`}
 ],
}]
 }) }
 
],
messageParamsJson: "",
},
},
},
{}
).then((r) => console.log(r));
break


case 'Simples':
botaoLista(clara, from, "Bom dia", fotomenu, "titulo", "titulo2", [{ header: "nome", title: "titulo", description: "", id: `${prefix}menu`}])

botaoNormal(clara, from, "oi", fotomenu, [{ display_text: "Menu", id: `${prefix}menu` }])

botaoCopia(clara, from, fotomenu, "Texto principal aqui",
[{name: "Copiar", id: "texto", copy: "texto" }]);

botaoUrl(clara, from, fotomenu, "Clique no botão abaixo para acessar o site:", [{name: "Visitar Site", url: "link"},]);
break
