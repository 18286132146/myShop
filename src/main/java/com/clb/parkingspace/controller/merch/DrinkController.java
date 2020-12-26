package com.clb.parkingspace.controller.merch;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.clb.parkingspace.controller.CommonController;
import com.clb.parkingspace.po.Needer;
import com.clb.parkingspace.po.merch.DriCust;
import com.clb.parkingspace.service.drink.IDriCustService;
import com.clb.parkingspace.util.Random;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/drink")
public class DrinkController extends CommonController {

    @Value("${drinkImpFolder}")
    private String drinkImpFolder;
    @Autowired
    private IDriCustService driCustService;

    @RequestMapping(value = "/goDrinkSqual")
    public String goSqual() {
        return "merch/drinkSqual";
    }

    @RequestMapping(value = "/goAddNeeders.do")
    public String addNeeders(String hasId, HttpSession session, Model modle) {
        return "addNeeders";
    }

    @RequestMapping(value = "/listMyCust.do")
    @ResponseBody
    public Object listMyCust( @RequestParam(value = "current", required = false)Integer current, @RequestParam(value = "size",required = false)Integer size,
            @RequestParam(value = "name", required = false)String name,
            @RequestParam(value = "phone", required = false)String phone,
            HttpSession session, Model modle,HttpServletRequest request) {

        EntityWrapper<DriCust> en=new EntityWrapper();
        Needer user=(Needer)session.getAttribute("loginNeeder");
        en.eq("ownner",user.getId());
        if(name!=null&& !StringUtils.isEmpty(name)){
            en.and().like("name","%"+name+"%");
        }
        if(phone!=null &&!StringUtils.isEmpty(phone)){
            en.and().eq("phone",phone);
        }
        int intotal=driCustService.selectCount(en);
        //driCustService.selectList(en);
        Page p=new Page<DriCust>(current,size);
        Page page=driCustService.selectPage(p,en);

        return page.getRecords();
    }

    @RequestMapping(value = "/addCust.do", method = RequestMethod.POST)
    @ResponseBody
    public Object addNeeders(
                             @RequestParam(value = "name", required = false) String name,
                             @RequestParam(value = "sex", required = false) String sex,
                             @RequestParam(value = "age", required = false) Integer age,
                             @RequestParam(value = "province", required = false) String province,
                             @RequestParam(value = "city", required = false) String city,
                             @RequestParam(value = "county", required = false) String county,
                             @RequestParam(value = "detail", required = false) String resource,
                             @RequestParam(value = "detail", required = false) String detail,
                             @RequestParam(value = "phone", required = false) String phone,
                             @RequestParam(value = "memo", required = false) String memo,
                              HttpServletRequest request
                             ) throws Exception {
        Map map = new HashMap<String, Object>();
        EntityWrapper<DriCust> ew = new EntityWrapper();
        ew.eq("phone", phone);
        List<DriCust> list = driCustService.selectList(ew);
        if (list.size() > 0) {
            map.put("result", "no");
            map.put("msg", "该顾客已存在！");
            return map;
        }
        //name和addrinfo是表单提交的数据 因为文件上传有可能带有其他参数   但是名字要与表单里的名字一样
        DriCust cust = new DriCust();
        String id = Random.getId();
        cust.setCustId(id);
        cust.setAge(age);
        cust.setSex(sex);
        cust.setArea(county + detail);
        cust.setCity(city);
        cust.setRemark(memo);
        cust.setName(name);
        cust.setProvince(province);
        cust.setPhone(phone);
        Needer ned=(Needer)request.getSession().getAttribute("loginNeeder");
        cust.setOwnner(ned.getId());
        driCustService.insert(cust);
        map.put("result", "success");
        return map;
    }

}
