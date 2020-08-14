package com.clb.parkingspace.dao;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.clb.parkingspace.po.AreaMap;
import com.clb.parkingspace.po.Needer;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface NeederMapper extends BaseMapper<Needer> {
}
