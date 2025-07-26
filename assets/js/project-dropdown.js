// Project description dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
  const dropdownToggles = document.querySelectorAll('.project-dropdown-toggle');
  
  // Keep track of the currently open project
  let currentlyOpen = null;

  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      // Get the description container for this toggle
      const descriptionContainer = this.nextElementSibling;
      const projectItem = this.closest('.project-item');
      
      // Check if this is already the open one
      const isCurrentlyOpen = this.classList.contains('active');
      
      // First, close any currently open project if it's not this one
      if (currentlyOpen && currentlyOpen !== this) {
        // Close the currently open project
        currentlyOpen.classList.remove('active');
        const openContainer = currentlyOpen.nextElementSibling;
        openContainer.classList.remove('active');
        const openProjectItem = currentlyOpen.closest('.project-item');
        if (openProjectItem) {
          openProjectItem.classList.remove('expanded');
        }
      }
      
      // Toggle the clicked project
      this.classList.toggle('active');
      descriptionContainer.classList.toggle('active');
      
      if (projectItem) {
        projectItem.classList.toggle('expanded', descriptionContainer.classList.contains('active'));
      }
      
      // Update the currently open reference
      currentlyOpen = isCurrentlyOpen ? null : this;
    });
  });
});
