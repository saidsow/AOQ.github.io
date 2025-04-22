function loadComponent(name) {
    fetch(`components/${name}.html`)
      .then(res => res.text())
      .then(html => {
        document.getElementById('dynamic-content').innerHTML = html;
        // Initialize component-specific functions
        initPyramidHover();
        initCareerToggle();
        // Initialize scroll animations
        initScrollAnimations();
        
        // Update active navigation links
        updateActiveNavLinks(name);
      });
  }
  
  // Load home by default
  document.addEventListener("DOMContentLoaded", () => {
    loadComponent('home');
  });
  
  // Function to update active navigation links
  function updateActiveNavLinks(activePage) {
    // Remove active class from all navigation links
    document.querySelectorAll('.navbar .nav-link, .nav-modal-link').forEach(link => {
      link.classList.remove('active');
    });
    
    // Add active class to desktop navigation links for the current page
    document.querySelectorAll(`.navbar .nav-link[onclick*="loadComponent('${activePage}')"]`).forEach(link => {
      link.classList.add('active');
    });
    
    // Add active class to mobile navigation links for the current page
    document.querySelectorAll(`.nav-modal-link[onclick*="loadComponent('${activePage}')"]`).forEach(link => {
      link.classList.add('active');
    });
  }

// Simple hover up and down animation for pyramid images
function initPyramidHover() {
  // Check if pyramid container exists
  const pyramidContainer = document.querySelector('.pyramid-container');
  if (!pyramidContainer) return;

  const pyramidImages = document.querySelectorAll('.pyramid-image');
  if (!pyramidImages.length) return;

  // Apply subtle floating animation to each image
  pyramidImages.forEach((image, index) => {
    // Set different animation delays for each image
    const delay = index * 0.5; // Half-second delay between each image
    image.style.animation = `float 3s ease-in-out ${delay}s infinite`;
  });

  // Also add subtle hover effect on actual mouse hover
  pyramidImages.forEach(image => {
    image.addEventListener('mouseenter', () => {
      image.style.transform = 'translateY(-15px)';
    });
    
    image.addEventListener('mouseleave', () => {
      image.style.transform = '';
    });
  });
}

// Career page toggle functionality
function initCareerToggle() {
  const careerToggle = document.getElementById('careerToggle');
  if (!careerToggle) return; // Skip if not on career page
  
  const athleteOpportunities = document.getElementById('athlete-opportunities');
  const agencyPositions = document.getElementById('agency-positions');
  
  if (athleteOpportunities && agencyPositions) {
    // Add change event listener
    careerToggle.addEventListener('change', function() {
      toggleCareerSections(this.checked);
    });
    
    // Check URL for any hash parameters to set initial state
    if (window.location.hash === '#agency') {
      careerToggle.checked = true;
      toggleCareerSections(true);
    }
  }
}

// Toggle between athlete and agency sections
function toggleCareerSections(showAgency) {
  const athleteOpportunities = document.getElementById('athlete-opportunities');
  const agencyPositions = document.getElementById('agency-positions');
  
  if (showAgency) {
    athleteOpportunities.style.display = 'none';
    agencyPositions.style.display = 'block';
    
    // Update URL hash
    window.location.hash = 'agency';
    
    // Trigger fade-in animation
    agencyPositions.classList.add('fade-in');
    setTimeout(() => agencyPositions.classList.remove('fade-in'), 600);
  } else {
    agencyPositions.style.display = 'none';
    athleteOpportunities.style.display = 'block';
    
    // Update URL hash
    window.location.hash = 'athletes';
    
    // Trigger fade-in animation
    athleteOpportunities.classList.add('fade-in');
    setTimeout(() => athleteOpportunities.classList.remove('fade-in'), 600);
  }
}

// Initialize scroll reveal animations
function initScrollAnimations() {
  // Get all elements with the 'hidden' class
  const hiddenElements = document.querySelectorAll('.hidden');
  
  // Create a new Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // If element is in view
      if (entry.isIntersecting) {
        // Add the 'show' class
        entry.target.classList.add('show');
        // Stop observing the element (optional)
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1, // When 10% of the element is visible
    rootMargin: "0px 0px -50px 0px" // Trigger a bit before the element comes into view
  });
  
  // Observe each hidden element
  hiddenElements.forEach((element) => {
    observer.observe(element);
  });
  
  // Initialize any hero content elements immediately
  const heroContent = document.querySelector('.hero-content');
  if (heroContent && heroContent.classList.contains('hidden')) {
    setTimeout(() => {
      heroContent.classList.add('show');
    }, 300);
  }
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
  } else {
      navbar.classList.remove('scrolled');
  }
});

document.addEventListener('DOMContentLoaded', function() {
  // Form submission handling for the contact modal
  document.getElementById('contactForm').addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Get form data
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Send to Formspree
      const formData = new FormData();
      formData.append('email', email);
      formData.append('message', message);
      
      fetch('https://formspree.io/f/xlddbkkj', {
          method: 'POST',
          body: formData,
          headers: {
              'Accept': 'application/json'
          }
      })
      .then(response => {
          if (response.ok) {
              alert('Message sent successfully!');
              document.getElementById('contactForm').reset();
              
              // Close the modal after submission
              const contactModal = bootstrap.Modal.getInstance(document.getElementById('contactModal'));
              contactModal.hide();
          } else {
              alert('There was a problem sending your message. Please try again.');
          }
      })
      .catch(error => {
          console.error('Error:', error);
          alert('There was a problem sending your message. Please try again.');
      });
      
      return false;
  });
  
  // Fighter selection feature
  const fighterThumbnails = document.querySelectorAll('.fighter-thumbnail');
  const featuredFighterDisplay = document.getElementById('featured-fighter-display');
  const featuredFighterImage = document.getElementById('featured-fighter-image');
  const featuredFighterName = document.getElementById('featured-fighter-name');
  const featuredFighterDivision = document.getElementById('featured-fighter-division');
  
  // Fighter data (you can expand this with more details)
  const fighterData = {
      'Julius': {
          name: 'JULIUS',
          division: 'Heavyweight',
          image: 'assets/Fighters/Julius.jpg'
      },
      'Said': {
          name: 'SAID',
          division: 'Bantamweight',
          image: 'assets/Fighters/Said.jpg'
      },
      'Ilima': {
          name: 'ILIMA',
          division: 'Welterweight',
          image: 'assets/Fighters/Ilima.png'
      },
      'Tyrell': {
          name: 'TYRELL',
          division: 'Middleweight',
          image: 'assets/Fighters/Tyrell.png'
      },
      'Kevin': {
          name: 'KEVIN',
          division: 'Lightweight',
          image: 'assets/Fighters/Kevin.png'
      },
      'Maurice': {
          name: 'MAURICE',
          division: 'Light Heavyweight',
          image: 'assets/Fighters/Maurice.png'
      },
      'Grant': {
          name: 'GRANT',
          division: 'Featherweight',
          image: 'assets/Fighters/Grant.png'
      }
  };
  
  // Add click event to each fighter thumbnail
  fighterThumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', function() {
          const fighterId = this.getAttribute('data-fighter');
          const fighter = fighterData[fighterId];
          
          if (fighter) {
              // Update featured fighter display
              featuredFighterImage.src = fighter.image;
              featuredFighterName.textContent = fighter.name;
              featuredFighterDivision.textContent = fighter.division;
              
              // Show the featured fighter display
              featuredFighterDisplay.style.display = 'block';
              
              // Smooth scroll to the featured fighter display
              featuredFighterDisplay.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
      });
  });
  
  // Hamburger menu toggle
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', function() {
      if (this.classList.contains('active')) {
        closeNavModal();
      } else {
        openNavModal();
      }
    });
  }
  
  // Close modal when clicking outside or pressing escape
  document.addEventListener('click', function(event) {
    const navModal = document.getElementById('navModal');
    if (navModal && navModal.classList.contains('show')) {
      // Check if click is outside the modal content
      if (event.target.classList.contains('modal-backdrop')) {
        closeNavModal();
      }
    }
  });
  
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closeNavModal();
    }
  });
});

// Parallax Effect for About Page
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the about page by looking for parallax elements
    const parallaxImages = document.querySelectorAll('.parallax-image');
    
    if (parallaxImages.length > 0) {
        const container = document.querySelector('.parallax-image-container');
        let containerHeight, containerWidth, containerTop;
        
        // Function to update container dimensions
        function updateContainerDimensions() {
            if (container) {
                const rect = container.getBoundingClientRect();
                containerTop = rect.top + window.scrollY;
                containerHeight = rect.height;
                containerWidth = rect.width;
            }
        }
        
        // Initial dimensions
        updateContainerDimensions();
        
        // Update dimensions on resize
        window.addEventListener('resize', updateContainerDimensions);
        
        // Parallax scroll effect
        window.addEventListener('scroll', function() {
            const scrollTop = window.scrollY;
            
            // Only apply parallax if container is in view
            if (scrollTop + window.innerHeight > containerTop && scrollTop < containerTop + containerHeight) {
                // Calculate how far into the section we've scrolled (0 to 1)
                const scrollProgress = (scrollTop - containerTop) / containerHeight;
                
                // Apply different scroll speeds to each image
                parallaxImages.forEach((image, index) => {
                    const speed = 0.1 + (index * 0.05); // Different speeds for different images
                    const translateY = Math.min(containerHeight * 0.5, scrollProgress * containerHeight * speed);
                    
                    // Apply transform with containment to avoid overflowing
                    image.style.transform = `translateY(${translateY}px)`;
                    
                    // Make sure images don't exceed container boundaries
                    image.style.maxWidth = '100%';
                    
                    // Adjust opacity based on scroll position for a fade effect
                    const opacity = Math.min(1, 1 - Math.abs((scrollProgress - 0.5) * 1.5));
                    image.style.opacity = opacity > 0.2 ? opacity : 0.2; // Never go completely transparent
                });
            }
        });
    }
});

// Navigation Modal Functions
function openNavModal() {
  const navModal = document.getElementById('navModal');
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  
  navModal.classList.add('show');
  hamburgerBtn.classList.add('active');
  
  // Create backdrop
  const backdrop = document.createElement('div');
  backdrop.classList.add('modal-backdrop');
  document.body.appendChild(backdrop);
  
  // Add show class with slight delay to animate
  setTimeout(() => {
    backdrop.classList.add('show');
  }, 10);
  
  // Prevent body scrolling
  document.body.style.overflow = 'hidden';
}

function closeNavModal() {
  const navModal = document.getElementById('navModal');
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const backdrop = document.querySelector('.modal-backdrop');
  
  navModal.classList.remove('show');
  hamburgerBtn.classList.remove('active');
  
  if (backdrop) {
    backdrop.classList.remove('show');
    
    // Remove backdrop after transition
    setTimeout(() => {
      backdrop.remove();
    }, 300);
  }
  
  // Re-enable body scrolling
  document.body.style.overflow = '';
}
