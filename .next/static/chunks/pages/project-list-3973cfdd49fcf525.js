(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[64],{4370:(e,t,r)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/project-list",function(){return r(3779)}])},3779:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>p});var n=r(4848),a=r(3368),s=r.n(a),i=r(1106),c=r.n(i),d=r(6540),l=r(2405),o=r(9639),h=r(2139),j=r(6715);function p(){let e=(0,j.useRouter)(),[t,r]=(0,d.useState)([]),a=async()=>{try{let e=(0,l.rJ)(o.db,"projects"),t=(await (0,l.GG)(e)).docs.map(e=>({id:e.id,...e.data()}));r(t)}catch(e){console.error("Error fetching projects: ",e)}};return(0,d.useEffect)(()=>{a()},[]),(0,d.useEffect)(()=>{"admin"!==localStorage.getItem("role")&&e.push("/")},[e]),(0,n.jsxs)("div",{children:[(0,n.jsxs)(s(),{children:[(0,n.jsx)("title",{children:"Internal Project"}),(0,n.jsx)("meta",{name:"description",content:"Onething Internal Projects"}),(0,n.jsx)("link",{rel:"shortcut icon",href:"assets/images/favicon.ico",type:"image/x-icon"}),(0,n.jsx)("link",{rel:"shortcut icon",href:"",type:"image/x-icon"}),(0,n.jsx)("link",{rel:"icon",href:"",type:"image/x-icon"})]}),(0,n.jsx)("main",{children:(0,n.jsxs)("div",{className:"container-homepage",children:[(0,n.jsx)("div",{className:"container-head",children:(0,n.jsx)("div",{className:"cta-wrapper",children:(0,n.jsx)("a",{className:"bttn bttn-primary",href:"/form",children:"Add New +"})})}),(0,n.jsxs)("table",{children:[(0,n.jsx)("thead",{children:(0,n.jsxs)("tr",{children:[(0,n.jsx)("th",{children:"Project Name"}),(0,n.jsx)("th",{children:"Brand Name"}),(0,n.jsx)("th",{children:"Duration"}),(0,n.jsx)("th",{children:"Date Created"}),(0,n.jsx)("th",{})]})}),(0,n.jsx)("tbody",{id:"projectTableBody",children:t.map(e=>(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{children:e.project_name||"---"}),(0,n.jsx)("td",{children:e.brand_name||"---"}),(0,n.jsxs)("td",{children:[e.timeline_duration||"---"," ",e.timeline_unit||"---"]}),(0,n.jsx)("td",{children:e.created_at&&e.created_at.seconds?(0,h.GP)(new Date(1e3*e.created_at.seconds),"d MMM, yyyy"):"---"}),(0,n.jsx)("td",{className:"view-td",children:(0,n.jsxs)(c(),{href:"/project-detail/".concat(e.id),children:["View Page"," ",(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"76",height:"69",viewBox:"0 0 76 69",fill:"none",children:(0,n.jsx)("path",{d:"M43.5516 66.4511C43.6083 66.5145 45.3489 66.9993 47.419 67.528C49.4895 68.0566 51.2059 68.4084 51.2335 68.3102C51.2608 68.2117 51.475 66.6151 51.7093 64.7619C52.1798 61.0405 53.3191 56.6955 54.5365 53.978C58.3312 45.5091 65.1396 39.9015 73.3972 38.444L75.5 38.0728V34.3316V30.5902L73.5941 30.2349C61.1075 27.9073 52.9669 17.5336 51.444 2.0093C51.3447 0.995579 51.2258 0.166439 51.1801 0.166439C50.759 0.166439 43.781 2.03495 43.6491 2.18297C43.5537 2.29 43.6246 3.24033 43.8071 4.29445C45.8263 15.967 51.6078 25.4653 59.1104 29.4367L60.9101 30.3894L23.9017 30.464L0.5 30.5114V38.0829L23.9619 38.1303L60.883 38.2052L58.6109 39.4843C52.7166 42.8023 48.05 49.311 45.3018 58.0474C44.5187 60.5363 43.337 66.2105 43.5516 66.4511Z",fill:"#E2E2E2"})})]})})]},e.id))})]})]})})]})}},9639:(e,t,r)=>{"use strict";r.d(t,{db:()=>i});var n=r(223),a=r(2405);r(5904);let s=(0,n.Dk)().length?(0,n.Dk)()[0]:(0,n.Wp)({apiKey:"AIzaSyBXpXqAY7BSkCYzsCDDtNCve255BwrjnZk",authDomain:"internal-project-8163e.firebaseapp.com",projectId:"internal-project-8163e",storageBucket:"internal-project-8163e.appspot.com",messagingSenderId:"16645092059",appId:"1:16645092059:web:c1a0c7aecaaf5d6122d2fe"}),i=(0,a.aU)(s)}},e=>{var t=t=>e(e.s=t);e.O(0,[883,569,139,636,593,792],()=>t(4370)),_N_E=e.O()}]);