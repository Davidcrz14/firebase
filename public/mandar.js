let lastRegistrationTime = 0;
const registrationCooldown = 60000; // 1 minuto en milisegundos

function guardar() {
  const currentTime = Date.now();
  if (currentTime - lastRegistrationTime < registrationCooldown) {
    alert("Por favor, espera 1 minuto antes de registrar otro usuario.");
    return;
  }

  const displayName = document.getElementById("displayName").value;
  if (!displayName.trim()) {
    alert("Por favor, ingresa un nombre válido.");
    return;
  }

  db.collection("usuario")
    .add({
      nombre: displayName,
    })
    .then((docRef) => {
      console.log("Registro exitoso: ", docRef.id);
      showSuccessModal();
      disableRegisterButton();
      lastRegistrationTime = currentTime;
    })
    .catch((error) => {
      console.error("Error ", error);
      alert(
        "Ocurrió un error al registrar el usuario. Por favor, intenta de nuevo."
      );
    });
}

function showSuccessModal() {
  const modal = document.getElementById("successModal");
  modal.classList.remove("hidden");

  const closeButton = document.getElementById("closeModal");
  closeButton.onclick = function () {
    modal.classList.add("hidden");
  };
}

function disableRegisterButton() {
  const registerButton = document.getElementById("registerButton");
  registerButton.disabled = true;
  registerButton.classList.add("opacity-50", "cursor-not-allowed");

  setTimeout(() => {
    registerButton.disabled = false;
    registerButton.classList.remove("opacity-50", "cursor-not-allowed");
  }, registrationCooldown);
}

// Asegúrate de que el botón de registro esté habilitado al cargar la página
window.onload = function () {
  const registerButton = document.getElementById("registerButton");
  registerButton.disabled = false;
  registerButton.classList.remove("opacity-50", "cursor-not-allowed");
};
