import {  browser, by, element, ElementFinder  } from "protractor";

export class MembresiaPage {


  private linkCrearMembresia = element(by.id('linkCrearMembresia'));
  private linkListarMembresia = element(by.id('linkListarMembresia'));
  private valorCliente = element(by.id('idCliente'));
  private valorTipoMembresia = element(by.id('tipoMembresia'));
  private botonGuardar = element(by.id('botonGuardarMembresia'));



    async clickEnCrearMembresia(){
     await this.linkCrearMembresia.click();
    }

    async clickListarMembresias(){
     await this.linkListarMembresia.click();
    }

     async llenarListaCliente(){
      await this.setValorHtMl(element(by.id('idCliente')), "<option value='1' selected>Cliente 1</option>");
    }

    async seleccionarValorCliente(idCliente){
      await this.valorCliente.sendKeys(idCliente);
    }

    async seleccionarValorTipoMembresia(tipoMembresia){
      await this.valorTipoMembresia.sendKeys(tipoMembresia);
    }

    async clickEnGuardarMembresia(){
      await this.botonGuardar.click();
    }

    setValorHtMl(element: ElementFinder, valor: string) {
      function setInnerHTML (select, content) {
          select.innerHTML = content;
      }
      browser.executeScript(setInnerHTML, element, valor);
    }

    //swal2-html-container
    //swal2-title

     async setMensajeTituloAlert(msj: string){
        await this.setValorHtMl(element(by.id("swal2-title")),msj);
    }
    obtenerMensajes(){
      return element(by.className("swal2-title")).getText() as Promise<string>;
    }
}
