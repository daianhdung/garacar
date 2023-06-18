package com.backend_spring.services.imp;

import com.backend_spring.dto.CouponDTO;
import com.backend_spring.entity.CouponEntity;
import com.backend_spring.repository.CouponRepository;
import com.backend_spring.services.CouponService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CouponServiceImp implements CouponService {

    @Autowired
    CouponRepository couponRepository;

    @Override
    public CouponDTO findCouponById(int idCoupon) {
        CouponDTO couponDTO = new CouponDTO();
        CouponEntity couponEntity = couponRepository.findById(idCoupon);
        couponDTO.setId(couponEntity.getId());
        couponDTO.setName(couponEntity.getName());
        couponDTO.setRate(couponEntity.getRate());
        return couponDTO;
    }

    @Override
    public CouponDTO findCouponByName(String nameCoupon) {
        CouponDTO couponDTO = new CouponDTO();
        Optional<CouponEntity> couponEntity = Optional.ofNullable(couponRepository.findByName(nameCoupon));
        if(couponEntity.isPresent()){
            couponDTO.setId(couponEntity.get().getId());
            couponDTO.setName(couponEntity.get().getName());
            couponDTO.setRate(couponEntity.get().getRate());
            return couponDTO;
        }else{
            return couponDTO;
        }
    }

    @Override
    public List<CouponDTO> getAllCoupon() {
        List<CouponDTO> couponDTOS = new ArrayList<>();
        List<CouponEntity> couponEntities = couponRepository.findAll();
        couponEntities.forEach( couponEntity -> {
            CouponDTO couponDTO = new CouponDTO();
            couponDTO.setId(couponEntity.getId());
            couponDTO.setName(couponEntity.getName());
            couponDTO.setRate(couponEntity.getRate());
            couponDTOS.add(couponDTO);
        });

        return couponDTOS;
    }
    @Override
    public CouponDTO getCoupon(int id) {
        CouponEntity couponEntity = couponRepository.findById(id);
        CouponDTO couponDTO = new CouponDTO();
        couponDTO.setId(couponEntity.getId());
        couponDTO.setName(couponEntity.getName());
        couponDTO.setRate(couponEntity.getRate());
        return couponDTO;
    }
    @Override
    public boolean insertCoupon(CouponDTO counponDTO) {
        CouponEntity couponEntity = new CouponEntity();

        couponEntity.setName(counponDTO.getName());
        couponEntity.setRate((counponDTO.getRate()));
        try {
            couponRepository.save(couponEntity);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean updateCoupon(CouponDTO counponDTO) {
        CouponEntity couponEntity = couponRepository.findById(counponDTO.getId());
        couponEntity.setName(counponDTO.getName());
        couponEntity.setRate((counponDTO.getRate()));
        try {
            couponRepository.save(couponEntity);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean deleteCoupon(int id) {
        try {
            couponRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
