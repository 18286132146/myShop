/*
package com.clb.parkingspace.util;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.clb.parkingspace.po.DParkingLock;
import com.clb.parkingspace.service.IDParkingLockService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class parkingLockTimer extends Thread{
 private long sleepTime;
 private String lockNum;
 private String goalStatus;//将锁改变到目标状态
 private IDParkingLockService dParkingLockService;
 private EntityWrapper wrapper;
 private DParkingLock lock;
 private Logger logger= LoggerFactory.getLogger(DeviceController.class);

    public parkingLockTimer(long sleepTime, String lockNum, String goalStatus, IDParkingLockService dParkingLockService,DParkingLock lock, EntityWrapper wrapper) {
        this.sleepTime = sleepTime;
        this.lockNum = lockNum;
        this.goalStatus = goalStatus;
        this.dParkingLockService = dParkingLockService;
        this.wrapper = wrapper;
        this.lock=lock;
    }

    @Override
    public void run() {
       try {
           Thread.sleep(sleepTime);
       }catch (Exception e){
           logger.error(e.getMessage());
       }
        dParkingLockService.update(this.lock,this.wrapper);
    }
}
*/
