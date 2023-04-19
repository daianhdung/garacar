import { Link } from 'react-router-dom';
import images from '~/assets';
import config from '~/config';
import Search from '../Search/Search';

function Header() {
    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <Link to={config.routes.home} className="mx-4">
                    <img style={{objectFit: 'cover'}} width="120" height="55" src={images.logo} alt="" />
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
                            <a className="nav-link active" aria-current="page">
                                Home
                            </a>
                        </li>
                        <li className="nav-item navitem_hover">
                            <a className="nav-link">Product</a>
                        </li>
                        <li className="nav-item navitem_hover">
                            <a className="nav-link">Contact</a>
                        </li>
                    </ul>
                    <ul className="mx-5 navbar-nav me-auto mb-2 mb-lg-0">
                        <li>
                            <Link to={config.routes.login} className="nav-link">
                                Login
                            </Link>
                        </li>
                        <li>
                            <a className="nav-link">
                                Signup
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;
