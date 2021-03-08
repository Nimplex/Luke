const data = document.getElementById('data')

save.addEventListener('click', () => {
    if (!data.dataset.id) return alert('Failed to fetch data, refresh dashboard')

    alert('Please wait...')
})