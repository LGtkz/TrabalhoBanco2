document.getElementById('buscaAnjo').addEventListener('submit', async function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    const queryString = new URLSearchParams(data).toString();

    try {
        const results = await fetch(`http://localhost:3000/consultaAnjo?${queryString}`, {
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
            const anjo = await results.json();
            console.log(anjo);
            paragrafo.innerHTML = `
                <strong>Nome:</strong> ${anjo.nome}<br>
                <strong>Força:</strong> ${anjo.forca}<br>
                <strong>Graça:</strong> ${anjo.graca}<br>
                <strong>Asas:</strong> ${anjo.asas}<br>
                <strong>Grau:</strong> ${anjo.grau}<br>
                <strong>Casa:</strong> ${anjo.casa}<br>
            `;
        } else {
            errorMsg.innerHTML = 'Erro ao consultar anjo!';
        }
    } catch (error) {
        console.error("Erro na consulta:", error);
        document.getElementById('errorMsg').innerHTML = 'Erro de conexão com o servidor!';
    }
});
