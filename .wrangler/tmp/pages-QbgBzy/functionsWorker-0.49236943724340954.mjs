var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ../.wrangler/tmp/bundle-ekkau6/strip-cf-connecting-ip-header.js
function stripCfConnectingIPHeader(input, init) {
  const request = new Request(input, init);
  request.headers.delete("CF-Connecting-IP");
  return request;
}
__name(stripCfConnectingIPHeader, "stripCfConnectingIPHeader");
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    return Reflect.apply(target, thisArg, [
      stripCfConnectingIPHeader.apply(null, argArray)
    ]);
  }
});

// ../node_modules/hono/dist/compose.js
var compose = /* @__PURE__ */ __name((middleware, onError, onNotFound) => {
  return (context, next) => {
    let index = -1;
    return dispatch(0);
    async function dispatch(i) {
      if (i <= index) {
        throw new Error("next() called multiple times");
      }
      index = i;
      let res;
      let isError = false;
      let handler;
      if (middleware[i]) {
        handler = middleware[i][0][0];
        context.req.routeIndex = i;
      } else {
        handler = i === middleware.length && next || void 0;
      }
      if (handler) {
        try {
          res = await handler(context, () => dispatch(i + 1));
        } catch (err) {
          if (err instanceof Error && onError) {
            context.error = err;
            res = await onError(err, context);
            isError = true;
          } else {
            throw err;
          }
        }
      } else {
        if (context.finalized === false && onNotFound) {
          res = await onNotFound(context);
        }
      }
      if (res && (context.finalized === false || isError)) {
        context.res = res;
      }
      return context;
    }
    __name(dispatch, "dispatch");
  };
}, "compose");

// ../node_modules/hono/dist/request/constants.js
var GET_MATCH_RESULT = Symbol();

// ../node_modules/hono/dist/utils/body.js
var parseBody = /* @__PURE__ */ __name(async (request, options = /* @__PURE__ */ Object.create(null)) => {
  const { all = false, dot = false } = options;
  const headers = request instanceof HonoRequest ? request.raw.headers : request.headers;
  const contentType = headers.get("Content-Type");
  if (contentType?.startsWith("multipart/form-data") || contentType?.startsWith("application/x-www-form-urlencoded")) {
    return parseFormData(request, { all, dot });
  }
  return {};
}, "parseBody");
async function parseFormData(request, options) {
  const formData = await request.formData();
  if (formData) {
    return convertFormDataToBodyData(formData, options);
  }
  return {};
}
__name(parseFormData, "parseFormData");
function convertFormDataToBodyData(formData, options) {
  const form = /* @__PURE__ */ Object.create(null);
  formData.forEach((value, key) => {
    const shouldParseAllValues = options.all || key.endsWith("[]");
    if (!shouldParseAllValues) {
      form[key] = value;
    } else {
      handleParsingAllValues(form, key, value);
    }
  });
  if (options.dot) {
    Object.entries(form).forEach(([key, value]) => {
      const shouldParseDotValues = key.includes(".");
      if (shouldParseDotValues) {
        handleParsingNestedValues(form, key, value);
        delete form[key];
      }
    });
  }
  return form;
}
__name(convertFormDataToBodyData, "convertFormDataToBodyData");
var handleParsingAllValues = /* @__PURE__ */ __name((form, key, value) => {
  if (form[key] !== void 0) {
    if (Array.isArray(form[key])) {
      ;
      form[key].push(value);
    } else {
      form[key] = [form[key], value];
    }
  } else {
    if (!key.endsWith("[]")) {
      form[key] = value;
    } else {
      form[key] = [value];
    }
  }
}, "handleParsingAllValues");
var handleParsingNestedValues = /* @__PURE__ */ __name((form, key, value) => {
  let nestedForm = form;
  const keys = key.split(".");
  keys.forEach((key2, index) => {
    if (index === keys.length - 1) {
      nestedForm[key2] = value;
    } else {
      if (!nestedForm[key2] || typeof nestedForm[key2] !== "object" || Array.isArray(nestedForm[key2]) || nestedForm[key2] instanceof File) {
        nestedForm[key2] = /* @__PURE__ */ Object.create(null);
      }
      nestedForm = nestedForm[key2];
    }
  });
}, "handleParsingNestedValues");

// ../node_modules/hono/dist/utils/url.js
var splitPath = /* @__PURE__ */ __name((path) => {
  const paths = path.split("/");
  if (paths[0] === "") {
    paths.shift();
  }
  return paths;
}, "splitPath");
var splitRoutingPath = /* @__PURE__ */ __name((routePath) => {
  const { groups, path } = extractGroupsFromPath(routePath);
  const paths = splitPath(path);
  return replaceGroupMarks(paths, groups);
}, "splitRoutingPath");
var extractGroupsFromPath = /* @__PURE__ */ __name((path) => {
  const groups = [];
  path = path.replace(/\{[^}]+\}/g, (match2, index) => {
    const mark = `@${index}`;
    groups.push([mark, match2]);
    return mark;
  });
  return { groups, path };
}, "extractGroupsFromPath");
var replaceGroupMarks = /* @__PURE__ */ __name((paths, groups) => {
  for (let i = groups.length - 1; i >= 0; i--) {
    const [mark] = groups[i];
    for (let j = paths.length - 1; j >= 0; j--) {
      if (paths[j].includes(mark)) {
        paths[j] = paths[j].replace(mark, groups[i][1]);
        break;
      }
    }
  }
  return paths;
}, "replaceGroupMarks");
var patternCache = {};
var getPattern = /* @__PURE__ */ __name((label, next) => {
  if (label === "*") {
    return "*";
  }
  const match2 = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (match2) {
    const cacheKey = `${label}#${next}`;
    if (!patternCache[cacheKey]) {
      if (match2[2]) {
        patternCache[cacheKey] = next && next[0] !== ":" && next[0] !== "*" ? [cacheKey, match2[1], new RegExp(`^${match2[2]}(?=/${next})`)] : [label, match2[1], new RegExp(`^${match2[2]}$`)];
      } else {
        patternCache[cacheKey] = [label, match2[1], true];
      }
    }
    return patternCache[cacheKey];
  }
  return null;
}, "getPattern");
var tryDecode = /* @__PURE__ */ __name((str, decoder) => {
  try {
    return decoder(str);
  } catch {
    return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match2) => {
      try {
        return decoder(match2);
      } catch {
        return match2;
      }
    });
  }
}, "tryDecode");
var tryDecodeURI = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURI), "tryDecodeURI");
var getPath = /* @__PURE__ */ __name((request) => {
  const url = request.url;
  const start = url.indexOf(
    "/",
    url.charCodeAt(9) === 58 ? 13 : 8
  );
  let i = start;
  for (; i < url.length; i++) {
    const charCode = url.charCodeAt(i);
    if (charCode === 37) {
      const queryIndex = url.indexOf("?", i);
      const path = url.slice(start, queryIndex === -1 ? void 0 : queryIndex);
      return tryDecodeURI(path.includes("%25") ? path.replace(/%25/g, "%2525") : path);
    } else if (charCode === 63) {
      break;
    }
  }
  return url.slice(start, i);
}, "getPath");
var getPathNoStrict = /* @__PURE__ */ __name((request) => {
  const result = getPath(request);
  return result.length > 1 && result.at(-1) === "/" ? result.slice(0, -1) : result;
}, "getPathNoStrict");
var mergePath = /* @__PURE__ */ __name((base, sub, ...rest) => {
  if (rest.length) {
    sub = mergePath(sub, ...rest);
  }
  return `${base?.[0] === "/" ? "" : "/"}${base}${sub === "/" ? "" : `${base?.at(-1) === "/" ? "" : "/"}${sub?.[0] === "/" ? sub.slice(1) : sub}`}`;
}, "mergePath");
var checkOptionalParameter = /* @__PURE__ */ __name((path) => {
  if (path.charCodeAt(path.length - 1) !== 63 || !path.includes(":")) {
    return null;
  }
  const segments = path.split("/");
  const results = [];
  let basePath = "";
  segments.forEach((segment) => {
    if (segment !== "" && !/\:/.test(segment)) {
      basePath += "/" + segment;
    } else if (/\:/.test(segment)) {
      if (/\?/.test(segment)) {
        if (results.length === 0 && basePath === "") {
          results.push("/");
        } else {
          results.push(basePath);
        }
        const optionalSegment = segment.replace("?", "");
        basePath += "/" + optionalSegment;
        results.push(basePath);
      } else {
        basePath += "/" + segment;
      }
    }
  });
  return results.filter((v, i, a) => a.indexOf(v) === i);
}, "checkOptionalParameter");
var _decodeURI = /* @__PURE__ */ __name((value) => {
  if (!/[%+]/.test(value)) {
    return value;
  }
  if (value.indexOf("+") !== -1) {
    value = value.replace(/\+/g, " ");
  }
  return value.indexOf("%") !== -1 ? tryDecode(value, decodeURIComponent_) : value;
}, "_decodeURI");
var _getQueryParam = /* @__PURE__ */ __name((url, key, multiple) => {
  let encoded;
  if (!multiple && key && !/[%+]/.test(key)) {
    let keyIndex2 = url.indexOf(`?${key}`, 8);
    if (keyIndex2 === -1) {
      keyIndex2 = url.indexOf(`&${key}`, 8);
    }
    while (keyIndex2 !== -1) {
      const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
      if (trailingKeyCode === 61) {
        const valueIndex = keyIndex2 + key.length + 2;
        const endIndex = url.indexOf("&", valueIndex);
        return _decodeURI(url.slice(valueIndex, endIndex === -1 ? void 0 : endIndex));
      } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
        return "";
      }
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    encoded = /[%+]/.test(url);
    if (!encoded) {
      return void 0;
    }
  }
  const results = {};
  encoded ??= /[%+]/.test(url);
  let keyIndex = url.indexOf("?", 8);
  while (keyIndex !== -1) {
    const nextKeyIndex = url.indexOf("&", keyIndex + 1);
    let valueIndex = url.indexOf("=", keyIndex);
    if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
      valueIndex = -1;
    }
    let name = url.slice(
      keyIndex + 1,
      valueIndex === -1 ? nextKeyIndex === -1 ? void 0 : nextKeyIndex : valueIndex
    );
    if (encoded) {
      name = _decodeURI(name);
    }
    keyIndex = nextKeyIndex;
    if (name === "") {
      continue;
    }
    let value;
    if (valueIndex === -1) {
      value = "";
    } else {
      value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? void 0 : nextKeyIndex);
      if (encoded) {
        value = _decodeURI(value);
      }
    }
    if (multiple) {
      if (!(results[name] && Array.isArray(results[name]))) {
        results[name] = [];
      }
      ;
      results[name].push(value);
    } else {
      results[name] ??= value;
    }
  }
  return key ? results[key] : results;
}, "_getQueryParam");
var getQueryParam = _getQueryParam;
var getQueryParams = /* @__PURE__ */ __name((url, key) => {
  return _getQueryParam(url, key, true);
}, "getQueryParams");
var decodeURIComponent_ = decodeURIComponent;

// ../node_modules/hono/dist/request.js
var tryDecodeURIComponent = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURIComponent_), "tryDecodeURIComponent");
var HonoRequest = /* @__PURE__ */ __name(class {
  raw;
  #validatedData;
  #matchResult;
  routeIndex = 0;
  path;
  bodyCache = {};
  constructor(request, path = "/", matchResult = [[]]) {
    this.raw = request;
    this.path = path;
    this.#matchResult = matchResult;
    this.#validatedData = {};
  }
  param(key) {
    return key ? this.#getDecodedParam(key) : this.#getAllDecodedParams();
  }
  #getDecodedParam(key) {
    const paramKey = this.#matchResult[0][this.routeIndex][1][key];
    const param = this.#getParamValue(paramKey);
    return param ? /\%/.test(param) ? tryDecodeURIComponent(param) : param : void 0;
  }
  #getAllDecodedParams() {
    const decoded = {};
    const keys = Object.keys(this.#matchResult[0][this.routeIndex][1]);
    for (const key of keys) {
      const value = this.#getParamValue(this.#matchResult[0][this.routeIndex][1][key]);
      if (value && typeof value === "string") {
        decoded[key] = /\%/.test(value) ? tryDecodeURIComponent(value) : value;
      }
    }
    return decoded;
  }
  #getParamValue(paramKey) {
    return this.#matchResult[1] ? this.#matchResult[1][paramKey] : paramKey;
  }
  query(key) {
    return getQueryParam(this.url, key);
  }
  queries(key) {
    return getQueryParams(this.url, key);
  }
  header(name) {
    if (name) {
      return this.raw.headers.get(name) ?? void 0;
    }
    const headerData = {};
    this.raw.headers.forEach((value, key) => {
      headerData[key] = value;
    });
    return headerData;
  }
  async parseBody(options) {
    return this.bodyCache.parsedBody ??= await parseBody(this, options);
  }
  #cachedBody = (key) => {
    const { bodyCache, raw: raw2 } = this;
    const cachedBody = bodyCache[key];
    if (cachedBody) {
      return cachedBody;
    }
    const anyCachedKey = Object.keys(bodyCache)[0];
    if (anyCachedKey) {
      return bodyCache[anyCachedKey].then((body) => {
        if (anyCachedKey === "json") {
          body = JSON.stringify(body);
        }
        return new Response(body)[key]();
      });
    }
    return bodyCache[key] = raw2[key]();
  };
  json() {
    return this.#cachedBody("text").then((text) => JSON.parse(text));
  }
  text() {
    return this.#cachedBody("text");
  }
  arrayBuffer() {
    return this.#cachedBody("arrayBuffer");
  }
  blob() {
    return this.#cachedBody("blob");
  }
  formData() {
    return this.#cachedBody("formData");
  }
  addValidatedData(target, data) {
    this.#validatedData[target] = data;
  }
  valid(target) {
    return this.#validatedData[target];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get [GET_MATCH_RESULT]() {
    return this.#matchResult;
  }
  get matchedRoutes() {
    return this.#matchResult[0].map(([[, route]]) => route);
  }
  get routePath() {
    return this.#matchResult[0].map(([[, route]]) => route)[this.routeIndex].path;
  }
}, "HonoRequest");

// ../node_modules/hono/dist/utils/html.js
var HtmlEscapedCallbackPhase = {
  Stringify: 1,
  BeforeStream: 2,
  Stream: 3
};
var raw = /* @__PURE__ */ __name((value, callbacks) => {
  const escapedString = new String(value);
  escapedString.isEscaped = true;
  escapedString.callbacks = callbacks;
  return escapedString;
}, "raw");
var resolveCallback = /* @__PURE__ */ __name(async (str, phase, preserveCallbacks, context, buffer) => {
  if (typeof str === "object" && !(str instanceof String)) {
    if (!(str instanceof Promise)) {
      str = str.toString();
    }
    if (str instanceof Promise) {
      str = await str;
    }
  }
  const callbacks = str.callbacks;
  if (!callbacks?.length) {
    return Promise.resolve(str);
  }
  if (buffer) {
    buffer[0] += str;
  } else {
    buffer = [str];
  }
  const resStr = Promise.all(callbacks.map((c) => c({ phase, buffer, context }))).then(
    (res) => Promise.all(
      res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context, buffer))
    ).then(() => buffer[0])
  );
  if (preserveCallbacks) {
    return raw(await resStr, callbacks);
  } else {
    return resStr;
  }
}, "resolveCallback");

// ../node_modules/hono/dist/context.js
var TEXT_PLAIN = "text/plain; charset=UTF-8";
var setDefaultContentType = /* @__PURE__ */ __name((contentType, headers) => {
  return {
    "Content-Type": contentType,
    ...headers
  };
}, "setDefaultContentType");
var Context = /* @__PURE__ */ __name(class {
  #rawRequest;
  #req;
  env = {};
  #var;
  finalized = false;
  error;
  #status;
  #executionCtx;
  #res;
  #layout;
  #renderer;
  #notFoundHandler;
  #preparedHeaders;
  #matchResult;
  #path;
  constructor(req, options) {
    this.#rawRequest = req;
    if (options) {
      this.#executionCtx = options.executionCtx;
      this.env = options.env;
      this.#notFoundHandler = options.notFoundHandler;
      this.#path = options.path;
      this.#matchResult = options.matchResult;
    }
  }
  get req() {
    this.#req ??= new HonoRequest(this.#rawRequest, this.#path, this.#matchResult);
    return this.#req;
  }
  get event() {
    if (this.#executionCtx && "respondWith" in this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no FetchEvent");
    }
  }
  get executionCtx() {
    if (this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no ExecutionContext");
    }
  }
  get res() {
    return this.#res ||= new Response(null, {
      headers: this.#preparedHeaders ??= new Headers()
    });
  }
  set res(_res) {
    if (this.#res && _res) {
      _res = new Response(_res.body, _res);
      for (const [k, v] of this.#res.headers.entries()) {
        if (k === "content-type") {
          continue;
        }
        if (k === "set-cookie") {
          const cookies = this.#res.headers.getSetCookie();
          _res.headers.delete("set-cookie");
          for (const cookie of cookies) {
            _res.headers.append("set-cookie", cookie);
          }
        } else {
          _res.headers.set(k, v);
        }
      }
    }
    this.#res = _res;
    this.finalized = true;
  }
  render = (...args) => {
    this.#renderer ??= (content) => this.html(content);
    return this.#renderer(...args);
  };
  setLayout = (layout) => this.#layout = layout;
  getLayout = () => this.#layout;
  setRenderer = (renderer) => {
    this.#renderer = renderer;
  };
  header = (name, value, options) => {
    if (this.finalized) {
      this.#res = new Response(this.#res.body, this.#res);
    }
    const headers = this.#res ? this.#res.headers : this.#preparedHeaders ??= new Headers();
    if (value === void 0) {
      headers.delete(name);
    } else if (options?.append) {
      headers.append(name, value);
    } else {
      headers.set(name, value);
    }
  };
  status = (status) => {
    this.#status = status;
  };
  set = (key, value) => {
    this.#var ??= /* @__PURE__ */ new Map();
    this.#var.set(key, value);
  };
  get = (key) => {
    return this.#var ? this.#var.get(key) : void 0;
  };
  get var() {
    if (!this.#var) {
      return {};
    }
    return Object.fromEntries(this.#var);
  }
  #newResponse(data, arg, headers) {
    const responseHeaders = this.#res ? new Headers(this.#res.headers) : this.#preparedHeaders ?? new Headers();
    if (typeof arg === "object" && "headers" in arg) {
      const argHeaders = arg.headers instanceof Headers ? arg.headers : new Headers(arg.headers);
      for (const [key, value] of argHeaders) {
        if (key.toLowerCase() === "set-cookie") {
          responseHeaders.append(key, value);
        } else {
          responseHeaders.set(key, value);
        }
      }
    }
    if (headers) {
      for (const [k, v] of Object.entries(headers)) {
        if (typeof v === "string") {
          responseHeaders.set(k, v);
        } else {
          responseHeaders.delete(k);
          for (const v2 of v) {
            responseHeaders.append(k, v2);
          }
        }
      }
    }
    const status = typeof arg === "number" ? arg : arg?.status ?? this.#status;
    return new Response(data, { status, headers: responseHeaders });
  }
  newResponse = (...args) => this.#newResponse(...args);
  body = (data, arg, headers) => this.#newResponse(data, arg, headers);
  text = (text, arg, headers) => {
    return !this.#preparedHeaders && !this.#status && !arg && !headers && !this.finalized ? new Response(text) : this.#newResponse(
      text,
      arg,
      setDefaultContentType(TEXT_PLAIN, headers)
    );
  };
  json = (object, arg, headers) => {
    return this.#newResponse(
      JSON.stringify(object),
      arg,
      setDefaultContentType("application/json", headers)
    );
  };
  html = (html, arg, headers) => {
    const res = /* @__PURE__ */ __name((html2) => this.#newResponse(html2, arg, setDefaultContentType("text/html; charset=UTF-8", headers)), "res");
    return typeof html === "object" ? resolveCallback(html, HtmlEscapedCallbackPhase.Stringify, false, {}).then(res) : res(html);
  };
  redirect = (location, status) => {
    const locationString = String(location);
    this.header(
      "Location",
      !/[^\x00-\xFF]/.test(locationString) ? locationString : encodeURI(locationString)
    );
    return this.newResponse(null, status ?? 302);
  };
  notFound = () => {
    this.#notFoundHandler ??= () => new Response();
    return this.#notFoundHandler(this);
  };
}, "Context");

// ../node_modules/hono/dist/router.js
var METHOD_NAME_ALL = "ALL";
var METHOD_NAME_ALL_LOWERCASE = "all";
var METHODS = ["get", "post", "put", "delete", "options", "patch"];
var MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
var UnsupportedPathError = /* @__PURE__ */ __name(class extends Error {
}, "UnsupportedPathError");

// ../node_modules/hono/dist/utils/constants.js
var COMPOSED_HANDLER = "__COMPOSED_HANDLER";

// ../node_modules/hono/dist/hono-base.js
var notFoundHandler = /* @__PURE__ */ __name((c) => {
  return c.text("404 Not Found", 404);
}, "notFoundHandler");
var errorHandler = /* @__PURE__ */ __name((err, c) => {
  if ("getResponse" in err) {
    const res = err.getResponse();
    return c.newResponse(res.body, res);
  }
  console.error(err);
  return c.text("Internal Server Error", 500);
}, "errorHandler");
var Hono = /* @__PURE__ */ __name(class {
  get;
  post;
  put;
  delete;
  options;
  patch;
  all;
  on;
  use;
  router;
  getPath;
  _basePath = "/";
  #path = "/";
  routes = [];
  constructor(options = {}) {
    const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
    allMethods.forEach((method) => {
      this[method] = (args1, ...args) => {
        if (typeof args1 === "string") {
          this.#path = args1;
        } else {
          this.#addRoute(method, this.#path, args1);
        }
        args.forEach((handler) => {
          this.#addRoute(method, this.#path, handler);
        });
        return this;
      };
    });
    this.on = (method, path, ...handlers) => {
      for (const p of [path].flat()) {
        this.#path = p;
        for (const m of [method].flat()) {
          handlers.map((handler) => {
            this.#addRoute(m.toUpperCase(), this.#path, handler);
          });
        }
      }
      return this;
    };
    this.use = (arg1, ...handlers) => {
      if (typeof arg1 === "string") {
        this.#path = arg1;
      } else {
        this.#path = "*";
        handlers.unshift(arg1);
      }
      handlers.forEach((handler) => {
        this.#addRoute(METHOD_NAME_ALL, this.#path, handler);
      });
      return this;
    };
    const { strict, ...optionsWithoutStrict } = options;
    Object.assign(this, optionsWithoutStrict);
    this.getPath = strict ?? true ? options.getPath ?? getPath : getPathNoStrict;
  }
  #clone() {
    const clone = new Hono({
      router: this.router,
      getPath: this.getPath
    });
    clone.errorHandler = this.errorHandler;
    clone.#notFoundHandler = this.#notFoundHandler;
    clone.routes = this.routes;
    return clone;
  }
  #notFoundHandler = notFoundHandler;
  errorHandler = errorHandler;
  route(path, app4) {
    const subApp = this.basePath(path);
    app4.routes.map((r) => {
      let handler;
      if (app4.errorHandler === errorHandler) {
        handler = r.handler;
      } else {
        handler = /* @__PURE__ */ __name(async (c, next) => (await compose([], app4.errorHandler)(c, () => r.handler(c, next))).res, "handler");
        handler[COMPOSED_HANDLER] = r.handler;
      }
      subApp.#addRoute(r.method, r.path, handler);
    });
    return this;
  }
  basePath(path) {
    const subApp = this.#clone();
    subApp._basePath = mergePath(this._basePath, path);
    return subApp;
  }
  onError = (handler) => {
    this.errorHandler = handler;
    return this;
  };
  notFound = (handler) => {
    this.#notFoundHandler = handler;
    return this;
  };
  mount(path, applicationHandler, options) {
    let replaceRequest;
    let optionHandler;
    if (options) {
      if (typeof options === "function") {
        optionHandler = options;
      } else {
        optionHandler = options.optionHandler;
        if (options.replaceRequest === false) {
          replaceRequest = /* @__PURE__ */ __name((request) => request, "replaceRequest");
        } else {
          replaceRequest = options.replaceRequest;
        }
      }
    }
    const getOptions = optionHandler ? (c) => {
      const options2 = optionHandler(c);
      return Array.isArray(options2) ? options2 : [options2];
    } : (c) => {
      let executionContext = void 0;
      try {
        executionContext = c.executionCtx;
      } catch {
      }
      return [c.env, executionContext];
    };
    replaceRequest ||= (() => {
      const mergedPath = mergePath(this._basePath, path);
      const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
      return (request) => {
        const url = new URL(request.url);
        url.pathname = url.pathname.slice(pathPrefixLength) || "/";
        return new Request(url, request);
      };
    })();
    const handler = /* @__PURE__ */ __name(async (c, next) => {
      const res = await applicationHandler(replaceRequest(c.req.raw), ...getOptions(c));
      if (res) {
        return res;
      }
      await next();
    }, "handler");
    this.#addRoute(METHOD_NAME_ALL, mergePath(path, "*"), handler);
    return this;
  }
  #addRoute(method, path, handler) {
    method = method.toUpperCase();
    path = mergePath(this._basePath, path);
    const r = { basePath: this._basePath, path, method, handler };
    this.router.add(method, path, [handler, r]);
    this.routes.push(r);
  }
  #handleError(err, c) {
    if (err instanceof Error) {
      return this.errorHandler(err, c);
    }
    throw err;
  }
  #dispatch(request, executionCtx, env, method) {
    if (method === "HEAD") {
      return (async () => new Response(null, await this.#dispatch(request, executionCtx, env, "GET")))();
    }
    const path = this.getPath(request, { env });
    const matchResult = this.router.match(method, path);
    const c = new Context(request, {
      path,
      matchResult,
      env,
      executionCtx,
      notFoundHandler: this.#notFoundHandler
    });
    if (matchResult[0].length === 1) {
      let res;
      try {
        res = matchResult[0][0][0][0](c, async () => {
          c.res = await this.#notFoundHandler(c);
        });
      } catch (err) {
        return this.#handleError(err, c);
      }
      return res instanceof Promise ? res.then(
        (resolved) => resolved || (c.finalized ? c.res : this.#notFoundHandler(c))
      ).catch((err) => this.#handleError(err, c)) : res ?? this.#notFoundHandler(c);
    }
    const composed = compose(matchResult[0], this.errorHandler, this.#notFoundHandler);
    return (async () => {
      try {
        const context = await composed(c);
        if (!context.finalized) {
          throw new Error(
            "Context is not finalized. Did you forget to return a Response object or `await next()`?"
          );
        }
        return context.res;
      } catch (err) {
        return this.#handleError(err, c);
      }
    })();
  }
  fetch = (request, ...rest) => {
    return this.#dispatch(request, rest[1], rest[0], request.method);
  };
  request = (input, requestInit, Env, executionCtx) => {
    if (input instanceof Request) {
      return this.fetch(requestInit ? new Request(input, requestInit) : input, Env, executionCtx);
    }
    input = input.toString();
    return this.fetch(
      new Request(
        /^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`,
        requestInit
      ),
      Env,
      executionCtx
    );
  };
  fire = () => {
    addEventListener("fetch", (event) => {
      event.respondWith(this.#dispatch(event.request, event, void 0, event.request.method));
    });
  };
}, "Hono");

// ../node_modules/hono/dist/router/reg-exp-router/node.js
var LABEL_REG_EXP_STR = "[^/]+";
var ONLY_WILDCARD_REG_EXP_STR = ".*";
var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
var PATH_ERROR = Symbol();
var regExpMetaChars = new Set(".\\+*[^]$()");
function compareKey(a, b) {
  if (a.length === 1) {
    return b.length === 1 ? a < b ? -1 : 1 : -1;
  }
  if (b.length === 1) {
    return 1;
  }
  if (a === ONLY_WILDCARD_REG_EXP_STR || a === TAIL_WILDCARD_REG_EXP_STR) {
    return 1;
  } else if (b === ONLY_WILDCARD_REG_EXP_STR || b === TAIL_WILDCARD_REG_EXP_STR) {
    return -1;
  }
  if (a === LABEL_REG_EXP_STR) {
    return 1;
  } else if (b === LABEL_REG_EXP_STR) {
    return -1;
  }
  return a.length === b.length ? a < b ? -1 : 1 : b.length - a.length;
}
__name(compareKey, "compareKey");
var Node = /* @__PURE__ */ __name(class {
  #index;
  #varIndex;
  #children = /* @__PURE__ */ Object.create(null);
  insert(tokens, index, paramMap, context, pathErrorCheckOnly) {
    if (tokens.length === 0) {
      if (this.#index !== void 0) {
        throw PATH_ERROR;
      }
      if (pathErrorCheckOnly) {
        return;
      }
      this.#index = index;
      return;
    }
    const [token, ...restTokens] = tokens;
    const pattern = token === "*" ? restTokens.length === 0 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : token === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let node;
    if (pattern) {
      const name = pattern[1];
      let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
      if (name && pattern[2]) {
        if (regexpStr === ".*") {
          throw PATH_ERROR;
        }
        regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
        if (/\((?!\?:)/.test(regexpStr)) {
          throw PATH_ERROR;
        }
      }
      node = this.#children[regexpStr];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k) => k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[regexpStr] = new Node();
        if (name !== "") {
          node.#varIndex = context.varIndex++;
        }
      }
      if (!pathErrorCheckOnly && name !== "") {
        paramMap.push([name, node.#varIndex]);
      }
    } else {
      node = this.#children[token];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k) => k.length > 1 && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[token] = new Node();
      }
    }
    node.insert(restTokens, index, paramMap, context, pathErrorCheckOnly);
  }
  buildRegExpStr() {
    const childKeys = Object.keys(this.#children).sort(compareKey);
    const strList = childKeys.map((k) => {
      const c = this.#children[k];
      return (typeof c.#varIndex === "number" ? `(${k})@${c.#varIndex}` : regExpMetaChars.has(k) ? `\\${k}` : k) + c.buildRegExpStr();
    });
    if (typeof this.#index === "number") {
      strList.unshift(`#${this.#index}`);
    }
    if (strList.length === 0) {
      return "";
    }
    if (strList.length === 1) {
      return strList[0];
    }
    return "(?:" + strList.join("|") + ")";
  }
}, "Node");

// ../node_modules/hono/dist/router/reg-exp-router/trie.js
var Trie = /* @__PURE__ */ __name(class {
  #context = { varIndex: 0 };
  #root = new Node();
  insert(path, index, pathErrorCheckOnly) {
    const paramAssoc = [];
    const groups = [];
    for (let i = 0; ; ) {
      let replaced = false;
      path = path.replace(/\{[^}]+\}/g, (m) => {
        const mark = `@\\${i}`;
        groups[i] = [mark, m];
        i++;
        replaced = true;
        return mark;
      });
      if (!replaced) {
        break;
      }
    }
    const tokens = path.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = groups.length - 1; i >= 0; i--) {
      const [mark] = groups[i];
      for (let j = tokens.length - 1; j >= 0; j--) {
        if (tokens[j].indexOf(mark) !== -1) {
          tokens[j] = tokens[j].replace(mark, groups[i][1]);
          break;
        }
      }
    }
    this.#root.insert(tokens, index, paramAssoc, this.#context, pathErrorCheckOnly);
    return paramAssoc;
  }
  buildRegExp() {
    let regexp = this.#root.buildRegExpStr();
    if (regexp === "") {
      return [/^$/, [], []];
    }
    let captureIndex = 0;
    const indexReplacementMap = [];
    const paramReplacementMap = [];
    regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_, handlerIndex, paramIndex) => {
      if (handlerIndex !== void 0) {
        indexReplacementMap[++captureIndex] = Number(handlerIndex);
        return "$()";
      }
      if (paramIndex !== void 0) {
        paramReplacementMap[Number(paramIndex)] = ++captureIndex;
        return "";
      }
      return "";
    });
    return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
  }
}, "Trie");

// ../node_modules/hono/dist/router/reg-exp-router/router.js
var emptyParam = [];
var nullMatcher = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
function buildWildcardRegExp(path) {
  return wildcardRegExpCache[path] ??= new RegExp(
    path === "*" ? "" : `^${path.replace(
      /\/\*$|([.\\+*[^\]$()])/g,
      (_, metaChar) => metaChar ? `\\${metaChar}` : "(?:|/.*)"
    )}$`
  );
}
__name(buildWildcardRegExp, "buildWildcardRegExp");
function clearWildcardRegExpCache() {
  wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
}
__name(clearWildcardRegExpCache, "clearWildcardRegExpCache");
function buildMatcherFromPreprocessedRoutes(routes2) {
  const trie = new Trie();
  const handlerData = [];
  if (routes2.length === 0) {
    return nullMatcher;
  }
  const routesWithStaticPathFlag = routes2.map(
    (route) => [!/\*|\/:/.test(route[0]), ...route]
  ).sort(
    ([isStaticA, pathA], [isStaticB, pathB]) => isStaticA ? 1 : isStaticB ? -1 : pathA.length - pathB.length
  );
  const staticMap = /* @__PURE__ */ Object.create(null);
  for (let i = 0, j = -1, len = routesWithStaticPathFlag.length; i < len; i++) {
    const [pathErrorCheckOnly, path, handlers] = routesWithStaticPathFlag[i];
    if (pathErrorCheckOnly) {
      staticMap[path] = [handlers.map(([h]) => [h, /* @__PURE__ */ Object.create(null)]), emptyParam];
    } else {
      j++;
    }
    let paramAssoc;
    try {
      paramAssoc = trie.insert(path, j, pathErrorCheckOnly);
    } catch (e) {
      throw e === PATH_ERROR ? new UnsupportedPathError(path) : e;
    }
    if (pathErrorCheckOnly) {
      continue;
    }
    handlerData[j] = handlers.map(([h, paramCount]) => {
      const paramIndexMap = /* @__PURE__ */ Object.create(null);
      paramCount -= 1;
      for (; paramCount >= 0; paramCount--) {
        const [key, value] = paramAssoc[paramCount];
        paramIndexMap[key] = value;
      }
      return [h, paramIndexMap];
    });
  }
  const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
  for (let i = 0, len = handlerData.length; i < len; i++) {
    for (let j = 0, len2 = handlerData[i].length; j < len2; j++) {
      const map = handlerData[i][j]?.[1];
      if (!map) {
        continue;
      }
      const keys = Object.keys(map);
      for (let k = 0, len3 = keys.length; k < len3; k++) {
        map[keys[k]] = paramReplacementMap[map[keys[k]]];
      }
    }
  }
  const handlerMap = [];
  for (const i in indexReplacementMap) {
    handlerMap[i] = handlerData[indexReplacementMap[i]];
  }
  return [regexp, handlerMap, staticMap];
}
__name(buildMatcherFromPreprocessedRoutes, "buildMatcherFromPreprocessedRoutes");
function findMiddleware(middleware, path) {
  if (!middleware) {
    return void 0;
  }
  for (const k of Object.keys(middleware).sort((a, b) => b.length - a.length)) {
    if (buildWildcardRegExp(k).test(path)) {
      return [...middleware[k]];
    }
  }
  return void 0;
}
__name(findMiddleware, "findMiddleware");
var RegExpRouter = /* @__PURE__ */ __name(class {
  name = "RegExpRouter";
  #middleware;
  #routes;
  constructor() {
    this.#middleware = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
    this.#routes = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
  }
  add(method, path, handler) {
    const middleware = this.#middleware;
    const routes2 = this.#routes;
    if (!middleware || !routes2) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    if (!middleware[method]) {
      ;
      [middleware, routes2].forEach((handlerMap) => {
        handlerMap[method] = /* @__PURE__ */ Object.create(null);
        Object.keys(handlerMap[METHOD_NAME_ALL]).forEach((p) => {
          handlerMap[method][p] = [...handlerMap[METHOD_NAME_ALL][p]];
        });
      });
    }
    if (path === "/*") {
      path = "*";
    }
    const paramCount = (path.match(/\/:/g) || []).length;
    if (/\*$/.test(path)) {
      const re = buildWildcardRegExp(path);
      if (method === METHOD_NAME_ALL) {
        Object.keys(middleware).forEach((m) => {
          middleware[m][path] ||= findMiddleware(middleware[m], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
        });
      } else {
        middleware[method][path] ||= findMiddleware(middleware[method], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
      }
      Object.keys(middleware).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(middleware[m]).forEach((p) => {
            re.test(p) && middleware[m][p].push([handler, paramCount]);
          });
        }
      });
      Object.keys(routes2).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(routes2[m]).forEach(
            (p) => re.test(p) && routes2[m][p].push([handler, paramCount])
          );
        }
      });
      return;
    }
    const paths = checkOptionalParameter(path) || [path];
    for (let i = 0, len = paths.length; i < len; i++) {
      const path2 = paths[i];
      Object.keys(routes2).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          routes2[m][path2] ||= [
            ...findMiddleware(middleware[m], path2) || findMiddleware(middleware[METHOD_NAME_ALL], path2) || []
          ];
          routes2[m][path2].push([handler, paramCount - len + i + 1]);
        }
      });
    }
  }
  match(method, path) {
    clearWildcardRegExpCache();
    const matchers = this.#buildAllMatchers();
    this.match = (method2, path2) => {
      const matcher = matchers[method2] || matchers[METHOD_NAME_ALL];
      const staticMatch = matcher[2][path2];
      if (staticMatch) {
        return staticMatch;
      }
      const match2 = path2.match(matcher[0]);
      if (!match2) {
        return [[], emptyParam];
      }
      const index = match2.indexOf("", 1);
      return [matcher[1][index], match2];
    };
    return this.match(method, path);
  }
  #buildAllMatchers() {
    const matchers = /* @__PURE__ */ Object.create(null);
    Object.keys(this.#routes).concat(Object.keys(this.#middleware)).forEach((method) => {
      matchers[method] ||= this.#buildMatcher(method);
    });
    this.#middleware = this.#routes = void 0;
    return matchers;
  }
  #buildMatcher(method) {
    const routes2 = [];
    let hasOwnRoute = method === METHOD_NAME_ALL;
    [this.#middleware, this.#routes].forEach((r) => {
      const ownRoute = r[method] ? Object.keys(r[method]).map((path) => [path, r[method][path]]) : [];
      if (ownRoute.length !== 0) {
        hasOwnRoute ||= true;
        routes2.push(...ownRoute);
      } else if (method !== METHOD_NAME_ALL) {
        routes2.push(
          ...Object.keys(r[METHOD_NAME_ALL]).map((path) => [path, r[METHOD_NAME_ALL][path]])
        );
      }
    });
    if (!hasOwnRoute) {
      return null;
    } else {
      return buildMatcherFromPreprocessedRoutes(routes2);
    }
  }
}, "RegExpRouter");

// ../node_modules/hono/dist/router/smart-router/router.js
var SmartRouter = /* @__PURE__ */ __name(class {
  name = "SmartRouter";
  #routers = [];
  #routes = [];
  constructor(init) {
    this.#routers = init.routers;
  }
  add(method, path, handler) {
    if (!this.#routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    this.#routes.push([method, path, handler]);
  }
  match(method, path) {
    if (!this.#routes) {
      throw new Error("Fatal error");
    }
    const routers = this.#routers;
    const routes2 = this.#routes;
    const len = routers.length;
    let i = 0;
    let res;
    for (; i < len; i++) {
      const router = routers[i];
      try {
        for (let i2 = 0, len2 = routes2.length; i2 < len2; i2++) {
          router.add(...routes2[i2]);
        }
        res = router.match(method, path);
      } catch (e) {
        if (e instanceof UnsupportedPathError) {
          continue;
        }
        throw e;
      }
      this.match = router.match.bind(router);
      this.#routers = [router];
      this.#routes = void 0;
      break;
    }
    if (i === len) {
      throw new Error("Fatal error");
    }
    this.name = `SmartRouter + ${this.activeRouter.name}`;
    return res;
  }
  get activeRouter() {
    if (this.#routes || this.#routers.length !== 1) {
      throw new Error("No active router has been determined yet.");
    }
    return this.#routers[0];
  }
}, "SmartRouter");

// ../node_modules/hono/dist/router/trie-router/node.js
var emptyParams = /* @__PURE__ */ Object.create(null);
var Node2 = /* @__PURE__ */ __name(class {
  #methods;
  #children;
  #patterns;
  #order = 0;
  #params = emptyParams;
  constructor(method, handler, children) {
    this.#children = children || /* @__PURE__ */ Object.create(null);
    this.#methods = [];
    if (method && handler) {
      const m = /* @__PURE__ */ Object.create(null);
      m[method] = { handler, possibleKeys: [], score: 0 };
      this.#methods = [m];
    }
    this.#patterns = [];
  }
  insert(method, path, handler) {
    this.#order = ++this.#order;
    let curNode = this;
    const parts = splitRoutingPath(path);
    const possibleKeys = [];
    for (let i = 0, len = parts.length; i < len; i++) {
      const p = parts[i];
      const nextP = parts[i + 1];
      const pattern = getPattern(p, nextP);
      const key = Array.isArray(pattern) ? pattern[0] : p;
      if (key in curNode.#children) {
        curNode = curNode.#children[key];
        if (pattern) {
          possibleKeys.push(pattern[1]);
        }
        continue;
      }
      curNode.#children[key] = new Node2();
      if (pattern) {
        curNode.#patterns.push(pattern);
        possibleKeys.push(pattern[1]);
      }
      curNode = curNode.#children[key];
    }
    curNode.#methods.push({
      [method]: {
        handler,
        possibleKeys: possibleKeys.filter((v, i, a) => a.indexOf(v) === i),
        score: this.#order
      }
    });
    return curNode;
  }
  #getHandlerSets(node, method, nodeParams, params) {
    const handlerSets = [];
    for (let i = 0, len = node.#methods.length; i < len; i++) {
      const m = node.#methods[i];
      const handlerSet = m[method] || m[METHOD_NAME_ALL];
      const processedSet = {};
      if (handlerSet !== void 0) {
        handlerSet.params = /* @__PURE__ */ Object.create(null);
        handlerSets.push(handlerSet);
        if (nodeParams !== emptyParams || params && params !== emptyParams) {
          for (let i2 = 0, len2 = handlerSet.possibleKeys.length; i2 < len2; i2++) {
            const key = handlerSet.possibleKeys[i2];
            const processed = processedSet[handlerSet.score];
            handlerSet.params[key] = params?.[key] && !processed ? params[key] : nodeParams[key] ?? params?.[key];
            processedSet[handlerSet.score] = true;
          }
        }
      }
    }
    return handlerSets;
  }
  search(method, path) {
    const handlerSets = [];
    this.#params = emptyParams;
    const curNode = this;
    let curNodes = [curNode];
    const parts = splitPath(path);
    const curNodesQueue = [];
    for (let i = 0, len = parts.length; i < len; i++) {
      const part = parts[i];
      const isLast = i === len - 1;
      const tempNodes = [];
      for (let j = 0, len2 = curNodes.length; j < len2; j++) {
        const node = curNodes[j];
        const nextNode = node.#children[part];
        if (nextNode) {
          nextNode.#params = node.#params;
          if (isLast) {
            if (nextNode.#children["*"]) {
              handlerSets.push(
                ...this.#getHandlerSets(nextNode.#children["*"], method, node.#params)
              );
            }
            handlerSets.push(...this.#getHandlerSets(nextNode, method, node.#params));
          } else {
            tempNodes.push(nextNode);
          }
        }
        for (let k = 0, len3 = node.#patterns.length; k < len3; k++) {
          const pattern = node.#patterns[k];
          const params = node.#params === emptyParams ? {} : { ...node.#params };
          if (pattern === "*") {
            const astNode = node.#children["*"];
            if (astNode) {
              handlerSets.push(...this.#getHandlerSets(astNode, method, node.#params));
              astNode.#params = params;
              tempNodes.push(astNode);
            }
            continue;
          }
          const [key, name, matcher] = pattern;
          if (!part && !(matcher instanceof RegExp)) {
            continue;
          }
          const child = node.#children[key];
          const restPathString = parts.slice(i).join("/");
          if (matcher instanceof RegExp) {
            const m = matcher.exec(restPathString);
            if (m) {
              params[name] = m[0];
              handlerSets.push(...this.#getHandlerSets(child, method, node.#params, params));
              if (Object.keys(child.#children).length) {
                child.#params = params;
                const componentCount = m[0].match(/\//)?.length ?? 0;
                const targetCurNodes = curNodesQueue[componentCount] ||= [];
                targetCurNodes.push(child);
              }
              continue;
            }
          }
          if (matcher === true || matcher.test(part)) {
            params[name] = part;
            if (isLast) {
              handlerSets.push(...this.#getHandlerSets(child, method, params, node.#params));
              if (child.#children["*"]) {
                handlerSets.push(
                  ...this.#getHandlerSets(child.#children["*"], method, params, node.#params)
                );
              }
            } else {
              child.#params = params;
              tempNodes.push(child);
            }
          }
        }
      }
      curNodes = tempNodes.concat(curNodesQueue.shift() ?? []);
    }
    if (handlerSets.length > 1) {
      handlerSets.sort((a, b) => {
        return a.score - b.score;
      });
    }
    return [handlerSets.map(({ handler, params }) => [handler, params])];
  }
}, "Node");

// ../node_modules/hono/dist/router/trie-router/router.js
var TrieRouter = /* @__PURE__ */ __name(class {
  name = "TrieRouter";
  #node;
  constructor() {
    this.#node = new Node2();
  }
  add(method, path, handler) {
    const results = checkOptionalParameter(path);
    if (results) {
      for (let i = 0, len = results.length; i < len; i++) {
        this.#node.insert(method, results[i], handler);
      }
      return;
    }
    this.#node.insert(method, path, handler);
  }
  match(method, path) {
    return this.#node.search(method, path);
  }
}, "TrieRouter");

// ../node_modules/hono/dist/hono.js
var Hono2 = /* @__PURE__ */ __name(class extends Hono {
  constructor(options = {}) {
    super(options);
    this.router = options.router ?? new SmartRouter({
      routers: [new RegExpRouter(), new TrieRouter()]
    });
  }
}, "Hono");

// ../node_modules/hono/dist/adapter/cloudflare-pages/handler.js
var handle = /* @__PURE__ */ __name((app4) => (eventContext) => {
  return app4.fetch(
    eventContext.request,
    { ...eventContext.env, eventContext },
    {
      waitUntil: eventContext.waitUntil,
      passThroughOnException: eventContext.passThroughOnException,
      props: {}
    }
  );
}, "handle");

// ../node_modules/hono/dist/utils/encode.js
var decodeBase64Url = /* @__PURE__ */ __name((str) => {
  return decodeBase64(str.replace(/_|-/g, (m) => ({ _: "/", "-": "+" })[m] ?? m));
}, "decodeBase64Url");
var encodeBase64Url = /* @__PURE__ */ __name((buf) => encodeBase64(buf).replace(/\/|\+/g, (m) => ({ "/": "_", "+": "-" })[m] ?? m), "encodeBase64Url");
var encodeBase64 = /* @__PURE__ */ __name((buf) => {
  let binary = "";
  const bytes = new Uint8Array(buf);
  for (let i = 0, len = bytes.length; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}, "encodeBase64");
var decodeBase64 = /* @__PURE__ */ __name((str) => {
  const binary = atob(str);
  const bytes = new Uint8Array(new ArrayBuffer(binary.length));
  const half = binary.length / 2;
  for (let i = 0, j = binary.length - 1; i <= half; i++, j--) {
    bytes[i] = binary.charCodeAt(i);
    bytes[j] = binary.charCodeAt(j);
  }
  return bytes;
}, "decodeBase64");

// ../node_modules/hono/dist/utils/jwt/jwa.js
var AlgorithmTypes = /* @__PURE__ */ ((AlgorithmTypes2) => {
  AlgorithmTypes2["HS256"] = "HS256";
  AlgorithmTypes2["HS384"] = "HS384";
  AlgorithmTypes2["HS512"] = "HS512";
  AlgorithmTypes2["RS256"] = "RS256";
  AlgorithmTypes2["RS384"] = "RS384";
  AlgorithmTypes2["RS512"] = "RS512";
  AlgorithmTypes2["PS256"] = "PS256";
  AlgorithmTypes2["PS384"] = "PS384";
  AlgorithmTypes2["PS512"] = "PS512";
  AlgorithmTypes2["ES256"] = "ES256";
  AlgorithmTypes2["ES384"] = "ES384";
  AlgorithmTypes2["ES512"] = "ES512";
  AlgorithmTypes2["EdDSA"] = "EdDSA";
  return AlgorithmTypes2;
})(AlgorithmTypes || {});

// ../node_modules/hono/dist/helper/adapter/index.js
var knownUserAgents = {
  deno: "Deno",
  bun: "Bun",
  workerd: "Cloudflare-Workers",
  node: "Node.js"
};
var getRuntimeKey = /* @__PURE__ */ __name(() => {
  const global = globalThis;
  const userAgentSupported = typeof navigator !== "undefined" && true;
  if (userAgentSupported) {
    for (const [runtimeKey, userAgent] of Object.entries(knownUserAgents)) {
      if (checkUserAgentEquals(userAgent)) {
        return runtimeKey;
      }
    }
  }
  if (typeof global?.EdgeRuntime === "string") {
    return "edge-light";
  }
  if (global?.fastly !== void 0) {
    return "fastly";
  }
  if (global?.process?.release?.name === "node") {
    return "node";
  }
  return "other";
}, "getRuntimeKey");
var checkUserAgentEquals = /* @__PURE__ */ __name((platform) => {
  const userAgent = "Cloudflare-Workers";
  return userAgent.startsWith(platform);
}, "checkUserAgentEquals");

// ../node_modules/hono/dist/utils/jwt/types.js
var JwtAlgorithmNotImplemented = /* @__PURE__ */ __name(class extends Error {
  constructor(alg) {
    super(`${alg} is not an implemented algorithm`);
    this.name = "JwtAlgorithmNotImplemented";
  }
}, "JwtAlgorithmNotImplemented");
var JwtTokenInvalid = /* @__PURE__ */ __name(class extends Error {
  constructor(token) {
    super(`invalid JWT token: ${token}`);
    this.name = "JwtTokenInvalid";
  }
}, "JwtTokenInvalid");
var JwtTokenNotBefore = /* @__PURE__ */ __name(class extends Error {
  constructor(token) {
    super(`token (${token}) is being used before it's valid`);
    this.name = "JwtTokenNotBefore";
  }
}, "JwtTokenNotBefore");
var JwtTokenExpired = /* @__PURE__ */ __name(class extends Error {
  constructor(token) {
    super(`token (${token}) expired`);
    this.name = "JwtTokenExpired";
  }
}, "JwtTokenExpired");
var JwtTokenIssuedAt = /* @__PURE__ */ __name(class extends Error {
  constructor(currentTimestamp, iat) {
    super(
      `Invalid "iat" claim, must be a valid number lower than "${currentTimestamp}" (iat: "${iat}")`
    );
    this.name = "JwtTokenIssuedAt";
  }
}, "JwtTokenIssuedAt");
var JwtTokenIssuer = /* @__PURE__ */ __name(class extends Error {
  constructor(expected, iss) {
    super(`expected issuer "${expected}", got ${iss ? `"${iss}"` : "none"} `);
    this.name = "JwtTokenIssuer";
  }
}, "JwtTokenIssuer");
var JwtHeaderInvalid = /* @__PURE__ */ __name(class extends Error {
  constructor(header) {
    super(`jwt header is invalid: ${JSON.stringify(header)}`);
    this.name = "JwtHeaderInvalid";
  }
}, "JwtHeaderInvalid");
var JwtHeaderRequiresKid = /* @__PURE__ */ __name(class extends Error {
  constructor(header) {
    super(`required "kid" in jwt header: ${JSON.stringify(header)}`);
    this.name = "JwtHeaderRequiresKid";
  }
}, "JwtHeaderRequiresKid");
var JwtTokenSignatureMismatched = /* @__PURE__ */ __name(class extends Error {
  constructor(token) {
    super(`token(${token}) signature mismatched`);
    this.name = "JwtTokenSignatureMismatched";
  }
}, "JwtTokenSignatureMismatched");
var CryptoKeyUsage = /* @__PURE__ */ ((CryptoKeyUsage2) => {
  CryptoKeyUsage2["Encrypt"] = "encrypt";
  CryptoKeyUsage2["Decrypt"] = "decrypt";
  CryptoKeyUsage2["Sign"] = "sign";
  CryptoKeyUsage2["Verify"] = "verify";
  CryptoKeyUsage2["DeriveKey"] = "deriveKey";
  CryptoKeyUsage2["DeriveBits"] = "deriveBits";
  CryptoKeyUsage2["WrapKey"] = "wrapKey";
  CryptoKeyUsage2["UnwrapKey"] = "unwrapKey";
  return CryptoKeyUsage2;
})(CryptoKeyUsage || {});

// ../node_modules/hono/dist/utils/jwt/utf8.js
var utf8Encoder = new TextEncoder();
var utf8Decoder = new TextDecoder();

// ../node_modules/hono/dist/utils/jwt/jws.js
async function signing(privateKey, alg, data) {
  const algorithm = getKeyAlgorithm(alg);
  const cryptoKey = await importPrivateKey(privateKey, algorithm);
  return await crypto.subtle.sign(algorithm, cryptoKey, data);
}
__name(signing, "signing");
async function verifying(publicKey, alg, signature, data) {
  const algorithm = getKeyAlgorithm(alg);
  const cryptoKey = await importPublicKey(publicKey, algorithm);
  return await crypto.subtle.verify(algorithm, cryptoKey, signature, data);
}
__name(verifying, "verifying");
function pemToBinary(pem) {
  return decodeBase64(pem.replace(/-+(BEGIN|END).*/g, "").replace(/\s/g, ""));
}
__name(pemToBinary, "pemToBinary");
async function importPrivateKey(key, alg) {
  if (!crypto.subtle || !crypto.subtle.importKey) {
    throw new Error("`crypto.subtle.importKey` is undefined. JWT auth middleware requires it.");
  }
  if (isCryptoKey(key)) {
    if (key.type !== "private" && key.type !== "secret") {
      throw new Error(
        `unexpected key type: CryptoKey.type is ${key.type}, expected private or secret`
      );
    }
    return key;
  }
  const usages = [CryptoKeyUsage.Sign];
  if (typeof key === "object") {
    return await crypto.subtle.importKey("jwk", key, alg, false, usages);
  }
  if (key.includes("PRIVATE")) {
    return await crypto.subtle.importKey("pkcs8", pemToBinary(key), alg, false, usages);
  }
  return await crypto.subtle.importKey("raw", utf8Encoder.encode(key), alg, false, usages);
}
__name(importPrivateKey, "importPrivateKey");
async function importPublicKey(key, alg) {
  if (!crypto.subtle || !crypto.subtle.importKey) {
    throw new Error("`crypto.subtle.importKey` is undefined. JWT auth middleware requires it.");
  }
  if (isCryptoKey(key)) {
    if (key.type === "public" || key.type === "secret") {
      return key;
    }
    key = await exportPublicJwkFrom(key);
  }
  if (typeof key === "string" && key.includes("PRIVATE")) {
    const privateKey = await crypto.subtle.importKey("pkcs8", pemToBinary(key), alg, true, [
      CryptoKeyUsage.Sign
    ]);
    key = await exportPublicJwkFrom(privateKey);
  }
  const usages = [CryptoKeyUsage.Verify];
  if (typeof key === "object") {
    return await crypto.subtle.importKey("jwk", key, alg, false, usages);
  }
  if (key.includes("PUBLIC")) {
    return await crypto.subtle.importKey("spki", pemToBinary(key), alg, false, usages);
  }
  return await crypto.subtle.importKey("raw", utf8Encoder.encode(key), alg, false, usages);
}
__name(importPublicKey, "importPublicKey");
async function exportPublicJwkFrom(privateKey) {
  if (privateKey.type !== "private") {
    throw new Error(`unexpected key type: ${privateKey.type}`);
  }
  if (!privateKey.extractable) {
    throw new Error("unexpected private key is unextractable");
  }
  const jwk = await crypto.subtle.exportKey("jwk", privateKey);
  const { kty } = jwk;
  const { alg, e, n } = jwk;
  const { crv, x, y } = jwk;
  return { kty, alg, e, n, crv, x, y, key_ops: [CryptoKeyUsage.Verify] };
}
__name(exportPublicJwkFrom, "exportPublicJwkFrom");
function getKeyAlgorithm(name) {
  switch (name) {
    case "HS256":
      return {
        name: "HMAC",
        hash: {
          name: "SHA-256"
        }
      };
    case "HS384":
      return {
        name: "HMAC",
        hash: {
          name: "SHA-384"
        }
      };
    case "HS512":
      return {
        name: "HMAC",
        hash: {
          name: "SHA-512"
        }
      };
    case "RS256":
      return {
        name: "RSASSA-PKCS1-v1_5",
        hash: {
          name: "SHA-256"
        }
      };
    case "RS384":
      return {
        name: "RSASSA-PKCS1-v1_5",
        hash: {
          name: "SHA-384"
        }
      };
    case "RS512":
      return {
        name: "RSASSA-PKCS1-v1_5",
        hash: {
          name: "SHA-512"
        }
      };
    case "PS256":
      return {
        name: "RSA-PSS",
        hash: {
          name: "SHA-256"
        },
        saltLength: 32
      };
    case "PS384":
      return {
        name: "RSA-PSS",
        hash: {
          name: "SHA-384"
        },
        saltLength: 48
      };
    case "PS512":
      return {
        name: "RSA-PSS",
        hash: {
          name: "SHA-512"
        },
        saltLength: 64
      };
    case "ES256":
      return {
        name: "ECDSA",
        hash: {
          name: "SHA-256"
        },
        namedCurve: "P-256"
      };
    case "ES384":
      return {
        name: "ECDSA",
        hash: {
          name: "SHA-384"
        },
        namedCurve: "P-384"
      };
    case "ES512":
      return {
        name: "ECDSA",
        hash: {
          name: "SHA-512"
        },
        namedCurve: "P-521"
      };
    case "EdDSA":
      return {
        name: "Ed25519",
        namedCurve: "Ed25519"
      };
    default:
      throw new JwtAlgorithmNotImplemented(name);
  }
}
__name(getKeyAlgorithm, "getKeyAlgorithm");
function isCryptoKey(key) {
  const runtime = getRuntimeKey();
  if (runtime === "node" && !!crypto.webcrypto) {
    return key instanceof crypto.webcrypto.CryptoKey;
  }
  return key instanceof CryptoKey;
}
__name(isCryptoKey, "isCryptoKey");

// ../node_modules/hono/dist/utils/jwt/jwt.js
var encodeJwtPart = /* @__PURE__ */ __name((part) => encodeBase64Url(utf8Encoder.encode(JSON.stringify(part)).buffer).replace(/=/g, ""), "encodeJwtPart");
var encodeSignaturePart = /* @__PURE__ */ __name((buf) => encodeBase64Url(buf).replace(/=/g, ""), "encodeSignaturePart");
var decodeJwtPart = /* @__PURE__ */ __name((part) => JSON.parse(utf8Decoder.decode(decodeBase64Url(part))), "decodeJwtPart");
function isTokenHeader(obj) {
  if (typeof obj === "object" && obj !== null) {
    const objWithAlg = obj;
    return "alg" in objWithAlg && Object.values(AlgorithmTypes).includes(objWithAlg.alg) && (!("typ" in objWithAlg) || objWithAlg.typ === "JWT");
  }
  return false;
}
__name(isTokenHeader, "isTokenHeader");
var sign = /* @__PURE__ */ __name(async (payload, privateKey, alg = "HS256") => {
  const encodedPayload = encodeJwtPart(payload);
  let encodedHeader;
  if (typeof privateKey === "object" && "alg" in privateKey) {
    alg = privateKey.alg;
    encodedHeader = encodeJwtPart({ alg, typ: "JWT", kid: privateKey.kid });
  } else {
    encodedHeader = encodeJwtPart({ alg, typ: "JWT" });
  }
  const partialToken = `${encodedHeader}.${encodedPayload}`;
  const signaturePart = await signing(privateKey, alg, utf8Encoder.encode(partialToken));
  const signature = encodeSignaturePart(signaturePart);
  return `${partialToken}.${signature}`;
}, "sign");
var verify = /* @__PURE__ */ __name(async (token, publicKey, algOrOptions) => {
  const optsIn = typeof algOrOptions === "string" ? { alg: algOrOptions } : algOrOptions || {};
  const opts = {
    alg: optsIn.alg ?? "HS256",
    iss: optsIn.iss,
    nbf: optsIn.nbf ?? true,
    exp: optsIn.exp ?? true,
    iat: optsIn.iat ?? true
  };
  const tokenParts = token.split(".");
  if (tokenParts.length !== 3) {
    throw new JwtTokenInvalid(token);
  }
  const { header, payload } = decode(token);
  if (!isTokenHeader(header)) {
    throw new JwtHeaderInvalid(header);
  }
  const now = Date.now() / 1e3 | 0;
  if (opts.nbf && payload.nbf && payload.nbf > now) {
    throw new JwtTokenNotBefore(token);
  }
  if (opts.exp && payload.exp && payload.exp <= now) {
    throw new JwtTokenExpired(token);
  }
  if (opts.iat && payload.iat && now < payload.iat) {
    throw new JwtTokenIssuedAt(now, payload.iat);
  }
  if (opts.iss) {
    if (!payload.iss) {
      throw new JwtTokenIssuer(opts.iss, null);
    }
    if (typeof opts.iss === "string" && payload.iss !== opts.iss) {
      throw new JwtTokenIssuer(opts.iss, payload.iss);
    }
    if (opts.iss instanceof RegExp && !opts.iss.test(payload.iss)) {
      throw new JwtTokenIssuer(opts.iss, payload.iss);
    }
  }
  const headerPayload = token.substring(0, token.lastIndexOf("."));
  const verified = await verifying(
    publicKey,
    opts.alg,
    decodeBase64Url(tokenParts[2]),
    utf8Encoder.encode(headerPayload)
  );
  if (!verified) {
    throw new JwtTokenSignatureMismatched(token);
  }
  return payload;
}, "verify");
var verifyWithJwks = /* @__PURE__ */ __name(async (token, options, init) => {
  const verifyOpts = options.verification || {};
  const header = decodeHeader(token);
  if (!isTokenHeader(header)) {
    throw new JwtHeaderInvalid(header);
  }
  if (!header.kid) {
    throw new JwtHeaderRequiresKid(header);
  }
  if (options.jwks_uri) {
    const response = await fetch(options.jwks_uri, init);
    if (!response.ok) {
      throw new Error(`failed to fetch JWKS from ${options.jwks_uri}`);
    }
    const data = await response.json();
    if (!data.keys) {
      throw new Error('invalid JWKS response. "keys" field is missing');
    }
    if (!Array.isArray(data.keys)) {
      throw new Error('invalid JWKS response. "keys" field is not an array');
    }
    if (options.keys) {
      options.keys.push(...data.keys);
    } else {
      options.keys = data.keys;
    }
  } else if (!options.keys) {
    throw new Error('verifyWithJwks requires options for either "keys" or "jwks_uri" or both');
  }
  const matchingKey = options.keys.find((key) => key.kid === header.kid);
  if (!matchingKey) {
    throw new JwtTokenInvalid(token);
  }
  return await verify(token, matchingKey, {
    alg: matchingKey.alg || header.alg,
    ...verifyOpts
  });
}, "verifyWithJwks");
var decode = /* @__PURE__ */ __name((token) => {
  try {
    const [h, p] = token.split(".");
    const header = decodeJwtPart(h);
    const payload = decodeJwtPart(p);
    return {
      header,
      payload
    };
  } catch {
    throw new JwtTokenInvalid(token);
  }
}, "decode");
var decodeHeader = /* @__PURE__ */ __name((token) => {
  try {
    const [h] = token.split(".");
    return decodeJwtPart(h);
  } catch {
    throw new JwtTokenInvalid(token);
  }
}, "decodeHeader");

// ../node_modules/hono/dist/utils/jwt/index.js
var Jwt = { sign, verify, decode, verifyWithJwks };

// ../node_modules/hono/dist/middleware/jwt/jwt.js
var verifyWithJwks2 = Jwt.verifyWithJwks;
var verify2 = Jwt.verify;
var decode2 = Jwt.decode;
var sign2 = Jwt.sign;

// api/auth/login.ts
async function sha256(text) {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
__name(sha256, "sha256");
var app = new Hono2();
app.post("/", async (c) => {
  try {
    const { fullName, password } = await c.req.json();
    if (!fullName || !password) {
      return c.json({ error: "Full name and password are required" }, 400);
    }
    const user = await c.env.DB.prepare("SELECT id, full_name, password_hash, is_admin FROM users WHERE full_name = ?").bind(fullName).first();
    if (!user)
      return c.json({ error: "Invalid credentials" }, 401);
    const hashed = await sha256(password);
    if (hashed !== user.password_hash)
      return c.json({ error: "Invalid credentials" }, 401);
    const token = await sign2({
      id: user.id,
      name: user.full_name,
      isAdmin: !!user.is_admin,
      iat: Math.floor(Date.now() / 1e3),
      exp: Math.floor(Date.now() / 1e3) + 24 * 60 * 60
    }, c.env.JWT_SECRET);
    return c.json({
      token,
      user: { id: user.id, name: user.full_name, isAdmin: !!user.is_admin },
      message: "Login successful"
    });
  } catch (e) {
    console.error("login error", e);
    return c.json({ error: "Internal server error" }, 500);
  }
});
var login_default = app;

// api/auth/register.ts
async function sha2562(text) {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
__name(sha2562, "sha256");
var app2 = new Hono2();
app2.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const fullName = body.fullName;
    const password = body.password;
    const is_admin = body.is_admin;
    if (!fullName || !password) {
      return c.json({ error: "Full name and password are required" }, 400);
    }
    let isAdminValue = 0;
    if (is_admin === true) {
      const auth = c.req.header("Authorization");
      if (!auth?.startsWith("Bearer "))
        return c.json({ error: "Only admins can create admin users" }, 403);
      try {
        const token2 = auth.split(" ")[1];
        const decoded = await verify2(token2, c.env.JWT_SECRET);
        if (!(decoded.isAdmin === true || decoded.isAdmin === 1)) {
          return c.json({ error: "Only admins can create admin users" }, 403);
        }
        isAdminValue = 1;
      } catch {
        return c.json({ error: "Invalid authorization" }, 401);
      }
    }
    if (password.length < 6) {
      return c.json({ error: "Password must be at least 6 characters" }, 400);
    }
    const password_hash = await sha2562(password);
    const { success, meta } = await c.env.DB.prepare(
      "INSERT INTO users (full_name, password_hash, is_admin) VALUES (?, ?, ?)"
    ).bind(fullName, password_hash, isAdminValue).run();
    if (!success)
      return c.json({ error: "Failed to register" }, 500);
    const token = await sign2({
      id: meta.last_row_id,
      name: fullName,
      isAdmin: !!isAdminValue,
      iat: Math.floor(Date.now() / 1e3),
      exp: Math.floor(Date.now() / 1e3) + 24 * 60 * 60
    }, c.env.JWT_SECRET);
    return c.json({
      token,
      user: { id: meta.last_row_id, name: fullName, isAdmin: !!isAdminValue },
      message: "Registration successful"
    });
  } catch (e) {
    if (e instanceof Error && e.message.includes("UNIQUE")) {
      return c.json({ error: "User already exists" }, 409);
    }
    console.error("register error", e);
    return c.json({ error: "Internal server error" }, 500);
  }
});
var register_default = app2;

// ../node_modules/hono/dist/helper/factory/index.js
var createMiddleware = /* @__PURE__ */ __name((middleware) => middleware, "createMiddleware");

// ../node_modules/hono/dist/middleware/cors/index.js
var cors = /* @__PURE__ */ __name((options) => {
  const defaults = {
    origin: "*",
    allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"],
    allowHeaders: [],
    exposeHeaders: []
  };
  const opts = {
    ...defaults,
    ...options
  };
  const findAllowOrigin = ((optsOrigin) => {
    if (typeof optsOrigin === "string") {
      if (optsOrigin === "*") {
        return () => optsOrigin;
      } else {
        return (origin) => optsOrigin === origin ? origin : null;
      }
    } else if (typeof optsOrigin === "function") {
      return optsOrigin;
    } else {
      return (origin) => optsOrigin.includes(origin) ? origin : null;
    }
  })(opts.origin);
  const findAllowMethods = ((optsAllowMethods) => {
    if (typeof optsAllowMethods === "function") {
      return optsAllowMethods;
    } else if (Array.isArray(optsAllowMethods)) {
      return () => optsAllowMethods;
    } else {
      return () => [];
    }
  })(opts.allowMethods);
  return /* @__PURE__ */ __name(async function cors2(c, next) {
    function set(key, value) {
      c.res.headers.set(key, value);
    }
    __name(set, "set");
    const allowOrigin = findAllowOrigin(c.req.header("origin") || "", c);
    if (allowOrigin) {
      set("Access-Control-Allow-Origin", allowOrigin);
    }
    if (opts.origin !== "*") {
      const existingVary = c.req.header("Vary");
      if (existingVary) {
        set("Vary", existingVary);
      } else {
        set("Vary", "Origin");
      }
    }
    if (opts.credentials) {
      set("Access-Control-Allow-Credentials", "true");
    }
    if (opts.exposeHeaders?.length) {
      set("Access-Control-Expose-Headers", opts.exposeHeaders.join(","));
    }
    if (c.req.method === "OPTIONS") {
      if (opts.maxAge != null) {
        set("Access-Control-Max-Age", opts.maxAge.toString());
      }
      const allowMethods = findAllowMethods(c.req.header("origin") || "", c);
      if (allowMethods.length) {
        set("Access-Control-Allow-Methods", allowMethods.join(","));
      }
      let headers = opts.allowHeaders;
      if (!headers?.length) {
        const requestHeaders = c.req.header("Access-Control-Request-Headers");
        if (requestHeaders) {
          headers = requestHeaders.split(/\s*,\s*/);
        }
      }
      if (headers?.length) {
        set("Access-Control-Allow-Headers", headers.join(","));
        c.res.headers.append("Vary", "Access-Control-Request-Headers");
      }
      c.res.headers.delete("Content-Length");
      c.res.headers.delete("Content-Type");
      return new Response(null, {
        headers: c.res.headers,
        status: 204,
        statusText: "No Content"
      });
    }
    await next();
  }, "cors2");
}, "cors");

// api/middleware.ts
var corsMiddleware = cors({
  origin: "*",
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"]
});
var errorMiddleware = createMiddleware(async (c, next) => {
  try {
    await next();
  } catch (e) {
    console.error("API error:", e);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// api/chat/messages.ts
async function getMessages(c) {
  const { channelId } = c.req.param();
  const userIdStr = c.req.query("user_id");
  const userId = userIdStr ? Number(userIdStr) : void 0;
  if (!channelId)
    return new Response("Channel ID is required", { status: 400 });
  try {
    const channelRow = await c.env.DB.prepare("SELECT is_private FROM channels WHERE id = ?").bind(channelId).first();
    if (!channelRow)
      return new Response("Channel not found", { status: 404 });
    const isPrivate = channelRow.is_private === 1;
    if (isPrivate) {
      if (!userId)
        return new Response("Unauthorized", { status: 401 });
      const adminRow = await c.env.DB.prepare("SELECT is_admin FROM users WHERE id = ?").bind(userId).first();
      const isAdmin = adminRow && adminRow.is_admin === 1;
      if (!isAdmin) {
        const memberRow = await c.env.DB.prepare("SELECT 1 FROM channel_members WHERE channel_id = ? AND user_id = ?").bind(channelId, userId).first();
        if (!memberRow)
          return new Response("Forbidden", { status: 403 });
      }
    }
    const { results } = await c.env.DB.prepare(
      "SELECT messages.*, users.full_name as sender_username, users.avatar_color as sender_avatar_color FROM messages JOIN users ON messages.sender_id = users.id WHERE channel_id = ? ORDER BY timestamp ASC"
    ).bind(channelId).all();
    try {
      const ids = results.map((r) => r.id);
      if (ids.length > 0) {
        const placeholders = ids.map(() => "?").join(",");
        const reactRes = await c.env.DB.prepare(
          `SELECT mr.message_id, mr.user_id, mr.reaction_key, u.full_name as username
					 FROM message_reactions mr JOIN users u ON u.id = mr.user_id
					 WHERE mr.message_id IN (${placeholders})`
        ).bind(...ids).all();
        const byMsg = /* @__PURE__ */ new Map();
        for (const r of reactRes.results || []) {
          const arr = byMsg.get(r.message_id) || [];
          arr.push({ user_id: Number(r.user_id), username: String(r.username), reaction_key: String(r.reaction_key) });
          byMsg.set(r.message_id, arr);
        }
        for (const m of results) {
          const arr = byMsg.get(Number(m.id)) || [];
          const counts = {};
          const mine = [];
          for (const r of arr) {
            counts[r.reaction_key] = (counts[r.reaction_key] || 0) + 1;
            if (userId && r.user_id === userId)
              mine.push(r.reaction_key);
          }
          m.reaction_counts = counts;
          m.my_reactions = mine;
        }
      }
    } catch {
    }
    let channelReadStatuses = [];
    try {
      const readRes = await c.env.DB.prepare(
        "SELECT urs.user_id, urs.last_read_timestamp, u.full_name as username FROM user_read_status urs JOIN users u ON u.id = urs.user_id WHERE urs.channel_id = ?"
      ).bind(channelId).all();
      channelReadStatuses = readRes.results?.map((r) => ({
        user_id: Number(r.user_id),
        last_read_timestamp: r.last_read_timestamp,
        username: r.username
      })) || [];
    } catch {
    }
    if (userId && results.length > 0) {
      try {
        const otherReadRow = await c.env.DB.prepare(
          "SELECT MAX(last_read_timestamp) as max_ts FROM user_read_status WHERE channel_id = ? AND user_id != ?"
        ).bind(channelId, userId).first();
        const otherMaxRead = otherReadRow?.max_ts || null;
        if (otherMaxRead) {
          const otherReadTime = new Date(otherMaxRead).getTime();
          for (const r of results) {
            if (r.sender_id === userId) {
              const msgTime = new Date(r.timestamp).getTime();
              r.read_by_any = otherReadTime >= msgTime ? 1 : 0;
            }
          }
        } else {
          for (const r of results) {
            if (r.sender_id === userId)
              r.read_by_any = 0;
          }
        }
      } catch {
      }
    }
    try {
      if (Array.isArray(results) && channelReadStatuses.length > 0) {
        for (const r of results) {
          const msgTime = new Date(r.timestamp).getTime();
          const readers = channelReadStatuses.filter((s) => s.user_id !== Number(r.sender_id) && new Date(s.last_read_timestamp).getTime() >= msgTime).map((s) => ({ user_id: s.user_id, username: s.username, read_at: s.last_read_timestamp }));
          r.readers = readers;
        }
      }
    } catch {
    }
    if (userId && results.length > 0) {
      try {
        const timestamp = (/* @__PURE__ */ new Date()).toISOString();
        await c.env.DB.prepare(
          `INSERT INTO user_read_status (user_id, channel_id, last_read_timestamp)
					 VALUES (?, ?, ?)
					 ON CONFLICT(user_id, channel_id) DO UPDATE SET last_read_timestamp = excluded.last_read_timestamp`
        ).bind(userId, channelId, timestamp).run();
      } catch {
      }
    }
    return new Response(JSON.stringify(results), { headers: { "Content-Type": "application/json" } });
  } catch (error) {
    return new Response("Error fetching messages", { status: 500 });
  }
}
__name(getMessages, "getMessages");
async function sendMessage(c) {
  const { channelId } = c.req.param();
  const userIdStr = c.req.query("user_id");
  const userIdFromQuery = userIdStr ? Number(userIdStr) : void 0;
  if (!channelId)
    return new Response("Channel ID is required", { status: 400 });
  try {
    const { content, sender_id } = await c.req.json();
    if (!content || !sender_id)
      return new Response("Content and sender_id are required", { status: 400 });
    const effectiveUserId = userIdFromQuery || Number(sender_id);
    if (!effectiveUserId)
      return new Response("Unauthorized", { status: 401 });
    const chanRow = await c.env.DB.prepare("SELECT is_private FROM channels WHERE id = ?").bind(channelId).first();
    if (!chanRow)
      return new Response("Channel not found", { status: 404 });
    const isPrivateChan = chanRow.is_private === 1;
    if (isPrivateChan) {
      const admRow = await c.env.DB.prepare("SELECT is_admin FROM users WHERE id = ?").bind(effectiveUserId).first();
      const isAdmin = admRow && admRow.is_admin === 1;
      if (!isAdmin) {
        const membRow = await c.env.DB.prepare("SELECT 1 FROM channel_members WHERE channel_id = ? AND user_id = ?").bind(channelId, effectiveUserId).first();
        if (!membRow)
          return new Response("Forbidden", { status: 403 });
      }
    }
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    const result = await c.env.DB.prepare(
      "INSERT INTO messages (channel_id, sender_id, content, timestamp) VALUES (?, ?, ?, ?)"
    ).bind(channelId, sender_id, content, timestamp).run();
    if (result.success) {
      try {
        await c.env.DB.prepare(
          `INSERT INTO user_read_status (user_id, channel_id, last_read_timestamp)
					 VALUES (?, ?, ?)
					 ON CONFLICT(user_id, channel_id) DO UPDATE SET last_read_timestamp = excluded.last_read_timestamp`
        ).bind(sender_id, channelId, timestamp).run();
      } catch {
      }
      return new Response(JSON.stringify({ message: "Message sent" }), { status: 201, headers: { "Content-Type": "application/json" } });
    }
    return new Response("Failed to send message", { status: 500 });
  } catch {
    return new Response("Error sending message", { status: 500 });
  }
}
__name(sendMessage, "sendMessage");
async function deleteMessage(c) {
  const { messageId } = c.req.param();
  if (!messageId)
    return new Response("Message ID is required", { status: 400 });
  try {
    const { user_id } = await c.req.json();
    if (!user_id)
      return new Response("User ID is required", { status: 400 });
    const message = await c.env.DB.prepare("SELECT sender_id FROM messages WHERE id = ?").bind(messageId).first();
    if (!message)
      return new Response("Message not found", { status: 404 });
    const isAdminRow = await c.env.DB.prepare("SELECT is_admin FROM users WHERE id = ?").bind(user_id).first();
    const isAuthorized = isAdminRow && isAdminRow.is_admin === 1 || message.sender_id === Number(user_id);
    if (!isAuthorized)
      return new Response("Unauthorized", { status: 403 });
    const result = await c.env.DB.prepare("DELETE FROM messages WHERE id = ?").bind(messageId).run();
    if (result.success)
      return new Response(JSON.stringify({ message: "Message deleted" }), { headers: { "Content-Type": "application/json" } });
    return new Response("Failed to delete message", { status: 500 });
  } catch {
    return new Response("Error deleting message", { status: 500 });
  }
}
__name(deleteMessage, "deleteMessage");
async function getDMMessages(c) {
  const { dmId } = c.req.param();
  const userIdStr = c.req.query("user_id");
  const userId = userIdStr ? Number(userIdStr) : void 0;
  if (!dmId || !dmId.startsWith("dm_"))
    return new Response("Invalid DM ID", { status: 400 });
  if (!userId)
    return new Response("User ID is required", { status: 401 });
  try {
    const dmParts = dmId.split("_");
    if (dmParts.length !== 3)
      return new Response("Invalid DM ID format", { status: 400 });
    const user1Id = parseInt(dmParts[1]);
    const user2Id = parseInt(dmParts[2]);
    if (userId !== user1Id && userId !== user2Id)
      return new Response("Unauthorized", { status: 403 });
    const { results } = await c.env.DB.prepare(
      "SELECT messages.*, users.full_name as sender_username, users.avatar_color as sender_avatar_color FROM messages JOIN users ON messages.sender_id = users.id WHERE channel_id = ? ORDER BY timestamp ASC"
    ).bind(dmId).all();
    try {
      const ids = results.map((r) => r.id);
      if (ids.length > 0) {
        const placeholders = ids.map(() => "?").join(",");
        const reactRes = await c.env.DB.prepare(
          `SELECT mr.message_id, mr.user_id, mr.reaction_key, u.full_name as username
					 FROM message_reactions mr JOIN users u ON u.id = mr.user_id
					 WHERE mr.message_id IN (${placeholders})`
        ).bind(...ids).all();
        const byMsg = /* @__PURE__ */ new Map();
        for (const r of reactRes.results || []) {
          const arr = byMsg.get(r.message_id) || [];
          arr.push({ user_id: Number(r.user_id), username: String(r.username), reaction_key: String(r.reaction_key) });
          byMsg.set(r.message_id, arr);
        }
        for (const m of results) {
          const arr = byMsg.get(Number(m.id)) || [];
          const counts = {};
          const mine = [];
          for (const r of arr) {
            counts[r.reaction_key] = (counts[r.reaction_key] || 0) + 1;
            if (userId && r.user_id === userId)
              mine.push(r.reaction_key);
          }
          m.reaction_counts = counts;
          m.my_reactions = mine;
        }
      }
    } catch {
    }
    let dmReadStatuses = [];
    try {
      const readRes = await c.env.DB.prepare(
        "SELECT urs.user_id, urs.last_read_timestamp, u.full_name as username FROM user_read_status urs JOIN users u ON u.id = urs.user_id WHERE urs.channel_id = ?"
      ).bind(dmId).all();
      dmReadStatuses = readRes.results?.map((r) => ({
        user_id: Number(r.user_id),
        last_read_timestamp: r.last_read_timestamp,
        username: r.username
      })) || [];
    } catch {
    }
    try {
      const otherId = userId === user1Id ? user2Id : user1Id;
      const otherReadRow = await c.env.DB.prepare("SELECT last_read_timestamp FROM user_read_status WHERE user_id = ? AND channel_id = ?").bind(otherId, dmId).first();
      const otherLastRead = otherReadRow?.last_read_timestamp || null;
      if (otherLastRead) {
        const otherReadTime = new Date(otherLastRead).getTime();
        for (const r of results) {
          if (r.sender_id === userId) {
            r.read_by_any = otherReadTime >= new Date(r.timestamp).getTime() ? 1 : 0;
          }
        }
      } else {
        for (const r of results)
          if (r.sender_id === userId)
            r.read_by_any = 0;
      }
    } catch {
    }
    try {
      if (Array.isArray(results) && dmReadStatuses.length > 0) {
        for (const r of results) {
          const msgTime = new Date(r.timestamp).getTime();
          const readers = dmReadStatuses.filter((s) => s.user_id !== Number(r.sender_id) && new Date(s.last_read_timestamp).getTime() >= msgTime).map((s) => ({ user_id: s.user_id, username: s.username, read_at: s.last_read_timestamp }));
          r.readers = readers;
        }
      }
    } catch {
    }
    if (results.length > 0) {
      try {
        const timestamp = (/* @__PURE__ */ new Date()).toISOString();
        await c.env.DB.prepare(
          `INSERT INTO user_read_status (user_id, channel_id, last_read_timestamp)
					 VALUES (?, ?, ?)
					 ON CONFLICT(user_id, channel_id) DO UPDATE SET last_read_timestamp = excluded.last_read_timestamp`
        ).bind(userId, dmId, timestamp).run();
      } catch {
      }
    }
    return new Response(JSON.stringify(results), { headers: { "Content-Type": "application/json" } });
  } catch {
    return new Response("Error fetching DM messages", { status: 500 });
  }
}
__name(getDMMessages, "getDMMessages");
async function sendDMMessage(c) {
  const { dmId } = c.req.param();
  const userIdStr = c.req.query("user_id");
  const userIdFromQuery = userIdStr ? Number(userIdStr) : void 0;
  if (!dmId || !dmId.startsWith("dm_"))
    return new Response("Invalid DM ID", { status: 400 });
  try {
    const { content, sender_id } = await c.req.json();
    if (!content || !sender_id)
      return new Response("Content and sender_id are required", { status: 400 });
    const effectiveUserId = userIdFromQuery || Number(sender_id);
    if (!effectiveUserId)
      return new Response("Unauthorized", { status: 401 });
    const dmParts = dmId.split("_");
    if (dmParts.length !== 3)
      return new Response("Invalid DM ID format", { status: 400 });
    const user1Id = parseInt(dmParts[1]);
    const user2Id = parseInt(dmParts[2]);
    if (sender_id !== user1Id && sender_id !== user2Id)
      return new Response("Unauthorized", { status: 403 });
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    const result = await c.env.DB.prepare(
      "INSERT INTO messages (channel_id, sender_id, content, timestamp) VALUES (?, ?, ?, ?)"
    ).bind(dmId, sender_id, content, timestamp).run();
    if (result.success) {
      try {
        await c.env.DB.prepare(
          `INSERT INTO user_read_status (user_id, channel_id, last_read_timestamp)
					 VALUES (?, ?, ?)
					 ON CONFLICT(user_id, channel_id) DO UPDATE SET last_read_timestamp = excluded.last_read_timestamp`
        ).bind(sender_id, dmId, timestamp).run();
      } catch {
      }
      return new Response(JSON.stringify({ message: "DM message sent" }), { status: 201, headers: { "Content-Type": "application/json" } });
    }
    return new Response("Failed to send DM message", { status: 500 });
  } catch {
    return new Response("Error sending DM message", { status: 500 });
  }
}
__name(sendDMMessage, "sendDMMessage");

// api/chat/channels.ts
async function getChannels(c) {
  try {
    const userIdStr = c.req.query("user_id");
    let channels;
    if (userIdStr) {
      const userId = Number(userIdStr);
      const adminRow = await c.env.DB.prepare("SELECT is_admin FROM users WHERE id = ?").bind(userId).first();
      const isAdmin = adminRow && adminRow.is_admin === 1;
      if (isAdmin) {
        const { results } = await c.env.DB.prepare('SELECT * FROM channels WHERE id NOT LIKE "dm_%" AND id NOT LIKE "group_%" ORDER BY position ASC').all();
        channels = results;
      } else {
        const { results } = await c.env.DB.prepare(
          `SELECT DISTINCT channels.*
           FROM channels
           LEFT JOIN channel_members ON channels.id = channel_members.channel_id AND channel_members.user_id = ?
           WHERE channels.id NOT LIKE "dm_%" AND channels.id NOT LIKE "group_%" AND (channels.is_private = 0 OR channel_members.user_id = ?)
           ORDER BY channels.position ASC`
        ).bind(userId, userId).all();
        channels = results;
      }
    } else {
      const { results } = await c.env.DB.prepare('SELECT * FROM channels WHERE is_private = 0 AND id NOT LIKE "dm_%" AND id NOT LIKE "group_%" ORDER BY position ASC').all();
      channels = results;
    }
    return new Response(JSON.stringify(channels), { headers: { "Content-Type": "application/json" } });
  } catch (e) {
    return new Response("Error fetching channels", { status: 500 });
  }
}
__name(getChannels, "getChannels");
async function createChannel(c) {
  try {
    const { id, name, created_by, is_private = false, members = [] } = await c.req.json();
    if (!id || !name)
      return new Response("Channel ID and name are required", { status: 400 });
    const existing = await c.env.DB.prepare("SELECT id FROM channels WHERE id = ?").bind(id).first();
    if (existing)
      return new Response("Channel ID already exists", { status: 409 });
    const positionRow = await c.env.DB.prepare("SELECT COALESCE(MAX(position), 0) as max_pos FROM channels").first();
    const position = positionRow ? positionRow.max_pos + 1 : 1;
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const result = await c.env.DB.prepare(
      "INSERT INTO channels (id, name, created_by, created_at, updated_at, position, is_private) VALUES (?, ?, ?, ?, ?, ?, ?)"
    ).bind(id, name, created_by, now, now, position, is_private ? 1 : 0).run();
    if (!result.success)
      return new Response("Failed to create channel", { status: 500 });
    if (is_private) {
      const memberIds = Array.isArray(members) ? [...members] : [];
      if (created_by && !memberIds.includes(Number(created_by)))
        memberIds.push(Number(created_by));
      for (const m of memberIds) {
        try {
          await c.env.DB.prepare("INSERT INTO channel_members (channel_id, user_id) VALUES (?, ?)").bind(id, m).run();
        } catch {
        }
      }
    }
    return new Response(JSON.stringify({ message: "Channel created", id, name, position, is_private }), { status: 201, headers: { "Content-Type": "application/json" } });
  } catch {
    return new Response("Error creating channel", { status: 500 });
  }
}
__name(createChannel, "createChannel");
async function updateChannel(c) {
  try {
    const { channelId } = c.req.param();
    const { name, is_private, members = [] } = await c.req.json();
    if (!name)
      return new Response("Channel name is required", { status: 400 });
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const result = await c.env.DB.prepare("UPDATE channels SET name = ?, is_private = ?, updated_at = ? WHERE id = ?").bind(name, is_private ? 1 : 0, now, channelId).run();
    if (!result.success)
      return new Response("Channel not found", { status: 404 });
    await c.env.DB.prepare("DELETE FROM channel_members WHERE channel_id = ?").bind(channelId).run();
    if (is_private && Array.isArray(members)) {
      for (const m of members) {
        try {
          await c.env.DB.prepare("INSERT INTO channel_members (channel_id, user_id) VALUES (?, ?)").bind(channelId, m).run();
        } catch {
        }
      }
    }
    return new Response(JSON.stringify({ message: "Channel updated", id: channelId, name, is_private }), { headers: { "Content-Type": "application/json" } });
  } catch {
    return new Response("Error updating channel", { status: 500 });
  }
}
__name(updateChannel, "updateChannel");
async function deleteChannel(c) {
  try {
    const { channelId } = c.req.param();
    if (channelId === "general")
      return new Response("Cannot delete the general channel", { status: 403 });
    await c.env.DB.prepare("DELETE FROM channel_members WHERE channel_id = ?").bind(channelId).run();
    await c.env.DB.prepare("DELETE FROM messages WHERE channel_id = ?").bind(channelId).run();
    const result = await c.env.DB.prepare("DELETE FROM channels WHERE id = ?").bind(channelId).run();
    if (!result.success)
      return new Response("Channel not found", { status: 404 });
    return new Response(JSON.stringify({ message: "Channel deleted" }), { headers: { "Content-Type": "application/json" } });
  } catch {
    return new Response("Error deleting channel", { status: 500 });
  }
}
__name(deleteChannel, "deleteChannel");
async function reorderChannels(c) {
  try {
    const { channels } = await c.req.json();
    if (!channels || !Array.isArray(channels) || channels.length === 0)
      return new Response("Channels array is required", { status: 400 });
    for (const ch of channels) {
      await c.env.DB.prepare("UPDATE channels SET position = ? WHERE id = ?").bind(ch.position, ch.id).run();
    }
    const { results } = await c.env.DB.prepare("SELECT * FROM channels ORDER BY position ASC").all();
    return new Response(JSON.stringify({ message: "Channels reordered", channels: results }), { headers: { "Content-Type": "application/json" } });
  } catch {
    return new Response("Error reordering channels", { status: 500 });
  }
}
__name(reorderChannels, "reorderChannels");
async function getGroupChats(c) {
  try {
    const userIdStr = c.req.query("user_id");
    if (!userIdStr)
      return new Response("User ID is required", { status: 400 });
    const userId = Number(userIdStr);
    const { results } = await c.env.DB.prepare(
      `SELECT DISTINCT channels.*, COALESCE(MAX(messages.timestamp), channels.created_at) as last_activity
       FROM channels 
       JOIN channel_members ON channels.id = channel_members.channel_id 
       LEFT JOIN messages ON channels.id = messages.channel_id
       WHERE channels.id LIKE 'group_%' AND channel_members.user_id = ?
       GROUP BY channels.id, channels.name, channels.created_by, channels.created_at, channels.updated_at, channels.position, channels.is_private
       ORDER BY last_activity DESC`
    ).bind(userId).all();
    return new Response(JSON.stringify(results), { headers: { "Content-Type": "application/json" } });
  } catch {
    return new Response("Error fetching group chats", { status: 500 });
  }
}
__name(getGroupChats, "getGroupChats");
async function createGroupChat(c) {
  try {
    const { name, created_by, members = [] } = await c.req.json();
    if (!name || !created_by)
      return new Response("Group name and creator ID are required", { status: 400 });
    if (!Array.isArray(members) || members.length === 0)
      return new Response("At least one member is required", { status: 400 });
    const groupId = `group_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const result = await c.env.DB.prepare("INSERT INTO channels (id, name, created_by, created_at, updated_at, position, is_private) VALUES (?, ?, ?, ?, ?, ?, 1)").bind(groupId, name, created_by, now, now, 0).run();
    if (!result.success)
      return new Response("Failed to create group chat", { status: 500 });
    const memberIds = [...members];
    if (!memberIds.includes(Number(created_by)))
      memberIds.push(Number(created_by));
    for (const m of memberIds) {
      try {
        await c.env.DB.prepare("INSERT INTO channel_members (channel_id, user_id) VALUES (?, ?)").bind(groupId, m).run();
      } catch {
      }
    }
    return new Response(JSON.stringify({ message: "Group chat created", id: groupId, name, members: memberIds }), { status: 201, headers: { "Content-Type": "application/json" } });
  } catch {
    return new Response("Error creating group chat", { status: 500 });
  }
}
__name(createGroupChat, "createGroupChat");
async function updateGroupChat(c) {
  try {
    const { groupId } = c.req.param();
    const { name, members = [] } = await c.req.json();
    if (!name)
      return new Response("Group name is required", { status: 400 });
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const result = await c.env.DB.prepare("UPDATE channels SET name = ?, updated_at = ? WHERE id = ?").bind(name, now, groupId).run();
    if (!result.success)
      return new Response("Group chat not found", { status: 404 });
    if (Array.isArray(members) && members.length > 0) {
      await c.env.DB.prepare("DELETE FROM channel_members WHERE channel_id = ?").bind(groupId).run();
      for (const m of members) {
        try {
          await c.env.DB.prepare("INSERT INTO channel_members (channel_id, user_id) VALUES (?, ?)").bind(groupId, m).run();
        } catch {
        }
      }
    }
    return new Response(JSON.stringify({ message: "Group chat updated", id: groupId, name, members }), { headers: { "Content-Type": "application/json" } });
  } catch {
    return new Response("Error updating group chat", { status: 500 });
  }
}
__name(updateGroupChat, "updateGroupChat");
async function getChannelMembers(c) {
  try {
    const { channelId } = c.req.param();
    const { results } = await c.env.DB.prepare(
      `SELECT channel_members.user_id, users.full_name as username 
       FROM channel_members 
       JOIN users ON channel_members.user_id = users.id 
       WHERE channel_members.channel_id = ?`
    ).bind(channelId).all();
    return new Response(JSON.stringify(results), { headers: { "Content-Type": "application/json" } });
  } catch {
    return new Response("Error fetching channel members", { status: 500 });
  }
}
__name(getChannelMembers, "getChannelMembers");
async function deleteGroupChat(c) {
  try {
    const { groupId } = c.req.param();
    if (!groupId.startsWith("group_"))
      return new Response("Invalid group ID", { status: 400 });
    await c.env.DB.prepare("DELETE FROM channel_members WHERE channel_id = ?").bind(groupId).run();
    await c.env.DB.prepare("DELETE FROM messages WHERE channel_id = ?").bind(groupId).run();
    const result = await c.env.DB.prepare("DELETE FROM channels WHERE id = ?").bind(groupId).run();
    if (!result.success)
      return new Response("Group chat not found", { status: 404 });
    return new Response(JSON.stringify({ message: "Group chat deleted" }), { headers: { "Content-Type": "application/json" } });
  } catch {
    return new Response("Error deleting group chat", { status: 500 });
  }
}
__name(deleteGroupChat, "deleteGroupChat");

// api/chat/notifications.ts
async function markChannelAsRead(c) {
  try {
    const { channelId } = c.req.param();
    const { user_id } = await c.req.json();
    if (!user_id || !channelId)
      return new Response("User ID and Channel ID are required", { status: 400 });
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    await c.env.DB.prepare(
      `INSERT INTO user_read_status (user_id, channel_id, last_read_timestamp)
       VALUES (?, ?, ?)
       ON CONFLICT(user_id, channel_id) DO UPDATE SET last_read_timestamp = excluded.last_read_timestamp`
    ).bind(user_id, channelId, timestamp).run();
    return new Response(JSON.stringify({ success: true, timestamp }), { headers: { "Content-Type": "application/json" } });
  } catch {
    return new Response("Error marking channel as read", { status: 500 });
  }
}
__name(markChannelAsRead, "markChannelAsRead");
async function getAllNotificationData(c) {
  try {
    const userIdStr = c.req.query("user_id");
    if (!userIdStr)
      return new Response("User ID is required", { status: 400 });
    const userId = Number(userIdStr);
    const { results: channels } = await c.env.DB.prepare(
      `SELECT DISTINCT channels.*
       FROM channels
       LEFT JOIN channel_members ON channels.id = channel_members.channel_id AND channel_members.user_id = ?
       WHERE channels.id NOT LIKE "dm_%" AND channels.id NOT LIKE "group_%" 
         AND (channels.is_private = 0 OR channel_members.user_id = ?)
       ORDER BY channels.position ASC`
    ).bind(userId, userId).all();
    const { results: dmConversations } = await c.env.DB.prepare(
      `SELECT DISTINCT channel_id FROM messages WHERE channel_id LIKE 'dm_%' AND (channel_id LIKE 'dm_' || ? || '_%' OR channel_id LIKE 'dm_%_' || ?)`
    ).bind(userIdStr, userIdStr).all();
    const { results: groupChats } = await c.env.DB.prepare(
      `SELECT DISTINCT channels.* FROM channels LEFT JOIN channel_members ON channels.id = channel_members.channel_id WHERE channels.id LIKE "group_%" AND channel_members.user_id = ?`
    ).bind(userId).all();
    const allChannelIds = [
      ...channels.map((c2) => c2.id),
      ...dmConversations.map((dm) => dm.channel_id),
      ...groupChats.map((g) => g.id)
    ];
    const unreadCounts = {};
    let channelsUnread = 0;
    let messagesUnread = 0;
    for (const channelId of allChannelIds) {
      try {
        const readStatus = await c.env.DB.prepare("SELECT last_read_timestamp FROM user_read_status WHERE user_id = ? AND channel_id = ?").bind(userId, channelId).first();
        const lastReadTimestamp = readStatus?.last_read_timestamp || "1970-01-01T00:00:00.000Z";
        const unreadResult = await c.env.DB.prepare(
          `SELECT COUNT(*) as count FROM messages WHERE channel_id = ? AND timestamp > ? AND sender_id != ?`
        ).bind(channelId, lastReadTimestamp, userId).first();
        const count = unreadResult?.count || 0;
        if (count > 0) {
          unreadCounts[channelId] = count;
          if (channelId.startsWith("dm_") || channelId.startsWith("group_"))
            messagesUnread += count;
          else
            channelsUnread += count;
        }
      } catch {
      }
    }
    return new Response(JSON.stringify({ unreadCounts, totalUnread: channelsUnread + messagesUnread, channelsUnread, messagesUnread }), { headers: { "Content-Type": "application/json" } });
  } catch {
    return new Response("Error getting notification data", { status: 500 });
  }
}
__name(getAllNotificationData, "getAllNotificationData");
async function getUnreadCounts(c) {
  try {
    const userIdStr = c.req.query("user_id");
    if (!userIdStr)
      return new Response("User ID is required", { status: 400 });
    const userId = Number(userIdStr);
    const { results: channels } = await c.env.DB.prepare(
      `SELECT DISTINCT channels.*
       FROM channels
       LEFT JOIN channel_members ON channels.id = channel_members.channel_id AND channel_members.user_id = ?
       WHERE channels.id NOT LIKE "dm_%" AND channels.id NOT LIKE "group_%" 
         AND (channels.is_private = 0 OR channel_members.user_id = ?)
       ORDER BY channels.position ASC`
    ).bind(userId, userId).all();
    const { results: dmConversations } = await c.env.DB.prepare(
      `SELECT DISTINCT channel_id FROM messages WHERE channel_id LIKE 'dm_%' AND (channel_id LIKE 'dm_' || ? || '_%' OR channel_id LIKE 'dm_%_' || ?)`
    ).bind(userIdStr, userIdStr).all();
    const { results: groupChats } = await c.env.DB.prepare(
      `SELECT DISTINCT channels.* FROM channels LEFT JOIN channel_members ON channels.id = channel_members.channel_id WHERE channels.id LIKE "group_%" AND channel_members.user_id = ?`
    ).bind(userId).all();
    const allChannelIds = [
      ...channels.map((c2) => c2.id),
      ...dmConversations.map((dm) => dm.channel_id),
      ...groupChats.map((g) => g.id)
    ];
    const unreadCounts = {};
    for (const channelId of allChannelIds) {
      try {
        const readStatus = await c.env.DB.prepare("SELECT last_read_timestamp FROM user_read_status WHERE user_id = ? AND channel_id = ?").bind(userId, channelId).first();
        const lastReadTimestamp = readStatus?.last_read_timestamp || "1970-01-01T00:00:00.000Z";
        const unreadResult = await c.env.DB.prepare(
          `SELECT COUNT(*) as count FROM messages WHERE channel_id = ? AND timestamp > ? AND sender_id != ?`
        ).bind(channelId, lastReadTimestamp, userId).first();
        const count = unreadResult?.count || 0;
        if (count > 0)
          unreadCounts[channelId] = count;
      } catch {
      }
    }
    return new Response(JSON.stringify(unreadCounts), { headers: { "Content-Type": "application/json" } });
  } catch {
    return new Response("Error getting unread counts", { status: 500 });
  }
}
__name(getUnreadCounts, "getUnreadCounts");
async function getTotalUnreadCount(c) {
  try {
    const userIdStr = c.req.query("user_id");
    if (!userIdStr)
      return new Response("User ID is required", { status: 400 });
    const userId = Number(userIdStr);
    const { results: regularChannels } = await c.env.DB.prepare(
      `SELECT DISTINCT channels.id as channel_id
       FROM channels
       LEFT JOIN channel_members ON channels.id = channel_members.channel_id AND channel_members.user_id = ?
       WHERE channels.id NOT LIKE "dm_%" AND channels.id NOT LIKE "group_%" 
         AND (channels.is_private = 0 OR channel_members.user_id = ?)`
    ).bind(userId, userId).all();
    const { results: dmConversations } = await c.env.DB.prepare(
      `SELECT DISTINCT channel_id FROM messages WHERE channel_id LIKE 'dm_%' AND (channel_id LIKE 'dm_' || ? || '_%' OR channel_id LIKE 'dm_%_' || ?)`
    ).bind(userIdStr, userIdStr).all();
    const { results: groupChats } = await c.env.DB.prepare(
      `SELECT DISTINCT channels.id as channel_id FROM channels LEFT JOIN channel_members ON channels.id = channel_members.channel_id WHERE channels.id LIKE "group_%" AND channel_members.user_id = ?`
    ).bind(userId).all();
    let channelsUnread = 0;
    let messagesUnread = 0;
    for (const row of regularChannels) {
      const channelId = row.channel_id;
      try {
        const readStatus = await c.env.DB.prepare("SELECT last_read_timestamp FROM user_read_status WHERE user_id = ? AND channel_id = ?").bind(userId, channelId).first();
        const lastReadTimestamp = readStatus?.last_read_timestamp || "1970-01-01T00:00:00.000Z";
        const unreadResult = await c.env.DB.prepare(
          `SELECT COUNT(*) as count FROM messages WHERE channel_id = ? AND timestamp > ? AND sender_id != ?`
        ).bind(channelId, lastReadTimestamp, userId).first();
        channelsUnread += unreadResult?.count || 0;
      } catch {
      }
    }
    const allMessages = [...dmConversations, ...groupChats];
    for (const row of allMessages) {
      const channelId = row.channel_id;
      try {
        const readStatus = await c.env.DB.prepare("SELECT last_read_timestamp FROM user_read_status WHERE user_id = ? AND channel_id = ?").bind(userId, channelId).first();
        const lastReadTimestamp = readStatus?.last_read_timestamp || "1970-01-01T00:00:00.000Z";
        const unreadResult = await c.env.DB.prepare(
          `SELECT COUNT(*) as count FROM messages WHERE channel_id = ? AND timestamp > ? AND sender_id != ?`
        ).bind(channelId, lastReadTimestamp, userId).first();
        messagesUnread += unreadResult?.count || 0;
      } catch {
      }
    }
    return new Response(JSON.stringify({ totalUnread: channelsUnread + messagesUnread, channelsUnread, messagesUnread }), { headers: { "Content-Type": "application/json" } });
  } catch {
    return new Response("Error getting total unread count", { status: 500 });
  }
}
__name(getTotalUnreadCount, "getTotalUnreadCount");

// api/chat/users.ts
async function getAllUsers(c) {
  try {
    const { results } = await c.env.DB.prepare("SELECT id, full_name as username, is_admin, avatar_color FROM users ORDER BY full_name ASC").all();
    return new Response(JSON.stringify(results), { headers: { "Content-Type": "application/json" } });
  } catch {
    return new Response("Error fetching users", { status: 500 });
  }
}
__name(getAllUsers, "getAllUsers");
async function getRecentDMUsers(c) {
  try {
    const userIdStr = c.req.query("user_id");
    const userId = userIdStr ? Number(userIdStr) : void 0;
    if (!userId)
      return new Response("User ID is required", { status: 400 });
    const dmLike = "dm_%";
    const { results } = await c.env.DB.prepare(
      `WITH dm_msgs AS (
         SELECT channel_id, MAX(timestamp) as last_time
         FROM messages 
         WHERE channel_id LIKE ? AND (
           channel_id LIKE ? OR channel_id LIKE ?
         )
         GROUP BY channel_id
       ),
       parts AS (
         SELECT
           channel_id,
           last_time,
           CAST(substr(channel_id, 4, instr(substr(channel_id, 4), '_') - 1) AS INTEGER) as uid1,
           CAST(substr(channel_id, 4 + instr(substr(channel_id, 4), '_')) AS INTEGER) as uid2
         FROM dm_msgs
       )
  SELECT u.id, u.full_name as username, u.is_admin,
    u.avatar_color,
    p.last_time as last_message_time
       FROM parts p
       JOIN users u
         ON (
           CASE WHEN p.uid1 = ? THEN p.uid2 WHEN p.uid2 = ? THEN p.uid1 END
         ) = u.id
       ORDER BY p.last_time DESC`
    ).bind(dmLike, `dm_${userId}_%`, `dm_%_${userId}`, userId, userId).all();
    if (!results || results.length === 0) {
      const { results: all } = await c.env.DB.prepare("SELECT id, full_name as username, is_admin, avatar_color FROM users WHERE id != ? ORDER BY full_name ASC").bind(userId).all();
      return new Response(JSON.stringify(all), { headers: { "Content-Type": "application/json" } });
    }
    return new Response(JSON.stringify(results), { headers: { "Content-Type": "application/json" } });
  } catch (e) {
    return new Response("Error fetching recent users", { status: 500 });
  }
}
__name(getRecentDMUsers, "getRecentDMUsers");

// api/chat/index.ts
var chat = new Hono2();
chat.get("/messages/:channelId", getMessages);
chat.post("/messages/:channelId", sendMessage);
chat.delete("/messages/:messageId", deleteMessage);
chat.get("/messages/dm/:dmId", getDMMessages);
chat.post("/messages/dm/:dmId", sendDMMessage);
chat.post("/messages/:messageId/reactions/:reactionKey/toggle", async (c) => {
  const { messageId, reactionKey } = c.req.param();
  const userIdStr = c.req.query("user_id");
  const userId = userIdStr ? Number(userIdStr) : void 0;
  if (!userId)
    return c.json({ error: "User ID is required" }, 400);
  try {
    const msg = await c.env.DB.prepare("SELECT channel_id FROM messages WHERE id = ?").bind(messageId).first();
    if (!msg)
      return c.json({ error: "Message not found" }, 404);
    const channelId = msg.channel_id;
    if (channelId && !channelId.startsWith("dm_")) {
      const chan = await c.env.DB.prepare("SELECT is_private FROM channels WHERE id = ?").bind(channelId).first();
      if (!chan)
        return c.json({ error: "Channel not found" }, 404);
      const isPrivate = chan.is_private === 1;
      if (isPrivate) {
        const adm = await c.env.DB.prepare("SELECT is_admin FROM users WHERE id = ?").bind(userId).first();
        const isAdmin = !!adm && adm.is_admin === 1;
        if (!isAdmin) {
          const mem = await c.env.DB.prepare("SELECT 1 FROM channel_members WHERE channel_id = ? AND user_id = ?").bind(channelId, userId).first();
          if (!mem)
            return c.json({ error: "Forbidden" }, 403);
        }
      }
    } else if (channelId && channelId.startsWith("dm_")) {
      const parts = channelId.split("_");
      if (parts.length !== 3)
        return c.json({ error: "Invalid DM" }, 400);
      const u1 = parseInt(parts[1]);
      const u2 = parseInt(parts[2]);
      if (userId !== u1 && userId !== u2)
        return c.json({ error: "Forbidden" }, 403);
    }
    const existing = await c.env.DB.prepare("SELECT 1 FROM message_reactions WHERE message_id = ? AND user_id = ? AND reaction_key = ?").bind(messageId, userId, reactionKey).first();
    if (existing) {
      await c.env.DB.prepare("DELETE FROM message_reactions WHERE message_id = ? AND user_id = ? AND reaction_key = ?").bind(messageId, userId, reactionKey).run();
      return c.json({ toggled: "off" });
    } else {
      await c.env.DB.prepare("INSERT INTO message_reactions (message_id, user_id, reaction_key, created_at) VALUES (?, ?, ?, ?)").bind(messageId, userId, reactionKey, (/* @__PURE__ */ new Date()).toISOString()).run();
      return c.json({ toggled: "on" });
    }
  } catch (e) {
    return c.json({ error: "Failed to toggle reaction" }, 500);
  }
});
chat.get("/channels", getChannels);
chat.post("/channels", createChannel);
chat.put("/channels/:channelId", updateChannel);
chat.delete("/channels/:channelId", deleteChannel);
chat.get("/channels/:channelId/members", getChannelMembers);
chat.post("/channels/reorder", reorderChannels);
chat.get("/groups", getGroupChats);
chat.post("/groups", createGroupChat);
chat.put("/groups/:groupId", updateGroupChat);
chat.delete("/groups/:groupId", deleteGroupChat);
chat.post("/notifications/read/:channelId", markChannelAsRead);
chat.get("/notifications/all", getAllNotificationData);
chat.get("/notifications/unread", getUnreadCounts);
chat.get("/notifications/total", getTotalUnreadCount);
chat.get("/users", getAllUsers);
chat.get("/users/recent", getRecentDMUsers);
var chat_default = chat;

// api/admin/index.ts
var admin = new Hono2();
async function getAuthUser(c) {
  const auth = c.req.header("Authorization");
  if (!auth || !auth.startsWith("Bearer "))
    return null;
  try {
    const token = auth.split(" ")[1];
    const decoded = await verify2(token, c.env.JWT_SECRET);
    return {
      id: Number(decoded.id),
      name: String(decoded.name || ""),
      isAdmin: !!decoded.isAdmin
    };
  } catch {
    return null;
  }
}
__name(getAuthUser, "getAuthUser");
async function sha2563(text) {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
__name(sha2563, "sha256");
admin.get("/users", async (c) => {
  const au = await getAuthUser(c);
  if (!au || !au.isAdmin)
    return c.json({ error: "Forbidden" }, 403);
  try {
    const { results } = await c.env.DB.prepare("SELECT id, full_name as username, is_admin, created_at, avatar_color FROM users ORDER BY full_name ASC").all();
    return c.json(results);
  } catch (e) {
    console.error("Failed to load users", e);
    return c.json({ error: "Failed to load users" }, 500);
  }
});
admin.put("/users/:userId", async (c) => {
  const au = await getAuthUser(c);
  if (!au || !au.isAdmin)
    return c.json({ error: "Forbidden" }, 403);
  const userId = Number(c.req.param("userId"));
  if (!Number.isFinite(userId))
    return c.json({ error: "Invalid user id" }, 400);
  let body;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: "Invalid JSON" }, 400);
  }
  if (userId === au.id && typeof body.is_admin !== "undefined") {
    return c.json({ error: "Cannot modify your own admin status" }, 400);
  }
  const updates = [];
  const values = [];
  if (typeof body.is_admin !== "undefined") {
    updates.push("is_admin = ?");
    values.push(body.is_admin ? 1 : 0);
  }
  const newName = (body.fullName ?? body.username)?.toString()?.trim();
  if (newName) {
    const existing = await c.env.DB.prepare("SELECT id FROM users WHERE full_name = ? AND id != ?").bind(newName, userId).first();
    if (existing)
      return c.json({ error: "User already exists" }, 409);
    updates.push("full_name = ?");
    values.push(newName);
  }
  const newPassword = body.password?.toString()?.trim();
  if (newPassword) {
    if (newPassword.length < 6)
      return c.json({ error: "Password must be at least 6 characters" }, 400);
    const hash = await sha2563(newPassword);
    updates.push("password_hash = ?");
    values.push(hash);
  }
  if (updates.length === 0)
    return c.json({ error: "No valid fields to update" }, 400);
  values.push(userId);
  try {
    const sql = `UPDATE users SET ${updates.join(", ")} WHERE id = ?`;
    await c.env.DB.prepare(sql).bind(...values).run();
    return c.json({ success: true });
  } catch (e) {
    console.error("Failed to update user", e);
    return c.json({ error: "Failed to update user" }, 500);
  }
});
admin.delete("/users/:userId", async (c) => {
  const au = await getAuthUser(c);
  if (!au || !au.isAdmin)
    return c.json({ error: "Forbidden" }, 403);
  const userId = Number(c.req.param("userId"));
  if (!Number.isFinite(userId))
    return c.json({ error: "Invalid user id" }, 400);
  if (userId === au.id)
    return c.json({ error: "Cannot delete your own account" }, 400);
  try {
    await c.env.DB.prepare("DELETE FROM users WHERE id = ?").bind(userId).run();
    return c.json({ success: true });
  } catch (e) {
    console.error("Failed to delete user", e);
    return c.json({ error: "Failed to delete user" }, 500);
  }
});
var admin_default = admin;

// api/calendar/index.ts
var calendar = new Hono2();
async function getAuthUser2(c) {
  const auth = c.req.header("Authorization");
  if (!auth || !auth.startsWith("Bearer "))
    return null;
  try {
    const token = auth.split(" ")[1];
    const decoded = await verify2(token, c.env.JWT_SECRET);
    return {
      id: Number(decoded.id),
      name: String(decoded.name || ""),
      isAdmin: !!decoded.isAdmin
    };
  } catch {
    return null;
  }
}
__name(getAuthUser2, "getAuthUser");
calendar.use("*", async (c, next) => {
  const user = await getAuthUser2(c);
  if (!user)
    return c.json({ error: "Unauthorized" }, 401);
  c.set("user", user);
  await next();
});
function generateRecurringInstances(baseEvent, startDate, endDate) {
  if (!baseEvent.is_recurring)
    return [baseEvent];
  const instances = [];
  const eventStartDate = /* @__PURE__ */ new Date(baseEvent.event_date + "T00:00:00");
  let currentDate = new Date(Math.max(eventStartDate.getTime(), startDate.getTime()));
  let occurrenceCount = 0;
  const maxOccurrences = baseEvent.recurrence_occurrences || 1e3;
  const config = {
    type: baseEvent.recurrence_type,
    interval: baseEvent.recurrence_interval || 1,
    daysOfWeek: baseEvent.recurrence_days_of_week ? JSON.parse(baseEvent.recurrence_days_of_week) : void 0,
    dayOfMonth: baseEvent.recurrence_day_of_month,
    weekOfMonth: baseEvent.recurrence_week_of_month,
    dayOfWeek: baseEvent.recurrence_day_of_week,
    months: baseEvent.recurrence_months ? JSON.parse(baseEvent.recurrence_months) : void 0,
    endType: baseEvent.recurrence_end_type || "never",
    endDate: baseEvent.recurrence_end_date,
    occurrences: baseEvent.recurrence_occurrences,
    exceptions: baseEvent.recurrence_exceptions ? JSON.parse(baseEvent.recurrence_exceptions) : []
  };
  while (currentDate <= endDate && occurrenceCount < maxOccurrences) {
    if (config.endType === "end_date" && config.endDate) {
      const endDateObj = /* @__PURE__ */ new Date(config.endDate + "T00:00:00");
      if (currentDate > endDateObj)
        break;
    }
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;
    if (config.exceptions?.includes(dateStr)) {
      currentDate = getNextOccurrence(currentDate, config);
      continue;
    }
    if (isValidOccurrence(currentDate, eventStartDate, config)) {
      instances.push({
        ...baseEvent,
        id: `${baseEvent.id}_${dateStr}`,
        event_date: dateStr,
        parent_event_id: baseEvent.id,
        is_recurring_instance: true,
        is_recurring: 0
      });
      occurrenceCount++;
    }
    currentDate = getNextOccurrence(currentDate, config);
  }
  return instances;
}
__name(generateRecurringInstances, "generateRecurringInstances");
function isValidOccurrence(date, startDate, config) {
  const daysDiff = Math.floor((date.getTime() - startDate.getTime()) / (1e3 * 60 * 60 * 24));
  const DAY_NAMES = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  switch (config.type) {
    case "daily":
      return daysDiff >= 0 && daysDiff % config.interval === 0;
    case "weekly":
      if (daysDiff < 0)
        return false;
      const weeksDiff = Math.floor(daysDiff / 7);
      if (weeksDiff % config.interval !== 0)
        return false;
      if (config.daysOfWeek && config.daysOfWeek.length > 0) {
        const dayName = DAY_NAMES[date.getDay()];
        return config.daysOfWeek.includes(dayName);
      }
      return date.getDay() === startDate.getDay();
    case "monthly":
      if (daysDiff < 0)
        return false;
      if (config.dayOfMonth) {
        const monthsDiff = (date.getFullYear() - startDate.getFullYear()) * 12 + (date.getMonth() - startDate.getMonth());
        if (monthsDiff % config.interval !== 0)
          return false;
        return date.getDate() === config.dayOfMonth;
      }
      return false;
    case "yearly":
      if (daysDiff < 0)
        return false;
      const yearsDiff = date.getFullYear() - startDate.getFullYear();
      if (yearsDiff % config.interval !== 0)
        return false;
      if (config.months && config.months.length > 0) {
        return config.months.includes(date.getMonth() + 1) && date.getDate() === startDate.getDate();
      }
      return date.getMonth() === startDate.getMonth() && date.getDate() === startDate.getDate();
    default:
      return false;
  }
}
__name(isValidOccurrence, "isValidOccurrence");
function getNextOccurrence(currentDate, config) {
  const nextDate = new Date(currentDate);
  const DAY_NAMES = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  switch (config.type) {
    case "daily":
      nextDate.setDate(nextDate.getDate() + config.interval);
      break;
    case "weekly":
      if (config.daysOfWeek && config.daysOfWeek.length > 1) {
        let found = false;
        for (let i = 1; i <= 7; i++) {
          const testDate = new Date(currentDate);
          testDate.setDate(testDate.getDate() + i);
          const dayName = DAY_NAMES[testDate.getDay()];
          if (config.daysOfWeek.includes(dayName)) {
            nextDate.setTime(testDate.getTime());
            found = true;
            break;
          }
        }
        if (!found)
          nextDate.setDate(nextDate.getDate() + 7 * config.interval);
      } else {
        nextDate.setDate(nextDate.getDate() + 7 * config.interval);
      }
      break;
    case "monthly":
      nextDate.setMonth(nextDate.getMonth() + config.interval);
      break;
    case "yearly":
      nextDate.setFullYear(nextDate.getFullYear() + config.interval);
      break;
    default:
      nextDate.setDate(nextDate.getDate() + 1);
  }
  return nextDate;
}
__name(getNextOccurrence, "getNextOccurrence");
calendar.get("/", async (c) => {
  try {
    const startDate = c.req.query("start");
    const endDate = c.req.query("end");
    let query = `SELECT * FROM calendar_events WHERE (parent_event_id IS NULL OR parent_event_id = 0)`;
    if (startDate && endDate) {
      query += ` AND ((is_recurring = 0 AND event_date BETWEEN ? AND ?) OR (is_recurring = 1 AND (recurrence_end_date IS NULL OR recurrence_end_date >= ? OR event_date <= ?)))`;
    }
    query += " ORDER BY event_date ASC, event_time ASC";
    const params = startDate && endDate ? [startDate, endDate, startDate, endDate] : [];
    const { results } = await c.env.DB.prepare(query).bind(...params).all();
    let standaloneInstances = [];
    if (startDate && endDate) {
      const { results: standalone } = await c.env.DB.prepare(`
        SELECT * FROM calendar_events 
        WHERE parent_event_id IS NOT NULL AND parent_event_id != 0 
        AND event_date BETWEEN ? AND ?
        ORDER BY event_date ASC, event_time ASC
      `).bind(startDate, endDate).all();
      standaloneInstances = standalone;
    }
    if (startDate && endDate) {
      const expanded = [];
      const start = /* @__PURE__ */ new Date(startDate + "T00:00:00");
      const end = /* @__PURE__ */ new Date(endDate + "T23:59:59");
      for (const event of results) {
        if (event.is_recurring) {
          expanded.push(...generateRecurringInstances(event, start, end));
        } else {
          expanded.push(event);
        }
      }
      expanded.push(...standaloneInstances);
      return c.json(expanded.sort((a, b) => {
        const dateA = /* @__PURE__ */ new Date(a.event_date + " " + (a.event_time || "00:00"));
        const dateB = /* @__PURE__ */ new Date(b.event_date + " " + (b.event_time || "00:00"));
        return dateA.getTime() - dateB.getTime();
      }));
    }
    return c.json(results);
  } catch (e) {
    console.error("Error fetching calendar events:", e);
    return c.json({ error: "Internal server error" }, 500);
  }
});
calendar.post("/", async (c) => {
  try {
    const user = c.get("user");
    const body = await c.req.json();
    const { title, description, event_date, event_time, event_end_time, location, is_recurring, recurrence } = body;
    if (!title || !event_date)
      return c.json({ error: "Missing required fields: title, event_date" }, 400);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(event_date))
      return c.json({ error: "Invalid date format. Use YYYY-MM-DD" }, 400);
    if (event_time && !/^\d{2}:\d{2}$/.test(event_time))
      return c.json({ error: "Invalid time format. Use HH:MM" }, 400);
    if (event_end_time && !/^\d{2}:\d{2}$/.test(event_end_time))
      return c.json({ error: "Invalid end time format. Use HH:MM" }, 400);
    const rf = is_recurring && recurrence ? {
      is_recurring: 1,
      recurrence_type: recurrence.type,
      recurrence_interval: recurrence.interval || 1,
      recurrence_days_of_week: recurrence.daysOfWeek ? JSON.stringify(recurrence.daysOfWeek) : null,
      recurrence_day_of_month: recurrence.dayOfMonth || null,
      recurrence_week_of_month: recurrence.weekOfMonth || null,
      recurrence_day_of_week: recurrence.dayOfWeek || null,
      recurrence_months: recurrence.months ? JSON.stringify(recurrence.months) : null,
      recurrence_end_type: recurrence.endType || "never",
      recurrence_end_date: recurrence.endDate || null,
      recurrence_occurrences: recurrence.occurrences || null,
      recurrence_exceptions: recurrence.exceptions ? JSON.stringify(recurrence.exceptions) : null
    } : {
      is_recurring: 0,
      recurrence_type: null,
      recurrence_interval: null,
      recurrence_days_of_week: null,
      recurrence_day_of_month: null,
      recurrence_week_of_month: null,
      recurrence_day_of_week: null,
      recurrence_months: null,
      recurrence_end_type: null,
      recurrence_end_date: null,
      recurrence_occurrences: null,
      recurrence_exceptions: null
    };
    const { success } = await c.env.DB.prepare(`
      INSERT INTO calendar_events (
        title, description, event_date, event_time, event_end_time, location, created_by,
        is_recurring, recurrence_type, recurrence_interval, recurrence_days_of_week,
        recurrence_day_of_month, recurrence_week_of_month, recurrence_day_of_week,
        recurrence_months, recurrence_end_type, recurrence_end_date,
        recurrence_occurrences, recurrence_exceptions
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      title,
      description || null,
      event_date,
      event_time || null,
      event_end_time || null,
      location || null,
      user.id,
      rf.is_recurring,
      rf.recurrence_type,
      rf.recurrence_interval,
      rf.recurrence_days_of_week,
      rf.recurrence_day_of_month,
      rf.recurrence_week_of_month,
      rf.recurrence_day_of_week,
      rf.recurrence_months,
      rf.recurrence_end_type,
      rf.recurrence_end_date,
      rf.recurrence_occurrences,
      rf.recurrence_exceptions
    ).run();
    if (success)
      return c.json({ message: "Event created successfully" });
    return c.json({ error: "Failed to create event" }, 500);
  } catch (e) {
    console.error("Error creating event:", e);
    return c.json({ error: "Internal server error" }, 500);
  }
});
calendar.get("/:id", async (c) => {
  try {
    const { id } = c.req.param();
    const row = await c.env.DB.prepare("SELECT * FROM calendar_events WHERE id = ?").bind(id).first();
    if (!row)
      return c.json({ error: "Event not found" }, 404);
    return c.json(row);
  } catch (e) {
    console.error("Error fetching event:", e);
    return c.json({ error: "Internal server error" }, 500);
  }
});
calendar.put("/:id", async (c) => {
  try {
    const { id } = c.req.param();
    const body = await c.req.json();
    const { title, description, event_date, event_time, event_end_time, location, is_recurring, recurrence, update_series, original_instance_date } = body;
    if (!title || !event_date)
      return c.json({ error: "Missing required fields: title, event_date" }, 400);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(event_date))
      return c.json({ error: "Invalid date format. Use YYYY-MM-DD" }, 400);
    if (event_time && !/^\d{2}:\d{2}$/.test(event_time))
      return c.json({ error: "Invalid time format. Use HH:MM" }, 400);
    if (event_end_time && !/^\d{2}:\d{2}$/.test(event_end_time))
      return c.json({ error: "Invalid end time format. Use HH:MM" }, 400);
    const existing = await c.env.DB.prepare("SELECT * FROM calendar_events WHERE id = ?").bind(id).first();
    if (!existing)
      return c.json({ error: "Event not found" }, 404);
    if (original_instance_date && !update_series) {
      const existingStandalone = await c.env.DB.prepare("SELECT * FROM calendar_events WHERE parent_event_id = ? AND event_date = ?").bind(id, original_instance_date).first();
      if (existingStandalone) {
        const { success } = await c.env.DB.prepare(`
          UPDATE calendar_events SET title=?, description=?, event_date=?, event_time=?, event_end_time=?, location=?, updated_at=CURRENT_TIMESTAMP WHERE id=?
        `).bind(title, description || null, event_date, event_time || null, event_end_time || null, location || null, existingStandalone.id).run();
        return success ? c.json({ message: "Recurring instance updated successfully" }) : c.json({ error: "Failed to update recurring instance" }, 500);
      } else {
        const exceptions = existing.recurrence_exceptions ? JSON.parse(existing.recurrence_exceptions) : [];
        if (!exceptions.includes(original_instance_date))
          exceptions.push(original_instance_date);
        await c.env.DB.prepare("UPDATE calendar_events SET recurrence_exceptions = ?, updated_at=CURRENT_TIMESTAMP WHERE id = ?").bind(JSON.stringify(exceptions), id).run();
        const { success } = await c.env.DB.prepare(`
          INSERT INTO calendar_events (title, description, event_date, event_time, event_end_time, location, created_by, is_recurring, parent_event_id)
          VALUES (?, ?, ?, ?, ?, ?, ?, 0, ?)
        `).bind(title, description || null, event_date, event_time || null, event_end_time || null, location || null, existing.created_by, id).run();
        return success ? c.json({ message: "Recurring instance updated successfully" }) : c.json({ error: "Failed to update recurring instance" }, 500);
      }
    } else {
      const rf = is_recurring && recurrence ? {
        is_recurring: 1,
        recurrence_type: recurrence.type,
        recurrence_interval: recurrence.interval || 1,
        recurrence_days_of_week: recurrence.daysOfWeek ? JSON.stringify(recurrence.daysOfWeek) : null,
        recurrence_day_of_month: recurrence.dayOfMonth || null,
        recurrence_week_of_month: recurrence.weekOfMonth || null,
        recurrence_day_of_week: recurrence.dayOfWeek || null,
        recurrence_months: recurrence.months ? JSON.stringify(recurrence.months) : null,
        recurrence_end_type: recurrence.endType || "never",
        recurrence_end_date: recurrence.endDate || null,
        recurrence_occurrences: recurrence.occurrences || null,
        recurrence_exceptions: existing.recurrence_exceptions
      } : {
        is_recurring: 0,
        recurrence_type: null,
        recurrence_interval: null,
        recurrence_days_of_week: null,
        recurrence_day_of_month: null,
        recurrence_week_of_month: null,
        recurrence_day_of_week: null,
        recurrence_months: null,
        recurrence_end_type: null,
        recurrence_end_date: null,
        recurrence_occurrences: null,
        recurrence_exceptions: null
      };
      const { success } = await c.env.DB.prepare(`
        UPDATE calendar_events SET 
          title=?, description=?, event_time=?, event_end_time=?, location=?, updated_at=CURRENT_TIMESTAMP,
          is_recurring=?, recurrence_type=?, recurrence_interval=?, recurrence_days_of_week=?,
          recurrence_day_of_month=?, recurrence_week_of_month=?, recurrence_day_of_week=?,
          recurrence_months=?, recurrence_end_type=?, recurrence_end_date=?, recurrence_occurrences=?, recurrence_exceptions=?
        WHERE id=?
      `).bind(
        title,
        description || null,
        event_time || null,
        event_end_time || null,
        location || null,
        rf.is_recurring,
        rf.recurrence_type,
        rf.recurrence_interval,
        rf.recurrence_days_of_week,
        rf.recurrence_day_of_month,
        rf.recurrence_week_of_month,
        rf.recurrence_day_of_week,
        rf.recurrence_months,
        rf.recurrence_end_type,
        rf.recurrence_end_date,
        rf.recurrence_occurrences,
        rf.recurrence_exceptions,
        id
      ).run();
      return success ? c.json({ message: "Event updated successfully" }) : c.json({ error: "Failed to update event" }, 500);
    }
  } catch (e) {
    console.error("Error updating event:", e);
    return c.json({ error: "Internal server error" }, 500);
  }
});
calendar.delete("/:id", async (c) => {
  try {
    const { id } = c.req.param();
    const { delete_series, exception_date } = await c.req.json().catch(() => ({}));
    const existing = await c.env.DB.prepare("SELECT * FROM calendar_events WHERE id = ?").bind(id).first();
    if (!existing)
      return c.json({ error: "Event not found" }, 404);
    if (exception_date && !delete_series) {
      const parentId = existing.parent_event_id || id;
      const parent = await c.env.DB.prepare("SELECT * FROM calendar_events WHERE id = ?").bind(parentId).first();
      if (parent) {
        const exceptions = parent.recurrence_exceptions ? JSON.parse(parent.recurrence_exceptions) : [];
        if (!exceptions.includes(exception_date))
          exceptions.push(exception_date);
        await c.env.DB.prepare("UPDATE calendar_events SET recurrence_exceptions = ? WHERE id = ?").bind(JSON.stringify(exceptions), parentId).run();
        return c.json({ message: "Event occurrence deleted successfully" });
      }
    }
    if (delete_series) {
      const { success } = await c.env.DB.prepare("DELETE FROM calendar_events WHERE id = ?").bind(id).run();
      if (success) {
        await c.env.DB.prepare("DELETE FROM calendar_events WHERE parent_event_id = ?").bind(id).run();
        return c.json({ message: "Event series deleted successfully" });
      }
    } else {
      const { success } = await c.env.DB.prepare("DELETE FROM calendar_events WHERE id = ?").bind(id).run();
      if (success)
        return c.json({ message: "Event deleted successfully" });
    }
    return c.json({ error: "Failed to delete event" }, 500);
  } catch (e) {
    console.error("Error deleting event:", e);
    return c.json({ error: "Internal server error" }, 500);
  }
});
calendar.post("/:id/exception", async (c) => {
  try {
    const { id } = c.req.param();
    const { exception_date } = await c.req.json();
    if (!exception_date)
      return c.json({ error: "Missing required field: exception_date" }, 400);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(exception_date))
      return c.json({ error: "Invalid date format. Use YYYY-MM-DD" }, 400);
    const event = await c.env.DB.prepare("SELECT * FROM calendar_events WHERE id = ?").bind(id).first();
    if (!event)
      return c.json({ error: "Event not found" }, 404);
    if (!event.is_recurring)
      return c.json({ error: "Event is not recurring" }, 400);
    const exceptions = event.recurrence_exceptions ? JSON.parse(event.recurrence_exceptions) : [];
    if (!exceptions.includes(exception_date))
      exceptions.push(exception_date);
    const { success } = await c.env.DB.prepare("UPDATE calendar_events SET recurrence_exceptions = ? WHERE id = ?").bind(JSON.stringify(exceptions), id).run();
    return success ? c.json({ message: "Exception added successfully" }) : c.json({ error: "Failed to add exception" }, 500);
  } catch (e) {
    console.error("Error adding exception:", e);
    return c.json({ error: "Internal server error" }, 500);
  }
});
calendar.delete("/:id/exception", async (c) => {
  try {
    const { id } = c.req.param();
    const { exception_date } = await c.req.json();
    if (!exception_date)
      return c.json({ error: "Missing required field: exception_date" }, 400);
    const event = await c.env.DB.prepare("SELECT * FROM calendar_events WHERE id = ?").bind(id).first();
    if (!event)
      return c.json({ error: "Event not found" }, 404);
    if (!event.is_recurring)
      return c.json({ error: "Event is not recurring" }, 400);
    const exceptions = event.recurrence_exceptions ? JSON.parse(event.recurrence_exceptions) : [];
    const updated = exceptions.filter((d) => d !== exception_date);
    const { success } = await c.env.DB.prepare("UPDATE calendar_events SET recurrence_exceptions = ? WHERE id = ?").bind(JSON.stringify(updated), id).run();
    return success ? c.json({ message: "Exception removed successfully" }) : c.json({ error: "Failed to remove exception" }, 500);
  } catch (e) {
    console.error("Error removing exception:", e);
    return c.json({ error: "Internal server error" }, 500);
  }
});
var calendar_default = calendar;

// api/tasks/index.ts
var tasks = new Hono2();
async function getAuthUser3(c) {
  const auth = c.req.header("Authorization");
  if (!auth || !auth.startsWith("Bearer "))
    return null;
  try {
    const token = auth.split(" ")[1];
    const decoded = await verify2(token, c.env.JWT_SECRET);
    return { id: Number(decoded.id), name: String(decoded.name || ""), isAdmin: !!decoded.isAdmin };
  } catch {
    return null;
  }
}
__name(getAuthUser3, "getAuthUser");
tasks.get("/", async (c) => {
  try {
    const user = await getAuthUser3(c);
    if (!user)
      return c.json({ error: "Unauthorized" }, 401);
    const { results } = await c.env.DB.prepare(`
      SELECT t.*, 
             u1.full_name as creator_username,
             u2.full_name as assignee_username
      FROM tasks t 
      LEFT JOIN users u1 ON t.created_by = u1.id
      LEFT JOIN users u2 ON t.assigned_to = u2.id
      ORDER BY COALESCE(t.due_date, '9999-12-31') ASC, t.created_at DESC
    `).all();
    return c.json(results);
  } catch (e) {
    console.error("Error fetching tasks", e);
    return c.json({ error: "Internal server error" }, 500);
  }
});
tasks.post("/", async (c) => {
  try {
    const user = await getAuthUser3(c);
    if (!user)
      return c.json({ error: "Unauthorized" }, 401);
    const { title, description, assigned_to, due_date, priority } = await c.req.json();
    if (!title)
      return c.json({ error: "Title is required" }, 400);
    if (due_date && !/^\d{4}-\d{2}-\d{2}$/.test(due_date)) {
      return c.json({ error: "Invalid due date format. Use YYYY-MM-DD" }, 400);
    }
    const validPriorities = ["low", "medium", "high"];
    const p = validPriorities.includes(priority) ? priority : "medium";
    const { success } = await c.env.DB.prepare(
      "INSERT INTO tasks (title, description, assigned_to, created_by, due_date, priority) VALUES (?, ?, ?, ?, ?, ?)"
    ).bind(title, description || null, assigned_to || null, user.id, due_date || null, p).run();
    if (success)
      return c.json({ message: "Task created successfully" });
    return c.json({ error: "Failed to create task" }, 500);
  } catch (e) {
    console.error("Error creating task", e);
    return c.json({ error: "Internal server error" }, 500);
  }
});
tasks.put("/:id", async (c) => {
  try {
    const user = await getAuthUser3(c);
    if (!user)
      return c.json({ error: "Unauthorized" }, 401);
    const { id } = c.req.param();
    const { title, description, completed, assigned_to, due_date, priority } = await c.req.json();
    if (!title)
      return c.json({ error: "Title is required" }, 400);
    if (due_date && !/^\d{4}-\d{2}-\d{2}$/.test(due_date)) {
      return c.json({ error: "Invalid due date format. Use YYYY-MM-DD" }, 400);
    }
    const validPriorities = ["low", "medium", "high"];
    const p = validPriorities.includes(priority) ? priority : "medium";
    const { success } = await c.env.DB.prepare(
      "UPDATE tasks SET title = ?, description = ?, completed = ?, assigned_to = ?, due_date = ?, priority = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
    ).bind(title, description || null, completed ? 1 : 0, assigned_to || null, due_date || null, p, id).run();
    if (success)
      return c.json({ message: "Task updated successfully" });
    return c.json({ error: "Failed to update task" }, 500);
  } catch (e) {
    console.error("Error updating task", e);
    return c.json({ error: "Internal server error" }, 500);
  }
});
tasks.patch("/:id/complete", async (c) => {
  try {
    const user = await getAuthUser3(c);
    if (!user)
      return c.json({ error: "Unauthorized" }, 401);
    const { id } = c.req.param();
    const { completed } = await c.req.json();
    if (typeof completed !== "boolean")
      return c.json({ error: "Invalid completed status" }, 400);
    const { success } = await c.env.DB.prepare(
      "UPDATE tasks SET completed = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
    ).bind(completed ? 1 : 0, id).run();
    if (success)
      return c.json({ message: "Task completion status updated" });
    return c.json({ error: "Failed to update task" }, 500);
  } catch (e) {
    console.error("Error updating completion", e);
    return c.json({ error: "Internal server error" }, 500);
  }
});
tasks.delete("/:id", async (c) => {
  try {
    const user = await getAuthUser3(c);
    if (!user)
      return c.json({ error: "Unauthorized" }, 401);
    const { id } = c.req.param();
    const { success } = await c.env.DB.prepare("DELETE FROM tasks WHERE id = ?").bind(id).run();
    if (success)
      return c.json({ message: "Task deleted successfully" });
    return c.json({ error: "Failed to delete task" }, 500);
  } catch (e) {
    console.error("Error deleting task", e);
    return c.json({ error: "Internal server error" }, 500);
  }
});
var tasks_default = tasks;

// api/profile/index.ts
var profile = new Hono2();
async function getAuthUser4(c) {
  const auth = c.req.header("Authorization");
  if (!auth || !auth.startsWith("Bearer "))
    return null;
  try {
    const token = auth.split(" ")[1];
    const decoded = await verify2(token, c.env.JWT_SECRET);
    return {
      id: Number(decoded.id),
      name: String(decoded.name || ""),
      isAdmin: !!decoded.isAdmin
    };
  } catch {
    return null;
  }
}
__name(getAuthUser4, "getAuthUser");
async function sha2564(text) {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
__name(sha2564, "sha256");
profile.get("/", async (c) => {
  const au = await getAuthUser4(c);
  if (!au)
    return c.json({ error: "Unauthorized" }, 401);
  try {
    const row = await c.env.DB.prepare("SELECT id, full_name, is_admin, created_at, avatar_color FROM users WHERE id = ?").bind(au.id).first();
    if (!row)
      return c.json({ error: "User not found" }, 404);
    return c.json({
      id: row.id,
      username: row.full_name,
      is_admin: !!row.is_admin,
      created_at: row.created_at,
      avatar_color: row.avatar_color ?? null
    });
  } catch (e) {
    console.error("profile get error", e);
    return c.json({ error: "Failed to load profile" }, 500);
  }
});
profile.put("/", async (c) => {
  const au = await getAuthUser4(c);
  if (!au)
    return c.json({ error: "Unauthorized" }, 401);
  let body;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: "Invalid JSON" }, 400);
  }
  if (typeof body.password === "string") {
    const pw = body.password.trim();
    if (pw.length < 6)
      return c.json({ error: "Password must be at least 6 characters long" }, 400);
    try {
      const hash = await sha2564(pw);
      await c.env.DB.prepare("UPDATE users SET password_hash = ? WHERE id = ?").bind(hash, au.id).run();
      return c.json({ message: "Password updated successfully" });
    } catch (e) {
      console.error("profile password update error", e);
      return c.json({ error: "Failed to update password" }, 500);
    }
  }
  if (Object.prototype.hasOwnProperty.call(body, "avatar_color")) {
    try {
      await c.env.DB.prepare("UPDATE users SET avatar_color = ? WHERE id = ?").bind(body.avatar_color ?? null, au.id).run();
      return c.json({ message: "Avatar color updated successfully" });
    } catch (e) {
      console.error("profile avatar update error", e);
      return c.json({ error: "Failed to update avatar color" }, 500);
    }
  }
  if (typeof body.username === "string") {
    const newName = body.username.trim();
    if (newName.length < 3)
      return c.json({ error: "Username must be at least 3 characters long" }, 400);
    try {
      const exists = await c.env.DB.prepare("SELECT id FROM users WHERE LOWER(full_name) = LOWER(?) AND id != ?").bind(newName, au.id).first();
      if (exists)
        return c.json({ error: "Username already taken" }, 409);
      await c.env.DB.prepare("UPDATE users SET full_name = ? WHERE id = ?").bind(newName, au.id).run();
      return c.json({ message: "Profile updated successfully" });
    } catch (e) {
      console.error("profile username update error", e);
      return c.json({ error: "Failed to update profile" }, 500);
    }
  }
  return c.json({ error: "No valid fields to update" }, 400);
});
profile.post("/change-password", async (c) => {
  const au = await getAuthUser4(c);
  if (!au)
    return c.json({ error: "Unauthorized" }, 401);
  let body;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: "Invalid JSON" }, 400);
  }
  const { currentPassword, newPassword, confirmPassword } = body || {};
  if (!currentPassword || !newPassword || !confirmPassword)
    return c.json({ error: "All password fields are required" }, 400);
  if (newPassword !== confirmPassword)
    return c.json({ error: "New passwords do not match" }, 400);
  if (String(newPassword).trim().length < 6)
    return c.json({ error: "New password must be at least 6 characters long" }, 400);
  try {
    const row = await c.env.DB.prepare("SELECT password_hash FROM users WHERE id = ?").bind(au.id).first();
    if (!row)
      return c.json({ error: "User not found" }, 404);
    const currentHash = await sha2564(String(currentPassword));
    if (currentHash !== row.password_hash)
      return c.json({ error: "Current password is incorrect" }, 401);
    const newHash = await sha2564(String(newPassword));
    await c.env.DB.prepare("UPDATE users SET password_hash = ? WHERE id = ?").bind(newHash, au.id).run();
    return c.json({ message: "Password changed successfully" });
  } catch (e) {
    console.error("profile change-password error", e);
    return c.json({ error: "Failed to change password" }, 500);
  }
});
var profile_default = profile;

// api/[[path]].ts
var app3 = new Hono2().basePath("/api");
app3.use("*", corsMiddleware);
app3.use("*", errorMiddleware);
app3.route("/auth/login", login_default);
app3.route("/auth/register", register_default);
app3.route("/chat", chat_default);
app3.route("/admin", admin_default);
app3.route("/calendar", calendar_default);
app3.route("/tasks", tasks_default);
app3.route("/profile", profile_default);
app3.get("/health", (c) => c.json({ ok: true, env: "pages", time: (/* @__PURE__ */ new Date()).toISOString() }));
app3.get("/", (c) => c.json({
  message: "FRC7598 API",
  endpoints: ["/api/health", "/api/auth/login", "/api/auth/register"]
}));
var onRequest = handle(app3);

// ../.wrangler/tmp/pages-QbgBzy/functionsRoutes-0.7132948227806601.mjs
var routes = [
  {
    routePath: "/api/:path*",
    mountPath: "/api",
    method: "",
    middlewares: [],
    modules: [onRequest]
  }
];

// ../node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
__name(lexer, "lexer");
function parse2(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = /* @__PURE__ */ __name(function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name(function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name(function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse2, "parse");
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode3 = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name(function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode3(value, key);
        });
      } else {
        params[key.name] = decode3(m[i2], key);
      }
    }, "_loop_1");
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
__name(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse2(path, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
__name(pathToRegexp, "pathToRegexp");

// ../node_modules/wrangler/templates/pages-template-worker.ts
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name(async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: () => {
            isFailOpen = true;
          }
        };
        const response = await handler(context);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error) {
      if (isFailOpen) {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");

// ../node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// ../.wrangler/tmp/bundle-ekkau6/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = pages_template_worker_default;

// ../node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// ../.wrangler/tmp/bundle-ekkau6/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
__name(__Facade_ScheduledController__, "__Facade_ScheduledController__");
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=functionsWorker-0.49236943724340954.mjs.map
