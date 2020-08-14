
package com.clb.parkingspace.config;


import com.clb.parkingspace.interceptor.MyHandlerInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class MyMvcConfig implements WebMvcConfigurer {

    @Bean
    public WebMvcConfigurer webMvcCongigurer(){
        WebMvcConfigurer configurer=new WebMvcConfigurer() {

            @Override
            public void addViewControllers(ViewControllerRegistry registry) {
/*                registry.addViewController("/sys").setViewName("login");
                registry.addViewController("/main.html").setViewName("dashboard");*/
            }
            @Override
            public void addInterceptors(InterceptorRegistry registry) {
                registry.addInterceptor(new MyHandlerInterceptor())
                        .addPathPatterns("/**")
                        .excludePathPatterns("/css/**", "/js/**","/jqury/**","/**/layer-v3.1.1/**","/**/login.do","/**/img/**")
                        .excludePathPatterns("/**/login.html","/**/sys/toLogin.do","/**/addNeeders.do","/**/goAddNeeders.do","/**/findAreaData");

            }

        };
      return configurer;
    }




}
