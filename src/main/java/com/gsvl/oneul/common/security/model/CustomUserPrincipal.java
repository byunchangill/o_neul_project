package com.gsvl.oneul.common.security.model;

import com.gsvl.oneul.user.model.UserEntity;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;

public class CustomUserPrincipal implements UserDetails, OAuth2User {
    @Getter private UserEntity user;
    private Map<String, Object> attributes;

    public CustomUserPrincipal(UserEntity user) {
        this.user = user;
    }
    public CustomUserPrincipal(UserEntity user, Map<String, Object> attributes) {
        this.user = user;
        this.attributes = attributes;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return null;
    }

    //권환을 리턴해주는 메소드
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority(user.getAuth()!=null?user.getAuth():"ROLE_USER"));
    }

    @Override
    public String getPassword() {
        return user.getU_pw();
    }

    @Override
    public String getUsername() {
        return user.getU_id();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String getName() {
        return String.valueOf(user.getIuser());
    }
}
