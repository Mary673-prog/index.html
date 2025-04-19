// ===== LANGUAGE SWITCHING FUNCTIONALITY =====
const translations = {
    en: {
        title: "Guest Check-In",
        guestLabel: "Guest Name:",
        dateLabel: "Check-In Date:",
        loginBtn: "Login",
        errorMessage: "Wrong username or check-in date."
    },
    my: {
        title: "ဧည့်သည် Check-In",
        guestLabel: "ဧည့်သည် အမည်:",
        dateLabel: "Check-In ရက်စွဲ:",
        loginBtn: "ဝင်မည်",
        errorMessage: "အမည် သို့မဟုတ် Check-In ရက်စွဲ မမှန်ပါ။"
    },
    th: {
        title: "เช็คอินผู้เข้าพัก",
        guestLabel: "ชื่อผู้เข้าพัก:",
        dateLabel: "วันที่เช็คอิน:",
        loginBtn: "เข้าสู่ระบบ",
        errorMessage: "ชื่อผู้ใช้หรือวันที่เช็คอินไม่ถูกต้อง"
    }
};

document.getElementById("language-select")?.addEventListener("change", function() {
    const selectedLang = this.value;
    document.getElementById("title").textContent = translations[selectedLang].title;
    document.getElementById("guestLabel").textContent = translations[selectedLang].guestLabel;
    document.getElementById("dateLabel").textContent = translations[selectedLang].dateLabel;
    document.getElementById("loginBtn").textContent = translations[selectedLang].loginBtn;
});

// ===== LOGIN FUNCTIONALITY =====
document.getElementById("loginForm")?.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const allowedGuests = [
        "Mr Jean-Claude Van Damme", "Harald Link", "Franka Potente", "Ms Ricardo Darín", "Mr Ulrich Thomsen", "Mr Dhanin Chearavanont"
    ];
    const username = document.getElementById("username").value.trim();
    const checkinDate = document.getElementById("checkin-date").value;
    const requiredDate = "2025-03-27";
    const errorMessage = document.getElementById("error-message");
    
    const inputDate = new Date(checkinDate);
    const formattedCheckinDate = `${inputDate.getFullYear()}-${String(inputDate.getMonth() + 1).padStart(2, '0')}-${String(inputDate.getDate()).padStart(2, '0')}`;
    
    if (allowedGuests.includes(username) && formattedCheckinDate === requiredDate) {
        sessionStorage.setItem("loggedInUser", username);
        sessionStorage.setItem("checkinDate", formattedCheckinDate);
        window.location.href = "rooms.html";
    } else {
        errorMessage.textContent = translations[document.getElementById("language-select").value].errorMessage;
        errorMessage.style.color = "red";
    }
});

// ===== CHATBOT FUNCTIONALITY =====
const hotelFAQs = {
    "Hello": "How can I help you today?",
    "What time is check-in?": "Check-in time is from 2:00 PM onwards.",
    "What time is check-out?": "Check-out time is at 12:00 PM.",
    "Do you have free Wi-Fi?": "Yes, we provide free high-speed Wi-Fi in all rooms and public areas.",
    "Is breakfast included?": "Yes, complimentary breakfast is included with all bookings."
};

document.getElementById("open-chat")?.addEventListener("click", () => {
    document.getElementById("chatbox").style.display = "flex";
});

document.getElementById("close-chat")?.addEventListener("click", () => {
    document.getElementById("chatbox").style.display = "none";
});

document.getElementById("chat-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const chatInput = document.getElementById("chat-input");
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    displayUserMessage(userMessage);
    chatInput.value = "";
    document.getElementById("chat-messages").scrollTop = document.getElementById("chat-messages").scrollHeight;

    const response = hotelFAQs[userMessage] || "I'm not sure about that. Let me check for you!";
    displayBotResponse(response);
});

function displayUserMessage(message) {
    const userDiv = document.createElement("div");
    userDiv.textContent = `You: ${message}`;
    userDiv.style.textAlign = "right";
    userDiv.style.background = "#007bff";
    userDiv.style.color = "white";
    userDiv.style.padding = "8px";
    userDiv.style.borderRadius = "10px";
    userDiv.style.margin = "5px";
    document.getElementById("chat-messages").appendChild(userDiv);
}

function displayBotResponse(response) {
    const botDiv = document.createElement("div");
    botDiv.textContent = `Bot: ${response}`;
    botDiv.style.textAlign = "left";
    botDiv.style.background = "#f1f1f1";
    botDiv.style.padding = "8px";
    botDiv.style.borderRadius = "10px";
    botDiv.style.margin = "5px";
    document.getElementById("chat-messages").appendChild(botDiv);
}

const payArrivalRadio = document.getElementById('pay-arrival');
const payNowRadio = document.getElementById('pay-now');
const paymentMethods = document.getElementById('payment-methods');
const visaInput = document.getElementById('visa-input');

function togglePaymentOptions() {
    paymentMethods.style.display = payNowRadio.checked ? 'block' : 'none';
}

function toggleVisaInput() {
    const selectedMethod = document.querySelector('input[name="method"]:checked')?.value;
    visaInput.style.display = selectedMethod === 'visa' ? 'block' : 'none';
}

document.querySelectorAll(".option").forEach(option => {
    option.addEventListener("click", () => {
        // Remove active class from all options
        document.querySelectorAll(".option").forEach(opt => opt.classList.remove("active"));
        // Add to clicked one
        option.classList.add("active");
        // Select the corresponding input
        option.querySelector("input").checked = true;
        // Toggle credit card input
        toggleVisaInput();
    });
});

payArrivalRadio.addEventListener('change', togglePaymentOptions);
payNowRadio.addEventListener('change', togglePaymentOptions);

// Initialize on page load
togglePaymentOptions();
toggleVisaInput();

document.getElementById('paymentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    if (payNowRadio.checked) {
        const method = document.querySelector('input[name="method"]:checked')?.value;

        if (method === 'visa') {
            const cardNumber = document.getElementById('credit-card').value.trim();
            const expDate = document.getElementById('exp-date').value.trim();
            const cvc = document.getElementById('cvc').value.trim();

            if (!cardNumber || !expDate || !cvc) {
                alert("Please fill out all card fields.");
                return;
            }
        }

        alert("Payment successful via " + method + ". Check-in completed!");
    } else {
        alert("Payment will be made at arrival. Check-in completed!");
    }

    window.location.href = "feedback.html";
});

