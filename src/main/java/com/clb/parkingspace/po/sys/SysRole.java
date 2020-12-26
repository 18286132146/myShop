package com.clb.parkingspace.po.sys;

import com.baomidou.mybatisplus.annotations.TableName;
import lombok.Data;

@Data
@TableName(value ="sys_role")
public class SysRole {
    private String id;
    private String role;
    private String creatTime;
}
