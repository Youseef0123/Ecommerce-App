import { isPlatformBrowser } from '@angular/common';
import { inject, Inject, Injectable, PLATFORM_ID, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class MyTranslateService {
  private readonly renderer2 = inject(RendererFactory2).createRenderer(null, null);

  constructor(
    private translateService: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      //Words logic
      // set default language

      this.translateService.setDefaultLang('en');

      // get language from local storage

      const savedLanguage = localStorage.getItem('lang');

      // use language
      if (savedLanguage) {
        this.translateService.use(savedLanguage);
      } else {
        this.translateService.use(savedLanguage!);
      }

      //direction function call
      this.changeDirection();
    }
  }

  //direction logic

  changeDirection(): void {
    if (localStorage.getItem('lang') === 'ar') {
      this.renderer2.setAttribute(document.documentElement, 'dir', 'rtl');
      this.renderer2.setAttribute(document.documentElement, 'lang', 'ar');
    } else if (localStorage.getItem('lang') === 'en') {
      this.renderer2.setAttribute(document.documentElement, 'dir', 'ltr');
      this.renderer2.setAttribute(document.documentElement, 'lang', 'en');
    }
  }

  changeLanguage(lang: string): void {
    //save language to local storage
    localStorage.setItem('lang', lang);

    //use language
    this.translateService.use(lang);

    //direction function call
    this.changeDirection();
  }
}
