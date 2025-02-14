import * as React from "react";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import AccountMenu from "./AccountMenu";

const Header = () => {
  const location = useLocation();

  const showAccountMenu = location.pathname === "/tasks";
  const showLoginRegister = location.pathname !== "/tasks";

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
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
              color="white"
            >
              <strong>TASK MANAGER</strong>
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />
          <Box>
            {showLoginRegister && (
              <>
                <Button component={Link} to="/" color="info">
                  <strong>Login</strong>
                </Button>
                <Button component={Link} to="/register" color="info">
                  <strong>Register</strong>
                </Button>
              </>
            )}
            {showAccountMenu && <AccountMenu />}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
