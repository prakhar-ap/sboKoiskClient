import {action, configure, flow, observable} from 'mobx';
import {useStaticRendering} from 'mobx-react';
import Router from 'next/router';

const isServer = typeof window === 'undefined';
useStaticRendering(isServer);
configure({enforceActions: 'observed'});

let store = null;

class AppStore {
    @observable
    user = {
        name: 'Prakhar Khandelwal',
        address: '4/424, Jawahar Nagar',
        city: 'Jaipur',
        state: 'Rajasthan',
        country: 'India'
    };
    @observable
    link = {};
    @observable
    pathname = '';

    @action
    setUser(user) {
        this.user = user;
        this.saveToStorage('user', user);
    }

    @action
    setPath(pathname) {
        this.pathname = pathname;
    }

    @action
    handleSignOut = flow(
        function* () {
            try {
                yield Promise.all([
                    Router.push('/signin'),
                ]);
                this.clearSession();
            } catch (e) {
                console.error(e);
            }
        }.bind(this),
    );

    get isServer() {
        return typeof window === 'undefined';
    }

    saveToStorage(key, item) {
        if (!this.isServer) {
            window.sessionStorage.setItem(key, JSON.stringify(item));
        }
    }

    @action
    redirect = (data, url) => {
        if (!this.isServer) {
            window.history.pushState(data, null, url);
            window.location.reload(true);
        }
    }

    @action
    clearSession() {
        this.user = {};
        this.link = {};
        this.pathname = '';
    }
}

export function getAppStore(getNew) {
    if (isServer || getNew) {
        return new AppStore();
    } else {
        if(store == null) {
            store = new AppStore();
        }
        return store;
    }
}

export default new AppStore();
