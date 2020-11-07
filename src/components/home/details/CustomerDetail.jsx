import {inject, observer} from "mobx-react";
import React, {useEffect} from "react";
import PropTypes from 'prop-types';
import DefaultContainer from "../../../layout/DefaultContainer";
import {Card, Grid} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import female_face from '../../../images/female_face.jpg';
import male_face from '../../../images/male_face.jpg';
import ResponsiveImage from "../../common/images/ResponsiveImage";
import makeStyles from "@material-ui/core/styles/makeStyles";

const StyledPaper = withStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '40px',
        marginTop: '40px',
        padding: '20px',
        height: '400px',
        alignContent: 'center'
    },
})(Paper);

const light = makeStyles((theme) => ({
    root: {
        backgroundColor: 'white',
    },
    emptyList: {
        color: 'var(--milled-wine)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        minHeight: '344px',
        minWidth: 750,
    },
}));

const dark = makeStyles((theme) => ({
    root: {
        color: 'whitesmoke',
        backgroundColor: '#333',
        boxShadow: '0px 3px 1px -4px whitesmoke, 0px 2px 5px 0px whitesmoke, 0px 1px 20px 0px whitesmoke',
    },
    emptyList: {
        color: 'whitesmoke',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        minHeight: '344px',
        backgroundColor: '#333',
        minWidth: 900
    },
}));


function CustomerDetail({AppStore, CustomerDetailsStore}) {
    const {
        loading,
        error,
        details,
        handleFetch
    } = CustomerDetailsStore;

    const classes = !AppStore.isDark ? light() : dark();
    useEffect(() => {
        handleFetch();
    }, []);

    return (
        <div className={'customerDetails'}>
            <DefaultContainer>
                <Paper elevation={24} className={classes.root}>
                {loading || error ? (
                    <Paper className={classes.emptyList}>
                        <div>{loading ? 'Loading... Please wait!!' : 'No data to display!' }</div>
                    </Paper>
                ) : (
                    <Grid container spacing={3} item xs={12} className={'customerInfo'}>
                        <Grid className={'details'} container spacing={2} item xs={12}>
                            <Grid item xs={3}>
                                {details.gender === 'Male' ?
                                    <ResponsiveImage src={male_face} height={600} width={600} /> :
                                    <ResponsiveImage src={female_face} height={600} width={600} /> }
                            </Grid>
                            <Grid className={'customerFields'}>
                                <span className={'name'}>{details.name}</span>
                                <br /><br />
                                <span className={'mobile'}>{details.mobile}</span>
                                <br /><br />
                                <span className={'location'}>{details.subDistrict + ',' + details.district}</span>
                                <br />
                                <span className={'location'}>{details.state}</span>
                                <br /><br />
                                <span className={'bank'}>{details.bank}</span>
                                <br /><br />
                                <span className={'timings'}>Timings: </span>
                                <br />&emsp;&emsp;
                                <span className={'timings'}>{details.days} ({details.startTime} - {details.endTime})</span>
                            </Grid>
                        </Grid>
                    </Grid>
                )}
                </Paper>
            </DefaultContainer>
        </div>
    )
}

CustomerDetail.propTypes = {
    AppStore: PropTypes.object.isRequired,
    CustomerDetailsStore: PropTypes.object.isRequired
}

export default inject('AppStore', 'CustomerDetailsStore')(observer(CustomerDetail));
