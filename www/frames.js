/* Cadres illustrés du Photobooth.
   Chaque cadre : foot [bande, 1 photo] = hauteur du bas, top = marge haute en plus,
   ty/sy = position verticale du titre / sous-titre dans le bas (0..1), tw = largeur max du titre,
   ts/ss = tailles du titre / sous-titre [bande, 1 photo], frame = fond et filet autour des photos,
   pattern() = motif de fond, under() = dessiné sous les photos, deco() = décor par-dessus, after() = après le texte. */
(function () {
  const TAU = Math.PI * 2;
  const rng = s => () => (s = (s * 16807) % 2147483647) / 2147483647;
  const circle = (x, cx, cy, r, col) => { x.fillStyle = col; x.beginPath(); x.arc(cx, cy, r, 0, TAU); x.fill(); };
  const ell = (x, cx, cy, rx, ry, col, rot) => { x.fillStyle = col; x.beginPath(); x.ellipse(cx, cy, rx, ry, rot || 0, 0, TAU); x.fill(); };
  const shadow = (x, r) => { x.shadowColor = '#3a1a1040'; x.shadowBlur = r * .18; x.shadowOffsetY = r * .07; };
  const noShadow = x => { x.shadowColor = 'transparent'; x.shadowBlur = 0; x.shadowOffsetY = 0; };

  function leaf(x, cx, cy, len, rot, col) {
    x.save(); x.translate(cx, cy); x.rotate(rot);
    x.fillStyle = col || '#5e9a52';
    x.beginPath(); x.moveTo(0, 0);
    x.quadraticCurveTo(len * .5, -len * .38, len, 0); x.quadraticCurveTo(len * .5, len * .38, 0, 0); x.fill();
    x.strokeStyle = '#3f7a3a'; x.lineWidth = Math.max(1, len * .035);
    x.beginPath(); x.moveTo(len * .05, 0); x.quadraticCurveTo(len * .5, -len * .04, len * .9, 0); x.stroke();
    x.restore();
  }
  function heart(x, cx, cy, s, col) {
    x.save(); x.translate(cx, cy); x.fillStyle = col;
    x.beginPath(); x.moveTo(0, s * .35);
    x.bezierCurveTo(-s * 1.2, -s * .4, -s * .5, -s * 1.2, 0, -s * .45);
    x.bezierCurveTo(s * .5, -s * 1.2, s * 1.2, -s * .4, 0, s * .35); x.fill();
    x.restore();
  }
  function star(x, cx, cy, r, col) {
    x.fillStyle = col; x.beginPath();
    for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * .45 : r; x.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr); }
    x.closePath(); x.fill();
  }

  /* ===================== PAMPLEMOUSSE ===================== */
  function gfHalf(x, cx, cy, r, rot) {
    x.save(); x.translate(cx, cy); x.rotate(rot || 0);
    shadow(x, r); circle(x, 0, 0, r, '#f6a04d'); noShadow(x);
    circle(x, 0, 0, r * .9, '#ffe8d2');
    const n = 11, st = TAU / n;
    for (let i = 0; i < n; i++) {
      const a = i * st;
      x.fillStyle = i % 2 ? '#f2557a' : '#ff6b8e';
      x.beginPath(); x.moveTo(Math.cos(a + st / 2) * r * .1, Math.sin(a + st / 2) * r * .1);
      x.arc(0, 0, r * .82, a + .07, a + st - .07); x.closePath(); x.fill();
      ell(x, Math.cos(a + st / 2) * r * .55, Math.sin(a + st / 2) * r * .55, r * .045, r * .12, '#ffc2d2', a + st / 2);
    }
    circle(x, 0, 0, r * .08, '#ffe8d2');
    x.restore();
  }
  function gfWhole(x, cx, cy, r) {
    leaf(x, cx + r * .1, cy - r * .85, r * .95, -0.5);
    leaf(x, cx + r * .05, cy - r * .85, r * .75, -2.2, '#6fae5f');
    x.save(); x.translate(cx, cy); shadow(x, r);
    const g = x.createRadialGradient(-r * .35, -r * .4, r * .1, 0, 0, r);
    g.addColorStop(0, '#ffd59a'); g.addColorStop(.6, '#f7a65a'); g.addColorStop(1, '#ec7f43');
    circle(x, 0, 0, r, g); noShadow(x);
    ell(x, -r * .38, -r * .42, r * .22, r * .12, '#ffffff55', -.7);
    circle(x, r * .05, -r * .97, r * .05, '#7a4a2a');
    x.restore();
  }
  const grapefruit = {
    foot: [290, 400], top: 0, ty: .45, sy: .72, tw: .58, ts: [78, 130], ss: [22, 36],
    frame: { bg: '#ffffff', line: '#f4a876' },
    pattern(x, { W, H, k }) {
      for (let yy = 20, row = 0; yy < H; yy += 46 * k, row++)
        for (let xx = row % 2 ? 23 * k : 0; xx < W; xx += 46 * k) circle(x, xx, yy, 2.6 * k, '#fbd9c0');
    },
    deco(x, { W, P, fy, foot, k }) {
      leaf(x, 18 * k, 70 * k, 90 * k, -0.2); leaf(x, 70 * k, 14 * k, 80 * k, 0.9, '#6fae5f');
      gfHalf(x, 26 * k, 26 * k, 62 * k, .3);
      leaf(x, W - 20 * k, 72 * k, 80 * k, Math.PI + .25); leaf(x, W - 75 * k, 16 * k, 70 * k, Math.PI - .8, '#6fae5f');
      gfHalf(x, W - 28 * k, 30 * k, 42 * k, -.4);
      leaf(x, P + 40 * k, fy + foot * .62, 110 * k, -2.6); leaf(x, P + 30 * k, fy + foot * .6, 95 * k, -0.4, '#6fae5f');
      gfHalf(x, P + 42 * k, fy + foot * .6, 72 * k, .5);
      gfWhole(x, W - P - 50 * k, fy + foot * .62, 58 * k);
      gfHalf(x, W - P - 5 * k, fy + foot * .85, 34 * k, -.2);
      [[.3, .2], [.7, .18], [.22, .92], [.78, .95], [.38, .12], [.62, .14], [.5, .1]].forEach(([u, v], i) =>
        circle(x, W * u, fy + foot * v, (i % 3 ? 4 : 6) * k, i % 2 ? '#e8773a' : '#d61f69'));
    },
    after(x, { W, fy, foot, k }) {
      heart(x, W / 2 - 70 * k, fy + foot * .86, 9 * k, '#d61f69');
      heart(x, W / 2, fy + foot * .88, 12 * k, '#e8773a');
      heart(x, W / 2 + 70 * k, fy + foot * .86, 9 * k, '#d61f69');
    }
  };

  /* ===================== TERRIERS (collines, portes rondes) ===================== */
  function roundDoor(x, cx, cy, r, col) {
    // encadrement en pierres
    circle(x, cx, cy, r * 1.2, '#b98c58');
    x.strokeStyle = '#8a6236'; x.lineWidth = r * .05;
    for (let i = 0; i < 14; i++) { const a = i * TAU / 14; x.beginPath();
      x.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); x.lineTo(cx + Math.cos(a) * r * 1.2, cy + Math.sin(a) * r * 1.2); x.stroke(); }
    // porte en planches
    x.save(); x.beginPath(); x.arc(cx, cy, r, 0, TAU); x.clip();
    x.fillStyle = col; x.fillRect(cx - r, cy - r, r * 2, r * 2);
    x.strokeStyle = '#00000030'; x.lineWidth = r * .04;
    for (let i = -2; i <= 2; i++) { x.beginPath(); x.moveTo(cx + i * r * .38, cy - r); x.lineTo(cx + i * r * .38, cy + r); x.stroke(); }
    ell(x, cx - r * .35, cy - r * .45, r * .35, r * .18, '#ffffff22', -.6);
    x.restore();
    circle(x, cx, cy, r * .1, '#6b4a1e'); circle(x, cx, cy, r * .07, '#e8c04a');
    ell(x, cx, cy + r * 1.22, r * .9, r * .16, '#a58a6a');
  }
  function roundWindow(x, cx, cy, r) {
    circle(x, cx, cy, r * 1.25, '#b98c58'); circle(x, cx, cy, r, '#ffe7a3');
    x.strokeStyle = '#7a5530'; x.lineWidth = r * .14;
    x.beginPath(); x.moveTo(cx - r, cy); x.lineTo(cx + r, cy); x.moveTo(cx, cy - r); x.lineTo(cx, cy + r); x.stroke();
  }
  function flowers(x, seed, n, xmin, xmax, yTop, yBot, k) {
    const R = rng(seed), cols = ['#e85d75', '#f6c445', '#ffffff', '#b07be0'];
    for (let i = 0; i < n; i++) {
      const fx = xmin + R() * (xmax - xmin), fy = yTop + R() * (yBot - yTop), r = (2.5 + R() * 2) * k, c = cols[i % 4];
      for (let p = 0; p < 5; p++) { const a = p * TAU / 5; circle(x, fx + Math.cos(a) * r, fy + Math.sin(a) * r, r * .7, c); }
      circle(x, fx, fy, r * .6, '#f4b33a');
    }
  }
  function vine(x, sx, sy, dir, len, k) {
    x.strokeStyle = '#5e8a3a'; x.lineWidth = 4 * k; x.lineCap = 'round';
    x.beginPath(); x.moveTo(sx, sy);
    x.bezierCurveTo(sx + dir * len * .35, sy + len * .05, sx + dir * len * .6, sy + len * .4, sx + dir * len * .45, sy + len);
    x.stroke();
    for (let t = .12; t < 1; t += .17) {
      const lx = sx + dir * len * (.35 * 3 * t * (1 - t) ** 2 + .6 * 3 * t * t * (1 - t) + .45 * t ** 3) / 1,
        ly = sy + len * (.05 * 3 * t * (1 - t) ** 2 + .4 * 3 * t * t * (1 - t) + t ** 3);
      leaf(x, lx, ly, 26 * k, (t * 10 % 2 > 1 ? .4 : 2.6) * (dir > 0 ? 1 : -1) + (dir > 0 ? 0 : Math.PI), t * 10 % 2 > 1 ? '#6fae5f' : '#5e9a52');
    }
  }
  const burrow = {
    foot: [340, 480], top: 0, ty: .17, sy: .31, tw: .8, ts: [50, 84], ss: [21, 34],
    frame: { bg: '#fffaf0', line: '#8a5a2b' },
    pattern(x, { W, H, k }) {
      const R = rng(7);
      for (let i = 0; i < W * H / (5000 * k * k); i++) circle(x, R() * W, R() * H, (1 + R() * 2) * k, '#e7dcb8');
    },
    deco(x, { W, H, foot, k }) {
      vine(x, 0, 0, 1, 150 * k, k); vine(x, W, 0, -1, 150 * k, k);
      // collines du fond
      ell(x, W * .26, H + foot * .06, W * .55, foot * .64, '#9cc37a');
      ell(x, W * .8, H + foot * .1, W * .52, foot * .6, '#86b464');
      // cheminée et fumée sur la colline de droite
      x.fillStyle = '#8b6b5a'; x.fillRect(W * .58, H - foot * .5, 18 * k, 40 * k);
      x.fillStyle = '#6e5446'; x.fillRect(W * .58 - 3 * k, H - foot * .5, 24 * k, 7 * k);
      [[0, 0, 9], [10, -20, 12], [2, -46, 15]].forEach(([dx, dy, r]) => circle(x, W * .58 + 9 * k + dx * k, H - foot * .52 + dy * k, r * k, '#ffffffcc'));
      flowers(x, 3, 22, W * .02, W * .98, H - foot * .4, H - foot * .03, k);
      // portes et fenêtres
      roundDoor(x, W * .27, H - foot * .27, foot * .155, '#2f6b3a');
      roundWindow(x, W * .47, H - foot * .33, foot * .055);
      roundWindow(x, W * .08, H - foot * .3, foot * .05);
      roundDoor(x, W * .74, H - foot * .24, foot * .13, '#e0a83a');
      roundWindow(x, W * .9, H - foot * .28, foot * .05);
      // petite clôture
      x.fillStyle = '#9b7348';
      for (let i = 0; i < 4; i++) x.fillRect(W * .44 + i * 14 * k, H - foot * .14, 5 * k, 26 * k);
      x.fillRect(W * .44 - 4 * k, H - foot * .11, 52 * k, 4 * k);
      // herbe devant + fleurs
      ell(x, W * .5, H + foot * .36, W * .72, foot * .38, '#6fa24f');
      flowers(x, 9, 8, W * .02, W * .98, H - foot * .05, H - foot * .01, k);
    }
  };

  /* ===================== KAWAII ===================== */
  function kawaii(x, cx, cy, r, type) {
    const line = '#5a3d4a', C = {
      lapin: ['#ffffff', '#ffb3cf'], chat: ['#ffd1a6', '#ffb08a'], ours: ['#c89b7b', '#f0c9a8'],
      poussin: ['#ffe26a', '#ffd23f'], panda: ['#ffffff', '#3b3340']
    }[type];
    x.save(); x.lineWidth = r * .06; x.strokeStyle = line;
    if (type === 'lapin') [-1, 1].forEach(s => {
      ell(x, cx + s * r * .38, cy - r * 1.15, r * .26, r * .62, C[0], s * .15); x.stroke();
      ell(x, cx + s * r * .38, cy - r * 1.12, r * .12, r * .45, C[1], s * .15);
    });
    if (type === 'chat') [-1, 1].forEach(s => {
      x.fillStyle = C[0]; x.beginPath(); x.moveTo(cx + s * r * .85, cy - r * .3); x.lineTo(cx + s * r * .7, cy - r * 1.15); x.lineTo(cx + s * r * .2, cy - r * .85); x.closePath(); x.fill(); x.stroke();
    });
    if (type === 'ours' || type === 'panda') [-1, 1].forEach(s => {
      circle(x, cx + s * r * .72, cy - r * .72, r * .32, type === 'panda' ? '#3b3340' : C[0]); x.stroke();
      if (type === 'ours') circle(x, cx + s * r * .72, cy - r * .72, r * .16, C[1]);
    });
    if (type === 'poussin') { x.strokeStyle = '#e8a91c'; x.beginPath(); x.moveTo(cx, cy - r); x.quadraticCurveTo(cx + r * .2, cy - r * 1.4, cx + r * .35, cy - r * 1.2); x.stroke(); x.strokeStyle = line; }
    x.beginPath(); x.arc(cx, cy, r, 0, TAU); x.fillStyle = C[0]; x.fill(); x.stroke();
    if (type === 'panda') [-1, 1].forEach(s => ell(x, cx + s * r * .33, cy, r * .2, r * .26, '#3b3340', s * -.5));
    [-1, 1].forEach(s => {
      circle(x, cx + s * r * .33, cy, r * .1, type === 'panda' ? '#ffffff' : '#2b2026');
      circle(x, cx + s * r * .33 - r * .03, cy - r * .04, r * .035, type === 'panda' ? '#2b2026' : '#ffffff');
      ell(x, cx + s * r * .58, cy + r * .25, r * .16, r * .1, '#ff8fb3aa');
    });
    if (type === 'poussin') {
      x.fillStyle = '#ff9a3c'; x.beginPath(); x.moveTo(cx - r * .14, cy + r * .12); x.lineTo(cx + r * .14, cy + r * .12); x.lineTo(cx, cy + r * .32); x.closePath(); x.fill();
    } else {
      x.lineWidth = r * .05; x.beginPath();
      x.arc(cx - r * .08, cy + r * .16, r * .08, 0, Math.PI); x.arc(cx + r * .08, cy + r * .16, r * .08, 0, Math.PI); x.stroke();
    }
    x.restore();
  }
  const kawaiiFrame = {
    foot: [280, 390], top: 64, ty: .26, sy: .44, tw: .8, ts: [52, 88], ss: [22, 34],
    frame: { bg: '#ffffff', line: '#ff9cc4', dash: true },
    pattern(x, { W, H, k }) {
      for (let yy = 26 * k, row = 0; yy < H; yy += 70 * k, row++)
        for (let xx = row % 2 ? 35 * k : 0; xx < W + 35 * k; xx += 70 * k)
          (row + Math.round(xx / (70 * k))) % 2 ? heart(x, xx, yy, 9 * k, '#ffc7dc') : star(x, xx, yy, 8 * k, '#ffd7a8');
    },
    under(x, { W, P, PT, k }) {     // ils dépassent derrière la 1re photo
      kawaii(x, P + 80 * k, PT - 14 * k, 40 * k, 'lapin');
      kawaii(x, W - P - 80 * k, PT - 12 * k, 38 * k, 'chat');
    },
    deco(x, { W, fy, foot, k, strip }) {
      const types = strip ? ['poussin', 'ours', 'lapin', 'panda'] : ['chat', 'poussin', 'ours', 'lapin', 'panda'];
      const r = 40 * k, gap = r * 2.55, x0 = W / 2 - gap * (types.length - 1) / 2;
      types.forEach((t, i) => kawaii(x, x0 + i * gap, fy + foot * .76, r, t));
      star(x, 26 * k, fy + foot * .12, 10 * k, '#ffd166'); star(x, W - 26 * k, fy + foot * .2, 12 * k, '#c3a6ff');
      heart(x, W * .14, fy + foot * .42, 12 * k, '#ff7eb6'); heart(x, W * .86, fy + foot * .46, 10 * k, '#ff7eb6');
    }
  };

  /* ===================== TECKEL ===================== */
  function teckel(x, x0, x1, cy, h) {
    const brown = '#a8642c', dark = '#6e3d17';
    x.save(); x.lineCap = 'round';
    // queue
    x.strokeStyle = brown; x.lineWidth = h * .18;
    x.beginPath(); x.moveTo(x0 + h * .2, cy - h * .2); x.quadraticCurveTo(x0 - h * .5, cy - h * .5, x0 - h * .55, cy - h * 1); x.stroke();
    // pattes
    x.fillStyle = dark;
    [x0 + h * .35, x0 + h * .95, x1 - h * 1.5, x1 - h * .9].forEach((lx, i) => {
      x.beginPath(); x.roundRect ? x.roundRect(lx, cy, h * .3, h * .95, h * .14) : x.rect(lx, cy, h * .3, h * .95); x.fill(); });
    // corps
    shadow(x, h * 2); x.fillStyle = brown; x.beginPath();
    x.roundRect ? x.roundRect(x0, cy - h * .5, x1 - x0, h, h * .5) : x.rect(x0, cy - h * .5, x1 - x0, h); x.fill(); noShadow(x);
    ell(x, (x0 + x1) / 2, cy + h * .22, (x1 - x0) * .4, h * .2, '#c27c3f');
    // collier
    x.fillStyle = '#d9364f'; x.fillRect(x1 - h * .45, cy - h * .55, h * .22, h * 1.0);
    circle(x, x1 - h * .34, cy + h * .52, h * .12, '#f2c14e');
    // tête
    const hx = x1 + h * .15, hy = cy - h * .55;
    circle(x, hx, hy, h * .6, brown);
    ell(x, hx + h * .65, hy + h * .18, h * .55, h * .3, brown);
    circle(x, hx + h * 1.15, hy + h * .1, h * .14, '#2b1a10');
    circle(x, hx + h * .22, hy - h * .12, h * .1, '#2b1a10'); circle(x, hx + h * .19, hy - h * .16, h * .035, '#fff');
    ell(x, hx + h * .4, hy + h * .1, h * .1, h * .06, '#ff8fa3aa');
    x.strokeStyle = '#2b1a10'; x.lineWidth = h * .05;
    x.beginPath(); x.arc(hx + h * .78, hy + h * .3, h * .14, .2, Math.PI - .4); x.stroke();
    ell(x, hx - h * .28, hy + h * .25, h * .24, h * .55, dark, .35);   // oreille
    x.restore();
  }
  function bone(x, cx, cy, len, rot, k) {
    x.save(); x.translate(cx, cy); x.rotate(rot);
    x.fillStyle = '#ffffff'; x.strokeStyle = '#c8956b'; x.lineWidth = 3 * k;
    const r = len * .16;
    x.beginPath(); x.rect(-len / 2, -r * .7, len, r * 1.4); x.fill();
    [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(([a, b]) => { x.beginPath(); x.arc(a * len / 2, b * r * .7, r, 0, TAU); x.fill(); x.stroke(); });
    x.beginPath(); x.moveTo(-len / 2, -r * .7); x.lineTo(len / 2, -r * .7); x.moveTo(-len / 2, r * .7); x.lineTo(len / 2, r * .7); x.stroke();
    x.fillRect(-len / 2, -r * .7 + 2 * k, len, r * 1.4 - 4 * k);
    x.restore();
  }
  function paw(x, cx, cy, s, col, rot) {
    x.save(); x.translate(cx, cy); x.rotate(rot || 0);
    ell(x, 0, s * .35, s * .5, s * .4, col);
    [[-.55, -.2], [-.2, -.55], [.2, -.55], [.55, -.2]].forEach(([a, b]) => ell(x, a * s, b * s, s * .2, s * .26, col));
    x.restore();
  }
  const teckelFrame = {
    foot: [290, 400], top: 0, ty: .25, sy: .45, tw: .72, ts: [50, 86], ss: [21, 34],
    frame: { bg: '#ffffff', line: '#c8956b' },
    pattern(x, { W, H, k }) {
      const R = rng(11);
      for (let yy = 30 * k; yy < H; yy += 90 * k)
        for (let xx = 30 * k; xx < W; xx += 90 * k) paw(x, xx + R() * 20 * k, yy + R() * 20 * k, 9 * k, '#f2e0c6', R() * 1.2 - .6);
    },
    deco(x, { W, fy, foot, k }) {
      bone(x, 34 * k, 30 * k, 50 * k, -.6, k); bone(x, W - 34 * k, 30 * k, 50 * k, .6, k);
      teckel(x, W * .14, W * .72, fy + foot * .74, 46 * k);
      heart(x, W * .9, fy + foot * .52, 14 * k, '#d9364f');
      paw(x, W * .08, fy + foot * .2, 12 * k, '#c8956b', -.3); paw(x, W * .92, fy + foot * .16, 12 * k, '#c8956b', .3);
    }
  };

  /* ===================== ANNIVERSAIRE BALLONS ===================== */
  function balloon(x, cx, cy, r, col, ax, ay) {
    x.strokeStyle = '#8d8d9a'; x.lineWidth = Math.max(1.2, r * .04);
    x.beginPath(); x.moveTo(cx, cy + r * 1.25); x.bezierCurveTo(cx + r * .4, cy + r * 2, ax - r * .3, ay - r, ax, ay); x.stroke();
    x.save(); shadow(x, r);
    const g = x.createRadialGradient(cx - r * .35, cy - r * .45, r * .1, cx, cy, r * 1.2);
    g.addColorStop(0, '#ffffffaa'); g.addColorStop(.25, col); g.addColorStop(1, col);
    ell(x, cx, cy, r, r * 1.18, g); noShadow(x);
    x.fillStyle = col; x.beginPath(); x.moveTo(cx, cy + r * 1.15); x.lineTo(cx - r * .14, cy + r * 1.32); x.lineTo(cx + r * .14, cy + r * 1.32); x.closePath(); x.fill();
    x.restore();
  }
  const PARTY = ['#ff5d73', '#ffd166', '#4cc9f0', '#7bdcb5', '#c77dff', '#ff9f43'];
  const balloons = {
    foot: [270, 380], top: 46, ty: .36, sy: .6, tw: .56, ts: [56, 96], ss: [21, 34],
    frame: { bg: '#ffffff', line: '#ffd166', wide: true },
    pattern(x, { W, H, k }) {
      const R = rng(5);
      for (let i = 0; i < W * H / (9000 * k * k); i++) {
        x.save(); x.translate(R() * W, R() * H); x.rotate(R() * TAU);
        x.fillStyle = PARTY[i % PARTY.length] + '88'; x.fillRect(-5 * k, -2.5 * k, 10 * k, 5 * k); x.restore();
      }
    },
    deco(x, { W, H, P, fy, foot, k }) {
      // guirlande de fanions
      const n = 12, sag = 22 * k, y0 = 8 * k;
      x.strokeStyle = '#2b2d42'; x.lineWidth = 2 * k;
      x.beginPath(); x.moveTo(0, y0); x.quadraticCurveTo(W / 2, y0 + sag * 2, W, y0); x.stroke();
      for (let i = 0; i < n; i++) {
        const t = (i + .5) / n, fx = W * t, fy0 = y0 + sag * 2 * 2 * t * (1 - t), w = W / n * .42;
        x.fillStyle = PARTY[i % PARTY.length]; x.beginPath();
        x.moveTo(fx - w, fy0); x.lineTo(fx + w, fy0); x.lineTo(fx, fy0 + w * 1.6); x.closePath(); x.fill();
      }
      // grappes de ballons
      const r = 30 * k, ay = H - 8 * k, L = P + 60 * k, Rr = W - P - 60 * k;
      [[L - 34 * k, fy + foot * .3, 0], [L + 26 * k, fy + foot * .2, 2], [L - 4 * k, fy + foot * .5, 4]]
        .forEach(([bx, by, c]) => balloon(x, bx, by, r, PARTY[c], L, ay));
      [[Rr + 34 * k, fy + foot * .28, 1], [Rr - 26 * k, fy + foot * .2, 3], [Rr + 2 * k, fy + foot * .5, 5]]
        .forEach(([bx, by, c]) => balloon(x, bx, by, r, PARTY[c], Rr, ay));
      x.fillStyle = '#2b2d42'; x.beginPath(); x.arc(L, ay, 3 * k, 0, TAU); x.arc(Rr, ay, 3 * k, 0, TAU); x.fill();
    },
    after(x, { W, fy, foot, k }) {
      star(x, W * .3, fy + foot * .84, 9 * k, '#ffd166'); star(x, W * .5, fy + foot * .86, 11 * k, '#ff5d73'); star(x, W * .7, fy + foot * .84, 9 * k, '#4cc9f0');
    }
  };


  /* ===================== NOËL VÉTO (chien et chat en bonnet) ===================== */
  function santaHat(x, cx, by, w, tilt) {
    x.save(); x.translate(cx, by); x.rotate(tilt);
    x.fillStyle = '#d7263d'; x.beginPath();
    x.moveTo(-w * .5, 0); x.quadraticCurveTo(-w * .1, -w * .9, w * .55, -w * .75); x.quadraticCurveTo(w * .25, -w * .4, w * .5, 0); x.closePath(); x.fill();
    ell(x, 0, w * .02, w * .58, w * .13, '#ffffff');
    circle(x, w * .58, -w * .75, w * .13, '#ffffff');
    x.restore();
  }
  function dogFace(x, cx, cy, r) {
    const line = '#4a3426';
    x.save(); x.lineWidth = r * .05; x.strokeStyle = line;
    [-1, 1].forEach(s => { ell(x, cx + s * r * .85, cy + r * .15, r * .3, r * .62, '#8a5a34', s * .35); x.stroke(); });
    x.beginPath(); x.arc(cx, cy, r, 0, TAU); x.fillStyle = '#f3e2c7'; x.fill(); x.stroke();
    ell(x, cx - r * .36, cy - r * .12, r * .3, r * .26, '#c98a52', -.3);
    ell(x, cx, cy + r * .42, r * .48, r * .36, '#ffffff');
    [-1, 1].forEach(s => { circle(x, cx + s * r * .36, cy - r * .1, r * .1, '#2b1a10'); circle(x, cx + s * r * .36 - r * .03, cy - r * .14, r * .035, '#fff');
      ell(x, cx + s * r * .62, cy + r * .2, r * .13, r * .08, '#ff8fa3aa'); });
    ell(x, cx, cy + r * .26, r * .15, r * .1, '#2b1a10');
    x.beginPath(); x.moveTo(cx, cy + r * .34); x.lineTo(cx, cy + r * .48); x.stroke();
    x.beginPath(); x.arc(cx - r * .1, cy + r * .48, r * .1, 0, Math.PI); x.arc(cx + r * .1, cy + r * .48, r * .1, 0, Math.PI); x.stroke();
    ell(x, cx, cy + r * .66, r * .09, r * .12, '#ff7a8a');
    x.restore();
    santaHat(x, cx + r * .05, cy - r * .72, r * 1.25, -.18);
  }
  function catFace(x, cx, cy, r) {
    const line = '#3d3a45';
    x.save(); x.lineWidth = r * .05; x.strokeStyle = line;
    [-1, 1].forEach(s => {
      x.fillStyle = '#a7a9b4'; x.beginPath(); x.moveTo(cx + s * r * .9, cy - r * .25); x.lineTo(cx + s * r * .75, cy - r * 1.15); x.lineTo(cx + s * r * .25, cy - r * .85); x.closePath(); x.fill(); x.stroke();
      x.fillStyle = '#ffb3c6'; x.beginPath(); x.moveTo(cx + s * r * .78, cy - r * .4); x.lineTo(cx + s * r * .72, cy - r * .95); x.lineTo(cx + s * r * .4, cy - r * .78); x.closePath(); x.fill();
    });
    x.beginPath(); x.arc(cx, cy, r, 0, TAU); x.fillStyle = '#a7a9b4'; x.fill(); x.stroke();
    x.strokeStyle = '#7d7f8c'; x.lineWidth = r * .07;
    [-.2, 0, .2].forEach(d => { x.beginPath(); x.moveTo(cx + d * r, cy - r * .92); x.lineTo(cx + d * r * .8, cy - r * .62); x.stroke(); });
    ell(x, cx, cy + r * .35, r * .45, r * .3, '#e9e9ef');
    [-1, 1].forEach(s => { ell(x, cx + s * r * .36, cy - r * .05, r * .13, r * .15, '#7cc36b'); ell(x, cx + s * r * .36, cy - r * .05, r * .05, r * .13, '#1e1b22');
      circle(x, cx + s * r * .36 - r * .04, cy - r * .1, r * .035, '#fff'); ell(x, cx + s * r * .62, cy + r * .2, r * .13, r * .08, '#ff8fa3aa'); });
    x.fillStyle = '#ff8fab'; x.beginPath(); x.moveTo(cx - r * .09, cy + r * .2); x.lineTo(cx + r * .09, cy + r * .2); x.lineTo(cx, cy + r * .31); x.closePath(); x.fill();
    x.strokeStyle = line; x.lineWidth = r * .04;
    x.beginPath(); x.arc(cx - r * .08, cy + r * .33, r * .08, 0, Math.PI); x.arc(cx + r * .08, cy + r * .33, r * .08, 0, Math.PI); x.stroke();
    x.lineWidth = r * .025;
    [-1, 1].forEach(s => [-.06, .08].forEach(d => { x.beginPath(); x.moveTo(cx + s * r * .3, cy + r * (.3 + d)); x.lineTo(cx + s * r * 1.05, cy + r * (.24 + d * 2)); x.stroke(); }));
    x.restore();
    santaHat(x, cx - r * .05, cy - r * .7, r * 1.2, .2);
  }
  function holly(x, cx, cy, s, rot) {
    x.save(); x.translate(cx, cy); x.rotate(rot || 0);
    [[-.15, -2.6], [.15, -.5]].forEach(([dx, a]) => {
      x.save(); x.rotate(a); x.fillStyle = '#1f6b45'; x.beginPath(); x.moveTo(0, 0);
      for (let i = 1; i <= 5; i++) x.quadraticCurveTo(s * (i - .5) * .2, -s * .32, s * i * .2, -s * .18);
      x.lineTo(s, 0);
      for (let i = 5; i >= 1; i--) x.quadraticCurveTo(s * (i - .5) * .2, s * .32, s * (i - 1) * .2, s * .18);
      x.closePath(); x.fill();
      x.strokeStyle = '#14502f'; x.lineWidth = s * .03; x.beginPath(); x.moveTo(0, 0); x.lineTo(s * .95, 0); x.stroke();
      x.restore();
    });
    [[0, 0], [s * .14, s * .1], [-s * .12, s * .12]].forEach(([a, b]) => { circle(x, a, b, s * .12, '#d7263d'); circle(x, a - s * .04, b - s * .04, s * .035, '#ffffffaa'); });
    x.restore();
  }
  function gift(x, cx, by, w, h, col, rib) {
    x.save(); shadow(x, w); x.fillStyle = col; x.fillRect(cx - w / 2, by - h, w, h); noShadow(x);
    x.fillStyle = rib; x.fillRect(cx - w * .08, by - h, w * .16, h); x.fillRect(cx - w / 2, by - h * .6, w, h * .14);
    ell(x, cx - w * .17, by - h - w * .1, w * .18, w * .1, rib, -.5); ell(x, cx + w * .17, by - h - w * .1, w * .18, w * .1, rib, .5);
    x.restore();
  }
  function flake(x, cx, cy, r, col, lw) {
    x.save(); x.strokeStyle = col; x.lineWidth = lw; x.lineCap = 'round';
    for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3, ca = Math.cos(a), sa = Math.sin(a);
      x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + ca * r, cy + sa * r);
      const bx = cx + ca * r * .6, by = cy + sa * r * .6;
      x.moveTo(bx, by); x.lineTo(bx + Math.cos(a + .7) * r * .3, by + Math.sin(a + .7) * r * .3);
      x.moveTo(bx, by); x.lineTo(bx + Math.cos(a - .7) * r * .3, by + Math.sin(a - .7) * r * .3); x.stroke(); }
    x.restore();
  }
  const noel = {
    foot: [300, 420], top: 0, ty: .4, sy: .62, tw: .5, ts: [56, 96], ss: [20, 32],
    frame: { bg: '#ffffff', line: '#d7263d', wide: true },
    pattern(x, { W, H, k }) {
      const R = rng(21);
      for (let yy = 30 * k, row = 0; yy < H; yy += 80 * k, row++)
        for (let xx = row % 2 ? 40 * k : 0; xx < W + 40 * k; xx += 80 * k) flake(x, xx + R() * 10 * k, yy, (6 + R() * 4) * k, '#dbe7ef', 1.6 * k);
    },
    deco(x, { W, H, P, fy, foot, k }) {
      holly(x, 30 * k, 30 * k, 70 * k, .6); holly(x, W - 30 * k, 30 * k, 70 * k, 2.5);
      gift(x, P + 120 * k, H - 14 * k, 50 * k, 40 * k, '#1f6b45', '#f2c14e');
      gift(x, W - P - 128 * k, H - 14 * k, 44 * k, 34 * k, '#d7263d', '#ffffff');
      dogFace(x, P + 52 * k, fy + foot * .6, 64 * k);
      catFace(x, W - P - 52 * k, fy + foot * .62, 58 * k);
      paw(x, W * .36, fy + foot * .86, 10 * k, '#d7263d', -.3); paw(x, W * .64, fy + foot * .86, 10 * k, '#1f6b45', .3);
      flake(x, W * .5, fy + foot * .86, 11 * k, '#9cc3d9', 2.2 * k);
    }
  };

  /* ===================== MARAIS ENCHANTÉ ===================== */
  function firefly(x, cx, cy, r) {
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r * 4);
    g.addColorStop(0, '#fff7a8ee'); g.addColorStop(.3, '#ffe66d66'); g.addColorStop(1, '#ffe66d00');
    circle(x, cx, cy, r * 4, g); circle(x, cx, cy, r, '#fffbd0');
  }
  function lilyPad(x, cx, cy, r, rot) {
    x.save(); x.translate(cx, cy); x.rotate(rot || 0); x.scale(1, .42);
    x.fillStyle = '#4f9a5a'; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, .35, TAU - .05); x.closePath(); x.fill();
    x.strokeStyle = '#3c7d47'; x.lineWidth = r * .04;
    for (let i = 0; i < 7; i++) { const a = .5 + i * .8; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(a) * r * .9, Math.sin(a) * r * .9); x.stroke(); }
    x.restore();
  }
  function lotus(x, cx, cy, s) {
    [[-1, -.5], [1, .5], [-.5, -.2], [.5, .2], [0, 0]].forEach(([d, rot], i) =>
      ell(x, cx + d * s * .35, cy - s * .35 + Math.abs(d) * s * .15, s * .2, s * .45, i < 2 ? '#f7a8c8' : i < 4 ? '#fbc4da' : '#ff8fb8', rot));
    circle(x, cx, cy - s * .2, s * .1, '#ffd166');
  }
  function frog(x, cx, cy, r, crown) {
    const line = '#2f5d3a';
    x.save(); x.lineWidth = r * .05; x.strokeStyle = line;
    [-1, 1].forEach(s => ell(x, cx + s * r * .8, cy + r * .45, r * .42, r * .2, '#6ab35a'));
    x.beginPath(); x.ellipse(cx, cy, r, r * .78, 0, 0, TAU); x.fillStyle = '#7cc36b'; x.fill(); x.stroke();
    ell(x, cx, cy + r * .25, r * .62, r * .42, '#bfe3a0');
    [-1, 1].forEach(s => {
      x.beginPath(); x.arc(cx + s * r * .45, cy - r * .62, r * .3, 0, TAU); x.fillStyle = '#7cc36b'; x.fill(); x.stroke();
      circle(x, cx + s * r * .45, cy - r * .62, r * .2, '#ffffff'); circle(x, cx + s * r * .45, cy - r * .6, r * .11, '#1e2a20');
      circle(x, cx + s * r * .42, cy - r * .66, r * .04, '#ffffff');
      ell(x, cx + s * r * .62, cy - r * .12, r * .14, r * .08, '#ff8fa3aa');
    });
    x.beginPath(); x.arc(cx, cy - r * .2, r * .38, .25, Math.PI - .25); x.stroke();
    x.restore();
    if (crown) {
      x.fillStyle = '#f2c14e'; x.beginPath();
      const w = r * .5, b = cy - r * .82;
      x.moveTo(cx - w / 2, b); x.lineTo(cx - w / 2, b - w * .5); x.lineTo(cx - w / 4, b - w * .25); x.lineTo(cx, b - w * .6);
      x.lineTo(cx + w / 4, b - w * .25); x.lineTo(cx + w / 2, b - w * .5); x.lineTo(cx + w / 2, b); x.closePath(); x.fill();
      circle(x, cx, b - w * .62, w * .08, '#e85d75');
    }
  }
  function cattails(x, bx, by, h, k, dir) {
    x.lineCap = 'round';
    [[-12, .9, -.12], [0, 1, .02], [12, .8, .14]].forEach(([dx, hh, lean]) => {
      x.strokeStyle = '#6b8f4e'; x.lineWidth = 3 * k;
      const tx = bx + dx * k + dir * lean * h, ty = by - h * hh;
      x.beginPath(); x.moveTo(bx + dx * k, by); x.quadraticCurveTo(bx + dx * k, by - h * hh * .5, tx, ty); x.stroke();
      ell(x, tx, ty + h * .12, 6 * k, h * .13, '#7b4a26', lean * dir);
    });
    x.fillStyle = '#5e8a3a';
    [[-20, .7, -.5], [18, .6, .45], [4, .5, .1]].forEach(([dx, hh, a]) => {
      x.beginPath(); x.moveTo(bx + dx * k - 5 * k, by); x.quadraticCurveTo(bx + dx * k + a * 40 * k, by - h * hh * .6, bx + dx * k + a * 60 * k, by - h * hh);
      x.quadraticCurveTo(bx + dx * k + a * 30 * k, by - h * hh * .5, bx + dx * k + 5 * k, by); x.fill();
    });
  }
  function willow(x, sx, dir, n, len, k) {
    for (let i = 0; i < n; i++) {
      const ox = sx + dir * i * 22 * k, l = len * (1 - i * .18);
      x.strokeStyle = '#6b8f4e'; x.lineWidth = 2 * k;
      x.beginPath(); x.moveTo(ox, 0); x.quadraticCurveTo(ox + dir * 10 * k, l * .5, ox, l); x.stroke();
      for (let t = .2; t <= 1; t += .2) leaf(x, ox + dir * 4 * k, l * t, 16 * k, Math.PI / 2 + (t * 10 % 4 > 2 ? .6 : -.6), '#7fae5a');
    }
  }
  const marais = {
    foot: [340, 470], top: 0, ty: .2, sy: .36, tw: .66, ts: [48, 82], ss: [20, 32],
    frame: { bg: '#fbfff5', line: '#6b8f4e' },
    pattern(x, { W, H, k }) {
      const R = rng(31);
      for (let i = 0; i < W * H / (14000 * k * k); i++) circle(x, R() * W, R() * H, (10 + R() * 30) * k, '#dfeed6aa');
    },
    deco(x, { W, H, P, fy, foot, k }) {
      willow(x, 8 * k, 1, 4, 120 * k, k); willow(x, W - 8 * k, -1, 4, 120 * k, k);
      // eau
      const wy = H - foot * .36;
      x.fillStyle = '#7fbfb3'; x.beginPath(); x.moveTo(0, wy);
      for (let i = 0; i <= 12; i++) x.quadraticCurveTo(W * (i - .5) / 12, wy - 6 * k, W * i / 12, wy);
      x.lineTo(W, H); x.lineTo(0, H); x.closePath(); x.fill();
      x.strokeStyle = '#a9d8cf'; x.lineWidth = 2.5 * k;
      [[.2, .55], [.5, .8], [.8, .6], [.35, .9], [.65, .45]].forEach(([u, v]) => { x.beginPath(); x.ellipse(W * u, wy + (H - wy) * v, 28 * k, 5 * k, 0, 0, TAU); x.stroke(); });
      cattails(x, P * .6, wy + 6 * k, foot * .5, k, -1);
      cattails(x, W - P * .6, wy + 6 * k, foot * .46, k, 1);
      lilyPad(x, W * .3, wy + (H - wy) * .55, 60 * k, .2);
      lilyPad(x, W * .72, wy + (H - wy) * .6, 56 * k, -.3);
      lilyPad(x, W * .5, wy + (H - wy) * .82, 34 * k, 0);
      lotus(x, W * .52, wy + (H - wy) * .78, 26 * k);
      frog(x, W * .3, wy + (H - wy) * .4, 30 * k, true);
      frog(x, W * .72, wy + (H - wy) * .46, 26 * k, false);
      const R = rng(4);
      for (let i = 0; i < 11; i++) firefly(x, W * (.08 + R() * .84), fy + foot * (.04 + R() * .5), (2 + R() * 1.5) * k);
      firefly(x, 60 * k, 140 * k, 3 * k); firefly(x, W - 70 * k, 160 * k, 3 * k);
    }
  };

  /* ===================== FÊTE FORAINE FÉERIQUE ===================== */
  function castle(x, cx, by, s) {
    const wall = '#d9d0f0', dark = '#a99bd3', roof = '#8e6bd8', win = '#ffe08a';
    const tower = (tx, w, h, roofH) => {
      x.fillStyle = wall; x.fillRect(tx - w / 2, by - h, w, h);
      x.fillStyle = dark; x.fillRect(tx - w / 2, by - h, w * .18, h);
      x.fillStyle = roof; x.beginPath(); x.moveTo(tx - w * .62, by - h); x.lineTo(tx, by - h - roofH); x.lineTo(tx + w * .62, by - h); x.closePath(); x.fill();
      x.strokeStyle = '#f7f3ff'; x.lineWidth = 2; x.beginPath(); x.moveTo(tx, by - h - roofH); x.lineTo(tx, by - h - roofH - s * .14); x.stroke();
      x.fillStyle = '#ff7eb6'; x.beginPath(); x.moveTo(tx, by - h - roofH - s * .14); x.lineTo(tx + s * .1, by - h - roofH - s * .11); x.lineTo(tx, by - h - roofH - s * .08); x.fill();
      x.fillStyle = win; x.beginPath(); x.roundRect ? x.roundRect(tx - w * .14, by - h * .7, w * .28, w * .38, [w * .14, w * .14, 0, 0]) : x.rect(tx - w * .14, by - h * .7, w * .28, w * .38); x.fill();
    };
    // remparts
    x.fillStyle = wall; x.fillRect(cx - s * .9, by - s * .45, s * 1.8, s * .45);
    x.fillStyle = dark; for (let i = 0; i < 9; i++) x.fillRect(cx - s * .9 + i * s * .2, by - s * .5, s * .1, s * .06);
    x.fillStyle = wall; for (let i = 0; i < 9; i++) x.fillRect(cx - s * .9 + i * s * .2, by - s * .51, s * .1, s * .05);
    tower(cx - s * .9, s * .32, s * .8, s * .38);
    tower(cx + s * .9, s * .32, s * .8, s * .38);
    tower(cx - s * .35, s * .26, s * 1.05, s * .34);
    tower(cx + s * .35, s * .26, s * 1.05, s * .34);
    tower(cx, s * .4, s * 1.3, s * .5);
    // porte
    x.fillStyle = '#5a3f8a'; x.beginPath(); x.moveTo(cx - s * .14, by); x.lineTo(cx - s * .14, by - s * .22); x.arc(cx, by - s * .22, s * .14, Math.PI, 0); x.lineTo(cx + s * .14, by); x.fill();
  }
  function ferris(x, cx, cy, r, k) {
    x.strokeStyle = '#ffd98a'; x.lineWidth = 3 * k;
    x.beginPath(); x.moveTo(cx - r * .6, cy + r * 1.25); x.lineTo(cx, cy); x.lineTo(cx + r * .6, cy + r * 1.25); x.stroke();
    x.beginPath(); x.arc(cx, cy, r, 0, TAU); x.stroke();
    x.lineWidth = 1.5 * k; x.beginPath(); x.arc(cx, cy, r * .55, 0, TAU); x.stroke();
    const cols = ['#ff7eb6', '#7bdcb5', '#ffd166', '#4cc9f0', '#c77dff'];
    for (let i = 0; i < 10; i++) {
      const a = i * TAU / 10, ex = cx + Math.cos(a) * r, ey = cy + Math.sin(a) * r;
      x.strokeStyle = '#ffd98a99'; x.beginPath(); x.moveTo(cx, cy); x.lineTo(ex, ey); x.stroke();
      x.fillStyle = cols[i % 5]; x.beginPath(); x.roundRect ? x.roundRect(ex - 7 * k, ey, 14 * k, 11 * k, 3 * k) : x.rect(ex - 7 * k, ey, 14 * k, 11 * k); x.fill();
      circle(x, ex, ey, 2.5 * k, '#fff3c4');
    }
    circle(x, cx, cy, 6 * k, '#ffd98a');
  }
  function carousel(x, cx, by, w, k) {
    const h = w * .9;
    ell(x, cx, by, w * .6, w * .1, '#b388eb');
    ell(x, cx, by - 4 * k, w * .55, w * .08, '#d7c2ff');
    x.fillStyle = '#ffd98a';
    for (let i = -2; i <= 2; i++) { x.fillRect(cx + i * w * .2 - 1.5 * k, by - h * .62, 3 * k, h * .6); }
    [[-2, '#ff7eb6', .5], [-1, '#ffffff', .3], [0, '#7bdcb5', .45], [1, '#ffffff', .32], [2, '#4cc9f0', .5]].forEach(([i, c, v]) =>
      ell(x, cx + i * w * .2, by - h * v * .6 - 10 * k, w * .085, w * .05, c));
    // toit rayé
    const ty = by - h * .62;
    for (let i = 0; i < 8; i++) {
      x.fillStyle = i % 2 ? '#ffffff' : '#ff7eb6';
      x.beginPath(); x.moveTo(cx, ty - h * .42); x.lineTo(cx - w * .6 + i * w * .15, ty); x.lineTo(cx - w * .6 + (i + 1) * w * .15, ty); x.closePath(); x.fill();
    }
    for (let i = 0; i < 8; i++) { x.fillStyle = i % 2 ? '#ff7eb6' : '#ffffff'; x.beginPath(); x.arc(cx - w * .6 + (i + .5) * w * .15, ty, w * .075, 0, Math.PI); x.fill(); }
    x.fillStyle = '#ffd98a'; x.fillRect(cx - 1.5 * k, ty - h * .55, 3 * k, h * .14);
    x.fillStyle = '#ffd166'; x.beginPath(); x.moveTo(cx, ty - h * .55); x.lineTo(cx + 14 * k, ty - h * .51); x.lineTo(cx, ty - h * .47); x.fill();
  }
  function firework(x, cx, cy, r, col, k) {
    x.strokeStyle = col; x.lineCap = 'round'; x.lineWidth = 2.5 * k;
    for (let i = 0; i < 14; i++) {
      const a = i * TAU / 14, c = Math.cos(a), s = Math.sin(a);
      x.beginPath(); x.moveTo(cx + c * r * .3, cy + s * r * .3); x.lineTo(cx + c * r * .85, cy + s * r * .85); x.stroke();
      circle(x, cx + c * r, cy + s * r, 2.5 * k, col);
    }
    circle(x, cx, cy, 3 * k, '#ffffff');
  }
  function lights(x, W, y0, sag, n, k) {
    x.strokeStyle = '#ffffff55'; x.lineWidth = 1.5 * k;
    x.beginPath(); x.moveTo(0, y0); x.quadraticCurveTo(W / 2, y0 + sag * 2, W, y0); x.stroke();
    const cols = ['#ffd166', '#ff7eb6', '#7bdcb5', '#4cc9f0', '#c77dff'];
    for (let i = 0; i < n; i++) {
      const t = (i + .5) / n, lx = W * t, ly = y0 + sag * 2 * 2 * t * (1 - t) + 6 * k;
      const g = x.createRadialGradient(lx, ly, 0, lx, ly, 14 * k); g.addColorStop(0, cols[i % 5] + 'aa'); g.addColorStop(1, cols[i % 5] + '00');
      circle(x, lx, ly, 14 * k, g); ell(x, lx, ly, 4.5 * k, 6 * k, cols[i % 5]);
    }
  }
  const fete = {
    foot: [400, 540], top: 40, ty: .12, sy: .24, tw: .72, ts: [46, 78], ss: [20, 32],
    frame: { bg: '#3a3170', line: '#ffd98a', wide: true },
    pattern(x, { W, H, k }) {
      const R = rng(17);
      for (let i = 0; i < W * H / (2500 * k * k); i++) circle(x, R() * W, R() * H, (.6 + R() * 1.6) * k, R() > .85 ? '#ffd98a' : '#ffffffaa');
    },
    deco(x, { W, H, P, fy, foot, k }) {
      lights(x, W, 4 * k, 18 * k, 14, k);
      // collines de nuit
      ell(x, W * .5, H + foot * .2, W * .75, foot * .32, '#2e5a4f');
      firework(x, W * .07, fy + foot * .3, 24 * k, '#ff7eb6', k);
      firework(x, W * .93, fy + foot * .3, 22 * k, '#7bdcb5', k);
      firework(x, W * .3, fy + foot * .4, 20 * k, '#ffd166', k);
      firework(x, W * .7, fy + foot * .38, 18 * k, '#c77dff', k);
      ferris(x, W - P - 44 * k, H - foot * .4, 62 * k, k);
      castle(x, W * .5, H - foot * .07, foot * .33);
      carousel(x, P + 52 * k, H - foot * .1, 110 * k, k);
      x.fillStyle = '#1f4038'; x.fillRect(0, H - foot * .07, W, foot * .07);
    }
  };

  /* ===================== JEU VIDÉO (pixel rétro) ===================== */
  function pix(x, rows, cx, cy, sz, pal) {
    const w = rows[0].length, h = rows.length, ox = cx - w * sz / 2, oy = cy - h * sz / 2;
    rows.forEach((r, j) => [...r].forEach((c, i) => { if (c !== '.') { x.fillStyle = pal[c]; x.fillRect(ox + i * sz, oy + j * sz, sz + .5, sz + .5); } }));
  }
  const HEART = ['.RR.RR.', 'RWRRRRR', 'RRRRRRR', 'RRRRRRR', '.RRRRR.', '..RRR..', '...R...'];
  const COIN = ['..YYY..', '.YOOOY.', 'YOYWYOY', 'YOYWYOY', 'YOYWYOY', '.YOOOY.', '..YYY..'];
  const STAR = ['...Y...', '...Y...', '.YYYYY.', 'YYYYYYY', '.YYYYY.', '.YY.YY.', 'Y.....Y'];
  const GEM = ['.CCC.', 'CWCCC', 'CCCCC', '.CCC.', '..C..'];
  const PAL = { R: '#ff3b6b', W: '#ffffff', Y: '#ffd23f', O: '#f29e1f', C: '#4ef2ff' };
  function gamepad(x, cx, cy, w, k) {
    const h = w * .48;
    x.save(); shadow(x, w * .6);
    x.fillStyle = '#5b4bd6'; x.beginPath();
    x.roundRect ? x.roundRect(cx - w / 2, cy - h / 2, w, h, h * .5) : x.rect(cx - w / 2, cy - h / 2, w, h); x.fill(); noShadow(x);
    x.fillStyle = '#2a2160'; x.fillRect(cx - w * .34, cy - h * .06, w * .2, h * .16); x.fillRect(cx - w * .29, cy - h * .25, w * .1, h * .54);
    [[.27, -.12, '#ffd23f'], [.36, 0, '#ff3b6b'], [.27, .12, '#3ce07a'], [.18, 0, '#4ef2ff']].forEach(([a, b, c]) => circle(x, cx + w * a, cy + h * b * 1.6, w * .045, c));
    x.fillStyle = '#c9c2ff'; x.fillRect(cx - w * .07, cy - h * .05, w * .05, h * .1); x.fillRect(cx + w * .02, cy - h * .05, w * .05, h * .1);
    x.restore();
  }
  const gaming = {
    foot: [300, 420], top: 50, ty: .22, sy: .4, tw: .82, ts: [30, 52], ss: [14, 22],
    frame: { bg: '#1e1840', line: '#ff4fd8', wide: true },
    pattern(x, { W, H, k }) {
      x.strokeStyle = '#ffffff0d'; x.lineWidth = 1;
      for (let xx = 0; xx < W; xx += 24 * k) { x.beginPath(); x.moveTo(xx, 0); x.lineTo(xx, H); x.stroke(); }
      for (let yy = 0; yy < H; yy += 24 * k) { x.beginPath(); x.moveTo(0, yy); x.lineTo(W, yy); x.stroke(); }
      const R = rng(41); for (let i = 0; i < 40; i++) { x.fillStyle = R() > .5 ? '#4ef2ff55' : '#ff4fd855'; x.fillRect(R() * W, R() * H, 4 * k, 4 * k); }
    },
    deco(x, { W, H, P, PT, fy, foot, k }) {
      // barre de jeu en haut
      x.textAlign = 'left'; x.font = `${11 * k}px "Press Start 2P"`; x.fillStyle = '#ffd23f';
      x.fillText('1UP', P, PT * .45); x.fillStyle = '#ffffff'; x.fillText('SCORE 004200', P + 50 * k, PT * .45);
      x.textAlign = 'center';
      for (let i = 0; i < 3; i++) pix(x, HEART, W - P - 14 * k - i * 26 * k, PT * .42, 3 * k, PAL);
      // bas : manette, pièces, étoiles, "LEVEL UP"
      gamepad(x, W / 2, fy + foot * .66, 150 * k, k);
      [.14, .22, .3].forEach((u, i) => pix(x, COIN, W * u, fy + foot * (.7 - i * .06), 4 * k, PAL));
      [.7, .78, .86].forEach((u, i) => pix(x, COIN, W * u, fy + foot * (.58 + i * .06), 4 * k, PAL));
      pix(x, STAR, P + 6 * k, fy + foot * .2, 4 * k, PAL); pix(x, STAR, W - P - 6 * k, fy + foot * .22, 4 * k, PAL);
      pix(x, GEM, W * .14, fy + foot * .38, 5 * k, PAL); pix(x, GEM, W * .86, fy + foot * .4, 5 * k, PAL);
      x.font = `${14 * k}px "Press Start 2P"`; x.fillStyle = '#3ce07a'; x.fillText('LEVEL UP!', W / 2, fy + foot * .9);
      // coins pixelisés du cadre
      x.fillStyle = '#4ef2ff';
      [[0, 0], [W - 16 * k, 0], [0, H - 16 * k], [W - 16 * k, H - 16 * k]].forEach(([a, b]) => { x.fillRect(a, b, 16 * k, 8 * k); x.fillRect(a, b, 8 * k, 16 * k); });
    }
  };

  /* ===================== MOTO GP (circuit) ===================== */
  function checker(x, ox, oy, w, h, n, rot) {
    x.save(); x.translate(ox, oy); x.rotate(rot);
    x.strokeStyle = '#444'; x.lineWidth = w * .05; x.beginPath(); x.moveTo(0, 0); x.lineTo(0, h * 2.2); x.stroke();
    const c = w / n;
    for (let i = 0; i < n; i++) for (let j = 0; j < Math.round(h / c); j++) { x.fillStyle = (i + j) % 2 ? '#111' : '#fff'; x.fillRect(i * c, j * c, c, c); }
    x.strokeStyle = '#111'; x.lineWidth = 1.5; x.strokeRect(0, 0, w, Math.round(h / c) * c);
    x.restore();
  }
  function raceBike(x, cx, by, s, col, num) {
    const r = s * .26;
    // vitesse
    x.strokeStyle = '#11111140'; x.lineCap = 'round'; x.lineWidth = s * .03;
    [-.35, -.15, .05].forEach((d, i) => { x.beginPath(); x.moveTo(cx - s * (1.25 + i * .1), by + s * d - s * .2); x.lineTo(cx - s * .85, by + s * d - s * .2); x.stroke(); });
    // roues
    [[-.62, 0], [.62, 0]].forEach(([d]) => { circle(x, cx + d * s, by - r, r, '#1a1a1a'); circle(x, cx + d * s, by - r, r * .62, '#9aa0a8'); circle(x, cx + d * s, by - r, r * .18, '#1a1a1a'); });
    // carénage
    x.fillStyle = col; x.beginPath();
    x.moveTo(cx - s * .78, by - r * 1.55); x.lineTo(cx - s * .25, by - r * 1.25); x.lineTo(cx + s * .1, by - r * 1.0);
    x.lineTo(cx + s * .58, by - r * 1.1); x.lineTo(cx + s * .86, by - r * 1.6); x.lineTo(cx + s * .6, by - r * 2.6);
    x.lineTo(cx + s * .2, by - r * 2.85); x.lineTo(cx - s * .2, by - r * 2.6); x.lineTo(cx - s * .55, by - r * 2.1); x.closePath(); x.fill();
    // bande blanche + bulle
    x.fillStyle = '#ffffff'; x.beginPath(); x.moveTo(cx - s * .6, by - r * 2.0); x.lineTo(cx + s * .55, by - r * 1.65); x.lineTo(cx + s * .55, by - r * 1.4); x.lineTo(cx - s * .55, by - r * 1.75); x.closePath(); x.fill();
    x.fillStyle = '#9fd6ff'; x.beginPath(); x.moveTo(cx + s * .48, by - r * 2.7); x.lineTo(cx + s * .7, by - r * 3.15); x.lineTo(cx + s * .74, by - r * 2.55); x.closePath(); x.fill();
    // pilote
    x.fillStyle = '#222'; x.beginPath(); x.moveTo(cx - s * .3, by - r * 2.6); x.quadraticCurveTo(cx + s * .05, by - r * 3.7, cx + s * .4, by - r * 3.0); x.lineTo(cx + s * .2, by - r * 2.6); x.closePath(); x.fill();
    circle(x, cx + s * .42, by - r * 3.15, r * .45, col); ell(x, cx + s * .52, by - r * 3.2, r * .25, r * .14, '#222');
    // numéro
    circle(x, cx - s * .12, by - r * 2.1, r * .42, '#ffffff');
    x.fillStyle = '#111'; x.font = `italic ${r * .55}px "Russo One"`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(num, cx - s * .12, by - r * 2.08);
  }
  const moto = {
    foot: [300, 420], top: 0, ty: .2, sy: .36, tw: .72, ts: [48, 82], ss: [20, 30],
    frame: { bg: '#ffffff', line: '#111111', wide: true },
    pattern(x, { W, H, k }) {
      x.strokeStyle = '#00000010'; x.lineWidth = 10 * k;
      for (let d = -H; d < W; d += 60 * k) { x.beginPath(); x.moveTo(d, 0); x.lineTo(d + H * .6, H); x.stroke(); }
    },
    deco(x, { W, H, P, fy, foot, k }) {
      checker(x, 8 * k, 6 * k, 56 * k, 36 * k, 6, -.25);
      x.save(); x.translate(W, 0); x.scale(-1, 1); checker(x, 8 * k, 6 * k, 56 * k, 36 * k, 6, -.25); x.restore();
      // piste
      const ty = H - foot * .3;
      x.fillStyle = '#3a3d42'; x.fillRect(0, ty, W, H - ty);
      x.fillStyle = '#ffffff'; for (let xx = 10 * k; xx < W; xx += 70 * k) x.fillRect(xx, ty + (H - ty) * .55, 36 * k, 4 * k);
      for (let i = 0, xx = 0; xx < W; i++, xx += 28 * k) { x.fillStyle = i % 2 ? '#ffffff' : '#e10600'; x.fillRect(xx, ty - 10 * k, 28 * k, 10 * k); }
      raceBike(x, W * .52, H - foot * .1, 120 * k, '#e10600', '1');
      // drapeaux à damier du bas
      x.fillStyle = '#111'; x.font = `italic ${14 * k}px "Russo One"`; x.textAlign = 'left'; x.fillText('LAP 1/1', P, fy + foot * .47);
      x.textAlign = 'right'; x.fillText('P1', W - P, fy + foot * .47); x.textAlign = 'center';
    }
  };

  /* ===================== FÉES ===================== */
  function wings(x, cx, cy, s, c1, c2, flip) {
    x.save(); x.translate(cx, cy); if (flip) x.scale(-1, 1);
    const wing = (dy, sx, sy, rot, c) => {
      x.save(); x.rotate(rot);
      const g = x.createLinearGradient(0, -sy, sx, sy); g.addColorStop(0, c + 'dd'); g.addColorStop(1, '#ffffff99');
      x.fillStyle = g; x.strokeStyle = '#ffffffee'; x.lineWidth = s * .03;
      x.beginPath(); x.moveTo(0, dy); x.bezierCurveTo(sx * .3, dy - sy * 1.1, sx * 1.1, dy - sy * .9, sx, dy - sy * .1);
      x.bezierCurveTo(sx * .9, dy + sy * .3, sx * .4, dy + sy * .2, 0, dy); x.fill(); x.stroke();
      x.restore();
    };
    wing(0, s, s * .7, -.15, c1); wing(s * .08, s * .7, -s * .45, .1, c2);
    x.save(); x.scale(-1, 1); wing(0, s, s * .7, -.15, c1); wing(s * .08, s * .7, -s * .45, .1, c2); x.restore();
    ell(x, 0, s * .05, s * .05, s * .22, '#c03fc8');
    x.restore();
  }
  function sparkle(x, cx, cy, r, col) {
    x.fillStyle = col; x.beginPath();
    x.moveTo(cx, cy - r); x.quadraticCurveTo(cx, cy, cx + r, cy); x.quadraticCurveTo(cx, cy, cx, cy + r);
    x.quadraticCurveTo(cx, cy, cx - r, cy); x.quadraticCurveTo(cx, cy, cx, cy - r); x.fill();
  }
  function wand(x, sx, sy, ex, ey, k) {
    x.strokeStyle = '#ffffff'; x.lineWidth = 5 * k; x.lineCap = 'round';
    x.beginPath(); x.moveTo(sx, sy); x.lineTo(ex, ey); x.stroke();
    x.strokeStyle = '#ff9be8'; x.lineWidth = 2 * k; x.setLineDash([6 * k, 6 * k]); x.beginPath(); x.moveTo(sx, sy); x.lineTo(ex, ey); x.stroke(); x.setLineDash([]);
    star(x, ex, ey, 22 * k, '#ffd84d'); star(x, ex, ey, 12 * k, '#fff6b0');
  }
  const fees = {
    foot: [300, 420], top: 30, ty: .3, sy: .48, tw: .6, ts: [58, 98], ss: [20, 32],
    frame: { bg: '#ffffff', line: '#e59bf0', wide: true },
    pattern(x, { W, H, k }) {
      const g = x.createLinearGradient(0, 0, W, H); g.addColorStop(0, '#fde7ff'); g.addColorStop(.5, '#eaf4ff'); g.addColorStop(1, '#fff0f7');
      x.fillStyle = g; x.fillRect(0, 0, W, H);
      const R = rng(53), cols = ['#f7a8ff', '#a8d8ff', '#ffd84d', '#ffb3d9'];
      for (let i = 0; i < W * H / (3500 * k * k); i++) sparkle(x, R() * W, R() * H, (2 + R() * 5) * k, cols[i % 4] + 'aa');
    },
    deco(x, { W, H, P, fy, foot, k }) {
      wings(x, 46 * k, 40 * k, 52 * k, '#f7a8ff', '#a8d8ff', false);
      wings(x, W - 46 * k, 40 * k, 52 * k, '#a8d8ff', '#c9a8ff', true);
      wings(x, P + 56 * k, fy + foot * .6, 66 * k, '#ff9be8', '#c9a8ff', false);
      wings(x, W - P - 56 * k, fy + foot * .58, 66 * k, '#9fd3ff', '#ffb3d9', true);
      // poussière magique
      x.strokeStyle = '#e59bf088'; x.lineWidth = 2 * k; x.setLineDash([2 * k, 8 * k]); x.lineCap = 'round';
      x.beginPath(); x.moveTo(W * .2, fy + foot * .9); x.bezierCurveTo(W * .35, fy + foot * .7, W * .55, fy + foot * 1, W * .62, fy + foot * .78); x.stroke(); x.setLineDash([]);
      wand(x, W * .74, fy + foot * .95, W * .64, fy + foot * .74, k);
      [[.5, .14, 9, '#ffd84d'], [.25, .2, 7, '#f7a8ff'], [.75, .18, 8, '#a8d8ff'], [.42, .86, 6, '#ffb3d9'], [.33, .78, 5, '#ffd84d']]
        .forEach(([u, v, r, c]) => sparkle(x, W * u, fy + foot * v, r * k, c));
      flowersF(x, W, H, k);
    }
  };
  function flowersF(x, W, H, k) {
    [[.08, .985, '#ff9be8'], [.92, .985, '#a8d8ff'], [.5, .99, '#ffd84d']].forEach(([u, v, c]) => {
      for (let p = 0; p < 5; p++) { const a = p * TAU / 5; ell(x, W * u + Math.cos(a) * 9 * k, H * v - 14 * k + Math.sin(a) * 9 * k, 7 * k, 5 * k, c, a); }
      circle(x, W * u, H * v - 14 * k, 4 * k, '#fff6b0');
    });
  }

  window.FRAMES = { grapefruit, burrow, kawaii: kawaiiFrame, teckel: teckelFrame, balloons, noel, marais, fete, gaming, moto, fees };
})();
