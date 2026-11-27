'use strict';

/* ---------- 1. DATOS (en un proyecto real vendrían de una API) ---------- */
const estudiante = { nombre: 'Valentina', apellido: 'Ríos', curso: '10°A', documento: '10234002', periodoActual: 4 };

const materias = [
  { nombre: 'Programación I', notas: [4.5, 4.8, 4.9, 4.7] },
  { nombre: 'Bases de Datos', notas: [4.2, 4.6, 4.8, 4.9] },
  { nombre: 'Redes',          notas: [3.8, 4.0, 4.3, 4.5] },
  { nombre: 'Matemáticas',    notas: [4.9, 4.7, 5.0, 4.8] },
  { nombre: 'Inglés',         notas: [4.3, 4.5, 4.6, 4.7] }
];

const paleta = [
  ['#2f6fd6', '#e8effc'], ['#e08a1e', '#fdf0dc'], ['#3a9b2e', '#e6f5df'],
  ['#d6336c', '#fbe3ec'], ['#8e44ad', '#f1e4f6'], ['#17a2b8', '#dff4f7']
];
const horario = {
  Lunes:     [['07:00', 'Programación I', 'Ing. Ospina', 0], ['09:00', 'Bases de Datos', 'Dr. Herrera', 2]],
  Martes:    [['08:00', 'Redes', 'Mag. Ríos', 1], ['11:00', 'Programación II', 'Ing. Suárez', 3]],
  Miércoles: [['07:00', 'Sistemas Op.', 'Ing. Castro', 4], ['14:00', 'Videoconf.', 'Dr. Mora', 5]],
  Jueves:    [['09:00', 'Bases de Datos II', 'Dr. Herrera', 2], ['13:00', 'Ing. Software', 'Mag. Ríos', 1]],
  Viernes:   [['08:00', 'Programación I', 'Ing. Ospina', 0], ['15:00', 'Redes II', 'Ing. Castro', 4]]
};
const comunicados = [
  { titulo: 'Entrega de boletines', texto: 'Los boletines del cuarto período se entregan el viernes.', nuevo: true },
  { titulo: 'Jornada deportiva', texto: 'El martes la jornada de la tarde será deportiva.', nuevo: true },
  { titulo: 'Cambio de aula', texto: 'La clase de Redes pasa al laboratorio 2.', nuevo: true }
];

/* ---------- 2. UTILIDADES ---------- */
const $ = (sel) => document.querySelector(sel);
const promedio = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
const fmt = (n) => n.toFixed(1);
const claseNota = (n) => (n < 4 ? 'nota baja' : 'nota');
const etiqueta = (n) => (n >= 4.5 ? 'Excelente' : n >= 4 ? 'Bueno' : n >= 3 ? 'Aceptable' : 'Bajo');
const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ---------- 3. RENDERIZADO ---------- */
function pintarEncabezado() {
  const ini = estudiante.nombre[0] + estudiante.apellido[0];
  $('#saludoNombre').textContent = estudiante.nombre;
  $('#nombrePila').textContent = estudiante.nombre;
  $('#iniciales').textContent = ini;
  $('#inicialesHero').textContent = ini;
  $('#nombreCompleto').textContent = `${estudiante.nombre} ${estudiante.apellido}`;
  $('#curso').textContent = estudiante.curso;
  $('#documento').textContent = estudiante.documento;
  const fecha = new Date().toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  $('#fechaHoy').textContent = fecha.charAt(0).toUpperCase() + fecha.slice(1);
}

function pintarInicio() {
  const porPeriodo = [0, 1, 2, 3].map((i) => promedio(materias.map((m) => m.notas[i])));
  $('#promGeneral').textContent = fmt(promedio(porPeriodo));
  $('#tarjetasPeriodo').innerHTML = porPeriodo.map((p, i) => `
    <div class="col-6 col-md-3"><div class="card-periodo">
      <small>Período ${i + 1}</small>
      <div class="valor">${fmt(p)}</div>
      <div class="progress" role="progressbar" aria-label="Período ${i + 1}" aria-valuenow="${p}" aria-valuemin="0" aria-valuemax="5">
        <div class="progress-bar" style="width:${(p / 5) * 100}%"></div></div>
      <span class="estado">${etiqueta(p)}</span>
    </div></div>`).join('');
  $('#txtNuevos').textContent = `${comunicados.filter((c) => c.nuevo).length} mensajes nuevos`;
}

function pintarNotas() {
  const prom = materias.map((m) => promedio(m.notas));
  const general = promedio(prom);
  const resumen = [['Promedio', fmt(general)], ['Estado', general >= 3 ? 'Aprobado' : 'Reprobado'],
                   ['Curso', estudiante.curso], ['Período actual', estudiante.periodoActual + '°']];
  $('#resumenNotas').innerHTML = resumen.map(([t, v]) =>
    `<div class="col-6 col-md-3"><div class="resumen"><small>${t}</small><div class="valor">${esc(v)}</div></div></div>`).join('');
  $('#theadNotas').innerHTML = '<tr><th scope="col">Materia</th>' +
    [1, 2, 3, 4].map((n) => `<th scope="col">Período ${n}</th>`).join('') + '<th scope="col">Promedio</th></tr>';
  $('#tbodyNotas').innerHTML = materias.map((m, i) => `<tr><th scope="row" class="fw-semibold">${esc(m.nombre)}</th>` +
    m.notas.map((n) => `<td><span class="${claseNota(n)}">${fmt(n)}</span></td>`).join('') +
    `<td><span class="${claseNota(prom[i])}">${fmt(prom[i])}</span></td></tr>`).join('');
}

function pintarHorario() {
  const dias = Object.keys(horario);
  const horas = Array.from({ length: 12 }, (_, i) => String(i + 7).padStart(2, '0') + ':00');
  const chip = (n, p, c) => `<div class="clase" style="--c:${paleta[c][0]};--bg:${paleta[c][1]}"><strong>${esc(n)}</strong><span>${esc(p)}</span></div>`;

  $('#theadHorario').innerHTML = '<tr><th scope="col">Hora</th>' + dias.map((d) => `<th scope="col">${d}</th>`).join('') + '</tr>';
  $('#tbodyHorario').innerHTML = horas.map((h) => '<tr><th scope="row" class="hora">' + h + '</th>' + dias.map((d) => {
    const c = horario[d].find((x) => x[0] === h);
    return `<td>${c ? chip(c[1], c[2], c[3]) : '<span class="libre">Disponible</span>'}</td>`;
  }).join('') + '</tr>').join('');

  $('#listaDias').innerHTML = dias.map((d) => `<article class="dia-card"><h2>${d}</h2>` +
    horario[d].map((c) => `<div class="fila"><span class="hora">${c[0]}</span>${chip(c[1], c[2], c[3])}</div>`).join('') +
    '</article>').join('');
}

function pintarComunicados() {
  $('#listaComunicados').innerHTML = comunicados.map((c) => `
    <div class="list-group-item"><div class="d-flex justify-content-between">
      <strong>${esc(c.titulo)}</strong>${c.nuevo ? '<span class="badge text-bg-success">Nuevo</span>' : ''}</div>
      <p class="mb-0 small text-secondary">${esc(c.texto)}</p></div>`).join('');
}

/* ---------- 4. NAVEGACIÓN (una sola página, vistas por hash) ---------- */
function mostrarVista() {
  const id = location.hash.slice(1) || 'inicio';
  const destino = document.getElementById(id) ? id : 'inicio';
  document.querySelectorAll('[data-vista]').forEach((s) => { s.hidden = s.id !== destino; });
  document.querySelectorAll('#navSuperior a, #navInferior a').forEach((a) => {
    const activo = a.getAttribute('href') === '#' + destino;
    a.classList.toggle('activo', activo);
    activo ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current');
  });
  window.scrollTo(0, 0);
}

/* ---------- 5. ARRANQUE ---------- */
document.addEventListener('DOMContentLoaded', () => {
  pintarEncabezado(); pintarInicio(); pintarNotas(); pintarHorario(); pintarComunicados();
  mostrarVista();
  window.addEventListener('hashchange', mostrarVista);
  $('#btnSalir').addEventListener('click', () => {
    if (confirm('¿Deseas cerrar sesión?')) location.href = '#inicio'; // aquí iría el logout real
  });
});
