import {action, configure, observable, flow} from 'mobx';
import {useStaticRendering} from 'mobx-react'
import Router from 'next/router';

const isServer = typeof window === 'undefined';
useStaticRendering(isServer);
configure({
    enforceActions: 'observed',
});

class SignUpStore {
    @observable
    form = {
        email: '',
        password: '',
        rememberMe: false,
    }

    @action
    updateField = (key, value) => {
        this.form[key] = value;
    }

    get isFormFilled() {
        return !!this.form.email && !!this.form.password;
    }

    @action
    handleSubmit = flow(
        function* (AppStore) {
            try {
                AppStore.setUser(this.form);
                AppStore.redirect(null, '/home');
            } catch (e) {
                console.log(e);
            }
        }.bind(this),
    );
}

export default SignUpStore;
