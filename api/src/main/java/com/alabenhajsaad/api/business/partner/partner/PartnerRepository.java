package com.alabenhajsaad.api.business.partner.partner;

import com.alabenhajsaad.api.business.partner.RoleType;
import com.alabenhajsaad.api.business.partner.organization.Organization;
import com.alabenhajsaad.api.business.partner.person.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PartnerRepository extends JpaRepository<Partner, Long> {
    List<Partner> findByRoleType(RoleType roleType);


}
