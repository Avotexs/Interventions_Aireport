package com.airoport.backend.repository;

import com.airoport.backend.model.Intervention;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface InterventionReportRepository extends JpaRepository<Intervention, Integer> {

    // Nombre d'interventions par mois
    @Query("SELECT FUNCTION('MONTH', i.date) as month, COUNT(i) as count " +
            "FROM Intervention i " +
            "WHERE (:aeroportId IS NULL OR i.aeroport.id = :aeroportId) " +
            "AND (:projetId IS NULL OR i.projet.id = :projetId) " +
            "AND FUNCTION('YEAR', i.date) = FUNCTION('YEAR', :date) " +
            "GROUP BY FUNCTION('MONTH', i.date) " +
            "ORDER BY FUNCTION('MONTH', i.date)")
    List<Object[]> countInterventionsByMonth(@Param("date") Date date,
                                             @Param("aeroportId") Integer aeroportId,
                                             @Param("projetId") Long projetId);


    // Nombre d'interventions par problème
    @Query("SELECT p.name as problem, COUNT(i) as count " +
            "FROM Intervention i " +
            "JOIN i.probleme p " +
            "WHERE (:aeroportId IS NULL OR i.aeroport.id = :aeroportId) " +
            "AND (:projetId IS NULL OR i.projet.id = :projetId) " +
            "AND FUNCTION('YEAR', i.date) = FUNCTION('YEAR', :date) " +
            "AND FUNCTION('MONTH', i.date) = FUNCTION('MONTH', :date) " +
            "GROUP BY p.name")
    List<Object[]> countInterventionsByProblem(@Param("date") Date date,
                                               @Param("aeroportId") Integer aeroportId,
                                               @Param("projetId") Long projetId);

    // Nombre d'interventions par projet
    @Query("SELECT p.name as project, COUNT(i) as count " +
            "FROM Intervention i " +
            "JOIN i.projet p " +
            "WHERE (:aeroportId IS NULL OR i.aeroport.id = :aeroportId) " +
            "AND FUNCTION('YEAR', i.date) = FUNCTION('YEAR', :date) " +
            "AND FUNCTION('MONTH', i.date) = FUNCTION('MONTH', :date) " +
            "GROUP BY p.name")
    List<Object[]> countInterventionsByProject(@Param("date") Date date,
                                               @Param("aeroportId") Integer aeroportId);

    // Interventions pour TBF
    @Query("SELECT i FROM Intervention i " +
            "WHERE (:aeroportId IS NULL OR i.aeroport.id = :aeroportId) " +
            "AND (:projetId IS NULL OR i.projet.id = :projetId) " +
            "AND i.dateDebut IS NOT NULL " +
            "AND i.dateFin IS NOT NULL " +
            "AND FUNCTION('YEAR', i.date) = FUNCTION('YEAR', :date) " +
            "ORDER BY i.dateDebut")
    List<Intervention> findInterventionsForTBF(@Param("date") Date date,
                                               @Param("aeroportId") Integer aeroportId,
                                               @Param("projetId") Long projetId);

    // Nombre d'interventions par équipement via ProjetEquipement
    @Query("SELECT e.nameEquipement as equipment, COUNT(i) as count " +
            "FROM Intervention i " +
            "JOIN i.projet p " +
            "JOIN p.projetEquipements pe " +
            "JOIN pe.equipement e " +
            "WHERE (:aeroportId IS NULL OR i.aeroport.id = :aeroportId) " +
            "AND (:projetId IS NULL OR i.projet.id = :projetId) " +
            "AND FUNCTION('YEAR', i.date) = FUNCTION('YEAR', :date) " +
            "GROUP BY e.nameEquipement")
    List<Object[]> countInterventionsByEquipment(@Param("date") Date date,
                                                 @Param("aeroportId") Integer aeroportId,
                                                 @Param("projetId") Long projetId);

    // Nombre d'interventions par équipement spécifique (ex: BRS, CUTE, E-GATE)
    @Query("SELECT e.nameEquipement as equipmentName, COUNT(i) as count, FUNCTION('MONTH', i.date) as month " +
            "FROM Intervention i " +
            "JOIN i.projet p " +
            "JOIN p.projetEquipements pe " +
            "JOIN pe.equipement e " +
            "WHERE (:aeroportId IS NULL OR i.aeroport.id = :aeroportId) " +
            "AND e.nameEquipement IN ('BRS', 'CUTE', 'E-GATE') " +
            "AND FUNCTION('YEAR', i.date) = FUNCTION('YEAR', :date) " +
            "GROUP BY e.nameEquipement, FUNCTION('MONTH', i.date) " +
            "ORDER BY e.nameEquipement, FUNCTION('MONTH', i.date)")
    List<Object[]> countInterventionsBySpecificEquipment(@Param("date") Date date,
                                                         @Param("aeroportId") Integer aeroportId);
}
