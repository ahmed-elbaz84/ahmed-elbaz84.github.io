// Super Clean offline support: always try the network first (bypassing the browser cache),
// fall back to the saved copy when there is no internet.
// Bump CACHE on every change so phones pick up the new version.
const CACHE='superclean-v20';
const FILES=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-180.png'];
const CDN=['https://www.gstatic.com/firebasejs/','https://cdnjs.cloudflare.com/','https://fonts.googleapis.com/','https://fonts.gstatic.com/'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES.map(f=>new Request(f,{cache:'reload'})))));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('superclean-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const url=new URL(e.request.url),scope=new URL(self.registration.scope).pathname;
  const mine=url.origin===location.origin&&url.pathname.startsWith(scope),cdn=CDN.some(p=>e.request.url.startsWith(p));
  if(!mine&&!cdn)return;
  const net=mine?fetch(e.request,{cache:'no-cache'}):fetch(e.request);
  e.respondWith(net.then(r=>{if(r.ok||r.type==='opaque'){const c=r.clone();caches.open(CACHE).then(x=>x.put(e.request,c))}return r})
    .catch(()=>caches.match(e.request,{ignoreSearch:mine}).then(r=>r||(mine?caches.match('./index.html'):Response.error()))));
});
