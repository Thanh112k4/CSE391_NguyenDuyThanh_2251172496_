const api = {
    baseURL: "https://jsonplaceholder.typicode.com",

    async getUsers() {
        const res = await fetch(`${this.baseURL}/users`);

        if (!res.ok)
            throw new Error("Không thể tải users");

        return await res.json();
    },

    async getUser(id) {
        const res = await fetch(
            `${this.baseURL}/users/${id}`
        );

        if (!res.ok)
            throw new Error("Không tìm thấy user");

        return await res.json();
    },

    async createUser(data) {
        const res = await fetch(
            `${this.baseURL}/users`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        );

        return await res.json();
    },

    async updateUser(id, data) {

        const res = await fetch(
            `${this.baseURL}/users/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        );

        return await res.json();
    },

    async deleteUser(id) {

        const res = await fetch(
            `${this.baseURL}/users/${id}`,
            {
                method: "DELETE"
            }
        );

        return res.ok;
    }
};

const ui = {

    renderUsers(users) {

        const table = document.getElementById("userTable");

        table.innerHTML = "";

        users.forEach(user => {

            table.innerHTML += `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>
                        <button
                            class="edit"
                            onclick="editUser(${user.id})">
                            Edit
                        </button>

                        <button
                            class="delete"
                            onclick="deleteUser(${user.id})">
                            Delete
                        </button>
                    </td>
                </tr>
            `;
        });
    },

    showLoading() {
        document.getElementById("loading")
            .style.display = "block";
    },

    hideLoading() {
        document.getElementById("loading")
            .style.display = "none";
    },

    showError(message) {
        alert("❌ " + message);
    },

    showSuccess(message) {
        document.getElementById("toast")
            .textContent = "✅ " + message;

        setTimeout(() => {
            document.getElementById("toast")
                .textContent = "";
        }, 3000);
    }
};

let users = [];
let editingId = null;

async function loadUsers() {

    try {

        ui.showLoading();

        users = await api.getUsers();

        ui.renderUsers(users);

    } catch(error) {

        ui.showError(error.message);

    } finally {

        ui.hideLoading();
    }
}

loadUsers();

const form = document.getElementById("userForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name =
        document.getElementById("name").value;

    const email =
        document.getElementById("email").value;

    try {

        if(editingId){

            const updated =
                await api.updateUser(
                    editingId,
                    {name,email}
                );

            users = users.map(user =>
                user.id === editingId
                ? updated
                : user
            );

            ui.showSuccess(
                "Cập nhật user thành công"
            );

            editingId = null;

        }else{

            const newUser =
                await api.createUser({
                    name,
                    email
                });

            newUser.id = users.length + 1;

            users.unshift(newUser);

            ui.showSuccess(
                "Thêm user thành công"
            );
        }

        ui.renderUsers(users);

        form.reset();

    } catch(error){

        ui.showError(error.message);
    }
});

async function editUser(id){

    try{

        const user =
            await api.getUser(id);

        document.getElementById("name")
            .value = user.name;

        document.getElementById("email")
            .value = user.email;

        editingId = id;

    }catch(error){

        ui.showError(error.message);
    }
}

async function deleteUser(id){

    const confirmDelete =
        confirm("Bạn có chắc muốn xóa?");

    if(!confirmDelete) return;

    try{

        await api.deleteUser(id);

        users = users.filter(
            user => user.id !== id
        );

        ui.renderUsers(users);

        ui.showSuccess(
            "Xóa user thành công"
        );

    }catch(error){

        ui.showError(error.message);
    }
}

document
.getElementById("searchInput")
.addEventListener("input", (e) => {

    const keyword =
        e.target.value.toLowerCase();

    const filtered =
        users.filter(user =>

            user.name
            .toLowerCase()
            .includes(keyword)

            ||

            user.email
            .toLowerCase()
            .includes(keyword)
        );

    ui.renderUsers(filtered);
});