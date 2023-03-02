import { App } from "vue";
import ripple from "./ripple";
import tooltipDirective from "./tooltip";

export default function (app: App) {
    app.directive('ripple', ripple);
    tooltipDirective(app)
}