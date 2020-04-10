class ContentContainer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `            
            <div>
            asd
            </div>
        `;
    }
}

customElements.define("content-container", ContentContainer);
