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
        // Initialize scroll-triggered image animation
        initScrollImages();
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
        
        // If it's a counter element, start the slot machine counter
        if (entry.target.querySelector('.counter')) {
          initSlotMachineCounter(entry.target.querySelector('.counter'));
        }
        
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
  
  // Back to top button functionality
  const backToTopButton = document.querySelector('.back-to-top');
  
  // Show button when user scrolls down 300px
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('show');
    } else {
      backToTopButton.classList.remove('show');
    }
  });
  
  // Smooth scroll to top when button is clicked
  backToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
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
              // Remove active class from all thumbnails
              document.querySelectorAll('.fighter-thumbnail').forEach(item => {
                  item.classList.remove('active');
              });
              
              // Add active class to clicked thumbnail
              this.classList.add('active');
              
              // Update featured fighter display
              featuredFighterImage.src = fighter.image;
              featuredFighterName.textContent = fighter.name;
              featuredFighterDivision.textContent = fighter.division;
              
              // Add fighter bio if available
              const fighterBio = document.getElementById('featured-fighter-bio');
              if (fighterBio) {
                  // Set bio text based on the fighter (example content - you can customize)
                  const bioText = getFighterBio(fighterId);
                  fighterBio.innerHTML = bioText;
                  
                  // Show the bio with animation
                  setTimeout(() => {
                      fighterBio.classList.add('show');
                  }, 500);
              }
              
              // Show the featured fighter display
              featuredFighterDisplay.style.display = 'block';
              
              // Add show class after a small delay to trigger animation
              setTimeout(() => {
                  featuredFighterDisplay.classList.add('show');
              }, 50);
              
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

// Scroll-triggered image animation for Quan section
function initScrollImages() {
  const scrollGallery = document.querySelector('.scroll-gallery');
  if (!scrollGallery) return;
  
  const scrollImages = document.querySelectorAll('.scroll-image');
  
  // Create a new Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // If gallery is in view, start showing images with staggered delay
      if (entry.isIntersecting) {
        scrollImages.forEach((image, index) => {
          setTimeout(() => {
            image.classList.add('visible');
          }, 200 * index); // 200ms delay between each image
        });
      } else {
        // Hide images when gallery is out of view
        scrollImages.forEach(image => {
          image.classList.remove('visible');
        });
      }
    });
  }, {
    threshold: 0.2, // When 20% of the gallery is visible
    rootMargin: "0px 0px -100px 0px" // Trigger slightly before fully in view
  });
  
  // Observe the gallery element
  observer.observe(scrollGallery);
  
  // Handle scroll effect for individual images
  window.addEventListener('scroll', () => {
    if (!scrollGallery.getBoundingClientRect().top < window.innerHeight && 
        scrollGallery.getBoundingClientRect().bottom > 0) {
      scrollImages.forEach(image => {
        const speed = parseFloat(image.getAttribute('data-speed')) || 0.1;
        const yPos = -(window.scrollY * speed);
        image.style.transform = `translateY(${yPos}px)`;
      });
    }
  });
}

// Slot machine counter animation function
function initSlotMachineCounter(counterElement) {
  if (!counterElement) return;
  
  // Get target number from data attribute
  const finalNumber = parseInt(counterElement.dataset.target);
  
  // Set a simple increasing counter - this is more reliable
  let currentNumber = 0;
  const duration = 1500; // 1.5 seconds total animation
  const interval = 30; // Update every 30ms
  const steps = duration / interval;
  const increment = finalNumber / steps;
  
  const counter = setInterval(() => {
    currentNumber += increment;
    
    // Round for display and check if we've reached the target
    if (currentNumber >= finalNumber) {
      currentNumber = finalNumber;
      clearInterval(counter);
    }
    
    // Update the counter display
    counterElement.textContent = Math.floor(currentNumber);
  }, interval);
}

// Get fighter biographical information
function getFighterBio(fighterId) {
  // Return customized bio text for each fighter
  const bios = {
    'Julius': "Julius Anglickas is a powerful striker known for his explosive takedowns and ground control. The Lithuanian-born fighter has competed at the highest levels of MMA and continues to be a dominant force in the heavyweight division.",
    
    'Said': "Said Nurmagomedov is a technical specialist with lightning-fast hands and a diverse kicking arsenal. His exceptional footwork and fight IQ have earned him recognition as one of the most promising fighters in the bantamweight division.",
    
    'Ilima': "Ilima-Lei Macfarlane is a submission specialist with a well-rounded skillset. The Hawaiian fighter is known for her tenacity and relentless pressure, making her one of the most exciting welterweights to watch.",
    
    'Tyrell': "Tyrell Fortune is an explosive athlete with elite wrestling credentials. His combination of power and technical prowess has established him as a rising star in the middleweight division with knockout potential in both hands.",
    
    'Kevin': "Kevin Holland is one of the most unpredictable and entertaining fighters on the roster. With incredible striking versatility and submission skills, 'Trailblazer' is always looking for the finish from any position.",
    
    'Grant': "Grant Dawson is a grappling phenom with relentless cardio and determination. His ability to control opponents and find submissions has made him one of the featherweight division's most feared competitors."
  };
  
  // Return the specific fighter's bio or a default message if not found
  return bios[fighterId] || "This fighter's full profile is coming soon. Check back for updates on their career and upcoming fights.";
}
