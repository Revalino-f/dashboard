document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("login-form")) {
        document.getElementById("login-form").addEventListener("submit", login);
    }
    if (document.getElementById("admin-list")) {
        loadAdmins();
    }
    if (document.getElementById("link-list")) {
        loadLinks();
    }
});

// Fungsi untuk login
function login(event) {
    event.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            const admin = data.admins.find(admin => admin.username === username && admin.password === password);
            if (admin) {
                sessionStorage.setItem("admin", username); // Simpan login session
                window.location.href = "admin.html"; // Redirect ke halaman admin
            } else {
                alert("Login gagal! Username atau password salah.");
            }
        })
        .catch(error => console.error("Error:", error));
}


// Fungsi logout
function logout() {
    sessionStorage.removeItem("admin"); // Hapus status login
    window.location.href = "index.html"; // Redirect ke login
}


// Fungsi untuk memuat admin dari JSON
function loadAdmins() {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            const adminList = document.getElementById("admin-list");
            adminList.innerHTML = "";
            data.admins.forEach((admin, index) => {
                const li = document.createElement("li");
                li.textContent = admin.username;

                const btnDelete = document.createElement("button");
                btnDelete.textContent = "Hapus";
                btnDelete.onclick = () => deleteAdmin(index);

                li.appendChild(btnDelete);
                adminList.appendChild(li);
            });
        })
        .catch(error => console.error("Error loading admins:", error));
}

// Fungsi tambah admin
function addAdmin() {
    const newAdmin = document.getElementById("new-admin").value.trim();
    const newPassword = document.getElementById("new-password").value.trim();

    if (!newAdmin || !newPassword) {
        alert("Username dan password tidak boleh kosong!");
        return;
    }

    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            data.admins.push({ username: newAdmin, password: newPassword });

            saveData(data, () => {
                alert("Admin berhasil ditambahkan!");
                loadAdmins();
            });
        })
        .catch(error => console.error("Error adding admin:", error));
}

// Fungsi hapus admin
function deleteAdmin(index) {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            data.admins.splice(index, 1);
            saveData(data, () => {
                alert("Admin berhasil dihapus!");
                loadAdmins();
            });
        })
        .catch(error => console.error("Error deleting admin:", error));
}

// Fungsi untuk memuat link
function loadLinks() {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            const linkList = document.getElementById("link-list");
            linkList.innerHTML = "";
            data.links.forEach((link, index) => {
                const li = document.createElement("li");
                li.textContent = `${link.name} (${link.url})`;

                const btnDelete = document.createElement("button");
                btnDelete.textContent = "Hapus";
                btnDelete.onclick = () => deleteLink(index);

                li.appendChild(btnDelete);
                linkList.appendChild(li);
            });
        })
        .catch(error => console.error("Error loading links:", error));
}
// Fungsi tambah link dengan memastikan URL memiliki awalan "https://"
function addLink() {
    const name = document.getElementById("link-name").value.trim();
    let url = document.getElementById("link-url").value.trim();

    if (!name || !url) {
        alert("Nama dan URL tidak boleh kosong!");
        return;
    }

    // Menambahkan "https://" jika URL tidak dimulai dengan "http://" atau "https://"
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
    }

    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            data.links.push({ name, url });

            saveData(data, () => {
                alert("Link berhasil ditambahkan!");
                loadLinks();
            });
        })
        .catch(error => console.error("Error adding link:", error));
}


// Fungsi hapus link
function deleteLink(index) {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            data.links.splice(index, 1);
            saveData(data, () => {
                alert("Link berhasil dihapus!");
                loadLinks();
            });
        })
        .catch(error => console.error("Error deleting link:", error));
}

// Fungsi menyimpan data JSON ke server
function saveData(data, callback) {
    fetch("save.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            callback();
        } else {
            alert("Gagal menyimpan data!");
        }
    })
    .catch(error => console.error("Error saving data:", error));
}
