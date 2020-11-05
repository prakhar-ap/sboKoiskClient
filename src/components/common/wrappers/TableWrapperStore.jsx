import {action, configure, observable} from "mobx";
import {useStaticRendering} from 'mobx-react';

const isServer = typeof window === 'undefined';
useStaticRendering(isServer);
configure({
    enforceActions: 'observed',
});

class TableWrapperStore {
    @observable
    data = [];

    @action
    setData = (data) => {
        this.data =  data;
    }
}

export default TableWrapperStore;
