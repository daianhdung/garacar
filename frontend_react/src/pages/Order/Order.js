import { faAngleLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import config from '~/config';
import useCart from '~/hooks/useCart';
import { searchCoupon } from "~/services/couponService";
import { CheckoutOrder } from "~/services/orderService";
import { getProvince, searchDistrictOnCode, searchWardOnCode } from "~/services/thirdApi";
// import { getUserInform } from "~/services/userService";
import { formatNumber } from "~/utils/stringUtils";
import styles from './Order.module.scss';
import { validEmail } from "~/utils/regex";
import useAuth from "~/hooks/useAuth";


const cx = classNames.bind(styles);

const paymentMethod = [
    {
        id: 1,
        name: 'Chuyển khoản ngân hàng'
    },
    {
        id: 2,
        name: 'Giao hàng tiền mặt (COD)'
    }
]

function Order({ setIsLoading }) {

    const navigate = useNavigate()

    const contextAuth = useAuth()

    const cart = useCart()
    const localItems = cart.items

    const [user, setUser] = useState({})

    const [coupon, setCoupon] = useState('')
    const [checkCoupon, setCheckCoupon] = useState({ isExist: null, rate: null })

    const [province, setProvince] = useState()
    const provinceCodeRef = useRef()
    const [district, setDistrict] = useState()
    const districtCodeRef = useRef()
    const [ward, setWard] = useState()


    const [formInformUser, setFormInformUser] = useState({
        email: '', fullname: '', phone: '',
        address: '', province: '', district: '', ward: '', paymentMethod: ''
    })
    const [errors, setErrors] = useState({});
    // console.log(formInformUser);
    // console.log(errors);
    const [total, setTotal] = useState(localItems != null ? cart.getTotalCart : '')

    const [costDeli, setCostDeli] = useState(0)

    useEffect(() => {
        if (localItems === null) {
            navigate('/home', { replace: true })
        }

        // const fetchApiGetUserInform = async () => {
        //     setIsLoading(true)
        //     const response = await getUserInform()
        //     console.log(response);
        //     if (response.success) {
        //         setUser(response.data)
        //         setFormInformUser(response.data)
        //         console.log(response);
        //     }
        //     setIsLoading(false)
        // }
        const fetchApiGetProvince = async () => {
            setIsLoading(true)
            const response = await getProvince()
            setProvince(response)
            setIsLoading(false)
        }
        // if(contextAuth.authProvider.isLogin){
        //     fetchApiGetUserInform()
        // }
        fetchApiGetProvince()
    }, [])



    useEffect(() => {
        if (checkCoupon.rate) {
            var promo = (cart.getTotalCart() * checkCoupon.rate) / 100
        } else {
            var promo = 0
        }
        const totalOrder = cart.getTotalCart() - promo + costDeli
        setTotal(totalOrder)
    }, [checkCoupon, costDeli])



    const handleChangeForm = (e) => {
        const { name, value } = e.target
        setFormInformUser({ ...formInformUser, [name]: value })
    }



    const handleCoupon = () => {
        const fetchApiGetCoupon = async () => {
            setIsLoading(true)
            const response = await searchCoupon(coupon)
            if (response.success) {
                setCheckCoupon({ isExist: true, rate: response.data.rate })
            } else {
                setCheckCoupon({ isExist: false })
            }
            setIsLoading(false)
            return response.data
        }
        fetchApiGetCoupon()
    }

    //Handle when selected province then appear Dictrict of province
    const handleChangeProvince = (e) => {
        
        provinceCodeRef.current = e.target.value
        if (e.target.value != 79) {
            setCostDeli(40000)
        } else {
            setCostDeli(0)
        }
        //get text in option
        var index = e.nativeEvent.target.selectedIndex;

        const fetchApiGetDistrict = async () => {
            const response = await searchDistrictOnCode(provinceCodeRef.current)
            setDistrict(response.districts)
        }
        fetchApiGetDistrict()
        setFormInformUser({ ...formInformUser, province: e.nativeEvent.target[index].text })
    }

    const handleChangeDistrict = (e) => {
        districtCodeRef.current = e.target.value

        var index = e.nativeEvent.target.selectedIndex;
        const fetchApiGetWard = async () => {
            const response = await searchWardOnCode(districtCodeRef.current)
            setWard(response.wards)
        }
        fetchApiGetWard()
        setFormInformUser({ ...formInformUser, district: e.nativeEvent.target[index].text })
    }

    const handleChangeWard = (e) => {

        var index = e.nativeEvent.target.selectedIndex;
        setFormInformUser({ ...formInformUser, ward: e.nativeEvent.target[index].text })
    }


    const removeCoupon = () => {
        setCoupon('')
        setCheckCoupon({ isExist: null, rate: null })
    }


    //If user Select All input and Backspace, state will set to null
    const checkBackspace = (e) => {
        const { name, value } = e.target
        if (e.key === 'Backspace' && e.target.selectionStart === 0 && e.target.selectionEnd === e.target.value.length) {
            setFormInformUser({ ...formInformUser, [name]: '' })
        }
    }

    const handleChecked = (idCheck) => {
        setFormInformUser({ ...formInformUser, paymentMethod: idCheck })
    }

    const priceAfterCoupon = (cart.getTotalCart() * checkCoupon.rate) / 100

    //Validate form and call api set new order
    const onSubmit = () => {
        console.log(formInformUser);
        let newErrors = {};
        if (!formInformUser.email) {
            newErrors.email = 'Email bắt buộc';
        } else if (!validEmail.test(formInformUser.email)) {
            newErrors.email = 'Email không hợp lệ';
        }
        if (!formInformUser.fullname) {
            newErrors.fullname = 'Họ và tên bắt buộc';
        }
        if (!formInformUser.phone) {
            newErrors.phone = 'Số điện thoại bắt buộc';
        }
        if (!formInformUser.address) {
            newErrors.address = 'Địa chỉ bắt buộc';
        }
        if (!formInformUser.province) {
            newErrors.province = 'Tỉnh thành bắt buộc';
        }
        if (!formInformUser.district) {
            newErrors.district = 'Quận huyện bắt buộc';
        }
        if (!formInformUser.ward) {
            newErrors.ward = 'Phường xã bắt buộc';
        }
        if (!formInformUser.paymentMethod) {
            newErrors.paymentMethod = 'Phương thức thanh toán bắt buộc';
        } else if (formInformUser.paymentMethod === 1) {
            newErrors.paymentMethod = 'Chuyển khoản ngân hàng hiện tại không khả dụng';
        }
        if (Object.keys(newErrors).length === 0) {
            const userDto = {
                email: formInformUser.email, fullname: formInformUser.fullname, phone: formInformUser.phone,
                address: formInformUser.address
            }
            const deliveryAddress = `${formInformUser.address} ${formInformUser.province} ${formInformUser.district} ${formInformUser.ward}`
            const productDTOList = localItems
            const tempTotal = cart.getTotalCart()
            const fetchApiNewOrder = async () => {
                setIsLoading(true)
                const response = await CheckoutOrder(userDto, deliveryAddress, productDTOList, checkCoupon.rate, tempTotal, total, costDeli)
                console.log(response);
                if (response.success) {
                    cart.deleteAllFromCart()
                    navigate(`/order/success/${response.data}`)
                }
                setIsLoading(false)
                return response
            }
            fetchApiNewOrder()
        }
        setErrors(newErrors)
    }

    return (<div className="my-5 bg-white rounded p-5">
        <div className="row">
            <div className="mb-3 col-md-4">
                <div className="mb-3">
                    <label className="form-label">Thông tin mua hàng</label>
                    <input placeholder="Email" style={{ height: '45px' }} type="text" className={`form-control  ${errors.email && 'is-invalid'}`} id="email" defaultValue={user.email} name="email" onChange={handleChangeForm} onKeyDown={checkBackspace} disabled={user.email} />
                    {errors.email && <span className="text-danger">{errors.email}</span>}
                </div>
                <div className="mb-3">
                    <input placeholder="Họ và tên" style={{ height: '45px' }} type="text" className={`form-control  ${errors.fullname && 'is-invalid'}`} id="fullname" defaultValue={user.fullname} name="fullname" onChange={handleChangeForm} onKeyDown={checkBackspace} disabled={user.fullname} />
                    {errors.fullname && <span className="text-danger">{errors.fullname}</span>}
                </div>
                <div className="mb-3">
                    <input placeholder="Số điện thoại" style={{ height: '45px', userSelect: 'none' }} type="text" className={`form-control  ${errors.phone && 'is-invalid'}`} id="phone" defaultValue={user.phone}
                        name="phone" onChange={handleChangeForm} onKeyDown={checkBackspace} disabled={user.phone} />
                    {errors.phone && <span className="text-danger">{errors.phone}</span>}

                </div>
                <div className="mb-3">
                    <input placeholder="Địa chỉ" style={{ height: '45px', userSelect: 'none' }} type="text" className={`form-control  ${errors.address && 'is-invalid'}`} id="address" defaultValue={user.address} name="address" onChange={handleChangeForm} onKeyDown={checkBackspace} disabled={user.address} />
                    {errors.address && <span className="text-danger">{errors.address}</span>}
                </div>
                <div className="mt-3 mb-3">

                    <select name="province" onChange={handleChangeProvince} style={{ height: '45px' }} className="form-select mb-3" aria-label=" example">
                        <option value='' defaultValue=''>Tỉnh thành --</option>
                        {province && province.map((item) => (
                            <option key={item.code} value={item.code}>{item.name}</option>
                        ))}
                    </select>
                    {errors.province && <span className="text-danger">{errors.province}</span>}

                </div>
                <div className="mb-3">
                    <select style={{ height: '45px' }} className="form-select mb-3" aria-label=" example" disabled={!district} onChange={handleChangeDistrict}>
                        <option value='' defaultValue=''>Quận huyện --</option>
                        {district && district.map((item) => (
                            <option key={item.code} value={item.code}>{item.name}</option>
                        ))}
                    </select>
                    {errors.district && <span className="text-danger">{errors.district}</span>}
                </div>
                <div className="mb-3">
                    <select style={{ height: '45px' }} className="form-select mb-3" aria-label=" example" disabled={!ward} onChange={handleChangeWard}>
                        <option value='' defaultValue=''>Phường xã --</option>
                        {ward && ward.map((item) => (
                            <option key={item.code} value={item.code}>{item.name}</option>
                        ))}
                    </select>
                    {errors.ward && <span className="text-danger">{errors.ward}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Ghi chú (tùy chọn)</label>
                    <textarea name="noteDescrip" onChange={handleChangeForm} onKeyDown={checkBackspace} style={{ height: '100px' }} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
            </div>
            <div className="mb-3 col-md-4 h-50">
                <label className="form-label">Thanh toán</label>
                <div>
                    {paymentMethod.map((item) => (
                        <div key={item.id} style={{ userSelect: 'none' }} className={`input-group mb-3 ${errors.paymentMethod && 'border border-danger rounded'}`}>
                            <div className="input-group-text">
                                <input onClick={() => handleChecked(item.id)} className="form-check-input mt-0" name="payment" type="radio" value="" aria-label="Radio button for following text input" />
                            </div>
                            <input style={{ height: '45px', userSelect: 'none' }} type="text" className="form-control" aria-label="Text input with radio button"
                                value={item.name} disabled />
                        </div>
                    ))}
                    {errors.paymentMethod && <span className="text-danger">{errors.paymentMethod}</span>}
                </div>
            </div>
            <div className="mb-3 col-md-4 h-50">
                <label className="form-label fw-bold ">Đơn hàng ({localItems && cart.getTotalQuantityCart()} sản phẩm)</label>
                <hr></hr>
                <table >
                    <tbody >
                        {localItems && localItems.map((item) => (
                            <tr key={item.id}>
                                <td className={cx('image-number', 'p-3')}>
                                    <img width={50} height={50} src={item.image} />
                                    <span className={cx('image_number_orange')}>{item.quantity}</span>
                                </td>
                                <td>
                                    <h6>{item.name}</h6>
                                    {/* <span>Size: {item.size}</span> */}
                                </td>
                                <td>
                                    <span>{formatNumber(item.price * item.quantity)}₫</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <hr />
                <div className=" row pt-3">
                    <div className="row">
                        <div className="col-md-8">
                            <input onChange={(e) => setCoupon(e.target.value)} placeholder="Nhập vào mã giảm giá" style={{ height: '55px' }} type="text" className={`form-control  ${checkCoupon && checkCoupon.isExist === false && 'is-invalid'}
                            w-70`} id="coupon" value={coupon} />
                        </div>
                        <div className="col-md-4 ">
                            <button onClick={handleCoupon} className="rounded bg-primary text-white" style={{ height: '55px', width: '125px' }}>Áp dụng</button>
                        </div>
                    </div>
                    {checkCoupon && checkCoupon.isExist === false && <span className="text-danger">Mã giảm giá không chính xác</span>}
                    {checkCoupon && checkCoupon.isExist === true &&
                        <div className="row mt-4">
                            <span className="text-info col-md-9">Áp dụng mã giảm giá giảm {checkCoupon.rate}%</span>
                            <span onClick={removeCoupon} style={{ cursor: 'pointer' }} className="col-md-3 text-danger"><FontAwesomeIcon className="me-2" icon={faXmark} />Hủy</span>
                        </div>}
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                    <div className="mt-2">
                        {checkCoupon && checkCoupon.isExist === true && <h6 className="text-info">Giảm giá</h6>}
                        <h6 >Tạm tính</h6>
                        <h6>Phí vận chuyển</h6>
                    </div>
                    <div className="mt-2">
                        {checkCoupon && checkCoupon.isExist === true && <h6 className="text-info" align='right'>{formatNumber(priceAfterCoupon)}₫</h6>}
                        <h6 align='right'>{cart.getTotalCart && formatNumber(cart.getTotalCart())}₫</h6>
                        {costDeli > 0 ? <h6 align='right'>{formatNumber(costDeli)}₫</h6> : <h6 align='right'>--</h6>}
                    </div>
                </div>
                <hr />
                <div className="d-flex justify-content-between mt-2">
                    <h6>Tổng cộng</h6>
                    <h6 className="text-info">{total && formatNumber(total)}₫</h6>
                </div>
                <div className="d-flex justify-content-between mt-5 align-items-center">
                    <Link className="fs-5" to={config.routes.cart}><FontAwesomeIcon className="me-3" icon={faAngleLeft} />Quay lại giỏ hàng</Link>
                    <button onClick={onSubmit} className="rounded bg-primary text-white fs-5" style={{ height: '65px', width: '135px' }}>Đặt hàng</button>
                </div>
            </div>
        </div>
    </div>);
}

export default Order;