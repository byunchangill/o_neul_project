package com.gsvl.oneul.common.utils;

import com.gsvl.oneul.common.CommonMapper;
import com.gsvl.oneul.food.FoodMapper;
import com.gsvl.oneul.common.model.SubKeyEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class NameListBean {
    @Autowired
    private CommonMapper commonMapper;

    private List<SubKeyEntity> f_cookery;
    private List<SubKeyEntity> f_worlddiv;
    private List<SubKeyEntity> igd;
    private List<SubKeyEntity> f_season;
    private List<SubKeyEntity> alknm;
    private List<SubKeyEntity> tvlist;

    private List<SubKeyEntity> makeSingleton(List<SubKeyEntity> list, int num){
        if(list==null){
            list=commonMapper.selSubKeyList(num);
        }
        return list;
    }

    @Bean("f_cookery")
    public List<SubKeyEntity> getF_cookery(){
        return makeSingleton(f_cookery,2);
    }
    @Bean("f_worlddiv")
    public List<SubKeyEntity> getF_worlddiv(){
        return makeSingleton(f_worlddiv,4);
    }
    @Bean("f_season")
    public List<SubKeyEntity> getF_season(){
        return makeSingleton(f_season,3);
    }
    @Bean("igd")
    public List<SubKeyEntity> getIgd(){
        return makeSingleton(igd,7);
    }
    @Bean("alknm")
    public List<SubKeyEntity> getAlknm(){

        return makeSingleton(alknm,6);
    }
    @Bean("tvlist")
    public List<SubKeyEntity> getTv(){

        return makeSingleton(tvlist,5);
    }
}
