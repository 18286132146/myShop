package com.clb.parkingspace.controller.merch;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.clb.parkingspace.dto.SenderMarkVo;
import com.clb.parkingspace.dto.UserOnLineList;
import com.clb.parkingspace.po.Needer;
import com.clb.parkingspace.po.NeederTalk;
import com.clb.parkingspace.po.SenderMark;
import com.clb.parkingspace.po.merch.MerNeeder;
import com.clb.parkingspace.po.merch.MerNeederTalk;
import com.clb.parkingspace.service.ISenderMarkService;
import com.clb.parkingspace.service.merch.IMerNeederService;
import com.clb.parkingspace.service.merch.IMerNeederTalkService;
import com.clb.parkingspace.util.Random;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.*;

/**
 * 商,用户聊天控制器
 */
@Controller
@RequestMapping("/merchChat")
public class MerchChatController {
    @Autowired
   private IMerNeederTalkService merNeederTalkService;
    @Autowired
    private IMerNeederService merNeederService;
   Logger logger= LoggerFactory.getLogger(this.getClass());
    @Autowired
    private UserOnLineList userOnLineList;
    @Autowired
    private ISenderMarkService senderMarkService;

    @RequestMapping(value = "/sendMsg.do", method = RequestMethod.POST)
    @ResponseBody
    public Object sendMsg(@RequestParam("senderId")String senderId, @RequestParam("receiverId")String receiverId,  @RequestParam("txt")String txt){
        Map<String,String> result=new HashMap<String,String>();
        try {
           MerNeederTalk talk=new MerNeederTalk();
            talk.setId(Random.getId());
           talk.setVoicerId(senderId);
           talk.setContent(txt);
           talk.setReceiverId(receiverId);
            talk.setCreateTime(new Date());
           merNeederTalkService.insert(talk);
            /**
             * 标记接收者有新消息
             */
            EntityWrapper nE= new EntityWrapper<MerNeeder>();
            nE.eq("id",receiverId);
           MerNeeder neder=merNeederService.selectOne(nE);
            neder.setHasNewMsg(true);
            merNeederService.update(neder,nE);
            /**
             * 标记接收者有新消息
             */
           EntityWrapper<SenderMark> ew=new EntityWrapper();
            ew.eq("sender_id",senderId);
            ew.and().eq("scan_id",receiverId);
            SenderMark sdm=senderMarkService.selectOne(ew);
            if(sdm==null){//标记发送人消息为最新消息
                SenderMark sder=new SenderMark();
                sder.setScanId(receiverId);
                sder.setLastDate(new Date());
                sder.setSenderId(senderId);
                sder.setFlash(false);//标记未查看
                senderMarkService.insert(sder);
            }else if(sdm.isFlash()){//消息没有被查看不更新最后一次浏览时间
                sdm.setLastDate(new Date());
                sdm.setFlash(false);//标记未查看
                senderMarkService.update(sdm,ew);
            }
            result.put("msg","yes");
           return result;
       }catch (Exception e){
            logger.warn(e.toString());
       }
        result.put("msg","no");
        return result;
    }

    @RequestMapping(value = "/goChatPan.do")
    @ResponseBody
    public Object goChartPan(String receiverId, HttpSession session){
        EntityWrapper ew=new EntityWrapper();
        Map paramMap=new HashMap();
        ew.eq("receiver_id",receiverId);
        MerNeeder loginNeeder=(MerNeeder)session.getAttribute("merLoginNeeder");
        ew.or().eq("voicer_id",loginNeeder.getId());
        ew.orderBy("create_time",false);
        paramMap.put("detailList",merNeederTalkService.selectList(ew));
        EntityWrapper ew2=new EntityWrapper();
        ew2.eq("id",receiverId);
        MerNeeder needer= merNeederService.selectOne(ew2);
        paramMap.put("receiver",needer);
        paramMap.put("sender",loginNeeder);
        //刷新最后一次浏览消息中心时间
     /*   needer.setLastScan(new Date());
        neederService.update(needer,ew2);*/
        EntityWrapper<SenderMark> ew3=new EntityWrapper();
        ew3.eq("sender_id",receiverId);//发送消息的对方id
        ew3.and().eq("scan_id",loginNeeder.getId());
        SenderMark sdm=senderMarkService.selectOne(ew3);
        if(sdm!=null){
            sdm.setLastDate(new Date());
            sdm.setFlash(true);//标记消息已查看
            senderMarkService.update(sdm,ew3);
        }
        return paramMap;
    }
    @RequestMapping(value = "/afterMsg.do")
    @ResponseBody
    public Object afterMsg(@RequestParam(value = "sinceTime",required = false)String sinceTime,
                           @RequestParam("receiverId")String receiverId,@RequestParam("senderId")String senderId){

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
       List<NeederTalk> list= merNeederTalkService.selectList(ew);
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
        Needer loginNeeder=(Needer)session.getAttribute("loginNeeder");
        String userId=loginNeeder.getId();
        MerNeeder needer=merNeederService.selectById(userId);
        boolean isHasNewMs= needer.isHasNewMsg();
        data.put("hasNewMsg",isHasNewMs);
        return  data;
    }

    /**
     * 发送人信息和发送的消息内容,初始化消息中心页
     * @param session
     * @return
     */
    @RequestMapping(value = "/findSendersMsg.do")
    @ResponseBody
    public Object senderMsg(HttpSession session) {
        EntityWrapper<NeederTalk> ewt=new EntityWrapper();
        Needer loginNeeder=(Needer)session.getAttribute("loginNeeder");
        String userId=loginNeeder.getId();

        EntityWrapper<SenderMark> sdm=new EntityWrapper();
        sdm.eq("scan_id",userId);
        List<SenderMark> listSenMk=senderMarkService.selectList(sdm);
        List<SenderMarkVo> vL=new ArrayList<>();
        for(SenderMark mk: listSenMk){
            String senderId=mk.getSenderId();
            MerNeeder needer=merNeederService.selectById(mk.getSenderId());
            if(needer==null){continue;}
            String img=needer.getImgUrl();
            SenderMarkVo v= new SenderMarkVo();
            v.setHeadImg(img);//头像
            BeanUtils.copyProperties(mk,v);
            int msgNum=merNeederTalkService.newMsgNums(userId,senderId,mk.getLastDate());
            v.setNewMsgNum(msgNum);//消息数量
            vL.add(v);
        }

        /**
         * 标记新消息为已查看（用户needer表）标记接收者没有新消息
         */
        EntityWrapper nE= new EntityWrapper<Needer>();
        nE.eq("id",userId);
        MerNeeder neder=merNeederService.selectOne(nE);
        neder.setHasNewMsg(false);
        merNeederService.update(neder,nE);
        return vL;
    };

    /**
     * 离开对话面板,设置新消息未查看
     * @param session
     * @return
     */
    @RequestMapping(value = "/leaveDialog.do")
    @ResponseBody
    public Object leaveDialog(HttpSession session,String receiverId) {
        EntityWrapper<NeederTalk> ewt=new EntityWrapper();
        Needer loginNeeder=(Needer)session.getAttribute("loginNeeder");
        String userId=loginNeeder.getId();
        EntityWrapper<SenderMark> sdm=new EntityWrapper();
        sdm.eq("scan_id",userId);
        sdm.and().eq("sender_id",receiverId);
        SenderMark sk=senderMarkService.selectOne(sdm);
        if(sk!=null){
            sk.setFlash(false);//离开对话页，标记消息未查看
        }
        senderMarkService.update(sk,sdm);
        return null;
    };
}
