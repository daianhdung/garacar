package com.backend_spring.entity;

import com.backend_spring.entity.id.BookmarkProductId;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity(name = "bookmark_product")
@IdClass(BookmarkProductId.class)
public class BookmarkProductEntity {

    @Id
    private int userId;
    @Id
    private int productId;
    @ManyToOne
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private UserEntity userEntity;
    @ManyToOne
    @JoinColumn(name = "product_id", insertable = false, updatable = false)
    private ProductEntity product;
}
