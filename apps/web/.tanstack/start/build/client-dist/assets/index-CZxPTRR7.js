import{j as e, t as n}from"./main-2UVUqwYZ.js";const t=`
 ██████╗ ███████╗████████╗████████╗███████╗██████╗
 ██╔══██╗██╔════╝╚══██╔══╝╚══██╔══╝██╔════╝██╔══██╗
 ██████╔╝█████╗     ██║      ██║   █████╗  ██████╔╝
 ██╔══██╗██╔══╝     ██║      ██║   ██╔══╝  ██╔══██╗
 ██████╔╝███████╗   ██║      ██║   ███████╗██║  ██║
 ╚═════╝ ╚══════╝   ╚═╝      ╚═╝   ╚══════╝╚═╝  ╚═╝

 ████████╗    ███████╗████████╗ █████╗  ██████╗██╗  ██╗
 ╚══██╔══╝    ██╔════╝╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝
    ██║       ███████╗   ██║   ███████║██║     █████╔╝
    ██║       ╚════██║   ██║   ██╔══██║██║     ██╔═██╗
    ██║       ███████║   ██║   ██║  ██║╚██████╗██║  ██╗
    ╚═╝       ╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
 `;function o(){const s=n.healthCheck.useQuery();return e.jsxs("div",{className:"container mx-auto max-w-3xl px-4 py-2",children:[e.jsx("pre",{className:"overflow-x-auto font-mono text-sm",children:t}),e.jsx("div",{className:"grid gap-6",children:e.jsxs("section",{className:"rounded-lg border p-4",children:[e.jsx("h2",{className:"mb-2 font-medium",children:"API Status"}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:`h-2 w-2 rounded-full ${s.data?"bg-green-500":"bg-red-500"}`}),e.jsx("span",{className:"text-muted-foreground text-sm",children:s.isLoading?"Checking...":s.data?"Connected":"Disconnected"})]})]})})]})}export{o as component};
