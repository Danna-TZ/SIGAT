/* SIGAT · Portal Docente — HTML/CSS/JS puro
   Los datos son de ejemplo. Los puntos para conectar tu backend están marcados con "TODO API". */

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = t => String(t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ── Iconos (estilo Lucide) ── */
const PATHS = {
  grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
  grad: '<path d="M22 10 12 5 2 10l10 5zM6 12v5c3 3 9 3 12 0v-5"/>',
  user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
  eyeoff: '<path d="M9.9 4.2A10 10 0 0 1 12 5c7 0 10 7 10 7a13 13 0 0 1-1.7 2.7M6.6 6.6A13 13 0 0 0 2 12s3 7 10 7a10 10 0 0 0 5.4-1.6M2 2l20 20"/>',
  login: '<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
  qr: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM20 14v.01M14 20h3M20 17v4"/>',
  camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"/><circle cx="12" cy="13" r="3"/>',
  check: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  xc: '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6M9 9l6 6"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  arrow: '<path d="M5 12h14M12 5l7 7-7 7"/>',
  chevr: '<path d="m9 18 6-6-6-6"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',
  send: '<path d="m22 2-7 20-4-9-9-4zM22 2 11 13"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6"/>',
  monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
  wind: '<path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2M9.6 4.6A2 2 0 1 1 11 8H2M12.6 19.4A2 2 0 1 0 14 16H2"/>',
  projector: '<path d="M5 7 3 5M9 6V3M13 7l2-2"/><circle cx="9" cy="13" r="3"/><path d="M11.83 12H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2M16 16h.01"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5zM20 17v5H6.5a2.5 2.5 0 0 1 0-5"/>',
  clip: '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M9 12h6M9 16h6"/>',
  cal: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>',
};
const ic = (n, s = 16) => `<svg class="i" width="${s}" height="${s}" viewBox="0 0 24 24" aria-hidden="true">${PATHS[n]}</svg>`;
const paint = (root = document) => $$('[data-i]', root).forEach(e => { e.innerHTML = ic(e.dataset.i, +e.dataset.s || 16); });

/* ── Datos de ejemplo (TODO API: reemplazar por fetch) ── */
const SALAS = ['Laboratorio 305', 'Aula 201', 'Sala A'];
const NAV = [
  { id: 'qr', label: 'Reportar', i: 'qr' },
  { id: 'notas', label: 'Notas', i: 'book' },
  { id: 'historial', label: 'Historial', i: 'clip' },
  { id: 'horario', label: 'Horario', i: 'cal' },
];
const CHECKS = [['pcs', 'monitor', 'PCs funcionando'], ['sillas', 'users', 'Sillas completas'], ['aire', 'wind', 'Aire acondicionado'], ['videobeam', 'projector', 'Video beam'], ['tablero', 'file', 'Tablero']];
let rows = [
  { id: 1, nombre: 'Alejandro Martínez', doc: '10234001', curso: '10°A', p1: 3.8, p2: 4.2, p3: 3.9, p4: 4.5 },
  { id: 2, nombre: 'Valentina Ríos', doc: '10234002', curso: '10°A', p1: 4.5, p2: 4.8, p3: 4.9, p4: 4.7 },
  { id: 3, nombre: 'Sebastián Torres', doc: '10234003', curso: '10°A', p1: 2.9, p2: 3.1, p3: 3.4, p4: 3.6 },
  { id: 4, nombre: 'María Fernanda López', doc: '10234004', curso: '10°A', p1: 4.0, p2: 4.3, p3: 4.1, p4: 4.4 },
  { id: 5, nombre: 'Camilo Herrera', doc: '10234005', curso: '10°A', p1: 3.2, p2: 3.5, p3: 3.8, p4: 4.0 },
  { id: 6, nombre: 'Isabella Gómez', doc: '10234006', curso: '10°B', p1: 4.7, p2: 4.9, p3: 5.0, p4: 4.8 },
  { id: 7, nombre: 'Daniel Suárez', doc: '10234007', curso: '10°B', p1: 2.5, p2: 2.8, p3: 3.0, p4: 3.2 },
  { id: 8, nombre: 'Sara Mendoza', doc: '10234008', curso: '10°B', p1: 3.6, p2: 3.9, p3: 4.0, p4: 4.2 },
];
let reports = [
  { id: 5, fecha: '2024-06-20', hora: '08:15', sala: 'Lab 305', estado: 'Con novedad', descripcion: 'Tres PCs sin conexión a red, video beam con imagen borrosa.', foto: true },
  { id: 4, fecha: '2024-06-18', hora: '10:30', sala: 'Aula 201', estado: 'Bueno', descripcion: 'Todo en perfecto estado.', foto: false },
  { id: 3, fecha: '2024-06-15', hora: '07:50', sala: 'Lab 305', estado: 'Con novedad', descripcion: 'Cinco sillas dañadas y tablero sin marcadores.', foto: true },
  { id: 2, fecha: '2024-06-12', hora: '14:00', sala: 'Sala A', estado: 'Bueno', descripcion: 'Conectividad estable, equipos en buen estado.', foto: false },
  { id: 1, fecha: '2024-06-10', hora: '09:20', sala: 'Lab 305', estado: 'Con novedad', descripcion: 'Aire acondicionado apagado.', foto: false },
];
const HORAS = ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
const C = { az: ['#e8f0fe', '#4285f4'], vd: ['#e8f8e0', '#39a900'], na: ['#fff3e0', '#e67e22'], rs: ['#fce4ec', '#e91e63'], mo: ['#f3e5f5', '#9c27b0'], cy: ['#e0f7fa', '#00bcd4'] };
const CLASES = {
  'Lunes-07:00': ['Programación I', 'Ing. Ospina', 'az'], 'Lunes-09:00': ['Bases de Datos', 'Dr. Herrera', 'vd'],
  'Martes-08:00': ['Redes', 'Msc. Ríos', 'na'], 'Martes-11:00': ['Programación II', 'Ing. Suárez', 'rs'],
  'Miércoles-07:00': ['Sistemas Op.', 'Ing. Castro', 'mo'], 'Miércoles-14:00': ['Videoconf.', 'Dr. Mora', 'cy'],
  'Jueves-09:00': ['Base de Datos II', 'Dr. Herrera', 'vd'], 'Jueves-13:00': ['Ing. Software', 'Msc. Ríos', 'na'],
  'Viernes-08:00': ['Programación I', 'Ing. Ospina', 'az'], 'Viernes-15:00': ['Redes II', 'Ing. Castro', 'mo'],
};

/* ── Estado ── */
let user = '', sala = '', view = 'qr', fotoName = null;
let curso = 'Todos', query = '', editing = null;

/* ── Toast / modal ── */
let toastT;
function toast(msg, type = 'ok') {
  const t = $('#toast'); t.className = 'toast ' + type; t.hidden = false;
  t.innerHTML = `${ic(type === 'ok' ? 'check' : 'xc')}<span>${esc(msg)}</span><button aria-label="Cerrar">${ic('x')}</button>`;
  $('button', t).onclick = () => (t.hidden = true);
  clearTimeout(toastT); toastT = setTimeout(() => (t.hidden = true), 4000);
}
function modal(html) { $('#modalBox').innerHTML = html; paint($('#modalBox')); $('#modal').hidden = false; $$('[data-close]', $('#modal')).forEach(b => b.onclick = closeModal); }
function closeModal() { $('#modal').hidden = true; }
$('#modal').addEventListener('click', e => { if (e.target.id === 'modal') closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ── Navegación ── */
function buildNav() {
  $('#topnav').innerHTML = NAV.map(n => `<button data-go="${n.id}">${ic(n.i, 14)}${n.label}</button>`).join('');
  $('#botnav').innerHTML = NAV.map(n => `<button data-go="${n.id}">${ic(n.i, 20)}${n.label}</button>`).join('');
}
function go(id) {
  if (id !== 'qr') stopCam();
  view = id;
  $$('.view').forEach(v => v.classList.toggle('on', v.id === id));
  const active = id === 'novedad' ? 'qr' : id;
  $$('#topnav button, #botnav button').forEach(b => b.classList.toggle('on', b.dataset.go === active));
  ({ qr: () => setQR('idle'), notas: renderNotas, historial: renderHist, horario: renderHorario, novedad: initNovedad })[id]?.();
  window.scrollTo(0, 0);
}
document.addEventListener('click', e => { const b = e.target.closest('[data-go]'); if (b) go(b.dataset.go); });

/* ── Login ── */
paint(); buildNav();
$('#doc').addEventListener('input', e => { e.target.value = e.target.value.replace(/\D/g, ''); fieldErr('doc', ''); });
$('#pwd').addEventListener('input', () => fieldErr('pwd', ''));
$('#togglePwd').onclick = () => {
  const p = $('#pwd'), show = p.type === 'password';
  p.type = show ? 'text' : 'password'; $('#togglePwd').innerHTML = ic(show ? 'eyeoff' : 'eye', 17);
};
function fieldErr(k, msg) { $('#' + k + 'Err').textContent = msg; $('#' + k).classList.toggle('invalid', !!msg); }
$('#loginForm').addEventListener('submit', e => {
  e.preventDefault();
  const okDoc = /^\d{5,12}$/.test($('#doc').value), okPwd = $('#pwd').value.length >= 6;
  fieldErr('doc', okDoc ? '' : 'Ingresa un número de documento válido');
  fieldErr('pwd', okPwd ? '' : 'Contraseña incorrecta o muy corta');
  if (!okDoc || !okPwd) return;
  const btn = $('#loginBtn'); btn.disabled = true; btn.innerHTML = '<i class="spin"></i>Autenticando...';
  // TODO API: POST /login con { documento, password } y usar el nombre que devuelva el servidor
  setTimeout(() => {
    btn.disabled = false; btn.innerHTML = ic('login', 15) + 'Iniciar sesión SIGAT';
    user = 'Dr. Camilo Herrera'; $('#login').hidden = true; $('#app').hidden = false;
    $('#uName').textContent = user.split(' ')[0];
    $('#uAvatar').textContent = user.split(' ').map(w => w[0]).slice(0, 2).join('');
    go('qr');
  }, 1200);
});
$('#forgot').onclick = () => {
  modal(`<div class="mhead"><h2 class="h3">Recuperar acceso SIGAT</h2><button data-close aria-label="Cerrar" data-i="x" data-s="18"></button></div>
    <div id="recBody"><p class="muted mb">Ingresa tu correo institucional y te enviaremos un enlace para restablecer tu contraseña.</p>
    <input id="rec" type="email" placeholder="correo@ejemplo.com"><div style="margin-top:14px"><button class="btn primary full" id="recBtn">${ic('send', 14)}Enviar enlace</button></div></div>`);
  $('#recBtn').onclick = () => {
    const m = $('#rec').value; if (!m.includes('@')) return $('#rec').classList.add('invalid');
    // TODO API: POST /recuperar-clave { email }
    $('#recBody').innerHTML = `<div class="center">${ic('check', 40).replace('class="i"', 'class="i" style="color:var(--ok)"')}<p style="margin-top:10px">Enlace enviado a <b>${esc(m)}</b>.<br>Revisa tu bandeja de entrada.</p></div>`;
  };
};
$('#logout').onclick = () => { stopCam(); user = sala = ''; $('#app').hidden = true; $('#login').hidden = false; $('#loginForm').reset(); };

/* ── QR ── */
let stream, raf;
function setQR(s) { stopCam(); $('#qrcard').dataset.s = s; if (s === 'success') $('#salaOk').textContent = sala; }
function stopCam() { cancelAnimationFrame(raf); stream?.getTracks().forEach(t => t.stop()); stream = null; }
function onQR(v) {
  const s = SALAS.find(x => x.toLowerCase() === String(v).trim().toLowerCase()); // TODO API: validar la sala en el servidor
  if (s) { sala = s; setQR('success'); } else setQR('error');
}
async function startCam() {
  $('#qrcard').dataset.s = 'scanning';
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
    const v = $('#cam'); v.srcObject = stream; await v.play();
    if (!('BarcodeDetector' in window)) return toast('Este navegador no lee QR. Usa el modo prueba.', 'er');
    const det = new BarcodeDetector({ formats: ['qr_code'] });
    const tick = async () => {
      try { const r = await det.detect(v); if (r.length) return onQR(r[0].rawValue); } catch (_) {}
      raf = requestAnimationFrame(tick);
    };
    tick();
  } catch (_) { setQR('idle'); toast('No se pudo acceder a la cámara. Revisa los permisos.', 'er'); }
}
$('#camBtn').onclick = startCam;
$('#simBtn').onclick = () => { $('#qrcard').dataset.s = 'scanning'; setTimeout(() => onQR(SALAS[0]), 1500); };
$('#cancelCam').onclick = () => setQR('idle');
$('#again').onclick = () => setQR('idle');
$('#toForm').onclick = () => go('novedad');

/* ── Formulario de novedad ── */
$('#checks').innerHTML = CHECKS.map(([k, i, l]) => `<label><input type="checkbox" name="${k}">${ic(i, 13)}${l}</label>`).join('');
$('#checks').addEventListener('change', e => e.target.closest('label').classList.toggle('on', e.target.checked));
const drop = $('#drop');
drop.onclick = () => $('#file').click();
drop.ondragover = e => { e.preventDefault(); drop.classList.add('over'); };
drop.ondragleave = () => drop.classList.remove('over');
drop.ondrop = e => { e.preventDefault(); drop.classList.remove('over'); if (e.dataTransfer.files[0]) setFoto(e.dataTransfer.files[0]); };
$('#file').onchange = e => e.target.files[0] && setFoto(e.target.files[0]);
function setFoto(f) {
  if (f.size > 5 * 1024 * 1024) return ($('#fotoErr').textContent = 'Máx. 5MB');
  if (!['image/jpeg', 'image/png'].includes(f.type)) return ($('#fotoErr').textContent = 'Solo JPG o PNG');
  $('#fotoErr').textContent = ''; fotoName = f.name;
  drop.classList.add('has'); $('#dropTxt').innerHTML = `<b>${esc(f.name)}</b>`; $('#dropSub').textContent = 'Clic para cambiar';
}
function initNovedad() {
  $('#salaHead').textContent = $('#salaInp').value = sala;
  $('#novForm').reset(); $$('#checks label').forEach(l => l.classList.remove('on'));
  fotoName = null; drop.classList.remove('has'); $('#dropTxt').innerHTML = '<b>Arrastra o haz clic aquí</b>'; $('#dropSub').textContent = 'JPG, PNG · Máx. 5 MB';
  $('#salaInp').value = sala; $('#count').textContent = '0 caracteres'; ['estado', 'desc', 'foto'].forEach(k => ($('#' + k + 'Err').textContent = ''));
}
$('#desc').addEventListener('input', e => { $('#count').textContent = e.target.value.length + ' caracteres'; $('#descErr').textContent = ''; });
$('#estado').addEventListener('change', () => ($('#estadoErr').textContent = ''));
$('#novForm').addEventListener('submit', e => {
  e.preventDefault();
  const estado = $('#estado').value, desc = $('#desc').value.trim();
  $('#estadoErr').textContent = estado ? '' : 'Selecciona el estado';
  $('#descErr').textContent = desc.length >= 10 ? '' : 'Mínimo 10 caracteres';
  if (!estado || desc.length < 10) return;
  const now = new Date(), p = n => String(n).padStart(2, '0');
  const checks = Object.fromEntries($$('#checks input').map(i => [i.name, i.checked]));
  // TODO API: enviar { sala, estado, checks, descripcion, foto } con FormData
  reports.unshift({ id: reports.length + 1, fecha: `${now.getFullYear()}-${p(now.getMonth() + 1)}-${p(now.getDate())}`, hora: `${p(now.getHours())}:${p(now.getMinutes())}`, sala, estado, descripcion: desc, foto: !!fotoName, checks });
  toast('Novedad registrada correctamente en SIGAT'); go('historial');
});

/* ── Notas ── */
const avg = r => ((r.p1 + r.p2 + r.p3 + r.p4) / 4).toFixed(1);
const nc = n => (n >= 4 ? 'ok' : n >= 3 ? 'wa' : 'er');
$('#chips').innerHTML = ['Todos', ...new Set(rows.map(r => r.curso))].map(c => `<button class="chip${c === 'Todos' ? ' on' : ''}" data-c="${c}">${c}</button>`).join('');
$('#chips').onclick = e => { const b = e.target.closest('[data-c]'); if (!b) return; curso = b.dataset.c; $$('.chip').forEach(x => x.classList.toggle('on', x === b)); renderNotas(); };
$('#search').oninput = e => { query = e.target.value.toLowerCase(); renderNotas(); };
function renderNotas() {
  const list = rows.filter(r => (curso === 'Todos' || r.curso === curso) && (r.nombre.toLowerCase().includes(query) || r.doc.includes(query)));
  $('#nCount').textContent = list.length + ' estudiantes';
  $('#notasBody').innerHTML = list.map(r => {
    const ed = editing === r.id, a = avg(r);
    const cells = ['p1', 'p2', 'p3', 'p4'].map(p => `<td>${ed ? `<input type="number" min="0" max="5" step="0.1" data-p="${p}" value="${r[p]}" aria-label="${p.toUpperCase()}">` : `<span class="nota ${nc(r[p])}">${r[p].toFixed(1)}</span>`}</td>`).join('');
    return `<tr data-id="${r.id}"><td style="font-weight:600;white-space:nowrap">${esc(r.nombre)}</td><td class="mono">${r.doc}</td><td><span class="tag cur">${r.curso}</span></td>${cells}
      <td><span class="nota ${nc(+a)}" style="font-size:13px">${a}</span></td>
      <td>${ed ? '<div style="display:flex;gap:6px"><button class="mini save" data-a="save">Guardar</button><button class="mini cancel" data-a="cancel">Cancelar</button></div>' : '<button class="mini" data-a="edit">Editar</button>'}</td></tr>`;
  }).join('') || '<tr><td colspan="9" class="center muted">Sin resultados</td></tr>';
}
$('#notasBody').onclick = e => {
  const b = e.target.closest('[data-a]'); if (!b) return;
  const id = +b.closest('tr').dataset.id, a = b.dataset.a;
  if (a === 'edit') editing = id;
  if (a === 'cancel') editing = null;
  if (a === 'save') {
    const r = rows.find(x => x.id === id);
    $$('input[data-p]', b.closest('tr')).forEach(i => { const v = parseFloat(i.value); if (!isNaN(v)) r[i.dataset.p] = Math.min(5, Math.max(0, v)); });
    editing = null; toast('Notas actualizadas correctamente'); // TODO API: PUT /notas/:id
  }
  renderNotas();
};

/* ── Historial ── */
function renderHist() {
  $('#histBody').innerHTML = reports.map(r => `<tr><td><b>${r.fecha}</b><div class="muted xs">${r.hora}</div></td><td style="font-weight:500">${esc(r.sala)}</td>
    <td><span class="tag ${r.estado === 'Bueno' ? 'ok' : 'wa'}">${r.estado}</span></td><td><span class="clamp">${esc(r.descripcion)}</span></td>
    <td class="center">${r.foto ? `<span style="color:var(--p)">${ic('image', 15)}</span>` : '<span style="color:var(--bd)">—</span>'}</td>
    <td><button class="mini" data-id="${r.id}">Ver detalle</button></td></tr>`).join('');
}
$('#histBody').onclick = e => {
  const b = e.target.closest('[data-id]'); if (!b) return;
  const r = reports.find(x => x.id === +b.dataset.id);
  modal(`<div class="mhead"><h3 class="h3">Reporte #${r.id}</h3><button data-close aria-label="Cerrar" data-i="x" data-s="18"></button></div>` +
    [['Sala', r.sala], ['Fecha', `${r.fecha} ${r.hora}`], ['Estado', r.estado], ['Descripción', r.descripcion], ['Foto', r.foto ? 'Sí' : 'No']].map(([k, v]) => `<div class="kv"><span>${k}</span><span>${esc(v)}</span></div>`).join(''));
};

/* ── Horario ── */
function renderHorario() {
  const cls = (k, mob) => { const c = CLASES[k]; if (!c) return ''; const [bg, bd] = C[c[2]]; return `<div class="cls" style="background:${bg};border-color:${bd}"><b${mob ? ' style="font-size:12px"' : ''}>${c[0]}</b><span>${c[1]}</span></div>`; };
  $('#hHead').innerHTML = `<tr><th>Hora</th>${DIAS.map(d => `<th>${d}</th>`).join('')}</tr>`;
  $('#hBody').innerHTML = HORAS.map(h => `<tr><td class="mono">${h}</td>${DIAS.map(d => `<td>${cls(`${d}-${h}`) || '<span class="free">Disponible</span>'}</td>`).join('')}</tr>`).join('');
  $('#hMobile').innerHTML = DIAS.map(d => {
    const items = HORAS.filter(h => CLASES[`${d}-${h}`]).map(h => `<div class="day"><span class="mono">${h}</span>${cls(`${d}-${h}`, true)}</div>`).join('');
    return `<div class="card" style="padding:16px"><h3 style="font-size:14px;color:var(--p)">${d}</h3>${items || '<p class="xs" style="color:var(--bd);margin-top:8px">Sin clases programadas</p>'}</div>`;
  }).join('');
}
