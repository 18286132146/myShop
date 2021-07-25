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
import com.clb.parkingspace.util.FileUtil;
import com.clb.parkingspace.util.ImageHelper;
import com.clb.parkingspace.util.Random;
import com.clb.parkingspace.util.SerializeUtile;
import com.clb.parkingspace.util.security.ProvePrivalege;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import sun.misc.BASE64Encoder;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.image.BufferedImage;
import java.io.*;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.WatchService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * 添加商品
 */
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

    @Autowired
    private ProvePrivalege provePrivalege;
    @Autowired
    RedisTemplate redisTemplate;

    @RequestMapping(value = "/addWare.do")
    @ResponseBody
    public Object addWare(
            @RequestParam(value = "storeId", required = true) String storeId,
            @RequestParam(value = "name", required = true) String name,
                          @RequestParam(value = "price", required = true) BigDecimal price,
                          @RequestParam(value = "minPrice", required = true) BigDecimal minPrice,
                          @RequestParam(value = "file", required = true) MultipartFile file,
                          @RequestParam(value = "imgFloor", required = false) String imgFloor,
                          HttpSession session
    ) {
        Map result=new HashMap<String,String>();
        MerWares merWares = new MerWares();
        Wrapper<MerWares> ew = new EntityWrapper();
        String id=Random.getId();
        merWares.setId(id);
        merWares.setName(name);
        merWares.setPrice(price);
        merWares.setStoreId(storeId);
        merWares.setMinPrice(minPrice);
        merWares.setImgFloor(imgFloor);
        String fileName = file.getOriginalFilename(); //获取文件名
        fileName = fileName.substring(fileName.indexOf("."), fileName.length());
        String path = merWareFolder;
        File targetFile = new File(path, id + fileName);
        Wrapper storeEw=new EntityWrapper();
        storeEw.eq("seller_id","");
        MerNeeder merNeeder= (MerNeeder)session.getAttribute("merLoginNeeder");
        if(merNeeder!=null){//判断是否具有添加商品权限
         boolean fl=provePrivalege.provePriv(session,3);
         if(fl==false){// 权限检查
             result.put("msg","没有编辑商品权限！");
             return result;
         }
        }else {
            //去登录
            result.put("status","201");
            result.put("msg","请登录！");
            return result;
        }
      /*  Wrapper<MerStore> stoEw=new EntityWrapper();
        stoEw.eq("id",storeId);*/
        InputStream in = null;
        try {

            if(!targetFile.exists()){//判断f 如果不存在,就创建
                try {
                    targetFile.mkdirs();
                    targetFile.createNewFile();//创建
                } catch (IOException e) {
                    e.printStackTrace();
                };
            }
            file.transferTo(targetFile);
            merWares.setImgUrl(id + fileName);
           /*
           //保存图片base64格式数据到数据库
           in = new FileInputStream(targetFile);
           byte[] b=new byte[in.available()];
            in.read(b);
            // 对字节数组Base64编码
            BASE64Encoder encoder = new BASE64Encoder();
            String a = encoder.encode(b);
            String pp = a;
            System.out.println(">>>>>>>>pp>>>>>>>>>>>>>"+pp);
            merWares.setPicBase64Str(pp);*/
        } catch (IOException e) {
            e.printStackTrace();
            result.put("status","no");
            result.put("msg",e.getMessage());
            return result;
        }
        merWares.setManagerId(merNeeder.getId());
        waresService.insert(merWares);
        result.put("status","yes");
        return result;
    }
    @RequestMapping(value = "/editWare.do", method = RequestMethod.POST)
    @ResponseBody
    public Object editNeeders( @RequestParam(value = "wareId", required = true) String wareId,
                               @RequestParam(value = "name", required = true) String name,
                               @RequestParam(value = "price", required = true) BigDecimal price,
                               @RequestParam(value = "minPrice", required = true) BigDecimal minPrice,
                               @RequestParam(value = "file", required = true) MultipartFile file,
                               @RequestParam(value = "managerId", required = false) String managerId,
                               @RequestParam(value = "imgFloor", required = false) String imgFloor,

                               HttpSession session) throws Exception {
        //编辑权限校验
        Map result = new HashMap<>();
        boolean isOk=provePrivalege.provePriv(session,3);//验证权限是否为商户
        if(!isOk){
            result.put("status", "202");//没有权限
            result.put("msg", "没有权限！");
            return result;
        }
        Map map = new HashMap<String, Object>();
        EntityWrapper ew = new EntityWrapper();
        byte[] b=file.getBytes();
        ew.eq("id", wareId);
        MerNeeder needSe = (MerNeeder) session.getAttribute("merLoginNeeder");
        EntityWrapper ewr = new EntityWrapper();
        ewr.eq("id", wareId);
        MerWares ware = waresService.selectOne(ewr);
        //name和addrinfo是表单提交的数据 因为文件上传有可能带有其他参数   但是名字要与表单里的名字一样
        // Needer needer = new Needer();
        ware.setName(name);
        ware.setPrice(price);
        ware.setMinPrice(minPrice);
        ware.setImgFloor(imgFloor);
        if(!StringUtils.isEmpty(managerId)){
            ware.setManagerId(managerId);
        }
        String fileName = "";
        String oldFileName = ware.getImgUrl();
        boolean isNewImg=false;
        if (file != null) {
            fileName = file.getOriginalFilename(); //获取文件名
            if(!fileName.isEmpty()){
                isNewImg=true;//更换图片
            }
        } else {
            result.put("msg", "头像不能为空！");
            return result;
        }
        if (fileName.isEmpty()) {
            fileName = ware.getImgUrl();//编辑时没有更改图片，图片名称就是用户id
        }
        if (fileName.contains(".")) {
            String fileEnd = fileName.substring(fileName.indexOf("."), fileName.length());
            fileName = ware.getId() + fileEnd;
        }
        if (!(file == null) && !fileName.isEmpty() && isNewImg) {
            String path = merWareFolder;//图片保存路径
            if(!oldFileName.equals(fileName)){
                File oldFile = new File(path, oldFileName);
                oldFile.delete();
            }
            try {
                FileUtil.writeFile(path,fileName,file);
                ware.setImgUrl(fileName);
            } catch (Exception e) {
                e.printStackTrace();
                map.put("result", "fail");
                return map;
            }
        }
        waresService.update(ware, ewr);
        map.put("status", "200");
        return map;
    }

    @RequestMapping(value = "/findPic")
    public void findPic(HttpServletRequest request, HttpServletResponse response, @RequestParam String fileName) throws Exception {

        try {
            Object obj=redisTemplate.opsForValue().get(fileName.getBytes());
            BufferedImage bufferedImage=null;
            if(obj!=null){//数据库有图片直接去否则查询后放入redis
                byte[] bytes=  (byte[])obj;
                Object obj2= SerializeUtile.unserialize(bytes);
                File file=(File)obj2;
                bufferedImage =ImageIO.read(file);
            }else{
                File file=new File(merWareFolder + fileName);
                //查询到的图片保存到redis缓存10分钟
                redisTemplate.opsForValue().set(fileName.getBytes(), SerializeUtile.serialize(file), 10,TimeUnit.MINUTES);
                logger.info("从硬盘读取图片后已经放入reids缓存10分钟！.");
                bufferedImage =ImageIO.read(file);
            }
            if (bufferedImage == null) {
                // 如何却没有图片页面显示黑框
                bufferedImage = new BufferedImage(100, 100, BufferedImage.TYPE_INT_RGB);
            }

            OutputStream outputStream = response.getOutputStream();
            if(fileName.toUpperCase().contains(".PNG")){
                response.setHeader("Content-Disposition", "inline; filename=image.png");
                response.setContentType("image/png");
                ImageIO.write(bufferedImage, "png", outputStream);
            }else {
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
