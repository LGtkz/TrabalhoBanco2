let next = document.querySelector('.next')
let prev = document.querySelector('.prev')

next.addEventListener('click', function(){
    let items = document.querySelectorAll('.item')
    document.querySelector('.slide').appendChild(items[0])
})

prev.addEventListener('click', function(){
    let items = document.querySelectorAll('.item')
    document.querySelector('.slide').prepend(items[items.length - 1]) // here the length of items = 6
})


const items = document.querySelectorAll('.item');
let currentIndex = 1; // Inicia com o segundo item como ativo (do meio)

function updateSlide() {
    items.forEach((item, index) => {
        // Remove todas as classes e oculta o item
        item.classList.remove('active', 'prev', 'next');
        item.style.display = 'none';

        // Define o item ativo e os vizinhos (com rotação circular)
        if (index === currentIndex) {
            // Card ativo (do meio)
            item.classList.add('active');
            item.style.display = 'flex';
            //item.style.opacity = '1';
            item.style.pointerEvents = 'auto';
        } else if (index === (currentIndex - 1 + items.length) % items.length) {
            // Card anterior (à esquerda), com rotação para o último item se estiver no início
            item.classList.add('prev');
            item.style.display = 'flex';
            item.style.opacity = '0.8';
            item.style.pointerEvents = 'none';
        } else if (index === (currentIndex + 1) % items.length) {
            // Card próximo (à direita), com rotação para o primeiro item se estiver no final
            item.classList.add('next');
            item.style.display = 'flex';
            item.style.opacity = '0.8';
            item.style.pointerEvents = 'none';
        }
    });
}

// Botões de navegação
document.querySelector('.prev').addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
    updateSlide();
});

document.querySelector('.next').addEventListener('click', () => {
    currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
    updateSlide();
});

// Atualizar o slide inicial
updateSlide();
