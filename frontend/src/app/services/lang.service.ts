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
      // Commun
      id: 'ID',
      name: 'Nom',
      actions: 'Actions',
      add: 'Ajouter',
      edit: 'Modifier',
      save: 'Enregistrer',
      delete: 'Supprimer',
      confirm: 'Confirmer',
      cancel: 'Annuler',
      emptyField: 'Le champ est vide !',
      ok: 'OK',
      page: 'Page',
      of: 'sur',

      // Messages
      confirmDeleteGeneric: 'Voulez-vous vraiment supprimer cet élément ?',
      actionUndone: 'Cette action ne peut pas être annulée.',
      noResults: 'Aucun résultat trouvé',

      // Notifications de succès
      successAdd: 'Ajout avec succès !',
      successEdit: 'Modification avec succès !',
      successDelete: 'Suppression avec succès !',

      // Compagnies
      companyTitle: 'Liste Campagny',
      companySubtitle: 'Liste de toutes les companies',
      addCompany: 'Nouvelle compagnie',
      searchCompany: '🔍 Rechercher une entreprise...',
      noCompanies: 'Aucune compagnie trouvée',
      companyName: 'Nom de l\'entreprise',
      enterCompanyName: 'Entrez le nom de l\'entreprise',
      companyExists: 'L\'entreprise existe déjà !',
      companyEmptyField: 'Le nom de l\'entreprise ne peut pas être vide !',
      confirmDeleteCompany: 'Voulez-vous vraiment supprimer cette entreprise ?',
      companyAdded: 'Entreprise ajoutée avec succès !',
      companyUpdated: 'Entreprise mise à jour avec succès !',
      companyDeleted: 'Entreprise supprimée avec succès !',
      
      // Problèmes
      problemTitle: 'Problèmes',
      problemSubtitle: 'Liste de tous les problèmes',
      addProblem: 'Nouveau problème',
      searchProblem: '🔍 Rechercher un problème...',
      noProblems: 'Aucun problème trouvé',
      problemName: 'Nom du problème',
      enterProblemName: 'Entrez le nom du problème',
      problemExists: 'Un problème avec ce nom existe déjà !',
      problemEmptyField: 'Le nom du problème ne peut pas être vide !',
      confirmDeleteProblem: 'Voulez-vous vraiment supprimer ce problème ?',
      problemAdded: 'Problème ajouté avec succès !',
      problemUpdated: 'Problème mis à jour avec succès !',
      problemDeleted: 'Problème supprimé avec succès !',

      // Solutions
      solutionTitle: 'Solutions',
      solutionSubtitle: 'Liste de toutes les solutions',
      addSolution: 'Nouvelle solution',
      searchSolution: '🔍 Rechercher une solution...',
      noSolutions: 'Aucune solution trouvée',
      solutionName: 'Nom de la solution',
      enterSolutionName: 'Entrez le nom de la solution',
      solutionExists: 'Une solution avec ce nom existe déjà !',
      solutionEmptyField: 'Le nom de la solution ne peut pas être vide !',
      confirmDeleteSolution: 'Voulez-vous vraiment supprimer cette solution ?',
      solutionAdded: 'Solution ajoutée avec succès !',
      solutionUpdated: 'Solution mise à jour avec succès !',
      solutionDeleted: 'Solution supprimée avec succès !',

      // Techniciens
      
      firstname: 'Prénom',
      enterFirstname: 'Entrez le prénom',
      lastname: 'Nom',
      enterLastname: 'Entrez le nom',
      pseudoname: 'Surnom',
      enterPseudoname: 'Entrez le surnom',
      role: 'Rôle',
      enterRole: 'Entrez le rôle',
      motDePass: 'Mot de passe',
      enterMotDePass: 'Entrez le mot de passe',
      aeroport: 'Aéroport',
      enterAeroport: 'Choisissez l\'aéroport',
      technicienTitle: 'Techniciens', 
      technicienSubtitle: 'Liste de tous les techniciens',
      addTechnicien: 'Nouveau technicien',
      searchTechnicien: '🔍 Rechercher un technicien...',
      noTechniciens: 'Aucun technicien trouvé',
      technicienName: 'Nom du technicien',  
      enterTechnicienName: 'Entrez le nom du technicien',
      technicienExists: 'Un technicien avec ce nom existe déjà !',
      technicienEmptyField: 'Veuillez remplir tous les champs !',
      confirmDeleteTechnicien: 'Voulez-vous vraiment supprimer ce technicien ?',
      technicienAdded: 'Technicien ajouté avec succès !',
      technicienUpdated: 'Technicien mis à jour avec succès !',
      technicienDeleted: 'Technicien supprimé avec succès !',

       // Aeroports
      aeroportTitle: 'Liste des Aéroports',
      aeroportSubtitle: 'Liste de tous les aéroports',
      addAeroport: 'Nouvel aéroport',
      searchAeroport: '🔍 Rechercher un aéroport...',
      noAeroports: 'Aucun aéroport trouvé',
      aeroportName: 'Nom de l\'aéroport',
      enterAeroportName: 'Entrez le nom de l\'aéroport',
      aeroportExists: 'Un aéroport avec ce nom existe déjà !',
      aeroportEmptyField: 'Le nom de l\'aéroport ne peut pas être vide !',
      confirmDeleteAeroport: 'Voulez-vous vraiment supprimer cet aéroport ?',
      aeroportAdded: 'Aéroport ajouté avec succès !',
      aeroportUpdated: 'Aéroport mis à jour avec succès !',
      aeroportDeleted: 'Aéroport supprimé avec succès !',
      // New cannot-delete messages
      cannotDeleteAeroport: 'Suppression impossible',
      aeroportInUseByTechniciens: 'Cet aéroport est associé à un ou plusieurs techniciens. Supprimez ou modifiez ces techniciens avant de supprimer l\'aéroport.'




    },

    en: {
      // Common
      id: 'ID',
      name: 'Name',
      actions: 'Actions',
      add: 'Add',
      edit: 'Edit',
      save: 'Save',
      delete: 'Delete',
      confirm: 'Confirm',
      cancel: 'Cancel',
      emptyField: 'The field is empty!',
      ok: 'OK',
      page: 'Page',
      of: 'of',

      // Messages
      confirmDeleteGeneric: 'Are you sure you want to delete this item?',
      actionUndone: 'This action cannot be undone.',
      noResults: 'No results found',

      // Success notifications
      successAdd: 'Successfully added!',
      successEdit: 'Successfully updated!',
      successDelete: 'Successfully deleted!',

      // Companies
      companyTitle: 'Company List',
      companySubtitle: 'The list of all companies',
      addCompany: 'New company',
      searchCompany: '🔍 Search a company...',
      noCompanies: 'No companies found',
      companyName: 'Company Name',
      enterCompanyName: 'Enter company name',
      companyExists: 'A company with this name already exists!',
      companyEmptyField: 'The company name cannot be empty!',
      confirmDeleteCompany: 'Are you sure you want to delete this company?',
      companyAdded: 'Company added successfully!',
      companyUpdated: 'Company updated successfully!',
      companyDeleted: 'Company deleted successfully!',

      // Problems
      problemTitle: 'Problems',
      problemSubtitle: 'The list of all problems',
      addProblem: 'New problem',
      searchProblem: '🔍 Search a problem...',
      noProblems: 'No problems found',
      problemName: 'Problem Name',
      enterProblemName: 'Enter problem name',
      problemExists: 'A problem with this name already exists!',
      problemEmptyField: 'The problem name cannot be empty!',
      confirmDeleteProblem: 'Are you sure you want to delete this problem?',
      problemAdded: 'Problem added successfully!',
      problemUpdated: 'Problem updated successfully!',
      problemDeleted: 'Problem deleted successfully!',

      // Solutions
      solutionTitle: 'Solutions',
      solutionSubtitle: 'The list of all solutions',
      addSolution: 'New solution',
      searchSolution: '🔍 Search a solution...',
      noSolutions: 'No solutions found',
      solutionName: 'Solution Name',
      enterSolutionName: 'Enter solution name',
      solutionExists: 'A solution with this name already exists!',
      solutionEmptyField: 'The solution name cannot be empty!',
      confirmDeleteSolution: 'Are you sure you want to delete this solution?',
      solutionAdded: 'Solution added successfully!',
      solutionUpdated: 'Solution updated successfully!',
      solutionDeleted: 'Solution deleted successfully!',

      // Technicians
      firstname: 'Firstname',
      enterFirstname: 'Enter firstname',
      lastname: 'Lastname',
      enterLastname: 'Enter lastname',
      pseudoname: 'Pseudoname',
      enterPseudoname: 'Enter pseudoname',
      role: 'Role',
      enterRole: 'Enter role',
      motDePass: 'Password',
      enterMotDePass: 'Enter password',
      aeroport: 'Airport ',
      enterAeroport: 'Choose airport',
      technicienTitle: 'Technicians',
      technicienSubtitle: 'The list of all technicians',
      addTechnicien: 'New technician',
      searchTechnicien: '🔍 Search a technician...',
      noTechniciens: 'No technicians found',
      technicienName: 'Technician Name',
      enterTechnicienName: 'Enter technician name',
      technicienExists: 'A technician with this name already exists!',
      technicienEmptyField: 'Please fill in all fields !',
      confirmDeleteTechnicien: 'Are you sure you want to delete this technician?',
      technicienAdded: 'Technician added successfully!',
      technicienUpdated: 'Technician updated successfully!',
      technicienDeleted: 'Technician deleted successfully!' ,


       // Aeroports
       aeroportTitle: 'Airports',
       aeroportSubtitle: 'The list of all airports',
       addAeroport: 'New airport',
       searchAeroport: '🔍 Search an airport...',
       noAeroports: 'No airports found',
       aeroportName: 'Airport Name',
       enterAeroportName: 'Enter airport name',
       aeroportExists: 'An airport with this name already exists!',
       aeroportEmptyField: 'The airport name cannot be empty!',
       confirmDeleteAeroport: 'Are you sure you want to delete this airport?',
       aeroportAdded: 'Airport added successfully!',
       aeroportUpdated: 'Airport updated successfully!',
       aeroportDeleted: 'Airport deleted successfully!',
       cannotDeleteAeroport: 'Cannot delete airport',
       aeroportInUseByTechniciens: 'This airport is linked to one or more technicians. Please delete or modify these technicians before deleting the airport.'
    }
  };

  private entityTypes = {
    fr: [
      { value: 'campagny', label: 'Compagnie' },
      { value: 'problem', label: 'Problème' },
      { value: 'solution', label: 'Solution' },
      { value: 'staff', label: 'Personnel' },
      { value: 'technicien', label: 'Technicien' }
    ],
    en: [
      { value: 'campagny', label: 'Company' },
      { value: 'problem', label: 'Problem' },
      { value: 'solution', label: 'Solution' },
      { value: 'staff', label: 'Staff' },
      { value: 'technicien', label: 'Technician' }
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