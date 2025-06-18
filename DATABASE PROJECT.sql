-- Create Database
CREATE DATABASE IF NOT EXISTS LuxuryHavenHotelsWeb_Prod;
USE LuxuryHavenHotelsWeb_Prod;

-- Users Table
CREATE TABLE users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50),
    Email VARCHAR(100) NOT NULL UNIQUE,
    PasswordHash VARCHAR(255),
    Salt VARCHAR(255),
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Room Types Table
CREATE TABLE roomtypes (
    RoomTypeID INT AUTO_INCREMENT PRIMARY KEY,
    TypeName VARCHAR(100) NOT NULL,
    Description TEXT,
    BasePrice DECIMAL(10, 2) NOT NULL,
    Capacity INT,
    Size VARCHAR(50),
    BedType VARCHAR(50),
    ImageURL TEXT
);

-- Bookings Table
CREATE TABLE bookings (
    BookingID INT AUTO_INCREMENT PRIMARY KEY,
    BookingReference VARCHAR(20) NOT NULL,
    UserID INT,
    GuestName VARCHAR(100) NOT NULL,
    GuestEmail VARCHAR(100) NOT NULL,
    GuestPhone VARCHAR(20),
    RoomTypeID INT NOT NULL,
    CheckInDate DATE NOT NULL,
    CheckOutDate DATE NOT NULL,
    Adults INT DEFAULT 1,
    Children INT DEFAULT 0,
    SpecialRequests TEXT,
    TotalAmount DECIMAL(10,2) NOT NULL,
    BookingStatus VARCHAR(20) DEFAULT 'Confirmed',
    PaymentStatus VARCHAR(20) DEFAULT 'Pending',
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (RoomTypeID) REFERENCES roomtypes(RoomTypeID),
    FOREIGN KEY (UserID) REFERENCES users(UserID)
);

-- Contact Messages
CREATE TABLE contact_messages (
    MessageID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    Message TEXT NOT NULL,
    SubmittedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Newsletter Subscriptions
CREATE TABLE newsletter_subscriptions (
    SubscriptionID INT AUTO_INCREMENT PRIMARY KEY,
    Email VARCHAR(100) NOT NULL UNIQUE,
    SubscribedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Reviews Table
CREATE TABLE reviews (
    ReviewID INT AUTO_INCREMENT PRIMARY KEY,
    GuestName VARCHAR(100),
    ReviewText TEXT NOT NULL,
    Rating INT CHECK (Rating BETWEEN 1 AND 5),
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Room Amenities
CREATE TABLE roomamenities (
    AmenityID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    IconClass VARCHAR(100),
    Description TEXT
);

-- Room Type Amenities
CREATE TABLE roomtypeamenities (
    RoomTypeID INT,
    AmenityID INT,
    FOREIGN KEY (RoomTypeID) REFERENCES roomtypes(RoomTypeID),
    FOREIGN KEY (AmenityID) REFERENCES roomamenities(AmenityID)
);

-- Hotel Amenities
CREATE TABLE hotelamenities (
    HotelAmenityID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    IconClass VARCHAR(100),
    Description TEXT,
    OperatingHours VARCHAR(100)
);

-- Rooms
CREATE TABLE rooms (
    RoomID INT AUTO_INCREMENT PRIMARY KEY,
    RoomNumber VARCHAR(10),
    RoomTypeID INT,
    Floor INT,
    ViewType VARCHAR(100),
    Status VARCHAR(50),
    FOREIGN KEY (RoomTypeID) REFERENCES roomtypes(RoomTypeID)
);

-- Cancellation Policies
CREATE TABLE cancellationpolicies (
    PolicyID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100),
    Description TEXT,
    HoursBeforeCheckIn INT,
    PenaltyPercentage DECIMAL(5,2),
    IsDefault BOOLEAN
);

-- Promotions
CREATE TABLE promotions (
    PromotionID INT AUTO_INCREMENT PRIMARY KEY,
    Code VARCHAR(50) UNIQUE,
    Description TEXT,
    DiscountType VARCHAR(20),
    DiscountValue DECIMAL(10,2),
    StartDate DATE,
    EndDate DATE,
    MinStay INT,
    IsActive BOOLEAN
);

-- Sample Room Types
INSERT INTO roomtypes (TypeName, Description, BasePrice, Capacity, Size, BedType, ImageURL)
VALUES 
('Deluxe Room', 'Spacious room with king bed, city view, and modern amenities.', 199, 2, '350 sq.ft', 'King Bed', 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'),
('Executive Suite', 'Luxurious suite with separate living area and premium services.', 299, 4, '650 sq.ft', 'King Bed + Sofa Bed', 'https://images.unsplash.com/photo-1582719471386-3a064cd1545a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'),
('Presidential Suite', 'Ultimate luxury with panoramic views and butler service.', 499, 6, '1200 sq.ft', '2 King Beds', 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');

-- Room Amenities
INSERT INTO roomamenities (Name, IconClass, Description)
VALUES 
('WiFi', 'fas fa-wifi', 'Free high-speed internet access'),
('TV', 'fas fa-tv', '55-inch flat screen with cable channels'),
('AC', 'fas fa-snowflake', 'Individual climate control'),
('Mini Bar', 'fas fa-wine-bottle', 'Stocked with premium beverages'),
('Coffee Maker', 'fas fa-coffee', 'Nespresso machine with capsules'),
('Work Desk', 'fas fa-laptop', 'Ergonomic work space'),
('Jacuzzi', 'fas fa-hot-tub', 'In-room jacuzzi'),
('Private Balcony', 'fas fa-umbrella-beach', 'Spacious balcony with seating');

-- Room Type Amenities
INSERT INTO roomtypeamenities (RoomTypeID, AmenityID)
VALUES 
(1, 1), (1, 2), (1, 3), (1, 4),
(2, 1), (2, 2), (2, 3), (2, 4), (2, 5), (2, 6),
(3, 1), (3, 2), (3, 3), (3, 4), (3, 5), (3, 6), (3, 7), (3, 8);

-- Hotel Amenities
INSERT INTO hotelamenities (Name, IconClass, Description, OperatingHours)
VALUES 
('Infinity Pool', 'fas fa-swimming-pool', 'Stunning rooftop pool with panoramic city views', '7:00 AM - 10:00 PM'),
('Fine Dining', 'fas fa-utensils', '5-star restaurants with international cuisine', 'Breakfast: 7-11, Lunch: 12-3, Dinner: 6-11'),
('Luxury Spa', 'fas fa-spa', 'Rejuvenating treatments and therapies', '9:00 AM - 9:00 PM'),
('Fitness Center', 'fas fa-dumbbell', 'State-of-the-art gym equipment', '24 hours'),
('Concierge', 'fas fa-concierge-bell', '24/7 concierge service', '24 hours');

-- Rooms
INSERT INTO rooms (RoomNumber, RoomTypeID, Floor, ViewType, Status)
VALUES 
('101', 1, 1, 'City View', 'Available'),
('102', 1, 1, 'City View', 'Available'),
('201', 1, 2, 'Garden View', 'Available'),
('202', 1, 2, 'Garden View', 'Available'),
('301', 2, 3, 'City View', 'Available'),
('302', 2, 3, 'City View', 'Available'),
('401', 3, 4, 'Panoramic View', 'Available'),
('402', 3, 4, 'Panoramic View', 'Available');

-- Cancellation Policies
INSERT INTO cancellationpolicies (Name, Description, HoursBeforeCheckIn, PenaltyPercentage, IsDefault)
VALUES 
('Standard Policy', 'Free cancellation up to 48 hours before check-in. After that, 50% of the first night will be charged.', 48, 50.00, 1),
('Non-Refundable', 'No refund for cancellations or modifications.', 0, 100.00, 0),
('Flexible', 'Free cancellation up to 24 hours before check-in. After that, 25% of the total stay will be charged.', 24, 25.00, 0);

-- Promotions
INSERT INTO promotions (Code, Description, DiscountType, DiscountValue, StartDate, EndDate, MinStay, IsActive)
VALUES 
('WELCOME20', 'Welcome offer - 20% off your first stay', 'Percentage', 20.00, '2023-01-01', '2023-12-31', 1, 1),
('SUMMER15', 'Summer special - 15% off all bookings', 'Percentage', 15.00, '2023-06-01', '2023-08-31', 2, 1),
('WEEKEND50', 'Weekend getaway - $50 off 2-night stays', 'Fixed', 50.00, '2023-01-01', '2023-12-31', 2, 1);