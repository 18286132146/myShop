package com.clb.parkingspace.po.sys;

import com.baomidou.mybatisplus.annotations.TableName;
import lombok.Data;

@Data
@TableName(value ="sys_role_priv")
public class SysRolePriv {
    private String id;
    private String userId;
    private String menuId;
    private String roleId;
}
