const API_KEY = "AIzaSyBlYWQFRRnqWOI7rtnSl_4Nb1EDquEo6Hk"; // Ganti dengan API KEY yang benar

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
        // Kirim permintaan ke API Gemini 1.5 Flash
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: userInput }]
                }]
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Pastikan respon valid dan ada teks output
        if (!data || !data.candidates || data.candidates.length === 0 || !data.candidates[0].content.parts[0].text) {
            throw new Error("Respon tidak valid dari API");
        }

        const botReply = data.candidates[0].content.parts[0].text || "Maaf, saya tidak bisa menjawab saat ini.";

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
        errorMessage.textContent = "⚠️ Terjadi kesalahan, coba lagi nanti.";
        chatBox.appendChild(errorMessage);
    }
}

// Menjalankan sendMessage ketika menekan Enter
function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}
