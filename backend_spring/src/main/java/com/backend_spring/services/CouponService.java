package com.backend_spring.services;

import com.backend_spring.dto.CouponDTO;

import java.util.List;

public interface CouponService {

    CouponDTO findCouponById(int idCoupon);

    CouponDTO findCouponByName(String nameCoupon);

    List<CouponDTO> getAllCoupon();

    CouponDTO getCoupon(int id);

    boolean insertCoupon(CouponDTO couponDTO);

    boolean updateCoupon(CouponDTO couponDTO);

    boolean deleteCoupon(int id);
}
