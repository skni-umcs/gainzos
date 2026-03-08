package com.gainzos.server.mappers;

import com.gainzos.server.dto.UserDTO;
import com.gainzos.server.entities.User;
import java.time.LocalDateTime;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-08T18:19:22+0100",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.45.0.v20260224-0835, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserDTO toDTO(User user) {
        if ( user == null ) {
            return null;
        }

        Long id = null;
        String username = null;
        String email = null;
        String password = null;
        String role = null;
        LocalDateTime createdAt = null;

        id = user.getId();
        username = user.getUsername();
        email = user.getEmail();
        password = user.getPassword();
        role = user.getRole();
        createdAt = user.getCreatedAt();

        UserDTO userDTO = new UserDTO( id, username, email, password, role, createdAt );

        return userDTO;
    }
}
