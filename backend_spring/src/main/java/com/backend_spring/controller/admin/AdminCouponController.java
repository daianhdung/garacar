package com.backend_spring.controller.admin;

import com.backend_spring.dto.CouponDTO;
import com.backend_spring.payload.response.DataResponse;
import com.backend_spring.services.CouponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminCouponController {

    @Autowired
    CouponService couponService;


    @GetMapping("/coupon/get/{id}")
    public ResponseEntity<?> getCoupon(@PathVariable(name = "id") int id) {
        DataResponse dataResponse = new DataResponse();
        CouponDTO couponDTO = couponService.getCoupon(id);
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setData(couponDTO);
        dataResponse.setSuccess(true);
        dataResponse.setDesc("getCoupon");
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @GetMapping("/coupon/all")
    public ResponseEntity<?> getCoupons() {
        DataResponse dataResponse = new DataResponse();
        List<CouponDTO> couponDTOS = couponService.getAllCoupon();
        dataResponse.setDesc("getCoupons");
        dataResponse.setSuccess(true);
        dataResponse.setData(couponDTOS);
        dataResponse.setStatus(HttpStatus.OK.value());
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PostMapping("/coupon/insert")
    public ResponseEntity<?> insertCoupon(@RequestBody CouponDTO couponDTO) {
        DataResponse dataResponse = new DataResponse();
        boolean isSuccess = couponService.insertCoupon(couponDTO);
        dataResponse.setDesc("insertCoupon");
        dataResponse.setSuccess(isSuccess);
        dataResponse.setStatus(HttpStatus.OK.value());
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PutMapping("/coupon")
    public ResponseEntity<?> updateCoupon(@RequestBody CouponDTO couponDTO) {
        DataResponse dataResponse = new DataResponse();
        boolean isSuccess = couponService.updateCoupon(couponDTO);
        dataResponse.setDesc("updateCoupon");
        dataResponse.setSuccess(isSuccess);
        dataResponse.setStatus(HttpStatus.OK.value());
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @GetMapping("/coupon/delete/{id}")
    public ResponseEntity<?> deleteCoupon(@PathVariable(name = "id") int id) {
        DataResponse dataResponse = new DataResponse();
        boolean isSuccess = couponService.deleteCoupon(id);
        dataResponse.setDesc("deleteCoupon  ");
        dataResponse.setSuccess(isSuccess);
        dataResponse.setStatus(HttpStatus.OK.value());
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

}
