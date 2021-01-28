package com.clb.parkingspace;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.digest.DigestUtils;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Scanner;

public class PwdFactory {

	private  String dbPwd;
	private  String redisPwd;
	private  String redisClusterPwd;
	private  String phonePwd;

	private static String srcKey = "shizuishanyinhangmiyaoziduan01";
	
	public  String getDbPwd() {
		//调用解密方法返回原文
		return decode3Des(srcKey,dbPwd);
	}
	
	public void setDbPwd(String dbPwd) {
		this.dbPwd = dbPwd;
	}

	public  String getRedisPwd() {
		return decode3Des(srcKey,redisPwd);
	}

	public  void setRedisPwd(String redisPwd) {
		this.redisPwd = redisPwd;
	}
	
	public String getRedisClusterPwd() {
		return decode3Des(srcKey,redisClusterPwd);
	}

	public void setRedisClusterPwd(String redisClusterPwd) {
		this.redisClusterPwd = redisClusterPwd;
	}
	
	public String getPhonePwd() {
		return decode3Des(srcKey,phonePwd);
	}

	public void setPhonePwd(String phonePwd) {
		this.phonePwd = phonePwd;
	}
	
	/**
     * 转换成十六进制字符串
     * @param username
     * @return
     *
     */
    public static byte[] hex(String key){  
        String f = DigestUtils.md5Hex(key);
        byte[] bkeys = new String(f).getBytes();  
        byte[] enk = new byte[24];  
        for (int i=0;i<24;i++){  
            enk[i] = bkeys[i];  
        }  
        return enk;  
    }
    
    /**
     * 3DES加密
     * @param key 密钥，24位
     * @param srcStr 将加密的字符串
     * @return
     *
     */
    public static String  encode3Des(String key,String srcStr){  
    	byte[] keybyte = hex(key);
    	byte[] src = srcStr.getBytes();
        try {  
           //生成密钥  
           SecretKey deskey = new SecretKeySpec(keybyte, "DESede");
           //加密  
           Cipher c1 = Cipher.getInstance("DESede");
           c1.init(Cipher.ENCRYPT_MODE, deskey);  
           
           String pwd = Base64.encodeBase64String(c1.doFinal(src));
           return pwd;
       } catch (java.security.NoSuchAlgorithmException e1) {  
           // TODO: handle exception  
            e1.printStackTrace();  
       }catch(javax.crypto.NoSuchPaddingException e2){  
           e2.printStackTrace();  
       }catch(Exception e3){
           e3.printStackTrace();  
       }  
       return null;  
   }
    
   /**
    * 3DES解密
    * @param key 加密密钥，长度为24字节  
    * @param desStr 解密后的字符串
    * @return
    *
    */ 
    public static String decode3Des(String key, String desStr){  
    	Base64 base64 = new Base64();
    	byte[] keybyte = hex(key);
    	byte[] src = base64.decode(desStr);
    			
        try {  
            //生成密钥  
            SecretKey deskey = new SecretKeySpec(keybyte, "DESede");  
            //解密  
            Cipher c1 = Cipher.getInstance("DESede");  
            c1.init(Cipher.DECRYPT_MODE, deskey);  
            String pwd = new String(c1.doFinal(src));
            return pwd;
        } catch (java.security.NoSuchAlgorithmException e1) {  
            // TODO: handle exception  
            e1.printStackTrace();  
        }catch(javax.crypto.NoSuchPaddingException e2){  
            e2.printStackTrace();  
        }catch(Exception e3){
            e3.printStackTrace();  
        }  
        return null;          
    }
    
    public static void main(String[] args) {
		String key = "";
		String idcard = "oracle";
//		String idcard = System.getProperty("pwd");
//		String key = System.getProperty("key");

        System.out.println("请输入加密的盐：");
        Scanner sc=new Scanner(System.in);
        String salt= sc.nextLine();
        key=salt;
        System.out.println("请输入密码：");
        Scanner pwdsc=new Scanner(System.in);
       String pwd= pwdsc.nextLine();
        idcard=pwd;
        String encode = encode3Des(key, idcard);


        System.out.println("原串：" + idcard);
        System.out.println("加密串：" + encode);
        System.out.println("解密串：" + decode3Des(key, encode));


    }
}
