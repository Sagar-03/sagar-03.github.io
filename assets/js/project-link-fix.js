// Fix for project overlay links
document.addEventListener('DOMContentLoaded', function() {
  // Get all project overlay buttons
  const overlayButtons = document.querySelectorAll('.project-overlay-button');
  
  // Add click event listener to each button
  overlayButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Prevent default behavior
      e.preventDefault();
      
      // Get the href attribute
      const href = this.getAttribute('href');
      
      // Open the link in a new tab if it's not just '#'
      if (href && href !== '#') {
        window.open(href, '_blank');
      }
      
      // Stop propagation to prevent other event handlers
      e.stopPropagation();
    });
  });
});
