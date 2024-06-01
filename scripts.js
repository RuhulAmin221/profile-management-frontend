const handleRegister = (event) => {
    const fname = document.getElementById('fname').value;
    const lname = document.getElementById('lname').value;
    const gender = document.getElementById('gender').value;
    const dob = document.getElementById('dob').value;
    const email = document.getElementById('email').value;
    const image = document.getElementById('image');
    const password = document.getElementById('password').value;
    const reTypedPassword = document.getElementById('reTypedPassword').value;
    if (password.length < 6) {
        return alert('Password must contain at least 6 character')
    }
    if (password != reTypedPassword) {
        return alert('Retyped Password is not matching with the original')
    }
    const data = { fname, lname, dob, gender, email, password, image }
    console.log(data);
    event.preventDefault();

    fetch('http://localhost:5000/adduser', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(res => {
            console.log('response: ', res.status)
            if (res.status == 200) {
                alert('Registered successfully')
                setTimeout(() => {
                    window.location.href = 'index.html'
                }, 0)

            }
        })
}

const handleDelete = (id) => {
    fetch(`http://localhost:5000/deleteuser/${id}`, {
        method: "DELETE",
    })
        .then(res => {
            console.log('response: ', res)
        })
    deleteCurrentUser();

    alert('Deleted successfully')
}

const handleLogin = () => {
    const enteredEmail = document.getElementById('email').value
    const password = document.getElementById('password').value
    validateUser(enteredEmail, password);
}

const showAllUser = async () => {
    const response = await fetch('http://localhost:5000/allusers');
    const data = await response.json();
    console.log(data)
}

const showAllDataofCurrentUser = async (email) => {
    const response = await fetch(`http://localhost:5000/allusers/${email}`);
    const data = await response.json();
    console.log(data)
}

const deleteCurrentUser = () => {
    fetch(`http://localhost:5000/deletecurrentuser`, {
        method: "DELETE",
    })
        .then(res => {
            console.log('response: ', res)
            if (res.status == 200) {
                setTimeout(() => {
                    window.location.href = 'index.html'
                }, 0)
            }
        })
}

const validateUser = async (email, pass) => {
    const response = await fetch(`http://localhost:5000/allusers/${email}`);
    const data = await response.json();
    const info = { email }
    if (data.length > 0 && data[0].password == pass) {
        fetch('http://localhost:5000/addcurrentuser', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(info)
        })
            .then(res => {
                console.log('response: ', res)
            })
        window.location.href = 'userData.html';

    }
    else {
        alert('Invalid Input')
    }

}