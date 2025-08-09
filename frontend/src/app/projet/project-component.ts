import { Component, OnInit } from '@angular/core';
import { ProjectDTO, ProjectService, EquipementDTO } from './project-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

interface Equipement {
  id: number;
  nameEquipement: string;
  quantite: number;
}

@Component({
  selector: 'app-project',
  templateUrl: './project.html',
  styleUrls: ['./project.css'],
  imports: [CommonModule, FormsModule, HttpClientModule],
  standalone: true
})
export class ProjectComponent implements OnInit {
  projects: ProjectDTO[] = [];
  newProjectName = '';

  selectedEquipementId: number | null = null;
  selectedQuantite: number | null = null;
  equipementsDisponibles: Equipement[] = [];
  newProjectEquipements: EquipementDTO[] = [];
  editingProject: ProjectDTO | null = null;

  // Normalize an array of equipment items coming from backend
  private normalizeEquipements(items: any[]): EquipementDTO[] {
    return (items ?? []).map((it: any) => {
      const equipementId = it?.equipementId ?? it?.equipmentId ?? it?.equipement?.id ?? it?.equipment?.id ?? it?.id;
      // use backend reserved quantity if provided
      const quantite = it?.quantiteReservee ?? it?.quantite ?? it?.quantity ?? it?.qte ?? it?.qty ?? 1;
      return {
        equipementId: typeof equipementId === 'string' ? Number(equipementId) : equipementId,
        quantite: typeof quantite === 'string' ? Number(quantite) : quantite,
      } as EquipementDTO;
    }).filter(e => typeof e.equipementId === 'number' && !isNaN(e.equipementId));
  }

  // add helper to normalize incoming project data
  private normalizeProject(p: any): ProjectDTO {
    const rawEquipements = p?.equipements ?? p?.equipments ?? p?.projetEquipements ?? p?.projectEquipements ?? [];
    return {
      id: p.id,
      name: p.name,
      equipements: this.normalizeEquipements(rawEquipements)
    };
  }

  startEditProject(project: ProjectDTO) {
    console.log('Début édition du projet', project);
    this.editingProject = {
      ...project,
      equipements: project.equipements.map(eq => ({ ...eq }))
    };
  }

  saveEditProject() {
    if (!this.editingProject) return;

    this.projectService.updateProject(this.editingProject.id!, this.editingProject).subscribe({
      next: updatedProject => {
        const normalized = this.normalizeProject(updatedProject);
        const idx = this.projects.findIndex(p => p.id === normalized.id);
        if (idx !== -1) this.projects[idx] = normalized;
        this.editingProject = null;
      },
      error: err => {
        console.error('Erreur sauvegarde projet', err);
      }
    });
  }

  addEquipementToEditingProject() {
    if (!this.editingProject || !this.selectedEquipementId || !this.selectedQuantite || this.selectedQuantite <= 0) return;

    const existing = this.editingProject.equipements.find(e => e.equipementId === this.selectedEquipementId);
    if (existing) {
      existing.quantite += this.selectedQuantite;
    } else {
      this.editingProject.equipements.push({
        equipementId: this.selectedEquipementId,
        quantite: this.selectedQuantite,
      });
    }

    this.selectedEquipementId = null;
    this.selectedQuantite = null;
  }

  removeEquipementFromEditingProject(equipementId: number) {
    if (!this.editingProject) return;
    this.editingProject.equipements = this.editingProject.equipements.filter(e => e.equipementId !== equipementId);
  }

  cancelEditProject() {
    this.editingProject = null;
  }

  constructor(private projectService: ProjectService) {}

  addEquipementToProject() {
    if (!this.selectedEquipementId || !this.selectedQuantite || this.selectedQuantite <= 0) {
      return; // protection
    }

    // Vérifie si déjà présent
    const existing = this.newProjectEquipements.find(
      (eq) => eq.equipementId === this.selectedEquipementId
    );
    if (existing) {
      // Si déjà présent, on met à jour la quantité
      existing.quantite += this.selectedQuantite;
    } else {
      // Sinon on ajoute un nouvel équipement avec la quantité
      this.newProjectEquipements.push({
        equipementId: this.selectedEquipementId,
        quantite: this.selectedQuantite,
      });
    }

    // Réinitialiser la sélection
    this.selectedEquipementId = null;
    this.selectedQuantite = null;
  }

  ngOnInit(): void {
    this.loadProjects();
    this.loadEquipementsDisponibles();
  }

  loadProjects() {
    this.projectService.getAllProjects().subscribe({
      next: (data) => {
        // console.debug('Projects API raw:', data);
        this.projects = data.map(p => this.normalizeProject(p));
      },
      error: (err) => console.error('Erreur chargement projets', err),
    });
  }

  loadEquipementsDisponibles() {
    this.projectService.getAllEquipements().subscribe({
      next: (data) => {
        // Normalize equipment coming from API to consistent shape
        this.equipementsDisponibles = (data as any[]).map((d: any) => ({
          id: typeof d?.id === 'string' ? Number(d.id) : d?.id,
          nameEquipement: d?.nameEquipement ?? d?.name ?? d?.libelle ?? 'Équipement',
          quantite: typeof d?.quantite === 'string' ? Number(d.quantite) : (d?.quantite ?? d?.quantity ?? d?.qty ?? 0),
        }));
      },
      error: (err) => console.error('Erreur chargement équipements', err),
    });
  }

  // Prefer resolving display name from the item itself, fallback to lookup by id
  getEquipementDisplayName(eq: any): string {
    const directName = eq?.nameEquipement || eq?.name || eq?.libelle || eq?.equipement?.nameEquipement || eq?.equipment?.nameEquipement || eq?.equipement?.name || eq?.equipment?.name;
    if (typeof directName === 'string' && directName.trim().length > 0) {
      return directName;
    }
    const id = eq?.equipementId ?? eq?.equipmentId ?? eq?.equipement?.id ?? eq?.equipment?.id ?? eq?.id;
    return this.getEquipementNameById(id);
  }

  deleteProject(id: number) {
    this.projectService.deleteProject(id).subscribe({
      next: () => {
        this.projects = this.projects.filter((p) => p.id !== id);
      },
      error: (err) => console.error('Erreur suppression projet', err),
    });
  }

  getEquipementNameById(id: number | string | null | undefined): string {
    const numId = typeof id === 'string' ? Number(id) : id ?? -1;
    const eq = this.equipementsDisponibles.find(e => e.id === numId);
    return eq ? eq.nameEquipement : 'Équipement inconnu';
  }

  removeEquipementFromProject(equipementId: number) {
    this.newProjectEquipements = this.newProjectEquipements.filter(e => e.equipementId !== equipementId);
  }

  updateQuantite(equipementId: number, quantiteStr: string) {
    let quantite = Number(quantiteStr);
    if (isNaN(quantite) || quantite < 1) quantite = 1;

    const equip = this.newProjectEquipements.find(e => e.equipementId === equipementId);
    if (equip) {
      equip.quantite = quantite;
    }
  }

  addProject() {
    if (!this.newProjectName.trim()) return;

    const project: ProjectDTO = {
      name: this.newProjectName,
      equipements: this.newProjectEquipements,
    };

    console.log('Envoi projet:', JSON.stringify(project));

    this.projectService.createProject(project).subscribe({
      next: (p) => {
        const saved = this.normalizeProject(p);
        if (!saved.equipements || saved.equipements.length === 0) {
          // Ensure UI shows selected equipments since API may not return them
          saved.equipements = this.newProjectEquipements.map(e => ({ ...e }));
        }
        this.projects.push(saved);
        this.newProjectName = '';
        this.newProjectEquipements = [];
      },
      error: (err) => console.error('Erreur création projet', err),
    });
  }
}

import { EquipementService } from '../equipement/equipement-service';