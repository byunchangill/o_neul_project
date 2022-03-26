package com.gsvl.oneul.common.security.model;

import com.gsvl.oneul.common.security.SocialType;

import java.util.Iterator;
import java.util.Map;

public class KakaoOAuth2UserInfo extends OAuth2UserInfo{
    private Map<String, Object> kakaoAccount;
    private Map<String, Object> kakaoProfile;


    public KakaoOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);

        kakaoAccount = (Map<String, Object>)attributes.get("kakao_account");
        kakaoProfile = (Map<String, Object>)kakaoAccount.get("profile");

    }

    @Override
    public String getId() {
        String email = (String)kakaoAccount.get("email");
        String id = email.split("@")[0];
        return id;
    }

    @Override
    public String getName() {
        return (String) kakaoProfile.get("nickname");
    }

    @Override
    public String getEmail() { //카카오는 이메일 정보 제공 X
        return (String) kakaoAccount.get("email");
    }

    @Override
    public String getImageUrl() {
        return (String) kakaoProfile.get("profile_image_url");
    }

    @Override
    public int getPfnum() {
        return SocialType.KAKAO.getValue();
    }
}
