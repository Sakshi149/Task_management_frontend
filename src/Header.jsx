import * as React from "react";
import { AppBar, Box, Toolbar, IconButton, Typography } from "@mui/material";
// import { Menu  } from "@mui/icons-material";

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" color="transparent">
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <img
              src="src/assets/microsoft-planner-logo-1-removebg-preview.png"
              alt="Logo"
              style={{ height: 40 }} 
            />
          {/* <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton> */}

          <Typography variant="h6" noWrap component="div" sx={{ display: { xs: "none", sm: "block" } }} color="white">
            <strong>TASK MANAGER</strong>
          </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
