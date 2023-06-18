package com.backend_spring.services;

import com.backend_spring.dto.VisitorDTO;

public interface VisitorService {

    boolean newVisitor(VisitorDTO visitorDTO);

    boolean updateEndVisitor(VisitorDTO visitorDTO);
}
