package com.clb.parkingspace.service;

import com.baomidou.mybatisplus.service.IService;
import com.clb.parkingspace.po.Needer;
import com.clb.parkingspace.po.NeederTalk;

import java.util.Date;

public interface INeederTalkService extends IService<NeederTalk>{
 public Object senderMsgInfo(String userId,String lastDate);

 public int newMsgNums(String userId,String voicerId ,Date lastDate);
}
