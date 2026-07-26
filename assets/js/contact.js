function initContact() {

    console.log("Contact initialized");

    const contactForm = document.getElementById("contactForm");

    if (!contactForm) return;

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        showToast("✅ আপনার বার্তা পাওয়া গেছে। শীঘ্রই যোগাযোগ করা হবে।");

        this.reset();

    });

}