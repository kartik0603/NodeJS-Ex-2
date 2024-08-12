// Handling form submissions
document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const response = await login(email, password);
    if (response.user) {
        window.location.href = 'dashboard.html';
    } else {
        alert('Login failed');
    }
});

document.getElementById('signupForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const response = await signup(username, email, password);
    if (response.message === 'User created successfully') {
        alert('Signup successful, you can now log in');
    } else {
        alert('Signup failed');
    }
});

document.getElementById('postForm')?.addEventListener('submit', async function (event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const author = "Author ID here"; // Replace with actual author ID
    const response = await createPost(title, content, author);
    if (response.post) {
        window.location.reload();
    } else {
        alert('Failed to create post');
    }
});

async function renderPosts() {
    const posts = await fetchPosts();
    const postsContainer = document.getElementById('posts');
    posts.forEach(async post => {
        const postElement = document.createElement('div');
        postElement.classList.add('col-md-4');
        postElement.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${post.content}</p>
                    <button class="btn btn-warning" onclick="editPost('${post._id}')">Edit</button>
                    <button class="btn btn-danger" onclick="deletePost('${post._id}')">Delete</button>
                </div>
                <div id="comments-${post._id}" class="comments-section">
                    <h6>Comments</h6>
                    <div id="comments-list-${post._id}"></div>
                    <textarea id="comment-content-${post._id}" class="form-control" rows="2" placeholder="Write a comment..."></textarea>
                    <button class="btn btn-success mt-2" onclick="addComment('${post._id}')">Add Comment</button>
                </div>
            </div>`;
        postsContainer.appendChild(postElement);
        renderComments(post._id);
    });
}

async function deletePost(id) {
    if (confirm('Are you sure you want to delete this post?')) {
        const response = await deletePost(id);
        if (response.message === 'Post deleted successfully') {
            window.location.reload();
        } else {
            alert('Failed to delete post');
        }
    }
}

async function editPost(id) {
    const post = await fetchPostById(id);
    document.getElementById('title').value = post.title;
    document.getElementById('content').value = post.content;

    document.getElementById('postForm').onsubmit = async function (event) {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const response = await updatePost(id, title, content);
        if (response.post) {
            window.location.reload();
        } else {
            alert('Failed to update post');
        }
    };
}

async function renderComments(postId) {
    const comments = await fetchComments(postId);
    const commentsList = document.getElementById(`comments-list-${postId}`);
    commentsList.innerHTML = '';
    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.innerHTML = `
            <p>${comment.content} <button class="btn btn-danger btn-sm" onclick="deleteComment('${comment._id}', '${postId}')">Delete</button></p>`;
        commentsList.appendChild(commentElement);
    });
}

async function addComment(postId) {
    const content = document.getElementById(`comment-content-${postId}`).value;
    const author = "Author ID here"; // Replace with actual author ID
    const response = await createComment(content, postId, author);
    if (response.comment) {
        renderComments(postId);
    } else {
        alert('Failed to add comment');
    }
}

async function deleteComment(id, postId) {
    if (confirm('Are you sure you want to delete this comment?')) {
        const response = await deleteComment(id);
        if (response.message === 'Comment deleted successfully') {
            renderComments(postId);
        } else {
            alert('Failed to delete comment');
        }
    }
}

if (window.location.pathname.endsWith('dashboard.html')) {
    renderPosts();
}
