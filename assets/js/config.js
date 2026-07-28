const CONFIG = {

    coachNames: {
        "morning-ac": "সকালের কোচ (AC)",
        "afternoon-nonac": "বিকালের কোচ (Non-AC)"
    },

    fares: {
        "morning-ac": 850,
        "afternoon-nonac": 650
    },

    bookedSeats: {
        "morning-ac": [2,5,9,12,16,18,22,25],
        "afternoon-nonac": [1,3,8,14,20,26]
    },

    serviceCharge: 30,

    paymentAccounts: {

        bkash: {
            number: "017XXXXXXXX",
            type: "Personal",
            instructions: [
                "বিকাশ App অথবা USSD (*247#) ব্যবহার করুন।",
                "Send Money নির্বাচন করুন।",
                "ট্রানজেকশন সম্পন্ন করে নিচের তথ্য পূরণ করুন।"
            ]
        },

        nagad: {
            number: "018XXXXXXXX",
            type: "Personal",
            instructions: [
                "নগদ App অথবা *167# ব্যবহার করুন।",
                "Send Money নির্বাচন করুন।",
                "ট্রানজেকশন সম্পন্ন করে নিচের তথ্য পূরণ করুন।"
            ]
        },

        rocket: {
            number: "019XXXXXXXX",
            type: "Personal",
            instructions: [
                "Rocket App অথবা *322# ব্যবহার করুন।",
                "Send Money নির্বাচন করুন।",
                "ট্রানজেকশন সম্পন্ন করে নিচের তথ্য পূরণ করুন।"
            ]
        }

    }

};