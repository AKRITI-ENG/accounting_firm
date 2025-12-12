document.addEventListener('DOMContentLoaded', function() {
    const planButtons = document.querySelectorAll('.select-plan');
    const paymentSection = document.getElementById('paymentForm');
    const selectedPlanInput = document.getElementById('selectedPlan');
    const selectedPriceInput = document.getElementById('selectedPrice');
    const summaryPlan = document.getElementById('summaryPlan');
    const summaryPrice = document.getElementById('summaryPrice');
    const payAmount = document.getElementById('payAmount');
    const successMsg = document.getElementById('successMsg');
    const payButton = document.querySelector('.pay-btn');
    const paymentForm = document.getElementById('payment');
    const cardInput = document.getElementById('card');
    const cvvInput = document.getElementById('cvv');
    const expInput = document.getElementById('exp');
    
    initExpiryDate();
    
    planButtons.forEach(button => {
        button.addEventListener('click', handlePlanSelection);
    });
    
    paymentForm.addEventListener('submit', handlePaymentSubmit);
    
    cardInput.addEventListener('input', formatCardNumber);
    
    cvvInput.addEventListener('input', formatCVV);
    
    cardInput.addEventListener('keyup', detectCardType);
    
    function initExpiryDate() {
        const currentYear = new Date().getFullYear();
        const currentMonth = String(new Date().getMonth() + 1).padStart(2, '0');
        expInput.min = `${currentYear}-${currentMonth}`;
        
        const nextYear = currentYear + 1;
        expInput.value = `${nextYear}-${currentMonth}`;
    }
    
    function handlePlanSelection() {
        const planCard = this.closest('.plan-card');
        const planName = planCard.getAttribute('data-plan');
        const planPrice = planCard.getAttribute('data-price');
        
        // Update payment form with selected plan
        selectedPlanInput.value = planName;
        selectedPriceInput.value = planPrice;
        summaryPlan.textContent = planName;
        summaryPrice.textContent = `₹${planPrice} / month`;
        payAmount.textContent = `₹${planPrice}`;
        payButton.innerHTML = `Pay Now - <span id="payAmount">₹${planPrice}</span>`;
        
        paymentSection.style.display = 'block';
        
        setTimeout(() => {
            paymentSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }, 100);
        
        const newPayAmount = document.getElementById('payAmount');
        newPayAmount.textContent = `₹${planPrice}`;
    }
    
    function handlePaymentSubmit(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const card = document.getElementById('card').value;
        const exp = document.getElementById('exp').value;
        const cvv = document.getElementById('cvv').value;
        const plan = selectedPlanInput.value;
        const price = selectedPriceInput.value;
        
        if (!validateForm(name, email, card, cvv)) {
            return;
        }
        
        payButton.textContent = 'Processing...';
        payButton.classList.add('processing');
        
        simulatePaymentProcessing(name, email, card, exp, cvv, plan, price);
    }
    
    function validateForm(name, email, card, cvv) {
        const cleanCard = card.replace(/\s/g, '');
        
        if (cleanCard.length !== 16 || !/^\d+$/.test(cleanCard)) {
            showError('Please enter a valid 16-digit card number');
            return false;
        }
        
        if (cvv.length !== 3 || !/^\d+$/.test(cvv)) {
            showError('Please enter a valid 3-digit CVV');
            return false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('Please enter a valid email address');
            return false;
        }
        
        // Name validation
        if (name.trim().length < 2) {
            showError('Please enter your full name');
            return false;
        }
        
        return true;
    }
    
    function showError(message) {
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        errorElement.style.cssText = `
            color: #dc2626;
            background-color: #fee2e2;
            padding: 0.8rem;
            border-radius: 8px;
            margin-top: 1rem;
            text-align: center;
            font-weight: 600;
        `;
        
        payButton.parentNode.insertBefore(errorElement, payButton);
        
        setTimeout(() => {
            if (errorElement.parentNode) {
                errorElement.remove();
            }
        }, 5000);
    }
    
    function simulatePaymentProcessing(name, email, card, exp, cvv, plan, price) {
        // Simulate API call delay
        setTimeout(() => {
            // Show success message
            successMsg.style.display = 'block';
            payButton.style.display = 'none';
            
            successMsg.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
            
            console.log('Payment processed successfully:');
            console.log(`Plan: ${plan}, Amount: ₹${price}`);
            console.log(`Name: ${name}, Email: ${email}`);
            console.log(`Card: **** **** **** ${card.replace(/\s/g, '').slice(-4)}`);
            console.log(`Expiry: ${exp}`);
            
            simulateConfirmationEmail(email, plan, price);
            
            setTimeout(() => {
                resetPaymentForm(price);
                
                showConfirmationAlert(plan);
            }, 5000);
        }, 2000);
    }
    
    function simulateConfirmationEmail(email, plan, price) {
        console.log(`Sending confirmation email to: ${email}`);
        console.log(`Subject: Welcome to Finovate Accounting - ${plan} Activated!`);
        console.log(`Body: Thank you for subscribing to our ${plan} at ₹${price}/month.`);
    }
    
    function resetPaymentForm(price) {
        paymentForm.reset();
        initExpiryDate(); // Reset expiry date
        paymentSection.style.display = 'none';
        successMsg.style.display = 'none';
        payButton.style.display = 'block';
        payButton.classList.remove('processing');
        payButton.innerHTML = `Pay Now - <span id="payAmount">₹${price}</span>`;
        
        const errorElement = document.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    function showConfirmationAlert(plan) {
        alert(`Thank you for subscribing to the ${plan}!\n\nYour account is now active. Check your email for confirmation details.\n\nYou can now access all premium features.`);
    }
    
    function formatCardNumber() {
        let value = this.value.replace(/\D/g, '');
        if (value.length > 16) value = value.substring(0, 16);
        
        let formatted = '';
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) formatted += ' ';
            formatted += value[i];
        }
        
        this.value = formatted;
    }
    
    function formatCVV() {
        this.value = this.value.replace(/\D/g, '').substring(0, 3);
    }
    
    function detectCardType() {
        const cardNumber = this.value.replace(/\s/g, '');
        const cardIcons = document.querySelectorAll('.payment-icons i');
        
        cardIcons.forEach(icon => {
            icon.style.opacity = '0.3';
            icon.style.transform = 'scale(1)';
        });
        
        let detectedType = null;
        
        if (/^4/.test(cardNumber)) {
            // Visa
            detectedType = 'visa';
        } else if (/^5[1-5]/.test(cardNumber)) {
            // Mastercard
            detectedType = 'mastercard';
        } else if (/^3[47]/.test(cardNumber)) {
            // American Express
            detectedType = 'amex';
        } else if (/^6(?:011|5)/.test(cardNumber)) {
            // Discover
            detectedType = 'discover';
        }
        
        if (detectedType) {
            const detectedIcon = document.querySelector(`.fa-cc-${detectedType}`);
            if (detectedIcon) {
                detectedIcon.style.opacity = '1';
                detectedIcon.style.transform = 'scale(1.2)';
                detectedIcon.style.transition = 'all 0.3s ease';
            }
        }
    }
    
    detectCardType.call(cardInput);
});
