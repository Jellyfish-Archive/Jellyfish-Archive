(function () {
  if (window.matchMedia('(max-width: 768px)').matches) {
    document.querySelector('[data-site-radio]')?.remove();
    return;
  }

  const style = document.createElement('style');
  style.textContent = `
    .site-radio-launcher{position:fixed;right:28px;bottom:116px;z-index:47;width:118px;display:flex;flex-direction:column;align-items:center;gap:3px;padding:0;border:0;background:transparent;color:#fff7c7;text-decoration:none;cursor:pointer;animation:siteRadioFloat 4s ease-in-out infinite}
    .site-radio-launcher img{display:block;width:96px;height:82px;object-fit:contain;filter:drop-shadow(0 0 8px rgba(255,244,185,.72)) drop-shadow(0 0 18px rgba(255,141,213,.45));transition:transform .25s ease,filter .25s ease}
    .site-radio-launcher span{padding:5px 9px;border:1px solid rgba(255,232,145,.68);border-radius:999px;background:rgba(53,10,42,.88);color:#fff7c7;font:900 10px/1.1 'Helvetica Neue',Arial,sans-serif;letter-spacing:.045em;white-space:nowrap;box-shadow:0 4px 12px rgba(35,4,27,.42),0 0 10px rgba(255,211,104,.3);text-shadow:0 1px 3px rgba(20,0,15,.95)}
    .site-radio-launcher:hover img,.site-radio-launcher:focus-visible img{transform:scale(1.09);filter:drop-shadow(0 0 11px rgba(255,250,195,.92)) drop-shadow(0 0 25px rgba(255,132,211,.68))}
    .site-radio-launcher:focus-visible{outline:2px solid #fff3ad;outline-offset:7px;border-radius:18px}
    @keyframes siteRadioFloat{50%{translate:0 -7px}}
  `;
  document.head.append(style);

  let launcher = document.querySelector('[data-site-radio]');
  if (!launcher) {
    launcher = document.createElement('button');
    launcher.type = 'button';
    launcher.className = 'site-radio-launcher';
    launcher.setAttribute('data-site-radio', '');
    launcher.setAttribute('aria-label', 'Open Jelly-Radio');
    launcher.innerHTML = '<img src="media/jellyradio-icon.png" alt=""><span>Jelly-Radio! Listen now!</span>';
    document.body.append(launcher);
  } else {
    launcher.classList.add('site-radio-launcher');
  }

  launcher.addEventListener('click', event => {
    event.preventDefault();
    const radioUrl = new URL('jellytunes.html?radio=1', location.href).href;
    const radioWindow = window.open('', 'jellyfishRadio', 'popup=yes,width=480,height=760,resizable=yes,scrollbars=yes');
    if (!radioWindow) {
      location.href = radioUrl;
      return;
    }
    try {
      if (!radioWindow.location.href || radioWindow.location.href === 'about:blank') radioWindow.location.href = radioUrl;
      radioWindow.focus();
    } catch (error) {
      radioWindow.location.href = radioUrl;
    }
  });
})();
