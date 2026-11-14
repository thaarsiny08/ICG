
/* ===== MOBILE MENU ===== */

const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", function () {
    const isOpen = menu.classList.toggle("active");

    menuBtn.setAttribute("aria-expanded", isOpen);
    menuBtn.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
    );

    menuBtn.textContent = isOpen ? "✕" : "☰";
});

/* Close mobile menu after clicking a link */

menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        menu.classList.remove("active");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Open menu");
        menuBtn.textContent = "☰";
    });
});

/* ===== CURRENT YEAR ===== */

document.getElementById("yr").textContent =
    new Date().getFullYear();

/* ===== ADMISSION ENQUIRY FORM ===== */

const form = document.getElementById("admissionForm");
const status = document.getElementById("formStatus");

/*
  IMPORTANT:
  Replace this placeholder with ICG's official WhatsApp number.
  Use country code + number, without +, spaces or hyphens.
  Example format for an Indian number: 919876543210
*/

const WHATSAPP_NUMBER = "91XXXXXXXXXX";

form.addEventListener("submit", function (event) {
    event.preventDefault();

    status.textContent = "";

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const course = document.getElementById("course").value;
    const education = document.getElementById("education").value;
    const batch = document.getElementById("batch").value;
    const message = document.getElementById("message").value.trim();

    if (!/^[6-9]\d{9}$/.test(phone)) {
        status.textContent =
            "Please enter a valid 10-digit Indian mobile number.";
        return;
    }

    if (WHATSAPP_NUMBER.includes("X")) {
        status.textContent =
            "The form is ready. Please configure ICG's official WhatsApp number in enquiry.js before submitting.";
        return;
    }

    const enquiryMessage =
`ICG ADMISSION ENQUIRY

Name: ${name}
Mobile: ${phone}
Email: ${email || "Not provided"}
Exam: ${course}
Education: ${education}
Preferred Batch: ${batch || "Not decided"}

Questions: ${message || "None"}

I would like to know more about the course and admission process.`;

    const whatsappURL =
        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(enquiryMessage);

    status.textContent =
        "Opening WhatsApp. Please review and send your enquiry message.";

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
});
