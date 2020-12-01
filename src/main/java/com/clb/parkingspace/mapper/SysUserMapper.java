package com.clb.parkingspace.mapper;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.clb.parkingspace.po.SysUser;

import java.util.Map;

public interface SysUserMapper extends BaseMapper<SysUser> {
   public SysUser selectByName(String name);
    public Map<String, String> register(String username, String password);
    public Map<String,Object>login(String username,String password);
    public SysUser selectById(int id);
    public boolean addUser(SysUser user);
}
