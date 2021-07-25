package com.clb.parkingspace.controller;

import com.clb.parkingspace.service.ICommonService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/common")
public class CommonController {
    @Autowired
   private ICommonService commonService;
   protected Logger logger=LoggerFactory.getLogger(this.getClass());

    @RequestMapping(value = "/findAreaData", method = RequestMethod.POST)
    @ResponseBody
    public Object findAreaData(String pId){
       Object o= commonService.findAreaData(pId);
        return o;
    }


}
