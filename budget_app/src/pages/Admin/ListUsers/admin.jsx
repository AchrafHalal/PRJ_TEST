import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import {
  AdminPanelSettingsOutlined,
  LockOpenOutlined,
  ArrowUpwardOutlined,
  ArrowDownwardOutlined,
  VisibilityOutlined 
} from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { fetchRows, promoteUser, depromoteUser } from './rows'; 

export default function Admin() {
  const [rowData, setRowData] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const getRows = async () => {
      const data = await fetchRows();
      setRowData(data);

      console.log(data);
    };
    

    getRows();
  }, []);

  const handlePromote = async (id) => {
    await promoteUser(id);
    const updated = await fetchRows();
    setRowData(updated);
  };

  const handleDepromote = async (id) => {
    await depromoteUser(id);
    const updated = await fetchRows();
    setRowData(updated);
  };

  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/admin/view-user/${id}`);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First Name', width: 130 },
    { field: 'lastName', headerName: 'Last Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'role',
      headerName: 'Role',
      display:'flex',
      justifyContent: 'center',
      alignItems:'center',
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
    {
      field: 'action',
      headerName: 'Action',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      width: 160,
      renderCell: (params) => {
        const isAdmin = params.row.role === 'admin';
        return (
          <Box display="flex" gap={1}>
            <Tooltip title={isAdmin ? 'Depromote to User' : 'Promote to Admin'}>
              <IconButton
                color={isAdmin ? 'warning' : 'success'}
                onClick={() =>
                  isAdmin ? handleDepromote(params.row.id) : handlePromote(params.row.id)
                }
              >
                {isAdmin ? <ArrowDownwardOutlined /> : <ArrowUpwardOutlined />}
              </IconButton>
            </Tooltip>
            <Tooltip title="View User">
              <IconButton onClick={() => handleView(params.row.id)}>
                <VisibilityOutlined />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  return (
    <Box sx={{ height: 500, width: '100%' }} p={2}>
      <DataGrid
        rows={rowData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </Box>
  );
}
