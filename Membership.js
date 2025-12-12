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
        
        document.getElementById("successMsg").style.display = "none";
        document.getElementById("payment").style.display = "block";
        document.getElementById("payment").querySelector('.pay-btn').disabled = false;
        document.getElementById("payment").querySelector('.btn-text').innerText = "Complete Payment";
        
    });
});


var form = document.getElementById("payment"); 
var successMsg = document.getElementById("successMsg");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    var payButton = form.querySelector('.pay-btn');
    var originalButtonText = payButton.querySelector('.btn-text').innerText;
    var originalButtonAmount = payButton.querySelector('.btn-amount').innerText;

    payButton.disabled = true;
    payButton.querySelector('.btn-text').innerText = "Processing Payment...";
    payButton.querySelector('.btn-amount').innerText = "Wait";

    setTimeout(function() {
        var transactionId = "FNVT" + Math.floor(Math.random() * 900000 + 100000);
        
        successMsg.innerText = "🎉 Success! You have subscribed to the " + hiddenPlan.value + ". Your transaction ID is " + transactionId + ".";
        successMsg.style.display = "block";
        
        form.style.display = "none";
        
        successMsg.scrollIntoView({ behavior: "smooth" });

    }, 2000);
});
