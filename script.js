document.addEventListener("DOMContentLoaded", () => {
    // --- MENU MOBILE TOGGLE ---
    const menuToggle = document.querySelector(".menu-toggle");
    const navUl = document.querySelector("nav ul");
    const navLinks = document.querySelectorAll("nav ul li a");

    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            menuToggle.classList.toggle("active");
            navUl.classList.toggle("active");
        });

        // Fechar menu ao clicar em um link
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                menuToggle.classList.remove("active");
                navUl.classList.remove("active");
            });
        });
    }

    // --- WHATSAPP BUTTON LOGIC ---
    const whatsappBtn = document.getElementById("whatsappBtn");
    if (whatsappBtn) {
        whatsappBtn.addEventListener("click", (e) => {
            e.preventDefault();
            // Número de WhatsApp aqui (com código do país)
            const phoneNumber = "5585999999999"; // Substitua pelos números reais
            const message = "Olá! Gostaria de uma consultoria gratuita da Agência Sabre.";
            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
        });
    }

    // --- VALIDAÇÃO DO FORMULÁRIO ---
    const mainForm = document.querySelector(".main-form");
    if (mainForm) {
        mainForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const nome = document.getElementById("nome").value.trim();
            const email = document.getElementById("email").value.trim();
            const mensagem = document.getElementById("mensagem").value.trim();

            // Validações básicas
            if (!nome || nome.length < 3) {
                alert("❌ Por favor, digite seu nome completo (mínimo 3 caracteres)");
                return;
            }

            if (!email || !isValidEmail(email)) {
                alert("❌ Por favor, digite um e-mail válido");
                return;
            }

            if (!mensagem || mensagem.length < 10) {
                alert("❌ A mensagem deve ter no mínimo 10 caracteres");
                return;
            }

            // Se validações passarem, enviar para WhatsApp
            const phoneNumber = "5585999999999"; // Substitua pelos números reais
            const fullMessage = `*Nome:* ${nome}%0A*E-mail:* ${email}%0A%0A*Mensagem:*%0A${encodeURIComponent(mensagem)}`;
            window.open(`https://wa.me/${phoneNumber}?text=${fullMessage}`, "_blank");

            // Limpar formulário após envio
            mainForm.reset();
            alert("✅ Mensagem enviada com sucesso! Redirecionando para WhatsApp...");
        });
    }

    // Função para validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // --- LÓGICA DO SLIDESHOW COM MOLDURA DINÂMICA ---
    const slides = document.querySelectorAll(".slide");
    const container = document.querySelector(".slideshow-container");
    let currentSlide = 0;

    function adjustContainerSize(imgElement) {
        if (!imgElement) return;

        const tempImg = new Image();
        tempImg.src = imgElement.src;

        tempImg.onload = () => {
            const aspectRatio = tempImg.naturalWidth / tempImg.naturalHeight;
            let newWidth, newHeight;

            if (aspectRatio > 1.2) {
                newWidth = 360;
                newHeight = 220;
            } else if (aspectRatio < 0.8) {
                newWidth = 240;
                newHeight = 320;
            } else {
                newWidth = 280;
                newHeight = 280;
            }

            if (container) {
                container.style.width = `${newWidth}px`;
                container.style.height = `${newHeight}px`;
            }
        };
    }

    if (slides.length > 0) {
        adjustContainerSize(slides[0]);
    }

    function nextSlide() {
        if (slides.length === 0) return;
        
        slides[currentSlide].classList.remove("active");
        currentSlide = (currentSlide + 1) % slides.length;
        const nextImg = slides[currentSlide];
        nextImg.classList.add("active");
        adjustContainerSize(nextImg);
    }

    if (slides.length > 0) {
        setInterval(nextSlide, 3500);
    }

    // --- SMOOTH SCROLLING ---
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            if (href === "#") return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
                // Adicionar offset para header fixo
                window.scrollBy(0, -80);
            }
        });
    });

    // --- SCROLL ANIMATIONS ---
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll(
        ".card, .section-title, .hero-text, .slideshow-wrapper, .cta-banner, .portfolio-item"
    );

    elementsToAnimate.forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
        observer.observe(el);
    });

    // Injetar estilos CSS para animação
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .visible { 
            opacity: 1 !important; 
            transform: translateY(0) !important; 
        }
    `;
    document.head.appendChild(styleSheet);

    // --- HEADER STICKY COM SOMBRA NO SCROLL ---
    window.addEventListener("scroll", () => {
        const header = document.getElementById("header");
        if (header) {
            if (window.scrollY > 50) {
                header.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.5)";
            } else {
                header.style.boxShadow = "none";
            }
        }
    });

    // --- FECHAR MENU AO CLICAR FORA ---
    document.addEventListener("click", (e) => {
        if (menuToggle && navUl && !e.target.closest("nav")) {
            menuToggle.classList.remove("active");
            navUl.classList.remove("active");
        }
    });
});
