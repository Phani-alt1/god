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


// SEARCH BUS
function searchBus() {

    let from = document.getElementById("from").value;
    let to = document.getElementById("to").value;
    let date = document.getElementById("date").value;

    if (from === "" || to === "" || date === "") {
        alert("Enter all search details");
        return;
    }

    alert("Searching buses from " + from + " to " + to);
}


// BOOK BUS
function bookBus(busName) {

    document.getElementById("passenger").focus();

    alert("You selected " + busName);
}


// CONFIRM BOOKING
function confirmBooking() {

    let passenger = document.getElementById("passenger").value;
    let age = document.getElementById("age").value;
    let seat = document.getElementById("seat").value;

    if (passenger === "" || age === "" || seat === "") {
        alert("Enter all passenger details");
        return;
    }

    let data = JSON.parse(localStorage.getItem("bookings")) || [];

    data.push({
        passenger: passenger,
        age: age,
        seat: seat,
        bus: "Express Travels",
        status: "Booked"
    });

    localStorage.setItem("bookings", JSON.stringify(data));

    document.getElementById("bookingResult").innerHTML =
        "Booking successful!";

    alert("Ticket booked successfully");
}


// SHOW BOOKING HISTORY
function showBookingHistory() {

    let history = document.getElementById("bookingHistory");

    if (!history) return;

    let data = JSON.parse(localStorage.getItem("bookings")) || [];

    history.innerHTML = "";

    for (let i = 0; i < data.length; i++) {

        let row = document.createElement("tr");

        row.innerHTML =
            "<td>" + data[i].bus + "</td>" +
            "<td>" + data[i].passenger + "</td>" +
            "<td>" + data[i].seat + "</td>" +
            "<td>" + data[i].status + "</td>" +
            "<td><button onclick='cancelBooking(" + i + ")'>Cancel</button></td>";

        history.appendChild(row);
    }
}


// CANCEL BOOKING
function cancelBooking(index) {

    let data = JSON.parse(localStorage.getItem("bookings")) || [];

    data[index].status = "Cancelled";

    localStorage.setItem("bookings", JSON.stringify(data));

    showBookingHistory();

    alert("Ticket cancelled");
}


// ADD BUS
function addBus() {

    let name = document.getElementById("busName").value;
    let route = document.getElementById("route").value;
    let time = document.getElementById("time").value;
    let seats = document.getElementById("seats").value;

    if (name === "" || route === "" || time === "" || seats === "") {
        alert("Enter all bus details");
        return;
    }

    let buses = JSON.parse(localStorage.getItem("buses")) || [];

    buses.push({
        name: name,
        route: route,
        time: time,
        seats: seats
    });

    localStorage.setItem("buses", JSON.stringify(buses));

    alert("Bus added successfully");

    document.getElementById("busName").value = "";
    document.getElementById("route").value = "";
    document.getElementById("time").value = "";
    document.getElementById("seats").value = "";

    showBuses();
}


// UPDATE BUS
function updateBus(button) {

    let bus = button.parentElement;

    let name = prompt("Enter new bus name");

    if (name !== null && name !== "") {

        bus.querySelector("b").innerHTML = name;

        alert("Bus updated");
    }
}


// DELETE BUS
function deleteBus(button) {

    button.parentElement.remove();

    alert("Bus deleted");
}
function showBuses() {

    let busList = document.getElementById("busList");

    if (!busList) return;

    let buses = JSON.parse(localStorage.getItem("buses")) || [];

    busList.innerHTML = "";

    for (let i = 0; i < buses.length; i++) {

        busList.innerHTML +=
            "<div class='book'>" +
            "<h3>" + buses[i].name + "</h3>" +
            "<p>Route: " + buses[i].route + "</p>" +
            "<p>Time: " + buses[i].time + "</p>" +
            "<p>Available Seats: " + buses[i].seats + "</p>" +
            "<button onclick=\"bookBus('" + buses[i].name + "')\">Book Now</button>" +
            "</div>";
    }
}