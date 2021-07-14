import { cloneElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { makeStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import logo from "../../assets/logo.svg";

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
    [theme.breakpoints.down('md')]: {
      marginBottom: '2em'
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.25em'
    }
  },
  logo: {
    height: "8em",
    [theme.breakpoints.down('md')]: {
      height: '7em'
    },
    [theme.breakpoints.down('xs')]: {
      height: '5.5em'
    }
  },
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px",
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: "50px",
    marginLeft: "50px",
    marginRight: "25px",
    height: "45px",
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: "white",
    borderRadius: "0px",
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1,
    },
  },
  drawerIconContainer: {
    marginLeft: 'auto',
    "&:hover": {
      backgroundColor: 'transparent'
    }
  },
  drawerIcon: {
    height: '50px',
    width: '50px'
  },
  drawer: {
    backgroundColor: theme.palette.primary.main
  },
  drawerItem: {
    ...theme.typography.tab,
    color: 'white',
    opacity: 0.7
  },
  drawerItemEstimate: {
    backgroundColor: theme.palette.secondary.main
  },
  drawerItemSelected: {
    opacity: 1
  }
}));

const menuOptions = [
  { name: "Services", link: "/services", activeIndex: 1, selectedIndex: 0 },
  { name: "Custom Software Development", link: "/custom-software", activeIndex: 1, selectedIndex: 1 },
  { name: "Mobile App Development", link: "/mobile-apps", activeIndex: 1, selectedIndex: 2 },
  { name: "Website Development", link: "/websites", activeIndex: 1, selectedIndex: 3 },
];

const routes = [
  { name: 'Home', link: '/', activeIndex: 0 },
  { name: 'Services', link: '/services', activeIndex: 1, ariaOwns: anchorEl ? "simple-menu" : undefined, ariaPopup: anchorEl ? "true" : undefined, mouseOver: (e) => handleClick(e) },
  { name: 'The Revolution', link: '/revolution', activeIndex: 2 },
  { name: 'About Us', link: '/about-us', activeIndex: 3 },
  { name: 'Contact Us', link: '/contact-us', activeIndex: 4 }
];

export default function Header(props) {
  const classes = useStyles();
  const theme = useTheme();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const [openDrawer, setOpenDrawer] = useState(false);
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };

  const handleMenuItemClick = (e, i) => {
    setValue(2);
    setSelectedIndex(i);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  useEffect(() => {
    [...menuOptions, ...routes].forEach(route => {
      switch (window.location.pathname) {
        case `${route.link}`:
          if (value !== route.activeIndex) {
            setValue(route.activeIndex);

            if (route.selectedIndex && route.selectedIndex !== selectedIndex) {
              setSelectedIndex(route.selectedIndex);
            }
          }

          break;
        default:
          break;
      }
    })
  }, [value, selectedIndex, setValue, setSelectedIndex]);

  const tabs = (
    <>
      <Tabs
        onChange={handleChange}
        value={value}
        className={classes.tabContainer}
        indicatorColor="primary"
      >
        {routes.map((route, index) => (
          <Tab 
            key={index}
            className={classes.tab} 
            component={Link}
            label={route.name}
            to={route.link}
            aria-owns={route.ariaOwns}
            aria-haspopup={route.ariaPopup}
            onMouseOver={route.mouseOver}
          />
        ))}        
      </Tabs>
      <Button variant="contained" color="secondary" className={classes.button}>
        Free Estimate
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        classes={{ paper: classes.menu }}
        MenuListProps={{ onMouseLeave: handleClose }}
        elevation={0}
      >
        {menuOptions.map((opt, index) => {
          return (
            <MenuItem
              key={index}
              onClick={(e) => {
                handleMenuItemClick(e, index);
              }}
              component={Link}
              to={opt.link}
              classes={{ root: classes.menuItem }}
              selected={selectedIndex === index && value === 1}
            >
              {opt.name}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );

  const drawer = (
    <>
      <SwipeableDrawer 
        disableBackdropTransition={!iOS} 
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true) }
        classes={{ paper: classes.drawer }}>
          <List disablePadding>
            <ListItem divider button component={Link} to="/" onClick={() => { setOpenDrawer(false); setValue(0); }} selected={value === 0}>
              <ListItemText className={[classes.drawerItem, value === 0 ? classes.drawerItemSelected: undefined ]} disableTypography>Home</ListItemText>
            </ListItem>
            <ListItem divider button component={Link} to="/services" onClick={() => { setOpenDrawer(false); setValue(1); }} selected={value === 1}>
              <ListItemText className={[classes.drawerItem, value === 1 ? classes.drawerItemSelected: undefined ]} disableTypography>Services</ListItemText>
            </ListItem>
            <ListItem divider button component={Link} to="/revolution" onClick={() => { setOpenDrawer(false); setValue(2); }} selected={value === 2}>
              <ListItemText className={[classes.drawerItem, value === 2 ? classes.drawerItemSelected: undefined ]} disableTypography>The Revolution</ListItemText>
            </ListItem>
            <ListItem divider button component={Link} to="/about-us" onClick={() => { setOpenDrawer(false); setValue(3); }} selected={value === 3}>
              <ListItemText className={[classes.drawerItem, value === 3 ? classes.drawerItemSelected: undefined ]} disableTypography>About Us</ListItemText>
            </ListItem>
            <ListItem divider button component={Link} to="/contact-us" onClick={() => { setOpenDrawer(false); setValue(4); }} selected={value === 4}>
              <ListItemText className={[classes.drawerItem, value === 4 ? classes.drawerItemSelected: undefined ]} disableTypography>Contact Us</ListItemText>
            </ListItem>
            <ListItem className={classes.drawerItemEstimate} divider button component={Link} to="/estimate" onClick={() => setOpenDrawer(false)}>
              <ListItemText className={classes.drawerItem} disableTypography>Free Estimate</ListItemText>
            </ListItem>
          </List>
      </SwipeableDrawer>
      <IconButton className={classes.drawerIconContainer} onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon disableRipple className={classes.drawerIcon} />
      </IconButton>
    </>
  );

  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed" color="primary">
          <Toolbar disableGutters>
            <Button
              className={classes.logoContainer}
              component={Link}
              to="/"
              disableRipple
              onClick={() => setValue(0)}
            >
              <img src={logo} alt="Company Logo" className={classes.logo} />
            </Button>
            { matches ? drawer: tabs }
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
}
