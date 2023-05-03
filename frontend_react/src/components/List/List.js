import classNames from 'classnames/bind';
import Item from '~/components/Item/Item';

function List({ products }) {
    return (
        <>
            <div
                className="row w-100 mt-3"
                style={{
                    background:
                        'linear-gradient(rgba(255, 255, 255, 0) 22.49%, rgb(255, 255, 255) 73.49%), linear-gradient(264.03deg, rgb(220, 229, 251) -10.27%, rgb(234, 236, 255) 35.65%, rgb(213, 236, 253) 110.66%)',
                }}
            >
                {products.map((product) => (
                    <div className="col-md-3 col-sm-6 col-6 mb-5 hover_boxShadow" key={product.id}>
                        <Item product={product} />
                    </div>
                ))}
            </div>
        </>
    );
}
export default List;
