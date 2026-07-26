/*
====================================================
Application State
Single Source of Truth
====================================================
*/

const APP_STATE = {

    // ===========================
    // JOURNEY
    // ===========================

    selectedCoach: "",

    selectedDate: "",

    // ===========================
    // BOOKING
    // ===========================

    selectedSeats: [],

    passengers: [],

    // ===========================
    // PAYMENT
    // ===========================

    selectedPayment: "",

    paymentStatus: "pending",

    transactionId: "",

    senderNumber: "",

    // ===========================
    // UI
    // ===========================

    currentStep: 1,

    modalOpen: false,

    currentSlide: 0

};