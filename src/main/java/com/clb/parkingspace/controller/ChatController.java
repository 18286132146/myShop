package com.clb.parkingspace.controller;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.clb.parkingspace.dto.UserOnLineList;
import com.clb.parkingspace.po.Needer;
import com.clb.parkingspace.po.NeederTalk;
import com.clb.parkingspace.service.INeederService;
import com.clb.parkingspace.service.INeederTalkService;
import com.clb.parkingspace.util.Random;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.*;

/*聊天*/
@Controller
@RequestMapping("/chat")
public class ChatController {
    @Autowired
   private INeederTalkService neederTalkService;
    @Autowired
    private INeederService neederService;
   Logger logger= LoggerFactory.getLogger(this.getClass());
    @Autowired
    private UserOnLineList userOnLineList;

    @RequestMapping(value = "/sendMsg.do", method = RequestMethod.POST)
    @ResponseBody
    public Object sendMsg(@RequestParam("senderId")String senderId, @RequestParam("receiverId")String receiverId,  @RequestParam("txt")String txt){
        Map<String,String> result=new HashMap<String,String>();
        try {
           NeederTalk talk=new NeederTalk();
            talk.setId(Random.getId());
           talk.setVoicerId(senderId);
           talk.setContent(txt);
           talk.setReceiverId(receiverId);
            talk.setCreateTime(new Date());
           neederTalkService.insert(talk);
            result.put("msg","yes");
           return result;
       }catch (Exception e){
            logger.warn(e.toString());
       }
        result.put("msg","no");
        return result;
    }

    @RequestMapping(value = "/goChatPan.do")
    public String goChartPan(Model model, String receiverId, HttpSession session){
        EntityWrapper ew=new EntityWrapper();
        ew.eq("receiver_id",receiverId);
        Needer loginNeeder=(Needer)session.getAttribute("loginNeeder");
        ew.or().eq("voicer_id",loginNeeder.getId());
        ew.orderBy("create_time",false);
        model.addAttribute("detailList",neederTalkService.selectList(ew));
        EntityWrapper ew2=new EntityWrapper();
        ew2.eq("id",receiverId);
       Needer needer= neederService.selectOne(ew2);
       model.addAttribute("receiver",needer);
        model.addAttribute("sender",loginNeeder);
        return "needers/chatPanel";
    }
    @RequestMapping(value = "/afterMsg.do")
    @ResponseBody
    public Object afterMsg(@RequestParam(value = "sinceTime",required = false)String sinceTime, @RequestParam("receiverId")String receiverId,@RequestParam("senderId")String senderId){

       //更新在线心跳
        userOnLineList.updateHearDate(senderId);

        EntityWrapper ew=new EntityWrapper();
        if(StringUtils.isEmpty(sinceTime)){
        }else{
            ew.gt("create_time",sinceTime);
        }
        ew.and().eq("receiver_id",receiverId);
        ew.and().eq("voicer_id",senderId);
        ew.orNew().eq("receiver_id",senderId);
        ew.and().eq("voicer_id",receiverId);
        ew.orderBy("create_time",true);
        if(StringUtils.isEmpty(sinceTime)){
        }else{
            ew.gt("create_time",sinceTime);
        }
       List<NeederTalk> list= neederTalkService.selectList(ew);
       Date lastDataTime=null;
        Map<String,Object> map=new HashMap<>();
       if(list.size()>0){
           map.put("hasMsg","yes");
           map.put("lastMsgData",list);
           return map;
       }
      return  map.put("hasMsg","no");
    }

    @RequestMapping(value = "/checkNewMsg.do")
    @ResponseBody
    public Object checkNewMsg(HttpSession session){
        //查询当前用户是否有新消息
           int i=new java.util.Random().nextInt(10);
        Map data=new HashMap<String,Boolean>();
        EntityWrapper<NeederTalk> ewt=new EntityWrapper();
        Needer loginNeeder=(Needer)session.getAttribute("loginNeeder");
        String userId=loginNeeder.getId();
        //查询最近查看消息时间
        EntityWrapper<Needer> ewn=new EntityWrapper();
        ewn.eq("id",userId);
        Needer nedr=neederService.selectOne(ewn);
        Date lastScan=nedr.getLastScan();
        if(lastScan==null){
            nedr.setLastScan(new Date());
            neederService.update(nedr,ewn);
        }
        ewt.eq("receiver_id",userId);
        ewt.and().gt("create_time",nedr.getLastScan());
        int msgNums=neederTalkService.selectCount(ewt);
           if(msgNums>0){
               data.put("hasNewMsg",true);
               data.put("newMsgs",msgNums);
               return  data;
           }else{
               data.put("hasNewMsg",false);
               return  data;
           }
    }

    /**
     * 发送人信息和发送的消息内容
     * @param session
     * @return
     */
    @RequestMapping(value = "/senderMsg.do")
    @ResponseBody
    public Object senderMsg(HttpSession session) {
        //查询当前用户是否有新消息
        int i=new java.util.Random().nextInt(10);
        Map data=new HashMap<String,Boolean>();
        EntityWrapper<NeederTalk> ewt=new EntityWrapper();
        Needer loginNeeder=(Needer)session.getAttribute("loginNeeder");
        String userId=loginNeeder.getId();
        Calendar ca=Calendar.getInstance();
        ca.setTime(new Date());
        ca.set(Calendar.MONTH,9);
        Date d=ca.getTime();
     /*   new SimpleDateFormat("yyyy-MM-dd HH:ss:mm").parse(d);*/
        return  neederTalkService.senderMsgInfo(userId,"2019-10-11 12:00:00");
    };
}
