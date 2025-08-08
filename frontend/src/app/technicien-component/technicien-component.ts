import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TechnicienService } from './technicien-service';
import { LangService } from '../services/lang.service';
import { Technicien } from './technicien-service';
@Component({
  selector: 'app-technicien-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './technicien-component.html',
  styleUrl: './technicien-component.css'
})
export class TechnicienComponent {

techniciens: Technicien[] = [];     // List of all techniciens fetched from the backend
aeroports: any[] = []; // Liste des aéroports pour la sélection
//pagination
  searchTerm: string = '';       // Search term bound to input field
  currentPage: number = 0;     // Pagination: current page index
  pageSize: number = 5;   // Pagination: number of items per page
  showPopup: boolean = false;  // Whether the popup/modal is visible
//variable for controlling visibility
  showPassword = false;
  editingTechnicien: Technicien | null = null;    // Technicien currently being edited (null if none)
  newTechnicien: Technicien = { firstname: '', lastname: '', pseudoname: '', role: '', motDePass: '', aeroportId: 0 }; // New technicien to be created

  showEmptyFieldPopup = false;
  showPopupSuppression = false;
  showAlreadyExistsPopup = false;
  showSuccessPopup = false;
  showEditSuccessPopup = false;
  showDeleteSuccessPopup = false;
  showEmptyFieldPopupUpdate = false;
  showInvalidAeroportIdPopup = false;

  editedFirstname: string = '';     // Temporary edited firstname used in editing UI
  editedLastname: string = '';      // Temporary edited lastname used in editing UI
  editedPseudoname: string = '';    // Temporary edited pseudoname used in editing UI
  editedRole: string = '';          // Temporrary edited role used in editing UI
  editedMotDePass: string = '';     // Temporary edited motDePass used in editing UI
  editedAeroport: number | null = null; // Temporary edited aeroport used in editing UI


  technicienToDelete: number | null = null; // ID of the technicien to delete
  selectedEntity = 'technicien';
  
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
   * Constructor that injects the necessary services.
   * @param technicienService - Service for accessing techniciens from backend
   * @param langService - Service for handling language toggling
   */
  constructor(private technicienService: TechnicienService, private langService: LangService) {
    // Initialization logic can go here if needed
    this.getAllTechniciens();
  }

   /**
   * Fetches all techniciens from the backend and sorts them in descending order by ID.
   */

getAllTechniciens() {
  this.technicienService.getTechniciens().subscribe({
    next: (data) => {
      // Trie décroissant par ID (le plus récent en haut)
      this.techniciens = data.sort((a, b) => b.id! - a.id!);
      console.log('Techniciens loaded:', this.techniciens,this);
    },
    error: (err) => console.error(err)
  });
}
togglePasswordVisibility() {
  this.showPassword = !this.showPassword;
}
/*
 /**
 * Returns the list of techniciens filtered by the search term
 * and sliced for pagination.
 * @returns Filtered and paginated techniciens
 */
filteredTechniciens(): Technicien[] {
    return this.techniciens
      .filter(p => p.firstname.toLowerCase().includes(this.searchTerm.toLowerCase()))
      .slice(this.currentPage * this.pageSize, (this.currentPage + 1) * this.pageSize);
  } 


  /**
   * Calculates the total number of pages based on the filtered result.
   * @returns Total page count for pagination
   */
    get pageCount(): number {
    return Math.ceil(
      this.techniciens.filter(p => p.id?.toString().toLowerCase().includes(this.searchTerm.toLowerCase())).length / this.pageSize
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


   addTechnicien() {

    // Vérifie si le champ est vide
  if (!this.newTechnicien.firstname || this.newTechnicien.firstname.trim() === '' ||
      !this.newTechnicien.lastname || this.newTechnicien.lastname.trim() === '' ||
      !this.newTechnicien.pseudoname || this.newTechnicien.pseudoname.trim() === '' ||
      !this.newTechnicien.role || this.newTechnicien.role.trim() === '' ||
      !this.newTechnicien.motDePass || this.newTechnicien.motDePass.trim() === '' ||
      !this.newTechnicien.aeroportId || this.newTechnicien.aeroportId <= 0) {
    this.showEmptyFieldPopup = true;
    return;
  }

  // Vérifie si le nom existe déjà
  if (
    this.techniciens.some(
      c => c.firstname?.trim().toLowerCase() === this.newTechnicien.firstname.trim().toLowerCase()
    )
  || this.techniciens.some(
      c => c.lastname?.trim().toLowerCase() === this.newTechnicien.lastname.trim().toLowerCase()
    )
  ) {
    this.showPopup = false;
    this.showAlreadyExistsPopup = true;
    return;
  }

  // Ajout si tout est OK
  this.technicienService.create(this.newTechnicien).subscribe({
    next: () => {
      this.getAllTechniciens();
      this.newTechnicien = { firstname: '', lastname: '', pseudoname: '', role: '', motDePass: '', aeroportId: 0   };
      this.showPopup = false; // Cache la fenêtre d’ajout
      this.showSuccessPopup = true; // Affiche le popup succès
    },
    error: (err) => console.error(err)
  });
    /*
    // Vérifie si le champ est vide
    if (!this.newTechnicien.firstname || this.newTechnicien.firstname.trim() === '' ||
        !this.newTechnicien.lastname || this.newTechnicien.lastname.trim() === '' ||
        !this.newTechnicien.pseudoname || this.newTechnicien.pseudoname.trim() === '' ||
        !this.newTechnicien.role || this.newTechnicien.role.trim() === '' ||
        !this.newTechnicien.motDePass || this.newTechnicien.motDePass.trim() === '' ||
        !this.newTechnicien.aeroportId || this.newTechnicien.aeroportId <= 0) {
      this.showEmptyFieldPopup = true;
      console.log('Empty field detected');
      return;
    }

    // Vérifie si l'ID de l'aéroport est valide
    if (!this.aeroports.find(a => a.id === this.newTechnicien.aeroportId)) {
      this.showInvalidAeroportIdPopup = true;
      console.log('Invalid aeroport ID');
      return;
    }
    // Vérifie si l'ID de l'aéroport est 0
    if (this.newTechnicien.aeroportId === 0) {
      this.showInvalidAeroportIdPopup = true;
      console.log('Invalid aeroport ID: 0');
      return;
    }

    // Vérifie si le nom existe déjà
  if (
  this.techniciens.some(
    c => c.firstname?.trim().toLowerCase() === this.newTechnicien.firstname.trim().toLowerCase()
  )
  || this.techniciens.some(
    c => c.lastname?.trim().toLowerCase() === this.newTechnicien.lastname.trim().toLowerCase()
  )
) {
  this.showPopup = false;
  this.showAlreadyExistsPopup = true;
  return;
}

    // Ajout si tout est OK
    this.technicienService.create(this.newTechnicien).subscribe({
        
      next: () => {
        this.getAllTechniciens();
        this.newTechnicien = { firstname: '', lastname: '', pseudoname: '', role: '', motDePass: '', aeroportId: 0   };
        this.showPopup = false; // Cache la fenêtre d’ajout
        this.showSuccessPopup = true; // Affiche le popup succès
      },
      error: (err) => console.error(err)
      
    });
    console.log('Adding new technicien:', this.newTechnicien);
    */
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


 
startEdit(technician: Technicien) {
    this.editingTechnicien = technician;
    this.editedFirstname = technician.firstname;
    this.editedLastname = technician.lastname;
    this.editedPseudoname = technician.pseudoname;
    this.editedRole = technician.role;
    this.editedMotDePass = technician.motDePass;
    this.editedAeroport = technician.aeroportId; // Assuming aeroportId is a number
  }

// Annule la suppression
  cancelDelete() {
    this.showPopupSuppression = false;
    this.technicienToDelete = null;
  }

   askDelete(id: number) {

    this.technicienToDelete = id;
    this.showPopupSuppression = true;
    
  }


confirmDelete() {
  if (this.technicienToDelete) {
    this.technicienService.delete(this.technicienToDelete).subscribe({
      next: () => {
        this.getAllTechniciens();
        this.showDeleteSuccessPopup = true; // Affiche le popup succès
      },
      error: (err) => console.error(err)
    });
  }

  this.showPopupSuppression = false; // Cache la fenêtre de confirmation
  this.technicienToDelete = null;
}

/*
addTechnicien() { 
  if (this.editingTechnicien) {
    // Update existing technicien
    this.technicienService.update(this.editingTechnicien.id!, this.editingTechnicien).subscribe({
      next: (updatedTechnicien) => {
        const index = this.techniciens.findIndex(t => t.id === updatedTechnicien.id);
        if (index !== -1) {
          this.techniciens[index] = updatedTechnicien;
        }
        this.showPopup = false;
        this.editingTechnicien = null;
      },
      error: (err) => console.error(err)
    });
  } else {
    // Create new technicien
    this.technicienService.create(this.newTechnicien).subscribe({
      next: (createdTechnicien) => {
        this.techniciens.push(createdTechnicien);
        this.showPopup = false;
        this.newTechnicien = { firstname: '', lastname: '', pseudoname: '', role: '', motDePass: '', aeroportId: 0 };
      },
      error: (err) => console.error(err)
    });
  } 
}
  */

  /**
   * Opens the popup/modal for adding a new technicien.
   */
  openAddTechnicienPopup() {
    this.newTechnicien = { firstname: '', lastname: '', pseudoname: '', role: '', motDePass: '', aeroportId: 0 };
    this.editingTechnicien = null;
    this.showPopup = true;
  }
  
}