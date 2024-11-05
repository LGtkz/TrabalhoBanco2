fetch('http://localhost:3000/protected', {
    method: 'GET',
    credentials: 'include', // Inclui o cookie na requisição
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error("Erro:", error));
