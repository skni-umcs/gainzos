package com.gainzos.server.config;

import com.gainzos.server.services.CustomUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashSet;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class RoleRefreshFilter extends OncePerRequestFilter {

    private final CustomUserDetailsService userDetailsService;

    public RoleRefreshFilter(CustomUserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(
        HttpServletRequest request,
        HttpServletResponse response,
        FilterChain filterChain
    ) throws ServletException, IOException {
        Authentication currentAuth = SecurityContextHolder.getContext().getAuthentication();

        if (currentAuth != null && currentAuth.isAuthenticated() && !(currentAuth.getPrincipal() instanceof String)) {
            try {
                UserDetails latestUser = userDetailsService.loadUserByUsername(currentAuth.getName());

                boolean rolesChanged = !new HashSet<>(currentAuth.getAuthorities())
                    .equals(new HashSet<>(latestUser.getAuthorities()));

                if (rolesChanged) {
                    var refreshedAuth = new UsernamePasswordAuthenticationToken(
                        latestUser,
                        currentAuth.getCredentials(),
                        latestUser.getAuthorities()
                    );
                    refreshedAuth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(refreshedAuth);
                }
            } catch (UsernameNotFoundException ignored) {
            }
        }

        filterChain.doFilter(request, response);
    }
}
