const prefix = document.getElementById('prefix')
const save = document.getElementById('save')
const wchannel = document.getElementById('welcome-channel')
const wenabled = document.getElementById('wenabled')
const lchannel = document.getElementById('leave-channel')
const lenabled = document.getElementById('lenabled')
const data = document.getElementById('data')

save.addEventListener('click', () => {
    if (!data.dataset.id) return alert('Failed to fetch data, refresh dashboard')

    fetch(`/api/guild/${data.dataset.id}`, {
        method: 'POST',
        body: JSON.stringify({
            prefix: prefix.value,
            wchannel: wchannel.selectedOptions[0].value,
            lchannel: lchannel.selectedOptions[0].value,
            wenabled: wenabled.checked,
            lenabled: lenabled.checked
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