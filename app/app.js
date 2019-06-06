import Vue from 'nativescript-vue';

import routes from "./routes";

// Uncommment the following to see NativeScript-Vue output logs
// Vue.config.silent = false;

new Vue({
    render: h => h("frame", [h(routes.login)])
}).$start();
// new Vue({

//     template: `
//         <Frame>
//             <Login />
//         </Frame>`,

//     components: {
//         Login
//     }
// }).$start();