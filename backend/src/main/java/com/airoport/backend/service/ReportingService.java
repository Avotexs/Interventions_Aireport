package com.airoport.backend.service;

import com.airoport.backend.dto.ChartDataDTO;
import com.airoport.backend.dto.MonthlyStatsDTO;
import com.airoport.backend.dto.ReportFilterDTO;
import com.airoport.backend.dto.TBFStatsDTO;
import com.airoport.backend.model.Intervention;
import com.airoport.backend.repository.InterventionReportRepository;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
public class ReportingService {

    private final InterventionReportRepository reportRepository;
    private final SimpleDateFormat monthFormat = new SimpleDateFormat("MMM");
    private final String[] MONTH_NAMES = {"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"};
    private final Map<String, String> CHART_COLORS = Map.of(
            "Interventions", "rgba(54, 162, 235, 0.5)",
            "BRS", "rgba(54, 162, 235, 0.5)",
            "CUTE", "rgba(75, 192, 192, 0.5)",
            "E-GATE", "rgba(153, 102, 255, 0.5)"
    );

    public ReportingService(InterventionReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    public ChartDataDTO getInterventionsByMonth(ReportFilterDTO filter) {
        List<Object[]> data = reportRepository.countInterventionsByMonth(
                filter.getDate(),
                filter.getAeroportId(),
                filter.getProjetId()
        );

        // Prepare data for chart
        Map<Integer, Integer> monthCounts = new HashMap<>();
        for (Object[] row : data) {
            int month = ((Number) row[0]).intValue();
            int count = ((Number) row[1]).intValue();
            monthCounts.put(month, count);
        }

        List<Number> counts = new ArrayList<>();
        // Ensure we have all 12 months
        for (int i = 1; i <= 12; i++) {
            counts.add(monthCounts.getOrDefault(i, 0));
        }

        ChartDataDTO chartData = new ChartDataDTO();
        chartData.setLabels(Arrays.asList(MONTH_NAMES));
        chartData.setDatasets(List.of(
                new ChartDataDTO.DatasetDTO("Interventions", counts, CHART_COLORS.get("Interventions"))
        ));
        chartData.setTitle("Number of interventions by month");

        return chartData;
    }

    public ChartDataDTO getInterventionsByEquipment(ReportFilterDTO filter) {
        List<Object[]> data = reportRepository.countInterventionsByEquipment(
                filter.getDate(),
                filter.getAeroportId(),
                filter.getProjetId()
        );

        // Convert query results to chart data
        List<String> labels = new ArrayList<>();
        List<Number> counts = new ArrayList<>();

        for (Object[] row : data) {
            String equipment = (String) row[0];
            int count = ((Number) row[1]).intValue();
            labels.add(equipment);
            counts.add(count);
        }

        ChartDataDTO chartData = new ChartDataDTO();
        chartData.setLabels(labels);
        chartData.setDatasets(List.of(
                new ChartDataDTO.DatasetDTO("Interventions", counts, CHART_COLORS.get("Interventions"))
        ));
        chartData.setTitle("Distribution of interventions by equipment for the selected month");

        return chartData;
    }

    public ChartDataDTO getInterventionsByProblem(ReportFilterDTO filter) {
        List<Object[]> data = reportRepository.countInterventionsByProblem(
                filter.getDate(),
                filter.getAeroportId(),
                filter.getProjetId()
        );

        // Convert query results to chart data
        List<String> labels = new ArrayList<>();
        List<Number> counts = new ArrayList<>();

        for (Object[] row : data) {
            String problem = (String) row[0];
            int count = ((Number) row[1]).intValue();
            labels.add(problem);
            counts.add(count);
        }

        ChartDataDTO chartData = new ChartDataDTO();
        chartData.setLabels(labels);
        chartData.setDatasets(List.of(
                new ChartDataDTO.DatasetDTO("Interventions", counts, CHART_COLORS.get("Interventions"))
        ));
        chartData.setTitle("Distribution of interventions by problem for the selected month");

        return chartData;
    }

    public ChartDataDTO getInterventionsByProject(ReportFilterDTO filter) {
        List<Object[]> data = reportRepository.countInterventionsByProject(
                filter.getDate(),
                filter.getAeroportId()
        );

        // Convert query results to chart data
        List<String> labels = new ArrayList<>();
        List<Number> counts = new ArrayList<>();

        for (Object[] row : data) {
            String project = (String) row[0];
            int count = ((Number) row[1]).intValue();
            labels.add(project);
            counts.add(count);
        }

        ChartDataDTO chartData = new ChartDataDTO();
        chartData.setLabels(labels);
        chartData.setDatasets(List.of(
                new ChartDataDTO.DatasetDTO("Interventions", counts, CHART_COLORS.get("Interventions"))
        ));
        chartData.setTitle("Distribution of interventions by project for the selected month");

        return chartData;
    }

    public TBFStatsDTO calculateTBF(ReportFilterDTO filter) {
        List<Intervention> interventions = reportRepository.findInterventionsForTBF(
                filter.getDate(),
                filter.getAeroportId(),
                filter.getProjetId()
        );

        if (interventions.isEmpty()) {
            return new TBFStatsDTO(0.0, new HashMap<>(), "The TBF is: 0");
        }

        // Sort interventions by start date
        interventions.sort(Comparator.comparing(Intervention::getDateDebut));

        // Calculate average time between failures in hours
        double totalTimeBetweenFailures = 0;
        int count = 0;

        // Group by month to calculate monthly TBF
        Map<String, List<Intervention>> interventionsByMonth = interventions.stream()
                .collect(Collectors.groupingBy(i -> {
                    Calendar cal = Calendar.getInstance();
                    cal.setTime(i.getDateDebut());
                    return MONTH_NAMES[cal.get(Calendar.MONTH)];
                }));

        Map<String, Double> monthlyTBF = new HashMap<>();

        // Calculate TBF for each month
        for (Map.Entry<String, List<Intervention>> entry : interventionsByMonth.entrySet()) {
            String month = entry.getKey();
            List<Intervention> monthInterventions = entry.getValue();

            if (monthInterventions.size() > 1) {
                double monthTotalTBF = 0;
                int monthCount = 0;

                for (int i = 1; i < monthInterventions.size(); i++) {
                    Date prevEnd = monthInterventions.get(i-1).getDateFin();
                    Date currentStart = monthInterventions.get(i).getDateDebut();

                    if (prevEnd != null && currentStart != null) {
                        long diffInMillis = currentStart.getTime() - prevEnd.getTime();
                        double diffInHours = TimeUnit.MILLISECONDS.toHours(diffInMillis);
                        monthTotalTBF += diffInHours;
                        monthCount++;
                    }
                }

                if (monthCount > 0) {
                    monthlyTBF.put(month, monthTotalTBF / monthCount);
                }
            }
        }

        // Calculate overall TBF
        for (int i = 1; i < interventions.size(); i++) {
            Date prevEnd = interventions.get(i-1).getDateFin();
            Date currentStart = interventions.get(i).getDateDebut();

            if (prevEnd != null && currentStart != null) {
                long diffInMillis = currentStart.getTime() - prevEnd.getTime();
                double diffInHours = TimeUnit.MILLISECONDS.toHours(diffInMillis);
                totalTimeBetweenFailures += diffInHours;
                count++;
            }
        }

        double averageTBF = count > 0 ? totalTimeBetweenFailures / count : 0;

        return new TBFStatsDTO(
                Math.round(averageTBF * 100.0) / 100.0,
                monthlyTBF.entrySet().stream()
                        .collect(Collectors.toMap(
                                Map.Entry::getKey,
                                e -> Math.round(e.getValue() * 100.0) / 100.0
                        )),
                "The TBF is: " + (Math.round(averageTBF * 100.0) / 100.0) + " hours"
        );
    }

    public ChartDataDTO getInterventionsBySpecificEquipment(ReportFilterDTO filter) {
        List<Object[]> data = reportRepository.countInterventionsBySpecificEquipment(
                filter.getDate(),
                filter.getAeroportId()
        );

        // Process data for specific equipment types: BRS, CUTE, E-GATE
        Map<String, Map<String, Integer>> equipmentMonthCounts = new HashMap<>();
        Set<String> equipmentTypes = new HashSet<>();

        for (Object[] row : data) {
            String equipment = (String) row[0];
            int count = ((Number) row[1]).intValue();
            int month = ((Number) row[2]).intValue();

            equipmentTypes.add(equipment);

            equipmentMonthCounts.putIfAbsent(equipment, new HashMap<>());
            String monthName = MONTH_NAMES[month - 1];
            equipmentMonthCounts.get(equipment).put(monthName, count);
        }

        // Prepare chart datasets
        List<ChartDataDTO.DatasetDTO> datasets = new ArrayList<>();

        for (String equipment : equipmentTypes) {
            Map<String, Integer> monthCounts = equipmentMonthCounts.get(equipment);
            List<Number> counts = Arrays.stream(MONTH_NAMES)
                    .map(month -> monthCounts.getOrDefault(month, 0))
                    .collect(Collectors.toList());

            datasets.add(new ChartDataDTO.DatasetDTO(
                    equipment,
                    counts,
                    CHART_COLORS.getOrDefault(equipment, "rgba(75, 192, 192, 0.5)")
            ));
        }

        ChartDataDTO chartData = new ChartDataDTO();
        chartData.setLabels(Arrays.asList(MONTH_NAMES));
        chartData.setDatasets(datasets);
        chartData.setTitle("Number of incidents by equipment for " +
                String.join(" and ", equipmentTypes) + " in:");

        return chartData;
    }
}