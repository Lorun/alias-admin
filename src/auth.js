/**
 * Authenticate
 */
class Auth {
    constructor(provider) {
        this.provider = provider || window.localStorage;
        this.token = false;
    }

    isLogged() {
        if(!this.token) {
            this.token = this.provider.getItem('token') || false;
        }
        return !!this.token;
    }

    login(token) {
        this.provider.setItem('token', token);
        this.token = token;
    }

    logout() {
        this.provider.removeItem('token');
        this.token = false;
    }
}

const auth = new Auth();

export default auth;