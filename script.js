/**
 * Gunal D - Portfolio Interactive Scripts
 * Pure Vanilla JavaScript (No dependencies)
 */

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initTypingEffect();
  initMobileNavigation();
  initScrollSpy();
  initProjectFiltering();
  initSkillFiltering();
  initProjectModal();
  initClipboardCopy();
  initContactForm();
  initBackToTop();
  initTimelineTabs();
});

/* ==========================================================================
   1. THEME TOGGLE (DARK / LIGHT MODE)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  if (!themeToggleBtn) return;

  // Retrieve saved preference or default to dark
  const savedTheme = localStorage.getItem("gunal_theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);

  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("gunal_theme", nextTheme);
    showToast(`Switched to ${nextTheme === "dark" ? "Dark" : "Light"} theme`);
  });
}

/* ==========================================================================
   2. HERO TYPING EFFECT
   ========================================================================== */
function initTypingEffect() {
  const typingElement = document.getElementById("typing-text");
  if (!typingElement) return;

  const roles = [
    "Data Scientist",
    "Machine Learning Engineer",
    "Agentic RAG & LLM Specialist",
    "Former Web Developer (2+ Yrs)"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 80;
  const deleteSpeed = 40;
  const pauseEnd = 1800;
  const pauseStart = 400;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let currentSpeed = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
      currentSpeed = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      currentSpeed = pauseStart;
    }

    setTimeout(type, currentSpeed);
  }

  type();
}

/* ==========================================================================
   3. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNavigation() {
  const mobileToggle = document.getElementById("mobile-toggle");
  const mobileDrawer = document.getElementById("mobile-nav-drawer");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  if (!mobileToggle || !mobileDrawer) return;

  function toggleMenu() {
    const isOpen = mobileDrawer.classList.toggle("open");
    mobileToggle.classList.toggle("open");
    mobileToggle.setAttribute("aria-expanded", isOpen);
  }

  mobileToggle.addEventListener("click", toggleMenu);

  // Close when clicking any link
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileDrawer.classList.remove("open");
      mobileToggle.classList.remove("open");
      mobileToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (
      mobileDrawer.classList.contains("open") &&
      !mobileDrawer.contains(e.target) &&
      !mobileToggle.contains(e.target)
    ) {
      mobileDrawer.classList.remove("open");
      mobileToggle.classList.remove("open");
      mobileToggle.setAttribute("aria-expanded", "false");
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileDrawer.classList.contains("open")) {
      mobileDrawer.classList.remove("open");
      mobileToggle.classList.remove("open");
      mobileToggle.setAttribute("aria-expanded", "false");
    }
  });

  // Expose global toggleMenu for legacy compatibility
  window.toggleMenu = toggleMenu;
}

/* ==========================================================================
   4. SCROLL SPY & HEADER SHADOW
   ========================================================================== */
function initScrollSpy() {
  const header = document.querySelector(".site-header");
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".desktop-nav .nav-link");

  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY;

    // Header blur shadow on scroll
    if (header) {
      if (scrollPos > 30) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }

    // Scroll spy active link
    sections.forEach((section) => {
      const top = section.offsetTop - 120;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  });
}

/* ==========================================================================
   5. PROJECT CATEGORY FILTERING
   ========================================================================== */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll(".projects-filter-nav .filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          card.style.display = "flex";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 10);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(15px)";
          setTimeout(() => {
            card.style.display = "none";
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   6. SKILL CATEGORY FILTERING
   ========================================================================== */
function initSkillFiltering() {
  const filterBtns = document.querySelectorAll(".skills-filter-nav .filter-btn");
  const skillCards = document.querySelectorAll(".skill-category-card");

  if (!filterBtns.length || !skillCards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      skillCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          card.style.display = "flex";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 10);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(15px)";
          setTimeout(() => {
            card.style.display = "none";
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   7. TIMELINE TABS (EXPERIENCE / EDUCATION)
   ========================================================================== */
function initTimelineTabs() {
  const tabBtns = document.querySelectorAll(".timeline-tab-btn");
  const timelineItems = document.querySelectorAll(".timeline-item");

  if (!tabBtns.length) return;

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const tab = btn.getAttribute("data-tab");

      timelineItems.forEach((item) => {
        const itemType = item.getAttribute("data-type");
        if (tab === "all" || itemType === tab) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
}

/* ==========================================================================
   8. PROJECT DETAILS MODAL
   ========================================================================== */
const projectsData = {
  "upi-recommender": {
    title: "UPI Transaction Amount Recommendation System",
    subtitle: "Machine Learning & Fintech | Streamlit App",
    image: "assets/project-1.png",
    description: "An intelligent machine learning recommendation system that predicts optimal UPI transaction amounts based on temporal transaction habits, historical spending patterns, and user clustering.",
    highlights: [
      "Trained and evaluated on 10,000+ UPI transaction records spanning 1,000 users and 10 categories.",
      "Engineered behavioral user clusters (High-Value Users, Daily Transactors, Utility Spend) using K-Means and RFM metrics.",
      "Built interactive Streamlit interface providing amount suggestions, category-level analysis, and 70% confidence intervals.",
      "Provides transparent reasoning explaining the predictive factors behind each financial recommendation."
    ],
    github: "https://github.com/gunal-official/UPI-Transaction-Amount-Recommendation-System-Using-User-Transaction-Patterns",
    demo: "https://trb9kbzvjqczjdgep2vrjj.streamlit.app/",
    tags: ["Python", "Scikit-Learn", "Streamlit", "Pandas", "Clustering", "Fintech"]
  },
  "document-assistant": {
    title: "AI-Powered Multi-PDF Document Assistant",
    subtitle: "Generative AI & Agentic RAG | LangChain + LLaMA 3",
    image: "assets/project-rag.png",
    description: "Production-grade Retrieval-Augmented Generation (RAG) assistant allowing users to upload multiple documents, perform semantic search with conversational memory, and extract cited insights in real time.",
    highlights: [
      "Built using LangChain, Groq high-speed LLaMA 3 inference, and Google Gemini embeddings.",
      "Integrates ChromaDB vector store for dense semantic similarity search and document retrieval.",
      "Maintains conversational chat memory across multi-turn queries with exact source page and section citations.",
      "Streamlit UI with drag-and-drop PDF ingestion, token optimization, and zero hallucination guardrails."
    ],
    github: "https://github.com/gunal-official/AI-Powered-Document-Assistant",
    demo: "https://ai-powered-document-assistant-chatbot.streamlit.app/",
    tags: ["Generative AI", "LangChain", "RAG", "LLaMA 3", "ChromaDB", "Streamlit"]
  },
  "multimodal-ai": {
    title: "Multimodal AI Vision & Document Assistant",
    subtitle: "Vision-Language Models | Gemini 2.5 Flash",
    image: "assets/project-multimodal.png",
    description: "A cutting-edge multimodal vision assistant built on Vision-Language Models (VLM) that enables rich image analysis, visual question answering, and contextual document extraction via OpenRouter API.",
    highlights: [
      "Integrates Gemini 2.5 Flash for simultaneous multimodal perception across images, diagrams, and text.",
      "Handles object recognition, spatial scene understanding, OCR text extraction, and complex visual reasoning.",
      "Includes chat history retention and interactive parameter controls for temperature and top-p sampling.",
      "Structured error handling and prompt templates for specialized visual inspection tasks."
    ],
    github: "https://github.com/gunal-official/multimodal-ai-assistant",
    demo: "",
    tags: ["VLM", "Gemini 2.5 Flash", "OpenRouter API", "Computer Vision", "Python"]
  },
  "dynamic-pricing": {
    title: "Dynamic Pricing Strategy & Revenue Optimizer",
    subtitle: "Predictive Modeling & Economics | XGBoost",
    image: "assets/project-pricing.png",
    description: "An econometric and machine learning pricing engine designed to compute optimal product price points based on market demand elasticity, competitor pricing trends, and customer purchase velocity.",
    highlights: [
      "Engineered regression and gradient boosted tree models (XGBoost) achieving 96.7% price accuracy and 0.14 RMSE.",
      "Implemented price elasticity modeling across 4,850+ active product SKUs to calculate optimal profit margins.",
      "Conducted simulated A/B testing frameworks to validate conversion rates, revenue uplift, and price sensitivity.",
      "Delivered strategic interactive dashboard for category managers to automate real-time price adjustments."
    ],
    github: "https://github.com/gunal-official",
    demo: "",
    tags: ["Python", "XGBoost", "Price Elasticity", "Scikit-Learn", "A/B Testing"]
  },
  "financial-analysis": {
    title: "Financial Data Analysis & Market Intelligence",
    subtitle: "Quantitative Finance & Time Series | Plotly Dashboard",
    image: "assets/project-financial.png",
    description: "A comprehensive quantitative finance platform providing interactive stock analytics, technical indicators, volatility profiling, and portfolio risk-return benchmarking.",
    highlights: [
      "Analyzed historical OHLCV data across NASDAQ/NSE equities to detect trend shifts and market regimes.",
      "Calculated technical indicators: RSI (14), MACD signals, 50/200-day Simple & Exponential Moving Averages.",
      "Evaluated portfolio risk metrics including Sharpe ratio, Beta coefficient, Annualized Volatility, and Max Drawdown.",
      "Built interactive Plotly candlestick charts, correlation heatmaps, and asset allocation scatter matrices."
    ],
    github: "https://github.com/gunal-official/financial-data-analysis-with-python",
    demo: "https://financial-data-analysis-with-python-k7csmfubwkkyhvxcldzkdt.streamlit.app/",
    tags: ["Plotly", "Time Series", "Pandas", "Quantitative Analysis", "Streamlit"]
  },
  "clv-analysis": {
    title: "Customer Lifetime Value (CLV) & Churn Predictor",
    subtitle: "Behavioral Analytics & Retention | RFM Modeling",
    image: "assets/project-clv.png",
    description: "Data-driven customer intelligence system that calculates RFM segmentation, forecasts future 90-day Customer Lifetime Value, and predicts churn probabilities to maximize marketing ROI.",
    highlights: [
      "Cleaned and modeled 48,000+ transactional customer records with Recency, Frequency, and Monetary (RFM) metrics.",
      "Segmented customers into 6 actionable cohorts (Champions, Loyal Customers, Promising, Need Attention, At-Risk, Hibernating).",
      "Built predictive machine learning models to forecast 90-day customer purchase value.",
      "Visualized month-over-month retention heatmaps and cohort decay curves in an interactive dashboard."
    ],
    github: "https://github.com/gunal-official/customer-lifetime-value-analysis",
    demo: "https://customer-lifetime-value-analysis-j4euuttoegcb7efz5dguss.streamlit.app/",
    tags: ["RFM Segmentation", "Machine Learning", "Customer Analytics", "Streamlit", "Pandas"]
  }
};

function initProjectModal() {
  const modalOverlay = document.getElementById("project-modal");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const modalTitle = document.getElementById("modal-title");
  const modalSubtitle = document.getElementById("modal-subtitle");
  const modalImage = document.getElementById("modal-image");
  const modalDesc = document.getElementById("modal-desc");
  const modalHighlights = document.getElementById("modal-highlights");
  const modalActions = document.getElementById("modal-actions");
  const detailTriggers = document.querySelectorAll(".project-details-btn");

  if (!modalOverlay || !detailTriggers.length) return;

  function openModal(projectId) {
    const data = projectsData[projectId];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalSubtitle.textContent = data.subtitle;
    modalImage.src = data.image;
    modalImage.alt = data.title;
    modalDesc.textContent = data.description;

    modalHighlights.innerHTML = "";
    data.highlights.forEach((h) => {
      const li = document.createElement("li");
      li.textContent = h;
      modalHighlights.appendChild(li);
    });

    modalActions.innerHTML = "";
    if (data.demo) {
      const demoBtn = document.createElement("a");
      demoBtn.href = data.demo;
      demoBtn.target = "_blank";
      demoBtn.rel = "noreferrer";
      demoBtn.className = "btn btn-primary";
      demoBtn.innerHTML = `Live Demo ↗`;
      modalActions.appendChild(demoBtn);
    }

    if (data.github) {
      const gitBtn = document.createElement("a");
      gitBtn.href = data.github;
      gitBtn.target = "_blank";
      gitBtn.rel = "noreferrer";
      gitBtn.className = "btn btn-secondary";
      gitBtn.innerHTML = `View on GitHub`;
      modalActions.appendChild(gitBtn);
    }

    modalOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modalOverlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  detailTriggers.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute("data-project");
      openModal(projectId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeModal);
  }

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("open")) {
      closeModal();
    }
  });
}

/* ==========================================================================
   9. ONE-CLICK CLIPBOARD COPY
   ========================================================================== */
function initClipboardCopy() {
  const copyButtons = document.querySelectorAll(".copy-btn");

  copyButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const textToCopy = btn.getAttribute("data-copy");
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(
        () => {
          showToast(`Copied: ${textToCopy}`);
          const originalText = btn.textContent;
          btn.textContent = "Copied!";
          setTimeout(() => {
            btn.textContent = originalText;
          }, 2000);
        },
        () => {
          showToast(`Could not copy automatically`);
        }
      );
    });
  });
}

/* ==========================================================================
   10. CONTACT FORM SUBMISSION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("form-name").value.trim();
    const email = document.getElementById("form-email").value.trim();
    const subject = document.getElementById("form-subject").value.trim() || "Portfolio Inquiry for Gunal D";
    const message = document.getElementById("form-message").value.trim();

    if (!name || !email || !message) {
      showToast("Please fill in all required fields.");
      return;
    }

    // Construct mailto link as direct fallback
    const mailtoUri = `mailto:gunalofficialid@gmail.com?subject=${encodeURIComponent(
      `[Portfolio Inquiry] ${subject} - from ${name}`
    )}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

    window.location.href = mailtoUri;
    showToast("Opening email client... Thank you for reaching out!");

    form.reset();
  });
}

/* ==========================================================================
   11. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById("back-to-top");
  if (!backToTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/* ==========================================================================
   12. TOAST NOTIFICATION UTILITY
   ========================================================================== */
let toastTimeout;
function showToast(message) {
  let toast = document.getElementById("site-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "site-toast";
    toast.className = "toast-container";
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent-secondary);"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
    <span>${message}</span>
  `;
  toast.classList.add("show");

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}
