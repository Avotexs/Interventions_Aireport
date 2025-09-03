import { Component } from '@angular/core';
import { LangService } from '../services/lang.service';
import{Intervention, InterventionService} from './intervention-service'
import { Aeroport } from '../aeroport-component/aeroport-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Problem } from '../problem/problem-service';
import { Solution } from '../solution/solution-service';
import {  ProjectDTO, ProjectService } from '../projet/project-service';
import { EquipementService, Equipement } from '../equipement/equipement-service';
import { Comptoire } from '../comptoire/comptoire-service';
import {Zone} from '../zone/zone-service';
import { Technicien } from '../technicien-component/technicien-service';
import {Campagny } from '../campagny/campagny-service';
export interface EquipementDTO {
  equipementId: number;
  quantite: number;
}

@Component({
  selector: 'app-intervention-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './intervention-component.html',
  styleUrl: './intervention-component.css'
})

export class InterventionComponent {
selectedEntity = 'intervention'; 
interventionsFiltred: Intervention[] = [];
interventions: Intervention[] = []; // List of all interventions fetched from the backend
aeroports: Aeroport[] = []; // List of all aeroports fetched from the backend
problems: Problem[] = []; // List of all problems fetched from the backend
solutions: Solution[] = []; // List of all solutions fetched from the backend
projects: ProjectDTO[] = []; // List of all projects fetched from the backend
// Comptoires : on garde la liste complète pour la résolution des noms et une liste filtrée pour le select
allComptoires: Comptoire[] = []; // liste complète depuis le backend
comptoires: Comptoire[] = []; // liste filtrée selon zone sélectionnée
zones: Zone[] = []; // List of all zones fetched from the backend
techniciens: Technicien[] = []; // List of all techniciens fetched from the backend
campagnes: Campagny[] = []; // List of all campagnes fetched from the backend
equipements: Equipement[] = []; // List of all equipements fetched from the backend
//pagination
  searchTerm: string = '';       // Search term bound to input field
  currentPage: number = 0;     // Pagination: current page index
  pageSize: number = 5;   // Pagination: number of items per page
  showPopup: boolean = false;  // Whether the popup/modal is visible
//add
showEmptyFieldPopup: boolean = false;  // Whether the empty field popup is visible
showInvalidAeroportIdPopup: boolean = false;  // Whether the invalid aeroport ID popup is visible
showSuccessPopup: boolean = false;  // Whether the success popup is visible
showAlreadyExistsPopupadd: boolean = false;  // Whether the already exists popup is visible
// Model for new intervention form
//FILTERS
aeroportFilter: string = '';
zoneFilter: string = '';
comptoirFilter: string = '';
technicienFilter: string = '';

dateFromFilter: string = '';   // yyyy-MM-dd
dateToFilter: string = '';     // yyyy-MM-dd
newIntervention: Intervention = {id: 0,
  
    numero: 0,
    date:  new Date(),
    dateDebut:  new Date(),
    dateFin:  new Date(),
    duration: '',
    inProgress: true,
    campagnyId: 0,
    technicienId: 0,
    zoneId: 0,
    comptoireId: 0,
    projetId: 0,
    equipementid: 0,
    solutionId: 0,
    problemId: 0,
    aeroportId: 0 }; // New intervention to be created

//editing
editingIntervention: Intervention | null = null;
numeroEdited: number = 0;
dateDebutEdited: Date | null = null;
dateFinEdited: Date | null = null;
campagnyIdEdited: number | null = null;
technicienIdEdited: number | null = null;
zoneIdEdited: number | null = null;
comptoireIdEdited: number | null = null;
projetIdEdited: number | null = null;
equipementidEdited: number | null = null;
solutionIdEdited: number | null = null;
problemIdEdited: number | null = null;
aeroportIdEdited: number | null = null;
showEditPopup: boolean = false;
showAlreadyExistsPopup: boolean = false;
showEditSuccessPopup: boolean = false;
showEmptyFieldPopupUpdate: boolean = false;
showAlreadyExistsPopupUpdate: boolean = false;
//delete
showPopupSuppression: boolean = false;  // Whether the delete confirmation popup is visible
interventionToDelete: number | null = null;  // ID of the intervention to delete
showDeleteSuccessPopup: boolean = false;  // Whether the delete success popup is visible
//variable for controlling visibility
  showPassword = false;
  
// liste complète des équipements (pour résolution des noms)

constructor(private interventionService: InterventionService,
            private projectService: ProjectService,
            private langService: LangService,
            private equipementService: EquipementService) 
{ 
  this.getAllInterventions();
  this.getAeroports();
  this.getAllProblems();
  this.getAllSolutions();
  this.getAllProjects(); // now via ProjectService mapping
  this.getAllComptoires();
  this.getAllZones();
  this.getAllTechniciens();
  this.getAllCampagnes();
  this.getAllEquipements();
  this.loadProjects();
  /*
  this.getAllCampagny();
  this.getAllZone();
  this.getAllTechnicien();
  this.getAllComptoire();
  
  this.getAllProject();
  */
}
/*
 /**
 * Returns the list of interventions filtered by the search term
 * and sliced for pagination.
 * @returns Filtered and paginated interventions
 */
filteredInterventions(): Intervention[] {
    return this.interventions
      .filter(p => p.id.toString().toLowerCase().includes(this.searchTerm.toLowerCase()))
      .slice(this.currentPage * this.pageSize, (this.currentPage + 1) * this.pageSize);
  } 


  /**
   * Calculates the total number of pages based on the filtered result.
   * @returns Total page count for pagination
   */
    get pageCount(): number {
    return Math.ceil(
      this.interventions.filter(p => p.id?.toString().toLowerCase().includes(this.searchTerm.toLowerCase())).length / this.pageSize
    );
    }

  /**
   * Navigates to a given page index.
   * @param index - Page number to navigate to
   */
  goToPage(index: number) {
    this.currentPage = index;
  }

  /**
   * Handles search input changes and resets pagination to page 0.
   */
  onSearchChange() {
    this.currentPage = 0;
  }

  /**
   * Clears the search term and resets pagination.
   */
  clearSearch() {

    
  this.searchTerm = '';
  this.onSearchChange(); 
  }

 toggleLang() {
   this.langService.toggleLang();
 }

  onEntityChange(newValue: string) {
   this.selectedEntity = newValue;
 }
 get t() {
   return this.langService.t;
 }
 get lang() {
   return this.langService.lang;
}




getAllInterventions() {
  this.interventionService.getAllInterventions().subscribe({
    next: (data) => {
      
      // Trie décroissant par ID (le plus récent en haut)
      const sorted = data.sort((a, b) => b.id! - a.id!);
      this.interventions = sorted;
      this.interventionsFiltred = sorted.slice();
      //console.log('Interventions loaded:', this.interventions);
      this.Inprogress();
    },
    error: (err) => console.error(err)
  });
}
//verified
getAeroports() {
  this.interventionService.getAeroport().subscribe({
    next: (data) => {
      this.aeroports = data;
      //console.log('Aeroports loaded:', this.aeroports);
    },
    error: (err) => console.error('Error loading aeroports:', err)
  });
}
//verified
getAeroportNameById(id?: number | null): string {
  
    if (id == null) return 'erreur';
    const a = this.aeroports.find(x => x.id === id);
    //console.log('Aéroport trouvé:', a);
    return a?.name ?? '';
  }
getAeroportIdByName(name?: string | null): number {

    if (name == null) return -1;
    const a = this.aeroports.find(x => x.name === name);
    //console.log('Aéroport trouvé:', a);
    return a?.id ?? -1;
  }


  getAllProblems() {
    this.interventionService.getProblems().subscribe({
      next: (data) => {
        this.problems = data;
       // console.log('Problems loaded:', this.problems);
      },
      error: (err) => console.error('Error loading problems:', err)
    });
  }

getProblemNameById(id?: number | null): string {
  if (id == null) return 'erreur';
  const p = this.problems.find(x => x.id === id);
  //console.log('Problème trouvéeeeeeeeee:', p);
  return p?.name ?? '';
}


//solution
getAllSolutions() {
  this.interventionService.getSolutions().subscribe({
    next: (data) => {
      this.solutions = data;
      //console.log('Solutions loaded:', this.solutions);
    },
    error: (err) => console.error('Error loading solutions:', err)
  });
}


getSolutionNameById(id?: number | null): string {
  if (id == null) return 'erreur';
  const s = this.solutions.find(x => x.id === id);
  //console.log('Solution trouvée:', s);
  return s?.name ?? '';
}

//Projects
getAllProjects() {
  this.projectService.getAllProjects().subscribe({
    next: (data) => {
      this.projects = data;
      //console.log('Projects loaded (mapped):', this.projects);
    },
    error: (err) => console.error('Error fetching projects:', err)
  });
}

getProjectNameById(id?: number | null): string {
  if (id == null) return 'erreur';
  const p = this.projects.find(x => x.id === id);
  //console.log('Project trouvé:', p);
  return p?.name ?? '';
}

// Comptoires
getAllComptoires() {
  this.interventionService.getComptoire().subscribe(
    (data) => {
      this.allComptoires = data;
      //console.log('Comptoires loaded (all):', this.allComptoires);
      // Mettre à jour la liste filtrée selon zone actuelle (si déjà choisie)
      this.updateFilteredComptoires();
    },
    (error) => {
      console.error('Error fetching comptoires:', error);
    }
  );
}

// Retourne le nom en cherchant dans la liste complète
getComptoireNameById(id?: number | null): string {
  if (id == null) return 'erreur';
  const c = this.allComptoires.find(x => x.id === id);
  // console.log('Comptoire trouvé:', c);
  return c?.nom ?? '';
}
getComptoireIdByName(name?: string | null): number {
  if (name == null) return -1;
  const c = this.allComptoires.find(x => x.nom === name);
  // console.log('Comptoire trouvé:', c);
  return c?.id ?? -1;
}

// Met à jour la liste filtrée des comptoires selon la zone sélectionnée
private updateFilteredComptoires() {
  if (!this.newIntervention.zoneId) {
    this.comptoires = [];
    // réinitialiser le comptoire choisi si la zone est désélectionnée
    this.newIntervention.comptoireId = 0;
    return;
  }
  this.comptoires = this.allComptoires.filter(c => c.zoneId === this.newIntervention.zoneId);
  // si le comptoire sélectionné n'appartient plus à la zone, on le réinitialise
  if (!this.comptoires.some(c => c.id === this.newIntervention.comptoireId)) {
    this.newIntervention.comptoireId = 0;
  }
}

// ------------------ Equipements ------------------
getAllEquipements() {
  this.equipementService.getAllEquipements().subscribe({
    next: (data) => {
      this.equipements = data;
      //console.log('Equipements loaded:', this.equipements);
    },
    error: (err) => console.error('Error loading equipements:', err)
  });
}

// Retourne la liste des équipements (objet complet) associés à un projet donné par son id
getEquipementsByProjectId(projectId?: number | null): Equipement[] {
  if (!projectId) return [];
  const project = this.projects.find(p => p.id === projectId);
  if (!project) return [];
  // Supporte plusieurs structures possibles: equipements (DTO), projetEquipements, ou direct array d'objets avec id
  const links: any[] = project.equipements || (project as any).projetEquipements || [];
  if (!Array.isArray(links) || links.length === 0) return [];
  return links
    .map(l => {
      const equipId = l.equipementId ?? l.equipement?.id ?? l.id ?? null;
      console.log('Equipements associés au projet ID',project.equipements);
      return this.equipements.find(eq => eq.id === equipId);
    })
    .filter((e): e is Equipement => !!e);
    
}
//***ICI LES METHODE DE PROJET  */


 // Normalize an array of equipment items coming from backend
   normalizeEquipements(items: any[]): EquipementDTO[] {
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

// Retourne juste les noms des équipements d'un projet
getEquipementNamesByProjectId(projectId?: number | null): string[] {
  return this.getEquipementsByProjectId(projectId).map(e => e.nameEquipement);
}

// Résolution nom unique par id d'équipement
getEquipementNameById(id?: number | null): string {
  if (id == null) return 'erreur';
  const eq = this.equipements.find(e => e.id === id);
  return eq?.nameEquipement ?? '';
}

 loadProjects() {
    this.projectService.getAllProjects().subscribe({
      next: (data) => {
        // console.debug('Projects API raw:', data);
        this.projects = data.map(p => this.normalizeProject(p));
        console.log(this.projects);
      },
      error: (err) => console.error('Erreur chargement projets', err),
    });
    
  }

  getProjectById(id?: number | null): ProjectDTO | undefined {
    if (!id) return undefined;
    return this.projects.find(p => p.id === id);
    console.log('Project trouvéEEEEEEEEEEE:', this.getProjectNameById(id));
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
    // add helper to normalize incoming project data
   normalizeProject(p: any): ProjectDTO {
    const rawEquipements = p?.equipements ?? p?.equipments ?? p?.projetEquipements ?? p?.projectEquipements ?? [];
    return {
      id: p.id,
      name: p.name,
      equipements: this.normalizeEquipements(rawEquipements)
    };
  }
// Quantité d'un équipement (id equipement) dans un projet (en se basant sur ProjectDTO.equipements)
getProjectEquipementQuantity(projectId?: number | null, equipementId?: number | null): number | null {
  if (!projectId || !equipementId) return null;
  const project = this.projects.find(p => p.id === projectId);
  if (!project) return null;
  const links: any[] = project.equipements || (project as any).projetEquipements || [];
  const link = links.find(l => (l.equipementId ?? l.equipement?.id ?? l.id) === equipementId);
  return link ? (link.quantite ?? link.quantity ?? null) : null;
}


//zone
getAllZones() {
  this.interventionService.getZone().subscribe(
    (data) => {
      this.zones = data;
      //console.log('Zones loaded:', this.zones);
    },
    (error) => {
      //console.error('Error fetching zones:', error);
    }
  );
}

getZoneNameById(id?: number | null): string {
  if (id == null) return 'erreur';
  const z = this.zones.find(x => x.id === id);
  //console.log('Zoneeeeeeeeee trouvée:', z);
  return z?.nom ?? '';
}

getZoneIdByName(name?: string): number | null {
  if (!name) return null;
  const zone = this.zones.find(x => x.nom === name);
  return zone?.id ?? null;
}
//technicien
getAllTechniciens() {
  this.interventionService.getTechnicien().subscribe(
    (data) => {
      this.techniciens = data;
      //console.log('Techniciens loaded:', this.techniciens);
    },
    (error) => {
      //console.error('Error fetching techniciens:', error);
    }
  );
}

getTechnicienNameById(id?: number | null): string {
  if (id == null) return 'erreur';
  const t = this.techniciens.find(x => x.id === id);
  //console.log('Technicien trouvé:', t);
  const fullName: string = (t?.firstname ?? '') + ' ' + (t?.lastname ?? '');
  return fullName;
}

getTechnicienIdByName(lname?: string): number | null {
  if (!lname) return null;
  const technicien = this.techniciens.find(x => x.firstname === lname);
  return technicien?.id ?? null;
}


//campagnes
getAllCampagnes() {
  this.interventionService.getCampagne().subscribe(
    (data) => {
      this.campagnes = data;
      //console.log('Campagnes loaded:', this.campagnes);
    },
    (error) => {
      console.error('Error fetching campagnes:', error);
    }
  );
}

getCampagneNameById(id?: number | null): string {
  if (id == null) return 'erreur';
  const c = this.campagnes.find(x => x.id === id);
  //console.log('Campagne trouvée:', c);
  return c?.name ?? '';
}


 onCampagneChange(id: number) {
    // Optionnel: debug/force conversion en nombre si besoin
    this.newIntervention.campagnyId = typeof id === 'string' ? Number(id) : id;
    //console.log('Campagne sélectionnée ID =', this.newIntervention.campagnyId);
  }
onTechnicienChange(id: number) {
    // Optionnel: debug/force conversion en nombre si besoin
    this.newIntervention.technicienId = typeof id === 'string' ? Number(id) : id;
    //console.log('Technicien sélectionné ID =', this.newIntervention.technicienId);
  }
onZoneChange(id: number) {
  this.newIntervention.zoneId = typeof id === 'string' ? Number(id) : id;
  //console.log('Zone sélectionnée ID =', this.newIntervention.zoneId);
  // Filtrer les comptoires sur changement de zone
  this.updateFilteredComptoires();
}
onComptoireChange(id: number) {
    // Optionnel: debug/force conversion en nombre si besoin
    this.newIntervention.comptoireId = typeof id === 'string' ? Number(id) : id;
    //console.log('Comptoire sélectionné ID =', this.newIntervention.comptoireId);
  }

onProjetChange(id: number) {
  this.newIntervention.projetId = typeof id === 'string' ? Number(id) : id;
  //console.log('Projet sélectionné ID =', this.newIntervention.projetId);
}

onSolutionChange(id: number) {
  this.newIntervention.solutionId = typeof id === 'string' ? Number(id) : id;
  //console.log('Solution sélectionnée ID =', this.newIntervention.solutionId);
}

onAeroportChange(id: number) {
  this.newIntervention.aeroportId = typeof id === 'string' ? Number(id) : id;
  //console.log('Aeroport sélectionné ID =', this.newIntervention.aeroportId);
}

onProblemChange(id: number) {
  this.newIntervention.problemId = typeof id === 'string' ? Number(id) : id;
  //console.log('Problem sélectionné ID =', this.newIntervention.problemId);
}

canceladd() {
    this.showPopup = false;
    this.newIntervention = {
    
    id: 0,
    numero: 0,
    date:  new Date(),
    dateDebut:  new Date(),
    dateFin:  new Date(),
    duration: '',
    inProgress: true,
    campagnyId: 0,
    technicienId: 0,
    zoneId: 0,
    comptoireId: 0,
    projetId: 0,
    equipementid: 0,
    solutionId: 0,
    problemId: 0,
    aeroportId: 0};
  }

addIntervention() {

    // Vérifie si le champ est vide
  if (!this.newIntervention.numero || this.newIntervention.numero <= 0 ||
      !this.newIntervention.date || !this.newIntervention.dateDebut || !this.newIntervention.dateFin ||

      !this.newIntervention.campagnyId || this.newIntervention.campagnyId <= 0 ||
      !this.newIntervention.technicienId || this.newIntervention.technicienId <= 0 ||
      !this.newIntervention.zoneId || this.newIntervention.zoneId <= 0 ||
      !this.newIntervention.comptoireId || this.newIntervention.comptoireId <= 0 ||
      !this.newIntervention.projetId || this.newIntervention.projetId <= 0 ||
   
    
      !this.newIntervention.aeroportId || this.newIntervention.aeroportId <= 0) {
      this.showEmptyFieldPopup = true;
      this.showPopup = false;
    return;
  }
  // Vérifie si le nom existe déjà
 if (
      this.interventions.some(
        c => c.id === this.newIntervention?.id || c.numero === this.newIntervention?.numero
      )
    ) {
      this.showEditPopup = false;
      console.log('Intervention déjà existante');
      this.showAlreadyExistsPopupadd = true; // Affiche le message d'erreur
      this.showPopup = false; // Cache la fenêtre d’ajout

      return;
    }


  // Ajout si tout est OK
  this.interventionService.createIntervention(this.newIntervention).subscribe({
    next: () => {
      this.getAllTechniciens();
      this.newIntervention = { 
        id: 0,
        numero: 0,
        date:  new Date(),
        dateDebut:  new Date(),
        dateFin:  new Date(),
        duration: '',
        inProgress: true,
        campagnyId: 0,
        technicienId: 0,
        zoneId: 0,
        comptoireId: 0,
        projetId: 0,
        equipementid: 0,
        solutionId: 0,
        problemId: 0,
        aeroportId: 0
      };
      this.showPopup = false; // Cache la fenêtre d’ajout
      this.showSuccessPopup = true; // Affiche le popup succès
      console.log('Intervention added successfully');
      this.getAllInterventions();
    },
    error: (err) => console.error(err)
  });
  
}
// Méthode pour fermer la popup "existe déjà" et ré-afficher la fenêtre d'ajout
closeAlreadyExistsPopupAdd() {
  this.showAlreadyExistsPopupadd = false;
  this.showPopup = true; // On ré-affiche la fenêtre d'ajout
}



  startEdit(intervention: Intervention) {

  this.showEditPopup = true;
    // Set the editing intervention and pre-fill the edit fields
    this.editingIntervention = intervention;
    this.numeroEdited = intervention.numero;
    this.dateDebutEdited = intervention.dateDebut;
    this.dateFinEdited = intervention.dateFin;
    this.campagnyIdEdited = intervention.campagnyId;
    this.technicienIdEdited = intervention.technicienId;
    this.zoneIdEdited = intervention.zoneId;
    this.comptoireIdEdited = intervention.comptoireId;
    this.projetIdEdited = intervention.projetId;
    this.equipementidEdited = intervention.equipementid;
    this.solutionIdEdited = intervention.solutionId;
    this.problemIdEdited = intervention.problemId;
    this.aeroportIdEdited = intervention.aeroportId;
  }


  saveEditedIntervention() {
    
    // Vérifie si le champ est vide
    if (!this.numeroEdited || this.numeroEdited <= 0 ||
      !this.dateDebutEdited || !this.dateFinEdited ||
      !this.campagnyIdEdited || this.campagnyIdEdited <= 0 ||
      !this.technicienIdEdited || this.technicienIdEdited <= 0 ||
      !this.zoneIdEdited || this.zoneIdEdited <= 0 ||
      !this.comptoireIdEdited || this.comptoireIdEdited <= 0 ||
      !this.projetIdEdited || this.projetIdEdited <= 0 ||
      !this.solutionIdEdited || this.solutionIdEdited <= 0 ||
      !this.problemIdEdited || this.problemIdEdited <= 0 ||
      !this.aeroportIdEdited || this.aeroportIdEdited <= 0

    )
       
      {
      this.showEmptyFieldPopup = true;
      this.showEditPopup = false;

      return;
    }

    // Vérifie si le nouveau nom existe déjà chez une autre intervention
    if (
      this.interventions.some(
        c => c.id !== this.editingIntervention?.id && c.numero === this.numeroEdited
      )
    ) {
      this.showAlreadyExistsPopupUpdate = true;
      this.showEditPopup = false;
      return;
    }

 

    // Modification si tout est OK
    if (this.editingIntervention && this.editingIntervention.id) {
        //console.log('Updating intervention:', this.numeroEdited, this.dateDebutEdited, this.dateFinEdited, this.campagnyIdEdited, this.technicienIdEdited, this.zoneIdEdited, this.comptoireIdEdited, this.projetIdEdited, this.equipementidEdited, this.solutionIdEdited, this.problemIdEdited, this.aeroportIdEdited);

      this.interventionService.updateIntervention(this.editingIntervention.id, {
        ...this.editingIntervention,
        numero: this.numeroEdited,
        dateDebut: this.dateDebutEdited!,
        dateFin: this.dateFinEdited!,
        campagnyId: this.campagnyIdEdited!,
        technicienId: this.technicienIdEdited!,
        zoneId: this.zoneIdEdited!,
        comptoireId: this.comptoireIdEdited!,
        projetId: this.projetIdEdited!,
        equipementid: this.equipementidEdited!,
        solutionId: this.solutionIdEdited!,
        problemId: this.problemIdEdited!,
        aeroportId: this.aeroportIdEdited!
        
      }).subscribe({
        next: () => {
          this.getAllInterventions();
          this.showEditPopup = false;
          this.editingIntervention = null; // Cache la fenêtre d'édition
          this.dateDebutEdited = new Date();
          this.dateFinEdited = new Date();
          this.campagnyIdEdited = 0;
          this.technicienIdEdited = 0;
          this.zoneIdEdited = 0;
          this.comptoireIdEdited = 0;
          this.projetIdEdited = 0;
          this.equipementidEdited = 0;
          this.solutionIdEdited = 0;
          this.aeroportIdEdited = 0;
          this.showEditSuccessPopup = true; // Affiche le popup succès
        },
        error: (err) => console.error(err)
      });
    }
  }

closeAlreadyExistsPopupUpdate() {
  this.showAlreadyExistsPopupUpdate = false;
  this.showEditPopup = true; // On ré-affiche la fenêtre d'édition
}


 closeEditPopup() {
    this.showEditPopup = false;
    this.editingIntervention = null;
 
  }


  
/**
 * Closes the invalid aeroport ID popup.
 */
closeInvalidAeroportIdPopup() {
  this.showInvalidAeroportIdPopup = false;
}

/**
 * Closes the success popup after adding a new problem.
 */
closeSuccessPopup() {
  this.showSuccessPopup = false;
}

// Méthode pour fermer la popup "existe déjà" et ré-afficher la fenêtre d'ajout
closeAlreadyExistsPopup() {
  this.showAlreadyExistsPopup = false;
  this.showPopup = true; // On ré-affiche la fenêtre d'ajout
}



closeEmptyFieldPopup() {
  this.showEmptyFieldPopup = false;
  this.showPopup = true; // Ré-affiche la fenêtre d'ajout
}
closeEmptyFieldPopupUpdate() {
  this.showEmptyFieldPopupUpdate = false;
}


closeEditSuccessPopup() {
  this.showEditSuccessPopup = false;
}


closeDeleteSuccessPopup() {
  this.showDeleteSuccessPopup = false;
}
// Annule la suppression
  cancelDelete() {
    this.showPopupSuppression = false;
    this.interventionToDelete = null;
  }

   askDelete(id: number) {

    this.interventionToDelete = id;
    this.showPopupSuppression = true;
    
  }

confirmDelete() {
  if (this.interventionToDelete) {
    this.interventionService.deleteIntervention(this.interventionToDelete).subscribe({
      
      next: () => {
        this.getAllInterventions();
        this.showDeleteSuccessPopup = true; // Affiche le popup succès
      },
      error: (err) => console.error(err)
    });
  }

  this.showPopupSuppression = false; // Cache la fenêtre de confirmation
  this.interventionToDelete = null;
}

Inprogress() {
  // Interventions dont le statut est false
  this.interventions = this.interventionsFiltred.filter(i => i.inProgress === true);
  
console.log('Interventions en cours:', this.interventions);
  this.currentPage = 0;
}
Closed() {
  // (Optionnel) Interventions dont le statut est true
  this.interventions = this.interventionsFiltred.filter(i => i.inProgress === false);
 console.log('Interventions terminées:', this.interventions);
  this.currentPage = 0;
}



onAeroportFilterChange() {
  // déclenche juste la détection (si pagination, reset page)
  this.filterByAeroport();
  this.currentPage = 0;
}

clearAeroportFilter() {
  this.aeroportFilter = '';
  this.onAeroportFilterChange();
}

 filterByAeroport()  {
  const id = this.getAeroportIdByName(this.aeroportFilter);
 
  this.interventions = this.interventionsFiltred.filter(i => i.aeroportId === id);
   console.log('Aéroport ID:', this.interventions.length);

}
//filtre de zone
onZoneFilterChange() {
  // déclenche juste la détection (si pagination, reset page)
  this.filterByZone();
  this.currentPage = 0;
}

clearZoneFilter() {
  this.zoneFilter = '';
  this.onZoneFilterChange();
}

 filterByZone()  {
  const id = this.getZoneIdByName(this.zoneFilter);

  this.interventions = this.interventionsFiltred.filter(i => i.zoneId === id);
   console.log('Zone ID:', this.interventions.length);

}
//filtre de Comptoir
onComptoirFilterChange() {
  // déclenche juste la détection (si pagination, reset page)
  this.filterByComptoir();
  this.currentPage = 0;
}

clearComptoirFilter() {
  this.comptoirFilter = '';
  this.onComptoirFilterChange();
}

 filterByComptoir()  {
  const id = this.getComptoireIdByName(this.comptoirFilter);

  this.interventions = this.interventionsFiltred.filter(i => i.comptoireId === id);
   console.log('Comptoir ID:', this.interventions.length);
 }
//filtre de TECHNICIEN
onTechnicienFilterChange() {
  // déclenche juste la détection (si pagination, reset page)
  this.filterByTechnicien();
  this.currentPage = 0;
}

clearTechnicienFilter() {
  this.technicienFilter = '';
  this.onTechnicienFilterChange();
}

 filterByTechnicien()  {
  const id = this.getTechnicienIdByName(this.technicienFilter);

  this.interventions = this.interventionsFiltred.filter(i => i.technicienId === id);
   console.log('Technicien ID:', this.interventions.length);

}





private getAllFilteredInterventions(): any[] {
   let list = this.interventions || [];

  // Exemple d’appels si vous avez ces méthodes:
  if (this.searchTerm) {
    // @ts-ignore
    list = this.filterBySearch(list);
  }
  if (this.filterByAeroport) {
    // @ts-ignore
    list = this.filterByAeroport(list);
  }
  if (this.filterByZone) {
    // @ts-ignore
    list = this.filterByZone(list);
  }
  if (this.filterByComptoir) {
    // @ts-ignore
    list = this.filterByComptoir(list);
  }
  if (this.filterByTechnicien) {
    // @ts-ignore
    list = this.filterByTechnicien(list);
  }
  return list;
}

private csvEscape(v: any): string {
  if (v === null || v === undefined) return '';
  const s = String(v).replace(/"/g, '""');
  return /[;"\n\r]/.test(s) ? `"${s}"` : s;
}

exportAllInterventions() {
  const data = this.interventions;
  if (!data.length) return;

  const headers = [
    'Id','Numero','Date','Debut','Fin','Duree','Campagne','Technicien',
    'Zone','Comptoir','Projet','Equipements','Solution','Probleme','Aeroport'
  ];

  const lines = [headers.join(';')];

  data.forEach(interv => {
    const equipements = (this.getEquipementsByProjectId
      ? this.getEquipementsByProjectId(interv.projetId) || []
      : []
    ).map((e:any)=>`${e.nameEquipement} x${e.quantite}`).join(', ');

    const row = [
      interv.id,
      interv.numero,
      interv.date,
      interv.dateDebut,
      interv.dateFin,
      interv.duration,
      this.getCampagneNameById?.(interv.campagnyId) || '',
      this.getTechnicienNameById?.(interv.technicienId) || '',
      this.getZoneNameById?.(interv.zoneId) || '',
      this.getComptoireNameById?.(interv.comptoireId) || '',
      this.getProjectNameById?.(interv.projetId) || '',
      equipements,
      this.getSolutionNameById?.(interv.solutionId) || '',
      this.getProblemNameById?.(interv.problemId) || '',
      this.getAeroportNameById?.(interv.aeroportId) || ''
    ].map(v=>this.csvEscape(v));

    lines.push(row.join(';'));
  });

  const csv = '\uFEFF' + lines.join('\r\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const stamp = new Date().toISOString().slice(0,19).replace(/[:T]/g,'-');
  a.href = url;
  a.download = `interventions_all_${stamp}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

}

