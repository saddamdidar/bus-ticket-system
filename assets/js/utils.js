/*
====================================================
Utilities
Shared Helper Functions
====================================================
*/

/**
 * Toast Message
 */
function showToast(message, duration = 3000) {

    const toast = document.getElementById("toast");

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, duration);

}

/**
 * Convert English Number → Bangla Number
 */
function toBangla(value) {

    const bn = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];

    return value
        .toString()
        .replace(/\d/g, d => bn[d]);

}

/**
 * Convert Date
 */
function formatDate(dateString) {

    if (!dateString) return "";

    const date = new Date(dateString);

    const days = [
        "রবি",
        "সোম",
        "মঙ্গল",
        "বুধ",
        "বৃহ",
        "শুক্র",
        "শনি"
    ];

    const months = [
        "জানুয়ারি",
        "ফেব্রুয়ারি",
        "মার্চ",
        "এপ্রিল",
        "মে",
        "জুন",
        "জুলাই",
        "আগস্ট",
        "সেপ্টেম্বর",
        "অক্টোবর",
        "নভেম্বর",
        "ডিসেম্বর"
    ];

    return `${toBangla(date.getDate())} ${months[date.getMonth()]} ${toBangla(date.getFullYear())}, ${days[date.getDay()]}`;

}

/**
 * Random Booking ID
 */
function generateBookingId() {

    return "KH" +
        Date.now().toString().slice(-6) +
        Math.floor(Math.random() * 900 + 100);

}

/**
 * Currency
 */
function formatCurrency(amount) {

    return "৳" + toBangla(amount);

}

/**
 * Get Fare
 */
function getCurrentFare() {

    if (!APP_STATE.selectedCoach) return 0;

    return CONFIG.coaches[
        APP_STATE.selectedCoach
    ].fare;

}

/**
 * Total Fare
 */
function getTotalFare() {

    return (
        APP_STATE.selectedSeats.length *
        getCurrentFare()
    );

}

/**
 * Grand Total
 */
function getGrandTotal() {

    return (
        getTotalFare() +
        CONFIG.serviceCharge
    );

}

/**
 * Validate Bangladesh Mobile Number
 */
function isValidPhone(number) {

    return /^01[3-9]\d{8}$/.test(number);

}

/**
 * Query Selector
 */
function $(selector) {

    return document.querySelector(selector);

}

/**
 * Query Selector All
 */
function $$(selector) {

    return document.querySelectorAll(selector);

}