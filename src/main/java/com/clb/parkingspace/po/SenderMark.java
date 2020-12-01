package com.clb.parkingspace.po;

import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
@TableName(value = "sender_mark")//指定表名
public class SenderMark {
    @TableId(value = "scan_id")
    private String scanId;
    private String senderId;
    private Date lastDate;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date lastScan;
}
