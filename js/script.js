// JavaScript for Yahia's Portfolio

document.addEventListener('DOMContentLoaded', () => {

  // --- Typing Effect ---
  const typingTextElement = document.getElementById('typing-text');
  const roles = ["AI Explorer", "ML Specialist", "Computer Vision Enthusiast", "Engineer"];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeEffect() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingTextElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      typingTextElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 500; // Pause before new word
    }

    setTimeout(typeEffect, typeSpeed);
  }

  // Start typing effect
  if (typingTextElement) typeEffect();


  // --- Sticky Navbar ---
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });


  // --- Smooth Scroll & Active Link Highlighting ---
  const sections = document.querySelectorAll('section, header');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });


  // --- GitHub Project Fetching ---
  const projectsGrid = document.getElementById('projects-grid');
  const githubUsername = 'EngYahia25';

  async function fetchProjects() {
    try {
      const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`);
      if (!response.ok) throw new Error('Failed to fetch projects');

      const repos = await response.json();
      renderProjects(repos);
    } catch (error) {
      console.error('Error fetching projects:', error);
      projectsGrid.innerHTML = `
                <div class="error-message">
                    <p><i class="fas fa-exclamation-triangle"></i> Failed to load projects from GitHub.</p>
                    <a href="https://github.com/${githubUsername}" target="_blank" class="btn-primary">View on GitHub</a>
                </div>
            `;
    }
  }

  function renderProjects(repos) {
    projectsGrid.innerHTML = ''; // Clear loading spinner

    repos.forEach((repo, index) => {
      // Determine color class based on index/language (cycling colors)
      const colorClasses = ['purple', 'blue', 'cyan'];
      const colorClass = colorClasses[index % colorClasses.length];
      const language = repo.language || 'Code';

      const card = document.createElement('article');
      card.classList.add('project-card');

      // Allow modal to grab data via dataset
      card.dataset.title = repo.name;
      card.dataset.desc = repo.description || "No description available.";
      card.dataset.language = language;
      card.dataset.url = repo.html_url;

      card.innerHTML = `
                <div class="project-image">
                    <div class="project-placeholder ${colorClass}"></div>
                </div>
                <div class="project-content">
                    <h3>${repo.name.replace(/-/g, ' ')}</h3>
                    <p>${repo.description ? repo.description.substring(0, 100) + '...' : 'No description available.'}</p>
                    <div class="tags">
                        <span>${language}</span>
                        <span>GitHub</span>
                    </div>
                    <div class="project-links">
                        <a href="${repo.html_url}" class="btn-sm" target="_blank"><i class="fab fa-github"></i> Code</a>
                        <button class="btn-sm outline view-details-btn">Details</button>
                    </div>
                </div>
            `;

      projectsGrid.appendChild(card);
    });

    // Re-attach modal listeners to new buttons/cards
    attachModalListeners();
  }

  // Call fetch on load
  fetchProjects();


  // --- Project Modal ---
  // Create Modal Element dynamically (Singleton)
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3 class="modal-title">Project Title</h3>
            <div class="modal-tags"></div>
            <p class="modal-body">Project details go here...</p>
            <a href="#" class="btn-primary modal-link" target="_blank">View on GitHub</a>
        </div>
    `;
  document.body.appendChild(modal);

  const modalTitle = modal.querySelector('.modal-title');
  const modalBody = modal.querySelector('.modal-body');
  const modalTags = modal.querySelector('.modal-tags');
  const modalLink = modal.querySelector('.modal-link');
  const closeModal = modal.querySelector('.close-modal');

  function attachModalListeners() {
    const detailButtons = document.querySelectorAll('.view-details-btn');
    // Also allow clicking the card itself (optional, but good UX)
    // const cards = document.querySelectorAll('.project-card'); 

    detailButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent bubbling if card has listener

        const card = btn.closest('.project-card');
        const title = card.dataset.title;
        const desc = card.dataset.desc;
        const lang = card.dataset.language;
        const url = card.dataset.url;

        modalTitle.textContent = title.replace(/-/g, ' ');
        modalBody.textContent = desc;
        modalTags.innerHTML = `<span>${lang}</span>`;
        modalLink.href = url;

        modal.classList.add('active');
      });
    });
  }

  closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });


  // --- Contact Form Handling ---
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Simple validation visualization
      const btn = contactForm.querySelector('button');
      const originalText = btn.innerHTML;

      btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
      btn.style.background = 'var(--accent-gradient)'; // Keep gradient

      // Reset form
      setTimeout(() => {
        contactForm.reset();
        btn.innerHTML = originalText;
      }, 3000);

      alert("Thanks for your message! This is a demo form.");
    });
  }

  // --- Mobile Menu Toggle ---
  const hamburger = document.querySelector('.hamburger');
  const navLinksContainer = document.querySelector('.nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      // Toggle generic 'active' class for mobile menu styles
      // Note: We need to add CSS for this '.nav-links.active' state
      navLinksContainer.classList.toggle('mobile-active');

      // Simple animation for hamburger
      hamburger.classList.toggle('toggle');
    });
  }
});
