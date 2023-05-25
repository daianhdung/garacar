package com.backend_spring.services;

import com.backend_spring.dto.OrderDTO;
import com.backend_spring.dto.StatusDTO;

import java.util.List;

public interface OrderService {

    String newOrder(OrderDTO orderDTO);

    OrderDTO getOrderByToken(String token);

    List<OrderDTO> getAllOrder();
    OrderDTO getOrder(int id);
    boolean updateStatusOrder(int id, int statusId);
    List<StatusDTO> getAllStatus();


}
