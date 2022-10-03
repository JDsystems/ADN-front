import { NavbarPage } from '../page/navbar/navbar.po';
import { AppPage } from '../app.po';
import { MembresiaPage } from '../page/membresia/membresia.po';
import { by, element } from 'protractor';

describe('MembresiaPage', () => {
  let page: AppPage;
  let navBar: NavbarPage;
  let membresia: MembresiaPage

  beforeEach(() => {
    page = new AppPage();
    navBar = new NavbarPage();
    membresia = new MembresiaPage();
  });

  it('Deberia crear una membresia correctamente', () => {
    const ID_CLIENTE = '1';
    const TIPO_MEMBRESIA = 'ORO';

    page.navigateTo();
    navBar.clickBotonMembresias();
    membresia.clickEnCrearMembresia();
    membresia.llenarListaCliente();
    membresia.seleccionarValorCliente(ID_CLIENTE)
    membresia.seleccionarValorTipoMembresia(TIPO_MEMBRESIA);

    expect(element(by.id('idCliente')).getAttribute('value')).toEqual(ID_CLIENTE);
    expect(element(by.id('tipoMembresia')).getAttribute('value')).toEqual(TIPO_MEMBRESIA);

  });

  it('Deberia listar las membresias activas', () => {
    page.navigateTo();
    navBar.clickBotonMembresias();
    membresia.clickListarMembresias();
    expect(element.all(by.tagName('tr')).last().getText()).toContain('Tipo Membresia')
  })

})
