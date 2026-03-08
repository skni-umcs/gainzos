package com.gainzos.server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.filter.ForwardedHeaderFilter;
import com.gainzos.server.entities.User;
import lombok.extern.slf4j.Slf4j;
import java.util.Collections;
import com.gainzos.server.repository.UserRepository;




@Slf4j
@EnableMethodSecurity
@Configuration
public class SecurityConfig {

  @Bean
  public ForwardedHeaderFilter forwardedHeaderFilter() {
    log.info("[SECURITY][INIT] ForwardedHeaderFilter bean created");
    return new ForwardedHeaderFilter();
  }

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    log.info("[SECURITY][BUILD] Starting to build SecurityFilterChain");
    http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth.anyRequest().permitAll())
            .sessionManagement(session -> session
                    .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
                    .sessionFixation().changeSessionId()
            );

    SecurityFilterChain chain = http.build();
    log.info("[SECURITY][BUILD] SecurityFilterChain built successfully");
    return chain;
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    log.info("[SECURITY][INIT] PasswordEncoder (BCrypt) bean created");
    return new BCryptPasswordEncoder();
  }

  @Bean
  public UserDetailsService userDetailsService(UserRepository userRepository) {
    log.info("[SECURITY][INIT] UserDetailsService bean created");
    return email -> {
      User user = userRepository.findByEmail(email)
              .orElseThrow(() -> {
                log.info("[SECURITY][USER_LOOKUP_FAIL] email={} not found", email);
                return new UsernameNotFoundException("User not found: " + email);
              });

      log.info("[SECURITY][USER_LOADED] email={} username={} role={}", email, user.getUsername(), user.getRole());
      return org.springframework.security.core.userdetails.User.builder()
              .username(user.getUsername())
              .password(user.getPassword())
              .authorities(Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole())))
              .build();
    };
  }

  @Bean
  public AuthenticationManager authenticationManager(
          UserDetailsService userDetailsService,
          PasswordEncoder passwordEncoder) {
    DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider(userDetailsService);
    authenticationProvider.setPasswordEncoder(passwordEncoder);
    log.info("[SECURITY][INIT] AuthenticationManager configured with DaoAuthenticationProvider");
    return new ProviderManager(authenticationProvider);
  }
}
