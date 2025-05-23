// src/pages/Dashboard.jsx

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import AddJournal from "../components/AddJournal";
import MyJournals from "../components/MyJournals";
import DashboardComp from "../components/DashboardComp";

const drawerWidth = 240;

const navItems = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
    path: "/dashboard",
    action: "dashboard",
  },
  { text: "Add", icon: <AddBoxIcon />, action: "addjournal" },
  { text: "My Journals", icon: <LibraryBooksIcon />, action: "myjournals" },
  { text: "Logout", icon: <LogoutIcon />, action: "logout" },
];

export default function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavAction = (action) => {
    if (action === "logout") {
      localStorage.removeItem("token");
      navigate("/");
      console.log("Logged out");
    } else {
      setActiveTab(action);
    }
    setMobileOpen(false); // close drawer on mobile
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={item.path ? Link : "button"}
              to={item.path}
              onClick={() => handleNavAction(item.action)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const username = localStorage.getItem("name") || "User";

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ backgroundColor: "purple" }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap>
            MindScribe
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>

        {/* Permanent Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backdropFilter: "blur(15px)",
          height: "100vh",
        }}
      >
        <Toolbar />
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            color: "white",
          }}
        >
          {activeTab === "dashboard" && <DashboardComp username={username} />}
          {activeTab === "addjournal" && <AddJournal />}
          {activeTab === "myjournals" && <MyJournals />}
        </Box>
      </Box>
    </Box>
  );
}
