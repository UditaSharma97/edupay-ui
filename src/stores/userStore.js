import {extendObservable} from 'mobx';

class UserStore{
    constructor(){
        extendObservable(this,{
            loadign:true,
            isLoggedIn: false,
            username: ''
        })
    }
}

export default new UserStore();
