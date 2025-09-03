package com.airoport.backend.dto;

import java.util.Map;

public class MonthlyStatsDTO {
    private Map<String, Integer> monthlyInterventionCounts;
    private String title;

    public MonthlyStatsDTO() {
    }

    public MonthlyStatsDTO(Map<String, Integer> monthlyInterventionCounts, String title) {
        this.monthlyInterventionCounts = monthlyInterventionCounts;
        this.title = title;
    }

    public Map<String, Integer> getMonthlyInterventionCounts() {
        return monthlyInterventionCounts;
    }

    public void setMonthlyInterventionCounts(Map<String, Integer> monthlyInterventionCounts) {
        this.monthlyInterventionCounts = monthlyInterventionCounts;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}