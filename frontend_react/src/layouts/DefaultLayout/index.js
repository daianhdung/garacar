import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import config from '~/config';

function DefaultLayout({children}) {
    const location = useLocation();

    return (
        <>
            <div>
                <Header />
                <div>
                    {location.pathname == config.routes.home ||
                    location.pathname == '/' ? (
                        <>
                        <div style={{maxWidth: '1400px'}} className="container-fluid">
                            {children}
                        </div>
                        </>
                    ) : (
                        <Sidebar/>
                    )}
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default DefaultLayout;
