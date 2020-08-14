package com.clb.parkingspace.service.impl;

import com.clb.parkingspace.dao.CommonMapper;
import com.clb.parkingspace.po.AreaMap;
import com.clb.parkingspace.service.ICommonService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class CommonServiceImp implements ICommonService {

    @Resource
    CommonMapper commonMapper;

    public List<AreaMap> findAreaData(String pId){
       return commonMapper.findAreaData(pId);
    };

}
