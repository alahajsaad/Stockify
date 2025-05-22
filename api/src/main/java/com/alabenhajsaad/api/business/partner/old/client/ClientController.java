package com.alabenhajsaad.api.business.partner.old.client;

import com.alabenhajsaad.api.config.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


//@RestController
//@RequiredArgsConstructor
//@RequestMapping("api/v1/client")
//public class ClientController {
//    private final ClientService service;
//    @PostMapping
//    public ResponseEntity<ApiResponse<Client>> addClient(@RequestBody Client client){
//        return ResponseEntity.ok(ApiResponse.success(service.save(client) ,"client ajoutée avec succès."));
//    }
//    @PutMapping
//    public ResponseEntity<ApiResponse<Client>> updateClient(@RequestBody Client client){
//        return ResponseEntity.ok(ApiResponse.success(service.update(client), "Client mis à jour avec succès."));
//    }
//    @GetMapping("/{id}")
//    public ResponseEntity<ApiResponse<Client>> getById(@PathVariable Long id){
//        return ResponseEntity.ok(ApiResponse.success(service.findById(id)));
//    }
//    @GetMapping
//    public ResponseEntity<ApiResponse<Page<Client>>> getAll(
//            @RequestParam(defaultValue = "0") int page,
//            @RequestParam(defaultValue = "8") int size ,
//            @RequestParam(required = false) String keyWord){
//        Pageable pageable = PageRequest.of(page, size);
//        return ResponseEntity.ok(ApiResponse.success(service.findAll(pageable , keyWord)));
//    }
//    @GetMapping("/search")
//    public ResponseEntity<ApiResponse<List<Client>>> search(@RequestParam String keyword){
//        return ResponseEntity.ok(ApiResponse.success(service.searchByPhoneNumberOrName(keyword)));
//    }
//
//}
