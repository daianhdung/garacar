package com.backend_spring.dto;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Timestamp;

@Setter
@Getter
public class MailDTO {
    private int id;

    private String email;
    private String fullName;
    private String phone;
    private String message;

    private String recipient;
    private String msgBody;
    private String subject;
    private String attachment;
}
