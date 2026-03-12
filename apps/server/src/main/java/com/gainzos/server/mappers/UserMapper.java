package com.gainzos.server.mappers;

import com.gainzos.server.entities.User;
import org.mapstruct.Mapper;
import com.gainzos.server.dto.UserDTO;

@Mapper(componentModel = "spring")
public interface UserMapper {
  UserDTO toDTO(User user);
}

