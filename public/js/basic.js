const prefix = document.getElementById('prefix')
const save = document.getElementById('save')
const data = document.getElementById('data')

save.addEventListener('click', () => {
    if (!data.dataset.id) return alert('Failed to fetch data, refresh dashboard')

    fetch(`/api/guild/${data.dataset.id}`, {
        method: 'POST',
        body: JSON.stringify({
            prefix: prefix.value,
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