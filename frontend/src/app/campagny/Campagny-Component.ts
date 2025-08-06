import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CampagnyService, Campagny } from './campagny-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Input, Output, EventEmitter } from '@angular/core';
import { LangService } from '../services/lang.service';

@Component({
  selector: 'app-campagny',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './campagny.html',
  styleUrl: './campagny.css',
})
export class CampagnyComponent {
  campagnies: any[] = [];
  searchTerm: string = '';
  currentPage: number = 0;
  pageSize: number = 5;
  editingCampagny: Campagny | null = null;
  showPopup: boolean = false;
  showEditPopup: boolean = false;
  newCampagny: Campagny = { name: '' };
  editedName: string = '';
  campagnyToDelete: number | null = null;
  showEmptyFieldPopup = false;
  showPopupSuppression = false;
  showAlreadyExistsPopup = false;
  showSuccessPopup = false;
  showEditSuccessPopup = false;
  showDeleteSuccessPopup = false;
  totalItems: number = 0;
  selectedEntity = 'campagny';

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
  
  constructor(private campagnyService: CampagnyService, public langService: LangService) {
    console.log('Campagny component initialized');
    this.getCampagnyList();
  }

  getCampagnyList() {
    console.log('Calling getCampagnyList()...');
    this.campagnyService.getAllCampagnies().subscribe({
      next: (data) => {
        console.log('Received campagnies:', data);
        // 🔁 Trie décroissant par ID (le plus récent en haut)
        this.campagnies = data.sort((a, b) => b.id! - a.id!);
      },
      error: (err) => {
        console.error('Error fetching campagnies:', err);
      }
    });
  }
  
  filteredCampagny(): Campagny[] {
    return this.campagnies
      .filter(p => p.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
      .slice(this.currentPage * this.pageSize, (this.currentPage + 1) * this.pageSize);
  }

  get pageCount(): number {
    return Math.ceil(
      this.campagnies.filter(p => p.name.toLowerCase().includes(this.searchTerm.toLowerCase())).length / this.pageSize
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

  addCampagny() {
    // Vérifie si le champ est vide
    if (!this.newCampagny.name || this.newCampagny.name.trim() === '') {
      this.showEmptyFieldPopup = true;
      return;
    }

    // Vérifie si le nom existe déjà
    if (
      this.campagnies.some(
        c => c.name.trim().toLowerCase() === this.newCampagny.name.trim().toLowerCase()
      )
    ) {
      this.showPopup = false;
      this.showAlreadyExistsPopup = true;
      return;
    }

    // Ajout si tout est OK
    this.campagnyService.createCampagny(this.newCampagny).subscribe({
      next: () => {
        this.getCampagnyList();
        this.newCampagny.name = '';
        this.showPopup = false; // Cache la fenêtre d'ajout
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
  
  startEdit(campagny: Campagny) {
    this.editingCampagny = campagny;
    this.editedName = campagny.name;
    this.showEditPopup = true;
  }
  
  closeEditPopup() {
    this.showEditPopup = false;
    this.editingCampagny = null;
    this.editedName = '';
  }

  saveEditedCampagny() {
    // Vérifie si le champ est vide
    if (!this.editedName || this.editedName.trim() === '') {
      this.showEmptyFieldPopup = true;
      return;
    }
    
    // Vérifie si le nouveau nom existe déjà chez une autre campagne
    if (
      this.campagnies.some(
        c => c.id !== this.editingCampagny?.id && c.name.trim().toLowerCase() === this.editedName.trim().toLowerCase()
      )
    ) {
      this.showEditPopup = false;
      this.showAlreadyExistsPopup = true; // Affiche le message d'erreur
      return;
    }

    // Modification si tout est OK
    if (this.editingCampagny && this.editingCampagny.id) {
      this.campagnyService.updateCampagny(this.editingCampagny.id, { name: this.editedName }).subscribe({
        next: () => {
          this.getCampagnyList();
          this.showEditPopup = false;
          this.editingCampagny = null; // Cache la fenêtre d'édition
          this.editedName = '';
          this.showEditSuccessPopup = true; // Affiche le popup succès
        },
        error: (err) => console.error(err)
      });
    }
  }

  updateCampagny(id: number) {
    // Cette méthode est conservée pour compatibilité avec le code existant
    if (this.editingCampagny && this.editedName) {
      this.campagnyService.updateCampagny(id, { name: this.editedName }).subscribe({
        next: () => {
          this.getCampagnyList();
          this.editingCampagny = null;
          this.editedName = '';
          this.showEditSuccessPopup = true;
        },
        error: (err) => console.error(err)
      });
    }
  }

  closeEditSuccessPopup() {
    this.showEditSuccessPopup = false;
  }
  
  closeAlreadyExistsPopupUpdate() {
    this.showAlreadyExistsPopup = false;
    this.showEditPopup = true; // On ré-affiche la fenêtre d'édition
  }

  askDelete(id: number) {
    this.campagnyToDelete = id;
    this.showPopupSuppression = true;
  }

  confirmDelete() {
    if (this.campagnyToDelete) {
      this.campagnyService.deleteCampagny(this.campagnyToDelete).subscribe({
        next: () => {
          this.getCampagnyList();
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