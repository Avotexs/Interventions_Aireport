import { Component } from '@angular/core';
import { Aeroport } from './aeroport-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AeroportService } from './aeroport-service';
import { LangService } from '../services/lang.service';
import { TechnicienService, Technicien } from '../technicien-component/technicien-service';

@Component({
  selector: 'app-aeroport-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './aeroport-component.html',
  styleUrl: './aeroport-component.css'
})
export class AeroportComponent {

  aeroports: Aeroport[] = [];     // List of all aeroports fetched from the backend
  editingAeroport: Aeroport | null = null;    // Aeroport currently being edited (null if none)
  newAeroport: Aeroport = { name: '' }; // New aeroport to be created
  editedName: string = '';     // Temporary edited name used in editing UI
  searchTerm: string = '';       // Search term bound to input field
  currentPage: number = 0;     // Pagination: current page index
  pageSize: number = 5;   // Pagination: number of items per page
  showPopup: boolean = false;  // Whether the popup/modal is visible
  aeroportToDelete: number|null = null;
  showEmptyFieldPopup = false;
  showPopupSuppression = false;
  showAlreadyExistsPopup = false;
  showSuccessPopup = false;
  showEditSuccessPopup = false;
  showDeleteSuccessPopup = false;
  showEmptyFieldPopupUpdate = false;
  totalItems: number = 0;
  selectedEntity = 'aeroport';
  showEditPopup: boolean = false;
  // Popup when deletion is blocked due to linked technicians
  showCannotDeletePopup = false;

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
   * Constructor that injects the AeroportService and initializes data.
   * @param aeroportService - Service for accessing aeroports from backend
   */

    constructor(private aeroportService: AeroportService, private langService: LangService, private technicienService: TechnicienService) {
    this.getAllAeroports();
  }

   /**
   * Fetches all aeroports from the backend and sorts them in descending order by ID.
   */

getAllAeroports() {
  this.aeroportService.getAll().subscribe({
    next: (data) => {
      // 🔁 Trie décroissant par ID (le plus récent en haut)
      this.aeroports = data.sort((a, b) => b.id! - a.id!);
    },
    error: (err) => console.error(err)
  });
}

   /**
   * Returns the list of aeroports filtered by the search term
   * and sliced for pagination.
   * @returns Filtered and paginated aeroports
   */
  filteredAeroports(): Aeroport[] {
    return this.aeroports
      .filter(a => a.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
      .slice(this.currentPage * this.pageSize, (this.currentPage + 1) * this.pageSize);
  } 
  /**
   * Calculates the total number of pages based on the filtered result.
   * @returns Total page count for pagination
   */
    get pageCount(): number {
    return Math.ceil(
      this.aeroports.filter(a => a.name.toLowerCase().includes(this.searchTerm.toLowerCase())).length / this.pageSize
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



  addAeroport() {
  // Vérifie si le champ est vide
  if (!this.newAeroport.name || this.newAeroport.name.trim() === '') {
    this.showEmptyFieldPopup = true;
    return;
  }

  // Vérifie si le nom existe déjà
  if (
    this.aeroports.some(
      c => c.name.trim().toLowerCase() === this.newAeroport.name.trim().toLowerCase()
    )
  ) {
    this.showPopup = false;
    this.showAlreadyExistsPopup = true;
    return;
  }

  // Ajout si tout est OK
  this.aeroportService.createAeroport(this.newAeroport).subscribe({
    next: () => {
      this.getAllAeroports();
      this.newAeroport.name = '';
      this.showPopup = false; // Cache la fenêtre d’ajout
      this.showSuccessPopup = true; // Affiche le popup succès
    },
    error: (err) => console.error(err)
  });
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
}
closeEmptyFieldPopupUpdate() {
  this.showEmptyFieldPopupUpdate = false;
}

startEdit(aeroport: Aeroport) {
    this.editingAeroport = aeroport;
    this.editedName = aeroport.name;
    this.showEditPopup = true;
  }
  
  closeEditPopup() {
    this.showEditPopup = false;
    this.editingAeroport = null;
    this.editedName = '';
  }


  saveEditedAeroport() {
    // Vérifie si le champ est vide
    if (!this.editedName || this.editedName.trim() === '') {
      this.showEmptyFieldPopup = true;
      return;
    }
    
    // Vérifie si le nouveau nom existe déjà chez une autre aéroport
    if (
      this.aeroports.some(
        c => c.id !== this.editingAeroport?.id && c.name.trim().toLowerCase() === this.editedName.trim().toLowerCase()
      )
    ) {
      this.showEditPopup = false;
      this.showAlreadyExistsPopup = true; // Affiche le message d'erreur
      return;
    }

    // Modification si tout est OK
    if (this.editingAeroport && this.editingAeroport.id) {
      this.aeroportService.updateAeroport(this.editingAeroport.id, { name: this.editedName }).subscribe({
        next: () => {
          this.getAllAeroports();
          this.showEditPopup = false;
          this.editingAeroport = null; // Cache la fenêtre d'édition
          this.editedName = '';
          this.showEditSuccessPopup = true; // Affiche le popup succès
        },
        error: (err) => console.error(err)
      });
    }
  }


updateAeroport(id: number) {
  // Vérifie si le champ est vide ou ne contient que des espaces
  if (!this.editedName || !this.editedName.trim()) {
    this.showEmptyFieldPopupUpdate  = true; // Affiche le popup d'erreur pour champ vide
    return;
  }
  // Vérifie si le nouveau nom existe déjà chez une autre aéroport
  if (
    this.aeroports.some(
      c => c.id !== id && c.name.trim().toLowerCase() === this.editedName.trim().toLowerCase()
    )
  ) {
    this.editingAeroport = null; // Cache la fenêtre d'édition
    this.showAlreadyExistsPopup = true; // Affiche le message d'erreur
    return;
  }

  // Modification si tout est OK
  this.aeroportService.updateAeroport(id, { name: this.editedName }).subscribe({
    next: () => {
      this.getAllAeroports();
      this.editingAeroport = null; // Cache la fenêtre d'édition
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
  this.editingAeroport = { ...this.editingAeroport, name: this.editedName };
}

  askDelete(id: number) {
    this.aeroportToDelete = id;
    this.showPopupSuppression = true;
  }


confirmDelete() {
  if (!this.aeroportToDelete) {
    this.showPopupSuppression = false;
    return;
  }

  const idToDelete = this.aeroportToDelete;

  // Check if any technician is linked to this airport before deleting
  this.technicienService.getTechniciens().subscribe({
    next: (techniciens: Technicien[]) => {
      const used = techniciens.some(t => t.aeroportId === idToDelete);
      if (used) {
        // Block deletion and inform user
        this.showPopupSuppression = false;
        this.showCannotDeletePopup = true;
        this.aeroportToDelete = null;
        return;
      }

      // Proceed with deletion if not used
      this.aeroportService.deleteAeroport(idToDelete).subscribe({
        next: () => {
          this.getAllAeroports();
          this.showDeleteSuccessPopup = true;
        },
        error: (err) => {
          console.error(err);
        }
      });

      this.showPopupSuppression = false;
      this.aeroportToDelete = null;
    },
    error: (err) => {
      console.error('Error checking technicians before delete:', err);
      // Fallback: close dialog without deleting
      this.showPopupSuppression = false;
    }
  });
}

// Close the cannot-delete popup
closeCannotDeletePopup() {
  this.showCannotDeletePopup = false;
}

// Annule la suppression
  cancelDelete() {
    this.showPopupSuppression = false;
    this.aeroportToDelete = null;
  }
closeDeleteSuccessPopup() {
  this.showDeleteSuccessPopup = false;
}
}
