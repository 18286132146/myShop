
package com.clb.parkingspace.interceptor;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class MerchHandlerInterceptor implements HandlerInterceptor {
    /*@Autowired
    ISysUserService userService;*/

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object object) throws Exception {

        String path=request.getServletPath();
        if(path.contains("drink")|| path.contains("driCustList")){
            Object merLoginNeeder=request.getSession().getAttribute("merLoginNeeder");
            if(merLoginNeeder==null){
                request.setAttribute("msg","没有权限请先登录");
                String basePath=request.getContextPath();
                response.sendRedirect(basePath+"/page/login/merLogin.html");
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
