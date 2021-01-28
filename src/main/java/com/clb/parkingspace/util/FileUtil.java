package com.clb.parkingspace.util;

import org.springframework.web.multipart.MultipartFile;

import java.io.*;

public class FileUtil {
    public  static boolean writeFile(String path, String fileName, MultipartFile file) {
        File filePath = new File(path);
        if (filePath.isDirectory()) {
            filePath.mkdirs();
        }
        FileOutputStream outp = null;
        FileInputStream inp = null;
        InputStream in=null;
        try {
            //文件不存在就创建
            File fileLocal = new File(path+ fileName);
            if (!fileLocal.exists()) {
                fileLocal.createNewFile();
            }
            outp = new FileOutputStream(fileLocal);
            byte[] buffer = new byte[1024];
           in= file.getInputStream();
           // BufferedInputStream b= new BufferedInputStream(in);
            int i =-1;
           while ((i = in.read(buffer)) !=-1) {
                outp.write(buffer);
            }
            outp.flush();


        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (outp != null) {
                try {
                    outp.close();
                } catch (Exception e) {
                    e.printStackTrace();
                }

            }
            if (inp != null) {
                try {
                    inp.close();
                } catch (Exception e) {
                    e.printStackTrace();
                }

            }
            if (in != null) {
                try {
                    in.close();
                } catch (Exception e) {
                    e.printStackTrace();
                }

            }

        }
        return true;
    }
}
