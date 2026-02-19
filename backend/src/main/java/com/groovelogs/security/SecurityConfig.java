package com.groovelogs.security;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


	@Configuration
	@EnableMethodSecurity
	public class SecurityConfig {
	
	
	private final JwtAuthenticationFilter jwtAuthenticationFilter;
	
	
	public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
	this.jwtAuthenticationFilter = jwtAuthenticationFilter;
	}


	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	
		http
		.cors(cors -> cors.configurationSource(corsConfigurationSource()))
		.csrf(csrf -> csrf.disable())
		.sessionManagement(session ->
		session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
		)
		.authorizeHttpRequests(auth -> auth
		
		.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

		.requestMatchers(
		"/swagger-ui/**",
		"/v3/api-docs/**"
		).permitAll()
	
		.requestMatchers(
		"/api/auth/**"
		).permitAll()
		
		.requestMatchers("/api/discogs/**").permitAll()
		
		.requestMatchers("/api/admin/**").hasRole("ADMIN")
		.requestMatchers("/api/usuarios/**").hasAnyRole("USER", "ADMIN")
		.requestMatchers("/api/favoritos/**").hasAnyRole("USER", "ADMIN")
		.requestMatchers("/api/ratings/**").hasAnyRole("USER", "ADMIN")

		.anyRequest().authenticated()
		)
		.exceptionHandling(exceptions -> exceptions
		.authenticationEntryPoint((request, response, authException) -> {
			response.setStatus(401);
			response.setContentType("application/json");
			response.getWriter().write("{\"error\":\"Unauthorized\"}");
		})
		.accessDeniedHandler((request, response, accessDeniedException) -> {
			response.setStatus(403);
			response.setContentType("application/json");
			response.getWriter().write("{\"error\":\"Access Denied\"}");
		})
		)
		.addFilterBefore(
		jwtAuthenticationFilter,
		UsernamePasswordAuthenticationFilter.class
		);
	
	
	return http.build();
}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {

	    CorsConfiguration config = new CorsConfiguration();

	    config.setAllowedOrigins(List.of(
	        "http://localhost:5173",
	        "https://saramonzondaw.github.io"
	    ));

	    config.setAllowedMethods(
	        List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")
	    );

	    config.setAllowedHeaders(List.of(
	        "Content-Type",
	        "Authorization",
	        "X-Requested-With"
	    ));

	    config.setExposedHeaders(List.of("*"));

	    config.setAllowCredentials(false);

	    config.setMaxAge(3600L);

	    UrlBasedCorsConfigurationSource source =
	        new UrlBasedCorsConfigurationSource();

	    source.registerCorsConfiguration("/**", config);

	    return source;
	}

}

