package com.gainzos.server.services;


import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import com.gainzos.server.repository.UserRepository;
import com.gainzos.server.mappers.UserMapper;
import com.gainzos.server.dto.UserDTO;
import com.gainzos.server.dto.UserSessionDTO;
import com.gainzos.server.entities.User;


@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;
  private final UserMapper userMapper;
  private final PasswordEncoder passwordEncoder;

  public List<UserDTO> getAll() {
    return userRepository.findAll().stream()
            .map(userMapper::toDTO)
            .toList();
  }

  public void register(UserDTO userDTO) {
    if (userRepository.findByEmail(userDTO.email()).isPresent()) {
      throw new IllegalArgumentException("Email already in use");
    }

    User user = new User();
    user.setEmail(userDTO.email());
    user.setUsername(userDTO.username());
    user.setPassword(passwordEncoder.encode(userDTO.password()));
    user.setRole("ADMIN");
    userRepository.save(user);
  }


  public UserSessionDTO getSession(String email) {
    return userRepository.findByEmail(email)
            .map(userMapper::toDTO)
            .map(dto -> new UserSessionDTO(dto.email(), dto.role(), dto.username()))
            .orElseThrow(() -> new IllegalStateException("No authenticated user found"));
  }
}
