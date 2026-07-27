function initBooking() {

    console.log("Booking initialized");

    const searchForm = document.getElementById("searchForm");

console.log(searchForm);

if (searchForm) {
    searchForm.addEventListener("submit", function (e) {

        console.log("Form Submitted");

        e.preventDefault();

        APP_STATE.selectedDate =
            document.getElementById("journeyDate").value;

        APP_STATE.selectedCoach =
            document.getElementById("coachType").value;

        console.log(APP_STATE);

        openModal();
    });
}

}

// ============ SEAT MAP ============
        function renderSeats() {
            const map = document.getElementById('seatMap');
            const booked = CONFIG.bookedSeats[APP_STATE.selectedCoach] || [];
            let html = '<div class="flex items-end gap-6 mb-2">';
            html += '<div class="w-[172px]"></div>';
            html += '<div class="seat driver">চালক</div>';
            html += '</div>';

            for (let row = 0; row < 10; row++) {
                html += '<div class="flex items-center gap-1.5">';
                html += `<div class="w-5 text-[10px] text-gray-400 text-center font-english">${row + 1}</div>`;
                for (let col = 0; col < 4; col++) {
                    const num = row * 4 + col + 1;
                    if (col === 2) html += '<div class="w-6"></div>'; // aisle
                    const isBooked = booked.includes(num);
                    const cls = isBooked ? 'booked' : '';
                    html += `<div class="seat ${cls}" data-seat="${num}" onclick="${isBooked ? '' : `toggleSeat(${num})`}">${num}</div>`;
                }
                html += '</div>';
            }
            map.innerHTML = html;
        }

     
     
        function toggleSeat(num) {

    const idx = APP_STATE.selectedSeats.indexOf(num);

    if (idx > -1) {

        APP_STATE.selectedSeats.splice(idx, 1);

    } else {

        if (APP_STATE.selectedSeats.length >= 5) {
            showToast("⚠️ সর্বোচ্চ ৫টি আসন বুক করতে পারবেন");
            return;
        }

        APP_STATE.selectedSeats.push(num);
    }

    document.querySelectorAll(".seat").forEach(seat => {

        const seatNo = Number(seat.dataset.seat);

        if (
            !seat.classList.contains("booked") &&
            !seat.classList.contains("driver")
        ) {
            seat.classList.toggle(
                "selected",
                APP_STATE.selectedSeats.includes(seatNo)
            );
        }

    });

    updateSeatInfo();
}


         // ============ PASSENGER FORMS ============
        function renderPassengerForms() {
            const container = document.getElementById('passengerForms');
            let html = '';
            APP_STATE.selectedSeats.forEach((seat, i) => {
                html += `
                <div class="bg-gray-50 rounded-xl p-4 mb-3 border border-gray-200">
                    <p class="text-sm font-semibold text-gray-800 mb-3">যাত্রী ${toBangla(i+1)} — আসন নং: <span class="text-khan-blue">${toBangla(seat)}</span></p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label class="block text-xs font-semibold text-gray-600 mb-1">নাম *</label>
                            <input type="text" class="passenger-name w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-khan-blue/30 focus:border-khan-blue bg-white" data-idx="${i}" placeholder="পুরো নাম" required>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-gray-600 mb-1">মোবাইল নম্বর *</label>
                            <input type="tel" class="passenger-phone w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-khan-blue/30 focus:border-khan-blue bg-white font-english" data-idx="${i}" placeholder="০১XXXXXXXXX" required>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-gray-600 mb-1">জাতীয়তা</label>
                            <select class="passenger-nid w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-khan-blue/30 focus:border-khan-blue bg-white appearance-none" data-idx="${i}">
                                <option value="bangladeshi">বাংলাদেশী</option>
                                <option value="other">অন্যান্য</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-gray-600 mb-1">NID / পাসপোর্ট (ঐচ্ছিক)</label>
                            <input type="text" class="passenger-id w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-khan-blue/30 focus:border-khan-blue bg-white font-english" data-idx="${i}" placeholder="NID বা পাসপোর্ট নম্বর">
                        </div>
                    </div>
                </div>`;
            });
            container.innerHTML = html;
        }

        function validatePassengerForms() {
            const names = document.querySelectorAll('.passenger-name');
            const phones = document.querySelectorAll('.passenger-phone');
            for (let i = 0; i < names.length; i++) {
                if (!names[i].value.trim()) { showToast(`⚠️ যাত্রী ${toBangla(i+1)}-এর নাম দিন`); names[i].focus(); return false; }
                if (!phones[i].value.trim()) { showToast(`⚠️ যাত্রী ${toBangla(i+1)}-এর মোবাইল নম্বর দিন`); phones[i].focus(); return false; }
            }
            return true;
        }

    