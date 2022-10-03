import { by, element } from 'protractor';

export class NavbarPage {
    linkHome = element(by.xpath('/html/body/app-root/app-navbar/nav/a[1]'));
    linkMembresia = element(by.xpath('/html/body/app-root/app-navbar/nav/a[2]'));
    linkInvitacion = element(by.xpath('/html/body/app-root/app-navbar/nav/a[3]'));

    async clickBotonMembresias() {
        await this.linkMembresia.click();
    }

    async clickBotonInvitacion() {
      await this.linkInvitacion.click();
    }
}
