import { Card, CardContent, Typography, useTheme } from "@mui/material";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

const tips = [
  "Try the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings.",
  "You spent more on eating out this week — consider a meal plan.",
  "Impulse buying is stronger at night — delay big purchases by 24 hours.",
  "Set a weekly 10-minute budget check on Sunday evenings.",
  "Consider reviewing your streaming subscriptions — any you don’t use?",
];

export default function QuickTipCard() {
  const theme = useTheme();
  const randomTip = tips[Math.floor(Math.random() * tips.length)];

  // Determine background based on theme mode
  const backgroundColor =
    theme.palette.mode === 'dark'
      ? theme.palette.background.paper
      : theme.palette.warning.light + "33"; // translucent yellow

  return (
    <Card
      elevation={2}
      sx={{
        backgroundColor,
        borderLeft: `5px solid ${theme.palette.warning.main}`,
      }}
    >
      <CardContent>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          gutterBottom
          sx={{ display: "flex", alignItems: "center" }}
        >
          <LightbulbIcon sx={{ mr: 1, color: theme.palette.warning.main }} />
          Quick Finance Tip
        </Typography>
        <Typography variant="body1" color="text.primary">
          {randomTip}
        </Typography>
      </CardContent>
    </Card>
  );
}
