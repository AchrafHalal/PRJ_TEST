import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import {
  AdminPanelSettingsOutlined,
  LockOpenOutlined,
  ArrowUpwardOutlined,
  ArrowDownwardOutlined,
  VisibilityOutlined,
  CheckCircleOutline,
  BlockOutlined,
  PersonOutlined,
} from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { fetchRows, promoteUser, depromoteUser } from "./rows";

export default function Admin({ rows }) {
  const [rowData, setRowData] = useState(rows);
  const token = localStorage.getItem("token");

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

  const handleToggleActivation = async (userId, isActive) => {
    try {
       await axios.put(
        `http://localhost:8000/api/admin/${
          isActive ? "deactivate" : "activate"
        }/${userId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

         const updated = await fetchRows();
          setRowData(updated);

      console.log("Response:", rows);
    } catch (error) {
      console.error("Failed to toggle activation:", error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First Name", width: 130 },
    { field: "lastName", headerName: "Last Name", width: 130 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "role",
      headerName: "Role",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: 200,
      renderCell: (params) => {
        const role = params.value || "user";
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
              backgroundColor: role === "admin" ? "#1976d2" : "#3da58a",
              color: "#fff",
            }}
          >
            {role === "admin" ? (
              <>
                <AdminPanelSettingsOutlined fontSize="small" />
                <Typography variant="body2">Admin</Typography>
              </>
            ) : (
              <>
                <PersonOutlined fontSize="small" />
                <Typography variant="body2">User</Typography>
              </>
            )}
          </Box>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const isAdmin = params.row.role === "admin";
        const isActive = params.row.is_active;
        return (
          <Box display="flex" gap={1}>
            <Tooltip title={isAdmin ? "Depromote to User" : "Promote to Admin"}>
              <IconButton
                color={isAdmin ? "warning" : "success"}
                onClick={() =>
                  isAdmin
                    ? handleDepromote(params.row.id)
                    : handlePromote(params.row.id)
                }
              >
                {isAdmin ? <ArrowDownwardOutlined /> : <ArrowUpwardOutlined />}
              </IconButton>
            </Tooltip>
            <Tooltip title={isActive ? "Deactivate User" : "Activate User"}>
              <IconButton
                color={isActive ? "error" : "success"}
                onClick={() => handleToggleActivation(params.row.id, isActive)}
              >
                {isActive ? <BlockOutlined /> : <CheckCircleOutline />}
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
    <Box sx={{ height: 500, width: "100%" }} p={2}>
      <style>
        {`
          .inactive-row {
            opacity: 0.5;
          }
        `}
      </style>
      <DataGrid
        rows={rowData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        getRowClassName={(params) =>
          !params.row.is_active ? "inactive-row" : ""
        }
      /> 
    </Box>
  );
}
