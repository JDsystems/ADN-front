import { NavbarPage } from '../page/navbar/navbar.po';
import { AppPage } from '../app.po';
import { InvitacionPage } from '../page/invitacion/invitacion.po';
import { by, element } from 'protractor';

describe('InvitacionPage', () => {

  let page: AppPage;
  let navBar: NavbarPage;
  let invitacion: InvitacionPage

  beforeEach(() => {
    page = new AppPage();
    navBar = new NavbarPage();
    invitacion = new InvitacionPage();
  });

  it('Deberia crear la invitacion correctamente', () => {
    const ID_MEMBRESIA = 'ORO';
    const DOC_INVITADO = '1234567';
    const NOMBRE_INVITADO = 'Invitado 1';

    page.navigateTo();
    navBar.clickBotonInvitacion();
    invitacion.clickEnCrearInvitacion();
    invitacion.llenarListaMembresias();
    invitacion.seleccionarValorMembresia(ID_MEMBRESIA);
    invitacion.digitarValorIdentificacionInvitadpo(DOC_INVITADO);
    invitacion.digitarValorNombreInvitadpo(NOMBRE_INVITADO);

    expect(element(by.id('idMembresia')).getAttribute('value')).toEqual(ID_MEMBRESIA);
    expect(element(by.id('identificacionInvitado')).getAttribute('value')).toEqual(DOC_INVITADO);
    expect(element(by.id('nombreInvitado')).getAttribute('value')).toEqual(NOMBRE_INVITADO);

  });


});
