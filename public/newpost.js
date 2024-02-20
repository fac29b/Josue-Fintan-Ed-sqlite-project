async function newPost(event, form) {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const userId = sessionStorage.getItem("clientId");
  const response = await fetch("/storeNewPost", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: userId,
      postTitle: title,
      postContent: content,
    }),
  });
  const data = await response.json();
  if (response.ok) {
    form.reset();
    displayMessage(data.message, true);
  } else {
    displayMessage(data.error, false);
  }
}

function displayMessage(message, success) {
  const messageElement = document.getElementById("display-message");
  messageElement.textContent = message;
  messageElement.style.display = "block";
  if (success) {
    messageElement.style.color = "green";
    return;
  }
  messageElement.style.color = "red";
}
