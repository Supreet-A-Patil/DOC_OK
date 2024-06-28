import React from "react";

const SpecialtyPage = () => {

  const handleSubmit = (event) => {
    event.preventDefault();
    // Additional logic can be added here (e.g., handling form submission)
    alert("Specialty selected!");
  };

  return (
    <div>
      <h1>Doctor Appointment</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="specialty">Select Specialty:</label>
        <select id="specialty">
          <option value="cardiologist">Cardiologist</option>
          <option value="dermatologist">Dermatologist</option>
          <option value="pediatrician">Pediatrician</option>
          <option value="orthopedic">Orthopedic Surgeon</option>
        </select>

        <button type="submit">Submit Appointment</button>
      </form>
    </div>
  );
};

export default SpecialtyPage;
