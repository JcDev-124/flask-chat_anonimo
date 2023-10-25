document.getElementById('send').addEventListener('click', function() {
    var messageInput = document.getElementById('message');
    var messageText = messageInput.value.trim();
    if (messageText !== '') {
        var messageData = {
            message: messageText
        };

        fetch('http://127.0.0.1:5000/api/send_message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(messageData)
        })        
        .then(response => response.json())
        .then(data => {
            console.log('Mensagem enviada com sucesso:', data);

            addMessageToUI(messageText);
        })
        .catch(error => {
            console.error('Erro ao enviar mensagem:', error);
        });

        messageInput.value = '';
    }
});

function addMessageToUI(message) {
    const chatMessages = document.getElementById('chat-messages');
    const messageContainer = document.createElement('div');
    messageContainer.className = 'message-container';

    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    messageElement.textContent = message;

    messageContainer.appendChild(messageElement);
    chatMessages.appendChild(messageContainer);
}

function loadMessages() {
    fetch('http://127.0.0.1:5000/api/get_messages')
        .then(response => response.json())
        .then(data => {
            // Atualize o front-end com as mensagens existentes
            const chatMessages = document.getElementById('chat-messages');
            chatMessages.innerHTML = '';

            data.forEach(message => {
                // Adicione cada mensagem ao DOM
                addMessageToUI(message.message);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar mensagens:', error);
        });
}

loadMessages();
