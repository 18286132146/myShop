package com.clb.parkingspace.service.impl;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.clb.parkingspace.mapper.SysUserMapper;
import com.clb.parkingspace.po.SysUser;
import com.clb.parkingspace.service.ISysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SysUserServiceImp extends ServiceImpl<SysUserMapper, SysUser> implements ISysUserService {
    @Autowired
    SysUserMapper sysUserMapper;

    @Override
    public SysUser findUserById(String id) {
        return sysUserMapper.selectById(id);
    }

    ;

    @Override
    public SysUser findByUsername(String userName) {
        EntityWrapper<SysUser> ew = new EntityWrapper();
        ew.eq("username", userName);
        List<SysUser> userList = sysUserMapper.selectList(ew);
        if (userList != null && userList.size() > 0) {
            return userList.get(0);
        } else {
            return null;
        }
    }

    ;
}
