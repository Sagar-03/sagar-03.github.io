// Project description dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
  const dropdownToggles = document.querySelectorAll('.project-dropdown-toggle');

  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      // Toggle active class on the button
      this.classList.toggle('active');
      
      // Get the description container
      const descriptionContainer = this.nextElementSibling;
      
      // Toggle active class on the description container
      descriptionContainer.classList.toggle('active');
      
      // Update parent container height if needed
      const projectItem = this.closest('.project-item');
      if (projectItem) {
        projectItem.classList.toggle('expanded', descriptionContainer.classList.contains('active'));
      }
    });
  });
});
