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

const loginAuthConfig = function (from, to, next) {
    var token = LocalStorage.getItem('loggedInUserToken')
    if(token){
        next(to.path);
    }
    else 
        next();

};

export default {
    isLoggedIn,
    loginAuthConfig
};
