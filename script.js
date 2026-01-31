// ==========================================
// NexaPay - Interactive JavaScript
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initFAQ();
    initTypingAnimation();
    initScrollAnimations();
    initParallaxOrbs();
    initChat();
});

// ==========================================
// FAQ Accordion
// ==========================================
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// ==========================================
// Typing Animation
// ==========================================
function initTypingAnimation() {
    const typingElements = document.querySelectorAll('.typing-text');
    const texts = [
        'Process payment for $5,000...',
        'Check transaction status...',
        'Generate monthly report...',
        'Create new payout batch...'
    ];
    
    typingElements.forEach(element => {
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                element.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                element.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeSpeed = isDeleting ? 30 : 50;
            
            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500; // Pause before new text
            }
            
            setTimeout(type, typeSpeed);
        }
        
        type();
    });
}

// ==========================================
// Scroll Animations
// ==========================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animateElements = document.querySelectorAll(
        '.feature-card, .process-step, .testimonial-card, .step-card, .faq-item'
    );
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Add animation class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// ==========================================
// Parallax Gradient Orbs
// ==========================================
function initParallaxOrbs() {
    const orbs = document.querySelectorAll('.gradient-orb');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        orbs.forEach((orb, index) => {
            const speed = 0.1 + (index * 0.05);
            orb.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });
}

// ==========================================
// Smooth Scroll for Anchor Links
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==========================================
// Navbar Background on Scroll
// ==========================================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(5, 5, 7, 0.95)';
    } else {
        navbar.style.background = 'rgba(5, 5, 7, 0.8)';
    }
});

// ==========================================
// 3D Card Tilt Effect
// ==========================================
const cards = document.querySelectorAll('.feature-card, .step-card, .testimonial-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ==========================================
// Interactive AI Chat
// ==========================================
function initChat() {
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const chatMessages = document.getElementById('chatMessages');
    
    if (!chatInput || !sendBtn || !chatMessages) return;
    
    // AI Response templates
    const aiResponses = [
        "Great question! NexaPay makes it simple — our API is RESTful, well-documented, and most teams integrate within 48 hours. We also have SDKs for Node.js, Python, Ruby, and PHP!",
        "I'd be happy to help with that! NexaPay supports 135+ currencies with competitive FX rates. Cross-border payments settle in 1-2 business days, and we handle all compliance automatically.",
        "Absolutely! Security is our top priority. We're PCI DSS Level 1 certified, use end-to-end encryption, and our AI fraud detection catches 99.9% of fraudulent transactions before they process.",
        "That's a common concern! NexaPay offers transparent pricing starting at 2.9% + $0.30 per transaction. Volume discounts available, no hidden fees, and you only pay for successful transactions.",
        "Perfect timing to ask! We support cards (Visa, Mastercard, Amex), ACH, wire transfers, digital wallets (Apple Pay, Google Pay), and local payment methods in 40+ countries.",
        "I love that question! Our sandbox is completely free and available instantly when you sign up. Test everything before going live — no risk, no commitment."
    ];
    
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;
        
        // Add user message
        addMessage(message, 'user');
        chatInput.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Simulate AI response after delay
        setTimeout(() => {
            hideTypingIndicator();
            const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
            addMessage(randomResponse, 'ai');
        }, 1500 + Math.random() * 1000);
    }
    
    function addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type === 'user' ? 'user-message' : 'ai-message'}`;
        
        if (type === 'user') {
            messageDiv.innerHTML = `
                <div class="message-content">
                    <p>${escapeHtml(text)}</p>
                </div>
                <div class="message-avatar user-avatar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                    </svg>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="ai-avatar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
                        <path d="M2 17L12 22L22 17"/>
                        <path d="M2 12L12 17L22 12"/>
                    </svg>
                </div>
                <div class="message-content">
                    <p>${escapeHtml(text)}</p>
                </div>
            `;
        }
        
        chatMessages.appendChild(messageDiv);
        
        // Smooth scroll to bottom
        chatMessages.scrollTo({
            top: chatMessages.scrollHeight,
            behavior: 'smooth'
        });
    }
    
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai-message typing-message';
        typingDiv.innerHTML = `
            <div class="ai-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
                    <path d="M2 17L12 22L22 17"/>
                    <path d="M2 12L12 17L22 12"/>
                </svg>
            </div>
            <div class="message-content">
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTo({
            top: chatMessages.scrollHeight,
            behavior: 'smooth'
        });
    }
    
    function hideTypingIndicator() {
        const typingMessage = chatMessages.querySelector('.typing-message');
        if (typingMessage) {
            typingMessage.remove();
        }
    }
    
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Event listeners
    sendBtn.addEventListener('click', sendMessage);
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Focus input when clicking on chat area
    chatMessages.addEventListener('click', () => {
        chatInput.focus();
    });
}

// ==========================================
// Hero Chat Widget
// ==========================================
function initHeroWidget() {
    const widgetInput = document.getElementById('heroWidgetInput');
    const widgetSend = document.getElementById('heroWidgetSend');
    const widgetInner = document.querySelector('.widget-inner');
    
    if (!widgetInput || !widgetSend) return;
    
    const responses = [
        "Great question! NexaPay offers simple, transparent pricing starting at 2.9% + $0.30. No hidden fees!",
        "Integration is fast — most teams go live in 48 hours using our SDKs. Check out our docs!",
        "We support 135+ currencies with competitive FX rates. Cross-border payments are our specialty!",
        "Yes! We're PCI DSS Level 1 certified with 99.99% uptime. Security is built into everything we do.",
        "Our sandbox is free and instant. Sign up and start testing immediately — no commitment required."
    ];
    
    function showResponse(question) {
        // Remove existing response
        const existingResponse = widgetInner.querySelector('.widget-response');
        if (existingResponse) existingResponse.remove();
        
        // Create response element
        const responseDiv = document.createElement('div');
        responseDiv.className = 'widget-response active';
        responseDiv.innerHTML = `<p>${responses[Math.floor(Math.random() * responses.length)]}</p>`;
        
        widgetInner.style.position = 'relative';
        widgetInner.appendChild(responseDiv);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            responseDiv.classList.remove('active');
            setTimeout(() => responseDiv.remove(), 300);
        }, 5000);
    }
    
    widgetSend.addEventListener('click', () => {
        if (widgetInput.value.trim()) {
            showResponse(widgetInput.value);
            widgetInput.value = '';
        }
    });
    
    widgetInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && widgetInput.value.trim()) {
            showResponse(widgetInput.value);
            widgetInput.value = '';
        }
    });
}

// Initialize hero widget
document.addEventListener('DOMContentLoaded', initHeroWidget);
