package com.gsvl.oneul.common.security.model;

import com.gsvl.oneul.common.security.SocialType;

import java.util.Iterator;
import java.util.Map;

public class NaverOAuth2UserInfo extends OAuth2UserInfo{
    public NaverOAuth2UserInfo(Map<String, Object> attributes) {

        super(attributes);


    }

    @Override
    public String getId() {
        String email = (String)attributes.get("email");
        String id = email.split("@")[0];
        return id;
    }

    @Override
    public String getName() {
        return (String) attributes.get("name");
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }

    @Override
    public String getImageUrl() {
        return (String) attributes.get("profile_image");
    }

    @Override
    public int getPfnum() {
        return SocialType.NAVER.getValue();
    }

}
