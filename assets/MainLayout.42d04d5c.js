import{j as Z,k as q,r as k,l as fe,c as v,w as C,m as he,n as pe,h as S,i as me,g as ee,p as te,q as we,s as N,t as _e,u as K,v as $,a as ge,x as Le,y as ke,_ as ve,z as be,A as Se,B as L,C as z,D as d,f as s,E as V,G as R,H as g,I as Ce,Q as D,J as E,K as M,F as G,L as xe,M as X,N as Be,O as ze,P as Qe}from"./index.8ba200c1.js";import{Q as Y,a as Ve,b as F,c as oe,d as ae,C as Re,e as ie,f as H,g as P,h as Ae,i as Oe,j as Te,k as $e,l as qe,B as U,m as je,n as De,o as Ie,p as Fe}from"./QDrawer.e04f5faf.js";import{Q as He}from"./QHeader.b12ef4eb.js";import{u as Pe,a as Ee,b as Me}from"./bus-service.c5b1945d.js";import{u as le}from"./vue-i18n.runtime.esm-bundler.32596a90.js";import"./axios.68b57ba8.js";var Ue=Z({name:"QFooter",props:{modelValue:{type:Boolean,default:!0},reveal:Boolean,bordered:Boolean,elevated:Boolean,heightHint:{type:[String,Number],default:50}},emits:["reveal","focusin"],setup(e,{slots:a,emit:o}){const{proxy:{$q:t}}=ee(),l=me(te,q);if(l===q)return console.error("QFooter needs to be child of QLayout"),q;const n=k(parseInt(e.heightHint,10)),u=k(!0),f=k(fe.value===!0||l.isContainer.value===!0?0:window.innerHeight),h=v(()=>e.reveal===!0||l.view.value.indexOf("F")>-1||t.platform.is.ios&&l.isContainer.value===!0),c=v(()=>l.isContainer.value===!0?l.containerHeight.value:f.value),b=v(()=>{if(e.modelValue!==!0)return 0;if(h.value===!0)return u.value===!0?n.value:0;const i=l.scroll.value.position+c.value+n.value-l.height.value;return i>0?i:0}),m=v(()=>e.modelValue!==!0||h.value===!0&&u.value!==!0),A=v(()=>e.modelValue===!0&&m.value===!0&&e.reveal===!0),Q=v(()=>"q-footer q-layout__section--marginal "+(h.value===!0?"fixed":"absolute")+"-bottom"+(e.bordered===!0?" q-footer--bordered":"")+(m.value===!0?" q-footer--hidden":"")+(e.modelValue!==!0?" q-layout--prevent-focus"+(h.value!==!0?" hidden":""):"")),O=v(()=>{const i=l.rows.value.bottom,p={};return i[0]==="l"&&l.left.space===!0&&(p[t.lang.rtl===!0?"right":"left"]=`${l.left.size}px`),i[2]==="r"&&l.right.space===!0&&(p[t.lang.rtl===!0?"left":"right"]=`${l.right.size}px`),p});function w(i,p){l.update("footer",i,p)}function _(i,p){i.value!==p&&(i.value=p)}function T({height:i}){_(n,i),w("size",i)}function x(){if(e.reveal!==!0)return;const{direction:i,position:p,inflectionPoint:B}=l.scroll.value;_(u,i==="up"||p-B<100||l.height.value-c.value-p-n.value<300)}function y(i){A.value===!0&&_(u,!0),o("focusin",i)}C(()=>e.modelValue,i=>{w("space",i),_(u,!0),l.animate()}),C(b,i=>{w("offset",i)}),C(()=>e.reveal,i=>{i===!1&&_(u,e.modelValue)}),C(u,i=>{l.animate(),o("reveal",i)}),C([n,l.scroll,l.height],x),C(()=>t.screen.height,i=>{l.isContainer.value!==!0&&_(f,i)});const r={};return l.instances.footer=r,e.modelValue===!0&&w("size",n.value),w("space",e.modelValue),w("offset",b.value),he(()=>{l.instances.footer===r&&(l.instances.footer=void 0,w("size",0),w("offset",0),w("space",!1))}),()=>{const i=pe(a.default,[S(Y,{debounce:0,onResize:T})]);return e.elevated===!0&&i.push(S("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),S("footer",{class:Q.value,style:O.value,onFocusin:y},i)}}}),Ne=Z({name:"QPageContainer",setup(e,{slots:a}){const{proxy:{$q:o}}=ee(),t=me(te,q);if(t===q)return console.error("QPageContainer needs to be child of QLayout"),q;N(_e,!0);const l=v(()=>{const n={};return t.header.space===!0&&(n.paddingTop=`${t.header.size}px`),t.right.space===!0&&(n[`padding${o.lang.rtl===!0?"Left":"Right"}`]=`${t.right.size}px`),t.footer.space===!0&&(n.paddingBottom=`${t.footer.size}px`),t.left.space===!0&&(n[`padding${o.lang.rtl===!0?"Right":"Left"}`]=`${t.left.size}px`),n});return()=>S("div",{class:"q-page-container",style:l.value},we(a.default))}}),We=Z({name:"QLayout",props:{container:Boolean,view:{type:String,default:"hhh lpr fff",validator:e=>/^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(e.toLowerCase())},onScroll:Function,onScrollHeight:Function,onResize:Function},setup(e,{slots:a,emit:o}){const{proxy:{$q:t}}=ee(),l=k(null),n=k(t.screen.height),u=k(e.container===!0?0:t.screen.width),f=k({position:0,direction:"down",inflectionPoint:0}),h=k(0),c=k(fe.value===!0?0:K()),b=v(()=>"q-layout q-layout--"+(e.container===!0?"containerized":"standard")),m=v(()=>e.container===!1?{minHeight:t.screen.height+"px"}:null),A=v(()=>c.value!==0?{[t.lang.rtl===!0?"left":"right"]:`${c.value}px`}:null),Q=v(()=>c.value!==0?{[t.lang.rtl===!0?"right":"left"]:0,[t.lang.rtl===!0?"left":"right"]:`-${c.value}px`,width:`calc(100% + ${c.value}px)`}:null);function O(r){if(e.container===!0||document.qScrollPrevented!==!0){const i={position:r.position.top,direction:r.direction,directionChanged:r.directionChanged,inflectionPoint:r.inflectionPoint.top,delta:r.delta.top};f.value=i,e.onScroll!==void 0&&o("scroll",i)}}function w(r){const{height:i,width:p}=r;let B=!1;n.value!==i&&(B=!0,n.value=i,e.onScrollHeight!==void 0&&o("scrollHeight",i),T()),u.value!==p&&(B=!0,u.value=p),B===!0&&e.onResize!==void 0&&o("resize",r)}function _({height:r}){h.value!==r&&(h.value=r,T())}function T(){if(e.container===!0){const r=n.value>h.value?K():0;c.value!==r&&(c.value=r)}}let x;const y={instances:{},view:v(()=>e.view),isContainer:v(()=>e.container),rootRef:l,height:n,containerHeight:h,scrollbarWidth:c,totalWidth:v(()=>u.value+c.value),rows:v(()=>{const r=e.view.toLowerCase().split(" ");return{top:r[0].split(""),middle:r[1].split(""),bottom:r[2].split("")}}),header:$({size:0,offset:0,space:!1}),right:$({size:300,offset:0,space:!1}),footer:$({size:0,offset:0,space:!1}),left:$({size:300,offset:0,space:!1}),scroll:f,animate(){x!==void 0?clearTimeout(x):document.body.classList.add("q-body--layout-animate"),x=setTimeout(()=>{document.body.classList.remove("q-body--layout-animate"),x=void 0},155)},update(r,i,p){y[r][i]=p}};if(N(te,y),K()>0){let p=function(){r=null,i.classList.remove("hide-scrollbar")},B=function(){if(r===null){if(i.scrollHeight>t.screen.height)return;i.classList.add("hide-scrollbar")}else clearTimeout(r);r=setTimeout(p,300)},W=function(ne){r!==null&&ne==="remove"&&(clearTimeout(r),p()),window[`${ne}EventListener`]("resize",B)},r=null;const i=document.body;C(()=>e.container!==!0?"add":"remove",W),e.container!==!0&&W("add"),ge(()=>{W("remove")})}return()=>{const r=pe(a.default,[S(Ve,{onScroll:O}),S(Y,{onResize:w})]),i=S("div",{class:b.value,style:m.value,ref:e.container===!0?void 0:l,tabindex:-1},r);return e.container===!0?S("div",{class:"q-layout-container overflow-hidden",ref:l},[S(Y,{onResize:_}),S("div",{class:"absolute-full",style:A.value},[S("div",{class:"scroll",style:Q.value},[i])])]):i}}});const Ke=Object.prototype.toString,J=Object.prototype.hasOwnProperty,Ge=new Set(["Boolean","Number","String","Function","Array","Date","RegExp"].map(e=>"[object "+e+"]"));function re(e){if(e!==Object(e)||Ge.has(Ke.call(e))===!0||e.constructor&&J.call(e,"constructor")===!1&&J.call(e.constructor.prototype,"isPrototypeOf")===!1)return!1;let a;for(a in e);return a===void 0||J.call(e,a)}function ye(){let e,a,o,t,l,n,u=arguments[0]||{},f=1,h=!1;const c=arguments.length;for(typeof u=="boolean"&&(h=u,u=arguments[1]||{},f=2),Object(u)!==u&&typeof u!="function"&&(u={}),c===f&&(u=this,f--);f<c;f++)if((e=arguments[f])!==null)for(a in e)o=u[a],t=e[a],u!==t&&(h===!0&&t&&((l=Array.isArray(t))||re(t)===!0)?(l===!0?n=Array.isArray(o)===!0?o:[]:n=re(o)===!0?o:{},u[a]=ye(h,n,t)):t!==void 0&&(u[a]=t));return u}let ue,se;const I=[];function Je(e){e.title&&(e.title=e.titleTemplate?e.titleTemplate(e.title):e.title,delete e.titleTemplate),[["meta","content"],["link","href"]].forEach(a=>{const o=e[a[0]],t=a[1];for(const l in o){const n=o[l];n.template&&(Object.keys(n).length===1?delete o[l]:(n[t]=n.template(n[t]||""),delete n.template))}})}function Xe(e,a){if(Object.keys(e).length!==Object.keys(a).length)return!0;for(const o in e)if(e[o]!==a[o])return!0}function ce(e){return["class","style"].includes(e)===!1}function de(e){return["lang","dir"].includes(e)===!1}function Ye(e,a){const o={},t={};return e===void 0?{add:a,remove:t}:(e.title!==a.title&&(o.title=a.title),["meta","link","script","htmlAttr","bodyAttr"].forEach(l=>{const n=e[l],u=a[l];if(t[l]=[],n==null){o[l]=u;return}o[l]={};for(const f in n)u.hasOwnProperty(f)===!1&&t[l].push(f);for(const f in u)n.hasOwnProperty(f)===!1?o[l][f]=u[f]:Xe(n[f],u[f])===!0&&(t[l].push(f),o[l][f]=u[f])}),{add:o,remove:t})}function Ze({add:e,remove:a}){e.title&&(document.title=e.title),Object.keys(a).length>0&&(["meta","link","script"].forEach(o=>{a[o].forEach(t=>{document.head.querySelector(`${o}[data-qmeta="${t}"]`).remove()})}),a.htmlAttr.filter(de).forEach(o=>{document.documentElement.removeAttribute(o)}),a.bodyAttr.filter(ce).forEach(o=>{document.body.removeAttribute(o)})),["meta","link","script"].forEach(o=>{const t=e[o];for(const l in t){const n=document.createElement(o);for(const u in t[l])u!=="innerHTML"&&n.setAttribute(u,t[l][u]);n.setAttribute("data-qmeta",l),o==="script"&&(n.innerHTML=t[l].innerHTML||""),document.head.appendChild(n)}}),Object.keys(e.htmlAttr).filter(de).forEach(o=>{document.documentElement.setAttribute(o,e.htmlAttr[o]||"")}),Object.keys(e.bodyAttr).filter(ce).forEach(o=>{document.body.setAttribute(o,e.bodyAttr[o]||"")})}function et(){const e={title:"",titleTemplate:null,meta:{},link:{},script:{},htmlAttr:{},bodyAttr:{}};for(let a=0;a<I.length;a++){const{active:o,val:t}=I[a];o===!0&&ye(!0,e,t)}Je(e),Ze(Ye(se,e)),se=e}function j(){clearTimeout(ue),ue=setTimeout(et,50)}function tt(e){{const a={active:!0};if(typeof e=="function"){const o=v(e);a.val=o.value,C(o,t=>{a.val=t,a.active===!0&&j()})}else a.val=e;I.push(a),j(),Le(()=>{a.active=!0,j()}),ke(()=>{a.active=!1,j()}),ge(()=>{I.splice(I.indexOf(a),1),j()})}}const ot={__name:"AboutDialog",props:{modelValue:{type:Boolean,default:!1}},emits:["update:modelValue"],setup(e){const a=be(),o=Se(),{t,locale:l}=le({useScope:"global"}),n=$({language:{icon:"translate",label:"dialog.about.setting.language.label",value:v({get:()=>{var c;return((c=a.params)==null?void 0:c.lang)==="tc"?"zh-TW":"en-US"},set:c=>null}),options:[{label:"\u7E41\u9AD4\u4E2D\u6587",value:"zh-TW"},{label:"English",value:"en-US"}]}}),u="dialog.about.title",f=[{icon:"flag",label:"dialog.about.project.purpose.label",caption:"dialog.about.project.purpose.caption"},{icon:"volunteer_activism",label:"dialog.about.project.about.label",caption:"dialog.about.project.about.caption"},{icon:"account_tree",label:"dialog.about.project.dataSource.label",caption:"dialog.about.project.dataSource.caption"},{icon:"lock",label:"dialog.about.project.dataOwnership.label",caption:"dialog.about.project.dataOwnership.caption"},{icon:"info",label:"dialog.about.project.version.label",caption:"dialog.about.project.version.caption"},{name:"bugReport",icon:"bug_report",label:"dialog.about.project.suggestionsOrBugReport.label",caption:"dialog.about.project.suggestionsOrBugReport.caption"},{name:"createdBy",imgSrc:"https://github.com/codinglau.png",label:"dialog.about.project.createdBy.label",caption:"dialog.about.project.createdBy.caption"}];function h(c){l.value=c,o.push({name:a.name,params:{...a.params,lang:c==="zh-TW"?"tc":"en"},query:{...a.query}})}return(c,b)=>(L(),z($e,{persistent:"","model-value":e.modelValue,"onUpdate:modelValue":b[1]||(b[1]=m=>c.$emit("update:modelValue",m))},{default:d(()=>[s(F,{class:"dialog relative-position"},{default:d(()=>[s(oe,{class:"toolbar bg-primary text-white justify-between"},{default:d(()=>[s(ae,null,{default:d(()=>[V(R(g(t)(u)),1)]),_:1}),Ce(s(D,{flat:"",round:"",dense:"",icon:"close","aria-label":"Close"},null,512),[[Re]])]),_:1}),s(F,{flat:"",bordered:""},{default:d(()=>[s(ie,null,{default:d(()=>[s(H,{avatar:""},{default:d(()=>[s(E,{icon:n.language.icon,"text-color":"primary"},null,8,["icon"])]),_:1}),s(H,null,{default:d(()=>[s(P,{caption:""},{default:d(()=>[V(R(g(t)(n.language.label)),1)]),_:1}),s(P,null,{default:d(()=>[s(F,{flat:"",bordered:""},{default:d(()=>[s(Ae,{spread:"",unelevated:"","no-caps":"",modelValue:n.language.value,"onUpdate:modelValue":[b[0]||(b[0]=m=>n.language.value=m),h],options:n.language.options,"toggle-color":"primary"},null,8,["modelValue","options"])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),s(F,{flat:"",bordered:""},{default:d(()=>[s(Oe,{separator:""},{default:d(()=>[(L(),M(G,null,xe(f,m=>s(ie,{key:m.caption},{default:d(()=>[s(H,{avatar:""},{default:d(()=>[m.icon?(L(),z(E,{key:0,icon:m.icon,"text-color":"primary"},null,8,["icon"])):m.imgSrc?(L(),z(E,{key:1},{default:d(()=>[s(Te,{src:m.imgSrc},null,8,["src"])]),_:2},1024)):X("",!0)]),_:2},1024),s(H,null,{default:d(()=>[s(P,{caption:""},{default:d(()=>[V(R(g(t)(m.caption)),1)]),_:2},1024),s(P,null,{default:d(()=>[["bugReport","createdBy"].includes(m.name)?(L(),M(G,{key:0},[V(R(g(t)(m.label,{account:"codinglau",domain:"gmail.com"})),1)],64)):(L(),M(G,{key:1},[V(R(g(t)(m.label)),1)],64))]),_:2},1024)]),_:2},1024)]),_:2},1024)),64))]),_:1})]),_:1})]),_:1})]),_:1},8,["model-value"]))}};var at=ve(ot,[["__scopeId","data-v-5b829456"]]),lt={AboutDialog:at};const nt={key:2,class:"flex flex-center"},it={__name:"DesktopDrawer",props:{modelValue:{type:Boolean,required:!0},companyList:{type:Array,default:()=>[],required:!0},routeList:{type:Array,default:()=>[],required:!0},loading:{type:Boolean,default:!1,required:!0}},emits:["update:modelValue","on-dialog-open"],setup(e){const a=e,{t:o}=le(),t="layout.drawer.title",l="layout.tooltip.about",n=$({value:"",placeholder:"layout.drawer.search"}),u=v(()=>{let c=[];return n.value?c=a.routeList.filter(b=>[b.id,b.origin,b.destination].join(" ").toUpperCase().includes(n.value.toUpperCase())):c=a.routeList.slice(),c}),f=v(()=>u.value.length>0),h="layout.drawer.noData";return(c,b)=>(L(),z(Fe,{"show-if-above":"",bordered:"","model-value":e.modelValue,"onUpdate:modelValue":b[2]||(b[2]=m=>c.$emit("update:modelValue",m)),class:"drawer no-scroll"},{default:d(()=>[s(oe,{class:"bg-primary text-white"},{default:d(()=>[s(E,{icon:"fa-solid fa-bus"}),s(ae,null,{default:d(()=>[V(R(g(o)(t)),1)]),_:1}),s(D,{flat:"",round:"",dense:"",icon:"fa-solid fa-gear","aria-label":g(o)(l),onClick:b[0]||(b[0]=m=>c.$emit("on-dialog-open"))},{default:d(()=>[s(qe,null,{default:d(()=>[V(R(g(o)(l)),1)]),_:1})]),_:1},8,["aria-label"])]),_:1}),s(g(U).CompanyTabs,{"outside-arrows":"",class:"bg-grey-2",options:e.companyList},null,8,["options"]),s(je,{dense:"",clearable:"",modelValue:n.value,"onUpdate:modelValue":b[1]||(b[1]=m=>n.value=m),modelModifiers:{trim:!0},"clear-icon":"close",debounce:"300",placeholder:g(o)(n.placeholder)},{prepend:d(()=>[s(Be,{name:"search"})]),_:1},8,["modelValue","placeholder"]),s(De,{class:"drawer__content"},{default:d(()=>[e.loading?(L(),z(g(U).RouteListSkeleton,{key:0})):g(f)?(L(),z(g(U).RouteList,{key:1,options:g(u)},null,8,["options"])):(L(),M("div",nt,[s(Ie,{square:"",color:"transparent",icon:"warning","text-color":"primary",label:g(o)(h)},null,8,["label"])]))]),_:1})]),_:1},8,["model-value"]))}};var rt={DesktopDrawer:it};function ut(){return{busCompanies:[{value:"kmb",label:"constant.busCompany.kmb_lwb",color:"red-5",imgSrc:"https://upload.wikimedia.org/wikipedia/zh/thumb/3/3a/KMB_logo_%282016%29.svg/1200px-KMB_logo_%282016%29.svg.png"},{value:"nwfb",label:"constant.busCompany.nwfb",color:"yellow-7",imgSrc:"https://upload.wikimedia.org/wikipedia/zh/thumb/d/d1/New_World_First_Bus.svg/200px-New_World_First_Bus.svg.png"},{value:"ctb",label:"constant.busCompany.ctb",color:"teal",imgSrc:"https://upload.wikimedia.org/wikipedia/zh/thumb/9/95/Citybus.svg/177px-Citybus.svg.png"},{value:"nlb",label:"constant.busCompany.nlb",color:"light-green",imgSrc:"https://upload.wikimedia.org/wikipedia/zh/thumb/5/51/New_Lantao_Bus_Logo_%282019%29.svg/82px-New_Lantao_Bus_Logo_%282019%29.svg.png"}],regions:[{value:"hk",label:"\u9999\u6E2F"}]}}const st={__name:"MainLayout",props:{lang:{type:String,default:"tc",required:!0},companyId:{type:String,default:"kmb"}},setup(e){const a=e,o=Me(),t=be(),{t:l}=le(),n=ut(),{fetch:u,loadingRouteList:f}=Pe(["loadingRouteList"]),{getBusRouteList:h}=Ee(),c=k(!1);function b(){c.value=!c.value}const m=k([]),A=v(()=>m.value.map(y=>({...y,origin:y.origin[a.lang],destination:y.destination[a.lang]})));N("routeList",A),N("loadingRouteList",f);function Q(y){u(h,{companyId:y},{config:{loadingScope:"loadingRouteList"},onSuccess(r){m.value=r.map(i=>{let p=n.busCompanies.find(B=>B.value===y);return{...i,company:p.label,color:p.color}})}})}const O=v(()=>{let y=n.busCompanies.map(r=>({...r,to:{name:"bus.routeList",params:{companyId:r.value}}}));return t.name==="bus.routeStopList"&&o.screen.lt.md&&(y=y.filter(r=>r.value===a.companyId)),y}),w=v(()=>{let y=null;return t.name==="bus.routeStopList"&&(y={name:"bus.routeList",params:{lang:t.params.lang,companyId:t.params.companyId}}),{show:t.name==="bus.routeStopList",to:y}}),_=k(!1),T="layout.tooltip.about",x="layout.header.title";return tt(()=>({title:l(x)})),C(()=>a.companyId,()=>{setTimeout(()=>{Q(a.companyId)},300)}),C(()=>o.screen.gt.sm,y=>{(!y&&t.name==="bus.routeList"||y)&&Q(a.companyId)}),ze(()=>{Q(a.companyId)}),(y,r)=>{const i=Qe("router-view");return L(),z(We,{view:"lHh Lpr lFf"},{default:d(()=>[s(He,{class:"gt-sm"},{default:d(()=>[s(oe,null,{default:d(()=>[s(D,{flat:"",dense:"",round:"",icon:"menu","aria-label":"Menu",onClick:b}),s(ae,null,{default:d(()=>[V(R(g(l)(x)),1)]),_:1})]),_:1})]),_:1}),s(Ue,{bordered:"",class:"lt-md bg-transparent text-dark"},{default:d(()=>[s(g(U).CompanyTabs,{"outside-arrows":"","switch-indicator":"",class:"bg-primary text-white lt-md","active-bg-color":"primary","indicator-color":"white",options:g(O)},{prepend:d(()=>[s(D,{unelevated:"",stretch:"",icon:"fa-solid fa-gear","aria-label":g(l)(T),onClick:r[0]||(r[0]=p=>_.value=!0)},null,8,["aria-label"])]),append:d(()=>[g(w).show?(L(),z(D,{key:0,unelevated:"",stretch:"",icon:"reply",to:g(w).to},null,8,["to"])):X("",!0)]),_:1},8,["options"])]),_:1}),g(o).screen.gt.sm?(L(),z(g(rt).DesktopDrawer,{key:0,modelValue:c.value,"onUpdate:modelValue":r[1]||(r[1]=p=>c.value=p),loading:g(f),"company-list":g(O),"route-list":g(A),onOnDialogOpen:r[2]||(r[2]=p=>_.value=!0)},null,8,["modelValue","loading","company-list","route-list"])):X("",!0),s(Ne,null,{default:d(()=>[s(i)]),_:1}),s(g(lt).AboutDialog,{modelValue:_.value,"onUpdate:modelValue":r[3]||(r[3]=p=>_.value=p)},null,8,["modelValue"])]),_:1})}}};var vt=ve(st,[["__scopeId","data-v-60b23fb8"]]);export{vt as default};
