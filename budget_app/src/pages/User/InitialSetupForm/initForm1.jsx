import React, { useState } from 'react';
import axios from 'axios';

const InitForm = () => {
  const [formData, setFormData] = useState({
    salary: '',
    otherIncome: '',
    rent: '',
    utilities: '',
    transport: '',
    groceries: '',
    insurance: '',
    entertainment: '',
    subscriptions: '',
    savingsGoal: '',
    savingsTarget: '',
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); 

    if (!token) {
      setErrorMessage('Authentication token is missing. Please log in again.');
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:8000/api/user/setup',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        }
      );

      console.log('Data submitted successfully:', res.data);
      setSuccessMessage('Form submitted successfully!');
      setErrorMessage(null);
      
    } catch (error) {
      console.error('Submission error:', error);
      setSuccessMessage(null);
      setErrorMessage(error.response?.data?.message || 'Error submitting form');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Simple Budget Form</h2>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        {Object.entries(formData).map(([field, value]) => (
          <div key={field} style={{ marginBottom: '1rem' }}>
            <label>
              {field.charAt(0).toUpperCase() + field.slice(1)}:
              <input
                type={field === 'savingsGoal' ? 'text' : 'number'}
                name={field}
                value={value}
                onChange={handleChange}
                style={{ marginLeft: '1rem' }}
              />
            </label>
          </div>
        ))}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default InitForm;
