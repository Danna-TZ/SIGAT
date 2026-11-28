// Base de datos simulada con roles diferenciados (padre / docente)
const USUARIOS_SIGAT = [
  {
    rol: "padre",
    documento: "10101010",
    correo: "carlos@correo.com",
    password: "1234",
    primerNombre: "Carlos",
    nombreCompleto: "Carlos Mendoza",
    iniciales: "CM",
    estudiante: {
      nombre: "Valentina Ríos",
      iniciales: "VR",
      curso: "10°A",
      documento: "10234002",
      promedioGeneral: "4.7",
      estado: "Aprobado",
      periodoActual: "4°",
      asistencia: "95%",
      periodos: [4.5, 4.8, 4.9, 4.7],
      materias: [
        { nombre: "Programación I", p1: 4.5, p2: 4.8, p3: 4.9, p4: 4.6, prom: 4.7 },
        { nombre: "Bases de Datos", p1: 4.2, p2: 4.8, p3: 4.8, p4: 4.9, prom: 4.6 },
        { nombre: "Redes", p1: 3.8, p2: 4.0, p3: 4.3, p4: 4.5, prom: 4.2 },
        { nombre: "Matemáticas", p1: 4.9, p2: 4.7, p3: 5.0, p4: 4.8, prom: 4.9 },
        { nombre: "Inglés", p1: 4.3, p2: 4.5, p3: 4.6, p4: 4.7, prom: 4.5 }
      ]
    },
    comunicados: [
      { titulo: "Reunión de padres de familia - Grado 10°", categoria: "Importante", claseTag: "tag-importante", fecha: "2026-11-22", nuevo: true },
      { titulo: "Entrega de boletines Período 4", categoria: "Académico", claseTag: "tag-academico", fecha: "2026-11-28", nuevo: true },
      { titulo: "Semana cultural SIGAT 2026", categoria: "Evento", claseTag: "tag-evento", fecha: "2026-11-15", nuevo: false },
      { titulo: "Actualización de datos de contacto", categoria: "Administrativo", claseTag: "tag-admin", fecha: "2026-11-10", nuevo: false }
    ]
  },
  {
    rol: "padre",
    documento: "20202020",
    correo: "laura@correo.com",
    password: "1234",
    primerNombre: "Laura",
    nombreCompleto: "Laura Gómez",
    iniciales: "LG",
    estudiante: {
      nombre: "Mateo Gómez",
      iniciales: "MG",
      curso: "8°B",
      documento: "10458921",
      promedioGeneral: "4.3",
      estado: "Aprobado",
      periodoActual: "4°",
      asistencia: "98%",
      periodos: [4.0, 4.2, 4.5, 4.4],
      materias: [
        { nombre: "Lógica Computacional", p1: 4.1, p2: 4.3, p3: 4.6, p4: 4.5, prom: 4.4 },
        { nombre: "Matemáticas", p1: 3.7, p2: 3.9, p3: 4.2, p4: 4.1, prom: 4.0 },
        { nombre: "Ciencias Naturales", p1: 4.4, p2: 4.5, p3: 4.7, p4: 4.6, prom: 4.6 },
        { nombre: "Lengua Castellana", p1: 3.9, p2: 4.1, p3: 4.4, p4: 4.3, prom: 4.2 },
        { nombre: "Inglés", p1: 4.0, p2: 4.2, p3: 4.5, p4: 4.5, prom: 4.3 }
      ]
    },
    comunicados: [
      { titulo: "Salida pedagógica Museo de Ciencias (8°B)", categoria: "Evento", claseTag: "tag-evento", fecha: "2026-11-24", nuevo: true },
      { titulo: "Entrega de boletines Período 4", categoria: "Académico", claseTag: "tag-academico", fecha: "2026-11-28", nuevo: false },
      { titulo: "Renovación de matrícula 2027", categoria: "Administrativo", claseTag: "tag-admin", fecha: "2026-11-12", nuevo: false }
    ]
  },
  {
    rol: "docente",
    documento: "30303030",
    correo: "andres@docente.edu.co",
    password: "1234",
    primerNombre: "Dr. Andrés",
    nombreCompleto: "Andrés Ramírez",
    iniciales: "AR"
  }
];

// Reportes iniciales del historial de salas
const REPORTES_INICIALES = [
  {
    fecha: "2026-11-18",
    hora: "08:15",
    sala: "Lab 305",
    estado: "Con novedad",
    checklist: "PCs funcionando, Aire acondicionado",
    descripcion: "Tres PCs sin conexión a red, video beam con imagen borrosa.",
    tieneFoto: true
  },
  {
    fecha: "2026-11-16",
    hora: "10:30",
    sala: "Aula 201",
    estado: "Bueno",
    checklist: "PCs funcionando, Sillas completas, Aire acondicionado, Video beam, Tablero",
    descripcion: "Todo en perfecto estado.",
    tieneFoto: false
  },
  {
    fecha: "2026-11-14",
    hora: "14:00",
    sala: "Lab 305",
    estado: "Con novedad",
    checklist: "PCs funcionando, Video beam",
    descripcion: "Cinco sillas dañadas y tablero sin marcadores.",
    tieneFoto: true
  },
  {
    fecha: "2026-11-11",
    hora: "07:45",
    sala: "Sala A",
    estado: "Bueno",
    checklist: "PCs funcionando, Sillas completas, Tablero",
    descripcion: "Conectividad estable, equipos en buen estado.",
    tieneFoto: false
  },
  {
    fecha: "2026-11-08",
    hora: "09:20",
    sala: "Lab 305",
    estado: "Con novedad",
    checklist: "PCs funcionando, Sillas completas, Tablero",
    descripcion: "Aire acondicionado apagado.",
    tieneFoto: false
  }
];

function obtenerDesempeno(nota) {
  if (nota >= 4.5) return "Excelente";
  if (nota >= 4.0) return "Sobresaliente";
  if (nota >= 3.0) return "Aceptable";
  return "Bajo";
}

function rutaInicioPorRol(rol) {
  return rol === "docente" ? "interfazdocente.html" : "interfazpadre.html";
}

function obtenerReportesDocente() {
  const guardados = sessionStorage.getItem("reportesSigatDocente");
  if (guardados) {
    return JSON.parse(guardados);
  }
  sessionStorage.setItem("reportesSigatDocente", JSON.stringify(REPORTES_INICIALES));
  return REPORTES_INICIALES;
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  // 1. LÓGICA DE INICIO DE SESIÓN EN LOGIN.HTML
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const identificador = document.getElementById("documento").value.trim().toLowerCase();
      const password = document.getElementById("password").value.trim();
      const errorBox = document.getElementById("login-error");

      const usuarioEncontrado = USUARIOS_SIGAT.find(
        (u) => (u.correo.toLowerCase() === identificador || u.documento === identificador) && u.password === password
      );

      if (usuarioEncontrado) {
        sessionStorage.setItem("sesionSigat", JSON.stringify(usuarioEncontrado));
        window.location.href = rutaInicioPorRol(usuarioEncontrado.rol);
      } else {
        errorBox.textContent = "Documento/correo o contraseña incorrectos. Verifica los datos.";
        errorBox.style.display = "block";
      }
    });
    return;
  }

  // 2. GUARDIA DE SEGURIDAD Y CONTROL DE ACCESO POR ROL
  const datosSesion = sessionStorage.getItem("sesionSigat");
  if (!datosSesion) {
    window.location.href = "login.html";
    return;
  }

  const usuario = JSON.parse(datosSesion);
  const rolPermitidoEnPagina = document.body.dataset.rol;

  if (rolPermitidoEnPagina && usuario.rol !== rolPermitidoEnPagina) {
    alert("Acceso restringido: No tienes permisos para ingresar a esta sección.");
    window.location.href = rutaInicioPorRol(usuario.rol);
    return;
  }

  // 3. BARRA SUPERIOR Y BOTÓN SALIR
  const saludoEl = document.getElementById("saludo-usuario");
  const avatarUserEl = document.getElementById("avatar-usuario");
  if (saludoEl) saludoEl.innerHTML = `Hola, <strong>${usuario.primerNombre}</strong>`;
  if (avatarUserEl) avatarUserEl.textContent = usuario.iniciales;

  const btnLogout = document.getElementById("btn-logout");
  if (btnLogout) {
    btnLogout.addEventListener("click", (e) => {
      e.preventDefault();
      sessionStorage.removeItem("sesionSigat");
      window.location.href = "login.html";
    });
  }

  // 4. LÓGICA EXCLUSIVA DEL DOCENTE (QR, FORMULARIO E HISTORIAL)
  if (usuario.rol === "docente") {
    // --- A. INTERFAZDOCENTE.HTML (Escáner QR + Formulario) ---
    const vistaQr = document.getElementById("vista-qr");
    const vistaFormulario = document.getElementById("vista-formulario");

    if (vistaQr && vistaFormulario) {
      const btnEscanear = document.getElementById("btn-escanear-qr");
      const qrViewport = document.getElementById("qr-viewport");
      const qrLaser = document.getElementById("qr-laser");
      const btnScanLabel = document.getElementById("btn-scan-label");
      const selectorSalaSim = document.getElementById("sala-qr-simulada");
      const inputSalaDetectada = document.getElementById("sala-detectada");
      const subtituloSala = document.getElementById("subtitulo-sala");

      const iniciarEscaneo = () => {
        btnEscanear.disabled = true;
        btnScanLabel.textContent = "Escaneando...";
        qrLaser.classList.add("scanning");

        setTimeout(() => {
          const salaSeleccionada = selectorSalaSim.value;
          inputSalaDetectada.value = salaSeleccionada;
          subtituloSala.textContent = `Sala: ${salaSeleccionada}`;

          qrLaser.classList.remove("scanning");
          btnEscanear.disabled = false;
          btnScanLabel.textContent = "Escanear código QR";

          vistaQr.style.display = "none";
          vistaFormulario.style.display = "block";
        }, 1100);
      };

      btnEscanear.addEventListener("click", iniciarEscaneo);
      qrViewport.addEventListener("click", iniciarEscaneo);

      // Volver al escáner QR
      const volverAlQr = (e) => {
        e.preventDefault();
        vistaFormulario.style.display = "none";
        vistaQr.style.display = "block";
      };
      document.getElementById("btn-reescanear").addEventListener("click", volverAlQr);
      document.getElementById("volver-qr").addEventListener("click", volverAlQr);

      // Contador de caracteres en descripción
      const textareaDesc = document.getElementById("descripcion-novedad");
      const contadorEl = document.getElementById("contador-caracteres");
      textareaDesc.addEventListener("input", () => {
        contadorEl.textContent = textareaDesc.value.length;
      });

      // Vista previa del nombre de archivo de foto evidencia
      const inputFoto = document.getElementById("foto-evidencia");
      const nombreArchivoEl = document.getElementById("nombre-archivo");
      inputFoto.addEventListener("change", () => {
        if (inputFoto.files && inputFoto.files.length > 0) {
          nombreArchivoEl.textContent = `Archivo seleccionado: ${inputFoto.files[0].name}`;
          nombreArchivoEl.style.color = "var(--green-main)";
        } else {
          nombreArchivoEl.textContent = "Arrastra o haz clic aquí";
          nombreArchivoEl.style.color = "";
        }
      });

      // Envío del formulario de novedad
      const formNovedad = document.getElementById("form-novedad");
      formNovedad.addEventListener("submit", (e) => {
        e.preventDefault();

        const ahora = new Date();
        const fechaStr = ahora.toISOString().split("T")[0];
        const horaStr = ahora.toTimeString().slice(0, 5);

        const checksMarcados = Array.from(
          document.querySelectorAll('input[name="inventario"]:checked')
        ).map((chk) => chk.value);

        const nuevoReporte = {
          fecha: fechaStr,
          hora: horaStr,
          sala: inputSalaDetectada.value.replace("Laboratorio ", "Lab "),
          estado: document.getElementById("estado-salon").value,
          checklist: checksMarcados.length > 0 ? checksMarcados.join(", ") : "Sin ítems marcados",
          descripcion: textareaDesc.value.trim(),
          tieneFoto: inputFoto.files && inputFoto.files.length > 0
        };

        const reportesActuales = obtenerReportesDocente();
        reportesActuales.unshift(nuevoReporte);
        sessionStorage.setItem("reportesSigatDocente", JSON.stringify(reportesActuales));
        sessionStorage.setItem("mostrarToastReporte", "true");

        window.location.href = "historialdocente.html";
      });
    }

    // --- B. HISTORIALDOCENTE.HTML (Tabla + Modal + Toast) ---
    const tbodyHistorial = document.getElementById("tabla-historial-body");
    if (tbodyHistorial) {
      const reportes = obtenerReportesDocente();

      // Mostrar toast si viene de registrar un reporte
      const toastEl = document.getElementById("toast-novedad");
      if (sessionStorage.getItem("mostrarToastReporte") === "true") {
        toastEl.style.display = "flex";
        sessionStorage.removeItem("mostrarToastReporte");
        setTimeout(() => {
          toastEl.style.display = "none";
        }, 4500);
      }

      document.getElementById("btn-cerrar-toast").addEventListener("click", () => {
        toastEl.style.display = "none";
      });

      // Renderizar filas de la tabla
      tbodyHistorial.innerHTML = reportes
        .map((rep, idx) => {
          const badgeClass = rep.estado === "Bueno" ? "status-bueno" : "status-novedad";
          const iconoFoto = rep.tieneFoto
            ? `<svg width="16" height="16" fill="none" stroke="#64748b" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`
            : `<span style="color:#94a3b8;">-</span>`;

          return `
            <tr>
              <td>
                <div class="cell-date">${rep.fecha}</div>
                <div class="cell-time">${rep.hora}</div>
              </td>
              <td><strong>${rep.sala}</strong></td>
              <td><span class="status-pill ${badgeClass}">${rep.estado}</span></td>
              <td class="cell-desc">${rep.descripcion}</td>
              <td>${iconoFoto}</td>
              <td style="text-align: right;">
                <button type="button" class="btn-detail" data-index="${idx}">Ver detalle</button>
              </td>
            </tr>
          `;
        })
        .join("");

      // Lógica del Modal "Ver detalle"
      const modal = document.getElementById("modal-detalle");
      const cerrarModal = () => {
        modal.style.display = "none";
      };

      document.getElementById("btn-cerrar-modal").addEventListener("click", cerrarModal);
      modal.addEventListener("click", (e) => {
        if (e.target === modal) cerrarModal();
      });

      tbodyHistorial.addEventListener("click", (e) => {
        const btn = e.target.closest(".btn-detail");
        if (!btn) return;

        const index = Number(btn.dataset.index);
        const rep = reportes[index];
        const numeroReporte = reportes.length - index;

        document.getElementById("modal-titulo").textContent = `Reporte #${numeroReporte}`;
        document.getElementById("modal-sala").textContent = rep.sala;
        document.getElementById("modal-fecha").textContent = `${rep.fecha} ${rep.hora}`;
        document.getElementById("modal-estado").textContent = rep.estado;
        document.getElementById("modal-checklist").textContent = rep.checklist || "No especificado";
        document.getElementById("modal-descripcion").textContent = rep.descripcion;
        document.getElementById("modal-foto").textContent = rep.tieneFoto ? "Sí" : "No";

        modal.style.display = "flex";
      });
    }
    return;
  }

  // 5. RENDERIZADO EXCLUSIVO PARA PADRE DE FAMILIA (SIN CAMBIOS)
  if (usuario.rol === "padre") {
    const est = usuario.estudiante;
    const nuevosCount = usuario.comunicados.filter((c) => c.nuevo).length;

    if (document.getElementById("estudiante-nombre")) {
      document.getElementById("avatar-estudiante").textContent = est.iniciales;
      document.getElementById("estudiante-nombre").textContent = est.nombre;
      document.getElementById("estudiante-detalle").textContent = `Curso: ${est.curso} · Doc: ${est.documento}`;
      document.getElementById("estudiante-promedio").textContent = est.promedioGeneral;

      est.periodos.forEach((nota, index) => {
        const num = index + 1;
        const scoreEl = document.getElementById(`p${num}-score`);
        const statusEl = document.getElementById(`p${num}-status`);
        if (scoreEl) scoreEl.textContent = nota.toFixed(1);
        if (statusEl) statusEl.textContent = obtenerDesempeno(nota);
      });

      document.getElementById("resumen-comunicados").textContent =
        nuevosCount === 1 ? "1 mensaje nuevo" : `${nuevosCount} mensajes nuevos`;
      document.getElementById("resumen-asistencia").textContent = `${est.asistencia} de asistencia`;
    }

    if (document.getElementById("tabla-notas-body")) {
      document.getElementById("titulo-notas").textContent = `Notas — ${est.nombre}`;
      document.getElementById("stat-promedio").textContent = est.promedioGeneral;
      document.getElementById("stat-estado").textContent = est.estado;
      document.getElementById("stat-curso").textContent = est.curso;
      document.getElementById("stat-periodo").textContent = est.periodoActual;

      const tbody = document.getElementById("tabla-notas-body");
      tbody.innerHTML = est.materias
        .map((m) => {
          const claseNota = (val) => (val >= 4.0 ? "grade-good" : "grade-warn");
          return `
            <tr>
              <td>${m.nombre}</td>
              <td class="${claseNota(m.p1)}">${m.p1.toFixed(1)}</td>
              <td class="${claseNota(m.p2)}">${m.p2.toFixed(1)}</td>
              <td class="${claseNota(m.p3)}">${m.p3.toFixed(1)}</td>
              <td class="${claseNota(m.p4)}">${m.p4.toFixed(1)}</td>
              <td class="grade-final">${m.prom.toFixed(1)}</td>
            </tr>
          `;
        })
        .join("");
    }

    if (document.getElementById("lista-comunicados")) {
      document.getElementById("badge-nuevos").textContent =
        nuevosCount === 1 ? "1 nuevo" : `${nuevosCount} nuevos`;

      const listaEl = document.getElementById("lista-comunicados");
      listaEl.innerHTML = usuario.comunicados
        .map(
          (c) => `
          <article class="notice-card">
            <div>
              <div class="notice-title-row">
                ${c.nuevo ? '<span class="unread-dot"></span>' : ""}
                <h2 class="notice-title">${c.titulo}</h2>
                <span class="tag ${c.claseTag}">${c.categoria}</span>
              </div>
              <p class="notice-date">${c.fecha}</p>
            </div>
            <span class="chevron">&#8250;</span>
          </article>
        `
        )
        .join("");
    }
  }
});