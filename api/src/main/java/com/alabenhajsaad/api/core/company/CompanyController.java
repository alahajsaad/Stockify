package com.alabenhajsaad.api.core.company;

import com.alabenhajsaad.api.core.company.dto.CompanyCreationDto;
import com.alabenhajsaad.api.core.company.projection.CompanyFirstViewProjection;
import com.alabenhajsaad.api.core.company.projection.CompanyViewForEmployeeProjection;
import com.alabenhajsaad.api.config.ApiResponse;
import com.alabenhajsaad.api.fileManager.FileLoader;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/company")
@RequiredArgsConstructor
@Slf4j
public class CompanyController {
    private final CompanyService companyService;
    private final FileLoader fileLoader;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<Company>> createCompany(
            @ModelAttribute CompanyCreationDto dto,
            @RequestParam("adminId") Integer adminId
    ) {
        return ResponseEntity.ok(ApiResponse.success(companyService.createCompany(dto, adminId),"Entreprise ajoutée avec succès"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Company>> getCompanyById(@PathVariable Integer id) {
        Company company = companyService.getCompanyById(id);

        // Store the actual filename temporarily
        String actualFilename = company.getLogo();

        // Set the logo field to the URL path for the response
        if (actualFilename != null && !actualFilename.isEmpty()) {
            company.setLogo("/api/v1/company/" + company.getId() + "/logo");
        }

        return ResponseEntity.ok(ApiResponse.success(company,"Entreprise bien trouvée"));
    }

    @GetMapping("/{id}/logo")
    public ResponseEntity<Resource> getCompanyLogo(@PathVariable Integer id) {
        Company company = companyService.getCompanyById(id);

        if (company == null || company.getLogo() == null || company.getLogo().isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        try {
            Resource logoResource = fileLoader.downloadFile(company.getLogo());

            // Determine content type (could be enhanced with a proper content type detector)
            String contentType = fileLoader.determineContentType(company.getLogo());

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + company.getLogo() + "\"")
                    .body(logoResource);
        } catch (Exception e) {
            log.error("An error occurred", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @PutMapping
    public ResponseEntity<ApiResponse<Company>> updateCompany(@RequestBody CompanyCreationDto dto) {
        return ResponseEntity.ok(ApiResponse.success(companyService.updateCompany(dto),"Entreprise mise à jour avec succès"));
    }

    @GetMapping("/new")
    public ResponseEntity<ApiResponse<List<CompanyFirstViewProjection>>> getNewCompanies() {
        return ResponseEntity.ok(ApiResponse.success(companyService.getNewCompanies(),"Entreprises bien trouvées"));
    }

    @GetMapping("/partial/{id}")
    public ResponseEntity<ApiResponse<CompanyViewForEmployeeProjection>> getCompanyByIdForEmployeeView(@PathVariable Integer id) {
        return ResponseEntity.ok(ApiResponse.success(companyService.getCompanyByIdWithEmployeeView(id),"Entreprise bien trouvée"));
    }


}
