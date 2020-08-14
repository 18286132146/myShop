package com.clb.parkingspace.service.impl;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.clb.parkingspace.dao.NeederMapper;
import com.clb.parkingspace.dao.NeederTalkMapper;
import com.clb.parkingspace.po.Needer;
import com.clb.parkingspace.po.NeederTalk;
import com.clb.parkingspace.service.INeederService;
import com.clb.parkingspace.service.INeederTalkService;
import org.springframework.stereotype.Service;

@Service
public class NeedsTalkServiceImp extends ServiceImpl<NeederTalkMapper,NeederTalk> implements INeederTalkService {

}
