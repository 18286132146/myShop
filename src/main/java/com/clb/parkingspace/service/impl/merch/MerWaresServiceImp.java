package com.clb.parkingspace.service.impl.merch;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.clb.parkingspace.dao.merch.MerCustMapper;
import com.clb.parkingspace.dao.merch.MerWaresMapper;
import com.clb.parkingspace.po.merch.DriCust;
import com.clb.parkingspace.po.merch.MerWares;
import com.clb.parkingspace.service.merch.IDriCustService;
import com.clb.parkingspace.service.merch.IWaresService;
import org.springframework.stereotype.Service;

@Service
public class MerWaresServiceImp extends ServiceImpl<MerWaresMapper,MerWares> implements IWaresService {

}
