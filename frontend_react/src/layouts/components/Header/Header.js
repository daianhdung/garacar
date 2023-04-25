import { Link } from 'react-router-dom';
import images from '~/assets';
import config from '~/config';
import Search from '../Search/Search';

function Header() {
    return (
        <>
            <div className="bg-dark">
                <div className="container-fluid" style={{ maxWidth: '1300px', maxHeight: '40px' }}>
                    <div className="row">
                        <div className="col-md-8">
                            <ul style={{ display: 'flex', justifyContent: 'flex-start' }} className="navbar text-white">
                                <li className="nav-item">
                                    <a href="#" className="text-white">
                                        <i class="bi bi-telephone-fill"></i> 123-456-789
                                    </a>
                                </li>
                                <li className="ms-3 nav-item">
                                    <a href="#" className="text-white">
                                        <i class="bi bi-envelope"></i> contact@yourdomain.com
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-4 text-white">
                            {/* Facebook --> */}
                            <a type="button" className="text-white mt-2 mx-3">
                                <i className="bi bi-facebook"></i>
                            </a>
                            {/* Dribbble --> */}
                            <a type="button" className="text-white mt-2 mx-3">
                                <i className="bi bi-linkedin"></i>
                            </a>
                            {/* Twitter --> */}
                            <a type="button" className="text-white mt-2 mx-3">
                                <i className="bi bi-twitter"></i>
                            </a>
                            {/* Google + --> */}
                            <a type="button" className="text-white mt-2 mx-3">
                                <i className="bi bi-google"></i>
                            </a>
                            {/* Linkedin --> */}
                        </div>
                    </div>
                </div>
            </div>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid" style={{ maxWidth: '1300px' }}>
                    <Link to={config.routes.home} className="me-4">
                        <img style={{ objectFit: 'cover' }} width="120" height="55" src={images.logo} alt="" />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarScroll"
                        aria-controls="navbarScroll"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarScroll">
                        <form className="d-flex search_input" role="search">
                            <Search />
                        </form>
                        <ul
                            style={{ minWidth: '500px', display: 'flex', justifyContent: 'center' }}
                            className="mx-5 navbar-nav"
                        >
                            <li className="nav-item navitem_hover">
                                <a className="nav-link" aria-current="page">
                                    Trang chủ
                                </a>
                            </li>
                            <li className="nav-item navitem_hover">
                                <a className="nav-link">Sản phẩm</a>
                            </li>
                            <li className="nav-item navitem_hover">
                                <a className="nav-link">Liên hệ</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;
