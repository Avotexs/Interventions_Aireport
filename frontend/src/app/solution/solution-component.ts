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
     // Temporary edited name used in editing UI
  


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
}

closeEmptyFieldPopupUpdate() {
  this.showEmptyFieldPopupUpdate = false;
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

updateSolution(id: number) {
  // Vérifie si le champ est vide ou ne contient que des espaces
  if (!this.editedName || !this.editedName.trim()) {
    this.showEmptyFieldPopupUpdate  = true; // Affiche le popup d'erreur pour champ vide
    return;
  }

  // Vérifie si le nouveau nom existe déjà chez une autre campagne
  if (
    this.solutions.some(
      c => c.id !== id && c.name.trim().toLowerCase() === this.editedName.trim().toLowerCase()
    )
  ) {
    this.editingSolution = null; // Cache la fenêtre d'édition
    this.showAlreadyExistsPopup = true; // Affiche le message d'erreur
    return;
  }

  // Modification si tout est OK
  this.solutionService.updateSolution(id, { name: this.editedName }).subscribe({
    next: () => {
      this.getSolutionList();
      this.editingSolution = null; // Cache la fenêtre d'édition
      this.editedName = '';
      this.showEditSuccessPopup = true; // Affiche le popup succès
    },
    error: (err) => console.error(err)
  });
}

closeEditSuccessPopup() {
  this.showEditSuccessPopup = false;
}
closeAlreadyExistsPopupUpdate() {
  this.showAlreadyExistsPopup = false;
  // On ré-affiche la fenêtre d’édition avec le même nom
  this.editingSolution = { ...this.editingSolution, name: this.editedName };
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
