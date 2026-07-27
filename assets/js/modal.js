// ======================================================
// MODAL.JS
// ======================================================

// ==============================
// Open Modal
// ==============================

function openModal() {

    APP_STATE.selectedSeats = [];
    APP_STATE.currentStep = 1;

    const modal = document.getElementById("bookingModal");

    if (!modal) return;

    modal.classList.add("open");

    document.body.style.overflow = "hidden";

    const modalDate = document.getElementById("modalDate");
    const modalCoach = document.getElementById("modalCoach");

    if (modalDate) {
        modalDate.textContent = formatDate(APP_STATE.selectedDate);
    }

    if (modalCoach) {
        modalCoach.textContent =
            CONFIG.coachNames[APP_STATE.selectedCoach] || "";
    }

    updateStepUI();

    renderSeats();

    updateSeatInfo();

}

// ==============================
// Close Modal
// ==============================

function closeModal() {

    const modal = document.getElementById("bookingModal");

    if (modal) {
        modal.classList.remove("open");
    }

    document.body.style.overflow = "";

}

// ==============================
// Format Date
// ==============================

function formatDate(dateString) {

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
        "জানু",
        "ফেব্রু",
        "মার্চ",
        "এপ্রি",
        "মে",
        "জুন",
        "জুলাই",
        "আগ",
        "সেপ্টে",
        "অক্টো",
        "নভে",
        "ডিসে"
    ];

    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}, ${days[date.getDay()]}`;

}

// ==============================
// Overlay Close
// ==============================

document.addEventListener("click", function (e) {

    const modal = document.getElementById("bookingModal");

    if (!modal) return;

    if (
        e.target === modal &&
        APP_STATE.currentStep !== 4
    ) {
        closeModal();
    }

});

// ==============================
// Step Navigation
// ==============================

function goToStep(step) {

    if (
        step === 2 &&
        APP_STATE.selectedSeats.length === 0
    ) {
        showToast("⚠️ অন্তত একটি আসন নির্বাচন করুন");
        return;
    }

    if (step === 3) {

        if (!validatePassengerForms()) {
            return;
        }

        if (typeof renderPaymentInfo === "function") {
            renderPaymentInfo();
        }

    }

    APP_STATE.currentStep = step;

    updateStepUI();

    if (step === 2) {

        renderPassengerForms();

    }

    if (
        step === 4 &&
        typeof renderConfirmation === "function"
    ) {

        renderConfirmation();

    }

}

// ==============================
// Update Step UI
// ==============================

function updateStepUI() {

    for (let i = 1; i <= 4; i++) {

        const dot = document.getElementById("stepDot" + i);
        const panel = document.getElementById("step" + i);

        if (dot) {

            dot.className = "step-dot";

            if (i < APP_STATE.currentStep) {

                dot.classList.add("done");

            } else if (i === APP_STATE.currentStep) {

                dot.classList.add("active");

            }

        }

        if (panel) {

            panel.classList.toggle(
                "hidden",
                i !== APP_STATE.currentStep
            );

        }

    }

    for (let i = 1; i <= 3; i++) {

        const line = document.getElementById("stepLine" + i);

        if (!line) continue;

        line.className = "step-line";

        if (i < APP_STATE.currentStep) {

            line.classList.add("done");

        } else if (i === APP_STATE.currentStep) {

            line.classList.add("active");

        }

    }

}

// ==============================
// Export
// ==============================

Object.assign(window, {

    openModal,
    closeModal,
    goToStep,
    updateStepUI

});