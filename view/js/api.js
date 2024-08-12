const API_URL = 'http://localhost:9096';

// User Authentication
async function login(email, password) {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    return response.json();
}

async function signup(username, email, password) {
    const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
    });
    return response.json();
}

// Post Management
async function fetchPosts() {
    const response = await fetch(`${API_URL}/posts`);
    return response.json();
}

async function fetchPostById(id) {
    const response = await fetch(`${API_URL}/posts/${id}`);
    return response.json();
}

async function createPost(title, content, author) {
    const response = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, author }),
    });
    return response.json();
}

async function updatePost(id, title, content) {
    const response = await fetch(`${API_URL}/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
    });
    return response.json();
}

async function deletePost(id) {
    const response = await fetch(`${API_URL}/posts/${id}`, {
        method: 'DELETE'
    });
    return response.json();
}

// Comment Management
async function fetchComments(blogPostId) {
    const response = await fetch(`${API_URL}/comments/${blogPostId}`);
    return response.json();
}

async function createComment(content, blogPost, author) {
    const response = await fetch(`${API_URL}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, blogPost, author })
    });
    return response.json();
}

async function deleteComment(id) {
    const response = await fetch(`${API_URL}/comments/${id}`, {
        method: 'DELETE'
    });
    return response.json();
}
