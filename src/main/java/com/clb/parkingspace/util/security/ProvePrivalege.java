package com.clb.parkingspace.util.security;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.clb.parkingspace.po.merch.MerNeeder;
import com.clb.parkingspace.po.sys.SysRolePriv;
import com.clb.parkingspace.service.merch.IMerNeederService;
import com.clb.parkingspace.service.sys.ISysRolePrivService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@Configuration
public class ProvePrivalege {
    @Autowired
    private  ISysRolePrivService priService;
    @Autowired
    private IMerNeederService merNeederService;
    private  boolean passOrNo=false;
    public  boolean provePriv(HttpSession session,int pri){
        MerNeeder merNeeder= (MerNeeder)session.getAttribute("merLoginNeeder");
        if(merNeeder!=null){//判断是否具有添加商品权限
            int roleId= merNeeder.getRole();
            Wrapper priEw=new EntityWrapper<SysRolePriv>();
            priEw.eq("role_id",roleId);
            List<SysRolePriv> priLis= priService.selectList(priEw);
           // boolean fl=false;
            for(SysRolePriv p:priLis){
                if(p.getPrivleges()==pri){
                    passOrNo=true;
                }
            }

        }
        return passOrNo;
    }
    public  List userPrivs(HttpSession session){
        List<Integer> priList=new ArrayList<Integer>();
        MerNeeder merNeeder= (MerNeeder)session.getAttribute("merLoginNeeder");
        if(merNeeder!=null){//判断是否具有添加商品权限
            merNeeder=merNeederService.selectById(merNeeder.getId());
            int roleId= merNeeder.getRole();
            Wrapper priEw=new EntityWrapper<SysRolePriv>();
            priEw.eq("role_id",roleId);
            List<SysRolePriv> priLis= priService.selectList(priEw);
            // boolean fl=false;
            for(SysRolePriv p:priLis){
               int pr=p.getPrivleges();
                priList.add(pr);
            }

        }
        return priList;
    }
}
