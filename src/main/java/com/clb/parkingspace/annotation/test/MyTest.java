package com.clb.parkingspace.annotation.test;

import java.lang.annotation.*;

@Target({ElementType.METHOD, ElementType.TYPE})
@Inherited
@Documented
@Retention(RetentionPolicy.RUNTIME)
public @interface MyTest {
    public int age () default  12;
}
