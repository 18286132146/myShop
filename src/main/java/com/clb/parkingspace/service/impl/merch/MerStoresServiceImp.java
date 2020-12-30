package com.clb.parkingspace.service.impl.merch;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.clb.parkingspace.dao.merch.MerCustMapper;
import com.clb.parkingspace.dao.merch.MerStoresMapper;
import com.clb.parkingspace.po.merch.DriCust;
import com.clb.parkingspace.po.merch.MerStore;
import com.clb.parkingspace.service.merch.IDriCustService;
import com.clb.parkingspace.service.merch.IStoresService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class MerStoresServiceImp extends ServiceImpl<MerStoresMapper,MerStore> implements IStoresService {

@Resource
    MerStoresMapper merStoresMapper;
    public List<MerStore> selectStoreWaresList(String storeId){
       return merStoresMapper.selectStoreWaresList(storeId);
    };

}
