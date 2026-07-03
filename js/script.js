/**
 * 株式会社須田製版 採用サイト TOP
 * 1) 768〜1599px:PCデザイン(1600px)を等倍縮小してフィット
 * 2) SPドロワーメニュー
 * 3) ページ内スムーススクロール
 */
(function () {
  'use strict';

  var DESIGN_WIDTH = 1600;
  var BREAKPOINT_SP = 768;

  var page = document.querySelector('.page');
  var scaler = document.querySelector('.pageScaler');

  /* ---------- 1) 縮小フィット(768〜1599px) ---------- */
  function fitPage() {
    var vw = document.documentElement.clientWidth;

    if (vw >= BREAKPOINT_SP && vw < DESIGN_WIDTH) {
      var scale = vw / DESIGN_WIDTH;
      page.style.transform = 'scale(' + scale + ')';
      page.style.transformOrigin = 'top left';
      scaler.style.height = page.offsetHeight * scale + 'px';
    } else {
      page.style.transform = '';
      page.style.transformOrigin = '';
      scaler.style.height = '';
    }
  }

  window.addEventListener('resize', fitPage);
  window.addEventListener('orientationchange', fitPage);
  window.addEventListener('load', fitPage);
  fitPage();

  /* ---------- 2) SPドロワーメニュー ---------- */
  var menuBtn = document.querySelector('.spMenuBtn');

  function setDrawer(open) {
    document.body.classList.toggle('isDrawerOpen', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  }

  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      setDrawer(!document.body.classList.contains('isDrawerOpen'));
    });
  }

  /* ---------- 3) スムーススクロール ---------- */
  // transform縮小中はレイアウト座標と表示座標がズレるため、
  // 常に getBoundingClientRect ベース(scrollIntoView)でスクロールする
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    if (link.hasAttribute('data-modal')) return; // モーダルトリガーは除外
    link.addEventListener('click', function (event) {
      var targetId = link.getAttribute('href');

      // href="#"(リンク先未定)はスクロールさせない
      if (targetId === '#') {
        event.preventDefault();
        return;
      }

      var targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      event.preventDefault();
      setDrawer(false); // ドロワーから遷移した場合は閉じる
      targetElement.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ---------- 4) 全画面画像モーダル ---------- */
  var MODAL_DATA = {
    modalEigyo:   { src: 'images/workEigyo.png',   alt: '営業部門のイラスト拡大図',       caption: '01 営業' },
    modalSeisaku: { src: 'images/workSeisaku.png', alt: '制作部門のイラスト拡大図',       caption: '02 制作' },
    modalInsatsu: { src: 'images/workInsatsu.png', alt: '印刷部門のイラスト拡大図',       caption: '03 印刷' },
    modalKako:    { src: 'images/workKako.png',    alt: '加工・物流部門のイラスト拡大図', caption: '04 加工・物流' },
    modalSoumu:   { src: 'images/workSoumu.png',   alt: '総務部門のイラスト拡大図',       caption: '総務' },
    modalDekita:  { src: 'images/workDekita.png',  alt: 'できたものが並ぶショールームのイラスト拡大図', caption: 'できたもの' },
    modalMiura:   { src: 'images/photoMiura.jpg',  alt: '社員写真',                       caption: '営業' },
    modalKojima:  { src: 'images/photoKojima.jpg', alt: '社員写真',                       caption: '営業' },
    modalTakada:  { src: 'images/photoTakada.jpg', alt: '社員写真',                       caption: '営業 課長補佐' },
    modalIrie:    { src: 'images/photoIrie.jpg',   alt: '社員写真',                       caption: '制作 次長' },
    modalChida:   { src: 'images/photoChida.jpg',  alt: '社員写真',                       caption: '制作 課長補佐' }
  };

  var modal = document.getElementById('siteModal');
  var modalImage = document.getElementById('siteModalImage');
  var modalCaption = document.getElementById('siteModalCaption');
  var lastFocused = null;

  function openModal(key) {
    var d = MODAL_DATA[key];
    if (!d || !modal) return;
    modalImage.src = d.src;
    modalImage.alt = d.alt;
    modalCaption.textContent = d.caption;
    modal.classList.add('isOpen');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('isModalOpen');
    lastFocused = document.activeElement;
    modal.querySelector('.modalClose').focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('isOpen');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('isModalOpen');
    if (lastFocused) lastFocused.focus();
  }

  document.querySelectorAll('[data-modal]').forEach(function (trigger) {
    trigger.addEventListener('click', function (event) {
      event.preventDefault();
      openModal(trigger.getAttribute('data-modal'));
    });
  });

  document.querySelectorAll('[data-modal-close]').forEach(function (el) {
    el.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeModal();
  });
})();
