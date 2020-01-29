import { Widget, html, css } from '@lit-dashboard/lit-dashboard';
import { registerWidget } from '@lit-dashboard/lit-dashboard/app';

class MyFirstWidget extends Widget {

  static get styles() {
    return css`
      :host {
        background: #ddd;
        display: block;
        padding: 5px 15px;
      }
    `;
  }

  static get properties() {
    return {
      someAttribute: { 
        type: String, 
        attribute: 'some-attribute', 
        reflect: true, 
        primary: true
      }
    };
  }

  constructor() {
    super();
    this.someAttribute = 'default attribute value';
  }

  updated() {
    
  }

  render() {
    return html`
      <p><strong>Attribute/Source value:</strong> ${this.someAttribute}</p>
      <p><strong>Slot value:</strong> <slot></slot></p>
    `;
  }
}

registerWidget('my-first-widget', {
  class: MyFirstWidget,
  label: 'My First Widget',
  category: 'Some Category',
});