package com.clb.parkingspace.dao.sys;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.clb.parkingspace.po.NeederTalk;
import com.clb.parkingspace.po.sys.SysRole;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Mapper
public interface SysRoleMapper extends BaseMapper<SysRole> {
}
