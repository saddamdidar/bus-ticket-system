 // ============ MODAL ============
     // ============ MODAL ============

function openModal() {

    console.log("openModal()");

    APP_STATE.selectedSeats = [];
    APP_STATE.selectedPayment = "";
    APP_STATE.currentStep = 1;

    document.getElementById("bookingModal").classList.add("open");
    document.body.style.overflow = "hidden";

    document.getElementById("modalDate").textContent =
        formatDate(APP_STATE.selectedDate);

    document.getElementById("modalCoach").textContent =
        CONFIG.coachNames[APP_STATE.selectedCoach];

    updateStepUI();
    renderSeats();
    updateSeatInfo();

}




        function closeModal() {
            document.getElementById('bookingModal').classList.remove('open');
            document.body.style.overflow = '';
        }

        function formatDate(d) {
            const date = new Date(d);
            const days = ['রবি','সোম','মঙ্গল','বুধ','বৃহ','শুক্র','শনি'];
            const months = ['জানু','ফেব্রু','মার্চ','এপ্রি','মে','জুন','জুলাই','আগ','সেপ্টে','অক্টো','নভে','ডিসে'];
            return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}, ${days[date.getDay()]}`;
        }



        // ============ CLOSE MODAL ON OVERLAY CLICK ============
 const bookingModal = document.getElementById("bookingModal");

if (bookingModal) {

    bookingModal.addEventListener("click", function (e) {

        if (e.target === bookingModal &&
            APP_STATE.currentStep !== 4) {

            closeModal();

        }

    });

}


      function goToStep(step) {
            if (step === 2 && APP_STATE.selectedSeats.length === 0) {
    return;
}
            if (step === 3) {
                if (!validatePassengerForms()) return;
            }
            if (step === 3) {
                renderPaymentInfo();
            }
            APP_STATE.currentStep = step;
            updateStepUI();

            if (step === 2) renderPassengerForms();
            if (step === 4) renderConfirmation();
        }

        function updateStepUI() {
            for (let i = 1; i <= 4; i++) {
                const dot = document.getElementById('stepDot' + i);
                const panel = document.getElementById('step' + i);
                dot.className = 'step-dot';
                if (i < APP_STATE.currentStep) dot.classList.add('done');
                else if (i === APP_STATE.currentStep) dot.classList.add('active');
                panel.classList.toggle('hidden', i !== APP_STATE.currentStep);
            }
            for (let i = 1; i <= 3; i++) {
                const line = document.getElementById('stepLine' + i);
                line.className = 'step-line';
                if (i < APP_STATE.currentStep) line.classList.add('done');
                else if (i === APP_STATE.currentStep) line.classList.add('active');
            }
        }