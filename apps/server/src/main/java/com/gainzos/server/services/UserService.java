package com.gainzos.server.services;


import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.util.List;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.gainzos.server.repository.UserRepository;
import com.gainzos.server.entities.User;
import com.gainzos.server.mappers.UserMapper;
import com.gainzos.server.dto.UserPostDTO;
import com.gainzos.server.dto.UserResponseDTO;


@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;
  private final UserMapper userMapper;
  private final AuthenticationManager authenticationManager;
  private final PasswordEncoder passwordEncoder;

  public List<UserResponseDTO> getAll() {
    return userRepository.findAll().stream()
            .map(userMapper::toResponseDTO)
            .toList();
  }

  public UserResponseDTO registerUser(UserPostDTO userDTO) {
    if (userRepository.findByUsername(userDTO.username()).isPresent()) {
      throw new RuntimeException("User with login '" + userDTO.username() + "' already exists");
    }

    if (userRepository.findByEmail(userDTO.email()).isPresent()) {
      throw new RuntimeException("User with email '" + userDTO.email() + "' already exists");
    }

    User user = new User();
    user.setUsername(userDTO.username());
    user.setEmail(userDTO.email());
    user.setPassword(passwordEncoder.encode(userDTO.password()));
    user.setRole("USER");
    user.setCreatedAt(java.time.LocalDateTime.now());

    User saved = userRepository.save(user);

    return new UserResponseDTO(saved.getId(), saved.getUsername(), saved.getEmail(), saved.getRole(), saved.getCreatedAt());
  }

  public UserResponseDTO loginUser(UserPostDTO userDTO) {

    User user = userRepository.findByEmail(userDTO.email())
            .orElseThrow(() -> new RuntimeException("User not found: " + userDTO.email()));

    UsernamePasswordAuthenticationToken authInputToken =
            new UsernamePasswordAuthenticationToken(userDTO.email(), userDTO.password());

    try {
      Authentication auth = authenticationManager.authenticate(authInputToken);
      SecurityContextHolder.getContext().setAuthentication(auth);

      return new UserResponseDTO(user.getId(), user.getUsername(), user.getEmail(), user.getRole(), user.getCreatedAt());
    } catch (Exception e) {
      throw e;
    }
  }
}
