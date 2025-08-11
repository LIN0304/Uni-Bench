// Minimal interactive chart renderer (no external libs)
(() => {
  const datasets = window.BENCHMARK_DATA || [];
  const families = window.BENCHMARK_FAMILIES || [];
  const ICONS = {
    // Brand icons swapped to provided URLs
    'OpenAI': 'https://pbs.twimg.com/profile_images/1885410181409820672/ztsaR0JW_400x400.jpg',
    'Anthropic': 'https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/c71c2417-1136-5b8f-8384-5be351ff5489/14905bc2-10d7-526a-8286-e84ca4465d93.jpg',
    'Google': 'https://image.similarpng.com/file/similarpng/original-picture/2020/06/Logo-google-icon-PNG.png',
    'DeepSeek': 'https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/f4e1e123-607e-53cc-8d85-2d7ea331f388/138fdcce-1fd7-5548-a415-c6ec311ed754.jpg',
    'Grok': 'https://upload.wikimedia.org/wikipedia/commons/9/93/XAI_Logo.svg',
    'Meta': 'https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/a19d89bb-6028-5c0a-9260-d36706ab9c1b/a4644549-5dcd-52fe-8cdf-2733b3e03417.jpg',
    'Microsoft': 'assets/icons/microsoft.svg',
    'GLM': 'assets/icons/glm.svg',
    'Qwen': 'assets/icons/qwen.svg',
    'Mistral': 'assets/icons/mistral.svg',
    'Human': 'assets/icons/human.svg',
    'Other': 'assets/icons/other.svg'
  };

  // Elements
  const tabsEl = document.getElementById('tabs');
  const chartEl = document.getElementById('chart');
  const tableEl = document.getElementById('table');
  const controlsEl = document.getElementById('controls');
  const externalWrap = document.getElementById('externalWrap');
  const externalFrame = document.getElementById('externalFrame');
  const searchEl = document.getElementById('search');
  const familyEl = document.getElementById('familyFilter');
  const sortEl = document.getElementById('sortBy');
  const normalizeEl = document.getElementById('normalize');
  const downloadBtn = document.getElementById('downloadBtn');
  const datasetMeta = document.getElementById('datasetMeta');
  const selectionMeta = document.getElementById('selectionMeta');
  const deepLink = document.getElementById('deepLink');
  const themeToggle = document.getElementById('themeToggle');
  const legendEl = document.getElementById('legend');

  // State
  let activeId = datasets[0]?.id;
  let activeExternal = false;
  const EXTERNAL_TAB = { id: 'external', label: 'AI IQ Chart', url: 'file:///Users/raylin/Desktop/Uni_bench/ai_iq_chart.html', icon: 'assets/icons/other.svg' };
  let filters = {
    q: '',
    family: 'all',
    sort: 'value-desc',
    normalize: false,
  };

  // Helpers
  const fmt = (unit, v) => unit === 'percent' ? `${v.toFixed(1)}%` : `${Number.isInteger(v) ? v : v.toFixed(2)}`;
  const idToLabel = id => datasets.find(d => d.id === id)?.title || id;
  const detectFamily = (name) => {
    for (const f of families) {
      if (f.match.test(name)) return f.key;
    }
    return 'Other';
  };
  const iconForFamily = (fam) => ICONS[fam] || null;
  const decodeHash = () => {
    const h = new URLSearchParams(location.hash.slice(1));
    const target = h.get('id');
    activeExternal = target === EXTERNAL_TAB.id;
    if (!activeExternal && target && datasets.find(d => d.id === target)) activeId = target;
    // Allow overriding external URL via hash
    const extUrl = h.get('url');
    if (extUrl) EXTERNAL_TAB.url = extUrl;
    if (h.get('q')) filters.q = h.get('q');
    if (h.get('family')) filters.family = h.get('family');
    if (h.get('sort')) filters.sort = h.get('sort');
    if (h.get('norm')) filters.normalize = h.get('norm') === '1';
  };
  const encodeHash = () => {
    const params = { id: activeExternal ? EXTERNAL_TAB.id : activeId, q: filters.q, family: filters.family, sort: filters.sort, norm: filters.normalize ? '1' : '0' };
    if (activeExternal && EXTERNAL_TAB.url) params.url = EXTERNAL_TAB.url;
    const h = new URLSearchParams(params);
    location.hash = h.toString();
    deepLink.textContent = `#${h.toString()}`;
  };

  // UI builders
  function buildTabs() {
    tabsEl.innerHTML = '';
    datasets.forEach(d => {
      const btn = document.createElement('button');
      btn.className = `tab ${!activeExternal && d.id === activeId ? 'active' : ''}`;
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', (!activeExternal && d.id === activeId) ? 'true' : 'false');
      btn.textContent = d.title;
      btn.addEventListener('click', () => {
        activeExternal = false;
        activeId = d.id;
        buildTabs();
        render();
      });
      tabsEl.appendChild(btn);
    });
    // External tab
    const extBtn = document.createElement('button');
    extBtn.className = `tab ${activeExternal ? 'active' : ''}`;
    extBtn.setAttribute('role', 'tab');
    extBtn.setAttribute('aria-selected', activeExternal ? 'true' : 'false');
    extBtn.innerHTML = `<img class="icon-16" src="${EXTERNAL_TAB.icon}" alt="icon"/> ${EXTERNAL_TAB.label}`;
    extBtn.addEventListener('click', () => {
      activeExternal = true;
      buildTabs();
      render();
    });
    tabsEl.appendChild(extBtn);
  }

  function buildFamilyFilter(data) {
    const familyCounts = {};
    data.forEach(e => {
      const f = detectFamily(e.name);
      familyCounts[f] = (familyCounts[f] || 0) + 1;
    });
    // Reset options
    const current = familyEl.value || 'all';
    familyEl.innerHTML = '';
    const allOpt = document.createElement('option');
    allOpt.value = 'all';
    allOpt.textContent = `All (${data.length})`;
    familyEl.appendChild(allOpt);
    Object.keys(familyCounts).sort().forEach(k => {
      const o = document.createElement('option');
      o.value = k;
      o.textContent = `${k} (${familyCounts[k]})`;
      familyEl.appendChild(o);
    });
    if ([...familyEl.options].some(o => o.value === current)) familyEl.value = current;
  }

  function buildLegend(data) {
    const familyCounts = {};
    data.forEach(e => {
      const f = detectFamily(e.name);
      familyCounts[f] = (familyCounts[f] || 0) + 1;
    });
    
    legendEl.innerHTML = '';
    Object.keys(familyCounts).sort().forEach(family => {
      const icon = iconForFamily(family);
      const legendItem = document.createElement('div');
      legendItem.className = 'legend-item';
      
      if (icon) {
        legendItem.innerHTML = `
          <img class="icon-16" src="${icon}" alt="${family} icon"/>
          <span>${family} (${familyCounts[family]})</span>
        `;
      } else {
        legendItem.innerHTML = `
          <div class="legend-color" style="width: 16px; height: 16px; border-radius: 4px; background: var(--bar-${family.toLowerCase()}, var(--bar-other));"></div>
          <span>${family} (${familyCounts[family]})</span>
        `;
      }
      
      legendEl.appendChild(legendItem);
    });
  }

  function filteredSortedEntries(dataset) {
    const q = filters.q.trim().toLowerCase();
    let rows = dataset.entries.map(e => ({ ...e, family: detectFamily(e.name) }));
    if (q) rows = rows.filter(r => r.name.toLowerCase().includes(q));
    if (filters.family !== 'all') rows = rows.filter(r => r.family === filters.family);
    // sanitize sort
    const allowedSorts = new Set(['name-asc','name-desc','value-asc','value-desc']);
    const sort = allowedSorts.has(filters.sort) ? filters.sort : 'value-desc';
    const cmpName = (a,b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
    const cmpVal = (a,b) => a.value - b.value;
    if (sort === 'name-asc') rows.sort(cmpName);
    else if (sort === 'name-desc') rows.sort((a,b) => cmpName(b,a));
    else if (sort === 'value-asc') rows.sort(cmpVal);
    else if (sort === 'value-desc') rows.sort((a,b) => cmpVal(b,a));
    return rows;
  }

  function renderTable(dataset, rows) {
    const unit = dataset.unit;
    const html = [`<table><thead><tr><th>#</th><th>Model</th><th>Family</th><th>Score</th></tr></thead><tbody>`];
    rows.forEach((r,i) => {
      const icon = iconForFamily(r.family);
      const nameCell = icon
        ? `<span class="model-name"><img class="icon-16" src="${icon}" alt="${r.family} icon"/>${escapeHtml(r.name)}</span>`
        : escapeHtml(r.name);
      html.push(`<tr><td>${i+1}</td><td>${nameCell}</td><td>${r.family}</td><td>${fmt(unit,r.value)}</td></tr>`);
    });
    html.push('</tbody></table>');
    tableEl.innerHTML = html.join('');
  }

  function renderChart(dataset, rows) {
    const unit = dataset.unit;
    const width = Math.max(640, chartEl.clientWidth - 32);
    const barH = 30;
    const gap = 8;
    const leftPad = 220; // label column
    const rightPad = 24;
    const height = rows.length * (barH + gap) + 20;
    const values = rows.map(r => r.value);
    const maxVal = filters.normalize ? Math.max(...values) : (unit === 'percent' ? 100 : Math.max(...values));
    const x = (v) => {
      const usable = width - leftPad - rightPad;
      const pct = maxVal ? (v / maxVal) : 0;
      return Math.max(2, Math.round(usable * pct));
    };

    const svg = el('svg', { width, height, viewBox: `0 0 ${width} ${height}`, xmlns: 'http://www.w3.org/2000/svg' });
    // Background grid
    const gridG = el('g', { class: 'grid' });
    const ticks = 5;
    for (let i=0;i<=ticks;i++) {
      const t = i / ticks;
      const gx = leftPad + t * (width - leftPad - rightPad);
      const label = filters.normalize ? Math.round(t * 100) + '%' : fmt(unit, t * maxVal);
      gridG.appendChild(el('line', { x1: gx, y1: 0, x2: gx, y2: height, class: 'grid-line'}));
      gridG.appendChild(el('text', { x: gx, y: 14, class: 'grid-label', 'text-anchor':'middle' }, label));
    }
    svg.appendChild(gridG);

    // Bars
    const barsG = el('g', { class: 'bars' });
    rows.forEach((r, i) => {
      const y = 20 + i * (barH + gap);
      const bw = x(r.value);
      const bar = el('rect', { x: leftPad, y, width: bw, height: barH, rx: 6, class: `bar family-${slug(r.family)}` });
      bar.addEventListener('mouseenter', () => showTip(r, leftPad + bw + 8, y + barH/2));
      bar.addEventListener('mouseleave', hideTip);
      bar.addEventListener('click', () => highlightRow(r.name));
      barsG.appendChild(bar);

      // Label group with icon + model name
      const icon = iconForFamily(r.family);
      const gLabel = el('g', { transform: `translate(12, ${y + Math.round(barH/2) - 8})` });
      if (icon) {
        const img = el('image', { href: icon, x: 0, y: 0, width: 16, height: 16, preserveAspectRatio: 'xMidYMid meet' });
        try { img.setAttributeNS('http://www.w3.org/1999/xlink', 'href', icon); } catch(e) {}
        gLabel.appendChild(img);
      }
      const textX = icon ? 22 : 2;
      const t = el('text', { x: textX, y: 8, class: 'bar-label', 'dominant-baseline': 'middle' }, r.name);
      gLabel.appendChild(t);
      barsG.appendChild(gLabel);

      // Value text on bar
      const valText = el('text', { x: leftPad + bw + 6, y: y + barH/2 + 5, class: 'bar-value' }, fmt(unit, r.value));
      barsG.appendChild(valText);

      // No votes chip
    });
    svg.appendChild(barsG);

    chartEl.innerHTML = '';
    chartEl.appendChild(svg);

    // Attach for download
    const svgText = serializeSvg(svg);
    const blob = new Blob([svgText], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    downloadBtn.href = url;
    downloadBtn.download = `${dataset.id}.svg`;
  }

  // Tooltip
  let tipEl;
  function ensureTip() {
    if (!tipEl) {
      tipEl = document.createElement('div');
      tipEl.className = 'tooltip';
      document.body.appendChild(tipEl);
    }
  }
  function showTip(row, x, y) {
    ensureTip();
    const dataset = datasets.find(d => d.id === activeId);
    const unit = dataset?.unit || 'score';
    tipEl.innerHTML = `
      <div class="tip-name">${escapeHtml(row.name)}</div>
      <div class="tip-line"><span>Family</span><span>${escapeHtml(row.family)}</span></div>
      <div class="tip-line"><span>Score</span><span>${escapeHtml(fmt(unit, row.value))}</span></div>
    `;
    const rect = tipEl.getBoundingClientRect();
    tipEl.style.left = `${x + 12}px`;
    tipEl.style.top = `${window.scrollY + y - rect.height/2}px`;
    tipEl.style.opacity = '1';
  }
  function hideTip() { if (tipEl) tipEl.style.opacity = '0'; }

  function render() {
    // Toggle external vs internal views
    if (activeExternal) {
      controlsEl.hidden = true;
      chartEl.hidden = true;
      tableEl.hidden = true;
      legendEl.hidden = true;
      externalWrap.hidden = false;
      if (externalFrame.src !== EXTERNAL_TAB.url) externalFrame.src = EXTERNAL_TAB.url;
      datasetMeta.innerHTML = `<span class="model-name"><img class="icon-16" src="${EXTERNAL_TAB.icon}" alt="icon"/> ${EXTERNAL_TAB.label}</span>`;
      selectionMeta.textContent = `Embedded page`;
      encodeHash();
      return;
    }

    const dataset = datasets.find(d => d.id === activeId);
    if (!dataset) return;
    controlsEl.hidden = false;
    chartEl.hidden = false;
    tableEl.hidden = false;
    legendEl.hidden = false;
    externalWrap.hidden = true;
    buildFamilyFilter(dataset.entries);
    buildLegend(dataset.entries);
    const rows = filteredSortedEntries(dataset);
    datasetMeta.textContent = `${idToLabel(activeId)} • ${dataset.unit}`;
    selectionMeta.textContent = `${rows.length} models shown`;
    renderChart(dataset, rows);
    renderTable(dataset, rows);
    encodeHash();
  }

  // Events
  searchEl.addEventListener('input', (e) => { filters.q = e.target.value; render(); });
  familyEl.addEventListener('change', (e) => { filters.family = e.target.value; render(); });
  sortEl.addEventListener('change', (e) => { filters.sort = e.target.value; render(); });
  normalizeEl.addEventListener('change', (e) => { filters.normalize = e.target.checked; render(); });
  themeToggle.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('theme', next);
  });

  window.addEventListener('hashchange', () => { decodeHash(); buildTabs(); render(); });

  // Utils
  function el(tag, attrs = {}, text) {
    const n = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (text != null) n.textContent = text;
    return n;
  }
  function serializeSvg(svg) {
    const clone = svg.cloneNode(true);
    // Inline styles for portability
    const css = getComputedStyle(document.documentElement);
    clone.setAttribute('style', `background:${css.getPropertyValue('--surface')}`);
    return `<?xml version="1.0" encoding="UTF-8"?>\n` + new XMLSerializer().serializeToString(clone);
  }
  function slug(s){ return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''); }
  function escapeHtml(s){ return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
  function highlightRow(name){
    const trs = tableEl.querySelectorAll('tbody tr');
    trs.forEach(tr => {
      tr.classList.toggle('highlight', tr.children[1].textContent === name);
    });
  }

  // Init
  (function init(){
    // Theme
    const saved = localStorage.getItem('theme');
    if (saved) document.documentElement.dataset.theme = saved;
    // Deep link
    decodeHash();
    buildTabs();
    // Defaults from hash
    searchEl.value = filters.q;
    sortEl.value = filters.sort;
    normalizeEl.checked = filters.normalize;
    render();
  })();
})();
