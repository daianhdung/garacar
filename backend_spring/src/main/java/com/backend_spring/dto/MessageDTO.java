package com.backend_spring.dto;

import com.backend_spring.utils.enumpackage.Status;
import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MessageDTO {

    private String senderName;
    private String receiverName;
    private String message;
    private String date;

    private Status status;

}
