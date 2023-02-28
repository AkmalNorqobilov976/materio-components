import { Directive, DirectiveBinding } from "vue";

const handleRipple = (element: HTMLElement, binding: DirectiveBinding, ev: any) => {
    const rippleElement = document.createElement("span");
    let currentDiameter = 1;
    let currentOpacity = 0.65;
    const animationHandler = setInterval(animateRippleSpread, 15);
    applyRippleStyle();
  
    function applyRippleStyle() {
      const elementCoordinates = element.getBoundingClientRect();
      const offsetY = ev.clientY - elementCoordinates.y;
      const offsetX = ev.clientX - elementCoordinates.x;
  
      rippleElement.style.position = "absolute";
      rippleElement.style.height = "5px";
      rippleElement.style.width = "5px";
      rippleElement.style.borderRadius = "100%";
      rippleElement.style.backgroundColor = "#f2f2f2";
      rippleElement.style.left = `${offsetX}px`;
      rippleElement.style.top = `${offsetY}px`;
      ev.target.appendChild(rippleElement);
    }
  
    function animateRippleSpread() {
      const maximalDiameter = +binding.value || 50;
      if (currentDiameter <= maximalDiameter) {
        currentDiameter+=2;
        currentOpacity -= 0.65 / maximalDiameter;
        rippleElement.style.transform = `scale(${currentDiameter})`;
        rippleElement.style.opacity = `${currentOpacity}`;
      } else {
        rippleElement.remove();
        clearInterval(animationHandler);
      }
    }
  };
  
  const vRipple: Directive = {
    mounted: (el: HTMLElement, binding: DirectiveBinding) => {
      el.style.position = "relative";
      el.style.overflow = "hidden";
      el.addEventListener("click", (ev: MouseEvent) => handleRipple(el, binding, ev));
    }
  };
  
  export default vRipple;
  