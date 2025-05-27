package com.alabenhajsaad.api.email;

import com.alabenhajsaad.api.core.user.AppUser;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.util.HashMap;
import java.util.Map;

import static java.nio.charset.StandardCharsets.UTF_8;
import static org.springframework.mail.javamail.MimeMessageHelper.MULTIPART_MODE_MIXED;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {
    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;

    public void sendEmail(String to, String subject, String activationCode, String username, EmailTemplateName emailTemplate) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(
                    mimeMessage,
                    MULTIPART_MODE_MIXED,
                    UTF_8.name()
            );

            Map<String, Object> properties = new HashMap<>();
            properties.put("username", username);
            properties.put("activation_code", activationCode);

            Context context = new Context();
            context.setVariables(properties);

            helper.setFrom("contact@stockify.com");
            helper.setTo(to);
            helper.setSubject(subject);

            String template = templateEngine.process(emailTemplate.getName(), context);
            helper.setText(template, true);

            mailSender.send(mimeMessage);

            log.info("✅ Email sent successfully to {}", to); // Logging success
        } catch (MessagingException e) {
            log.error("❌ Failed to send email to {}: {}", to, e.getMessage());
            throw new RuntimeException("Unable to send email", e);
        }
    }


    public void sendResetPasswordEmail(String to, String subject,String linkToResetPassword , String username, EmailTemplateName emailTemplate){
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(
                    mimeMessage,
                    MULTIPART_MODE_MIXED,
                    UTF_8.name()
            );


            Map<String, Object> properties = new HashMap<>();
            properties.put("username", username);
            properties.put("linkToResetPassword", linkToResetPassword);

            Context context = new Context();
            context.setVariables(properties);

            helper.setFrom("contact@stockify.com");
            helper.setTo(to);
            helper.setSubject(subject);

            String template = templateEngine.process(emailTemplate.getName(), context);
            helper.setText(template, true);

            mailSender.send(mimeMessage);

            log.info("✅ Email sent successfully to {}", to); // Logging success
        } catch (MessagingException e) {
            log.error("❌ Failed to send email to {}: {}", to, e.getMessage());
            throw new RuntimeException("Unable to send email", e);
        }
    }

    public void sendEmailForNewEmployee(String to, String subject, String password , AppUser user, EmailTemplateName emailTemplate){
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(
                    mimeMessage,
                    MULTIPART_MODE_MIXED,
                    UTF_8.name()
            );


            Map<String, Object> properties = new HashMap<>();
            properties.put("username", user.getFullName());
            properties.put("email", user.getEmail());
            properties.put("password", password);
            properties.put("companyName", user.getCompany().getName());


            Context context = new Context();
            context.setVariables(properties);

            helper.setFrom("contact@stockify.com");
            helper.setTo(to);
            helper.setSubject(subject);

            String template = templateEngine.process(emailTemplate.getName(), context);
            helper.setText(template, true);

            mailSender.send(mimeMessage);

            log.info("✅ Email sent successfully to {}", to); // Logging success
        } catch (MessagingException e) {
            log.error("❌ Failed to send email to {}: {}", to, e.getMessage());
            throw new RuntimeException("Unable to send email", e);
        }
    }
}
