package com.backend_spring.dto;

import com.backend_spring.model.LocalDateTimeModel;
import com.backend_spring.utils.enumpackage.StatusMessage;
import lombok.*;

import java.time.LocalDateTime;

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
    private StatusMessage status;
    private LocalDateTimeModel recentlyTime;
    private int groupId;
}
