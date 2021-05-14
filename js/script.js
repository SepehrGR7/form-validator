// Selecting UI elements
const form = document.querySelector('#form')
const username = document.querySelector('#username')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const confrimPassword = document.querySelector('#password2')
const passwordGroup = document.querySelector('#password-group')
const passwordToggle = document.querySelector('.password-toggle')

// Check for required fields
function checkRequired(inputArr) {
   inputArr.forEach(input => {
      // Check if input is empty
      if (input.value.trim() === '') {
         showError(input, `${getFieldName(input)} is required`)
      } else {
         showSuccess(input)
      }
   })
}

// Check the length of input
function checkLength(input, min, max) {
   // Check if the given input is username or password
   if (input.id === 'username') {
      // Check if input is less than minimum
      if (input.value.trim().length < min) {
         showError(
            input,
            `${getFieldName(input)} must be at least ${min} characters`
         )
         // Check if input is more than maximum
      } else if (input.value.trim().length > max) {
         showError(
            input,
            `${getFieldName(input)} must be less than ${max} characters`
         )
      }
   } else {
      if (input.value.length < min) {
         showError(
            input,
            `${getFieldName(input)} must be at least ${min} characters`
         )
      }
   }
}

// Check if email is valid
function checkEmail(input) {
   const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
   if (re.test(input.value.trim())) {
      showSuccess(input)
   } else {
      showError(input, 'Email is not valid')
   }
}

function checkPasswordsMatch(password, confrimPassword) {
   if (password.value !== confrimPassword.value) {
      showError(confrimPassword, 'Passwords do not match')
   }
}

// Show error message
function showError(input, msg) {
   const errorMsg = document.querySelector(`#${input.id}-message`)
   errorMsg.textContent = msg
   input.parentElement.classList.remove('success')
   input.parentElement.classList.add('error')
}

// Show success and hide error message
function showSuccess(input) {
   input.parentElement.classList.remove('error')
   input.parentElement.classList.add('success')
}

// Get the given field's ID and capitilize
function getFieldName(input) {
   if (input.id !== 'password2') {
      return input.id[0].toUpperCase() + input.id.slice(1)
   } else {
      return 'Confirm Password'
   }
}

function changeToggleIcon(classList) {
   if (classList.contains('fi-sr-eye')) {
      classList.remove('fi-sr-eye')
      classList.add('fi-sr-eye-crossed')
   } else {
      classList.add('fi-sr-eye')
      classList.remove('fi-sr-eye-crossed')
   }
}

// Handle form submit
function handleSubmit(e) {
   checkRequired([username, email, password, confrimPassword])

   checkLength(username, 4, 15)
   checkLength(password, 8)
   checkEmail(email)

   checkPasswordsMatch(password, confrimPassword)

   e.preventDefault()
}

function changePasswordVisibilty(e) {
   const toggleClass = e.target.classList
   if (toggleClass.contains('password-toggle')) {
      changeToggleIcon(toggleClass)
      const type = password.getAttribute('type') === 'password' ? 'text' : 'password'
      password.setAttribute('type', type)
      confrimPassword.setAttribute('type', type)
   }
   e.preventDefault()
}

// Event listeners
form.addEventListener('submit', handleSubmit)

passwordGroup.addEventListener('click', changePasswordVisibilty)
