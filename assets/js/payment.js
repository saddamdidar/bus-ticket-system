// ======================================================
// PAYMENT.JS
// ======================================================

// ==============================
// Render Payment Summary
// ==============================

function renderPaymentInfo() {

    const fare = CONFIG.fares[APP_STATE.selectedCoach] || 0;

    const count = APP_STATE.selectedSeats.length;

    const subtotal = fare * count;

    const service = CONFIG.serviceCharge * count;

    const total = subtotal + service;

    document.getElementById("paySeats").textContent =
        toBangla(count);

    document.getElementById("payPerSeat").textContent =
        toBangla(fare);

    document.getElementById("paySubtotal").textContent =
        "৳" + toBangla(subtotal);

    document.getElementById("payService").textContent =
        "৳" + toBangla(service);

    document.getElementById("payTotal").textContent =
        "৳" + toBangla(total);

}

// ==============================
// Select Payment Method
// ==============================

function selectPayment(method) {

    APP_STATE.selectedPayment = method;

    document.querySelectorAll(".payment-option").forEach(option => {

        const active = option.dataset.method === method;

        option.classList.toggle("active", active);

        const check =
            option.querySelector(".payment-check div");

        if (check) {

            check.classList.toggle("hidden", !active);

        }

    });

    const account = CONFIG.paymentAccounts[method];

    const names = {

        bkash: "bKash",

        nagad: "Nagad",

        rocket: "Rocket"

    };

    document.getElementById("paymentTitle").textContent =
        names[method] + " পেমেন্ট";

    document.getElementById("paymentInstructions").innerHTML = `
        <p class="font-semibold">
            পেমেন্ট করুন :
            <span class="text-khan-blue">
                ${account.number}
            </span>
            (${account.type})
        </p>

        ${account.instructions
            .map(i => `<p>${i}</p>`)
            .join("")}
    `;

    document
        .getElementById("paymentDetails")
        .classList.remove("hidden");

    document.getElementById("trxId").value = "";

    document.getElementById("senderNumber").value = "";

    updatePayButton();

}

// ==============================
// Enable / Disable Pay Button
// ==============================

function updatePayButton() {

    const trx =
        document.getElementById("trxId").value.trim();

    const sender =
        document.getElementById("senderNumber").value.trim();

    document.getElementById("payBtn").disabled = !(
        APP_STATE.selectedPayment &&
        trx &&
        sender
    );

}

document
    .getElementById("trxId")
    ?.addEventListener("input", updatePayButton);

document
    .getElementById("senderNumber")
    ?.addEventListener("input", updatePayButton);

// ==============================
// Process Payment
// ==============================

function processPayment() {

    const trx =
        document.getElementById("trxId").value.trim();

    const sender =
        document.getElementById("senderNumber").value.trim();

    if (!trx || !sender) {

        showToast("⚠️ ট্রানজাকশন আইডি ও নম্বর দিন");

        return;

    }

    const btn = document.getElementById("payBtn");

    btn.disabled = true;

    btn.innerHTML = `
        <iconify-icon
            icon="lucide:loader-2"
            class="animate-spin"
            width="16">
        </iconify-icon>
        প্রসেসিং...
    `;

    setTimeout(() => {

        btn.disabled = false;

        btn.innerHTML = "পেমেন্ট করুন";

        goToStep(4);

    }, 2000);

}

// ==============================
// Confirmation
// ==============================

function renderConfirmation() {

    const fare =
        CONFIG.fares[APP_STATE.selectedCoach] || 0;

    const count =
        APP_STATE.selectedSeats.length;

    const total =
        (fare * count) +
        (CONFIG.serviceCharge * count);

    const names = {

        bkash: "bKash",

        nagad: "Nagad",

        rocket: "Rocket"

    };

    document.getElementById("bookingId").textContent =
        "KPB-" + Date.now().toString(36).toUpperCase();

    document.getElementById("invDate").textContent =
        formatDate(APP_STATE.selectedDate);

    document.getElementById("invCoach").textContent =
        CONFIG.coachNames[APP_STATE.selectedCoach];

    document.getElementById("invSeats").textContent =
        APP_STATE.selectedSeats
            .map(seat => toBangla(seat))
            .join(", ");

    document.getElementById("invMethod").textContent =
        names[APP_STATE.selectedPayment];

    document.getElementById("invTrx").textContent =
        document.getElementById("trxId").value;

    document.getElementById("invTotal").textContent =
        "৳" + toBangla(total);

    let html = "";

    const passengerNames =
        document.querySelectorAll(".passenger-name");

    const passengerPhones =
        document.querySelectorAll(".passenger-phone");

    passengerNames.forEach((input, index) => {

        html += `
            <div class="flex justify-between">

                <span>
                    যাত্রী ${toBangla(index + 1)}
                </span>

                <span class="font-semibold">

                    ${input.value}

                    (${passengerPhones[index].value})

                </span>

            </div>
        `;

    });

    document.getElementById("invPassengers").innerHTML =
        html;

}

// ==============================
// Export
// ==============================

Object.assign(window, {

    renderPaymentInfo,
    selectPayment,
    processPayment,
    renderConfirmation

});