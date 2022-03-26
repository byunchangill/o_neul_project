package com.gsvl.oneul.common.security;

import com.gsvl.oneul.common.security.model.*;
import com.gsvl.oneul.user.model.UserEntity;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    @Autowired
    private SecurityUserService securityUserService;

    @SneakyThrows
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        String registrationId = userRequest.getClientRegistration().getRegistrationId();

        Map<String, Object> attributes = oAuth2User.getAttributes();
        Map<String, Object> modifyAttributes = modifyUserAttributes(registrationId, attributes);

        OAuth2UserInfo userInfo = getOauth2UserInfo(registrationId, modifyAttributes);
        UserEntity user = convertOauthToUserEntity(userInfo);
        UserEntity chkUser = securityUserService.loadUserByUsernameAndProvider(user.getU_id(), user.getU_pfnum());

        //DB에 값 있나 체크 없으면 insert
        if(chkUser == null) {
            securityUserService.join(user);
            chkUser = securityUserService.loadUserByUsernameAndProvider(user.getU_id(), user.getU_pfnum());
        }
        CustomUserPrincipal loginUser = new CustomUserPrincipal(chkUser, attributes);
        return loginUser;
    }
    private OAuth2UserInfo getOauth2UserInfo(String registrationId, Map<String, Object> attributes) throws OAuth2AuthenticationProcessingException {
        if(registrationId.equalsIgnoreCase(SocialType.GOOGLE.toString())) {
            return new GoogleOAuth2UserInfo(attributes);
        } else if (registrationId.equalsIgnoreCase(SocialType.KAKAO.toString())) {
            return new KakaoOAuth2UserInfo(attributes);
        } else if (registrationId.equalsIgnoreCase(SocialType.NAVER.toString())) {
            return new NaverOAuth2UserInfo(attributes);
        } else {
            throw new OAuth2AuthenticationProcessingException("Sorry! Login with " + registrationId + " is not supported yet.");
        }
    }
    private UserEntity convertOauthToUserEntity(OAuth2UserInfo userInfo) {
        UserEntity user = UserEntity.builder()
                .u_id(userInfo.getId())
                .u_pw("0")
                .u_profileimg(userInfo.getImageUrl())
                .u_email(userInfo.getEmail())
                .u_nm(userInfo.getName())
                .u_pfnum(userInfo.getPfnum())
                .build();
        return user;
    }

    private Map<String, Object> modifyUserAttributes(String registrationId, Map<String, Object> attributes) {
        Map<String, Object> mod = new HashMap(attributes);
        switch(registrationId) {
            case "naver":
                LinkedHashMap responseData = (LinkedHashMap) mod.get("response");
                mod.putAll(responseData);
                mod.remove("response");
                break;
            case "kakao":
                LinkedHashMap propertiesData = (LinkedHashMap) mod.get("properties");
                mod.putAll(propertiesData);
                mod.remove("properties");
                break;
        }
        return mod;
    }
}
