import { LocalStorage } from 'quasar'

const isLoggedIn = function (from, to, next) {
    var token = LocalStorage.getItem('loggedInUserToken')
    if(!token) {
        next({name:'pathAuth'})
    }
    else {
        next();
    }
};

export default {
    isLoggedIn
};
