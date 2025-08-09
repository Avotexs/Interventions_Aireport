import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';
import { ComptoireService, Comptoire } from './comptoire-service';
import { ZoneService, Zone } from '../zone/zone-service';
import { LangService } from '../services/lang.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-comptoire',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comptoire.html',
  styleUrl:   './comptoire.css'
})
export class ComptoireComponent {
  comptoires: Comptoire[] = [];
  zones: Zone[] = [];
  newC: Comptoire = { nom:'', zoneId:0 };
  editing: Comptoire | null = null;
  editedNom = ''; 
  editedZoneId = 0;
  term=''; 
  page=0; 
  size=5;
  
  // Popup states
  showPopup: boolean = false;
  showDeletePopup: boolean = false;
  showEmptyFieldPopup: boolean = false;
  showZoneRequiredPopup: boolean = false;
  showSuccessPopup: boolean = false;
  showEditSuccessPopup: boolean = false;
  showDeleteSuccessPopup: boolean = false;
  showErrorPopup: boolean = false;
  errorMessage: string = '';
  comptoireToDelete: number | null = null;
  
  selectedEntity = 'comptoire';

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

  getZoneName(zoneId: number): string {
    const zone = this.zones.find(z => z.id === zoneId);
    return zone ? zone.nom : (this.t.zoneUnavailable || 'Zone indisponible');
  }

  constructor(private cSrv:ComptoireService, private zSrv:ZoneService, public langService: LangService) { 
    this.load(); 
  }

  load() { 
    // D'abord, récupérer toutes les zones
    this.zSrv.getAll().pipe(
      catchError(err => {
        console.error('Error loading zones:', err);
        this.errorMessage = 'Failed to load zones: ' + (err.error?.message || err.message || 'Unknown error');
        this.showErrorPopup = true;
        return of([]);
      })
    ).subscribe(zones => {
      this.zones = zones;
      
      // Ensuite, récupérer tous les comptoirs et associer chaque comptoir à sa zone
      this.cSrv.getAll().pipe(
        catchError(err => {
          console.error('Error loading comptoires:', err);
          this.errorMessage = 'Failed to load comptoires: ' + (err.error?.message || err.message || 'Unknown error');
          this.showErrorPopup = true;
          return of([]);
        })
      ).subscribe(comptoires => {
        // Associer à chaque comptoir sa zone correspondante et corriger zoneId
        this.comptoires = comptoires.map(comptoire => {
            // Use the API-provided zoneId to find the zone
            const apiZoneId = comptoire.zoneId;
            const zoneFound = this.zones.find(zone => zone.id === apiZoneId);
            return {
              ...comptoire,
              // zoneId already set
              zone: zoneFound || { id: apiZoneId, nom: this.t.zoneUnavailable }
            } as Comptoire;
          }).sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
      });
    });
  }

  /** add */
  add() {
    // Validation
    if (!this.newC.nom.trim()) {
      this.showEmptyFieldPopup = true;
      return;
    }
    
    // Validation spécifique pour la zone
    if (!this.newC.zoneId) {
      this.showZoneRequiredPopup = true;
      return;
    }
    
    this.cSrv.create(this.newC).pipe(
      catchError(err => {
        console.error('Error creating comptoire:', err);
        this.errorMessage = 'Failed to create comptoire: ' + (err.error?.message || err.message || 'Unknown error');
        this.showErrorPopup = true;
        return of(null);
      })
    ).subscribe({
      next: (result) => {
        if (result) {
          this.newC = {nom:'', zoneId:0}; 
          this.load();
          this.showPopup = false;
          this.showSuccessPopup = true;
        }
      }
    });
  }

  /** edit */
  startEdit(c: Comptoire) { 
    this.editing = c; 
    this.editedNom = c.nom; 
    this.editedZoneId = c.zoneId; 
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
    
    // Validation spécifique pour la zone
    if (!this.editedZoneId) {
      this.showZoneRequiredPopup = true;
      return;
    }
    
    if (!this.editing) return;
    
    this.cSrv.update(this.editing.id!, {nom: this.editedNom, zoneId: this.editedZoneId})
      .pipe(
        catchError(err => {
          console.error('Error updating comptoire:', err);
          this.errorMessage = 'Failed to update comptoire: ' + (err.error?.message || err.message || 'Unknown error');
          this.showErrorPopup = true;
          return of(null);
        })
      )
      .subscribe({
        next: (result) => {
          if (result) {
            this.editing = null;
            this.load();
            this.showEditSuccessPopup = true;
          }
        }
      });
  }

  /** delete */
  askDelete(id: number) { 
    this.comptoireToDelete = id;
    this.showDeletePopup = true;
  }
  
  confirmDelete() {
    if (this.comptoireToDelete) {
      this.cSrv.delete(this.comptoireToDelete)
        .pipe(
          catchError(err => {
            console.error('Error deleting comptoire:', err);
            this.errorMessage = 'Failed to delete comptoire: ' + (err.error?.message || err.message || 'Unknown error');
            this.showErrorPopup = true;
            return of(null);
          })
        )
        .subscribe({
          next: (result) => {
            this.load();
            this.showDeleteSuccessPopup = true;
          }
        });
    }
    
    this.showDeletePopup = false;
    this.comptoireToDelete = null;
  }
  
  cancelDelete() {
    this.showDeletePopup = false;
    this.comptoireToDelete = null;
  }

  /** popup handlers */
  closeEmptyFieldPopup() {
    this.showEmptyFieldPopup = false;
  }
  
  closeZoneRequiredPopup() {
    this.showZoneRequiredPopup = false;
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
  
  closeErrorPopup() {
    this.showErrorPopup = false;
  }

  /** pagination + filtering */
  list() { 
    return this.comptoires
      .filter(c => c.nom.toLowerCase().includes(this.term.toLowerCase()))
      .slice(this.page * this.size, (this.page + 1) * this.size); 
  }
  
  pageCount() { 
    return Math.ceil(
      this.comptoires.filter(c => c.nom.toLowerCase().includes(this.term.toLowerCase())).length / this.size
    ) || 1; 
  }
  
  toPage(i: number) { 
    this.page = i; 
  }
  
  clearSearch() { 
    this.term = ''; 
    this.page = 0; 
  }
}