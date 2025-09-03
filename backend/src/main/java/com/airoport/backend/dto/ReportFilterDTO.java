package com.airoport.backend.dto;

import java.util.Date;

public class ReportFilterDTO {
    private Date date;
    private Integer aeroportId;
    private Long projetId;

    public ReportFilterDTO() {
    }

    public ReportFilterDTO(Date date, Integer aeroportId, Long projetId) {
        this.date = date;
        this.aeroportId = aeroportId;
        this.projetId = projetId;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Integer getAeroportId() {
        return aeroportId;
    }

    public void setAeroportId(Integer aeroportId) {
        this.aeroportId = aeroportId;
    }

    public Long getProjetId() {
        return projetId;
    }

    public void setProjetId(Long projetId) {
        this.projetId = projetId;
    }
}