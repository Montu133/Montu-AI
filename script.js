const API_KEY = "AIzaSyBlYWQFRRnqWOI7rtnSl_4Nb1EDquEo6Hk"; 

async function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (!userInput) return;

    const chatBox = document.getElementById("chat-box");

    // Tambahkan pesan pengguna ke chat
    const userMessage = document.createElement("div");
    userMessage.className = "user-message";
    userMessage.textContent = userInput;
    chatBox.appendChild(userMessage);
    
    document.getElementById("user-input").value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        // Kirim permintaan ke Gemini API
        const response = await fetch("https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateText?key=" + API_KEY, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt: { text: userInput },
                maxTokens: 100
            })
        });

        const data = await response.json();
        const botReply = data.candidates?.[0]?.output || "Maaf, saya tidak bisa menjawab saat ini.";

        // Tambahkan pesan AI ke chat
        const botMessage = document.createElement("div");
        botMessage.className = "bot-message";
        botMessage.textContent = botReply;
        chatBox.appendChild(botMessage);
        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {
        console.error("Error fetching response:", error);
        const errorMessage = document.createElement("div");
        errorMessage.className = "bot-message";
        errorMessage.textContent = "Terjadi kesalahan, coba lagi nanti.";
        chatBox.appendChild(errorMessage);
    }
}

// Menjalankan sendMessage ketika menekan Enter
function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}
