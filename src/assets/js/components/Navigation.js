import Dashboard from '../../img/dashboard.svg'
import Report from '../../img/balance.svg'

class Navigation extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this._shadowRoot.innerHTML = `
            <style>
                * {
                    margin: 0;
                    padding: 0px;
                }

                nav {
                    padding: 15px;
                    background: #4D5359;
                    display: flex;
                    flex-direction: column;
                    width: 40px;
                    min-height: 100vh;
                }

                nav a {
                    display: flex;
                    flex-direction: column;
                    color: white;
                    text-decoration: none;
                    margin: 10px auto;
                    justify-content: center;
                }

                nav a > * {
                    margin: 3px auto;
                }

                nav a p {
                    font-size: 10pt;
                }

                nav a:hover {
                    opacity: 0.7;
                }

                nav a img {
                    fill: #79C99E;
                }

                .logo {
                    text-align: center;
                    color: white;
                    background: #79C99E;
                    padding: 5px;
                    font-size: 1vw;
                    border-radius: 3px;
                    margin-bottom: 10px;
                    cursor: pointer;
                }

                .logo a {
                    margin: 0px;
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                }

                .logo a:hover {
                    margin: 0px;
                    color: white;
                    cursor: pointer;
                }
            </style>
            <nav>
                <div class="logo">
                    <a href="/">
                    <p>C-19</p>
                    <p style="font-size: 8pt;">Report</p>
                    </a>
                </div>
                <a href="/">
                    <img src="${Dashboard}" alt="dashboard-logo"> 
                    <p>Home</p>
                </a>
                <a href="report.html">
                    <img src="${Report}" alt="report-logo"> 
                    <p>Report</p>
                </a>
            </nav>
        `;
    }
}

customElements.define("navigation-bar", Navigation);
