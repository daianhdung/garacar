import { createContext, useState } from 'react';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [filter, setFilter] = useState({
        searchKeyword: '',
        brandIds: [],
        categoryIds: [],
        currentPage: 1,
        totalItemEachPage: '12',
        sortType: '',
    });


    const handleFilter = (newFilter) => {
        setFilter({
            ...filter,
            ...newFilter,
        });
    };

    const handleKeyword = (name) => {
        console.log(name);
        setFilter({
            ...filter,
            searchKeyword : name
        })
    }

    const handleCheckCategory = (id) => {
        const isChecked = filter.categoryIds.includes(id);
        let arrayCheck = filter.categoryIds;
        if (isChecked) {
            arrayCheck = arrayCheck.filter((item) => item !== id);
        } else {
            arrayCheck.push(id);
        }
        setFilter({ ...filter, categoryIds: arrayCheck });
    };

    const handleCheckBrand = (id) => {
        const isChecked = filter.brandIds.includes(id);
        let arrayCheck = filter.brandIds;
        if (isChecked) {
            arrayCheck = arrayCheck.filter((item) => item !== id);
        } else {
            arrayCheck.push(id);
        }
        setFilter({ ...filter, brandIds: arrayCheck });
    };

    const handleClickBrand = (idBrand) => {
        setFilter({ ...filter, brandIds: [idBrand] });
    };

    const handleClickCate = (idCate) => {
        setFilter({ ...filter, categoryIds: [idCate] });
    };

    const handleSort = (e) => {
        setFilter({ ...filter, sortType: e.target.value });
    };

    const handleCurrentPage = (page) => {
        setFilter({ ...filter, currentPage: page });
    };

    const handlePrevPage = () => {
        setFilter({ ...filter, currentPage: filter.currentPage - 1 });
    };

    const handleNextPage = () => {
        setFilter({ ...filter, currentPage: filter.currentPage + 1 });
    };

    const value = {
        filter,
        handleFilter,
        handleCheckCategory,
        handleCheckBrand,
        handleClickCate,
        handleClickBrand,
        handleSort,
        handleCurrentPage,
        handlePrevPage,
        handleNextPage,
        handleKeyword
    };

    return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
};

export default FilterContext;
