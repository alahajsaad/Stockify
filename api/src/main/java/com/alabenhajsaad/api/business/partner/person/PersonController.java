package com.alabenhajsaad.api.business.partner.person;

import com.alabenhajsaad.api.business.partner.PartnerType;
import com.alabenhajsaad.api.config.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/person")
public class PersonController {

    private final PersonService service;

    @PostMapping
    public ResponseEntity<ApiResponse<Person>> createPerson(@RequestBody Person person) {
        return ResponseEntity.ok(ApiResponse.success(
                service.createPerson(person),
                "Personne ajoutée avec succès."
        ));
    }

    @PutMapping
    public ResponseEntity<ApiResponse<Person>> updatePerson(@RequestBody Person person) {
        return ResponseEntity.ok(ApiResponse.success(
                service.updatePerson(person),
                "Personne modifiée avec succès."
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Person>> getPersonById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(
                service.findById(id),
                "Personne récupérée avec succès."
        ));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<Person>>> getPersons(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) PartnerType roleType,
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "8") Integer size
    ) {
        return ResponseEntity.ok(ApiResponse.success(
                service.getPersons(PageRequest.of(page, size), roleType, keyword),
                "Liste des personnes récupérée avec succès."
        ));
    }
}

