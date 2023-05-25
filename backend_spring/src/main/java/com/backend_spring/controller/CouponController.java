package com.backend_spring.controller;

import com.backend_spring.dto.CouponDTO;
import com.backend_spring.payload.response.DataResponse;
import com.backend_spring.services.CouponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/coupon")
@RestController
@CrossOrigin
public class CouponController {

    @Autowired
    CouponService couponService;

    @GetMapping()
    public ResponseEntity<?> getCoupon(@RequestParam("coupon") String name){
        CouponDTO couponDTO = couponService.findCouponByName(name);

        DataResponse dataResponse = new DataResponse();
        if(couponDTO.getName() != null){
            dataResponse.setSuccess(true);
            dataResponse.setData(couponDTO);
        }else{
            dataResponse.setSuccess(false);
            dataResponse.setData("Not have");
        }
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
}
