(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[879],{8398:function(e,r,t){"use strict";var n=t(9008),o=t(1664),s=t(5893);r.Z=function(e){var r=function(e){e.preventDefault();var r=document.querySelector("#sidebar"),t=(document.querySelector("#showHide"),document.querySelector("#content")),n=document.querySelector("#header");r&&r.classList.toggle("hidden"),t&&t.classList.toggle("overflow-y-hidden"),n&&n.classList.toggle("z-40")};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.default,{children:(0,s.jsx)("title",{children:e.title||"tgsnake"})}),(0,s.jsx)("div",{id:"showHide",className:"float-right flex items-center cursor-pointer p-2 fixed right-5 bottom-5 backdrop-filter md:hidden backdrop-blur-md h-16 w-16 z-40 rounded-full border-gray-200 border-2",onClick:r,children:(0,s.jsx)("svg",{className:"w-6 h-6 mx-auto dark:text-white",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 8h16M4 16h16"})})}),(0,s.jsx)("div",{className:"w-full max-w-8xl mx-auto mb-auto",children:(0,s.jsxs)("div",{className:"md:flex",children:[(0,s.jsxs)("div",{id:"sidebar",className:"fixed z-40 inset-0 flex-none h-full backdrop-filter backdrop-blur-sm w-full md:bg-white md:static md:h-auto z-40 md:overflow-y-auto md:pt-0 md:w-60 xl:w-72 md:block hidden",children:[(0,s.jsx)("div",{className:"float-right flex items-center cursor-pointer p-2 fixed right-5 bottom-5 backdrop-filter backdrop-blur-md h-16 w-16 md:hidden rounded-full border-gray-200 border-2",onClick:r,children:(0,s.jsx)("svg",{className:"w-6 h-6 mx-auto dark:text-white",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})}),(0,s.jsx)("div",{className:"h-full z-40 bg-white p-2 overflow-y-auto scrolling-touch md:h-auto md:block md:relative md:sticky md:bg-transparent md:top-18 mr-24 md:rounded-none border-r-2 border-black rounded-r-md md:border-none md:mr-0",children:(0,s.jsx)("div",{className:"px-1 pt-6 overflow-y-auto font-medium text-base sm:px-3 xl:px-5 md:text-sm pb-10 md:pt-10 md:pb-14 sticky?md:h-(screen-18)",children:(0,s.jsx)("ul",{children:e.folder?e.folder.map((function(e){return(0,s.jsxs)("li",{children:[(0,s.jsx)("span",{children:e.folder}),(0,s.jsx)("ul",{className:"pl-4",children:e.content.map((function(e){return(0,s.jsx)("li",{className:"text-blue-500",children:(0,s.jsx)(o.default,{href:e.slug,children:(0,s.jsx)("a",{children:e.title})})})}))})]},e.folder)})):(0,s.jsx)("li",{children:(0,s.jsx)("b",{children:"NotFound!"})})})})})]}),(0,s.jsxs)("div",{id:"content",className:"mx-auto flex flex-col h-screen md:overflow-y-auto",children:[(0,s.jsx)("header",{id:"header",className:"w-full backdrop-filter backdrop-blur-sm p-2 z-40 text-lg md:text-xl font-bold sticky top-0 border-b-2 border-gray-300",children:(0,s.jsx)(o.default,{href:"/",children:(0,s.jsx)("a",{children:e.title||"tgsnake"})})}),(0,s.jsx)("article",{className:"prose mx-2 mb-auto p-2 dark:prose-dark prose-blue md:prose-md lg:prose-lg mb-4 pb-4",children:e.children}),(0,s.jsxs)("footer",{className:"font-light mb-4 pb-4 font-italic mx-2 px-2",children:["tgsnake ",(new Date).getFullYear()]})]})]})})]})}},6903:function(e,r,t){"use strict";var n=t(4942),o=t(4925),s=t(1664),l=t(7294),d=t(5893),i=["href"];function a(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function c(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?a(Object(t),!0).forEach((function(r){(0,n.Z)(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}var u=c(c({},t(5248)),{},{a:function(e){var r=e.href,t=(0,o.Z)(e,i),n=r&&r.startsWith("/"),l=r&&r.startsWith("#");return n?(0,d.jsx)(s.default,{href:r,children:(0,d.jsx)("a",c({},t))}):l?(0,d.jsx)("a",c({href:r},t)):(0,d.jsx)("a",c({target:"_blank",rel:"noopener noreferrer",href:r},t))},pre:function(e){var r=(0,l.useRef)(null),t=(0,l.useState)(!1),n=t[0],o=t[1],s=(0,l.useState)(!1),i=s[0],a=s[1];return(0,d.jsxs)("div",{ref:r,onMouseEnter:function(){o(!0)},onMouseLeave:function(){o(!1),a(!1)},className:"relative",children:[n&&(0,d.jsx)("button",{"aria-label":"Copy code",type:"button",className:"absolute right-2 top-2 w-8 h-8 p-1 rounded border-2 bg-gray-700 dark:bg-gray-800 ".concat(i?"focus:outline-none focus:border-green-400 border-green-400":"border-gray-300"),onClick:function(){a(!0),navigator.clipboard.writeText(r.current.innerText),setTimeout((function(){a(!1)}),2e3)},children:(0,d.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",stroke:"currentColor",fill:"none",className:i?"text-green-400":"text-gray-300",children:i?(0,d.jsx)(d.Fragment,{children:(0,d.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"})}):(0,d.jsx)(d.Fragment,{children:(0,d.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"})})})}),(0,d.jsx)("pre",{children:e.children})]})}});r.Z=u},1647:function(e,r,t){"use strict";t.r(r),t.d(r,{__N_SSG:function(){return i}});var n=t(6903),o=t(7294),s=t(3194),l=t(8398),d=t(5893),i=!0;r.default=function(e){var r=e.content,t=e.data,i=e.folder,a=(0,o.useMemo)((function(){return(0,s.getMDXComponent)(r)}),[r]);return(0,d.jsx)(d.Fragment,{children:r?(0,d.jsx)(l.Z,{title:t.title||"tgsnake",folder:i,children:(0,d.jsx)(a,{components:n.Z})}):(0,d.jsx)("h2",{children:"NotFound!"})})}},7008:function(e,r,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/[...docs]",function(){return t(1647)}])}},function(e){e.O(0,[498,774,888,179],(function(){return r=7008,e(e.s=r);var r}));var r=e.O();_N_E=r}]);