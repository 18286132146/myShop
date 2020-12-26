package com.clb.parkingspace.service.impl.sys;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.clb.parkingspace.dao.sys.SysRoleMapper;
import com.clb.parkingspace.dao.sys.SysRolePrivMapper;
import com.clb.parkingspace.po.sys.SysRole;
import com.clb.parkingspace.po.sys.SysRolePriv;
import com.clb.parkingspace.service.sys.ISysRolePrivService;
import com.clb.parkingspace.service.sys.ISysRoleService;
import org.springframework.stereotype.Service;

@Service
public class SysRolePrivServiceImp extends ServiceImpl<SysRolePrivMapper,SysRolePriv> implements ISysRolePrivService {

}
