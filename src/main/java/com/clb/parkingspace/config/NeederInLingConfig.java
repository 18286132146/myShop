/*
 * ————————————————————————————————————
 *
 * 版权声明 贵州车联邦网络科技有限公司, 版权所有 违者必究
 *
 * Copyright: Copyright (c) 2019
 * Company： 贵州车联邦网络科技有限公司
 * Author： wujie
 *
 * ————————————————————————————————————
 */

package com.clb.parkingspace.config;

import com.clb.parkingspace.dto.UserOnLineList;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.math.BigInteger;
import java.nio.charset.Charset;
import java.util.List;

/**
 * @description: 用户在线登记
 * @author: wxy
 * @create: 2020-07-30 13:28
 **/
@Configuration
public class NeederInLingConfig  {
 @Bean
 public UserOnLineList createBean(){
    return new UserOnLineList();
 }

}
