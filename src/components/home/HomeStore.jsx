import axios from 'axios';
import {action, configure, observable, flow} from 'mobx';
import {useStaticRendering} from 'mobx-react'
import config from '../../config';
import {isEmpty} from 'lodash';

const isServer = typeof window === 'undefined';
useStaticRendering(isServer);
configure({
    enforceActions: 'observed',
});

class HomeStore {
    @observable
    showVendors = false;
    @observable
    vendors = {};
    @observable
    banks = {};
    @observable
    form = {
        pincode: '',
        subDistrict: '',
        bank: '',
        state: '',
        district: ''
    }

    @observable
    section = "";

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
            this.showVendors = true;
        }
    };

    @action
    handleChange = (event) => {
        this.form[event.target.name] = event.target.value;
    }

    @action
    handleFetch = flow(
        function* () {
            const {apiUrl} = config;
            this.vendors = yield axios.get(`${apiUrl}/vendors`);
            this.vendors = this.vendors.data.vendors;
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
                if(!this.form.subDistrict) {
                    err.push('Sub district cannot be empty');
                }
                break;
            case 3:
                if(!this.form.state) {
                    err.push('Please select any one state');
                } else if(isEmpty(this.form.bank) && isEmpty(this.form.district)) {
                    err.push('Please select any one of the bank or district');
                }
                break;
        }
        return err;
    }
}

export default HomeStore;
