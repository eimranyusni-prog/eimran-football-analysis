/**
 * ===================================================================
 * AMIR | FOOTBALL EXPERT - MODERN CV & PORTFOLIO JAVASCRIPT
 * Vanilla JavaScript (ES6+) with Zero External Library Dependencies
 * Features:
 *  - Sticky Navbar & Active Section Scroll-Spy
 *  - Mobile Navigation Drawer Toggle & Outside-Click Handling
 *  - Viewport Intersection Observer for Scroll Reveals
 *  - Animated Skill Progress Bars & Numeric Counters
 *  - Animated Hero Statistics Counters
 *  - Interactive Project & Editorial Modal Previews
 *  - Comprehensive Client-side Contact Form Validation & Toast System
 *  - Back to Top Smooth Scroll Control
 * ===================================================================
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* -----------------------------------------------------------------
     1. DOM ELEMENT REFERENCES
     ----------------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.getElementById('back-to-top');

  // Contact Form elements
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const formAlert = document.getElementById('form-alert');
  const submitBtn = document.getElementById('submit-btn');

  // Modal elements
  const infoModal = document.getElementById('info-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalTag = document.getElementById('modal-tag');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  // Toast Container
  const toastContainer = document.getElementById('toast-container');


  /* -----------------------------------------------------------------
     2. STICKY NAVBAR & SCROLL BEHAVIOR
     ----------------------------------------------------------------- */
  const handleScroll = () => {
    const scrollPos = window.scrollY;

    // Toggle navbar glass elevation
    if (scrollPos > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Toggle Back-To-Top button visibility
    if (scrollPos > 450) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }

    // Update active nav link based on scroll position
    updateActiveNavLink(scrollPos);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  // Initial run
  handleScroll();


  /* -----------------------------------------------------------------
     3. ACTIVE NAVIGATION LINK (SCROLL-SPY)
     ----------------------------------------------------------------- */
  function updateActiveNavLink(scrollPos) {
    const offset = 140; // Navbar offset

    sections.forEach((section) => {
      const top = section.offsetTop - offset;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }


  /* -----------------------------------------------------------------
     4. MOBILE NAVIGATION DRAWER
     ----------------------------------------------------------------- */
  if (navToggle && navMenu) {
    const toggleMenu = () => {
      const isOpen = navMenu.classList.contains('open');
      navMenu.classList.toggle('open');
      navToggle.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', !isOpen);
      document.body.style.overflow = isOpen ? '' : 'hidden'; // Prevent background scroll
    };

    const closeMenu = () => {
      navMenu.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    navToggle.addEventListener('click', toggleMenu);

    // Close when clicking any nav link
    navLinks.forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    // Close when clicking outside of the drawer
    document.addEventListener('click', (e) => {
      if (
        navMenu.classList.contains('open') &&
        !navMenu.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        closeMenu();
      }
    });

    // Close on Escape key press
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMenu();
      }
    });
  }


  /* -----------------------------------------------------------------
     5. SMOOTH SCROLLING FOR INTERNAL LINKS
     ----------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });


  /* -----------------------------------------------------------------
     6. BACK TO TOP CLICK HANDLER
     ----------------------------------------------------------------- */
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }


  /* -----------------------------------------------------------------
     7. VIEWPORT INTERSECTION OBSERVER FOR SCROLL REVEALS
     ----------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal-fade');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach((el) => el.classList.add('revealed'));
  }


  /* -----------------------------------------------------------------
     8. ANIMATED SKILL PROGRESS BARS & NUMERIC COUNTERS
     ----------------------------------------------------------------- */
  const skillsSection = document.getElementById('skills');
  let skillsAnimated = false;

  const animateSkills = () => {
    const skillBars = document.querySelectorAll('.skill-fill');

    skillBars.forEach((bar, index) => {
      const targetVal = parseInt(bar.getAttribute('data-skill-value'), 10) || 0;
      const percentLabel = document.getElementById(`percent-${index + 1}`);

      // Animate the bar width
      bar.style.width = `${targetVal}%`;

      // Animate numeric percentage counter
      if (percentLabel) {
        let current = 0;
        const duration = 1200; // ms
        const steps = 30;
        const increment = targetVal / steps;
        const stepTime = duration / steps;

        const counterTimer = setInterval(() => {
          current += increment;
          if (current >= targetVal) {
            current = targetVal;
            clearInterval(counterTimer);
          }
          percentLabel.textContent = `${Math.round(current)}%`;
        }, stepTime);
      }
    });
  };

  if (skillsSection && 'IntersectionObserver' in window) {
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !skillsAnimated) {
          skillsAnimated = true;
          animateSkills();
        }
      });
    }, { threshold: 0.25 });

    skillsObserver.observe(skillsSection);
  } else {
    animateSkills();
  }


  /* -----------------------------------------------------------------
     9. ANIMATED HERO STAT COUNTERS
     ----------------------------------------------------------------- */
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;

  const animateHeroStats = () => {
    statNumbers.forEach((stat) => {
      const target = parseInt(stat.getAttribute('data-target'), 10) || 0;
      let count = 0;
      const duration = 1500;
      const increment = Math.ceil(target / 40);
      const stepTime = Math.floor(duration / 40);

      const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
          count = target;
          clearInterval(timer);
        }
        stat.textContent = count;
      }, stepTime);
    });
  };

  const homeSection = document.getElementById('home');
  if (homeSection && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !statsAnimated) {
          statsAnimated = true;
          animateHeroStats();
        }
      });
    }, { threshold: 0.2 });

    statsObserver.observe(homeSection);
  } else {
    animateHeroStats();
  }


  /* -----------------------------------------------------------------
     10. PROJECT & INSIGHT MODAL DATA & PREVIEW HANDLER
     ----------------------------------------------------------------- */
  // Demonstration content data repository
  const modalDatabase = {
    // Projects
    'tactical-breakdown': {
      tag: 'PROJECT DEMONSTRATION • MATCH TACTICAL BREAKDOWN',
      title: 'European Derby: Tactical Blueprint & Phase Deconstruction',
      content: `
        <h4>Project Overview</h4>
        <p>This demonstration project analyzes a high-stakes European continental clash, focusing on how a mid-block defensive system systematically neutralized the opponent's traditional wing overloads.</p>
        
        <h4>Analytical Methodology</h4>
        <ul>
          <li><strong>Phase 1: Build-up Mechanics</strong> — Breakdown of the 3-2 in-possession shape vs. high-pressing triggers.</li>
          <li><strong>Phase 2: Spatial Exploitation</strong> — Identifying half-space underlaps by inverted fullbacks creating a 4v3 central superiority.</li>
          <li><strong>Phase 3: Rest Defense Structure</strong> — Maintaining a 3+2 rest defense block to limit counter-attacking exposure.</li>
        </ul>

        <h4>Key Analytical Takeaways</h4>
        <p>The opposition's PPDA was forced up from 8.2 to 14.6 due to intelligent circulation between center-backs and the single pivot, allowing controlled transitions through pressure pockets.</p>
        
        <p><em>Note: This is a demonstration case study template. You can replace this content with your verified club or match reports.</em></p>
      `
    },
    'formation-analysis': {
      tag: 'PROJECT DEMONSTRATION • FORMATION DYNAMICS',
      title: '3-2-4-1 In-Possession Build-up Dynamics',
      content: `
        <h4>Tactical Concept</h4>
        <p>An extensive tactical study exploring the tactical revolution of the "box midfield" (two pivots + two attacking midfielders), popularized by modern elite European coaching staffs.</p>
        
        <h4>Structural Advantages Decoded</h4>
        <ul>
          <li><strong>Central Numerical Overload:</strong> Isolating the opponent's midfield pivot through box formation rotations.</li>
          <li><strong>Defensive Solidity:</strong> A natural 3-2 rest defense foundation allowing high pressing without sacrificing transitional security.</li>
          <li><strong>Half-space Dominance:</strong> Positioning dual playmakers between opposition lines to receive on the half-turn.</li>
        </ul>

        <h4>Scouting & Tactical Applications</h4>
        <p>Illustrated through video telestration vectors, passing connection heatmaps, and spatial occupation matrices across 15 competitive fixtures.</p>
      `
    },
    'player-performance': {
      tag: 'PROJECT DEMONSTRATION • SCOUTING DOSSIER',
      title: 'Deep-Lying Playmaker Performance Profile',
      content: `
        <h4>Scouting Assignment</h4>
        <p>Evaluation of an emerging central midfielder's tactical ceiling, cognitive scanning rate, and suitability for high-tempo pressing leagues.</p>
        
        <h4>Evaluated Metrics & Observations</h4>
        <ul>
          <li><strong>Scanning Frequency:</strong> Averaged 0.58 scans per second prior to receiving possession under defensive pressure.</li>
          <li><strong>Pass Progression:</strong> Ranked in the 94th percentile for completed passes into the final third (8.4 per 90 mins).</li>
          <li><strong>Defensive Transition:</strong> Rapid counter-pressing recovery time (under 4.2 seconds on loose ball events).</li>
        </ul>

        <h4>Recommendation Dossier</h4>
        <p>Complete role compatibility assessment indicating high adaptability for possession-dominant systems utilizing single-pivot architectures.</p>
      `
    },
    'statistics-dashboard': {
      tag: 'PROJECT DEMONSTRATION • DATA ANALYTICS',
      title: 'Expected Threat (xT) & Field Tilt Interactive Model',
      content: `
        <h4>Analytics Architecture</h4>
        <p>A multi-metric dashboard synthesizing event telemetry data into actionable tactical intelligence for coaching staffs and performance directors.</p>
        
        <h4>Core Metrics Integrated</h4>
        <ul>
          <li><strong>Field Tilt Percentage:</strong> Measuring final third territorial share beyond superficial possession ratios.</li>
          <li><strong>Expected Threat (xT):</strong> Quantifying the probability of a goal being scored based on spatial movement of the ball.</li>
          <li><strong>Shot Quality Heatmaps:</strong> Post-shot Expected Goals (PSxG) vs. raw shot volume.</li>
        </ul>

        <h4>Strategic Utility</h4>
        <p>Enables analytical teams to diagnose whether team performance reflects tactical dominance or unsustainable variance.</p>
      `
    },

    // Editorial Insights
    'tactics': {
      tag: 'EDITORIAL INSIGHT • DEMO ARTICLE',
      title: 'Understanding Modern Football Tactics',
      content: `
        <h4>The Death of Rigid Formations</h4>
        <p>Modern football has moved past the concept of static formations. While television graphics display a 4-3-3 or 4-2-3-1, elite teams operate in dynamic phases where team shape shifts fundamentally between build-up, progression, and defensive rest.</p>
        
        <h4>Positional Play (Juego de Posición)</h4>
        <p>The essence of positional play is not endless passing; it is structuring the pitch so that players occupy specific zones, providing optimal passing angles and immediate counter-pressing angles if possession is conceded.</p>
        
        <h4>Key Takeaway for Analysts</h4>
        <p>Always evaluate a team based on their phase-specific structures rather than their starting team sheet on paper.</p>
      `
    },
    'pressing': {
      tag: 'EDITORIAL INSIGHT • DEMO ARTICLE',
      title: 'The Importance of High Pressing in Modern Strategy',
      content: `
        <h4>Pressing as a Playmaker</h4>
        <p>As modern defensive blocks become more compact and difficult to break down with patient build-up, winning the ball in the opposition's final third has become the most effective playmaking tool in global football.</p>
        
        <h4>Triggers & Cover Shadows</h4>
        <p>Effective pressing is not chaotic running; it relies on precise structural triggers—such as a bobbly pass, a defender receiving on their weaker foot, or an open body angle facing the sideline. Using cover shadows prevents easy escape passes.</p>
      `
    },
    'data-analytics': {
      tag: 'EDITORIAL INSIGHT • DEMO ARTICLE',
      title: 'How Data Analytics Changes Modern Football',
      content: `
        <h4>Contextualizing Numbers with Video</h4>
        <p>The true revolution in football analytics occurred when data scientists and tactical scouts began combining event data (xG, passes, tackles) with positional tracking and video analysis.</p>
        
        <h4>Eliminating Cognitive Bias</h4>
        <p>Data allows recruitment departments to evaluate hundreds of global prospects without emotional bias, identifying undervalued talents based on objective spatial metrics and progressive contributions.</p>
      `
    },
    'flexibility': {
      tag: 'EDITORIAL INSIGHT • DEMO ARTICLE',
      title: 'The Role of Tactical Flexibility in Tournament Football',
      content: `
        <h4>Adapting to the Game State</h4>
        <p>In knockout football, rigid adherence to a single philosophy often leads to elimination. Elite managers adjust their defensive line height, transition aggression, and pressing frequency according to in-game momentum and time left on the clock.</p>
        
        <h4>Conclusion</h4>
        <p>Tactical flexibility is not weakness; it is the pinnacle of strategic preparation.</p>
      `
    }
  };

  // Open Modal function
  const openModal = (key) => {
    const data = modalDatabase[key];
    if (!data) return;

    modalTag.textContent = data.tag;
    modalTitle.textContent = data.title;
    modalBody.innerHTML = data.content;

    infoModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  // Close Modal function
  const closeModal = () => {
    infoModal.classList.add('hidden');
    document.body.style.overflow = '';
  };

  // Event listeners for "View Project" buttons
  document.querySelectorAll('.btn-project-view').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectKey = btn.getAttribute('data-project');
      openModal(projectKey);
    });
  });

  // Event listeners for "Read Analysis" buttons
  document.querySelectorAll('.btn-read-insight').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const insightKey = btn.getAttribute('data-insight');
      openModal(insightKey);
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

  // Close on outside click
  if (infoModal) {
    infoModal.addEventListener('click', (e) => {
      if (e.target === infoModal) {
        closeModal();
      }
    });
  }

  // Close modal on Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && infoModal && !infoModal.classList.contains('hidden')) {
      closeModal();
    }
  });


  /* -----------------------------------------------------------------
     10B. PHOTO GALLERY FILTER & LIGHTBOX MODAL
     ----------------------------------------------------------------- */
  const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxCategory = document.getElementById('lightbox-category');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const lightboxLoader = document.getElementById('lightbox-loader');

  // Filter functionality
  galleryFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      galleryFilterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      galleryCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.classList.remove('hidden');
          setTimeout(() => card.classList.add('revealed'), 50);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Lightbox data collection
  let currentGalleryIndex = 0;
  const galleryItems = Array.from(galleryCards).map((card) => ({
    src: card.getAttribute('data-src') || (card.querySelector('img') ? card.querySelector('img').src : ''),
    title: card.getAttribute('data-title') || '',
    desc: card.getAttribute('data-desc') || '',
    category: card.getAttribute('data-tag') || (card.getAttribute('data-category') || 'MOMENT').toUpperCase()
  }));

  const updateLightboxContent = (index) => {
    if (galleryItems.length === 0) return;
    if (index < 0) index = galleryItems.length - 1;
    if (index >= galleryItems.length) index = 0;
    currentGalleryIndex = index;

    const item = galleryItems[currentGalleryIndex];
    if (!item) return;

    if (lightboxLoader) lightboxLoader.style.display = 'block';
    if (lightboxImg) lightboxImg.style.opacity = '0';

    const tempImg = new Image();
    tempImg.onload = () => {
      if (lightboxImg) {
        lightboxImg.src = item.src;
        lightboxImg.alt = item.title;
        lightboxImg.style.opacity = '1';
      }
      if (lightboxLoader) lightboxLoader.style.display = 'none';
    };
    tempImg.src = item.src;

    if (lightboxTitle) lightboxTitle.textContent = item.title;
    if (lightboxDesc) lightboxDesc.textContent = item.desc;
    if (lightboxCategory) lightboxCategory.textContent = item.category;
    if (lightboxCounter) lightboxCounter.textContent = `${currentGalleryIndex + 1} / ${galleryItems.length}`;
  };

  const openLightbox = (index) => {
    if (!lightbox) return;
    updateLightboxContent(index);
    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.add('hidden');
    document.body.style.overflow = '';
  };

  // Card click to open lightbox
  galleryCards.forEach((card) => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.getAttribute('data-index'), 10) || 0;
      openLightbox(idx);
    });
  });

  // Lightbox controls
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      updateLightboxContent(currentGalleryIndex - 1);
    });
  }
  if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      updateLightboxContent(currentGalleryIndex + 1);
    });
  }

  // Close lightbox on backdrop click
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // Keyboard navigation for lightbox
  window.addEventListener('keydown', (e) => {
    if (!lightbox || lightbox.classList.contains('hidden')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      updateLightboxContent(currentGalleryIndex - 1);
    } else if (e.key === 'ArrowRight') {
      updateLightboxContent(currentGalleryIndex + 1);
    }
  });


  /* -----------------------------------------------------------------
     11. TOAST NOTIFICATION UTILITY
     ----------------------------------------------------------------- */
  function showToast(message, type = 'success', duration = 5000) {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    // Icon based on type
    const iconClass = type === 'success' 
      ? 'fa-circle-check' 
      : type === 'warning' 
      ? 'fa-triangle-exclamation' 
      : 'fa-circle-info';

    toast.innerHTML = `
      <i class="fa-solid ${iconClass}"></i>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    // Fade out and remove
    setTimeout(() => {
      toast.classList.add('toast-out');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 350);
    }, duration);
  }


  /* -----------------------------------------------------------------
     12. CONTACT FORM VALIDATION & DEMO SUBMISSION
     ----------------------------------------------------------------- */
  if (contactForm) {
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    // Email validation regex helper
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    // Validation handler
    const validateForm = () => {
      let isValid = true;

      // Validate Name
      const nameVal = nameInput.value.trim();
      if (!nameVal) {
        nameError.textContent = 'Please enter your full name.';
        nameInput.classList.add('input-error');
        isValid = false;
      } else if (nameVal.length < 2) {
        nameError.textContent = 'Name must be at least 2 characters.';
        nameInput.classList.add('input-error');
        isValid = false;
      } else {
        nameError.textContent = '';
        nameInput.classList.remove('input-error');
      }

      // Validate Email
      const emailVal = emailInput.value.trim();
      if (!emailVal) {
        emailError.textContent = 'Please enter your email address.';
        emailInput.classList.add('input-error');
        isValid = false;
      } else if (!isValidEmail(emailVal)) {
        emailError.textContent = 'Please enter a valid email address.';
        emailInput.classList.add('input-error');
        isValid = false;
      } else {
        emailError.textContent = '';
        emailInput.classList.remove('input-error');
      }

      // Validate Message
      const messageVal = messageInput.value.trim();
      if (!messageVal) {
        messageError.textContent = 'Please enter a message.';
        messageInput.classList.add('input-error');
        isValid = false;
      } else if (messageVal.length < 10) {
        messageError.textContent = 'Message should be at least 10 characters.';
        messageInput.classList.add('input-error');
        isValid = false;
      } else {
        messageError.textContent = '';
        messageInput.classList.remove('input-error');
      }

      return isValid;
    };

    // Real-time error removal on input
    nameInput.addEventListener('input', () => {
      if (nameInput.value.trim().length >= 2) {
        nameError.textContent = '';
        nameInput.classList.remove('input-error');
      }
    });

    emailInput.addEventListener('input', () => {
      if (isValidEmail(emailInput.value.trim())) {
        emailError.textContent = '';
        emailInput.classList.remove('input-error');
      }
    });

    messageInput.addEventListener('input', () => {
      if (messageInput.value.trim().length >= 10) {
        messageError.textContent = '';
        messageInput.classList.remove('input-error');
      }
    });

    // Form submit listener
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!validateForm()) {
        showToast('Please correct the highlighted errors in the form.', 'warning');
        return;
      }

      // Indicate loading state
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <i class="fa-solid fa-spinner fa-spin"></i>
        <span>Validating Message...</span>
      `;

      // Simulate sending latency
      setTimeout(() => {
        // Reset submit button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        // Display banner message
        formAlert.className = 'form-alert success';
        formAlert.innerHTML = `
          <i class="fa-solid fa-circle-check"></i>
          <div>
            <strong>Message Form Validated!</strong><br>
            <span>[Demo Notification]: Form backend is not yet connected. Connect your endpoint (e.g., EmailJS or backend API) to receive live messages.</span>
          </div>
        `;
        formAlert.classList.remove('hidden');

        // Trigger toast
        showToast('Form validated! (Demo Mode: message processed locally)', 'success', 6000);

        // Reset form fields
        contactForm.reset();

        // Hide alert after 8 seconds
        setTimeout(() => {
          formAlert.classList.add('hidden');
        }, 8000);
      }, 700);
    });
  }


  /* -----------------------------------------------------------------
     13. INTERACTIVE TACTICAL PITCH HOVER EFFECT (HERO)
     ----------------------------------------------------------------- */
  const playerNodes = document.querySelectorAll('.player-node');
  playerNodes.forEach((node) => {
    node.addEventListener('mouseenter', () => {
      node.style.transform = `${node.getAttribute('transform')} scale(1.35)`;
      node.style.transition = 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });

    node.addEventListener('mouseleave', () => {
      node.style.transform = node.getAttribute('transform');
    });
  });

});
