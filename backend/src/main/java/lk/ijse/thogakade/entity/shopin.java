package lk.ijse.thogakade.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Created by chamara on 9/10/2018.
 */@Entity
public class shopin {
@Id
    private String itemname;
    private int qnt;
    private double price;

    public shopin(){

    }

    public shopin(String itemname, int qnt, double price) {
        this.itemname = itemname;
        this.qnt = qnt;
        this.price = price;
    }

    public String getItemname() {
        return itemname;
    }

    public void setItemname(String itemname) {
        this.itemname = itemname;
    }

    public int getQnt() {
        return qnt;
    }

    public void setQnt(int qnt) {
        this.qnt = qnt;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "shopin{" +
                "itemname='" + itemname + '\'' +
                ", qnt=" + qnt +
                ", price=" + price +
                '}';
    }
}


