document.getElementById('login-button').addEventListener('click', function() {
    const correo = document.getElementById('username').value;
    const cedula = document.getElementById('password').value;

    console.log("Datos de inicio de sesión:", { correo, cedula });

    fetch("http://localhost:3000/logins", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ correo, cedula })
    })
    .then(response => {
        console.log("Respuesta recibida:", response);
        return response.json();
    })
    .then(data => {
        console.log("Datos recibidos:", data);
        const responseDiv = document.getElementById('response');
        if (data.success) {
            window.location.href = "index.html"; 
        } else {
            alert("Usuario y contraseña incorrectos");

            document.getElementById("username").value = '';
            document.getElementById("password").value = '';
        }
    })
    .catch(error => {
        console.log("Error:", error);
        const responseDiv = document.getElementById('response');
        responseDiv.textContent = 'Error en el inicio de sesión';
    });
});

