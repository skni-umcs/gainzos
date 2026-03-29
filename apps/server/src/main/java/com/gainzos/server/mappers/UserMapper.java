package com.gainzos.server.mappers;

import com.gainzos.server.entities.User;
import org.mapstruct.Mapper;
import com.gainzos.server.dto.UserDTO;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
  UserDTO toDTO(User user);
  
  @Mapping(target = "metrics", ignore = true)
  @Mapping(target = "workoutTemplates", ignore = true)
  @Mapping(target = "workouts", ignore = true)
  User toEntity(UserDTO userDTO);
}

