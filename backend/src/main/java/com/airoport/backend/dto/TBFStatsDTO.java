package com.airoport.backend.dto;

import java.util.Map;

public class TBFStatsDTO {
    private double tbfValue;
    private Map<String, Double> monthlyTBF;
    private String title;

    public TBFStatsDTO() {
    }

    public TBFStatsDTO(double tbfValue, Map<String, Double> monthlyTBF, String title) {
        this.tbfValue = tbfValue;
        this.monthlyTBF = monthlyTBF;
        this.title = title;
    }

    public double getTbfValue() {
        return tbfValue;
    }

    public void setTbfValue(double tbfValue) {
        this.tbfValue = tbfValue;
    }

    public Map<String, Double> getMonthlyTBF() {
        return monthlyTBF;
    }

    public void setMonthlyTBF(Map<String, Double> monthlyTBF) {
        this.monthlyTBF = monthlyTBF;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}