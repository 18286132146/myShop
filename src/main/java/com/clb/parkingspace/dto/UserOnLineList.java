package com.clb.parkingspace.dto;

import com.clb.parkingspace.dao.SenderMarkMapper;
import com.clb.parkingspace.util.DateUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.Resource;
import java.util.*;


public class UserOnLineList {
   // private List<String> userOnLineList=new ArrayList<String>();
    Logger logger= LoggerFactory.getLogger(this.getClass());

    @Resource
    private SenderMarkMapper senderMarkMapper;//对话消息状态记录

    public UserOnLineList(){

        Thread t = new Thread(){
            @Override
            public void run() {
                while(true){
                    checkHeartAlive();
                    try {
                        Thread.sleep(4000);
                    }catch (Exception e){
                        logger.warn("用户在线心跳异常："+e.toString());
                    }

                }

            }
        };
        t.start();
    }

    protected Map<String,Date> userOnLineMap=new HashMap<>();

    public int howManyOnLine(){
        return this.userOnLineMap.size();
    }
 //上线
    public boolean add(String userId){
        userOnLineMap.put(userId, new Date());
        return true;
    }
//下线
    public boolean leave(String userId){
        if(userOnLineMap.containsKey(userId)){
            userOnLineMap.remove(userId);
            return true;
        }
     return false;
    }

    private void checkHeartAlive(){
        logger.info("===========用户在线心跳检查=============");
        while(userOnLineMap.size()>0){
            Iterator<Map.Entry<String, Date>> ite = userOnLineMap.entrySet().iterator();
            while(ite.hasNext()){
                Map.Entry<String, Date> m = ite.next();
                //如果如果上次心跳超过1分钟就视为下线
                Date now=new Date();
               Date signDate= m.getValue();

               Long min=DateUtils.minDatePoor(now,signDate);
                if(min>1){
                String k=m.getKey();
                    logger.info("===========用户心跳超时，强制下线============="+k);
                    ite.remove();
                    /**
                     * 更改聊天为没有查看新消息
                     */
                   // senderMarkMapper.update();


                }
        }
    }

    }

    public void updateHearDate(String userId){
        userOnLineMap.put(userId,new Date());
    }

}
