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


function CustomerDetail({AppStore, CustomerDetailsStore}) {
    const {
        loading,
        error,
        details,
        handleFetch
    } = CustomerDetailsStore;

    useEffect(() => {
        handleFetch();
    }, []);

    return (
        <div className={'customerDetails'}>
            <DefaultContainer>
                <Paper elevation={4}>
                {loading || error ? (
                        <div>
                            {loading ? 'Leading.. Please wait...' : 'No data..' }
                        </div>
                ) : (
                    <Grid container spacing={3} item xs={12} className={'customerInfo'}>
                        <Grid className={'details'} container spacing={2} item xs={12}>
                            <Grid item xs={3}>
                                {details.gender === 'Male' ?
                                    <ResponsiveImage src={male_face} height={300} width={300} /> :
                                    <ResponsiveImage src={female_face} height={300} width={300} /> }
                            </Grid>
                            <Grid className={'customerFields'}>
                                <span className={'name'}>{details.name}</span>
                                <br /> <br />
                                <span className={'mobile'}>{details.mobile}</span>
                                <br /><br /><br />
                                <span className={'location'}>{details.subDistrict + ',' + details.district}</span>
                                <br />
                                <span className={'location'}>{details.state}</span>
                                <br /><br /><br />
                                <span className={'bank'}>{details.bank}</span>
                                <br /><br /><br />
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
