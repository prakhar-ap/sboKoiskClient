import {inject, observer} from "mobx-react";
import {Button, Divider, Grid} from "@material-ui/core";
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
import makeStyles from "@material-ui/core/styles/makeStyles";
import FormWrapper from "../common/wrappers/FormWrapper";

const {apiUrl} = config;
const BootstrapButton = withStyles({
    root: {
        textTransform: 'none',
        fontSize: 14,
        padding: '6px 10px',
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: 'transparent',
        color: '#32c5d2',
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
            borderColor: '#32c5d2',
        },
        '&:active': {
            borderColor: '#32c5d2',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
        '&:disabled':{
            backgroundColor: 'transparent',
            color: '#32c5d2',
            boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
        }
    },
})(Button);

const light = makeStyles((theme) => ({
    root: {
        color: 'black',
    },
    menuItem: {
        backgroundColor: 'white',
        color: 'black',
        '&:hover': {
            background: 'grey'
        },
    },
    autocomplete: {
        fontSize: '0.7em',
    },
}));

const dark = makeStyles((theme) => ({
    root: {
        color: 'whitesmoke',
        backgroundColor: '#333',
    },
    menuItem: {
        backgroundColor: '#333',
        color: 'black',
        '&:hover': {
            background: '#707070',
        },
        '.Mui-select': {
            color: 'black',
            backgroundColor: 'white',
        }
    },
    autocomplete: {
        fontSize: '0.7em',
    },
}));

function HomeDashboard({AppStore, HomeStore}) {
    const pincodeRef = React.createRef();
    const subdistrictRef = React.createRef();

    const {
        showVendors,
        handleGo,
        handleFetch,
        handleChange,
        handleTableClick,
        handleFilter,
        TableWrapperStore,
        handleClear,
        fetchCurrentIP,
        getPincode,
        displayPreviousState,
        states,
        banks,
        districts,
        form,
        filter,
        isFilterFilled,
        selection,
    } = HomeStore;

    useEffect(() => {
        handleFetch();
        if (localStorage.getItem('vendors')) {
            displayPreviousState(true);
        }
    }, []);

    const classes = !AppStore.isDark ? light() : dark();
    const section = !AppStore.isDark ? 'div_sec light_sec' : 'div_sec dark_sec';

    const keys = {
        id: 'id',
        values: ['id', 'name', 'mobile', 'pincode', 'bank'],
    };

    const headers = ['#', 'name', 'mobile no.', 'pincode', 'bank name'];

    const _handleChange = (event) => {
        handleChange(event);
    }

    const handleCurrentPincode = async () => {
        if(!form.currentPincode || form.currentPincode.length > 6) {
            await fetchCurrentIP();
            form.currentPincode = await getPincode();
            localStorage.setItem('currentPin', form.currentPincode);
        }
    }
    const _handleGO = async (event, section) => {
        event.preventDefault();
        if(section === 4) {
           await handleCurrentPincode();
        }
        handleGo(section);
    }

    const _handleRowClick = (row) => {
        handleTableClick(row, AppStore);
    }

    const _handleFilter = (e) => {
        e.preventDefault();
        handleFilter();
    }

    const _handleClear = (e) => {
        e.preventDefault();
        handleClear();
    }

    return (
        <div className="dashboard">
            <Paper elevation={10} className={classes.root}>
                <Grid container spacing={1} item xs={12} className="cardContainer">
                    <Grid container spacing={1} item sm={6} lg={2} className={section}>
                        <Grid item xs={12}>
                            <label htmlFor="example2">
                                <span className="number_shape">1</span>
                                <span className="search">Search by Pincode</span>
                            </label>
                        </Grid>
                        <Grid item sm={8} lg={7} xs={8}>
                            <FormWrapper
                                className="form"
                                formRef={pincodeRef}
                                onSubmit={(e) => _handleGO(e, 1)}
                                isValid>
                                    <TextFieldWrapper
                                        name={"pincode"}
                                        value={form.pincode}
                                        placeholder={'Enter Pincode'}
                                        type="text"
                                        variant="outlined"
                                        isDark={AppStore.isDark}
                                        onChange={_handleChange}/>
                            </FormWrapper>
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
                    <Grid container spacing={1} item sm={6} lg={3} className={section}>
                        <Grid item xs={12}>
                            <label htmlFor="example1">
                                <span className="number_shape">2</span>
                                <span className="search">Search by Sub district</span>
                            </label>
                        </Grid>
                        <Grid item sm={8} lg={8} xs={8}>
                            <FormWrapper
                                className="form"
                                formRef={subdistrictRef}
                                onSubmit={(e) => _handleGO(e, 2)}
                                isValid>
                                    <AutoCompleteWrapper
                                        placeholder={"Select Subdistrict name"}
                                        id={"subDistricts"}
                                        name={"subDistricts"}
                                        url={`${apiUrl}/subdistricts?searchTerm=`}
                                        isDark={AppStore.isDark}
                                        value={form.subDistricts}
                                        onChange={_handleChange}
                                    />
                            </FormWrapper>
                        </Grid>
                        <Grid item sm={1}>
                            <BootstrapButton
                                variant="contained"
                                color="primary"
                                onClick={(e) => _handleGO(e,2)}
                                disableRipple>Go</BootstrapButton>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} item sm={6} lg={5} className={section}>
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
                                isDark={AppStore.isDark}
                                className={classes.select}
                                onChange={_handleChange}>
                                {states.map((state) => (
                                    <MenuItem
                                        className={classes.menuItem}
                                        key={state.id} value={state.name}>
                                        {state.name}
                                    </MenuItem>
                                ))}
                            </SelectWrapper>
                        </Grid>
                        <Grid item sm={12} lg={3} xs={12}>
                            <SelectWrapper
                                name={"bank"}
                                value={form.bank}
                                isDark={AppStore.isDark}
                                onChange={_handleChange}>
                                {banks.map((bank) => (
                                    <MenuItem
                                        className={classes.menuItem}
                                        key={bank.id} value={bank.name}>
                                        {bank.name}
                                    </MenuItem>
                                ))}
                            </SelectWrapper>
                        </Grid>
                        <Grid item sm={12} lg={3} xs={12}>
                            <SelectWrapper
                                name={"district"}
                                value={form.district}
                                isDark={AppStore.isDark}
                                onChange={_handleChange}>
                                {districts.map((district) => (
                                    <MenuItem
                                        className={classes.menuItem}
                                        key={district.id} value={district.name}>
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
                    <Grid container spacing={1} item sm={6} lg={2} className={section}>
                        <span className="number_shape fourth">4</span>
                        <span className="search">GPS</span>
                        <br /><br />
                        <div className="gps">
                            <BootstrapButton
                                variant="contained"
                                color="primary"
                                onClick={(e) => _handleGO(e,4)}
                                disableRipple>
                                Use my location
                            </BootstrapButton>
                        </div>
                    </Grid>
                </Grid>
            </Paper>
            <br />
            {showVendors && ( // filters
                <Grid container spacing={2} item xs={12} className={'filters'}>
                    <Grid item xs={3}>
                        <AutoCompleteWrapper
                            id={'filterName'}
                            name={"filterName"}
                            inputArray={filter.name}
                            isDark={AppStore.isDark}
                            label="Name"
                            value={form.filterName}
                            onChange={_handleChange}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <SelectWrapper
                            name={"filterPincode"}
                            value={form.filterPincode}
                            isDark={AppStore.isDark}
                            label="Pincode"
                            onChange={_handleChange}>
                            {filter.pincode.map((pc) => (
                                <MenuItem
                                    className={classes.menuItem}
                                    key={pc.id} value={pc.name}>
                                    {pc.name}
                                </MenuItem>
                            ))}
                        </SelectWrapper>
                    </Grid>
                    <Grid item xs={2}>
                        <SelectWrapper
                            name={"filterBank"}
                            value={form.filterBank}
                            isDark={AppStore.isDark}
                            label="Bank"
                            onChange={_handleChange}>
                            {filter.banks.map((bank) => (
                                <MenuItem
                                    className={classes.menuItem}
                                    key={bank.id} value={bank.name}>
                                    {bank.name}
                                </MenuItem>
                            ))}
                        </SelectWrapper>
                    </Grid>
                    <Grid item xs={1} className={'filterButton'}>
                        <BootstrapButton
                            variant="contained"
                            color="primary"
                            style={{width: '100%'}}
                            onClick={_handleFilter}
                            disabled={!isFilterFilled}>
                            Filter
                        </BootstrapButton>
                    </Grid>
                    <Grid item xs={1} className={'filterButton'}>
                        <BootstrapButton
                            variant="contained"
                            color="primary"
                            style={{width: '100%'}}
                            onClick={_handleClear}
                            disabled={!isFilterFilled}>
                            Clear
                        </BootstrapButton>
                    </Grid>
                </Grid>
            )}
            <Grid item sm={12} lg={7} xs={12} className={'vendors'}>
                {showVendors === true ? (
                <TableWrapper
                    TableWrapperStore={TableWrapperStore}
                    headers={headers}
                    keys={keys}
                    onClick={_handleRowClick}
                    selection={selection}
                    theme={AppStore.isDark}/>
                ) : (
                    <Paper className={'hiddenVendors'} elevation={4}>
                        <Grid item xs={12} className={'hidden'}></Grid>
                        <Divider />
                    </Paper>
                )}
            </Grid>
        </div>
    )
}

HomeDashboard.propTypes = {
    AppStore: PropTypes.object.isRequired,
    HomeStore: PropTypes.object.isRequired,
}

export default inject('AppStore', 'HomeStore')(observer(HomeDashboard));
