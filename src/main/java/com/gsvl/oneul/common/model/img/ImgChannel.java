package com.gsvl.oneul.common.model.img;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class ImgChannel {
    private String lastBuildDate;
    private int total;
    private int start;
    private int display;
    private List<SearchImgVO> items;
}
