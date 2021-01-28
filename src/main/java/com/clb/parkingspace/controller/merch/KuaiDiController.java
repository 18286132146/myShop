package com.clb.parkingspace.controller.merch;


import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.clb.parkingspace.controller.CommonController;
import com.clb.parkingspace.po.merch.DriCust;
import com.clb.parkingspace.po.merch.MerNeeder;
import com.clb.parkingspace.service.merch.IDriCustService;
import com.clb.parkingspace.util.Random;
import com.clb.parkingspace.util.Tools;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.*;

@Controller
@RequestMapping("/kuaiDi")
public class KuaiDiController extends CommonController {

    @Value("${drinkImpFolder}")
    private String drinkImpFolder;
    @Autowired
    private IDriCustService driCustService;


    @RequestMapping(value = "/findKuaiDi.do")
    @ResponseBody
    public Object findKuaiDi(
            @RequestParam(value = "orderId", required = true) String orderId,
            HttpServletRequest request
    ) throws Exception{
     String orderInfo=  Tools.findKuaiDiInfo(orderId);
   //  String   orderInfo= {"orderInfo":"{\"status\":\"0\",\"msg\":\"ok\",\"result\":{\"number\":\"3120020008003\",\"type\":\"YUNDA\",\"list\":[{\"time\":\"2021-01-20 16:35:23\",\"status\":\"【贵阳市】贵州贵阳白云公司-简贵林(16621064520) 已揽收\"}],\"deliverystatus\":\"1\",\"issign\":\"0\",\"expName\":\"韵达快递\",\"expSite\":\"www.yundaex.com\",\"expPhone\":\"95546\",\"logo\":\"https:\\/\\/img3.fegine.com\\/express\\/yd.jpg\",\"courier\":\"\",\"courierPhone\":\"16621064520\",\"updateTime\":\"2021-01-20 16:35:23\",\"takeTime\":\"0天0小时\"}}"};
        //Object o=JSONObject.parse(orderInfo);
        JSONObject jsonObj = new JSONObject(orderInfo);
        Map map=new HashMap();
        map.put("status",jsonObj.get("status"));
        map.put("msg",jsonObj.get("msg"));
        Object o=jsonObj.get("result");
        String arr=null;
        JSONObject jsonObj2 =null;
        if(o!=null){
            jsonObj2= (JSONObject)o;
        }
       String deliverystatus= jsonObj2.get("deliverystatus")==null? "":(String)jsonObj2.get("deliverystatus");
        String issign= jsonObj2.get("issign")==null? "":(String)jsonObj2.get("issign");
        String expName= jsonObj2.get("expName")==null? "":(String)jsonObj2.get("expName");
        String courierPhone= jsonObj2.get("courierPhone")==null? "":(String)jsonObj2.get("courierPhone");
        String updateTime= jsonObj2.get("updateTime")==null? "":(String)jsonObj2.get("updateTime");

        map.put("deliverystatus",deliverystatus);
        map.put("issign",issign);
        map.put("expName",expName);
        map.put("courierPhone",courierPhone);
        map.put("updateTime",updateTime);
        JSONArray jsonArray=(JSONArray)jsonObj2.get("list");
        List<Map<String,String>> list=new ArrayList<>();
        for(int i=0;i<jsonArray.length();i++){
            Map map2=new HashMap();
            JSONObject jo=(JSONObject)jsonArray.get(i);
            String time=(String)jo.get("time");
            String status=(String)jo.get("status");
            //set.add(jo);
            map2.put("time",time);
            map2.put("status",status);
            list.add(map2);
        }
        map.put("list",list);
        return map;
    }

}
