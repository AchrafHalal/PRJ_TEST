import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function AddressForm() {
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');

      try {
        const res = await axios.get(`http://localhost:8000/api/admin/viewUser/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(res.data);
        const user = res.data.user[0];
        setData({
          firstName: user.name || '',
          
          email: user.email || '',
          password: '••••••••' 
        });
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <Grid container spacing={3}>
      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="first-name" required>
          First name
        </FormLabel>
        <OutlinedInput
          id="first-name"
          value={data.firstName}
          disabled
          size="small"
        />
      </FormGrid>

      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="last-name" required>
          Last name
        </FormLabel>
        <OutlinedInput
          id="last-name"
          
          disabled
          size="small"
        />
      </FormGrid>

      <FormGrid item xs={12}>
        <FormLabel htmlFor="email" required>
          Email
        </FormLabel>
        <OutlinedInput
          id="email"
          value={data.email}
          disabled
          size="small"
        />
      </FormGrid>

      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="password" required>
          Password
        </FormLabel>
        <OutlinedInput
          id="password"
          value={data.password}
          disabled
          type="password"
          size="small"
        />
      </FormGrid>
    </Grid>
  );
}
