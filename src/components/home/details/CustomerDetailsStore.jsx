import config from "../../../config";
import {useStaticRendering} from "mobx-react";
import {action, configure, observable, flow} from "mobx";
import axios from "axios";

const {apiUrl} = config;
const isServer = typeof window === 'undefined';
useStaticRendering(isServer);
configure({
    enforceActions: 'observed',
});
class CustomerDetailsStore {

    @observable
    loading = false;
    @observable
    error = false;
    @observable
    details = {
        bcDetailId: '',
        name: '',
        mobile: '',
        pincode: '',
        subDistrict: '',
        bank: '',
        district: '',
        state: '',
        days: '',
        endTime: '',
        startTime: '',
    }

    @action
    setCustomerId = (customerId) => {
        console.log('customerId: ', customerId);
        this.details.bcDetailId = customerId;
    }

    @action
    handleFetch = flow(
        function* () {
            this.loading = true;
            try {
                const customer = yield this.getData(`customer/${this.details.bcDetailId}`);
                customer.bank = customer.bank.name;
                customer.state = customer.state.name;
                customer.district = customer.district.name;
                this.details = customer;
            } catch (e) {
                this.error = true;
            }
            this.loading = false;
        }.bind(this),
    );

    @action
    getData = flow(
        function* (url) {
            const result =  yield axios.get(`${apiUrl}/${url}`);
            return result.data;
        }.bind(this),
    );
}

export default CustomerDetailsStore;
