import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const AppointmentStatusPage = () => {
    const [appointments, setAppointments] = useState([]);
    const doctorMapping = {
        1: 'Dr. Smith',
        2: 'Dr. Johnson',
        3: 'Dr. Williams',
        4: 'Dr. brown',
        
      };


  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:8000/appointments');
        if (response.ok) {
          const appointmentData = await response.json();
          setAppointments(appointmentData);
        } else {
          console.error('Failed to fetch appointments');
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div>
      <h2>Appointment Status</h2>
      {appointments.map((appointment) => (
        <div key={appointment.appointmentId}>
          <p>Doctor: {doctorMapping[appointment.doctor_id]}</p>
          <p>Patient: {appointment.patient_name}</p>
          <p>Timing: {new Date(appointment.timing).toLocaleString()}</p>
          <hr />
        </div>
      ))}
      <Link to="/">Go back to Home</Link>
    </div>
  );
};

export default AppointmentStatusPage;
