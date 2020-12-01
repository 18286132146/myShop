package com.clb.parkingspace.service.impl;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.clb.parkingspace.mapper.DParkingLockMapper;
import com.clb.parkingspace.po.DParkingLock;
import com.clb.parkingspace.service.IDParkingLockService;
import org.springframework.stereotype.Service;

@Service
public class DParkingLockServiceImp extends ServiceImpl<DParkingLockMapper,DParkingLock> implements IDParkingLockService {

}
