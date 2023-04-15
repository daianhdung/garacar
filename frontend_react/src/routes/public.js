import config from "../config"
import Home from "../pages/Home"


const publicRoutes = [
    { path: '/', component: Home },
    { path: config.routes.home, component: Home },
]

export { publicRoutes}