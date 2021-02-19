const inv = document.getElementsByClassName('inv')

const open = (id) => {
    const url = `https://discord.com/api/oauth2/authorize?client_id=576478552158109716&disable_guild_select=true&permissions=8&guild_id=${id}8&redirect_uri=https%3A%2F%2Flukebot.xyz%2Fapi%2Flogin&response_type=code&scope=bot%20identify%20guilds`
    const specs = `location=no,toolbar=no,menubar=no,scrollbars=no,resizable=no,status=no,titlebar=no,height=750,width=500,top=${(window.screen.height - 750) / 2},left=${(window.screen.width - 500) / 2}`
    const wind = window.open(url, 'invite', specs, false)
    const inter = setInterval(() => { wind.closed ? location.reload() : null }, 500)
}


for (let i = 0; i < inv.length; i++) {
    inv[i].addEventListener('click', () => open(inv[i].dataset.id))
}