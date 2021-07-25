package com.clb.parkingspace.po.merch;

import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
@TableName(value = "mer_wares")//指定表名
public class MerWares {
    @TableId(value = "id")
    private String id;
    private String name;
    private BigDecimal price;
    private BigDecimal minPrice;
    private String imgUrl;
    private String storeId;
    private String managerId;
    private String imgFloor;//图片横竖
    private String picBase64Str;

}
