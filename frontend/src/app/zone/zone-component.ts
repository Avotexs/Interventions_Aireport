import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';
import { ZoneService, Zone } from './zone-service';
import { LangService } from '../services/lang.service';
import { ComptoireService } from '../comptoire/comptoire-service';

@Component({
  selector: 'app-zone',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './zone.html',
  styleUrl:   './zone.css'
})
export class ZoneComponent {
  zones: Zone[] = [];
  newZone: Zone = { nom: '' };
  editedNom = '';
  editing: Zone | null = null;
  // recherche & pagination
  term = ''; page = 0; size = 5;
  selectedEntity = 'zone';
  
  
  // Popup states
  showPopup: boolean = false;
  showDeletePopup: boolean = false;
  showEmptyFieldPopup: boolean = false;
  showSuccessPopup: boolean = false;
  showEditSuccessPopup: boolean = false;
  showDeleteSuccessPopup: boolean = false;
  showAlreadyExistsPopup: boolean = false;
  showZoneHasComptoirsPopup: boolean = false;
  zoneToDelete: number | null = null;

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

  constructor(
    private service: ZoneService, 
    private comptoireService: ComptoireService,
    public langService: LangService
  ) { 
    this.refresh();
    // Pas de cache, utiliser l'appel API pour vérification en temps réel
  }

  /** ------- CRUD ------- */
  refresh() { 
    this.service.getAll().subscribe(z => this.zones = z.sort((a,b) => b.id! - a.id!)); 
  }
  
  saveNew() { 
    // Validation
    if (!this.newZone.nom.trim()) {
      this.showEmptyFieldPopup = true;
      return;
    }
    
    // Check if name already exists
    if (this.zones.some(z => z.nom.trim().toLowerCase() === this.newZone.nom.trim().toLowerCase())) {
      this.showPopup = false;
      this.showAlreadyExistsPopup = true;
      return;
    }
    
    this.service.create(this.newZone).subscribe({
      next: () => {
        this.newZone = {nom: ''};
        this.refresh();
        this.showPopup = false;
        this.showSuccessPopup = true;
      },
      error: (err) => console.error(err)
    });
  }
  
  startEdit(z: Zone) { 
    this.editing = z; 
    this.editedNom = z.nom; 
  }
  
  cancelEdit() { 
    this.editing = null; 
  }
  
  applyEdit() { 
    // Validation
    if (!this.editedNom.trim()) {
      this.showEmptyFieldPopup = true;
      return;
    }
    
    // Check if name already exists
    if (this.zones.some(
      z => z.id !== this.editing?.id && z.nom.trim().toLowerCase() === this.editedNom.trim().toLowerCase()
    )) {
      this.showAlreadyExistsPopup = true;
      return;
    }
    
    if (!this.editing) return; 
    
    this.service.update(this.editing.id!, {nom: this.editedNom}).subscribe({
      next: () => {
        this.editing = null;
        this.refresh();
        this.showEditSuccessPopup = true;
      },
      error: (err) => console.error(err)
    });
  }
  
  askDelete(id: number) {
    this.zoneToDelete = id;
    // Vérifier si la zone contient des comptoirs via API
    this.comptoireService.getAll().subscribe(comptoires => {
      const comptoirsInZone = comptoires.filter(c => c.zoneId === id);
    if (comptoirsInZone.length > 0) {
      this.showZoneHasComptoirsPopup = true;
      this.zoneToDelete = null;
    } else {
      this.showDeletePopup = true;
    }
    });
  }
  
  confirmDelete() {
    if (this.zoneToDelete) {
      this.service.delete(this.zoneToDelete).subscribe({
        next: () => {
          this.refresh();
          this.showDeleteSuccessPopup = true;
        },
        error: (err) => console.error(err)
      });
    }
    
    this.showDeletePopup = false;
    this.zoneToDelete = null;
  }
  
  cancelDelete() {
    this.showDeletePopup = false;
    this.zoneToDelete = null;
  }

  /** ------- Popup Handlers ------- */
  closeEmptyFieldPopup() {
    this.showEmptyFieldPopup = false;
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
  
  closeAlreadyExistsPopup() {
    this.showAlreadyExistsPopup = false;
    this.showPopup = true; // Re-show the add popup
  }
  
  closeAlreadyExistsPopupUpdate() {
    this.showAlreadyExistsPopup = false;
  }
  
  closeZoneHasComptoirsPopup() {
    this.showZoneHasComptoirsPopup = false;
  }

  /** ------- UI Helpers ------- */
  list(): Zone[] {
    return this.zones
      .filter(z => z.nom.toLowerCase().includes(this.term.toLowerCase()))
      .slice(this.page * this.size, (this.page + 1) * this.size);
  }
  
  pageCount(): number { 
    return Math.ceil(this.zones.filter(z => z.nom.toLowerCase().includes(this.term.toLowerCase())).length / this.size) || 1; 
  }
  
  toPage(i: number) { 
    this.page = i; 
  }
  
  clearSearch() { 
    this.term = ''; 
    this.page = 0; 
  }
}