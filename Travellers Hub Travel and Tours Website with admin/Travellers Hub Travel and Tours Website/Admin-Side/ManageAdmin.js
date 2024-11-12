/* Pagination configuration
const rowsPerPage = 10;
let currentPage = 1;
let totalRows = 0;

// Fetch data and initialize the table and pagination
function loadAdminData() {
    // Replace with actual fetch or data loading logic
    const adminData = [
       // { role: "Admin", name: "Jon Lemuel Mendoza", email: "mendoza@sample.com", contactNumber: "1234567890" },
        // Add more sample data as needed
    ];
    populateAdminTable(adminData);
    totalRows = adminData.length;
    paginateTable();
}

// Populate the table with admin data
function populateAdminTable(adminData) {
    const tableBody = document.querySelector("#dataTable tbody");
    tableBody.innerHTML = ""; // Clear current data

    adminData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage).forEach((admin, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><span>${admin.role}</span></td>
            <td><span>${admin.name}</span></td>
            <td><span>${admin.email}</span></td>
            <td><span>${admin.contactNumber}</span></td>
            <td class="text-center">
                <button class="btn btn-primary btn-sm" onclick="openModifyModal(${index})">Modify</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Open Modify Admin Modal and pre-fill data for selected admin
function openModifyModal(index) {
    const selectedAdmin = getSelectedAdminData(index);
    document.getElementById("modifyName").value = selectedAdmin.name || "";
    document.getElementById("modifyEmail").value = selectedAdmin.email || "";
    document.getElementById("modifyContactNumber").value = selectedAdmin.contactNumber || "";
    document.getElementById("modifyRole").value = selectedAdmin.role || "";

    new bootstrap.Modal(document.getElementById("ModifyAdminModal")).show();
}

// Update selected row data without changing empty fields
function confirmModifyAdmin() {
    const name = document.getElementById("modifyName").value;
    const email = document.getElementById("modifyEmail").value;
    const contactNumber = document.getElementById("modifyContactNumber").value;
    const role = document.getElementById("modifyRole").value;

    // Add backend update call here if needed
    updateTableRow(name, email, contactNumber, role);
}

// Pagination function
function paginateTable() {
    const pagination = document.getElementById("AdminTablePagination");
    pagination.innerHTML = ""; // Clear pagination
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement("li");
        pageItem.className = "page-item";
        pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        pageItem.onclick = () => changePage(i);
        pagination.appendChild(pageItem);
    }
}

// Change current page
function changePage(pageNumber) {
    currentPage = pageNumber;
    loadAdminData();
}

// Search function for admin data
document.getElementById("SearchAdmin").addEventListener("input", function (event) {
    const query = event.target.value.toLowerCase();
    const filteredData = adminData.filter(admin => 
        admin.name.toLowerCase().includes(query) ||
        admin.email.toLowerCase().includes(query) ||
        admin.contactNumber.includes(query)
    );
    populateAdminTable(filteredData);
});

window.onload = loadAdminData;  */
