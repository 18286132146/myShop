package com.clb.parkingspace.controller;

import com.alibaba.fastjson.JSONObject;
import com.clb.parkingspace.annotation.UserLoginToken;
import com.clb.parkingspace.po.SysUser;
import com.clb.parkingspace.service.ISysUserService;
import com.clb.parkingspace.util.security.MD5Util;
import com.clb.parkingspace.util.security.Token;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api")
public class UserApi {
    @Autowired
    ISysUserService userService;
  /*  @Autowired
    TokenService tokenService;*/
    //登录ds
    @PostMapping("/login")
    public Object login(@RequestBody SysUser user){
        JSONObject jsonObject=new JSONObject();
        SysUser userForBase=userService.findByUsername(user.getUsername());
        if(userForBase==null){
            jsonObject.put("message","登录失败,用户不存在");
            return jsonObject;
        }else {
            String password=MD5Util.inputPassToFormPass(user.getPassword());
            if (!password.equals(userForBase.getPassword())){
                jsonObject.put("message","登录失败,密码错误");
                return jsonObject;
            }else {
                String token = Token.getToken(userForBase);
                jsonObject.put("token", token);
                jsonObject.put("user", userForBase);
                return jsonObject;
            }
        }
    }
    @UserLoginToken
    @GetMapping("/getMessage")
    public String getMessage(){
        return "你已通过验证";
    }
}