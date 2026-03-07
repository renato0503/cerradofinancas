document.addEventListener('DOMContentLoaded', () => {
  // 1. Menu Mobile e Sticky Header
  const header = document.querySelector('header'); // Alterado de getElementById para querySelector pois geralmente usamos a tag header
  const mobileToggle = document.querySelector('.mobile-toggle');
  const desktopMenu = document.querySelector('.desktop-menu');
  const menuLinks = document.querySelectorAll('.desktop-menu a');

  // Efeito de Header ao rolar a página
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Lógica para abrir/fechar menu mobile
  if (mobileToggle && desktopMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation(); // Evita que o clique feche imediatamente
      desktopMenu.classList.toggle('active');
    });

    // Fecha o menu ao clicar em qualquer link
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        desktopMenu.classList.remove('active');
      });
    });

    // Fecha o menu se clicar em qualquer lugar fora dele
    document.addEventListener('click', (e) => {
      if (!desktopMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        desktopMenu.classList.remove('active');
      }
    });
  }

  // 2. Animações de Fade-Up (Aparecer ao rolar a tela)
  const fadeElements = document.querySelectorAll('.fade-up');
  
  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Anima apenas uma vez
      }
    });
  }, {
    root: null,
    threshold: 0.1, 
    rootMargin: "0px 0px -50px 0px"
  });

  fadeElements.forEach(el => fadeObserver.observe(el));

  // 3. Sistema de FAQ (Accordion)
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    if (question && answer) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Fecha todos antes de abrir o novo
        faqItems.forEach(faq => {
          faq.classList.remove('active');
          const faqAnswer = faq.querySelector('.faq-answer');
          if(faqAnswer) {
            faqAnswer.style.maxHeight = null;
          }
        });
        
        // Abre o item clicado se ele não estava ativo
        if (!isActive) {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + "px";
        }
      });
    }
  });
});