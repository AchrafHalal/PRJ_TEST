import React, { useState } from 'react';
import {
  Container,
  TextField,
  Typography,
  Button,
  Grid,
  Box,
  MenuItem
} from '@mui/material';

const goals = [
  'Acheter une voiture',
  'Voyager',
  'Créer un fonds d’urgence',
  'Épargner pour un projet',
  'Autre'
];

export default function FirstLoginForm() {
  const [formData, setFormData] = useState({
    revenu: '',
    depenses: '',
    objectif: '',
    epargneMensuelle: '',
    transport: '',
    logement: '',
    nourriture: '',
    loisirs: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Données soumises:', formData);
  };

  return (
    <Container maxWidth="sm">
      <Box  p={3} borderRadius={3} boxShadow={3} bgcolor="background.paper">
        <Typography variant="h5" gutterBottom align="center">
          🧾 Première Configuration Financière
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Revenu mensuel (MAD)"
                name="revenu"
                fullWidth
                type="number"
                value={formData.revenu}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Dépenses mensuelles (MAD)"
                name="depenses"
                fullWidth
                type="number"
                value={formData.depenses}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                select
                label="But principal d’épargne"
                name="objectif"
                fullWidth
                value={formData.objectif}
                onChange={handleChange}
                required
              >
                {goals.map((goal) => (
                  <MenuItem key={goal} value={goal}>
                    {goal}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Montant à économiser par mois (MAD)"
                name="epargneMensuelle"
                fullWidth
                type="number"
                value={formData.epargneMensuelle}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Budget transport (MAD)"
                name="transport"
                fullWidth
                type="number"
                value={formData.transport}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Budget logement (MAD)"
                name="logement"
                fullWidth
                type="number"
                value={formData.logement}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Budget nourriture (MAD)"
                name="nourriture"
                fullWidth
                type="number"
                value={formData.nourriture}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Budget loisirs (MAD)"
                name="loisirs"
                fullWidth
                type="number"
                value={formData.loisirs}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Continuer vers mon tableau de bord
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}
