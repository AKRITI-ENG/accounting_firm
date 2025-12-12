// Add this to the existing Membership.js

var paymentForm = document.getElementById("payment");
var successMsg = document.getElementById("successMsg");

// Form validation and submission
paymentForm.addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Basic validation
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var card = document.getElementById("card").value;
    var exp = document.getElementById("exp").value;
    var cvv = document.getElementById("cvv").value;
    var terms = document.getElementById("terms").checked;
    
    // Simple validation
    if (!name || !email || !card || !exp || !cvv) {
        showMessage("Please fill in all required fields.", "error");
        return;
    }
    
    if (!terms) {
        showMessage("You must agree to the terms and conditions.", "error");
        return;
    }
    
    // Card number validation (basic)
    var cleanCard = card.replace(/\s/g, '');
    if (cleanCard.length !== 16 || isNaN(cleanCard)) {
        showMessage("Please enter a valid 16-digit card number.", "error");
        return;
    }
    
    // CVV validation
    if (cvv.length !== 3 || isNaN(cvv)) {
        showMessage("Please enter a valid 3-digit CVV.", "error");
        return;
    }
    
    // Show success message
    showMessage("✅ Payment successful! Thank you for subscribing to " + 
                document.getElementById("selectedPlanName").innerText + 
                ". A confirmation email has been sent.", "success");
    
    // Reset form after 3 seconds
    setTimeout(function() {
        paymentForm.reset();
        successMsg.style.display = "none";
    }, 5000);
});

function showMessage(text, type) {
    successMsg.textContent = text;
    successMsg.style.display = "block";
    
    if (type === "error") {
        successMsg.style.color = "#dc2626";
        successMsg.style.background = "#fee2e2";
    } else {
        successMsg.style.color = "#10b981";
        successMsg.style.background = "#d1fae5";
    }
}

// Format card number with spaces
document.getElementById("card").addEventListener("input", function(e) {
    var value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    var matches = value.match(/\d{4,16}/g);
    var match = matches && matches[0] || '';
    var parts = [];
    
    for (var i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
        e.target.value = parts.join(' ');
    } else {
        e.target.value = value;
    }
});
