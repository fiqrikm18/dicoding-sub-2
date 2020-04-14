import "../components/Navigation";
import "./ContentContainer";
import "../../css/style.css";
import "./ReportContainer";

const main = document.querySelector(".content");

if (window.location.pathname === "/") {
    main.innerHTML = "<content-container></content-container>";
} else if (window.location.pathname == "/report.html") {
    main.innerHTML = "<report-container></report-container>";
}
