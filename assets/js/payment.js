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
