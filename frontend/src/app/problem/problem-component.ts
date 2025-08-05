import { Component } from '@angular/core';
import { ProblemService, Problem } from './problem-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LangService } from '../services/lang.service';

@Component({
  selector: 'app-problem', 
  imports: [CommonModule, FormsModule], 
  standalone: true, 
  templateUrl: './problem.html', 
  styleUrl: './problem.css' 
})
export class ProblemComponent {
  problems: Problem[] = [];     // List of all problems fetched from the backend
  editingProblem: Problem | null = null;    // Problem currently being edited (null if none)
  newProblem: Problem = { name: '' }; // New problem to be created
  editedName: string = '';     // Temporary edited name used in editing UI
  searchTerm: string = '';       // Search term bound to input field
  currentPage: number = 0;     // Pagination: current page index
  pageSize: number = 5;   // Pagination: number of items per page
  showPopup: boolean = false;  // Whether the popup/modal is visible
  problemToDelete: number|null = null;
  showEmptyFieldPopup = false;
  showPopupSuppression = false;
  showAlreadyExistsPopup = false;
  showSuccessPopup = false;
  showEditSuccessPopup = false;
  showDeleteSuccessPopup = false;
  showEmptyFieldPopupUpdate = false;
  totalItems: number = 0;
  selectedEntity = 'problem';

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
  /**
   * Constructor that injects the ProblemService and initializes data.
   * @param problemService - Service for accessing problems from backend
   */

    constructor(private problemService: ProblemService, private langService: LangService) {
    this.getProblemList();
  }

   /**
   * Fetches all problems from the backend and sorts them in descending order by ID.
   */

getProblemList() {
  this.problemService.getAllProblems().subscribe({
    next: (data) => {
      // 🔁 Trie décroissant par ID (le plus récent en haut)
      this.problems = data.sort((a, b) => b.id! - a.id!);
    },
    error: (err) => console.error(err)
  });
}
   /**
   * Returns the list of problems filtered by the search term
   * and sliced for pagination.
   * @returns Filtered and paginated problems
   */
  filteredProblems(): Problem[] {
    return this.problems
      .filter(p => p.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
      .slice(this.currentPage * this.pageSize, (this.currentPage + 1) * this.pageSize);
  } 
  /**
   * Calculates the total number of pages based on the filtered result.
   * @returns Total page count for pagination
   */
    get pageCount(): number {
    return Math.ceil(
      this.problems.filter(p => p.name.toLowerCase().includes(this.searchTerm.toLowerCase())).length / this.pageSize
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



  addProblem() {
  // Vérifie si le champ est vide
  if (!this.newProblem.name || this.newProblem.name.trim() === '') {
    this.showEmptyFieldPopup = true;
    return;
  }

  // Vérifie si le nom existe déjà
  if (
    this.problems.some(
      c => c.name.trim().toLowerCase() === this.newProblem.name.trim().toLowerCase()
    )
  ) {
    this.showPopup = false;
    this.showAlreadyExistsPopup = true;
    return;
  }

  // Ajout si tout est OK
  this.problemService.createProblem(this.newProblem).subscribe({
    next: () => {
      this.getProblemList();
      this.newProblem.name = '';
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

startEdit(problem: Problem) {
    this.editingProblem = problem;
    this.editedName = problem.name;
  }


 

updateProblem(id: number) {
  // Vérifie si le champ est vide ou ne contient que des espaces
  if (!this.editedName || !this.editedName.trim()) {
    this.showEmptyFieldPopupUpdate  = true; // Affiche le popup d'erreur pour champ vide
    return;
  }
  // Vérifie si le nouveau nom existe déjà chez une autre problème
  if (
    this.problems.some(
      c => c.id !== id && c.name.trim().toLowerCase() === this.editedName.trim().toLowerCase()
    )
  ) {
    this.editingProblem = null; // Cache la fenêtre d'édition
    this.showAlreadyExistsPopup = true; // Affiche le message d'erreur
    return;
  }

  // Modification si tout est OK
  this.problemService.updateProblem(id, { name: this.editedName }).subscribe({
    next: () => {
      this.getProblemList();
      this.editingProblem = null; // Cache la fenêtre d'édition
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
  this.editingProblem = { ...this.editingProblem, name: this.editedName };
}

  askDelete(id: number) {
    this.problemToDelete = id;
    this.showPopupSuppression = true;
  }


confirmDelete() {
  if (this.problemToDelete) {
    this.problemService.deleteProblem(this.problemToDelete).subscribe({
      next: () => {
        this.getProblemList();
        this.showDeleteSuccessPopup = true; // Affiche le popup succès
      },
      error: (err) => console.error(err)
    });
  }

  this.showPopupSuppression = false; // Cache la fenêtre de confirmation
  this.problemToDelete = null;
}

// Annule la suppression
  cancelDelete() {
    this.showPopupSuppression = false;
    this.problemToDelete = null;
  }
closeDeleteSuccessPopup() {
  this.showDeleteSuccessPopup = false;
}

}



