const save_button = document.getElementById('save')

const toastElem = document.getElementById('liveToast')
const toastBody = document.getElementsByClassName('toast-body')[0]

const alertToast = (type, message, autohide) => {
    const toast = new bootstrap.Toast(toastElem, { animation: true, autohide: autohide })
    toastBody.innerHTML = message
    toastElem.setAttribute('aria-alive', type == 'error' ? 'assertive' : 'polite')
    toastElem.setAttribute('role', type == 'error' ? 'alert' : 'status')
    toast.show()
}

save_button.addEventListener('click', () => {
    const data = document.getElementById('data')?.dataset?.id
    if (!data) return alertToast('error', 'Cannot fetch data! Please refresh page. #0', false)

    const prefix = document.getElementById('prefix')
    const welcome_enabled = document.getElementById('welcome_enabled')
    const welcome_channel = document.getElementById('welcome_channel')
    const welcome_message = document.getElementById('welcome_message')
    const goodbye_enabled = document.getElementById('goodbye_enabled')
    const goodbye_channel = document.getElementById('goodbye_channel')
    const goodbye_message = document.getElementById('goodbye_message')
    const delete_invites = document.getElementById('delete_invites')
    const delete_mass_mentions = document.getElementById('delete_mass_mentions')
    const word_blacklist = document.getElementById('word_blacklist')

    if (prefix?.value.replace(/ /gm).length <= 0) prefix.value = '.'
    
    alertToast('done', 'Updating informations...', true)

    fetch(`/api/guild/${data}`, {
        method: 'POST',
        body: JSON.stringify({
            prefix: prefix.value || '.',
            automoderator: {
                invites: delete_invites.checked || false,
                spam: delete_mass_mentions.checked || false,
                blacklist: word_blacklist?.value?.split(',').map(val => val.startsWith(' ') ? val.replace(' ', '') : val).map(val => val.endsWith(' ') ? val.slice(0, -1) : val) || []
            },
            welcomer: {
                welcome: {
                    enabled: welcome_enabled?.checked || false,
                    channel: {
                        id: welcome_channel[welcome_channel?.selectedIndex]?.value || '0'
                    },
                    // random_message: {
                    //     enabled: welcome_random_message_enabled?.checked || false,
                    //     messages: welcome_messages || []
                    // },
                    message: welcome_message?.value || 'Welcome **{user.name}** to **{guild.name}**'
                },
                goodbye: {
                    enabled: goodbye_enabled?.checked || false,
                    channel: {
                        id: goodbye_channel[goodbye_channel?.selectedIndex]?.value || '0'
                    },
                    // random_message: {
                    //     enabled: goodbye_random_message_enabled?.checked || false,
                    //     messages: goodybe_messages || []
                    // },
                    message: goodbye_message?.value || 'Goodbye **{user.name}**'
                }
            }
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json()).then(json => {
        console.log(json)
        if (json.status == 0) return alertToast('error', 'Failed to save data!', false)
        else if (json.status == 1) return alertToast('done', 'Saved guild settings.', true)
        else return alertToast('error', 'An server error occurred', false)
    })
})



















// const data = document.getElementById('data')
// const save = document.getElementById('save')

// save.addEventListener('click', () => {
//     if (!data.dataset.id) return alert('Failed to fetch data, refresh dashboard')
//     if (!prefix.value) return alert('You cant have empty prefix')

//     alert('Please wait...')

//     fetch(`/api/guild/${data.dataset.id}`, {
//         method: 'POST',
//         body: JSON.stringify({
//             prefix: prefix.value
//         }),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }).then(res => res.json()).then(json => {
//         console.log(json)
//         if (json.status == 0) alert('Failed to save')
//         else if (json.status == 1) alert('Saved')
//         else alert('An server error occurred')
//     })
// })