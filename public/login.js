async function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const response = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: username, password: password }),
  });
  const data = await response.json();
  if (response.ok) {
    sessionStorage.setItem("clientId", data.userId);
    sessionStorage.setItem("clientUsername", data.username);
    window.location.href = "/home";
  } else {
    displayErrorMessage(data.error);
  }
}

function displayErrorMessage(message) {
  const errorElement = document.getElementById("error-message");
  errorElement.textContent = message;
  errorElement.style.display = "block";
}
