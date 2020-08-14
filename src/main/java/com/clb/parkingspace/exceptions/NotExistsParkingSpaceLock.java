package com.clb.parkingspace.exceptions;

public class NotExistsParkingSpaceLock extends RuntimeException {
    private  String msg;
    public NotExistsParkingSpaceLock(String msg){
        super(msg);
        this.msg=msg;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    @Override
    public String toString() {
        return "NotExistsParkingSpaceLock{" +
                "msg='" + msg + '\'' +
                '}';
    }
}
