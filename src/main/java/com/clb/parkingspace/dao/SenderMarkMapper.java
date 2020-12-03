package com.clb.parkingspace.dao;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.clb.parkingspace.po.NeederTalk;
import com.clb.parkingspace.po.SenderMark;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

@Mapper
public interface SenderMarkMapper extends BaseMapper<SenderMark> {
}
