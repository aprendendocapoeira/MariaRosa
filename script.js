window.onload = function() {
  for (var n = 0; n < localStorage.length; n++) { // Corrigido de n <= localStorage.length para n < localStorage.length
    let key = localStorage.key(n); // Pega a chave
    let value = localStorage.getItem(key); // Pega o valor associado à chave

    if (value != null) {
      // Converter a string para um array de objetos
      let messages = JSON.parse(value);

      // Iterar sobre o array de mensagens e exibir cada uma
      messages.forEach(message => {
        console.log(`Mensagem de: ${message.name}`);
        console.log(`Texto: ${message.text}`);
        console.log(`Data: ${message.date}`);
        console.log("====================================================");
      });
    }
  }
}


let messages = JSON.parse(localStorage.getItem('msgs')) || [];
let currentIndex = 0;

// Função para adicionar mensagens
function addMessage() {
  const name = document.getElementById('message-name').value;
  const text = document.getElementById('message-text').value;

  if (name && text) {
    const newMessage = {
      name: name,
      text: text,
      date: new Date().toISOString()
    };
    messages.unshift(newMessage); // Adiciona no início
    localStorage.setItem('msgs', JSON.stringify(messages)); // Salva no localStorage
    renderMessages(); // Atualiza a exibição
  }
  // Atualiza a página
  location.reload();

}

// Função para renderizar as mensagens
function renderMessages() {
  const container = document.getElementById('messages-container');
  container.innerHTML = '';

  const slicedMessages = messages.slice(currentIndex, currentIndex + 3);
  slicedMessages.forEach(msg => {
    const messageCard = document.createElement('div');
    messageCard.classList.add('message-card');
    messageCard.innerHTML = `
      <h3>${msg.name}</h3>
      <p>${msg.text}</p>
    `;
    container.appendChild(messageCard);
  });

  // Mostrar/ocultar as setas de navegação
  const arrowsContainer = document.getElementById('arrows-container');
  if (messages.length > 3) {
    arrowsContainer.style.display = 'flex';
  } else {
    arrowsContainer.style.display = 'none';
  }
}

// Navegação de mensagens
document.getElementById('next-msg').addEventListener('click', () => {
  if (currentIndex + 3 < messages.length) {
    currentIndex += 3;
    renderMessages();
  }
});

document.getElementById('prev-msg').addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex -= 3;
    renderMessages();
  }
});

// Carregar as mensagens ao inicializar
renderMessages();

const intervalo = 30 * 24 * 60 * 60 * 1000;
function clearMessages() {
  localStorage.clear()
}