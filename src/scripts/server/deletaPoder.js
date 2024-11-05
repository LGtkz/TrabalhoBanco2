document.getElementById('deletaPoder').addEventListener('submit', async function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    const queryString = new URLSearchParams(data).toString();

    try {
        const results = await fetch(`http://localhost:3000/deletaPoder?${queryString}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const paragrafo = document.getElementById('criaturasParagrafo');
        const errorMsg = document.getElementById('errorMsg');
        paragrafo.innerHTML = '';  // Limpa o parágrafo antes de exibir novos dados
        errorMsg.innerHTML = '';  // Limpa qualquer mensagem de erro anterior

        if (results.ok) {
            const result = await results.json();
            console.log(result.message);
        } else {
            errorMsg.innerHTML = 'Erro ao deletar Poder!';
        }
    } catch (error) {
        console.error("Erro na deleção:", error);
        document.getElementById('errorMsg').innerHTML = 'Erro de conexão com o servidor!';
    }
});
