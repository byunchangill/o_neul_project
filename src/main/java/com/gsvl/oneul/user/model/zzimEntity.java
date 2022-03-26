package com.gsvl.oneul.user.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class zzimEntity extends UserEntity{
    private int ifood;
    private String f_nm;
    private String f_img;

    private int ijmt;
    private String j_placenm;
    private List<String> j_src;
}
