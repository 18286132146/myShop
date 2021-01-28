package com.clb.parkingspace.controller.merch;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.clb.parkingspace.controller.CommonController;
import com.clb.parkingspace.po.merch.MerNeeder;
import com.clb.parkingspace.po.merch.MerStore;
import com.clb.parkingspace.po.merch.MerWares;
import com.clb.parkingspace.po.sys.SysRole;
import com.clb.parkingspace.po.sys.SysRolePriv;
import com.clb.parkingspace.service.merch.IMerNeederService;
import com.clb.parkingspace.service.merch.IStoresService;
import com.clb.parkingspace.service.merch.IWaresService;
import com.clb.parkingspace.service.sys.ISysRolePrivService;
import com.clb.parkingspace.util.Random;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.WatchService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Controller
@RequestMapping("/wares")
public class MerchWaresController extends CommonController {

    @Value("${drinkImpFolder}")
    private String drinkImpFolder;
    @Autowired
    private IWaresService waresService;
    @Autowired
    private ISysRolePrivService  priService;
    @Autowired
    private IStoresService storeService;
    @Autowired
    private IMerNeederService merNeederService;
    @Value("${merWareFolder}")
    private String merWareFolder;

    @RequestMapping(value = "/addWare.do")
    @ResponseBody
    public Object addWare(@RequestParam(value = "name", required = true) String name,
                          @RequestParam(value = "price", required = true) BigDecimal price,
                          @RequestParam(value = "minPrice", required = true) BigDecimal minPrice,
                          @RequestParam(value = "file", required = true) MultipartFile file,
                          HttpSession session
    ) {
        Map result=new HashMap<String,String>();
        MerWares merWares = new MerWares();
        Wrapper<MerWares> ew = new EntityWrapper();
        String id=Random.getId();
        merWares.setId(id);
        merWares.setName(name);
        merWares.setPrice(price);
        merWares.setMinPrice(minPrice);
        String fileName = file.getOriginalFilename(); //获取文件名
        fileName = fileName.substring(fileName.indexOf("."), fileName.length());
        String path = merWareFolder;
        File targetFile = new File(path, id + fileName);
        Wrapper storeEw=new EntityWrapper();

        storeEw.eq("seller_id","");
        MerNeeder merNeeder= (MerNeeder)session.getAttribute("merLoginNeeder");
        if(merNeeder!=null){//判断是否具有添加商品权限
           int roleId= merNeeder.getRole();
        Wrapper priEw=new EntityWrapper<SysRolePriv>();
            priEw.eq("role_id",roleId);
           List<SysRolePriv> priLis= priService.selectList(priEw);
           boolean fl=false;
           for(SysRolePriv p:priLis){
              if(p.getPrivleges()==3){
                  fl=true;
              }
           }
         if(fl==false){// 权限检查
             result.put("msg","没有添加商品权限！");
             return result;
         }
        }else {
            //去登录
            result.put("status","201");
            return result;
        }
        Wrapper<MerStore> stoEw=new EntityWrapper();
        stoEw.eq("seller_id",merNeeder.getId());
        List merstList=storeService.selectList(stoEw);
        Object Obj=merstList.get(0);
        if(Obj!=null){
            MerStore store=(MerStore)Obj;
            merWares.setStoreId(store.getId());
            merWares.setManagerId(store.getId());
        }

        try {
            if (!targetFile.exists()) {//判断f 如果不存在,就创建
                try {
                    targetFile.mkdirs();
                    targetFile.createNewFile();//创建
                } catch (IOException e) {
                    e.printStackTrace();
                };
            }
            file.transferTo(targetFile);
            merWares.setImgUrl(id + fileName);
        } catch (IOException e) {
            e.printStackTrace();
            result.put("status","no");
            result.put("msg",e.getMessage());
            return result;
        }
        waresService.insert(merWares);
        result.put("status","yes");
        return result;
    }
    @RequestMapping(value = "/findPic")
    public void findPic(HttpServletRequest request, HttpServletResponse response, @RequestParam String fileName) throws Exception {
        try {
            BufferedImage bufferedImage = ImageIO.read(Files.newInputStream(Paths.get(merWareFolder + fileName)));
            if (bufferedImage == null) {
                // 如何却没有图片页面显示黑框
                bufferedImage = new BufferedImage(100, 100, BufferedImage.TYPE_INT_RGB);
            }
            OutputStream outputStream = response.getOutputStream();
            if(fileName.toUpperCase().indexOf("PNG")>0){
                response.setHeader("Content-Disposition", "inline; filename=image.png");
                response.setContentType("image/png");
                ImageIO.write(bufferedImage, "png", outputStream);
            }else{
                response.setHeader("Content-Disposition", "inline; filename=image.jpg");
                response.setContentType("image/jpeg");
                ImageIO.write(bufferedImage, "jpeg", outputStream);
            }
            outputStream.flush();
            outputStream.close();
        } catch (Exception e) {
            //logger.info(e.toString());
        }


    }
    @RequestMapping(value = "/findById.do")
    @ResponseBody
    public Object findById(HttpServletRequest request,@RequestParam(value = "wareId", required = true)String wareId) throws Exception {
        Wrapper<MerWares> waEw=new EntityWrapper();
        MerWares wa=waresService.selectById(wareId);
        MerNeeder merNeeder= merNeederService.selectById(wa.getManagerId());
        wa.getManagerId();
        Map map=new HashMap();
        boolean b= merNeeder.isAccPhone();
        if(b){map.put("managerPhone",merNeeder.getPhone());}
        map.put("status",200);
        map.put("ware",wa);
        return map;
    }


    @RequestMapping(value = "/listByStoreId.do",method = RequestMethod.POST)
    @ResponseBody
    public Object listByStoreId(@RequestParam(value = "storeid", required = false)String storeid,
                                     @RequestParam(value = "curPage", required = false)Integer curPage,
                                     @RequestParam(value = "pageSize", required = false)Integer pageSize,
                                     HttpServletRequest request) {
        EntityWrapper<MerWares> en=new EntityWrapper();
        if(!StringUtils.isEmpty(storeid)){
            en.eq("store_id",storeid);
        }
        Page p=new Page<MerWares>(curPage,pageSize);
        Page page= waresService.selectPage(p,en);
        Map map=new HashMap();
        List<MerWares> list=page.getRecords();
        for(MerWares m:list){
          String name= m.getName();
            if(name.length()>4){
                m.setName(name.substring(0,4)+"*");
            }

        }
        map.put("wareList",page.getRecords());
        return map;
    }
}
