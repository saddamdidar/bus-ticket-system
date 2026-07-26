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