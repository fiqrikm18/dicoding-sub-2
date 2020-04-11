import Axios from "axios";
import config from "../confiig";
import moment from "moment";

class ContentContainer extends HTMLElement {
    getData() {
        return Axios.get(config.BASE_URL)
            .then((result) => {
                let confirm = result.data.confirmed;
                let recover = result.data.recovered;
                let death = result.data.deaths;
                let lastUpdate = result.data.lastUpdate;

                this.render(confirm, recover, death, lastUpdate);
            })
            .catch((err) => console.log(err));
    }

    connectedCallback() {
        this.getData();
    }

    render(confirm, recover, death, lstUpdate) {
        // TODO: Create chart here
        this.innerHTML = `
        <div>
            <div class="dashboard">
                <h4>Corona Virus Report</h4>
                <div class="card dashboard-content">
                    <div>
                        <div class="dashboard-items">
                            <p>confirmed</p>
                            <p>${confirm.value}</p>
                        </div>

                        <div class="dashboard-items">
                            <p>recovered</p>
                            <p>${recover.value}</p>
                        </div>

                        <div class="dashboard-items">
                            <p>deaths</p>
                            <p>${death.value}</p>
                        </div>
                    </div>

                    <p class="update-status">Last Update: 
                        <b>
                        ${moment(lstUpdate)
                            .utc()
                            .format("DD MMMM YYYY, HH:mm:ss")}
                        </b>
                    </p>
                </div>
                
            </div>
        </div>
    `;
    }
}

customElements.define("content-container", ContentContainer);
