document.addEventListener("DOMContentLoaded", function () {

  /* ======================================================== */
  /* === Логика Мобильного Меню (Без Затемнения) === */
  /* ======================================================== */
  
  const navMenu = document.getElementById("nav-menu");
  const navToggle = document.getElementById("nav-toggle");
  const navClose = document.getElementById("nav-close");
  const navLinks = document.querySelectorAll(".nav-link");

  // Функция ОТКРЫТИЯ меню
  function openMenu() {
    // 1. Показываем панель меню
    navMenu.classList.add("show-menu");
    // 2. Блокируем скролл страницы
    document.body.classList.add('no-scroll');
    
    /* БЛОК С scrim УДАЛЕН 
    */
  }

  // Функция ЗАКРЫТИЯ меню
  function closeMenu() {
    // 1. Прячем панель меню
    navMenu.classList.remove("show-menu");
    // 2. Снимаем блок скролла
    document.body.classList.remove('no-scroll');
    
    /* БЛОК С scrim УДАЛЕН 
    */
  }

  // Назначаем события
  if (navToggle) {
    navToggle.addEventListener("click", openMenu);
  }

  if (navClose) {
    navClose.addEventListener("click", closeMenu);
  }

  // Закрываем меню по клику на любую ссылку
  navLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
  });
  /* --- КОНЕЦ ЛОГИКИ МЕНЮ --- */


  /* --- Анимация шапки при скролле --- */
  const header = document.getElementById("header");
  if (header) {
    window.addEventListener("scroll", () => {
      // Если прокрутили больше чем на 50px, добавляем класс
      if (window.scrollY > 50) {
        header.classList.add("header-scrolled");
      } else {
        header.classList.remove("header-scrolled");
      }
    });
  }


  /* --- Логика Cчетчика (Таймер) --- */
  const durationElement = document.getElementById("loveDuration");
  const todayDateEl = document.getElementById("todayDate");

  const startDate = new Date(window.LOVE_START || "2024-10-17T21:51:00+05:00");
  const hearts = ["💖","💘","💝","💞","❤️‍🔥"];

  function getWordForm(number, one, few, many) {
    number = Math.abs(Number(number)) || 0;
    if (number % 10 === 1 && number % 100 !== 11) return one;
    if (number % 10 >= 2 && number % 10 <= 4 && (number % 100 < 10 || number % 100 >= 20)) return few;
    return many;
  }

  function formatDateNice(d) {
    const months = ["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  }

  function calculateDuration() {
    // Если мы не на главной странице, эта функция не должна ничего делать
    if (!durationElement || !todayDateEl) return;

    const now = new Date();
    const diff = now - startDate;
    if (diff < 0) {
      durationElement.textContent = "Ещё не началось 💫";
      todayDateEl.textContent = `Сегодня: ${formatDateNice(now)}`;
      return;
    }

    const totalMinutes = Math.floor(diff / (1000 * 60));
    const totalDays = Math.floor(totalMinutes / (60 * 24));
    const years = Math.floor(totalDays / 365);
    const days = totalDays % 365;
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
    const minutes = totalMinutes % 60;

    durationElement.innerHTML = `${years} ${getWordForm(years, "год", "года", "лет")}, ${days} ${getWordForm(days, "день", "дня", "дней")}, ${hours} ${getWordForm(hours, "час", "часа", "часов")} и ${minutes} ${getWordForm(minutes, "минута", "минуты", "минут")} <span class="heart-icon">❤️‍🔥</span>`;

    todayDateEl.textContent = `Сегодня: ${formatDateNice(now)}`;
  }

  // Синхронизируем обновление с началом следующей минуты
  // Запускаем только если элементы счетчика существуют
  if (durationElement && todayDateEl) {
    calculateDuration();
    const now = new Date();
    const msToNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
    setTimeout(() => {
      calculateDuration();
      setInterval(calculateDuration, 60 * 1000);
    }, msToNextMinute);
  }


  /* --- Падающие сердечки --- */
  function createHeart() {
    const el = document.createElement("div");
    el.className = "heart";
    el.textContent = hearts[Math.floor(Math.random() * hearts.length)];

    const size = Math.random() * 18 + 12; // px
    el.style.fontSize = size + "px";

    const windowW = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const maxLeft = Math.max(8, windowW - (size * 1.4)); 
    const left = Math.random() * maxLeft;
    el.style.left = `${left}px`;

    const dur = (Math.random() * 3 + 3).toFixed(2) + "s";
    el.style.setProperty("--dur", dur);

    document.body.appendChild(el);
    // удаляем после окончания
    setTimeout(() => el.remove(), parseFloat(dur) * 1000 + 300);
  }

  // Запускаем сердечки на всех страницах
  setInterval(createHeart, 900);
});