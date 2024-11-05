document.getElementById('buscaArma').addEventListener('submit', async function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    const queryString = new URLSearchParams(data).toString();

    try {
        const results = await fetch(`http://localhost:3000/consultaArma?${queryString}`, {
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
            const arma = await results.json();
            console.log(arma);
        } else {
            errorMsg.innerHTML = 'Erro ao consultar anjo!';
        }
    } catch (error) {
        console.error("Erro na consulta:", error);
        document.getElementById('errorMsg').innerHTML = 'Erro de conexão com o servidor!';
    }
});
