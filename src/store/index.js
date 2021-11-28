import { createStore } from 'vuex'

export default createStore({
    state: {
        LoginState: false
    },
    mutations: {
        changeLoginState: (state, newValue) => {
            state.LoginState = newValue
        }
    }
})