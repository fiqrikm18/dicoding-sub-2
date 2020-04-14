class SearchBar extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    get value() {
        return this.querySelector("#search-txt").value;
    }

    set clickEvent(event) {
        this._event = event;
        this.render();
    }

    render() {
        this.innerHTML = `
            <style>
                * {
                    box-sizing: border-box;
                }

                .input-card {
                    background-color: white;
                    box-shadow: 0px 0px 3px 1px #cccccc;
                    padding: 5px;
                    margin: 20px 0px;
                }

                .search-form {
                    width: 40%;
                    display: flex;
                    justify-content: space-between;
                    margin: 25px auto;
                }

                .search-form input {
                    padding: 5px;
                    width: 350px;
                    color: #4D5359;
                    border: none;
                }

                .search-form input:focus {
                    outline: none;
                }

                .btn {
                    border: none;
                    padding: 10px;
                    width: 80px;
                }

                .btn-primary {
                    background: #508484;
                    color: white;
                }
            </style>
            <div>
                <div class="input-card search-form">
                    <input type="text" id="search-txt" placeholder="Search Country ex.indonesia/US/CN">
                    <button id="btn-search" class="btn btn-primary" type="submit">Search</button>
                </div>
            </div>
        `;

        this.querySelector("#btn-search").addEventListener("click", this._event);
    }
}

customElements.define("search-bar", SearchBar);
