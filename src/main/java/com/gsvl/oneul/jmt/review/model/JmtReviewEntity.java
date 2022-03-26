package com.gsvl.oneul.jmt.review.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class JmtReviewEntity {
    private int icmt;
    private int ijmt;
    private int iuser;
    private String j_ctnt;
    private int j_star;
    private String j_rdt;
    private String j_mdt;
    private List<String> j_img;
}
