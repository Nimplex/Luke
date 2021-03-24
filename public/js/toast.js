const toastElem = document.getElementById('liveToast')
const toastBody = document.getElementsByClassName('toast-body')[0]
const closeCookies = document.getElementById('closeCookies')

window.onload = () => {
    const toast = new bootstrap.Toast(toastElem, {
        animation: true,
        autohide: false,
    })
    const toastClosed = localStorage.getItem('cookiesAlert')
    if (!toastClosed) toast.show()
}

closeCookies.addEventListener('click', () => {
    localStorage.setItem('cookiesAlert', true)
})

const alert = (
    type = 'done',
    message = 'This website uses cookies. We use cookies to ensure that we give you the best experience on our website.',
    autohide = true
) => {
    const toast = new bootstrap.Toast(toastElem, {
        animation: true,
        autohide: autohide,
    })
    toastBody.innerHTML = message
    toastElem.setAttribute(
        'aria-alive',
        type == 'error' ? 'assertive' : 'polite'
    )
    toastElem.setAttribute('role', type == 'error' ? 'alert' : 'status')
    toast.show()
}
