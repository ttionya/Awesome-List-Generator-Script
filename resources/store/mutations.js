import { checkServer } from '../functions';


// Try to get server information from LocalStorage
export const getServerInfo = state => {
    let serverInfo = localStorage.getItem('server');

    if (serverInfo) {
        try {
            state.server = JSON.parse(serverInfo);
        }
        catch (e) { }

        if (checkServer(state.server.host, state.server.port, state.server.key)) {
            // Connection

            state.connected = true;
            state.activeComponent = 'home';
        }
        else {
            state.server.host = state.server.host || '';
            state.server.port = state.server.port || '';
            state.server.key = state.server.key || '';
            state.activeComponent = 'setting';
        }
    }
    else {

        // New user
        state.activeComponent = 'welcome';
    }
};


export const changeComponent = (state, component) => state.activeComponent = component;


export const loadingStatus = (state, { visible, text }) => state.loading = { visible: visible, text: text };