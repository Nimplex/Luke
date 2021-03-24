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
