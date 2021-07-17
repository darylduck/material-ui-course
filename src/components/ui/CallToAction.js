import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import ButtonArrow from './ButtonArrow';
import background from '../../assets/background.jpg';
import mobileBackground from '../../assets/mobileBackground.jpg';

const useStyles = makeStyles(theme => ({
    learnButton: {
        ...theme.typography.learnButton,
        fontSize: '0.7em',
        padding: 5,
        height: 35,
        [theme.breakpoints.down('sm')]: {
            marginBottom: '2em',
        }
    },
    background: {
        backgroundImage: `url(${background})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100%',
        width: '100%',
        [theme.breakpoints.down('md')]: {
            backgroundImage: `url(${mobileBackground})`,
        }
    },
    estimateButton: {
        ...theme.typography.estimate,
        borderRadius: 50,
        height: 80,
        backgroundColor: theme.palette.secondary.main,
        fontSize: '1.5rem'
    }
}));


export default function CallToAction() {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Grid container style={{ height: '60em' }} alignItems="center">
            <Grid item style={{ position: 'absolute', marginLeft: '5em' }}>
                <Grid container direction="column">
                    <Grid item>
                        <Typography variant="h2">
                            Simple Software. <br />
                            Revolutionary Results.
                        </Typography>
                        <Typography variant="subtitle2" style={{ fontSize: '1.5em' }}>
                            Take advantage of the 21st Century.
                        </Typography>
                        <Grid container item>
                            <Button className={classes.learnButton} variant="outlined">
                                <span style={{marginRight: 5}}>Learn More</span>
                                <ButtonArrow width={10} height={10} fill={theme.palette.primary.main} />
                            </Button>
                        </Grid>                        
                    </Grid>
                </Grid>
                <Grid item style={{ position: 'absolute '}}>
                    <Button className={classes.estimateButton} variant="contained">Free Estimate</Button>
                </Grid>
            </Grid>
            <div className={classes.background}></div>
        </Grid>
    );
}