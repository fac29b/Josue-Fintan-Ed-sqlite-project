// Example data of posts (replace this with actual data)
const posts = [
  {
    title: "First Post",
    content: "This is the content of the first post.",
  },
  {
    title: "Second Post",
    content: "This is the content of the second post.",
  },
  {
    title: "Third Post",
    content: "This is the content of the third post.",
  },
];

// Function to add posts to the post list
function addPosts() {
  const postList = document.getElementById("post-list");

  posts.forEach((post) => {
    const li = document.createElement("li");
    li.classList.add("post-item");

    const title = document.createElement("h2");
    title.classList.add("post-title");
    title.textContent = post.title;

    const content = document.createElement("p");
    content.classList.add("post-content");
    content.textContent = post.content;

    li.appendChild(title);
    li.appendChild(content);

    postList.insertBefore(li, postList.firstChild);
  });
}

// Call the addPosts function when the page loads
window.addEventListener("load", addPosts);
