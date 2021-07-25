package com.clb.parkingspace.controller.merch;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.clb.parkingspace.controller.CommonController;
import com.clb.parkingspace.po.Needer;
import com.clb.parkingspace.po.SenderMark;
import com.clb.parkingspace.po.merch.MerNeeder;
import com.clb.parkingspace.po.merch.MerNeederTalk;
import com.clb.parkingspace.service.ISenderMarkService;
import com.clb.parkingspace.service.merch.IMerNeederService;
import com.clb.parkingspace.service.merch.IMerNeederTalkService;
import com.clb.parkingspace.util.FileUtil;
import com.clb.parkingspace.util.ImageHelper;
import com.clb.parkingspace.util.Random;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.awt.image.ImageObserver;
import java.awt.image.ImageProducer;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/merNeeders")
public class MerchNeedersController extends CommonController {
    @Autowired
    private IMerNeederService merNeederService;
    @Autowired
    private IMerNeederTalkService merNeederTalkService;
    @Value("${merchNeederImpFolder}")
    private String merchNeederImpFolder;
    @Autowired
    private ISenderMarkService senderMarkService;
    @Autowired
    RedisTemplate redisTemplate;

    @RequestMapping(value = "/goIndex")
    public String goCommandGate() {
        return "index";
    }

    @RequestMapping(value = "/goNeederSqual")
    public String goSqual() {
        return "needers/neederSqual";
    }

    @RequestMapping(value = "/goMsgToNeeder")
    public String goMsgToNeeder(String id, String voicerId, Model model, HttpSession session) {
        model.addAttribute("id", id);
        Needer needer = (Needer) session.getAttribute("loginNeeder");
        EntityWrapper<MerNeederTalk> ew = new EntityWrapper();
        ew.eq("voicer_id", needer.getId());
        ew.or("receiver_id", id);
        List<MerNeederTalk> talkList = merNeederTalkService.selectList(ew);
        model.addAttribute("talkList", talkList);
        return "needers/msgToSmb";
    }

    @RequestMapping(value = "listNeeders", method = RequestMethod.POST)
    @ResponseBody
    public Object listNeeders(int pageNo, int pageSize) {
        EntityWrapper ew = new EntityWrapper<MerNeeder>();

        merNeederService.selectList(ew);
        Page page = merNeederService.selectPage(new Page(pageNo, pageSize), ew);
        return page;
    }

    @RequestMapping(value = "merchNeederImpFolder", method = RequestMethod.POST)
    @ResponseBody
    public Object findNeederFolder(String neederName) {
        if (neederName.equals("merchNeederImpFolder")) {
            Map map = new HashMap();
            map.put("merchNeederImpFolder", merchNeederImpFolder);
            return map;
        }
        return null;
    }


    @RequestMapping(value = "/findPic")
    public void findPic(HttpServletRequest request, HttpServletResponse response, @RequestParam String fileName) throws Exception {
        try {
            BufferedImage bufferedImage = ImageIO.read(Files.newInputStream(Paths.get(merchNeederImpFolder + fileName)));
            if (bufferedImage == null) {
                // 如何却没有图片页面显示黑框
                bufferedImage = new BufferedImage(100, 100, BufferedImage.TYPE_INT_RGB);
            }

         //ImageHelper imgStore=new ImageHelper(bufferedImage);
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



    @RequestMapping(value = "/goAddNeeders.do")
    public String addNeeders(String hasId, HttpSession session, Model modle) {
        return "addNeeders";
    }

    @RequestMapping(value = "/goEditNeeder.do")
    public String goEditNeeder(HttpSession session, Model modle) {
        //老用户，回显数据
        MerNeeder needer = (MerNeeder) session.getAttribute("merLoginNeeder");
        MerNeeder needer2 = merNeederService.selectById(needer.getId());

        modle.addAttribute("needer", needer2);
        return "/page/merch/editNeeders.html";
    }

    @RequestMapping(value = "/addNeeders.do", method = RequestMethod.POST)
    @ResponseBody
    public Object addNeeders(@RequestParam(value = "file", required = true) MultipartFile file,
                             @RequestParam(value = "name", required = false) String name,
                             @RequestParam(value = "sex", required = false) String sex,
                             @RequestParam(value = "age", required = true) int age,
                             @RequestParam(value = "province", required = false) String province,
                             @RequestParam(value = "city", required = false) String city,
                             @RequestParam(value = "county", required = false) String county, @RequestParam(value = "detail", required = false) String detail,
                             @RequestParam(value = "idCard", required = false) String idCard, @RequestParam(value = "memo", required = false) String memo, HttpServletRequest request,
                             @RequestParam(value = "password", required = true) String password, @RequestParam(value = "phone", required = false) String phone) throws Exception {
        Map map = new HashMap<String, Object>();
        EntityWrapper ew = new EntityWrapper();
        ew.eq("phone", phone);
        List<MerNeeder> list = merNeederService.selectList(ew);
        if (list.size() > 0) {
            map.put("result", "no");
            map.put("msg", "该电话已经注册，请直接登录！");
            return map;
        }


        //name和addrinfo是表单提交的数据 因为文件上传有可能带有其他参数   但是名字要与表单里的名字一样
        MerNeeder needer = new MerNeeder();
        String id = Random.getId();
        needer.setId(id);
        needer.setAge(age);
        needer.setSex(sex);
        needer.setArea(county + detail);
        needer.setCity(city);
        needer.setIdCard(idCard);
        needer.setMemo(memo);
        needer.setName(name);
        needer.setProvince(province);
        needer.setPhone(phone);
        String fileName = file.getOriginalFilename(); //获取文件名
        fileName = fileName.substring(fileName.indexOf("."), fileName.length());
        needer.setPassword(password);
        if (!file.isEmpty()) {
            String path = merchNeederImpFolder;//写你的路径 这里不写了
            File targetFile1 = new File(path, id + fileName);
            String neederPath = targetFile1.getAbsolutePath();
            try {
                if (!targetFile1.exists()) {//判断f 如果不存在,就创建
                    try {
                        targetFile1.mkdirs();
                        targetFile1.createNewFile();//创建
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
                file.transferTo(targetFile1);
                needer.setImgUrl(id + fileName);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        merNeederService.insert(needer);
        map.put("result", "success");
        return map;
    }

    @RequestMapping(value = "/editNeeders.do", method = RequestMethod.POST)
    @ResponseBody
    public Object editNeeders(@RequestParam(value = "file", required = true) MultipartFile file,
                              @RequestParam(value = "name", required = false) String name,
                              @RequestParam(value = "sex", required = false) String sex,
                              @RequestParam(value = "age", required = true) int age,
                              @RequestParam(value = "province", required = false) String province,
                              @RequestParam(value = "city", required = false) String city,
                              @RequestParam(value = "county", required = false) String county, @RequestParam(value = "detail", required = false) String detail,
                              @RequestParam(value = "idCard", required = false) String idCard, @RequestParam(value = "memo", required = false) String memo, HttpServletRequest request,
                              @RequestParam(value = "password", required = false) String password, @RequestParam(value = "phone", required = false) String phone) throws Exception {
        Map map = new HashMap<String, Object>();
        EntityWrapper ew = new EntityWrapper();
        byte[] b=file.getBytes();
        ew.eq("phone", phone);
        MerNeeder needSe = (MerNeeder) request.getSession().getAttribute("merLoginNeeder");
        EntityWrapper ewr = new EntityWrapper();
        ewr.eq("id", needSe.getId());
        MerNeeder nee = merNeederService.selectOne(ewr);
        //name和addrinfo是表单提交的数据 因为文件上传有可能带有其他参数   但是名字要与表单里的名字一样
        // Needer needer = new Needer();
        nee.setAge(age);
        nee.setSex(sex);
        nee.setArea(county + detail);
        nee.setCity(city);
        nee.setIdCard(idCard);
        nee.setMemo(memo);
        nee.setName(name);
        nee.setProvince(province);
        nee.setPhone(phone);
        String fileName = "";
        String oldFileName = nee.getImgUrl();
        boolean isNewImg=false;
        if (file != null) {
            fileName = file.getOriginalFilename(); //获取文件名
            if(!fileName.isEmpty()){
                isNewImg=true;//更换图片
            }
        } else {
            Map result = new HashMap<>();
            result.put("msg", "头像不能为空！");
            return result;
        }
        if (fileName.isEmpty()) {
            fileName = nee.getImgUrl();//编辑时没有更改图片，图片名称就是用户id
        }
            if (fileName.contains(".")) {
            String fileEnd = fileName.substring(fileName.indexOf("."), fileName.length());
            fileName = nee.getId() + fileEnd;
        }
        if (!(file == null) && !fileName.isEmpty() && isNewImg) {
            String path = merchNeederImpFolder;//图片保存路径
            if(!oldFileName.equals(fileName)){
                File oldFile = new File(path, oldFileName);
                oldFile.delete();
            }
            try {
                FileUtil.writeFile(path,fileName,file);
                nee.setImgUrl(fileName);
            } catch (Exception e) {
                e.printStackTrace();
                map.put("result", "fail");
                return map;
            }
        }
        merNeederService.update(nee, ewr);
        map.put("result", "success");
        return map;
    }
    @RequestMapping(value = "/merCheckOrRegis.do" ,method = RequestMethod.POST)
    @ResponseBody
   public Object merCheckOrRegis(@RequestParam(value = "phone", required = true)String phone,HttpSession session){
        Wrapper<MerNeeder> merEn=new EntityWrapper<>();
        merEn.eq("phone",phone);
        List<MerNeeder> merNeederList=merNeederService.selectList(merEn);
        Map resultMap=new HashMap();
        if(merNeederList==null||merNeederList.size()==0){
            MerNeeder m=  new MerNeeder();
            m.setId(Random.getId());
            m.setPhone(phone);
            m.setRole(0);
            m.setImgUrl("konglong.png");
            merNeederService.insert(m);
            session.setAttribute("merLoginNeeder",m);
            resultMap.put("chatUrl", "page/merch/chatPanel.html");
            resultMap.put("result","yes");
            return resultMap;
        }else{
            MerNeeder merNeeder=merNeederList.get(0);
            if(merNeeder.getRole()==0){
                session.setAttribute("merLoginNeeder",merNeeder);
            }
            String userId=merNeeder.getId();
            resultMap.put("merLogiId",userId);
            MerNeeder needer=merNeederService.selectById(userId);
            boolean isHasNewMs= needer.isHasNewMsg();
            if(isHasNewMs==true){//查询消息发送者
                Wrapper<SenderMark> seEw=new EntityWrapper();
                seEw.eq("scan_id",needer.getId());
                List<SenderMark> li=senderMarkService.selectList(seEw);
                if(li.size()>0){
                    if(li.size()==1){
                        SenderMark sm=li.get(0);
                        resultMap.put("merchId", sm.getSenderId());
                        resultMap.put("chatUrl", "page/merch/chatPanel.html");
                        resultMap.put("result","yes");
                        return  resultMap;
                    }else{
                        resultMap.put("chatUrl", "page/chart/merMsgCenter.html");
                        resultMap.put("result","yes");
                        return  resultMap;
                    }

                }
            }
            resultMap.put("chatUrl", "page/merch/chatPanel.html");
            resultMap.put("result","yes");
            return  resultMap;
        }

   }
}
