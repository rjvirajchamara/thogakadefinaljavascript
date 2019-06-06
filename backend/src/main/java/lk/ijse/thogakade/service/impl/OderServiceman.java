package lk.ijse.thogakade.service.impl;

import lk.ijse.thogakade.dto.oderDto;
import lk.ijse.thogakade.entity.oder;
import lk.ijse.thogakade.repository.oderRepository;
import lk.ijse.thogakade.service.oderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.io.Console;
import java.util.logging.ConsoleHandler;

/**
 * Created by chamara on 9/10/2018.
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS,readOnly = true)

public class OderServiceman implements oderService {

    @Autowired
    private oderRepository repository;

    @Override
    @Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
    public void saveoder(String id, oderDto oder1Dto) {
        if (!oder1Dto.getId().equals(id)) {


        throw new RuntimeException("mistekid");
    }

    oder oder = new oder();
    oder.setId(oder1Dto.getId());
    oder.setOdername(oder1Dto.getOdername());
    oder.setOderdate(oder1Dto.getOderdate());
    repository.save(oder);


}

    @Override
    public void updateoder(String id, oderDto oderDto) {

    }
}

