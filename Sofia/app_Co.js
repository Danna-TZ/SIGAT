'use strict';

/* ---------- 1. DATOS (en producción vendrían de una API) ---------- */
const salas = ['Lab 305', 'Aula 201', 'Sala A', 'Lab 102'];
const cursos = ['10°A', '10°B', '11°A', '11°B'];

const reportes = [
  { id: 5, fecha: '2024-06-20', hora: '08:15', sala: 'Lab 305', estado: 'Con novedad', desc: 'Tres PCs sin conexión a red, video beam con imagen borrosa.', foto: true },
  { id: 4, fecha: '2024-06-18', hora: '10:30', sala: 'Aula 201', estado: 'Bueno', desc: 'Todo en perfecto estado.', foto: false },
  { id: 3, fecha: '2024-06-15', hora: '07:50', sala: 'Lab 305', estado: 'Con novedad', desc: 'Cinco sillas dañadas y tablero sin marcadores.', foto: true },
  { id: 2, fecha: '2024-06-12', hora: '14:00', sala: 'Sala A', estado: 'Bueno', desc: 'Conectividad estable, equipos en buen estado.', foto: false },
  { id: 1, fecha: '2024-06-10', hora: '09:20', sala: 'Lab 305', estado: 'Con novedad', desc: 'Aire acondicionado apagado.', foto: false }
];

const novedades = [
  { id: 1, reporteId: 5, estado: 'Pendiente', seguimiento: '', actualizado: '2024-06-20' },
  { id: 2, reporteId: 3, estado: 'En proceso', seguimiento: 'Se pidió reposición de sillas; faltan los marcadores.', actualizado: '2024-06-17' },
  { id: 3, reporteId: 1, estado: 'Resuelta', seguimiento: 'Mantenimiento encendió y revisó el aire.', actualizado: '2024-06-11' }
];

const estudiantes = [
  { nombre: 'Valentina Ríos', curso: '10°A', notas: [4.5, 4.8, 4.9, 4.7] },
  { nombre: 'Mateo Gómez', curso: '10°A', notas: [3.8, 4.0, 4.3, 4.5] },
  { nombre: 'Sara Londoño', curso: '10°B', notas: [4.9, 4.7, 5.0, 4.8] },
  { nombre: 'Andrés Pardo', curso: '11°A', notas: [2.9, 3.2, 3.5, 3.8] },
  { nombre: 'Camila Ortiz', curso: '11°B', notas: [4.3, 4.5, 4.6, 4.7] }
];

const horario = {
  Lunes: [['07:00', 'Programación I', 'Ing. Ospina', 0], ['09:00', 'Bases de Datos', 'Dr. Herrera', 2]],
  Martes: [['08:00', 'Redes', 'Mag. Ríos', 1], ['11:00', 'Programación II', 'Ing. Suárez', 3]],
  Miércoles: [['07:00', 'Sistemas Op.', 'Ing. Castro', 4], ['14:00', 'Videoconf.', 'Dr. Mora', 5]],
  Jueves: [['09:00', 'Base de Datos II', 'Dr. Herrera', 2], ['13:00', 'Ing. Software', 'Mag. Ríos', 1]],
  Viernes: [['08:00', 'Programación I', 'Ing. Ospina', 0], ['15:00', 'Redes II', 'Ing. Castro', 4]]
};
const paleta = [['#2f6fd6', '#e8effc'], ['#e08a1e', '#fdf0dc'], ['#3a9b2e', '#e6f5df'], ['#d6336c', '#fbe3ec'], ['#8e44ad', '#f1e4f6'], ['#17a2b8', '#dff4f7']];

const matriculados = [
  { nombre: 'Laura Mejía', documento: '1098765001', curso: '10°A', fecha: '2024-06-19' },
  { nombre: 'Julián Cruz', documento: '1098765002', curso: '11°A', fecha: '2024-06-19' }
];
const COLUMNAS = ['nombres', 'apellidos', 'tipo_doc', 'documento', 'curso', 'acudiente', 'correo'];
let filasCsv = [];
let filtroNov = 'Todas';
let novedadEnEdicion = null;

/* ---------- 2. UTILIDADES ---------- */
const $ = (s) => document.querySelector(s);
const esc = (t) => String(t ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const prom = (a) => a.reduce((x, y) => x + y, 0) / a.length;
const hoy = () => new Date().toISOString().slice(0, 10);
const claseNota = (n) => (n < 4 ? 'nota baja' : 'nota');
const claseEstado = { 'Bueno': 'est-bueno', 'Con novedad': 'est-novedad', 'Pendiente': 'est-pend', 'En proceso': 'est-proc', 'Resuelta': 'est-res' };
const badge = (e) => `<span class="est ${claseEstado[e]}">${esc(e)}</span>`;
const opciones = (arr) => arr.map((o) => `<option>${esc(o)}</option>`).join('');
let temporizador;
function aviso(texto, tipo = 'ok') {
  $('#aviso').innerHTML = `<div class="aviso ${tipo}">${esc(texto)}</div>`;
  clearTimeout(temporizador);
  temporizador = setTimeout(() => { $('#aviso').innerHTML = ''; }, 5000);
}

/* ---------- 3. HISTORIAL Y REPORTAR ---------- */
function pintarHistorial() {
  $('#tbodyHistorial').innerHTML = reportes.map((r) => `<tr>
    <td><strong>${r.fecha}</strong><small>${r.hora}</small></td><td>${esc(r.sala)}</td><td>${badge(r.estado)}</td>
    <td class="text-secondary">${esc(r.desc)}</td>
    <td>${r.foto ? '<i class="bi bi-image" aria-label="Con foto"></i>' : '<span class="libre" aria-label="Sin foto">—</span>'}</td>
    <td><button class="btn btn-sm btn-outline-dark" data-detalle="${r.id}">Ver detalle</button></td></tr>`).join('');
}

function enviarReporte(e) {
  e.preventDefault();
  const estado = $('#repEstado').value, desc = $('#repDesc').value.trim();
  if (estado === 'Con novedad' && !desc) { aviso('Describe la novedad antes de enviar.', 'err'); $('#repDesc').focus(); return; }
  const ahora = new Date();
  const r = { id: Date.now(), fecha: hoy(), hora: ahora.toTimeString().slice(0, 5), sala: $('#repSala').value, estado,
              desc: desc || 'Sin observaciones.', foto: $('#repFoto').files.length > 0 };
  reportes.unshift(r);
  if (estado === 'Con novedad') novedades.unshift({ id: Date.now(), reporteId: r.id, estado: 'Pendiente', seguimiento: '', actualizado: hoy() });
  e.target.reset();
  pintarHistorial(); pintarNovedades();
  location.hash = '#historial';
  aviso('Reporte enviado correctamente.');
}

function verDetalle(id) {
  const r = reportes.find((x) => x.id === id);
  $('#dlgDetCuerpo').innerHTML = `<dl class="mb-0"><dt>Fecha y hora</dt><dd>${r.fecha} · ${r.hora}</dd>
    <dt>Sala</dt><dd>${esc(r.sala)}</dd><dt>Estado</dt><dd>${badge(r.estado)}</dd>
    <dt>Descripción</dt><dd>${esc(r.desc)}</dd><dt>Foto</dt><dd>${r.foto ? 'Adjunta' : 'No adjunta'}</dd></dl>`;
  $('#dlgDetalle').showModal();
}

/* ---------- 4. NOVEDADES (modificar estado y seguimiento) ---------- */
function pintarNovedades() {
  const estados = ['Pendiente', 'En proceso', 'Resuelta'];
  $('#contadores').innerHTML = estados.map((e) => `<div class="col-4"><div class="resumen"><small>${e}</small>
    <div class="valor">${novedades.filter((n) => n.estado === e).length}</div></div></div>`).join('');
  $('#filtrosNov').innerHTML = ['Todas', ...estados].map((e) =>
    `<button type="button" data-filtro="${e}" class="${e === filtroNov ? 'activo' : ''}" aria-pressed="${e === filtroNov}">${e}</button>`).join('');
  const lista = novedades.filter((n) => filtroNov === 'Todas' || n.estado === filtroNov);
  $('#tbodyNovedades').innerHTML = lista.length ? lista.map((n) => {
    const r = reportes.find((x) => x.id === n.reporteId);
    return `<tr><td><strong>${r.fecha}</strong><small>${r.hora}</small></td><td>${esc(r.sala)}</td>
      <td class="text-secondary">${esc(r.desc)}</td><td>${badge(n.estado)}<small>Act. ${n.actualizado}</small></td>
      <td>${n.seguimiento ? esc(n.seguimiento) : '<span class="libre">Sin seguimiento</span>'}</td>
      <td><button class="btn btn-sm btn-outline-dark" data-novedad="${n.id}">Actualizar</button></td></tr>`;
  }).join('') : '<tr><td colspan="6" class="text-center text-secondary">No hay novedades en este estado.</td></tr>';
}

function abrirNovedad(id) {
  novedadEnEdicion = novedades.find((n) => n.id === id);
  const r = reportes.find((x) => x.id === novedadEnEdicion.reporteId);
  $('#dlgNovResumen').textContent = `${r.sala} · ${r.fecha}: ${r.desc}`;
  $('#novEstado').value = novedadEnEdicion.estado;
  $('#novSeg').value = novedadEnEdicion.seguimiento;
  $('#dlgNovedad').showModal();
}

function guardarNovedad(e) {
  e.preventDefault();
  Object.assign(novedadEnEdicion, { estado: $('#novEstado').value, seguimiento: $('#novSeg').value.trim(), actualizado: hoy() });
  $('#dlgNovedad').close();
  pintarNovedades();
  aviso('Novedad actualizada.');
}

/* ---------- 5. NOTAS Y HORARIO ---------- */
function pintarNotas() {
  const c = $('#filtroCurso').value;
  $('#tbodyNotas').innerHTML = estudiantes.filter((s) => c === 'Todos' || s.curso === c).map((s) => `<tr>
    <th scope="row" class="fw-semibold">${esc(s.nombre)}</th><td>${s.curso}</td>
    ${s.notas.map((n) => `<td><span class="${claseNota(n)}">${n.toFixed(1)}</span></td>`).join('')}
    <td><span class="${claseNota(prom(s.notas))}">${prom(s.notas).toFixed(1)}</span></td></tr>`).join('');
}

function pintarHorario() {
  const dias = Object.keys(horario);
  const horas = Array.from({ length: 12 }, (_, i) => String(i + 7).padStart(2, '0') + ':00');
  $('#theadHorario').innerHTML = '<tr><th scope="col">Hora</th>' + dias.map((d) => `<th scope="col">${d}</th>`).join('') + '</tr>';
  $('#tbodyHorario').innerHTML = horas.map((h) => `<tr><th scope="row" class="hora">${h}</th>` + dias.map((d) => {
    const c = horario[d].find((x) => x[0] === h);
    return `<td>${c ? `<div class="clase" style="--c:${paleta[c[3]][0]};--bg:${paleta[c[3]][1]}"><strong>${esc(c[1])}</strong><span>${esc(c[2])}</span></div>` : '<span class="libre">Disponible</span>'}</td>`;
  }).join('') + '</tr>').join('');
}

/* ---------- 6. MATRÍCULA ---------- */
function pintarMatriculados() {
  $('#tbodyMatriculados').innerHTML = matriculados.map((m) =>
    `<tr><td>${esc(m.nombre)}</td><td>${esc(m.documento)}</td><td>${esc(m.curso)}</td><td>${m.fecha}</td></tr>`).join('');
}
const documentoExiste = (d) => matriculados.some((m) => m.documento === d);

function matricularUno(e) {
  e.preventDefault();
  const f = e.target;
  if (!f.checkValidity()) { f.reportValidity(); return; }
  const doc = $('#mDoc').value.trim();
  if (!/^\d{5,12}$/.test(doc)) { aviso('El documento debe tener entre 5 y 12 dígitos.', 'err'); return; }
  if (documentoExiste(doc)) { aviso('Ya existe un estudiante con ese documento.', 'err'); return; }
  matriculados.unshift({ nombre: `${$('#mNombres').value.trim()} ${$('#mApellidos').value.trim()}`, documento: doc, curso: $('#mCurso').value, fecha: hoy() });
  f.reset(); pintarMatriculados();
  aviso('Estudiante matriculado correctamente.');
}

function leerCsv(texto) {
  const lineas = texto.replace(/^\uFEFF/, '').split(/\r?\n/).filter((l) => l.trim());
  if (lineas.length < 2) return { error: 'El archivo está vacío o solo tiene encabezados.' };
  const sep = lineas[0].includes(';') ? ';' : ',';
  const cab = lineas[0].split(sep).map((h) => h.trim().toLowerCase());
  const faltan = COLUMNAS.filter((c) => !cab.includes(c));
  if (faltan.length) return { error: 'Faltan columnas: ' + faltan.join(', ') };
  const vistos = new Set();
  return { filas: lineas.slice(1).map((l, i) => {
    const v = l.split(sep).map((x) => x.trim()), f = {};
    cab.forEach((c, j) => { f[c] = v[j] || ''; });
    const errores = [];
    COLUMNAS.forEach((c) => { if (!f[c]) errores.push('falta ' + c); });
    if (f.documento && !/^\d{5,12}$/.test(f.documento)) errores.push('documento inválido');
    if (f.documento && (documentoExiste(f.documento) || vistos.has(f.documento))) errores.push('documento repetido');
    if (f.correo && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.correo)) errores.push('correo inválido');
    if (f.curso && !cursos.includes(f.curso)) errores.push('curso inexistente');
    vistos.add(f.documento);
    return { linea: i + 2, datos: f, errores };
  }) };
}

function pintarPreview() {
  const cont = $('#previewCsv');
  const ok = filasCsv.filter((f) => !f.errores.length).length;
  if (!filasCsv.length) { cont.innerHTML = ''; return; }
  cont.innerHTML = `<p class="small mb-2"><strong>${ok}</strong> válidas · <strong>${filasCsv.length - ok}</strong> con errores</p>
    <div class="table-responsive" style="max-height:220px"><table class="table table-sm mb-2"><thead><tr><th scope="col">Línea</th><th scope="col">Estudiante</th><th scope="col">Curso</th><th scope="col">Estado</th></tr></thead><tbody>` +
    filasCsv.map((f) => `<tr class="${f.errores.length ? 'fila-error' : ''}"><td>${f.linea}</td><td>${esc(f.datos.nombres)} ${esc(f.datos.apellidos)}</td><td>${esc(f.datos.curso)}</td>
      <td>${f.errores.length ? esc(f.errores.join(', ')) : badge('Resuelta').replace('Resuelta', 'Válida')}</td></tr>`).join('') +
    `</tbody></table></div><button class="btn-sigat" id="btnConfirmar" ${ok ? '' : 'disabled'}>Matricular ${ok} estudiantes</button>`;
}

async function cargarArchivo(archivo) {
  if (!archivo) return;
  if (!/\.csv$/i.test(archivo.name)) { aviso('Solo se aceptan archivos .csv (en Excel: Guardar como CSV).', 'err'); return; }
  const r = leerCsv(await archivo.text());
  if (r.error) { filasCsv = []; pintarPreview(); aviso(r.error, 'err'); return; }
  filasCsv = r.filas; pintarPreview();
}

function confirmarMasiva() {
  const validas = filasCsv.filter((f) => !f.errores.length);
  validas.forEach((f) => matriculados.unshift({ nombre: `${f.datos.nombres} ${f.datos.apellidos}`, documento: f.datos.documento, curso: f.datos.curso, fecha: hoy() }));
  filasCsv = []; pintarPreview(); pintarMatriculados(); $('#archivoCsv').value = '';
  aviso(`${validas.length} estudiantes matriculados.`);
}

function descargarPlantilla(e) {
  e.preventDefault();
  const csv = COLUMNAS.join(',') + '\nAna,Torres,TI,1098000111,10°A,María Torres,maria@correo.com\n';
  const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(new Blob([csv], { type: 'text/csv' })), download: 'plantilla_matricula.csv' });
  a.click(); URL.revokeObjectURL(a.href);
}

/* ---------- 7. NAVEGACIÓN ---------- */
function mostrarVista() {
  const id = location.hash.slice(1);
  const destino = document.getElementById(id)?.hasAttribute('data-vista') ? id : 'historial';
  document.querySelectorAll('[data-vista]').forEach((s) => { s.hidden = s.id !== destino; });
  document.querySelectorAll('#navSuperior a, #navInferior a').forEach((a) => {
    const activo = a.getAttribute('href') === '#' + destino;
    a.classList.toggle('activo', activo);
    activo ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current');
  });
  window.scrollTo(0, 0);
}

/* ---------- 8. ARRANQUE ---------- */
document.addEventListener('DOMContentLoaded', () => {
  $('#repSala').innerHTML = opciones(salas);
  $('#mCurso').innerHTML = opciones(cursos);
  $('#filtroCurso').innerHTML = opciones(['Todos', ...cursos]);
  pintarHistorial(); pintarNovedades(); pintarNotas(); pintarHorario(); pintarMatriculados();
  mostrarVista();
  window.addEventListener('hashchange', mostrarVista);

  $('#formReporte').addEventListener('submit', enviarReporte);
  $('#filtroCurso').addEventListener('change', pintarNotas);
  $('#tbodyHistorial').addEventListener('click', (e) => { const b = e.target.closest('[data-detalle]'); if (b) verDetalle(+b.dataset.detalle); });
  $('#tbodyNovedades').addEventListener('click', (e) => { const b = e.target.closest('[data-novedad]'); if (b) abrirNovedad(+b.dataset.novedad); });
  $('#filtrosNov').addEventListener('click', (e) => { const b = e.target.closest('[data-filtro]'); if (b) { filtroNov = b.dataset.filtro; pintarNovedades(); } });
  $('#formNovedad').addEventListener('submit', guardarNovedad);
  $('#novCancelar').addEventListener('click', () => $('#dlgNovedad').close());
  $('#formMatricula').addEventListener('submit', matricularUno);
  $('#archivoCsv').addEventListener('change', (e) => cargarArchivo(e.target.files[0]));
  $('#previewCsv').addEventListener('click', (e) => { if (e.target.id === 'btnConfirmar') confirmarMasiva(); });
  $('#plantilla').addEventListener('click', descargarPlantilla);

  const zona = $('#zonaCarga');
  ['dragenter', 'dragover'].forEach((ev) => zona.addEventListener(ev, (e) => { e.preventDefault(); zona.classList.add('arrastrando'); }));
  ['dragleave', 'drop'].forEach((ev) => zona.addEventListener(ev, (e) => { e.preventDefault(); zona.classList.remove('arrastrando'); }));
  zona.addEventListener('drop', (e) => cargarArchivo(e.dataTransfer.files[0]));
  $('#btnSalir').addEventListener('click', () => { if (confirm('¿Deseas cerrar sesión?')) location.hash = '#historial'; });
});
