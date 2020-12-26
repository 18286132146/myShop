package com.clb.parkingspace.service.impl.sys;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.clb.parkingspace.dao.NeederMapper;
import com.clb.parkingspace.dao.sys.SysRoleMapper;
import com.clb.parkingspace.po.Needer;
import com.clb.parkingspace.po.sys.SysRole;
import com.clb.parkingspace.service.INeederService;
import com.clb.parkingspace.service.sys.ISysRoleService;
import org.springframework.stereotype.Service;

@Service
public class SysRoleServiceImp extends ServiceImpl<SysRoleMapper,SysRole> implements ISysRoleService {

}
