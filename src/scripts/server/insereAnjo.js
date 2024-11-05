document.getElementById('insereAnjo').addEventListener('submit', async function(event) {
    event.preventDefault(); 
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    console.log("Dados a serem enviados:", data);
    try {
        const response = await fetch('http://localhost:3000/insereAnjo', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        let result;
        try {
            result = await response.json();
        } catch (error) {
            result = { message: 'Erro desconhecido. Tente novamente.' };
        }

        if (response.ok) {
            // Sucesso no cadastro, redireciona para a página de confirmação ou outra página
            window.location.href = 'Form_anjoCriar.html';
        } else {
            // Exibe a mensagem de erro recebida do servidor ou mensagem padrão
            document.getElementById('errorMsg').innerHTML = result.message || 'Erro ao cadastrar. Verifique os dados!';
        }
    } catch (error) {
        console.error("Erro ao enviar dados:", error);
        document.getElementById('errorMsg').innerHTML = 'Erro ao enviar dados. Verifique a conexão e tente novamente.';
    }
});
