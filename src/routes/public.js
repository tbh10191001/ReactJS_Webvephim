const { default: Home } = require('~/pages/Home');
const { default: Login } = require('~/pages/Login');
const { default: Register } = require('~/pages/Register');
const { default: Rules } = require('~/pages/Rules');
const { default: Regulations } = require('~/pages/Regulations');
const { default: Film } = require('~/pages/Film');
const { default: Films } = require('~/pages/Films');
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/rules', component: Rules },
    { path: '/regulations', component: Regulations },
    { path: '/film', component: Film },
    { path: '/films', component: Films },
];

export { publicRoutes };
