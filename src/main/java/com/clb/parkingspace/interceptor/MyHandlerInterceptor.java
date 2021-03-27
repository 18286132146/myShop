
package com.clb.parkingspace.interceptor;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.clb.parkingspace.annotation.PassToken;
import com.clb.parkingspace.annotation.UserLoginToken;
import com.clb.parkingspace.po.SysUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.Method;

public class MyHandlerInterceptor implements HandlerInterceptor {
    /*@Autowired
    ISysUserService userService;*/

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object object) throws Exception {

        String path=request.getServletPath();
        if(path.contains("/needers/") && (!path.contains("addNeeders.html"))){
            Object loginNeeder=request.getSession().getAttribute("loginNeeder");
            if(loginNeeder==null){
                request.setAttribute("msg","没有权限请先登录");
                String basePath=request.getContextPath();
                response.sendRedirect(basePath+"/page/login/login.html");
                return false;
            }else {
                //已经登录
                return true;
            }
        }
        //已经登录
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest,
                           HttpServletResponse httpServletResponse,
                           Object o, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest,
                                HttpServletResponse httpServletResponse,
                                Object o, Exception e) throws Exception {
    }
}
