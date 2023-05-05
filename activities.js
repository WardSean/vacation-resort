const activitiesForm = document.querySelector('#activities-form');
const activityTypesSelect = document.querySelector('#activityTypesSelect');
const categoryContainers = document.querySelectorAll('.category');

activitiesForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = event.target.elements.name.value;
  const email = event.target.elements.email.value;
  const checkInDate = event.target.elements['check-in-date'].value;
  const category = activityTypesSelect.value;

  // Send form data to server for processing
  // ...

  // Hide all category containers
  categoryContainers.forEach(container => {
    container.style.display = 'none';
  });

  // Show selected category container
  const selectedContainer = document.querySelector(`#${category}`);
  selectedContainer.style.display = 'block';
});

// Show activity cards for the selected category
activityTypesSelect.addEventListener('change', (event) => {
  const selectedCategory = event.target.value;
  categoryContainers.forEach(container => {
    if (container.id === selectedCategory) {
      container.style.display = 'block';
    } else {
      container.style.display = 'none';
    }
  });
});
