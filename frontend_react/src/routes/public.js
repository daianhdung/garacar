import AdminLayout from '~/layouts/AdminLayout';
import AuthenLayout from '~/layouts/AuthenLayout';
import BrandAdmin from '~/pages/AdminPages/BrandAdmin';
import InsertBrand from '~/pages/AdminPages/BrandAdmin/Insert/InsertBrand';
import UpdateBrand from '~/pages/AdminPages/BrandAdmin/Update/UpdateBrand';
import CategoryAdmin from '~/pages/AdminPages/CategoryAdmin';
import InsertCategory from '~/pages/AdminPages/CategoryAdmin/Insert/InsertCategory';
import UpdateCategory from '~/pages/AdminPages/CategoryAdmin/Update/UpdateCategory';
import HomeAdmin from '~/pages/AdminPages/HomeAdmin';
import Login from '~/pages/AuthenPages/Login/Login';
import config from '../config';
import Home from '../pages/Home';
import ProductAdmin from '~/pages/AdminPages/ProductAdmin';
import InsertProduct from '~/pages/AdminPages/ProductAdmin/Insert/InsertProduct';
import UpdateProduct from '~/pages/AdminPages/ProductAdmin/Update/UpdateProduct';
import UserAdmin from '~/pages/AdminPages/UserAdmin';
import InsertUser from '~/pages/AdminPages/UserAdmin/Insert/InsertUser';
import UpdateUser from '~/pages/AdminPages/UserAdmin/Update/UpdateUser';

const publicRoutes = [
    { path: '/', component: Home },
    { path: config.routes.home, component: Home },
];
const authRoutes = [{ path: config.routes.login, component: Login, layout: AuthenLayout }];

const adminRoutes = [
    { path: config.routes.adminHome, component: HomeAdmin, layout: AdminLayout },
    // { path: config.routes.adminProfile, component: Profile, layout: AdminLayout },
    // { path: config.routes.adminChangePassword, component: Profile, layout: AdminLayout },
    // //Admin Product
    { path: config.routes.adminProduct, component: ProductAdmin, layout: AdminLayout },
    { path: config.routes.adminProductInsert, component: InsertProduct, layout: AdminLayout },
    { path: config.routes.adminProductUpdate, component: UpdateProduct, layout: AdminLayout },
    // //Admin Order
    // { path: config.routes.adminOrder, component: OrderAdmin, layout: AdminLayout },
    // { path: config.routes.adminOrderUpdate, component: UpdateOrder, layout: AdminLayout },
    // //Admin Coupon
    // { path: config.routes.adminCoupon, component: CouponAdmin, layout: AdminLayout },
    // { path: config.routes.adminCouponUpdate, component: UpdateCoupon, layout: AdminLayout },
    // { path: config.routes.adminCouponInsert, component: InsertCoupon, layout: AdminLayout },
    // //Admin User
    { path: config.routes.adminUser, component: UserAdmin, layout: AdminLayout },
    { path: config.routes.adminUserInsert, component: InsertUser, layout: AdminLayout },
    { path: config.routes.adminUserUpdate, component: UpdateUser, layout: AdminLayout },
    // //Admin Brand
    { path: config.routes.adminBrand, component: BrandAdmin, layout: AdminLayout },
    { path: config.routes.adminBrandInsert, component: InsertBrand, layout: AdminLayout },
    { path: config.routes.adminBrandUpdate, component: UpdateBrand, layout: AdminLayout },
    // //Admin Category
    { path: config.routes.adminCategory, component: CategoryAdmin, layout: AdminLayout },
    { path: config.routes.adminCategoryInsert, component: InsertCategory, layout: AdminLayout },
    { path: config.routes.adminCategoryUpdate, component: UpdateCategory, layout: AdminLayout },
];

export { publicRoutes, authRoutes, adminRoutes };

