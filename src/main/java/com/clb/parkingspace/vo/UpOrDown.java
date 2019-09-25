package com.clb.parkingspace.vo;

public class UpOrDown {
    private String num;
    private String UOrD;//开闸或关闸

    public UpOrDown(String num, String UOrD) {
        this.num = num;
        this.UOrD = UOrD;
    }
    public UpOrDown() {
    }
    public String getNum() {
        return num;
    }

    public void setNum(String num) {
        this.num = num;
    }

    public String getUOrD() {
        return UOrD;
    }

    public void setUOrD(String UOrD) {
        this.UOrD = UOrD;
    }
}
