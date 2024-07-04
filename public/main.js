AOS.init({
  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 900, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});

document.addEventListener("DOMContentLoaded", function() {
  // Event listener para el formulario de registro
  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", function(event) {
      event.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const confirmPassword = document.getElementById("confirm-password").value.trim();

      if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
      }

      // Función para registrar al usuario
      registerUser(name, email, password);
    });

    // Toggle password visibility for registration
    const togglePassword = document.getElementById("togglePassword");
    const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");
    const passwordField = document.getElementById("password");
    const confirmPasswordField = document.getElementById("confirm-password");

    if (togglePassword && toggleConfirmPassword) {
      togglePassword.addEventListener("click", function() {
        const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
        passwordField.setAttribute("type", type);
        confirmPasswordField.setAttribute("type", type);
        this.innerHTML = type === "text" ? '<i class="fas fa-eye-slash"></i>' : '<i class="fas fa-eye"></i>';
      });

      toggleConfirmPassword.addEventListener("click", function() {
        const type = confirmPasswordField.getAttribute("type") === "password" ? "text" : "password";
        confirmPasswordField.setAttribute("type", type);
        this.innerHTML = type === "text" ? '<i class="fas fa-eye-slash"></i>' : '<i class="fas fa-eye"></i>';
      });
    }
  }

  // Event listener para el formulario de inicio de sesión
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
      event.preventDefault();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      // Función para iniciar sesión del usuario
      loginUser(email, password);
    });

    // Toggle password visibility for login
    const toggleLoginPassword = document.getElementById("togglePassword");
    const loginPasswordField = document.getElementById("password");

    if (toggleLoginPassword) {
      toggleLoginPassword.addEventListener("click", function() {
        const type = loginPasswordField.getAttribute("type") === "password" ? "text" : "password";
        loginPasswordField.setAttribute("type", type);
        this.innerHTML = type === "text" ? '<i class="fas fa-eye-slash"></i>' : '<i class="fas fa-eye"></i>';
      });
    }
  }
});

// Función para registrar usuario
function registerUser(name, email, password) {
  fetch('http://localhost:3000/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: name, email: email, password: password })
  })
  .then(response => response.json())
  .then(data => {
    alert("Registro exitoso. Por favor, inicia sesión.");
    window.location.href = "login.html"; // Redirige al usuario a la página de inicio de sesión
  })
  .catch(error => {
    console.error('Error:', error);
    alert("Error en el registro. Inténtalo de nuevo.");
  });
}

// Función para iniciar sesión del usuario
function loginUser(email, password) {
  fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email, password: password })
  })
  .then(response => response.json())
  .then(data => {
    if (data.error) {
      alert(data.message);
    } else {
      localStorage.setItem('token', data.token); // Almacenar el token en localStorage
      alert("Inicio de sesión exitoso.");
      window.location.href = "/index.html"; // Redirige al usuario a la página de inicio
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert("Error en el inicio de sesión. Inténtalo de nuevo.");
  });
}
