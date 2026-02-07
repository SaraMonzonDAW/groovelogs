package com.groovelogs;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class GrooveLogsApplication {

    public static void main(String[] args) {
        SpringApplication.run(GrooveLogsApplication.class, args);
    }
}