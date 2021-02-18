const save = document.getElementById('save')
const wchannel = document.getElementById('welcome-channel')
const wenabled = document.getElementById('wenabled')
const lchannel = document.getElementById('leave-channel')
const lenabled = document.getElementById('lenabled')
const data = document.getElementById('data')
const wmessages = document.getElementById('wmessages')
const welcomemessages = document.getElementsByClassName('wmessage')
const lmessages = document.getElementById('lmessages')
const leavemessages = document.getElementsByClassName('lmessage')

const createChild = () => {
    const child = document.createElement('input')
    child.type = 'text'
    child.classList.add('intext', 'wmessage')
    child.placeholder = 'Welcome message...'
    child.addEventListener('keydown', e => {
        if (e.key == 'Enter') {
            createChild()
        }
        if (e.key == 'Backspace' && child.value.length == 0) {
            child.remove()
        }
    })
    wmessages.appendChild(child)
    child.focus()
}

const createChild2 = () => {
    const child = document.createElement('input')
    child.type = 'text'
    child.classList.add('intext', 'wmessage')
    child.placeholder = 'Leave message...'
    child.addEventListener('keydown', e => {
        if (e.key == 'Enter') {
            createChild2()
        }
        if (e.key == 'Backspace' && child.value.length == 0) {
            child.remove()
        }
    })
    lmessages.appendChild(child)
    child.focus()
}

for (let i = 0; i < welcomemessages.length; i++) {
    console.log(welcomemessages[i])
    welcomemessages[i].addEventListener('keydown', e => {
        if (e.key == 'Enter') {
            createChild()
        }
    })
}

for (let i = 0; i < leavemessages.length; i++) {
    leavemessages[i].addEventListener('keydown', e => {
        if (e.key == 'Enter') {
            createChild2()
        }
    })
}

// save.addEventListener('click', () => {
//     if (!data.dataset.id) return alert('Failed to fetch data, refresh dashboard')

//     fetch(`/api/guild/${data.dataset.id}`, {
//         method: 'POST',
//         body: JSON.stringify({
//             wchannel: wchannel.selectedOptions[0].value,
//             lchannel: lchannel.selectedOptions[0].value,
//             wenabled: wenabled.checked,
//             lenabled: lenabled.checked
//         }),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }).then(res => res.json()).then(json => {
//         console.log(json)
//         if (json.status == 0) return alert('Failed to save')
//         else if (json.status == 1) return alert('Saved')
//     })
// })