// ===============================
// GLOBAL APPLICATION STATE
// ===============================

const APP_STATE = {
    selectedCoach: "",
    selectedDate: "",
    selectedSeats: [],
    passengers: [],
    selectedPayment: "",
    currentStep: 1
};



function initializeApp() {

    console.log("Initializing App...");

    initNavigation();

    initHero();

    initBooking();

    initContact();

}