package com.gainzos.server.mappers;

import com.gainzos.server.entities.User;
import org.mapstruct.Mapper;
import com.gainzos.server.dto.UserPostDTO;
import com.gainzos.server.dto.UserDTO;
import com.gainzos.server.dto.UserResponseDTO;

@Mapper(componentModel = "spring")
public interface UserMapper {
  UserDTO toDTO(User user);
  default UserResponseDTO toResponseDTO(User user) {
    return new UserResponseDTO(
            user.getId(),
            user.getUsername(),
            user.getEmail(),
            user.getRole(),
            user.getCreatedAt()
    );
  }
  default UserPostDTO toPostDTO(User user) {
      return new UserPostDTO(
              user.getId(),
              user.getUsername(),
              user.getEmail(),
              user.getPassword()
      );
  }
}

