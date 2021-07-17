import Lottie from 'react-lottie';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import animationData from '../animations/landinganimation/data';
import customSoftwareIcon from '../assets/Custom Software Icon.svg';
import mobileAppsIcon  from '../assets/mobileIcon.svg';
import websitesIcon  from '../assets/websiteIcon.svg';
import revolutionBackground  from '../assets/repeatingBackground.svg';
import infoBackground  from '../assets/infoBackground.svg';
import ButtonArrow from './ui/ButtonArrow';
import CallToAction from './ui/CallToAction';

const useStyles = makeStyles(theme => ({
    animation: {
        minWidth: '21em',
        maxWidth: '50em',
        marginTop: '2em',
        marginLeft: '2%',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '30em'
        }
    },
    estimateButton: {
        ...theme.typography.estimate,
        backgroundColor: theme.palette.secondary.main,
        borderRadius: 50,
        height: 45,
        width: 145,
        marginRight: 40,
        "&:hover": {
            backgroundColor: theme.palette.secondary.light
        }
    },
    buttonContainer: {
        marginTop: '1em'
    },
    learnButtonHero: {
        ...theme.typography.learnButton,
        fontSize: '0.9rem',
        height: 45,
        width: 145
    },
    learnButton: {
        ...theme.typography.learnButton,
        fontSize: '0.7em',
        padding: 5,
        height: 35,
        [theme.breakpoints.down('sm')]: {
            marginBottom: '2em',
        }
    },
    mainContainer: {
        marginTop: '5em',
        [theme.breakpoints.down('md')]: {
            marginTop: '3em'
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: '2em',
        }
    },
    heroTextContainer: {
        minWidth: '21.5em',
        marginLeft: '1em',
        [theme.breakpoints.down('sm')]: {
            marginLeft: '0',
        }
    },
    specialText: {
        fontFamily: 'Pacifico',
        color: theme.palette.secondary.main
    },
    subTitle: {
        marginBottom: '1em'
    },
    icon: {
        marginLeft: '2em',
        [theme.breakpoints.down('xs')]: {
            marginLeft: '0',
        }
    },
    serviceContainer: {
        marginTop: '12em',
        [theme.breakpoints.down('sm')]: {
            padding: 5,
        }
    },
    revolutionBackground: {
        backgroundImage: `url(${revolutionBackground})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100%',
        width: '100%'
    },
    revolutionCard: {
        position: 'absolute',
        boxShadow: theme.shadows[10],
        borderRadius: 15,
        padding: '10em',
        [theme.breakpoints.down('sm')]: {
            padding: '8em 0',
            borderRadius: 0,
            width: '100%'
        }
    },
    infoBackground: {
        backgroundImage: `url(${infoBackground})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100%',
        width: '100%'
    }
}));

export default function LandingPage() {
    const classes = useStyles();
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <Grid className={classes.mainContainer} container direction="column">
            <Grid item> {/* ----- Hero Block ----- */}
                <Grid container justifyContent="flex-end" alignItems="center">
                    <Grid item sm className={classes.heroTextContainer}>
                        <Typography align="center" variant="h2">
                            Bringing West Coast Technology <br /> to the Midwest
                        </Typography>
                        <Grid className={classes.buttonContainer} container justifyContent="center">
                            <Grid item>
                                <Button className={classes.estimateButton} variant="contained">Free Estimate</Button>
                            </Grid>
                            <Grid item>
                                <Button className={classes.learnButtonHero} variant="outlined">
                                    <span style={{marginRight: 10}}>Learn More</span>
                                    <ButtonArrow width={15} height={15} fill={theme.palette.primary.main} />
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid className={classes.animation} item sm>
                        <Lottie options={defaultOptions} height={'100%'} width={'100%'} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item> {/* ----- Custom Software Block ----- */}
                <Grid container className={classes.serviceContainer} justifyContent={matchesSM ? 'center': undefined}>
                    <Grid item style={{ marginLeft: matchesSM ? 0: '5em', textAlign: matchesSM ? 'center': undefined }}>
                        <Typography variant="h4">Custom Software Development</Typography>
                        <Typography className={classes.subTitle} variant="subtitle1">Save Energy, Save Time. Save Money.</Typography>
                        <Typography variant="subtitle1">
                            Complete digital solutions from investigation to {' '} 
                            <span className={classes.specialText}>celebration.</span>
                        </Typography>
                        <Button className={classes.learnButton} variant="outlined">
                            <span style={{marginRight: 10}}>Learn More</span>
                            <ButtonArrow width={10} height={10} fill={theme.palette.primary.main} />
                        </Button>
                    </Grid>
                    <Grid item>
                        <img className={classes.icon} alt="Custom Software icon" src={customSoftwareIcon} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item> {/* ----- iOS/Android Block ----- */}
                <Grid container className={classes.serviceContainer} justifyContent={matchesSM ? 'center': 'flex-end'}>
                    <Grid item style={{ textAlign: matchesSM ? 'center': undefined }}>
                        <Typography variant="h4">iOS/Android App Development</Typography>
                        <Typography className={classes.subTitle} variant="subtitle1">Extend Functionality. Extend Access. Increase Engagement.</Typography>
                        <Typography variant="subtitle1">
                            Integrate your web experience or create a standalone
                            app {matchesSM ? null : <br /> }with either mobile
                        </Typography>
                        <Button className={classes.learnButton} variant="outlined">
                            <span style={{marginRight: 10}}>Learn More</span>
                            <ButtonArrow width={10} height={10} fill={theme.palette.primary.main} />
                        </Button>
                    </Grid>
                    <Grid item style={{ marginRight: matchesSM ? 0: '5em' }}>
                        <img className={classes.icon} alt="iOS/Android icon" src={mobileAppsIcon} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item> {/* ----- Websites Block ----- */}
                <Grid container className={classes.serviceContainer} justifyContent={matchesSM ? 'center': undefined}>
                    <Grid item style={{ marginLeft: matchesSM ? 0: '5em', textAlign: matchesSM ? 'center': undefined }}>
                        <Typography variant="h4">Website Development</Typography>
                        <Typography className={classes.subTitle} variant="subtitle1">Reach More. Discover More. Sell More.</Typography>
                        <Typography variant="subtitle1">
                            Optimized for Search Engines, built for speed.
                        </Typography>
                        <Button className={classes.learnButton} variant="outlined">
                            <span style={{marginRight: 10}}>Learn More</span>
                            <ButtonArrow width={10} height={10} fill={theme.palette.primary.main} />
                        </Button>
                    </Grid>
                    <Grid item>
                        <img className={classes.icon} alt="Website icon" src={websitesIcon} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item> {/* ----- The Revolution Block ----- */}
                <Grid container alignItems="center" justifyContent="center" style={{ height: '100em', marginTop: '12em' }}>
                    <Card className={classes.revolutionCard}>
                        <CardContent>
                            <Grid container direction="column" style={{ textAlign: 'center' }}>
                                <Grid item>
                                    <Typography variant="h3" gutterBottom>The Revolution</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1">
                                        Visionary insights coupled with cutting-edge technology
                                        is a recipe for resolution.
                                    </Typography>
                                    <Button className={classes.learnButton} variant="outlined">
                                        <span style={{marginRight: 10}}>Learn More</span>
                                        <ButtonArrow width={10} height={10} fill={theme.palette.primary.main} />
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    <div className={classes.revolutionBackground}></div>
                </Grid>                
            </Grid>
            <Grid item> {/* ----- Information Block ----- */}
                <Grid container style={{ height: '80em' }} alignItems="center">
                    <Grid item container sm spacing={ matchesSM ? 2 : 0 } justifyContent="space-between" direction={ matchesSM ? 'column': undefined } alignItems={ matchesSM ? 'center': undefined } style={{ position: 'absolute', padding: matchesSM ? '0 2em' :'0 5em'}}>
                        <Grid item style={{ textAlign: matchesSM ? 'center': undefined }}>
                            <Grid container direction="column">
                                <Typography variant="h2" style={{ color: 'white' }}>About Us</Typography>
                                <Typography variant="subtitle2">Let's get personal.</Typography>
                                <Grid item>                                
                                    <Button className={classes.learnButton} variant="outlined" style={{ color: 'white', borderColor: 'white' }}>
                                        <span style={{marginRight: 10}}>Learn More</span>
                                        <ButtonArrow width={10} height={10} fill='white' />
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item style={{ textAlign: matchesSM ? 'center': 'right' }}>
                            <Grid container direction="column">
                                <Typography variant="h2" style={{ color: 'white' }}>Contact Us</Typography>
                                <Typography variant="subtitle2">Say hello!</Typography>
                                <Grid item>                                
                                    <Button className={classes.learnButton} variant="outlined" style={{ color: 'white', borderColor: 'white' }}>
                                        <span style={{marginRight: 10}}>Learn More</span>
                                        <ButtonArrow width={10} height={10} fill='white' />
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    
                    <div className={classes.infoBackground}></div>
                </Grid>
            </Grid>
            <Grid item>
                {/* ----- Call to Action Block ----- */}
                <CallToAction />
            </Grid>
        </Grid>
    );
}