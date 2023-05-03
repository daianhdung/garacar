import { useEffect } from "react";
import useViewport from "~/hooks/useViewport";
import { MOBILE_VIEWPORT_PX } from "~/utils/constant-var";

const sortList = [
    {
        name: '',
        lable: '----- Sắp xếp -----',
    },
    {
        name: 'nameAsc',
        lable: 'Tên: A-Z',
    },
    {
        name: 'nameDesc',
        lable: 'Tên: Z-A',
    },
    {
        name: 'priceAsc',
        lable: 'Giá tăng dần',
    },
    {
        name: 'priceDesc',
        lable: 'Giá giảm dần',
    },
];

function Sort({ handleSort , value}) {

    const viewPort = useViewport();
    const isMobile = viewPort.width <= MOBILE_VIEWPORT_PX;

    return (
        <div>
            <div
                className="w-100 h-50 p-3 rounded border border-info"
                style={{ background: 'rgba(235, 237, 239, 1)', userSelect: 'none' }}
            >
                <select className={`form-select wm-20 ${isMobile ? 'w-50' : 'w-25'}`} onChange={(e) => handleSort(e)} value={value}>
                    
                    {sortList.map((item) => (
                        <option value={item.name} key={item.name}>
                            {item.lable}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
export default Sort;
