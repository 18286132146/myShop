package com.clb.parkingspace.util;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;

import java.io.*;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.Map;

public class QRCodeUtil {
    private static int width = 500;// 设定二维码的宽度
    private static int height = 500;// 设定二维码的高度
    private static String format = "png";// 设定二维码的图片格式
    /**
     * <h2>由指定链接生成二维码</h2>
     * <p>根据传入的链接，在指定文件夹内生成指定名称的二维码文件（png格式）。</p>
     *
     * @param url  java.lang.String 要编入二维码的URL
     * @param dir  java.lang.String 存储文件夹名（必须存在）
     * @param name java.lang.String 存储文件名
     * @author wxy(kohgylw)
     */
    public synchronized  static boolean createQRCode(String url, String dir, String name,String sourceZipFilePath) throws IOException {
        //对二维码进行必要的设定
        Map<EncodeHintType, Object> hints = new HashMap<>();
        //设定内容的编码格式
        hints.put(EncodeHintType.CHARACTER_SET, "UTF-8");
        //设定图像的错误校正程度：
        //M - ~15%
        //L - ~7%
        //H - ~30%
        //Q - ~25%
        hints.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.M);
        //设定图像外边距（像素）
        hints.put(EncodeHintType.MARGIN, 2);
        try {
            //进行编码并获得一个bit封装对象
            BitMatrix bitMatrix = new MultiFormatWriter().encode(url, BarcodeFormat.QR_CODE, width, height, hints);
            File file = new File(dir, name + ".png");
            if (sourceZipFilePath == null) {
                throw new RuntimeException("源文件夹路径为空！");
            }
            File targetFile = new File( sourceZipFilePath+ "yourQrImgs/"+name + ".png");
            File targetFileP =targetFile.getParentFile();
            if (!targetFileP.exists()) {
                targetFileP.mkdirs();
            }
            Path path = file.toPath();
            File parentF = file.getParentFile();
            if (!parentF.exists()) {
                parentF.mkdirs();
            }
            //file.createNewFile();
            //使用默认设置、将bit封装对象以指定的图像格式、写入至指定文件中
            MatrixToImageWriter.writeToPath(bitMatrix, format, path);
            //至此，一个二维码图像就生成完毕了，或者也可以使用下面的方法将其写出至输出流中
            //MatrixToImageWriter.writeToStream(matrix, fileName, stream);
/**
 *  将生成的图片同时放入打包文件夹
 */
            InputStream qrImg = new FileInputStream(file);
            OutputStream os = new FileOutputStream(targetFile);
            byte[] buffer = new byte[1024];
            int len = 0;
            while ((len = qrImg.read(buffer)) != -1) {
                os.write(buffer, 0, len);
            }
            if (qrImg != null) {
                qrImg.close();
            }
            if (os != null) {
                os.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return true;
    }


    /**
     * <h2>由指定链接生成二维码</h2>
     * <p>根据传入的链接，在指定文件夹内生成指定名称的二维码文件（png格式）。</p>
     *
     * @param url  java.lang.String 要编入二维码的URL
     * @param dir  java.lang.String 存储文件夹名（必须存在）
     * @param name java.lang.String 存储文件名
     * @author wxy(kohgylw)
     */
    public synchronized  static boolean createQRCode(String url, String dir, String name) throws IOException {
        //对二维码进行必要的设定
        Map<EncodeHintType, Object> hints = new HashMap<>();
        //设定内容的编码格式
        hints.put(EncodeHintType.CHARACTER_SET, "UTF-8");
        //设定图像的错误校正程度：
        //M - ~15%
        //L - ~7%
        //H - ~30%
        //Q - ~25%
        hints.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.M);
        //设定图像外边距（像素）
        hints.put(EncodeHintType.MARGIN, 2);
        try {
            //进行编码并获得一个bit封装对象
            BitMatrix bitMatrix = new MultiFormatWriter().encode(url, BarcodeFormat.QR_CODE, width, height, hints);
            File file = new File(dir, name + ".png");
            Path path = file.toPath();
            File parentF = file.getParentFile();
            if (!parentF.exists()) {
                parentF.mkdirs();
            }
            MatrixToImageWriter.writeToPath(bitMatrix, format, path);
           // InputStream qrImg = new FileInputStream(file);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return true;
    }
    /*public static void main(String[] args) {
        String url="http://clbph5t.boxunpark.com/?str=dehbfghnfghnfgsdv";//要生成二维码的链接
        String dir="D://";//输出的文件夹
        String name="mydir";//输出的文件名
        try {
            QRCodeUtil.createQRCode(url, dir, name);//调用工具类中的方法进行生成
        } catch (IOException e) {
            e.printStackTrace();
        }
    }*/


    public static void main(String args[])throws Exception{
        String url="http://g97mru.natappfree.cc/marryMacher/sys/toLogin.do";
        createQRCode(url, "D:/qrImg", "first");
    }


}
