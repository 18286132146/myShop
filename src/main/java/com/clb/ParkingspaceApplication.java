package com.clb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.cache.annotation.EnableCaching;


//@EnableEurekaClient
@EnableCaching
@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
public class ParkingspaceApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(ParkingspaceApplication.class, args);
     //   Show s=   new Show();
        //System.out.println(s.say());
    }

    @Override//为了打包springboot项目
    protected SpringApplicationBuilder configure(
            SpringApplicationBuilder builder) {
        return builder.sources(this.getClass());
    }
}
