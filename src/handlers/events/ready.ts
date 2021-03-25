import { Luke } from '@/index'
import { argv } from 'process'
import fetch from 'node-fetch'
import dashboard from '../../dashboard/server'

const { dlist } = require('../../../files/tokens.json')

module.exports = (Luke: Luke) => {
    Luke.console.ready(`${Luke.user?.tag} is ready`)
    Luke.dashboard = new dashboard()
    argv[2] ?
        Luke.console.warn('Development version is running'):
        Luke.console.log('Production version is running')
    if (dlist) {
        setInterval(() => {
            Luke.console.log('Dlist request sent')
            fetch('https://api.dlist.top/v1/bots/stats', {
                method: 'POST',
                headers: {
                    'Authorization': dlist,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ servers: Luke.guilds.cache.size, members: Luke.users.cache.size })
            })
        }, 120000)
    }
}