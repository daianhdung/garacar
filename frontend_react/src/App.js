import { Outlet, Route,BrowserRouter as Router, Routes } from "react-router-dom";
import { publicRoutes } from "./routes/public";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import DefaultLayout from "./layouts/DefaultLayout";
import { Fragment } from "react";

function App() {
    return (
        <>
            <Router>
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
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </div>
            </Router>
        </>
    );
}

export default App;
