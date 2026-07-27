// ======================================================
// BOOKING.JS
// ======================================================

function initBooking() {

    console.log("Booking initialized");

    // ==========================
    // Journey Date
    // ==========================

    const journeyDate = document.getElementById("journeyDate");

    if (journeyDate) {
        const today = new Date().toISOString().split("T")[0];
        journeyDate.min = today;
        journeyDate.value = today;
    }

    // ==========================
    // Search Form
    // ==========================

    const searchForm = document.getElementById("searchForm");

    if (searchForm) {

        searchForm.addEventListener("submit", function (e) {

            e.preventDefault();

            APP_STATE.selectedDate =
                document.getElementById("journeyDate").value;

            APP_STATE.selectedCoach =
                document.getElementById("coachType").value;

            if (!APP_STATE.selectedCoach) {
                showToast("⚠️ কোচ নির্বাচন করুন");
                return;
            }

            openModal();

        });

    }

}

// ======================================================
// Seat Map
// ======================================================

function renderSeats() {

    const map = document.getElementById("seatMap");

    if (!map) return;

    const booked =
        CONFIG.bookedSeats[APP_STATE.selectedCoach] || [];

    let html = "";

    html += `
        <div class="flex items-end gap-6 mb-2">
            <div class="w-[172px]"></div>
            <div class="seat driver">চালক</div>
        </div>
    `;

    for (let row = 0; row < 10; row++) {

        html += `<div class="flex items-center gap-1.5">`;

        html += `
            <div class="w-5 text-[10px] text-gray-400 text-center font-english">
                ${row + 1}
            </div>
        `;

        for (let col = 0; col < 4; col++) {

            const seatNo = row * 4 + col + 1;

            if (col === 2) {
                html += `<div class="w-6"></div>`;
            }

            const bookedSeat = booked.includes(seatNo);

            html += `
                <div
                    class="seat ${bookedSeat ? "booked" : ""}"
                    data-seat="${seatNo}"
                    ${
                        bookedSeat
                            ? ""
                            : `onclick="toggleSeat(${seatNo})"`
                    }>
                    ${seatNo}
                </div>
            `;
        }

        html += `</div>`;

    }

    map.innerHTML = html;

}

// ======================================================
// Toggle Seat
// ======================================================

function toggleSeat(seatNo) {

    const index =
        APP_STATE.selectedSeats.indexOf(seatNo);

    if (index > -1) {

        APP_STATE.selectedSeats.splice(index, 1);

    } else {

        if (APP_STATE.selectedSeats.length >= 5) {

            showToast("⚠️ সর্বোচ্চ ৫টি আসন বুক করতে পারবেন");
            return;

        }

        APP_STATE.selectedSeats.push(seatNo);

    }

    document.querySelectorAll(".seat").forEach(seat => {

        if (
            seat.classList.contains("booked") ||
            seat.classList.contains("driver")
        ) return;

        seat.classList.toggle(
            "selected",
            APP_STATE.selectedSeats.includes(
                Number(seat.dataset.seat)
            )
        );

    });

    updateSeatInfo();

}

// ======================================================
// Seat Summary
// ======================================================

function updateSeatInfo() {

    const fare =
        CONFIG.fares[APP_STATE.selectedCoach] || 0;

    document.getElementById("seatCount").textContent =
        toBangla(APP_STATE.selectedSeats.length);

    document.getElementById("seatTotal").textContent =
        "৳" +
        toBangla(
            APP_STATE.selectedSeats.length * fare
        );

    document.getElementById("toStep2").disabled =
        APP_STATE.selectedSeats.length === 0;

}

// ======================================================
// Passenger Forms
// ======================================================

function renderPassengerForms() {

    const container =
        document.getElementById("passengerForms");

    if (!container) return;

    let html = "";

    APP_STATE.selectedSeats.forEach((seat, i) => {

        html += `
        <div class="bg-gray-50 rounded-xl p-4 mb-3 border">

            <p class="font-semibold mb-3">
                যাত্রী ${toBangla(i + 1)}
                -
                আসন ${toBangla(seat)}
            </p>

            <input
                class="passenger-name w-full border rounded p-2 mb-2"
                placeholder="নাম">

            <input
                class="passenger-phone w-full border rounded p-2"
                placeholder="মোবাইল নম্বর">

        </div>
        `;

    });

    container.innerHTML = html;

}

// ======================================================
// Validation
// ======================================================

function validatePassengerForms() {

    const names =
        document.querySelectorAll(".passenger-name");

    const phones =
        document.querySelectorAll(".passenger-phone");

    for (let i = 0; i < names.length; i++) {

        if (!names[i].value.trim()) {

            showToast("নাম লিখুন");

            names[i].focus();

            return false;

        }

        if (!phones[i].value.trim()) {

            showToast("মোবাইল নম্বর লিখুন");

            phones[i].focus();

            return false;

        }

    }

    return true;

}

// ======================================================
// Export
// ======================================================

Object.assign(window, {

    renderSeats,
    toggleSeat,
    updateSeatInfo,
    renderPassengerForms,
    validatePassengerForms

});