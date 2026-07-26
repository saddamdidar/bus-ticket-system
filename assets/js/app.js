      // ============ CONFIGURATION ============    
    

      // ============ INITIALIZE ============

    function initializeApp() {  

      // ============ APPLICATION STATE ============
    
    const APP_STATE = {
    selectedCoach: "",
    selectedDate: "",
    selectedSeats: [],
    selectedPayment: "",
    currentStep: 1
};


      
    
    // DATE
        const today = new Date().toISOString().split('T')[0];

      const journeyDate = document.getElementById("journeyDate");

if (journeyDate) {
    journeyDate.min = today;
    journeyDate.value = today;
}

    // SEARCH FORM

        const searchForm = document.getElementById("searchForm");



if (searchForm) {
    searchForm.addEventListener("submit", function (e) {
        e.preventDefault();
        APP_STATE.selectedDate = document.getElementById('journeyDate').value;
        APP_STATE.selectedCoach = document.getElementById('coachType').value;
        if (!APP_STATE.selectedCoach) {
            showToast('⚠️ কোচ নির্বাচন করুন');
            return;
        }
        openModal();
    });
}


function quickBook(coachId) {

    APP_STATE.selectedDate =
        document.getElementById("journeyDate").value;

    APP_STATE.selectedCoach = coachId;

    document.getElementById("coachType").value = coachId;

    openModal();
}
             

       
    // CONTACT FORM

     const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        showToast('✅ আপনার বার্তা পাওয়া গেছে। শীঘ্রই যোগাযোগ করা হবে।');
        this.reset();
    });
}


 

    // EXPORT FUNCTIONS


Object.assign(window, {
    quickBook,
    closeModal,
    toggleSeat,
    goToStep,
    selectPayment,
    processPayment
});

}