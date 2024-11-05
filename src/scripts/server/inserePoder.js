document.getElementById('inserePoder').addEventListener('submit', async function(event) {
    event.preventDefault(); 
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    console.log("Dados a serem enviados:", data); // Verifique os dados aqui
    
    try {
        const response = await fetch('http://localhost:3000/inserePoder', {
            method: 'POST',
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
            window.location.href = 'Form_poderesCriar.html';
        } else {
            document.getElementById('errorMsg').innerHTML = result.message || 'Insira dados de forma válida!';
        }
    } catch (error) {
        console.error("Erro ao enviar dados:", error);
        document.getElementById('errorMsg').innerHTML = 'Erro ao enviar dados. Verifique a conexão e tente novamente.';
    }
});
