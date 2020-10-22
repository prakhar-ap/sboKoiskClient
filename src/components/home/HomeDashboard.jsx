import {inject, observer} from "mobx-react";
import {Card, Button, Grid, CardContent} from "@material-ui/core";
import React, {useEffect} from "react";
import PropTypes from 'prop-types';
import TableWrapper from "../common/wrappers/TableWrapper";
import TextFieldWrapper from "../common/wrappers/TextFieldWrapper";
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { green, purple } from '@material-ui/core/colors';

const BootstrapButton = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 14,
        padding: '6px 12px',
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: '#3598dc',
        borderColor: '#3598dc',
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            backgroundColor: '#0069d9',
            borderColor: '#0062cc',
            boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#0062cc',
            borderColor: '#005cbf',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);

function HomeDashboard({AppStore, HomeStore}) {
    const {
        showVendors,
        handleGo,
        vendors,
        handleFetch,
        handleChange,
        form,
    } = HomeStore;

    useEffect(() => {
        handleFetch();
    }, []);


    const keys = {
        id: 'id',
        values: ['id', 'name', 'bankName', 'mobile', 'pincode'],
    };

    const headers = ['id', 'name', 'bankName', 'mobile', 'pincode'];

    const _handleChange = (event) => {
        handleChange(event);
    }

    const _handleGO = (event, section) => {
        event.preventDefault();
        handleGo(section)
    }

    return (
        <div className="dashboard">
            <Card>
                <Grid container spacing={1} item xs={12} className="cardContainer">
                    <Grid container spacing={1} item sm={6} lg={2} className="div_sec">
                        <Grid item xs={12}>
                            <label htmlFor="example2">
                                <span className="number_shape">1</span>
                                <span className="search">Search by Pincode</span>
                            </label>
                        </Grid>
                        <Grid item sm={6} lg={7}>
                            <TextFieldWrapper
                                name={"pincode"}
                                value={form.pincode}
                                placeholder={'Enter Pincode'}
                                type="text"
                                variant="outlined"
                                onChange={_handleChange}/>
                        </Grid>
                        <Grid item sm={4}>
                            <BootstrapButton
                                variant="contained"
                                color="primary"
                                onClick={(e) => _handleGO(e,1)}
                                disableRipple>
                                Go
                            </BootstrapButton>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} item sm={6} lg={3} className="div_sec">
                        <Grid item xs={12}>
                            <label htmlFor="example1">
                                <span className="number_shape">2</span>
                                <span className="search">Search by Sub district</span>
                            </label>
                        </Grid>
                        <Grid item sm={6} lg={8}>
                            <TextFieldWrapper
                                name={"subDistrict"}
                                value={form.subDistrict}
                                type="text"
                                placeholder={'Enter SubDistrict Name'}
                                variant="outlined"
                                onChange={_handleChange}/>
                        </Grid>
                        <Grid item sm={2}>
                            <BootstrapButton
                                variant="contained"
                                color="primary"
                                onClick={(e) => _handleGO(e,2)}
                                disableRipple>
                                Go
                            </BootstrapButton>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} item sm={6} lg={5} className="div_sec">
                        <Grid item xs={12}>
                            <label htmlFor="example3">
                                <span className="number_shape">3</span>
                                <span className="search">Search by State, District, Bank</span>
                            </label>
                        </Grid>
                        <Grid item sm={2} lg={3}>
                            <TextFieldWrapper
                                name={"state"}
                                value={form.state}
                                type="text"
                                variant="outlined"
                                onChange={_handleChange}/>
                        </Grid>
                        <Grid item sm={2} lg={3}>
                            <TextFieldWrapper
                                name={"bank"}
                                value={form.bank}
                                type="text"
                                variant="outlined"
                                onChange={_handleChange}/>
                        </Grid>
                        <Grid item sm={3} lg={3}>
                            <TextFieldWrapper
                                name={"district"}
                                value={form.district}
                                type="text"
                                variant="outlined"
                                onChange={_handleChange}/>
                        </Grid>
                        <Grid item sm={2}>
                            <BootstrapButton
                                variant="contained"
                                color="primary"
                                onClick={(e) => _handleGO(e,3)}
                                disableRipple>
                                Go
                            </BootstrapButton>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} item sm={6} lg={2} className="div_sec">
                        <Grid item xs={12}>
                            <label htmlFor="example2">
                                <span className="number_shape">4</span>
                                <span className="search">GPS</span>
                            </label>
                        </Grid>
                        <Grid item sm={6} lg={12}>
                            <BootstrapButton
                                variant="contained"
                                color="primary"
                                onClick={(e) => _handleGO(e,4)}
                                disableRipple>
                                Use my location
                            </BootstrapButton>
                        </Grid>
                    </Grid>
                    <Grid item sm={10} lg={6}>
                        {showVendors &&
                        <TableWrapper rows={vendors} headers={headers} keys={keys}/>
                        }
                    </Grid>
                </Grid>
            </Card>
        </div>
    )
}

HomeDashboard.propTypes = {
    AppStore: PropTypes.object.isRequired,
    HomeStore: PropTypes.object.isRequired,
}

export default inject('AppStore', 'HomeStore')(observer(HomeDashboard));
