import '@astrojs/internal-helpers/path';
import '@astrojs/internal-helpers/remote';
import 'html-escaper';
import 'clsx';
import { N as NOOP_MIDDLEWARE_HEADER, h as decodeKey } from './chunks/astro/server_CeGasPdS.mjs';
import 'cookie';
import 'es-module-lexer';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///home/user/devmagic/www/","cacheDir":"file:///home/user/devmagic/www/node_modules/.astro/","outDir":"file:///home/user/devmagic/docs/","srcDir":"file:///home/user/devmagic/www/src/","publicDir":"file:///home/user/devmagic/www/public/","buildClientDir":"file:///home/user/devmagic/docs/client/","buildServerDir":"file:///home/user/devmagic/docs/server/","adapterName":"","routes":[{"file":"file:///home/user/devmagic/docs/about.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///home/user/devmagic/docs/changelog.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/changelog","isIndex":false,"type":"page","pattern":"^\\/changelog\\/?$","segments":[[{"content":"changelog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/changelog.astro","pathname":"/changelog","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///home/user/devmagic/docs/docs.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/docs","isIndex":false,"type":"page","pattern":"^\\/docs\\/?$","segments":[[{"content":"docs","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/docs.astro","pathname":"/docs","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///home/user/devmagic/docs/features.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/features","isIndex":false,"type":"page","pattern":"^\\/features\\/?$","segments":[[{"content":"features","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/features.astro","pathname":"/features","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///home/user/devmagic/docs/getting-started.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/getting-started","isIndex":false,"type":"page","pattern":"^\\/getting-started\\/?$","segments":[[{"content":"getting-started","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/getting-started.astro","pathname":"/getting-started","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///home/user/devmagic/docs/install","links":[],"scripts":[],"styles":[],"routeData":{"route":"/install","isIndex":false,"type":"endpoint","pattern":"^\\/install\\/?$","segments":[[{"content":"install","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/install.ts","pathname":"/install","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///home/user/devmagic/docs/showcase.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/showcase","isIndex":false,"type":"page","pattern":"^\\/showcase\\/?$","segments":[[{"content":"showcase","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/showcase.astro","pathname":"/showcase","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///home/user/devmagic/docs/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://devmagic.run","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/user/devmagic/www/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/home/user/devmagic/www/src/pages/changelog.astro",{"propagation":"none","containsHead":true}],["/home/user/devmagic/www/src/pages/docs.astro",{"propagation":"none","containsHead":true}],["/home/user/devmagic/www/src/pages/features.astro",{"propagation":"none","containsHead":true}],["/home/user/devmagic/www/src/pages/getting-started.astro",{"propagation":"none","containsHead":true}],["/home/user/devmagic/www/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/home/user/devmagic/www/src/pages/showcase.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/changelog@_@astro":"pages/changelog.astro.mjs","\u0000@astro-page:src/pages/docs@_@astro":"pages/docs.astro.mjs","\u0000@astro-page:src/pages/features@_@astro":"pages/features.astro.mjs","\u0000@astro-page:src/pages/getting-started@_@astro":"pages/getting-started.astro.mjs","\u0000@astro-page:src/pages/install@_@ts":"pages/install.astro.mjs","\u0000@astro-page:src/pages/setup-disabled/[[ref]]@_@ts":"pages/setup-disabled/__ref__.astro.mjs","\u0000@astro-page:src/pages/showcase@_@astro":"pages/showcase.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-manifest":"manifest_CQcii42i.mjs","/home/user/devmagic/www/src/pages/getting-started.astro?astro&type=script&index=0&lang.ts":"_astro/getting-started.astro_astro_type_script_index_0_lang.C1ZuG7cm.js","/home/user/devmagic/www/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts":"_astro/BaseLayout.astro_astro_type_script_index_0_lang.JDZ5VEtA.js","/home/user/devmagic/www/src/components/CodeBlock.astro?astro&type=script&index=0&lang.ts":"_astro/CodeBlock.astro_astro_type_script_index_0_lang.BgxZZvAk.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/home/user/devmagic/www/src/pages/getting-started.astro?astro&type=script&index=0&lang.ts","function s(){const r=document.querySelectorAll(\".tab-button\"),o=document.querySelectorAll(\".tab-content\");r.forEach(e=>{e.addEventListener(\"click\",()=>{const d=e.getAttribute(\"data-tab\");r.forEach(t=>{t.classList.remove(\"active\",\"border-primary\",\"text-foreground\"),t.classList.add(\"text-muted-foreground\")}),e.classList.add(\"active\",\"border-primary\",\"text-foreground\"),e.classList.remove(\"text-muted-foreground\"),o.forEach(t=>{t.getAttribute(\"data-content\")===d?t.classList.remove(\"hidden\"):t.classList.add(\"hidden\")})})});const a=r[0];a&&(a.classList.add(\"border-primary\",\"text-foreground\"),a.classList.remove(\"text-muted-foreground\"))}s();document.addEventListener(\"astro:page-load\",s);"],["/home/user/devmagic/www/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts","const o=document.getElementById(\"theme-toggle\"),c=document.getElementById(\"theme-toggle-dark-icon\"),d=document.getElementById(\"theme-toggle-light-icon\");function t(){const e=document.documentElement.classList.contains(\"dark\");c?.classList.toggle(\"hidden\",!e),d?.classList.toggle(\"hidden\",e)}t();o?.addEventListener(\"click\",()=>{const n=document.documentElement.classList.contains(\"dark\")?\"light\":\"dark\";document.documentElement.classList.remove(\"dark\",\"light\"),document.documentElement.classList.add(n),t()});document.addEventListener(\"astro:page-load\",()=>{t()});"],["/home/user/devmagic/www/src/components/CodeBlock.astro?astro&type=script&index=0&lang.ts","function r(){document.querySelectorAll(\"[data-copy-btn]\").forEach(t=>{t.addEventListener(\"click\",async()=>{const o=t.getAttribute(\"data-target\");if(!o)return;const n=document.getElementById(o);if(!n)return;const c=n.textContent||\"\";try{await navigator.clipboard.writeText(c);const e=t.innerHTML;t.innerHTML=`\n            <svg class=\"w-4 h-4\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n              <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M5 13l4 4L19 7\"></path>\n            </svg>\n          `,setTimeout(()=>{t.innerHTML=e},2e3)}catch(e){console.error(\"Failed to copy code:\",e)}})})}r();document.addEventListener(\"astro:page-load\",r);"]],"assets":["/file:///home/user/devmagic/docs/about.html","/file:///home/user/devmagic/docs/changelog.html","/file:///home/user/devmagic/docs/docs.html","/file:///home/user/devmagic/docs/features.html","/file:///home/user/devmagic/docs/getting-started.html","/file:///home/user/devmagic/docs/install","/file:///home/user/devmagic/docs/showcase.html","/file:///home/user/devmagic/docs/index.html"],"buildFormat":"file","checkOrigin":false,"allowedDomains":[],"serverIslandNameMap":[],"key":"Njqr6XUuWL1zs5I4RRpgS/83PU0KtgNSzq4eSMCLBN0="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
