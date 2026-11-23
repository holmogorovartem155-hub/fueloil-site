/* ============================================================
   🖤 FUELOIL — COMPLETE SCRIPT (FINAL)
   ============================================================ */

(function () {
    'use strict';

    // ==========================================================
    // КОНФИГУРАЦИЯ
    // ==========================================================
    const CONFIG = {
        promoCodes: {
            'FUELOIL10': 10,
            'EMO2026': 15,
            'WELCOME': 5
        }
    };

    // ==========================================================
    // СОСТОЯНИЕ КОРЗИНЫ (с восстановлением из localStorage)
    // ==========================================================
    let cart = [];
    let discountApplied = 0;

    try {
        const savedCart = localStorage.getItem('fueloil-cart');
        if (savedCart) cart = JSON.parse(savedCart);
    } catch (e) {
        console.error('Ошибка загрузки корзины', e);
    }

    // ==========================================================
    // ИНИЦИАЛИЗАЦИЯ
    // ==========================================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        console.log('🖤 FuelOil — Emo / Post-Hardcore from Moscow');

        // UI Эффекты
        smoothNavigation();
        mobileMenu();
        scrollAnimations();
        parallaxHero();
        activeNavHighlight();
        scrollToTopButton();
        dynamicFooterYear();
        progressBar();
        cookiesConsent();
        randomQuote();
        typingEffect();

        // Интерактив
        contactFormHandler();
        galleryLightbox();
        musicPlayer();

        // Магазин и Корзина
        initMerch();
        initCart();

        console.log('✅ FuelOil script fully loaded.');
    }

    // ==========================================================
    // ПЛАВНАЯ НАВИГАЦИЯ
    // ==========================================================
    function smoothNavigation() {
        const links = document.querySelectorAll('a[href^="#"]:not([href="#"])');

        links.forEach(link => {
            link.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);

                if (target) {
                    e.preventDefault();
                    const header = document.querySelector('header');
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10;

                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });

                    if (window.closeMobileMenu) window.closeMobileMenu();

                    if (history.pushState) history.pushState(null, null, targetId);
                }
            });
        });
    }

    // ==========================================================
    // МОБИЛЬНОЕ МЕНЮ
    // ==========================================================
    function mobileMenu() {
        const header = document.querySelector('header');
        const nav = header ? header.querySelector('nav') : null;
        if (!nav) return;

        let burger = document.querySelector('.burger-menu');

        if (!burger) {
            burger = document.createElement('button');
            burger.className = 'burger-menu';
            burger.setAttribute('aria-label', 'Toggle navigation');
            burger.setAttribute('aria-expanded', 'false');

            for (let i = 0; i < 3; i++) {
                burger.appendChild(document.createElement('span'));
            }
            header.insertBefore(burger, nav);
        }

        function toggleMenu() {
            const isOpen = nav.classList.contains('open');
            nav.classList.toggle('open');
            burger.classList.toggle('active');
            burger.setAttribute('aria-expanded', !isOpen);
            document.body.classList.toggle('menu-open');
        }

        burger.addEventListener('click', toggleMenu);

        document.addEventListener('click', function (e) {
            if (nav.classList.contains('open')) {
                const isInside = nav.contains(e.target) || burger.contains(e.target);
                if (!isInside) window.closeMobileMenu();
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && nav.classList.contains('open')) {
                window.closeMobileMenu();
            }
        });

        window.closeMobileMenu = function () {
            nav.classList.remove('open');
            burger.classList.remove('active');
            burger.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('menu-open');
        };
    }

    // ==========================================================
    // АНИМАЦИИ ПРИ СКРОЛЛЕ
    // ==========================================================
    function scrollAnimations() {
        const elements = document.querySelectorAll(
            '.member-card, .album, .lyrics-card, .gallery-item, ' +
            '.show, .about-container, .contact-container, .transition, .merch-card'
        );
        if (!elements.length) return;

        elements.forEach(el => el.classList.add('animate-on-scroll'));

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

        elements.forEach(el => observer.observe(el));

        setTimeout(function () {
            elements.forEach(el => {
                const rect = el.getBoundingClientRect();
                const winHeight = window.innerHeight || document.documentElement.clientHeight;
                if (rect.top < winHeight - 60) {
                    el.classList.add('visible');
                    observer.unobserve(el);
                }
            });
        }, 200);
    }

    // ==========================================================
    // ПАРАЛЛАКС ГЛАВНОГО ЭКРАНА
    // ==========================================================
    function parallaxHero() {
        const hero = document.querySelector('#hero');
        if (!hero) return;

        let ticking = false;
        window.addEventListener('scroll', function () {
            if (!ticking) {
                window.requestAnimationFrame(function () {
                    const scrollY = window.pageYOffset;
                    if (scrollY < window.innerHeight) {
                        hero.style.backgroundPositionY = `-${scrollY * 0.2}px`;
                        hero.style.transform = `translateY(${scrollY * 0.05}px)`;
                        hero.style.opacity = 1 - (scrollY / window.innerHeight) * 0.3;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // ==========================================================
    // ПОДСВЕТКА АКТИВНОГО ПУНКТА МЕНЮ
    // ==========================================================
    function activeNavHighlight() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('header nav a');
        if (!sections.length || !navLinks.length) return;

        function updateActive() {
            let currentId = '';
            const scrollPos = window.pageYOffset + 150;

            sections.forEach(section => {
                if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                    currentId = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentId}`) link.classList.add('active');
            });
        }

        window.addEventListener('scroll', updateActive, { passive: true });
        window.addEventListener('resize', updateActive, { passive: true });
        updateActive();
    }

    // ==========================================================
    // КНОПКА ВВЕРХ
    // ==========================================================
    function scrollToTopButton() {
        let btn = document.querySelector('.scroll-top');
        if (!btn) {
            btn = document.createElement('button');
            btn.className = 'scroll-top';
            btn.setAttribute('aria-label', 'Scroll to top');
            btn.innerHTML = '↑';
            document.body.appendChild(btn);
        }

        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 400) btn.classList.add('visible');
            else btn.classList.remove('visible');
        }, { passive: true });

        btn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ==========================================================
    // ДИНАМИЧЕСКИЙ ГОД В ФУТЕРЕ
    // ==========================================================
    function dynamicFooterYear() {
        const footer = document.querySelector('footer small');
        if (footer) {
            footer.textContent = footer.textContent.replace(/\d{4}/, new Date().getFullYear());
        }
    }

    // ==========================================================
    // ПОЛОСА ПРОКРУТКИ СВЕРХУ
    // ==========================================================
    function progressBar() {
        let bar = document.querySelector('.scroll-progress');
        if (!bar) {
            bar = document.createElement('div');
            bar.className = 'scroll-progress';
            document.body.appendChild(bar);
        }

        window.addEventListener('scroll', function () {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            bar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
        }, { passive: true });
    }

    // ==========================================================
    // КУКИ
    // ==========================================================
    function cookiesConsent() {
        if (localStorage.getItem('fueloil-cookies') === 'accepted') return;

        const banner = document.createElement('div');
        banner.className = 'cookies-banner';
        banner.innerHTML = `
            <p>🍪 Мы используем cookies, чтобы сайт работал лучше.</p>
            <button class="cookies-accept">Принять</button>
        `;
        document.body.appendChild(banner);

        banner.querySelector('.cookies-accept').addEventListener('click', function () {
            localStorage.setItem('fueloil-cookies', 'accepted');
            banner.style.opacity = '0';
            banner.style.transition = 'opacity 0.4s ease';
            setTimeout(() => banner.remove(), 400);
        });
    }

    // ==========================================================
    // СЛУЧАЙНАЯ ЦИТАТА В КОНЦЕ
    // ==========================================================
    function randomQuote() {
        const quotes = [
            '"The city forgot our names. So we screamed louder."',
            '"I never wanted heaven. I just wanted someone to stay."',
            '"We\'re not trying to be heroes. We\'re just writing what hurts."',
            '"There is beauty in ruined things."'
        ];

        const ending = document.querySelector('.ending blockquote');
        if (!ending) return;

        let currentIndex = 0;
        function changeQuote() {
            let newIndex;
            do { newIndex = Math.floor(Math.random() * quotes.length); } while (newIndex === currentIndex && quotes.length > 1);
            currentIndex = newIndex;

            ending.style.opacity = '0';
            ending.style.transition = 'opacity 0.6s ease';
            setTimeout(() => {
                ending.textContent = quotes[currentIndex];
                ending.style.opacity = '1';
            }, 600);
        }

        setTimeout(changeQuote, 8000);
        setInterval(changeQuote, 14000);
    }

    // ==========================================================
    // ЭФФЕКТ ПЕЧАТАЮЩЕГОСЯ ТЕКСТА
    // ==========================================================
    function typingEffect() {
        const element = document.querySelector('.hero-description');
        if (!element) return;

        const originalText = element.textContent;
        element.textContent = '';

        let index = 0;
        let isDeleting = false;
        const speed = 80;

        function type() {
            element.textContent = originalText.substring(0, index);
            if (!isDeleting) {
                if (index < originalText.length) { index++; setTimeout(type, speed); }
                else { isDeleting = true; setTimeout(type, 3000); }
            } else {
                if (index > 0) { index--; setTimeout(type, speed / 2); }
                else { isDeleting = false; setTimeout(type, 500); }
            }
        }
        setTimeout(type, 1500);
    }

    // ==========================================================
    // ОБРАБОТКА ФОРМЫ КОНТАКТОВ
    // ==========================================================
    function contactFormHandler() {
        const form = document.querySelector('.contact-form');
        if (!form) return;

        let messageContainer = form.querySelector('.form-message');
        if (!messageContainer) {
            messageContainer = document.createElement('div');
            messageContainer.className = 'form-message';
            form.insertBefore(messageContainer, form.querySelector('button'));
        }

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = this.querySelector('input[type="text"]');
            const email = this.querySelector('input[type="email"]');
            const message = this.querySelector('textarea');
            const submitBtn = this.querySelector('button[type="submit"]');

            if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
                showFormMessage(messageContainer, 'Пожалуйста, заполните все поля.', 'error');
                return;
            }

            const originalText = submitBtn.textContent;
            submitBtn.textContent = '⏳ Отправка...';
            submitBtn.disabled = true;

            setTimeout(function () {
                showFormMessage(messageContainer, '✅ Спасибо! Мы свяжемся с вами. 🖤', 'success');
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });

        function showFormMessage(container, text, type) {
            container.textContent = text;
            container.className = `form-message ${type}`;
            container.style.display = 'block';
            setTimeout(() => { container.style.opacity = '0'; }, 4000);
            setTimeout(() => {
                container.className = 'form-message';
                container.style.display = 'none';
                container.style.opacity = '1';
            }, 4500);
        }
    }

    // ==========================================================
    // ЛАЙТБОКС ДЛЯ ГАЛЕРЕИ
    // ==========================================================
    function galleryLightbox() {
        const galleryItems = document.querySelectorAll('.gallery-item img');
        if (!galleryItems.length) return;

        let lightbox = document.querySelector('.lightbox');
        if (!lightbox) {
            lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <button class="lightbox-close" aria-label="Close">✕</button>
                <img class="lightbox-image" alt="">
                <p class="lightbox-caption"></p>
            `;
            document.body.appendChild(lightbox);

            const closeBtn = lightbox.querySelector('.lightbox-close');
            closeBtn.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
            document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

            function closeLightbox() {
                lightbox.classList.remove('open');
                document.body.style.overflow = '';
            }
            window.closeLightbox = closeLightbox;
        }

        galleryItems.forEach(img => {
            img.addEventListener('click', function () {
                lightbox.querySelector('.lightbox-image').src = this.src;
                const figCaption = this.closest('figure')?.querySelector('figcaption');
                lightbox.querySelector('.lightbox-caption').textContent = figCaption ? figCaption.textContent : this.alt;
                lightbox.classList.add('open');
                document.body.style.overflow = 'hidden';
            });
        });
    }

    // ==========================================================
    // МУЗЫКАЛЬНЫЙ ПЛЕЕР (ДЕМО)
    // ==========================================================
    function musicPlayer() {
        const albumButtons = document.querySelectorAll('.album-buttons a');
        albumButtons.forEach(btn => {
            btn.addEventListener('click', function (e) {
                const text = this.textContent.trim().toLowerCase();
                const songName = this.closest('.album')?.querySelector('h3')?.textContent || 'трек';

                if (text === 'listen') {
                    e.preventDefault();
                    showToast(`▶️ Воспроизведение "${songName}" (демо)`);
                } else if (text === 'lyrics') {
                    // Даем стандартному переходу сработать (плавный скролл)
                } else {
                    e.preventDefault();
                    showToast(`📝 Страница "${songName}" в разработке`);
                }
            });
        });

        function showToast(message) {
            let toast = document.querySelector('.toast');
            if (!toast) {
                toast = document.createElement('div');
                toast.className = 'toast';
                document.body.appendChild(toast);
            }
            toast.textContent = message;
            toast.classList.add('show');
            clearTimeout(toast._timeout);
            toast._timeout = setTimeout(() => toast.classList.remove('show'), 2500);
        }
    }

    // ==========================================================
    // МАГАЗИН (ФИЛЬТРЫ И ВЫБОР ОПЦИЙ)
    // ==========================================================
    function initMerch() {
        // Фильтры
        const filterBtns = document.querySelectorAll('.filter-btn');
        const merchCards = document.querySelectorAll('.merch-card');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const filter = this.dataset.filter;

                merchCards.forEach(card => {
                    card.style.display = (filter === 'all' || card.dataset.category === filter) ? 'block' : 'none';
                });
            });
        });

        // Выбор размера
        document.querySelectorAll('.size-selector').forEach(selector => {
            selector.querySelectorAll('.size-btn').forEach(btn => {
                btn.addEventListener('click', function () {
                    selector.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                });
            });
        });

        // Изменение количества
        document.querySelectorAll('.quantity-selector').forEach(selector => {
            const minus = selector.querySelector('.minus');
            const plus = selector.querySelector('.plus');
            const count = selector.querySelector('.qty-count');

            minus.addEventListener('click', () => {
                const val = parseInt(count.textContent);
                if (val > 1) count.textContent = val - 1;
            });

            plus.addEventListener('click', () => {
                const val = parseInt(count.textContent);
                const card = selector.closest('.merch-card');
                const stock = parseInt(card.querySelector('.stock-count').textContent);
                if (val < stock) count.textContent = val + 1;
                else showCartNotification('⚠️ Больше нет на складе');
            });
        });

        // Добавление в корзину
        document.querySelectorAll('.merch-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const card = this.closest('.merch-card');
                const name = this.getAttribute('data-item');
                const price = parseInt(this.getAttribute('data-price'));
                const size = card.querySelector('.size-btn.active')?.dataset.size || 'One Size';
                const quantity = parseInt(card.querySelector('.qty-count').textContent);
                const stockEl = card.querySelector('.stock-count');
                const stock = parseInt(stockEl.textContent);

                if (quantity > stock) {
                    showCartNotification('❌ Недостаточно товара');
                    return;
                }

                // Добавляем
                addToCart({ name, price, size, quantity });

                // Обновляем сток визуально
                const newStock = stock - quantity;
                stockEl.textContent = newStock;
                if (newStock <= 3) card.querySelector('.stock-dot').classList.add('low');
                if (newStock <= 0) {
                    card.querySelector('.stock-dot').classList.add('out');
                    this.textContent = 'Нет в наличии';
                    this.disabled = true;
                }

                // Визуальный отклик
                const originalText = this.textContent;
                this.textContent = '✅ Добавлено!';
                setTimeout(() => { if(newStock > 0) this.textContent = originalText; }, 1500);
            });
        });
    }

    // ==========================================================
    // СИСТЕМА КОРЗИНЫ
    // ==========================================================
    function initCart() {
        const overlay = document.getElementById('cartOverlay');
        const closeBtn = document.getElementById('cartClose');
        const cartToggle = document.querySelector('.cart-toggle');
        const checkoutBtn = document.getElementById('checkoutBtn');

        if (cartToggle) cartToggle.addEventListener('click', openCart);
        if (closeBtn) closeBtn.addEventListener('click', closeCart);
        if (overlay) overlay.addEventListener('click', (e) => { if (e.target === overlay) closeCart(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeCart(); });

        // Промокоды
        const promoInput = document.querySelector('.promo-input');
        const promoApply = document.querySelector('.promo-apply');
        const promoMessage = document.querySelector('.promo-message');

        if (promoApply && promoInput) {
            promoApply.addEventListener('click', function () {
                const code = promoInput.value.trim().toUpperCase();
                if (CONFIG.promoCodes[code]) {
                    discountApplied = CONFIG.promoCodes[code];
                    promoMessage.textContent = `✅ Скидка ${discountApplied}% применена!`;
                    promoMessage.style.color = '#8aaa8a';
                } else {
                    discountApplied = 0;
                    promoMessage.textContent = '❌ Неверный промокод';
                    promoMessage.style.color = '#cc6a6a';
                }
                updateCartUI();
            });
        }

        // Оформление заказа
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                if (cart.length === 0) return showCartNotification('⚠️ Корзина пуста');
                showOrderForm();
            });
        }

        updateCartUI(); // Первичная отрисовка при загрузке
    }

    function addToCart(item) {
        const existing = cart.find(i => i.name === item.name && i.size === item.size);
        if (existing) existing.quantity += item.quantity;
        else cart.push({ ...item });

        saveCart();
        updateCartUI();
        showCartNotification(`🛒 ${item.name} добавлен`);
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        saveCart();
        updateCartUI();
    }

    function saveCart() {
        localStorage.setItem('fueloil-cart', JSON.stringify(cart));
    }

    function updateCartUI() {
        const container = document.getElementById('cartItems');
        const totalEl = document.getElementById('cartTotal');
        const countEl = document.querySelector('.cart-count');
        
        if (!container || !totalEl) return;

        // Обновляем счетчик в шапке
        const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
        if (countEl) countEl.textContent = totalItems;

        if (cart.length === 0) {
            container.innerHTML = '<div class="empty-cart">Корзина пуста</div>';
            totalEl.textContent = '₽0';
            return;
        }

        let html = '';
        let total = 0;

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            html += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <span class="cart-item-name">${item.name}</span>
                        <span class="cart-item-meta">${item.size} × ${item.quantity}</span>
                    </div>
                    <div class="cart-item-price">
                        <span>${itemTotal} ₽</span>
                        <button class="cart-item-remove" data-index="${index}">✕</button>
                    </div>
                </div>
            `;
        });

        if (discountApplied > 0) {
            const discountAmount = Math.round(total * discountApplied / 100);
            total -= discountAmount;
            html += `<div class="cart-discount">Скидка ${discountApplied}%: -${discountAmount} ₽</div>`;
        }

        container.innerHTML = html;
        totalEl.textContent = `₽${total}`;

        // Вешаем события на кнопки удаления
        container.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', function () {
                removeFromCart(parseInt(this.dataset.index));
            });
        });
    }

    function openCart() {
        const overlay = document.getElementById('cartOverlay');
        if (overlay) {
            overlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeCart() {
        const overlay = document.getElementById('cartOverlay');
        if (overlay) {
            overlay.classList.remove('open');
            document.body.style.overflow = '';
        }
        // Удаляем форму заказа при закрытии, если она была
        document.querySelector('.order-form-wrapper')?.remove();
    }

    function showCartNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `<span>🛒</span><span>${message}</span>`;
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 10);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 500);
        }, 2500);
    }

    // ==========================================================
    // ФОРМА ЗАКАЗА
    // ==========================================================
    function showOrderForm() {
        const existingForm = document.querySelector('.order-form-wrapper');
        if (existingForm) existingForm.remove();

        const total = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0) * (1 - discountApplied / 100);
        
        const wrapper = document.createElement('div');
        wrapper.className = 'order-form-wrapper';
        wrapper.innerHTML = `
            <h4>Оформление заказа</h4>
            <form class="order-form">
                <input type="text" placeholder="Ваше имя" required>
                <input type="tel" placeholder="Телефон" required>
                <input type="email" placeholder="Email" required>
                <textarea placeholder="Адрес доставки" rows="2"></textarea>
                <div class="order-summary">
                    <span>К оплате:</span>
                    <span>${Math.round(total)} ₽</span>
                </div>
                <button type="submit">✅ Подтвердить</button>
            </form>
        `;

        document.querySelector('.cart-footer').appendChild(wrapper);

        wrapper.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            showCartNotification('✅ Заказ оформлен! Свяжемся с вами 🖤');
            cart = [];
            discountApplied = 0;
            saveCart();
            updateCartUI();
            setTimeout(closeCart, 1500);
        });
    }

})();