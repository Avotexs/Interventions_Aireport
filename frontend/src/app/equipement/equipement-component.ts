import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EquipementService, Equipement } from './equipement-service';
import { LangService } from '../services/lang.service';
@Component({
  selector: 'app-equipement',
  imports: [ CommonModule, FormsModule ],
  templateUrl: './equipement.html',
  styleUrls: ['./equipement.css'], // correction typo styleUrl -> styleUrls
  standalone: true
})
export class EquipementComponent {

 
  searchTerm: string = '';
  currentPage: number = 0;
  pageSize: number = 5;
  equipements: Equipement[] = [];
  newEquipement: Equipement = { nameEquipement: '', quantite: 0 };
  editingEquipement: Equipement | null = null;
  editedName: string = '';
  editedQuantite: number = 0;

  // Flags pour modals
  showPopup: boolean = false;
  showEditPopup: boolean = false;            // Modal édition
  showEmptyFieldPopup: boolean = false;
  showEmptyFieldPopupUpdate: boolean = false;
  showPopupSuppression: boolean = false;
  showAlreadyExistsPopup: boolean = false;
  showSuccessPopup: boolean = false;
  showEditSuccessPopup: boolean = false;
  showDeleteSuccessPopup: boolean = false;

  equipementToDelete: number | null = null;
  selectedEntity = 'equipement';

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
  constructor(private equipementService: EquipementService, public langService: LangService) {
    this.getEquipementList();
  }

  getEquipementList() {
    this.equipementService.getAllEquipements().subscribe({
      next: (data) => {
        this.equipements = data;
      },
      error: (err) => {
        console.error('Error fetching equipements:', err);
      }
    });
  }

  filteredEquipements(): Equipement[] {
    return this.equipements
      .filter(e => e.nameEquipement.toLowerCase().includes(this.searchTerm.toLowerCase()))
      .slice(this.currentPage * this.pageSize, (this.currentPage + 1) * this.pageSize);
  }

  get pageCount(): number {
    return Math.ceil(
      this.equipements.filter(e => e.nameEquipement.toLowerCase().includes(this.searchTerm.toLowerCase())).length / this.pageSize
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
    this.onSearchChange();
  }

  addEquipement() {
    if (!this.newEquipement.nameEquipement || this.newEquipement.nameEquipement.trim() === '') {
      this.showEmptyFieldPopup = true;
      return;
    }
    if (this.newEquipement.quantite == null || isNaN(this.newEquipement.quantite)) {
      this.showEmptyFieldPopup = true;
      return;
    }
    if (
      this.equipements.some(
        e => e.nameEquipement.trim().toLowerCase() === this.newEquipement.nameEquipement.trim().toLowerCase()
      )
    ) {
      this.showPopup = false;
      this.showAlreadyExistsPopup = true;
      return;
    }

    this.equipementService.createEquipement(this.newEquipement).subscribe({
      next: () => {
        this.getEquipementList();
        this.newEquipement = { nameEquipement: '', quantite: 0 };
        this.showPopup = false;
        this.showSuccessPopup = true;
      },
      error: (err) => console.error(err)
    });
  }

  startEdit(equipement: Equipement) {
    this.editingEquipement = equipement;
    this.editedName = equipement.nameEquipement;
    this.editedQuantite = equipement.quantite;
    this.showEditPopup = true;
  }

  saveEditedEquipement() {
    if (!this.editingEquipement) return;
    this.updateEquipement(this.editingEquipement.id!);
    this.showEditPopup = false;
  }

  updateEquipement(id: number) {
    if (!this.editedName || !this.editedName.trim()) {
      this.showEmptyFieldPopupUpdate = true;
      return;
    }
    if (
      this.equipements.some(
        e => e.id !== id && e.nameEquipement.trim().toLowerCase() === this.editedName.trim().toLowerCase()
      )
    ) {
      this.editingEquipement = null;
      this.showAlreadyExistsPopup = true;
      return;
    }
    this.equipementService.updateEquipement(id, { nameEquipement: this.editedName, quantite: this.editedQuantite }).subscribe({
      next: () => {
        this.getEquipementList();
        this.editingEquipement = null;
        this.editedName = '';
        this.editedQuantite = 0;
        this.showEditSuccessPopup = true;
      },
      error: (err) => console.error(err)
    });
  }

  // Méthodes pour fermer modals
  closeEditPopup() {
    this.showEditPopup = false;
  }

  closeSuccessPopup() {
    this.showSuccessPopup = false;
  }

  closeEditSuccessPopup() {
    this.showEditSuccessPopup = false;
  }

  closeDeleteSuccessPopup() {
    this.showDeleteSuccessPopup = false;
  }

  closeEmptyFieldPopup() {
    this.showEmptyFieldPopup = false;
  }

  closeEmptyFieldPopupUpdate() {
    this.showEmptyFieldPopupUpdate = false;
  }

  closeAlreadyExistsPopupUpdate() {
    this.showAlreadyExistsPopup = false;
  }

  // Suppression (exemple simple, tu peux compléter)
  askDelete(id: number) {
    this.equipementToDelete = id;
    this.showPopupSuppression = true;
  }

  cancelDelete() {
    this.equipementToDelete = null;
    this.showPopupSuppression = false;
  }

  confirmDelete() {
    if (this.equipementToDelete == null) return;
    this.equipementService.deleteEquipement(this.equipementToDelete).subscribe({
      next: () => {
        this.getEquipementList();
        this.showPopupSuppression = false;
        this.equipementToDelete = null;
        this.showDeleteSuccessPopup = true;
      },
      error: (err) => console.error(err)
    });
  }
}
