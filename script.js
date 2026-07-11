/* ============================================================
   🖤 FUELOIL — COMPLETE SCRIPT
   Russian Emo / Post-Hardcore Band Website
   ============================================================
   
   Всё в одном файле: навигация, анимации, параллакс,
   тёмная тема, плеер, галерея, форма, эффекты.
   ============================================================ */

( function() {

    'use strict';

    // ==========================================================
    // 1. ОЖИДАНИЕ ЗАГРУЗКИ DOM
    // ==========================================================

    if ( document.readyState === 'loading' ) {
        document.addEventListener( 'DOMContentLoaded', init );
    } else {
        init();
    }

    // ==========================================================
    // 2. ГЛАВНАЯ ФУНКЦИЯ ИНИЦИАЛИЗАЦИИ
    // ==========================================================

    function init() {

        console.log( '🖤 FuelOil — Emo / Post-Hardcore from Moscow' );
        console.log( '🎸 "The world doesn\'t get better. We just become louder."' );
        console.log( '📢 Current lineup: Yaroslav + Artem (looking for guitarist & bassist)' );

        // Запускаем все модули
        smoothNavigation();
        mobileMenu();
        scrollAnimations();
        parallaxHero();
        activeNavHighlight();
        scrollToTopButton();
        contactFormHandler();
        dynamicFooterYear();
        musicPlayer();
        galleryLightbox();
        typingEffect();
        progressBar();
        cookiesConsent();
        randomQuote();

    }

    // ==========================================================
    // 3. ПЛАВНАЯ НАВИГАЦИЯ
    // ==========================================================

    function smoothNavigation() {

        const links = document.querySelectorAll( 'a[href^="#"]:not([href="#"])' );

        links.forEach( link => {

            link.addEventListener( 'click', function( e ) {

                const targetId = this.getAttribute( 'href' );
                const target = document.querySelector( targetId );

                if ( target ) {

                    e.preventDefault();

                    const header = document.querySelector( 'header' );
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10;

                    window.scrollTo( {
                        top: targetPosition,
                        behavior: 'smooth'
                    } );

                    // Закрываем мобильное меню
                    closeMobileMenu();

                    // Обновляем URL без перезагрузки
                    if ( history.pushState ) {
                        history.pushState( null, null, targetId );
                    }

                }

            } );

        } );

    }

    // ==========================================================
    // 4. МОБИЛЬНОЕ МЕНЮ (ГАМБУРГЕР)
    // ==========================================================

    function mobileMenu() {

        const header = document.querySelector( 'header' );
        const nav = header ? header.querySelector( 'nav' ) : null;

        if ( !nav ) return;

        // Создаём кнопку, если её нет
        let burger = document.querySelector( '.burger-menu' );

        if ( !burger ) {

            burger = document.createElement( 'button' );
            burger.className = 'burger-menu';
            burger.setAttribute( 'aria-label', 'Toggle navigation' );
            burger.setAttribute( 'aria-expanded', 'false' );

            // Три полоски
            for ( let i = 0; i < 3; i++ ) {
                const span = document.createElement( 'span' );
                burger.appendChild( span );
            }

            header.insertBefore( burger, nav );

        }

        // Функция открытия/закрытия
        function toggleMenu() {

            const isOpen = nav.classList.contains( 'open' );

            nav.classList.toggle( 'open' );
            burger.classList.toggle( 'active' );
            burger.setAttribute( 'aria-expanded', !isOpen );
            document.body.classList.toggle( 'menu-open' );

        }

        burger.addEventListener( 'click', toggleMenu );

        // Закрываем при клике вне меню
        document.addEventListener( 'click', function( e ) {

            if ( nav.classList.contains( 'open' ) ) {

                const isInside = nav.contains( e.target ) || burger.contains( e.target );

                if ( !isInside ) {
                    closeMobileMenu();
                }

            }

        } );

        // Закрываем при нажатии Escape
        document.addEventListener( 'keydown', function( e ) {

            if ( e.key === 'Escape' && nav.classList.contains( 'open' ) ) {
                closeMobileMenu();
            }

        } );

        // Сохраняем функцию в глобальную область для использования в других модулях
        window.closeMobileMenu = function() {

            nav.classList.remove( 'open' );
            burger.classList.remove( 'active' );
            burger.setAttribute( 'aria-expanded', 'false' );
            document.body.classList.remove( 'menu-open' );

        };

    }

    // ==========================================================
    // 5. АНИМАЦИИ ПРИ СКРОЛЛЕ (Intersection Observer)
    // ==========================================================

    function scrollAnimations() {

        const elements = document.querySelectorAll( 
            '.member-card, .album, .lyrics-card, .gallery-item, ' +
            '.show, .about-container, .contact-container, .transition'
        );

        if ( !elements.length ) return;

        // Стили для анимации (добавляем через JS, чтобы не перегружать CSS)
        const style = document.createElement( 'style' );
        style.textContent = `
            .animate-on-scroll {
                opacity: 0;
                transform: translateY( 40px );
                transition: opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                            transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            .animate-on-scroll.visible {
                opacity: 1;
                transform: translateY( 0 );
            }
            /* Задержки для каскада */
            .members-grid .member-card:nth-child(2) { transition-delay: 0.08s; }
            .members-grid .member-card:nth-child(3) { transition-delay: 0.16s; }
            .members-grid .member-card:nth-child(4) { transition-delay: 0.24s; }
            .albums .album:nth-child(2) { transition-delay: 0.12s; }
            .gallery-grid .gallery-item:nth-child(2) { transition-delay: 0.05s; }
            .gallery-grid .gallery-item:nth-child(3) { transition-delay: 0.10s; }
            .gallery-grid .gallery-item:nth-child(4) { transition-delay: 0.15s; }
            .gallery-grid .gallery-item:nth-child(5) { transition-delay: 0.20s; }
            .gallery-grid .gallery-item:nth-child(6) { transition-delay: 0.25s; }
            .shows-list .show:nth-child(2) { transition-delay: 0.10s; }
        `;
        document.head.appendChild( style );

        // Добавляем класс всем элементам
        elements.forEach( el => el.classList.add( 'animate-on-scroll' ) );

        // Observer
        const observer = new IntersectionObserver( function( entries ) {

            entries.forEach( entry => {

                if ( entry.isIntersecting ) {

                    entry.target.classList.add( 'visible' );
                    observer.unobserve( entry.target );

                }

            } );

        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -30px 0px'
        } );

        elements.forEach( el => observer.observe( el ) );

        // Проверяем уже видимые элементы (при загрузке)
        setTimeout( function() {

            elements.forEach( el => {

                const rect = el.getBoundingClientRect();
                const winHeight = window.innerHeight || document.documentElement.clientHeight;

                if ( rect.top < winHeight - 60 ) {
                    el.classList.add( 'visible' );
                    observer.unobserve( el );
                }

            } );

        }, 200 );

    }

    // ==========================================================
    // 6. ПАРАЛЛАКС ДЛЯ HERO
    // ==========================================================

    function parallaxHero() {

        const hero = document.querySelector( '#hero' );

        if ( !hero ) return;

        let ticking = false;

        window.addEventListener( 'scroll', function() {

            if ( !ticking ) {

                window.requestAnimationFrame( function() {

                    const scrollY = window.pageYOffset;

                    if ( scrollY < window.innerHeight ) {

                        const offset = scrollY * 0.2;
                        hero.style.backgroundPositionY = `-${offset}px`;
                        hero.style.transform = `translateY(${scrollY * 0.05}px)`;
                        hero.style.opacity = 1 - ( scrollY / window.innerHeight ) * 0.3;

                    }

                    ticking = false;

                } );

                ticking = true;

            }

        }, { passive: true } );

    }

    // ==========================================================
    // 7. АКТИВНЫЙ ПУНКТ МЕНЮ
    // ==========================================================

    function activeNavHighlight() {

        const sections = document.querySelectorAll( 'section[id]' );
        const navLinks = document.querySelectorAll( 'header nav a' );

        if ( !sections.length || !navLinks.length ) return;

        function updateActive() {

            let currentId = '';
            const scrollPos = window.pageYOffset + 150;

            sections.forEach( section => {

                const top = section.offsetTop;
                const height = section.offsetHeight;

                if ( scrollPos >= top && scrollPos < top + height ) {
                    currentId = section.getAttribute( 'id' );
                }

            } );

            navLinks.forEach( link => {

                link.classList.remove( 'active' );
                const href = link.getAttribute( 'href' );

                if ( href === `#${currentId}` ) {
                    link.classList.add( 'active' );
                }

            } );

        }

        window.addEventListener( 'scroll', updateActive, { passive: true } );
        window.addEventListener( 'resize', updateActive, { passive: true } );
        updateActive();

    }

    // ==========================================================
    // 8. КНОПКА "НАВЕРХ"
    // ==========================================================

    function scrollToTopButton() {

        // Проверяем, есть ли уже кнопка
        let btn = document.querySelector( '.scroll-top' );

        if ( !btn ) {

            btn = document.createElement( 'button' );
            btn.className = 'scroll-top';
            btn.setAttribute( 'aria-label', 'Scroll to top' );
            btn.innerHTML = '↑';

            // Стили прямо в JS
            const style = document.createElement( 'style' );
            style.textContent = `
                .scroll-top {
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    background: rgba(20, 14, 16, 0.85);
                    border: 1px solid rgba(120, 80, 80, 0.2);
                    color: #9a8a8a;
                    font-size: 1.5rem;
                    font-weight: 300;
                    cursor: pointer;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.4s ease;
                    z-index: 999;
                    backdrop-filter: blur(10px);
                    box-shadow: 0 4px 20px rgba(0,0,0,0.4);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    line-height: 1;
                }
                .scroll-top:hover {
                    background: rgba(120, 80, 80, 0.15);
                    border-color: rgba(160, 100, 100, 0.3);
                    color: #ffffff;
                    transform: translateY(-3px);
                    box-shadow: 0 8px 30px rgba(0,0,0,0.6);
                }
                .scroll-top.visible {
                    opacity: 1;
                    visibility: visible;
                }
                @media (max-width: 480px) {
                    .scroll-top {
                        bottom: 20px;
                        right: 20px;
                        width: 42px;
                        height: 42px;
                        font-size: 1.2rem;
                    }
                }
                /* Для страниц с длинным контентом */
                .scroll-top:active {
                    transform: scale(0.92);
                }
            `;
            document.head.appendChild( style );

            document.body.appendChild( btn );

        }

        // Отображение/скрытие
        let ticking = false;

        window.addEventListener( 'scroll', function() {

            if ( !ticking ) {

                window.requestAnimationFrame( function() {

                    const scrollY = window.pageYOffset;

                    if ( scrollY > 400 ) {
                        btn.classList.add( 'visible' );
                    } else {
                        btn.classList.remove( 'visible' );
                    }

                    ticking = false;

                } );

                ticking = true;

            }

        }, { passive: true } );

        // Клик
        btn.addEventListener( 'click', function() {

            window.scrollTo( {
                top: 0,
                behavior: 'smooth'
            } );

        } );

    }

    // ==========================================================
    // 9. ФОРМА ОБРАТНОЙ СВЯЗИ
    // ==========================================================

    function contactFormHandler() {

        const form = document.querySelector( '.contact-form' );

        if ( !form ) return;

        // Создаём контейнер для сообщений
        let messageContainer = form.querySelector( '.form-message' );

        if ( !messageContainer ) {

            messageContainer = document.createElement( 'div' );
            messageContainer.className = 'form-message';
            form.insertBefore( messageContainer, form.querySelector( 'button' ) );

        }

        form.addEventListener( 'submit', function( e ) {

            e.preventDefault();

            const name = this.querySelector( 'input[type="text"]' );
            const email = this.querySelector( 'input[type="email"]' );
            const message = this.querySelector( 'textarea' );
            const submitBtn = this.querySelector( 'button[type="submit"]' );

            // Валидация
            if ( !name.value.trim() ) {
                showFormMessage( messageContainer, 'Введите ваше имя, пожалуйста.', 'error' );
                name.focus();
                return;
            }

            if ( !email.value.trim() ) {
                showFormMessage( messageContainer, 'Введите email для связи.', 'error' );
                email.focus();
                return;
            }

            if ( !isValidEmail( email.value ) ) {
                showFormMessage( messageContainer, 'Введите корректный email (например, name@domain.com).', 'error' );
                email.focus();
                return;
            }

            if ( !message.value.trim() ) {
                showFormMessage( messageContainer, 'Напишите ваше сообщение.', 'error' );
                message.focus();
                return;
            }

            // Имитация отправки
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '⏳ Отправка...';
            submitBtn.disabled = true;

            // Имитация задержки сети
            setTimeout( function() {

                // Успех!
                showFormMessage( 
                    messageContainer, 
                    '✅ Спасибо! Мы свяжемся с вами в ближайшее время. 🖤', 
                    'success' 
                );

                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;

            }, 1800 );

        } );

        // Вспомогательная функция валидации email
        function isValidEmail( email ) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test( email );
        }

        // Функция показа сообщения
        function showFormMessage( container, text, type ) {

            container.textContent = text;
            container.className = `form-message ${type}`;
            container.style.display = 'block';

            // Автоскрытие через 5 секунд
            clearTimeout( container._timeout );

            container._timeout = setTimeout( function() {

                container.style.opacity = '0';
                container.style.transition = 'opacity 0.5s ease';

                setTimeout( function() {
                    container.textContent = '';
                    container.className = 'form-message';
                    container.style.display = 'none';
                    container.style.opacity = '1';
                }, 500 );

            }, 5000 );

        }

        // Добавляем стили для сообщений
        const msgStyles = document.createElement( 'style' );
        msgStyles.textContent = `
            .form-message {
                padding: 0.8rem 1.2rem;
                border-radius: 4px;
                font-size: 0.85rem;
                text-align: center;
                margin-bottom: 0.8rem;
                display: none;
                transition: opacity 0.5s ease;
            }
            .form-message.success {
                color: #8aaa8a;
                border: 1px solid rgba(80, 160, 80, 0.15);
                background: rgba(80, 160, 80, 0.05);
            }
            .form-message.error {
                color: #cc8a8a;
                border: 1px solid rgba(200, 80, 80, 0.15);
                background: rgba(200, 80, 80, 0.05);
            }
        `;
        document.head.appendChild( msgStyles );

    }

    // ==========================================================
    // 10. ДИНАМИЧЕСКИЙ ГОД В ФУТЕРЕ
    // ==========================================================

    function dynamicFooterYear() {

        const footer = document.querySelector( 'footer small' );

        if ( footer ) {

            const year = new Date().getFullYear();
            footer.textContent = footer.textContent.replace( /\d{4}/, year );

        }

    }

    // ==========================================================
    // 11. МУЗЫКАЛЬНЫЙ ПЛЕЕР (ДЕМО)
    // ==========================================================

    function musicPlayer() {

        const albumButtons = document.querySelectorAll( '.album-buttons a' );

        albumButtons.forEach( btn => {

            btn.addEventListener( 'click', function( e ) {

                e.preventDefault();

                const text = this.textContent.trim().toLowerCase();

                if ( text === 'listen' ) {

                    // Имитация воспроизведения
                    const parent = this.closest( '.album' );
                    const title = parent ? parent.querySelector( 'h3' ) : null;
                    const songName = title ? title.textContent : 'трек';

                    showToast( `▶️ Воспроизведение "${songName}" (демо-режим)` );

                } else if ( text === 'lyrics' || text === 'info' || text === 'preview' ) {

                    const parent = this.closest( '.album' );
                    const title = parent ? parent.querySelector( 'h3' ) : null;
                    const songName = title ? title.textContent : 'трек';

                    showToast( `📝 Открывается страница "${songName}"` );

                    // Плавный скролл к разделу Lyrics
                    const lyricsSection = document.querySelector( '#lyrics' );

                    if ( lyricsSection ) {

                        setTimeout( function() {

                            const header = document.querySelector( 'header' );
                            const headerHeight = header ? header.offsetHeight : 0;
                            const targetPos = lyricsSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

                            window.scrollTo( {
                                top: targetPos,
                                behavior: 'smooth'
                            } );

                        }, 300 );

                    }

                }

            } );

        } );

        // Toast-уведомления
        function showToast( message ) {

            let toast = document.querySelector( '.toast' );

            if ( !toast ) {

                toast = document.createElement( 'div' );
                toast.className = 'toast';
                document.body.appendChild( toast );

                const styles = document.createElement( 'style' );
                styles.textContent = `
                    .toast {
                        position: fixed;
                        bottom: 90px;
                        left: 50%;
                        transform: translateX( -50% ) translateY( 20px );
                        background: rgba(20, 14, 16, 0.92);
                        border: 1px solid rgba(120, 80, 80, 0.15);
                        color: #d4c9c9;
                        padding: 0.8rem 2rem;
                        border-radius: 30px;
                        font-size: 0.8rem;
                        letter-spacing: 0.05em;
                        backdrop-filter: blur(12px);
                        opacity: 0;
                        visibility: hidden;
                        transition: all 0.4s ease;
                        z-index: 1000;
                        white-space: nowrap;
                        max-width: 90%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        pointer-events: none;
                        box-shadow: 0 8px 40px rgba(0,0,0,0.5);
                    }
                    .toast.show {
                        opacity: 1;
                        visibility: visible;
                        transform: translateX( -50% ) translateY( 0 );
                    }
                    @media (max-width: 480px) {
                        .toast {
                            font-size: 0.7rem;
                            padding: 0.6rem 1.2rem;
                            bottom: 75px;
                        }
                    }
                `;
                document.head.appendChild( styles );

            }

            toast.textContent = message;
            toast.classList.add( 'show' );

            clearTimeout( toast._timeout );

            toast._timeout = setTimeout( function() {
                toast.classList.remove( 'show' );
            }, 2500 );

        }

    }

    // ==========================================================
    // 12. ГАЛЕРЕЯ — ЛАЙТБОКС
    // ==========================================================

    function galleryLightbox() {

        const galleryItems = document.querySelectorAll( '.gallery-item img' );

        if ( !galleryItems.length ) return;

        // Создаём лайтбокс
        let lightbox = document.querySelector( '.lightbox' );

        if ( !lightbox ) {

            lightbox = document.createElement( 'div' );
            lightbox.className = 'lightbox';
            lightbox.setAttribute( 'aria-hidden', 'true' );

            const closeBtn = document.createElement( 'button' );
            closeBtn.className = 'lightbox-close';
            closeBtn.innerHTML = '✕';
            closeBtn.setAttribute( 'aria-label', 'Close lightbox' );

            const img = document.createElement( 'img' );
            img.className = 'lightbox-image';
            img.alt = '';

            const caption = document.createElement( 'p' );
            caption.className = 'lightbox-caption';

            lightbox.appendChild( closeBtn );
            lightbox.appendChild( img );
            lightbox.appendChild( caption );
            document.body.appendChild( lightbox );

            // Стили
            const styles = document.createElement( 'style' );
            styles.textContent = `
                .lightbox {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.92);
                    backdrop-filter: blur(20px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    z-index: 2000;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.4s ease;
                    padding: 2rem;
                }
                .lightbox.open {
                    opacity: 1;
                    visibility: visible;
                }
                .lightbox-image {
                    max-width: 90%;
                    max-height: 75vh;
                    object-fit: contain;
                    border-radius: 4px;
                    box-shadow: 0 20px 80px rgba(0,0,0,0.8);
                    transform: scale(0.95);
                    transition: transform 0.4s ease;
                }
                .lightbox.open .lightbox-image {
                    transform: scale(1);
                }
                .lightbox-close {
                    position: absolute;
                    top: 20px;
                    right: 30px;
                    font-size: 2rem;
                    color: #8a7a7a;
                    background: none;
                    border: none;
                    cursor: pointer;
                    transition: color 0.3s ease;
                    padding: 0.5rem;
                    line-height: 1;
                }
                .lightbox-close:hover {
                    color: #ffffff;
                }
                .lightbox-caption {
                    color: #9a8a8a;
                    margin-top: 1.5rem;
                    font-size: 0.85rem;
                    letter-spacing: 0.05em;
                    text-align: center;
                }
                @media (max-width: 480px) {
                    .lightbox-close {
                        top: 15px;
                        right: 20px;
                        font-size: 1.5rem;
                    }
                    .lightbox-image {
                        max-height: 60vh;
                    }
                }
            `;
            document.head.appendChild( styles );

            // Закрытие по клику на фон
            lightbox.addEventListener( 'click', function( e ) {

                if ( e.target === this ) {
                    closeLightbox();
                }

            } );

            // Закрытие по Escape
            document.addEventListener( 'keydown', function( e ) {

                if ( e.key === 'Escape' && lightbox.classList.contains( 'open' ) ) {
                    closeLightbox();
                }

            } );

            // Кнопка закрытия
            closeBtn.addEventListener( 'click', closeLightbox );

            // Функции
            function closeLightbox() {
                lightbox.classList.remove( 'open' );
                lightbox.setAttribute( 'aria-hidden', 'true' );
                document.body.style.overflow = '';
            }

            // Сохраняем в глобалку
            window.closeLightbox = closeLightbox;

        }

        // Открытие по клику на изображение
        galleryItems.forEach( img => {

            img.style.cursor = 'pointer';

            img.addEventListener( 'click', function() {

                const lightboxImg = lightbox.querySelector( '.lightbox-image' );
                const caption = lightbox.querySelector( '.lightbox-caption' );

                lightboxImg.src = this.src;
                lightboxImg.alt = this.alt || 'FuelOil Gallery';

                // Капшн из alt или из родительского figure
                let captionText = this.alt;

                const figure = this.closest( 'figure' );
                const figCaption = figure ? figure.querySelector( 'figcaption' ) : null;

                if ( figCaption ) {
                    captionText = figCaption.textContent;
                }

                caption.textContent = captionText || 'FuelOil';

                lightbox.classList.add( 'open' );
                lightbox.setAttribute( 'aria-hidden', 'false' );
                document.body.style.overflow = 'hidden';

            } );

        } );

    }

    // ==========================================================
    // 13. ПЕЧАТАЮЩИЙСЯ ТЕКСТ В HERO
    // ==========================================================

    function typingEffect() {

        const element = document.querySelector( '.hero-description' );

        if ( !element ) return;

        // Сохраняем оригинальный текст
        const originalText = element.textContent;

        // Заменяем содержимое на пустоту с эффектом печати
        element.textContent = '';

        let index = 0;
        let isDeleting = false;
        let speed = 80; // мс на символ

        function type() {

            const currentText = originalText.substring( 0, index );

            element.textContent = currentText;

            if ( !isDeleting ) {

                // Печатаем
                if ( index < originalText.length ) {
                    index++;
                    setTimeout( type, speed );
                } else {
                    // Пауза перед удалением
                    isDeleting = true;
                    setTimeout( type, 3000 );
                }

            } else {

                // Удаляем
                if ( index > 0 ) {
                    index--;
                    setTimeout( type, speed / 2 );
                } else {
                    isDeleting = false;
                    setTimeout( type, 500 );
                }

            }

        }

        // Запускаем через 1.5 секунды после загрузки
        setTimeout( type, 1500 );

    }

    // ==========================================================
    // 14. ПРОГРЕСС-БАР СКРОЛЛА
    // ==========================================================

    function progressBar() {

        // Создаём прогресс-бар
        let bar = document.querySelector( '.scroll-progress' );

        if ( !bar ) {

            bar = document.createElement( 'div' );
            bar.className = 'scroll-progress';
            document.body.appendChild( bar );

            const styles = document.createElement( 'style' );
            styles.textContent = `
                .scroll-progress {
                    position: fixed;
                    top: 0;
                    left: 0;
                    height: 2px;
                    background: linear-gradient(90deg, rgba(160, 80, 80, 0.6), rgba(180, 120, 120, 0.3));
                    width: 0%;
                    z-index: 1001;
                    transition: width 0.1s ease;
                    box-shadow: 0 0 20px rgba(160, 80, 80, 0.15);
                }
            `;
            document.head.appendChild( styles );

        }

        let ticking = false;

        window.addEventListener( 'scroll', function() {

            if ( !ticking ) {

                window.requestAnimationFrame( function() {

                    const scrollTop = window.pageYOffset;
                    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                    const progress = docHeight > 0 ? ( scrollTop / docHeight ) * 100 : 0;

                    bar.style.width = progress + '%';

                    ticking = false;

                } );

                ticking = true;

            }

        }, { passive: true } );

    }

    // ==========================================================
    // 15. COOKIES CONSENT (Уведомление о куках)
    // ==========================================================

    function cookiesConsent() {

        // Проверяем, согласился ли пользователь
        if ( localStorage.getItem( 'fueloil-cookies' ) === 'accepted' ) {
            return;
        }

        // Создаём баннер
        const banner = document.createElement( 'div' );
        banner.className = 'cookies-banner';

        banner.innerHTML = `
            <p>
                🍪 Мы используем cookies, чтобы сайт работал лучше.
                Продолжая использовать сайт, вы соглашаетесь с этим.
            </p>
            <button class="cookies-accept">Принять</button>
        `;

        document.body.appendChild( banner );

        // Стили
        const styles = document.createElement( 'style' );
        styles.textContent = `
            .cookies-banner {
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX( -50% );
                background: rgba(16, 12, 14, 0.95);
                border: 1px solid rgba(120, 80, 80, 0.1);
                backdrop-filter: blur(16px);
                padding: 1rem 2rem;
                border-radius: 12px;
                display: flex;
                align-items: center;
                gap: 1.5rem;
                z-index: 9999;
                max-width: 90%;
                box-shadow: 0 8px 40px rgba(0,0,0,0.6);
                flex-wrap: wrap;
                justify-content: center;
            }
            .cookies-banner p {
                font-size: 0.8rem;
                color: #9a8a8a;
                margin: 0;
                letter-spacing: 0.02em;
            }
            .cookies-accept {
                background: rgba(120, 80, 80, 0.15);
                border: 1px solid rgba(120, 80, 80, 0.2);
                color: #d4c9c9;
                padding: 0.4rem 1.8rem;
                border-radius: 30px;
                cursor: pointer;
                font-size: 0.7rem;
                text-transform: uppercase;
                letter-spacing: 0.1em;
                transition: all 0.3s ease;
                white-space: nowrap;
            }
            .cookies-accept:hover {
                background: rgba(120, 80, 80, 0.25);
                border-color: rgba(160, 100, 100, 0.3);
                color: #ffffff;
            }
            @media (max-width: 480px) {
                .cookies-banner {
                    padding: 0.8rem 1.2rem;
                    gap: 0.8rem;
                    bottom: 10px;
                }
                .cookies-banner p {
                    font-size: 0.7rem;
                    text-align: center;
                }
            }
        `;
        document.head.appendChild( styles );

        // Кнопка "Принять"
        const acceptBtn = banner.querySelector( '.cookies-accept' );

        acceptBtn.addEventListener( 'click', function() {

            localStorage.setItem( 'fueloil-cookies', 'accepted' );
            banner.style.opacity = '0';
            banner.style.transform = 'translateX(-50%) translateY(20px)';
            banner.style.transition = 'all 0.4s ease';

            setTimeout( function() {
                banner.remove();
            }, 400 );

        } );

    }

    // ==========================================================
    // 16. СЛУЧАЙНАЯ ЦИТАТА В ПОДВАЛЕ (пасхалка)
    // ==========================================================

    function randomQuote() {

        const quotes = [
            '"The city forgot our names. So we screamed louder."',
            '"I never wanted heaven. I just wanted someone to stay."',
            '"We\'re not trying to be heroes. We\'re just writing what hurts."',
            '"There is beauty in ruined things."',
            '"Sometimes the only way to be heard is to break the silence."',
            '"Every scar tells a story. We\'re just sharing ours."',
            '"The world doesn\'t get better. We just become louder."'
        ];

        // Проверяем, есть ли блок .ending
        const ending = document.querySelector( '.ending blockquote' );

        if ( ending ) {

            // Меняем цитату каждые 12 секунд (если пользователь не взаимодействует)
            let currentIndex = 0;

            function changeQuote() {

                // Выбираем случайную, но не ту же самую
                let newIndex;

                do {
                    newIndex = Math.floor( Math.random() * quotes.length );
                } while ( newIndex === currentIndex && quotes.length > 1 );

                currentIndex = newIndex;

                ending.style.opacity = '0';
                ending.style.transition = 'opacity 0.6s ease';

                setTimeout( function() {
                    ending.textContent = quotes[ currentIndex ];
                    ending.style.opacity = '1';
                }, 600 );

            }

            // Первая смена через 8 секунд
            setTimeout( changeQuote, 8000 );

            // И дальше каждые 14 секунд
            setInterval( changeQuote, 14000 );

        }

    }

    // ==========================================================
    // 17. ЗАЩИТА ОТ ОШИБОК — Fallback для старых браузеров
    // ==========================================================

    // Полифилл для requestAnimationFrame (если вдруг)
    if ( !window.requestAnimationFrame ) {

        window.requestAnimationFrame = function( callback ) {

            return window.setTimeout( function() {
                callback( Date.now() );
            }, 1000 / 60 );

        };

    }

    // Полифилл для IntersectionObserver (если совсем старый браузер)
    if ( !window.IntersectionObserver ) {

        console.warn( '⚠️ IntersectionObserver не поддерживается. Анимации будут работать частично.' );

        // Просто показываем все элементы
        document.addEventListener( 'DOMContentLoaded', function() {

            const elements = document.querySelectorAll( '.animate-on-scroll' );

            elements.forEach( function( el ) {
                el.classList.add( 'visible' );
            } );

        } );

    }

    console.log( '✅ FuelOil script fully loaded.' );
    console.log( '🖤 Stay loud. Stay broken. Stay real.' );

} )();