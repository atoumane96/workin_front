import {Component, OnInit} from '@angular/core';
import {ArchiveService} from "../../services/archive.service";
import {TypeArchive} from "../../model/TypeArchive.model";
import {TypeArchiveService} from "../../services/typeArchive.service";
import {DossierService} from "../../services/dossier.service";
import {FormBuilder} from "@angular/forms";
import {Archive} from "../../model/Archive.model";
import {Dossier} from "../../model/Dossier.model";
import {ArchiveDto} from "../../dto/ArchiveDto.model";
import {Nature} from "../../model/Nature.model";
import {NatureService} from "../../services/nature.service";
import Swal from "sweetalert2";


declare var $: any

@Component({
  selector: 'app-archiveformulaire',
  templateUrl: './archiveformulaire.component.html',
  styleUrls: ['./archiveformulaire.component.css']
})


export class ArchiveformulaireComponent implements OnInit {
  listeNature: any = [];
  fileURL: any = "../../../assets/icone_file/95083-file-search.gif";
  fichier: any;
  optionNature: any;
  optionEmplacement: any;
  nomTypeArchive: string;
  nomDossier: string;
  nomNatureArchive: string;
  typeArchive: TypeArchive;
  listeDossier: any = [];
  listeTypeArchive: any = [];
  type: string;
  dossier: Dossier;
  private imagePath;

  constructor(private archiveService: ArchiveService,
              private typeArchiveService: TypeArchiveService,
              private dossierService: DossierService,
              private formBuilder: FormBuilder,
              private natureService: NatureService) {
  }

  ngOnInit() {
    $('select').formSelect();
    this.loadListeTypeArchive();
    this.initForm();
    $('.modal').modal();

  }


  onSelectFile(event) {
    console.log("nature " + this.nomNatureArchive + " dossier " + this.nomDossier + " type archive = " + this.nomTypeArchive)
    if (event.target.files.length > 0) {

      const file = event.target.files[0];
      this.fichier = file;
      // this.f['profile'].setValue(file);

      var mimeType = event.target.files[0].type;
      let nomFichier = event.target.files[0].name;
      var re = /(?:\.([^.]+))?$/;
      var extension = re.exec(nomFichier)[1];

      if (mimeType.match('text.*|image.*|application.*') == null) {
        return;
      }
      if (extension == "xlsx") {
        this.fileURL = "../assets/icone_file/excel.png";

      } else if (extension == "pdf") {
        this.fileURL = "../assets/icone_file/pdf.png";

      } else if (extension == "docx" || mimeType == "doc") {
        this.fileURL = "../assets/icone_file/pngwing.com.png";

      } else if (extension == "pptx") {
        this.fileURL = "../assets/icone_file/power.png";

      } else if (extension == "png" || extension == "jpg" || extension == "jpeg" || extension == "gif") {
        var reader = new FileReader();
        this.imagePath = file;
        reader.readAsDataURL(file);
        reader.onload = (_event) => {
          this.fileURL = reader.result;
        }
      } else {
        this.fileURL = "../assets/icone_file/txt.png";
      }


      //var reader = new FileReader();

      // this.imagePath = file;
      // reader.readAsDataURL(file);
      // reader.onload = (_event) => {
      //   this.fileURL = reader.result;
      // }

    }

  }


  addArchive() {

    let natureAjout: Nature;
    let dossierAjout: Dossier;
    let typeArchiveAjout: TypeArchive;

    for (let i = 0; i < this.listeNature.length; i++) {
      if (this.nomNatureArchive == this.listeNature[i].libelleNature) {
        natureAjout = this.listeNature[i];
      }
    }

    for (let i = 0; i < this.listeDossier.length; i++) {
      if (this.nomDossier == this.listeDossier[i].nomDossier) {
        dossierAjout = this.listeDossier[i];
      }
    }

    for (let i = 0; i < this.listeTypeArchive.length; i++) {
      if (this.nomTypeArchive == this.listeTypeArchive[i].libelleTypeArchive) {
        typeArchiveAjout = this.listeTypeArchive[i];
      }
    }

    const formData = new FormData();
    let archive: Archive = this.archiveService.dataForm.value;

    let archiveDto = new ArchiveDto();
    archiveDto.nomFichier = archive.nomFichier;


    archiveDto.nature = natureAjout;
    archiveDto.nature.dossier = dossierAjout;


    formData.append('archive', JSON.stringify(archiveDto));
    formData.append('fichier', this.fichier);

    console.log(archiveDto)
    this.archiveService.ajouterArchive(formData).subscribe(data => {

      // this.route.navigate(['/dashboard']);
      this.topend();
    });
  }


  loadListeTypeArchive() {
    this.typeArchiveService.getAllTypeArchive().subscribe(rsl => {
      this.listeTypeArchive = rsl;
      console.log(this.listeTypeArchive)
    }, error => {
      console.log(error)
    })
  }

  loadListeTypeDossier(event) {
    this.nomTypeArchive = event.target.value;

    this.dossierService.getAllDossierByType(this.nomTypeArchive + '').subscribe(result => {
      this.listeDossier = result;
      console.log(this.listeDossier)
    }, error => {
      console.log(error)
    })
  }


  loadListeDossier(event) {
    this.nomDossier = event.target.value;
    console.log("nom dossier " + this.nomDossier + "/type archive " + this.nomTypeArchive)
    if (this.nomDossier === 'Autre') {
      this.optionEmplacement = true;

    } else {
      this.natureService.getAllNatureByTypeArchiveAndDossier(this.nomDossier, this.nomTypeArchive + '')
        .subscribe(rslt => {
          this.listeNature = rslt;
          console.log("liste nature" + this.listeNature)
        }, error => {
          console.error(error);
        })
    }
  }


  loadListeNature(event) {
    let nat: Nature;
    this.nomNatureArchive = event.target.value

    if (this.nomNatureArchive == 'Autre') {
      this.optionNature = true;

    } else {

      for (let i = 0; i < this.listeNature.length; i++) {
        if (this.listeNature[i].libelleNature + '' === this.nomNatureArchive + '') {
          nat = this.listeNature[i];
        }
      }
    }
  }


  initForm() {
    this.archiveService.dataForm = this.formBuilder.group({
      nomFichier: [''],
      dossier: [''],
      typeArchive: [''],
      file: [''],
      nature: [''],

    })
  }


  addEmplacement(dossierForm: Dossier) {
    let typ: TypeArchive;
    console.log(this.nomTypeArchive)

    for (let i = 0; i < this.listeTypeArchive.length; i++) {
      if (this.listeTypeArchive[i].libelleTypeArchive + '' == this.nomTypeArchive + '') {
        typ = this.listeTypeArchive[i];
      }
    }
    dossierForm.typeArchive = typ;

    let dossier1: Dossier;

    this.dossierService.ajouterDossier(dossierForm).subscribe(rsl => {
      dossier1 = rsl;
      this.listeDossier.push(dossier1);
    })

  }


  addNature(natureForm: Nature) {
    let newNature: Nature;
    let dossierAjout: Dossier;

    for (let i = 0; i < this.listeDossier.length; i++) {
      if (this.nomDossier == this.listeDossier[i].nomDossier) {
        dossierAjout = this.listeDossier[i];
      }
    }


    natureForm.dossier = dossierAjout;

    this.natureService.ajouterNature(natureForm).subscribe(rsl => {
      newNature = rsl;
      this.listeNature.push(newNature);
    }, error => {
      console.log(error)
    })

  }

  topend() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Fichier archivé avec succes!',
      showConfirmButton: false,
      timer: 1500
    })
  }

  // DeleteDepartement(index){
  //   Swal.fire({
  //     title: 'Voulez Vous vraiment supprimer ce departement',
  //     icon: 'warning',
  //     //showDenyButton: true,
  //     showCancelButton:true,
  //     confirmButtonText: `Confirmer`,
  //     //denyButtonText: `Don't save`,
  //   }).then((result) => {
  //     //this.spinnerService.show();
  //     /* Read more about isConfirmed, isDenied below */
  //     if (result.isConfirmed) {
  //       this.tabDepartement.splice(index,1);
  //       Swal.fire('Departement supprimé!', '', 'success')
  //
  //     }
  //   })
  // }


}
