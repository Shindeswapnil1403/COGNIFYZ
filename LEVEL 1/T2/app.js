const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Temporary storage for validated data
const registeredUsers = [];

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/register', (req, res) => {
  const { email, password, name, country, gender } = req.body;

  // Server-side validation
  if (!validateEmail(email)) {
    return res.status(400).send('Invalid email address');
  }

  if (!validatePassword(password)) {
    return res.status(400).send('Password must be at least 8 characters long and contain at least one number, one uppercase letter, one lowercase letter, and one special character');
  }

  if (!validateName(name)) {
    return res.status(400).send('Name cannot be empty');
  }

  if (!validateCountry(country)) {
    return res.status(400).send('Please select a country');
  }

  if (!validateGender(gender)) {
    return res.status(400).send('Please select your gender');
  }

  // If all validations pass, store the data in temporary storage
  registeredUsers.push({ email, password, name, country, gender });
  res.redirect('/success');
});

app.get('/success', (req, res) => {
  res.send('Registration successful!');
});
app.get('/users', (req, res) => {
    res.render('users', { users: registeredUsers });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

// Validation functions
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};:"\\|,.<>/?]).{8,}$/;
  return passwordRegex.test(password);
}

function validateName(name) {
  return name.trim() !== '';
}

function validateCountry(country) {
  return country !== '';
}

function validateGender(gender) {
  return gender !== '';
}