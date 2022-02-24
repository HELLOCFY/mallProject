import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Detail from '@/pages/Detail';
export default [
    {
        path: "/home",
        component: Home,
        meta: { show: true }
    },
    {
        //params参数必须在path中有一个占位符，不然可能出现问题，例如页面不跳转
        path: "/search/:keyword",
        component: Search,
        meta: { show: true },
        name: "search",
    },
    {
        path: "/login",
        component: Login,
        meta: { show: false }
    },
    {
        path: "/register",
        component: Register,
        meta: { show: false }
    },
    {
        path: "*",
        redirect: "/home"
    },
    {
        path:"/detail/:skuid",
        component:Detail,
        meta: { show:true}
    }
]