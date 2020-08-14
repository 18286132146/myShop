package com.clb.parkingspace.po;

import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
@TableName(value = "needer_talk")//指定表名
public class NeederTalk {
    @TableId(value = "id")
    private String id;
    private String voicerId;
    private String receiverId;
    private String phone;
    private String content;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date createTime;
}
