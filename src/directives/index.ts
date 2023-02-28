import ripple from "./ripple";

export default function (app: any) {
    app.directive('ripple', ripple);
}