// https://github.com/badosz0/badosz-bot/blob/master/src/utils/api.ts

import fetch, { Response } from 'node-fetch'
const tokens = require('../../files/tokens.json')

export async function makeRequest(endpoint: string, params: { [event_name: string]: string } = {}): Promise<Response> {
    const add = []
    for (const key in params) add.push(`${key}=${encodeURIComponent(params[key])}`)
    return fetch(`https://obrazium.com/v1/${endpoint}${add.length ? `?${add.join("&")}` : ""}`, {
        method: "GET",
        headers: {
            Authorization: tokens.obrazium,
        }
    })
}
