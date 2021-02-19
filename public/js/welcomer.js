const save = document.getElementById('save')
const data = document.getElementById('data')

const welcome_channel = document.getElementById('welcome_channel')
const welcome_enabled = document.getElementById('welcome_enabled')
const welcome_random_message_enabled = document.getElementById('random_message_enabled')
const welcome_random_messages = document.getElementsByClassName('wmessage')
const welcome_random_message = document.getElementById('welcome_random_messages')
const welcome_message = document.getElementById('welcome_message')

const goodbye_enabled = document.getElementById('goodbye_enabled')
const goodbye_channel = document.getElementById('goodbye_channel')
const goodbye_random_message_enabled = document.getElementById('random_leave_message_enabled')
const goodbye_random_messages = document.getElementsByClassName('lmessage')
const goodbye_random_message = document.getElementById('goodbye_random_messages')
const goodbye_message = document.getElementById('goodbye_message')

const createChild = (what = 'Welcome', par = 'welcome_random_messages', m = 'wmessage') => {
    const parent = document.getElementById(par)
    const child = document.createElement('input')

    child.type = 'text'
    child.placeholder = `${what} message...`
    child.classList.add('intext', m)
    child.addEventListener('keydown', e => {
        if (e.key == 'Enter') createChild(what, par, m)
        if (e.key == 'Backspace' && child.value.length == 0) child.remove()
    })

    parent.appendChild(child)
    child.focus()
}

save.addEventListener('click', () => {
    if (!data.dataset.id) return alert('Failed to fetch data, refresh dashboard')

    const goodybe_messages = []
    const welcome_messages = []
    Object.values(goodbye_random_messages).forEach(elem => elem.value.length !== 0 ? goodybe_messages.push(elem.value) : null)
    Object.values(welcome_random_messages).forEach(elem => elem.value.length !== 0 ? welcome_messages.push(elem.value) : null)

    fetch(`/api/guild/${data.dataset.id}`, {
        method: 'POST',
        body: JSON.stringify({
            welcomer: {
                welcome: {
                    enabled: welcome_enabled.checked || false,
                    channel: {
                        id: welcome_channel[welcome_channel.selectedIndex].value || '0'
                    },
                    random_message: {
                        enabled: welcome_random_message_enabled.checked || false,
                        messages: welcome_messages || []
                    },
                    message: welcome_message.value || 'Welcome **{user.name}** to **{guild.name}**'
                },
                goodbye: {
                    enabled: goodbye_enabled.checked || false,
                    channel: {
                        id: goodbye_channel[goodbye_channel.selectedIndex].value || '0'
                    },
                    random_message: {
                        enabled: goodbye_random_message_enabled.checked || false,
                        messages: goodybe_messages || []
                    },
                    message: goodbye_message.value || 'Goodbye **{user.name}**'
                }
            }
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json()).then(json => {
        console.log(json)
        if (json.status == 0) return alert('Failed to save')
        else if (json.status == 1) return alert('Saved')
    })
})