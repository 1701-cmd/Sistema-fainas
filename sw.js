const CACHE_NAME = 'fainas-cache-v1';

const urlsToCache = [
  './',                    // cacheia a raiz (/)
  './index.html',
  './manifest.json',
  // seu arquivo principal de lógica (confirme o nome exato)
  // Se você tiver mais arquivos, adicione aqui (exemplos):
  // './css/style.css',                // se tiver pasta css/
  // './js/localforage.min.js',        // se baixou a lib localmente
  // './js/jspdf.umd.min.js',          // se baixou jsPDF localmente
  // Qualquer outro JS, CSS, imagem ou fonte que o app carrega
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto com sucesso');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Erro ao cachear arquivos:', error);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Se estiver no cache → usa o cache (funciona offline)
        if (response) {
          return response;
        }
        // Senão tenta buscar na rede
        return fetch(event.request);
      })
      .catch(error => {
        console.error('Erro no fetch:', error);
      })
  );