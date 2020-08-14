package com.clb.parkingspace.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Configuration
    @EnableSwagger2
    public class Swagger2 {
        /**
         * 是否激活swagger，默认false
         */
        @Value("${swagger.is.enable:#{flase}}")
        private boolean swagger_is_enable;

        @Bean
        public Docket createRestApi() {
            return new Docket(DocumentationType.SWAGGER_2)
                    .enable(swagger_is_enable)
                    .apiInfo(apiInfo())
                    .select()
                    .apis(RequestHandlerSelectors.basePackage("com.clb.parkingspace.controller"))
                    .paths(PathSelectors.any())
                    .build();
        }

        private ApiInfo apiInfo() {
            return new ApiInfoBuilder()
                    .title("车位锁服务接口 Parking lock APIs")
                    .description("贵州车联邦网络科技有限公司")
                    .termsOfServiceUrl("http://www.clbhelp.cn")
                    .version("2.0")
                    .build();
        }

    }
}
