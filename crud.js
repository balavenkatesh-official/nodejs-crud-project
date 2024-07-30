const apiUrl = 'http://localhost:3000/users';

async function fetchUsers() {
    const response = await axios.get(apiUrl);
    const users = response.data;
    const userTable = document.getElementById('userTable');
    userTable.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${user.id}</td>
            <td><input type="text" value="${user.name}" id="name-${user.id}"></td>
            <td><input type="email" value="${user.email}" id="email-${user.id}"></td>
            <td>
                <button class="btn btn-success" onclick="updateUser(${user.id})">Update</button>
                <button class="btn btn-danger" onclick="deleteUser(${user.id})">Delete</button>
            </td>
        `;

        userTable.appendChild(row);
    });
}

async function createUser() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    await axios.post(apiUrl, { name, email });
    fetchUsers();
}

async function updateUser(id) {
    const name = document.getElementById(`name-${id}`).value;
    const email = document.getElementById(`email-${id}`).value;

    await axios.put(`${apiUrl}/${id}`, { name, email });
    fetchUsers();
}

async function deleteUser(id) {
    await axios.delete(`${apiUrl}/${id}`);
    fetchUsers();
}

// Fetch users when the page loads
document.addEventListener('DOMContentLoaded', fetchUsers);
