import { checkServer } from '../functions';


// Try to get server information from LocalStorage
export const getServerInfo = (state) => {
    let serverInfo = localStorage.getItem('server');

    if (serverInfo) {
        try {
            state.server = JSON.parse(serverInfo);
        }
        catch (e) { }

        if (checkServer(state.server.host, state.server.port, state.server.key)) {
            // Connection

            this.activeComponent = 'home';
        }
        else {
            state.activeComponent = 'setting';
        }
    }
    else {

        // New user
        state.activeComponent = 'welcome';
    }
};