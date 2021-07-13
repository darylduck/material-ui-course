import { cloneElement, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { makeStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import logo from '../../assets/logo.svg';

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
    marginBottom: '3em'
  },
  logo: {
      height: '8em'
  },
  tabContainer: {
    marginLeft: 'auto'
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: '25px'
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: '50px',
    marginLeft: '50px',
    marginRight: '25px',
    height: '45px'    
  },
  logoContainer: {
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: 'white',
    borderRadius: '0px'
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1
    }
  }
}));

export default function Header(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  console.log(selectedIndex);

  const handleChange = (e, value) => {
    setValue(value);
  };

  const menuOptions = [
    { name: 'Services', link: '/services'},
    { name: 'Custom Software Development', link: '/custom-software'},
    { name: 'Mobile App Development', link: '/mobile-apps'},
    { name: 'Website Development', link: '/websites'}
  ];

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };

  const handleMenuItemClick = (e, i) => {
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  useEffect(() => {
    switch (window.location.pathname) {
      case '/':
        if (value !== 0) {
          setValue(0);
          setSelectedIndex(0);
        }

        break;
      case '/services':
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(0);
        }
        
        break;
      case '/custom-software':
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(1);
        }
        
        break;
      case '/mobile-apps':
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(2);
        }
        
        break;
      case '/websites':
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(3);
        }
        
        break;
      case '/revolution':
        if (value !== 2) {
          setValue(2);          
        }
        
        break;
      case '/about-us':
        if (value !== 3) {
          setValue(3);          
        }
        
        break;
      case '/contact-us':
        if (value !== 4) {
          setValue(4);          
        }
        
        break;        
      default:
        break;
    }
  }, [value, setValue, setSelectedIndex]);

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
            <Tabs 
              onChange={handleChange}
              value={value}
              className={classes.tabContainer}
              indicatorColor="primary"
            >
              <Tab label="Home" className={classes.tab} component={Link} to="/" />
              <Tab 
                aria-owns={anchorEl ? 'simple-menu': undefined}
                aria-haspopup={anchorEl ? 'true': undefined}
                label="Services" 
                className={classes.tab} 
                component={Link}
                onMouseOver={e => handleClick(e) } 
                to="/services" />
              <Tab label="The Revolution" className={classes.tab} component={Link} to="/revolution" />
              <Tab label="About Us" className={classes.tab} component={Link} to="/about-us" />
              <Tab label="Contact Us" className={classes.tab} component={Link} to="/contact-us" />
            </Tabs>
            <Button variant="contained" color="secondary"
                    className={classes.button}>
              Free Estimate
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              classes={{paper: classes.menu }}
              MenuListProps={{ onMouseLeave: handleClose }}
              elevation={0}
            >
              {menuOptions.map((opt, index) => {
                return <MenuItem 
                  key={index}
                  onClick={(e) => { handleMenuItemClick(e, index) }} 
                  component={Link} 
                  to={opt.link} 
                  classes={{root: classes.menuItem}}
                  selected={selectedIndex === index && value === 1}>
                    { opt.name }
                  </MenuItem>
              })}              
            </Menu>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
}
