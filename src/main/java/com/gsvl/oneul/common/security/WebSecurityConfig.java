package com.gsvl.oneul.common.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.sql.DataSource;

@Configuration //똑같은 빈 등록인데 설정파일로 등록함 ( application.xml,dispat....xml같이)
@EnableWebSecurity //SpringSecurityFilterChain이 자동으로 포함
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsService userService;
    @Autowired private CustomOAuth2UserService customOauth2UserService;
    @Autowired
    private DataSource dataSource; //Hikari DB연결
    @Autowired private CustomLoginFailHandler customLoginFailHandler;




    @Override
    protected void configure(HttpSecurity http) throws Exception{
        http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers(              //로그인과 상관없이 매칭.
                "/user/mypage" ,"/user/nickname","/jmt/review/**"
                )//로그인 안됐을때 못들어가게
                .authenticated()// 위 주소창들은 인증authenitcated을 받아야한다.
                .anyRequest().permitAll()//나머지는 다 통과

                .and() //그대로 이 값(http)를 사용하겠다

                .formLogin() //세큐리티 로그인 폼
                .loginPage("/user/login")
                .usernameParameter("u_id") //defualt : username
                .passwordParameter("u_pw") //default : password -> 같으면 안적어도 됨
                .failureHandler(customLoginFailHandler)
                .defaultSuccessUrl("/")
                .permitAll()
                .and()
                .oauth2Login()
                .loginPage("/user/login")
                .defaultSuccessUrl("/")
                .failureUrl("/user/login")
                .userInfoEndpoint() //OAuth 2 로그인 성공 이후 사용자 정보를 가져올 때의 설정
                .userService(customOauth2UserService);



        http.logout()
                .logoutRequestMatcher(new AntPathRequestMatcher("/user/logout"))
                .invalidateHttpSession(true)
                .logoutSuccessUrl("/user/login")
                .permitAll();

    }
    @Override
    public void configure(WebSecurity web){
        web.ignoring().antMatchers("/css/**","/js/**","/img/**","/font/**","/video/**","/error","favicon.ico");
    }

    @Override
    public void configure(AuthenticationManagerBuilder auth)throws Exception{
        auth.userDetailsService(userService).passwordEncoder(passwordEncoder());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
