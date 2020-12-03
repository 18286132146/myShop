package com.clb.parkingspace.controller.sys;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.clb.parkingspace.dto.UserOnLineList;
import com.clb.parkingspace.po.Needer;
import com.clb.parkingspace.service.ICommonService;
import com.clb.parkingspace.service.INeederService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.thymeleaf.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/sys")
public class SysController {
/*    @Autowired
   private ICommonService commonService;*/
    @Autowired
    private UserOnLineList userOnLineList;


@Autowired
private INeederService neederService;
    Logger logger=LoggerFactory.getLogger(this.getClass());
    @RequestMapping(value = "/toLogin.do")
    public String findAreaData(String pId){

        return "login/login";
    }

    @RequestMapping(value = "/login.do",method = RequestMethod.POST)
    @ResponseBody
    public Object login(@RequestParam(value = "username",required = true) String username,@RequestParam("password") String password,HttpServletRequest request){
        HttpSession session =request.getSession();
        Map map=new HashMap();
        map.put("username",username);
        EntityWrapper ew=new EntityWrapper();
        ew.eq("phone",username);
        ew.and().eq("password",password);
        List<Needer> nrList=neederService.selectList(ew);
        if(nrList.size()==0){
            map.put("msg","请检查用户名和密码是否正确！");
            map.put("result","no");
            return map;
        }
            session.setAttribute("loginNeeder",nrList.get(0));
        userOnLineList.add(nrList.get(0).getId());//用户上线
        userOnLineAmont();
            map.put("result","yes");
            return map;
    }

@RequestMapping(value = "/userOnLineAmont.do")
@ResponseBody
public Object userOnLineAmont(){
    int amount=userOnLineList.howManyOnLine();
    System.out.println("==============有==："+amount+"========人在线！");
    return amount;
}

    @RequestMapping(value = "/userHeartBeat.do")
    @ResponseBody
    public Object userHeartBeat(@RequestParam(value = "userId" ,required =true) String userId){
        int amount=userOnLineList.howManyOnLine();
        System.out.println("==============有==："+amount+"========人在线！");
        return amount;
    }



}
