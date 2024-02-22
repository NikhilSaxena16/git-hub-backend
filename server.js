const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle incoming date strings
app.get('/api/timestamp/:date_string?', (req, res) => {
  let date_string = req.params.date_string;
  
  // If no date string provided, use current date
  if (!date_string) {
    date_string = new Date().toISOString();
  }
  
  // Attempt to parse the date string
  const date = new Date(date_string);
  
  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }
  
  // Return JSON response with the Unix timestamp and UTC date string
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
