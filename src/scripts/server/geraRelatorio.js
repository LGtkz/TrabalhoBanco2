document.getElementById('geraRelatorio').addEventListener('submit', async function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    const queryString = new URLSearchParams(data).toString();

    try {
        const results = await fetch(`http://localhost:3000/geraRelatório`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const paragrafo = document.getElementById('criaturasParagrafo');
        const errorMsg = document.getElementById('errorMsg');
        paragrafo.innerHTML = '';  // Limpa o parágrafo antes de exibir novos dados
        errorMsg.innerHTML = '';  // Limpa qualquer mensagem de erro anterior

        if (results.ok) {
            const resultado = await results.json();
            console.log(resultado);
        } else {
            errorMsg.innerHTML = 'Erro ao consultar poder!';
        }
    } catch (error) {
        console.error("Erro na consulta:", error);
        document.getElementById('errorMsg').innerHTML = 'Erro de conexão com o servidor!';
    }
});
