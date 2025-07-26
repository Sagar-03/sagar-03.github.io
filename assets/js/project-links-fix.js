// Fix for project overlay links
document.addEventListener('DOMContentLoaded', function() {
  // Get all project overlay buttons
  const overlayButtons = document.querySelectorAll('.project-overlay-button');
  
  // Add click handlers to ensure links work
  overlayButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation(); // Stop event from bubbling up
      
      const href = this.getAttribute('href');
      if (href && href !== '#') {
        window.open(href, '_blank');
      }
    });
  });
  
  // Make sure the entire project-img doesn't block clicking on links
  const projectImgs = document.querySelectorAll('.project-img');
  projectImgs.forEach(img => {
    img.addEventListener('click', function(e) {
      // Only handle click if it's not on a link
      if (!e.target.closest('a')) {
        const overlayButton = this.querySelector('.project-overlay-button');
        if (overlayButton) {
          const href = overlayButton.getAttribute('href');
          if (href && href !== '#') {
            window.open(href, '_blank');
          }
        }
      }
    });
  });
});
