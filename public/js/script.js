(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()





document.querySelector('.btn-search').addEventListener('click', function(event) {
  var searchForm = document.querySelector('.search-form');
  var searchInput = document.querySelector('.search-inp');
  
  if (!searchForm.classList.contains('active')) {
    searchForm.classList.add('active');
    searchInput.focus();
  } else {
    searchForm.classList.remove('active');
    searchInput.value = ''; // Optional: Clear the search input when hiding
  }
  
  // Prevent form submission when clicking the toggle button
  event.preventDefault();
});

// Hide search input box when clicking outside of it
document.addEventListener('click', function(event) {
  var searchForm = document.querySelector('.search-form');
  var searchInput = document.querySelector('.search-inp');
  var searchButton = document.querySelector('.btn-search');

  if (!searchForm.contains(event.target) && !searchButton.contains(event.target)) {
    searchForm.classList.remove('active');
    searchInput.value = ''; // Optional: Clear the search input when hiding
  }
});

  
  