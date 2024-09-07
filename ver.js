function verUsuarios() {
  const usersList = document.getElementById("usersList");
  usersList.innerHTML = "";

  db.collection("usuario")
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        usersList.innerHTML =
          '<p class="text-gray-500">No hay usuarios registrados.</p>';
      } else {
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          const userElement = document.createElement("div");
          userElement.className = "mb-2 p-2 bg-gray-100 rounded";
          userElement.textContent = userData.nombre;
          usersList.appendChild(userElement);
        });
      }

      // Mostrar el modal
      document.getElementById("usersModal").classList.remove("hidden");
    })
    .catch((error) => {
      console.error("Error al obtener usuarios: ", error);
      usersList.innerHTML =
        '<p class="text-red-500">Error al cargar usuarios. Por favor, intenta de nuevo.</p>';
    });
}

// Cerrar el modal de usuarios
document
  .getElementById("closeUsersModal")
  .addEventListener("click", function () {
    document.getElementById("usersModal").classList.add("hidden");
  });
