import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type Lang = 'fr' | 'en';

@Injectable({
  providedIn: 'root'
})
export class LangService {
  private langSubject = new BehaviorSubject<Lang>('fr');
  lang$ = this.langSubject.asObservable();

  private translations = {
    fr: {
      title: 'Liste Campagny',
      add: 'Ajouter',
      searchPlaceholder: '🔍 Rechercher une entreprise...',
      emptyList: 'La liste est vide',
      name: 'Nom',
      id: 'ID',
      edit: '✏ Modifier',
      save: '💾 Enregistrer',
      delete: '🗑 Supprimer',
      confirmDelete: 'Voulez-vous vraiment supprimer cette entreprise ?',
      confirm: 'Confirmer',
      cancel: 'Annuler',
      successAdd: 'Ajout avec succès !',
      successEdit: 'Modification avec succès !',
      successDelete: 'Suppression avec succès !',
      exists: 'L\'entreprise existe déjà !',
      emptyField: 'Le champ est vide !',
      addTitle: 'Ajouter une entreprise',
      editCampaign: 'Modifier l\'entreprise',
      componentName: 'Nom de l\'entreprise',
      actions: 'Actions'
    },
    en: {
      title: 'Company List',
      add: 'Add',
      searchPlaceholder: '🔍 Search a company...',
      emptyList: 'The list is empty',
      name: 'Name',
      id: 'ID',
      edit: '✏ Edit',
      save: '💾 Save',
      delete: '🗑 Delete',
      confirmDelete: 'Do you really want to delete this Company?',
      confirm: 'Confirm',
      cancel: 'Cancel',
      successAdd: 'Successfully added!',
      successEdit: 'Successfully edited!',
      successDelete: 'Successfully deleted!',
      exists: 'Company already exists!',
      emptyField: 'The field is empty!',
      addTitle: 'Add a company',
      editCampaign: 'Edit Company',
      componentName: 'Company Name',
      actions: 'Actions'
    }
  };

  private entityTypes = {
    fr: [
      { value: 'campagny', label: 'Compagnie' },
      { value: 'problem', label: 'Problème' },
      { value: 'solution', label: 'Solution' },
      { value: 'staff', label: 'Personnel' }
    ],
    en: [
      { value: 'campagny', label: 'Company' },
      { value: 'problem', label: 'Problem' },
      { value: 'solution', label: 'Solution' },
      { value: 'staff', label: 'Staff' }
    ]
  };

  get lang(): Lang {
    return this.langSubject.value;
  }

  toggleLang() {
    const nextLang: Lang = this.lang === 'fr' ? 'en' : 'fr';
    this.langSubject.next(nextLang);
  }

  setLang(lang: Lang) {
    this.langSubject.next(lang);
  }

  get t() {
    return this.translations[this.lang];
  }

  get entityTypeList() {
    return this.entityTypes[this.lang];
  }
}