import{r as S,a as x}from"./vendor-Gm9i_4Ku.js";var $={exports:{}},E={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var P=S,g=Symbol.for("react.element"),L=Symbol.for("react.fragment"),D=Object.prototype.hasOwnProperty,V=P.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,C={key:!0,ref:!0,__self:!0,__source:!0};function j(r,e,o){var u,t={},s=null,n=null;o!==void 0&&(s=""+o),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(n=e.ref);for(u in e)D.call(e,u)&&!C.hasOwnProperty(u)&&(t[u]=e[u]);if(r&&r.defaultProps)for(u in e=r.defaultProps,e)t[u]===void 0&&(t[u]=e[u]);return{$$typeof:g,type:r,key:s,ref:n,props:t,_owner:V.current}}E.Fragment=L;E.jsx=j;E.jsxs=j;$.exports=E;var ne=$.exports,R={},b=x;R.createRoot=b.createRoot,R.hydrateRoot=b.hydrateRoot;const I="modulepreload",U=function(r){return"/echo/"+r},w={},oe=function(e,o,u){let t=Promise.resolve();if(o&&o.length>0){document.getElementsByTagName("link");const n=document.querySelector("meta[property=csp-nonce]"),a=(n==null?void 0:n.nonce)||(n==null?void 0:n.getAttribute("nonce"));t=Promise.allSettled(o.map(c=>{if(c=U(c),c in w)return;w[c]=!0;const l=c.endsWith(".css"),d=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${d}`))return;const i=document.createElement("link");if(i.rel=l?"stylesheet":I,l||(i.as="script"),i.crossOrigin="",i.href=c,a&&i.setAttribute("nonce",a),document.head.appendChild(i),l)return new Promise((y,f)=>{i.addEventListener("load",y),i.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${c}`)))})}))}function s(n){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=n,window.dispatchEvent(a),!a.defaultPrevented)throw n}return t.then(n=>{for(const a of n||[])a.status==="rejected"&&s(a.reason);return e().catch(s)})};var O={exports:{}},k={};/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var v=S;function T(r,e){return r===e&&(r!==0||1/r===1/e)||r!==r&&e!==e}var z=typeof Object.is=="function"?Object.is:T,A=v.useState,W=v.useEffect,B=v.useLayoutEffect,F=v.useDebugValue;function G(r,e){var o=e(),u=A({inst:{value:o,getSnapshot:e}}),t=u[0].inst,s=u[1];return B(function(){t.value=o,t.getSnapshot=e,h(t)&&s({inst:t})},[r,o,e]),W(function(){return h(t)&&s({inst:t}),r(function(){h(t)&&s({inst:t})})},[r]),F(o),o}function h(r){var e=r.getSnapshot;r=r.value;try{var o=e();return!z(r,o)}catch{return!0}}function N(r,e){return e()}var J=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?N:G;k.useSyncExternalStore=v.useSyncExternalStore!==void 0?v.useSyncExternalStore:J;O.exports=k;var Y=O.exports,H={};/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var p=S,K=Y;function M(r,e){return r===e&&(r!==0||1/r===1/e)||r!==r&&e!==e}var Q=typeof Object.is=="function"?Object.is:M,X=K.useSyncExternalStore,Z=p.useRef,q=p.useEffect,ee=p.useMemo,re=p.useDebugValue;H.useSyncExternalStoreWithSelector=function(r,e,o,u,t){var s=Z(null);if(s.current===null){var n={hasValue:!1,value:null};s.current=n}else n=s.current;s=ee(function(){function c(f){if(!l){if(l=!0,d=f,f=u(f),t!==void 0&&n.hasValue){var m=n.value;if(t(m,f))return i=m}return i=f}if(m=i,Q(d,f))return m;var _=u(f);return t!==void 0&&t(m,_)?(d=f,m):(d=f,i=_)}var l=!1,d,i,y=o===void 0?null:o;return[function(){return c(e())},y===null?void 0:function(){return c(y())}]},[e,o,u,t]);var a=X(r,s[0],s[1]);return q(function(){n.hasValue=!0,n.value=a},[a]),re(a),a};export{oe as _,R as c,ne as j};
//# sourceMappingURL=three-DDZVJ5Na.js.map
