package com.gainzos.server.mappers;

import com.gainzos.server.dto.UserMetricsDTO;
import com.gainzos.server.entities.UserMetrics;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMetricsMapper {

    @Mapping(source = "user.id", target = "userId")
    UserMetricsDTO toDTO(UserMetrics entity);

    @Mapping(target = "user", ignore = true)
    UserMetrics toEntity(UserMetricsDTO dto);
}