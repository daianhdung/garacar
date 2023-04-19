package com.backend_spring.payload.response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class DataTokenResponse {

    private String token;
    private String freshToken;
    private String role;
    private long expire;

}
