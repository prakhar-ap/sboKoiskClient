import Router from 'next/router';

class AppController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    _fetchFromLocal() {
        let user = window.sessionStorage.getItem('user');
        if (user) {
            user = JSON.parse(user);
            return {
                user,
                route: Router.route,
                query: Router.query,
                host: window.location.host,
            };
        }
        return null;
    }

    getInitialProps() {
        return this._fetchFromLocal();
    }

    static clearStorageSession() {
        window.sessionStorage.removeItem('user');
    }
}

export default AppController;
