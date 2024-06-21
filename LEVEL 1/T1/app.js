const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/register', (req, res) => {
  const { email, password, name, country, gender } = req.body;
  // Handle form submission logic, e.g., store data in a database
  console.log('Registration data:', req.body);
  res.redirect('/success');
});

app.get('/success', (req, res) => {
  res.send('Registration successful!');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});