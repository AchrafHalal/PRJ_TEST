import React from "react";
import { Box, Typography, Button, Grid, Card, CardContent, CardMedia } from "@mui/material";

const BlogPage = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: 'url("/hero-image.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          py: 12,
          textAlign: "center",
          color: "white",
        }}
      >
        <Typography variant="h3" fontWeight={600} gutterBottom>
          Bringing Simplicity In The Furnishing Market
        </Typography>
        <Button variant="contained" color="secondary">
          Discover Our Services
        </Button>
      </Box>

      {/* Who We Are Section */}
      <Grid container spacing={4} sx={{ px: 4, py: 8 }} alignItems="center">
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h6" color="text.secondary">
              150+ Furnishing Projects
            </Typography>
            <Typography variant="body1" mt={2}>
              We are a passionate team delivering top-quality furnishing solutions tailored to your needs.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              borderRadius: "50%",
              overflow: "hidden",
              width: 250,
              height: 250,
              mx: "auto",
            }}
          >
            <img src="/who-we-are.jpg" alt="Who We Are" width="100%" height="100%" />
          </Box>
        </Grid>
      </Grid>

      {/* How We Simplify Section */}
      <Grid container spacing={4} sx={{ px: 4, py: 8 }} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography variant="h5" fontWeight={500} gutterBottom>
            After Sales Support and Maintenance
          </Typography>
          <Typography variant="body1">
            We ensure that your furniture remains as stunning and functional as the day it arrived.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="250"
              image="/luxury-room.jpg"
              alt="Luxury Room"
            />
          </Card>
        </Grid>
      </Grid>

      {/* Why Choose Us Section */}
      <Box sx={{ px: 4, py: 8 }}>
        <Typography variant="h5" fontWeight={600} textAlign="center" gutterBottom>
          Why Choose Compatto
        </Typography>
        <Grid container spacing={4} mt={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: "center", p: 2 }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600}>
                  Easy Order & Delivery
                </Typography>
                <Typography variant="body2">
                  Hassle-free processes that bring your vision to life efficiently.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: "center", p: 2 }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600}>
                  After-Sales Support
                </Typography>
                <Typography variant="body2">
                  Dedicated assistance even after the furniture is in your space.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: "center", p: 2 }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600}>
                  No Variety Restrictions
                </Typography>
                <Typography variant="body2">
                  Choose from a vast range tailored to your unique taste.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default BlogPage;
