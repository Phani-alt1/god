// LOGIN
function login() {

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username === "" || password === "") {
        alert("Enter username and password");
        return;
    }

    alert("Login successful");
}


// REGISTER
function register() {

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("regPassword").value;

    if (name === "" || email === "" || password === "") {
        alert("Fill all fields");
        return;
    }

    alert("Registration successful");
}


// SEARCH BOOKS
function searchBooks() {

    let input = document.getElementById("search").value.toLowerCase();

    let books = document.getElementsByClassName("book");

    for (let i = 0; i < books.length; i++) {

        let text = books[i].innerText.toLowerCase();

        if (text.includes(input)) {
            books[i].style.display = "block";
        }
        else {
            books[i].style.display = "none";
        }
    }
}


// ISSUE BOOK
function issueBook(bookName) {

    let data = JSON.parse(localStorage.getItem("history")) || [];

    data.push({
        book: bookName,
        date: new Date().toLocaleDateString(),
        status: "Issued"
    });

    localStorage.setItem("history", JSON.stringify(data));

    alert("Book issued successfully");
}


// SHOW HISTORY
function showHistory() {

    let history = document.getElementById("history");

    if (!history) return;

    let data = JSON.parse(localStorage.getItem("history")) || [];

    history.innerHTML = "";

    for (let i = 0; i < data.length; i++) {

        let row = document.createElement("tr");

        row.innerHTML =
            "<td>" + data[i].book + "</td>" +
            "<td>" + data[i].date + "</td>" +
            "<td>" + data[i].status + "</td>" +
            "<td><button onclick='returnBook(" + i + ")'>Return</button></td>";

        history.appendChild(row);
    }
}


// RETURN BOOK
function returnBook(index) {

    let data = JSON.parse(localStorage.getItem("history")) || [];

    data[index].status = "Returned";

    localStorage.setItem("history", JSON.stringify(data));

    showHistory();

    alert("Book returned");
}


// FINE CALCULATOR
function calculateFine() {

    let days = Number(document.getElementById("days").value);

    if (days <= 0) {

        document.getElementById("fine").innerHTML = "No fine";

        return;
    }

    let fine = days * 5;

    document.getElementById("fine").innerHTML =
        "Fine = ₹" + fine;
}


// STUDY MATERIAL SEARCH
function searchMaterial() {

    let year = document.getElementById("year").value;
    let semester = document.getElementById("semester").value;

    if (year === "" || semester === "") {

        alert("Select year and semester");

        return;
    }

    document.getElementById("material").innerHTML =
        "Material available for Year " + year +
        ", Semester " + semester;
}


// ADD BOOK
function addBook() {

    let name = document.getElementById("bookName").value;
    let author = document.getElementById("author").value;
    let year = document.getElementById("bookYear").value;

    if (name === "" || author === "" || year === "") {

        alert("Enter all book details");

        return;
    }

    let div = document.createElement("div");

    div.className = "book";

    div.innerHTML =
        "<b>" + name + "</b> - " +
        author + " (" + year + ")" +
        "<button onclick='updateBook(this)'>Update</button>" +
        "<button onclick='deleteBook(this)'>Delete</button>";

    document.getElementById("adminBooks").appendChild(div);

    alert("Book added");

    document.getElementById("bookName").value = "";
    document.getElementById("author").value = "";
    document.getElementById("bookYear").value = "";
}


// UPDATE BOOK
function updateBook(button) {

    let book = button.parentElement;

    let name = prompt("Enter new book name");

    if (name !== null && name !== "") {

        book.querySelector("b").innerHTML = name;

        alert("Book updated");
    }
}


// DELETE BOOK
function deleteBook(button) {

    button.parentElement.remove();

    alert("Book deleted");
}