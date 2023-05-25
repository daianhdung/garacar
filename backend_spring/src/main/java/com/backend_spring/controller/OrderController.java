package com.backend_spring.controller;

import com.backend_spring.dto.OrderDTO;
import com.backend_spring.payload.response.DataResponse;
import com.backend_spring.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/order")
@CrossOrigin
public class OrderController {

    @Autowired
    OrderService orderService;

    @GetMapping("/success/{token}")
    public ResponseEntity<?> getOrderByToken(@PathVariable("token") String token){
        OrderDTO orderDTO = orderService.getOrderByToken(token);
        DataResponse dataResponse = new DataResponse();
        dataResponse.setSuccess(orderDTO != null);
        dataResponse.setData(orderDTO);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }


    @PostMapping()
    public ResponseEntity<?> newOrder(@RequestBody OrderDTO orderDTO){
        String token = orderService.newOrder(orderDTO);
        System.out.println("test");
        DataResponse dataResponse = new DataResponse();
        dataResponse.setSuccess(token != null);
        dataResponse.setData(token);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
}
