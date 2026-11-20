// Super Clean offline support: network first, cached copy when there is no internet.
// Bump CACHE on every change so phones pick up the new version.
const CACHE='superclean-v1';
const FILES=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-180.png'];
const CDN=['https://www.gstatic.com/firebasejs/','https://cdnjs.cloudflare.com/','https://fonts.googleapis.com/','https://fonts.gstatic.com/'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('superclean-')&&k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=e.request.url,mine=new URL(u).origin===location.origin&&new URL(u).pathname.startsWith(new URL(self.registration.scope).pathname),cdn=CDN.some(p=>u.startsWith(p));
  if(!mine&&!cdn)return;
  e.respondWith(fetch(e.request).then(r=>{if(r.ok||r.type==='opaque'){const c=r.clone();caches.open(CACHE).then(x=>x.put(e.request,c))}return r})
    .catch(()=>caches.match(e.request).then(r=>r||(mine?caches.match('./index.html'):Response.error()))));
});
