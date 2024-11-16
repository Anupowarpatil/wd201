document.addEventListener("DOMContentLoaded", () => {
    // Load stored data from localStorage on page load
    loadData();

    // Set up form submission
    const form = document.getElementById("registrationForm");
    form.addEventListener("submit", handleFormSubmit);
});

function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Get form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const terms = document.getElementById("terms").checked;

    // Validate the age (must be between 18 and 55)
    if (!validateAge(dob)) {
        alert("Date of birth must be for someone between the ages of 18 and 55.");
        return;
    }

    // Store data in local storage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ name, email, password, dob, terms });
    localStorage.setItem("users", JSON.stringify(users));

    // Clear the form
    document.getElementById("registrationForm").reset();

    // Reload the table with the new user
    loadData();
}

function loadData() {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const tableBody = document.getElementById("userTable").getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ""; // Clear existing table rows

    users.forEach((user, index) => {
        const row = tableBody.insertRow();

        row.insertCell(0).textContent = user.name;
        row.insertCell(1).textContent = user.email;
        row.insertCell(2).textContent = user.password;
        row.insertCell(3).textContent = user.dob;
        row.insertCell(4).textContent = user.terms ? "True" : "False";
    });
}

function validateAge(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    
    // Adjust age if birthday hasn't occurred this year
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age >= 18 && age <= 55;
}
