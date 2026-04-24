(function() {
  /* ══════════════════════════════════════════════════════════════
     sch-combined.js v1.0.1 — Scholarships page injection.
     ----
     v1.0.1 (2026-04-24): Hero "Watch Winner Stories" button —
       added click handler that smooth-scrolls to #winners with an
       80px offset (fixed nav height). Native href="#winners" was
       landing the section top under the nav, making the click
       appear broken.
     ----
     Mirrors Donate / Pulse Summit / Mentorship Guide pattern: hide
     Webflow native chrome (this page ships its own nav + footer
     inside #sch-root, then re-parents them to body-level), inject the
     full Scholarships HTML/CSS/JS into a scoped #sch-root.
     Source:   /Website Folder/Scholarship Page/scholarships-concept.html
     Target:   Webflow /scholarships page, id 69b02f65f0068e9fb16f0af0
     Form:     Preview stub — shows "Thank you!" banner on validated submit.
               Real Retool wiring TBD (Google Forms bridge or direct webhook).
     ══════════════════════════════════════════════════════════════ */

  if (document.getElementById('sch-root')) return;

  function cancelBodyAnimations() {
    if (document.body && document.body.getAnimations) {
      document.body.getAnimations().forEach(function(a) { a.cancel(); });
    }
    if (document.body) document.body.style.setProperty('opacity', '1', 'important');
  }
  cancelBodyAnimations();
  document.addEventListener('DOMContentLoaded', cancelBodyAnimations);
  window.addEventListener('load', cancelBodyAnimations);
  setTimeout(cancelBodyAnimations, 100);
  setTimeout(cancelBodyAnimations, 500);
  setTimeout(cancelBodyAnimations, 1500);

  (function ensureFonts() {
    if (document.querySelector('link[data-sch-fonts]')) return;
    var pc1 = document.createElement('link');
    pc1.rel = 'preconnect'; pc1.href = 'https://fonts.googleapis.com';
    pc1.setAttribute('data-sch-fonts', '1');
    document.head.appendChild(pc1);
    var pc2 = document.createElement('link');
    pc2.rel = 'preconnect'; pc2.href = 'https://fonts.gstatic.com';
    pc2.crossOrigin = 'anonymous';
    pc2.setAttribute('data-sch-fonts', '1');
    document.head.appendChild(pc2);
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap';
    l.setAttribute('data-sch-fonts', '1');
    document.head.appendChild(l);
  })();

  var style = document.createElement('style');
  style.setAttribute('data-sch-css', '1');
  style.textContent = "/* ─── Hide Webflow native chrome while Scholarships page is sch-active ─── */\nbody.sch-active { background: #fff; margin: 0; padding: 0; opacity: 1 !important; overflow-x: hidden; }\nbody.sch-active > .header-wrapper,\nbody.sch-active > .page-wrapper { display: none !important; }\nhtml.sch-active { scroll-behavior: smooth; }\n\n\n/* ======================================================================\n   Pulse of Perseverance — Scholarship Page (Concept)\n   Design language mirrors Homepage, For Students, For Mentors, Partner,\n   and Pulse Summit pages. All styles scoped under #sch-root so this file\n   can be dropped into Webflow via the same loader pattern used for\n   mg-combined.js / ps-combined.js.\n   ====================================================================== */\n:root { color-scheme: light; }\n\n#sch-root {\n  --sch-c: #D93A3A;            /* Brand crimson */\n  --sch-c-dark: #b82e2e;\n  --sch-c-deep: #801f1f;\n  --sch-maroon-1: #3a0c18;\n  --sch-maroon-2: #4a1020;\n  --sch-maroon-3: #2a0e16;\n  --sch-ink: #1a1a1a;\n  --sch-text: #2b2b2b;\n  --sch-mid: #555;\n  --sch-muted: #777;\n  --sch-light: #999;\n  --sch-line: #ececec;\n  --sch-line-soft: #f2f2f2;\n  --sch-bg: #fff;\n  --sch-bg-cream: #fbf7f4;\n  --sch-bg-soft: #faf7f6;\n  --sch-shadow-sm: 0 2px 8px rgba(20, 10, 15, 0.05);\n  --sch-shadow-md: 0 10px 28px rgba(20, 10, 15, 0.08);\n  --sch-shadow-lg: 0 22px 52px rgba(20, 10, 15, 0.14);\n  --sch-radius-sm: 10px;\n  --sch-radius-md: 14px;\n  --sch-radius-lg: 20px;\n  --sch-radius-pill: 100px;\n  --sch-header-h: 587px;        /* Apr 23 R7f: Bumped 550→587 to match FS's RENDERED hero height\n                                   (FS uses min-height: 550 but content naturally pushes it to 587\n                                   on /for-students). 587 locks concept to the same visual proportion\n                                   even though our hero copy is shorter than FS's. */\n  --sch-header-h-tab: 500px;\n  --sch-header-h-mob: 440px;\n  --sch-nav-h: 82px;\n  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;\n  color: #1a1a1a;                /* Matches FS #fm-root base color */\n  line-height: 1.6;              /* Matches FS base line-height */\n  background: var(--sch-bg);\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n/* Reset-ish for concept file (when injected into Webflow the body inherits its own reset) */\n#sch-root, #sch-root * {\n  box-sizing: border-box;\n}\n#sch-root a { color: inherit; text-decoration: none; }\n#sch-root img { max-width: 100%; display: block; }\n#sch-root button { font-family: inherit; }\n#sch-root h1, #sch-root h2, #sch-root h3, #sch-root h4 {\n  font-family: 'Space Grotesk', 'Inter', sans-serif;\n  color: var(--sch-ink);\n  margin: 0;\n  line-height: 1.15;\n  letter-spacing: -0.01em;\n}\n#sch-root p { margin: 0; line-height: 1.65; }\n\nbody { margin: 0; background: var(--sch-bg); }\n\n/* R8b (Apr 24, 2026): Webflow's base stylesheet applies `strong { color: #0e0e0e }` and\n   `label { text-transform: uppercase }` site-wide. On /scholarships these bleed into our\n   injected content — hero lede `<strong>` renders near-black on the dark maroon bg, and\n   the `.app-check` <label> (plus its <span> child) renders ALL CAPS. Forcing inherit on\n   strong and text-transform:none on the form check label blocks the bleed-through. */\n#sch-root strong { color: inherit; }\n#sch-root .app-check, #sch-root .app-check span { text-transform: none !important; letter-spacing: normal !important; }\n\n/* ============ NAV + MOBILE MENU + OVERLAY ============\n   Apr 23, 2026 (R7e): transplanted VERBATIM from JS Files - Live Pages/fs-combined.js\n   (lines 218-242, 267-270). Every selector, every token, every value matches what ships\n   on the live /for-students page. Scoped with #sch-root on rules that would otherwise\n   lose specificity to page-global resets (`#sch-root a { color: inherit }`,\n   `#sch-root img { max-width: 100% }`, etc.). Element class names updated to match FS\n   exactly: .pp-mob-menu (was .p3-hamburger), .pp-mob-overlay (was .p3-mobile-overlay),\n   .pp-mob-overlay-link / .pp-mob-overlay-cta on overlay children, #hamburger + #pp-mob-overlay\n   IDs so the FS JS selector pattern works. DO NOT refactor these rules toward a \"prettier\"\n   shape — any drift reintroduces the nav/overlay parity bugs R7b/R7c/R7d were chasing. */\n/* LIVE-PAGE OVERRIDES (not in fs-combined.js source, but applied at runtime on the live\n   FS page by Webflow's base stylesheet + other injected scripts; without these the\n   concept drifts 32px on desktop link x, 8px on CTA height, etc.):\n     - gap: 32px on .p3-nav               → links sit at x=841 (else x=873, flush to CTA)\n     - line-height: 30px on nav links+CTA → CTA h=50 (else h=42, inherited 1.6 too tight)\n     - line-height: 30px on nav links     → matches FS rendered 30px line-height\n   The body-inherited `line-height: 1.6` from the concept's #sch-root base is what forces\n   these explicit line-heights; FS's Webflow base uses 1.333 which happens to render 30px\n   on the nav at its size stack. */\n.p3-nav { position: fixed; top: 0; left: 0; right: 0; height: auto; padding: 16px 40px; display: flex; align-items: center; justify-content: space-between; gap: 32px; background: transparent; transition: background 0.3s, box-shadow 0.3s, backdrop-filter 0.3s; z-index: 1000; }\n.p3-nav.scrolled { background: rgba(26, 26, 26, 0.95) !important; backdrop-filter: blur(20px) !important; box-shadow: 0 2px 20px rgba(0,0,0,0.15); }\n.p3-nav-logo { text-decoration: none; z-index: 10; display: flex; align-items: center; }\n.p3-nav-logo-img { height: 36px; max-height: 36px; display: block; }\n.p3-nav-links { display: flex; align-items: center; gap: 32px; margin-left: auto; }\n.p3-nav-links a { font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 500; line-height: 30px; color: rgba(255,255,255,0.85); text-decoration: none; transition: color 0.2s; }\n/* Active page link: NOT bold, matches other links exactly */\n.p3-nav-links a.w--current, .p3-nav-links a.p3-nav-link.w--current { color: rgba(255,255,255,0.85) !important; font-weight: 500 !important; }\n.p3-nav.scrolled .p3-nav-links a.w--current { color: rgba(255,255,255,0.85) !important; font-weight: 500 !important; }\n.pp-home-desktop-hide { display: none; }\n.p3-nav-cta { background: #D93A3A; color: #fff !important; padding: 10px 24px; border-radius: 50px; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600; line-height: 30px; text-decoration: none; transition: background 0.2s, transform 0.2s; margin-left: 0; display: inline-flex; align-items: center; }\n.p3-nav-cta:hover { background: #b52f2f; transform: translateY(-1px); }\n\n/* ═══ MOBILE MENU ═══\n   LIVE-PAGE OVERRIDES: FS live hamb measures 40×34 (probe Apr 23), but fs-combined.js CSS\n   has no explicit width/height — the box gets size from Webflow container padding at runtime.\n   Here we size the box explicitly (width/height + justify/align center) to force the same\n   40×34 rendered footprint; without this the concept hamb measured 24×18 (just the bars). */\n.pp-mob-menu { display: none; flex-direction: column; justify-content: center; align-items: center; gap: 5px; cursor: pointer; width: 40px; height: 34px; z-index: 1001; }\n.pp-mob-menu span { width: 24px; height: 2.5px; background: #fff; border-radius: 2px; transition: all 0.3s; }\n.pp-mob-menu.open span:nth-child(1) { transform: rotate(45deg) translate(8px, 8px); }\n.pp-mob-menu.open span:nth-child(2) { opacity: 0; }\n.pp-mob-menu.open span:nth-child(3) { transform: rotate(-45deg) translate(7px, -7px); }\n.pp-mob-overlay { position: fixed; inset: 0; background-color: rgba(26, 10, 16, 0.97); z-index: 999; display: none; flex-direction: column; justify-content: center; align-items: center; gap: 28px; opacity: 0; transform: translateY(-100%); transition: opacity 0.3s, transform 0.3s; overflow-y: auto; }\n.pp-mob-overlay.open { display: flex !important; opacity: 1; transform: translateY(0); }\n/* LIVE-PAGE OVERRIDE: line-height 26.672px. FS live renders links at h=27 (lh 26.672)\n   because the Webflow base inherits ~1.333 line-height. The concept inherits 1.6 from\n   #sch-root's body reset, which would push lh to 32 and the whole overlay stack 30px\n   taller. Explicit 26.672 matches FS pixel-for-pixel. */\n.pp-mob-overlay-link, .pp-mob-overlay-cta { font-family: 'Inter', sans-serif; font-size: 1.25rem; font-weight: 500; line-height: 26.672px; color: #fff; opacity: 0.85; text-decoration: none; transition: color 0.2s; }\n.pp-mob-overlay-link.w--current { opacity: 0.85 !important; font-weight: 500 !important; }\n.pp-mob-overlay-cta { opacity: 1; background: #D93A3A; color: #fff; padding: 12px 32px; border-radius: 100px; display: inline-block; text-align: center; margin-top: 8px; font-size: 1rem; font-weight: 600; }\n\n@media (max-width: 991px) {\n  .pp-mob-menu { display: flex; }\n  .p3-nav-links, .p3-nav-cta { display: none !important; }\n  .p3-nav { padding: 16px !important; height: 64px !important; gap: 0 !important; }\n  /* R8 (Apr 24): FS mobile logo renders img=116×36 (natural size) inside an anchor wrapper\n     that's only 30px tall — the image INTENTIONALLY overflows the anchor by 6px. My earlier\n     R7f fix wrongly constrained the img to 30px which made it visibly smaller than FS.\n     Correct: img stays 36px (its natural height), anchor gets height:30px so the nav box\n     height math still works. */\n  .p3-nav .p3-nav-logo-img { height: 36px !important; max-height: 36px !important; }\n  /* R8: display:block (not flex) on anchor so the 36px img sits at the anchor's top edge and\n     overflows DOWN 6px (matching FS where img y=17 + h=36 extends past the 30px anchor).\n     Previous flex+align-center centered the img vertically → img y=14 (3px too high). */\n  .p3-nav .p3-nav-logo { height: 30px !important; display: block !important; overflow: visible; }\n}\n\n/* ============================= HERO ============================= */\n.sch-hero {\n  position: relative;\n  min-height: var(--sch-header-h);\n  /* Matches FS exactly: .fm-hero { padding: 100px 0 40px; min-height:550px }.\n     Horizontal padding lives on .sch-hero-inner (like FS's .fm-container) so the\n     content sits where FS content sits at every viewport width. */\n  padding: 100px 0 40px;\n  background: linear-gradient(135deg, var(--sch-maroon-1) 0%, var(--sch-maroon-2) 40%, var(--sch-maroon-3) 100%);\n  color: #fff;\n  overflow: hidden;\n  display: flex;\n  align-items: flex-start;\n}\n.sch-hero::after {\n  /* Red radial glow over photo side — matches FS aesthetic; compensating for darker image */\n  content: '';\n  position: absolute;\n  inset: 0;\n  background: radial-gradient(ellipse at 72% 50%, rgba(217,58,58,0.22) 0%, rgba(217,58,58,0.08) 35%, transparent 65%);\n  pointer-events: none;\n  z-index: 1;\n}\n.sch-hero-watermark {\n  /* FS geometry (right -5%, 55% wide, masked) — opacity bumped to 0.48 because the graduation\n     photo is significantly darker than the FS portrait; brightness filter lifts the highlights\n     so the image reads through the maroon gradient the way it does on FS. */\n  position: absolute;\n  right: -5%;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 55%;\n  height: 110%;\n  object-fit: cover;\n  opacity: 0.48;\n  -webkit-mask-image: linear-gradient(to left, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%);\n  mask-image: linear-gradient(to left, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%);\n  filter: grayscale(25%) brightness(1.1) contrast(1.02);\n  pointer-events: none;\n  z-index: 0;\n}\n.sch-hero-inner {\n  /* Matches FS .fm-container { max-width: 1180px; margin: 0 auto; padding: 0 24px }\n     — horizontal padding lives here, not on .sch-hero, so content sits exactly\n     where FS content sits at every viewport. */\n  position: relative;\n  z-index: 2;\n  max-width: 1180px;\n  margin: 0 auto;\n  width: 100%;\n  padding: 0 24px;\n}\n/* Matches FS .fm-hero-content { max-width: 560px } */\n.sch-hero-copy { max-width: 560px; }\n\n.section-tag {\n  /* Matches FS .fm-section-label: padding 4/12, bg rgba(.08), Satoshi→Inter fallback, 0.65rem / 600 / 0.08em / upper */\n  display: inline-flex;\n  align-items: center;\n  padding: 4px 12px;\n  border-radius: var(--sch-radius-pill);\n  background: rgba(217, 58, 58, 0.08);\n  border: 1px solid rgba(217, 58, 58, 0.16);\n  color: var(--sch-c);\n  font-family: 'Inter', sans-serif;\n  font-size: 0.72rem;\n  font-weight: 600;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  margin-bottom: 12px;\n}\n.section-tag.tag-light { /* retained for backwards compat — same pill as default now */ }\n\n#sch-root .sch-hero h1 {\n  /* Matches FS .fm-hero h1 AS RENDERED on the live page (fs-combined.js source says\n     1.15 but Webflow base rounds up to 1.2 → 50×1.2 = 60px line-height). Using 1.2\n     matches the live visual exactly (probe Apr 23). */\n  font-family: 'Space Grotesk', sans-serif;\n  font-weight: 700;\n  font-size: clamp(2.1rem, 4.4vw, 3.125rem); /* 50px max */\n  color: #fff;\n  line-height: 1.2;\n  letter-spacing: -0.02em;\n  margin-bottom: 16px;\n  text-shadow: 0 2px 16px rgba(10,6,10,0.45);\n}\n#sch-root .sch-hero h1 .accent { color: var(--sch-c); }\n/* Responsive line-break helpers — mirror FS .fm-h1-br-dt / .fm-h1-br-mob.\n   Desktop breaks into 4 lines; mobile flattens dt-breaks into spaces and\n   inserts a single break before the second sentence. */\n.sch-h1-br-dt { display: inline; }\n.sch-h1-br-mob { display: none; }\n@media (max-width: 768px) {\n  .sch-h1-br-dt { display: none; }\n  .sch-h1-br-mob { display: inline; }\n}\n#sch-root .sch-hero .lede {\n  /* Matches FS .fm-hero p: 1rem / rgba(.65) / line-height 1.7 / mb 28px.\n     Must be prefixed with #sch-root to beat the #sch-root p { margin: 0 } reset (1,0,1 vs 0,2,0). */\n  font-size: 1rem;\n  color: rgba(255,255,255,0.65);\n  line-height: 1.7;\n  margin-bottom: 28px;\n  max-width: 560px;\n}\n.sch-hero-buttons {\n  /* Matches FS .fm-hero-buttons exactly: no margin-bottom.\n     The 32px gap between buttons and stats comes from .sch-hero-stats margin-top: 32px,\n     not from margin-bottom here — mirroring FS spacing model exactly. */\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n.btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 14px 28px;\n  border-radius: var(--sch-radius-pill);\n  font-family: 'Inter', sans-serif;\n  font-weight: 600;\n  font-size: 14px;\n  line-height: 1;\n  text-transform: none !important;\n  cursor: pointer;\n  transition: all .24s ease;\n  border: 2px solid transparent;\n  white-space: nowrap;\n}\n.btn-primary {\n  background: var(--sch-c);\n  color: #fff;\n  border-color: var(--sch-c);\n  box-shadow: 0 6px 18px rgba(217, 58, 58, 0.30);\n}\n.btn-primary:hover { background: var(--sch-c-dark); border-color: var(--sch-c-dark); transform: translateY(-1px); box-shadow: 0 10px 26px rgba(217, 58, 58, 0.38); }\n.btn-outline-white {\n  background: transparent;\n  color: #fff;\n  border: 2px solid rgba(255,255,255,0.32);\n}\n.btn-outline-white:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.6); }\n.btn-ghost {\n  background: transparent;\n  color: var(--sch-c);\n  border: 2px solid rgba(217,58,58,0.28);\n}\n.btn-ghost:hover { background: rgba(217,58,58,0.06); border-color: var(--sch-c); }\n.btn .arrow { transition: transform .24s; }\n.btn:hover .arrow { transform: translateX(3px); }\n\n.sch-hero-stats {\n  /* Matches FS .fm-hero-stats: gap 32, margin-top 32, padding-top 24, border-top rgba(.12) */\n  display: flex;\n  gap: 32px;\n  margin-top: 32px;\n  padding-top: 24px;\n  border-top: 1px solid rgba(255,255,255,0.12);\n  max-width: 560px;\n  flex-wrap: wrap;\n}\n/* Hero stat num/label — Apr 23, 2026 (R7f): transplanted VERBATIM from fs-combined.js\n   (lines 72-73). No line-height override on num (inherits 1.6 from body so stats block\n   is ~36px tall per row, matching FS's 35.84 rendered). No letter-spacing, no uppercase,\n   no font-weight on label (inherits 400 — FS labels render at weight 400 \"Registered Users\"\n   not 500 \"REGISTERED USERS\"). The prior concept overrides were adding ~14px of tightness\n   to the stats section which made the hero 37px shorter than FS. */\n.sch-hero-stat-num { font-family: 'Space Grotesk', sans-serif; font-size: 1.4rem; font-weight: 700; color: #fff; }\n.sch-hero-stat-label { font-size: 0.72rem; color: rgba(255,255,255,0.5); margin-top: 2px; }\n\n@media (max-width: 960px) {\n  /* Matches FS middle-breakpoint treatment */\n  #sch-root .sch-hero-watermark { width: 70%; opacity: 0.4; }\n  #sch-root .sch-hero h1 { font-size: 2.4rem; }\n}\n@media (max-width: 768px) {\n  /* Apr 24 R8d: REVERTED R7f's forced 690px min-height back to `auto` (matches FS\n     exactly). Forcing 690 rendered the hero ~100px too tall on phones wider than 390\n     (Pixel 7, modern Androids, iPhone Pro Max) because FS lets the hero size to\n     content on mobile. At 412px width FS hero = 591 (content-driven), but forced\n     690 over-shoots by 99px. Let the content drive. */\n  .sch-hero { padding: 120px 0 48px; min-height: auto; }\n  .sch-hero-inner { padding: 0 28px; }\n  /* #sch-root prefix needed — otherwise #sch-root img { display: block } (1,0,1) beats us */\n  #sch-root .sch-hero-watermark { display: none !important; }\n  #sch-root .sch-hero h1 { font-size: 1.75rem; }\n  .sch-hero .lede { font-size: 1rem; max-width: 100%; }\n  .sch-hero-stats { gap: 20px; justify-content: center; margin-top: 28px; }\n  .sch-hero-copy { text-align: center; margin: 0 auto; max-width: 100%; }\n  /* Matches FS mobile stacked buttons */\n  .sch-hero-buttons { flex-direction: column; gap: 12px; justify-content: center; }\n  .sch-hero-buttons .btn { width: 100%; justify-content: center; padding: 14px 32px; font-size: 14px; }\n  .sch-hero-stat-num { font-size: 1.6rem; }\n}\n@media (max-width: 440px) {\n  #sch-root .sch-hero h1 { font-size: 1.75rem; }\n  .sch-hero-stat-num { font-size: 1.4rem; }\n}\n\n/* ========================= GENERIC SECTION SHELL ========================= */\n/* FS uses .fm-section { padding: 48px 0 }; matched here with horizontal padding preserved. */\n.sch-section {\n  padding: 48px 40px;\n}\n.sch-section.tight { padding: 36px 40px; }\n.sch-section.soft { background: var(--sch-bg-cream); }\n.sch-section.dark {\n  background: linear-gradient(135deg, var(--sch-maroon-1) 0%, var(--sch-maroon-2) 40%, var(--sch-maroon-3) 100%);\n  color: #fff;\n}\n.sch-container { max-width: 1180px; margin: 0 auto; }\n.sch-section-head {\n  text-align: center;\n  max-width: 760px;\n  margin: 0 auto 32px;\n}\n#sch-root .sch-section-head h2 {\n  /* FS .fm-section-heading: 2.4rem / 700 / mb 16px.\n     IMPORTANT: `#sch-root` prefix is required — otherwise the global reset\n     `#sch-root h2 { margin: 0 }` (1,0,1) beats `.sch-section-head h2` (0,2,1)\n     and the 16px gap between heading and subheader disappears. */\n  font-size: clamp(1.8rem, 3vw, 2.4rem);\n  font-weight: 700;\n  margin-bottom: 16px;\n  line-height: 1.15;\n}\n#sch-root .sch-section-head h2 .accent { color: var(--sch-c); }\n.sch-section-head .eyebrow { margin: 0 auto 12px; } /* FS label mb: 12px */\n#sch-root .sch-section-head p {\n  /* FS .fm-section-sub: 1.05rem / #555 / max-width 640 / line-height 1.7 / centered */\n  color: #555;\n  font-size: 1.05rem;\n  line-height: 1.7;\n  max-width: 640px;\n  margin-left: auto !important;\n  margin-right: auto !important;\n  text-align: center !important;\n}\n#sch-root .sch-section-head h2,\n#sch-root .sch-section-head .eyebrow { text-align: center; }\n#sch-root .sch-section.dark .sch-section-head h2 { color: #fff; }\n#sch-root .sch-section.dark .sch-section-head p { color: rgba(255,255,255,0.7); }\n#sch-root .sch-section.dark .section-tag { background: rgba(255,255,255,0.10); color: rgba(255,255,255,0.82); border-color: rgba(255,255,255,0.14); }\n\n@media (max-width: 768px) {\n  .sch-section { padding: 36px 20px; }\n  .sch-section.tight { padding: 28px 20px; }\n  .sch-section-head { margin-bottom: 24px; }\n  .sch-section-head h2 { font-size: clamp(1.5rem, 5.2vw, 1.9rem); }\n  #sch-root .sch-section-head p { font-size: 0.95rem; line-height: 1.6; }\n}\n@media (max-width: 480px) {\n  .sch-section { padding: 32px 16px; }\n  .sch-section.tight { padding: 24px 16px; }\n}\n\n/* ========================= HOW IT WORKS (3 steps) ========================= */\n.hiw-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n  position: relative;\n}\n.hiw-card {\n  background: #fff;\n  border: 1px solid var(--sch-line);\n  border-radius: var(--sch-radius-lg);\n  padding: 32px 28px 28px;\n  position: relative;\n  transition: border-color .25s, transform .25s, box-shadow .25s;\n  overflow: hidden;\n}\n.hiw-card:hover {\n  border-color: rgba(217,58,58,0.25);\n  transform: translateY(-4px);\n  box-shadow: var(--sch-shadow-md);\n}\n.hiw-step {\n  position: absolute;\n  top: 22px; right: 26px;\n  font-family: 'Space Grotesk', sans-serif;\n  font-size: 3.2rem;\n  font-weight: 700;\n  color: rgba(217, 58, 58, 0.08);\n  line-height: 1;\n}\n.hiw-icon {\n  width: 54px; height: 54px;\n  border-radius: 14px;\n  background: linear-gradient(135deg, rgba(217,58,58,0.12), rgba(217,58,58,0.04));\n  display: flex; align-items: center; justify-content: center;\n  color: var(--sch-c);\n  margin-bottom: 22px;\n}\n.hiw-icon svg { width: 26px; height: 26px; }\n.hiw-card h3 {\n  /* Harmonized with FS card heading tokens (Space Grotesk, 700) */\n  font-size: 1.2rem;\n  font-weight: 700;\n  margin-bottom: 10px;\n}\n.hiw-card p {\n  /* Harmonized with FS .fm-feature-text p (0.9rem / #555 / 1.6) */\n  color: #555;\n  font-size: 0.92rem;\n  line-height: 1.65;\n}\n@media (max-width: 900px) { .hiw-grid { grid-template-columns: 1fr; } }\n/* Mobile: center icon + text inside each How It Works card */\n@media (max-width: 768px) {\n  .hiw-card { text-align: center; padding: 28px 24px 24px; }\n  .hiw-icon { margin-left: auto; margin-right: auto; }\n  .hiw-step { top: 16px; right: 18px; font-size: 2.6rem; }\n}\n\n/* ========================= WHO CAN APPLY ========================= */\n.wca-wrap {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 40px;\n  align-items: start;\n}\n.wca-audience {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n  margin-bottom: 28px;\n}\n.wca-aud-card {\n  padding: 24px 22px;\n  border-radius: var(--sch-radius-md);\n  background: #fff;\n  border: 1px solid var(--sch-line);\n}\n.wca-aud-card h4 {\n  font-size: 1.04rem;\n  font-weight: 600;\n  margin-bottom: 8px;\n}\n.wca-aud-card p { font-size: 0.9rem; color: var(--sch-mid); }\n\n.wca-criteria {\n  background: #fff;\n  border: 1px solid var(--sch-line);\n  border-radius: var(--sch-radius-lg);\n  padding: 36px 36px 32px;\n}\n.wca-criteria h3 {\n  font-size: 1.18rem;\n  font-weight: 600;\n  margin-bottom: 6px;\n}\n.wca-criteria .sub {\n  font-size: 0.88rem;\n  color: var(--sch-muted);\n  margin-bottom: 20px;\n}\n.wca-crit-list { list-style: none; margin: 0; padding: 0; }\n.wca-crit-list li {\n  position: relative;\n  padding: 12px 0 12px 36px;\n  border-bottom: 1px solid var(--sch-line-soft);\n  font-size: 0.94rem;\n  color: var(--sch-text);\n  line-height: 1.55;\n}\n.wca-crit-list li:last-child { border-bottom: none; padding-bottom: 2px; }\n.wca-crit-list li::before {\n  content: counter(wca-c);\n  counter-increment: wca-c;\n  position: absolute;\n  left: 0; top: 10px;\n  width: 24px; height: 24px;\n  border-radius: 50%;\n  background: rgba(217,58,58,0.10);\n  color: var(--sch-c);\n  font-weight: 700;\n  font-size: 0.78rem;\n  font-family: 'Space Grotesk', sans-serif;\n  display: flex; align-items: center; justify-content: center;\n}\n.wca-crit-list { counter-reset: wca-c; }\n.wca-crit-list li a { color: var(--sch-c); font-weight: 500; }\n.wca-crit-list li a:hover { text-decoration: underline; }\n.wca-deadline {\n  margin-top: 20px;\n  padding: 14px 18px;\n  background: linear-gradient(135deg, rgba(217,58,58,0.08), rgba(217,58,58,0.03));\n  border-left: 3px solid var(--sch-c);\n  border-radius: 0 10px 10px 0;\n  font-size: 0.92rem;\n  color: var(--sch-ink);\n}\n.wca-deadline strong { color: var(--sch-c); font-weight: 700; }\n\n@media (max-width: 900px) {\n  .wca-wrap { grid-template-columns: 1fr; gap: 28px; }\n  .wca-audience { grid-template-columns: 1fr 1fr; gap: 12px; }\n  .wca-aud-card { padding: 18px 16px; }\n  .wca-aud-card h4 { font-size: 0.98rem; }\n  .wca-aud-card p { font-size: 0.82rem; }\n  .wca-criteria { padding: 24px 22px 22px; }\n  .wca-criteria h3 { font-size: 1.08rem; }\n  .wca-crit-list li { padding: 10px 0 10px 32px; font-size: 0.88rem; }\n}\n@media (max-width: 480px) {\n  .wca-audience { grid-template-columns: 1fr; }\n}\n\n/* ========================= WINNER SPOTLIGHT (YouTube grid) ========================= */\n.spot-filters {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n  justify-content: center;\n  margin-bottom: 36px;\n}\n.spot-chip {\n  padding: 8px 16px;\n  border-radius: var(--sch-radius-pill);\n  background: #fff;\n  border: 1px solid var(--sch-line);\n  color: var(--sch-mid);\n  font-size: 0.82rem;\n  font-weight: 600;\n  letter-spacing: 0.02em;\n  cursor: pointer;\n  transition: all .2s;\n  font-family: 'Inter', sans-serif;\n}\n.spot-chip:hover { border-color: var(--sch-c); color: var(--sch-c); }\n.spot-chip.active {\n  background: var(--sch-c);\n  border-color: var(--sch-c);\n  color: #fff;\n}\n\n.spot-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n}\n.spot-card {\n  background: #fff;\n  border-radius: var(--sch-radius-md);\n  overflow: hidden;\n  border: 1px solid var(--sch-line);\n  transition: transform .25s, box-shadow .25s, border-color .25s;\n  display: flex;\n  flex-direction: column;\n}\n.spot-card:hover {\n  transform: translateY(-4px);\n  box-shadow: var(--sch-shadow-md);\n  border-color: rgba(217,58,58,0.2);\n}\n.spot-thumb {\n  position: relative;\n  aspect-ratio: 16 / 9;\n  background: #1a0a12;\n  cursor: pointer;\n  overflow: hidden;\n}\n.spot-thumb img {\n  width: 100%; height: 100%;\n  object-fit: cover;\n  display: block;\n  transition: transform .4s ease;\n}\n.spot-card:hover .spot-thumb img { transform: scale(1.05); }\n.spot-play {\n  position: absolute;\n  top: 50%; left: 50%;\n  transform: translate(-50%, -50%);\n  width: 56px; height: 56px;\n  border-radius: 50%;\n  background: rgba(217, 58, 58, 0.94);\n  color: #fff;\n  display: flex; align-items: center; justify-content: center;\n  box-shadow: 0 6px 22px rgba(0,0,0,0.4);\n  transition: transform .2s, background .2s;\n}\n.spot-card:hover .spot-play { transform: translate(-50%, -50%) scale(1.08); background: var(--sch-c); }\n.spot-play svg { width: 22px; height: 22px; margin-left: 3px; }\n.spot-meta {\n  padding: 16px 20px 18px;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.spot-date {\n  font-size: 0.72rem;\n  font-weight: 600;\n  color: var(--sch-c);\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n.spot-name {\n  font-family: 'Space Grotesk', sans-serif;\n  font-size: 1.08rem;\n  font-weight: 600;\n  color: var(--sch-ink);\n  letter-spacing: -0.005em;\n}\n.spot-school {\n  font-size: 0.84rem;\n  color: var(--sch-muted);\n  margin-top: auto;\n  padding-top: 6px;\n  line-height: 1.5;\n}\n.spot-embed-wrap {\n  position: absolute;\n  inset: 0;\n  background: #000;\n}\n.spot-embed-wrap iframe {\n  width: 100%; height: 100%;\n  border: 0;\n}\n\n/* Lightbox */\n.spot-lightbox {\n  position: fixed;\n  inset: 0;\n  z-index: 2000;\n  background: rgba(10, 5, 8, 0.92);\n  backdrop-filter: blur(8px);\n  display: none;\n  align-items: center;\n  justify-content: center;\n  padding: 32px 20px;\n}\n.spot-lightbox.open { display: flex; }\n.spot-lightbox-inner {\n  width: 100%;\n  max-width: 1040px;\n  aspect-ratio: 16 / 9;\n  background: #000;\n  border-radius: 12px;\n  overflow: hidden;\n  position: relative;\n}\n.spot-lightbox-inner iframe { width: 100%; height: 100%; border: 0; }\n.spot-lightbox-close {\n  position: absolute;\n  top: -48px; right: 0;\n  background: none; border: none;\n  color: #fff;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 600;\n  display: flex; align-items: center; gap: 6px;\n  letter-spacing: 0.02em;\n  font-family: 'Inter', sans-serif;\n  opacity: 0.85;\n}\n.spot-lightbox-close:hover { opacity: 1; }\n\n@media (max-width: 900px) { .spot-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; } }\n/* Mobile \"All years\": hide the 9th card so we stay on a clean 2x4 (=8) grid */\n@media (max-width: 768px) {\n  .spot-grid.all-years .spot-card:nth-child(n+9) { display: none; }\n}\n@media (max-width: 600px) {\n  /* 2x2 on mobile so thumbnails stay readable without scrolling a tall single column */\n  .spot-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }\n  .spot-meta { padding: 12px 14px 14px; }\n  .spot-name { font-size: 0.98rem; }\n  .spot-school { font-size: 0.76rem; }\n  .spot-date { font-size: 0.66rem; }\n  .spot-play { width: 42px; height: 42px; }\n  .spot-play svg { width: 16px; height: 16px; margin-left: 2px; }\n}\n@media (max-width: 380px) {\n  .spot-grid { gap: 10px; }\n  .spot-meta { padding: 10px 12px 12px; }\n  .spot-name { font-size: 0.9rem; }\n}\n\n/* ========================= ALL PAST WINNERS ========================= */\n/* Soft watermark sits behind the content; section must clip + relative */\n.sch-section.soft#all-winners {\n  position: relative;\n  overflow: hidden;\n}\n.sch-section.soft#all-winners .sch-container { position: relative; z-index: 2; }\n.pastw-watermark {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  object-position: center;\n  opacity: 0.18;\n  filter: saturate(0.85) contrast(1.04);\n  pointer-events: none;\n  z-index: 0;\n  -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 55%, rgba(0,0,0,0.65) 100%);\n  mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 55%, rgba(0,0,0,0.65) 100%);\n}\n\n.pastw-wrap {\n  display: grid;\n  grid-template-columns: 220px 1fr;\n  gap: 32px;\n  align-items: stretch; /* sidebar matches list height */\n}\n.pastw-side {\n  padding: 22px;\n  background: rgba(255,255,255,0.55);\n  border: 1px solid rgba(255,255,255,0.4);\n  border-radius: var(--sch-radius-md);\n  backdrop-filter: blur(10px) saturate(1.1);\n  -webkit-backdrop-filter: blur(10px) saturate(1.1);\n  display: flex;\n  flex-direction: column;\n  overflow-y: auto;\n  max-height: 100%;\n}\n.pastw-side .label {\n  font-size: 0.72rem;\n  font-weight: 700;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n  color: var(--sch-muted);\n  margin-bottom: 10px;\n}\n.pastw-year-btn {\n  display: block;\n  width: 100%;\n  text-align: left;\n  padding: 10px 14px;\n  border-radius: 8px;\n  background: none;\n  border: none;\n  color: var(--sch-mid);\n  font-size: 0.95rem;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all .18s;\n  font-family: 'Inter', sans-serif;\n}\n.pastw-year-btn:hover { background: rgba(217,58,58,0.05); color: var(--sch-c); }\n.pastw-year-btn.active {\n  background: rgba(217,58,58,0.1);\n  color: var(--sch-c);\n  font-weight: 700;\n}\n.pastw-year-btn .count {\n  float: right;\n  font-size: 0.78rem;\n  color: var(--sch-light);\n  font-weight: 500;\n}\n.pastw-year-btn.active .count { color: var(--sch-c); }\n\n.pastw-list {\n  background: rgba(255,255,255,0.55);\n  border: 1px solid rgba(255,255,255,0.4);\n  border-radius: var(--sch-radius-md);\n  backdrop-filter: blur(10px) saturate(1.1);\n  -webkit-backdrop-filter: blur(10px) saturate(1.1);\n  overflow: hidden;\n}\n.pastw-row {\n  display: grid;\n  grid-template-columns: 116px 1fr auto;\n  gap: 20px;\n  align-items: center;\n  padding: 11px 22px;\n  border-bottom: 1px solid var(--sch-line-soft);\n  transition: background .18s;\n}\n.pastw-row:last-child { border-bottom: none; }\n.pastw-row:hover { background: rgba(255, 255, 255, 0.35); }\n.pastw-row .when {\n  font-family: 'Space Grotesk', sans-serif;\n  font-size: 0.86rem;\n  font-weight: 600;\n  color: var(--sch-muted);\n  letter-spacing: 0.01em;\n}\n.pastw-row .who h4 {\n  font-family: 'Space Grotesk', sans-serif;\n  font-size: 0.98rem;\n  font-weight: 600;\n  color: var(--sch-ink);\n  margin-bottom: 0;\n}\n\n/* Pagination for past winners */\n.pastw-pager {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n  padding: 16px 22px;\n  border-top: 1px solid rgba(0,0,0,0.06);\n  background: rgba(250,247,246,0.7);\n  flex-wrap: wrap;\n}\n.pastw-pager-info {\n  font-size: 0.82rem;\n  color: var(--sch-muted);\n}\n.pastw-pager-info strong { color: var(--sch-ink); font-weight: 600; }\n.pastw-pager-ctrls {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.pastw-pg-btn {\n  min-width: 32px;\n  height: 32px;\n  padding: 0 10px;\n  border-radius: 8px;\n  border: 1px solid transparent;\n  background: transparent;\n  color: var(--sch-text);\n  font-family: 'Inter', sans-serif;\n  font-size: 0.85rem;\n  font-weight: 500;\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: background .18s, border-color .18s, color .18s;\n}\n.pastw-pg-btn:hover:not([disabled]) {\n  background: rgba(217, 58, 58, 0.08);\n  color: var(--sch-c);\n}\n.pastw-pg-btn.active {\n  background: var(--sch-c);\n  color: #fff;\n  border-color: var(--sch-c);\n}\n.pastw-pg-btn[disabled] {\n  opacity: 0.3;\n  cursor: not-allowed;\n}\n.pastw-pg-ellipsis {\n  padding: 0 6px;\n  color: var(--sch-light);\n  font-size: 0.85rem;\n}\n.pastw-row a.watch {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  color: var(--sch-c);\n  font-size: 0.82rem;\n  font-weight: 600;\n  padding: 6px 12px;\n  border-radius: var(--sch-radius-pill);\n  border: 1px solid rgba(217,58,58,0.22);\n  transition: all .2s;\n  white-space: nowrap;\n}\n.pastw-row a.watch:hover {\n  background: var(--sch-c);\n  color: #fff;\n  border-color: var(--sch-c);\n}\n.pastw-row .no-video {\n  font-size: 0.76rem;\n  color: var(--sch-light);\n  font-style: italic;\n}\n.pastw-empty {\n  padding: 48px;\n  text-align: center;\n  color: var(--sch-muted);\n}\n\n@media (max-width: 900px) {\n  .pastw-wrap { grid-template-columns: 1fr; gap: 16px; }\n  /* Sidebar becomes a clean bubble-button row — styled like .spot-chip on Recent Winners above.\n     No card background (transparent), label hidden, chips center-justified. */\n  .pastw-side {\n    position: static;\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: center;\n    gap: 8px;\n    padding: 0;\n    background: transparent;\n    border: none;\n    backdrop-filter: none;\n    -webkit-backdrop-filter: none;\n    box-shadow: none;\n  }\n  .pastw-side .label { display: none; }\n  .pastw-year-btn {\n    /* Mirror .spot-chip exactly */\n    width: auto;\n    padding: 8px 16px;\n    border-radius: var(--sch-radius-pill);\n    background: #fff;\n    border: 1px solid var(--sch-line);\n    color: var(--sch-mid);\n    font-size: 0.82rem;\n    font-weight: 600;\n    letter-spacing: 0.02em;\n    font-family: 'Inter', sans-serif;\n    transition: all .2s;\n  }\n  .pastw-year-btn:hover { border-color: var(--sch-c); color: var(--sch-c); background: #fff; }\n  .pastw-year-btn.active {\n    background: var(--sch-c);\n    border-color: var(--sch-c);\n    color: #fff;\n  }\n  .pastw-year-btn .count { float: none; margin-left: 6px; color: inherit; opacity: 0.75; }\n  .pastw-year-btn.active .count { color: #fff; opacity: 0.9; }\n  .pastw-row {\n    grid-template-columns: 1fr auto;\n    grid-template-areas: \"when watch\" \"who watch\";\n    gap: 4px 12px;\n    padding: 14px 16px;\n    align-items: center;\n  }\n  .pastw-row .when { grid-area: when; }\n  .pastw-row .who { grid-area: who; }\n  .pastw-row a.watch, .pastw-row .no-video {\n    grid-area: watch;\n    align-self: center;\n  }\n  .pastw-row .when { font-size: 0.72rem; }\n  .pastw-row .who h4 { font-size: 0.94rem; line-height: 1.3; }\n  .pastw-row a.watch { padding: 7px 12px; font-size: 0.72rem; }\n  .pastw-pager { padding: 12px 16px; flex-wrap: wrap; gap: 8px; }\n  .pastw-pager-info { font-size: 0.76rem; }\n  .pastw-pager-ctrls { margin-left: auto; gap: 4px; }\n  .pastw-pg-btn { min-width: 28px; height: 28px; padding: 0 8px; font-size: 0.78rem; }\n}\n@media (max-width: 768px) {\n  /* Mobile: remove the year filter entirely per R7 feedback. List shows all years. */\n  #sch-root .pastw-side { display: none !important; }\n  #sch-root .pastw-wrap { grid-template-columns: 1fr !important; }\n}\n@media (max-width: 480px) {\n  .pastw-side { padding: 0; gap: 6px; }\n  .pastw-year-btn { padding: 7px 13px; font-size: 0.78rem; }\n  .pastw-list { border-radius: 12px; }\n  .pastw-row { padding: 12px 14px; }\n  .pastw-row .who h4 { font-size: 0.88rem; }\n  .pastw-row a.watch { padding: 6px 10px; font-size: 0.68rem; }\n  .pastw-pager { padding: 10px 14px; }\n  .pastw-pager-info { font-size: 0.72rem; flex-basis: 100%; text-align: center; margin-bottom: 4px; }\n  .pastw-pager-ctrls { margin: 0 auto; }\n  .pastw-pg-btn { min-width: 26px; height: 26px; }\n  /* Hide ellipsis on smallest widths to save space */\n  .pastw-pg-ellipsis { display: none; }\n}\n\n/* ========================= APPLY NOW (inline form) ========================= */\n/* Matches FS \"Pathway Milestones\" — .fm-milestones maroon gradient */\n.sch-section.apply {\n  background: linear-gradient(135deg, #3a0c18 0%, #4a1020 40%, #2a0e16 100%);\n  color: #fff;\n}\n/* ID-prefix these so they beat the #sch-root h2 default-color rule */\n#sch-root .sch-section.apply .sch-section-head h2 { color: #fff; }\n#sch-root .sch-section.apply .sch-section-head h2 .accent { color: #D93A3A; }\n#sch-root .sch-section.apply .sch-section-head p { color: rgba(255,255,255,0.7); }\n#sch-root .sch-section.apply .sch-section-head p em { color: rgba(255,255,255,0.88); }\n#sch-root .sch-section.apply .section-tag {\n  background: rgba(255,255,255,0.1);\n  border-color: rgba(255,255,255,0.16);\n  color: #D93A3A;\n}\n\n/* Eligibility mini-strip above the form — dark-on-dark treatment */\n.app-eligibility {\n  max-width: 920px;\n  margin: 0 auto 32px;\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 14px;\n}\n.app-elig-item {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  gap: 10px;\n  background: rgba(255,255,255,0.05);\n  border: 1px solid rgba(255,255,255,0.12);\n  border-radius: var(--sch-radius-md);\n  padding: 22px 18px;\n  backdrop-filter: blur(6px);\n  -webkit-backdrop-filter: blur(6px);\n}\n.app-elig-icon {\n  flex: 0 0 44px;\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  background: rgba(217, 58, 58, 0.18);\n  color: #fff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-bottom: 4px;\n}\n.app-elig-icon svg { width: 20px; height: 20px; }\n.app-elig-item > div:last-child { display: flex; flex-direction: column; gap: 3px; align-items: center; }\n.app-elig-item strong {\n  font-family: 'Space Grotesk', sans-serif;\n  font-size: 0.98rem;\n  font-weight: 600;\n  color: #fff;\n  line-height: 1.2;\n}\n.app-elig-item span {\n  font-size: 0.85rem;\n  color: rgba(255,255,255,0.65);\n  line-height: 1.5;\n  max-width: 220px;\n}\n@media (max-width: 860px) {\n  /* Keep 3-up on tablet; just tighten padding + gap so they don't look chunky */\n  .app-eligibility { grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 24px; }\n  .app-elig-item { padding: 16px 12px; gap: 8px; }\n  .app-elig-icon { flex: 0 0 36px; width: 36px; height: 36px; border-radius: 10px; margin-bottom: 0; }\n  .app-elig-icon svg { width: 16px; height: 16px; }\n  .app-elig-item strong { font-size: 0.88rem; }\n  .app-elig-item span { font-size: 0.76rem; line-height: 1.4; }\n}\n@media (max-width: 560px) {\n  /* Thin horizontal rows on phones — less vertical real estate than stacked columns */\n  .app-eligibility { grid-template-columns: 1fr; gap: 8px; margin-bottom: 20px; }\n  .app-elig-item {\n    flex-direction: row;\n    align-items: center;\n    text-align: left;\n    padding: 12px 14px;\n    gap: 12px;\n  }\n  .app-elig-icon { flex: 0 0 32px; width: 32px; height: 32px; margin-bottom: 0; }\n  .app-elig-item > div:last-child { align-items: flex-start; text-align: left; gap: 1px; }\n  .app-elig-item span { max-width: none; font-size: 0.78rem; }\n}\n\n.app-wrap { max-width: 920px; margin: 0 auto; }\n.app-card {\n  background: #fff;\n  border: 1px solid var(--sch-line);\n  border-radius: var(--sch-radius-lg);\n  padding: 48px 52px;\n  box-shadow: var(--sch-shadow-sm);\n}\n.app-section-title {\n  font-family: 'Space Grotesk', sans-serif;\n  font-size: 1.15rem;\n  font-weight: 700;\n  letter-spacing: -0.01em;\n  text-transform: none;\n  color: var(--sch-ink);\n  margin: 0 0 6px;\n  line-height: 1.2;\n  display: flex; align-items: center; gap: 14px;\n}\n.app-section-title::before {\n  /* Small crimson accent bar to the left of each title */\n  content: '';\n  flex: 0 0 4px;\n  align-self: stretch;\n  border-radius: 3px;\n  background: var(--sch-c);\n}\n.app-section-sub {\n  font-size: 0.92rem;\n  color: var(--sch-muted);\n  margin: 0 0 22px 18px;\n  line-height: 1.55;\n}\n@media (max-width: 600px) {\n  .app-section-title { font-size: 1.05rem; }\n}\n.app-grid {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 14px 18px;\n  margin-bottom: 28px;\n}\n.app-field { display: flex; flex-direction: column; }\n.app-field.full { grid-column: 1 / -1; }\n.app-label {\n  font-size: 0.82rem;\n  font-weight: 600;\n  color: var(--sch-ink);\n  letter-spacing: 0.02em;\n  margin-bottom: 7px;\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.app-label .req { color: var(--sch-c); font-weight: 700; }\n.app-helper {\n  font-size: 0.74rem;\n  color: var(--sch-muted);\n  margin-top: 5px;\n  line-height: 1.5;\n}\n.app-input, .app-textarea {\n  width: 100%;\n  font-family: 'Inter', sans-serif;\n  font-size: 0.94rem;\n  color: var(--sch-ink);\n  background: #fdfbfa;\n  border: 1px solid var(--sch-line);\n  border-radius: 10px;\n  padding: 12px 14px;\n  transition: all .18s;\n  line-height: 1.5;\n}\n.app-textarea { min-height: 140px; resize: vertical; }\n.app-input::placeholder, .app-textarea::placeholder { color: #b8aeab; }\n.app-input:focus, .app-textarea:focus {\n  outline: none;\n  border-color: var(--sch-c);\n  background: #fff;\n  box-shadow: 0 0 0 3px rgba(217, 58, 58, 0.12);\n}\n\n.app-check-row {\n  /* Stacked vertically + centered UNDER the submit button */\n  margin-top: 20px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 10px;\n  text-align: center;\n}\n.app-check {\n  display: inline-flex;\n  align-items: flex-start;\n  justify-content: center;\n  gap: 10px;\n  font-size: 0.9rem;\n  color: var(--sch-mid);\n  cursor: pointer;\n  line-height: 1.55;\n  max-width: 520px;\n  text-align: left;\n}\n@media (max-width: 600px) {\n  .app-check-row { gap: 12px; }\n}\n.app-check input[type=checkbox] {\n  margin-top: 3px;\n  flex-shrink: 0;\n  width: 16px; height: 16px;\n  accent-color: var(--sch-c);\n}\n.app-check a { color: var(--sch-c); text-decoration: underline; }\n.app-submit-row {\n  /* Submit button row now stands alone — checkboxes stacked below via .app-check-row.\n     Adds a top border + padding to replace the one previously on .app-check-row. */\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 14px;\n  margin-top: 24px;\n  padding-top: 24px;\n  border-top: 1px solid var(--sch-line-soft);\n  text-align: center;\n}\n.app-submit {\n  background: var(--sch-c);\n  color: #fff;\n  border: none;\n  cursor: pointer;\n  padding: 14px 34px;\n  border-radius: var(--sch-radius-pill);\n  font-family: 'Inter', sans-serif;\n  font-weight: 600;\n  font-size: 14px;\n  letter-spacing: 0.01em;\n  transition: all .2s;\n  box-shadow: 0 8px 22px rgba(217, 58, 58, 0.30);\n  display: inline-flex; align-items: center; gap: 8px;\n}\n.app-submit:hover { background: var(--sch-c-dark); transform: translateY(-1px); box-shadow: 0 12px 30px rgba(217, 58, 58, 0.38); }\n/* Strengthen form card shadow against the dark maroon surround */\n.sch-section.apply .app-card {\n  box-shadow: 0 22px 52px rgba(0, 0, 0, 0.35);\n  border-color: rgba(255, 255, 255, 0.08);\n}\n\n.app-success, .app-error { display: none; padding: 18px 22px; border-radius: 12px; margin-bottom: 20px; font-size: 0.94rem; }\n.app-success.show, .app-error.show { display: block; }\n.app-success { background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.3); color: #166534; }\n.app-error { background: rgba(217, 58, 58, 0.08); border: 1px solid rgba(217, 58, 58, 0.28); color: #7b1a1a; }\n\n@media (max-width: 700px) {\n  .app-card { padding: 32px 22px; }\n  .app-grid { grid-template-columns: 1fr; gap: 14px; }\n}\n\n/* ========================= FAQ ========================= */\n/* Dark bg matching footer (#0a0a0a) per round-3 */\n.sch-section.faq-section {\n  background: #0a0a0a;\n  color: #fff;\n}\n#sch-root .sch-section.faq-section .sch-section-head h2 { color: #fff; }\n#sch-root .sch-section.faq-section .sch-section-head h2 .accent { color: #D93A3A; }\n#sch-root .sch-section.faq-section .sch-section-head p { color: rgba(255,255,255,0.7); }\n#sch-root .sch-section.faq-section .sch-section-head p a { color: #D93A3A; }\n#sch-root .sch-section.faq-section .section-tag {\n  background: rgba(255,255,255,0.08);\n  border-color: rgba(255,255,255,0.14);\n  color: #D93A3A;\n}\n\n.faq-list { max-width: 860px; margin: 0 auto; border-top: 1px solid rgba(255,255,255,0.08); }\n.faq-item {\n  border-bottom: 1px solid rgba(255,255,255,0.08);\n}\n.faq-q {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 20px;\n  width: 100%;\n  padding: 22px 4px;\n  background: none;\n  border: none;\n  text-align: left;\n  cursor: pointer;\n  font-family: 'Space Grotesk', sans-serif;\n  font-size: 1.02rem;\n  font-weight: 600;\n  color: #fff;\n  transition: color .2s;\n}\n.faq-q:hover { color: #D93A3A; }\n.faq-chev {\n  flex-shrink: 0;\n  width: 32px; height: 32px;\n  border-radius: 50%;\n  background: rgba(217, 58, 58, 0.18);\n  color: #D93A3A;\n  display: flex; align-items: center; justify-content: center;\n  transition: transform .3s ease, background .2s, color .2s;\n}\n.faq-item.open .faq-chev { transform: rotate(180deg); background: var(--sch-c); color: #fff; }\n.faq-chev svg { width: 14px; height: 14px; }\n.faq-a {\n  max-height: 0;\n  overflow: hidden;\n  transition: max-height .35s ease;\n  color: rgba(255,255,255,0.72);\n  font-size: 0.96rem;\n  line-height: 1.7;\n}\n.faq-item.open .faq-a { max-height: 700px; }\n.faq-a-inner { padding: 0 4px 24px; }\n.faq-a-inner strong { color: #fff; }\n.faq-a-inner a { color: #D93A3A; font-weight: 500; }\n.faq-a-inner a:hover { color: #fff; text-decoration: underline; }\n@media (max-width: 600px) {\n  .faq-q { padding: 16px 2px; font-size: 0.96rem; gap: 12px; }\n  .faq-chev { width: 28px; height: 28px; }\n  .faq-a { font-size: 0.9rem; line-height: 1.65; }\n  .faq-a-inner { padding: 0 2px 18px; }\n}\n\n/* ========================= FOOTER =========================\n   Apr 23, 2026 (R7e): transplanted VERBATIM from JS Files - Live Pages/fs-combined.js\n   (lines 245-255, 322-324). Every token matches the live footer that ships on\n   www.pulseofp3.org/for-students. #sch-root prefixing is required only where page\n   resets (`#sch-root p { margin: 0 }`, `#sch-root a { color: inherit; text-decoration: none }`)\n   would otherwise win specificity; everything else matches FS selectors 1:1. The\n   `.p3-footer-bottom` inline-style block comes from FS's footer.innerHTML template\n   (fs-combined.js line 432) so we keep those on the element too. */\n.p3-footer { background: #0a0a0a; padding: 64px 40px 32px; color: #fff; }\n.p3-footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; max-width: 1180px; margin: 0 auto; }\n/* LIVE-PAGE OVERRIDE: FS brand column renders as display:flex with flex-direction:column\n   (probe Apr 23). This is what stacks the logo/tagline/location vertically with proper\n   baselines. Concept was using default block display which subtly affected spacing. */\n.p3-footer-brand { display: flex; flex-direction: column; }\n.p3-footer-brand p { color: rgba(255,255,255,0.5); font-size: 0.85rem; line-height: 1.6; margin-top: 12px; }\n/* LIVE-PAGE OVERRIDE: FS live renders the footer logo with `brightness(0) invert(1)` and\n   opacity 0.8 (probe Apr 23) — that's what turns the mark white on the #0a0a0a footer.\n   The fs-combined.js CSS source doesn't specify it, so it must be applied by a Webflow\n   base rule or another injected stylesheet. Replicating here so the concept matches. */\n/* Explicit width:116 + align-self:flex-start — prevents `display:flex` brand column from\n   stretching the logo img to 424 (full column) via align-items:stretch default. FS uses\n   Webflow's inline-block img default so this isn't an issue there; our `#sch-root img\n   { display:block }` reset reintroduces the stretch behavior. */\n.p3-footer-logo { height: 36px; width: 116px; align-self: flex-start; margin-bottom: 8px; filter: brightness(0) invert(1); opacity: 0.8; }\n/* LIVE-PAGE OVERRIDE: FS live tagline + location each get `margin-bottom: 16px` from a\n   Webflow p-element default (probe Apr 23: FS tag.mb=16, loc.mb=16). Concept's\n   `#sch-root p { margin: 0 }` reset was stripping that default — restore it explicitly\n   so the brand stack spaces out the same way it does on live. */\n.p3-footer-tagline { color: rgba(255,255,255,0.5); font-size: 13px; line-height: 1.6; margin-top: 12px; margin-bottom: 16px; max-width: 280px; }\n.p3-footer-location { color: rgba(255,255,255,0.5); font-size: 13px; margin-top: 12px; margin-bottom: 16px; }\n.p3-footer-col-title { font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(255,255,255,0.8); margin-bottom: 16px; }\n.p3-footer-col { display: flex; flex-direction: column; gap: 10px; }\n/* LIVE-PAGE OVERRIDE: FS link line-height renders at 30.006px live (probe Apr 23), even\n   though fs-combined.js doesn't specify it. Concept was inheriting 1.6 from body (20.8px)\n   which made the link stack 35% tighter. Explicit `line-height: 30px` matches FS live. */\n.p3-footer-link { color: rgba(255,255,255,0.6); font-size: 13px; line-height: 30px; text-decoration: none; transition: color 0.2s; }\n.p3-footer-link:hover { color: #fff; }\n/* LIVE-PAGE OVERRIDE: bottom bar renders at 1200px max-width centered on FS (probe x=120 w=1200\n   on 1440 viewport, 40px footer padding → content 1360, bottom narrower by 80px each side,\n   centered). fs-combined.js doesn't specify this; must come from Webflow base. */\n.p3-footer-bottom { margin-top: 40px; border-top: 1px solid rgba(255,255,255,0.08); max-width: 1200px; margin-left: auto; margin-right: auto; }\n\n@media (max-width: 768px) {\n  /* LIVE-PAGE OVERRIDE: FS live mobile grid renders cols=127px 127px (probe x=40 w=310,\n     cols 127+16+127 = 270, centered in 310 with 20px slack each side). fs-combined.js says\n     1fr 1fr which would give 147px each. Explicit padding:0 20px shrinks the content to 270\n     and `127px 127px` locks the cols so our rendering matches FS exactly. */\n  .p3-footer-grid { display: grid !important; grid-template-columns: 127px 127px !important; justify-content: center; gap: 24px 16px !important; padding: 0 20px; }\n  .p3-footer-brand { grid-column: 1 / -1; }\n  .p3-footer-bottom { flex-wrap: wrap; justify-content: center; text-align: center; }\n}\n\n/* Utility */\n.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }\n\n/* Smooth scroll offsets for in-page anchors so the fixed nav doesn't cover section headers */\nsection[id] { scroll-margin-top: 92px; }\n";
  document.head.appendChild(style);

  document.documentElement.classList.add('sch-active');
  document.body.classList.add('sch-active');

  var root = document.createElement('div');
  root.id = 'sch-root';
  root.innerHTML = "\n\n  <!-- =============== NAV ===============\n       Apr 23, 2026 (R7e): innerHTML transplanted VERBATIM from JS Files - Live Pages/\n       fs-combined.js line 355. Same element order, same classes, same image URL, same\n       href pattern as live /for-students. id=\"p3nav\" is the handle used by the scroll-\n       darken listener; id=\"hamburger\" matches the FS JS hamburger toggle selector. -->\n  <div id=\"p3nav\" class=\"p3-nav\"><a href=\"https://pulseofp3.org/\" class=\"p3-nav-logo w-inline-block\"><img src=\"https://cdn.prod.website-files.com/69b02f65f0068e9fb16f09f7/69b02f65f0068e9fb16f0df1_P3%20Logo.svg\" loading=\"lazy\" alt=\"P3 - Pulse of Perseverance\" class=\"p3-nav-logo-img\"></a><div class=\"p3-nav-links\"><a href=\"https://pulseofp3.org/\" class=\"pp-home-desktop-hide\">Home</a><a href=\"https://pulseofp3.org/for-students\" class=\"p3-nav-link\">For Students</a><a href=\"https://pulseofp3.org/partner\" class=\"p3-nav-link\">For Institutions</a><a href=\"https://pulseofp3.org/for-mentors\" class=\"p3-nav-link\">For Mentors</a><a href=\"https://pulseofp3.org/about/about\" class=\"p3-nav-link\">About</a></div><a href=\"https://pulseofp3.org/download\" class=\"p3-nav-cta\">Get the App</a><div aria-label=\"Menu\" class=\"pp-mob-menu\" id=\"hamburger\"><span></span><span></span><span></span></div></div>\n  <!-- Mobile overlay — verbatim from fs-combined.js line 362 -->\n  <div id=\"pp-mob-overlay\" class=\"pp-mob-overlay\"><a href=\"https://pulseofp3.org/\" class=\"pp-mob-overlay-link\">Home</a><a href=\"https://pulseofp3.org/for-students\" class=\"pp-mob-overlay-link\">For Students</a><a href=\"https://pulseofp3.org/partner\" class=\"pp-mob-overlay-link\">For Institutions</a><a href=\"https://pulseofp3.org/for-mentors\" class=\"pp-mob-overlay-link\">For Mentors</a><a href=\"https://pulseofp3.org/about/about\" class=\"pp-mob-overlay-link\">About</a><a href=\"https://pulseofp3.org/download\" class=\"pp-mob-overlay-cta\">Get the App</a></div>\n\n  <!-- =============== HERO =============== -->\n  <header class=\"sch-hero\">\n    <img class=\"sch-hero-watermark\" src=\"https://tparis7.github.io/Scholarships-Page/pexels-rdne-7713348.jpg\" alt=\"\" aria-hidden=\"true\" />\n    <div class=\"sch-hero-inner\">\n      <div class=\"sch-hero-copy\">\n        <h1>Where <span class=\"accent\">perseverance</span><br class=\"sch-h1-br-dt\"> meets <span class=\"accent\">opportunity</span>.</h1>\n        <p class=\"lede\">Every month, one student who embodies the <strong>#pulseofperseverance</strong> receives a scholarship to help pay for school, supplies, fees, or the next step. Over $100,000 awarded so far &mdash; <strong>register and apply today!</strong></p>\n        <div class=\"sch-hero-buttons\">\n          <a class=\"btn btn-primary\" href=\"#apply\">Apply Now <span class=\"arrow\">&rarr;</span></a>\n          <a class=\"btn btn-outline-white\" href=\"#winners\">Watch Winner Stories</a>\n        </div>\n        <div class=\"sch-hero-stats\">\n          <div>\n            <div class=\"sch-hero-stat-num\">$100K+</div>\n            <div class=\"sch-hero-stat-label\">Awarded</div>\n          </div>\n          <div>\n            <div class=\"sch-hero-stat-num\">+100</div>\n            <div class=\"sch-hero-stat-label\">Students Funded</div>\n          </div>\n          <div>\n            <div class=\"sch-hero-stat-num\">4.9<span style=\"opacity:.6\">&#9733;</span></div>\n            <div class=\"sch-hero-stat-label\">App Store Rating</div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </header>\n\n  <main id=\"sch-body\">\n\n    <!-- =============== HOW IT WORKS =============== -->\n    <section class=\"sch-section\" id=\"how-it-works\">\n      <div class=\"sch-container\">\n        <div class=\"sch-section-head\">\n          <span class=\"section-tag tag-light eyebrow\">How It Works</span>\n          <h2>Three steps between you<br/>and your next <span class=\"accent\">breakthrough</span>.</h2>\n          <p>The scholarship isn&rsquo;t just financial aid &mdash; it&rsquo;s your gateway to a brighter future. Here&rsquo;s what to do.</p>\n        </div>\n        <div class=\"hiw-grid\">\n          <div class=\"hiw-card\">\n            <span class=\"hiw-step\">01</span>\n            <div class=\"hiw-icon\">\n              <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"5\" y=\"2\" width=\"14\" height=\"20\" rx=\"2\"/><path d=\"M12 18h.01\"/></svg>\n            </div>\n            <h3>Register as a Mentee (P3 app)</h3>\n            <p>Our app is completely free. Once you&rsquo;re connected with a mentor, stay active &mdash; ask questions, show up, engage. That&rsquo;s what gives your application the edge.</p>\n          </div>\n          <div class=\"hiw-card\">\n            <span class=\"hiw-step\">02</span>\n            <div class=\"hiw-icon\">\n              <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z\"/><path d=\"M14 2v6h6\"/><path d=\"M10 13H8\"/><path d=\"M16 13h-4\"/><path d=\"M16 17H8\"/></svg>\n            </div>\n            <h3>Complete your application</h3>\n            <p>Tell us about your career goals and future ambitions in your own words. Make sure the application is <em>100%</em> you &mdash; <u>AI-generated</u> essays are automatically disqualified.</p>\n          </div>\n          <div class=\"hiw-card\">\n            <span class=\"hiw-step\">03</span>\n            <div class=\"hiw-icon\">\n              <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"8\" r=\"6\"/><path d=\"M15.477 12.89 17 22l-5-3-5 3 1.523-9.11\"/></svg>\n            </div>\n            <h3>Accept your offer</h3>\n            <p>A new winner is named every month, so there are lots of shots at this. Winners are announced on our website and social channels.</p>\n          </div>\n        </div>\n      </div>\n    </section>\n\n    <!-- =============== APPLY NOW (inline form) =============== -->\n    <section class=\"sch-section apply\" id=\"apply\">\n      <div class=\"sch-container\">\n        <div class=\"sch-section-head\">\n          <span class=\"section-tag tag-light eyebrow\">Apply Now</span>\n          <h2>Your <span class=\"accent\">application</span> starts here.</h2>\n          <p>Take your time. Authentic beats polished &mdash; we want to hear from <em>you</em>. Applications are due the 1st of every month.</p>\n        </div>\n\n        <!-- Quick eligibility strip -->\n        <div class=\"app-eligibility\">\n          <div class=\"app-elig-item\">\n            <div class=\"app-elig-icon\" aria-hidden=\"true\">\n              <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M22 10v6M2 10l10-5 10 5-10 5z\"/><path d=\"M6 12v5c3 3 9 3 12 0v-5\"/></svg>\n            </div>\n            <div>\n              <strong>HS or college student</strong>\n              <span>U.S.-based, in grades 9&ndash;12 or currently enrolled in an undergraduate program.</span>\n            </div>\n          </div>\n          <div class=\"app-elig-item\">\n            <div class=\"app-elig-icon\" aria-hidden=\"true\">\n              <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"5\" y=\"2\" width=\"14\" height=\"20\" rx=\"2\"/><path d=\"M12 18h.01\"/></svg>\n            </div>\n            <div>\n              <strong>Active P3 Mentee</strong>\n              <span>Download the free P3 app and stay engaged with your mentor before you apply.</span>\n            </div>\n          </div>\n          <div class=\"app-elig-item\">\n            <div class=\"app-elig-icon\" aria-hidden=\"true\">\n              <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83\"/></svg>\n            </div>\n            <div>\n              <strong>Your own words</strong>\n              <span>Write and film your application yourself &mdash; <u>AI-generated</u> submissions are disqualified.</span>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"app-wrap\">\n          <div class=\"app-card\">\n            <div class=\"app-success\" id=\"appSuccess\" role=\"status\">\n              <strong>Thank you!</strong> Your application has been submitted. We&rsquo;ll get back to you within 24&ndash;48 hours.\n            </div>\n            <div class=\"app-error\" id=\"appError\" role=\"alert\">\n              Oops! Something went wrong while submitting the form. Please try again.\n            </div>\n\n            <!--\n              PRODUCTION NOTE (for Webflow port):\n              When this concept ships to Webflow, swap the <form> below for the existing\n              native Webflow form element at /apply-for-scholarship with these attributes\n              preserved so the form collector keeps routing submissions into Retool:\n                id=\"wf-form-Scholarship-Application\"\n                name=\"wf-form-Scholarship-Application\"\n                data-name=\"Scholarship Application\"\n                data-wf-page-id=\"69b02f65f0068e9fb16f0af0\"\n                method=\"get\"\n              Every field below uses the SAME `name` attribute as the existing Webflow form,\n              so no downstream mapping (Zapier, Retool, email routing) will break.\n            -->\n            <!-- Apr 23 R7g: removed `novalidate` so the preview enforces the same HTML5 checks\n                 as the live /apply-for-scholarship Webflow form — type=\"email\" will block\n                 submissions missing \"@\", required fields enforce non-empty, etc. Matches\n                 Webflow's production form which has novalidate=false. -->\n            <form id=\"wf-form-Scholarship-Application\" name=\"wf-form-Scholarship-Application\"\n                  data-name=\"Scholarship Application\"\n                  data-wf-page-id=\"69b02f65f0068e9fb16f0af0\"\n                  method=\"get\">\n\n              <!-- Section: Your Details -->\n              <div class=\"app-section-title\">Your Details</div>\n              <div class=\"app-section-sub\">Tell us about yourself. Use the email you registered with on the P3 app.</div>\n              <div class=\"app-grid\">\n                <div class=\"app-field\">\n                  <label class=\"app-label\" for=\"First-Name-5\">First name <span class=\"req\">*</span></label>\n                  <input class=\"app-input\" id=\"First-Name-5\" name=\"First-Name\" data-name=\"First Name\" type=\"text\" maxlength=\"256\" placeholder=\"First Name\" required />\n                </div>\n                <div class=\"app-field\">\n                  <label class=\"app-label\" for=\"Last-Name-2\">Last name <span class=\"req\">*</span></label>\n                  <input class=\"app-input\" id=\"Last-Name-2\" name=\"Last-Name\" data-name=\"Last Name\" type=\"text\" maxlength=\"256\" placeholder=\"Last Name\" required />\n                </div>\n                <div class=\"app-field\">\n                  <label class=\"app-label\" for=\"Age\">Age <span class=\"req\">*</span></label>\n                  <input class=\"app-input\" id=\"Age\" name=\"Age\" data-name=\"Age\" type=\"number\" maxlength=\"256\" placeholder=\"20\" required />\n                </div>\n                <div class=\"app-field\">\n                  <label class=\"app-label\" for=\"Email\">Email address <span class=\"req\">*</span></label>\n                  <input class=\"app-input\" id=\"Email\" name=\"Email\" data-name=\"Email\" type=\"email\" maxlength=\"256\" placeholder=\"example@email.com\" required />\n                  <span class=\"app-helper\">Please use the email that you used to register on the P3 app.</span>\n                </div>\n                <div class=\"app-field\">\n                  <label class=\"app-label\" for=\"Phone-Number\">Phone number <span class=\"req\">*</span></label>\n                  <input class=\"app-input\" id=\"Phone-Number\" name=\"Phone-Number\" data-name=\"Phone Number\" type=\"tel\" maxlength=\"256\" placeholder=\"Your Phone Number\" required />\n                </div>\n                <div class=\"app-field\">\n                  <label class=\"app-label\" for=\"ZIP-code\">ZIP code</label>\n                  <input class=\"app-input\" id=\"ZIP-code\" name=\"ZIP-code\" data-name=\"ZIP code\" type=\"number\" maxlength=\"256\" placeholder=\"90014\" />\n                </div>\n                <div class=\"app-field full\">\n                  <label class=\"app-label\" for=\"Home-Address\">Home address <span class=\"req\">*</span></label>\n                  <input class=\"app-input\" id=\"Home-Address\" name=\"Home-Address\" data-name=\"Home Address\" type=\"text\" maxlength=\"256\" placeholder=\"Your Home Address\" required />\n                </div>\n              </div>\n\n              <!-- Section: School Info -->\n              <div class=\"app-section-title\">School Info</div>\n              <div class=\"app-section-sub\">Make sure to get your transcripts ready for the supporting-files section.</div>\n              <div class=\"app-grid\">\n                <div class=\"app-field\">\n                  <label class=\"app-label\" for=\"Current-School\">School currently attending</label>\n                  <input class=\"app-input\" id=\"Current-School\" name=\"Current-School\" data-name=\"Current School\" type=\"text\" maxlength=\"256\" placeholder=\"Your Current School\" />\n                </div>\n                <div class=\"app-field\">\n                  <label class=\"app-label\" for=\"Applying-To-School\">School applying to</label>\n                  <input class=\"app-input\" id=\"Applying-To-School\" name=\"Applying-To-School\" data-name=\"Applying To School\" type=\"text\" maxlength=\"256\" placeholder=\"The School You are Applying To\" />\n                </div>\n              </div>\n\n              <!-- Section: Your Essay -->\n              <div class=\"app-section-title\">Your Essay</div>\n              <div class=\"app-section-sub\">No dream is too big. Just make sure to convey your authentic self &mdash; <u>AI-generated</u> responses will be disqualified.</div>\n              <div class=\"app-grid\">\n                <div class=\"app-field full\">\n                  <label class=\"app-label\" for=\"Essay\">Essay <span class=\"req\">*</span> <span style=\"margin-left:auto; font-weight:500; color:var(--sch-muted); font-size:0.78rem;\">250 words min</span></label>\n                  <textarea class=\"app-textarea\" id=\"Essay\" name=\"Essay\" data-name=\"Essay\" maxlength=\"5000\" placeholder=\"Tell us how you're making a difference in your community and why you carry the #pulseofperseverance...\" required></textarea>\n                </div>\n              </div>\n\n              <!-- Section: Supporting Files -->\n              <div class=\"app-section-title\">Supporting Files</div>\n              <div class=\"app-section-sub\">Upload a 60-second vertical video explaining why you possess the #pulseofperseverance and what this scholarship would mean to you.</div>\n              <div class=\"app-grid\">\n                <div class=\"app-field\">\n                  <label class=\"app-label\" for=\"Video-Application-Link\">Video application <span class=\"req\">*</span></label>\n                  <input class=\"app-input\" id=\"Video-Application-Link\" name=\"Video-Application-Link\" data-name=\"Video Application Link\" type=\"text\" maxlength=\"256\" placeholder=\"Link to video (Dropbox, Google Drive, etc.)\" required />\n                </div>\n                <div class=\"app-field\">\n                  <label class=\"app-label\" for=\"Transcript-Link\">Transcript <span class=\"req\">*</span></label>\n                  <input class=\"app-input\" id=\"Transcript-Link\" name=\"Transcript-Link\" data-name=\"Transcript Link\" type=\"text\" maxlength=\"256\" placeholder=\"Link to transcript (Dropbox, Google Drive, etc.)\" required />\n                </div>\n              </div>\n\n              <!-- Submit first, then checkboxes stacked + centered below -->\n              <div class=\"app-submit-row\">\n                <button type=\"submit\" class=\"app-submit\">Submit application <span class=\"arrow\">&rarr;</span></button>\n              </div>\n\n              <div class=\"app-check-row\">\n                <label class=\"app-check\">\n                  <input type=\"checkbox\" id=\"checkbox-3\" name=\"checkbox-3\" data-name=\"Checkbox 3\" required />\n                  <span>I have read and agree with the P3 <a href=\"/app-privacy-policy\">Privacy Policy</a>. <span class=\"req\">*</span></span>\n                </label>\n                <label class=\"app-check\">\n                  <input type=\"checkbox\" id=\"checkbox-2\" name=\"checkbox-2\" data-name=\"Checkbox 2\" />\n                  <span>I would like to receive news from P3.</span>\n                </label>\n              </div>\n            </form>\n          </div>\n        </div>\n      </div>\n    </section>\n\n    <!-- =============== WINNER SPOTLIGHT =============== -->\n    <section class=\"sch-section\" id=\"winners\">\n      <div class=\"sch-container\">\n        <div class=\"sch-section-head\">\n          <span class=\"section-tag eyebrow\">Recent Winners</span>\n          <h2>+100 students. <span class=\"accent\">One story</span> at a time.</h2>\n          <p>Every winner&rsquo;s journey is unique. Watch a few recent spotlights below, or scroll further to see the complete roster of everyone we&rsquo;ve funded since 2018.</p>\n        </div>\n        <div class=\"spot-filters\" id=\"spotFilters\" aria-label=\"Filter by year\">\n          <!-- populated by JS -->\n        </div>\n        <div class=\"spot-grid\" id=\"spotGrid\"><!-- populated by JS --></div>\n      </div>\n    </section>\n\n    <!-- =============== ALL PAST WINNERS =============== -->\n    <section class=\"sch-section soft\" id=\"all-winners\">\n      <img class=\"pastw-watermark\" src=\"https://tparis7.github.io/Scholarships-Page/pexels-george-pak-7973120.jpg\" alt=\"\" aria-hidden=\"true\" />\n      <div class=\"sch-container\">\n        <div class=\"sch-section-head\">\n          <span class=\"section-tag tag-light eyebrow\">All Past Winners</span>\n          <h2>National <span class=\"accent\">Awards</span> List.</h2>\n          <p>A living record of the students we&rsquo;ve funded &mdash; from the first scholarship in October 2018 to this month&rsquo;s recipient.</p>\n        </div>\n        <div class=\"pastw-wrap\">\n          <aside class=\"pastw-side\" id=\"pastwSide\" aria-label=\"Filter past winners by year\">\n            <!-- populated by JS -->\n          </aside>\n          <div class=\"pastw-list\" id=\"pastwList\"><!-- populated by JS --></div>\n        </div>\n      </div>\n    </section>\n\n    <!-- =============== FAQ =============== -->\n    <section class=\"sch-section faq-section\" id=\"faq\">\n      <div class=\"sch-container\">\n        <div class=\"sch-section-head\">\n          <span class=\"section-tag tag-light eyebrow\">FAQs</span>\n          <h2>Quick <span class=\"accent\">answers</span>.</h2>\n          <p>Still have a question? Email us at <a href=\"mailto:info@pulseofp3.org\" style=\"font-weight:500;\">info@pulseofp3.org</a>.</p>\n        </div>\n        <div class=\"faq-list\" id=\"faqList\">\n          <!-- FAQ items populated by JS (collapsed by default) -->\n        </div>\n      </div>\n    </section>\n\n  </main>\n\n  <!-- =============== FOOTER — matches live homepage exactly =============== -->\n  <!-- Structure mirrors `https://www.pulseofp3.org/` footer pulled Apr 22, 2026:\n       same PNG logo w/ srcset, same 4-col grid (2fr 1fr 1fr 1fr),\n       same column titles + link order, same relative URLs,\n       same LinkedIn/YouTube handles verbatim from live. -->\n  <!-- Footer — Apr 23, 2026 (R7e): innerHTML transplanted VERBATIM from JS Files - Live Pages/\n       fs-combined.js line 432. Same <footer class=\"p3-footer\"> wrapper, same 4-col grid,\n       same link order, same inline styles on .p3-footer-bottom (the live JS template uses\n       element-level inline styles for the bottom bar — preserved here). -->\n  <footer class=\"p3-footer\"><div class=\"p3-footer-grid\"><div class=\"p3-footer-brand\"><img src=\"https://cdn.prod.website-files.com/69b02f65f0068e9fb16f09f7/69b02f65f0068e9fb16f0df1_P3%20Logo.svg\" loading=\"lazy\" alt=\"P3 - Pulse of Perseverance\" class=\"p3-footer-logo\"><p class=\"p3-footer-tagline\">Unlocking life-changing opportunities for young visionaries. Free on iOS &amp; Android.</p><p class=\"p3-footer-location\">Chicago, IL &middot; Founded 2018</p></div><div class=\"p3-footer-col\"><h4 class=\"p3-footer-col-title\">Platform</h4><a href=\"https://pulseofp3.org/for-students\" class=\"p3-footer-link\">For Students</a><a href=\"https://pulseofp3.org/partner\" class=\"p3-footer-link\">For Institutions</a><a href=\"https://pulseofp3.org/for-mentors\" class=\"p3-footer-link\">For Mentors</a><a href=\"https://pulseofp3.org/scholarships\" class=\"p3-footer-link\">Scholarships</a></div><div class=\"p3-footer-col\"><h4 class=\"p3-footer-col-title\">About</h4><a href=\"https://pulseofp3.org/about/about\" class=\"p3-footer-link\">Our Story</a><a href=\"https://pulseofp3.org/about/about#team\" class=\"p3-footer-link\">Team</a><a href=\"https://drive.google.com/file/d/1IrFocCsboO6mLZsG3GAlHjmKv_V7a9Sn/view?usp=drive_link\" class=\"p3-footer-link\">Annual Report</a><a href=\"https://pulseofp3.org/about/in-the-press\" class=\"p3-footer-link\">Press</a></div><div class=\"p3-footer-col\"><h4 class=\"p3-footer-col-title\">Connect</h4><a href=\"https://www.instagram.com/pulseofp3/\" class=\"p3-footer-link\">Instagram</a><a href=\"https://www.linkedin.com/company/pulseofperseverance/\" class=\"p3-footer-link\">LinkedIn</a><a href=\"https://www.youtube.com/@PulseofPerseverance\" target=\"_blank\" class=\"p3-footer-link\">YouTube</a><a href=\"https://pulseofp3.org/donate\" class=\"p3-footer-link\">Donate</a></div></div><div class=\"p3-footer-bottom\" style=\"display:flex;justify-content:center;align-items:center;gap:4px;padding-top:24px;flex-wrap:wrap;\"><p style=\"margin:0;color:rgba(255,255,255,0.4);font-size:12px;\">&copy; 2026 Pulse of Perseverance Project. All rights reserved.</p><a href=\"https://pulseofp3.org/terms-conditions\" class=\"p3-footer-link\" style=\"font-size:12px;text-decoration:underline;color:rgba(255,255,255,0.4);\">Terms &amp; Conditions</a></div></footer>\n\n  <!-- Lightbox (populated dynamically) -->\n  <div class=\"spot-lightbox\" id=\"spotLightbox\" role=\"dialog\" aria-modal=\"true\" aria-label=\"Winner video\">\n    <div class=\"spot-lightbox-inner\">\n      <button class=\"spot-lightbox-close\" id=\"spotLightboxClose\" aria-label=\"Close video\">\n        &larr; Close\n      </button>\n      <div id=\"spotLightboxFrame\"></div>\n    </div>\n  </div>\n\n</div><!-- /#sch-root -->\n\n\n\n";
  document.body.appendChild(root);

  // ═══ RE-PARENT NAV + OVERLAY + FOOTER OUT OF #sch-root ═══
  // CRITICAL for Webflow body font inheritance (Satoshi/30.006px) — see Donate R7 notes.
  (function reparent() {
    var _nav = root.querySelector('#p3nav');
    var _ovr = root.querySelector('#pp-mob-overlay');
    var _ftr = root.querySelector('.p3-footer');
    if (_nav) document.body.insertBefore(_nav, root);
    if (_ovr) document.body.insertBefore(_ovr, root);
    if (_ftr) document.body.appendChild(_ftr);
  })();

  // ═══ BEHAVIOR (verbatim from concept <script> blocks) ═══


/* =========================================================
   Pulse of Perseverance — Scholarship Page JS
   Concept file. Everything is scoped to #sch-root and this
   script block will port cleanly into a sch-combined.js
   injected via a loader (same pattern as mg/ps/fs/fm pages).
   ========================================================= */

/* -------- Scholarship winners (auto-generated from P3 Scholarship Winners.xlsx) -------- */
var SCH_WINNERS = [{"y":2018,"m":"October","n":"Caleb (last name TBD)","s":"Prairie View A&M University — Biology/Immunology","v":"LDxgONtunm0","src":"YouTube"},{"y":2018,"m":"November","n":"Alexis Lattimore","v":"qJAMuBmczCE","src":"YouTube"},{"y":2019,"m":"January","n":"Shalimar Jackson","s":"Greenville Technical College, South Carolina","v":"boAW9m6lvUI","src":"YouTube"},{"y":2019,"m":"February","n":"Tearra Samuels","s":"UCLA — Psychology & Cognitive Science","v":"7xMB2NlOiRg","src":"YouTube"},{"y":2019,"m":"May","n":"Keith Moree II","src":"LinkedIn/IG/FB"},{"y":2019,"m":"June","n":"Khristopher Fields","s":"University of Houston–Victoria","v":"ogXzIccjo-c","src":"YouTube"},{"y":2019,"m":"August","n":"Zaire Harris","s":"Illinois","v":"uXvQxZ8gJg4","src":"YouTube"},{"y":2019,"m":"November","n":"Meredith \"Mimi\" Kol Balfour","s":"Minnesota","v":"RP13qI81ZaA","src":"YouTube"},{"y":2019,"m":"December","n":"Joi Butler","s":"Oglethorpe University — Physics","v":"qhf1YXzV4RQ","src":"YouTube"},{"y":2020,"m":"January","n":"Nasir Jean Paul & Vincent Ooi","s":"Nasir: Dr. Michael M. Krop Senior HS, Miami, FL (co-winners that month)","src":"LinkedIn/IG/FB"},{"y":2020,"m":"February","n":"Camara Kelly","s":"Bladensburg, Maryland","v":"RSdqu259oSg","src":"YouTube"},{"y":2020,"m":"March","n":"Marcus Malik O'Connor Howard","s":"Dillard High School, Broward County, FL (originally Chicago)","v":"Q-4ZWc_fABs","src":"YouTube"},{"y":2020,"m":"April","n":"Jocelyn McCullough","s":"Justice High School, Falls Church, Virginia","v":"I2lI1lEUeA8","src":"YouTube"},{"y":2020,"m":"May","n":"Vanessa Mackey","s":"Detroit native — 1st gen college student at Spelman College","src":"LinkedIn/IG/FB"},{"y":2020,"m":"July","n":"[Multiple — \"Young Black Pilots\"]","s":"@pulseofp3 July 2020 recipients (group: Young Black Pilots campaign)","src":"LinkedIn/IG/FB"},{"y":2020,"m":"September","n":"Ky-mani Barnett","s":"Overcame homelessness","src":"LinkedIn/IG/FB"},{"y":2020,"m":"November","n":"Tahliek Palmer","src":"LinkedIn/IG/FB"},{"y":2021,"m":"January","n":"Kennedy Chastang","s":"Canton, Michigan → Howard University","src":"LinkedIn/IG/FB"},{"y":2021,"m":"February","n":"Ameen Muhammad","s":"Philadelphia → Howard University","src":"LinkedIn/IG/FB"},{"y":2021,"m":"March","n":"Yamini Freeman","s":"Chicago → Lake Forest College","src":"LinkedIn/IG/FB"},{"y":2021,"m":"April","n":"Armand Jacques","s":"Orange, New Jersey","src":"LinkedIn/IG/FB"},{"y":2021,"m":"May","n":"Mckenzie Washington","s":"Chicago native — National Honor Society scholar","src":"LinkedIn/IG/FB"},{"y":2021,"m":"June","n":"Jenny De La Cruz","v":"GYjp9HzdckI","src":"YouTube"},{"y":2021,"m":"July","n":"Micheala Ward","s":"Alabama State University","v":"nbp9qGsn3Jc","src":"YouTube"},{"y":2021,"m":"December","n":"Tafadzwa \"Taffy\" Mazarura","s":"University of North Carolina-Charlotte","src":"LinkedIn/IG/FB"},{"y":2022,"m":"January","n":"Isaiah Hallums","s":"Greenville Technical College, Greenville, South Carolina","v":"4RT4vqCN1Xs","src":"YouTube"},{"y":2022,"m":"March","n":"Tinaya Ware","s":"Memphis","src":"LinkedIn/IG/FB"},{"y":2022,"m":"April","n":"Jeremiah Johnson","s":"Beavercreek High School, Ohio","v":"Kh0F6Wg_KyY","src":"YouTube"},{"y":2022,"m":"May","n":"Alexis Courtney","s":"Nursing School (graduation update posted Nov 2024)","v":"6z2G9qfXlx4","src":"YouTube"},{"y":2022,"m":"June","n":"Dremere Woods","src":"LinkedIn/IG/FB"},{"y":2022,"m":"July","n":"Andre Allen","v":"ei9HQCezztw","src":"YouTube"},{"y":2022,"m":"August","n":"Dawn Isby","s":"University of Michigan College of Creative Studies","v":"XREVm-QLczs","src":"YouTube"},{"y":2022,"m":"September","n":"Devin Duncan","s":"Cincinnati, Ohio","v":"tAnkbvRqGwc","src":"YouTube"},{"y":2022,"m":"October","n":"DuWayne Portis","s":"Lindblom Math & Science Academy, Chicago, IL","v":"g0V2OZA657c","src":"YouTube"},{"y":2022,"m":"November","n":"Christian Davis","s":"Xavier University of Louisiana — Chemistry / Pre-med","v":"ZlUaVeV3tPc","src":"YouTube"},{"y":2022,"m":"December","n":"Grace Garner","v":"bE9KEF8nr6Q","src":"YouTube"},{"y":2023,"m":"January","n":"Angel Akujor","s":"Wesleyan Governors University","v":"kuVsNgnrAYA","src":"YouTube"},{"y":2023,"m":"February","n":"Sam Lankah","s":"Originally from Liberia (migrated to US)","v":"JHV6S7lwuwk","src":"YT video + social (name from social)"},{"y":2023,"m":"March","n":"Marley Thomson","s":"Originally from Harlem","v":"yhmlBuAocLM","src":"YT video + social (name from social)"},{"y":2023,"m":"April","n":"Devin Washington","s":"Houston Christian University — Kinesiology","v":"vgNMgnZ4_5g","src":"YouTube"},{"y":2023,"m":"May","n":"Chris Wyckoff","s":"Sandy Creek High School, Fayetteville, Georgia","v":"lh0Yk4bXqHE","src":"YouTube"},{"y":2023,"m":"June","n":"Ebony Crandle","s":"University of Southern California (from San Diego)","v":"K1sAqD-GAeg","src":"YouTube"},{"y":2023,"m":"July","n":"Aliyah Johnson","s":"Kennesaw State University (from Conyers, Georgia)","v":"dFc2HvtxlD4","src":"YouTube"},{"y":2023,"m":"August","n":"Edward Washington III","s":"MIT — Finance (from Chicago south side)","v":"i4ogBoSJLCk","src":"YouTube"},{"y":2023,"m":"September","n":"Tonie Washington","s":"Morris Brown College","v":"_oICCQOTPGs","src":"YouTube"},{"y":2023,"m":"October","n":"Joanna Adjei","s":"Loyola University Chicago","v":"Ox9clqiZZ4s","src":"YouTube"},{"y":2023,"m":"November","n":"Jaelon Nesbarry","s":"Xavier University of Louisiana — freshman, business management → financial analyst / upper-level tech","src":"LinkedIn/IG/FB"},{"y":2023,"m":"December","n":"Emmanuel Epongo Jr.","s":"Howard University — Business","v":"HstU2xOF-7o","src":"YouTube"},{"y":2024,"m":"January","n":"Kwabena Tyus","s":"School Without Walls, Washington, DC","v":"zVMN2_Y1Smg","src":"YouTube"},{"y":2024,"m":"March","n":"Israel \"Izzy\" Lewis","s":"Charlotte Christian School, Charlotte, NC → Wheaton College","v":"bDFKWggpihw","src":"YouTube"},{"y":2024,"m":"April","n":"Layla Williams","s":"Presented in person at P3's 1st annual fundraising gala May 2024","src":"LinkedIn/IG/FB"},{"y":2024,"m":"May","n":"Aryel Mason","src":"LinkedIn/IG/FB"},{"y":2024,"m":"June","n":"Isaac Hall","s":"Mild-mannered, observant — \"empowered\"","src":"LinkedIn/IG/FB"},{"y":2024,"m":"August","n":"Caleb Montgomery","s":"Leo High School (Chicago) → Saint Louis University — Business","v":"LsexY42_6bs","src":"YouTube"},{"y":2024,"m":"September","n":"Annie Givhan","s":"Howard University — Advertising (from Los Angeles)","v":"pU75mXpkEz8","src":"YouTube"},{"y":2024,"m":"October","n":"Brandon Henderson","s":"Long Beach, California native","src":"LinkedIn/IG/FB"},{"y":2024,"m":"November","n":"Angel Ortiz","s":"Howard University — Computer Information Systems major","src":"LinkedIn/IG/FB"},{"y":2024,"m":"December","n":"Kara Lewis","s":"McDonough, GA (originally Florida) → Ola HS — future trauma surgeon; BSU President","src":"LinkedIn/IG/FB"},{"y":2025,"m":"January","n":"Daniel Osuchukwu","s":"Towson University — Information Technology (PG County, MD)","v":"RbDnMQodVRA","src":"YouTube"},{"y":2025,"m":"February","n":"Ornella Parker","s":"Ascend Public Charter School → Vanderbilt Univ. (Brooklyn, NY)","v":"d8_lamZHoIw","src":"YouTube"},{"y":2025,"m":"March","n":"Nohman Sohail","s":"Born in Brooklyn","src":"LinkedIn/IG/FB"},{"y":2025,"m":"April","n":"Justin Harris","s":"Talented DJ","src":"LinkedIn/IG/FB"},{"y":2025,"m":"May","n":"Ian Dunn","s":"Leo Catholic High School","src":"LinkedIn/IG/FB"},{"y":2025,"m":"June","n":"Daniel Jackson","s":"Leo Catholic High School — recent graduate","src":"LinkedIn/IG/FB"},{"y":2025,"m":"July","n":"Joshua Smith","s":"Honor roll scholar; 2024 Top Teens of America Changemaker of the Year; 100+ volunteer hours","src":"LinkedIn/IG/FB"},{"y":2025,"m":"August","n":"Carlin Henry","s":"Leo Catholic HS → Eastern Illinois University — Mech. Eng.","v":"tAup5WllKpk","src":"YouTube"},{"y":2025,"m":"September","n":"Jeremy Coleman","s":"Univ. of Maryland Eastern Shore — CS/Volleyball (Central IL)","v":"qvLIPSLhLUg","src":"YouTube"},{"y":2025,"m":"October","n":"La'Darrius Devonte Irvin","s":"Southern University — biology; football coach; volunteer firefighter; aspiring cardiologist","src":"LinkedIn/IG/FB"},{"y":2025,"m":"November","n":"Kaitlin Phenix","src":"LinkedIn/IG/FB"},{"y":2025,"m":"December","n":"Akira Lawrence","s":"Frazier Mountain High School, Lebec, California","v":"ygDx7VAO9XM","src":"YouTube"},{"y":2026,"m":"January","n":"Jaland Green","s":"Raised in South Central L.A.","src":"LinkedIn/IG/FB"},{"y":2026,"m":"February","n":"Leah O'Brien","s":"Raised by a hardworking single mother in a Caribbean family","v":"piQ594-b11E","src":"YT video + social (name from social)"}];

var SCH_FAQS = [
  {
    q: 'Who can apply, and how?',
    a: 'Any U.S.-based <strong>HS student (grades 9&ndash;12)</strong> or <strong>currently enrolled undergraduate college student</strong> who is active on the P3 app and embodies the <strong>#pulseofperseverance</strong> can apply. We look closely at authenticity, ambition, and engagement with your mentor &mdash; not grades or prestige.<br/><br/>Applications are due on the <strong>1st of every month</strong>. Scroll up to the <a href="#apply">application form</a> on this page and fill in every required field &mdash; including a 250-word essay, a 60-second video, and a link to your transcript.'
  },
  {
    q: 'Do I have to be on the P3 app to apply?',
    a: 'Yes. You must be registered on the P3 <a href="/download">mobile app</a> and connected to a mentor. Engaged mentees have a higher chance of being selected.'
  },
  {
    q: 'What should my 60-second video include?',
    a: 'Record vertical video from your phone and speak directly to us about why you possess the <strong>#pulseofperseverance</strong> and what this scholarship would mean to you. Note: videos become the property of Pulse of Perseverance and may be posted on our social channels.'
  },
  {
    q: 'How much is the scholarship worth?',
    a: 'Awards vary by month and recipient. HS scholarships help with school fees, supplies, uniforms, and college application fees. College scholarships help with books, fees, and advanced-degree applications. We&rsquo;ve awarded over $100,000 since 2018.'
  },
  {
    q: 'When will I know if I won, and when do I get paid?',
    a: 'Winners are announced on a rolling basis each month via our website and social media. If you apply one month and don&rsquo;t see your name, stick around &mdash; we re-review applications throughout the year.<br/><br/>All scholarship checks are sent within <strong>14 business days</strong> after the public announcement of the winner, once you&rsquo;ve submitted all required documentation to claim the award.'
  },
  {
    q: 'Can I apply more than once?',
    a: 'Yes &mdash; new winners are announced every month, so there are many opportunities to be selected. If you didn&rsquo;t win in a prior month, you can reapply in future months.'
  }
];

/* -------- Nav scroll-darken + hamburger toggle --------
   Apr 23, 2026 (R7e): wiring matches fs-combined.js (lines 438-460) verbatim.
   IDs switched to #hamburger + #pp-mob-overlay so FS selectors apply 1:1.
   Scroll threshold bumped 50→50 to match FS behavior (was 30 in prior iterations). */
(function() {
  var nav = document.querySelector('.p3-nav');
  window.addEventListener('scroll', function() {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  var hamburger = document.getElementById('hamburger');
  var mobOverlay = document.getElementById('pp-mob-overlay');
  if (hamburger && mobOverlay) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('open');
      mobOverlay.classList.toggle('open');
      document.body.style.overflow = mobOverlay.classList.contains('open') ? 'hidden' : '';
    });
    mobOverlay.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() {
        hamburger.classList.remove('open');
        mobOverlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
})();

/* -------- Utility helpers -------- */
function esc(str) {
  if (str == null) return '';
  return String(str).replace(/[&<>"']/g, function(c) {
    return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c];
  });
}

/* -------- Remote winners feed (Option A — R8f, Apr 24) --------
   Fetch winners.json from GitHub Pages on every page load. If it succeeds, replace
   the embedded SCH_WINNERS fallback above and fire every registered re-render so
   Recent Winners + All Past Winners pick up the new data. Thomas's monthly workflow:
   edit winners.json in the GitHub repo, commit, done — no sch-combined.js push needed
   for winner list updates. The embedded array remains as the failsafe if GitHub or
   the fetch ever errors. Cache-buster uses today's date (not Date.now) so repeated
   loads on the same day hit the CDN cache (not every load pulls fresh). */
var SCH_REFRESH_CALLBACKS = [];
function registerWinnersRefresh(fn) { SCH_REFRESH_CALLBACKS.push(fn); }
(function fetchRemoteWinners() {
  var url = 'https://tparis7.github.io/Scholarships-Page/winners.json?v=' + (new Date()).toISOString().slice(0,10);
  try {
    fetch(url, { cache: 'no-cache' })
      .then(function(r) { return r.ok ? r.json() : Promise.reject('http ' + r.status); })
      .then(function(data) {
        if (!Array.isArray(data) || !data.length) return;
        SCH_WINNERS = data;
        SCH_REFRESH_CALLBACKS.forEach(function(fn) { try { fn(); } catch (e) { /* per-callback swallow */ } });
      })
      .catch(function() { /* silent — embedded SCH_WINNERS remains */ });
  } catch (e) { /* older browsers w/o fetch: same silent fallback */ }
})();

/* -------- Winner Spotlight — YouTube grid + year filter -------- */
(function() {
  var grid = document.getElementById('spotGrid');
  var filters = document.getElementById('spotFilters');
  if (!grid || !filters) return;

  // Only winners with a YouTube video ID for the spotlight reel.
  var withVideo = SCH_WINNERS.filter(function(w) { return w.v; });
  // Newest first.
  withVideo.sort(function(a, b) {
    if (a.y !== b.y) return b.y - a.y;
    var order = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    return order.indexOf(b.m) - order.indexOf(a.m);
  });

  var years = Array.from(new Set(withVideo.map(function(w){return w.y;}))).sort(function(a,b){return b-a;});
  var activeYear = 'all';

  function renderFilters() {
    var html = '<button class="spot-chip ' + (activeYear === 'all' ? 'active' : '') + '" data-year="all">All years</button>';
    years.forEach(function(y) {
      html += '<button class="spot-chip ' + (activeYear == y ? 'active' : '') + '" data-year="' + y + '">' + y + '</button>';
    });
    filters.innerHTML = html;
    filters.querySelectorAll('.spot-chip').forEach(function(c) {
      c.addEventListener('click', function() {
        var v = this.getAttribute('data-year');
        activeYear = v === 'all' ? 'all' : parseInt(v, 10);
        renderFilters();
        renderGrid();
      });
    });
  }

  function renderGrid() {
    var list = activeYear === 'all' ? withVideo.slice(0, 9) : withVideo.filter(function(w){return w.y === activeYear;});
    // Toggle `.all-years` class so CSS can hide the 9th card on mobile (keeps 2x4=8 grid).
    if (activeYear === 'all') grid.classList.add('all-years'); else grid.classList.remove('all-years');
    if (!list.length) {
      grid.innerHTML = '<div style="grid-column:1/-1; padding:48px; text-align:center; color:var(--sch-muted);">No video winners in this year yet.</div>';
      return;
    }
    grid.innerHTML = list.map(function(w) {
      // Use the medium-quality YouTube thumbnail so the grid stays fast.
      var thumb = 'https://i.ytimg.com/vi/' + w.v + '/hqdefault.jpg';
      return (
        '<article class="spot-card" data-video="' + esc(w.v) + '" data-name="' + esc(w.n) + '">' +
          '<div class="spot-thumb" role="button" tabindex="0" aria-label="Play ' + esc(w.m) + ' ' + w.y + ' scholarship winner">' +
            '<img src="' + thumb + '" alt="" loading="lazy" onerror="this.onerror=null;this.src=\'https://i.ytimg.com/vi/' + esc(w.v) + '/mqdefault.jpg\';" />' +
            '<div class="spot-play" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div>' +
          '</div>' +
          '<div class="spot-meta">' +
            '<div class="spot-date">' + esc(w.m) + ' ' + w.y + '</div>' +
            '<div class="spot-name">' + esc(w.n) + '</div>' +
          '</div>' +
        '</article>'
      );
    }).join('');
    grid.querySelectorAll('.spot-card').forEach(function(card) {
      var vid = card.getAttribute('data-video');
      var open = function() { openLightbox(vid); };
      card.querySelector('.spot-thumb').addEventListener('click', open);
      card.querySelector('.spot-thumb').addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
      });
    });
  }

  renderFilters();
  renderGrid();

  // R8f: re-render when winners.json fetch resolves with fresh data
  registerWinnersRefresh(function() {
    withVideo = SCH_WINNERS.filter(function(w) { return w.v; });
    withVideo.sort(function(a, b) {
      if (a.y !== b.y) return b.y - a.y;
      var order = ['January','February','March','April','May','June','July','August','September','October','November','December'];
      return order.indexOf(b.m) - order.indexOf(a.m);
    });
    years = Array.from(new Set(withVideo.map(function(w){return w.y;}))).sort(function(a,b){return b-a;});
    activeYear = 'all';
    renderFilters();
    renderGrid();
  });
})();

/* -------- Lightbox -> YouTube direct-open --------
   Error 153 root causes: (1) some of the winner videos have embedding restricted by the
   uploader; (2) file:// origin + iframe embeds trigger stricter YouTube policies;
   (3) even youtube-nocookie doesn't help when either (1) or (2) is true.
   The reliable fix is to open the video on youtube.com/watch in a new tab, which has
   no embed gate. Keeps the poster-click UX; only the playback surface changes. */
function openLightbox(videoId) {
  window.open('https://www.youtube.com/watch?v=' + videoId, '_blank', 'noopener,noreferrer');
}
(function() {
  var lb = document.getElementById('spotLightbox');
  if (!lb) return;
  function close() {
    lb.classList.remove('open');
    document.getElementById('spotLightboxFrame').innerHTML = '';
    document.body.style.overflow = '';
  }
  document.getElementById('spotLightboxClose').addEventListener('click', close);
  lb.addEventListener('click', function(e) { if (e.target === lb) close(); });
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape' && lb.classList.contains('open')) close(); });
})();

/* -------- All Past Winners — year-sidebar + list -------- */
(function() {
  var side = document.getElementById('pastwSide');
  var list = document.getElementById('pastwList');
  if (!side || !list) return;

  var PAGE_SIZE = 10;
  var years = Array.from(new Set(SCH_WINNERS.map(function(w){return w.y;}))).sort(function(a,b){return b-a;});
  var counts = {};
  SCH_WINNERS.forEach(function(w){ counts[w.y] = (counts[w.y]||0) + 1; });
  var activeYear = 'all';
  var page = 1;

  function renderSide() {
    var html = '<div class="label">Filter by year</div>';
    html += '<button class="pastw-year-btn ' + (activeYear==='all'?'active':'') + '" data-year="all">All years <span class="count">' + SCH_WINNERS.length + '</span></button>';
    years.forEach(function(y) {
      html += '<button class="pastw-year-btn ' + (activeYear==y?'active':'') + '" data-year="' + y + '">' + y + ' <span class="count">' + counts[y] + '</span></button>';
    });
    side.innerHTML = html;
    side.querySelectorAll('.pastw-year-btn').forEach(function(b) {
      b.addEventListener('click', function() {
        var v = this.getAttribute('data-year');
        activeYear = v === 'all' ? 'all' : parseInt(v, 10);
        page = 1;
        renderSide();
        renderList();
      });
    });
  }

  function renderList() {
    var items = activeYear === 'all' ? SCH_WINNERS.slice() : SCH_WINNERS.filter(function(w){return w.y === activeYear;});
    // Sort newest first
    items.sort(function(a,b) {
      if (a.y !== b.y) return b.y - a.y;
      var order = ['January','February','March','April','May','June','July','August','September','October','November','December'];
      return order.indexOf(b.m) - order.indexOf(a.m);
    });
    if (!items.length) {
      list.innerHTML = '<div class="pastw-empty">No winners for this year.</div>';
      return;
    }
    var total = items.length;
    var totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    if (page > totalPages) page = totalPages;
    var start = (page - 1) * PAGE_SIZE;
    var pageItems = items.slice(start, start + PAGE_SIZE);

    var rowsHtml = pageItems.map(function(w) {
      var watchHtml = w.v
        ? '<a class="watch" href="#" data-video="' + esc(w.v) + '" aria-label="Watch video for ' + esc(w.n) + '">' +
            '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg> Watch</a>'
        : '<span class="no-video">Social spotlight</span>';
      return (
        '<div class="pastw-row">' +
          '<div class="when">' + esc(w.m) + ' ' + w.y + '</div>' +
          '<div class="who"><h4>' + esc(w.n) + '</h4></div>' +
          watchHtml +
        '</div>'
      );
    }).join('');

    // Pagination controls
    var pagerHtml = '';
    if (totalPages > 1) {
      var from = start + 1;
      var to = Math.min(start + PAGE_SIZE, total);
      pagerHtml = '<div class="pastw-pager">' +
        '<div class="pastw-pager-info">Showing <strong>' + from + '&ndash;' + to + '</strong> of ' + total + '</div>' +
        '<div class="pastw-pager-ctrls">' +
          '<button class="pastw-pg-btn" data-pg="prev" ' + (page === 1 ? 'disabled' : '') + ' aria-label="Previous page">' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>' +
          '</button>';
      // page number buttons (show all if ≤7 pages, else condense)
      var nums = [];
      if (totalPages <= 7) {
        for (var i = 1; i <= totalPages; i++) nums.push(i);
      } else {
        nums.push(1);
        if (page > 3) nums.push('…');
        for (var j = Math.max(2, page - 1); j <= Math.min(totalPages - 1, page + 1); j++) nums.push(j);
        if (page < totalPages - 2) nums.push('…');
        nums.push(totalPages);
      }
      nums.forEach(function(n) {
        if (n === '…') {
          pagerHtml += '<span class="pastw-pg-ellipsis">…</span>';
        } else {
          pagerHtml += '<button class="pastw-pg-btn ' + (n === page ? 'active' : '') + '" data-pg="' + n + '">' + n + '</button>';
        }
      });
      pagerHtml += '<button class="pastw-pg-btn" data-pg="next" ' + (page === totalPages ? 'disabled' : '') + ' aria-label="Next page">' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>' +
          '</button>' +
        '</div>' +
      '</div>';
    }

    list.innerHTML = rowsHtml + pagerHtml;

    list.querySelectorAll('a.watch').forEach(function(a) {
      a.addEventListener('click', function(e) {
        e.preventDefault();
        openLightbox(this.getAttribute('data-video'));
      });
    });
    list.querySelectorAll('.pastw-pg-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        if (this.hasAttribute('disabled')) return;
        var v = this.getAttribute('data-pg');
        if (v === 'prev') page = Math.max(1, page - 1);
        else if (v === 'next') page = Math.min(totalPages, page + 1);
        else page = parseInt(v, 10);
        renderList();
        // Scroll back to section top so the new page is visible
        var sec = document.getElementById('all-winners');
        if (sec) window.scrollTo({ top: sec.offsetTop - 80, behavior: 'smooth' });
      });
    });
  }

  renderSide();
  renderList();

  // R8f: re-render All Past Winners when winners.json fetch resolves with fresh data
  registerWinnersRefresh(function() {
    years = Array.from(new Set(SCH_WINNERS.map(function(w){return w.y;}))).sort(function(a,b){return b-a;});
    counts = {};
    SCH_WINNERS.forEach(function(w){ counts[w.y] = (counts[w.y]||0) + 1; });
    activeYear = 'all';
    page = 1;
    renderSide();
    renderList();
  });
})();

/* -------- FAQ accordion (closed by default, one-at-a-time) -------- */
(function() {
  var wrap = document.getElementById('faqList');
  if (!wrap) return;
  wrap.innerHTML = SCH_FAQS.map(function(f, i) {
    return (
      '<div class="faq-item" data-i="' + i + '">' +
        '<button class="faq-q" aria-expanded="false" aria-controls="faq-a-' + i + '">' +
          '<span>' + esc(f.q) + '</span>' +
          '<span class="faq-chev" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></span>' +
        '</button>' +
        '<div class="faq-a" id="faq-a-' + i + '" role="region"><div class="faq-a-inner">' + f.a + '</div></div>' +
      '</div>'
    );
  }).join('');
  wrap.querySelectorAll('.faq-item').forEach(function(item) {
    var btn = item.querySelector('.faq-q');
    btn.addEventListener('click', function() {
      var open = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      // One-at-a-time behavior: close siblings
      if (open) {
        wrap.querySelectorAll('.faq-item').forEach(function(other) {
          if (other !== item) {
            other.classList.remove('open');
            other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
          }
        });
      }
    });
  });
})();

/* -------- Form submission — routes to EXISTING Webflow form collector + Zapier + Retool
   Apr 24 R8d: POSTs to Webflow's internal form endpoint with the same pageId + elementId
   that the live /apply-for-scholarship form uses, so the existing Zapier integration picks
   up the submission and pushes to Retool with zero pipeline changes. Captured the exact
   endpoint + payload shape by intercepting a live submission on /apply-for-scholarship.
   Validation still uses browser HTML5 (checkValidity) so type=email / required catch the
   obvious user errors before we fire the POST. */
(function() {
  var form = document.getElementById('wf-form-Scholarship-Application');
  if (!form) return;
  var WF_SITE_ID = '69b02f65f0068e9fb16f09f7';
  var WF_PAGE_ID = '69b02f65f0068e9fb16f0af0';        // apply-for-scholarship — where Zapier is wired
  var WF_ELEMENT_ID = 'cec27ca6-5ea0-2df6-a288-1a8528599bec';
  var WF_FORM_NAME = 'Scholarship Application';
  var WF_DOMAIN = 'www.pulseofp3.org';
  var ENDPOINT = 'https://webflow.com/api/v1/form/' + WF_SITE_ID;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var succ = document.getElementById('appSuccess');
    var err = document.getElementById('appError');
    succ.classList.remove('show');
    err.classList.remove('show');
    // Browser HTML5 validation first — catches missing required / invalid email / etc.
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Build the form-encoded body Webflow expects. Field keys use `data-name` attr
    // (human-readable) not `name` attr — that's how the internal endpoint routes fields.
    var parts = [
      'name=' + encodeURIComponent(WF_FORM_NAME),
      'pageId=' + encodeURIComponent(WF_PAGE_ID),
      'elementId=' + encodeURIComponent(WF_ELEMENT_ID),
      'domain=' + encodeURIComponent(WF_DOMAIN),
      'collectionId=',
      'itemSlug=',
      'source=' + encodeURIComponent(location.href),
      'test=false',
    ];
    form.querySelectorAll('input, textarea, select').forEach(function(el) {
      if (!el.name) return;
      var key = el.getAttribute('data-name') || el.name;
      var val;
      if (el.type === 'checkbox') { val = el.checked ? 'true' : 'false'; }
      else if (el.type === 'radio') { if (!el.checked) return; val = el.value; }
      else { val = el.value; }
      // Webflow's native forms on /apply-for-scholarship double-encode the field key on
      // the wire, but verified Apr 24 that Webflow accepts single-encoded keys too —
      // Thomas's staging submission landed in the Forms panel with all fields mapped
      // correctly via single-encoded. Keep single-encoding (simpler + proven working).
      parts.push('fields%5B' + encodeURIComponent(key) + '%5D=' + encodeURIComponent(val));
    });
    var body = parts.join('&');

    // Disable the submit button while in-flight so users can't double-submit.
    var btn = form.querySelector('button[type=submit], input[type=submit]');
    var origLabel = btn ? btn.innerHTML : null;
    if (btn) { btn.disabled = true; btn.innerHTML = 'Submitting&hellip;'; }

    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'Accept': 'application/json' },
      body: body,
    }).then(function(res) {
      if (btn) { btn.disabled = false; btn.innerHTML = origLabel; }
      if (res.ok) {
        succ.classList.add('show');
        succ.scrollIntoView({ behavior: 'smooth', block: 'center' });
        form.reset();
      } else {
        err.textContent = 'Something went wrong while submitting (status ' + res.status + '). Please try again or email us at help@pulseofp3.org.';
        err.classList.add('show');
        err.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }).catch(function(e) {
      if (btn) { btn.disabled = false; btn.innerHTML = origLabel; }
      err.textContent = 'Network error: ' + (e && e.message ? e.message : 'could not reach server') + '. Please try again or email help@pulseofp3.org.';
      err.classList.add('show');
      err.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });
})();


/* --- Hero CTA: Watch Winner Stories → scroll to #winners with nav offset
   Native href="#winners" was landing under the fixed nav (~64–80px),
   which made the click look like it did nothing. Match the existing
   pattern used by the "View all winners" link for #all-winners. */
document.addEventListener('click', function(e){
  var a = e.target && e.target.closest && e.target.closest('a[href="#winners"]');
  if (!a) return;
  var sec = document.getElementById('winners');
  if (!sec) return;
  e.preventDefault();
  window.scrollTo({ top: sec.offsetTop - 80, behavior: 'smooth' });
});

})();
