package com.clb.parkingspace.annotation.test;

import org.junit.Test;

public class Show {
    private int age;
    @MyTest()
    @Test
    public void say(){
        System.out.println("dao:"+age);
    }
}
