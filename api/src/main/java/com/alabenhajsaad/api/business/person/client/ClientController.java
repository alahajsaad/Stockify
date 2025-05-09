package com.alabenhajsaad.api.business.person.client;

import com.alabenhajsaad.api.business.person.supplier.Supplier;
import com.alabenhajsaad.api.config.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/client")
public class ClientController {
    private final ClientService service;
    @PostMapping()
    public ResponseEntity<ApiResponse<Client>> addSupplier(@RequestBody Client client){
        return ResponseEntity.ok(ApiResponse.success(service.save(client) ,"client ajoutée avec succès."));
    }
    @PutMapping
    public ResponseEntity<ApiResponse<Client>> updateClient(@RequestBody Client client){
        return ResponseEntity.ok(ApiResponse.success(service.update(client), "Client mis à jour avec succès."));
    }
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Client>> getById(@PathVariable Long id){
        return ResponseEntity.ok(ApiResponse.success(service.findById(id)));
    }
    @GetMapping
    public ResponseEntity<ApiResponse<Page<Client>>> getAll(@RequestParam int page, @RequestParam int size){
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(ApiResponse.success(service.findAll(pageable)));
    }
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<Client>>> search(@RequestParam String keyword){
        return ResponseEntity.ok(ApiResponse.success(service.searchByPhoneNumberOrName(keyword)));
    }

}
