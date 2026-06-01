const heroSlides = [
  {
    label: "Kashmir Escapes",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=82"
  },
  {
    label: "Goa Beach Breaks",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1800&q=82"
  },
  {
    label: "Kerala Backwaters",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1800&q=82"
  },
  {
    label: "Dubai City Holidays",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1800&q=82"
  },
  {
    label: "Thailand Island Tours",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1800&q=82"
  },
  {
    label: "Bali Honeymoon Villas",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1800&q=82"
  }
];

const chatReplies = [
  {
    keys: ["kashmir", "gulmarg", "srinagar"],
    reply: "Kashmir is best for scenic family trips and couples. A 5N/6D plan with Srinagar, Gulmarg, Pahalgam, and a houseboat works beautifully."
  },
  {
    keys: ["dubai", "desert", "burj"],
    reply: "Dubai works well for a 4N/5D city break. Add Burj Khalifa, dhow cruise, desert safari, and visa assistance for a complete journey."
  },
  {
    keys: ["bali", "honeymoon", "romantic"],
    reply: "For Bali honeymoon trips, combine Kuta with Ubud, then add a private villa, candle-light dinner, and water sports."
  },
  {
    keys: ["bus", "train", "ticket"],
    reply: "Share your source, destination, travel date, and preferred time. RS Voyagers can assist with bus and train options."
  },
  {
    keys: ["family", "kids", "parents"],
    reply: "For family vacations, Kerala, Goa, Singapore, and Dubai are smooth choices because transfers, hotels, and activities can be planned comfortably."
  }
];

const heroBg = document.querySelector(".hero-bg");
const heroKicker = document.querySelector(".hero-kicker");
let currentSlide = 0;

function rotateHero() {
  if (!heroBg || !heroKicker) return;
  currentSlide = (currentSlide + 1) % heroSlides.length;
  heroBg.style.backgroundImage = `url("${heroSlides[currentSlide].image}")`;
  heroKicker.textContent = heroSlides[currentSlide].label;
}

setInterval(rotateHero, 4500);

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      navMenu.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

document.querySelectorAll(".pill").forEach((pill) => {
  pill.addEventListener("click", () => {
    const filter = pill.dataset.filter;

    document.querySelectorAll(".pill").forEach((button) => button.classList.remove("active"));
    pill.classList.add("active");

    document.querySelectorAll(".destination-card").forEach((card) => {
      const show = filter === "all" || card.dataset.category === filter;
      card.style.display = show ? "" : "none";
    });
  });
});

const toast = document.querySelector("#toast");
let toastTimer;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
}

document.querySelectorAll("form").forEach((form) => {
  if (form.id === "chatForm") return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formName = form.dataset.formName || "Inquiry";
    showToast(`${formName} received. RS Voyagers will contact you shortly.`);

    if (form.id === "modalForm") {
      closeInquiryModal();
    }

    form.reset();
  });
});

const modal = document.querySelector("#inquiryModal");
const modalClose = document.querySelector(".modal-close");

function openInquiryModal() {
  if (!modal) return;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  const firstInput = modal.querySelector("input, select, textarea, button");
  if (firstInput) firstInput.focus();
}

function closeInquiryModal() {
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

document.querySelectorAll(".open-inquiry").forEach((button) => {
  button.addEventListener("click", openInquiryModal);
});

if (modalClose) {
  modalClose.addEventListener("click", closeInquiryModal);
}

if (modal) {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeInquiryModal();
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeInquiryModal();
    closeChat();
  }
});

const chatLauncher = document.querySelector("#chatLauncher");
const chatWidget = document.querySelector("#chatWidget");
const closeChatButton = document.querySelector("#closeChat");
const openChatFromSection = document.querySelector("#openChatFromSection");
const chatForm = document.querySelector("#chatForm");
const chatInput = document.querySelector("#chatInput");
const chatMessages = document.querySelector("#chatMessages");

function openChat() {
  if (!chatWidget) return;
  chatWidget.classList.add("open");
  chatWidget.setAttribute("aria-hidden", "false");
  if (chatInput) chatInput.focus();
}

function closeChat() {
  if (!chatWidget) return;
  chatWidget.classList.remove("open");
  chatWidget.setAttribute("aria-hidden", "true");
}

function addChatMessage(text, type) {
  if (!chatMessages) return;
  const message = document.createElement("p");
  message.className = type;
  message.textContent = text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getChatReply(input) {
  const text = input.toLowerCase();
  const match = chatReplies.find((item) => item.keys.some((key) => text.includes(key)));
  if (match) return match.reply;
  return "That sounds like a lovely plan. Share your destination, travel date, travelers, and budget, and RS Voyagers can prepare a customized quote.";
}

if (chatLauncher) chatLauncher.addEventListener("click", openChat);
if (openChatFromSection) openChatFromSection.addEventListener("click", openChat);
if (closeChatButton) closeChatButton.addEventListener("click", closeChat);

if (chatForm && chatInput) {
  chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = chatInput.value.trim();
    if (!value) return;

    addChatMessage(value, "user");
    chatInput.value = "";

    window.setTimeout(() => {
      addChatMessage(getChatReply(value), "bot");
    }, 450);
  });
}

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}
