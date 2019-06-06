package lk.ijse.thogakade.entity;

import org.springframework.data.annotation.Id;

import javax.persistence.Entity;

/**
 * Created by chamara on 9/10/2018.
 */
import javax.persistence.Entity;
//import javax.persistence.Id;
@Entity
public class oder {

    @javax.persistence.Id
    private String id;
    private String odername;
    private String oderdate;

    public oder() {

    }

    public oder(String id, String odername, String oderdate) {
        this.id = id;
        this.odername = odername;
        this.oderdate = oderdate;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOdername() {
        return odername;
    }

    public void setOdername(String odername) {
        this.odername = odername;
    }

    public String getOderdate() {
        return oderdate;
    }

    public void setOderdate(String oderdate) {
        this.oderdate = oderdate;

    }

    @Override
    public String toString() {
        return "oder{" +
                "id='" + id + '\'' +
                ", odername='" + odername + '\'' +
                ", oderdate='" + oderdate + '\'' +
                '}';
    }
}