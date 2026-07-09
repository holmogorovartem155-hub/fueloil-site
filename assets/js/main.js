/* ============================================
   FUELOIL — JavaScript Magic
   Smooth scrolling, animations, interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

    // ==========================================
    // 1. ПЛАВНАЯ НАВИГАЦИЯ (Smooth Scroll)
    // ==========================================

    const navLinks = document.querySelectorAll('header nav a, .footer-nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            // Проверяем, что это якорь (начинается с #)
            if (targetId && targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    e.preventDefault();

                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Закрываем мобильное меню, если оно открыто
                    closeMobileMenu();
                }
            }
        });
    });

    // ==========================================
    // 2. МОБИЛЬНОЕ МЕНЮ (Гамбургер)
    // ==========================================

    // Создаём кнопку гамбургера, если её нет
    let mobileMenuBtn = document.querySelector('.mobile-menu-btn');

    if (!mobileMenuBtn) {
        mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.classList.add('mobile-menu-btn');
        mobileMenuBtn.setAttribute('aria-label', 'Toggle menu');
        mobileMenuBtn.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;

        const header = document.querySelector('header');
        const nav = header.querySelector('nav');
        header.insertBefore(mobileMenuBtn, nav);
    }

    const nav = document.querySelector('header nav');

    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    function closeMobileMenu() {
        mobileMenuBtn.classList.remove('active');
        nav.classList.remove('active');
        document.body.classList.remove('menu-open');
    }

    // Закрываем меню при клике вне него
    document.addEventListener('click', function(e) {
        if (nav.classList.contains('active')) {
            const isClickInside = nav.contains(e.target) || mobileMenuBtn.contains(e.target);
            if (!isClickInside) {
                closeMobileMenu();
            }
        }
    });

    // ==========================================
    // 3. АНИМАЦИЯ ПРИ СКРОЛЛЕ (Intersection Observer)
    // ==========================================

    const animatedElements = document.querySelectorAll(
        '.member-card, .album, .lyrics-card, .gallery-item, .show, .about-container, .contact-container'
    );

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Можно наблюдать только один раз
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        // Добавляем класс для начального состояния (прозрачность)
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        observer.observe(el);
    });

    // Добавляем стили для анимированных элементов через CSS
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .member-card.visible,
        .album.visible,
        .lyrics-card.visible,
        .gallery-item.visible,
        .show.visible,
        .about-container.visible,
        .contact-container.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }

        /* Задержки для каскадных эффектов */
        .members-grid .member-card:nth-child(2) { transition-delay: 0.1s; }
        .members-grid .member-card:nth-child(3) { transition-delay: 0.2s; }
        .members-grid .member-card:nth-child(4) { transition-delay: 0.3s; }

        .albums .album:nth-child(2) { transition-delay: 0.15s; }

        .gallery-grid .gallery-item:nth-child(2) { transition-delay: 0.05s; }
        .gallery-grid .gallery-item:nth-child(3) { transition-delay: 0.1s; }
        .gallery-grid .gallery-item:nth-child(4) { transition-delay: 0.15s; }
        .gallery-grid .gallery-item:nth-child(5) { transition-delay: 0.2s; }
        .gallery-grid .gallery-item:nth-child(6) { transition-delay: 0.25s; }

        .shows-list .show:nth-child(2) { transition-delay: 0.1s; }
    `;
    document.head.appendChild(styleSheet);

    // Форсируем проверку для элементов, которые уже видны
    setTimeout(() => {
        animatedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            if (rect.top < windowHeight - 100) {
                el.classList.add('visible');
                observer.unobserve(el);
            }
        });
    }, 100);

    // ==========================================
    // 4. ПАРАЛЛАКС-ЭФФЕКТ ДЛЯ HERO
    // ==========================================

    const hero = document.querySelector('#hero');

    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            if (scrollPosition < window.innerHeight) {
                const parallaxOffset = scrollPosition * 0.3;
                hero.style.backgroundPositionY = `-${parallaxOffset}px`;
            }
        }, { passive: true });
    }

    // ==========================================
    // 5. АКТИВНЫЙ ПУНКТ МЕНЮ ПРИ СКРОЛЛЕ
    // ==========================================

    const sections = document.querySelectorAll('section[id]');
    const navLinksArray = document.querySelectorAll('header nav a');

    function updateActiveNav() {
        let current = '';
        const scrollPosition = window.pageYOffset + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinksArray.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();

    // ==========================================
    // 6. КНОПКА НАВЕРХ (Scroll to Top)
    // ==========================================

    let scrollTopBtn = document.querySelector('.scroll-top-btn');

    if (!scrollTopBtn) {
        scrollTopBtn = document.createElement('button');
        scrollTopBtn.classList.add('scroll-top-btn');
        scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
        scrollTopBtn.innerHTML = '↑';
        document.body.appendChild(scrollTopBtn);

        // Добавляем стили для кнопки
        const btnStyles = document.createElement('style');
        btnStyles.textContent = `
            .scroll-top-btn {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 48px;
                height: 48px;
                border-radius: 50%;
                background: rgba(20, 14, 16, 0.8);
                border: 1px solid rgba(120, 80, 80, 0.2);
                color: #8a7a7a;
                font-size: 1.4rem;
                cursor: pointer;
                opacity: 0;
                visibility: hidden;
                transition: all 0.4s ease;
                z-index: 999;
                backdrop-filter: blur(8px);
            }

            .scroll-top-btn:hover {
                background: rgba(120, 80, 80, 0.15);
                border-color: rgba(160, 100, 100, 0.3);
                color: #ffffff;
                transform: translateY(-3px);
            }

            .scroll-top-btn.visible {
                opacity: 1;
                visibility: visible;
            }

            @media (max-width: 480px) {
                .scroll-top-btn {
                    bottom: 20px;
                    right: 20px;
                    width: 40px;
                    height: 40px;
                    font-size: 1rem;
                }
            }
        `;
        document.head.appendChild(btnStyles);
    }

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 400) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ==========================================
    // 7. ФОРМА ОБРАТНОЙ СВЯЗИ
    // ==========================================

    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            // Простая валидация
            const name = this.querySelector('input[type="text"]');
            const email = this.querySelector('input[type="email"]');
            const message = this.querySelector('textarea');

            if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
                showFormMessage(this, 'Заполните все поля, пожалуйста.', 'error');
                return;
            }

            if (!isValidEmail(email.value)) {
                showFormMessage(this, 'Введите корректный email.', 'error');
                return;
            }

            // Имитация отправки
            submitBtn.textContent = 'Отправка...';
            submitBtn.disabled = true;

            setTimeout(() => {
                showFormMessage(this, 'Сообщение отправлено! Свяжемся с вами скоро. 🖤', 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    function showFormMessage(form, text, type) {
        let messageEl = form.querySelector('.form-message');

        if (!messageEl) {
            messageEl = document.createElement('div');
            messageEl.classList.add('form-message');
            form.insertBefore(messageEl, form.querySelector('button'));
        }

        messageEl.textContent = text;
        messageEl.className = `form-message ${type}`;

        // Стили для сообщений
        const msgStyles = document.createElement('style');
        msgStyles.textContent = `
            .form-message {
                padding: 0.8rem 1.2rem;
                border-radius: 4px;
                font-size: 0.85rem;
                text-align: center;
                margin-bottom: 0.5rem;
            }
            .form-message.success {
                color: #8aaa8a;
                border: 1px solid rgba(80, 160, 80, 0.15);
                background: rgba(80, 160, 80, 0.05);
            }
            .form-message.error {
                color: #aa7a7a;
                border: 1px solid rgba(160, 80, 80, 0.15);
                background: rgba(160, 80, 80, 0.05);
            }
        `;
        // Добавляем только если ещё нет
        if (!document.querySelector('style[data-form-msg]')) {
            msgStyles.setAttribute('data-form-msg', 'true');
            document.head.appendChild(msgStyles);
        }

        // Автоскрытие через 4 секунды
        clearTimeout(messageEl._timeout);
        messageEl._timeout = setTimeout(() => {
            messageEl.style.transition = 'opacity 0.5s ease';
            messageEl.style.opacity = '0';
            setTimeout(() => {
                messageEl.textContent = '';
                messageEl.className = 'form-message';
                messageEl.style.opacity = '1';
            }, 500);
        }, 4000);
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // ==========================================
    // 8. ДИНАМИЧЕСКИЙ ГОД В ФУТЕРЕ
    // ==========================================

    const footerYear = document.querySelector('footer small');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.textContent = footerYear.textContent.replace('2026', currentYear);
    }

    // ==========================================
    // 9. ТЁМНАЯ ТЕМА (по желанию пользователя)
    // ==========================================

    // Проверяем сохранённую тему
    const savedTheme = localStorage.getItem('fueloil-theme');

    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }

    // Можно добавить переключатель темы, если нужно

    // ==========================================
    // 10. ОБРАБОТКА ИЗОБРАЖЕНИЙ (Lazy Loading)
    // ==========================================

    // Все изображения уже используют loading="lazy" в HTML,
    // но на случай, если браузер не поддерживает

    if ('loading' in HTMLImageElement.prototype) {
        // Браузер поддерживает lazy loading
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.src; // Триггерим загрузку
        });
    } else {
        // Fallback для старых браузеров
        // Можно подключить полифилл, но для простоты пропускаем
    }

    console.log('🖤 FuelOil — Emo / Post-Hardcore from Moscow');
    console.log('🎸 "The world doesn\'t get better. We just become louder."');

});