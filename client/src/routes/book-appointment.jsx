import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BookAppointmentPage = () => {
  const [specialities, setSpecialities] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [timing, setTiming] = useState('');
  const [patientName, setPatientName] = useState('');
  const [appointmentId, setAppointmentId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/specialities')
      .then(response => response.json())
      .then(data => setSpecialities(data))
      .catch(error => console.error('Error fetching specialities:', error));
  }, []);

  const SuccessMessage = ({ appointmentId }) => (
    <div className="success-message">
      <h3>Appointment booked successfully!</h3>
      <p>Your appointment ID is: {appointmentId}</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );

  const handleSpecialityChange = (event) => {
    const specialityId = event.target.value;
    setSelectedSpeciality(specialityId);

    fetch(`http://localhost:8000/doctors/${specialityId}`)
      .then(response => response.json())
      .then(data => setDoctors(data))
      .catch(error => console.error('Error fetching doctors:', error));
  };

  const handleDoctorChange = (event) => {
    // Update the selected doctor
    setSelectedDoctor(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Submit appointment details to the backend
    fetch('http://localhost:8000/book-appointment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        doctorId: selectedDoctor,
        timing,
        patientName,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Appointment booked successfully:', data);
        setAppointmentId(data.appointmentId); // Save the appointment ID
      })
      .catch(error => console.error('Error booking appointment:', error));
  };
  const availableTimings = ["10:00 AM", "11:00 AM", "02:00 PM", "04:00 PM", "06:00"];
  return (
    <div className="container">
      {appointmentId ? (
        <SuccessMessage appointmentId={appointmentId} />
      ) : (
        <div>
          <h2>Book Appointment</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Select Speciality:
              <select value={selectedSpeciality} onChange={handleSpecialityChange}>
                <option value="" disabled>Select a Speciality</option>
                {specialities.map(speciality => (
                  <option key={speciality.id} value={speciality.id}>{speciality.name}</option>
                ))}
              </select>
            </label>

            <label>
              Select Doctor:
              <select value={selectedDoctor} onChange={handleDoctorChange}>
                <option value="" disabled>Select a Doctor</option>
                {doctors.map(doctor => (
                  <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                ))}
              </select>
            </label>

            <label>
              Timing:
              <input type="text" value={timing} onChange={(e) => setTiming(e.target.value)} />
            </label>

            <label>
              Patient Name:
              <input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} />
            </label>

            <button type="submit">Book Appointment</button>
          </form>

          <Link to="/">Go back to Home</Link>
        </div>
      )}
    </div>
  );
};

export default BookAppointmentPage;
