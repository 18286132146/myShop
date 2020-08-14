package com.clb.parkingspace.service.impl;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.clb.parkingspace.dao.CommonMapper;
import com.clb.parkingspace.dao.NeederMapper;
import com.clb.parkingspace.po.AreaMap;
import com.clb.parkingspace.po.Needer;
import com.clb.parkingspace.service.ICommonService;
import com.clb.parkingspace.service.INeederService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class NeedserServiceImp extends ServiceImpl<NeederMapper,Needer> implements INeederService {

}
