import React from 'react';
import {
  Box, Grid, Card, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider,
} from '@mui/material';
import { UserCog } from 'lucide-react';

function AdminTeam({ data=[] }) {
  return (
    <Box>
      <Grid item xs={12} md={4}>
        <Card sx={{
          p: 3, borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' },
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box sx={{ backgroundColor: '#e6fffa', borderRadius: '50%', p: 1, mr: 2 }}>
              <UserCog size={24} color="#2c5282" />
            </Box>
            <Typography variant="h6" fontWeight="bold" color="#2c5282">
              Admin Team
            </Typography>
          </Box>

          <List>
            {(
              data.map((admin, index) => (
                <React.Fragment key={admin.id}>
                  <ListItem alignItems="center" sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "#319795" }}>
                        {admin.name.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={admin.name} secondary={admin.role} />
                  </ListItem>
                  {index < data.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))
            )}
          </List>

          <Box sx={{ mt: 2, textAlign: "right" }}>
            <Typography variant="body2" color="#319795" sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}>
              Manage Admins
            </Typography>
          </Box>
        </Card>
      </Grid>
    </Box>
  );
}

export default AdminTeam;
