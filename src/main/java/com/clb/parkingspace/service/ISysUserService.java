package com.clb.parkingspace.service;

import com.baomidou.mybatisplus.service.IService;
import com.clb.parkingspace.po.SysUser;

public interface ISysUserService extends IService<SysUser> {
   public SysUser findUserById(String id);
    public SysUser findByUsername (String userName);
}
