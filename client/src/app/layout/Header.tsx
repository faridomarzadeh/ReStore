import { ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";


interface Props {
  darkMode: boolean;
  toggleMode: () => void;
}

const midLinks = [
  { title: "Catalog", path: "/catalog" },
  { title: "Contact", path: "/contact" },
  { title: "About", path: "/about" },
];

const rightLinks = [
  { title: "Login", path: "/login" },
  { title: "Register", path: "/register" },
];

const navStyles = {
  color: "inherit",
  display: "flex",
  typography: "h6",
  textDecoration: "none",
  "&:hover": {
    color: "grey.500",
  },
  "&.active": {
    color: "text.secondary",
  },
};
export default function Header({ darkMode, toggleMode }: Props) {

  const {basket} = useAppSelector(state=>state.basket);

  const itemCount = basket?.items.reduce((sum,item) => {
    return sum+=item.quantity
  },0);

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" component={NavLink} to={"/"} sx={navStyles}>
            RE-STORE
          </Typography>

          <Switch
            checked={darkMode}
            onChange={toggleMode}
            aria-label="dark Mode"
          />
        </Box>

        <List sx={{ display: "flex" }}>
          {midLinks.map((link) => (
            <ListItem component={NavLink} to={link.path} sx={navStyles} key={link.path}>
              {link.title.toUpperCase()}
            </ListItem>
          ))}
        </List>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2, display: "inline-block" }}
            component={Link}
            to={'/basket'}
          >
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCart/>
            </Badge>
          </IconButton>
          <List sx={{ display: "flex" }}>
            {rightLinks.map((link) => (
              <ListItem component={NavLink} to={link.path} sx={navStyles} key={link.path}>
                {link.title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
