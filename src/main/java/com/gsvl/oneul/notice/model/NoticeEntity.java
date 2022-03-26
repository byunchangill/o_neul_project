package com.gsvl.oneul.notice.model;

import lombok.Data;

@Data
public class NoticeEntity {

    private int inotice;
    private int iuser;
    private String n_title;
    private String n_ctnt;
    private int n_hits;
    private int n_isdel;
    private String n_rdt;
    private String n_mdt;
}
