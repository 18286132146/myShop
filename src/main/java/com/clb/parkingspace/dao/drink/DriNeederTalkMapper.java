package com.clb.parkingspace.dao.drink;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.clb.parkingspace.po.merch.MerNeederTalk;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Mapper
public interface DriNeederTalkMapper extends BaseMapper<MerNeederTalk> {


    @Select(
            "select DISTINCT voicer_id as voicerId,count(*)as msgNum,img_url as headImg from (select a.*,b.*,c.img_url from dri_needer_talk a right join sender_mark b on a.voicer_id=b.sender_id left join dri_needer c on b.sender_id=c.id\n" +
                    " where  a.receiver_id='ae5e940187c64a5598563ef31f9b2375' and a.create_time>#{lastDate} \n" +
                    "\n" +
                    "ORDER BY b.last_date desc ) \n" +
                    "b GROUP BY b.voicer_id ,img_url")
    public List<Map<String,Object>> senderMsgInfoCount(@Param("userId") String userId, @Param("lastDate") String lastDate);


@Select("select count(*)as msgNum from dri_needer_talk a where   a.receiver_id=#{userId} and a.create_time>=#{lastDate} and a.voicer_id=#{voicerId} \n" +
        "GROUP BY a.voicer_id ")
    public Integer newMsgNums(@Param("userId") String userId, @Param("voicerId") String voicerId, @Param("lastDate") Date lastDate);



}
