import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JsonLdServiceService {
  private renderer: Renderer2;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  addJsonLd(schema: Record<string, any>, id: string = 'json-ld-schema'): void {
    const existingScript = this.document.getElementById(id);
    if (existingScript) {
      this.renderer.removeChild(this.document.head, existingScript);
    }

    const script = this.renderer.createElement('script');
    this.renderer.setAttribute(script, 'type', 'application/ld+json');
    this.renderer.setAttribute(script, 'id', id);
    script.textContent = JSON.stringify(schema, null, 2);

    this.renderer.appendChild(this.document.head, script);
  }

  removeJsonLd(id: string = 'json-ld-schema'): void {
    const existingScript = this.document.getElementById(id);
    if (existingScript) {
      this.renderer.removeChild(this.document.head, existingScript);
    }
  }
}
