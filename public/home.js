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
    // Post
    const li = document.createElement("li");
    li.classList.add("post-item");

    const title = document.createElement("h2");
    title.classList.add("post-title");
    title.textContent = post.title;

    const content = document.createElement("p");
    content.classList.add("post-content");
    content.innerHTML = post.content.replace(/\n/g, "<br>");

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    const updateButton = document.createElement("a");
    updateButton.classList.add("post-menu-button");
    updateButton.textContent = "Update";
    updateButton.id = `${post.post_id}`;

    const removeButton = document.createElement("a");
    removeButton.classList.add("post-menu-button");
    removeButton.textContent = "Remove";
    removeButton.id = `${post.post_id}`;

    li.appendChild(title);
    li.appendChild(content);
    li.appendChild(buttonContainer);
    buttonContainer.appendChild(updateButton);
    buttonContainer.appendChild(removeButton);

    postList.insertBefore(li, postList.firstChild);

    // Button event listeners
    updateButton.addEventListener("click", function () {
      retrieveDataForPost(updateButton);
    });

    removeButton.addEventListener("click", function () {
      removePost(removeButton.id);
    });
  }
}

async function removePost(postId) {
  const clientId = sessionStorage.getItem("clientId");
  const response = await fetch("/removePost", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: clientId, postToRemoveId: postId }),
  });
  const data = await response.json();
  if (response.ok) {
    window.location.reload();
  } else {
    console.log("Could not remove post.");
  }
}

async function retrieveDataForPost(button) {
  const clientId = sessionStorage.getItem("clientId");
  const response = await fetch("/retrieveDataForPost", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: clientId, postTofindId: button.id }),
  });
  const data = await response.json();
  if (response.ok) {
    const formPresent = document.getElementById(
      `form-${data.foundPostData.userPostData[0].post_id}`
    );
    if (formPresent) {
      return;
    }
    const postList = button.parentElement.parentElement;
    // Form
    const postDivElement = document.createElement("div");
    postDivElement.classList.add("post-item");
    postDivElement.id = `form-${data.foundPostData.userPostData[0].post_id}`;
    // Form element
    const formElement = document.createElement("form");
    formElement.action = "/updatepost";
    formElement.method = "POST";
    formElement.onsubmit = function () {
      updatePost(data.foundPostData.userPostData[0].post_id, event);
    };
    // Title label element
    const titleLabel = document.createElement("label");
    titleLabel.textContent = "Title:";
    formElement.appendChild(titleLabel);
    formElement.appendChild(document.createElement("br"));
    // Title input element
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.id = `title-${data.foundPostData.userPostData[0].post_id}`;
    titleInput.name = "title";
    titleInput.value = data.foundPostData.userPostData[0].title;
    titleInput.required = true;
    formElement.appendChild(titleInput);
    formElement.appendChild(document.createElement("br"));
    formElement.appendChild(document.createElement("br"));
    // Content label element
    const contentLabel = document.createElement("label");
    contentLabel.textContent = "Content:";
    formElement.appendChild(contentLabel);
    formElement.appendChild(document.createElement("br"));
    // Content textarea
    const contentTextarea = document.createElement("textarea");
    contentTextarea.id = `content-${data.foundPostData.userPostData[0].post_id}`;
    contentTextarea.name = "content";
    contentTextarea.rows = 20;
    contentTextarea.required = true;
    contentTextarea.textContent = data.foundPostData.userPostData[0].content;
    formElement.appendChild(contentTextarea);
    formElement.appendChild(document.createElement("br"));
    formElement.appendChild(document.createElement("br"));
    // Submit button element
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Submit";
    formElement.appendChild(submitButton);
    // Submit button element
    const cancelButton = document.createElement("button");
    cancelButton.onclick = function (event) {
      event.preventDefault();
      closeUpdateForm(data.foundPostData.userPostData[0].post_id);
    };
    cancelButton.textContent = "Cancel";
    formElement.appendChild(cancelButton);
    // Set the form element below div container element
    postDivElement.appendChild(formElement);
    // Insert both Post and Form into page post container
    postList.insertBefore(postDivElement, postList.firstChild);
  } else {
    console.log("Could not update post.");
  }
}

function closeUpdateForm(postId) {
  const formToClose = document.getElementById(`form-${postId}`);
  formToClose.remove();
}

async function updatePost(postId, event) {
  event.preventDefault();
  const clientId = sessionStorage.getItem("clientId");
  const title = document.getElementById(`title-${postId}`).value;
  const content = document.getElementById(`content-${postId}`).value;
  const response = await fetch("/updatePost", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: clientId,
      postToRemoveId: postId,
      title: title,
      content: content,
    }),
  });
  const data = await response.json();
  if (response.ok) {
    window.location.reload();
  } else {
    console.log("Could not update post.");
  }
}

// Call functions when the page loads
window.addEventListener("load", function () {
  retrieveUserData();
});
