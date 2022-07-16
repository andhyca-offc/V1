/**
* create by hyzer official
* g usah di hapus anjg, gw cape sumpah
* sc free, bayar pake subs aja udh good
* jika ada bug/mau request fitur
* chat me on wa https://wa.me/6287892711054
* follow my instagram @zexyds_
**/

//━━━━━━━━[ DEFAULT SETTINGS ]━━━━━━━━//
let { default: makeWASocket, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia } = require('@adiwajshing/baileys')
let levelling = require('../lib/levelling')
let fs = require('fs')
const util = require('util')
const os = require('os')
let path = require('path')
let { createHash} = require('crypto')
let fetch = require('node-fetch')
let { perfomance } = require('perf_hooks')
let moment = require('moment-timezone')

//━━━━━━━━[ DEFAULT MENU ]━━━━━━━━//
const defaultMenu = {
  before:`
┅═━–〈 *U S E R*
┊• *Name:* %name
┊• *Limit:* %limit
┊• *Role:* %role
┊• *Level:* %level 
┊• *Xp:* (%exp / %maxexp) 
┊• *Total Xp:* %totalexp* Xp
┗––––––––––✦

❏═┅═━–〈 *T O D A Y*
┊• *Today:* %week %weton
┊• *Date:* %date
┊• *Date Islamic:* %dateIslamic
┊• *Time:* %time
┗––––––––––✦

❏═┅═━–〈 *I N F O*
┊• *Runtime:* %uptime
┊• *Database:* %rtotalreg 𝚍𝚊𝚛𝚒 %totalreg 
┊• *Memory Used:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
┊• *Time Wib:* ${wib} WIB
┊• *Users:* ${Object.keys(global.db.data.users).length} User
┊• *Chat Terbanned:* ${Object.entries(global.db.data.chats).filter(chat => chat[1].isBanned).length} Chat
┊• *Pengguna Terbanned:* ${Object.entries(global.db.data.users).filter(user => user[1].banned).length} Pengguna
┊• *Mode:* ${global.opts['self'] ? 'Self' : 'publik'}
┗––––––––––✦


%readmore`.trimStart(), 
  header: '❏––––––『 *%category* 』––––––',
  body: '┊✦ %cmd %islimit %isPremium',
  footer: '┗━═┅═━––––––๑\n', 
  after: ``,
}

//━━━━━━━━[ CATEGORY ]━━━━━━━━//
let handler = async (m, { conn, usedPrefix: _p, args, command }) => {
  let tags
  let teks = `${args[0]}`.toLowerCase()
  let arrayMenu = ['all', 'absen', 'rpg', 'anime', 'downloader', 'game', 'fun', 'xp', 'github', 'group', 'image', 'quotes', 'admin', 'info', 'internet', 'islam', 'kerang', 'maker', 'owner', 'suara', 'premium', 'quotes', 'info', 'stalk', 'shortlink', 'sticker', 'tools', 'text', 'nsfw', 'asupan', 'random', 'textpro', 'photooxy']
  if (!arrayMenu.includes(teks)) teks = '404'
  if (teks == 'all') tags = {
  'main': 'MENU UTAMA',
  'advanced': 'ADVANCED',
  'absen': 'MENU ABSEN',
  'anime': 'MENU ANIME',
  'sticker': 'MENU CONVERT',
  'downloader': 'MENU DOWNLOADER',
  'xp': 'MENU EXP',
  'fun': 'MENU FUN',
  'game': 'MENU GAME',
  'github': 'MENU GITHUB',
  'group': 'MENU GROUP',
  'image': 'MENU IMAGE',
  'info': 'MENU INFO',
  'internet': 'INTERNET',
  'islam' : 'MENU ISLAMI',
  'kerang': 'MENU KERANG',
  'maker': 'MENU MAKER',
  'owner': 'MENU OWNER',
  'Pengubah Suara': 'PENGUBAH SUARA',
  'premium': 'PREMIUM MENU',
  'quotes' : 'MENU QUOTES',
  'rpg': 'MENU RPG',
  'stalk': 'MENU STALK',
  'shortlink': 'SHORT LINK',
  'tools': 'MENU TOOLS',
  'vote': 'MENU VOTING',
  'nsfw': 'NSFW MENU', 
  'asupan': 'ASUPAN MENU', 
  'random': 'RANDOM MENU', 
  'textpro': 'TEXT PRO MENU', 
  'photooxy': 'PHOTO OXY MENU', 
  }
  if (teks == 'absen') tags = {
    'absen': 'MENU ABSEN',
    'vote': 'MENU VOTING',
  }
  if (teks == 'anime') tags = {
  'anime': 'MENU ANIME',
  }
  if (teks == 'sticker') tags = {
  'sticker': 'MENU CONVERT',
  }
  if (teks == 'downloader') tags = {
  'downloader': 'MENU DOWNLOADER',
  }
  if (teks == 'xp') tags = {
  'xp': 'MENU EXP',
  }
  if (teks == 'fun') tags = {
  'fun': 'MENU FUN',
  }
  if (teks == 'game') tags = {
  'game': 'MENU GAME',
  }
  if (teks == 'github') tags = {
  'github': 'MENU GITHUB',
  }
  if (teks == 'group') tags = {
  'group': 'MENU GROUP',
  }
  if (teks == 'image') tags = {
  'image': 'MENU IMAGE',
  }
  if (teks == 'info') tags = {
  'info': 'MENU INFO',
  }
  if (teks == 'internet') tags = {
  'internet': 'INTERNET',
  }
  if (teks == 'islam') tags = {
  'islam' : 'MENU ISLAMI',
  }
  if (teks == 'kerang') tags = {
  'kerang': 'MENU KERANG',
  }
  if (teks == 'maker') tags = {
  'maker': 'MENU MAKER',
  }
  if (teks == 'owner') tags = {
    'owner': 'Owner',
    'host': 'Host',
    'advanced': 'Advanced'
  }
  if (teks == 'suara') tags = {
  'Pengubah Suara': 'PENGUBAH SUARA',
  }
  if (teks == 'text') tags = {
  'text': 'MAKER TEXT',
  }
  if (teks == 'premium') tags = {
  'premium': 'PREMIUM MENU',
  }
  if (teks == 'quotes') tags = {
  'quotes' : 'MENU QUOTES',
  }
  if (teks == 'rpg') tags = {
  'rpg': 'MENU RPG',
  }
  if (teks == 'stalk') tags = {
  'stalk': 'MENU STALK',
  }
  if (teks == 'shortlink') tags = {
  'shortlink': 'SHORT LINK',
  }
  if (teks == 'tools') tags = {
  'tools': 'MENU TOOLS',
  }
  if (teks == 'nsfw') tags = {
  'nsfw': 'NSFW MENU', 
  }
  if (teks == 'asupan') tags = {
  'asupan': 'ASUPAN MENU', 
  }
  if (teks == 'random') tags = {
  'random': 'RANDOM MENU', 
  }
  if (teks == 'textpro') tags = {
  'textpro': 'TEXT PRO MENU', 
  }
  if (teks == 'photooxy') tags = {
  'photooxy': 'PHOTO OXY MENU', 
  }

//━━━━━━━━[ DATABASE USER ]━━━━━━━━//
  try {
    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender 
    let name = conn.getName(m.sender)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let premium = global.db.data.users[m.sender].premium
    let user = global.db.data.users[who]
    let { exp, limit, level, money, role } = global.db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let tag = `wa.me/${m.sender.split('@')[0]}`
 m, { contextInfo: { mentionedJid: conn.parseMention(tag) }}

//━━━━━━━━[ TIMER ]━━━━━━━━//
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    let wib = moment.tz('Asia/Jakarta').format('HH:mm:ss')
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let waktuwib = moment.tz('Asia/Jakarta').format('HH:mm:ss')

//━━━━━━━━[ SETTING HELP ]━━━━━━━━//
let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
    return {
      help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
      tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
      prefix: 'customPrefix' in plugin,
      limit: plugin.limit,
      premium: plugin.premium,
      enabled: !plugin.disabled,
    }
  })

//━━━━━━━━[ FAKE REPLY ]━━━━━━━━//
const fkontak = {
	"key": {
    "participants":"0@s.whatsapp.net",
		"remoteJid": "status@broadcast",
		"fromMe": false,
		"id": "Halo"
	},
	"message": {
		"contactMessage": {
			"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
		}
	},
	"participant": "0@s.whatsapp.net"
}
const ftroli = {
    key : {
    remoteJid: 'status@broadcast',
    participant : '0@s.whatsapp.net'
    },
    message: {
    orderMessage: {
    itemCount : 2022,
    status: 1,
    surface : 1,
    message: `Hai Kak ${name}!`, 
    orderTitle: `▮Menu ▸`,
    thumbnail: await (await fetch(fla + 'Menu')).buffer(), //Gambarnye
    sellerJid: '0@s.whatsapp.net' 
    }
    }
    }
const fdoc = {
   key : {
   remoteJid: 'status@broadcast',
   participant : '0@s.whatsapp.net'
   },
   message: {
   documentMessage: {
   title: wm, 
   }
   }
   }

//━━━━━━━━[ BAGIAN MENU ]━━━━━━━━//
if (teks == '404') {
let menuu = `────━⃝┅ *D A S H B O A R D* ┅⃝━────
「 *I N F O  C M D* 」
*Ⓟ* = Premium
*Ⓛ* = Limit
         「 *Ʋser Ɩnfσrmαtισn* 」
🌸• *ɴᴀᴍᴇ:* ${name}
🌸• *ᴛᴀɢs:* ${tag}
🌸• *sᴛᴀᴛᴜs:* ${m.sender.split`@`[0] == nomorown ? 'Developer' : (usrs.premiumTime >= 1 ? 'Premium User' : 'Free User')}
🌸• *ᴘʀᴇᴍɪᴜᴍ:* ${global.prem ? 'Yes' : 'No'}
🌸• *ʟɪᴍɪᴛ:* ${limit}
🌸• *ʟᴇᴠᴇʟ:* ${level}
🌸• *ʀᴏʟᴇ:* ${role}
         「 *Bσt Ɩnfσrmαtισn* 」
🎐• *ᴜᴘᴛɪᴍᴇ:* ${uptime}
🎐• *ᴛɪᴍᴇ:* ${wib} WIB
🎐• *ᴜsᴇʀs:* ${Object.keys(global.db.data.users).length} User
🎐• *ᴄʜᴀᴛ ᴛᴇʀʙᴀɴɴᴇᴅ:* ${Object.entries(global.db.data.chats).filter(chat => chat[1].isBanned).length} Chat
🎐• *ᴘᴇɴɢɢᴜɴᴀ ᴛᴇʀʙᴀɴɴᴇᴅ:* ${Object.entries(global.db.data.users).filter(user => user[1].banned).length} Pengguna
🎐• *ᴍᴏᴅᴇ:* ${global.opts['self'] ? 'Self' : 'publik'}
               「 *𝐀𝐧𝐝𝐡𝐲𝐜𝐚-𝐌𝐝ོ BOT あ⁩* 」
⫹⫺ 𝗧𝗶𝗺𝗲 𝗦𝗲𝗿𝘃𝗲𝗿 : ${time}
⫹⫺ 𝗗𝗮𝘁𝗲 𝗦𝗲𝗿𝘃𝗲𝗿 : ${date}
`
const template = generateWAMessageFromContent(m.key.remoteJid, proto.Message.fromObject({
        listMessage: {
            title: `*------『 LIST MENU 』------*\n*${ucapan()} ${name}*\n\n`,
            description: Silahkan Pilih Menu Yang Tersedia,
            buttonText: 'CLICK HERE',
            listType: 1,
            footerText: "📮 *Note:* Jika ada bug, error atau kesulitan dalam penggunaan, Silahkan laporkan/tanyakn kepada Owner.",
            mtype: 'listMessage',
            sections: [
              {
      
                "rows": [{
                  "title": `『🚦』 ✦ PLEASE READ THE RULLES`,
                  "description": "Menampilkan semua command BOT",
                  "rowId": '.? all'
                  }, {
                  "title": `『💬』 ✦ All`,
                  "description": "Menampilkan semua command BOT",
                  "rowId": '.? all'
                  }, {
                  "title": "『🗒️』 ✦ Absen",
                  "description": "Menampilkan Menu Absen",
                  "rowId": `${_p}? absen`
                }, {
                  "title": "『⛩️』 ✦ Anime",
                  "description": "Apakah kamu suka anime?",
                  "rowId": `${_p}? anime`
                }, {
                  "title": "『🎨』 ✦ Sticker",
                  "description": "Buat sticker DiBOT",
                  "rowId": `${_p}? sticker`
                }, {
                  "title": "『📩』 ✦ Download",
                  "description": "Download sesuatu DiBOT",
                  "rowId": `${_p}? downloader`
                }, {
                  "title": "『✨』 ✦ Xp & Limit",
                  "description": "Ayo tingkatkan pangkatmu!",
                  "rowId": `${_p}? xp`
                }, {
                  "title": "『🧩』 ✦ Fun",
                  "description": "Kamu sedang gabut? gunakan ini",
                  "rowId": `${_p}? fun`
                }, {
                  "title": "『🎮』 ✦ Game",
                  "description": "Gamenya seru seru lho >-<",
                  "rowId": `${_p}? game`
                }, {
                  "title": "『📮』 ✦ Github",
                  "description": "Menampilkan Menu Github",
                  "rowId": `${_p}? github`
                }, {
                  "title": "『🏢』 ✦ Group",
                  "description": "Only Group",
                  "rowId": `${_p}? group`
                }, {
                  "title": "『🖼️』 ✦ Image",
                  "description": "Pasti kamu sedang mencari gambar",
                  "rowId": `${_p}? image`
                }, {
                  "title": "『🌏』 ✦ Internet",
                  "description": "Cari sesuatu DiBOT",
                  "rowId": `${_p}? internet`
                }, {
                  "title": "『🕌』 ✦ Islamic",
                  "description": "Khusus Muslim Ya ☺︎︎",
                  "rowId": `${_p}? islam`
                }, {
                  "title": "『🐚』 ✦ Kerang",
                  "description": "Tanya pada ketua club",
                  "rowId": `${_p}? kerang`
                }, {
                  "title": "『🖌️』 ✦ Macker",
                  "description": "Macker sesuatu DiBOT",
                  "rowId": `${_p}? maker`
                }, {
                  "title": "『👨‍💻』 ✦ Owner",
                  "description": "Only owner",
                  "rowId": `${_p}? owner`
                }, {
                  "title": "『🎧』 ✦ Voice",
                  "description": "Ayo pakai filter sound untuk voicemu",
                  "rowId": `${_p}? suara`
                }, {
                  "title": "『🌟』 ✦ Premium",
                  "description": "Only Premium User",
                  "rowId": `${_p}? premium`
                }, {
                  "title": "『📑』 ✦ Quotes",
                  "description": "Dapatkan Inspirasi dari ini",
                  "rowId": `${_p}? quotes`
                }, {
                  "title": "『🌱』 ✦ Rpg",
                  "description": "Game Epic Rpg!",
                  "rowId": `${_p}? rpg`
                }, {
                  "title": "『🐾』 ✦ Stalker",
                  "description": "Stalker via BOT wa yuk",
                  "rowId": `${_p}? stalk`
                }, {
                  "title": "『🎞️』 ✦ Short",
                  "description": "Apakah ini berguna untukmu?",
                  "rowId": `${_p}? shortlink`
                }, {
                  "title": "『🛠️』 ✦ TOOLS MENU",
                  "description": "Ayo gunakan, tools ini cukup hebat",
                  "rowId": `${_p}? tools`
                }, {
                  "title": "『🔠』 ✦ Text Macker",
                  "description": "Sedang mencari macker versi text?",
                  "rowId": `${_p}? text`
                }, {
                  "title": "『🔞』 ✦ Nsfw",
                  "description": "Fitur ini sesat, harap lebih bijak!",
                  "rowId": `${_p}? nsfw`
                }, {
                  "title": "『🎲』 ✦ Random",
                  "description": "Kamu sedang mencari suatu hal?",
                  "rowId": `${_p}? random`
                }, {
                  "title": "『🖋️』 ✦ Text Pro",
                  "description": "Ini akan membuat logo",
                  "rowId": `${_p}? textpro`
                }, {
                  "title": "『🏞️』 ✦ PHOTO OXY MENU",
                  "description": "Buat astethic foto DiBOT",
                  "rowId": `${_p}? textpro`
                }
                  ],
                "title": "------『 MENU 』------*"
                }, {
                "rows": [{
                  "title": ` ☰ OWNER BOT`,
                  "description": "Nomor Pemilik Bot! save? Save ae🗿",
                  "rowId": `.owner`
                },{
                  "title": "☰ INFO BOT",
                  "description": "Menampilkan Menu Info",
                  "rowId": `${_p}? info`
                }],
                "title": "⤿INFORMASI BOT"
              }
            ], "contextInfo": {
              "stanzaId": m.key.id,
              "participant": m.sender,
              "quotedMessage": m.message
            }
    }}), { userJid: m.participant || m.key.remoteJid, quoted: fkontak });
    return await conn.relayMessage(
        m.key.remoteJid,
        template.message,
        { messageId: template.key.id }
    )
    }
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
    }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Dipersembahkan oleh https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
        before,
        ...Object.keys(tags).map(tag => {
          return header.replace(/%category/g, tags[tag]) + '\n' + [
            ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
              return menu.help.map(help => {
                return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                  .replace(/%islimit/g, menu.limit ? '(Ⓛ)' : '')
                  .replace(/%isPremium/g, menu.premium ? '(Ⓟ)' : '')
                  .trim()
              }).join('\n')
            }),
            footer
          ].join('\n')
        }),
        after
      ].join('\n')
      text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.user.name,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      name,
      ucapan: ucapan(),
      level, limit, money, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    
//━━━━━━━━[ SETTINGS MENU ]━━━━━━━━//
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    let message = await prepareWAMessageMedia({ image: await (await require('node-fetch')(fotonya2)).buffer()}, { upload: conn.waUploadToServer }) 
      const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
      templateMessage: {
          hydratedTemplate: {
            imageMessage: message.imageMessage, 
            hydratedContentText: text, 
            hydratedFooterText: wm2, 
            hydratedButtons: [{
            urlButton: {
               displayText: 'Website Creator',
               url: web
             }

           },
             {
             urlButton: {
               displayText: 'Group Bot', 
               url: gc
             }

           },
               {
             quickReplyButton: {
               displayText: 'Owner',
               id: '.owner',
             }

           },
               {
             quickReplyButton: {
               displayText: 'Donasi',
               id: '.donasi',
             }

           },
           {
             quickReplyButton: {
               displayText: 'Credits',
               id: '.tqto',
             }
           }]
         }
       }
     }), { userJid: m.sender, quoted: m });
     //conn.reply(m.chat, text.trim(), m)
    return await conn.relayMessage(
         m.chat,
         template.message,
         { messageId: template.key.id }
     )
} catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
handler.help = ['menu', 'help', '?']
handler.tags = ['main']
handler.command = /^(menu|help|\?)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 3

module.exports = handler

//━━━━━━━━[  JANGAN DI UBAH  ]━━━━━━━━//
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH')
  res = "Selamat DiniHari"
  if (time >= 4) {
    res = "Selamat Pagi"
  }
  if (time > 10) {
    res = "Selamat Siang"
  }
  if (time >= 15) {
    res = "Selamat Sore"
  }
  if (time >= 18) {
    res = "Selamat Malam"
  }
  return res
}
