const data = document.getElementById('data')
const delete_invites = document.getElementById('delete_invites')
const delete_spam = document.getElementById('delete_spam')
const blacklist_words = document.getElementsByClassName('wmessage')

const createChild = () => {
    const parent = document.getElementById('automod')
    const child = document.createElement('input')

    child.type = 'text'
    child.placeholder = `Word...`
    child.classList.add('intext', 'wmessage')
    child.addEventListener('keydown', e => {
        if (e.key == 'Enter') createChild()
        if (e.key == 'Backspace' && child.value.length == 0) child.remove()
    })

    parent.appendChild(child)
    child.focus()
}

save.addEventListener('click', () => {
    if (!data.dataset.id) return alert('Failed to fetch data, refresh dashboard')

    const blacklist = []
    Object.values(blacklist_words).forEach(elem => elem.value.length !== 0 ? blacklist.push(elem.value) : null)

    alert('Please wait...')

    fetch(`/api/guild/${data.dataset.id}`, {
        method: 'POST',
        body: JSON.stringify({
            automoderator: {
                invites: delete_invites.checked || false,
                spam: delete_spam.checked || false,
                blacklist: blacklist || []
            }
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json()).then(json => {
        console.log(json)
        if (json.status == 0) alert('Failed to save')
        else if (json.status == 1) alert('Saved')
        else alert('An server error occurred')
    })
})