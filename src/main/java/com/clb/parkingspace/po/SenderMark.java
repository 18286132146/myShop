package com.clb.parkingspace.po;

import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
@TableName(value = "sender_mark")//指定表名
public class SenderMark {
    private String scanId;
    @TableId(value = "sender_id")
    private String senderId;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date lastDate;
    private boolean flash;
}
