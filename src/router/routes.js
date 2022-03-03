//全部使用路由懒加载
export default [
    {
        //全部使用路由懒加载
        path: "/center",
        component: () => import('@/pages/Center'),
        meta: { show: true },
        // 二级路由组件
        children: [
            {
                path: 'myorder',
                component: () => import('@/pages/Center/myOrder')
            },
            {
                path: 'grouporder',
                component: () => import('@/pages/Center/groupOrder')
            },
            {
                path: '/center',
                redirect: '/center/myorder'
            },
        ],
    },
    {
        path: "/trade",
        component: () => import('@/pages/Trade'),
        meta: { show: true },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path == '/shopcart') {
                next();
            } else {
                next(false);
            }
        }
    },
    {
        path: "/shopcart",
        component: () => import('@/pages/ShopCart'),
        meta: { show: true }
    },
    {
        path: "/home",
        component: () => import('@/pages/Home'),
        meta: { show: true }
    },
    {
        //params参数必须在path中有一个占位符，不然可能出现问题，例如页面不跳转
        path: "/search/:keyword",
        component: () => import('@/pages/Search'),
        meta: { show: true },
        name: "search",
    },
    {
        path: "/login",
        component: () => import('@/pages/Login'),
        meta: { show: false }
    },
    {
        path: "/register",
        component: () => import('@/pages/Register'),
        meta: { show: false }
    },
    {
        path: "*",
        redirect: "/home"
    },
    {
        path: "/detail/:skuid",
        component: () => import('@/pages/Detail'),
        meta: { show: true }
    },
    {
        path: "/addCartSuccess",
        name: 'addcartsuccess',
        component: () => import('@/pages/AddCartSuccess'),
        meta: { isShow: true },
    },
    {
        path: "/pay",
        component: () => import('@/pages/Pay'),
        meta: { isShow: true },
        beforeEnter(to, from, next) {
            if (from.path == '/trade') {
                next();
            }
            else {
                next(false);
            }
        }
    },
    {
        path: "/paysuccess",
        component: () => import('@/pages/PaySuccess'),
        meta: { isShow: true },
    },
]