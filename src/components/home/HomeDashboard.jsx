import {inject, observer} from "mobx-react";
import {Button, Grid} from "@material-ui/core";
import React, {useEffect} from "react";
import PropTypes from 'prop-types';
import TableWrapper from "../common/wrappers/TableWrapper";
import TextFieldWrapper from "../common/wrappers/TextFieldWrapper";
import SelectWrapper from '../common/wrappers/SelectWrapper';
import { withStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import config from '../../config';
import AutoCompleteWrapper from '../common/wrappers/AutoCompleteWrapper';

const {apiUrl} = config;
const BootstrapButton = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 14,
        padding: '6px 10px',
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

const styles = theme => ({
    root: {
        color: 'rgba(0, 0, 0, 0.87)',
        cursor: 'text',
        display: 'inline-flex',
        position: 'relative',
        fontSize: '0.7rem',
        boxSizing: 'border-box',
        alignItems: 'center',
        fontFamily: [
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
        fontWeight: 400,
        lineHeight: '1.1876em',
        letterSpacing: '0.00938em',
    },
});

function HomeDashboard({AppStore, HomeStore}) {
    const {
        showVendors,
        handleGo,
        vendors,
        handleFetch,
        handleChange,
        handleTableClick,
        states,
        banks,
        districts,
        form,
        selection,
    } = HomeStore;

    const classes = styles();
    useEffect(() => {
        handleFetch();
    }, []);

    const keys = {
        id: 'id',
        values: ['id', 'name', 'mobile', 'pincode', 'bank'],
    };

    const headers = ['#', 'name', 'mobile no.', 'pincode', 'bank name'];

    const _handleChange = (event) => {
        handleChange(event);
    }

    const _handleGO = (event, section) => {
        event.preventDefault();
        handleGo(section)
    }

    const _handleRowClick = (row) => {
        handleTableClick(row, AppStore);
    }

    return (
        <div className="dashboard">
            <Paper elevation={4}>
                <Grid container spacing={1} item xs={12} className="cardContainer">
                    <Grid container spacing={1} item sm={6} lg={2} className="div_sec">
                        <Grid item xs={12}>
                            <label htmlFor="example2">
                                <span className="number_shape">1</span>
                                <span className="search">Search by Pincode</span>
                            </label>
                        </Grid>
                        <Grid item sm={8} lg={7} xs={8}>
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
                        <Grid item sm={8} lg={8} xs={8}>
                            <AutoCompleteWrapper
                                placeholder={"Select Subdistrict name"}
                                id={"subdistrict"}
                                name={"mySubdistricts"}
                                url={`${apiUrl}/subdistricts?searchTerm=`}
                            />
                        </Grid>
                        <Grid item sm={1}>
                            <BootstrapButton
                                variant="contained"
                                color="primary"
                                onClick={(e) => _handleGO(e,2)}
                                disableRipple>Go</BootstrapButton>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} item sm={6} lg={5} className="div_sec">
                        <Grid item xs={12}>
                            <label htmlFor="example3">
                                <span className="number_shape">3</span>
                                <span className="search">Search by State, District, Bank</span>
                            </label>
                        </Grid>
                        <Grid item sm={12} lg={3} xs={12}>
                            <SelectWrapper
                                name={"state"}
                                value={form.state}
                                onChange={_handleChange}>
                                {states.map((state) => (
                                    <MenuItem  key={state.id} value={state.name}>
                                        {state.name}
                                    </MenuItem>
                                ))}
                            </SelectWrapper>
                        </Grid>
                        <Grid item sm={12} lg={3} xs={12}>
                            <SelectWrapper
                                name={"bank"}
                                value={form.bank}
                                onChange={_handleChange}>
                                {banks.map((bank) => (
                                    <MenuItem  key={bank.id} value={bank.name}>
                                        {bank.name}
                                    </MenuItem>
                                ))}
                            </SelectWrapper>
                        </Grid>
                        <Grid item sm={12} lg={3} xs={12}>
                            <SelectWrapper
                                name={"district"}
                                value={form.district}
                                onChange={_handleChange}>
                                {districts.map((district) => (
                                    <MenuItem  key={district.id} value={district.name}>
                                        {district.name}
                                    </MenuItem>
                                ))}
                            </SelectWrapper>
                        </Grid>
                        <Grid item sm={1}>
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
                        <Grid item xs={12} className={'gps'}>
                            <label htmlFor="example4">
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
                </Grid>
            </Paper>
            <br />
            <Grid item sm={12} lg={7} xs={12} className={'vendors'}>
                {showVendors &&
                <TableWrapper
                    rows={vendors}
                    headers={headers}
                    keys={keys}
                    onClick={_handleRowClick}
                    selection={selection}/>
                }
            </Grid>
        </div>
    )
}

HomeDashboard.propTypes = {
    AppStore: PropTypes.object.isRequired,
    HomeStore: PropTypes.object.isRequired,
}

export default inject('AppStore', 'HomeStore')(observer(HomeDashboard));
