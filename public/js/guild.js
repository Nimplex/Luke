const navbar_options = document.getElementsByClassName('option')

Object.values(navbar_options).forEach(elem => {
    elem.addEventListener('click', () => {
        location.href = `/dashboard/${data.dataset.id}/${elem.dataset.id}`
    })
})