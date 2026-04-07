document.addEventListener("DOMContentLoaded", () => {
    const APP_CONFIG = {
        whatsappPhone: "5585999999999",
        defaultWhatsappMessage: "Olá! Gostaria de uma consultoria gratuita da Agência Sabre.",
        ga4MeasurementId: "G-XXXXXXXXXX",
        metaPixelId: "000000000000000",
        social: {
            instagram: "https://instagram.com/",
            whatsapp: "https://wa.me/5585999999999"
        }
    };

    const trackEvent = (eventName, params = {}) => {
        if (typeof window.gtag === "function") {
            window.gtag("event", eventName, params);
        }

        if (typeof window.fbq === "function") {
            window.fbq("trackCustom", eventName, params);
        }
    };

    const openWhatsApp = (message) => {
        const encodedMessage = encodeURIComponent(message);
        const url = `https://wa.me/${APP_CONFIG.whatsappPhone}?text=${encodedMessage}`;
        window.open(url, "_blank", "noopener,noreferrer");
    };

    const setSocialLinks = () => {
        const instagramLink = document.getElementById("instagramLink");
        const footerWhatsappLink = document.getElementById("footerWhatsappLink");

        if (instagramLink) {
            instagramLink.href = APP_CONFIG.social.instagram;
        }

        if (footerWhatsappLink) {
            footerWhatsappLink.href = APP_CONFIG.social.whatsapp;
        }
    };

    setSocialLinks();

    trackEvent("analytics_config_loaded", {
        ga4_id: APP_CONFIG.ga4MeasurementId,
        pixel_id: APP_CONFIG.metaPixelId
    });

    // --- MENU MOBILE TOGGLE ---
    const menuToggle = document.getElementById("menuToggle");
    const navUl = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll("nav ul li a");

    const closeMenu = () => {
        if (!menuToggle || !navUl) return;
        menuToggle.classList.remove("active");
        navUl.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
    };

    const openMenu = () => {
        if (!menuToggle || !navUl) return;
        menuToggle.classList.add("active");
        navUl.classList.add("active");
        menuToggle.setAttribute("aria-expanded", "true");
    };

    if (menuToggle && navUl) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navUl.classList.contains("active");
            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Fechar menu ao clicar em um link
        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                closeMenu();
            });
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });
    }

    // --- WHATSAPP BUTTON LOGIC ---
    const whatsappBtn = document.getElementById("whatsappBtn");
    if (whatsappBtn) {
        whatsappBtn.addEventListener("click", (e) => {
            e.preventDefault();
            trackEvent("whatsapp_click", {
                source: "floating_button"
            });
            openWhatsApp(APP_CONFIG.defaultWhatsappMessage);
        });
    }

    const footerWhatsappLink = document.getElementById("footerWhatsappLink");
    if (footerWhatsappLink) {
        footerWhatsappLink.addEventListener("click", () => {
            trackEvent("whatsapp_click", {
                source: "footer_link"
            });
        });
    }

    const trackedCtas = {
        ctaHeroPrimary: "cta_hero_primary",
        ctaHeroServices: "cta_hero_services",
        ctaPortfolioMore: "cta_portfolio_more",
        ctaConsultoriaBanner: "cta_consultoria_banner",
        ctaFormSubmit: "cta_form_submit"
    };

    Object.entries(trackedCtas).forEach(([id, label]) => {
        const element = document.getElementById(id);
        if (!element) return;

        element.addEventListener("click", () => {
            trackEvent("cta_click", {
                cta_label: label
            });
        });
    });

    // --- VALIDAÇÃO DO FORMULÁRIO ---
    const mainForm = document.querySelector(".main-form");
    if (mainForm) {
        mainForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const nome = document.getElementById("nome").value.trim();
            const email = document.getElementById("email").value.trim();
            const telefone = document.getElementById("telefone").value.trim();
            const empresa = document.getElementById("empresa").value.trim();
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
            const linhas = [
                "Olá! Vim pelo site da Agência Sabre.",
                "",
                `Nome: ${nome}`,
                `E-mail: ${email}`,
                `Telefone: ${telefone || "Não informado"}`,
                `Empresa: ${empresa || "Não informada"}`,
                "",
                "Mensagem:",
                mensagem
            ];

            trackEvent("generate_lead", {
                source: "contact_form",
                has_phone: Boolean(telefone),
                has_company: Boolean(empresa)
            });

            openWhatsApp(linhas.join("\n"));

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
    document.querySelectorAll('a[href^="#"]:not(.whatsapp-float)').forEach((anchor) => {
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
            closeMenu();
        }
    });
});
