const mockCourses = [
  { id: 1, name: "JavaScript Basics", price: 49.99, category: "Programming" },
  { id: 2, name: "Advanced CSS", price: 39.99, category: "Design" },
  { id: 3, name: "HTML Fundamentals", price: 29.99, category: "Programming" },
  { id: 4, name: "React for Beginners", price: 59.99, category: "Programming" },
];

let cart = [];

// Simulate login
document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  alert(`Welcome, ${email}!`);
  document.getElementById("login-section").classList.add("d-none");
  document.getElementById("courses-section").classList.remove("d-none");
  document.getElementById("cart-section").classList.remove("d-none");
  renderCourses(mockCourses);
});

// Render courses
function renderCourses(courses) {
  const coursesList = document.getElementById("courses-list");
  coursesList.innerHTML = "";

  courses.forEach((course) => {
    const courseCard = document.createElement("div");
    courseCard.classList.add("col-md-4");
    courseCard.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${course.name}</h5>
          <p class="card-text">Price: $${course.price.toFixed(2)}</p>
          <button class="btn btn-primary add-to-cart" data-id="${course.id}">Add to Cart</button>
        </div>
      </div>
    `;
    coursesList.appendChild(courseCard);
  });

  document.querySelectorAll(".add-to-cart").forEach((button) =>
    button.addEventListener("click", (e) => {
      const courseId = parseInt(e.target.dataset.id);
      const course = courses.find((c) => c.id === courseId);
      addToCart(course);
    })
  );
}

// Add to cart
function addToCart(course) {
  cart.push(course);
  renderCart();
}

// Render cart
function renderCart() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.innerHTML = `
      ${item.name} - $${item.price.toFixed(2)}
      <button class="btn btn-danger btn-sm remove-from-cart" data-index="${index}">Remove</button>
    `;
    cartItems.appendChild(li);
  });

  document.querySelectorAll(".remove-from-cart").forEach((button) =>
    button.addEventListener("click", (e) => {
      const index = parseInt(e.target.dataset.index);
      cart.splice(index, 1);
      renderCart();
    })
  );

  document.getElementById("total-price").textContent = `Total: $${total.toFixed(2)}`;
}

// Checkout
document.getElementById("checkout").addEventListener("click", () => {
  if (cart.length > 0) {
    alert("Checkout successful!");
    cart = [];
    renderCart();
  } else {
    alert("Your cart is empty!");
  }
});

// Search functionality
document.getElementById("search-bar").addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const filteredCourses = mockCourses.filter((course) =>
    course.name.toLowerCase().includes(query)
  );
  renderCourses(filteredCourses);
});
