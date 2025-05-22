package com.alabenhajsaad.api.business.partner;

import com.alabenhajsaad.api.business.partner.partner.Partner;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "phone_number")
@Entity
@Builder
public class PhoneNumber {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String number;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "partner_id")
    private Partner partner;


}
