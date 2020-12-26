package com.clb.parkingspace.dao.sys;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.clb.parkingspace.po.sys.SysRole;
import com.clb.parkingspace.po.sys.SysRolePriv;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SysRolePrivMapper extends BaseMapper<SysRolePriv> {
}
