import { Dashboard, html, css } from '@lit-dashboard/lit-dashboard'; 

class RobotDashboard extends Dashboard {

  get providers() {
    return [
      {
        type: 'My First Provider',
      },
      {
        type: 'My First Provider',
        name: 'My Second Provider',
        settings: {
          sourceRoot: 'anotherRoot'
        }
      }
    ];
  }

  static get styles() {
    return css`

    `;
  }

  static get properties() { 
    return {
      
    }
  }

  render() {
    return html`
      <h2>My first dashboard!</h2>
      <my-first-widget 
        widget-id="some-unique-id"
        some-attribute="I can set widget attributes!"
      >
        <span>I can put html in my widget!</span>
      </my-first-widget>
    `;
  }
}

customElements.define('robot-dashboard', RobotDashboard);