package com.groovelogs.controllers;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/discogs")
@CrossOrigin(origins = "*")
public class DiscogsController {

    @Value("${discogs.token}")
    private String discogsToken;

    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/search")
    public ResponseEntity<String> search(
            @RequestParam Map<String, String> params
    ) {

        StringBuilder url = new StringBuilder(
            "https://api.discogs.com/database/search?"
        );

        params.forEach((key, value) ->
            url.append(key).append("=").append(value).append("&")
        );

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Discogs token=" + discogsToken);
        headers.set("User-Agent", "GrooveLogs/1.0");

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(
            url.toString(),
            HttpMethod.GET,
            entity,
            String.class
        );

        return ResponseEntity.ok(response.getBody());
    }
}

