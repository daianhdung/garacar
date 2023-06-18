package com.backend_spring.services.imp;

import com.backend_spring.dto.VisitorDTO;
import com.backend_spring.entity.VisitorEntity;
import com.backend_spring.repository.VisitorRepository;
import com.backend_spring.services.VisitorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class VisitorServiceImp implements VisitorService {
    @Autowired
    VisitorRepository visitorRepository;

    @Override
    public boolean newVisitor(VisitorDTO visitorDTO) {
        VisitorEntity visitorEntity = new VisitorEntity();
        visitorEntity.setIpAddress(visitorDTO.getIpAddress());
        try{
            visitorRepository.save(visitorEntity);
            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }

    }

    @Override
    public boolean updateEndVisitor(VisitorDTO visitorDTO) {
        int limit = 1;
        Pageable page = PageRequest.of(0, limit);
        Page<VisitorEntity> visitorEntity = visitorRepository.findByIpAddressOrderByStartTimeDesc(
                visitorDTO.getIpAddress(), page);
        Optional<VisitorEntity> visitor = visitorRepository.findById(visitorEntity.getContent().get(0).getId());

        try{
            if(visitor.isPresent()){
                visitor.get().setEndTime(LocalDateTime.now());
                visitorRepository.save(visitor.get());
                return true;
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return false;
    }
}
