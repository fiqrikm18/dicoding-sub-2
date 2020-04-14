import Axios from "axios";
import config from "../confiig";
import "../components/Navigation";
import "../components/SearchBar";
import { Chart } from "chart.js";
import moment from "moment";

class ReportContainer extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: "open" });
        this.search = false;
    }

    getData(country) {
        return Axios.get(config.BASE_URL + "/countries/" + country)
            .then((result) => {
                this.render(result.data);
            })
            .catch((err) => console.log(err));
    }

    connectedCallback() {
        this.render();
    }

    render(country) {
        if (country) {
            this._shadowRoot.innerHTML = `
                <style>
                * {
                    box-sizing: border-box;
                }

                .content {
                    width: 80%;
                    margin: auto;
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
                    width: 80%;
                    margin: auto;
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
                    margin: auto;
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
                    margin: 10px 0px 10px 0px;
                }

                #chart-container {
                    margin: 3px 0px;
                    padding: 10px;
                }
            </style>
                <div>
                    <search-bar id="search"></search-bar>
                    <div class="content">
                        <div class="dashboard">
                    
                        <h4>Covid-19 Case (Global)</h4>
                        <div class="card dashboard-content">
                            <div>
                                <div class="dashboard-items">
                                    <p>Confirmed</p>
                                    <p>${Number(
                                        country.confirmed.value
                                    ).toLocaleString("id", {
                                        maximumSignificantDigits: 2,
                                    })}</p>
                                </div>

                                <div class="dashboard-items">
                                    <p>Recovered</p>
                                    <p>${Number(
                                        country.recovered.value
                                    ).toLocaleString("id", {
                                        maximumSignificantDigits: 2,
                                    })}</p>
                                </div>

                                <div class="dashboard-items">
                                    <p>Deaths</p>
                                    <p>${Number(
                                        country.deaths.value
                                    ).toLocaleString("id", {
                                        maximumSignificantDigits: 2,
                                    })}</p>
                                </div>
                            </div>

                            <canvas id="chart-container"></canvas>

                            <p class="update-status">Last Update: 
                                <b>
                                ${moment(country.confirmed)
                                    .utc()
                                    .format("DD MMMM YYYY HH:mm")}
                                </b>
                            </p>
                        </div>
                    </div>
                </div>
            `;

            let ctx = this.shadowRoot
                .getElementById("chart-container")
                .getContext("2d");
            var myChart = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: ["Confirmed", "Recovered", "Deaths"],
                    datasets: [
                        {
                            label: ["Covid-19 Case (Global)"],
                            data: [country.confirmed.value, country.recovered.value, country.deaths.value],
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
        } else {
            this._shadowRoot.innerHTML = `
                <style>
                    * {
                        box-sizing: border-box;
                    }
                    .card {
                        background-color: white;
                        box-shadow: 0px 0px 3px 1px #cccccc;
                        padding: 10px;
                        margin: 20px 0px;
                        border-radius: 2px;
                    }

                    .content {
                        width: 80%;
                        margin: auto;
                    }

                    .content p {
                        text-align: center;
                    }
                </style>
                <div>
                    <search-bar id="search"></search-bar>
                    <div class="card content">
                        <p>No data display</p>
                    </div>
                </div>
            `;
        }

        let searchBar = this.shadowRoot.getElementById("search");
        searchBar.clickEvent = () => {
            this.search = true;
            this.getData(searchBar.value);
        };
    }
}

customElements.define("report-container", ReportContainer);
