const BASE_URL = "http://localhost:5000/api";

// REGISTER
async function register() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const address = document.getElementById("address").value;

  const message = document.getElementById("message");

  try {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password,
        address
      })
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
      message.style.color = "green";
      message.innerText = "Registered Successfully 🎉";

      localStorage.setItem("user", JSON.stringify({
        userName: data.user.name,
        userEmail: data.user.email,
        userAddress: data.user.address
      }));

      //REDIRECT AFTER 1 SECOND
      setTimeout(() => {
        window.location.href = "restaurants.html";
      }, 1000);

    } else {
      message.style.color = "red";
      message.innerText = data.message;
    }

  } catch (err) {
    message.style.color = "red";
    message.innerText = "Something went wrong";
  }
}

// LOGIN
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const message = document.getElementById("message");

  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await res.json();

    if (data.token) {
      message.style.color = "green";
      message.innerText = "Login Successful 🎉";

      //SAVE LOGIN STATE (IMPORTANT)
      localStorage.setItem("token", data.token);

      localStorage.setItem("user", JSON.stringify({
        userName: data.user.name,
        userEmail: data.user.email,
        userAddress: data.user.address
      }));

      //REDIRECT
      setTimeout(() => {
        window.location.href = "restaurants.html";
      }, 1000);

    } else {
      message.style.color = "red";
      message.innerText = data.message || "Login Failed";
    }
  } catch (err) {
    message.style.color = "red";
    message.innerText = "Server Error";
  }
}

function openMenu(restaurant) {
  localStorage.setItem("restaurantId", restaurant.id);
  localStorage.setItem("restaurantName", restaurant.name);
  localStorage.setItem("restaurantAddress", restaurant.address);
  localStorage.setItem("restaurantImages", restaurant.images);
  localStorage.setItem("restaurantRating", restaurant.rating);
  window.location.href = "menu.html";
}

//MENU
async function loadMenu() {
  const items1 = localStorage.getItem("items1");
  const id = localStorage.getItem("restaurantId");
  const res = await fetch(`${BASE_URL}/restaurants/menu/${id}`);
  const data = await res.json();
  const container = document.getElementById("menuList");
  container.innerHTML = "";
  data.forEach(item => {
    container.innerHTML += `
        <div class="card">
            <img src="${item.images}" alt="${item.name}"/>
            <h3>${item.name}</h3>
            <p class="price">₹${item.price}</p>
            <div class="btn-box">
              <button onclick='openOrderPopup(${JSON.stringify(item)})'>
                Order Now
              </button>
              <span><button onclick='addToCart(${JSON.stringify(item)})'>Add to Cart</button></span>
            </div>
        </div>
    `;
  });
};

//CART
function addToCart(item) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const restaurant = JSON.parse(localStorage.getItem("restaurantId"));
  item.restaurant_id = restaurant.id;
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}

//CART FUNCTION
function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cartItems");
  const totalItems = document.getElementById("totalItems");
  const totalPrice = document.getElementById("totalPrice");
  container.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    total += Number(item.price);
    container.innerHTML += `
        <div class="cart-card">
            <div class="cart-left">
                <img src="${item.images}" />
                <div class="cart-info">
                    <h3>${item.name}</h3>
                    <p>₹${item.price}</p>
                </div>
            </div>
            <button class="remove-btn"
            onclick="removeItem(${index})">
                Remove
            </button>
        </div>
        `;
  });
  totalItems.innerText = cart.length;
  totalPrice.innerText = total;
}

//REMOVE ITEM FUNCTION
function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

//ORDER
async function placeOrder(item) {
  console.log(item);
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const token = localStorage.getItem("token");
  try {
    const food_name = item.name;
    const total_price = finaltotal;
    const images = item.images;
    const res = await fetch(`${BASE_URL}/orders/place`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${token}`
      },
      body: JSON.stringify({
        food_name,
        total_price,
        images
      })
    });
    const data = await res.json();
    console.log(data);
  }
  catch (error) {
    console.log(error);
  }
  window.items1 = item;
  localStorage.setItem("items1", JSON.stringify(item));
}

function showOrderPopup() {
  const popup =
    document.getElementById("orderPopup");
  popup.style.display = "flex";
  setTimeout(() => {
    popup.style.display = "none";
  }, 3000);
}

//LOGIN
function goToLogin() {
  window.location.href = "login.html";
}

//REGISTER
function goToRegister() {
  window.location.href = "register.html";
}

//RESTAURANTS
let allRestaurants = []; // store full data
// LOAD RESTAURANTS
async function loadRestaurants() {
  const res = await fetch(`${BASE_URL}/restaurants`);
  const data = await res.json();
  allRestaurants = data; // store data
  displayRestaurants(data);
  console.log("DATA:", data)
}

// DISPLAY FUNCTION
function displayRestaurants(data) {
  const container = document.getElementById("restaurantList");
  container.innerHTML = "";
  data.forEach(restaurant => {
    container.innerHTML += `
      <div class="card" onclick='openMenu(${JSON.stringify(restaurant)})'>
        <img src="${restaurant.images}" alt="${restaurant.name}">
        <div class="card-content">
          <h3>${restaurant.name}</h3>
          <p>${restaurant.address}</p>
          <span class="rating">${restaurant.rating}★</span>
        </div>
      </div>
    `;
  });
}

// SEARCH FUNCTION
function searchRestaurants() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filtered = allRestaurants.filter(r =>
    r.name.toLowerCase().includes(query) ||
    r.address.toLowerCase().includes(query)
  );
  displayRestaurants(filtered);
}

function abc(){
  const user = JSON.parse(localStorage.getItem("user"));
  document.getElementById("location").innerText = user.userAddress;
}


function loadRestaurantBanner() {
  document.getElementById("restaurantName").innerText =
    localStorage.getItem("restaurantName");
  document.getElementById("restaurantAddress").innerText =
    localStorage.getItem("restaurantAddress");
  document.getElementById("restaurantRating").innerText =
    localStorage.getItem("restaurantRating") + " ★";
}

const userName = localStorage.getItem("userName");
if (userName) {
  document.getElementById("profile-icon").innerText = userName.charAt(0).toUpperCase();
}

async function getMyOrders() {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:5000/api/orders/my", {
      method: "GET",
      headers: {
        "Content-Type": "application/JSON",
        Authorization: `${token}`
      }
    }
  );
  const data = await res.json();
  console.log(data);
  let ordersHTML = `
    <h2>My Orders</h2>
    `;
  data.forEach(item => {
    ordersHTML += `
        <div class="order-card">
            <img src="${item.images}" class="food-img" >
            <div class="order-details">
                <div class="top-row">
                    <div>
                       <h3>${item.food_name}</h3>
                        <p>
                            ${item.restaurant_name}
                        </p>
                    </div>
                    <span class="status">
                        ${item.status}
                    </span>
                </div>
                <div class="bottom-row">
                    <span class="price">
                        ₹${item.total_price}
                    </span>
                </div>
            </div>
        </div>
        `;
  });
  document.getElementById("contentArea").innerHTML = ordersHTML;
}

// TOGGLE DROPDOWN
function toggleDropdown() {
  const menu = document.getElementById("dropdownMenu");
  if (menu.style.display === "flex") {
    menu.style.display = "none";
  } else {
    menu.style.display = "flex";
  }
}

function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  // remove old user's profile image
  const currentUser = JSON.parse(localStorage.getItem("user"));

  if (currentUser) {
    const imageKey = `profileImage_${currentUser.userEmail}`;
    localStorage.removeItem(imageKey);
  }
  alert("Logged out");
  window.location.href = "login.html";
}

function goToMyProfile() {
  window.location.href = "myprofile1.html";
}

const user = JSON.parse(localStorage.getItem("user"));
if (user) {
  document.getElementById("fullName").innerText = user.userName;
  document.getElementById("email").innerText = user.userEmail;
  document.getElementById("address").innerText = user.userAddress;
}

if (user.userName) {
  document.getElementById("fullName").innerText =
    user.userName;
}

function openPopup() {
  document.getElementById("addressPopup").style.display = "flex";
}

function closePopup() {
  document.getElementById("addressPopup").style.display = "none";
}

function saveAddress() {
  const newAddress = document.getElementById("newAddress").value;
  document.getElementById("address").innerText = newAddress;
  user.userAddress = newAddress;
  localStorage.setItem("user", JSON.stringify(user));
  closePopup();
}

function showOrderPopup() {
  const popup = document.getElementById("orderPopup");
  popup.style.display = "flex";
}

function closePopup1() {
  const popup = document.getElementById("orderPopup");
  popup.style.display = "none";
}

function showPayments() {
  const content =
    document.getElementById("contentArea");
  content.innerHTML = `
    <div class="top-section">
        <div>
          <h1>Payment Methods</h1>
          <p>
            Manage your saved payment methods and choose your preferred way to pay.
          </p>
        </div>
        <button class="add-btn">
          <i class="fa-solid fa-plus"></i>
          Add New Payment Method
        </button>
      </div>
      <!-- SAVED METHODS -->
      <h2 class="section-title">RECOMMENDED</h2>

      <!-- CARD -->
      <div class="payment-card active-card">
        <div class="left-box">
            <div class="option-icon" id="card">
              <img src="https://cdn-icons-png.flaticon.com/512/633/633611.png">
            </div>
          <div>
            <h3>Credit/Debit Card</h3>
            <p>Visa, MasterCard, RuPay & more</p>
          </div>
        </div>
        <div class="right-box">
          <div class="default-tag">
            <i class="fa-solid fa-check"></i>
            Default
          </div>
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </div>
      </div>

      <!-- GPAY -->
      <div class="payment-card">
        <div class="left-box">
          <div class="logo-box" id="gpay">
            <img src="../images/gpay.png">
          </div>
          <div>
            <h3>Google Pay UPI</h3>
            <p>Pay instantly using your Google Pay app</p>
          </div>
        </div>
        <div class="right-box">
          <label>
            <input type="radio" checked></radio>
          </label>  
        </div>
      </div>

      <!-- PHONEPE -->
      <div class="payment-card">
        <div class="left-box">
          <div class="logo-box" id="phonepe">
            <img src="../images/phonepe.png">
          </div>
          <div>
            <h3>PhonePe UPI</h3>
            <p>Pay securely using your PhonePe account</p>
          </div>
        </div>
        <div class="right-box">
          <label>
            <input type="radio" checked></radio>
          </label>  
        </div>
      </div>


      <!-- PAYTM -->
      <div class="payment-card">
        <div class="left-box">
          <div class="logo-box" id="paytm">
            <img src="../images/paytm.png">
          </div>
          <div>
            <h3>Paytm UPI</h3>
            <p>Pay securely using your Paytm account</p>
          </div>
        </div>
        <div class="right-box">
          <label>
            <input type="radio" checked></radio>
          </label>  
        </div>
      </div>


      <!-- MORE OPTIONS -->
      <h2 class="section-title more-title">MORE PAYMENT OPTIONS</h2>
      <div class="options-grid">
        <div class="option-card">
          <div class="option-left">
            <div class="option-icon" id="netbank">
              <img src="https://cdn-icons-png.flaticon.com/512/2830/2830284.png">
            </div>
            <div>
              <h3>Net Banking</h3>
              <p>All major banks supported</p>
            </div>
          </div>
          <i class="fa-solid fa-angle-right"></i>
        </div>
        <div class="option-card">
          <div class="option-left">
            <div class="option-icon green-icon">
              <i class="fa-solid fa-hand-holding-dollar"></i>
            </div>
            <div>
              <h3>Cash on Delivery(COD)</h3>
              <p>Pay in cash when order is delivered</p>
            </div>
          </div>
          <i class="fa-solid fa-angle-right"></i>
        </div>
      </div>

      <!-- SECURE PAYMENT -->
      <div class="security-box">
        <div class="secure-left">
          <i class="fa-solid fa-shield-halved"></i>
          <div>
            <h3>100% Secure Payments</h3>
            <p>Your payment details are encrypted and secure.</p>
          </div>
        </div>
        <div class="secure-right">
          <span>PCI DSS</span>
          <span><i class="fa fa-cc-visa"></i></span>
          <span>Mastercard SecureCode</span>
        </div>
      </div>
    </div>
`};

function showusersname() {
  const user = JSON.parse(localStorage.getItem("user"));
  document.getElementById("usersname").innerText = user.userName;
}

const profileInput = document.getElementById("profileInput");
const profilePreview = document.getElementById("profilePreview");
const currentUser = JSON.parse(localStorage.getItem("user"));
const imageKey = `profileImage_${currentUser.userEmail}`;
// Load saved image after refresh
const savedImage = localStorage.getItem(imageKey);
if (savedImage) {
  profilePreview.src = savedImage;
}

profileInput.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      profilePreview.src = e.target.result;
      // Save image for this specific user
      localStorage.setItem(imageKey, e.target.result);
    };
    reader.readAsDataURL(file);
  }
});

function openOrderPopup(food) {
  const item = localStorage.getItem("restaurantName");
  console.log(item);
  const item1 = localStorage.getItem("restaurantAddress");
  // OPEN POPUP
  document.getElementById("orderPopup").style.display = "flex";
  // DYNAMIC FOOD IMAGE
  document.getElementById("popupFoodImage").src = food.images;
  // RESTAURANT DETAILS
  document.getElementById("popupRestaurantName").innerText = item;
  document.getElementById("popupRestaurantAddress").innerText = item1;
  // FOOD DETAILS
  document.getElementById("popupFoodName").innerText = food.name;
  document.getElementById("popupFoodPrice").innerText = "₹" + food.price;
  // PRICE DETAILS
  const itemTotal = Number(food.price);
  const deliveryFee = 10;
  const gst = 8;
  const finalTotal = itemTotal + deliveryFee + gst;
  document.getElementById("itemTotal").innerText = "₹" + itemTotal;
  document.getElementById("finalTotal").innerText = "₹" + finalTotal;
  // USER DELIVERY ADDRESS
  const user =
    JSON.parse(localStorage.getItem("user"));
  if (user) {
    document.getElementById("deliveryAddress").innerText = user.userAddress;
  }
  window.currentFood = food;
  window.restaurantName = item;
  window.finaltotal = finalTotal;
  proceedToPayment();
}

function closeOrderPopup() {
  const popup = document.getElementById("orderPopup");
  popup.style.display = "none";
}

function proceedToPayment() {
  localStorage.setItem("currentOrder", JSON.stringify(window.currentFood));
  localStorage.setItem("restaurantName", window.restaurantName);
  localStorage.setItem("finalTotal", window.finaltotal);
}

function paymentsystem() {
  document.getElementById('pay-btn').addEventListener('click', async () => {
    const order = JSON.parse(localStorage.getItem("currentOrder"));
    //console.log(order);
    const finalTotal = localStorage.getItem("finalTotal");
    // Step 1: Create order on your backend
    const res = await fetch("http://localhost:5000/api/create-order", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: finalTotal * 100 })
    });
    const data = await res.json();
    console.log(data);

    // Step 2: Open Razorpay payment popup
    const options = {
      key: 'rzp_live_SvBpIw9MqldoLq',  // Same key from dashboard
      amount: finalTotal *100,
      currency: 'INR',
      name: 'Food Delivery',
      description: 'Food Order Payment',
      order_id: data.id,

      handler: async function (response) {
        // Step 3: Verify payment on backend
        const res = await fetch('http://localhost:5000/api/pay/verifyacc', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          })
        });

        const data = await res.json();

        if (data.success) {
          alert('✅ Payment Successful!');
          // Redirect to order confirmation page
          window.location.href = '/order-success.html';
        } else {
          alert('❌ Payment verification failed!');
        }
      },

      prefill: {
        name: 'Customer Name',   // You can pull from localStorage/session
        email: 'customer@email.com',
        contact: '9999999999'
      },

      theme: { color: '#e63946' }  // Your brand color
    };

    const rzp = new Razorpay(options);
    rzp.open();
  });
}

//Help and Support
function HelpAndSupport() {
  document.getElementById("contentArea").innerHTML = `
<div id="help-section" class="content-section">
  <h2>Help & Support</h2>

  <!-- Contact Options -->
  <div class="contact-cards">
    <div class="contact-card">
      <i class="fa fa-comments"></i>
      <p>Live Chat</p>
      <button onclick="openChat()">Chat Now</button>
    </div>
    <div class="contact-card">
      <i class="fa fa-phone"></i>
      <p>Call Us</p>
      <button onclick="window.location='tel:+1800123456'">1800-123-456</button>
    </div>
    <div class="contact-card">
      <i class="fa fa-envelope"></i>
      <p>Email Us</p>
      <button onclick="window.location='mailto:support@mesinest.com'">Send Email</button>
    </div>
  </div>

  <!-- FAQ Section -->
  <h3>Frequently Asked Questions</h3>
  <div class="faq-list">

    <div class="faq-item">
      <div class="faq-question" onclick="toggleFaq(this)">
        How do I cancel my order? <span class="arrow">▼</span>
      </div>
      <div class="faq-answer">
        You can cancel your order within 2 minutes of placing it. Go to My Orders → Select the order → Click Cancel Order.
      </div>
    </div>

    <div class="faq-item">
      <div class="faq-question" onclick="toggleFaq(this)">
        When will I get my refund? <span class="arrow">▼</span>
      </div>
      <div class="faq-answer">
        Refunds are processed within 5–7 business days to your original payment method. Wallet refunds are instant.
      </div>
    </div>

    <div class="faq-item">
      <div class="faq-question" onclick="toggleFaq(this)">
        My order is late. What should I do? <span class="arrow">▼</span>
      </div>
      <div class="faq-answer">
        You can track your order in real time from My Orders. If it's unusually late, use Live Chat for immediate help.
      </div>
    </div>

    <div class="faq-item">
      <div class="faq-question" onclick="toggleFaq(this)">
        I received the wrong item. How to report? <span class="arrow">▼</span>
      </div>
      <div class="faq-answer">
        Go to My Orders → Select the order → Click "Report an Issue" → Choose "Wrong Item Delivered".
      </div>
    </div>

    <div class="faq-item">
      <div class="faq-question" onclick="toggleFaq(this)">
        How do I change my delivery address? <span class="arrow">▼</span>
      </div>
      <div class="faq-answer">
        You can update your address before placing the order. After placing, address changes are not possible — contact support immediately.
      </div>
    </div>

  </div>

  <!-- Raise a Ticket -->
  <h3>Raise a Complaint</h3>
  <div class="raise-ticket">
    <select id="issue-type">
      <option value="">-- Select Issue Type --</option>
      <option>Order not delivered</option>
      <option>Wrong item received</option>
      <option>Refund not received</option>
      <option>Payment issue</option>
      <option>Other</option>
    </select>
    <textarea id="issue-desc" placeholder="Describe your issue..." rows="4"></textarea>
    <button onclick="submitTicket()">Submit</button>
  </div>
</div>`
}