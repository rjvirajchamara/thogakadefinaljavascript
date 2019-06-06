package lk.ijse.thogakade.service;

import lk.ijse.thogakade.dto.oderDto;

/**
 * Created by chamara on 9/10/2018.
 */
public interface oderService {
    void saveoder (String id, oderDto oderDto);


    void updateoder(String id, oderDto oderDto);
}
