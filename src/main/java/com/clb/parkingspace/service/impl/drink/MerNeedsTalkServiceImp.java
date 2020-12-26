package com.clb.parkingspace.service.impl.drink;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.clb.parkingspace.dao.NeederTalkMapper;
import com.clb.parkingspace.dao.drink.DriNeederTalkMapper;
import com.clb.parkingspace.po.merch.MerNeederTalk;
import com.clb.parkingspace.service.drink.IMerNeederTalkService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;

@Service
public class MerNeedsTalkServiceImp extends ServiceImpl<DriNeederTalkMapper,MerNeederTalk> implements IMerNeederTalkService {
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
