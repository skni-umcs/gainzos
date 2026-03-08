package com.gainzos.server.mappers;

import com.gainzos.server.dto.UserDTO;
import com.gainzos.server.entities.User;
import java.time.LocalDateTime;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-08T23:21:38+0100",
    comments = "version: 1.5.5.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-9.3.1.jar, environment: Java 25.0.2 (Oracle Corporation)"
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
