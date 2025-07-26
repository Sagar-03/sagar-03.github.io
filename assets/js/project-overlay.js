// Project hover overlay functionality
document.addEventListener('DOMContentLoaded', function() {
  // Get all project images
  const projectImages = document.querySelectorAll('.project-img');
  
  // Add hover effect for touch devices
  projectImages.forEach(image => {
    // For touch devices
    image.addEventListener('touchstart', function(e) {
      // Only prevent default if it's not a link
      if (!e.target.closest('a')) {
        e.preventDefault();
      }
      
      // Remove active class from all other images
      projectImages.forEach(otherImage => {
        if (otherImage !== image) {
          otherImage.classList.remove('touch-active');
        }
      });
      
      // Toggle active class on this image
      image.classList.toggle('touch-active');
    });
    
    // Make sure clicking on the overlay button works
    const overlayButton = image.querySelector('.project-overlay-button');
    if (overlayButton) {
      overlayButton.addEventListener('click', function(e) {
        // Don't stop propagation, but make sure the link works
        const href = this.getAttribute('href');
        if (href && href !== '#') {
          // Allow the default action (following the link)
          return true;
        }
      });
    }
  });
  
  // Close active overlay when clicking elsewhere on the page
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.project-img')) {
      projectImages.forEach(image => {
        image.classList.remove('touch-active');
      });
    }
  });
});
