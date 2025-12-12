var buttons = document.querySelectorAll(".select-plan");

var paymentForm = document.getElementById("paymentForm");
var planNameDisplay = document.getElementById("selectedPlanName");
var summaryAmount = document.getElementById("summaryAmount");
var summaryTax = document.getElementById("summaryTax");
var summaryTotal = document.getElementById("summaryTotal");
var termsAmount = document.getElementById("termsAmount");
var btnTotalAmount = document.getElementById("btnTotalAmount");

var hiddenPlan = document.getElementById("selectedPlan");
var hiddenPrice = document.getElementById("selectedPrice");

buttons.forEach(function(btn) {
    btn.addEventListener("click", function() {
        var card = btn.parentElement;

        var planName = card.getAttribute("data-plan");
        var price = parseFloat(card.getAttribute("data-price"));

        planNameDisplay.innerText = planName;
        summaryAmount.innerText = "₹" + price;

        var tax = (price * 0.18).toFixed(2);
        var total = (price + parseFloat(tax)).toFixed(2);

        summaryTax.innerText = "₹" + tax;
        summaryTotal.innerText = "₹" + total;
        termsAmount.innerText = price;
        btnTotalAmount.innerText = total;

        hiddenPlan.value = planName;
        hiddenPrice.value = price;

        paymentForm.style.display = "block";
        paymentForm.scrollIntoView({ behavior: "smooth" });
    });
});

var paymentForm = document.getElementById("payment");
var successMsg = document.getElementById("successMsg");

paymentForm.addEventListener("submit", function(event) {
    event.preventDefault();
    
    
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
    
    var cleanCard = card.replace(/\s/g, '');
    if (cleanCard.length !== 16 || isNaN(cleanCard)) {
        showMessage("Please enter a valid 16-digit card number.", "error");
        return;
    }
    
    if (cvv.length !== 3 || isNaN(cvv)) {
        showMessage("Please enter a valid 3-digit CVV.", "error");
        return;
    }
    
    showMessage("✅ Payment successful! Thank you for subscribing to " + 
                document.getElementById("selectedPlanName").innerText + 
                ". A confirmation email has been sent.", "success");
    
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
