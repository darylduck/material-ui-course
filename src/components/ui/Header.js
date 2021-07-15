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
import { useMemo } from "react";

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
  appBar: {
    zIndex: theme.zIndex.modal + 1,
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
    '& .MuiListItemText-root': {
      opacity: 1
    }
  }
}));

export default function Header(props) {
  const classes = useStyles();
  const theme = useTheme();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  
  const menuOptions = useMemo(() => ([
    { name: "Services", link: "/services", activeIndex: 1, selectedIndex: 0 },
    { name: "Custom Software Development", link: "/custom-software", activeIndex: 1, selectedIndex: 1 },
    { name: "Mobile App Development", link: "/mobile-apps", activeIndex: 1, selectedIndex: 2 },
    { name: "Website Development", link: "/websites", activeIndex: 1, selectedIndex: 3 },
  ]), []);
  
  const routes = useMemo(() => ([
    { name: 'Home', link: '/', activeIndex: 0 },
    { name: 'Services', link: '/services', activeIndex: 1, ariaOwns: anchorEl ? "simple-menu" : undefined, ariaPopup: anchorEl ? "true" : undefined, mouseOver: (e) => handleClick(e) },
    { name: 'The Revolution', link: '/revolution', activeIndex: 2 },
    { name: 'About Us', link: '/about-us', activeIndex: 3 },
    { name: 'Contact Us', link: '/contact-us', activeIndex: 4 }
  ]), [anchorEl]);
  

  const handleChange = (e, newValue) => {
    props.setValue(newValue);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };

  const handleMenuItemClick = (e, i) => {
    props.setValue(2);
    props.setSelectedIndex(i);
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
          if (props.value !== route.activeIndex) {
            props.setValue(route.activeIndex);

            if (route.selectedIndex && route.selectedIndex !== props.selectedIndex) {
              props.setSelectedIndex(route.selectedIndex);
            }
          }

          break;
        default:
          break;
      }
    })
  }, [props, menuOptions, routes]);

  const tabs = (
    <>
      <Tabs
        onChange={handleChange}
        value={props.value}
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
        style={{ zIndex: 1302 }}
        keepMounted
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
              selected={props.selectedIndex === index && props.value === 1}
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
          <div className={classes.toolbarMargin}></div>
          <List disablePadding>
            {routes.map((route, index) => {              
              return (
                <ListItem key={index} divider button component={Link} to={route.link} onClick={() => { setOpenDrawer(false); props.setValue(index); }} classes={{ selected: classes.drawerItemSelected }} selected={props.value === index}>
                  <ListItemText className={classes.drawerItem} disableTypography>{route.name}</ListItemText>
                </ListItem>
              );
            })}
            <ListItem classes={{ root: classes.drawerItemEstimate }} divider button component={Link} to="/estimate" onClick={() => setOpenDrawer(false)}>
              <ListItemText className={classes.drawerItem} disableTypography>Free Estimate</ListItemText>
            </ListItem>
          </List>
      </SwipeableDrawer>
      <IconButton className={classes.drawerIconContainer} onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </>
  );

  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed" color="primary" className={classes.appBar}>
          <Toolbar disableGutters>
            <Button
              className={classes.logoContainer}
              component={Link}
              to="/"
              disableRipple
              onClick={() => props.setValue(0)}
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
