import { Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { adminRoutes, authRoutes, publicRoutes } from './routes/public';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import DefaultLayout from './layouts/DefaultLayout';
import { Fragment } from 'react';
import GuardNotLogin from './config/guard/GuardNotLogin';
import GuardAdmin from './config/guard/GuardAdmin';
import { CartProvider } from './context/CartProvider';
import { FilterProvider } from './context/FilterProvider';
import { AuthProvider } from './context/AuthProvider';

function App() {
    return (
        <Router>
            {/* <CartProvider>
                <FilterProvider> */}
                    <AuthProvider>
                        <div className="App">
                            <Outlet />
                            <Routes>
                                {publicRoutes.map((route, index) => {
                                    const Page = route.component;
                                    let Layout = DefaultLayout;
                                    if (route.layout) {
                                        Layout = route.layout;
                                    } else if (route.layout === null) {
                                        Layout = Fragment;
                                    }
                                    return (
                                        <Route
                                            key={index}
                                            path={route.path}
                                            element={
                                                <Layout>
                                                    <Page />
                                                </Layout>
                                            }
                                        />
                                    );
                                })}
                                <Route element={<GuardNotLogin />}>
                                    {authRoutes.map((route, index) => {
                                        //nếu không có layout trong item thì mặc định là LayoutDefault
                                        const Page = route.component;
                                        let Layout = DefaultLayout;
                                        if (route.layout) {
                                            Layout = route.layout;
                                        } else if (route.layout === null) {
                                            Layout = Fragment;
                                        }
                                        return (
                                            <Route
                                                key={index}
                                                path={route.path}
                                                element={
                                                    <Layout>
                                                        <Page />
                                                    </Layout>
                                                }
                                            />
                                        );
                                    })}
                                </Route>

                                <Route element={<GuardAdmin />}>
                                    {adminRoutes.map((route, index) => {
                                        //nếu không có layout trong item thì mặc định là LayoutDefault
                                        const Page = route.component;
                                        let Layout = DefaultLayout;
                                        if (route.layout) {
                                            Layout = route.layout;
                                        } else if (route.layout === null) {
                                            Layout = Fragment;
                                        }
                                        return (
                                            <Route
                                                key={index}
                                                path={route.path}
                                                element={
                                                    <Layout>
                                                        <Page />
                                                    </Layout>
                                                }
                                            />
                                        );
                                    })}
                                </Route>
                                <Route path="*" element={<PageNotFound />} />
                            </Routes>
                        </div>
                    </AuthProvider>
                {/* </FilterProvider>
            </CartProvider> */}
        </Router>
    );
}

export default App;
