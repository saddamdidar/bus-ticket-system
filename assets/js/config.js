/*
====================================================
Khan Enterprise
Configuration File
====================================================
*/

const CONFIG = {

    // ===========================
    // COMPANY INFORMATION
    // ===========================
    company: {
        name: "Khan Enterprise",
        phone: "+8801302516469",
        email: "info@khanenterprise.com",
        website: "https://khan-paribahan.pages.dev"
    },

    // ===========================
    // ROUTE
    // ===========================
    route: {
        from: "Dhaka",
        to: "Tarakandi"
    },

    // ===========================
    // COACHES
    // ===========================
    coaches: {

        "morning-ac": {
            id: "morning-ac",
            name: "সকালের কোচ (AC)",
            departure: "07:00 AM",
            fare: 300
        },

        "afternoon-nonac": {
            id: "afternoon-nonac",
            name: "বিকালের কোচ (Non AC)",
            departure: "03:30 PM",
            fare: 300
        }

    },

    // ===========================
    // BUS LAYOUT
    // ===========================
    bus: {

        rows: 10,

        columns: 4,

        maxSeatSelection: 5

    },

    // ===========================
    // SERVICE CHARGE
    // ===========================
    serviceCharge: 20,

    // ===========================
    // PAYMENT
    // ===========================
    payment: {

        bkash: {
            number: "01700000000",
            accountType: "Personal"
        },

        nagad: {
            number: "01800000000",
            accountType: "Personal"
        },

        rocket: {
            number: "01900000000",
            accountType: "Personal"
        }

    },

    // ===========================
    // DEMO BOOKED SEATS
    // ===========================
    bookedSeats: {

        "morning-ac": [2,5,8,11,18,22,29],

        "afternoon-nonac": [1,3,10,15,20,35]

    }

};

// Prevent accidental modification
Object.freeze(CONFIG);