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
  const errors = [];

  if (!validateEmail(email)) {
    errors.push('Invalid email address');
  }

  if (!validatePassword(password)) {
    errors.push('Password must be at least 8 characters long and contain at least one number, one uppercase letter, one lowercase letter, and one special character');
  }

  if (!validateName(name)) {
    errors.push('Name cannot be empty');
  }

  if (!validateCountry(country)) {
    errors.push('Please select a country');
  }

  if (!validateGender(gender)) {
    errors.push('Please select your gender');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  // If all validations pass, store the data in temporary storage
  registeredUsers.push({ email, password, name, country, gender });
  res.status(200).json({ message: 'Registration successful!' });
});

app.get('/success', (req, res) => {
  res.render('success');
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
  return gender === 'male' || gender === 'female';
}