package com.clb.parkingspace.controller.merch;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.clb.parkingspace.controller.CommonController;
import com.clb.parkingspace.po.Needer;
import com.clb.parkingspace.po.merch.DriCust;
import com.clb.parkingspace.po.merch.MerStore;
import com.clb.parkingspace.service.merch.IDriCustService;
import com.clb.parkingspace.service.merch.IStoresService;
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
@RequestMapping("/market")
public class MerchMaketController extends CommonController {

    @Value("${drinkImpFolder}")
    private String drinkImpFolder;
    @Autowired
    private IStoresService storesService;


    @RequestMapping(value = "/listStoresForMenus.do")
    @ResponseBody
    public Object listStoresForMenus(String name, @RequestParam(value = "storeid", required = false)String storeid,
           HttpServletRequest request) {

        EntityWrapper<MerStore> en=new EntityWrapper();
        if(!StringUtils.isEmpty(storeid)){
            en.eq("id",storeid);
        }
        en.orderBy("privalege",false);
        List<MerStore> list=storesService.selectStoreWaresList(storeid);
    /*  int intotal=storesService.selectCount(en);*/
        //storesService.selectList(en);
     /*   Page p=new Page<MerStore>(current,size);
        Page page=storesService.selectPage(p,en);*/

        return list;
    }

}
