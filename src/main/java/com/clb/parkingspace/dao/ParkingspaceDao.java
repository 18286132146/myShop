package com.clb.parkingspace.dao;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
/*@Mapper*/
public interface ParkingspaceDao {
    public List<Map<String,Object>> selectAll();
}
