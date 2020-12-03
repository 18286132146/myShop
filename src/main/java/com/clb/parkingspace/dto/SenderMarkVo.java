package com.clb.parkingspace.dto;

import com.clb.parkingspace.po.SenderMark;

public class SenderMarkVo extends SenderMark {
    private int newMsgNum;
    private String headImg;


    public int getNewMsgNum() {
        return newMsgNum;
    }

    public void setNewMsgNum(int newMsgNum) {
        this.newMsgNum = newMsgNum;
    }

    public String getHeadImg() {
        return headImg;
    }

    public void setHeadImg(String headImg) {
        this.headImg = headImg;
    }
}
