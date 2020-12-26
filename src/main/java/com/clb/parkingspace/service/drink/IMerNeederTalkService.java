package com.clb.parkingspace.service.drink;

import com.baomidou.mybatisplus.service.IService;
import com.clb.parkingspace.po.merch.MerNeederTalk;

import java.util.Date;

public interface IMerNeederTalkService extends IService<MerNeederTalk>{
 public Object senderMsgInfo(String userId, String lastDate);

 public int newMsgNums(String userId, String voicerId, Date lastDate);
}
