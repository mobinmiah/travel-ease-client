// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://travel-ease-server-pi.vercel.app";
export const API_TIMEOUT = 10000;

// Vehicle Categories
export const VEHICLE_CATEGORIES = [
    { value: "Sedan", label: "Sedan" },
    { value: "Bike", label: "Bike" },
    { value: "Bus", label: "Bus" },
    { value: "Van", label: "Van" },
    { value: "SUV", label: "SUV" },
];

// Fuel Types
export const FUEL_TYPES = [
    { value: "Petrol", label: "Petrol" },
    { value: "Diesel", label: "Diesel" },
    { value: "Electric", label: "Electric" },
    { value: "Hybrid", label: "Hybrid" },
    { value: "CNG", label: "CNG" },
];

// Availability Status
export const AVAILABILITY_STATUS = [
    { value: "Available", label: "Available" },
    { value: "Booked", label: "Booked" },
    { value: "Maintenance", label: "Under Maintenance" },
];

// Form Validation Rules
export const VALIDATION_RULES = {
    email: {
        required: "Email is required",
        pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address"
        }
    },
    password: {
        required: "Password is required",
        minLength: {
            value: 6,
            message: "Password must be at least 6 characters"
        }
    },
    vehicleName: {
        required: "Vehicle name is required",
        minLength: {
            value: 2,
            message: "Vehicle name must be at least 2 characters"
        }
    },
    price: {
        required: "Price is required",
        min: {
            value: 1,
            message: "Price must be greater than 0"
        }
    }
};

// Toast Configuration
export const TOAST_CONFIG = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored"
};

// Local Storage Keys
export const STORAGE_KEYS = {
    ACCESS_TOKEN: "access-token",
    USER_PREFERENCES: "user-preferences",
    THEME: "theme"
};

// Error Messages
export const ERROR_MESSAGES = {
    NETWORK_ERROR: "Network error. Please check your connection.",
    UNAUTHORIZED: "You are not authorized to perform this action.",
    FORBIDDEN: "Access denied. Please login again.",
    NOT_FOUND: "The requested resource was not found.",
    SERVER_ERROR: "Server error. Please try again later.",
    VALIDATION_ERROR: "Please check your input and try again."
};