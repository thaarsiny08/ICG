
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

// Replace with ICG's official WhatsApp number.
const WHATSAPP_NUMBER = "91XXXXXXXXXX";

form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!/^[6-9]\d{9}$/.test(phone)) {
        status.textContent = "Enter a valid 10-digit mobile number.";
        return;
    }

    if (WHATSAPP_NUMBER.includes("X")) {
        status.textContent =
            "Please configure ICG's WhatsApp number in enquiry.js.";
        return;
    }

    const enquiry =
`ICG ADMISSION ENQUIRY

Name: ${name}
Phone: ${phone}
Email: ${email || "Not provided"}

Questions:
${message}`;

    const url = "https://wa.me/" + WHATSAPP_NUMBER
        + "?text=" + encodeURIComponent(enquiry);

    window.open(url, "_blank", "noopener,noreferrer");

    status.textContent =
        "WhatsApp opened. Please review and send your enquiry.";
});
