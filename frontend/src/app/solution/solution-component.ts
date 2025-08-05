import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { SolutionService, Solution } from './solution-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-solution',
  imports: [ CommonModule, FormsModule ],
  templateUrl: './solution.html',
  styleUrl: './solution.css',
  standalone: true
})
export class SolutionComponent {
searchTerm: string = '';
  currentPage: number = 0;
  pageSize: number = 5;
  solutions: Solution[] = [];
  searchResults: Solution[] = [];
  newSolution: Solution = {name: '' };
  searchSolution: Solution = { name: '' };
  editingSolution: any = null;
  editedName: string = '';
  noResultFound: boolean = false;
  showPopup: boolean = false;
  campagnyToDelete: number|null = null;
  showEmptyFieldPopup = false;
  showEmptyFieldPopupUpdate = false;
  showPopupSuppression = false;
  showAlreadyExistsPopup = false;
  showSuccessPopup = false;
  showEditSuccessPopup = false;
  showDeleteSuccessPopup = false;
  solutionToDelete: number|null = null;
  
    //var pour modiffier le nom
  showEditPopup = false;
  editId:number|null=null;
showAlreadyExistsPopupUpdate: boolean = false;

lang: 'fr' | 'en' = 'fr';

translations = {
  fr: {
    title: 'Liste des solutions',
    add: 'Ajouter',
    searchPlaceholder: '🔍 Rechercher une solution...',
    emptyList: 'La liste est vide',
    name: 'Nom',
    id: 'ID',
    edit: '✏ Modifier',
    save: '💾 Enregistrer',
    delete: '🗑 Supprimer',
    confirmDelete: 'Voulez-vous vraiment supprimer cette solution ?',
    confirm: 'Confirmer',
    cancel: 'Annuler',
    successAdd: 'Ajout avec succès !',
    successEdit: 'Modification avec succès !',
    successDelete: 'Suppression avec succès !',
    exists: 'La solution existe déjà !',
    emptyField: 'Le champ est vide !',
    addTitle: 'Ajouter une solution',
    componentName: 'Nom de la solution',
    editCampaign: 'Modifier la solution',
    actions: 'Actions'
  },
  en: {
    title: 'Solutions List',
    add: 'Add',
    searchPlaceholder: '🔍 Search a solution...',
    emptyList: 'The list is empty',
    name: 'Name',
    id: 'ID',
    edit: '✏ Edit',
    save: '💾 Save',
    delete: '🗑 Delete',
    confirmDelete: 'Do you really want to delete this solution?',
    confirm: 'Confirm',
    cancel: 'Cancel',
    successAdd: 'Successfully added!',
    successEdit: 'Successfully edited!',
    successDelete: 'Successfully deleted!',
    exists: 'Solution already exists!',
    emptyField: 'The field is empty!',
    addTitle: 'Add a solution',
    componentName: 'Solution Name',
    editCampaign: 'Edit solution',
    actions: 'Actions'
  }
};

get t() {
  return this.translations[this.lang];
}


  constructor(private solutionService: SolutionService) {
    console.log('Solution component initialized');
    this.getSolutionList();
  }

  getSolutionList() {
    console.log('Calling getSolutionList()...');
    this.solutionService.getAllSolutions().subscribe({
      next: (data) => {
        console.log('Received solutions:', data);
        this.solutions = data;
      },
      error: (err) => {
        console.error('Error fetching solutions:', err);
      }
    });
  }
  filteredSolutions(): Solution[] {
    return this.solutions
      .filter(p => p.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
      .slice(this.currentPage * this.pageSize, (this.currentPage + 1) * this.pageSize);
  }

get pageCount(): number {
    return Math.ceil(
      this.solutions.filter(p => p.name.toLowerCase().includes(this.searchTerm.toLowerCase())).length / this.pageSize
    );
  }

  goToPage(index: number) {
    this.currentPage = index;
  }

  onSearchChange() {
    this.currentPage = 0;
  }
 clearSearch() {
  this.searchTerm = '';
  this.onSearchChange(); // relance une recherche vide
}

addSolution() {
  // Vérifie si le champ est vide
  if (!this.newSolution.name || this.newSolution.name.trim() === '') {
    this.showEmptyFieldPopup = true;
     this.showPopup = false;
    return;
  }

  // Vérifie si le nom existe déjà
  if (
    this.solutions.some(
      c => c.name.trim().toLowerCase() === this.newSolution.name.trim().toLowerCase()
    )
  ) {
    this.showPopup = false;
    this.showAlreadyExistsPopup = true;
    return;
  }

  // Ajout si tout est OK
  this.solutionService.createSolution(this.newSolution).subscribe({
    next: () => {
      this.getSolutionList();
      this.newSolution.name = '';
      this.showPopup = false; // Cache la fenêtre d’ajout
      this.showSuccessPopup = true; // Affiche le popup succès
    },
    error: (err) => console.error(err)
  });
}
closeAlreadyExistsPopupAdd() {
  this.showAlreadyExistsPopup = false;
  // On ré-affiche la fenêtre d’édition avec le même nom
  this.showPopup = true; // On ré-affiche la fenêtre d'ajout
  }

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
  this.showPopup = true;
}

closeEmptyFieldPopupUpdate() {
  this.showEmptyFieldPopupUpdate = false;
  this.showEditPopup = true;
}
startEdit(solution: Solution) {
    this.editingSolution = solution;
    this.editedName = solution.name;
  }

  deleteSolution(id: number) {
    this.solutionService.deleteSolution(id).subscribe({
      next: () => this.getSolutionList(),
      error: (err) => console.error(err)
    });
  }

updateSolution(id: number, editedName: string) {
  // Vérifie si le champ est vide ou ne contient que des espaces
  if (!this.editedName || !this.editedName.trim()) {
    this.showEmptyFieldPopupUpdate  = true; // Affiche le popup d'erreur pour champ vide
    this.showEditPopup = false;
    return;
  }

  // Vérifie si le nouveau nom existe déjà chez une autre campagne
  if (
    this.solutions.some(
      c => c.id !== id && c.name.trim().toLowerCase() === this.editedName.trim().toLowerCase()
    )
  ) {
    this.showEditPopup = false; // Cache la fenêtre d'édition
    this.showAlreadyExistsPopupUpdate = true; // Affiche le message d'erreur
    
  
    return;
  }

  // Modification si tout est OK
  this.solutionService.updateSolution(id, { name: this.editedName }).subscribe({
    next: () => {
      this.getSolutionList();
      this.showEditPopup = false;
      this.editingSolution = null; // Cache la fenêtre d'édition
      this.editedName = '';
      this.showEditSuccessPopup = true; // Affiche le popup succès
    },
    error: (err) => console.error(err)
  });
}

openEditPopup(problem: Solution) {

  this.editingSolution = problem ; // Copie pour édition
  this.editedName = problem.name;
  this.editId= problem.id ?? null;
  this.showEditPopup = true;
}


closeEditPopup() {
  this.showEditPopup = false;
  this.editingSolution = null;
  this.editedName = '';
}





closeEditSuccessPopup() {
  this.showEditSuccessPopup = false;
}
closeAlreadyExistsPopupUpdate() {
  this.showAlreadyExistsPopupUpdate = false;
  // On ré-affiche la fenêtre d’édition avec le même nom
  this.editingSolution = { ...this.editingSolution, name: this.editedName };
  this.showEditPopup = true; // On ré-affiche la fenêtre d'édition
}

  askDelete(id: number) {
    this.solutionToDelete = id;
    this.showPopupSuppression = true;
  }

confirmDelete() {
  if (this.solutionToDelete) {
    this.solutionService.deleteSolution(this.solutionToDelete).subscribe({
      next: () => {
        this.getSolutionList();
        this.showDeleteSuccessPopup = true; // Affiche le popup succès
      },
      error: (err) => console.error(err)
    });
  }

  this.showPopupSuppression = false; // Cache la fenêtre de confirmation
  this.campagnyToDelete = null;
}

  // Annule la suppression
  cancelDelete() {
    this.showPopupSuppression = false;
    this.campagnyToDelete = null;
  }
closeDeleteSuccessPopup() {
  this.showDeleteSuccessPopup = false;
}
  


  



}
