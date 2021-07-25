package com.clb.parkingspace.util;

import java.awt.image.BufferedImage;
import java.io.Serializable;

public class ImageHelper implements Serializable {
    private BufferedImage bufferedImage;


    public ImageHelper(BufferedImage bufferedImage ){
        this.bufferedImage=bufferedImage;
    };
    public BufferedImage getBufferedImage() {
        return bufferedImage;
    }

    public void setBufferedImage(BufferedImage bufferedImage) {
        this.bufferedImage = bufferedImage;
    }


}
