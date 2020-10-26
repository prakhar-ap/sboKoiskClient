import axios from 'axios';
import {action, configure, observable, flow} from 'mobx';
import {useStaticRendering} from 'mobx-react'
import config from '../../config';

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
    vendors = [];
    @observable
    form = {
        pincode: '',
        subDistricts: '',
        bank: '--Select Bank--',
        state: '--Select State--',
        district: '--Select District--'
    }
    @observable
    states = [{
        id: -1,
        name: '--Select State--'
    }];
    @observable
    banks = [{
        id: -1,
        name: '--Select Bank--'
    }];
    @observable
    districts = [{
        id: -1,
        name: '--Select District--'
    }];
    @observable
    subDistricts = [];
    @observable
    selectedSubDistrict = null;

    @action
    handleGo = (section) => {
        const err = this.validation(section);
        if(err.length > 0) {
            alert(err.join(' , '));
        } else {
            if (section === 4) { // GPS location
                if(window.navigator.geolocation) {
                    window.navigator.geolocation.getCurrentPosition(function (position) {
                        console.log('Latitude: ' , position.coords.latitude);
                        console.log('Longitude: ' , position.coords.longitude);
                    });
                }
            }
            this.fetchVendors(this.generateUrlParams(section));
            this.showVendors = true;
        }
    };

    @action
    generateUrlParams = (section) => {
        let constructUrl = new URLSearchParams();
        const state = this.states.filter(k => k.name === this.form.state);
        const bank = this.banks.filter(k => k.name === this.form.bank);
        const district = this.districts.filter(k => k.name === this.form.district);

        switch (section) {
            case 1:
            case 4:
                constructUrl.append('pincode', this.form.pincode);
                break;
            case 2:
                constructUrl.append('subDistrict', this.form.subDistricts);
                break;
            case 3:
                constructUrl.append('stateId', state.length >= 1 ? state[0].id : -1);
                constructUrl.append('bankId', bank.length >= 1  ? bank[0].id : -1);
                constructUrl.append('districtId', district.length >= 1 ? district[0].id : -1);
                break;
        }
        return constructUrl;
    }

    @action
    handleChange = (event) => {
        this.form[event.target.name] = event.target.value;
        if(event.target.name === 'state') {
            this.handleStateSelection();
        }
    }

    @action
    updateSelectedSubdistricts = (selectedSubDistrict) => {
        this.form.subDistricts = selectedSubDistrict;
    };

    @action
    formatVendorList = (list) => {
        let i = 1;
        list.map(n => {
           n.id = i++;
           n.bank = n.bank ? n.bank.name : '';
        });
        return list;
    }

    @action
    handleTableClick = (event, AppStore) => {
        AppStore.redirect(null, `/customer?id=${this.form.pincode}`);
    }

    @action
    handleFetch = flow(
        function* () {
            this.banks.push(...yield this.getData('banks'));
            this.states.push(...yield this.getData('states'));
        }.bind(this),
    );

    @action
    fetchVendors = flow (
        function* (params) {
            const temp = yield this.getData(`vendor?${params}`);
            this.vendors = temp ? this.formatVendorList(temp) : [];
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
    handleAutoComplete = flow(
        function* (event, value) {
            event.preventDefault();
            if(!value) {
                this.updateSelectedSubdistricts('');
            } else {
                this.updateSelectedSubdistricts(value);
                const val = yield this.getData(`subdistricts?searchTerm=${value}`);
                this.subDistricts = val ? val : [];
                console.log('Form: ', this.form.subDistricts);
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

    validation = (section) => {
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
                } else if(this.form.bank === '--Select Bank--' &&
                    (this.form.district === '--Select District--' || this.form.district === '--All Districts--')) {
                    err.push('Please select any one of the bank or district');
                }
                break;
        }
        return err;
    }
}

export default HomeStore;
