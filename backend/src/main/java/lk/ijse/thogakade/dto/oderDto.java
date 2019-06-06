package lk.ijse.thogakade.dto;

/**
 * Created by chamara on 9/10/2018.
 */
public class oderDto {

    private  String id;
    private String odername;
    private  String oderdate;

    private oderDto() {

    }

    public oderDto(String id, String odername, String oderdate) {
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
        return "oderDto{" +
                "id='" + id + '\'' +
                ", odername='" + odername + '\'' +
                ", oderdate='" + oderdate + '\'' +
                '}';
    }
}

