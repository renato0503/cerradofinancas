# pwa-converter

## Description
Converte o EloEleitoral em uma Progressive Web App (PWA) com suporte offline, notifications push e install prompt.

## Instructions

### 1. Arquivos Necessários

#### manifest.json
```json
{
  "name": "EloEleitoral - Gabinete Digital",
  "short_name": "EloEleitoral",
  "description": "Plataforma de gestão de demandas cidadãs",
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#F7FAFC",
  "theme_color": "#1A365D",
  "icons": [
    { "src": "assets/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "assets/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

#### Service Worker (sw.js)
```javascript
const CACHE_NAME = 'elo-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/painel.html',
  '/css/global.css',
  '/js/modules/storage.js',
  // ... outros arquivos críticos
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
      .then(response => response || fetch(e.request))
  );
});
```

### 2. Implementação

1. **Criar manifest.json** em `/assets/manifest.json`
2. **Criar service worker** em `/sw.js`
3. **Registrar SW** em cada página:
```javascript
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
```
4. **Adicionar meta tags** no `<head>` de cada HTML:
```html
<meta name="theme-color" content="#1A365D">
<link rel="manifest" href="/assets/manifest.json">
```
5. **Criar ícones** em `/assets/` (192x192 e 512x512)

### 3. Funcionalidades Offline

```javascript
// js/modules/offline-manager.js
export const OfflineManager = {
  salvarParaSync: (dado) => {
    const pendentes = JSON.parse(localStorage.getItem('sync_pendente') || '[]');
    pendentes.push({ ...dado, timestamp: Date.now() });
    localStorage.setItem('sync_pendente', JSON.stringify(pendentes));
  },
  
  syncQuandoOnline: async () => {
    const pendentes = JSON.parse(localStorage.getItem('sync_pendente') || '[]');
    for (const item of pendentes) {
      await DB.salvar(item);
    }
    localStorage.removeItem('sync_pendente');
  }
};
```

### 4. Notificações Push

```javascript
// js/modules/notifications.js
export async function solicitarPermissaoNotificacoes() {
  if ('Notification' in window && Notification.permission === 'default') {
    await Notification.requestPermission();
  }
}

export function notificarNovaDemanda(demanda) {
  if (Notification.permission === 'granted') {
    new Notification('Nova Demanda!', {
      body: `${demanda.nome}: ${demanda.mensagem.substring(0, 50)}...`,
      icon: '/assets/icon-192.png',
      tag: demanda.id
    });
  }
}
```

## Checklist PWA

- [ ] manifest.json criado
- [ ] Service Worker implementado
- [ ] Ícones gerados (192px e 512px)
- [ ] Meta tags adicionadas
- [ ] SW registrado
- [ ] Testar offline
- [ ] Testar install prompt

## Triggers

- "pwa"
- "offline"
- "service worker"
- "notifications"
- "instalar como app"
