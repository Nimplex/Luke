const prefix = document.getElementById('prefix')
const data = document.getElementById('data')
const save = document.getElementById('save')

save.addEventListener('click', () => {
    if (!data.dataset.id) return alert('Failed to fetch data, refresh dashboard')

    alert('Please wait...')

    fetch(`/api/guild/${data.dataset.id}`, {
        method: 'POST',
        body: JSON.stringify({
            prefix: prefix.value
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