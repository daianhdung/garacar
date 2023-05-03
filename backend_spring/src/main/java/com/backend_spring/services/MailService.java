package com.backend_spring.services;

import com.backend_spring.dto.MailDTO;

import java.util.List;

public interface MailService {

    void sendEmail(MailDTO mailDTO);
    MailDTO autoReply(MailDTO mailDTO);

    boolean insertMail(MailDTO mailDTO);

    List<MailDTO> getALLMail();
    MailDTO getMailById(int idMail);
}
