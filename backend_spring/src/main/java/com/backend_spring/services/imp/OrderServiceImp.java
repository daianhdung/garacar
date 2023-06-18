package com.backend_spring.services.imp;

import com.backend_spring.dto.*;
import com.backend_spring.entity.*;
import com.backend_spring.repository.*;
import com.backend_spring.services.OrderService;
import com.backend_spring.utils.enumpackage.Url;
import io.jsonwebtoken.io.Encoders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

import static com.backend_spring.constant.FieldEntityConstant.ROLE_ANONYMOUS;
import static com.backend_spring.constant.FieldEntityConstant.STATUS_PENDING;

@Service
public class OrderServiceImp implements OrderService {
    @Autowired
    OrderRepository orderRepository;
    @Autowired
    ProductOrderRepository productOrderRepository;
    @Autowired
    StatusRepository statusRepository;
    @Autowired
    ProductRepository productRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public String newOrder(OrderDTO orderDTO) {
      try {
          OrderEntity order = new OrderEntity();
          order.setCoupon(orderDTO.getCoupon());
          order.setFeeShip(orderDTO.getFeeShip());
          Optional<StatusEntity> status = statusRepository.findById(STATUS_PENDING);
          order.setStatus(status.get());
          order.setTempTotal(orderDTO.getTempTotal());
          order.setDeliveryAddress(orderDTO.getDeliveryAddress());
          order.setTotal(orderDTO.getTotal());
          String token = Encoders.BASE64.encode(orderDTO.getUserDTO().getEmail().getBytes());
          order.setOrderToken(token);


          //If email order not found in DB so the customer not logged in, set new user anonymous in db
          UserEntity user = userRepository.findUserEntityByEmail(orderDTO.getUserDTO().getEmail());
          if(user != null){
              user.setFullName(orderDTO.getUserDTO().getFullname());
              user.setPhone(orderDTO.getUserDTO().getPhone());
              user.setAddress(orderDTO.getUserDTO().getAddress());
              order.setUsers(user);
          }else {
              UserEntity userEntity = new UserEntity();
              userEntity.setEmail(orderDTO.getUserDTO().getEmail());
              userEntity.setFullName(orderDTO.getUserDTO().getFullname());
              userEntity.setPhone(orderDTO.getUserDTO().getPhone());
              userEntity.setAddress(orderDTO.getUserDTO().getAddress());
              Optional<RoleEntity> role = roleRepository.findById(ROLE_ANONYMOUS);
              userEntity.setRole(role.get());
              order.setUsers(userEntity);
          }

          OrderEntity idOfOrderComplete = orderRepository.save(order);

          //Add list product order into product_order table
          orderDTO.getProductDTOList().forEach(productDTO -> {
              //get product by Id then get price to * with quantity product order
              Optional<ProductEntity> productEntityOrder = productRepository.findById(productDTO.getId());
              ProductOrderEntity productOrderEntity = new ProductOrderEntity();
              productOrderEntity.setOrderId(idOfOrderComplete.getId());
              productOrderEntity.setProductId(productEntityOrder.get().getId());
              productOrderEntity.setAmount(productDTO.getQuantity());
              productOrderEntity.setPrice(productDTO.getQuantity() * productEntityOrder.get().getPrice());
//              productOrderEntity.setSize(String.valueOf(productDTO.getSize()));
              productOrderRepository.save(productOrderEntity);
          });
          return token;
      }catch (Exception e){
          e.printStackTrace();
          return null;
      }
    }

    @Override
    public OrderDTO getOrderByToken(String token) {
        OrderEntity order = orderRepository.findByOrderToken(token);
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setCoupon(order.getCoupon());
        orderDTO.setFeeShip((int) order.getFeeShip());
        orderDTO.setDeliveryAddress(order.getDeliveryAddress());
        orderDTO.setStatusId(order.getStatus().getId());
        orderDTO.setTempTotal((int) order.getTempTotal());
        orderDTO.setTotal((int) order.getTotal());

        Optional<UserEntity> user = userRepository.findById(order.getUsers().getId());
        UserDTO userDTO = new UserDTO();
        userDTO.setEmail(user.get().getEmail());
        userDTO.setFullname(user.get().getFullName());
        userDTO.setAddress(user.get().getAddress());
        userDTO.setPhone(user.get().getPhone());
        orderDTO.setUserDTO(userDTO);
        orderDTO.setOrderToken(order.getOrderToken());

        List<ProductOrderEntity> productOrderEntityList = productOrderRepository.findByOrderId(order.getId());
        List<ProductOrderDTO> productOrderDTOList = new ArrayList<>();
        productOrderEntityList.forEach(productOrderEntity -> {
            ProductOrderDTO productOrderDTO = new ProductOrderDTO();
            productOrderDTO.setAmount(productOrderEntity.getAmount());

            Optional<ProductEntity> productEntity = productRepository.findById(productOrderEntity.getProductId());
            productOrderDTO.setMainImage(Url.ProductsImage.getPath() + productEntity.get().getMainImage());
            productOrderDTO.setPrice(productEntity.get().getPrice() * productOrderEntity.getAmount());
            productOrderDTO.setName(productEntity.get().getName());

//            productOrderDTO.setSize(productOrderEntity.getSize());
            productOrderDTO.setPrice(productOrderEntity.getPrice());
            productOrderDTOList.add(productOrderDTO);
        });
        orderDTO.setProductOrderDTOList(productOrderDTOList);
        return orderDTO;
    }

    @Override
    public List<OrderDTO> getAllOrder() {
        List<OrderEntity> orderEntities = orderRepository.findAll();
        List<OrderDTO> orderDTOS = new ArrayList<>();
        orderEntities.forEach(orderEntity -> {
            OrderDTO orderDTO = new OrderDTO();
            orderDTO.setId(orderEntity.getId());
            orderDTO.setCoupon(orderEntity.getCoupon());
            orderDTO.setFeeShip((int) orderEntity.getFeeShip());
            orderDTO.setDeliveryAddress(orderEntity.getDeliveryAddress());
            orderDTO.setStatusId(orderEntity.getStatus().getId());
            orderDTO.setTempTotal((int) orderEntity.getTempTotal());
            orderDTO.setTotal((int) orderEntity.getTotal());
            UserDTO userDTO = new UserDTO();
            userDTO.setFullname(orderEntity.getUsers().getFullName());
            userDTO.setAddress(orderEntity.getDeliveryAddress());
            orderDTO.setUserDTO(userDTO);
            orderDTO.setStatus(orderEntity.getStatus().getName());
            List<Map<String,String>> products = new ArrayList<>();
            orderEntity.getProductOrders().forEach(productOrderEntity -> {
                Map<String, String> map = new HashMap<>();
                map.put("name", productOrderEntity.getProduct().getName());
//                map.put("size", productOrderEntity.getSize());
                map.put("amount", String.valueOf(productOrderEntity.getAmount()));
                products.add(map);
            });
            orderDTO.setProducts(products);
            orderDTOS.add(orderDTO);
        });
        return orderDTOS;
    }

    @Override
    public OrderDTO getOrder(int id) {
        Optional<OrderEntity> orderEntityOptional = orderRepository.findById(id);
        if (orderEntityOptional.isPresent()) {
            OrderDTO orderDTO = new OrderDTO();
            orderDTO.setStatusId(orderEntityOptional.get().getStatus().getId());
            orderDTO.setNameCustomer(orderEntityOptional.get().getUsers().getFullName());
            orderDTO.setDeliveryAddress(orderEntityOptional.get().getDeliveryAddress());
            orderDTO.setStatus(orderEntityOptional.get().getStatus().getName());
            List<ProductOrderDTO> productDTOList = new ArrayList<>();
            orderEntityOptional.get().getProductOrders().forEach(item -> {
                ProductOrderDTO productOrder = new ProductOrderDTO();
                productOrder.setName(item.getProduct().getName());
                productOrder.setAmount(item.getAmount());
                productDTOList.add(productOrder);
            });
            orderDTO.setTotal((int) orderEntityOptional.get().getTotal());
            orderDTO.setProductOrderDTOList(productDTOList);
            return orderDTO;
        }
        return null;
    }

    @Override
    public boolean updateStatusOrder(int id, int statusId) {
        Optional<OrderEntity> orderEntityOptional = orderRepository.findById(id);
        if (orderEntityOptional.isPresent()) {
            OrderEntity orderEntity = orderEntityOptional.get();
            Optional<StatusEntity> statusEntity = statusRepository.findById(statusId);
            orderEntity.setStatus(statusEntity.get());
            try {
                orderRepository.save(orderEntity);
                return true;
            }catch (Exception e) {
                return false;
            }
        }
        return false;
    }

    @Override
    public List<StatusDTO> getAllStatus() {
        List<StatusEntity> statusEntities = statusRepository.findAll();
        List<StatusDTO> statusDTOS = new ArrayList<>();
        statusEntities.forEach(statusEntity -> {
            StatusDTO statusDTO = new StatusDTO();
            statusDTO.setId(statusEntity.getId());
            statusDTO.setName(statusEntity.getName());
            statusDTOS.add(statusDTO);
        });
        return statusDTOS;
    }
}
