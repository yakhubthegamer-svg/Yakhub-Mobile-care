// Mock Data for Parts
console.log("Yakhub Mobile script loaded");
const partsData = {
    1: {
        title: "OLED Display Module",
        price: "₹10,000",
        image: "assets/images/part_screen_1777391833012.png",
        description: "High-resolution OLED display replacement. Delivers vibrant colors, deep blacks, and excellent touch responsiveness. Perfect for restoring your phone's original visual quality.",
        specs: [
            "Resolution: 2532 x 1170 pixels",
            "Refresh Rate: 120Hz",
            "Touch Type: Capacitive, Multi-touch",
            "Condition: Brand New, OEM equivalent"
        ]
    },
    2: {
        title: "High-Capacity Battery",
        price: "₹3,500",
        image: "assets/images/part_battery_1777391851734.png",
        description: "Premium lithium-ion replacement battery. Extend your device's lifespan and say goodbye to fast-draining power. Built with multiple safety protections.",
        specs: [
            "Capacity: 4500 mAh",
            "Type: Lithium-ion",
            "Voltage: 3.85V",
            "Cycle Life: >500 cycles"
        ]
    },
    3: {
        title: "Multi-Lens Camera Module",
        price: "₹7,000",
        image: "assets/images/part_camera_1777391867296.png",
        description: "Complete rear camera module replacement. Includes main, ultra-wide, and telephoto lenses to restore crisp, high-quality photography and video recording.",
        specs: [
            "Main Sensor: 48MP, f/1.8",
            "Ultra-wide: 12MP, 120-degree FOV",
            "Features: OIS, Phase Detection Autofocus",
            "Condition: Factory Tested"
        ]
    },
    4: {
        title: "Main Logic Board",
        price: "₹20,000",
        image: "assets/images/part_motherboard_1777391882445.png",
        description: "The core engine of your smartphone. This replacement logic board resolves catastrophic failures, water damage, or unrepairable chip-level issues.",
        specs: [
            "Processor: Octa-core Neural Engine",
            "Storage: 128GB Base",
            "RAM: 8GB LPDDR5",
            "Pre-tested for all functionalities"
        ]
    },
    5: {
        title: "Premium Glass Back Door",
        price: "₹1,500",
        image: "assets/images/part_backdoor_1777403770870.png",
        description: "Replace your cracked or scratched back glass. This premium glass replacement restores the original look and feel of your smartphone with precise camera lens cutouts and strong adhesive.",
        specs: [
            "Material: Gorilla Glass equivalent",
            "Color: Sleek Gradient/Midnight Black",
            "Includes pre-applied adhesive",
            "Condition: Brand New"
        ]
    },
    6: {
        title: "Full Metal Housing",
        price: "₹2,800",
        image: "assets/images/part_housing_1777403939796.png",
        description: "Complete middle frame and housing assembly. Ideal for phones that have bent frames, deep dents, or structural damage, providing a rigid and perfect shell for internal components.",
        specs: [
            "Material: Aerospace-grade Aluminum",
            "Precision CNC machined",
            "Includes side buttons and flex cables",
            "Condition: Brand New"
        ]
    },
    7: {
        title: "Charging Port PCB",
        price: "₹850",
        image: "assets/images/part_charging_pcb_1777403955848.png",
        description: "USB-C charging port sub-board. Fixes issues with slow charging, no charging, or a loose connection when plugging in your device. Comes fully integrated with microphone and antenna contacts.",
        specs: [
            "Port Type: USB Type-C",
            "Supports Fast Charging protocols",
            "Integrated primary microphone",
            "Condition: Factory Tested"
        ]
    },
    8: {
        title: "Loudspeaker Module",
        price: "₹650",
        image: "assets/images/part_speaker_1777403970739.png",
        description: "Main bottom loudspeaker buzzer replacement. Restores crystal-clear audio, loud ringing, and rich media playback if your original speaker is muffled, distorted, or completely silent.",
        specs: [
            "Type: Dynamic coil loud speaker",
            "High fidelity sound output",
            "Drop-in fit, no soldering required",
            "Condition: Brand New"
        ]
    }
};

// DOM Elements
const modal = document.getElementById('part-modal');
const closeModalBtn = document.querySelector('.close-modal');
const viewDetailsBtns = document.querySelectorAll('.view-details-btn');
const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
const cartBtn = document.querySelector('.cart-btn');

// Cart State
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const closeCartBtn = document.querySelector('.close-cart');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalPriceEl = document.getElementById('cart-total-price');

// India States & Cities Data
const indiaData = {
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Anantapur", "Rajahmundry", "Tirupati", "Kakinada", "Kadapa"],
    "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat", "Roing"],
    "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon"],
    "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia"],
    "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Rajnandgaon"],
    "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
    "Haryana": ["Faridabad", "Gurugram", "Panipat", "Ambala", "Yamunanagar"],
    "Himachal Pradesh": ["Shimla", "Dharamshala", "Solan", "Mandi"],
    "Jharkhand": ["Jamshedpur", "Dhanbad", "Ranchi", "Bokaro", "Deoghar"],
    "Karnataka": ["Bengaluru", "Hubballi-Dharwad", "Mysuru", "Kalaburagi", "Mangaluru"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Kollam", "Thrissur"],
    "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", "Solapur"],
    "Manipur": ["Imphal", "Thoubal", "Bishnupur"],
    "Meghalaya": ["Shillong", "Tura", "Jowai"],
    "Mizoram": ["Aizawl", "Lunglei", "Saiha"],
    "Nagaland": ["Dimapur", "Kohima", "Wokha"],
    "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur"],
    "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur"],
    "Sikkim": ["Gangtok", "Namchi", "Gyalshing"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Erode"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar"],
    "Tripura": ["Agartala", "Udaipur", "Dharmanagar"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Meerut", "Varanasi", "Prayagraj"],
    "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee", "Haldwani"],
    "West Bengal": ["Kolkata", "Howrah", "Asansol", "Siliguri", "Durgapur"],
    "Delhi": ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi"],
    "Other": ["Port Blair", "Chandigarh", "Daman", "Srinagar", "Leh", "Kavaratti", "Puducherry"]
};

// Global State
let currentSubtotal = 0;
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
// Body Scroll Lock Helper
function toggleScrollLock(lock) {
    if (lock) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// Updated toggleCart to handle scroll lock
window.toggleCart = function() {
    console.log("toggleCart triggered");
    cartSidebar.classList.toggle('open');
    cartOverlay.classList.toggle('show');
    
    const isCartOpen = cartSidebar.classList.contains('open');
    toggleScrollLock(isCartOpen);
    
    // Hide/Show support widget
    const helpWidget = document.getElementById('help-widget');
    if (helpWidget) {
        if (isCartOpen) {
            helpWidget.style.opacity = '0';
            helpWidget.style.pointerEvents = 'none';
        } else {
            helpWidget.style.opacity = '1';
            helpWidget.style.pointerEvents = 'all';
        }
    }
};

window.toggleAuthModal = function() {
    console.log("toggleAuthModal triggered");
    if (currentUser) {
        // Open Profile Modal instead
        profilePhoneInput.value = currentUser.phone;
        profileNameInput.value = currentUser.name || '';
        if (currentUser.profilePic) profilePicPreview.src = currentUser.profilePic;

        // Check if admin (Phone number: 9381599921)
        const profileAdminBtn = document.getElementById('profile-admin-btn');
        if (profileAdminBtn) {
            profileAdminBtn.style.display = (currentUser.phone === '9381599921') ? 'block' : 'none';
        }

        profileModal.style.display = 'flex';
        toggleScrollLock(true);
        setTimeout(() => profileModal.classList.add('show'), 10);
        return;
    }
    
    // Reset login form state
    const authError = document.getElementById('auth-error');
    const authPhoneInput = document.getElementById('auth-phone');
    const authOtpInput = document.getElementById('auth-otp');
    const otpGroup = document.getElementById('otp-group');
    const sendOtpBtn = document.getElementById('send-otp-btn');
    const verifyOtpBtn = document.getElementById('verify-otp-btn');

    if (authError) authError.textContent = '';
    if (authPhoneInput) authPhoneInput.value = '';
    if (authOtpInput) authOtpInput.value = '';
    if (otpGroup) otpGroup.style.display = 'none';
    if (sendOtpBtn) sendOtpBtn.style.display = 'block';
    if (verifyOtpBtn) verifyOtpBtn.style.display = 'none';

    if (authModal.style.display === 'flex') {
        authModal.classList.remove('show');
        toggleScrollLock(false);
        setTimeout(() => authModal.style.display = 'none', 300);
    } else {
        authModal.style.display = 'flex';
        toggleScrollLock(true);
        setTimeout(() => authModal.classList.add('show'), 10);
    }
};

window.openCheckoutModal = function() {
    console.log("openCheckoutModal triggered");
    if (cartItems.length === 0) {
        showNotification("Cart Empty", "Add some items first!");
        return;
    }
    
    // Close cart first but keep scroll lock
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('show');

    // Recalculate current subtotal
    currentSubtotal = cartItems.reduce((acc, item) => {
        const priceString = item.price ? item.price.toString() : "0";
        const price = parseInt(priceString.replace(/[^0-9]/g, '')) || 0;
        return acc + (price * (item.quantity || 1));
    }, 0);

    // Render items in checkout modal
    const checkoutItemsList = document.getElementById('checkout-items-list');
    if (checkoutItemsList) {
        checkoutItemsList.innerHTML = cartItems.map(item => `
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.95rem; color: #fff;">
                <span>${item.title} (x${item.quantity})</span>
                <span>₹${((parseInt(item.price.replace(/[^0-9]/g, '')) || 0) * item.quantity).toLocaleString('en-IN')}</span>
            </div>
        `).join('');
    }

    // Prefill if logged in
    if (currentUser) {
        const nameField = document.getElementById('checkout-name');
        const phoneField = document.getElementById('checkout-phone');
        if (nameField) nameField.value = currentUser.name || '';
        if (phoneField) phoneField.value = currentUser.phone || '';
    }
    
    calculateOrder();
    if (checkoutModal) {
        checkoutModal.style.display = 'flex';
        toggleScrollLock(true);
        setTimeout(() => checkoutModal.classList.add('show'), 10);
    }
};

// cartBtn.addEventListener('click', toggleCart); // Handled by HTML onclick for better reliability
closeCartBtn.addEventListener('click', toggleCart);
cartOverlay.addEventListener('click', toggleCart);

// Update item quantity
function updateQuantity(id, change) {
    const itemIndex = cartItems.findIndex(item => item.id === id);
    if (itemIndex > -1) {
        cartItems[itemIndex].quantity += change;
        if (cartItems[itemIndex].quantity <= 0) {
            cartItems.splice(itemIndex, 1);
        }
        renderCart();
    }
}

// Remove item from cart
function removeFromCart(id) {
    const itemIndex = cartItems.findIndex(item => item.id === id);
    if (itemIndex > -1) {
        cartItems.splice(itemIndex, 1);
        renderCart();
    }
}

// Render Cart
function renderCart() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let itemCount = 0;

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Your cart is currently empty.</p>';
    } else {
        cartItems.forEach((item) => {
            const priceValue = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
            total += priceValue * item.quantity;
            itemCount += item.quantity;

            const cartItemEl = document.createElement('div');
            cartItemEl.classList.add('cart-item');
            cartItemEl.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">${item.price}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">&times;</button>
            `;
            cartItemsContainer.appendChild(cartItemEl);
        });
    }

    cartTotalPriceEl.textContent = `₹${total.toLocaleString('en-IN')}`;
    cartBtn.textContent = `Cart (${itemCount})`;

    // Simple visual feedback
    cartBtn.style.transform = 'scale(1.1)';
    cartBtn.style.background = 'var(--primary-color)';
    cartBtn.style.color = '#000';
    
    setTimeout(() => {
        cartBtn.style.transform = 'scale(1)';
    }, 200);
}

// Add to Cart Function
function addToCart(id) {
    const data = partsData[id];
    if (data) {
        const existingItem = cartItems.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({ ...data, id: id, quantity: 1 });
        }
        renderCart();
        
        // Only toggle cart if it's not already open
        if (!cartSidebar.classList.contains('open')) {
            toggleCart();
        }
    }
}

// Add event listeners to "Add to Cart" buttons
addToCartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent triggering other clicks
        const id = btn.getAttribute('data-id');
        addToCart(id);
    });
});

// Initial render
renderCart();

// Modal Logic
function openModal(id) {
    const data = partsData[id];
    if(!data) return;

    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-price').textContent = data.price;
    document.getElementById('modal-image').src = data.image;
    document.getElementById('modal-description').textContent = data.description;
    
    const specsList = document.getElementById('modal-specs-list');
    specsList.innerHTML = '';
    data.specs.forEach(spec => {
        const li = document.createElement('li');
        li.textContent = spec;
        specsList.appendChild(li);
    });

    modal.style.display = 'flex';
    toggleScrollLock(true);
    
    // Update modal's Add to Cart button to use the current ID
    const modalAddToCartBtn = document.getElementById('modal-add-to-cart-btn');
    modalAddToCartBtn.onclick = () => {
        addToCart(id);
        closeModal();
    };

    // Small delay to allow display block to apply before changing opacity for transition
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

function closeModal() {
    modal.classList.remove('show');
    toggleScrollLock(false);
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300); // Matches CSS transition duration
}

// Event Listeners for Modal
viewDetailsBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        openModal(id);
    });
});

closeModalBtn.addEventListener('click', closeModal);

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Removed duplicate add to cart event listener

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Auth & Profile Logic
const authModal = document.getElementById('auth-modal');
const profileModal = document.getElementById('profile-modal');
const loginBtn = document.getElementById('login-btn');
const closeAuthBtn = document.querySelector('.close-auth');
const closeProfileBtn = document.querySelector('.close-profile');
const authForm = document.getElementById('auth-form');
const authPhoneInput = document.getElementById('auth-phone');
const otpGroup = document.getElementById('otp-group');
const sendOtpBtn = document.getElementById('send-otp-btn');
const verifyOtpBtn = document.getElementById('verify-otp-btn');
const authError = document.getElementById('auth-error');
const otpInputs = document.querySelectorAll('.otp-input');
const resendOtpBtn = document.getElementById('resend-otp-btn');
const resendTimerText = document.getElementById('resend-timer-text');
const resendCountdown = document.getElementById('resend-countdown');

let currentGeneratedOTP = null;
let resendTimerInterval = null;

// SMS API Key (Get yours from Fast2SMS.com)
const SMS_API_KEY = 'YOUR_API_KEY_HERE'; 

// OTP Input Handling (Focus next/prev)
otpInputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
        // Allow only numbers
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
        
        if (e.target.value && index < otpInputs.length - 1) {
            otpInputs[index + 1].focus();
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            otpInputs[index - 1].focus();
        }
    });

    // Add paste support for the first input
    if (index === 0) {
        input.addEventListener('paste', (e) => {
            const data = e.clipboardData.getData('text');
            if (data.length === 6 && /^\d+$/.test(data)) {
                otpInputs.forEach((inp, i) => inp.value = data[i]);
                otpInputs[5].focus(); // Focus last box after paste
            }
        });
    }
});

function startResendTimer() {
    let timeLeft = 60;
    resendOtpBtn.style.display = 'none';
    resendTimerText.style.display = 'block';
    resendCountdown.textContent = timeLeft;

    if (resendTimerInterval) clearInterval(resendTimerInterval);
    
    resendTimerInterval = setInterval(() => {
        timeLeft--;
        resendCountdown.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(resendTimerInterval);
            resendTimerText.style.display = 'none';
            resendOtpBtn.style.display = 'inline-block';
        }
    }, 1000);
}

function generateRandomOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

const profileForm = document.getElementById('profile-form');
const profileNameInput = document.getElementById('profile-name');
const profilePhoneInput = document.getElementById('profile-phone');
const profilePicPreview = document.getElementById('profile-pic-preview');
const profilePicInput = document.getElementById('profile-pic-input');
const changePicBtn = document.getElementById('change-pic-btn');
const profileLogoutBtn = document.getElementById('profile-logout-btn');
const profileAdminBtn = document.getElementById('profile-admin-btn');

// currentUser is now declared at the top

function updateAuthUI() {
    console.log("updateAuthUI called");
    if (currentUser) {
        if (loginBtn) loginBtn.textContent = currentUser.name ? `Hi, ${currentUser.name}` : `Hi, ${currentUser.phone}`;
    } else {
        if (loginBtn) loginBtn.textContent = 'Log In / Sign Up';
    }
    if (typeof prefillAppointmentForm === 'function') prefillAppointmentForm();
}
try {
    updateAuthUI();
} catch (e) {
    console.error("Auth UI initialization failed:", e);
}
// toggleAuthModal is now defined at the top as window.toggleAuthModal

// loginBtn.addEventListener('click', toggleAuthModal); // Handled by HTML onclick now
closeAuthBtn.addEventListener('click', () => {
    authModal.classList.remove('show');
    setTimeout(() => authModal.style.display = 'none', 300);
});
closeProfileBtn.addEventListener('click', () => {
    profileModal.classList.remove('show');
    setTimeout(() => profileModal.style.display = 'none', 300);
});

// Send OTP
async function sendOTP() {
    const phone = authPhoneInput.value.trim();
    if (!phone.match(/^[0-9]{10}$/)) {
        authError.textContent = 'Please enter a valid 10-digit mobile number.';
        return;
    }
    authError.textContent = '';
    
    // Generate Random 6-digit OTP
    currentGeneratedOTP = generateRandomOTP();
    
    // Show "Sending..." notification
    showNotification("Sending OTP...", "Please wait a moment...", "info");

    try {
        // Real SMS logic using Fast2SMS
        if (SMS_API_KEY !== 'YOUR_API_KEY_HERE') {
            const response = await fetch(`https://www.fast2sms.com/dev/bulkV2?authorization=${SMS_API_KEY}&variables_values=${currentGeneratedOTP}&route=otp&numbers=${phone}`);
            const result = await response.json();
            
            if (result.return) {
                showNotification("OTP Sent Successfully!", `A real code has been sent to ${phone}`, "success");
            } else {
                throw new Error(result.message || "API error");
            }
        } else {
            // Demo Mode fallback
            showNotification("OTP Sent (Demo)", `Your secure code is: ${currentGeneratedOTP}`, "success");
            console.log(`[PROPER OTP] Code for ${phone}: ${currentGeneratedOTP}`);
        }

        otpGroup.style.display = 'block';
        sendOtpBtn.style.display = 'none';
        verifyOtpBtn.style.display = 'block';
        
        // Clear any previous inputs and focus
        otpInputs.forEach(input => input.value = '');
        otpInputs[0].focus();
        
        startResendTimer();
    } catch (error) {
        console.error("SMS Error:", error);
        showNotification("Delivery Failed", "Check your API key or internet connection.", "error");
    }
}

sendOtpBtn.addEventListener('click', sendOTP);
resendOtpBtn.addEventListener('click', sendOTP);

// Verify OTP & Login/Signup
authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const phone = authPhoneInput.value.trim();
    
    // Combine all 6 inputs
    let enteredOtp = '';
    otpInputs.forEach(input => enteredOtp += input.value);

    if (enteredOtp.length < 6) {
        authError.textContent = 'Please enter the full 6-digit code.';
        return;
    }

    if (enteredOtp !== currentGeneratedOTP) {
        authError.textContent = 'Invalid OTP. Please check the code sent to your device.';
        // Clear inputs on failure
        otpInputs.forEach(input => input.value = '');
        otpInputs[0].focus();
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let user = users.find(u => u.phone === phone);

    if (!user) {
        user = { phone, name: '', profilePic: '' };
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        alert('Account created successfully!');
    }

    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateAuthUI();
    requestNotificationPermission(); // Request permission on login
    
    authModal.classList.remove('show');
    setTimeout(() => authModal.style.display = 'none', 300);
});

// Profile Picture Handling
changePicBtn.addEventListener('click', () => profilePicInput.click());
profilePicInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profilePicPreview.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});

// Save Profile
profileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    currentUser.name = profileNameInput.value.trim();
    currentUser.profilePic = profilePicPreview.src;

    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const idx = users.findIndex(u => u.phone === currentUser.phone);
    if (idx > -1) {
        users[idx] = currentUser;
        localStorage.setItem('users', JSON.stringify(users));
    }
    
    updateAuthUI();
    profileModal.classList.remove('show');
    setTimeout(() => profileModal.style.display = 'none', 300);
});

// Logout
profileLogoutBtn.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    currentUser = null;
    updateAuthUI();
    profileModal.classList.remove('show');
    setTimeout(() => profileModal.style.display = 'none', 300);
});

// Profile Admin Button (Direct access)
profileAdminBtn.addEventListener('click', () => {
    profileModal.classList.remove('show');
    setTimeout(() => profileModal.style.display = 'none', 300);
    
    // Automatically skip password and show dashboard
    adminLoginView.style.display = 'none';
    adminDashboardView.style.display = 'block';
    
    refreshAdminDashboard();

    adminModal.style.display = 'flex';
    setTimeout(() => adminModal.classList.add('show'), 10);
});

// Admin Logic
const adminModal = document.getElementById('admin-modal');
const closeAdminBtn = document.querySelector('.close-admin');
const adminLoginView = document.getElementById('admin-login-view');
const adminDashboardView = document.getElementById('admin-dashboard-view');
const adminPasswordInput = document.getElementById('admin-password');
const adminSubmitBtn = document.getElementById('admin-submit');
const adminError = document.getElementById('admin-error');
const adminUsersTableBody = document.querySelector('#admin-users-table tbody');
const adminLogoutBtn = document.getElementById('admin-logout');

// Tabs
const tabBtns = document.querySelectorAll('.admin-tab-btn');
const tabContents = document.querySelectorAll('.admin-tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active', 'btn-primary'));
        tabBtns.forEach(b => b.classList.add('btn-secondary'));
        btn.classList.add('active', 'btn-primary');
        btn.classList.remove('btn-secondary');

        tabContents.forEach(c => c.style.display = 'none');
        document.getElementById(`admin-${btn.dataset.tab}-tab`).style.display = 'block';
    });
});

function toggleAdminModal() {
    if (adminModal.style.display === 'flex') {
        adminModal.classList.remove('show');
        setTimeout(() => adminModal.style.display = 'none', 300);
    } else {
        adminPasswordInput.value = '';
        adminError.textContent = '';
        adminLoginView.style.display = 'block';
        adminDashboardView.style.display = 'none';
        adminModal.style.display = 'flex';
        setTimeout(() => adminModal.classList.add('show'), 10);
    }
}

// Secret Keyboard Shortcut for Admin Dashboard (Ctrl + Shift + A)
window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        toggleAdminModal();
    }
});

closeAdminBtn.addEventListener('click', toggleAdminModal);
adminLogoutBtn.addEventListener('click', toggleAdminModal);

adminSubmitBtn.addEventListener('click', () => {
    const password = adminPasswordInput.value.trim();
    if (password === 'Yakhub@123') {
        adminLoginView.style.display = 'none';
        adminDashboardView.style.display = 'block';
        refreshAdminDashboard();
    } else {
        adminError.textContent = 'Incorrect admin password.';
    }
});

// Admin Dashboard Population
const adminChatList = document.getElementById('admin-chat-list');
const adminChatHistory = document.getElementById('admin-chat-history');
const adminChatInput = document.getElementById('admin-chat-input');
const adminChatSend = document.getElementById('admin-chat-send');
const adminChatTitle = document.getElementById('admin-chat-title');
const adminChatResolve = document.getElementById('admin-chat-resolve');
let activeChatPhone = null;

function refreshAdminDashboard() {
    // Populate Users
    let users = JSON.parse(localStorage.getItem('users')) || [];
    adminUsersTableBody.innerHTML = '';
    if (users.length === 0) {
        adminUsersTableBody.innerHTML = '<tr><td colspan="2" style="text-align: center;">No users registered yet.</td></tr>';
    } else {
        users.forEach(u => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${u.phone}</td><td>${u.name || '<i>Not set</i>'}</td>`;
            adminUsersTableBody.appendChild(tr);
        });
    }

    // Populate Support Chats List
    let chats = JSON.parse(localStorage.getItem('supportChats')) || {};
    adminChatList.innerHTML = '';
    const phoneNumbers = Object.keys(chats);
    
    if (phoneNumbers.length === 0) {
        adminChatList.innerHTML = '<li style="padding: 15px; text-align: center; color: var(--text-secondary);">No support requests yet.</li>';
        adminChatTitle.textContent = 'No chat selected';
        adminChatResolve.style.display = 'none';
        adminChatHistory.innerHTML = '<p style="text-align:center; color: var(--text-secondary); margin: auto;">Select a chat to start messaging</p>';
        adminChatInput.disabled = true;
        adminChatSend.disabled = true;
        activeChatPhone = null;
    } else {
        phoneNumbers.forEach(phone => {
            const userObj = users.find(u => u.phone === phone);
            const displayName = userObj && userObj.name ? userObj.name : phone;
            const li = document.createElement('li');
            li.classList.add('admin-chat-item');
            li.setAttribute('data-phone', phone);
            if (activeChatPhone === phone) li.classList.add('active');
            li.textContent = displayName;
            li.onclick = () => {
                adminChatTitle.textContent = `Chat with ${displayName}`;
                openAdminChat(phone);
            };
            adminChatList.appendChild(li);
        });
    }

    // Refresh active chat if it exists
    if (activeChatPhone && chats[activeChatPhone]) {
        openAdminChat(activeChatPhone);
    }
    
    // Populate Appointments
    const adminAppointmentsTableBody = document.querySelector('#admin-appointments-table tbody');
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    adminAppointmentsTableBody.innerHTML = '';
    
    if (appointments.length === 0) {
        adminAppointmentsTableBody.innerHTML = '<tr><td colspan="4" style="text-align: center;">No appointments booked yet.</td></tr>';
    } else {
        // Sort by date (nearest first)
        appointments.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        appointments.forEach((appt, index) => {
            const tr = document.createElement('tr');
            const dateObj = new Date(appt.date);
            const dateStr = dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            
            tr.innerHTML = `
                <td>${dateStr}</td>
                <td><strong>${appt.name}</strong><br><span style="font-size:0.85rem; color:var(--text-secondary);">${appt.phone}</span></td>
                <td><strong>${appt.device}</strong><br><span style="font-size:0.85rem; color:var(--text-secondary);">${appt.issue}</span></td>
                <td><button onclick="resolveAppointment(${index})" class="btn-primary" style="padding: 5px 10px; font-size: 0.8rem;">Complete</button></td>
            `;
            adminAppointmentsTableBody.appendChild(tr);
        });
    }

    // Populate Orders
    const adminOrdersTableBody = document.querySelector('#admin-orders-table tbody');
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    adminOrdersTableBody.innerHTML = '';

    if (orders.length === 0) {
        adminOrdersTableBody.innerHTML = '<tr><td colspan="5" style="text-align: center;">No orders placed yet.</td></tr>';
    } else {
        orders.reverse().forEach(order => {
            const tr = document.createElement('tr');
            const itemNames = order.items.map(i => `${i.title} (x${i.quantity})`).join(', ');
            
            tr.innerHTML = `
                <td>#${order.id}<br><small>${order.timestamp}</small></td>
                <td><strong>${order.customer.name}</strong><br>${order.customer.phone}<br><small>${order.customer.address}, ${order.customer.city}, ${order.customer.state}</small></td>
                <td><small>${itemNames}</small></td>
                <td>₹${order.total.toLocaleString('en-IN')}<br><small>(${order.payment.toUpperCase()})</small></td>
                <td><button onclick="completeOrder('${order.id}')" class="btn-primary" style="padding: 6px 12px; font-size: 0.85rem; background: var(--primary-color); color: #000; font-weight: bold; border: none; border-radius: 4px;">Done</button></td>
            `;
            adminOrdersTableBody.appendChild(tr);
        });
    }
}

function openAdminChat(phone) {
    activeChatPhone = phone;
    let chats = JSON.parse(localStorage.getItem('supportChats')) || {};
    let messages = chats[phone] || [];
    
    // Update active class
    document.querySelectorAll('.admin-chat-item').forEach(li => li.classList.remove('active'));
    const activeLi = document.querySelector(`.admin-chat-item[data-phone="${phone}"]`);
    if (activeLi) activeLi.classList.add('active');

    adminChatResolve.style.display = 'block';

    adminChatHistory.innerHTML = '';
    messages.forEach(m => {
        const p = document.createElement('p');
        p.textContent = m.text;
        p.style.padding = '10px 12px';
        p.style.borderRadius = '8px';
        p.style.fontSize = '0.9rem';
        p.style.maxWidth = '80%';
        p.style.marginBottom = '5px';
        
        if (m.sender === 'admin') {
            p.style.background = 'var(--primary-color)';
            p.style.color = '#000';
            p.style.alignSelf = 'flex-end';
        } else {
            p.style.background = 'rgba(255, 255, 255, 0.1)';
            p.style.color = '#fff';
            p.style.alignSelf = 'flex-start';
        }
        adminChatHistory.appendChild(p);
    });

    adminChatInput.disabled = false;
    adminChatSend.disabled = false;
    adminChatHistory.scrollTop = adminChatHistory.scrollHeight;
}

adminChatResolve.addEventListener('click', () => {
    if (!activeChatPhone) return;
    if(confirm('Are you sure you want to close and delete this ticket?')) {
        let chats = JSON.parse(localStorage.getItem('supportChats')) || {};
        delete chats[activeChatPhone];
        localStorage.setItem('supportChats', JSON.stringify(chats));
        
        // Notify user that ticket is closed
        localStorage.setItem('latestMessage', JSON.stringify({ 
            sender: 'admin', 
            phone: activeChatPhone, 
            text: "This support ticket has been closed by the admin.",
            timestamp: Date.now()
        }));

        activeChatPhone = null;
        refreshAdminDashboard();
    }
});

adminChatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') adminChatSend.click();
});

adminChatSend.addEventListener('click', () => {
    if (!activeChatPhone) return;
    const msg = adminChatInput.value.trim();
    if (!msg) return;

    let chats = JSON.parse(localStorage.getItem('supportChats')) || {};
    if (!chats[activeChatPhone]) chats[activeChatPhone] = [];
    chats[activeChatPhone].push({ sender: 'admin', text: msg });
    localStorage.setItem('supportChats', JSON.stringify(chats));

    // Trigger notification
    localStorage.setItem('latestMessage', JSON.stringify({ 
        sender: 'admin', 
        phone: activeChatPhone, 
        text: msg,
        timestamp: Date.now()
    }));

    adminChatInput.value = '';
    openAdminChat(activeChatPhone); // Refresh chat
});

// Help Chat Logic (User Side)
const helpWidget = document.getElementById('help-widget');
const helpToggleBtn = document.getElementById('help-toggle-btn');
const helpChatBox = document.getElementById('help-chat-box');
const closeHelpBtn = document.getElementById('close-help-btn');
const helpChatBody = document.getElementById('help-chat-body');
const helpMsgInput = document.getElementById('help-msg-input');
const helpSendBtn = document.getElementById('help-send-btn');

function renderUserChat() {
    helpChatBody.innerHTML = '';
    if (!currentUser) {
        helpChatBody.innerHTML = '<p class="bot-msg">Please Log In to use Support Chat.</p>';
        helpMsgInput.disabled = true;
        helpSendBtn.disabled = true;
        return;
    }
    helpMsgInput.disabled = false;
    helpSendBtn.disabled = false;

    let chats = JSON.parse(localStorage.getItem('supportChats')) || {};
    let messages = chats[currentUser.phone] || [];
    
    if (messages.length === 0) {
        helpChatBody.innerHTML = '<p class="bot-msg">Hi! How can our staff help you today?</p>';
    } else {
        messages.forEach(m => {
            const p = document.createElement('p');
            p.textContent = m.text;
            if (m.sender === 'user') {
                p.classList.add('user-msg');
            } else {
                p.classList.add('bot-msg');
            }
            helpChatBody.appendChild(p);
        });
    }
    helpChatBody.scrollTop = helpChatBody.scrollHeight;
}

function toggleHelp() {
    if (helpChatBox.style.display === 'none') {
        helpChatBox.style.display = 'flex';
        helpToggleBtn.style.display = 'none';
        renderUserChat();
    } else {
        helpChatBox.style.display = 'none';
        helpToggleBtn.style.display = 'block';
    }
}

helpToggleBtn.addEventListener('click', toggleHelp);
closeHelpBtn.addEventListener('click', toggleHelp);

helpMsgInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') helpSendBtn.click();
});

helpSendBtn.addEventListener('click', () => {
    if (!currentUser) return;
    const msg = helpMsgInput.value.trim();
    if (!msg) return;

    let chats = JSON.parse(localStorage.getItem('supportChats')) || {};
    if (!chats[currentUser.phone]) chats[currentUser.phone] = [];
    
    const isFirstMessage = chats[currentUser.phone].length === 0;
    
    chats[currentUser.phone].push({ sender: 'user', text: msg });
    localStorage.setItem('supportChats', JSON.stringify(chats));
    
    // Trigger notification across tabs
    localStorage.setItem('latestMessage', JSON.stringify({ 
        sender: 'user', 
        phone: currentUser.phone, 
        name: currentUser.name || currentUser.phone,
        text: msg,
        timestamp: Date.now()
    }));

    helpMsgInput.value = '';
    renderUserChat();

    // Automated Bot Reply for the first message
    if (isFirstMessage) {
        setTimeout(() => {
            let currentChats = JSON.parse(localStorage.getItem('supportChats')) || {};
            if (currentChats[currentUser.phone]) {
                const autoMsg = "Thanks for reaching out! Our staff will reply to you soon.";
                currentChats[currentUser.phone].push({ sender: 'admin', text: autoMsg });
                localStorage.setItem('supportChats', JSON.stringify(currentChats));
                
                if (helpChatBox.style.display === 'flex') renderUserChat();
                
                // Trigger notification so it alerts the user
                localStorage.setItem('latestMessage', JSON.stringify({ 
                    sender: 'admin', 
                    phone: currentUser.phone, 
                    text: autoMsg,
                    timestamp: Date.now()
                }));
            }
        }, 1000);
    }
});

// Notifications
function requestNotificationPermission() {
    if ("Notification" in window && Notification.permission !== "granted" && Notification.permission !== "denied") {
        Notification.requestPermission();
    }
}

function showNotification(title, message) {
    // 1. Native OS Notification
    if ("Notification" in window && Notification.permission === "granted") {
        new Notification(title, { body: message, icon: 'assets/images/part_screen_1777391833012.png' });
    }

    // 2. Custom HTML Toast Notification
    const container = document.getElementById('notification-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<strong>${title}</strong><br><span style="font-size:0.9rem; opacity:0.9;">${message}</span>`;
    
    container.appendChild(toast);
    
    // Remove after animation (5s total)
    setTimeout(() => {
        if(container.contains(toast)) container.removeChild(toast);
    }, 5000);
}

// Sync chat dynamically across tabs or same tab updates
window.addEventListener('storage', (e) => {
    if (e.key === 'supportChats' || e.key === 'appointments') {
        if (helpChatBox.style.display === 'flex') renderUserChat();
        if (adminDashboardView.style.display === 'block') refreshAdminDashboard();
    }
    
    if (e.key === 'latestMessage' && e.newValue) {
        const data = JSON.parse(e.newValue);
        if (!currentUser) return;
        
        // If current user is Admin
        if (currentUser.phone === '9381599921' && data.sender === 'user') {
            showNotification(`New Message from ${data.name}`, data.text);
        }
        
        // If current user is the Customer
        if (currentUser.phone !== '9381599921' && data.sender === 'admin' && data.phone === currentUser.phone) {
            showNotification(`Staff Replied`, data.text);
            if (helpChatBox.style.display === 'none') {
                helpToggleBtn.style.animation = 'pulse 1s infinite alternate';
                helpToggleBtn.textContent = '💬 Support (1 New!)';
            }
        }
    }

    if (e.key === 'latestOrder' && e.newValue) {
        const order = JSON.parse(e.newValue);
        if (currentUser && currentUser.phone === '9381599921') {
            showNotification("NEW ORDER RECEIVED! 📦", `${order.customer} placed an order for ₹${order.total.toLocaleString('en-IN')}`);
            // Play sound if possible
            try {
                const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
                audio.play();
            } catch(e) {}
            if (adminDashboardView.style.display === 'block') refreshAdminDashboard();
        }
    }
});

// General Modal Closing
window.addEventListener('click', (e) => {
    if (e.target === authModal) toggleAuthModal();
    if (e.target === profileModal) {
        profileModal.classList.remove('show');
        setTimeout(() => profileModal.style.display = 'none', 300);
    }
    if (e.target === adminModal) toggleAdminModal();
});

// Appointment Booking Logic
const apptForm = document.getElementById('appointment-form');
const apptName = document.getElementById('appt-name');
const apptPhone = document.getElementById('appt-phone');
const apptDevice = document.getElementById('appt-device');
const apptDate = document.getElementById('appt-date');
const apptIssue = document.getElementById('appt-issue');

function prefillAppointmentForm() {
    if (currentUser) {
        apptName.value = currentUser.name || '';
        apptPhone.value = currentUser.phone || '';
    } else {
        apptName.value = '';
        apptPhone.value = '';
    }
}
// Call initially and inside updateAuthUI
prefillAppointmentForm();

if (apptForm) {
    apptForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newAppt = {
            name: apptName.value.trim(),
            phone: apptPhone.value.trim(),
            device: apptDevice.value.trim(),
            date: apptDate.value,
            issue: apptIssue.value.trim(),
            timestamp: Date.now()
        };
        
        let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        appointments.push(newAppt);
        localStorage.setItem('appointments', JSON.stringify(appointments));
        
        showNotification("Appointment Requested", "We will see you then!");
        
        apptDevice.value = '';
        apptDate.value = '';
        apptIssue.value = '';
    });
}

// Resolve Appointment (Admin)
window.resolveAppointment = function(index) {
    if(confirm('Mark this appointment as complete?')) {
        let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        appointments.splice(index, 1);
        localStorage.setItem('appointments', JSON.stringify(appointments));
        refreshAdminDashboard();
    }
}

// Checkout Logic
const checkoutModal = document.getElementById('checkout-modal');
const checkoutForm = document.getElementById('checkout-form');
const closeCheckoutBtn = document.querySelector('.close-checkout');
const checkoutBtn = document.getElementById('checkout-btn');
const thankYouModal = document.getElementById('thank-you-modal');

const checkoutState = document.getElementById('checkout-state');
const checkoutPayment = document.getElementById('checkout-payment');
const summarySubtotal = document.getElementById('summary-subtotal');
const summaryShipping = document.getElementById('summary-shipping');
const summaryCod = document.getElementById('summary-cod');
const summaryTotal = document.getElementById('summary-total');

// currentSubtotal is now declared at the top

window.updateCities = function() {
    const stateEl = document.getElementById('checkout-state');
    const cityGroup = document.getElementById('city-group');
    const cityEl = document.getElementById('checkout-city');
    
    const selectedState = stateEl.value;
    
    if (selectedState && indiaData[selectedState]) {
        cityEl.innerHTML = '<option value="">Select City</option>';
        indiaData[selectedState].forEach(city => {
            const opt = document.createElement('option');
            opt.value = city;
            opt.textContent = city;
            cityEl.appendChild(opt);
        });
        cityGroup.style.display = 'block';
    } else {
        cityGroup.style.display = 'none';
    }
    calculateOrder();
};

function calculateOrder() {
    const stateEl = document.getElementById('checkout-state');
    const paymentEl = document.getElementById('checkout-payment');
    if (!stateEl || !paymentEl) return;

    let shipping = 0;
    const state = stateEl.value;
    
    if (state === 'Andhra Pradesh') {
        shipping = 100;
    } else if (state !== "") {
        shipping = 200;
    }

    const payment = paymentEl.value;
    const codFee = payment === 'cod' ? 200 : 0;
    
    const total = currentSubtotal + shipping + codFee;

    if (summarySubtotal) summarySubtotal.textContent = `₹${currentSubtotal.toLocaleString('en-IN')}`;
    if (summaryShipping) summaryShipping.textContent = `₹${shipping}`;
    if (summaryCod) summaryCod.textContent = `₹${codFee}`;
    if (summaryTotal) summaryTotal.textContent = `₹${total.toLocaleString('en-IN')}`;
}

const checkoutStateEl = document.getElementById('checkout-state');
const checkoutPaymentEl = document.getElementById('checkout-payment');
if (checkoutStateEl) checkoutStateEl.addEventListener('change', calculateOrder);
if (checkoutPaymentEl) checkoutPaymentEl.addEventListener('change', calculateOrder);

// openCheckoutModal is now defined at the top as window.openCheckoutModal

// if (checkoutBtn) {
//    checkoutBtn.addEventListener('click', openCheckoutModal);
// } // Handled by HTML onclick now

    if (closeCheckoutBtn) {
    closeCheckoutBtn.addEventListener('click', () => {
        if (checkoutModal) {
            checkoutModal.classList.remove('show');
            toggleScrollLock(false);
            setTimeout(() => checkoutModal.style.display = 'none', 300);
        }
    });
}

if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const orderId = 'ORD' + Date.now();
    const stateEl = document.getElementById('checkout-state');
    const paymentEl = document.getElementById('checkout-payment');

    const orderData = {
        id: orderId,
        customer: {
            name: document.getElementById('checkout-name').value,
            phone: document.getElementById('checkout-phone').value,
            address: document.getElementById('checkout-address').value,
            state: stateEl ? stateEl.value : '',
            city: document.getElementById('checkout-city').value
        },
        items: cartItems,
        subtotal: currentSubtotal,
        shipping: parseInt(summaryShipping.textContent.replace('₹', '')) || 0,
        codFee: parseInt(summaryCod.textContent.replace('₹', '')) || 0,
        total: parseInt(summaryTotal.textContent.replace(/[^0-9]/g, '')) || 0,
        payment: paymentEl ? paymentEl.value : 'prepaid',
        timestamp: new Date().toLocaleString()
    };

    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Notify Admin (Cross-tab)
    localStorage.setItem('latestOrder', JSON.stringify({
        id: orderId,
        customer: orderData.customer.name,
        total: orderData.total,
        timestamp: Date.now()
    }));

    // Clear cart
    cartItems = [];
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCart();

    if (checkoutModal) checkoutModal.classList.remove('show');
    setTimeout(() => {
        if (checkoutModal) checkoutModal.style.display = 'none';
        if (thankYouModal) {
            document.getElementById('display-order-id').textContent = '#' + orderId;
            thankYouModal.style.display = 'flex';
            setTimeout(() => thankYouModal.classList.add('show'), 10);
        }
    }, 300);
});
}

// Admin Complete Order
window.completeOrder = function(id) {
    if(confirm('Mark this order as delivered and complete?')) {
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders = orders.filter(o => o.id !== id);
        localStorage.setItem('orders', JSON.stringify(orders));
        refreshAdminDashboard();
    }
}
window.deleteOrder = window.completeOrder; // Keep alias just in case
