// Mostra só o slide pedido em ?s=N (usado pelo tools/exportar.py).
// Sem o parâmetro, todos os slides aparecem empilhados para revisão no navegador.
(function () {
  var n = parseInt(new URLSearchParams(location.search).get('s'), 10);
  var slides = document.querySelectorAll('.slide');
  var total = slides.length;
  slides.forEach(function (el, i) {
    var pag = el.querySelector('[data-pagina]');
    if (pag) pag.textContent = (i + 1) + '/' + total;
    if (n && i + 1 !== n) el.style.display = 'none';
  });
  if (n) document.documentElement.classList.add('exportando');
})();

// ?check=1 (usado por tools/verificar.py): mede se o conteúdo do slide invade o rodapé
// (carrossel) ou sai da área segura de 250px no topo/base (story) e escreve o resultado no título.
(function () {
  var p = new URLSearchParams(location.search);
  if (!p.get('check')) return;
  window.addEventListener('load', function () {
    setTimeout(function () {
      var slide = Array.prototype.filter.call(document.querySelectorAll('.slide'), function (s) { return s.style.display !== 'none'; })[0];
      var base = slide.getBoundingClientRect();
      var story = slide.classList.contains('story');
      var limite = story ? base.top + slide.offsetHeight - 250 : (slide.querySelector('.rodape') ? slide.querySelector('.rodape').getBoundingClientRect().top - 12 : base.bottom);
      var pior = 0, culpado = '';
      slide.querySelectorAll('*').forEach(function (el) {
        // data-sangra: elemento decorativo que corta na borda de propósito
        if (el.closest('.rodape') || el.closest('[data-sangra]') || el.children.length) return;
        var r = el.getBoundingClientRect();
        if (!r.height) return;
        var excesso = r.bottom - limite;
        if (story && base.top + 240 - r.top > excesso) excesso = base.top + 240 - r.top;
        if (r.right > base.right - 40) excesso = Math.max(excesso, r.right - (base.right - 40));
        // palavra longa que vaza do próprio bloco (ex.: título grande demais)
        if (el.scrollWidth > el.clientWidth + 2 && el.clientWidth) excesso = Math.max(excesso, el.scrollWidth - el.clientWidth);
        if (excesso > pior) { pior = excesso; culpado = (el.textContent || el.className || el.tagName).trim().slice(0, 40); }
      });
      document.title = pior > 0 ? 'ESTOURO ' + Math.round(pior) + 'px: ' + culpado : 'OK';
    }, 1500);
  });
})();
