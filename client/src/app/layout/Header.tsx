import { AppBar, Switch, Toolbar, Typography } from "@mui/material";
interface Props {
  darkMode: boolean;
  toggleMode: () => void;
}

export default function Header({ darkMode, toggleMode }: Props) {
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6">RE-STORE</Typography>

        <Switch
          checked={darkMode}
          onChange={toggleMode}
          aria-label="dark Mode"
        />
      </Toolbar>
    </AppBar>
  );
}
