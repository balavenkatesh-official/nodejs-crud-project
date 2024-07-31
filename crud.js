const apiUrl = '/users';  // Use a relative URL

async function fetchUsers() {
    try {
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
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

async function createUser() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    try {
        await axios.post(apiUrl, { name, email });
        fetchUsers();
    } catch (error) {
        console.error('Error creating user:', error);
    }
}

async function updateUser(id) {
    const name = document.getElementById(`name-${id}`).value;
    const email = document.getElementById(`email-${id}`).value;

    try {
        await axios.put(`${apiUrl}/${id}`, { name, email });
        fetchUsers();
    } catch (error) {
        console.error('Error updating user:', error);
    }
}

async function deleteUser(id) {
    try {
        await axios.delete(`${apiUrl}/${id}`);
        fetchUsers();
    } catch (error) {
        console.error('Error deleting user:', error);
    }
}

// Fetch users when the page loads
document.addEventListener('DOMContentLoaded', fetchUsers);
