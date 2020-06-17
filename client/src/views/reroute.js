import {globalBus} from '../main';

export const rerouteMixin = {
    beforeCreate() {


        if(!globalBus.loggedIn) {
            this.$router.push({name: 'Login'});
        }

    }
}