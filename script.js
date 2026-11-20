const form = document.getElementById("loginForm");
const docInput = document.getElementById("documento");
const passInput = document.getElementById("password");
const docError = document.getElementById("docError");
const passError = document.getElementById("passError");
const alertBox = document.getElementById("alert");
const submitBtn = document.getElementById("submitBtn");
const toggleBtn = document.getElementById("togglePass");
const eyeOn = document.getElementById("eyeOn");
const eyeOff = document.getElementById("eyeOff");

// Mostrar / ocultar contraseña
toggleBtn.addEventListener("click", () => {
  const show = passInput.type === "password";
  passInput.type = show ? "text" : "password";
  eyeOn.hidden = show;
  eyeOff.hidden = !show;
  toggleBtn.setAttribute("aria-label", show ? "Ocultar contraseña" : "Mostrar contraseña");
});

// Solo números en el documento
docInput.addEventListener("input", () => {
  docInput.value = docInput.value.replace(/\D/g, "");
  clearError(docInput, docError);
});
passInput.addEventListener("input", () => clearError(passInput, passError));

function setError(input, el, msg) {
  input.classList.add("invalid");
  el.textContent = msg;
}
function clearError(input, el) {
  input.classList.remove("invalid");
  el.textContent = "";
}
function showAlert(type, msg) {
  alertBox.className = "alert " + (type === "ok" ? "success-box" : "error-box");
  alertBox.textContent = msg;
  alertBox.hidden = false;
}

function validate() {
  let ok = true;
  const doc = docInput.value.trim();
  const pass = passInput.value;

  if (!doc) {
    setError(docInput, docError, "Ingresa tu número de documento.");
    ok = false;
  } else if (doc.length < 5 || doc.length > 12) {
    setError(docInput, docError, "El documento debe tener entre 5 y 12 dígitos.");
    ok = false;
  }

  if (!pass) {
    setError(passInput, passError, "Ingresa tu contraseña.");
    ok = false;
  } else if (pass.length < 6) {
    setError(passInput, passError, "Mínimo 6 caracteres.");
    ok = false;
  }
  return ok;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  alertBox.hidden = true;
  if (!validate()) return;

  submitBtn.disabled = true;
  submitBtn.querySelector("span").textContent = "Ingresando...";

  try {
    // 👉 Reemplaza esto por tu llamada real al backend:
    // const res = await fetch("/api/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ documento: docInput.value, password: passInput.value, rol: "docente" })
    // });
    // if (!res.ok) throw new Error("Credenciales incorrectas.");
    await new Promise((r) => setTimeout(r, 900)); // simulación

    showAlert("ok", "Inicio de sesión exitoso. Redirigiendo...");
    // window.location.href = "dashboard.html";
  } catch (err) {
    showAlert("error", err.message || "No se pudo iniciar sesión.");
  } finally {
    submitBtn.disabled = false;
    submitBtn.querySelector("span").textContent = "Iniciar sesión SIGAT";
  }
});

// Enlaces de ejemplo
document.getElementById("forgot").addEventListener("click", (e) => {
  e.preventDefault();
  alert("Aquí iría el flujo de recuperación de contraseña.");
});
document.getElementById("back").addEventListener("click", (e) => {
  e.preventDefault();
  history.back();
});
