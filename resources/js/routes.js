import VuewRouter from 'vue-router'
import Bookables from './bookables/Bookables'
import Bookable from './bookable/Bookable'

const routes = [
    {
        path: "/",
        component: Bookables,
        name: 'home'
    },
    {
        path: '/bookable/:id',
        component: Bookable,
        name: 'bookable'
    }
]

const router = new VuewRouter({
    routes,
    mode: 'history'
})

export default router