import Axios from "axios";
import config from "../confiig";
import moment from "moment";
import "../components/Navigation";
import { Chart } from "chart.js";

class ContentContainer extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: "open" });
    }

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
        this._shadowRoot.innerHTML = `
            <style>
                .content {
                    background-color: whitesmoke;
                    width: 80%;
                    display: flex;
                    flex-direction: column;
                    margin: 0px auto;
                }
                
                content-container {
                    margin: 25px auto;
                    display: flex;
                    flex-direction: column;
                }
                
                .card {
                    background-color: white;
                    box-shadow: 0px 0px 3px 1px #cccccc;
                    padding: 10px;
                    margin: 20px 0px;
                    border-radius: 2px;
                }
                
                .dashboard {
                    display: flex;
                    flex-direction: column;
                }
                
                .dashboard h1, h2, h3, h4, h5, h6 { text-align: center; }
                
                .dashboard-content {
                    display: flex;
                    flex-direction: column;
                }
                
                .dashboard-content div {
                    display: flex;
                }
                
                .dashboard-content div {
                    margin: 5px 50px;
                }
                
                .dashboard-items {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }
                
                .dashboard-items > * {
                    margin: 2px auto;
                }
                
                .dashboard-items p:nth-child(1) {
                    font-weight: 700;
                    color: #508484;
                }
                
                .dashboard-items p:nth-child(2) {
                    color: #4D5359;
                }
                
                .update-status {
                    font-size: 1vw;
                    text-align: center;
                    margin: 10px 0px 0px 0px;
                }

                #chart-container {
                    margin: 3px 0px;
                    padding: 10px;
                }
            </style>
            <div>
                <div class="dashboard">
                
                    <h4>Corona Virus Report</h4>
                    <div class="card dashboard-content">
                        <div>
                            <div class="dashboard-items">
                                <p>confirmed</p>
                                <p>${Number(confirm.value).toLocaleString(
                                    "id",
                                    {
                                        maximumSignificantDigits: 2,
                                    }
                                )}</p>
                            </div>

                            <div class="dashboard-items">
                                <p>recovered</p>
                                <p>${Number(recover.value).toLocaleString(
                                    "id",
                                    {
                                        maximumSignificantDigits: 2,
                                    }
                                )}</p>
                            </div>

                            <div class="dashboard-items">
                                <p>deaths</p>
                                <p>${Number(death.value).toLocaleString("id", {
                                    maximumSignificantDigits: 2,
                                })}</p>
                            </div>
                        </div>

                        <canvas id="chart-container"></canvas>

                        <p class="update-status">Last Update: 
                            <b>
                            ${moment(lstUpdate)
                                .utc()
                                .format("DD MMMM YYYY HH:mm")}
                            </b>
                        </p>
                    </div>
                </div>
            </div>
        `;

        // create chart
        let ctx = this.shadowRoot
            .getElementById("chart-container")
            .getContext("2d");
        var myChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["Confirmed", "Recovered", "Deaths"],
                datasets: [
                    {
                        label: "Covid-19 Case",
                        data: [confirm.value, recover.value, death.value],
                        backgroundColor: [
                            "rgba(255, 206, 86, 0.2)",
                            "rgba(54, 162, 235, 0.2)",
                            "rgba(255, 99, 132, 0.2)",
                        ],
                        borderColor: [
                            "rgba(255, 206, 86, 1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(255, 99, 132, 1)",
                        ],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    ],
                },
            },
        });
    }
}

customElements.define("content-container", ContentContainer);
