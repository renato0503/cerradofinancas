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
