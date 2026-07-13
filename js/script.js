/**
 * 株式会社須田製版 採用サイト TOP
 * 1) SPドロワーメニュー
 * 2) ページ内スムーススクロール
 * 3) 全画面モーダル
 * ※768px以上はPCデザイン(1600px)を等倍表示(縮小フィットは廃止)
 */
(function () {
  'use strict';

  var BREAKPOINT_SP = 768;

  /* ---------- 1) SPドロワーメニュー ---------- */
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

  /* ---------- 2) スムーススクロール ---------- */
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

  /* ---------- 3) 全画面モーダル ---------- */
  // サブディレクトリのページから読み込まれても images/ を解決できるよう、
  // このスクリプト自身の src からサイトルートを求めて画像パスを絶対化する
  var scriptEl = document.currentScript || (function () {
    var scripts = document.querySelectorAll('script[src*="script.js"]');
    return scripts[scripts.length - 1];
  })();
  var SITE_ROOT = scriptEl ? scriptEl.src.replace(/js\/script\.js(?:\?.*)?$/, '') : '';

  var MODAL_DATA = {
    modalMiura:   { src: SITE_ROOT + 'images/photoMiura.jpg',  alt: '社員写真',                       caption: '営業' },
    modalKojima:  { src: SITE_ROOT + 'images/photoKojima.jpg', alt: '社員写真',                       caption: '営業' },
    modalTakada:  { src: SITE_ROOT + 'images/photoTakada.jpg', alt: '社員写真',                       caption: '営業 課長補佐' },
    modalIrie:    { src: SITE_ROOT + 'images/photoIrie.jpg',   alt: '社員写真',                       caption: '制作 次長' },
    modalChida:   { src: SITE_ROOT + 'images/photoChida.jpg',  alt: '社員写真',                       caption: '制作 課長補佐' }
  };

  /* Work process 各部門の紹介モーダル(917x588カンプの座標は style.css 側で指定)
     interviewAnchor は interview/index.html 内の各カテゴリのid */
  var WORK_MODAL_DATA = {
    modalEigyo: {
      className: 'workModalEigyo',
      num: '01',
      name: '営業',
      illust: SITE_ROOT + 'images/workModalEigyo.svg',
      illustSp: SITE_ROOT + 'images/workModalEigyoSp.png',
      alt: '営業部門のオフィスのイラスト',
      desc: 'お客様のニーズを丁寧にヒアリングし、<br>目的を正確に捉え、媒体や仕様の提案をします。<br>モノづくりのプロとして案件の指揮をとり、<br>社内外を繋ぐ役割を果たします。<br>既製品ではなくオーダーメイドでのモノづくりを通して<br>ご要望に応えます。',
      buttons: [
        { label: '社員インタビュー', interviewAnchor: 'iwEigyo' },
        { label: '営業白書', href: '#' } /* ページ未作成のためリンク先未定 */
      ]
    },
    modalSeisaku: {
      className: 'workModalSeisaku',
      num: '02',
      name: '制作',
      illust: SITE_ROOT + 'images/workModalSeisaku.svg',
      illustSp: SITE_ROOT + 'images/workModalSeisakuSp.png',
      alt: '制作部門のオフィスのイラスト',
      desc: 'クライアントのニーズをもとに、<br>企画・デザイン・Web・動画・校正など、<br>それぞれの専門分野でモノづくりに関わります。<br>各々が専門性を活かし、<br>どうすればニーズに応えられかを考えてカタチにし、<br>営業をサポートします。',
      buttons: [
        { label: '社員インタビュー', interviewAnchor: 'iwSeisaku' }
      ]
    },
    modalInsatsu: {
      className: 'workModalInsatsu',
      num: '03',
      name: '印刷',
      illust: SITE_ROOT + 'images/workModalInsatsu.svg',
      illustSp: SITE_ROOT + 'images/workModalInsatsuSp.png',
      alt: '印刷工場のイラスト',
      desc: '輪転印刷機や枚葉印刷機等を操作して<br>各種印刷物(チラシ、雑誌、パンフレット、ポスター等)<br>を印刷します。<br>紙のセット・色調整・印刷物の積上げや<br>運搬・印刷機械のメンテナンス等、仕上がりや品質を確認しながら<br>製品の製造をします。',
      buttons: [
        { label: '社員インタビュー', interviewAnchor: 'iwInsatsu' }
      ]
    },
    modalKako: {
      className: 'workModalKako',
      num: '04',
      name: '加工・物流',
      illust: SITE_ROOT + 'images/workModalKako.svg',
      illustSp: SITE_ROOT + 'images/workModalKakoSp.png',
      alt: '加工・物流部門の工場のイラスト',
      desc: '印刷された製品に対して、<br>断裁・製本・折加工など仕様に合わせて<br>様々な加工をスピーディーに行います。<br>加工が完了した製品は仕分けや梱包を施して発送します。<br>また、ケースの組み立てや丁合作業などの<br>内職作業も社内で実施可能です。',
      buttons: [
        { label: '社員インタビュー', interviewAnchor: 'iwInsatsu' } /* 加工・物流のカテゴリは未掲載のため印刷カテゴリへ */
      ]
    },
    modalSoumu: {
      className: 'workModalSoumu',
      num: '',
      name: '総務',
      illust: SITE_ROOT + 'images/workModalSoumu.png',
      illustSp: SITE_ROOT + 'images/workModalSoumuSp.png',
      alt: '総務部門のオフィスのイラスト',
      desc: '経理・財務・人事・総務など、会社全体を支える部署です。<br>支払いや入金の管理、採用、入退社、労務管理など、<br>法令や会社の規則を遵守し、間違いのない業務を行います。<br>社員が安心して働ける環境づくりや成長を支援します。',
      buttons: [
        { label: '社員インタビュー', interviewAnchor: 'iwSoumu' }
      ]
    }
  };

  var CHEVRON_SVG = '<svg class="workModalBtnChevron" viewBox="0 0 9 18" width="9" height="18" aria-hidden="true"><polyline points="0.6,17.2 8.2,9 0.6,0.8" fill="none" stroke="#fff" stroke-width="1.2"/></svg>';

  var modal = document.getElementById('siteModal');
  var modalFigure = modal ? modal.querySelector('.modalBody') : null;
  var modalImage = document.getElementById('siteModalImage');
  var modalCaption = document.getElementById('siteModalCaption');
  var workModalBody = document.getElementById('workModalBody');
  var workModalPanel = document.getElementById('workModalPanel');
  var isInterviewListPage = document.body.classList.contains('interviewListPage');
  var lastFocused = null;

  /* 社員インタビューボタンのリンク先を現在ページに合わせて解決する */
  function interviewHref(anchor) {
    if (isInterviewListPage) return anchor ? '#' + anchor : '#';
    return SITE_ROOT + 'interview/index.html' + (anchor ? '#' + anchor : '');
  }

  function buildWorkModal(key) {
    var d = WORK_MODAL_DATA[key];
    var html = '';

    html += '<button type="button" class="workModalClose" aria-label="閉じる" data-modal-close></button>';
    /* SPはラベル入り・イラスト部分だけを切り出したPNGに差し替える */
    html += '<picture class="workModalIllustWrap">' +
      '<source media="(max-width: 767px)" srcset="' + d.illustSp + '">' +
      '<img class="workModalIllust" src="' + d.illust + '" alt="' + d.alt + '">' +
      '</picture>';
    html += '<h2 class="workModalTitle" id="workModalTitle">' +
      (d.num ? '<span class="workModalNum">' + d.num + '</span>' : '') +
      '<span class="workModalName">' + d.name + '</span></h2>';
    html += '<p class="workModalDesc">' + d.desc + '</p>';
    html += '<ul class="workModalBtnList">';
    d.buttons.forEach(function (btn) {
      var href = 'href' in btn ? btn.href : interviewHref(btn.interviewAnchor);
      html += '<li><a class="workModalBtn" href="' + href + '">' + CHEVRON_SVG + '<span>' + btn.label + '</span></a></li>';
    });
    html += '</ul>';

    workModalPanel.className = 'workModalPanel ' + d.className;
    workModalPanel.innerHTML = html;

    /* 生成したリンクの挙動:同一ページ内アンカーはモーダルを閉じてスクロール、
       href="#"(リンク先未定)は何もしない */
    workModalPanel.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        var targetId = link.getAttribute('href');
        if (targetId === '#') return;
        var targetElement = document.querySelector(targetId);
        closeModal();
        if (targetElement) targetElement.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  /* 917x588 のパネルをビューポートに収まるよう縮小(768px以上のみ。SPはCSSで縦積み) */
  function fitWorkModal() {
    if (!workModalPanel || workModalBody.hidden) return;
    var vw = document.documentElement.clientWidth;
    var vh = document.documentElement.clientHeight;
    if (vw >= BREAKPOINT_SP) {
      var scale = Math.min(1, (vw - 56) / 917, (vh - 56) / 588);
      workModalPanel.style.transform = 'scale(' + scale + ')';
    } else {
      workModalPanel.style.transform = '';
    }
  }

  function openModal(key) {
    if (!modal) return;

    if (WORK_MODAL_DATA[key]) {
      buildWorkModal(key);
      modalFigure.hidden = true;
      workModalBody.hidden = false;
      modal.setAttribute('aria-labelledby', 'workModalTitle');
      fitWorkModal();
    } else {
      var d = MODAL_DATA[key];
      if (!d) return;
      modalImage.src = d.src;
      modalImage.alt = d.alt;
      modalCaption.textContent = d.caption;
      modalFigure.hidden = false;
      workModalBody.hidden = true;
      modal.setAttribute('aria-labelledby', 'siteModalCaption');
    }

    modal.classList.add('isOpen');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('isModalOpen');
    lastFocused = document.activeElement;
    var closeBtn = modal.querySelector(workModalBody.hidden ? '.modalClose' : '.workModalClose');
    if (closeBtn) closeBtn.focus();
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

  /* 閉じるボタンはモーダル内容と一緒に生成されるためデリゲーションで拾う */
  if (modal) {
    modal.addEventListener('click', function (event) {
      if (event.target.closest('[data-modal-close]')) closeModal();
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeModal();
  });

  window.addEventListener('resize', fitWorkModal);
})();
