package com.gsvl.oneul.common.security;

public enum SocialType {
    GOOGLE(4),
    KAKAO(3),
    NAVER(2);

    private int pfnum;
    private final String ROLE_PREFIX = "ROLE_";

    SocialType(int pfnum) {
        this.pfnum = pfnum;
    }

    public int getValue() {
        return pfnum;
    }
    public String getRoleType() {
        return ROLE_PREFIX + pfnum;
    }
    public boolean isEquals(String authority) {
        return this.getRoleType().equals(authority);
    }
}
