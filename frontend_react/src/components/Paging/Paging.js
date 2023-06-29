import classNames from 'classnames/bind';
import styles from './Paging.module.scss';

const cx = classNames.bind(styles);

function Paging({ currentPage, totalPage, handleNext, handlePrev, handleSetCurrentPage }) {
    const pageNumbers = [];
    for (let i = 1; i <= totalPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination">
                <li className="page-item">
                    <a
                        className={cx(currentPage == 1 ? 'page-link disabled' : 'page-link')}
                        aria-label="Next"
                        onClick={handlePrev}
                    >
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                {pageNumbers.map((num) => {
                    return (
                        <li className="page-item" key={num}>
                            <a
                                className={cx(currentPage == num ? 'page-link active' : 'page-link')}
                                onClick={() => handleSetCurrentPage(num)}
                                style={{ cursor: 'pointer' }}
                            >
                                {num}
                            </a>
                        </li>
                    );
                })}
                <li className="page-item">
                    <a
                        className={cx(currentPage >= pageNumbers.length ? 'page-link disabled' : 'page-link')}
                        aria-label="Next"
                        onClick={handleNext}
                    >
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
}
export default Paging;
