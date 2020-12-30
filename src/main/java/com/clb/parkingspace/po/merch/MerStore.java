package com.clb.parkingspace.po.merch;

import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@TableName(value = "mer_store")//指定表名
public class MerStore {
    @TableId(value = "id")
    private String id;
    private String name;
    private String sellerId;
    private String iconImg;
    private Date createTime;
    private String goodsId;
    private String privalege;
    private String mainUrl;
    private List<MerWares> waresList;
}
