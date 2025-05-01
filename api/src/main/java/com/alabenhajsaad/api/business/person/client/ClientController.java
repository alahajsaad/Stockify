package com.alabenhajsaad.api.business.person.client;

import com.alabenhajsaad.api.business.person.supplier.Supplier;
import com.alabenhajsaad.api.config.ApiResponse;
import lombok.RequiredArgsConstructor;
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

    @GetMapping()
    public ResponseEntity<ApiResponse<List<Client>>> getAll(){
        return ResponseEntity.ok(ApiResponse.success(service.findAll()));
    }
}
