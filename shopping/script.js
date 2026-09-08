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


// SEARCH PRODUCTS
function searchProducts() {

    let input = document.getElementById("productSearch");

    if (!input) {
        input = document.getElementById("search");
    }

    if (!input) return;

    let text = input.value.toLowerCase();

    let products = document.getElementsByClassName("book");

    for (let i = 0; i < products.length; i++) {

        let product = products[i].innerText.toLowerCase();

        if (product.includes(text)) {
            products[i].style.display = "block";
        }
        else {
            products[i].style.display = "none";
        }
    }
}


// ADD TO CART
function addToCart(name, price) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
        name: name,
        price: price,
        quantity: 1
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(name + " added to cart");

    showCart();
}


// SHOW CART
function showCart() {

    let cartDiv = document.getElementById("cart");

    if (!cartDiv) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartDiv.innerHTML = "";

    let total = 0;

    for (let i = 0; i < cart.length; i++) {

        total = total + cart[i].price * cart[i].quantity;

        cartDiv.innerHTML +=
            "<div class='book'>" +
            "<b>" + cart[i].name + "</b>" +
            " - ₹" + cart[i].price +
            " | Quantity: " + cart[i].quantity +
            "<button onclick='editCart(" + i + ")'>Edit</button>" +
            "<button onclick='removeFromCart(" + i + ")'>Remove</button>" +
            "</div>";
    }

    document.getElementById("total").innerHTML =
        "Total = ₹" + total;
}


// EDIT CART
function editCart(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let quantity = prompt("Enter quantity");

    if (quantity !== null && quantity > 0) {

        cart[index].quantity = Number(quantity);

        localStorage.setItem("cart", JSON.stringify(cart));

        showCart();
    }
}


// REMOVE FROM CART
function removeFromCart(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    showCart();

    alert("Product removed");
}


// CHECKOUT
function checkout() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Cart is empty");
        return;
    }

    localStorage.setItem("orders", JSON.stringify(cart));

    localStorage.removeItem("cart");

    alert("Order placed successfully");

    showCart();
}


// SHOW ORDERS
function showOrders() {

    let history = document.getElementById("orderHistory");

    if (!history) return;

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    history.innerHTML = "";

    for (let i = 0; i < orders.length; i++) {

        history.innerHTML +=
            "<tr>" +
            "<td>" + orders[i].name + "</td>" +
            "<td>₹" + orders[i].price + "</td>" +
            "<td>" + orders[i].quantity + "</td>" +
            "<td>Confirmed</td>" +
            "</tr>";
    }

    if (orders.length > 0) {

        document.getElementById("orderStatus").innerHTML =
            "Order Status: Confirmed";
    }
}


// ADD PRODUCT
function addProduct() {

    let name = document.getElementById("productName").value;
    let price = document.getElementById("productPrice").value;
    let availability =
        document.getElementById("productAvailability").value;

    if (name === "" || price === "" || availability === "") {
        alert("Enter all product details");
        return;
    }

    let div = document.createElement("div");

    div.className = "book";

    div.innerHTML =
        "<b>" + name + "</b>" +
        "<p>₹" + price + "</p>" +
        "<p>" + availability + "</p>" +
        "<button onclick='updateProduct(this)'>Update</button>" +
        "<button onclick='deleteProduct(this)'>Delete</button>";

    document.getElementById("adminProducts").appendChild(div);

    alert("Product added");

    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productAvailability").value = "";
}


// UPDATE PRODUCT
function updateProduct(button) {

    let product = button.parentElement;

    let name = prompt("Enter new product name");

    if (name !== null && name !== "") {

        product.querySelector("b").innerHTML = name;

        alert("Product updated");
    }
}


// DELETE PRODUCT
function deleteProduct(button) {

    button.parentElement.remove();

    alert("Product deleted");
}