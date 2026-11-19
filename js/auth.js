
// Check login and protect pages
const page = document.body.dataset.page;

if (page === "login") {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    const error = document.getElementById("error");

    const student = students.find(s =>
      s.id === username && s.password === password
    );

    if (student) {
      sessionStorage.setItem("student", student.id);
      window.location.href = "dashboard.html";
    } else {
      error.textContent = "Invalid username or password.";
    }
  });

} else {
  if (!currentStudent()) {
    window.location.href = "login.html";
  }
}

// Logout function
function logout() {
  sessionStorage.removeItem("student");
  window.location.href = "login.html";
}

