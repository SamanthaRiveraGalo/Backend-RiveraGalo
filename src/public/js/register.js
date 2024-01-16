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
const form = document.getElementById('registerForm');

form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(form);

    const firstName = document.getElementById('firstName')
    const lastName = document.getElementById('lastName')
    const email = document.getElementById('email')
    const password = document.getElementById('password')

    const firstNameValue = firstName.value.trim()
    const lastNameValue = lastName.value.trim()
    const emailValue = email.value.trim()
    const passwordValue = password.value.trim()

    const newUser = {
        first_name: firstNameValue,
        last_name: lastNameValue,
        email: emailValue,
        password: passwordValue
    }

    fetch('/api/sessions/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    }).then(result => {
        if (result.status === 200) {
            window.location.replace('/views/login');
        }
    });
});