/**
 * Luxury Haven Hotels - Complete JavaScript Solution
 * Features:
 * - Fixed room images display
 * - Fully functional booking system
 * - Preserved all existing functionality
 * - Improved date validation
 */

// Hotel Data with Corrected Image URLs
const hotelData = {
    rooms: [
        {
            id: "deluxe",
            name: "Deluxe Room",
            price: 199,
            image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            description: "Spacious room with king bed, city view, and modern amenities.",
            capacity: 2,
            size: "350 sq.ft",
            bed: "King Bed",
            amenities: ["WiFi", "TV", "AC", "Mini Bar"]
        },
        {
            id: "executive",
            name: "Executive Suite",
            price: 299,
            image: "https://images.unsplash.com/photo-1582719471386-3a064cd1545a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            description: "Luxurious suite with separate living area and premium services.",
            capacity: 4,
            size: "650 sq.ft",
            bed: "King Bed + Sofa Bed",
            amenities: ["WiFi", "TV", "AC", "Mini Bar", "Coffee Maker", "Work Desk"]
        },
        {
            id: "presidential",
            name: "Presidential Suite",
            price: 499,
            image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            description: "Ultimate luxury with panoramic views and butler service.",
            capacity: 6,
            size: "1200 sq.ft",
            bed: "2 King Beds",
            amenities: ["WiFi", "TV", "AC", "Mini Bar", "Jacuzzi", "Private Balcony"]
        }
    ],
    amenities: [
        {
            icon: "fas fa-swimming-pool",
            name: "Infinity Pool",
            description: "Stunning rooftop pool with panoramic city views"
        },
        {
            icon: "fas fa-utensils",
            name: "Fine Dining",
            description: "5-star restaurants with international cuisine"
        },
        {
            icon: "fas fa-spa",
            name: "Luxury Spa",
            description: "Rejuvenating treatments and therapies"
        }
    ],
    reviews: [
        {
            name: "Sarah Johnson",
            image: "https://randomuser.me/api/portraits/women/32.jpg",
            rating: 5,
            text: "The presidential suite was beyond amazing! The view was breathtaking and the service impeccable. Will definitely return!"
        },
        {
            name: "Michael Chen",
            image: "https://randomuser.me/api/portraits/men/45.jpg",
            rating: 4.5,
            text: "Exceptional stay! The infinity pool at sunset is something you have to experience. Staff went above and beyond."
        }
    ]
};

let bookings = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.rooms-section')) {
        renderRooms();
        renderAmenities();
        renderReviews();
    } 
    else if (document.getElementById('bookingForm')) {
        setupBookingPage();
    }
});

// ======================
// ROOM DISPLAY FUNCTIONS
// ======================

function renderRooms() {
    const roomGallery = document.querySelector('.room-gallery');
    if (!roomGallery) return;
    
    roomGallery.innerHTML = '';
    
    hotelData.rooms.forEach(room => {
        const amenitiesList = room.amenities.map(item => 
            `<li><i class="fas fa-check"></i> ${item}</li>`
        ).join('');
        
        const roomCard = `
            <div class="room-card">
                <div class="room-image" style="background-image: url('${room.image}')">
                    <div class="price-tag">$${room.price}/night</div>
                </div>
                <div class="room-details">
                    <h3>${room.name}</h3>
                    <p class="room-description">${room.description}</p>
                    <div class="room-features">
                        <span><i class="fas fa-user-friends"></i> ${room.capacity} Guests</span>
                        <span><i class="fas fa-expand"></i> ${room.size}</span>
                        <span><i class="fas fa-bed"></i> ${room.bed}</span>
                    </div>
                    <ul class="room-amenities">${amenitiesList}</ul>
                    <a href="booking.html?room=${room.id}" class="btn book-btn">Book Now</a>
                </div>
            </div>
        `;
        roomGallery.insertAdjacentHTML('beforeend', roomCard);
    });
}

function renderAmenities() {
    const amenitiesGrid = document.querySelector('.amenities-grid');
    if (!amenitiesGrid) return;
    
    amenitiesGrid.innerHTML = '';
    
    hotelData.amenities.forEach(amenity => {
        const amenityCard = `
            <div class="amenity">
                <i class="${amenity.icon}"></i>
                <h3>${amenity.name}</h3>
                <p>${amenity.description}</p>
            </div>
        `;
        amenitiesGrid.insertAdjacentHTML('beforeend', amenityCard);
    });
}

function renderReviews() {
    const reviewsContainer = document.querySelector('.reviews-container');
    if (!reviewsContainer) return;
    
    reviewsContainer.innerHTML = '';
    
    hotelData.reviews.forEach(review => {
        const stars = generateStarRating(review.rating);
        
        const reviewCard = `
            <div class="review-card">
                <div class="reviewer-info">
                    <img src="${review.image}" alt="${review.name}">
                    <div>
                        <h4>${review.name}</h4>
                        <div class="rating">
                            ${stars}
                        </div>
                    </div>
                </div>
                <p class="review-text">"${review.text}"</p>
            </div>
        `;
        reviewsContainer.insertAdjacentHTML('beforeend', reviewCard);
    });
}

function generateStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i - 0.5 <= rating) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// ======================
// BOOKING SYSTEM FUNCTIONS
// ======================

function setupBookingPage() {
    // Set minimum date for check-in (today)
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('checkIn').min = today;
    
    // Load room from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get('room');
    
    if (roomId) {
        document.getElementById('roomType').value = roomId;
        updateRoomSummary(roomId);
    }
    
    // Setup event listeners
    document.getElementById('checkIn').addEventListener('change', updateBookingSummary);
    document.getElementById('checkOut').addEventListener('change', updateBookingSummary);
    document.getElementById('roomType').addEventListener('change', updateBookingSummary);
    
    // Form submission
    document.getElementById('bookingForm').addEventListener('submit', function(e) {
        e.preventDefault();
        processBooking();
    });
}

function updateBookingSummary() {
    const roomId = document.getElementById('roomType').value;
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    
    // Update room info
    const room = hotelData.rooms.find(r => r.id === roomId);
    if (room) {
        document.getElementById('summaryRoomImage').style.backgroundImage = `url('${room.image}')`;
        document.getElementById('summaryRoomType').textContent = room.name;
        document.getElementById('summaryPrice').innerHTML = `$${room.price} <span>/ night</span>`;
    }
    
    // Update dates and calculate total
    if (checkIn && checkOut) {
        document.getElementById('summaryCheckIn').textContent = formatDate(checkIn);
        document.getElementById('summaryCheckOut').textContent = formatDate(checkOut);
        
        const nights = calculateNights(checkIn, checkOut);
        document.getElementById('summaryNights').textContent = nights;
        
        if (room) {
            const total = (nights * room.price).toFixed(2);
            document.getElementById('summaryTotal').textContent = `$${total}`;
        }
    }
}

function calculateNights(checkIn, checkOut) {
    const oneDay = 24 * 60 * 60 * 1000;
    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    return Math.round(Math.abs((endDate - startDate) / oneDay));
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function processBooking() {
    const roomId = document.getElementById('roomType').value;
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    const guestName = document.getElementById('guestName').value;
    const guestEmail = document.getElementById('guestEmail').value;
    
    if (!validateDates(checkIn, checkOut)) return;
    
    if (!guestName || !guestEmail) {
        alert('Please enter your name and email');
        return;
    }
    
    const room = hotelData.rooms.find(r => r.id === roomId);
    const nights = calculateNights(checkIn, checkOut);
    const total = nights * room.price;
    
    // Create booking
    const booking = {
        id: generateBookingId(),
        guestName: guestName,
        guestEmail: guestEmail,
        room: room,
        checkIn: checkIn,
        checkOut: checkOut,
        nights: nights,
        total: total,
        status: "Confirmed",
        dateBooked: new Date().toISOString()
    };
    
    bookings.push(booking);
    showBookingConfirmation(booking);
}

function validateDates(checkIn, checkOut) {
    if (!checkIn || !checkOut) {
        alert('Please select both check-in and check-out dates');
        return false;
    }
    
    if (new Date(checkOut) <= new Date(checkIn)) {
        alert('Check-out date must be after check-in date');
        return false;
    }
    
    return true;
}

function generateBookingId() {
    return 'BK-' + Math.random().toString(36).substr(2, 8).toUpperCase();
}

function showBookingConfirmation(booking) {
    const formContainer = document.querySelector('.booking-form-container');
    formContainer.innerHTML = `
        <div class="confirmation">
            <div class="confirmation-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h2>Booking Confirmed!</h2>
            <div class="confirmation-details">
                <p><strong>Booking ID:</strong> #${booking.id}</p>
                <p><strong>Guest Name:</strong> ${booking.guestName}</p>
                <p><strong>Room:</strong> ${booking.room.name}</p>
                <p><strong>Dates:</strong> ${formatDate(booking.checkIn)} - ${formatDate(booking.checkOut)}</p>
                <p><strong>Total:</strong> $${booking.total.toFixed(2)}</p>
            </div>
            <div class="confirmation-actions">
                <button onclick="window.print()" class="btn">
                    <i class="fas fa-print"></i> Print
                </button>
                <a href="index.html" class="btn">Return Home</a>
            </div>
        </div>
    `;
}

function updateRoomSummary(roomId) {
    const room = hotelData.rooms.find(r => r.id === roomId);
    if (room) {
        document.getElementById('summaryRoomImage').style.backgroundImage = `url('${room.image}')`;
        document.getElementById('summaryRoomType').textContent = room.name;
        document.getElementById('summaryPrice').innerHTML = `$${room.price} <span>/ night</span>`;
    }
}