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
