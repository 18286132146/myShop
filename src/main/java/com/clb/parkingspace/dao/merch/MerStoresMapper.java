package com.clb.parkingspace.dao.merch;

import com.baomidou.mybatisplus.mapper.BaseMapper;

import com.clb.parkingspace.po.merch.DriCust;

import com.clb.parkingspace.po.merch.MerStore;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MerStoresMapper extends BaseMapper<MerStore> {
    public List<com.clb.parkingspace.dto.MerStore> selectStoreWaresList(String storeId);
}
