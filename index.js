const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

function showError(element, message) {
    element.parentElement.className = 'form-control error';
    element.parentElement.querySelector('small').innerText = message;
}

function showSuccess(element) {
    element.parentElement.className = 'form-control success';
}

function checkEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email.value.trim())) {
        showSuccess(email);
    }
    else {
        showError(email, 'Email is not valid.');
    }
}

// check required for elements
function checkRequired(elementArr) {
    elementArr.forEach((item) => {
        if (item.value.trim() === '') {
            showError(item, `${getFieldName(item)} is required`);
        }
        else {
            showSuccess(item);
        }
    });
}

function getFieldName(item) {
    return item.id.charAt(0).toUpperCase() + item.id.slice(1).toLowerCase();
}

function checkLength(element, min, max) {
    if (element.value.length < min) {
        showError(element, `${getFieldName(element)} must be at least ${min} characters.`);
    }
    else if (element.value.length > max) {
        showError(element, `${getFieldName(element)} must be less than ${max} characters.`);
    }
    else {
        showSuccess(element);
    }
}

function comparePasswords(password, password2) {
    if (password.value === password2.value) {
        showSuccess(password2);
    }
    else {
        showError(password2, 'Passwords do not match');
    }
}

//event listeners
form.addEventListener('submit', function (e) {
    e.preventDefault();

    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 15);
    checkEmail(email);
    comparePasswords(password, password2);
});
