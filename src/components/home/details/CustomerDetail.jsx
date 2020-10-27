import {inject, observer} from "mobx-react";
import React, {useEffect} from "react";
import PropTypes from 'prop-types';
import DefaultContainer from "../../../layout/DefaultContainer";
import {Card, Grid} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";

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
                <StyledPaper elevation={4}>
                {loading || error ? (
                        <div>
                            {loading ? 'Leading.. Please wait...' : 'No data..' }
                        </div>
                ) : (
                    <Grid container spacing={2} item xs={12}>
                        Data Fetched Completely....
                    </Grid>
                )}
                </StyledPaper>
            </DefaultContainer>
        </div>
    )
}

CustomerDetail.propTypes = {
    AppStore: PropTypes.object.isRequired,
    CustomerDetailsStore: PropTypes.object.isRequired
}

export default inject('AppStore', 'CustomerDetailsStore')(observer(CustomerDetail));