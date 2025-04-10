package com.alabenhajsaad.api.core.user;


import com.alabenhajsaad.api.core.company.Company;
import com.alabenhajsaad.api.core.company.CompanyRepository;
import jakarta.ws.rs.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserCompanyRelationService {

    private final CompanyRepository companyRepository;


    public Company getCompanyById(Integer id) {
        return companyRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Company not found"));
    }


    public Boolean exsitsCompanyById(Integer id) {
        return companyRepository.existsById(id);
    }



    public void updateNumberOfUserOfCompany(Company company) {
        company.setNumberOfUser(company.getNumberOfUser() + 1);
        companyRepository.save(company);
    }
}
