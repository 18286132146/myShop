package com.clb.parkingspace.dto;

import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.clb.parkingspace.po.merch.MerWares;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class MerStore {
    private String id;
    private String name;
    private String sellerId;
    private String iconImg;
    private Date createTime;
    private String mainUrl;
    private List<MerWares> waresList;
}
