package com.clb.parkingspace.service.merch;

import com.baomidou.mybatisplus.service.IService;
import com.clb.parkingspace.po.merch.DriCust;
import com.clb.parkingspace.po.merch.MerStore;

import java.util.List;

public interface IStoresService extends IService<MerStore>{

    public List<MerStore> selectStoreWaresList(String storeId);
}
