package com.gsvl.oneul.common.security;

import com.gsvl.oneul.common.security.model.CustomUserPrincipal;
import com.gsvl.oneul.user.model.UserEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationFacade {
    public UserEntity getLoginUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        CustomUserPrincipal userDetails = (CustomUserPrincipal)auth.getPrincipal();
        return userDetails.getUser();
    }

    public int getLoginUserPk() {
        return getLoginUser().getIuser();
    }
}
