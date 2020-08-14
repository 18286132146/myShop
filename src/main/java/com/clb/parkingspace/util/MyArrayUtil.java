package com.clb.parkingspace.util;

import org.springframework.util.StringUtils;

public class MyArrayUtil {
   public static boolean haveEmptyStr(String array[]){
       for(String str:array){
           if(StringUtils.isEmpty(str)){throw new RuntimeException("有无效的参数值！");}
       }
     return false;
   }

}
