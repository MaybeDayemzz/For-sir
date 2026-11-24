const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

document.querySelectorAll('#navLinks a, a[href^="#"]').forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Reveal elements smoothly as they enter the viewport.
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 5, 4) * 75}ms`;
  revealObserver.observe(element);
});

// Service enquiry links preselect the matching option in the contact form.
const interestSelect = document.getElementById("interest");
document.querySelectorAll("[data-service]").forEach(link => {
  link.addEventListener("click", () => {
    const service = link.dataset.service;
    const option = [...interestSelect.options].find(item => item.text === service);
    if (option) interestSelect.value = option.value;
  });
});

// Build a WhatsApp enquiry using the form details. The phone number is also linked
// directly throughout the page for visitors who prefer to call.
document.getElementById("enquiryForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;

  const name = document.getElementById("studentName").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const interest = interestSelect.value;
  const message = document.getElementById("message").value.trim();

  const text = [
    "Assalam-o-Alaikum Capital Scholars,",
    "",
    "I would like to enquire about tuition.",
    `Name: ${name}`,
    `Contact number: ${phone}`,
    `Interested in: ${interest}`,
    message ? `Additional details: ${message}` : ""
  ].filter(Boolean).join("\n");

  const whatsappUrl = `https://wa.me/923428837509?text=${encodeURIComponent(text)}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
});

document.getElementById("year").textContent = new Date().getFullYear();
