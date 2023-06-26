package com.backend_spring.payload.response;

import com.backend_spring.utils.enumpackage.StatusMessage;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class ChatSocketResponse {

    private StatusMessage action;
    private int groupId;
    private Object object;
    private String customerName;
}
