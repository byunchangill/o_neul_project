package com.gsvl.oneul.jmt.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class JmtVO extends JmtEntity{
    private JsonPhotoList[] jpList;
    private JsonMenuList[] jmList;
    private float jstars;
}
