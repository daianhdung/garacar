package com.backend_spring.entity.id;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookmarkProductId implements Serializable {

    @Column(name = "user_id")
    private int userId;
    @Column(name = "product_id")
    private int productId;
}
