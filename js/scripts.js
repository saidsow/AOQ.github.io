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
      });
  }
  
  // Load home by default
  document.addEventListener("DOMContentLoaded", () => {
    loadComponent('home');
  });

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
});
