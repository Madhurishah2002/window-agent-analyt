// You Page
const form = document.querySelector('#validationForm');
const submitButton = form.querySelector('#btnSubmit');

submitButton.addEventListener('click', function(event) {
    event.preventDefault();

    //  Form Input Validations
    const firstnameInput = form.querySelector('input[name="CFName"]');
    const lastnameInput = form.querySelector('input[name="CLName"]');
    const mobileInput = form.querySelector('input[name="CNumber"]');
    const emailInput = form.querySelector('input[name="CEmail"]');

    // Form Regular
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const mobileRegex = /^[1-9]\d*$/;

    // Form Input Error Message
    const fullnameError = document.getElementById('firs-error-messages');
    const lastnameError = document.getElementById('last-error-messages');
    const mobileError = document.getElementById('mobile-error-messages');
    const emailError = document.getElementById('email-error-messages');

    let errorMessage = '';

    if (firstnameInput.value.trim() === '') {
        errorMessage = 'Please enter a valid First Name *\n';
        fullnameError.innerHTML = errorMessage;
        fullnameError.style.display = 'block';
    } else {
        fullnameError.innerHTML = '';
        fullnameError.style.display = 'none';
    }

    if (lastnameInput.value.trim() === '') {
        errorMessage = 'Please enter a valid Last Name *\n';
        lastnameError.innerHTML = errorMessage;
        lastnameError.style.display = 'block';
    } else {
        lastnameError.innerHTML = '';
        lastnameError.style.display = 'none';
    }

    if (!mobileRegex.test(mobileInput.value)) {
        errorMessage = 'Please enter a valid Mobile Number *\n';
        mobileError.innerHTML = errorMessage;
        mobileError.style.display = 'block';
    } else {
        mobileError.innerHTML = '';
        mobileError.style.display = 'none';
    }

    if (!emailRegex.test(emailInput.value)) {
        errorMessage = 'Please enter a valid Email Address *\n';
        emailError.innerHTML = errorMessage;
        emailError.style.display = 'block';
    } else {
        emailError.innerHTML = '';
        emailError.style.display = 'none';
    }

    // error 
    if (errorMessage === '') {
        // Display the confirmation modal dialog box
        $('#confirmationModal').modal('show');
        // Add an event listener to the "submit" button within the modal
        $('#confirmationModal').on('click', '#confirmSubmitButton', function() {
            // Submit the form
            form.submit();
        });
    } else {
        errorMessage;
    }
});