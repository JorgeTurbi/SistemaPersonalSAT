import { computed, Injectable, signal } from '@angular/core';
type Lang = 'es' | 'en';
@Injectable({
  providedIn: 'root'
})
export class LanguageService {

   private current = signal<Lang>('es');
  lang = computed(() => this.current());

  setLanguage(l: Lang) {
    this.current.set(l);
    sessionStorage.setItem('lang', l);
  }

  loadFromStorage() {
    const stored = sessionStorage.getItem('lang') as Lang | null;
    if (stored) this.current.set(stored);
  }

  t(dict: Record<string, string>) {
    // Uso simple: this.langService.t({ es: 'Hola', en: 'Hello' })
    return dict[this.current()];
  }
}

