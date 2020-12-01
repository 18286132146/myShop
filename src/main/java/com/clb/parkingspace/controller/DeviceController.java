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
    public ResultData reportLocksInfo(@RequestBody DParkingLock lockDto) {
        Logger logger = LoggerFactory.getLogger(this.getClass());
        double lastLeft = -1;
        double lastRight = -1;
        String lastStatus = "";
        double left = -1;
        double right = -1;
        String status = "";
        String uOrDStr = "";
        String msg = "";
        UpOrDown uOrD = new UpOrDown(lockDto.getNum(),null);
        ResultData rd = new ResultData();
        //sad
        if (lockDto != null && !StringUtils.isEmpty(lockDto.getNum())) {
            EntityWrapper w = new EntityWrapper();
            w.eq("num", lockDto.getNum());
            DParkingLock dpl = dParkingLockService.selectOne(w);
            if (dpl != null && lockDto != null) {
                lastLeft = dpl.getLeft();
                lastRight = dpl.getRight();
                if(lastLeft < 2000 && lastLeft > 0 && lastRight < 2000 && lastRight > 0 ){ lastStatus="1";}else{ lastStatus="0";};
                left = lockDto.getLeft();
                right = lockDto.getRight();
                if(left < 2000 && left > 0 && right < 2000 && right > 0 ){ status="1";}else{ status="0";};
                switch (status) {
                    case "1":
                        switch (lastStatus) {
                            case "1": {
                                rd.setCode(200);
                                rd.setCurrTime(DateUtils.getCurrFomatedTime());
                                rd.setMsg("维持锁状态不变");
                                rd.setData(uOrD);
                            }break;
                            case "0": {//当前车位状态为1历史状态为0，说明有车进入车位，响应升闸
                                //判断是否属于已经缴费情况，若属于则将闸放行，将左右距离设置为2000，2000写入数据库
                                if(!true){
                                    //将左右距离设置为2000，2000写入数据库
                                    lockDto.setLeft(2000);
                                    lockDto.setRight(2000);
                                }else {
                                    rd.setCode(200);
                                    rd.setCurrTime(DateUtils.getCurrFomatedTime());
                                    rd.setMsg("车辆已进入，请升闸");
                                    uOrDStr = "U";
                                    uOrD = new UpOrDown(dpl.getNum(), uOrDStr);
                                    rd.setData(uOrD);
                                }
                            }break;
                        }break;
                    case "0":
                        switch (lastStatus) {
                            case "1": {
                                rd.setCode(200);
                                rd.setCurrTime(DateUtils.getCurrFomatedTime());
                                rd.setMsg("车辆申请将闸，请将闸！");
                                uOrDStr="D";
                                uOrD=new UpOrDown(dpl.getNum(),uOrDStr);
                                rd.setData(uOrD);
                            }break;
                            case "0": {
                                rd.setCode(200);
                                rd.setCurrTime(DateUtils.getCurrFomatedTime());
                                rd.setMsg("维持锁状态不变");
                                rd.setData(uOrD);
                            }break;
                        }break;
                }
                dParkingLockService.update(lockDto,w);
                return rd;
            } else {
                logger.info("已新增车位锁" + lockDto.getNum());
                lockDto.setId(Random.getId());
                lockDto.setCreatTime(new Date());
                dParkingLockService.insert(lockDto);
                //ResultData rd = new ResultData();
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
