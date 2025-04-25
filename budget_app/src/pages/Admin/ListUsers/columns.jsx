import { Box, Typography, useTheme } from "@mui/material";
import { AdminPanelSettingsOutlined, LockOpenOutlined } from '@mui/icons-material';

const GetColumns = () => {
  const theme = useTheme();

  return [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'Name', headerName: 'Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'role',
      headerName: 'Role',
      width: 200,
      renderCell: (params) => {
        const role = params.value || 'user';
        return (
          <Box
            sx={{
              p: "5px",
              width: "99px",
              borderRadius: "3px",
              textAlign: "center",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              backgroundColor:
                role === "admin"
                  ? theme.palette.primary.main
                  : "#3da58a",
              color: "#fff",
            }}
          >
            {role === 'admin' ? (
              <>
                <AdminPanelSettingsOutlined fontSize="small" />
                <Typography variant="body2">Admin</Typography>
              </>
            ) : (
              <>
                <LockOpenOutlined fontSize="small" />
                <Typography variant="body2">User</Typography>
              </>
            )}
          </Box>
        );
      },
    },
  ];
};

export default GetColumns;
