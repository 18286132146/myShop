package com.clb.parkingspace.util;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
public class Random {

	public static String getId(){  
        String id=UUID.randomUUID().toString();//生成的id942cd30b-16c8-449e-8dc5-028f38495bb5中间含有横杠  
        id=id.replace("-", "");//替换掉中间的那个斜杠  
        return id;  
    }
}
