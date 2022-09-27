import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MASKS, NgBrazilValidators } from 'ng-brazil';
import { CustomValidators } from 'ng2-validation';
import { Usuario } from './models/usuario';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent implements OnInit {

  usuario: Usuario;
  cadastroForm: FormGroup;
  public MASKS = MASKS;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.criaValidacaoDosCamposDoFormulario();
  }

  adicionarUsuario(){
    this.usuario = Object.assign({}, this.cadastroForm.value);
    console.log(this.usuario)
  }

  validaCampoFormulario(nomeCampo: string, erro?: any): boolean {
    switch (erro) {
      case 'required':
        return this.cadastroForm.get(nomeCampo).errors.required
              && (this.cadastroForm.get(nomeCampo).touched || this.cadastroForm.get(nomeCampo).dirty)
        break;
      case 'cpf':
        return this.cadastroForm.get('cpf').errors.cpf
              && (this.cadastroForm.get(nomeCampo).touched || this.cadastroForm.get(nomeCampo).dirty)
        break;
      default:
        return this.cadastroForm.get(nomeCampo).errors 
              && (this.cadastroForm.get(nomeCampo).touched || this.cadastroForm.get(nomeCampo).dirty)
        break;
    }
  }

  criaValidacaoDosCamposDoFormulario() {
    let senha = new FormControl('', [Validators.required, CustomValidators.rangeLength([6,15])])
    let confirmarSenha = new FormControl('', [Validators.required, CustomValidators.rangeLength(6,15), CustomValidators.equalTo(senha)])
    
    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, NgBrazilValidators.cpf]],
      email: ['', [Validators.required, Validators.email]],
      senha: senha,
      confirmarSenha: confirmarSenha
    });
  }

}
