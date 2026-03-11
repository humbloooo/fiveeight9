import{f as w,h as T,i as Z,s as ee,k as te,p as fe,v as me,l as ge,n as pe,o as he,q as re,t as ue,w as xe,x as S,r as m,y as se,z as B,A as j,M as ye,B as C,c as u,j as r,m as ve,X as be,I as we,C as ke,e as je}from"./index-C-m96xai.js";import{E as _,S as Ne}from"./shield-CErJJ9pH.js";import{a as Se,A as Ee}from"./config-BhM70cp0.js";function ne(e,t){let s;const n=()=>{const{currentTime:a}=t,i=(a===null?0:a.value)/100;s!==i&&e(i),s=i};return w.preUpdate(n,!0),()=>T(n)}function ze(...e){const t=!Array.isArray(e[0]),s=t?0:-1,n=e[0+s],a=e[1+s],o=e[2+s],i=e[3+s],l=Z(a,o,i);return t?l(n):l}function L(e){return typeof window>"u"?!1:e?ee():te()}const Te=50,D=()=>({current:0,offset:[],progress:0,scrollLength:0,targetOffset:0,targetLength:0,containerLength:0,velocity:0}),Le=()=>({time:0,x:D(),y:D()}),Ce={x:{length:"Width",position:"Left"},y:{length:"Height",position:"Top"}};function V(e,t,s,n){const a=s[t],{length:o,position:i}=Ce[t],l=a.current,c=s.time;a.current=Math.abs(e[`scroll${i}`]),a.scrollLength=e[`scroll${o}`]-e[`client${o}`],a.offset.length=0,a.offset[0]=0,a.offset[1]=a.scrollLength,a.progress=fe(0,a.scrollLength,a.current);const f=n-c;a.velocity=f>Te?0:me(a.current-l,f)}function Ie(e,t,s){V(e,"x",t,s),V(e,"y",t,s),t.time=s}function Ae(e,t){const s={x:0,y:0};let n=e;for(;n&&n!==t;)if(ge(n))s.x+=n.offsetLeft,s.y+=n.offsetTop,n=n.offsetParent;else if(n.tagName==="svg"){const a=n.getBoundingClientRect();n=n.parentElement;const o=n.getBoundingClientRect();s.x+=a.left-o.left,s.y+=a.top-o.top}else if(n instanceof SVGGraphicsElement){const{x:a,y:o}=n.getBBox();s.x+=a,s.y+=o;let i=null,l=n.parentNode;for(;!i;)l.tagName==="svg"&&(i=l),l=n.parentNode;n=i}else break;return s}const A={start:0,center:.5,end:1};function $(e,t,s=0){let n=0;if(e in A&&(e=A[e]),typeof e=="string"){const a=parseFloat(e);e.endsWith("px")?n=a:e.endsWith("%")?e=a/100:e.endsWith("vw")?n=a/100*document.documentElement.clientWidth:e.endsWith("vh")?n=a/100*document.documentElement.clientHeight:e=a}return typeof e=="number"&&(n=t*e),s+n}const Me=[0,0];function We(e,t,s,n){let a=Array.isArray(e)?e:Me,o=0,i=0;return typeof e=="number"?a=[e,e]:typeof e=="string"&&(e=e.trim(),e.includes(" ")?a=e.split(" "):a=[e,A[e]?e:"0"]),o=$(a[0],s,n),i=$(a[1],t),o-i}const N={Enter:[[0,1],[1,1]],Exit:[[0,0],[1,0]],Any:[[1,0],[0,1]],All:[[0,0],[1,1]]},Oe={x:0,y:0};function He(e){return"getBBox"in e&&e.tagName!=="svg"?e.getBBox():{width:e.clientWidth,height:e.clientHeight}}function Re(e,t,s){const{offset:n=N.All}=s,{target:a=e,axis:o="y"}=s,i=o==="y"?"height":"width",l=a!==e?Ae(a,e):Oe,c=a===e?{width:e.scrollWidth,height:e.scrollHeight}:He(a),f={width:e.clientWidth,height:e.clientHeight};t[o].offset.length=0;let g=!t[o].interpolate;const h=n.length;for(let p=0;p<h;p++){const x=We(n[p],f[i],c[i],l[o]);!g&&x!==t[o].interpolatorOffsets[p]&&(g=!0),t[o].offset[p]=x}g&&(t[o].interpolate=Z(t[o].offset,pe(n),{clamp:!1}),t[o].interpolatorOffsets=[...t[o].offset]),t[o].progress=he(0,1,t[o].interpolate(t[o].current))}function Pe(e,t=e,s){if(s.x.targetOffset=0,s.y.targetOffset=0,t!==e){let n=t;for(;n&&n!==e;)s.x.targetOffset+=n.offsetLeft,s.y.targetOffset+=n.offsetTop,n=n.offsetParent}s.x.targetLength=t===e?t.scrollWidth:t.clientWidth,s.y.targetLength=t===e?t.scrollHeight:t.clientHeight,s.x.containerLength=e.clientWidth,s.y.containerLength=e.clientHeight}function Be(e,t,s,n={}){return{measure:a=>{Pe(e,n.target,s),Ie(e,s,a),(n.offset||n.target)&&Re(e,s,n)},notify:()=>t(s)}}const b=new WeakMap,F=new WeakMap,I=new WeakMap,X=new WeakMap,E=new WeakMap,Y=e=>e===document.scrollingElement?window:e;function ae(e,{container:t=document.scrollingElement,trackContentSize:s=!1,...n}={}){if(!t)return re;let a=I.get(t);a||(a=new Set,I.set(t,a));const o=Le(),i=Be(t,e,o,n);if(a.add(i),!b.has(t)){const c=()=>{for(const p of a)p.measure(xe.timestamp);w.preUpdate(f)},f=()=>{for(const p of a)p.notify()},g=()=>w.read(c);b.set(t,g);const h=Y(t);window.addEventListener("resize",g),t!==document.documentElement&&F.set(t,ue(t,g)),h.addEventListener("scroll",g),g()}if(s&&!E.has(t)){const c=b.get(t),f={width:t.scrollWidth,height:t.scrollHeight};X.set(t,f);const g=()=>{const p=t.scrollWidth,x=t.scrollHeight;(f.width!==p||f.height!==x)&&(c(),f.width=p,f.height=x)},h=w.read(g,!0);E.set(t,h)}const l=b.get(t);return w.read(l,!1,!0),()=>{T(l);const c=I.get(t);if(!c||(c.delete(i),c.size))return;const f=b.get(t);b.delete(t),f&&(Y(t).removeEventListener("scroll",f),F.get(t)?.(),window.removeEventListener("resize",f));const g=E.get(t);g&&(T(g),E.delete(t)),X.delete(t)}}const _e=[[N.Enter,"entry"],[N.Exit,"exit"],[N.Any,"cover"],[N.All,"contain"]];function De(e,t){if(e.length!==2)return!1;for(let s=0;s<2;s++){const n=e[s],a=t[s];if(!Array.isArray(n)||n.length!==2||n[0]!==a[0]||n[1]!==a[1])return!1}return!0}function M(e){if(!e)return{rangeStart:"contain 0%",rangeEnd:"contain 100%"};for(const[t,s]of _e)if(De(e,t))return{rangeStart:`${s} 0%`,rangeEnd:`${s} 100%`}}const G=new Map;function U(e){const t={value:0},s=ae(n=>{t.value=n[e.axis].progress*100},e);return{currentTime:t,cancel:s}}function oe({source:e,container:t,...s}){const{axis:n}=s;e&&(t=e);let a=G.get(t);a||(a=new Map,G.set(t,a));const o=s.target??"self";let i=a.get(o);i||(i={},a.set(o,i));const l=n+(s.offset??[]).join(",");return i[l]||(s.target&&L(s.target)?M(s.offset)?i[l]=new ViewTimeline({subject:s.target,axis:n}):i[l]=U({container:t,...s}):L()?i[l]=new ScrollTimeline({source:t,axis:n}):i[l]=U({container:t,...s})),i[l]}function Ve(e,t){const s=oe(t),n=t.target?M(t.offset):void 0,a=t.target?L(t.target)&&!!n:L();return e.attachTimeline({timeline:a?s:void 0,...n&&a&&{rangeStart:n.rangeStart,rangeEnd:n.rangeEnd},observe:o=>(o.pause(),ne(i=>{o.time=o.iterationDuration*i},s))})}function $e(e){return e.length===2}function Fe(e,t){return $e(e)?ae(s=>{e(s[t.axis].progress,s)},t):ne(e,oe(t))}function ie(e,{axis:t="y",container:s=document.scrollingElement,...n}={}){if(!s)return re;const a={axis:t,container:s,...n};return typeof e=="function"?Fe(e,a):Ve(e,a)}const Xe=()=>({scrollX:j(0),scrollY:j(0),scrollXProgress:j(0),scrollYProgress:j(0)}),z=e=>e?!e.current:!1;function q(e,t,s,n){return{factory:a=>ie(a,{...t,axis:e,container:s?.current||void 0,target:n?.current||void 0}),times:[0,1],keyframes:[0,1],ease:a=>a,duration:1}}function Ye(e,t){return typeof window>"u"?!1:e?ee()&&!!M(t):te()}function Ge({container:e,target:t,...s}={}){const n=S(Xe);Ye(t,s.offset)&&(n.scrollXProgress.accelerate=q("x",s,e,t),n.scrollYProgress.accelerate=q("y",s,e,t));const a=m.useRef(null),o=m.useRef(!1),i=m.useCallback(()=>(a.current=ie((l,{x:c,y:f})=>{n.scrollX.set(c.current),n.scrollXProgress.set(c.progress),n.scrollY.set(f.current),n.scrollYProgress.set(f.progress)},{...s,container:e?.current||void 0,target:t?.current||void 0}),()=>{a.current?.()}),[e,t,JSON.stringify(s.offset)]);return se(()=>{if(o.current=!1,z(e)||z(t)){o.current=!0;return}else return i()},[i]),m.useEffect(()=>{if(o.current)return B(!z(e)),B(!z(t)),i()},[i]),n}function Ue(e){const t=S(()=>j(e)),{isStatic:s}=m.useContext(ye);if(s){const[,n]=m.useState(e);m.useEffect(()=>t.on("change",n),[])}return t}function le(e,t){const s=Ue(t()),n=()=>s.set(t());return n(),se(()=>{const a=()=>w.preRender(n,!1,!0),o=e.map(i=>i.on("change",a));return()=>{o.forEach(i=>i()),T(n)}}),s}function qe(e){C.current=[],e();const t=le(C.current,e);return C.current=void 0,t}function ce(e,t,s,n){if(typeof e=="function")return qe(e);if(s!==void 0&&!Array.isArray(s)&&typeof t!="function")return Ke(e,t,s,n);const i=typeof t=="function"?t:ze(t,s,n),l=Array.isArray(e)?K(e,i):K([e],([f])=>i(f)),c=Array.isArray(e)?void 0:e.accelerate;return c&&!c.isTransformed&&typeof t!="function"&&Array.isArray(s)&&n?.clamp!==!1&&(l.accelerate={...c,times:t,keyframes:s,isTransformed:!0}),l}function K(e,t){const s=S(()=>[]);return le(e,()=>{s.length=0;const n=e.length;for(let a=0;a<n;a++)s[a]=e[a].get();return t(s)})}function Ke(e,t,s,n){const a=S(()=>Object.keys(s)),o=S(()=>({}));for(const i of a)o[i]=ce(e,t,s[i],n);return o}const Je=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],Qe=u("chevron-down",Je);const Ze=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]],et=u("external-link",Ze);const tt=[["rect",{width:"20",height:"20",x:"2",y:"2",rx:"5",ry:"5",key:"2e1cvw"}],["path",{d:"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z",key:"9exkf1"}],["line",{x1:"17.5",x2:"17.51",y1:"6.5",y2:"6.5",key:"r4j83e"}]],rt=u("instagram",tt);const st=[["path",{d:"m10 17 5-5-5-5",key:"1bsop3"}],["path",{d:"M15 12H3",key:"6jk70r"}],["path",{d:"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4",key:"u53s6r"}]],nt=u("log-in",st);const at=[["path",{d:"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",key:"1sd12s"}]],ot=u("message-circle",at);const it=[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",key:"kfwtm"}]],J=u("moon",it);const lt=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],Q=u("sun",lt);const ct=[["path",{d:"M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",key:"pff0z6"}]],dt=u("twitter",ct);const ft=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],mt=u("user",ft),yt=()=>{const{scrollY:e}=Ge(),t=ce(e,[0,3e3],[0,300]);return r.jsxs("div",{className:"background-wrapper",children:[r.jsx(ve.div,{className:"celestial-bg",style:{y:t},children:r.jsxs("div",{className:"stars-container",children:[r.jsx("div",{className:"stars-layer s1"}),r.jsx("div",{className:"stars-layer s2"}),r.jsx("div",{className:"stars-layer s3"})]})}),r.jsx("style",{children:`
                .background-wrapper {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: var(--navy);
                    z-index: -2;
                    overflow: hidden;
                    transition: background 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .celestial-bg {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: block;
                    mix-blend-mode: screen;
                    opacity: 0.8;
                }

                /* Strictly follow system theme */
                @media (prefers-color-scheme: light) {
                    .celestial-bg {
                        display: none;
                    }
                    .background-wrapper {
                        background: radial-gradient(circle at top right, rgba(197, 160, 89, 0.08), transparent 40%),
                                    radial-gradient(circle at bottom left, rgba(197, 160, 89, 0.05), transparent 40%),
                                    #f8f9fa;
                    }
                }

                .stars-container {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background: transparent;
                }

                .stars-layer {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }

                /* CSS ONLY STARS - NO IMAGES */
                .stars-layer.s1 {
                    background-image: 
                        radial-gradient(1px 1px at 10% 20%, #fff, transparent),
                        radial-gradient(1px 1px at 20% 50%, #fff, transparent),
                        radial-gradient(1.5px 1.5px at 30% 80%, #fff, transparent),
                        radial-gradient(1px 1px at 40% 10%, #fff, transparent),
                        radial-gradient(1.5px 1.5px at 50% 60%, #fff, transparent),
                        radial-gradient(1px 1px at 60% 30%, #fff, transparent),
                        radial-gradient(1.5px 1.5px at 70% 90%, #fff, transparent),
                        radial-gradient(1px 1px at 80% 40%, #fff, transparent),
                        radial-gradient(1.5px 1.5px at 90% 70%, #fff, transparent);
                    background-size: 50% 50%;
                    animation: twinkle 4s ease-in-out infinite alternate;
                }

                .stars-layer.s2 {
                    background-image: 
                        radial-gradient(1px 1px at 15% 25%, rgba(255,255,255,0.8), transparent),
                        radial-gradient(1px 1px at 35% 45%, rgba(197, 160, 89, 0.5), transparent),
                        radial-gradient(1.5px 1.5px at 55% 65%, rgba(255,255,255,0.8), transparent),
                        radial-gradient(1px 1px at 75% 85%, rgba(197, 160, 89, 0.5), transparent),
                        radial-gradient(1px 1px at 95% 15%, rgba(255,255,255,0.8), transparent);
                    background-size: 40% 40%;
                    animation: twinkle 6s ease-in-out infinite alternate-reverse;
                }

                .stars-layer.s3 {
                    background-image: 
                        radial-gradient(2px 2px at 5% 95%, #fff, transparent),
                        radial-gradient(2px 2px at 45% 5%, #fff, transparent),
                        radial-gradient(2px 2px at 85% 55%, #fff, transparent);
                    background-size: 70% 70%;
                    animation: twinkle 8s ease-in-out infinite alternate;
                    opacity: 0.3;
                }

                @keyframes twinkle {
                    0% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.05); }
                    100% { opacity: 0.4; transform: scale(1); }
                }

                @keyframes drift {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50px); }
                }
            `})]})},gt=({message:e,type:t="success",onClose:s})=>{m.useEffect(()=>{const a=setTimeout(()=>{s()},5e3);return()=>clearTimeout(a)},[s]);const n={success:r.jsx(je,{color:"#48bb78",size:20}),error:r.jsx(ke,{color:"#f56565",size:20}),info:r.jsx(we,{color:"#4299e1",size:20})};return r.jsxs("div",{style:{position:"fixed",top:"120px",right:"2rem",background:"rgba(5, 10, 26, 0.95)",backdropFilter:"blur(20px)",border:"1px solid var(--glass-border)",padding:"1rem 1.5rem",borderRadius:"12px",display:"flex",alignItems:"center",gap:"1rem",boxShadow:"0 20px 40px rgba(0,0,0,0.3)",zIndex:5e3,animation:"slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1)",color:"white"},children:[n[t],r.jsx("span",{style:{fontSize:"0.9rem",fontWeight:600},children:e}),r.jsx("button",{onClick:s,style:{background:"transparent",border:"none",color:"var(--text-secondary)",cursor:"pointer",padding:"0.2rem"},children:r.jsx(be,{size:16})}),r.jsx("style",{children:`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `})]})},pt="/assets/logo-XXAU5jtL.png",vt=()=>{const[e,t]=m.useState(!1),[s,n]=m.useState(!1),[a]=m.useState(!!localStorage.getItem("adminToken")),[o]=m.useState(localStorage.getItem("userRole")||"student"),[i,l]=m.useState(!1),[c,f]=m.useState(localStorage.getItem("theme")||"system"),[g,h]=m.useState("BOOK A VIEWING"),[p,x]=m.useState(0),[y,W]=m.useState(!1),v=()=>t(!e);m.useEffect(()=>(e?document.body.style.overflow="hidden":document.body.style.overflow="unset",()=>{document.body.style.overflow="unset"}),[e]),m.useEffect(()=>{const d=()=>{const k=window.scrollY,P=document.documentElement.scrollHeight-document.documentElement.clientHeight,de=P>0?k/P*100:0;x(de),k<600?h("BOOK A VIEWING"):k<1800?h("EXPLORE ROOMS"):h("RESERVE NOW")};return d(),window.addEventListener("scroll",d,{passive:!0}),()=>window.removeEventListener("scroll",d)},[]),m.useEffect(()=>{if(localStorage.getItem("justLoggedIn")&&(l(!0),localStorage.removeItem("justLoggedIn")),c==="system"){const k=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.body.classList.toggle("light-mode",k==="light")}else document.body.classList.toggle("light-mode",c==="light")},[c]),m.useEffect(()=>{document.body.classList.toggle("night-owl-active",y)},[y]);const O=()=>{const d=c==="light"?"dark":"light";f(d),localStorage.setItem("theme",d)},H=[{name:"Home",href:"/#home"},{name:"Rooms",href:"/#rooms"},{name:"Cafeteria",href:"/cafeteria"},{name:"Safety",href:"/safety"}],R=[{name:"Group Chat",href:"/forum"},{name:"Rent Calc",href:"/calculator"},{name:"Wellness",href:"/wellness"},{name:"Events",href:"/events"},{name:"Tickets",href:"/maintenance"}];return r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"scroll-progress-container",children:r.jsx("div",{className:"scroll-progress-bar",style:{width:`${p}%`}})}),r.jsxs("nav",{className:"nav-cluster",children:[i&&r.jsx(gt,{message:`Welcome back, ${o}!`,type:"info",onClose:()=>l(!1)}),r.jsxs("div",{className:"nav-logo",style:{cursor:"pointer",display:"flex",alignItems:"center",gap:"0.8rem"},onClick:()=>window.location.href="/",children:[r.jsx("img",{src:pt,alt:"Five Eight 9",style:{height:"24px",width:"auto"}}),r.jsxs("span",{style:{fontWeight:900,fontSize:"1.2rem",letterSpacing:"1px",color:"var(--text-primary)"},className:"mobile-header-text",children:["Five Eight",r.jsx("span",{style:{color:"var(--gold)"},children:"9"})]})]}),r.jsxs("div",{className:"nav-links desktop-only",children:[H.filter(d=>d.name!=="Home").map(d=>r.jsx("a",{href:d.href,className:"nav-link",children:d.name},d.name)),r.jsxs("div",{style:{position:"relative"},onMouseEnter:()=>n(!0),onMouseLeave:()=>n(!1),children:[r.jsxs("button",{className:"nav-link",style:{background:"transparent",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:"0.3rem"},children:["Residents ",r.jsx(Qe,{size:14})]}),s&&r.jsx("div",{className:"dropdown-menu",children:R.map(d=>r.jsx("a",{href:d.href,className:"dropdown-item",children:d.name},d.name))})]})]}),r.jsx("div",{className:"nav-actions desktop-only",children:a?r.jsxs("div",{style:{display:"flex",gap:"1rem",alignItems:"center"},children:[r.jsx("button",{onClick:()=>W(!y),className:"icon-btn",title:"Night-Owl Reading Mode",children:r.jsx(_,{size:18,color:y?"var(--gold)":"currentColor"})}),o==="admin"&&r.jsx("button",{onClick:O,className:"icon-btn",title:"Toggle Theme",children:c==="light"?r.jsx(J,{size:18}):r.jsx(Q,{size:18})}),r.jsx("a",{href:"/admin",className:"icon-btn",title:"Admin Dashboard",children:r.jsx(Ne,{size:18})}),r.jsxs("div",{className:"user-badge",children:[r.jsx(mt,{size:14})," ",o.toUpperCase()]})]}):r.jsxs("div",{style:{display:"flex",gap:"1rem",alignItems:"center"},children:[r.jsx("button",{onClick:()=>W(!y),className:"icon-btn",title:"Night-Owl Reading Mode",children:r.jsx(_,{size:18,color:y?"var(--gold)":"currentColor"})}),r.jsxs("a",{href:"/login",className:"nav-link",style:{fontSize:"0.75rem",display:"flex",alignItems:"center",gap:"0.5rem"},children:[r.jsx(nt,{size:14})," STUDENT LOG"]}),r.jsx("button",{className:"cta-button",onClick:()=>window.dispatchEvent(new CustomEvent("openBooking")),children:g})]})}),r.jsx("button",{className:"burger-toggle",onClick:v,"aria-label":"Toggle Menu",children:r.jsxs("div",{className:`burger-icon ${e?"open":""}`,children:[r.jsx("span",{}),r.jsx("span",{})]})}),r.jsx("div",{className:`overlay-menu ${e?"active":""}`,children:r.jsxs("div",{className:"overlay-content",children:[r.jsx("div",{className:"overlay-header",children:r.jsx("span",{className:"overlay-label",children:"Explore Five Eight 9"})}),r.jsxs("div",{className:"overlay-grid",children:[r.jsxs("div",{className:"overlay-section",children:[r.jsx("h3",{children:"Explore"}),H.map(d=>r.jsx("a",{href:d.href,onClick:v,children:d.name},d.name))]}),r.jsxs("div",{className:"overlay-section",children:[r.jsx("h3",{children:"Resident Services"}),R.map(d=>r.jsx("a",{href:d.href,onClick:v,children:d.name},d.name))]}),r.jsxs("div",{className:"overlay-section",children:[r.jsx("h3",{children:"Portals & Actions"}),r.jsx("a",{href:"/login",onClick:v,children:"Student Portal"}),r.jsx("a",{href:"/admin",onClick:v,children:"Staff Portal"}),r.jsx("div",{style:{marginTop:"2.5rem"},children:r.jsx("button",{className:"cta-button",style:{width:"100%",padding:"1.2rem"},onClick:()=>{v(),window.dispatchEvent(new CustomEvent("openBooking"))},children:g})})]})]}),a&&o==="admin"&&r.jsxs("div",{className:"admin-menu-bar",children:[r.jsx("span",{style:{fontSize:"0.8rem",opacity:.6},children:"Admin Controls:"}),r.jsxs("button",{onClick:O,className:"admin-ctrl-btn",children:[c==="light"?r.jsx(J,{size:16}):r.jsx(Q,{size:16})," Switch Theme"]})]})]})}),r.jsx("style",{children:`
        .desktop-only { display: flex; align-items: center; }
        
        .dropdown-menu {
            position: absolute;
            top: 100%;
            left: 0;
            background: var(--nav-bg);
            backdrop-filter: blur(30px);
            border: 1px solid var(--glass-border);
            border-radius: 12px;
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
            min-width: 160px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            margin-top: 0.5rem;
            animation: slideDown 0.3s ease;
        }
        .dropdown-menu:after { 
            content: '';
            position: absolute;
            top: -5px;
            left: 20px;
            width: 10px;
            height: 10px;
            background: var(--nav-bg);
            border-left: 1px solid var(--glass-border);
            border-top: 1px solid var(--glass-border);
            transform: rotate(45deg);
        }
        .dropdown-item {
            color: var(--text-secondary);
            text-decoration: none;
            font-size: 0.85rem;
            font-weight: 600;
            transition: color 0.3s ease;
        }
        .dropdown-item:hover { color: var(--gold); }

        .burger-toggle {
            background: linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.0));
            border: 1px solid rgba(255, 215, 0, 0.3);
            width: 46px;
            height: 46px;
            border-radius: 50%;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 2001;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 0 4px 15px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(255,255,255,0.03);
        }
        .burger-toggle:hover { 
            background: rgba(255,215,0,0.1); 
            border-color: var(--gold); 
            transform: scale(1.05);
            box-shadow: 0 6px 20px rgba(255,215,0,0.25);
        }
        .burger-icon { width: 22px; height: 16px; position: relative; }
        .burger-icon span { 
            position: absolute; left: 0; width: 100%; height: 2px; 
            background: var(--gold); transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55); 
            border-radius: 2px;
        }
        .burger-icon span:first-child { top: 0; width: 70%; left: 30%; }
        .burger-toggle:hover .burger-icon span:first-child { width: 100%; left: 0; }
        .burger-icon span:last-child { bottom: 0; width: 100%; }
        .burger-icon.open span:first-child { transform: rotate(45deg); top: 7px; width: 100%; left: 0; }
        .burger-icon.open span:last-child { transform: rotate(-45deg); bottom: 7px; width: 100%; }

        .overlay-menu {
            position: fixed; top: 0; left: 0; width: 100%; height: 100vh;
            background: rgba(var(--bg-primary-rgb, 5, 10, 26), 0.85); 
            backdrop-filter: blur(40px) saturate(180%);
            -webkit-backdrop-filter: blur(40px) saturate(180%);
            z-index: 2000; display: flex; align-items: center; justify-content: center;
            opacity: 0; pointer-events: none; transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
            transform: scale(1.05);
        }
        .overlay-menu.active { opacity: 1; pointer-events: auto; transform: scale(1); }
        .overlay-content { width: 90%; max-width: 1100px; padding: 2rem; max-height: 90vh; overflow-y: auto; }
        .overlay-content::-webkit-scrollbar { display: none; }
        .overlay-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem; }
        .overlay-label { font-size: 0.7rem; color: var(--gold); font-weight: 900; text-transform: uppercase; letter-spacing: 4px; }
        .overlay-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 3rem; }
        .overlay-section h3 { font-size: 0.8rem; color: var(--gold); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 1.5rem; opacity: 0.6; }
        .overlay-section a { display: block; font-size: clamp(1.3rem, 3.5vw, 1.8rem); font-weight: 900; color: var(--text-primary); text-decoration: none; margin-bottom: 1rem; transition: all 0.3s ease; }
        .overlay-section a:hover { color: var(--gold); transform: translateX(10px); }

        .admin-menu-bar { 
            margin-top: 5rem; padding-top: 2rem; border-top: 1px solid var(--glass-border);
            display: flex; align-items: center; gap: 2rem;
        }
        .admin-ctrl-btn {
            background: var(--glass); border: 1px solid var(--glass-border); color: #fff;
            padding: 0.5rem 1rem; border-radius: 8px; font-size: 0.8rem; fontWeight: 700;
            display: flex; alignItems: center; gap: 0.5rem; cursor: pointer; transition: all 0.3s ease;
        }
        .admin-ctrl-btn:hover { background: var(--gold); color: #000; }

        .icon-btn { background: var(--glass); border: 1px solid var(--glass-border); color: var(--text-primary); width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s ease; }
        .icon-btn:hover { border-color: var(--gold); color: var(--gold); }
        .user-badge { background: var(--gold); color: #000; padding: 0.4rem 0.8rem; border-radius: 6px; font-weight: 900; font-size: 0.65rem; display: flex; align-items: center; gap: 0.4rem; }

        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 1024px) {
            .desktop-only { display: none; }
            .overlay-content { width: 85%; }
            .overlay-section a { font-size: 1.6rem; }
            .overlay-grid { gap: 2rem; }
        }
      `})]})]})},bt=()=>{const[e,t]=m.useState(null),s=o=>{switch(o.toLowerCase()){case"instagram":return r.jsx(rt,{size:18});case"twitter":return r.jsx(dt,{size:18});case"whatsapp":return r.jsx(ot,{size:18});default:return r.jsx(et,{size:18})}};m.useEffect(()=>{(async()=>{try{const i=await Se.get(`${Ee}/api/settings`);t(i.data)}catch(i){console.error("Error fetching footer settings:",i)}})()},[]);const n=e?.socialLinks||{},a=e?.emergencyContacts||{};return r.jsxs("footer",{style:{background:"var(--navy)",padding:"8rem 2rem 4rem",borderTop:"1px solid var(--glass-border)",position:"relative",overflow:"hidden"},children:[r.jsx("div",{style:{position:"absolute",bottom:"-150px",left:"50%",transform:"translateX(-50%)",width:"80%",height:"300px",background:"var(--gold)",filter:"blur(150px)",opacity:.05,pointerEvents:"none"}}),r.jsxs("div",{style:{maxWidth:"1200px",margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:"4rem"},children:[r.jsxs("div",{className:"reveal",children:[r.jsxs("h2",{style:{fontSize:"1.8rem",fontWeight:900,marginBottom:"1.5rem",letterSpacing:"-1px"},children:["FIVE ",r.jsx("span",{className:"gold-text",children:"EIGHT 9"})]}),r.jsx("p",{style:{color:"var(--text-secondary)",lineHeight:"1.8",marginBottom:"2.5rem",fontSize:"0.95rem"},children:"The premier student living experience in Thohoyandou, providing safe, modern, and inspiring lofts for future leaders."}),r.jsx("div",{style:{display:"flex",gap:"1rem"},children:Object.entries(n).map(([o,i])=>i.visible&&i.link&&r.jsx("a",{href:i.link,target:"_blank",rel:"noopener noreferrer",className:"social-icon-footer",title:o,children:s(o)},o))})]}),r.jsxs("div",{className:"reveal",style:{animationDelay:"0.1s"},children:[r.jsx("h4",{className:"footer-title",children:"Navigation"}),r.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1.2rem"},children:[r.jsx("a",{href:"/#home",className:"footer-link",children:"Property Home"}),r.jsx("a",{href:"/#rooms",className:"footer-link",children:"Room Layouts"}),r.jsx("a",{href:"/cafeteria",className:"footer-link",children:"Nari's Cafe"}),r.jsx("a",{href:"/safety",className:"footer-link",children:"Safety First"}),r.jsx("a",{href:"/admin",className:"footer-link",children:"Staff Portal"})]})]}),r.jsxs("div",{className:"reveal",style:{animationDelay:"0.2s"},children:[r.jsx("h4",{className:"footer-title",children:"Resident Support"}),r.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1.5rem"},children:[r.jsxs("div",{className:"contact-item-footer",children:[r.jsx("span",{className:"label",children:"Reception & Support"}),r.jsx("span",{className:"value",children:a.reception||"+27 15 589 0000"})]}),r.jsxs("div",{className:"contact-item-footer",children:[r.jsx("span",{className:"label",children:"Security & Emergency"}),r.jsx("span",{className:"value",children:a.security||"+27 15 589 1111"})]}),r.jsxs("div",{className:"contact-item-footer",children:[r.jsx("span",{className:"label",children:"Email Inquiry"}),r.jsx("span",{className:"value",children:a.email||"care@fiveeight9.co.za"})]}),r.jsx("div",{style:{marginTop:"0.5rem"},children:r.jsx("a",{href:"/maintenance",className:"cta-button",style:{padding:"0.8rem 1.8rem",fontSize:"0.75rem"},children:"LOG A TICKET"})})]})]}),r.jsxs("div",{className:"reveal",style:{animationDelay:"0.3s"},children:[r.jsx("h4",{className:"footer-title",children:"Join The Vibe"}),r.jsx("p",{style:{color:"var(--text-secondary)",fontSize:"0.85rem",marginBottom:"1.5rem",lineHeight:"1.6"},children:"Get updates on cafeteria specials, community events, and availability."}),r.jsxs("div",{style:{display:"flex",gap:"0.5rem"},children:[r.jsx("input",{type:"email",placeholder:"Email",style:{background:"rgba(255,255,255,0.03)",border:"1px solid var(--glass-border)",color:"var(--text-primary)",padding:"0.8rem 1rem",borderRadius:"8px",flex:1,fontSize:"0.8rem"}}),r.jsx("button",{style:{background:"var(--gold)",color:"var(--navy)",border:"none",padding:"0 1.2rem",borderRadius:"8px",fontWeight:900,fontSize:"0.7rem"},children:"JOIN"})]})]})]}),r.jsxs("div",{style:{marginTop:"6rem",paddingTop:"3rem",borderTop:"1px solid var(--glass-border)",textAlign:"center",color:"var(--text-secondary)",fontSize:"0.8rem",letterSpacing:"1px"},children:["© ",new Date().getFullYear()," FIVE EIGHT 9 STUDENT LOFTS. ALL RIGHTS RESERVED."]}),r.jsx("style",{children:`
                .footer-title { background: var(--gold-gradient); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; text-transform: uppercase; letter-spacing: 2px; font-weight: 900; font-size: 0.8rem; margin-bottom: 2rem; }
                .footer-link { color: var(--text-secondary); text-decoration: none; font-weight: 600; font-size: 0.95rem; transition: var(--transition-premium); }
                .footer-link:hover { color: var(--gold); transform: translateX(8px); }
                .contact-item-footer { display: flex; flex-direction: column; gap: 0.4rem; }
                .contact-item-footer .label { font-size: 0.75rem; color: var(--gold); font-weight: 800; text-transform: uppercase; letter-spacing: 1px; }
                .contact-item-footer .value { color: var(--text-primary); font-weight: 700; font-size: 1rem; letter-spacing: 0.5px; }
                .social-icon-footer { 
                    background: var(--glass-deep); border: 1px solid var(--glass-border); color: var(--text-primary);
                    width: 42px; height: 42px; border-radius: 12px; text-decoration: none; transition: var(--transition-premium);
                    display: flex; align-items: center; justify-content: center;
                }
                .social-icon-footer:hover { background: var(--gold-gradient); color: #000; transform: translateY(-5px) rotate(10deg); box-shadow: 0 10px 20px rgba(197, 160, 89, 0.2); }
            `})]})};export{yt as B,bt as F,ot as M,vt as N,Q as S,mt as U,pt as l};
