import axios from 'axios';
import {action, configure, observable, flow} from 'mobx';
import {useStaticRendering} from 'mobx-react'
import config from '../../config';
import TableWrapperStore from "../common/wrappers/TableWrapperStore";

const {apiUrl} = config;
const isServer = typeof window === 'undefined';
useStaticRendering(isServer);
configure({
    enforceActions: 'observed',
});

class HomeStore {
    @observable
    showVendors = false;
    @observable
    vendors = localStorage.getItem('vendors') ? this.getInitialVendors() : [];
    @observable
    form = {
        pincode: '',
        currentPincode: '',
        subDistricts: '',
        bank: '--All Bank--',
        state: '--Select State--',
        district: '--Select District--',
        filterName: '',
        filterPincode: 'All',
        filterMobile: '',
        filterBank: 'All',
    }
    @observable
    states = [{
        id: -1,
        name: '--Select State--'
    }];
    @observable
    banks = [{
        id: -1,
        name: '--All Bank--'
    }];
    @observable
    districts = [{
        id: -1,
        name: '--Select District--'
    }];
    @observable
    subDistricts = [];
    @observable
    selection = '';
    @observable
    filter = {
        name: [],
        mobile: [],
        pincode: new Set(),
        banks: new Set(),
    };
    TableWrapperStore = new TableWrapperStore();

    @action
    displayPreviousState = (val) => {
        this.showVendors = val;
        const st = localStorage.getItem('selection');
        if (st)
            this.selection = st;
        if (this.vendors) {
            this.TableWrapperStore.setData(this.vendors);
            this.segregateVendors();
        }
    }

    @action
    handleGo = (section) => {
        const err = this.validation(section);
        if(err.length > 0) {
            alert(err.join(' , '));
        } else {
            this.fetchVendors(this.generateUrlParams(section));
            this.showVendors = true;
            localStorage.setItem('selection', this.selection);

            this.segregateVendors();
        }
    };

    @action
    segregateVendors = () => {
        this.filter.pincode = new Set();
        this.filter.banks = new Set();

        this.filter.pincode.add('All');
        this.filter.banks.add('All');

        this.vendors.map(vendor => {
            this.filter.name.push(this.createData(vendor.name));
            this.filter.mobile.push(this.createData(vendor.mobile));
            this.filter.pincode.add(vendor.pincode);
            this.filter.banks.add(vendor.bank);
        });

        this.filter.pincode = Array.from(this.filter.pincode).map(pc => this.createData(pc));
        this.filter.banks = Array.from(this.filter.banks).map(bank => this.createData(bank));
    };

    @action
    generateUrlParams = (section) => {
        let constructUrl = new URLSearchParams();
        const state = this.states.filter(k => k.name === this.form.state);
        const bank = this.banks.filter(k => k.name === this.form.bank);
        const district = this.districts.filter(k => k.name === this.form.district);
        let currentPincode = localStorage.getItem('currentPin');

        if(!currentPincode && this.form.currentPincode) {
            localStorage.setItem('currentPin', this.form.currentPincode);
            currentPincode = this.form.currentPincode;
        }

        switch (section) {
            case 1:
                constructUrl.append('pincode', this.form.pincode);
                this.selection = `Pincode:${this.form.pincode}`;
                break;
            case 2:
                constructUrl.append('subDistrict', this.form.subDistricts);
                this.selection = `Subdistrict:${this.form.subDistricts}`;
                break;
            case 3:
                constructUrl.append('stateId', state.length >= 1 ? state[0].id : -1);
                constructUrl.append('bankId', bank.length >= 1  ? bank[0].id : -1);
                constructUrl.append('districtId', district.length >= 1 ? district[0].id : -1);
                this.selection = `State,District,Bank: ${this.form.state},${this.form.district.replaceAll('-', '')},${this.form.bank.replaceAll('-', '')}`;
                break;
            case 4:
                constructUrl.append('pincode', currentPincode);
                this.selection = `Pincode:${currentPincode}`;
                break;
        }
        return constructUrl;
    }

    @action
    handleChange = (event) => {
        this.form[event.target.name] = event.target.value;
        console.log('event: ', event.target.name, event.target.value);
        if(event.target.name === 'state') {
            this.handleStateSelection();
        }
    }

    @action
    handleTableClick = async (row, AppStore) => {
        AppStore.redirect(null, `/home/${row.detailId}`);
    }

    @action
    handleFetch = flow(
        function* () {
            this.banks.push(...yield this.getData('banks'));
            this.states.push(...yield this.getData('states'));
            localStorage.setItem('subdistrict', '');
            const val  = localStorage.getItem('currentPin');
            this.form.currentPincode =  val ? val : '';
        }.bind(this),
    );

    @action
    fetchVendors = flow (
        function* (params) {
            try {
                const temp = yield this.getData(`vendor?${params}`);
                this.vendors = this.formatVendorList(temp);
                localStorage.setItem('vendors', JSON.stringify(this.vendors));
                this.TableWrapperStore.setData(this.vendors);
            } catch (e) {
                this.vendors = [];
            }
        }.bind(this),
    );

    @action
    handleStateSelection = flow(
        function* () {
            const msg1 = '--Select District--';
            const msg2 = '--All Districts--';

            if(this.form.state === '--Select State--') {
                this.districts[0].name = msg1;
                this.form.district = msg1;
                this.districts.splice(1);
            } else {
                this.districts[0].name = msg2;
                this.form.district = msg2;
                const state = this.states.filter(k => k.name === this.form.state);
                this.districts.push(...yield this.getData(`districts?stateId=${state[0].id}`));
            }
        }.bind(this),
    );

    @action
    getData = flow(
        function* (url) {
            const result =  yield axios.get(`${apiUrl}/${url}`);
            return result.data;
        }.bind(this),
    );

    @action
    fetchCurrentIP = flow(
        function* () {
            if(navigator.geolocation) {
                yield navigator.geolocation.getCurrentPosition(function (position) {
                    localStorage.setItem('currLat', position.coords.latitude);
                    localStorage.setItem('currLong', position.coords.longitude);
                }, null, {timeout: 10000});
            }
        }.bind(this),
    );

    @action
    getPincode = flow(
        function* () {
            const lat = localStorage.getItem('currLat');
            const long = localStorage.getItem('currLong');
            console.log(lat, long);
            if(lat && long) {
                const res = yield axios.get(`https://geocode.xyz/${lat},${long}?json=1`);
                console.log('res: ', JSON.stringify(res.data));
                return this.extractPincode(res.data);
            } else {
                alert('Please allow Current Location!!');
            }
        }.bind(this),
    );

    get isFilterFilled() {
        return !!this.form.filterMobile
            || !!this.form.filterName
            || this.form.filterBank !== 'All'
            || this.form.filterPincode !== 'All';
    }

    @action
    handleFilter = () => {
        this.TableWrapperStore.setData(
            this.formatVendorList(
                this.vendors.filter(ven => ven.bank === this.form.filterBank)
            )
        );
    }

    @action
    handleClear = () => {
        this.TableWrapperStore.setData(this.formatVendorList(this.vendors));
        // clear filter values
        this.form.filterBank = 'All';
        this.form.filterName = '';
        this.form.filterPincode = 'All';
        this.form.filterMobile = '';
    }

    getInitialVendors = () => {
        return JSON.parse(localStorage.getItem('vendors'));
    }


    validation = (section) => {
        this.form.subDistricts = localStorage.getItem('subDistricts');
        let err = [];
        switch (section) {
            case 1:
                if(!this.form.pincode) {
                    err.push('Pincode cannot be empty!');
                }
                break;
            case 2:
                if(!this.form.subDistricts) {
                    err.push('Sub district cannot be empty');
                }
                break;
            case 3:
                if(this.form.state === '--Select State--') {
                    err.push('Please select any one state');
                } else if(this.form.bank === '--All Bank--' &&
                    (this.form.district === '--Select District--' || this.form.district === '--All Districts--')) {
                    err.push('Please select any one of the bank or district');
                }
                break;
        }
        return err;
    }

    createData = val => {
        return {
            id: val,
            name: val
        }
    }

    extractPincode(data) {
        if(data.postal) {
            return data.postal;
        }
        if(data.alt.loc) {
            if (Array.isArray(data.alt.loc)) {
                data.alt.loc.forEach(l => {
                    if(l.postal) {
                        return l.postal;
                    }
                })
            } else if (data.alt.loc.postal) {
                return data.alt.loc.postal;
            }
        }
        if(data.poi && data.poi.addr_postcode) {
            return data.poi.addr_postcode;
        }
        return '';
    }

    formatVendorList = (list) => {
        let i = 1;
        list.map(n => {
            n.id = i++;
            n.bank = n.bank ? n.bank.name ? n.bank.name : n.bank : '';
            n.name = n.name.replace('+', '');
        });
        return list;
    }

}

export default HomeStore;
