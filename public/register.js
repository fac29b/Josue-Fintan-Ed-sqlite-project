async function handleRegistration(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  console.log(password, confirmPassword);
  if (password != confirmPassword) {
    return displayMessage("Passwords do not match.");
  }
  const response = await fetch("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: username, password: password }),
  });
  const data = await response.json();
  if (response.ok) {
    displayMessage(data);
  } else {
    displayMessage(data);
  }
}

function displayMessage(data) {
  const errorElement = document.getElementById("error-message");
  errorElement.style.display = "block";
  if (data.success) {
    errorElement.textContent = data.message;
    errorElement.style.color = "green";
    return;
  }
  errorElement.textContent = data.error;
  errorElement.style.color = "red";
}
