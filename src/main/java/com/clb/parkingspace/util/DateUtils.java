package com.clb.parkingspace.util;

import java.text.SimpleDateFormat;
import java.util.Date;

public  class DateUtils {
    public static String getCurrFomatedTime(){
        String currTime="";
        SimpleDateFormat sfm=new SimpleDateFormat("yyy-MM-dd HH:mm:ss");
        currTime=sfm.format(System.currentTimeMillis());
        return currTime;
    }


    public static long minDatePoor(Date endDate, Date nowDate) {

        long nd = 1000 * 24 * 60 * 60;
        long nh = 1000 * 60 * 60;
        long nm = 1000 * 60;
        // long ns = 1000;

        long diff = endDate.getTime() - nowDate.getTime();

        long day = diff / nd;

        long hour = diff % nd / nh;

        long min = diff % nd % nh / nm;
        // long sec = diff % nd % nh % nm / ns;
        return min;
    }


}
