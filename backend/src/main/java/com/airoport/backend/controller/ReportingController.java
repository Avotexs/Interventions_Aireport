package com.airoport.backend.controller;

import com.airoport.backend.dto.ChartDataDTO;
import com.airoport.backend.dto.ReportFilterDTO;
import com.airoport.backend.dto.TBFStatsDTO;
import com.airoport.backend.service.ReportingService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/reporting")
public class ReportingController {

    private final ReportingService reportingService;

    public ReportingController(ReportingService reportingService) {
        this.reportingService = reportingService;
    }

    @GetMapping("/interventions/monthly")
    public ResponseEntity<ChartDataDTO> getMonthlyInterventions(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date date,
            @RequestParam(required = false) Integer aeroportId,
            @RequestParam(required = false) Long projetId) {

        ReportFilterDTO filter = new ReportFilterDTO(date, aeroportId, projetId);
        ChartDataDTO chartData = reportingService.getInterventionsByMonth(filter);
        return ResponseEntity.ok(chartData);
    }

    @GetMapping("/interventions/by-equipment")
    public ResponseEntity<ChartDataDTO> getInterventionsByEquipment(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date date,
            @RequestParam(required = false) Integer aeroportId,
            @RequestParam(required = false) Long projetId) {

        ReportFilterDTO filter = new ReportFilterDTO(date, aeroportId, projetId);
        ChartDataDTO chartData = reportingService.getInterventionsByEquipment(filter);
        return ResponseEntity.ok(chartData);
    }

    @GetMapping("/interventions/by-problem")
    public ResponseEntity<ChartDataDTO> getInterventionsByProblem(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date date,
            @RequestParam(required = false) Integer aeroportId,
            @RequestParam(required = false) Long projetId) {

        ReportFilterDTO filter = new ReportFilterDTO(date, aeroportId, projetId);
        ChartDataDTO chartData = reportingService.getInterventionsByProblem(filter);
        return ResponseEntity.ok(chartData);
    }

    @GetMapping("/interventions/by-project")
    public ResponseEntity<ChartDataDTO> getInterventionsByProject(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date date,
            @RequestParam(required = false) Integer aeroportId) {

        ReportFilterDTO filter = new ReportFilterDTO(date, aeroportId, null);
        ChartDataDTO chartData = reportingService.getInterventionsByProject(filter);
        return ResponseEntity.ok(chartData);
    }

    @GetMapping("/interventions/tbf")
    public ResponseEntity<TBFStatsDTO> calculateTBF(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date date,
            @RequestParam(required = false) Integer aeroportId,
            @RequestParam(required = false) Long projetId) {

        ReportFilterDTO filter = new ReportFilterDTO(date, aeroportId, projetId);
        TBFStatsDTO tbfStats = reportingService.calculateTBF(filter);
        return ResponseEntity.ok(tbfStats);
    }

    @GetMapping("/interventions/specific-equipment")
    public ResponseEntity<ChartDataDTO> getSpecificEquipmentStats(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date date,
            @RequestParam(required = false) Integer aeroportId) {

        ReportFilterDTO filter = new ReportFilterDTO(date, aeroportId, null);
        ChartDataDTO chartData = reportingService.getInterventionsBySpecificEquipment(filter);
        return ResponseEntity.ok(chartData);
    }

    @GetMapping("/download")
    public ResponseEntity<byte[]> downloadReport(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date date,
            @RequestParam(required = false) Integer aeroportId,
            @RequestParam(required = false) Long projetId,
            @RequestParam String reportType) {

        ReportFilterDTO filter = new ReportFilterDTO(date, aeroportId, projetId);
        byte[] reportContent = generateReportForDownload(filter, reportType);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", reportType + "_report.csv");

        return new ResponseEntity<>(reportContent, headers, HttpStatus.OK);
    }

    private byte[] generateReportForDownload(ReportFilterDTO filter, String reportType) {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        try {
            switch (reportType) {
                case "monthly":
                    writeChartDataToCsv(reportingService.getInterventionsByMonth(filter), outputStream);
                    break;
                case "equipment":
                    writeChartDataToCsv(reportingService.getInterventionsByEquipment(filter), outputStream);
                    break;
                case "problem":
                    writeChartDataToCsv(reportingService.getInterventionsByProblem(filter), outputStream);
                    break;
                case "project":
                    writeChartDataToCsv(reportingService.getInterventionsByProject(filter), outputStream);
                    break;
                case "tbf":
                    writeTBFDataToCsv(reportingService.calculateTBF(filter), outputStream);
                    break;
                case "specific-equipment":
                    writeChartDataToCsv(reportingService.getInterventionsBySpecificEquipment(filter), outputStream);
                    break;
                default:
                    outputStream.write("Invalid report type".getBytes(StandardCharsets.UTF_8));
            }
        } catch (IOException e) {
            try {
                outputStream.write("Error generating report".getBytes(StandardCharsets.UTF_8));
            } catch (IOException ex) {
                // Ignore
            }
        }
        return outputStream.toByteArray();
    }

    private void writeChartDataToCsv(ChartDataDTO chartData, ByteArrayOutputStream outputStream) throws IOException {
        // Write header
        outputStream.write((chartData.getTitle() + "\n").getBytes(StandardCharsets.UTF_8));

        // Write column headers
        StringBuilder header = new StringBuilder("Label");
        for (ChartDataDTO.DatasetDTO dataset : chartData.getDatasets()) {
            header.append(",").append(dataset.getLabel());
        }
        outputStream.write((header.toString() + "\n").getBytes(StandardCharsets.UTF_8));

        // Write data rows
        for (int i = 0; i < chartData.getLabels().size(); i++) {
            StringBuilder row = new StringBuilder(chartData.getLabels().get(i));
            for (ChartDataDTO.DatasetDTO dataset : chartData.getDatasets()) {
                row.append(",").append(i < dataset.getData().size() ? dataset.getData().get(i) : "0");
            }
            outputStream.write((row.toString() + "\n").getBytes(StandardCharsets.UTF_8));
        }
    }

    private void writeTBFDataToCsv(TBFStatsDTO tbfStats, ByteArrayOutputStream outputStream) throws IOException {
        // Write header
        outputStream.write((tbfStats.getTitle() + "\n\n").getBytes(StandardCharsets.UTF_8));

        // Write overall TBF
        outputStream.write(("Overall TBF," + tbfStats.getTbfValue() + " hours\n\n").getBytes(StandardCharsets.UTF_8));

        // Write monthly TBF data
        outputStream.write("Month,TBF (hours)\n".getBytes(StandardCharsets.UTF_8));
        for (Map.Entry<String, Double> entry : tbfStats.getMonthlyTBF().entrySet()) {
            String line = entry.getKey() + "," + entry.getValue() + "\n";
            outputStream.write(line.getBytes(StandardCharsets.UTF_8));
        }
    }
}