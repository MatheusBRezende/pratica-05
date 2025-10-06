document.addEventListener("DOMContentLoaded", function () {
    const mobileMenuBtn = document.querySelector(".mobile-menu");
    const navUl = document.querySelector("nav ul");
    const header = document.querySelector("header");

    mobileMenuBtn.addEventListener("click", function () {
        navUl.classList.toggle("show");
        mobileMenuBtn.classList.toggle("active");
    });

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();

            if (navUl.classList.contains("show")) {
                navUl.classList.remove("show");
                mobileMenuBtn.classList.remove("active");
            }

            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);

            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: "smooth",
            });
        });
    });

    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    const contactForm = document.getElementById("contactForm");
    const notificationPopup = document.getElementById("notificationPopup");
    const closePopup = document.getElementById("closePopup");

    if (contactForm) {
        contactForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            const formData = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                message: document.getElementById("message").value,
            };

            try {
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

                const response = await fetch(
                    "https://formsubmit.co/ajax/mbazarello@gmail.com",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                        body: JSON.stringify(formData),
                    }
                );

                const data = await response.json();

                if (data.success === "true") {
                    notificationPopup.classList.add("active");
                    contactForm.reset();
                } else {
                    alert("Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.");
            } finally {
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                submitBtn.disabled = false;
                submitBtn.textContent = "Enviar Mensagem";
            }
        });
    }

    if (closePopup) {
        closePopup.addEventListener("click", function () {
            notificationPopup.classList.remove("active");
        });
    }

    notificationPopup.addEventListener("click", function (e) {
        if (e.target === notificationPopup) {
            notificationPopup.classList.remove("active");
        }
    });

    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            navUl.classList.remove('show');
            mobileMenuBtn.classList.remove('active');
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.project-card, .skill-item, .info-item').forEach(el => {
        observer.observe(el);
    });
});