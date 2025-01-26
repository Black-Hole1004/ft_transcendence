import{j as t}from"./index-BAIcLLuA.js";function u({id:n,disabled:e,onClick:o,className:s,from:r,children:i}){return t.jsx("button",{id:n,onClick:o,className:`
			border border-border select-none ${s||""} ${e?"brightness-75":""}
			bg-[rgb(183,170,156,12%)] transition-all duration-300 ease-in-out hover:bg-[rgb(183,170,156,30%)]`,disabled:`${e===!0&&r!=="settings"?"disabled":""}`,children:e===!0&&r!=="settings"?t.jsx(t.Fragment,{children:"Blocked"}):t.jsx(t.Fragment,{children:e?"Disable Two-factor Authentication":i})})}export{u as B};
