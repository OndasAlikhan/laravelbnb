import VuewRouter from 'vue-router'
import Bookables from './bookables/Bookables'


const routes = [
    {
        path: "/",
        component: Bookables,
        name: 'home'
    }
]

const router = new VuewRouter({
    routes,
    mode: 'history'
})

export default router