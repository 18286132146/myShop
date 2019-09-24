package com.clb.parkingspace.controller;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.clb.parkingspace.annotation.UserLoginToken;
import com.clb.parkingspace.po.DParkingLock;
import com.clb.parkingspace.service.*;
import com.clb.parkingspace.util.*;
import com.clb.parkingspace.util.Random;
import com.clb.parkingspace.vo.*;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;


/**
 * 设备控制器
 */
@Controller
@RequestMapping("/deviceController")
public class DeviceController {
    @Autowired
    IDParkingLockService dParkingLockService;
    Logger logger = LoggerFactory.getLogger(this.getClass());
    @Value("${lock.intervalTime}")
    String intervalTime;

    /*    @ApiImplicitParams({
                @ApiImplicitParam(name = "controllerNum", value = "控制器序列号", required = true, paramType = "query", dataType = "string"),
                @ApiImplicitParam(name = "parkingLockNum", value = "车位锁序列号", required = true, paramType = "query", dataType = "string"),
                @ApiImplicitParam(name = "actureHight", value = "车位锁实际高度，单位：毫米", required = true, paramType = "query", dataType = "double")
        })*/
    @UserLoginToken
    @ApiOperation(notes = "/reportLocksInfo", httpMethod = "POST", value = "汇报车位锁信息并获取是否开锁指示")
    @RequestMapping(value = "/reportLocksInfo", method = RequestMethod.POST)
    @ResponseBody
    public ResultData putVehicleIn(@RequestBody DParkingLock lockDto) {
        Logger logger = LoggerFactory.getLogger(this.getClass());
        //sad
        if (lockDto != null && !StringUtils.isEmpty(lockDto.getNum())) {
            EntityWrapper w = new EntityWrapper();
            w.eq("num", lockDto.getNum());
            DParkingLock dpl = dParkingLockService.selectOne(w);
            if (dpl != null) {
                //判断是否已经缴费，如已缴费则发出开闸指令status:1表示有车，0表示无车
                if (lockDto.getStatus().equals("1") && dpl.getStatus().equals("0") && dpl.getUpOrDown().equals("1")) {
                    lockDto.setUpOrDown("0");//更改为将闸状态
                    dParkingLockService.update(lockDto, w);
                    logger.info("已更新车位锁" + dpl.getNum());
                    ResultData rd = new ResultData();
                    rd.setMsg("已缴费请立刻开闸并在" + Integer.parseInt(intervalTime) / 1000 + "秒内将车移除，闸将自动升起，计时开始");
                    rd.setCurrTime(DateUtils.getCurrFomatedTime());
                    rd.setData(new UpOrDown(dpl.getNum(), "D"));
                    rd.setCode(Constant.SUCCESS);
                    //开启计时器
                    lockDto.setUpOrDown("1");
                    parkingLockTimer plt = new parkingLockTimer(Long.parseLong(intervalTime), lockDto.getNum(), "1", dParkingLockService,lockDto, w);
                    plt.start();
                    return rd;
                } else if (lockDto.getStatus().equals("0") && dpl.getStatus().equals("1")&&dpl.getUpOrDown().equals("1")){
                    lockDto.setUpOrDown("0");
                    dParkingLockService.update(lockDto, w);
                    logger.info("已更新车位锁,请将闸" + dpl.getNum());
                    ResultData rd = new ResultData();
                    rd.setCode(Constant.SUCCESS);
                    rd.setMsg("车辆需要进入，请将闸,"+Integer.parseInt(intervalTime) / 1000 +"秒后闸将自动升起");
                    rd.setCurrTime(DateUtils.getCurrFomatedTime());
                    rd.setData(new UpOrDown(dpl.getNum(), "D"));
                    //开启计时器
                    lockDto.setUpOrDown("1");
                    parkingLockTimer plt = new parkingLockTimer(Long.parseLong(intervalTime), lockDto.getNum(), "1", dParkingLockService,lockDto, w);
                    plt.start();
                    return rd;
                } else {
                    dParkingLockService.update(lockDto, w);
                    logger.info("车位锁数据已更新，维持锁状态不变" + dpl.getNum());
                    ResultData rd = new ResultData();
                    rd.setCode(Constant.SUCCESS);
                    rd.setMsg("维持锁状态不变");
                    rd.setCurrTime(DateUtils.getCurrFomatedTime());
                    rd.setData(new UpOrDown(dpl.getNum(), null));
                    return rd;
                }
            } else {
                logger.info("已新增车位锁" + lockDto.getNum());
                lockDto.setId(Random.getId());
                lockDto.setCreatTime(new Date());
                dParkingLockService.insert(lockDto);
                ResultData rd = new ResultData();
                rd.setCode(Constant.SUCCESS);
                rd.setCurrTime(DateUtils.getCurrFomatedTime());
                rd.setMsg("已新增车位锁");
                return rd;
            }

        }
        return null;
    }
    /*@UserLoginToken
    @ApiOperation(notes = "/unlockFeedback", httpMethod = "POST", value = "开锁反馈接口")
    @RequestMapping(value = "/unlockFeedback", method = RequestMethod.POST)
    @ResponseBody
    public ResultData unlockFeedback(@RequestBody DUnlockFeedbackDto dtos) {
        try {
            if (dtos == null || dtos.getParkingLockNums().size() == 0) {
                throw new Exception("控制器序列号或车位锁列表参数不能为空!");
            }
            for (String parkingLockNum : dtos.getParkingLockNums()) {
                DUnlockFeedback duf = new DUnlockFeedback();
                duf.setControllerNum(dtos.getControllerNum());
                duf.setParkingLockNum(parkingLockNum);
                duf.setId(Random.getId());
                duf.setLeaveTime(LocalDateTime.now());
                dUnlockFeedbackService.dUnlockFeedback(duf);
            }
        } catch (Exception e) {
            ResultData rd = ResultData.error(Constant.ERROR, "服务器发生错误！");
            rd.setCurrTime(DateUtils.getCurrFomatedTime());
            rd.setData(e.toString());
            return rd;
        }
        ResultData rd = ResultData.success();
        rd.setCurrTime(DateUtils.getCurrFomatedTime());
        return rd;
    }*/


    @ApiOperation(notes = "/getCurrTime", httpMethod = "POST", value = "获取当前时间")
    @RequestMapping(value = "/getCurrTime", method = RequestMethod.POST)
    @ResponseBody
    public ResultData getCurrTime() {
        String currTime = DateUtils.getCurrFomatedTime();
        ResultData esultData = ResultData.success(currTime);
        esultData.setCurrTime(DateUtils.getCurrFomatedTime());
        return esultData;
    }
}
