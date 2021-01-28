package com.clb.parkingspace.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.UnknownHostException;
import java.util.List;
import java.util.Map;

public class Tools {
    public static String findKuaiDiInfo(String orderId) {
        String host = "https://wuliu.market.alicloudapi.com";// 【1】请求地址 支持http 和 https 及 WEBSOCKET
        String path = "/kdi";  // 【2】后缀
        String appcode = "d50166a39aa24cbeb650ee452bf1dd4e"; // 【3】开通服务后 买家中心-查看AppCode
        String no =orderId;// "DPK330146968653";// 【4】请求参数，详见文档描述
        String type = ""; //  【4】请求参数，不知道可不填 95%能自动识别
        String urlSend = host + path + "?no=" + no + "&type=" + type;  // 【5】拼接请求链接
        try {
            URL url = new URL(urlSend);
            HttpURLConnection httpURLCon = (HttpURLConnection) url.openConnection();
            httpURLCon.setRequestProperty("Authorization", "APPCODE " + appcode);// 格式Authorization:APPCODE (中间是英文空格)
            int httpCode = httpURLCon.getResponseCode();
            if (httpCode == 200) {
                String json = read(httpURLCon.getInputStream());
                return json;
            } else {
                Map<String, List<String>> map = httpURLCon.getHeaderFields();
                String error = map.get("X-Ca-Error-Message").get(0);
                if (httpCode == 400 && error.equals("Invalid AppCode `not exists`")) {
                    return"AppCode错误 ";
                } else if (httpCode == 400 && error.equals("Invalid Url")) {
                    return"请求的 Method、Path 或者环境错误";
                } else if (httpCode == 400 && error.equals("Invalid Param Location")) {
                    return("参数错误");
                } else if (httpCode == 403 && error.equals("Unauthorized")) {
                    return("服务未被授权（或URL和Path不正确）");
                } else if (httpCode == 403 && error.equals("Quota Exhausted")) {
                    return("套餐包次数用完 ");
                } else {
                    return("参数名错误 或 其他错误");
                }
            }

        } catch (MalformedURLException e) {
            return("URL格式错误");
        } catch (UnknownHostException e) {
            return("URL地址错误");
        } catch (Exception e) {
            // 打开注释查看详细报错异常信息
            // e.printStackTrace();
        }
        return "";
    }

    /*
     * 读取返回结果
     */
    private static String read(InputStream is) throws IOException {
        StringBuffer sb = new StringBuffer();
        BufferedReader br = new BufferedReader(new InputStreamReader(is));
        String line = null;
        while ((line = br.readLine()) != null) {
            line = new String(line.getBytes(), "utf-8");
            sb.append(line);
        }
        br.close();
        return sb.toString();
    }


/* 请求结果：   {
        "status":"0", "msg":"ok", "result":{
        "number":"DPK330146968653", "type":"DEPPON", "list":[{
            "time":"2021-01-22 16:00:00", "status":"预计1月22日16:00前送达"
        },{
            "time":"2021-01-20 02:50:00", "status":"运输中，离开【贵阳转运中心】，下一部门【华中枢纽中心】"
        },{
            "time":"2021-01-19 21:22:00", "status":"运输中，到达贵阳转运中心"
        },{
            "time":"2021-01-19 19:38:00", "status":"运输中，离开【贵阳白云区米兰春天营业部】，下一部门【贵阳转运中心】"
        },{
            "time":"2021-01-19 18:13:00", "status":"您的订单已被收件员揽收,【贵阳白云区米兰春天营业部】库存中"
        }],"deliverystatus":"1", "issign":"0", "expName":"德邦", "expSite":"www.deppon.com", "expPhone":"95353", "logo":
        "https://img3.fegine.com/express/dbl.jpg", "courier":"", "courierPhone":"", "updateTime":
        "2021-01-22 16:00:00", "takeTime":"2天21小时47分"
    }
    }

    Disconnected from
    the target
    VM,address:'127.0.0.1:64898',transport:'socket'
    */

}