// generate post html
async function postHtml(data) {
  const postsContainer = document.querySelector(".posts");
  data.forEach(async (element) => {
    let user = await getUser(element.userId);

    let comments = await getComments(element.id);

    postsContainer.innerHTML += `
    <div class="post">
    <div class="post_header">
      <div class="user-thumbnail"></div>
      <div class="user-name"><span>${user?.name}</span></div>
    </div>
    <div class="post_body">
      <p class="text">
       ${element.body}
      </p>
    </div>
    <hr />
    <div class="post_footer">
      <div class="user-thumbnail"></div>
      <div class="comment">
        <div class="user-name"><span>${comments[0].email}</span></div>
        <div class="comment-text">
          <p>
          >${comments[0].body}
          </p>
        </div>
      </div>
    </div>
    <button data-comment-id = ${element.id} onclick="commentHtml('${element.id}')">view more comments</button>
  </div>
    
    `;
  });
}

// generate comments html
async function commentHtml(postId) {
  const comments = await getComments(postId);
  const commentContainer = document.querySelector(".modal-inner");
  const modalBox = document.querySelector(".comment-modal");

  if (true) {
    modalBox.classList.remove("modal-close");
    modalBox.classList.add("modal-expand");
  }
  document.querySelector(".colse-btn").addEventListener("click", () => {
    modalBox.classList.add("modal-close");
  });
  comments.forEach((comment) => {
    commentContainer.innerHTML += `
    <div class="comment-box">
    <div class="user-thumbnail"></div>
    <div class="comment">
      <div class="user-name"><span>${comment.email}</span></div>
      <div class="text">
        <p>
        ${comment.body}
        </p>
      </div>
    </div>
  </div>
    
    
    `;
  });
}

// get user data
async function getUser(userId) {
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

// get comments
async function getComments(postId) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  const data = await res.json();
  return data;
}
// get all post
async function main() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();
    postHtml(data);
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
}

main();
