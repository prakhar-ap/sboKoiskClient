import config from "../../../config";
import {useStaticRendering} from "mobx-react";
import {action, configure, observable} from "mobx";

const {apiUrl} = config;
const isServer = typeof window === 'undefined';
useStaticRendering(isServer);
configure({
    enforceActions: 'observed',
});
class CustomerDetailsStore {

    @observable
    details = {
        id: '',
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
        this.details.id = customerId.slice(4);
    }
}

export default  CustomerDetailsStore;