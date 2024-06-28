const express =require('express');
const app = express();
const path= require('path');
const mysql =require('mysql');
const cors = require('cors');
app.set('views',path.join(__dirname,'views'));
app.use(cors());
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db =mysql.createConnection(
    {
        host:"localhost",
        user:"root",
        password:" ",
        database:"doc_appointement"
    }
)
app.use(express.json());


app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json({ message: 'User registered successfully', userId: result.insertId });
        }
      });
    } catch (error) {
      console.error('Error hashing password:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                if (results.length > 0) {
                    const hashedPassword = results[0].password;

                    const passwordMatch = await bcrypt.compare(password, hashedPassword);

                    if (passwordMatch) {
                        const token = jwt.sign(
                            { userId: results[0].id, username: results[0].username },
                            'your_secret_key'
                        );

                        const userId = results[0].id;

                        // Add session to active_sessions table
                        db.query('INSERT INTO active_sessions (user_id) VALUES (?)', [userId], (err) => {
                            if (err) {
                                console.error(err);
                                res.status(500).json({ error: 'Internal Server Error' });
                            } else {
                                res.status(200).json({ message: 'Login successful', token });
                            }
                        });
                    } else {
                        res.status(401).json({ error: 'Invalid credentials' });
                    }
                } else {
                    res.status(401).json({ error: 'Invalid credentials' });
                }
            }
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/logout', async (req, res) => {
    const { userId } = req.body;

    db.query('DELETE FROM active_sessions WHERE user_id = ?', [userId], (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(200).json({ message: 'Logout successful' });
        }
    });
});

app.get('/specialities', (req, res) => {
    db.query('SELECT * FROM specialities', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
});
app.get('/doctors/:specialityId', (req, res) => {
    const { specialityId } = req.params;
    db.query('SELECT * FROM doctors WHERE speciality_id = ?', [specialityId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
});


app.get('/appointments', (req, res) => {
    db.query('SELECT * FROM appointments', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
});

app.post('/book-appointment', (req, res) => {
    const { doctorId, timing, patientName } = req.body;

    // Insert appointment without doctorName
    db.query('INSERT INTO appointments (doctor_id, timing, patient_name) VALUES (?, ?, ?)', [doctorId, timing, patientName], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json({ message: 'Appointment booked successfully', appointmentId: result.insertId });
        }
    });
});

app.listen(8000,()=>{
    console.log("Listening on port 8000!");
})