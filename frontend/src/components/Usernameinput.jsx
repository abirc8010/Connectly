import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  Container,
  TextField,
  Button,
  IconButton,
  Avatar,
  Tooltip,
  Paper,
  Stack,
} from "@mui/material";
import { Videocam, VideocamOff, Mic, MicOff } from "@mui/icons-material";

const UsernameInput = ({ username, setUsername, connect }) => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [videoOn, setVideoOn] = useState(true);
  const [micOn, setMicOn] = useState(true);

  const updateStream = async (wantVideo, wantAudio) => {
    streamRef.current?.getTracks().forEach((t) => t.stop());

    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: wantVideo,
        audio: wantAudio,
      });

      streamRef.current = newStream;
      if (!wantVideo) {
        videoRef.current.srcObject = null;
        return;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
    } catch (err) {
      console.error("Error accessing media devices:", err);
    }
  };

  useEffect(() => {
    updateStream(videoOn, micOn);
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const toggleVideo = async () => {
    const newVideoState = !videoOn;
    setVideoOn(newVideoState);
    await updateStream(newVideoState, micOn);
  };

  const toggleMic = async () => {
    const newMicState = !micOn;
    setMicOn(newMicState);
    await updateStream(videoOn, newMicState);
  };

  return (
    <>
      <Box
        component="header"
        sx={{
          display: "flex",
          alignItems: "center",
          px: 2,
          py: 1,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <img src="logo.svg" alt="Logo" width={40} height={40} />
        <Typography variant="h6" sx={{ ml: 1 }}>
          Connectly
        </Typography>
      </Box>

      <Container
        maxWidth="lg"
        sx={{
          height: "calc(100vh - 64px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            alignItems: "center",
            width: "100%",
            maxWidth: 1200,
          }}
        >
          <Paper
            elevation={3}
            sx={{
              position: "relative",
              width: { xs: "100%", md: 480 },
              aspectRatio: "4/3",
              overflow: "hidden",
              borderRadius: 2,
              backgroundColor: "black",
            }}
          >
            {videoOn ? (
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transform: "scaleX(-1)",
                }}
              />
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "grey.900",
                }}
              >
                <Avatar
                  sx={{
                    width: 96,
                    height: 96,
                    fontSize: 32,
                    bgcolor: "primary.main",
                  }}
                >
                  {username?.[0]?.toUpperCase() || "U"}
                </Avatar>
              </Box>
            )}

            <Stack
              direction="row"
              spacing={1}
              sx={{
                position: "absolute",
                bottom: 8,
                left: "50%",
                transform: "translateX(-50%)",
                bgcolor: "rgba(0,0,0,0.4)",
                borderRadius: 1,
                p: 0.5,
              }}
            >
              <Tooltip title={videoOn ? "Turn off camera" : "Turn on camera"}>
                <IconButton onClick={toggleVideo} sx={{ color: "white" }}>
                  {videoOn ? <Videocam /> : <VideocamOff />}
                </IconButton>
              </Tooltip>
              <Tooltip title={micOn ? "Mute mic" : "Unmute mic"}>
                <IconButton onClick={toggleMic} sx={{ color: "white" }}>
                  {micOn ? <Mic /> : <MicOff />}
                </IconButton>
              </Tooltip>
            </Stack>
          </Paper>

          <Box sx={{ flex: 1, maxWidth: 400 }}>
            <Typography variant="h4" gutterBottom>
              Join Meeting
            </Typography>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              disabled={!username}
              onClick={connect}
              sx={{ mt: 2, py: 1.5 }}
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
