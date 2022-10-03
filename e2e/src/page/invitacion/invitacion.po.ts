import {  browser, by, element, ElementFinder  } from "protractor";

export class InvitacionPage {

  private linkCrearInvitacion = element(by.id('linkCrearInvitacion'));
  private valorMembresia = element(by.id('idMembresia'));
  private valorIdentificacionInvitado = element(by.id('identificacionInvitado'));
  private valorNombreInvitado = element(by.id('nombreInvitado'));
  private botonGuardar = element(by.id('botonGuardarInvitacion'));


  async clickEnCrearInvitacion(){
    await this.linkCrearInvitacion.click();
  }

  async llenarListaMembresias(){
    await this.setValorHtMl(element(by.id('idMembresia')), "<option value='ORO' selected>Cliente 1 - ORO</option>");
  }

  async seleccionarValorMembresia(idMembresia){
    await this.valorMembresia.sendKeys(idMembresia);
  }

  async digitarValorIdentificacionInvitadpo(docInvitado){
    await this.valorIdentificacionInvitado.sendKeys(docInvitado);
  }

  async digitarValorNombreInvitadpo(nombreInvitado){
    await this.valorNombreInvitado.sendKeys(nombreInvitado);
  }

  async clickEnGuardarInvitacion(){
    await this.botonGuardar.click();
  }


  setValorHtMl(element: ElementFinder, valor: string) {
    function setInnerHTML (select, content) {
        select.innerHTML = content;
    }
    browser.executeScript(setInnerHTML, element, valor);
  }


}
