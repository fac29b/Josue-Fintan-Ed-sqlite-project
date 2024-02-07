async function retrieveUserData() {
  const usernameText = document.getElementById("username");
  const clientId = sessionStorage.getItem("clientId");
  const clientUsername = sessionStorage.getItem("clientUsername");
  const response = await fetch("/retrieveUserData", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: clientId }),
  });
  const data = await response.json();
  if (response.ok) {
    usernameText.textContent = clientUsername;
    addPosts(data.userPostData.userPostData);
  } else {
    usernameText.textContent = "Undefined";
  }
}

// Function to add posts to the post list
function addPosts(postData) {
  const postList = document.getElementById("post-list");

  for (const post of postData) {
    const li = document.createElement("li");
    li.classList.add("post-item");

    const title = document.createElement("h2");
    title.classList.add("post-title");
    title.textContent = post.title;

    const content = document.createElement("p");
    content.classList.add("post-content");
    content.innerHTML = post.content.replace(/\n/g, "<br>");

    li.appendChild(title);
    li.appendChild(content);

    postList.insertBefore(li, postList.firstChild);
  }
}

// Call functions when the page loads
window.addEventListener("load", function () {
  retrieveUserData();
});
