const signupForm = document.querySelector('.form-signup')
if (signupForm) {
  signupForm.addEventListener('submit', signUpUser)
}

function signUpUser(e) {
  e.preventDefault()
  // Create object to store form values
  const details = {
    name: signupForm.name.value,
    email: signupForm.email.value,
    confirmEmail: signupForm.confirmEmail.value,
    password: signupForm.password.value,
    confirmPassword: signupForm.confirmPassword.value,
    bitcoin: signupForm.btcwallet.value,
    ethereum: signupForm.ethwallet.value,
    tron: signupForm.tronwallet.value,
  }

  // Check for email and password mismatch
  if (details.password !== details.confirmPassword) {
    return alert('Password Mismatch')
  }
  if (details.email !== details.confirmEmail) {
    return alert('Email Mismatch')
  }
  // Signup user to firebase
  auth
    .createUserWithEmailAndPassword(details.email, details.password)
    .then((cred) => {
      // Use credentials to create Firestore document for the user
      return db.collection('users').doc(cred.user.uid).set({
        name: details.name,
        email: details.email,
        bitcoin: details.bitcoin,
        ethereum: details.ethereum,
        tron: details.tron,
      })
    })
    .then(() => {
      // Clear form fields
      signupForm.reset()
      alert('Successfully signed up. Proceed to log in')
    })
    .catch((err) => {
      console.log(err)
    })
}

const loginForm = document.querySelector('.login100-form')
if (loginForm) {
  loginForm.addEventListener('submit', logInUser)
}
function logInUser(e) {
  e.preventDefault()
  // Get form fields
  const email = loginForm.email.value
  const password = loginForm.password.value
  // Sign in user with firebase
  auth.signInWithEmailAndPassword(email, password).then(() => {
    alert('Login successful')
  })
}

// Logout
// Add this functionality when a there is a log out option
// const logoutBtn = document.querySelector('.logout-button')
// logoutBtn.addEventListener('click', (e) => {
//   auth.signOut()
// })
