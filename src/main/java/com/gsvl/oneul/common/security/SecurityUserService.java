package com.gsvl.oneul.common.security;

import com.gsvl.oneul.common.security.model.CustomUserPrincipal;
import com.gsvl.oneul.user.UserMapper;
import com.gsvl.oneul.user.model.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Arrays;


//이곳에서 로그인을 위해 sel,회원가입을 위한 join을 묶어줌
@Service
public class SecurityUserService implements UserDetailsService {
    @Autowired private UserMapper mapper;

    //uid로만 분기
    @Override
    public UserDetails loadUserByUsername(String u_id) throws UsernameNotFoundException {
        System.out.println(u_id);
        return new CustomUserPrincipal(loadUserByUsernameAndProvider(u_id,1));
    }

    //uid,pfnum을 같이써서
    public UserEntity loadUserByUsernameAndProvider(String id, int u_pfunum) throws UsernameNotFoundException {
        UserEntity param = new UserEntity();
        param.setU_pfnum(u_pfunum);
        param.setU_id(id);
        UserEntity resultEntity  = mapper.selUser(param);
        if(resultEntity==null){
            if(u_pfunum==1){
                throw new AuthenticationServiceException(String.format("아이디를 찾을수 없음"));
            }
        }


        return resultEntity;
    }

    //회원가입
    public int join(UserEntity param) {
        System.out.println(param);
        if(param == null) { return 0; }
        return mapper.join(param);
    }

}
