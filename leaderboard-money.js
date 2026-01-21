import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  try {
    const API_URL = 'https://your-domain.com/api/leaderboard'

    const res = await fetch(API_URL)
    if (!res.ok) throw 'Gagal mengambil data leaderboard'

    const json = await res.json()
    const data = json.data || []

    if (!data.length) {
      return m.reply('❌ Leaderboard belum memiliki data.')
    }

    let text = `🏆 *LEADERBOARD MONEY*\n`
    text += `Komunitas XiaZira Floryn\n\n`

    data.slice(0, 10).forEach((user, i) => {
      text += `*${i + 1}.* ${user.name}\n`
      text += `💰 Rp ${Number(user.money).toLocaleString('id-ID')}\n\n`
    })

    text += `© XiaZira Floryn Community 2025–2026`

    await conn.sendMessage(m.chat, {
      text,
      contextInfo: {
        externalAdReply: {
          title: 'Leaderboard Money',
          body: 'Data diambil langsung dari Web',
          mediaType: 1,
          renderLargerThumbnail: false,
          sourceUrl: API_URL
        }
      }
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    m.reply('⚠️ Terjadi kesalahan saat mengambil leaderboard.')
  }
}

handler.command = ['leaderboardmoney']
handler.help = ['leaderboardmoney']
handler.tags = ['economy']

export default handler
