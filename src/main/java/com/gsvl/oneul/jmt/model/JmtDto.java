package com.gsvl.oneul.jmt.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;
@Getter
@Setter
@ToString
public class JmtDto extends JmtEntity{
    private List<String> kakaoIds;
}
