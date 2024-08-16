import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, Typography, Container } from "@mui/material";

const UsernameInput = ({ setUsername, connect, username, localVideoRef }) => {
  useEffect(() => {
    const startVideoStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing webcam: ", error);
      }
    };

    startVideoStream();
  }, [localVideoRef]);

  return (
    <>
      <header className="main-header">
        <img src="logo.svg" alt="Logo" style={{ width: "50px", height: "50px" }} />
        Connectly
      </header>
      <Container sx={{ height: 'calc(100vh - 60px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            width: '100%',
            maxWidth: '1200px',
            textAlign: { xs: 'center', sm: 'left' },
          }}
        >
          <Box
            sx={{
              flex: '1 1 auto',
              maxWidth: '500px',
              width: '100%',
            }}
          >
            <video
              ref={localVideoRef}
              autoPlay
              muted
              style={{
                width: '100%',
                borderRadius: '8px',
                transform: 'scaleX(-1)', // Flips the video horizontally
              }}
            />
          </Box>
          <Box
            sx={{
              flex: '1 1 auto',
              maxWidth: '400px',
              width: '100%',
            }}
          >
            <Typography variant="h4" mb={2}>
              Join Meeting
            </Typography>
            <TextField
              label="Username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={connect}
              disabled={!username}
              fullWidth
              sx={{ mt: 2 }}
            >
              Connect
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default UsernameInput;
