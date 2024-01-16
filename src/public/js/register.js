// const form = document.getElementById('registerForm');

// form.addEventListener('submit', e => {
//     e.preventDefault();
//     const data = new FormData(form);
//     const obj = {};
//     data.forEach((value, key) => obj[key] = value);
//     fetch('/api/sessions/register', {
//         method: 'POST',
//         body: JSON.stringify(obj),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }).then(result => {
//         if (result.status === 200) {
//             window.location.replace('/views/login');
//         }
//     });
// });

// const form = document.getElementById('registerForm');
// form.addEventListener('submit', e => {
//     e.preventDefault();

//     const formData = new FormData(form);

//     console.log(formData)

//     fetch('http://localhost:8080/api/sessions/register', {
//         method: 'POST',
//         body: formData
//     }).then(result => {
//         console.log(result)
//         if (result.status === 200) {
//             window.location.href = '/views/login';
//         }
//     }).catch((error) => {
//         alert(`Ha ocurrido un error al intentar registrar su usuario: ${error}`)
//     })
// });
const form = document.getElementById('registerForm');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const first_name = document.getElementById('first_name').value;
    const last_name = document.getElementById('last_name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log(first_name)

    fetch('/api/sessions/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify({
            first_name,
            last_name,
            email,
            password
        })
    }).then(result => {
        console.log(result)
        if (result.status === 200) {
            window.location.href = '/views/login';
        }
    }).catch((error) => {
        alert(`Ha ocurrido un error al intentar registrar su usuario: ${error}`)
    })

})