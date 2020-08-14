package com.clb.parkingspace.service;

import com.baomidou.mybatisplus.service.IService;
import com.clb.parkingspace.po.AreaMap;
import com.clb.parkingspace.po.SysUser;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

public interface ICommonService {
   public List<AreaMap> findAreaData(String pId);
}
