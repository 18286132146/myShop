package com.clb.parkingspace.service.impl;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.clb.parkingspace.dao.NeederMapper;
import com.clb.parkingspace.dao.NeederTalkMapper;
import com.clb.parkingspace.po.Needer;
import com.clb.parkingspace.po.NeederTalk;
import com.clb.parkingspace.service.INeederService;
import com.clb.parkingspace.service.INeederTalkService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;

@Service
public class NeedsTalkServiceImp extends ServiceImpl<NeederTalkMapper,NeederTalk> implements INeederTalkService {
@Resource
  private NeederTalkMapper neederTalkMapper;

    public Object senderMsgInfo(String userId,String lastDate){
        return neederTalkMapper.senderMsgInfoCount(userId,lastDate);
    };

    /**
     * 查询发送者新消息数
     * @param userId
     * @param voicerId
     * @param lastDate
     * @return
     */
    public int newMsgNums(String userId,String voicerId,Date lastDate){
        Integer num=neederTalkMapper.newMsgNums(userId,voicerId,lastDate);
        return num==null? 0:num;
    };

}
