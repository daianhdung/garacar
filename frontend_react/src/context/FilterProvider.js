import { createContext, useState } from "react";

const FilterContext = createContext()



export const FilterProvider = ({ children }) => {

    const [filter, setFilter] = useState({
        searchName: "",
        brandId: [],
        sizeId: [],
        categoryId: [],
        sort: ""
    })
    const handleFilter = (newFilter) => {
        setFilter({
            ...filter,
            ...newFilter
        })
    }


    const handleCheckSize = (id) => {
        const isChecked = filter.sizeId.includes(id)
        console.log(filter.sizeId);
        var arrayTest = filter.sizeId
        if (isChecked) {
            arrayTest = arrayTest.filter(item => item !== id);
            setFilter({...filter, sizeId: arrayTest})
        } else {
            arrayTest.push(id)
            setFilter({...filter, sizeId: arrayTest})
        }
    }

    const handleCheckCategory = (id) => {
        const isChecked = filter.categoryId.includes(id)
        console.log(filter.categoryId);
        var arrayTest = filter.categoryId
        if (isChecked) {
            arrayTest = arrayTest.filter(item => item !== id);
            setFilter({...filter, categoryId: arrayTest})
        } else {
            arrayTest.push(id)
            setFilter({...filter, categoryId: arrayTest})
        }
    }



    const handleCheckBrand = (id) => {
        const isChecked = filter.brandId.includes(id)
        console.log(filter.brandId);
        var arrayTest = filter.brandId
        if (isChecked) {
            arrayTest = arrayTest.filter(item => item !== id);
            setFilter({...filter, brandId: arrayTest})
        } else {
            arrayTest.push(id)
            setFilter({...filter, brandId: arrayTest})
        }
    }

    const handleClickBrand = (idBrand) => {
        setFilter({...filter, brandId: [idBrand]})
    }

    const handleClickCate = (idCate) => {
        setFilter({...filter, categoryId: [idCate]})
    }

 

    const value = {
        filter,
        handleFilter,
        handleCheckSize,
        handleCheckCategory,
        handleCheckBrand,
        handleClickBrand,
        handleClickCate
    }



    return (
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    )
}

export default FilterContext