package com.clb.parkingspace.dao;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.clb.parkingspace.po.AreaMap;
import com.clb.parkingspace.po.SysUser;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CommonMapper {
    public List<AreaMap> findAreaData(String pId);
}
