import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import withAuth from "../../utils/withAuth.jsx";
import { nanoid } from "nanoid";
import "./waitingroom.css";
const server_url = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";
function WaitingRoom() {
  const navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleJoinCall = () => {
    if (!meetingCode) return alert("Please enter a meeting code");
    navigate(`/${meetingCode}`);
  };

  const handleCreateCall = async () => {
    try {
      const id = nanoid(10);
      navigate(`/${id}`);
    } catch (err) {
      console.error("Failed to create meeting:", err);
      alert("Something went wrong while creating a meeting.");
    }
  };

  return (
    <Box
      className="meetContainer"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        overflow: "hidden",
        px: 2,
      }}
    >
      {/* LEFT PANEL */}
      <Box
        className="leftPanel"
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: "100%",
            maxWidth: 450,
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ color: "rgb(92, 16, 125)", fontWeight: 600 }}
          >
            📹 Start or Join a Video Call
          </Typography>

          <TextField
            fullWidth
            label="Enter Meeting Code"
            variant="outlined"
            value={meetingCode}
            onChange={(e) => setMeetingCode(e.target.value)}
            sx={{ my: 2 }}
          />

          <Button
            fullWidth
            variant="contained"
            onClick={handleJoinCall}
            sx={{ mb: 2, backgroundColor: "rgb(92, 16, 125)" }}
          >
            Join Meeting
          </Button>

          <Divider sx={{ my: 2 }}>OR</Divider>

          <Button
            fullWidth
            variant="outlined"
            onClick={handleCreateCall}
            sx={{
              borderColor: "rgb(92, 16, 125)",
              color: "rgb(92, 16, 125)",
              "&:hover": {
                borderColor: "rgb(60, 10, 85)",
                color: "rgb(60, 10, 85)",
              },
            }}
          >
            Create New Meeting
          </Button>
        </Paper>
      </Box>

      {/* RIGHT PANEL */}
      {!isMobile && (
        <Box
          className="rightPanel"
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            background: "#f3f0fa",
            p: 2,
          }}
        >
          <img
            src="/logo3.png"
            alt="Meeting"
            style={{
              width: "100%",
              maxWidth: "450px",
              height: "60%",
              objectFit: "contain",
            }}
          />
        </Box>
      )}
    </Box>
  );
}

export default withAuth(WaitingRoom);
