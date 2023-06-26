import { useEffect } from "react";
import useViewport from "~/hooks/useViewport";
import constantObject from '~/utils/constant-var';

const sortList = [
    {
        name: '',
        label: '----- Sắp xếp -----',
    },
    {
        name: 'nameAsc',
        label: 'Tên: A-Z',
    },
    {
        name: 'nameDesc',
        label: 'Tên: Z-A',
    },
    {
        name: 'priceAsc',
        label: 'Giá tăng dần',
    },
    {
        name: 'priceDesc',
        label: 'Giá giảm dần',
    },
];

function Sort({ handleSort , value}) {

    const viewPort = useViewport();
    const isMobile = viewPort.width <= constantObject.MOBILE_VIEWPORT_PX;

    return (
        <div>
            <div
                className="w-100 h-50 p-3 rounded border border-info"
                style={{ background: 'rgba(235, 237, 239, 1)', userSelect: 'none' }}
            >
                <select className={`form-select wm-20 ${isMobile ? 'w-50' : 'w-25'}`} onChange={(e) => handleSort(e)} value={value}>
                    
                    {sortList.map((item) => (
                        <option value={item.name} key={item.name}>
                            {item.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
export default Sort;
