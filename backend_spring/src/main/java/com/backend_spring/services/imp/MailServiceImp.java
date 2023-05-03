package com.backend_spring.services.imp;

import com.backend_spring.dto.MailDTO;
import com.backend_spring.entity.MailEntity;
import com.backend_spring.repository.MailRepository;
import com.backend_spring.services.MailService;
import com.backend_spring.utils.enumpackage.Url;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MailServiceImp implements MailService {

    @Value("${spring.mail.username}")
    private String sender;
    @Autowired
    JavaMailSender javaMailSender;

    @Autowired
    MailRepository mailRepository;


    @Override
    public void sendEmail(MailDTO mailDTO) {
        try {

            SimpleMailMessage mailMessage
                    = new SimpleMailMessage();

            mailMessage.setFrom(sender);
            mailMessage.setTo(mailDTO.getRecipient());
            mailMessage.setText(mailDTO.getMsgBody());
            mailMessage.setSubject(mailDTO.getSubject());

            javaMailSender.send(mailMessage);
        }

        catch (Exception e) {
            System.out.println("Send Mail" + e.getMessage());
        }
    }

    @Override
    public MailDTO autoReply(MailDTO mailDTO) {
        mailDTO.setSubject("Liên hệ doanh nghiệp");
        mailDTO.setMsgBody("Cảm ơn bạn đã liên hệ . Chúng tôi sẽ gửi phản hồi trong thời gian sớm nhất");
        mailDTO.setRecipient(mailDTO.getEmail());
        return mailDTO;
    }

    @Override
    public boolean insertMail(MailDTO mailDTO) {
        MailEntity mail = new MailEntity();

        mail.setEmail(mailDTO.getEmail());
        mail.setMessage(mailDTO.getMessage());
        mail.setFullName(mailDTO.getFullName());
        mail.setPhone(mailDTO.getPhone());

        try{
            mailRepository.save(mail);
            return true;
        }catch (Exception e){
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public List<MailDTO> getALLMail() {
        List<MailDTO> list = mailRepository.findAll().stream().map(item -> {
            MailDTO mailDTO = new MailDTO();
            mailDTO.setId(item.getId());
            mailDTO.setFullName(item.getFullName());
            mailDTO.setPhone(item.getPhone());
            mailDTO.setEmail(item.getEmail());
            mailDTO.setMessage(item.getMessage());
            return mailDTO;
        }).collect(Collectors.toList());
        return list;
    }

    @Override
    public MailDTO getMailById(int idMail) {
        Optional<MailEntity> mail = mailRepository.findById(idMail);
        if (mail.isPresent()) {
            MailDTO mailDTO = new MailDTO();
            mailDTO.setId(mail.get().getId());
            mailDTO.setFullName(mail.get().getFullName());
            mailDTO.setEmail(mail.get().getEmail());
            mailDTO.setPhone(mail.get().getPhone());
            mailDTO.setMessage(mail.get().getMessage());
            return mailDTO;
        }
        return null;
    }
}
