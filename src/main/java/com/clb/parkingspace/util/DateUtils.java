package com.clb.parkingspace.util;

import java.text.SimpleDateFormat;

public  class DateUtils {
    public static String getCurrFomatedTime(){
        String currTime="";
        SimpleDateFormat sfm=new SimpleDateFormat("yyy-MM-dd HH:mm:ss");
        currTime=sfm.format(System.currentTimeMillis());
        return currTime;
    }
}
