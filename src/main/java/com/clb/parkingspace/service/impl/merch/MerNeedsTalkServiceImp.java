package com.clb.parkingspace.service.impl.merch;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.clb.parkingspace.dao.NeederTalkMapper;
import com.clb.parkingspace.dao.merch.MerNeederTalkMapper;
import com.clb.parkingspace.po.merch.MerNeederTalk;
import com.clb.parkingspace.service.merch.IMerNeederTalkService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;

@Service
public class MerNeedsTalkServiceImp extends ServiceImpl<MerNeederTalkMapper,MerNeederTalk> implements IMerNeederTalkService {
@Resource
  private MerNeederTalkMapper merNeederTalkMapper;

    public Object senderMsgInfo(String userId,String lastDate){
        return merNeederTalkMapper.senderMsgInfoCount(userId,lastDate);
    };

    /**
     * 查询发送者新消息数
     * @param userId
     * @param voicerId
     * @param lastDate
     * @return
     */
    public int newMsgNums(String userId,String voicerId,Date lastDate){
        Integer num=merNeederTalkMapper.newMsgNums(userId,voicerId,lastDate);
        return num==null? 0:num;
    };

}
