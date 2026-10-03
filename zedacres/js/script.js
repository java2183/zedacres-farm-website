document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector(".site-nav");
  const navLinks = document.querySelectorAll(".site-nav a");

  // Mobile navigation toggle
  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isExpanded));
      navToggle.setAttribute("aria-label", isExpanded ? "Open menu" : "Close menu");
      siteNav.classList.toggle("open");
      document.body.classList.toggle("menu-open", !isExpanded);
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open menu");
        siteNav.classList.remove("open");
        document.body.classList.remove("menu-open");
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open menu");
        siteNav.classList.remove("open");
        document.body.classList.remove("menu-open");
      }
    });
  }

  // Reveal animations
  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  // Gallery lightbox
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = lightbox ? lightbox.querySelector("img") : null;
  const lightboxClose = document.querySelector(".lightbox-close");
  const galleryItems = document.querySelectorAll(".gallery-item");

  if (lightbox && lightboxImage && lightboxClose) {
    galleryItems.forEach((item) => {
      item.addEventListener("click", () => {
        const imageSrc = item.dataset.full || item.querySelector("img")?.src;
        lightboxImage.src = imageSrc;
        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };

    lightboxClose.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && lightbox.classList.contains("open")) {
        closeLightbox();
      }
    });
  }

  // Form validation with accessible error messages
  const forms = document.querySelectorAll(".needs-validation");

  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      let isValid = true;

      const fields = form.querySelectorAll("input, textarea");

      fields.forEach((field) => {
        const fieldGroup = field.closest(".field-group");
        const errorBox = fieldGroup ? fieldGroup.querySelector(".error-message") : null;

        if (!field.checkValidity()) {
          isValid = false;
          field.classList.add("invalid");
          field.setAttribute("aria-invalid", "true");

          if (errorBox) {
            const customMessage = field.dataset.error || "Please fill in this required field.";
            errorBox.textContent = customMessage;
          }
        } else {
          field.classList.remove("invalid");
          field.setAttribute("aria-invalid", "false");

          if (errorBox) {
            errorBox.textContent = "";
          }
        }
      });

      if (isValid) {
        const button = form.querySelector("button[type='submit']");
        if (button) {
          const originalText = button.textContent;
          button.textContent = "Submitted";
          button.disabled = true;
          setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            form.reset();
          }, 1800);
        }
      }
    });
  });
});
