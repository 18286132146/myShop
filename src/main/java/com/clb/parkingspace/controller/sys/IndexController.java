package com.clb.parkingspace.controller.sys;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.clb.parkingspace.dto.UserOnLineList;
import com.clb.parkingspace.po.Needer;
import com.clb.parkingspace.service.INeederService;
import com.clb.parkingspace.service.merch.IMerNeederService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/*import org.thymeleaf.util.StringUtils;*/

@Controller
@RequestMapping("/")
public class IndexController {

    Logger logger = LoggerFactory.getLogger(this.getClass());

    @RequestMapping(value = "/")
    public String index(String pId) {
        return "redirect:/page/market/marketCenter.html";
    }


}
