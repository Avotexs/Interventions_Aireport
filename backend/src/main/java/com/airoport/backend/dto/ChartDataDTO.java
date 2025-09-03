package com.airoport.backend.dto;

import java.util.List;
import java.util.Map;

public class ChartDataDTO {
    private List<String> labels;
    private List<DatasetDTO> datasets;
    private String title;

    public ChartDataDTO() {
    }

    public ChartDataDTO(List<String> labels, List<DatasetDTO> datasets, String title) {
        this.labels = labels;
        this.datasets = datasets;
        this.title = title;
    }

    public List<String> getLabels() {
        return labels;
    }

    public void setLabels(List<String> labels) {
        this.labels = labels;
    }

    public List<DatasetDTO> getDatasets() {
        return datasets;
    }

    public void setDatasets(List<DatasetDTO> datasets) {
        this.datasets = datasets;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public static class DatasetDTO {
        private String label;
        private List<Number> data;
        private String backgroundColor;
        private String borderColor;
        private int borderWidth;

        public DatasetDTO() {
            this.borderWidth = 1;
        }

        public DatasetDTO(String label, List<Number> data, String backgroundColor) {
            this.label = label;
            this.data = data;
            this.backgroundColor = backgroundColor;
            this.borderColor = backgroundColor;
            this.borderWidth = 1;
        }

        public String getLabel() {
            return label;
        }

        public void setLabel(String label) {
            this.label = label;
        }

        public List<Number> getData() {
            return data;
        }

        public void setData(List<Number> data) {
            this.data = data;
        }

        public String getBackgroundColor() {
            return backgroundColor;
        }

        public void setBackgroundColor(String backgroundColor) {
            this.backgroundColor = backgroundColor;
        }

        public String getBorderColor() {
            return borderColor;
        }

        public void setBorderColor(String borderColor) {
            this.borderColor = borderColor;
        }

        public int getBorderWidth() {
            return borderWidth;
        }

        public void setBorderWidth(int borderWidth) {
            this.borderWidth = borderWidth;
        }
    }
}