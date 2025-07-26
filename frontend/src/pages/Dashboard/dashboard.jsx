import React, { useState } from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  useMediaQuery,
  useTheme,
  Avatar,
  IconButton,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ScheduleIcon from "@mui/icons-material/Schedule";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Waitingroom from "../WaitingRoom/waitingroom";

const drawerWidth = 240;

const AccountPage = () => (
  <Box>
    <Typography variant="h4" gutterBottom>
      👤 Account Page
    </Typography>
    <Typography>This is the account settings panel.</Typography>
  </Box>
);

const SchedulePage = () => (
  <Box>
    <Typography variant="h4" gutterBottom>
      ⏰ Schedule
    </Typography>
    <Typography>This is your schedule.</Typography>
  </Box>
);

const JoinMeetPage = () => (
  <Box>
    <Waitingroom />
  </Box>
);

const tabs = [
  { label: "Account", icon: <AccountCircleIcon />, component: <AccountPage /> },
  { label: "Schedule", icon: <ScheduleIcon />, component: <SchedulePage /> },
  {
    label: "Join a Meet",
    icon: <VideoCallIcon />,
    component: <JoinMeetPage />,
  },
];

export default function DashboardLayout() {
  const [activeTab, setActiveTab] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box>
      <Toolbar>
        <Typography variant="h6">Navigation</Typography>
      </Toolbar>
      <Divider />
      <List>
        {tabs.map((tab, index) => (
          <ListItem
            button
            key={tab.label}
            selected={activeTab === index}
            onClick={() => {
              setActiveTab(index);
              if (isMobile) setMobileOpen(false);
            }}
            sx={{
              bgcolor: activeTab === index ? "primary.main" : "inherit",
              color: activeTab === index ? "white" : "inherit",
              "&:hover": {
                bgcolor: activeTab === index ? "primary.dark" : "action.hover",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: activeTab === index ? "white" : "text.primary",
                minWidth: 40,
              }}
            >
              {tab.icon}
            </ListItemIcon>
            <ListItemText
              primary={tab.label}
              sx={{ color: activeTab === index ? "white" : "inherit" }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <Typography variant="h6" noWrap>
              Dashboard
            </Typography>
          </Box>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          <Avatar sx={{ ml: 2 }} />
          <Button
            color="inherit"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/auth";
            }}
            sx={{ ml: 2 }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
        }}
      >
        {tabs[activeTab].component}
      </Box>
    </Box>
  );
}
