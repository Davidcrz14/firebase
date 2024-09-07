// Configuración de Firebase
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Función para cambiar entre login y registro
document.getElementById("toggleButton").addEventListener("click", () => {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  if (loginForm.style.display === "none") {
    loginForm.style.display = "block";
    registerForm.style.display = "none";
    document.getElementById("toggleButton").textContent = "Cambiar a Registro";
  } else {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
    document.getElementById("toggleButton").textContent = "Cambiar a Login";
  }
});

// Función para manejar el registro de usuarios
function registerUser(email, password) {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Usuario registrado correctamente:", user.email);

      // Guardar datos adicionales en Firestore
      db.collection("users")
        .doc(user.uid)
        .set({
          email: user.email,
          displayName: document.getElementById("displayName").value,
          createdAt: new Date(),
        })
        .then(() => {
          console.log("Datos del usuario guardados en Firestore");
          document.getElementById("statusMessage").textContent =
            "Registro exitoso!";
        })
        .catch((error) => {
          console.error("Error al guardar datos en Firestore:", error.message);
          document.getElementById("statusMessage").textContent =
            "Error al registrar usuario";
        });
    })
    .catch((error) => {
      console.error("Error al registrar usuario:", error.message);
      document.getElementById("statusMessage").textContent =
        "Error al registrar usuario";
    });
}

// Función para manejar el login de usuarios
function loginUser(email, password) {
  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Usuario logueado correctamente:", user.email);
      document.getElementById("statusMessage").textContent =
        "Inicio de sesión exitoso!";
    })
    .catch((error) => {
      console.error("Error al iniciar sesión:", error.message);
      document.getElementById("statusMessage").textContent =
        "Error al iniciar sesión";
    });
}

// Event listeners para los formularios
document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("emailLogin").value;
  const password = document.getElementById("passwordLogin").value;
  loginUser(email, password);
});

document.getElementById("registerForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("emailRegister").value;
  const password = document.getElementById("passwordRegister").value;
  registerUser(email, password);
});

// Listener para cambios en la autenticación
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("Usuario conectado:", user.email);
    // Mostrar interfaz de usuario logueado
    document.getElementById("statusMessage").textContent = `Bienvenido, ${
      user.displayName || user.email
    }`;
  } else {
    console.log("No hay usuario conectado");
    // Mostrar interfaz de login/registro
    document.getElementById("statusMessage").textContent = "";
  }
});
