package com.clb.parkingspace.dao;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.clb.parkingspace.po.Needer;
import com.clb.parkingspace.po.NeederTalk;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Mapper
public interface NeederTalkMapper extends BaseMapper<NeederTalk> {


    @Select("select DISTINCT voicer_id as voicerId,count(*) as msgNum from (select * from needer_talk a, sender_mark b where a.voicer_id=b.sender_id and a.receiver_id=#(userId,jdbcType=VARCHAR) and a.create_time>#{lastDate,jdbcType=VARCHAR} ORDER BY b.last_date desc ) b GROUP BY b.voicer_id")
    public List<Map<String,Object>> senderMsgInfoCount(@Param("userId") String userId, @Param("lastDate") String lastDate);
}
