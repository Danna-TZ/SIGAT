/* ============================================================
   SIGAT – Login por rol
   La URL guarda el rol:  index.html#docente  /  #estudiante ...
   (así funciona el botón "atrás" y al recargar no se pierde)
   ============================================================ */

const ICONS = {
  docente:     '<path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/>',
  estudiante:  '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/>',
  coordinador: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 4v5M8 14h4"/>',
  padre:       '<circle cx="9" cy="8" r="3.5"/><path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6"/><circle cx="18" cy="9" r="2.5"/><path d="M18 14c2.5 0 4 1.8 4 4.5"/>',
  admin:       '<path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3Z"/><path d="m9 12 2 2 4-4"/>'
};

// Edita aquí los roles (nombre y descripción de cada tarjeta).
const ROLES = {
  docente:     { nombre: "Docente",          desc: "Gestiona tus cursos y estudiantes" },
  estudiante:  { nombre: "Estudiante",       desc: "Consulta tus notas y actividades" },
  coordinador: { nombre: "Coordinador",      desc: "Seguimiento académico y convivencia" },
  padre:       { nombre: "Padre de familia", desc: "Sigue el avance de tu hijo" },
  admin:       { nombre: "Administrador",    desc: "Gestión general del sistema" }
};
const PUBLIC_ROLES = ["docente", "estudiante", "coordinador", "padre"];

const svg = (paths, size = 18) =>
  `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;

/* ---------- Elementos ---------- */
const $ = (id) => document.getElementById(id);
const viewRoles = $("viewRoles"), viewLogin = $("viewLogin");
const form = $("loginForm");
const docInput = $("documento"), passInput = $("password");
const docError = $("docError"), passError = $("passError");
const alertBox = $("alert"), submitBtn = $("submitBtn");
const toggleBtn = $("togglePass"), eyeOn = $("eyeOn"), eyeOff = $("eyeOff");
let rolActual = null;

/* ---------- Tarjetas de rol ---------- */
$("rolesGrid").innerHTML = PUBLIC_ROLES.map((r) => `
  <button type="button" class="role-card" data-rol="${r}">
    <span class="rc-icon">${svg(ICONS[r], 22)}</span>
    <span><strong>${ROLES[r].nombre}</strong><span>${ROLES[r].desc}</span></span>
  </button>`).join("");

$("rolesGrid").addEventListener("click", (e) => {
  const card = e.target.closest(".role-card");
  if (card) location.hash = card.dataset.rol;
});

/* ---------- Router por hash ---------- */
function route() {
  const rol = location.hash.slice(1);
  if (ROLES[rol]) showLogin(rol);
  else showRoles();
}

function showRoles() {
  rolActual = null;
  viewLogin.hidden = true;
  viewRoles.hidden = false;
  $("roleBadge").textContent = "PORTAL INSTITUCIONAL";
}

function showLogin(rol) {
  rolActual = rol;
  const cfg = ROLES[rol];
  $("roleBadge").textContent = "ACCESO " + cfg.nombre.toUpperCase();
  $("roleText").textContent = "Acceso " + cfg.nombre;
  $("pillIcon").innerHTML = svg(ICONS[rol], 16);
  $("cardIcon").innerHTML = svg(ICONS[rol], 26);
  resetForm();
  viewRoles.hidden = true;
  viewLogin.hidden = false;
  docInput.focus();
}

window.addEventListener("hashchange", route);
$("back").addEventListener("click", (e) => {
  e.preventDefault();
  location.hash = "";
  history.replaceState(null, "", location.pathname); // quita el "#" vacío
  route();
});

/* ---------- Formulario ---------- */
function resetForm() {
  form.reset();
  clearError(docInput, docError);
  clearError(passInput, passError);
  alertBox.hidden = true;
  passInput.type = "password";
  eyeOn.hidden = false; eyeOff.hidden = true;
}

toggleBtn.addEventListener("click", () => {
  const show = passInput.type === "password";
  passInput.type = show ? "text" : "password";
  eyeOn.hidden = show; eyeOff.hidden = !show;
  toggleBtn.setAttribute("aria-label", show ? "Ocultar contraseña" : "Mostrar contraseña");
});

docInput.addEventListener("input", () => {
  docInput.value = docInput.value.replace(/\D/g, "");
  clearError(docInput, docError);
});
passInput.addEventListener("input", () => clearError(passInput, passError));

function setError(input, el, msg) { input.classList.add("invalid"); el.textContent = msg; }
function clearError(input, el)    { input.classList.remove("invalid"); el.textContent = ""; }
function showAlert(type, msg) {
  alertBox.className = "alert " + (type === "ok" ? "success-box" : "error-box");
  alertBox.textContent = msg;
  alertBox.hidden = false;
}

function validate() {
  let ok = true;
  const doc = docInput.value.trim(), pass = passInput.value;
  if (!doc) { setError(docInput, docError, "Ingresa tu número de documento."); ok = false; }
  else if (doc.length < 5 || doc.length > 12) { setError(docInput, docError, "El documento debe tener entre 5 y 12 dígitos."); ok = false; }
  if (!pass) { setError(passInput, passError, "Ingresa tu contraseña."); ok = false; }
  else if (pass.length < 6) { setError(passInput, passError, "Mínimo 6 caracteres."); ok = false; }
  return ok;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  alertBox.hidden = true;
  if (!validate()) return;

  submitBtn.disabled = true;
  submitBtn.querySelector("span").textContent = "Ingresando...";
  try {
    // 👉 Conecta tu backend. IMPORTANTE: el servidor debe verificar que el
    //    documento realmente tenga el rol enviado; no confíes en el rol del navegador.
    // const res = await fetch("/api/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ documento: docInput.value, password: passInput.value, rol: rolActual })
    // });
    // if (!res.ok) throw new Error("Credenciales incorrectas para este rol.");
    await new Promise((r) => setTimeout(r, 900)); // simulación

    showAlert("ok", "Inicio de sesión exitoso. Redirigiendo...");
    // const destinos = { docente: "docente.html", estudiante: "estudiante.html", coordinador: "coordinador.html", padre: "padre.html", admin: "admin.html" };
    // window.location.href = destinos[rolActual];
  } catch (err) {
    showAlert("error", err.message || "No se pudo iniciar sesión.");
  } finally {
    submitBtn.disabled = false;
    submitBtn.querySelector("span").textContent = "Iniciar sesión SIGAT";
  }
});

$("forgot").addEventListener("click", (e) => {
  e.preventDefault();
  alert("Aquí iría el flujo de recuperación de contraseña.");
});

route();
