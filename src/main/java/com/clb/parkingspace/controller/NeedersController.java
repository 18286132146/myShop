package com.clb.parkingspace.controller;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.clb.parkingspace.po.AreaMap;
import com.clb.parkingspace.po.Needer;
import com.clb.parkingspace.po.NeederTalk;
import com.clb.parkingspace.service.INeederService;
import com.clb.parkingspace.service.INeederTalkService;
import com.clb.parkingspace.util.FileUtil;
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
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.image.BufferedImage;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Controller
@RequestMapping("/needers")
public class NeedersController extends CommonController {
    @Autowired
    private INeederService neederService;
    @Autowired
    private INeederTalkService neederTalkService;
    @Value("${neederImpFolder}")
    private String neederImpFolder;

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
        EntityWrapper<NeederTalk> ew = new EntityWrapper();
        ew.eq("voicer_id", needer.getId());
        ew.or("receiver_id", id);
        List<NeederTalk> talkList = neederTalkService.selectList(ew);
        model.addAttribute("talkList", talkList);
        return "needers/msgToSmb";
    }

    @RequestMapping(value = "listNeeders", method = RequestMethod.POST)
    @ResponseBody
    public Object listNeeders(int pageNo, int pageSize) {
        EntityWrapper ew = new EntityWrapper<Needer>();

        neederService.selectList(ew);
        Page page = neederService.selectPage(new Page(pageNo, pageSize), ew);
        return page;
    }

    @RequestMapping(value = "neederImpFolder", method = RequestMethod.POST)
    @ResponseBody
    public Object findNeederFolder(String neederName) {
        if (neederName.equals("neederImpFolder")) {
            Map map = new HashMap();
            map.put("neederImpFolder", neederImpFolder);
            return map;
        }
        return null;
    }


    @RequestMapping(value = "/findPic")
    public void findPic(HttpServletRequest request, HttpServletResponse response, @RequestParam String fileName) throws Exception {
        try {
            BufferedImage bufferedImage = ImageIO.read(Files.newInputStream(Paths.get(neederImpFolder + fileName)));
            if (bufferedImage == null) {
                // 如何却没有图片页面显示黑框
                bufferedImage = new BufferedImage(100, 100, BufferedImage.TYPE_INT_RGB);
            }
            OutputStream outputStream = response.getOutputStream();
            response.setHeader("Content-Disposition", "inline; filename=image.jpg");
            response.setContentType("image/jpeg");
            ImageIO.write(bufferedImage, "jpeg", outputStream);
            outputStream.flush();
            outputStream.close();
        } catch (Exception e) {
            logger.info(e.toString());
        }


    }


    @RequestMapping(value = "/goAddNeeders.do")
    public String addNeeders(String hasId, HttpSession session, Model modle) {
        return "addNeeders";
    }

    @RequestMapping(value = "/goEditNeeder.do")
    public String goEditNeeder(HttpSession session, Model modle) {
        //老用户，回显数据
        Needer needer = (Needer) session.getAttribute("loginNeeder");
        Needer needer2 = neederService.selectById(needer.getId());

        modle.addAttribute("needer", needer2);
        return "needers/editNeeders";
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
        List<Needer> list = neederService.selectList(ew);
        if (list.size() > 0) {
            map.put("result", "no");
            map.put("msg", "该电话已经注册，请直接登录！");
            return map;
        }


        //name和addrinfo是表单提交的数据 因为文件上传有可能带有其他参数   但是名字要与表单里的名字一样
        Needer needer = new Needer();
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
            String path = neederImpFolder;//写你的路径 这里不写了
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
        neederService.insert(needer);
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
        Needer needSe = (Needer) request.getSession().getAttribute("loginNeeder");
        EntityWrapper ewr = new EntityWrapper();
        ewr.eq("id", needSe.getId());
        Needer nee = neederService.selectOne(ewr);
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
            String path = neederImpFolder;//图片保存路径
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
        neederService.update(nee, ewr);
        map.put("result", "success");
        return map;
    }

}
