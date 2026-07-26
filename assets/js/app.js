      // ============ CONFIGURATION ============
      function initializeApp() {  
      
      const CONFIG = {
            fares: { 'morning-ac': 550, 'afternoon-nonac': 300 }, // ← ভাড়া পরিবর্তন করুন (৳ ছাড়া)
            serviceCharge: 0, // সার্ভিস চার্জ প্রতি টিকেট
            totalSeats: 40,
            bookedSeats: { 'morning-ac': [3,7,12,18,25,31,38], 'afternoon-nonac': [5,9,14,22,28,35] },
            coachNames: { 'morning-ac': 'খান এন্টারপ্রাইজ AC (৭:০০ AM)', 'afternoon-nonac': 'খান এন্টারপ্রাইজ Non-AC (৩:৩০ PM)' },
            paymentAccounts: {
                bkash: { number: '০১XXXXXXXXX', type: 'ব্যক্তিগত / এজেন্ট', instructions: ['১। আপনার bKash অ্যাপ খুলুন', '২। "পাঠান" অপশনে যান', '৩। উপরের নম্বরে টাকা পাঠান', '৪। ট্রানজাকশন আইডি কপি করুন', '৫। নিচে ট্রানজাকশন আইডি দিন'] },
                nagad: { number: '০১XXXXXXXXX', type: 'ব্যক্তিগত / মার্চেন্ট', instructions: ['১। Nagad অ্যাপ খুলুন', '২। "পাঠান" অপশনে যান', '৩। উপরের নম্বরে টাকা পাঠান', '৪। ট্রানজাকশন আইডি কপি করুন', '৫। নিচে ট্রানজাকশন আইডি দিন'] },
                rocket: { number: '০১XXXXXXXXX', type: 'ব্যক্তিগত', instructions: ['১। Rocket/Dutch Bangla অ্যাপ খুলুন', '২। "পাঠান" অপশনে যান', '৩। উপরের নম্বরে টাকা পাঠান', '৪। ট্রানজাকশন আইডি কপি করুন', '৫। নিচে ট্রানজাকশন আইডি দিন'] },
            }
        };

        // ============ STATE ============
        let selectedCoach = '';
        let selectedDate = '';
        let selectedSeats = [];
        let selectedPayment = '';
        let currentStep = 1;

        // ============ HERO SLIDER ============
const slides = document.querySelectorAll(".slide-item");
const dots = document.querySelectorAll(".slider-dot");

let currentSlide = 0;

function goToSlide(i) {

    if (!slides.length || !dots.length) return;

    slides[currentSlide].classList.remove("active");
    dots[currentSlide].style.background = "rgba(255,255,255,.5)";

    currentSlide = i;

    slides[currentSlide].classList.add("active");
    dots[currentSlide].style.background = "#fff";
}

if (slides.length && dots.length) {

    dots.forEach(dot => {

        dot.addEventListener("click", () => {
            goToSlide(Number(dot.dataset.index));
        });

    });

    setInterval(() => {

        goToSlide((currentSlide + 1) % slides.length);

    }, 4500);

}
// ============ MOBILE MENU ============
const mobileToggle = document.getElementById("mobileToggle");
const mobileClose = document.getElementById("mobileClose");
const mobileMenu = document.getElementById("mobileMenu");

if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener("click", () => {
        mobileMenu.classList.add("open");
    });
}

if (mobileClose && mobileMenu) {
    mobileClose.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
    });
}

document.querySelectorAll("#mobileMenu a").forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu?.classList.remove("open");
    });
});

        

        // ============ TOAST ============
        function showToast(msg) {
            const t = document.getElementById('toast');
            t.textContent = msg; t.classList.add('show');
            setTimeout(() => t.classList.remove('show'), 3500);
        }

        // ============ DATE ============
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('journeyDate').min = today;
        document.getElementById('journeyDate').value = today;

        // ============ SEARCH FORM ============
        const searchForm = document.getElementById("searchForm");

if (searchForm) {
    searchForm.addEventListener("submit", function (e) {
        e.preventDefault();
        selectedDate = document.getElementById('journeyDate').value;
        selectedCoach = document.getElementById('coachType').value;
        if (!selectedCoach) {
            showToast('⚠️ কোচ নির্বাচন করুন');
            return;
        }
        openModal();
    });
}

        function quickBook(coach) {
            selectedDate = document.getElementById('journeyDate').value;
            selectedCoach = coach;
            document.getElementById('coachType').value = coach;
            openModal();
        }

        // ============ MODAL ============
        function openModal() {
            selectedSeats = [];
            selectedPayment = '';
            currentStep = 1;
            document.getElementById('bookingModal').classList.add('open');
            document.body.style.overflow = 'hidden';
            document.getElementById('modalDate').textContent = formatDate(selectedDate);
            document.getElementById('modalCoach').textContent = CONFIG.coachNames[selectedCoach];
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

        // ============ SEAT MAP ============
        function renderSeats() {
            const map = document.getElementById('seatMap');
            const booked = CONFIG.bookedSeats[selectedCoach] || [];
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
            const idx = selectedSeats.indexOf(num);
            if (idx > -1) {
                selectedSeats.splice(idx, 1);
            } else {
                if (selectedSeats.length >= 5) { showToast('⚠️ সর্বোচ্চ ৫টি আসন বুক করতে পারবেন'); return; }
                selectedSeats.push(num);
            }
            // Update seat visuals
            document.querySelectorAll('.seat').forEach(s => {
                const n = +s.dataset.seat;
                if (!s.classList.contains('booked') && !s.classList.contains('driver')) {
                    s.classList.toggle('selected', selectedSeats.includes(n));
                }
            });
            updateSeatInfo();
        }

        function updateSeatInfo() {
            const fare = CONFIG.fares[selectedCoach];
            document.getElementById('seatCount').textContent = toBangla(selectedSeats.length);
            document.getElementById('seatTotal').textContent = '৳' + toBangla(selectedSeats.length * fare);
            document.getElementById('toStep2').disabled = selectedSeats.length === 0;
        }

        // ============ STEP NAVIGATION ============
        function goToStep(step) {
            if (step === 2 && selectedSeats.length === 0) return;
            if (step === 3) {
                if (!validatePassengerForms()) return;
            }
            if (step === 3) {
                renderPaymentInfo();
            }
            currentStep = step;
            updateStepUI();

            if (step === 2) renderPassengerForms();
            if (step === 4) renderConfirmation();
        }

        function updateStepUI() {
            for (let i = 1; i <= 4; i++) {
                const dot = document.getElementById('stepDot' + i);
                const panel = document.getElementById('step' + i);
                dot.className = 'step-dot';
                if (i < currentStep) dot.classList.add('done');
                else if (i === currentStep) dot.classList.add('active');
                panel.classList.toggle('hidden', i !== currentStep);
            }
            for (let i = 1; i <= 3; i++) {
                const line = document.getElementById('stepLine' + i);
                line.className = 'step-line';
                if (i < currentStep) line.classList.add('done');
                else if (i === currentStep) line.classList.add('active');
            }
        }

        // ============ PASSENGER FORMS ============
        function renderPassengerForms() {
            const container = document.getElementById('passengerForms');
            let html = '';
            selectedSeats.forEach((seat, i) => {
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

        // ============ PAYMENT ============
        function renderPaymentInfo() {
            const fare = CONFIG.fares[selectedCoach];
            const count = selectedSeats.length;
            const subtotal = count * fare;
            const service = count * CONFIG.serviceCharge;
            const total = subtotal + service;

            document.getElementById('paySeats').textContent = toBangla(count);
            document.getElementById('payPerSeat').textContent = toBangla(fare);
            document.getElementById('paySubtotal').textContent = '৳' + toBangla(subtotal);
            document.getElementById('payService').textContent = '৳' + toBangla(service);
            document.getElementById('payTotal').textContent = '৳' + toBangla(total);
        }

        function selectPayment(method) {
            selectedPayment = method;
            document.querySelectorAll('.payment-option').forEach(o => {
                o.classList.toggle('active', o.dataset.method === method);
                o.querySelector('.payment-check div').classList.toggle('hidden', o.dataset.method !== method);
            });

            const acc = CONFIG.paymentAccounts[method];
            const names = { bkash: 'bKash', nagad: 'Nagad', rocket: 'Rocket' };
            document.getElementById('paymentTitle').textContent = names[method] + ' পেমেন্ট';
            document.getElementById('paymentInstructions').innerHTML = `
                <p class="font-semibold text-gray-700">পেমেন্ট করুন: <span class="text-khan-blue font-english">${acc.number}</span> (${acc.type})</p>
                ${acc.instructions.map(i => `<p>${i}</p>`).join('')}
            `;

            document.getElementById('paymentDetails').classList.remove('hidden');
            document.getElementById('trxId').value = '';
            document.getElementById('senderNumber').value = '';
            updatePayBtn();
        }

        document.getElementById('trxId')?.addEventListener('input', updatePayBtn);
        document.getElementById('senderNumber')?.addEventListener('input', updatePayBtn);

        function updatePayBtn() {
            const trx = document.getElementById('trxId')?.value.trim();
            const sender = document.getElementById('senderNumber')?.value.trim();
            document.getElementById('payBtn').disabled = !(selectedPayment && trx && sender);
        }

        function processPayment() {
            const trx = document.getElementById('trxId').value.trim();
            const sender = document.getElementById('senderNumber').value.trim();
            if (!trx || !sender) { showToast('⚠️ ট্রানজাকশন আইডি ও নম্বর দিন'); return; }

            // Simulate payment processing
            const btn = document.getElementById('payBtn');
            btn.disabled = true;
            btn.innerHTML = '<iconify-icon icon="lucide:loader-2" width="16" class="animate-spin inline"></iconify-icon> প্রসেসিং...';

            setTimeout(() => {
                btn.innerHTML = 'পেমেন্ট করুন';
                goToStep(4);
            }, 2000);
        }

        // ============ CONFIRMATION ============
        function renderConfirmation() {
            const fare = CONFIG.fares[selectedCoach];
            const count = selectedSeats.length;
            const total = (count * fare) + (count * CONFIG.serviceCharge);
            const names = { bkash: 'bKash', nagad: 'Nagad', rocket: 'Rocket' };

            document.getElementById('bookingId').textContent = 'KPB-' + Date.now().toString(36).toUpperCase();
            document.getElementById('invDate').textContent = formatDate(selectedDate);
            document.getElementById('invCoach').textContent = CONFIG.coachNames[selectedCoach];
            document.getElementById('invSeats').textContent = selectedSeats.map(s => toBangla(s)).join(', ');
            document.getElementById('invMethod').textContent = names[selectedPayment];
            document.getElementById('invTrx').textContent = document.getElementById('trxId').value;
            document.getElementById('invTotal').textContent = '৳' + toBangla(total);

            let phtml = '';
            document.querySelectorAll('.passenger-name').forEach((n, i) => {
                phtml += `<div class="flex justify-between"><span class="text-gray-500">যাত্রী ${toBangla(i+1)}:</span><span class="font-semibold">${n.value} (${document.querySelectorAll('.passenger-phone')[i].value})</span></div>`;
            });
            document.getElementById('invPassengers').innerHTML = phtml;
        }

        // ============ CONTACT FORM ============
     const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        showToast('✅ আপনার বার্তা পাওয়া গেছে। শীঘ্রই যোগাযোগ করা হবে।');
        this.reset();
    });
}

        // ============ SCROLL TOP ============
        const scrollBtn = document.getElementById('scrollTop');
        window.addEventListener('scroll', () => {
            scrollBtn.style.opacity = window.scrollY > 400 ? '1' : '0';
            scrollBtn.style.pointerEvents = window.scrollY > 400 ? 'auto' : 'none';
        });
        scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

        // ============ HELPERS ============
        function toBangla(n) {
            const d = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
            return String(n).replace(/\d/g, c => d[+c]);
        }

        // ============ CLOSE MODAL ON OVERLAY CLICK ============
       document.getElementById('bookingModal').addEventListener('click', function(e) {
    if (e.target === this && currentStep !== 4) closeModal();
});

// Export functions for inline onclick
window.quickBook = quickBook;
window.closeModal = closeModal;
window.toggleSeat = toggleSeat;
window.goToStep = goToStep;
window.selectPayment = selectPayment;
window.processPayment = processPayment;

}