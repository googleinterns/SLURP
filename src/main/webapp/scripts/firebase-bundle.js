(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var util = require('@firebase/util');
var component = require('@firebase/component');
var logger$1 = require('@firebase/logger');

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var _a;
var ERRORS = (_a = {},
    _a["no-app" /* NO_APP */] = "No Firebase App '{$appName}' has been created - " +
        'call Firebase App.initializeApp()',
    _a["bad-app-name" /* BAD_APP_NAME */] = "Illegal App name: '{$appName}",
    _a["duplicate-app" /* DUPLICATE_APP */] = "Firebase App named '{$appName}' already exists",
    _a["app-deleted" /* APP_DELETED */] = "Firebase App named '{$appName}' already deleted",
    _a["invalid-app-argument" /* INVALID_APP_ARGUMENT */] = 'firebase.{$appName}() takes either no argument or a ' +
        'Firebase App instance.',
    _a["invalid-log-argument" /* INVALID_LOG_ARGUMENT */] = 'First argument to `onLog` must be null or a function.',
    _a);
var ERROR_FACTORY = new util.ErrorFactory('app', 'Firebase', ERRORS);

var name$1 = "@firebase/app";
var version = "0.6.7";

var name$2 = "@firebase/analytics";

var name$3 = "@firebase/auth";

var name$4 = "@firebase/database";

var name$5 = "@firebase/functions";

var name$6 = "@firebase/installations";

var name$7 = "@firebase/messaging";

var name$8 = "@firebase/performance";

var name$9 = "@firebase/remote-config";

var name$a = "@firebase/storage";

var name$b = "@firebase/firestore";

var name$c = "firebase-wrapper";

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var _a$1;
var DEFAULT_ENTRY_NAME = '[DEFAULT]';
var PLATFORM_LOG_STRING = (_a$1 = {},
    _a$1[name$1] = 'fire-core',
    _a$1[name$2] = 'fire-analytics',
    _a$1[name$3] = 'fire-auth',
    _a$1[name$4] = 'fire-rtdb',
    _a$1[name$5] = 'fire-fn',
    _a$1[name$6] = 'fire-iid',
    _a$1[name$7] = 'fire-fcm',
    _a$1[name$8] = 'fire-perf',
    _a$1[name$9] = 'fire-rc',
    _a$1[name$a] = 'fire-gcs',
    _a$1[name$b] = 'fire-fst',
    _a$1['fire-js'] = 'fire-js',
    _a$1[name$c] = 'fire-js-all',
    _a$1);

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var logger = new logger$1.Logger('@firebase/app');

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Global context object for a collection of services using
 * a shared authentication state.
 */
var FirebaseAppImpl = /** @class */ (function () {
    function FirebaseAppImpl(options, config, firebase_) {
        var e_1, _a;
        var _this = this;
        this.firebase_ = firebase_;
        this.isDeleted_ = false;
        this.name_ = config.name;
        this.automaticDataCollectionEnabled_ =
            config.automaticDataCollectionEnabled || false;
        this.options_ = util.deepCopy(options);
        this.container = new component.ComponentContainer(config.name);
        // add itself to container
        this._addComponent(new component.Component('app', function () { return _this; }, "PUBLIC" /* PUBLIC */));
        try {
            // populate ComponentContainer with existing components
            for (var _b = tslib.__values(this.firebase_.INTERNAL.components.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var component$1 = _c.value;
                this._addComponent(component$1);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    Object.defineProperty(FirebaseAppImpl.prototype, "automaticDataCollectionEnabled", {
        get: function () {
            this.checkDestroyed_();
            return this.automaticDataCollectionEnabled_;
        },
        set: function (val) {
            this.checkDestroyed_();
            this.automaticDataCollectionEnabled_ = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FirebaseAppImpl.prototype, "name", {
        get: function () {
            this.checkDestroyed_();
            return this.name_;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FirebaseAppImpl.prototype, "options", {
        get: function () {
            this.checkDestroyed_();
            return this.options_;
        },
        enumerable: true,
        configurable: true
    });
    FirebaseAppImpl.prototype.delete = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.checkDestroyed_();
            resolve();
        })
            .then(function () {
            _this.firebase_.INTERNAL.removeApp(_this.name_);
            return Promise.all(_this.container.getProviders().map(function (provider) { return provider.delete(); }));
        })
            .then(function () {
            _this.isDeleted_ = true;
        });
    };
    /**
     * Return a service instance associated with this app (creating it
     * on demand), identified by the passed instanceIdentifier.
     *
     * NOTE: Currently storage and functions are the only ones that are leveraging this
     * functionality. They invoke it by calling:
     *
     * ```javascript
     * firebase.app().storage('STORAGE BUCKET ID')
     * ```
     *
     * The service name is passed to this already
     * @internal
     */
    FirebaseAppImpl.prototype._getService = function (name, instanceIdentifier) {
        if (instanceIdentifier === void 0) { instanceIdentifier = DEFAULT_ENTRY_NAME; }
        this.checkDestroyed_();
        // getImmediate will always succeed because _getService is only called for registered components.
        return this.container.getProvider(name).getImmediate({
            identifier: instanceIdentifier
        });
    };
    /**
     * Remove a service instance from the cache, so we will create a new instance for this service
     * when people try to get this service again.
     *
     * NOTE: currently only firestore is using this functionality to support firestore shutdown.
     *
     * @param name The service name
     * @param instanceIdentifier instance identifier in case multiple instances are allowed
     * @internal
     */
    FirebaseAppImpl.prototype._removeServiceInstance = function (name, instanceIdentifier) {
        if (instanceIdentifier === void 0) { instanceIdentifier = DEFAULT_ENTRY_NAME; }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.container.getProvider(name).clearInstance(instanceIdentifier);
    };
    /**
     * @param component the component being added to this app's container
     */
    FirebaseAppImpl.prototype._addComponent = function (component) {
        try {
            this.container.addComponent(component);
        }
        catch (e) {
            logger.debug("Component " + component.name + " failed to register with FirebaseApp " + this.name, e);
        }
    };
    FirebaseAppImpl.prototype._addOrOverwriteComponent = function (component) {
        this.container.addOrOverwriteComponent(component);
    };
    /**
     * This function will throw an Error if the App has already been deleted -
     * use before performing API actions on the App.
     */
    FirebaseAppImpl.prototype.checkDestroyed_ = function () {
        if (this.isDeleted_) {
            throw ERROR_FACTORY.create("app-deleted" /* APP_DELETED */, { appName: this.name_ });
        }
    };
    return FirebaseAppImpl;
}());
// Prevent dead-code elimination of these methods w/o invalid property
// copying.
(FirebaseAppImpl.prototype.name && FirebaseAppImpl.prototype.options) ||
    FirebaseAppImpl.prototype.delete ||
    console.log('dc');

var version$1 = "7.15.5";

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Because auth can't share code with other components, we attach the utility functions
 * in an internal namespace to share code.
 * This function return a firebase namespace object without
 * any utility functions, so it can be shared between the regular firebaseNamespace and
 * the lite version.
 */
function createFirebaseNamespaceCore(firebaseAppImpl) {
    var apps = {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var components = new Map();
    // A namespace is a plain JavaScript Object.
    var namespace = {
        // Hack to prevent Babel from modifying the object returned
        // as the firebase namespace.
        // @ts-ignore
        __esModule: true,
        initializeApp: initializeApp,
        // @ts-ignore
        app: app,
        registerVersion: registerVersion,
        setLogLevel: logger$1.setLogLevel,
        onLog: onLog,
        // @ts-ignore
        apps: null,
        SDK_VERSION: version$1,
        INTERNAL: {
            registerComponent: registerComponent,
            removeApp: removeApp,
            components: components,
            useAsService: useAsService
        }
    };
    // Inject a circular default export to allow Babel users who were previously
    // using:
    //
    //   import firebase from 'firebase';
    //   which becomes: var firebase = require('firebase').default;
    //
    // instead of
    //
    //   import * as firebase from 'firebase';
    //   which becomes: var firebase = require('firebase');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    namespace['default'] = namespace;
    // firebase.apps is a read-only getter.
    Object.defineProperty(namespace, 'apps', {
        get: getApps
    });
    /**
     * Called by App.delete() - but before any services associated with the App
     * are deleted.
     */
    function removeApp(name) {
        delete apps[name];
    }
    /**
     * Get the App object for a given name (or DEFAULT).
     */
    function app(name) {
        name = name || DEFAULT_ENTRY_NAME;
        if (!util.contains(apps, name)) {
            throw ERROR_FACTORY.create("no-app" /* NO_APP */, { appName: name });
        }
        return apps[name];
    }
    // @ts-ignore
    app['App'] = firebaseAppImpl;
    function initializeApp(options, rawConfig) {
        if (rawConfig === void 0) { rawConfig = {}; }
        if (typeof rawConfig !== 'object' || rawConfig === null) {
            var name_1 = rawConfig;
            rawConfig = { name: name_1 };
        }
        var config = rawConfig;
        if (config.name === undefined) {
            config.name = DEFAULT_ENTRY_NAME;
        }
        var name = config.name;
        if (typeof name !== 'string' || !name) {
            throw ERROR_FACTORY.create("bad-app-name" /* BAD_APP_NAME */, {
                appName: String(name)
            });
        }
        if (util.contains(apps, name)) {
            throw ERROR_FACTORY.create("duplicate-app" /* DUPLICATE_APP */, { appName: name });
        }
        var app = new firebaseAppImpl(options, config, namespace);
        apps[name] = app;
        return app;
    }
    /*
     * Return an array of all the non-deleted FirebaseApps.
     */
    function getApps() {
        // Make a copy so caller cannot mutate the apps list.
        return Object.keys(apps).map(function (name) { return apps[name]; });
    }
    function registerComponent(component) {
        var e_1, _a;
        var componentName = component.name;
        if (components.has(componentName)) {
            logger.debug("There were multiple attempts to register component " + componentName + ".");
            return component.type === "PUBLIC" /* PUBLIC */
                ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    namespace[componentName]
                : null;
        }
        components.set(componentName, component);
        // create service namespace for public components
        if (component.type === "PUBLIC" /* PUBLIC */) {
            // The Service namespace is an accessor function ...
            var serviceNamespace = function (appArg) {
                if (appArg === void 0) { appArg = app(); }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                if (typeof appArg[componentName] !== 'function') {
                    // Invalid argument.
                    // This happens in the following case: firebase.storage('gs:/')
                    throw ERROR_FACTORY.create("invalid-app-argument" /* INVALID_APP_ARGUMENT */, {
                        appName: componentName
                    });
                }
                // Forward service instance lookup to the FirebaseApp.
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return appArg[componentName]();
            };
            // ... and a container for service-level properties.
            if (component.serviceProps !== undefined) {
                util.deepExtend(serviceNamespace, component.serviceProps);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            namespace[componentName] = serviceNamespace;
            // Patch the FirebaseAppImpl prototype
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            firebaseAppImpl.prototype[componentName] =
                // TODO: The eslint disable can be removed and the 'ignoreRestArgs'
                // option added to the no-explicit-any rule when ESlint releases it.
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    var serviceFxn = this._getService.bind(this, componentName);
                    return serviceFxn.apply(this, component.multipleInstances ? args : []);
                };
        }
        try {
            // add the component to existing app instances
            for (var _b = tslib.__values(Object.keys(apps)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var appName = _c.value;
                apps[appName]._addComponent(component);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return component.type === "PUBLIC" /* PUBLIC */
            ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                namespace[componentName]
            : null;
    }
    function registerVersion(libraryKeyOrName, version, variant) {
        var _a;
        // TODO: We can use this check to whitelist strings when/if we set up
        // a good whitelist system.
        var library = (_a = PLATFORM_LOG_STRING[libraryKeyOrName]) !== null && _a !== void 0 ? _a : libraryKeyOrName;
        if (variant) {
            library += "-" + variant;
        }
        var libraryMismatch = library.match(/\s|\//);
        var versionMismatch = version.match(/\s|\//);
        if (libraryMismatch || versionMismatch) {
            var warning = [
                "Unable to register library \"" + library + "\" with version \"" + version + "\":"
            ];
            if (libraryMismatch) {
                warning.push("library name \"" + library + "\" contains illegal characters (whitespace or \"/\")");
            }
            if (libraryMismatch && versionMismatch) {
                warning.push('and');
            }
            if (versionMismatch) {
                warning.push("version name \"" + version + "\" contains illegal characters (whitespace or \"/\")");
            }
            logger.warn(warning.join(' '));
            return;
        }
        registerComponent(new component.Component(library + "-version", function () { return ({ library: library, version: version }); }, "VERSION" /* VERSION */));
    }
    function onLog(logCallback, options) {
        if (logCallback !== null && typeof logCallback !== 'function') {
            throw ERROR_FACTORY.create("invalid-log-argument" /* INVALID_LOG_ARGUMENT */, {
                appName: name
            });
        }
        logger$1.setUserLogHandler(logCallback, options);
    }
    // Map the requested service to a registered service name
    // (used to map auth to serverAuth service when needed).
    function useAsService(app, name) {
        if (name === 'serverAuth') {
            return null;
        }
        var useService = name;
        return useService;
    }
    return namespace;
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Return a firebase namespace object.
 *
 * In production, this will be called exactly once and the result
 * assigned to the 'firebase' global.  It may be called multiple times
 * in unit tests.
 */
function createFirebaseNamespace() {
    var namespace = createFirebaseNamespaceCore(FirebaseAppImpl);
    namespace.INTERNAL = tslib.__assign(tslib.__assign({}, namespace.INTERNAL), { createFirebaseNamespace: createFirebaseNamespace,
        extendNamespace: extendNamespace,
        createSubscribe: util.createSubscribe,
        ErrorFactory: util.ErrorFactory,
        deepExtend: util.deepExtend });
    /**
     * Patch the top-level firebase namespace with additional properties.
     *
     * firebase.INTERNAL.extendNamespace()
     */
    function extendNamespace(props) {
        util.deepExtend(namespace, props);
    }
    return namespace;
}
var firebase = createFirebaseNamespace();

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var PlatformLoggerService = /** @class */ (function () {
    function PlatformLoggerService(container) {
        this.container = container;
    }
    // In initial implementation, this will be called by installations on
    // auth token refresh, and installations will send this string.
    PlatformLoggerService.prototype.getPlatformInfoString = function () {
        var providers = this.container.getProviders();
        // Loop through providers and get library/version pairs from any that are
        // version components.
        return providers
            .map(function (provider) {
            if (isVersionServiceProvider(provider)) {
                var service = provider.getImmediate();
                return service.library + "/" + service.version;
            }
            else {
                return null;
            }
        })
            .filter(function (logString) { return logString; })
            .join(' ');
    };
    return PlatformLoggerService;
}());
/**
 *
 * @param provider check if this provider provides a VersionService
 *
 * NOTE: Using Provider<'app-version'> is a hack to indicate that the provider
 * provides VersionService. The provider is not necessarily a 'app-version'
 * provider.
 */
function isVersionServiceProvider(provider) {
    var component = provider.getComponent();
    return (component === null || component === void 0 ? void 0 : component.type) === "VERSION" /* VERSION */;
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function registerCoreComponents(firebase, variant) {
    firebase.INTERNAL.registerComponent(new component.Component('platform-logger', function (container) { return new PlatformLoggerService(container); }, "PRIVATE" /* PRIVATE */));
    // Register `app` package.
    firebase.registerVersion(name$1, version, variant);
    // Register platform SDK identifier (no version).
    firebase.registerVersion('fire-js', '');
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Firebase Lite detection test
// eslint-disable-next-line @typescript-eslint/no-explicit-any
if (util.isBrowser() && self.firebase !== undefined) {
    logger.warn("\n    Warning: Firebase is already defined in the global scope. Please make sure\n    Firebase library is only loaded once.\n  ");
    // eslint-disable-next-line
    var sdkVersion = self.firebase.SDK_VERSION;
    if (sdkVersion && sdkVersion.indexOf('LITE') >= 0) {
        logger.warn("\n    Warning: You are trying to load Firebase while using Firebase Performance standalone script.\n    You should load Firebase Performance with this instance of Firebase to avoid loading duplicate code.\n    ");
    }
}
var initializeApp = firebase.initializeApp;
// TODO: This disable can be removed and the 'ignoreRestArgs' option added to
// the no-explicit-any rule when ESlint releases it.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
firebase.initializeApp = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    // Environment check before initializing app
    // Do the check in initializeApp, so people have a chance to disable it by setting logLevel
    // in @firebase/logger
    if (util.isNode()) {
        logger.warn("\n      Warning: This is a browser-targeted Firebase bundle but it appears it is being\n      run in a Node environment.  If running in a Node environment, make sure you\n      are using the bundle specified by the \"main\" field in package.json.\n      \n      If you are using Webpack, you can specify \"main\" as the first item in\n      \"resolve.mainFields\":\n      https://webpack.js.org/configuration/resolve/#resolvemainfields\n      \n      If using Rollup, use the rollup-plugin-node-resolve plugin and specify \"main\"\n      as the first item in \"mainFields\", e.g. ['main', 'module'].\n      https://github.com/rollup/rollup-plugin-node-resolve\n      ");
    }
    return initializeApp.apply(undefined, args);
};
var firebase$1 = firebase;
registerCoreComponents(firebase$1);

exports.default = firebase$1;
exports.firebase = firebase$1;


},{"@firebase/component":2,"@firebase/logger":4,"@firebase/util":5,"tslib":7}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var util = require('@firebase/util');

/**
 * Component for service name T, e.g. `auth`, `auth-internal`
 */
var Component = /** @class */ (function () {
    /**
     *
     * @param name The public service name, e.g. app, auth, firestore, database
     * @param instanceFactory Service factory responsible for creating the public interface
     * @param type whether the service provided by the component is public or private
     */
    function Component(name, instanceFactory, type) {
        this.name = name;
        this.instanceFactory = instanceFactory;
        this.type = type;
        this.multipleInstances = false;
        /**
         * Properties to be added to the service namespace
         */
        this.serviceProps = {};
        this.instantiationMode = "LAZY" /* LAZY */;
    }
    Component.prototype.setInstantiationMode = function (mode) {
        this.instantiationMode = mode;
        return this;
    };
    Component.prototype.setMultipleInstances = function (multipleInstances) {
        this.multipleInstances = multipleInstances;
        return this;
    };
    Component.prototype.setServiceProps = function (props) {
        this.serviceProps = props;
        return this;
    };
    return Component;
}());

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var DEFAULT_ENTRY_NAME = '[DEFAULT]';

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Provider for instance for service name T, e.g. 'auth', 'auth-internal'
 * NameServiceMapping[T] is an alias for the type of the instance
 */
var Provider = /** @class */ (function () {
    function Provider(name, container) {
        this.name = name;
        this.container = container;
        this.component = null;
        this.instances = new Map();
        this.instancesDeferred = new Map();
    }
    /**
     * @param identifier A provider can provide mulitple instances of a service
     * if this.component.multipleInstances is true.
     */
    Provider.prototype.get = function (identifier) {
        if (identifier === void 0) { identifier = DEFAULT_ENTRY_NAME; }
        // if multipleInstances is not supported, use the default name
        var normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);
        if (!this.instancesDeferred.has(normalizedIdentifier)) {
            var deferred = new util.Deferred();
            this.instancesDeferred.set(normalizedIdentifier, deferred);
            // If the service instance is available, resolve the promise with it immediately
            try {
                var instance = this.getOrInitializeService(normalizedIdentifier);
                if (instance) {
                    deferred.resolve(instance);
                }
            }
            catch (e) {
                // when the instance factory throws an exception during get(), it should not cause
                // a fatal error. We just return the unresolved promise in this case.
            }
        }
        return this.instancesDeferred.get(normalizedIdentifier).promise;
    };
    Provider.prototype.getImmediate = function (options) {
        var _a = tslib.__assign({ identifier: DEFAULT_ENTRY_NAME, optional: false }, options), identifier = _a.identifier, optional = _a.optional;
        // if multipleInstances is not supported, use the default name
        var normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);
        try {
            var instance = this.getOrInitializeService(normalizedIdentifier);
            if (!instance) {
                if (optional) {
                    return null;
                }
                throw Error("Service " + this.name + " is not available");
            }
            return instance;
        }
        catch (e) {
            if (optional) {
                return null;
            }
            else {
                throw e;
            }
        }
    };
    Provider.prototype.getComponent = function () {
        return this.component;
    };
    Provider.prototype.setComponent = function (component) {
        var e_1, _a;
        if (component.name !== this.name) {
            throw Error("Mismatching Component " + component.name + " for Provider " + this.name + ".");
        }
        if (this.component) {
            throw Error("Component for " + this.name + " has already been provided");
        }
        this.component = component;
        // if the service is eager, initialize the default instance
        if (isComponentEager(component)) {
            try {
                this.getOrInitializeService(DEFAULT_ENTRY_NAME);
            }
            catch (e) {
                // when the instance factory for an eager Component throws an exception during the eager
                // initialization, it should not cause a fatal error.
                // TODO: Investigate if we need to make it configurable, because some component may want to cause
                // a fatal error in this case?
            }
        }
        try {
            // Create service instances for the pending promises and resolve them
            // NOTE: if this.multipleInstances is false, only the default instance will be created
            // and all promises with resolve with it regardless of the identifier.
            for (var _b = tslib.__values(this.instancesDeferred.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = tslib.__read(_c.value, 2), instanceIdentifier = _d[0], instanceDeferred = _d[1];
                var normalizedIdentifier = this.normalizeInstanceIdentifier(instanceIdentifier);
                try {
                    // `getOrInitializeService()` should always return a valid instance since a component is guaranteed. use ! to make typescript happy.
                    var instance = this.getOrInitializeService(normalizedIdentifier);
                    instanceDeferred.resolve(instance);
                }
                catch (e) {
                    // when the instance factory throws an exception, it should not cause
                    // a fatal error. We just leave the promise unresolved.
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    Provider.prototype.clearInstance = function (identifier) {
        if (identifier === void 0) { identifier = DEFAULT_ENTRY_NAME; }
        this.instancesDeferred.delete(identifier);
        this.instances.delete(identifier);
    };
    // app.delete() will call this method on every provider to delete the services
    // TODO: should we mark the provider as deleted?
    Provider.prototype.delete = function () {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var services;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        services = Array.from(this.instances.values());
                        return [4 /*yield*/, Promise.all(services
                                .filter(function (service) { return 'INTERNAL' in service; })
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                .map(function (service) { return service.INTERNAL.delete(); }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Provider.prototype.isComponentSet = function () {
        return this.component != null;
    };
    Provider.prototype.getOrInitializeService = function (identifier) {
        var instance = this.instances.get(identifier);
        if (!instance && this.component) {
            instance = this.component.instanceFactory(this.container, normalizeIdentifierForFactory(identifier));
            this.instances.set(identifier, instance);
        }
        return instance || null;
    };
    Provider.prototype.normalizeInstanceIdentifier = function (identifier) {
        if (this.component) {
            return this.component.multipleInstances ? identifier : DEFAULT_ENTRY_NAME;
        }
        else {
            return identifier; // assume multiple instances are supported before the component is provided.
        }
    };
    return Provider;
}());
// undefined should be passed to the service factory for the default instance
function normalizeIdentifierForFactory(identifier) {
    return identifier === DEFAULT_ENTRY_NAME ? undefined : identifier;
}
function isComponentEager(component) {
    return component.instantiationMode === "EAGER" /* EAGER */;
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * ComponentContainer that provides Providers for service name T, e.g. `auth`, `auth-internal`
 */
var ComponentContainer = /** @class */ (function () {
    function ComponentContainer(name) {
        this.name = name;
        this.providers = new Map();
    }
    /**
     *
     * @param component Component being added
     * @param overwrite When a component with the same name has already been registered,
     * if overwrite is true: overwrite the existing component with the new component and create a new
     * provider with the new component. It can be useful in tests where you want to use different mocks
     * for different tests.
     * if overwrite is false: throw an exception
     */
    ComponentContainer.prototype.addComponent = function (component) {
        var provider = this.getProvider(component.name);
        if (provider.isComponentSet()) {
            throw new Error("Component " + component.name + " has already been registered with " + this.name);
        }
        provider.setComponent(component);
    };
    ComponentContainer.prototype.addOrOverwriteComponent = function (component) {
        var provider = this.getProvider(component.name);
        if (provider.isComponentSet()) {
            // delete the existing provider from the container, so we can register the new component
            this.providers.delete(component.name);
        }
        this.addComponent(component);
    };
    /**
     * getProvider provides a type safe interface where it can only be called with a field name
     * present in NameServiceMapping interface.
     *
     * Firebase SDKs providing services should extend NameServiceMapping interface to register
     * themselves.
     */
    ComponentContainer.prototype.getProvider = function (name) {
        if (this.providers.has(name)) {
            return this.providers.get(name);
        }
        // create a Provider for a service that hasn't registered with Firebase
        var provider = new Provider(name, this);
        this.providers.set(name, provider);
        return provider;
    };
    ComponentContainer.prototype.getProviders = function () {
        return Array.from(this.providers.values());
    };
    return ComponentContainer;
}());

exports.Component = Component;
exports.ComponentContainer = ComponentContainer;
exports.Provider = Provider;


},{"@firebase/util":5,"tslib":7}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t, e = require("tslib"), n = (t = require("@firebase/app")) && "object" == typeof t && "default" in t ? t.default : t, r = require("@firebase/logger"), i = require("@firebase/util"), o = require("@firebase/webchannel-wrapper"), s = require("@firebase/component"), u = n.SDK_VERSION, a = new r.Logger("@firebase/firestore");

// Helper methods are needed because variables can't be exported as read/write
function c() {
    return a.logLevel;
}

function h(t) {
    for (var n = [], i = 1; i < arguments.length; i++) n[i - 1] = arguments[i];
    if (a.logLevel <= r.LogLevel.DEBUG) {
        var o = n.map(l);
        a.debug.apply(a, e.__spreadArrays([ "Firestore (" + u + "): " + t ], o));
    }
}

function f(t) {
    for (var n = [], i = 1; i < arguments.length; i++) n[i - 1] = arguments[i];
    if (a.logLevel <= r.LogLevel.ERROR) {
        var o = n.map(l);
        a.error.apply(a, e.__spreadArrays([ "Firestore (" + u + "): " + t ], o));
    }
}

/**
 * Converts an additional log parameter to a string representation.
 */ function l(t) {
    if ("string" == typeof t) return t;
    try {
        return e = t, JSON.stringify(e);
    } catch (e) {
        // Converting to JSON failed, just log the object directly
        return t;
    }
    var e;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Unconditionally fails, throwing an Error with the given message.
 * Messages are stripped in production builds.
 *
 * Returns `never` and can be used in expressions:
 * @example
 * let futureVar = fail('not implemented yet');
 */ function p(t) {
    void 0 === t && (t = "Unexpected state");
    // Log the failure in addition to throw an exception, just in case the
    // exception is swallowed.
        var e = "FIRESTORE (" + u + ") INTERNAL ASSERTION FAILED: " + t;
    // NOTE: We don't use FirestoreError here because these are internal failures
    // that cannot be handled by the user. (Also it would create a circular
    // dependency between the error and assert modules which doesn't work.)
        throw f(e), new Error(e)
    /**
 * Fails if the given assertion condition is false, throwing an Error with the
 * given message if it did.
 *
 * Messages are stripped in production builds.
 */;
}

function d(t, e) {
    t || p();
}

/**
 * Casts `obj` to `T`. In non-production builds, verifies that `obj` is an
 * instance of `T` before casting.
 */ function y(t, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
e) {
    return t;
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Generates `nBytes` of random bytes.
 *
 * If `nBytes < 0` , an error will be thrown.
 */ function v(t) {
    // Polyfills for IE and WebWorker by using `self` and `msCrypto` when `crypto` is not available.
    var e = 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    "undefined" != typeof self && (self.crypto || self.msCrypto), n = new Uint8Array(t);
    if (e) e.getRandomValues(n); else 
    // Falls back to Math.random
    for (var r = 0; r < t; r++) n[r] = Math.floor(256 * Math.random());
    return n;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var g = /** @class */ function() {
    function t() {}
    return t.t = function() {
        for (
        // Alphanumeric characters
        var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", e = Math.floor(256 / t.length) * t.length, n = ""
        // The largest byte value that is a multiple of `char.length`.
        ; n.length < 20; ) for (var r = v(40), i = 0; i < r.length; ++i) 
        // Only accept values that are [0, maxMultiple), this ensures they can
        // be evenly mapped to indices of `chars` via a modulo operation.
        n.length < 20 && r[i] < e && (n += t.charAt(r[i] % t.length));
        return n;
    }, t;
}();

function m(t, e) {
    return t < e ? -1 : t > e ? 1 : 0;
}

/** Helper to compare arrays using isEqual(). */ function w(t, e, n) {
    return t.length === e.length && t.every((function(t, r) {
        return n(t, e[r]);
    }));
}

/**
 * Returns the immediate lexicographically-following string. This is useful to
 * construct an inclusive range for indexeddb iterators.
 */ function _(t) {
    // Return the input string, with an additional NUL byte appended.
    return t + "\0";
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var b = 
/**
     * Constructs a DatabaseInfo using the provided host, databaseId and
     * persistenceKey.
     *
     * @param databaseId The database to use.
     * @param persistenceKey A unique identifier for this Firestore's local
     * storage (used in conjunction with the databaseId).
     * @param host The Firestore backend host to connect to.
     * @param ssl Whether to use SSL when connecting.
     * @param forceLongPolling Whether to use the forceLongPolling option
     * when using WebChannel as the network transport.
     */
function(t, e, n, r, i) {
    this.s = t, this.persistenceKey = e, this.host = n, this.ssl = r, this.forceLongPolling = i;
}, I = /** @class */ function() {
    function t(t, e) {
        this.projectId = t, this.database = e || "(default)";
    }
    return Object.defineProperty(t.prototype, "i", {
        get: function() {
            return "(default)" === this.database;
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.isEqual = function(e) {
        return e instanceof t && e.projectId === this.projectId && e.database === this.database;
    }, t.prototype.o = function(t) {
        return m(this.projectId, t.projectId) || m(this.database, t.database);
    }, t;
}();

/** The default database name for a project. */
/** Represents the database ID a Firestore client is associated with. */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function E(t) {
    var e = 0;
    for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e++;
    return e;
}

function T(t, e) {
    for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e(n, t[n]);
}

function N(t) {
    for (var e in t) if (Object.prototype.hasOwnProperty.call(t, e)) return !1;
    return !0;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A map implementation that uses objects as keys. Objects must have an
 * associated equals function and must be immutable. Entries in the map are
 * stored together with the key being produced from the mapKeyFn. This map
 * automatically handles collisions of keys.
 */ var A = /** @class */ function() {
    function t(t, e) {
        this.h = t, this.u = e, 
        /**
             * The inner map for a key -> value pair. Due to the possibility of
             * collisions we keep a list of entries that we do a linear search through
             * to find an actual match. Note that collisions should be rare, so we still
             * expect near constant time lookups in practice.
             */
        this.l = {}
        /** Get a value for this key, or undefined if it does not exist. */;
    }
    return t.prototype.get = function(t) {
        var e = this.h(t), n = this.l[e];
        if (void 0 !== n) for (var r = 0, i = n; r < i.length; r++) {
            var o = i[r], s = o[0], u = o[1];
            if (this.u(s, t)) return u;
        }
    }, t.prototype.has = function(t) {
        return void 0 !== this.get(t);
    }, 
    /** Put this key and value in the map. */ t.prototype.set = function(t, e) {
        var n = this.h(t), r = this.l[n];
        if (void 0 !== r) {
            for (var i = 0; i < r.length; i++) if (this.u(r[i][0], t)) return void (r[i] = [ t, e ]);
            r.push([ t, e ]);
        } else this.l[n] = [ [ t, e ] ];
    }, 
    /**
     * Remove this key from the map. Returns a boolean if anything was deleted.
     */
    t.prototype.delete = function(t) {
        var e = this.h(t), n = this.l[e];
        if (void 0 === n) return !1;
        for (var r = 0; r < n.length; r++) if (this.u(n[r][0], t)) return 1 === n.length ? delete this.l[e] : n.splice(r, 1), 
        !0;
        return !1;
    }, t.prototype.forEach = function(t) {
        T(this.l, (function(e, n) {
            for (var r = 0, i = n; r < i.length; r++) {
                var o = i[r], s = o[0], u = o[1];
                t(s, u);
            }
        }));
    }, t.prototype._ = function() {
        return N(this.l);
    }, t;
}(), x = {
    // Causes are copied from:
    // https://github.com/grpc/grpc/blob/bceec94ea4fc5f0085d81235d8e1c06798dc341a/include/grpc%2B%2B/impl/codegen/status_code_enum.h
    /** Not an error; returned on success. */
    OK: "ok",
    /** The operation was cancelled (typically by the caller). */
    CANCELLED: "cancelled",
    /** Unknown error or an error from a different error domain. */
    UNKNOWN: "unknown",
    /**
     * Client specified an invalid argument. Note that this differs from
     * FAILED_PRECONDITION. INVALID_ARGUMENT indicates arguments that are
     * problematic regardless of the state of the system (e.g., a malformed file
     * name).
     */
    INVALID_ARGUMENT: "invalid-argument",
    /**
     * Deadline expired before operation could complete. For operations that
     * change the state of the system, this error may be returned even if the
     * operation has completed successfully. For example, a successful response
     * from a server could have been delayed long enough for the deadline to
     * expire.
     */
    DEADLINE_EXCEEDED: "deadline-exceeded",
    /** Some requested entity (e.g., file or directory) was not found. */
    NOT_FOUND: "not-found",
    /**
     * Some entity that we attempted to create (e.g., file or directory) already
     * exists.
     */
    ALREADY_EXISTS: "already-exists",
    /**
     * The caller does not have permission to execute the specified operation.
     * PERMISSION_DENIED must not be used for rejections caused by exhausting
     * some resource (use RESOURCE_EXHAUSTED instead for those errors).
     * PERMISSION_DENIED must not be used if the caller can not be identified
     * (use UNAUTHENTICATED instead for those errors).
     */
    PERMISSION_DENIED: "permission-denied",
    /**
     * The request does not have valid authentication credentials for the
     * operation.
     */
    UNAUTHENTICATED: "unauthenticated",
    /**
     * Some resource has been exhausted, perhaps a per-user quota, or perhaps the
     * entire file system is out of space.
     */
    RESOURCE_EXHAUSTED: "resource-exhausted",
    /**
     * Operation was rejected because the system is not in a state required for
     * the operation's execution. For example, directory to be deleted may be
     * non-empty, an rmdir operation is applied to a non-directory, etc.
     *
     * A litmus test that may help a service implementor in deciding
     * between FAILED_PRECONDITION, ABORTED, and UNAVAILABLE:
     *  (a) Use UNAVAILABLE if the client can retry just the failing call.
     *  (b) Use ABORTED if the client should retry at a higher-level
     *      (e.g., restarting a read-modify-write sequence).
     *  (c) Use FAILED_PRECONDITION if the client should not retry until
     *      the system state has been explicitly fixed. E.g., if an "rmdir"
     *      fails because the directory is non-empty, FAILED_PRECONDITION
     *      should be returned since the client should not retry unless
     *      they have first fixed up the directory by deleting files from it.
     *  (d) Use FAILED_PRECONDITION if the client performs conditional
     *      REST Get/Update/Delete on a resource and the resource on the
     *      server does not match the condition. E.g., conflicting
     *      read-modify-write on the same resource.
     */
    FAILED_PRECONDITION: "failed-precondition",
    /**
     * The operation was aborted, typically due to a concurrency issue like
     * sequencer check failures, transaction aborts, etc.
     *
     * See litmus test above for deciding between FAILED_PRECONDITION, ABORTED,
     * and UNAVAILABLE.
     */
    ABORTED: "aborted",
    /**
     * Operation was attempted past the valid range. E.g., seeking or reading
     * past end of file.
     *
     * Unlike INVALID_ARGUMENT, this error indicates a problem that may be fixed
     * if the system state changes. For example, a 32-bit file system will
     * generate INVALID_ARGUMENT if asked to read at an offset that is not in the
     * range [0,2^32-1], but it will generate OUT_OF_RANGE if asked to read from
     * an offset past the current file size.
     *
     * There is a fair bit of overlap between FAILED_PRECONDITION and
     * OUT_OF_RANGE. We recommend using OUT_OF_RANGE (the more specific error)
     * when it applies so that callers who are iterating through a space can
     * easily look for an OUT_OF_RANGE error to detect when they are done.
     */
    OUT_OF_RANGE: "out-of-range",
    /** Operation is not implemented or not supported/enabled in this service. */
    UNIMPLEMENTED: "unimplemented",
    /**
     * Internal errors. Means some invariants expected by underlying System has
     * been broken. If you see one of these errors, Something is very broken.
     */
    INTERNAL: "internal",
    /**
     * The service is currently unavailable. This is a most likely a transient
     * condition and may be corrected by retrying with a backoff.
     *
     * See litmus test above for deciding between FAILED_PRECONDITION, ABORTED,
     * and UNAVAILABLE.
     */
    UNAVAILABLE: "unavailable",
    /** Unrecoverable data loss or corruption. */
    DATA_LOSS: "data-loss"
}, S = /** @class */ function(t) {
    function n(e, n) {
        var r = this;
        return (r = t.call(this, n) || this).code = e, r.message = n, r.name = "FirebaseError", 
        // HACK: We write a toString property directly because Error is not a real
        // class and so inheritance does not work correctly. We could alternatively
        // do the same "back-door inheritance" trick that FirebaseError does.
        r.toString = function() {
            return r.name + ": [code=" + r.code + "]: " + r.message;
        }, r;
    }
    return e.__extends(n, t), n;
}(Error), D = /** @class */ function() {
    function t(t, e) {
        if (this.seconds = t, this.nanoseconds = e, e < 0) throw new S(x.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + e);
        if (e >= 1e9) throw new S(x.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + e);
        if (t < -62135596800) throw new S(x.INVALID_ARGUMENT, "Timestamp seconds out of range: " + t);
        // This will break in the year 10,000.
                if (t >= 253402300800) throw new S(x.INVALID_ARGUMENT, "Timestamp seconds out of range: " + t);
    }
    return t.now = function() {
        return t.fromMillis(Date.now());
    }, t.fromDate = function(e) {
        return t.fromMillis(e.getTime());
    }, t.fromMillis = function(e) {
        var n = Math.floor(e / 1e3);
        return new t(n, 1e6 * (e - 1e3 * n));
    }, t.prototype.toDate = function() {
        return new Date(this.toMillis());
    }, t.prototype.toMillis = function() {
        return 1e3 * this.seconds + this.nanoseconds / 1e6;
    }, t.prototype.T = function(t) {
        return this.seconds === t.seconds ? m(this.nanoseconds, t.nanoseconds) : m(this.seconds, t.seconds);
    }, t.prototype.isEqual = function(t) {
        return t.seconds === this.seconds && t.nanoseconds === this.nanoseconds;
    }, t.prototype.toString = function() {
        return "Timestamp(seconds=" + this.seconds + ", nanoseconds=" + this.nanoseconds + ")";
    }, t.prototype.valueOf = function() {
        // This method returns a string of the form <seconds>.<nanoseconds> where <seconds> is
        // translated to have a non-negative value and both <seconds> and <nanoseconds> are left-padded
        // with zeroes to be a consistent length. Strings with this format then have a lexiographical
        // ordering that matches the expected ordering. The <seconds> translation is done to avoid
        // having a leading negative sign (i.e. a leading '-' character) in its string representation,
        // which would affect its lexiographical ordering.
        var t = this.seconds - -62135596800;
        // Note: Up to 12 decimal digits are required to represent all valid 'seconds' values.
                return String(t).padStart(12, "0") + "." + String(this.nanoseconds).padStart(9, "0");
    }, t;
}(), k = /** @class */ function() {
    function t(t) {
        this.timestamp = t;
    }
    return t.I = function(e) {
        return new t(e);
    }, t.min = function() {
        return new t(new D(0, 0));
    }, t.prototype.o = function(t) {
        return this.timestamp.T(t.timestamp);
    }, t.prototype.isEqual = function(t) {
        return this.timestamp.isEqual(t.timestamp);
    }, 
    /** Returns a number representation of the version for use in spec tests. */ t.prototype.A = function() {
        // Convert to microseconds.
        return 1e6 * this.timestamp.seconds + this.timestamp.nanoseconds / 1e3;
    }, t.prototype.toString = function() {
        return "SnapshotVersion(" + this.timestamp.toString() + ")";
    }, t.prototype.R = function() {
        return this.timestamp;
    }, t;
}(), P = /** @class */ function() {
    function t(t, e, n) {
        void 0 === e ? e = 0 : e > t.length && p(), void 0 === n ? n = t.length - e : n > t.length - e && p(), 
        this.segments = t, this.offset = e, this.m = n;
    }
    return Object.defineProperty(t.prototype, "length", {
        get: function() {
            return this.m;
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.isEqual = function(e) {
        return 0 === t.P(this, e);
    }, t.prototype.child = function(e) {
        var n = this.segments.slice(this.offset, this.limit());
        return e instanceof t ? e.forEach((function(t) {
            n.push(t);
        })) : n.push(e), this.V(n);
    }, 
    /** The index of one past the last segment of the path. */ t.prototype.limit = function() {
        return this.offset + this.length;
    }, t.prototype.g = function(t) {
        return t = void 0 === t ? 1 : t, this.V(this.segments, this.offset + t, this.length - t);
    }, t.prototype.p = function() {
        return this.V(this.segments, this.offset, this.length - 1);
    }, t.prototype.v = function() {
        return this.segments[this.offset];
    }, t.prototype.S = function() {
        return this.get(this.length - 1);
    }, t.prototype.get = function(t) {
        return this.segments[this.offset + t];
    }, t.prototype._ = function() {
        return 0 === this.length;
    }, t.prototype.D = function(t) {
        if (t.length < this.length) return !1;
        for (var e = 0; e < this.length; e++) if (this.get(e) !== t.get(e)) return !1;
        return !0;
    }, t.prototype.C = function(t) {
        if (this.length + 1 !== t.length) return !1;
        for (var e = 0; e < this.length; e++) if (this.get(e) !== t.get(e)) return !1;
        return !0;
    }, t.prototype.forEach = function(t) {
        for (var e = this.offset, n = this.limit(); e < n; e++) t(this.segments[e]);
    }, t.prototype.F = function() {
        return this.segments.slice(this.offset, this.limit());
    }, t.P = function(t, e) {
        for (var n = Math.min(t.length, e.length), r = 0; r < n; r++) {
            var i = t.get(r), o = e.get(r);
            if (i < o) return -1;
            if (i > o) return 1;
        }
        return t.length < e.length ? -1 : t.length > e.length ? 1 : 0;
    }, t;
}(), R = /** @class */ function(t) {
    function n() {
        return null !== t && t.apply(this, arguments) || this;
    }
    return e.__extends(n, t), n.prototype.V = function(t, e, r) {
        return new n(t, e, r);
    }, n.prototype.N = function() {
        // NOTE: The client is ignorant of any path segments containing escape
        // sequences (e.g. __id123__) and just passes them through raw (they exist
        // for legacy reasons and should not be used frequently).
        return this.F().join("/");
    }, n.prototype.toString = function() {
        return this.N();
    }, 
    /**
     * Creates a resource path from the given slash-delimited string.
     */
    n.$ = function(t) {
        // NOTE: The client is ignorant of any path segments containing escape
        // sequences (e.g. __id123__) and just passes them through raw (they exist
        // for legacy reasons and should not be used frequently).
        if (t.indexOf("//") >= 0) throw new S(x.INVALID_ARGUMENT, "Invalid path (" + t + "). Paths must not contain // in them.");
        // We may still have an empty segment at the beginning or end if they had a
        // leading or trailing slash (which we allow).
                return new n(t.split("/").filter((function(t) {
            return t.length > 0;
        })));
    }, n;
}(P);

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ R.k = new R([]);

var O = /^[_a-zA-Z][_a-zA-Z0-9]*$/, U = /** @class */ function(t) {
    function n() {
        return null !== t && t.apply(this, arguments) || this;
    }
    return e.__extends(n, t), n.prototype.V = function(t, e, r) {
        return new n(t, e, r);
    }, 
    /**
     * Returns true if the string could be used as a segment in a field path
     * without escaping.
     */
    n.M = function(t) {
        return O.test(t);
    }, n.prototype.N = function() {
        return this.F().map((function(t) {
            return t = t.replace("\\", "\\\\").replace("`", "\\`"), n.M(t) || (t = "`" + t + "`"), 
            t;
        })).join(".");
    }, n.prototype.toString = function() {
        return this.N();
    }, 
    /**
     * Returns true if this field references the key of a document.
     */
    n.prototype.L = function() {
        return 1 === this.length && "__name__" === this.get(0);
    }, 
    /**
     * The field designating the key of a document.
     */
    n.O = function() {
        return new n([ "__name__" ]);
    }, 
    /**
     * Parses a field string from the given server-formatted string.
     *
     * - Splitting the empty string is not allowed (for now at least).
     * - Empty segments within the string (e.g. if there are two consecutive
     *   separators) are not allowed.
     *
     * TODO(b/37244157): we should make this more strict. Right now, it allows
     * non-identifier path components, even if they aren't escaped.
     */
    n.B = function(t) {
        for (var e = [], r = "", i = 0, o = function() {
            if (0 === r.length) throw new S(x.INVALID_ARGUMENT, "Invalid field path (" + t + "). Paths must not be empty, begin with '.', end with '.', or contain '..'");
            e.push(r), r = "";
        }, s = !1; i < t.length; ) {
            var u = t[i];
            if ("\\" === u) {
                if (i + 1 === t.length) throw new S(x.INVALID_ARGUMENT, "Path has trailing escape character: " + t);
                var a = t[i + 1];
                if ("\\" !== a && "." !== a && "`" !== a) throw new S(x.INVALID_ARGUMENT, "Path has invalid escape sequence: " + t);
                r += a, i += 2;
            } else "`" === u ? (s = !s, i++) : "." !== u || s ? (r += u, i++) : (o(), i++);
        }
        if (o(), s) throw new S(x.INVALID_ARGUMENT, "Unterminated ` in path: " + t);
        return new n(e);
    }, n;
}(P);

/** A dot-separated path for navigating sub-objects within a document. */ U.k = new U([]);

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var L = /** @class */ function() {
    function t(t) {
        this.path = t;
    }
    return t.q = function(e) {
        return new t(R.$(e).g(5));
    }, 
    /** Returns true if the document is in the specified collectionId. */ t.prototype.U = function(t) {
        return this.path.length >= 2 && this.path.get(this.path.length - 2) === t;
    }, t.prototype.isEqual = function(t) {
        return null !== t && 0 === R.P(this.path, t.path);
    }, t.prototype.toString = function() {
        return this.path.toString();
    }, t.P = function(t, e) {
        return R.P(t.path, e.path);
    }, t.W = function(t) {
        return t.length % 2 == 0;
    }, 
    /**
     * Creates and returns a new document key with the given segments.
     *
     * @param segments The segments of the path to the document
     * @return A new instance of DocumentKey
     */
    t.j = function(e) {
        return new t(new R(e.slice()));
    }, t;
}();

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Returns whether a variable is either undefined or null.
 */ function V(t) {
    return null == t;
}

/** Returns whether the value represents -0. */ function C(t) {
    // Detect if the value is -0.0. Based on polyfill from
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
    return -0 === t && 1 / t == -1 / 0;
}

/**
 * Returns whether a value is an integer and in the safe integer range
 * @param value The value to test for being an integer and in the safe range
 */ function q(t) {
    return "number" == typeof t && Number.isInteger(t) && !C(t) && t <= Number.MAX_SAFE_INTEGER && t >= Number.MIN_SAFE_INTEGER;
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** Converts a Base64 encoded string to a binary string. */ L.EMPTY = new L(new R([]));

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Immutable class that represents a "proto" byte string.
 *
 * Proto byte strings can either be Base64-encoded strings or Uint8Arrays when
 * sent on the wire. This class abstracts away this differentiation by holding
 * the proto byte string in a common class that must be converted into a string
 * before being sent as a proto.
 */
var F = /** @class */ function() {
    function t(t) {
        this.K = t;
    }
    return t.fromBase64String = function(e) {
        return new t(atob(e));
    }, t.fromUint8Array = function(e) {
        return new t(
        /**
 * Helper function to convert an Uint8array to a binary string.
 */
        function(t) {
            for (var e = "", n = 0; n < t.length; ++n) e += String.fromCharCode(t[n]);
            return e;
        }(e));
    }, t.prototype.toBase64 = function() {
        return t = this.K, btoa(t);
        /** Converts a binary string to a Base64 encoded string. */        var t;
        /** True if and only if the Base64 conversion functions are available. */    }, 
    t.prototype.toUint8Array = function() {
        return function(t) {
            for (var e = new Uint8Array(t.length), n = 0; n < t.length; n++) e[n] = t.charCodeAt(n);
            return e;
        }(this.K);
    }, t.prototype.G = function() {
        return 2 * this.K.length;
    }, t.prototype.o = function(t) {
        return m(this.K, t.K);
    }, t.prototype.isEqual = function(t) {
        return this.K === t.K;
    }, t;
}();

F.H = new F("");

var M, j, B = /** @class */ function() {
    function t(
    /** The target being listened to. */
    t, 
    /**
     * The target ID to which the target corresponds; Assigned by the
     * LocalStore for user listens and by the SyncEngine for limbo watches.
     */
    e, 
    /** The purpose of the target. */
    n, 
    /**
     * The sequence number of the last transaction during which this target data
     * was modified.
     */
    r, 
    /** The latest snapshot version seen for this target. */
    i
    /**
     * The maximum snapshot version at which the associated view
     * contained no limbo documents.
     */ , o
    /**
     * An opaque, server-assigned token that allows watching a target to be
     * resumed after disconnecting without retransmitting all the data that
     * matches the target. The resume token essentially identifies a point in
     * time from which the server should resume sending results.
     */ , s) {
        void 0 === i && (i = k.min()), void 0 === o && (o = k.min()), void 0 === s && (s = F.H), 
        this.target = t, this.targetId = e, this.Y = n, this.sequenceNumber = r, this.J = i, 
        this.lastLimboFreeSnapshotVersion = o, this.resumeToken = s;
    }
    /** Creates a new target data instance with an updated sequence number. */    return t.prototype.X = function(e) {
        return new t(this.target, this.targetId, this.Y, e, this.J, this.lastLimboFreeSnapshotVersion, this.resumeToken);
    }, 
    /**
     * Creates a new target data instance with an updated resume token and
     * snapshot version.
     */
    t.prototype.Z = function(e, n) {
        return new t(this.target, this.targetId, this.Y, this.sequenceNumber, n, this.lastLimboFreeSnapshotVersion, e);
    }, 
    /**
     * Creates a new target data instance with an updated last limbo free
     * snapshot version number.
     */
    t.prototype.tt = function(e) {
        return new t(this.target, this.targetId, this.Y, this.sequenceNumber, this.J, e, this.resumeToken);
    }, t;
}(), Q = 
// TODO(b/33078163): just use simplest form of existence filter for now
function(t) {
    this.count = t;
};

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Determines whether an error code represents a permanent error when received
 * in response to a non-write operation.
 *
 * See isPermanentWriteError for classifying write errors.
 */
function G(t) {
    switch (t) {
      case x.OK:
        return p();

      case x.CANCELLED:
      case x.UNKNOWN:
      case x.DEADLINE_EXCEEDED:
      case x.RESOURCE_EXHAUSTED:
      case x.INTERNAL:
      case x.UNAVAILABLE:
 // Unauthenticated means something went wrong with our token and we need
        // to retry with new credentials which will happen automatically.
              case x.UNAUTHENTICATED:
        return !1;

      case x.INVALID_ARGUMENT:
      case x.NOT_FOUND:
      case x.ALREADY_EXISTS:
      case x.PERMISSION_DENIED:
      case x.FAILED_PRECONDITION:
 // Aborted might be retried in some scenarios, but that is dependant on
        // the context and should handled individually by the calling code.
        // See https://cloud.google.com/apis/design/errors.
              case x.ABORTED:
      case x.OUT_OF_RANGE:
      case x.UNIMPLEMENTED:
      case x.DATA_LOSS:
        return !0;

      default:
        return p();
    }
}

/**
 * Determines whether an error code represents a permanent error when received
 * in response to a write operation.
 *
 * Write operations must be handled specially because as of b/119437764, ABORTED
 * errors on the write stream should be retried too (even though ABORTED errors
 * are not generally retryable).
 *
 * Note that during the initial handshake on the write stream an ABORTED error
 * signals that we should discard our stream token (i.e. it is permanent). This
 * means a handshake error should be classified with isPermanentError, above.
 */
/**
 * Maps an error Code from GRPC status code number, like 0, 1, or 14. These
 * are not the same as HTTP status codes.
 *
 * @returns The Code equivalent to the given GRPC status code. Fails if there
 *     is no match.
 */ function z(t) {
    if (void 0 === t) 
    // This shouldn't normally happen, but in certain error cases (like trying
    // to send invalid proto messages) we may get an error with no GRPC code.
    return f("GRPC error has no .code"), x.UNKNOWN;
    switch (t) {
      case M.OK:
        return x.OK;

      case M.CANCELLED:
        return x.CANCELLED;

      case M.UNKNOWN:
        return x.UNKNOWN;

      case M.DEADLINE_EXCEEDED:
        return x.DEADLINE_EXCEEDED;

      case M.RESOURCE_EXHAUSTED:
        return x.RESOURCE_EXHAUSTED;

      case M.INTERNAL:
        return x.INTERNAL;

      case M.UNAVAILABLE:
        return x.UNAVAILABLE;

      case M.UNAUTHENTICATED:
        return x.UNAUTHENTICATED;

      case M.INVALID_ARGUMENT:
        return x.INVALID_ARGUMENT;

      case M.NOT_FOUND:
        return x.NOT_FOUND;

      case M.ALREADY_EXISTS:
        return x.ALREADY_EXISTS;

      case M.PERMISSION_DENIED:
        return x.PERMISSION_DENIED;

      case M.FAILED_PRECONDITION:
        return x.FAILED_PRECONDITION;

      case M.ABORTED:
        return x.ABORTED;

      case M.OUT_OF_RANGE:
        return x.OUT_OF_RANGE;

      case M.UNIMPLEMENTED:
        return x.UNIMPLEMENTED;

      case M.DATA_LOSS:
        return x.DATA_LOSS;

      default:
        return p();
    }
}

/**
 * Converts an HTTP response's error status to the equivalent error code.
 *
 * @param status An HTTP error response status ("FAILED_PRECONDITION",
 * "UNKNOWN", etc.)
 * @returns The equivalent Code. Non-matching responses are mapped to
 *     Code.UNKNOWN.
 */ (j = M || (M = {}))[j.OK = 0] = "OK", j[j.CANCELLED = 1] = "CANCELLED", j[j.UNKNOWN = 2] = "UNKNOWN", 
j[j.INVALID_ARGUMENT = 3] = "INVALID_ARGUMENT", j[j.DEADLINE_EXCEEDED = 4] = "DEADLINE_EXCEEDED", 
j[j.NOT_FOUND = 5] = "NOT_FOUND", j[j.ALREADY_EXISTS = 6] = "ALREADY_EXISTS", j[j.PERMISSION_DENIED = 7] = "PERMISSION_DENIED", 
j[j.UNAUTHENTICATED = 16] = "UNAUTHENTICATED", j[j.RESOURCE_EXHAUSTED = 8] = "RESOURCE_EXHAUSTED", 
j[j.FAILED_PRECONDITION = 9] = "FAILED_PRECONDITION", j[j.ABORTED = 10] = "ABORTED", 
j[j.OUT_OF_RANGE = 11] = "OUT_OF_RANGE", j[j.UNIMPLEMENTED = 12] = "UNIMPLEMENTED", 
j[j.INTERNAL = 13] = "INTERNAL", j[j.UNAVAILABLE = 14] = "UNAVAILABLE", j[j.DATA_LOSS = 15] = "DATA_LOSS";

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// An immutable sorted map implementation, based on a Left-leaning Red-Black
// tree.
var W = /** @class */ function() {
    function t(t, e) {
        this.P = t, this.root = e || K.EMPTY;
    }
    // Returns a copy of the map, with the specified key/value added or replaced.
        return t.prototype.et = function(e, n) {
        return new t(this.P, this.root.et(e, n, this.P).st(null, null, K.nt, null, null));
    }, 
    // Returns a copy of the map, with the specified key removed.
    t.prototype.remove = function(e) {
        return new t(this.P, this.root.remove(e, this.P).st(null, null, K.nt, null, null));
    }, 
    // Returns the value of the node with the given key, or null.
    t.prototype.get = function(t) {
        for (var e = this.root; !e._(); ) {
            var n = this.P(t, e.key);
            if (0 === n) return e.value;
            n < 0 ? e = e.left : n > 0 && (e = e.right);
        }
        return null;
    }, 
    // Returns the index of the element in this sorted map, or -1 if it doesn't
    // exist.
    t.prototype.indexOf = function(t) {
        for (
        // Number of nodes that were pruned when descending right
        var e = 0, n = this.root; !n._(); ) {
            var r = this.P(t, n.key);
            if (0 === r) return e + n.left.size;
            r < 0 ? n = n.left : (
            // Count all nodes left of the node plus the node itself
            e += n.left.size + 1, n = n.right);
        }
        // Node not found
                return -1;
    }, t.prototype._ = function() {
        return this.root._();
    }, Object.defineProperty(t.prototype, "size", {
        // Returns the total number of nodes in the map.
        get: function() {
            return this.root.size;
        },
        enumerable: !0,
        configurable: !0
    }), 
    // Returns the minimum key in the map.
    t.prototype.it = function() {
        return this.root.it();
    }, 
    // Returns the maximum key in the map.
    t.prototype.rt = function() {
        return this.root.rt();
    }, 
    // Traverses the map in key order and calls the specified action function
    // for each key/value pair. If action returns true, traversal is aborted.
    // Returns the first truthy value returned by action, or the last falsey
    // value returned by action.
    t.prototype.ot = function(t) {
        return this.root.ot(t);
    }, t.prototype.forEach = function(t) {
        this.ot((function(e, n) {
            return t(e, n), !1;
        }));
    }, t.prototype.toString = function() {
        var t = [];
        return this.ot((function(e, n) {
            return t.push(e + ":" + n), !1;
        })), "{" + t.join(", ") + "}";
    }, 
    // Traverses the map in reverse key order and calls the specified action
    // function for each key/value pair. If action returns true, traversal is
    // aborted.
    // Returns the first truthy value returned by action, or the last falsey
    // value returned by action.
    t.prototype.ht = function(t) {
        return this.root.ht(t);
    }, 
    // Returns an iterator over the SortedMap.
    t.prototype.at = function() {
        return new H(this.root, null, this.P, !1);
    }, t.prototype.ut = function(t) {
        return new H(this.root, t, this.P, !1);
    }, t.prototype.ct = function() {
        return new H(this.root, null, this.P, !0);
    }, t.prototype.lt = function(t) {
        return new H(this.root, t, this.P, !0);
    }, t;
}(), H = /** @class */ function() {
    function t(t, e, n, r) {
        this._t = r, this.ft = [];
        for (var i = 1; !t._(); ) if (i = e ? n(t.key, e) : 1, 
        // flip the comparison if we're going in reverse
        r && (i *= -1), i < 0) 
        // This node is less than our start key. ignore it
        t = this._t ? t.left : t.right; else {
            if (0 === i) {
                // This node is exactly equal to our start key. Push it on the stack,
                // but stop iterating;
                this.ft.push(t);
                break;
            }
            // This node is greater than our start key, add it to the stack and move
            // to the next one
                        this.ft.push(t), t = this._t ? t.right : t.left;
        }
    }
    return t.prototype.dt = function() {
        var t = this.ft.pop(), e = {
            key: t.key,
            value: t.value
        };
        if (this._t) for (t = t.left; !t._(); ) this.ft.push(t), t = t.right; else for (t = t.right; !t._(); ) this.ft.push(t), 
        t = t.left;
        return e;
    }, t.prototype.wt = function() {
        return this.ft.length > 0;
    }, t.prototype.Tt = function() {
        if (0 === this.ft.length) return null;
        var t = this.ft[this.ft.length - 1];
        return {
            key: t.key,
            value: t.value
        };
    }, t;
}(), K = /** @class */ function() {
    function t(e, n, r, i, o) {
        this.key = e, this.value = n, this.color = null != r ? r : t.RED, this.left = null != i ? i : t.EMPTY, 
        this.right = null != o ? o : t.EMPTY, this.size = this.left.size + 1 + this.right.size;
    }
    // Returns a copy of the current node, optionally replacing pieces of it.
        return t.prototype.st = function(e, n, r, i, o) {
        return new t(null != e ? e : this.key, null != n ? n : this.value, null != r ? r : this.color, null != i ? i : this.left, null != o ? o : this.right);
    }, t.prototype._ = function() {
        return !1;
    }, 
    // Traverses the tree in key order and calls the specified action function
    // for each node. If action returns true, traversal is aborted.
    // Returns the first truthy value returned by action, or the last falsey
    // value returned by action.
    t.prototype.ot = function(t) {
        return this.left.ot(t) || t(this.key, this.value) || this.right.ot(t);
    }, 
    // Traverses the tree in reverse key order and calls the specified action
    // function for each node. If action returns true, traversal is aborted.
    // Returns the first truthy value returned by action, or the last falsey
    // value returned by action.
    t.prototype.ht = function(t) {
        return this.right.ht(t) || t(this.key, this.value) || this.left.ht(t);
    }, 
    // Returns the minimum node in the tree.
    t.prototype.min = function() {
        return this.left._() ? this : this.left.min();
    }, 
    // Returns the maximum key in the tree.
    t.prototype.it = function() {
        return this.min().key;
    }, 
    // Returns the maximum key in the tree.
    t.prototype.rt = function() {
        return this.right._() ? this.key : this.right.rt();
    }, 
    // Returns new tree, with the key/value added.
    t.prototype.et = function(t, e, n) {
        var r = this, i = n(t, r.key);
        return (r = i < 0 ? r.st(null, null, null, r.left.et(t, e, n), null) : 0 === i ? r.st(null, e, null, null, null) : r.st(null, null, null, null, r.right.et(t, e, n))).Et();
    }, t.prototype.It = function() {
        if (this.left._()) return t.EMPTY;
        var e = this;
        return e.left.At() || e.left.left.At() || (e = e.Rt()), (e = e.st(null, null, null, e.left.It(), null)).Et();
    }, 
    // Returns new tree, with the specified item removed.
    t.prototype.remove = function(e, n) {
        var r, i = this;
        if (n(e, i.key) < 0) i.left._() || i.left.At() || i.left.left.At() || (i = i.Rt()), 
        i = i.st(null, null, null, i.left.remove(e, n), null); else {
            if (i.left.At() && (i = i.Pt()), i.right._() || i.right.At() || i.right.left.At() || (i = i.Vt()), 
            0 === n(e, i.key)) {
                if (i.right._()) return t.EMPTY;
                r = i.right.min(), i = i.st(r.key, r.value, null, null, i.right.It());
            }
            i = i.st(null, null, null, null, i.right.remove(e, n));
        }
        return i.Et();
    }, t.prototype.At = function() {
        return this.color;
    }, 
    // Returns new tree after performing any needed rotations.
    t.prototype.Et = function() {
        var t = this;
        return t.right.At() && !t.left.At() && (t = t.gt()), t.left.At() && t.left.left.At() && (t = t.Pt()), 
        t.left.At() && t.right.At() && (t = t.pt()), t;
    }, t.prototype.Rt = function() {
        var t = this.pt();
        return t.right.left.At() && (t = (t = (t = t.st(null, null, null, null, t.right.Pt())).gt()).pt()), 
        t;
    }, t.prototype.Vt = function() {
        var t = this.pt();
        return t.left.left.At() && (t = (t = t.Pt()).pt()), t;
    }, t.prototype.gt = function() {
        var e = this.st(null, null, t.RED, null, this.right.left);
        return this.right.st(null, null, this.color, e, null);
    }, t.prototype.Pt = function() {
        var e = this.st(null, null, t.RED, this.left.right, null);
        return this.left.st(null, null, this.color, null, e);
    }, t.prototype.pt = function() {
        var t = this.left.st(null, null, !this.left.color, null, null), e = this.right.st(null, null, !this.right.color, null, null);
        return this.st(null, null, !this.color, t, e);
    }, 
    // For testing.
    t.prototype.yt = function() {
        var t = this.bt();
        return Math.pow(2, t) <= this.size + 1;
    }, 
    // In a balanced RB tree, the black-depth (number of black nodes) from root to
    // leaves is equal on both sides.  This function verifies that or asserts.
    t.prototype.bt = function() {
        if (this.At() && this.left.At()) throw p();
        if (this.right.At()) throw p();
        var t = this.left.bt();
        if (t !== this.right.bt()) throw p();
        return t + (this.At() ? 0 : 1);
    }, t;
}();

// end SortedMap
// An iterator over an LLRBNode.
// end LLRBNode
// Empty node is shared between all LLRB trees.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
K.EMPTY = null, K.RED = !0, K.nt = !1, 
// end LLRBEmptyNode
K.EMPTY = new (/** @class */ function() {
    function t() {
        this.size = 0;
    }
    return Object.defineProperty(t.prototype, "key", {
        get: function() {
            throw p();
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "value", {
        get: function() {
            throw p();
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "color", {
        get: function() {
            throw p();
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "left", {
        get: function() {
            throw p();
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "right", {
        get: function() {
            throw p();
        },
        enumerable: !0,
        configurable: !0
    }), 
    // Returns a copy of the current node.
    t.prototype.st = function(t, e, n, r, i) {
        return this;
    }, 
    // Returns a copy of the tree, with the specified key/value added.
    t.prototype.et = function(t, e, n) {
        return new K(t, e);
    }, 
    // Returns a copy of the tree, with the specified key removed.
    t.prototype.remove = function(t, e) {
        return this;
    }, t.prototype._ = function() {
        return !0;
    }, t.prototype.ot = function(t) {
        return !1;
    }, t.prototype.ht = function(t) {
        return !1;
    }, t.prototype.it = function() {
        return null;
    }, t.prototype.rt = function() {
        return null;
    }, t.prototype.At = function() {
        return !1;
    }, 
    // For testing.
    t.prototype.yt = function() {
        return !0;
    }, t.prototype.bt = function() {
        return 0;
    }, t;
}());

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * SortedSet is an immutable (copy-on-write) collection that holds elements
 * in order specified by the provided comparator.
 *
 * NOTE: if provided comparator returns 0 for two elements, we consider them to
 * be equal!
 */
var Y = /** @class */ function() {
    function t(t) {
        this.P = t, this.data = new W(this.P);
    }
    return t.prototype.has = function(t) {
        return null !== this.data.get(t);
    }, t.prototype.first = function() {
        return this.data.it();
    }, t.prototype.last = function() {
        return this.data.rt();
    }, Object.defineProperty(t.prototype, "size", {
        get: function() {
            return this.data.size;
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.indexOf = function(t) {
        return this.data.indexOf(t);
    }, 
    /** Iterates elements in order defined by "comparator" */ t.prototype.forEach = function(t) {
        this.data.ot((function(e, n) {
            return t(e), !1;
        }));
    }, 
    /** Iterates over `elem`s such that: range[0] <= elem < range[1]. */ t.prototype.vt = function(t, e) {
        for (var n = this.data.ut(t[0]); n.wt(); ) {
            var r = n.dt();
            if (this.P(r.key, t[1]) >= 0) return;
            e(r.key);
        }
    }, 
    /**
     * Iterates over `elem`s such that: start <= elem until false is returned.
     */
    t.prototype.St = function(t, e) {
        var n;
        for (n = void 0 !== e ? this.data.ut(e) : this.data.at(); n.wt(); ) if (!t(n.dt().key)) return;
    }, 
    /** Finds the least element greater than or equal to `elem`. */ t.prototype.Dt = function(t) {
        var e = this.data.ut(t);
        return e.wt() ? e.dt().key : null;
    }, t.prototype.at = function() {
        return new X(this.data.at());
    }, t.prototype.ut = function(t) {
        return new X(this.data.ut(t));
    }, 
    /** Inserts or updates an element */ t.prototype.add = function(t) {
        return this.st(this.data.remove(t).et(t, !0));
    }, 
    /** Deletes an element */ t.prototype.delete = function(t) {
        return this.has(t) ? this.st(this.data.remove(t)) : this;
    }, t.prototype._ = function() {
        return this.data._();
    }, t.prototype.Ct = function(t) {
        var e = this;
        // Make sure `result` always refers to the larger one of the two sets.
                return e.size < t.size && (e = t, t = this), t.forEach((function(t) {
            e = e.add(t);
        })), e;
    }, t.prototype.isEqual = function(e) {
        if (!(e instanceof t)) return !1;
        if (this.size !== e.size) return !1;
        for (var n = this.data.at(), r = e.data.at(); n.wt(); ) {
            var i = n.dt().key, o = r.dt().key;
            if (0 !== this.P(i, o)) return !1;
        }
        return !0;
    }, t.prototype.F = function() {
        var t = [];
        return this.forEach((function(e) {
            t.push(e);
        })), t;
    }, t.prototype.toString = function() {
        var t = [];
        return this.forEach((function(e) {
            return t.push(e);
        })), "SortedSet(" + t.toString() + ")";
    }, t.prototype.st = function(e) {
        var n = new t(this.P);
        return n.data = e, n;
    }, t;
}(), X = /** @class */ function() {
    function t(t) {
        this.Ft = t;
    }
    return t.prototype.dt = function() {
        return this.Ft.dt().key;
    }, t.prototype.wt = function() {
        return this.Ft.wt();
    }, t;
}(), $ = new W(L.P);

function J() {
    return $;
}

function Z() {
    return J();
}

var tt = new W(L.P);

function et() {
    return tt;
}

var nt = new W(L.P), rt = new Y(L.P);

function it() {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
    for (var n = rt, r = 0, i = t; r < i.length; r++) {
        var o = i[r];
        n = n.add(o);
    }
    return n;
}

var ot = new Y(m);

function st() {
    return ot;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * DocumentSet is an immutable (copy-on-write) collection that holds documents
 * in order specified by the provided comparator. We always add a document key
 * comparator on top of what is provided to guarantee document equality based on
 * the key.
 */ var ut = /** @class */ function() {
    /** The default ordering is by key if the comparator is omitted */
    function t(t) {
        // We are adding document key comparator to the end as it's the only
        // guaranteed unique property of a document.
        this.P = t ? function(e, n) {
            return t(e, n) || L.P(e.key, n.key);
        } : function(t, e) {
            return L.P(t.key, e.key);
        }, this.Nt = et(), this.$t = new W(this.P)
        /**
     * Returns an empty copy of the existing DocumentSet, using the same
     * comparator.
     */;
    }
    return t.kt = function(e) {
        return new t(e.P);
    }, t.prototype.has = function(t) {
        return null != this.Nt.get(t);
    }, t.prototype.get = function(t) {
        return this.Nt.get(t);
    }, t.prototype.first = function() {
        return this.$t.it();
    }, t.prototype.last = function() {
        return this.$t.rt();
    }, t.prototype._ = function() {
        return this.$t._();
    }, 
    /**
     * Returns the index of the provided key in the document set, or -1 if the
     * document key is not present in the set;
     */
    t.prototype.indexOf = function(t) {
        var e = this.Nt.get(t);
        return e ? this.$t.indexOf(e) : -1;
    }, Object.defineProperty(t.prototype, "size", {
        get: function() {
            return this.$t.size;
        },
        enumerable: !0,
        configurable: !0
    }), 
    /** Iterates documents in order defined by "comparator" */ t.prototype.forEach = function(t) {
        this.$t.ot((function(e, n) {
            return t(e), !1;
        }));
    }, 
    /** Inserts or updates a document with the same key */ t.prototype.add = function(t) {
        // First remove the element if we have it.
        var e = this.delete(t.key);
        return e.st(e.Nt.et(t.key, t), e.$t.et(t, null));
    }, 
    /** Deletes a document with a given key */ t.prototype.delete = function(t) {
        var e = this.get(t);
        return e ? this.st(this.Nt.remove(t), this.$t.remove(e)) : this;
    }, t.prototype.isEqual = function(e) {
        if (!(e instanceof t)) return !1;
        if (this.size !== e.size) return !1;
        for (var n = this.$t.at(), r = e.$t.at(); n.wt(); ) {
            var i = n.dt().key, o = r.dt().key;
            if (!i.isEqual(o)) return !1;
        }
        return !0;
    }, t.prototype.toString = function() {
        var t = [];
        return this.forEach((function(e) {
            t.push(e.toString());
        })), 0 === t.length ? "DocumentSet ()" : "DocumentSet (\n  " + t.join("  \n") + "\n)";
    }, t.prototype.st = function(e, n) {
        var r = new t;
        return r.P = this.P, r.Nt = e, r.$t = n, r;
    }, t;
}(), at = /** @class */ function() {
    function t() {
        this.xt = new W(L.P);
    }
    return t.prototype.track = function(t) {
        var e = t.doc.key, n = this.xt.get(e);
        n ? 
        // Merge the new change with the existing change.
        0 /* Added */ !== t.type && 3 /* Metadata */ === n.type ? this.xt = this.xt.et(e, t) : 3 /* Metadata */ === t.type && 1 /* Removed */ !== n.type ? this.xt = this.xt.et(e, {
            type: n.type,
            doc: t.doc
        }) : 2 /* Modified */ === t.type && 2 /* Modified */ === n.type ? this.xt = this.xt.et(e, {
            type: 2 /* Modified */ ,
            doc: t.doc
        }) : 2 /* Modified */ === t.type && 0 /* Added */ === n.type ? this.xt = this.xt.et(e, {
            type: 0 /* Added */ ,
            doc: t.doc
        }) : 1 /* Removed */ === t.type && 0 /* Added */ === n.type ? this.xt = this.xt.remove(e) : 1 /* Removed */ === t.type && 2 /* Modified */ === n.type ? this.xt = this.xt.et(e, {
            type: 1 /* Removed */ ,
            doc: n.doc
        }) : 0 /* Added */ === t.type && 1 /* Removed */ === n.type ? this.xt = this.xt.et(e, {
            type: 2 /* Modified */ ,
            doc: t.doc
        }) : 
        // This includes these cases, which don't make sense:
        // Added->Added
        // Removed->Removed
        // Modified->Added
        // Removed->Modified
        // Metadata->Added
        // Removed->Metadata
        p() : this.xt = this.xt.et(e, t);
    }, t.prototype.Mt = function() {
        var t = [];
        return this.xt.ot((function(e, n) {
            t.push(n);
        })), t;
    }, t;
}(), ct = /** @class */ function() {
    function t(t, e, n, r, i, o, s, u) {
        this.query = t, this.docs = e, this.Lt = n, this.docChanges = r, this.Ot = i, this.fromCache = o, 
        this.Bt = s, this.qt = u
        /** Returns a view snapshot as if all documents in the snapshot were added. */;
    }
    return t.Ut = function(e, n, r, i) {
        var o = [];
        return n.forEach((function(t) {
            o.push({
                type: 0 /* Added */ ,
                doc: t
            });
        })), new t(e, n, ut.kt(n), o, r, i, 
        /* syncStateChanged= */ !0, 
        /* excludesMetadataChanges= */ !1);
    }, Object.defineProperty(t.prototype, "hasPendingWrites", {
        get: function() {
            return !this.Ot._();
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.isEqual = function(t) {
        if (!(this.fromCache === t.fromCache && this.Bt === t.Bt && this.Ot.isEqual(t.Ot) && this.query.isEqual(t.query) && this.docs.isEqual(t.docs) && this.Lt.isEqual(t.Lt))) return !1;
        var e = this.docChanges, n = t.docChanges;
        if (e.length !== n.length) return !1;
        for (var r = 0; r < e.length; r++) if (e[r].type !== n[r].type || !e[r].doc.isEqual(n[r].doc)) return !1;
        return !0;
    }, t;
}(), ht = /** @class */ function() {
    function t(
    /**
     * The snapshot version this event brings us up to, or MIN if not set.
     */
    t, 
    /**
     * A map from target to changes to the target. See TargetChange.
     */
    e, 
    /**
     * A set of targets that is known to be inconsistent. Listens for these
     * targets should be re-established without resume tokens.
     */
    n, 
    /**
     * A set of which documents have changed or been deleted, along with the
     * doc's new values (if not deleted).
     */
    r, 
    /**
     * A set of which document updates are due only to limbo resolution targets.
     */
    i) {
        this.J = t, this.Qt = e, this.Wt = n, this.jt = r, this.Kt = i;
    }
    /**
     * HACK: Views require RemoteEvents in order to determine whether the view is
     * CURRENT, but secondary tabs don't receive remote events. So this method is
     * used to create a synthesized RemoteEvent that can be used to apply a
     * CURRENT status change to a View, for queries executed in a different tab.
     */
    // PORTING NOTE: Multi-tab only
        return t.Gt = function(e, n) {
        var r = new Map;
        return r.set(e, ft.zt(e, n)), new t(k.min(), r, st(), J(), it());
    }, t;
}(), ft = /** @class */ function() {
    function t(
    /**
     * An opaque, server-assigned token that allows watching a query to be resumed
     * after disconnecting without retransmitting all the data that matches the
     * query. The resume token essentially identifies a point in time from which
     * the server should resume sending results.
     */
    t, 
    /**
     * The "current" (synced) status of this target. Note that "current"
     * has special meaning in the RPC protocol that implies that a target is
     * both up-to-date and consistent with the rest of the watch stream.
     */
    e, 
    /**
     * The set of documents that were newly assigned to this target as part of
     * this remote event.
     */
    n, 
    /**
     * The set of documents that were already assigned to this target but received
     * an update during this remote event.
     */
    r, 
    /**
     * The set of documents that were removed from this target as part of this
     * remote event.
     */
    i) {
        this.resumeToken = t, this.Ht = e, this.Yt = n, this.Jt = r, this.Xt = i
        /**
     * This method is used to create a synthesized TargetChanges that can be used to
     * apply a CURRENT status change to a View (for queries executed in a different
     * tab) or for new queries (to raise snapshots with correct CURRENT status).
     */;
    }
    return t.zt = function(e, n) {
        return new t(F.H, n, it(), it(), it());
    }, t;
}(), lt = function(
/** The new document applies to all of these targets. */
t, 
/** The new document is removed from all of these targets. */
e, 
/** The key of the document for this change. */
n, 
/**
     * The new document or NoDocument if it was deleted. Is null if the
     * document went out of view without the server sending a new document.
     */
r) {
    this.Zt = t, this.removedTargetIds = e, this.key = n, this.te = r;
}, pt = function(t, e) {
    this.targetId = t, this.ee = e;
}, dt = function(
/** What kind of change occurred to the watch target. */
t, 
/** The target IDs that were added/removed/set. */
e, 
/**
     * An opaque, server-assigned token that allows watching a target to be
     * resumed after disconnecting without retransmitting all the data that
     * matches the target. The resume token essentially identifies a point in
     * time from which the server should resume sending results.
     */
n
/** An RPC error indicating why the watch failed. */ , r) {
    void 0 === n && (n = F.H), void 0 === r && (r = null), this.state = t, this.targetIds = e, 
    this.resumeToken = n, this.cause = r;
}, yt = /** @class */ function() {
    function t() {
        /**
         * The number of pending responses (adds or removes) that we are waiting on.
         * We only consider targets active that have no pending responses.
         */
        this.se = 0, 
        /**
             * Keeps track of the document changes since the last raised snapshot.
             *
             * These changes are continuously updated as we receive document updates and
             * always reflect the current set of changes against the last issued snapshot.
             */
        this.ne = mt(), 
        /** See public getters for explanations of these fields. */
        this.ie = F.H, this.re = !1, 
        /**
             * Whether this target state should be included in the next snapshot. We
             * initialize to true so that newly-added targets are included in the next
             * RemoteEvent.
             */
        this.oe = !0;
    }
    return Object.defineProperty(t.prototype, "Ht", {
        /**
         * Whether this target has been marked 'current'.
         *
         * 'Current' has special meaning in the RPC protocol: It implies that the
         * Watch backend has sent us all changes up to the point at which the target
         * was added and that the target is consistent with the rest of the watch
         * stream.
         */
        get: function() {
            return this.re;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "resumeToken", {
        /** The last resume token sent to us for this target. */ get: function() {
            return this.ie;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "he", {
        /** Whether this target has pending target adds or target removes. */ get: function() {
            return 0 !== this.se;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "ae", {
        /** Whether we have modified any state that should trigger a snapshot. */ get: function() {
            return this.oe;
        },
        enumerable: !0,
        configurable: !0
    }), 
    /**
     * Applies the resume token to the TargetChange, but only when it has a new
     * value. Empty resumeTokens are discarded.
     */
    t.prototype.ue = function(t) {
        t.G() > 0 && (this.oe = !0, this.ie = t);
    }, 
    /**
     * Creates a target change from the current set of changes.
     *
     * To reset the document changes after raising this snapshot, call
     * `clearPendingChanges()`.
     */
    t.prototype.ce = function() {
        var t = it(), e = it(), n = it();
        return this.ne.forEach((function(r, i) {
            switch (i) {
              case 0 /* Added */ :
                t = t.add(r);
                break;

              case 2 /* Modified */ :
                e = e.add(r);
                break;

              case 1 /* Removed */ :
                n = n.add(r);
                break;

              default:
                p();
            }
        })), new ft(this.ie, this.re, t, e, n);
    }, 
    /**
     * Resets the document changes and sets `hasPendingChanges` to false.
     */
    t.prototype.le = function() {
        this.oe = !1, this.ne = mt();
    }, t.prototype._e = function(t, e) {
        this.oe = !0, this.ne = this.ne.et(t, e);
    }, t.prototype.fe = function(t) {
        this.oe = !0, this.ne = this.ne.remove(t);
    }, t.prototype.de = function() {
        this.se += 1;
    }, t.prototype.we = function() {
        this.se -= 1;
    }, t.prototype.Te = function() {
        this.oe = !0, this.re = !0;
    }, t;
}(), vt = /** @class */ function() {
    function t(t) {
        this.Ee = t, 
        /** The internal state of all tracked targets. */
        this.Ie = new Map, 
        /** Keeps track of the documents to update since the last raised snapshot. */
        this.Ae = J(), 
        /** A mapping of document keys to their set of target IDs. */
        this.Re = gt(), 
        /**
             * A list of targets with existence filter mismatches. These targets are
             * known to be inconsistent and their listens needs to be re-established by
             * RemoteStore.
             */
        this.me = new Y(m)
        /**
     * Processes and adds the DocumentWatchChange to the current set of changes.
     */;
    }
    return t.prototype.Pe = function(t) {
        for (var e = 0, n = t.Zt; e < n.length; e++) {
            var r = n[e];
            t.te instanceof Oe ? this.Ve(r, t.te) : t.te instanceof Ue && this.ge(r, t.key, t.te);
        }
        for (var i = 0, o = t.removedTargetIds; i < o.length; i++) {
            var s = o[i];
            this.ge(s, t.key, t.te);
        }
    }, 
    /** Processes and adds the WatchTargetChange to the current set of changes. */ t.prototype.pe = function(t) {
        var e = this;
        this.ye(t, (function(n) {
            var r = e.be(n);
            switch (t.state) {
              case 0 /* NoChange */ :
                e.ve(n) && r.ue(t.resumeToken);
                break;

              case 1 /* Added */ :
                // We need to decrement the number of pending acks needed from watch
                // for this targetId.
                r.we(), r.he || 
                // We have a freshly added target, so we need to reset any state
                // that we had previously. This can happen e.g. when remove and add
                // back a target for existence filter mismatches.
                r.le(), r.ue(t.resumeToken);
                break;

              case 2 /* Removed */ :
                // We need to keep track of removed targets to we can post-filter and
                // remove any target changes.
                // We need to decrement the number of pending acks needed from watch
                // for this targetId.
                r.we(), r.he || e.removeTarget(n);
                break;

              case 3 /* Current */ :
                e.ve(n) && (r.Te(), r.ue(t.resumeToken));
                break;

              case 4 /* Reset */ :
                e.ve(n) && (
                // Reset the target and synthesizes removes for all existing
                // documents. The backend will re-add any documents that still
                // match the target before it sends the next global snapshot.
                e.Se(n), r.ue(t.resumeToken));
                break;

              default:
                p();
            }
        }));
    }, 
    /**
     * Iterates over all targetIds that the watch change applies to: either the
     * targetIds explicitly listed in the change or the targetIds of all currently
     * active targets.
     */
    t.prototype.ye = function(t, e) {
        var n = this;
        t.targetIds.length > 0 ? t.targetIds.forEach(e) : this.Ie.forEach((function(t, r) {
            n.ve(r) && e(r);
        }));
    }, 
    /**
     * Handles existence filters and synthesizes deletes for filter mismatches.
     * Targets that are invalidated by filter mismatches are added to
     * `pendingTargetResets`.
     */
    t.prototype.De = function(t) {
        var e = t.targetId, n = t.ee.count, r = this.Ce(e);
        if (r) {
            var i = r.target;
            if (Je(i)) if (0 === n) {
                // The existence filter told us the document does not exist. We deduce
                // that this document does not exist and apply a deleted document to
                // our updates. Without applying this deleted document there might be
                // another query that will raise this document as part of a snapshot
                // until it is resolved, essentially exposing inconsistency between
                // queries.
                var o = new L(i.path);
                this.ge(e, o, new Ue(o, k.min()));
            } else d(1 === n); else this.Fe(e) !== n && (
            // Existence filter mismatch: We reset the mapping and raise a new
            // snapshot with `isFromCache:true`.
            this.Se(e), this.me = this.me.add(e));
        }
    }, 
    /**
     * Converts the currently accumulated state into a remote event at the
     * provided snapshot version. Resets the accumulated changes before returning.
     */
    t.prototype.Ne = function(t) {
        var e = this, n = new Map;
        this.Ie.forEach((function(r, i) {
            var o = e.Ce(i);
            if (o) {
                if (r.Ht && Je(o.target)) {
                    // Document queries for document that don't exist can produce an empty
                    // result set. To update our local cache, we synthesize a document
                    // delete if we have not previously received the document. This
                    // resolves the limbo state of the document, removing it from
                    // limboDocumentRefs.
                    // TODO(dimond): Ideally we would have an explicit lookup target
                    // instead resulting in an explicit delete message and we could
                    // remove this special logic.
                    var s = new L(o.target.path);
                    null !== e.Ae.get(s) || e.$e(i, s) || e.ge(i, s, new Ue(s, t));
                }
                r.ae && (n.set(i, r.ce()), r.le());
            }
        }));
        var r = it();
        // We extract the set of limbo-only document updates as the GC logic
        // special-cases documents that do not appear in the target cache.
        // TODO(gsoltis): Expand on this comment once GC is available in the JS
        // client.
                this.Re.forEach((function(t, n) {
            var i = !0;
            n.St((function(t) {
                var n = e.Ce(t);
                return !n || 2 /* LimboResolution */ === n.Y || (i = !1, !1);
            })), i && (r = r.add(t));
        }));
        var i = new ht(t, n, this.me, this.Ae, r);
        return this.Ae = J(), this.Re = gt(), this.me = new Y(m), i;
    }, 
    /**
     * Adds the provided document to the internal list of document updates and
     * its document key to the given target's mapping.
     */
    // Visible for testing.
    t.prototype.Ve = function(t, e) {
        if (this.ve(t)) {
            var n = this.$e(t, e.key) ? 2 /* Modified */ : 0 /* Added */;
            this.be(t)._e(e.key, n), this.Ae = this.Ae.et(e.key, e), this.Re = this.Re.et(e.key, this.ke(e.key).add(t));
        }
    }, 
    /**
     * Removes the provided document from the target mapping. If the
     * document no longer matches the target, but the document's state is still
     * known (e.g. we know that the document was deleted or we received the change
     * that caused the filter mismatch), the new document can be provided
     * to update the remote document cache.
     */
    // Visible for testing.
    t.prototype.ge = function(t, e, n) {
        if (this.ve(t)) {
            var r = this.be(t);
            this.$e(t, e) ? r._e(e, 1 /* Removed */) : 
            // The document may have entered and left the target before we raised a
            // snapshot, so we can just ignore the change.
            r.fe(e), this.Re = this.Re.et(e, this.ke(e).delete(t)), n && (this.Ae = this.Ae.et(e, n));
        }
    }, t.prototype.removeTarget = function(t) {
        this.Ie.delete(t);
    }, 
    /**
     * Returns the current count of documents in the target. This includes both
     * the number of documents that the LocalStore considers to be part of the
     * target as well as any accumulated changes.
     */
    t.prototype.Fe = function(t) {
        var e = this.be(t).ce();
        return this.Ee.xe(t).size + e.Yt.size - e.Xt.size;
    }, 
    /**
     * Increment the number of acks needed from watch before we can consider the
     * server to be 'in-sync' with the client's active targets.
     */
    t.prototype.de = function(t) {
        this.be(t).de();
    }, t.prototype.be = function(t) {
        var e = this.Ie.get(t);
        return e || (e = new yt, this.Ie.set(t, e)), e;
    }, t.prototype.ke = function(t) {
        var e = this.Re.get(t);
        return e || (e = new Y(m), this.Re = this.Re.et(t, e)), e;
    }, 
    /**
     * Verifies that the user is still interested in this target (by calling
     * `getTargetDataForTarget()`) and that we are not waiting for pending ADDs
     * from watch.
     */
    t.prototype.ve = function(t) {
        var e = null !== this.Ce(t);
        return e || h("WatchChangeAggregator", "Detected inactive target", t), e;
    }, 
    /**
     * Returns the TargetData for an active target (i.e. a target that the user
     * is still interested in that has no outstanding target change requests).
     */
    t.prototype.Ce = function(t) {
        var e = this.Ie.get(t);
        return e && e.he ? null : this.Ee.Me(t);
    }, 
    /**
     * Resets the state of a Watch target to its initial state (e.g. sets
     * 'current' to false, clears the resume token and removes its target mapping
     * from all documents).
     */
    t.prototype.Se = function(t) {
        var e = this;
        this.Ie.set(t, new yt), this.Ee.xe(t).forEach((function(n) {
            e.ge(t, n, /*updatedDocument=*/ null);
        }));
    }, 
    /**
     * Returns whether the LocalStore considers the document to be part of the
     * specified target.
     */
    t.prototype.$e = function(t, e) {
        return this.Ee.xe(t).has(e);
    }, t;
}();

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * DocumentChangeSet keeps track of a set of changes to docs in a query, merging
 * duplicate events for the same doc.
 */ function gt() {
    return new W(L.P);
}

function mt() {
    return new W(L.P);
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Represents a locally-applied ServerTimestamp.
 *
 * Server Timestamps are backed by MapValues that contain an internal field
 * `__type__` with a value of `server_timestamp`. The previous value and local
 * write time are stored in its `__previous_value__` and `__local_write_time__`
 * fields respectively.
 *
 * Notes:
 * - ServerTimestampValue instances are created as the result of applying a
 *   TransformMutation (see TransformMutation.applyTo()). They can only exist in
 *   the local view of a document. Therefore they do not need to be parsed or
 *   serialized.
 * - When evaluated locally (e.g. for snapshot.data()), they by default
 *   evaluate to `null`. This behavior can be configured by passing custom
 *   FieldValueOptions to value().
 * - With respect to other ServerTimestampValues, they sort by their
 *   localWriteTime.
 */ function wt(t) {
    var e, n;
    return "server_timestamp" === (null === (n = ((null === (e = null == t ? void 0 : t.mapValue) || void 0 === e ? void 0 : e.fields) || {}).__type__) || void 0 === n ? void 0 : n.stringValue);
}

/**
 * Creates a new ServerTimestamp proto value (using the internal format).
 */
/**
 * Returns the local time at which this timestamp was first set.
 */ function _t(t) {
    var e = St(t.mapValue.fields.__local_write_time__.timestampValue);
    return new D(e.seconds, e.nanos);
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// A RegExp matching ISO 8601 UTC timestamps with optional fraction.
var bt = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);

/** Extracts the backend's type order for the provided value. */ function It(t) {
    return "nullValue" in t ? 0 /* NullValue */ : "booleanValue" in t ? 1 /* BooleanValue */ : "integerValue" in t || "doubleValue" in t ? 2 /* NumberValue */ : "timestampValue" in t ? 3 /* TimestampValue */ : "stringValue" in t ? 5 /* StringValue */ : "bytesValue" in t ? 6 /* BlobValue */ : "referenceValue" in t ? 7 /* RefValue */ : "geoPointValue" in t ? 8 /* GeoPointValue */ : "arrayValue" in t ? 9 /* ArrayValue */ : "mapValue" in t ? wt(t) ? 4 /* ServerTimestampValue */ : 10 /* ObjectValue */ : p();
}

/** Tests `left` and `right` for equality based on the backend semantics. */ function Et(t, e) {
    var n = It(t);
    if (n !== It(e)) return !1;
    switch (n) {
      case 0 /* NullValue */ :
        return !0;

      case 1 /* BooleanValue */ :
        return t.booleanValue === e.booleanValue;

      case 4 /* ServerTimestampValue */ :
        return _t(t).isEqual(_t(e));

      case 3 /* TimestampValue */ :
        return function(t, e) {
            if ("string" == typeof t.timestampValue && "string" == typeof e.timestampValue && t.timestampValue.length === e.timestampValue.length) 
            // Use string equality for ISO 8601 timestamps
            return t.timestampValue === e.timestampValue;
            var n = St(t.timestampValue), r = St(e.timestampValue);
            return n.seconds === r.seconds && n.nanos === r.nanos;
        }(t, e);

      case 5 /* StringValue */ :
        return t.stringValue === e.stringValue;

      case 6 /* BlobValue */ :
        return function(t, e) {
            return kt(t.bytesValue).isEqual(kt(e.bytesValue));
        }(t, e);

      case 7 /* RefValue */ :
        return t.referenceValue === e.referenceValue;

      case 8 /* GeoPointValue */ :
        return function(t, e) {
            return Dt(t.geoPointValue.latitude) === Dt(e.geoPointValue.latitude) && Dt(t.geoPointValue.longitude) === Dt(e.geoPointValue.longitude);
        }(t, e);

      case 2 /* NumberValue */ :
        return function(t, e) {
            if ("integerValue" in t && "integerValue" in e) return Dt(t.integerValue) === Dt(e.integerValue);
            if ("doubleValue" in t && "doubleValue" in e) {
                var n = Dt(t.doubleValue), r = Dt(e.doubleValue);
                return n === r ? C(n) === C(r) : isNaN(n) && isNaN(r);
            }
            return !1;
        }(t, e);

      case 9 /* ArrayValue */ :
        return w(t.arrayValue.values || [], e.arrayValue.values || [], Et);

      case 10 /* ObjectValue */ :
        return function(t, e) {
            var n = t.mapValue.fields || {}, r = e.mapValue.fields || {};
            if (E(n) !== E(r)) return !1;
            for (var i in n) if (n.hasOwnProperty(i) && (void 0 === r[i] || !Et(n[i], r[i]))) return !1;
            return !0;
        }(t, e);

      default:
        return p();
    }
}

function Tt(t, e) {
    return void 0 !== (t.values || []).find((function(t) {
        return Et(t, e);
    }));
}

function Nt(t, e) {
    var n = It(t), r = It(e);
    if (n !== r) return m(n, r);
    switch (n) {
      case 0 /* NullValue */ :
        return 0;

      case 1 /* BooleanValue */ :
        return m(t.booleanValue, e.booleanValue);

      case 2 /* NumberValue */ :
        return function(t, e) {
            var n = Dt(t.integerValue || t.doubleValue), r = Dt(e.integerValue || e.doubleValue);
            return n < r ? -1 : n > r ? 1 : n === r ? 0 : 
            // one or both are NaN.
            isNaN(n) ? isNaN(r) ? 0 : -1 : 1;
        }(t, e);

      case 3 /* TimestampValue */ :
        return At(t.timestampValue, e.timestampValue);

      case 4 /* ServerTimestampValue */ :
        return At(_t(t), _t(e));

      case 5 /* StringValue */ :
        return m(t.stringValue, e.stringValue);

      case 6 /* BlobValue */ :
        return function(t, e) {
            var n = kt(t), r = kt(e);
            return n.o(r);
        }(t.bytesValue, e.bytesValue);

      case 7 /* RefValue */ :
        return function(t, e) {
            for (var n = t.split("/"), r = e.split("/"), i = 0; i < n.length && i < r.length; i++) {
                var o = m(n[i], r[i]);
                if (0 !== o) return o;
            }
            return m(n.length, r.length);
        }(t.referenceValue, e.referenceValue);

      case 8 /* GeoPointValue */ :
        return function(t, e) {
            var n = m(Dt(t.latitude), Dt(e.latitude));
            return 0 !== n ? n : m(Dt(t.longitude), Dt(e.longitude));
        }(t.geoPointValue, e.geoPointValue);

      case 9 /* ArrayValue */ :
        return function(t, e) {
            for (var n = t.values || [], r = e.values || [], i = 0; i < n.length && i < r.length; ++i) {
                var o = Nt(n[i], r[i]);
                if (o) return o;
            }
            return m(n.length, r.length);
        }(t.arrayValue, e.arrayValue);

      case 10 /* ObjectValue */ :
        return function(t, e) {
            var n = t.fields || {}, r = Object.keys(n), i = e.fields || {}, o = Object.keys(i);
            // Even though MapValues are likely sorted correctly based on their insertion
            // order (e.g. when received from the backend), local modifications can bring
            // elements out of order. We need to re-sort the elements to ensure that
            // canonical IDs are independent of insertion order.
                        r.sort(), o.sort();
            for (var s = 0; s < r.length && s < o.length; ++s) {
                var u = m(r[s], o[s]);
                if (0 !== u) return u;
                var a = Nt(n[r[s]], i[o[s]]);
                if (0 !== a) return a;
            }
            return m(r.length, o.length);
        }(t.mapValue, e.mapValue);

      default:
        throw p();
    }
}

function At(t, e) {
    if ("string" == typeof t && "string" == typeof e && t.length === e.length) return m(t, e);
    var n = St(t), r = St(e), i = m(n.seconds, r.seconds);
    return 0 !== i ? i : m(n.nanos, r.nanos);
}

function xt(t) {
    return function t(e) {
        return "nullValue" in e ? "null" : "booleanValue" in e ? "" + e.booleanValue : "integerValue" in e ? "" + e.integerValue : "doubleValue" in e ? "" + e.doubleValue : "timestampValue" in e ? function(t) {
            var e = St(t);
            return "time(" + e.seconds + "," + e.nanos + ")";
        }(e.timestampValue) : "stringValue" in e ? e.stringValue : "bytesValue" in e ? kt(e.bytesValue).toBase64() : "referenceValue" in e ? (r = e.referenceValue, 
        L.q(r).toString()) : "geoPointValue" in e ? "geo(" + (n = e.geoPointValue).latitude + "," + n.longitude + ")" : "arrayValue" in e ? function(e) {
            for (var n = "[", r = !0, i = 0, o = e.values || []; i < o.length; i++) {
                var s = o[i];
                r ? r = !1 : n += ",", n += t(s);
            }
            return n + "]";
        }(e.arrayValue) : "mapValue" in e ? function(e) {
            for (
            // Iteration order in JavaScript is not guaranteed. To ensure that we generate
            // matching canonical IDs for identical maps, we need to sort the keys.
            var n = "{", r = !0, i = 0, o = Object.keys(e.fields || {}).sort(); i < o.length; i++) {
                var s = o[i];
                r ? r = !1 : n += ",", n += s + ":" + t(e.fields[s]);
            }
            return n + "}";
        }(e.mapValue) : p();
        var n, r;
    }(t);
}

function St(t) {
    // The json interface (for the browser) will return an iso timestamp string,
    // while the proto js library (for node) will return a
    // google.protobuf.Timestamp instance.
    if (d(!!t), "string" == typeof t) {
        // The date string can have higher precision (nanos) than the Date class
        // (millis), so we do some custom parsing here.
        // Parse the nanos right out of the string.
        var e = 0, n = bt.exec(t);
        if (d(!!n), n[1]) {
            // Pad the fraction out to 9 digits (nanos).
            var r = n[1];
            r = (r + "000000000").substr(0, 9), e = Number(r);
        }
        // Parse the date to get the seconds.
                var i = new Date(t);
        return {
            seconds: Math.floor(i.getTime() / 1e3),
            nanos: e
        };
    }
    return {
        seconds: Dt(t.seconds),
        nanos: Dt(t.nanos)
    };
}

/**
 * Converts the possible Proto types for numbers into a JavaScript number.
 * Returns 0 if the value is not numeric.
 */ function Dt(t) {
    // TODO(bjornick): Handle int64 greater than 53 bits.
    return "number" == typeof t ? t : "string" == typeof t ? Number(t) : 0;
}

/** Converts the possible Proto types for Blobs into a ByteString. */ function kt(t) {
    return "string" == typeof t ? F.fromBase64String(t) : F.fromUint8Array(t);
}

/** Returns a reference value for the provided database and key. */ function Pt(t, e) {
    return {
        referenceValue: "projects/" + t.projectId + "/databases/" + t.database + "/documents/" + e.path.N()
    };
}

/** Returns true if `value` is an IntegerValue . */ function Rt(t) {
    return !!t && "integerValue" in t;
}

/** Returns true if `value` is a DoubleValue. */
/** Returns true if `value` is an ArrayValue. */ function Ot(t) {
    return !!t && "arrayValue" in t;
}

/** Returns true if `value` is a NullValue. */ function Ut(t) {
    return !!t && "nullValue" in t;
}

/** Returns true if `value` is NaN. */ function Lt(t) {
    return !!t && "doubleValue" in t && isNaN(Number(t.doubleValue));
}

/** Returns true if `value` is a MapValue. */ function Vt(t) {
    return !!t && "mapValue" in t;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var Ct = {
    asc: "ASCENDING",
    desc: "DESCENDING"
}, qt = {
    "<": "LESS_THAN",
    "<=": "LESS_THAN_OR_EQUAL",
    ">": "GREATER_THAN",
    ">=": "GREATER_THAN_OR_EQUAL",
    "==": "EQUAL",
    "array-contains": "ARRAY_CONTAINS",
    in: "IN",
    "array-contains-any": "ARRAY_CONTAINS_ANY"
}, Ft = function(t, e) {
    this.s = t, this.Le = e;
};

/**
 * This class generates JsonObject values for the Datastore API suitable for
 * sending to either GRPC stub methods or via the JSON/HTTP REST API.
 *
 * The serializer supports both Protobuf.js and Proto3 JSON formats. By
 * setting `useProto3Json` to true, the serializer will use the Proto3 JSON
 * format.
 *
 * For a description of the Proto3 JSON format check
 * https://developers.google.com/protocol-buffers/docs/proto3#json
 *
 * TODO(klimt): We can remove the databaseId argument if we keep the full
 * resource name in documents.
 */
/**
 * Returns an IntegerValue for `value`.
 */
function Mt(t) {
    return {
        integerValue: "" + t
    };
}

/**
 * Returns an DoubleValue for `value` that is encoded based the serializer's
 * `useProto3Json` setting.
 */ function jt(t, e) {
    if (t.Le) {
        if (isNaN(e)) return {
            doubleValue: "NaN"
        };
        if (e === 1 / 0) return {
            doubleValue: "Infinity"
        };
        if (e === -1 / 0) return {
            doubleValue: "-Infinity"
        };
    }
    return {
        doubleValue: C(e) ? "-0" : e
    };
}

/**
 * Returns a value for a number that's appropriate to put into a proto.
 * The return value is an IntegerValue if it can safely represent the value,
 * otherwise a DoubleValue is returned.
 */
/**
 * Returns a value for a Date that's appropriate to put into a proto.
 */ function Bt(t, e) {
    return t.Le ? new Date(1e3 * e.seconds).toISOString().replace(/\.\d*/, "").replace("Z", "") + "." + ("000000000" + e.nanoseconds).slice(-9) + "Z" : {
        seconds: "" + e.seconds,
        nanos: e.nanoseconds
    };
}

/**
 * Returns a value for bytes that's appropriate to put in a proto.
 *
 * Visible for testing.
 */ function Qt(t, e) {
    return t.Le ? e.toBase64() : e.toUint8Array();
}

/**
 * Returns a ByteString based on the proto string value.
 */ function Gt(t, e) {
    return t.Le ? (d(void 0 === e || "string" == typeof e), F.fromBase64String(e || "")) : (d(void 0 === e || e instanceof Uint8Array), 
    F.fromUint8Array(e || new Uint8Array));
}

function zt(t, e) {
    return Bt(t, e.R());
}

function Wt(t) {
    return d(!!t), k.I(function(t) {
        var e = St(t);
        return new D(e.seconds, e.nanos);
    }(t));
}

function Ht(t, e) {
    return function(t) {
        return new R([ "projects", t.projectId, "databases", t.database ]);
    }(t).child("documents").child(e).N();
}

function Kt(t) {
    var e = R.$(t);
    return d(pe(e)), e;
}

function Yt(t, e) {
    return Ht(t.s, e.path);
}

function Xt(t, e) {
    var n = Kt(e);
    return d(n.get(1) === t.s.projectId), d(!n.get(3) && !t.s.database || n.get(3) === t.s.database), 
    new L(te(n));
}

function $t(t, e) {
    return Ht(t.s, e);
}

function Jt(t) {
    var e = Kt(t);
    // In v1beta1 queries for collections at the root did not have a trailing
    // "/documents". In v1 all resource paths contain "/documents". Preserve the
    // ability to read the v1beta1 form for compatibility with queries persisted
    // in the local target cache.
        return 4 === e.length ? R.k : te(e);
}

function Zt(t) {
    return new R([ "projects", t.s.projectId, "databases", t.s.database ]).N();
}

function te(t) {
    return d(t.length > 4 && "documents" === t.get(4)), t.g(5)
    /** Creates an api.Document from key and fields (but no create/update time) */;
}

function ee(t, e, n) {
    return {
        name: Yt(t, e),
        fields: n.proto.mapValue.fields
    };
}

function ne(t, e) {
    var n;
    if (e instanceof Te) n = {
        update: ee(t, e.key, e.value)
    }; else if (e instanceof xe) n = {
        delete: Yt(t, e.key)
    }; else if (e instanceof Ne) n = {
        update: ee(t, e.key, e.data),
        updateMask: le(e.Oe)
    }; else if (e instanceof Ae) n = {
        transform: {
            document: Yt(t, e.key),
            fieldTransforms: e.fieldTransforms.map((function(t) {
                return function(t, e) {
                    var n = e.transform;
                    if (n instanceof de) return {
                        fieldPath: e.field.N(),
                        setToServerValue: "REQUEST_TIME"
                    };
                    if (n instanceof ye) return {
                        fieldPath: e.field.N(),
                        appendMissingElements: {
                            values: n.elements
                        }
                    };
                    if (n instanceof ve) return {
                        fieldPath: e.field.N(),
                        removeAllFromArray: {
                            values: n.elements
                        }
                    };
                    if (n instanceof ge) return {
                        fieldPath: e.field.N(),
                        increment: n.Be
                    };
                    throw p();
                }(0, t);
            }))
        }
    }; else {
        if (!(e instanceof Se)) return p();
        n = {
            verify: Yt(t, e.key)
        };
    }
    return e.Ue.qe || (n.currentDocument = function(t, e) {
        return void 0 !== e.updateTime ? {
            updateTime: zt(t, e.updateTime)
        } : void 0 !== e.exists ? {
            exists: e.exists
        } : p();
    }(t, e.Ue)), n;
}

function re(t, e) {
    var n = e.currentDocument ? function(t) {
        return void 0 !== t.updateTime ? Ie.updateTime(Wt(t.updateTime)) : void 0 !== t.exists ? Ie.exists(t.exists) : Ie.Qe();
    }(e.currentDocument) : Ie.Qe();
    if (e.update) {
        e.update.name;
        var r = Xt(t, e.update.name), i = new De({
            mapValue: {
                fields: e.update.fields
            }
        });
        if (e.updateMask) {
            var o = function(t) {
                var e = t.fieldPaths || [];
                return new we(e.map((function(t) {
                    return U.B(t);
                })));
            }(e.updateMask);
            return new Ne(r, i, o, n);
        }
        return new Te(r, i, n);
    }
    if (e.delete) {
        var s = Xt(t, e.delete);
        return new xe(s, n);
    }
    if (e.transform) {
        var u = Xt(t, e.transform.document), a = e.transform.fieldTransforms.map((function(e) {
            return function(t, e) {
                var n = null;
                if ("setToServerValue" in e) d("REQUEST_TIME" === e.setToServerValue), n = de.instance; else if ("appendMissingElements" in e) {
                    var r = e.appendMissingElements.values || [];
                    n = new ye(r);
                } else if ("removeAllFromArray" in e) {
                    var i = e.removeAllFromArray.values || [];
                    n = new ve(i);
                } else "increment" in e ? n = new ge(t, e.increment) : p();
                var o = U.B(e.fieldPath);
                return new _e(o, n);
            }(t, e);
        }));
        return d(!0 === n.exists), new Ae(u, a);
    }
    if (e.verify) {
        var c = Xt(t, e.verify);
        return new Se(c, n);
    }
    return p();
}

function ie(t, e) {
    return {
        documents: [ $t(t, e.path) ]
    };
}

function oe(t, e) {
    // Dissect the path into parent, collectionId, and optional key filter.
    var n = {
        structuredQuery: {}
    }, r = e.path;
    null !== e.collectionGroup ? (n.parent = $t(t, r), n.structuredQuery.from = [ {
        collectionId: e.collectionGroup,
        allDescendants: !0
    } ]) : (n.parent = $t(t, r.p()), n.structuredQuery.from = [ {
        collectionId: r.S()
    } ]);
    var i = function(t) {
        if (0 !== t.length) {
            var e = t.map((function(t) {
                return t instanceof Ce ? 
                // visible for testing
                function(t) {
                    if ("==" /* EQUAL */ === t.op) {
                        if (Lt(t.value)) return {
                            unaryFilter: {
                                field: ae(t.field),
                                op: "IS_NAN"
                            }
                        };
                        if (Ut(t.value)) return {
                            unaryFilter: {
                                field: ae(t.field),
                                op: "IS_NULL"
                            }
                        };
                    }
                    return {
                        fieldFilter: {
                            field: ae(t.field),
                            op: (e = t.op, qt[e]),
                            value: t.value
                        }
                    };
                    // visible for testing
                                        var e;
                }(t) : p();
            }));
            return 1 === e.length ? e[0] : {
                compositeFilter: {
                    op: "AND",
                    filters: e
                }
            };
        }
    }(e.filters);
    i && (n.structuredQuery.where = i);
    var o = function(t) {
        if (0 !== t.length) return t.map((function(t) {
            return {
                field: ae((e = t).field),
                direction: (n = e.dir, Ct[n])
            };
            // visible for testing
                        var e, n;
        }));
    }(e.orderBy);
    o && (n.structuredQuery.orderBy = o);
    var s = function(t, e) {
        return t.Le || V(e) ? e : {
            value: e
        };
    }(t, e.limit);
    return null !== s && (n.structuredQuery.limit = s), e.startAt && (n.structuredQuery.startAt = se(e.startAt)), 
    e.endAt && (n.structuredQuery.endAt = se(e.endAt)), n;
}

function se(t) {
    return {
        before: t.before,
        values: t.position
    };
}

function ue(t) {
    var e = !!t.before, n = t.values || [];
    return new Qe(n, e);
}

// visible for testing
function ae(t) {
    return {
        fieldPath: t.N()
    };
}

function ce(t) {
    return U.B(t.fieldPath);
}

function he(t) {
    return Ce.create(ce(t.fieldFilter.field), function(t) {
        switch (t) {
          case "EQUAL":
            return "==" /* EQUAL */;

          case "GREATER_THAN":
            return ">" /* GREATER_THAN */;

          case "GREATER_THAN_OR_EQUAL":
            return ">=" /* GREATER_THAN_OR_EQUAL */;

          case "LESS_THAN":
            return "<" /* LESS_THAN */;

          case "LESS_THAN_OR_EQUAL":
            return "<=" /* LESS_THAN_OR_EQUAL */;

          case "ARRAY_CONTAINS":
            return "array-contains" /* ARRAY_CONTAINS */;

          case "IN":
            return "in" /* IN */;

          case "ARRAY_CONTAINS_ANY":
            return "array-contains-any" /* ARRAY_CONTAINS_ANY */;

          case "OPERATOR_UNSPECIFIED":
          default:
            return p();
        }
    }(t.fieldFilter.op), t.fieldFilter.value);
}

function fe(t) {
    switch (t.unaryFilter.op) {
      case "IS_NAN":
        var e = ce(t.unaryFilter.field);
        return Ce.create(e, "==" /* EQUAL */ , {
            doubleValue: NaN
        });

      case "IS_NULL":
        var n = ce(t.unaryFilter.field);
        return Ce.create(n, "==" /* EQUAL */ , {
            nullValue: "NULL_VALUE"
        });

      case "OPERATOR_UNSPECIFIED":
      default:
        return p();
    }
}

function le(t) {
    var e = [];
    return t.fields.forEach((function(t) {
        return e.push(t.N());
    })), {
        fieldPaths: e
    };
}

function pe(t) {
    // Resource names have at least 4 components (project ID, database ID)
    return t.length >= 4 && "projects" === t.get(0) && "databases" === t.get(2);
}

/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** Transforms a value into a server-generated timestamp. */ var de = /** @class */ function() {
    function t() {}
    return t.prototype.je = function(t, e) {
        return function(t, e) {
            var n = {
                fields: {
                    __type__: {
                        stringValue: "server_timestamp"
                    },
                    __local_write_time__: {
                        timestampValue: {
                            seconds: t.seconds,
                            nanos: t.nanoseconds
                        }
                    }
                }
            };
            return e && (n.fields.__previous_value__ = e), {
                mapValue: n
            };
        }(e, t);
    }, t.prototype.Ke = function(t, e) {
        return e;
    }, t.prototype.Ge = function(t) {
        return null;
        // Server timestamps are idempotent and don't require a base value.
        }, t.prototype.isEqual = function(e) {
        return e instanceof t;
    }, t;
}();

de.instance = new de;

/** Transforms an array value via a union operation. */
var ye = /** @class */ function() {
    function t(t) {
        this.elements = t;
    }
    return t.prototype.je = function(t, e) {
        return this.apply(t);
    }, t.prototype.Ke = function(t, e) {
        // The server just sends null as the transform result for array operations,
        // so we have to calculate a result the same as we do for local
        // applications.
        return this.apply(t);
    }, t.prototype.apply = function(t) {
        for (var e = me(t), n = function(t) {
            e.some((function(e) {
                return Et(e, t);
            })) || e.push(t);
        }, r = 0, i = this.elements; r < i.length; r++) {
            n(i[r]);
        }
        return {
            arrayValue: {
                values: e
            }
        };
    }, t.prototype.Ge = function(t) {
        return null;
        // Array transforms are idempotent and don't require a base value.
        }, t.prototype.isEqual = function(e) {
        return e instanceof t && w(this.elements, e.elements, Et);
    }, t;
}(), ve = /** @class */ function() {
    function t(t) {
        this.elements = t;
    }
    return t.prototype.je = function(t, e) {
        return this.apply(t);
    }, t.prototype.Ke = function(t, e) {
        // The server just sends null as the transform result for array operations,
        // so we have to calculate a result the same as we do for local
        // applications.
        return this.apply(t);
    }, t.prototype.apply = function(t) {
        for (var e = me(t), n = function(t) {
            e = e.filter((function(e) {
                return !Et(e, t);
            }));
        }, r = 0, i = this.elements; r < i.length; r++) {
            n(i[r]);
        }
        return {
            arrayValue: {
                values: e
            }
        };
    }, t.prototype.Ge = function(t) {
        return null;
        // Array transforms are idempotent and don't require a base value.
        }, t.prototype.isEqual = function(e) {
        return e instanceof t && w(this.elements, e.elements, Et);
    }, t;
}(), ge = /** @class */ function() {
    function t(t, e) {
        this.serializer = t, this.Be = e;
    }
    return t.prototype.je = function(t, e) {
        // PORTING NOTE: Since JavaScript's integer arithmetic is limited to 53 bit
        // precision and resolves overflows by reducing precision, we do not
        // manually cap overflows at 2^63.
        var n = this.Ge(t), r = this.asNumber(n) + this.asNumber(this.Be);
        return Rt(n) && Rt(this.Be) ? Mt(r) : jt(this.serializer, r);
    }, t.prototype.Ke = function(t, e) {
        return e;
    }, 
    /**
     * Inspects the provided value, returning the provided value if it is already
     * a NumberValue, otherwise returning a coerced value of 0.
     */
    t.prototype.Ge = function(t) {
        return Rt(e = t) || function(t) {
            return !!t && "doubleValue" in t;
        }(e) ? t : {
            integerValue: 0
        };
        var e;
    }, t.prototype.isEqual = function(e) {
        return e instanceof t && Et(this.Be, e.Be);
    }, t.prototype.asNumber = function(t) {
        return Dt(t.integerValue || t.doubleValue);
    }, t;
}();

/** Transforms an array value via a remove operation. */ function me(t) {
    return Ot(t) && t.arrayValue.values ? t.arrayValue.values.slice() : [];
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Provides a set of fields that can be used to partially patch a document.
 * FieldMask is used in conjunction with ObjectValue.
 * Examples:
 *   foo - Overwrites foo entirely with the provided value. If foo is not
 *         present in the companion ObjectValue, the field is deleted.
 *   foo.bar - Overwrites only the field bar of the object foo.
 *             If foo is not an object, foo is replaced with an object
 *             containing foo
 */ var we = /** @class */ function() {
    function t(t) {
        this.fields = t, 
        // TODO(dimond): validation of FieldMask
        // Sort the field mask to support `FieldMask.isEqual()` and assert below.
        t.sort(U.P)
        /**
     * Verifies that `fieldPath` is included by at least one field in this field
     * mask.
     *
     * This is an O(n) operation, where `n` is the size of the field mask.
     */;
    }
    return t.prototype.ze = function(t) {
        for (var e = 0, n = this.fields; e < n.length; e++) {
            if (n[e].D(t)) return !0;
        }
        return !1;
    }, t.prototype.isEqual = function(t) {
        return w(this.fields, t.fields, (function(t, e) {
            return t.isEqual(e);
        }));
    }, t;
}(), _e = /** @class */ function() {
    function t(t, e) {
        this.field = t, this.transform = e;
    }
    return t.prototype.isEqual = function(t) {
        return this.field.isEqual(t.field) && this.transform.isEqual(t.transform);
    }, t;
}(), be = function(
/**
     * The version at which the mutation was committed:
     *
     * - For most operations, this is the updateTime in the WriteResult.
     * - For deletes, the commitTime of the WriteResponse (because deletes are
     *   not stored and have no updateTime).
     *
     * Note that these versions can be different: No-op writes will not change
     * the updateTime even though the commitTime advances.
     */
t, 
/**
     * The resulting fields returned from the backend after a
     * TransformMutation has been committed. Contains one FieldValue for each
     * FieldTransform that was in the mutation.
     *
     * Will be null if the mutation was not a TransformMutation.
     */
e) {
    this.version = t, this.transformResults = e;
}, Ie = /** @class */ function() {
    function t(t, e) {
        this.updateTime = t, this.exists = e
        /** Creates a new empty Precondition. */;
    }
    return t.Qe = function() {
        return new t;
    }, 
    /** Creates a new Precondition with an exists flag. */ t.exists = function(e) {
        return new t(void 0, e);
    }, 
    /** Creates a new Precondition based on a version a document exists at. */ t.updateTime = function(e) {
        return new t(e);
    }, Object.defineProperty(t.prototype, "qe", {
        /** Returns whether this Precondition is empty. */ get: function() {
            return void 0 === this.updateTime && void 0 === this.exists;
        },
        enumerable: !0,
        configurable: !0
    }), 
    /**
     * Returns true if the preconditions is valid for the given document
     * (or null if no document is available).
     */
    t.prototype.He = function(t) {
        return void 0 !== this.updateTime ? t instanceof Oe && t.version.isEqual(this.updateTime) : void 0 === this.exists || this.exists === t instanceof Oe;
    }, t.prototype.isEqual = function(t) {
        return this.exists === t.exists && (this.updateTime ? !!t.updateTime && this.updateTime.isEqual(t.updateTime) : !t.updateTime);
    }, t;
}(), Ee = /** @class */ function() {
    function t() {}
    return t.prototype.Ye = function(t) {}, 
    /**
     * Returns the version from the given document for use as the result of a
     * mutation. Mutations are defined to return the version of the base document
     * only if it is an existing document. Deleted and unknown documents have a
     * post-mutation version of SnapshotVersion.min().
     */
    t.Je = function(t) {
        return t instanceof Oe ? t.version : k.min();
    }, t;
}(), Te = /** @class */ function(t) {
    function n(e, n, r) {
        var i = this;
        return (i = t.call(this) || this).key = e, i.value = n, i.Ue = r, i.type = 0 /* Set */ , 
        i;
    }
    return e.__extends(n, t), n.prototype.Ke = function(t, e) {
        this.Ye(t);
        // Unlike applyToLocalView, if we're applying a mutation to a remote
        // document the server has accepted the mutation so the precondition must
        // have held.
        var n = e.version;
        return new Oe(this.key, n, this.value, {
            hasCommittedMutations: !0
        });
    }, n.prototype.je = function(t, e, n) {
        if (this.Ye(t), !this.Ue.He(t)) return t;
        var r = Ee.Je(t);
        return new Oe(this.key, r, this.value, {
            Xe: !0
        });
    }, n.prototype.Ze = function(t) {
        return null;
    }, n.prototype.isEqual = function(t) {
        return t instanceof n && this.key.isEqual(t.key) && this.value.isEqual(t.value) && this.Ue.isEqual(t.Ue);
    }, n;
}(Ee), Ne = /** @class */ function(t) {
    function n(e, n, r, i) {
        var o = this;
        return (o = t.call(this) || this).key = e, o.data = n, o.Oe = r, o.Ue = i, o.type = 1 /* Patch */ , 
        o;
    }
    return e.__extends(n, t), n.prototype.Ke = function(t, e) {
        if (this.Ye(t), !this.Ue.He(t)) 
        // Since the mutation was not rejected, we know that the  precondition
        // matched on the backend. We therefore must not have the expected version
        // of the document in our cache and return an UnknownDocument with the
        // known updateTime.
        return new Le(this.key, e.version);
        var n = this.ts(t);
        return new Oe(this.key, e.version, n, {
            hasCommittedMutations: !0
        });
    }, n.prototype.je = function(t, e, n) {
        if (this.Ye(t), !this.Ue.He(t)) return t;
        var r = Ee.Je(t), i = this.ts(t);
        return new Oe(this.key, r, i, {
            Xe: !0
        });
    }, n.prototype.Ze = function(t) {
        return null;
    }, n.prototype.isEqual = function(t) {
        return t instanceof n && this.key.isEqual(t.key) && this.Oe.isEqual(t.Oe) && this.Ue.isEqual(t.Ue);
    }, 
    /**
     * Patches the data of document if available or creates a new document. Note
     * that this does not check whether or not the precondition of this patch
     * holds.
     */
    n.prototype.ts = function(t) {
        var e;
        return e = t instanceof Oe ? t.data() : De.empty(), this.es(e);
    }, n.prototype.es = function(t) {
        var e = this, n = new ke(t);
        return this.Oe.fields.forEach((function(t) {
            if (!t._()) {
                var r = e.data.field(t);
                null !== r ? n.set(t, r) : n.delete(t);
            }
        })), n.ss();
    }, n;
}(Ee), Ae = /** @class */ function(t) {
    function n(e, n) {
        var r = this;
        return (r = t.call(this) || this).key = e, r.fieldTransforms = n, r.type = 2 /* Transform */ , 
        // NOTE: We set a precondition of exists: true as a safety-check, since we
        // always combine TransformMutations with a SetMutation or PatchMutation which
        // (if successful) should end up with an existing document.
        r.Ue = Ie.exists(!0), r;
    }
    return e.__extends(n, t), n.prototype.Ke = function(t, e) {
        if (this.Ye(t), d(null != e.transformResults), !this.Ue.He(t)) 
        // Since the mutation was not rejected, we know that the  precondition
        // matched on the backend. We therefore must not have the expected version
        // of the document in our cache and return an UnknownDocument with the
        // known updateTime.
        return new Le(this.key, e.version);
        var n = this.ns(t), r = this.rs(t, e.transformResults), i = e.version, o = this.os(n.data(), r);
        return new Oe(this.key, i, o, {
            hasCommittedMutations: !0
        });
    }, n.prototype.je = function(t, e, n) {
        if (this.Ye(t), !this.Ue.He(t)) return t;
        var r = this.ns(t), i = this.hs(n, t, e), o = this.os(r.data(), i);
        return new Oe(this.key, r.version, o, {
            Xe: !0
        });
    }, n.prototype.Ze = function(t) {
        for (var e = null, n = 0, r = this.fieldTransforms; n < r.length; n++) {
            var i = r[n], o = t instanceof Oe ? t.field(i.field) : void 0, s = i.transform.Ge(o || null);
            null != s && (e = null == e ? (new ke).set(i.field, s) : e.set(i.field, s));
        }
        return e ? e.ss() : null;
    }, n.prototype.isEqual = function(t) {
        return t instanceof n && this.key.isEqual(t.key) && w(this.fieldTransforms, t.fieldTransforms, (function(t, e) {
            return t.isEqual(e);
        })) && this.Ue.isEqual(t.Ue);
    }, 
    /**
     * Asserts that the given MaybeDocument is actually a Document and verifies
     * that it matches the key for this mutation. Since we only support
     * transformations with precondition exists this method is guaranteed to be
     * safe.
     */
    n.prototype.ns = function(t) {
        return t;
    }, 
    /**
     * Creates a list of "transform results" (a transform result is a field value
     * representing the result of applying a transform) for use after a
     * TransformMutation has been acknowledged by the server.
     *
     * @param baseDoc The document prior to applying this mutation batch.
     * @param serverTransformResults The transform results received by the server.
     * @return The transform results list.
     */
    n.prototype.rs = function(t, e) {
        var n = [];
        d(this.fieldTransforms.length === e.length);
        for (var r = 0; r < e.length; r++) {
            var i = this.fieldTransforms[r], o = i.transform, s = null;
            t instanceof Oe && (s = t.field(i.field)), n.push(o.Ke(s, e[r]));
        }
        return n;
    }, 
    /**
     * Creates a list of "transform results" (a transform result is a field value
     * representing the result of applying a transform) for use when applying a
     * TransformMutation locally.
     *
     * @param localWriteTime The local time of the transform mutation (used to
     *     generate ServerTimestampValues).
     * @param maybeDoc The current state of the document after applying all
     *     previous mutations.
     * @param baseDoc The document prior to applying this mutation batch.
     * @return The transform results list.
     */
    n.prototype.hs = function(t, e, n) {
        for (var r = [], i = 0, o = this.fieldTransforms; i < o.length; i++) {
            var s = o[i], u = s.transform, a = null;
            e instanceof Oe && (a = e.field(s.field)), null === a && n instanceof Oe && (
            // If the current document does not contain a value for the mutated
            // field, use the value that existed before applying this mutation
            // batch. This solves an edge case where a PatchMutation clears the
            // values in a nested map before the TransformMutation is applied.
            a = n.field(s.field)), r.push(u.je(a, t));
        }
        return r;
    }, n.prototype.os = function(t, e) {
        for (var n = new ke(t), r = 0; r < this.fieldTransforms.length; r++) {
            var i = this.fieldTransforms[r].field;
            n.set(i, e[r]);
        }
        return n.ss();
    }, n;
}(Ee), xe = /** @class */ function(t) {
    function n(e, n) {
        var r = this;
        return (r = t.call(this) || this).key = e, r.Ue = n, r.type = 3 /* Delete */ , r;
    }
    return e.__extends(n, t), n.prototype.Ke = function(t, e) {
        // Unlike applyToLocalView, if we're applying a mutation to a remote
        // document the server has accepted the mutation so the precondition must
        // have held.
        return this.Ye(t), new Ue(this.key, e.version, {
            hasCommittedMutations: !0
        });
    }, n.prototype.je = function(t, e, n) {
        return this.Ye(t), this.Ue.He(t) ? new Ue(this.key, k.min()) : t;
    }, n.prototype.Ze = function(t) {
        return null;
    }, n.prototype.isEqual = function(t) {
        return t instanceof n && this.key.isEqual(t.key) && this.Ue.isEqual(t.Ue);
    }, n;
}(Ee), Se = /** @class */ function(t) {
    function n(e, n) {
        var r = this;
        return (r = t.call(this) || this).key = e, r.Ue = n, r.type = 4 /* Verify */ , r;
    }
    return e.__extends(n, t), n.prototype.Ke = function(t, e) {
        p();
    }, n.prototype.je = function(t, e, n) {
        p();
    }, n.prototype.Ze = function(t) {
        p();
    }, n.prototype.isEqual = function(t) {
        return t instanceof n && this.key.isEqual(t.key) && this.Ue.isEqual(t.Ue);
    }, n;
}(Ee), De = /** @class */ function() {
    function t(t) {
        this.proto = t;
    }
    return t.empty = function() {
        return new t({
            mapValue: {}
        });
    }, 
    /**
     * Returns the value at the given path or null.
     *
     * @param path the path to search
     * @return The value at the path or if there it doesn't exist.
     */
    t.prototype.field = function(t) {
        if (t._()) return this.proto;
        for (var e = this.proto, n = 0; n < t.length - 1; ++n) {
            if (!e.mapValue.fields) return null;
            if (!Vt(e = e.mapValue.fields[t.get(n)])) return null;
        }
        return (e = (e.mapValue.fields || {})[t.S()]) || null;
    }, t.prototype.isEqual = function(t) {
        return Et(this.proto, t.proto);
    }, t;
}(), ke = /** @class */ function() {
    /**
     * @param baseObject The object to mutate.
     */
    function t(t) {
        void 0 === t && (t = De.empty()), this.as = t, 
        /** A map that contains the accumulated changes in this builder. */
        this.us = new Map;
    }
    /**
     * Sets the field to the provided value.
     *
     * @param path The field path to set.
     * @param value The value to set.
     * @return The current Builder instance.
     */    return t.prototype.set = function(t, e) {
        return this.cs(t, e), this;
    }, 
    /**
     * Removes the field at the specified path. If there is no field at the
     * specified path, nothing is changed.
     *
     * @param path The field path to remove.
     * @return The current Builder instance.
     */
    t.prototype.delete = function(t) {
        return this.cs(t, null), this;
    }, 
    /**
     * Adds `value` to the overlay map at `path`. Creates nested map entries if
     * needed.
     */
    t.prototype.cs = function(t, e) {
        for (var n = this.us, r = 0; r < t.length - 1; ++r) {
            var i = t.get(r), o = n.get(i);
            o instanceof Map ? 
            // Re-use a previously created map
            n = o : o && 10 /* ObjectValue */ === It(o) ? (
            // Convert the existing Protobuf MapValue into a map
            o = new Map(Object.entries(o.mapValue.fields || {})), n.set(i, o), n = o) : (
            // Create an empty map to represent the current nesting level
            o = new Map, n.set(i, o), n = o);
        }
        n.set(t.S(), e);
    }, 
    /** Returns an ObjectValue with all mutations applied. */ t.prototype.ss = function() {
        var t = this.ls(U.k, this.us);
        return null != t ? new De(t) : this.as;
    }, 
    /**
     * Applies any overlays from `currentOverlays` that exist at `currentPath`
     * and returns the merged data at `currentPath` (or null if there were no
     * changes).
     *
     * @param currentPath The path at the current nesting level. Can be set to
     * FieldValue.EMPTY_PATH to represent the root.
     * @param currentOverlays The overlays at the current nesting level in the
     * same format as `overlayMap`.
     * @return The merged data at `currentPath` or null if no modifications
     * were applied.
     */
    t.prototype.ls = function(t, e) {
        var n = this, r = !1, i = this.as.field(t), o = Vt(i) ? // If there is already data at the current path, base our
        Object.assign({}, i.mapValue.fields) : {};
        return e.forEach((function(e, i) {
            if (e instanceof Map) {
                var s = n.ls(t.child(i), e);
                null != s && (o[i] = s, r = !0);
            } else null !== e ? (o[i] = e, r = !0) : o.hasOwnProperty(i) && (delete o[i], r = !0);
        })), r ? {
            mapValue: {
                fields: o
            }
        } : null;
    }, t;
}();

/** A field path and the TransformOperation to perform upon it. */
/**
 * Returns a FieldMask built from all fields in a MapValue.
 */
function Pe(t) {
    var e = [];
    return T(t.fields || {}, (function(t, n) {
        var r = new U([ t ]);
        if (Vt(n)) {
            var i = Pe(n.mapValue).fields;
            if (0 === i.length) 
            // Preserve the empty map by adding it to the FieldMask.
            e.push(r); else 
            // For nested and non-empty ObjectValues, add the FieldPath of the
            // leaf nodes.
            for (var o = 0, s = i; o < s.length; o++) {
                var u = s[o];
                e.push(r.child(u));
            }
        } else 
        // For nested and non-empty ObjectValues, add the FieldPath of the leaf
        // nodes.
        e.push(r);
    })), new we(e)
    /**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
    /**
 * The result of a lookup for a given path may be an existing document or a
 * marker that this document does not exist at a given version.
 */;
}

var Re = function(t, e) {
    this.key = t, this.version = e;
}, Oe = /** @class */ function(t) {
    function n(e, n, r, i) {
        var o = this;
        return (o = t.call(this, e, n) || this)._s = r, o.Xe = !!i.Xe, o.hasCommittedMutations = !!i.hasCommittedMutations, 
        o;
    }
    return e.__extends(n, t), n.prototype.field = function(t) {
        return this._s.field(t);
    }, n.prototype.data = function() {
        return this._s;
    }, n.prototype.fs = function() {
        return this._s.proto;
    }, n.prototype.isEqual = function(t) {
        return t instanceof n && this.key.isEqual(t.key) && this.version.isEqual(t.version) && this.Xe === t.Xe && this.hasCommittedMutations === t.hasCommittedMutations && this._s.isEqual(t._s);
    }, n.prototype.toString = function() {
        return "Document(" + this.key + ", " + this.version + ", " + this._s.toString() + ", {hasLocalMutations: " + this.Xe + "}), {hasCommittedMutations: " + this.hasCommittedMutations + "})";
    }, Object.defineProperty(n.prototype, "hasPendingWrites", {
        get: function() {
            return this.Xe || this.hasCommittedMutations;
        },
        enumerable: !0,
        configurable: !0
    }), n;
}(Re), Ue = /** @class */ function(t) {
    function n(e, n, r) {
        var i = this;
        return (i = t.call(this, e, n) || this).hasCommittedMutations = !(!r || !r.hasCommittedMutations), 
        i;
    }
    return e.__extends(n, t), n.prototype.toString = function() {
        return "NoDocument(" + this.key + ", " + this.version + ")";
    }, Object.defineProperty(n.prototype, "hasPendingWrites", {
        get: function() {
            return this.hasCommittedMutations;
        },
        enumerable: !0,
        configurable: !0
    }), n.prototype.isEqual = function(t) {
        return t instanceof n && t.hasCommittedMutations === this.hasCommittedMutations && t.version.isEqual(this.version) && t.key.isEqual(this.key);
    }, n;
}(Re), Le = /** @class */ function(t) {
    function n() {
        return null !== t && t.apply(this, arguments) || this;
    }
    return e.__extends(n, t), n.prototype.toString = function() {
        return "UnknownDocument(" + this.key + ", " + this.version + ")";
    }, Object.defineProperty(n.prototype, "hasPendingWrites", {
        get: function() {
            return !0;
        },
        enumerable: !0,
        configurable: !0
    }), n.prototype.isEqual = function(t) {
        return t instanceof n && t.version.isEqual(this.version) && t.key.isEqual(this.key);
    }, n;
}(Re), Ve = /** @class */ function() {
    /**
     * Initializes a Query with a path and optional additional query constraints.
     * Path must currently be empty if this is a collection group query.
     */
    function t(t, e, n, r, i, o /* First */ , s, u) {
        void 0 === e && (e = null), void 0 === n && (n = []), void 0 === r && (r = []), 
        void 0 === i && (i = null), void 0 === o && (o = "F"), void 0 === s && (s = null), 
        void 0 === u && (u = null), this.path = t, this.collectionGroup = e, this.ds = n, 
        this.filters = r, this.limit = i, this.ws = o, this.startAt = s, this.endAt = u, 
        this.Ts = null, 
        // The corresponding `Target` of this `Query` instance.
        this.Es = null, this.startAt && this.Is(this.startAt), this.endAt && this.Is(this.endAt);
    }
    // TODO(firestorelite): Refactor this class so that methods that are not used
    // in the Lite client become tree-shakeable.
        return t.As = function(e) {
        return new t(e);
    }, Object.defineProperty(t.prototype, "orderBy", {
        get: function() {
            if (null === this.Ts) {
                this.Ts = [];
                var t = this.Rs(), e = this.ms();
                if (null !== t && null === e) 
                // In order to implicitly add key ordering, we must also add the
                // inequality filter field for it to be a valid query.
                // Note that the default inequality field and key ordering is ascending.
                t.L() || this.Ts.push(new He(t)), this.Ts.push(new He(U.O(), "asc" /* ASCENDING */)); else {
                    for (var n = !1, r = 0, i = this.ds; r < i.length; r++) {
                        var o = i[r];
                        this.Ts.push(o), o.field.L() && (n = !0);
                    }
                    if (!n) {
                        // The order of the implicit key ordering always matches the last
                        // explicit order by
                        var s = this.ds.length > 0 ? this.ds[this.ds.length - 1].dir : "asc" /* ASCENDING */;
                        this.Ts.push(new He(U.O(), s));
                    }
                }
            }
            return this.Ts;
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.Ps = function(e) {
        var n = this.filters.concat([ e ]);
        return new t(this.path, this.collectionGroup, this.ds.slice(), n, this.limit, this.ws, this.startAt, this.endAt);
    }, t.prototype.Vs = function(e) {
        // TODO(dimond): validate that orderBy does not list the same key twice.
        var n = this.ds.concat([ e ]);
        return new t(this.path, this.collectionGroup, n, this.filters.slice(), this.limit, this.ws, this.startAt, this.endAt);
    }, t.prototype.gs = function(e) {
        return new t(this.path, this.collectionGroup, this.ds.slice(), this.filters.slice(), e, "F" /* First */ , this.startAt, this.endAt);
    }, t.prototype.ps = function(e) {
        return new t(this.path, this.collectionGroup, this.ds.slice(), this.filters.slice(), e, "L" /* Last */ , this.startAt, this.endAt);
    }, t.prototype.ys = function(e) {
        return new t(this.path, this.collectionGroup, this.ds.slice(), this.filters.slice(), this.limit, this.ws, e, this.endAt);
    }, t.prototype.bs = function(e) {
        return new t(this.path, this.collectionGroup, this.ds.slice(), this.filters.slice(), this.limit, this.ws, this.startAt, e);
    }, 
    /**
     * Helper to convert a collection group query into a collection query at a
     * specific path. This is used when executing collection group queries, since
     * we have to split the query into a set of collection queries at multiple
     * paths.
     */
    t.prototype.vs = function(e) {
        return new t(e, 
        /*collectionGroup=*/ null, this.ds.slice(), this.filters.slice(), this.limit, this.ws, this.startAt, this.endAt);
    }, 
    /**
     * Returns true if this query does not specify any query constraints that
     * could remove results.
     */
    t.prototype.Ss = function() {
        return 0 === this.filters.length && null === this.limit && null == this.startAt && null == this.endAt && (0 === this.ds.length || 1 === this.ds.length && this.ds[0].field.L());
    }, 
    // TODO(b/29183165): This is used to get a unique string from a query to, for
    // example, use as a dictionary key, but the implementation is subject to
    // collisions. Make it collision-free.
    t.prototype.canonicalId = function() {
        return Xe(this.We()) + "|lt:" + this.ws;
    }, t.prototype.toString = function() {
        return "Query(target=" + function(t) {
            var e = t.path.N();
            return null !== t.collectionGroup && (e += " collectionGroup=" + t.collectionGroup), 
            t.filters.length > 0 && (e += ", filters: [" + t.filters.join(", ") + "]"), V(t.limit) || (e += ", limit: " + t.limit), 
            t.orderBy.length > 0 && (e += ", orderBy: [" + t.orderBy.join(", ") + "]"), t.startAt && (e += ", startAt: " + Ge(t.startAt)), 
            t.endAt && (e += ", endAt: " + Ge(t.endAt)), "Target(" + e + ")";
        }(this.We()) + "; limitType=" + this.ws + ")";
    }, t.prototype.isEqual = function(t) {
        return $e(this.We(), t.We()) && this.ws === t.ws;
    }, t.prototype.Ds = function(t, e) {
        for (var n = !1, r = 0, i = this.orderBy; r < i.length; r++) {
            var o = i[r], s = o.compare(t, e);
            if (0 !== s) return s;
            n = n || o.field.L();
        }
        return 0;
    }, t.prototype.matches = function(t) {
        return this.Cs(t) && this.Fs(t) && this.Ns(t) && this.$s(t);
    }, t.prototype.ks = function() {
        return !V(this.limit) && "F" /* First */ === this.ws;
    }, t.prototype.xs = function() {
        return !V(this.limit) && "L" /* Last */ === this.ws;
    }, t.prototype.ms = function() {
        return this.ds.length > 0 ? this.ds[0].field : null;
    }, t.prototype.Rs = function() {
        for (var t = 0, e = this.filters; t < e.length; t++) {
            var n = e[t];
            if (n instanceof Ce && n.Ms()) return n.field;
        }
        return null;
    }, 
    // Checks if any of the provided Operators are included in the query and
    // returns the first one that is, or null if none are.
    t.prototype.Ls = function(t) {
        for (var e = 0, n = this.filters; e < n.length; e++) {
            var r = n[e];
            if (r instanceof Ce && t.indexOf(r.op) >= 0) return r.op;
        }
        return null;
    }, t.prototype.Os = function() {
        return Je(this.We());
    }, t.prototype.Bs = function() {
        return null !== this.collectionGroup;
    }, 
    /**
     * Converts this `Query` instance to it's corresponding `Target`
     * representation.
     */
    t.prototype.We = function() {
        if (!this.Es) if ("F" /* First */ === this.ws) this.Es = Ye(this.path, this.collectionGroup, this.orderBy, this.filters, this.limit, this.startAt, this.endAt); else {
            for (
            // Flip the orderBy directions since we want the last results
            var t = [], e = 0, n = this.orderBy; e < n.length; e++) {
                var r = n[e], i = "desc" /* DESCENDING */ === r.dir ? "asc" /* ASCENDING */ : "desc" /* DESCENDING */;
                t.push(new He(r.field, i));
            }
            // We need to swap the cursors to match the now-flipped query ordering.
                        var o = this.endAt ? new Qe(this.endAt.position, !this.endAt.before) : null, s = this.startAt ? new Qe(this.startAt.position, !this.startAt.before) : null;
            // Now return as a LimitType.First query.
                        this.Es = Ye(this.path, this.collectionGroup, t, this.filters, this.limit, o, s);
        }
        return this.Es;
    }, t.prototype.Cs = function(t) {
        var e = t.key.path;
        return null !== this.collectionGroup ? t.key.U(this.collectionGroup) && this.path.D(e) : L.W(this.path) ? this.path.isEqual(e) : this.path.C(e);
    }, 
    /**
     * A document must have a value for every ordering clause in order to show up
     * in the results.
     */
    t.prototype.Fs = function(t) {
        for (var e = 0, n = this.ds; e < n.length; e++) {
            var r = n[e];
            // order by key always matches
                        if (!r.field.L() && null === t.field(r.field)) return !1;
        }
        return !0;
    }, t.prototype.Ns = function(t) {
        for (var e = 0, n = this.filters; e < n.length; e++) {
            if (!n[e].matches(t)) return !1;
        }
        return !0;
    }, 
    /**
     * Makes sure a document is within the bounds, if provided.
     */
    t.prototype.$s = function(t) {
        return !(this.startAt && !ze(this.startAt, this.orderBy, t) || this.endAt && ze(this.endAt, this.orderBy, t));
    }, t.prototype.Is = function(t) {}, t;
}(), Ce = /** @class */ function(t) {
    function n(e, n, r) {
        var i = this;
        return (i = t.call(this) || this).field = e, i.op = n, i.value = r, i;
    }
    /**
     * Creates a filter based on the provided arguments.
     */    return e.__extends(n, t), n.create = function(t, e, r) {
        if (t.L()) return "in" /* IN */ === e ? new Fe(t, r) : new qe(t, e, r);
        if (Ut(r)) {
            if ("==" /* EQUAL */ !== e) throw new S(x.INVALID_ARGUMENT, "Invalid query. Null supports only equality comparisons.");
            return new n(t, e, r);
        }
        if (Lt(r)) {
            if ("==" /* EQUAL */ !== e) throw new S(x.INVALID_ARGUMENT, "Invalid query. NaN supports only equality comparisons.");
            return new n(t, e, r);
        }
        return "array-contains" /* ARRAY_CONTAINS */ === e ? new Me(t, r) : "in" /* IN */ === e ? new je(t, r) : "array-contains-any" /* ARRAY_CONTAINS_ANY */ === e ? new Be(t, r) : new n(t, e, r);
    }, n.prototype.matches = function(t) {
        var e = t.field(this.field);
        // Only compare types with matching backend order (such as double and int).
                return null !== e && It(this.value) === It(e) && this.qs(Nt(e, this.value));
    }, n.prototype.qs = function(t) {
        switch (this.op) {
          case "<" /* LESS_THAN */ :
            return t < 0;

          case "<=" /* LESS_THAN_OR_EQUAL */ :
            return t <= 0;

          case "==" /* EQUAL */ :
            return 0 === t;

          case ">" /* GREATER_THAN */ :
            return t > 0;

          case ">=" /* GREATER_THAN_OR_EQUAL */ :
            return t >= 0;

          default:
            return p();
        }
    }, n.prototype.Ms = function() {
        return [ "<" /* LESS_THAN */ , "<=" /* LESS_THAN_OR_EQUAL */ , ">" /* GREATER_THAN */ , ">=" /* GREATER_THAN_OR_EQUAL */ ].indexOf(this.op) >= 0;
    }, n.prototype.canonicalId = function() {
        // TODO(b/29183165): Technically, this won't be unique if two values have
        // the same description, such as the int 3 and the string "3". So we should
        // add the types in here somehow, too.
        return this.field.N() + this.op.toString() + xt(this.value);
    }, n.prototype.isEqual = function(t) {
        return t instanceof n && this.op === t.op && this.field.isEqual(t.field) && Et(this.value, t.value);
    }, n.prototype.toString = function() {
        return this.field.N() + " " + this.op + " " + xt(this.value);
    }, n;
}((function() {})), qe = /** @class */ function(t) {
    function n(e, n, r) {
        var i = this;
        return (i = t.call(this, e, n, r) || this).key = L.q(r.referenceValue), i;
    }
    return e.__extends(n, t), n.prototype.matches = function(t) {
        var e = L.P(t.key, this.key);
        return this.qs(e);
    }, n;
}(Ce), Fe = /** @class */ function(t) {
    function n(e, n) {
        var r = this;
        return (r = t.call(this, e, "in" /* IN */ , n) || this).keys = (n.arrayValue.values || []).map((function(t) {
            return L.q(t.referenceValue);
        })), r;
    }
    return e.__extends(n, t), n.prototype.matches = function(t) {
        return this.keys.some((function(e) {
            return e.isEqual(t.key);
        }));
    }, n;
}(Ce), Me = /** @class */ function(t) {
    function n(e, n) {
        return t.call(this, e, "array-contains" /* ARRAY_CONTAINS */ , n) || this;
    }
    return e.__extends(n, t), n.prototype.matches = function(t) {
        var e = t.field(this.field);
        return Ot(e) && Tt(e.arrayValue, this.value);
    }, n;
}(Ce), je = /** @class */ function(t) {
    function n(e, n) {
        return t.call(this, e, "in" /* IN */ , n) || this;
    }
    return e.__extends(n, t), n.prototype.matches = function(t) {
        var e = t.field(this.field);
        return null !== e && Tt(this.value.arrayValue, e);
    }, n;
}(Ce), Be = /** @class */ function(t) {
    function n(e, n) {
        return t.call(this, e, "array-contains-any" /* ARRAY_CONTAINS_ANY */ , n) || this;
    }
    return e.__extends(n, t), n.prototype.matches = function(t) {
        var e = this, n = t.field(this.field);
        return !(!Ot(n) || !n.arrayValue.values) && n.arrayValue.values.some((function(t) {
            return Tt(e.value.arrayValue, t);
        }));
    }, n;
}(Ce), Qe = function(t, e) {
    this.position = t, this.before = e;
};

/**
 * Represents a document in Firestore with a key, version, data and whether the
 * data has local mutations applied to it.
 */ function Ge(t) {
    // TODO(b/29183165): Make this collision robust.
    return (t.before ? "b" : "a") + ":" + t.position.map((function(t) {
        return xt(t);
    })).join(",");
}

/**
 * Returns true if a document sorts before a bound using the provided sort
 * order.
 */ function ze(t, e, n) {
    for (var r = 0, i = 0; i < t.position.length; i++) {
        var o = e[i], s = t.position[i];
        if (r = o.field.L() ? L.P(L.q(s.referenceValue), n.key) : Nt(s, n.field(o.field)), 
        "desc" /* DESCENDING */ === o.dir && (r *= -1), 0 !== r) break;
    }
    return t.before ? r <= 0 : r < 0;
}

function We(t, e) {
    if (null === t) return null === e;
    if (null === e) return !1;
    if (t.before !== e.before || t.position.length !== e.position.length) return !1;
    for (var n = 0; n < t.position.length; n++) if (!Et(t.position[n], e.position[n])) return !1;
    return !0;
}

/**
 * An ordering on a field, in some Direction. Direction defaults to ASCENDING.
 */ var He = /** @class */ function() {
    function t(t, e) {
        this.field = t, void 0 === e && (e = "asc" /* ASCENDING */), this.dir = e, this.Us = t.L();
    }
    return t.prototype.compare = function(t, e) {
        var n = this.Us ? L.P(t.key, e.key) : function(t, e, n) {
            var r = e.field(t), i = n.field(t);
            return null !== r && null !== i ? Nt(r, i) : p();
        }(this.field, t, e);
        switch (this.dir) {
          case "asc" /* ASCENDING */ :
            return n;

          case "desc" /* DESCENDING */ :
            return -1 * n;

          default:
            return p();
        }
    }, t.prototype.canonicalId = function() {
        // TODO(b/29183165): Make this collision robust.
        return this.field.N() + this.dir.toString();
    }, t.prototype.toString = function() {
        return this.field.N() + " (" + this.dir + ")";
    }, t.prototype.isEqual = function(t) {
        return this.dir === t.dir && this.field.isEqual(t.field);
    }, t;
}(), Ke = /** @class */ function(t) {
    function n(e, n, r, i, o, s, u) {
        void 0 === n && (n = null), void 0 === r && (r = []), void 0 === i && (i = []), 
        void 0 === o && (o = null), void 0 === s && (s = null), void 0 === u && (u = null);
        var a = this;
        return (a = t.call(this, e, n, r, i, o, s, u) || this).Qs = null, a;
    }
    return e.__extends(n, t), n;
}((function(t, e, n, r, i, o, s) {
    this.path = t, this.collectionGroup = e, this.orderBy = n, this.filters = r, this.limit = i, 
    this.startAt = o, this.endAt = s;
}));

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A Target represents the WatchTarget representation of a Query, which is used
 * by the LocalStore and the RemoteStore to keep track of and to execute
 * backend queries. While a Query can represent multiple Targets, each Targets
 * maps to a single WatchTarget in RemoteStore and a single TargetData entry
 * in persistence.
 */
/**
 * Initializes a Target with a path and optional additional query constraints.
 * Path must currently be empty if this is a collection group query.
 *
 * NOTE: you should always construct `Target` from `Query.toTarget` instead of
 * using this factory method, because `Query` provides an implicit `orderBy`
 * property.
 */
function Ye(t, e, n, r, i, o, s) {
    return void 0 === e && (e = null), void 0 === n && (n = []), void 0 === r && (r = []), 
    void 0 === i && (i = null), void 0 === o && (o = null), void 0 === s && (s = null), 
    new Ke(t, e, n, r, i, o, s);
}

function Xe(t) {
    var e = y(t);
    if (null === e.Qs) {
        var n = e.path.N();
        null !== e.collectionGroup && (n += "|cg:" + e.collectionGroup), n += "|f:", n += e.filters.map((function(t) {
            return t.canonicalId();
        })).join(","), n += "|ob:", n += e.orderBy.map((function(t) {
            return t.canonicalId();
        })).join(","), V(e.limit) || (n += "|l:", n += e.limit), e.startAt && (n += "|lb:", 
        n += Ge(e.startAt)), e.endAt && (n += "|ub:", n += Ge(e.endAt)), e.Qs = n;
    }
    return e.Qs;
}

function $e(t, e) {
    if (t.limit !== e.limit) return !1;
    if (t.orderBy.length !== e.orderBy.length) return !1;
    for (var n = 0; n < t.orderBy.length; n++) if (!t.orderBy[n].isEqual(e.orderBy[n])) return !1;
    if (t.filters.length !== e.filters.length) return !1;
    for (var r = 0; r < t.filters.length; r++) if (!t.filters[r].isEqual(e.filters[r])) return !1;
    return t.collectionGroup === e.collectionGroup && !!t.path.isEqual(e.path) && !!We(t.startAt, e.startAt) && We(t.endAt, e.endAt);
}

function Je(t) {
    return L.W(t.path) && null === t.collectionGroup && 0 === t.filters.length;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A batch of mutations that will be sent as one unit to the backend.
 */ var Ze = /** @class */ function() {
    /**
     * @param batchId The unique ID of this mutation batch.
     * @param localWriteTime The original write time of this mutation.
     * @param baseMutations Mutations that are used to populate the base
     * values when this mutation is applied locally. This can be used to locally
     * overwrite values that are persisted in the remote document cache. Base
     * mutations are never sent to the backend.
     * @param mutations The user-provided mutations in this mutation batch.
     * User-provided mutations are applied both locally and remotely on the
     * backend.
     */
    function t(t, e, n, r) {
        this.batchId = t, this.Ws = e, this.baseMutations = n, this.mutations = r
        /**
     * Applies all the mutations in this MutationBatch to the specified document
     * to create a new remote document
     *
     * @param docKey The key of the document to apply mutations to.
     * @param maybeDoc The document to apply mutations to.
     * @param batchResult The result of applying the MutationBatch to the
     * backend.
     */;
    }
    return t.prototype.Ke = function(t, e, n) {
        for (var r = n.js, i = 0; i < this.mutations.length; i++) {
            var o = this.mutations[i];
            if (o.key.isEqual(t)) {
                var s = r[i];
                e = o.Ke(e, s);
            }
        }
        return e;
    }, 
    /**
     * Computes the local view of a document given all the mutations in this
     * batch.
     *
     * @param docKey The key of the document to apply mutations to.
     * @param maybeDoc The document to apply mutations to.
     */
    t.prototype.je = function(t, e) {
        // First, apply the base state. This allows us to apply non-idempotent
        // transform against a consistent set of values.
        for (var n = 0, r = this.baseMutations; n < r.length; n++) {
            var i = r[n];
            i.key.isEqual(t) && (e = i.je(e, e, this.Ws));
        }
        // Second, apply all user-provided mutations.
        for (var o = e, s = 0, u = this.mutations; s < u.length; s++) {
            var a = u[s];
            a.key.isEqual(t) && (e = a.je(e, o, this.Ws));
        }
        return e;
    }, 
    /**
     * Computes the local view for all provided documents given the mutations in
     * this batch.
     */
    t.prototype.Ks = function(t) {
        var e = this, n = t;
        // TODO(mrschmidt): This implementation is O(n^2). If we apply the mutations
        // directly (as done in `applyToLocalView()`), we can reduce the complexity
        // to O(n).
                return this.mutations.forEach((function(r) {
            var i = e.je(r.key, t.get(r.key));
            i && (n = n.et(r.key, i));
        })), n;
    }, t.prototype.keys = function() {
        return this.mutations.reduce((function(t, e) {
            return t.add(e.key);
        }), it());
    }, t.prototype.isEqual = function(t) {
        return this.batchId === t.batchId && w(this.mutations, t.mutations, (function(t, e) {
            return t.isEqual(e);
        })) && w(this.baseMutations, t.baseMutations, (function(t, e) {
            return t.isEqual(e);
        }));
    }, t;
}(), tn = /** @class */ function() {
    function t(t, e, n, 
    /**
     * A pre-computed mapping from each mutated document to the resulting
     * version.
     */
    r) {
        this.batch = t, this.Gs = e, this.js = n, this.zs = r
        /**
     * Creates a new MutationBatchResult for the given batch and results. There
     * must be one result for each mutation in the batch. This static factory
     * caches a document=>version mapping (docVersions).
     */;
    }
    return t.from = function(e, n, r) {
        d(e.mutations.length === r.length);
        for (var i = nt, o = e.mutations, s = 0; s < o.length; s++) i = i.et(o[s].key, r[s].version);
        return new t(e, n, r, i);
    }, t;
}(), en = /** @class */ function() {
    function t(t) {
        var e = this;
        // NOTE: next/catchCallback will always point to our own wrapper functions,
        // not the user's raw next() or catch() callbacks.
                this.Hs = null, this.Ys = null, 
        // When the operation resolves, we'll set result or error and mark isDone.
        this.result = void 0, this.error = void 0, this.Js = !1, 
        // Set to true when .then() or .catch() are called and prevents additional
        // chaining.
        this.Xs = !1, t((function(t) {
            e.Js = !0, e.result = t, e.Hs && 
            // value should be defined unless T is Void, but we can't express
            // that in the type system.
            e.Hs(t);
        }), (function(t) {
            e.Js = !0, e.error = t, e.Ys && e.Ys(t);
        }));
    }
    return t.prototype.catch = function(t) {
        return this.next(void 0, t);
    }, t.prototype.next = function(e, n) {
        var r = this;
        return this.Xs && p(), this.Xs = !0, this.Js ? this.error ? this.Zs(n, this.error) : this.tn(e, this.result) : new t((function(t, i) {
            r.Hs = function(n) {
                r.tn(e, n).next(t, i);
            }, r.Ys = function(e) {
                r.Zs(n, e).next(t, i);
            };
        }));
    }, t.prototype.en = function() {
        var t = this;
        return new Promise((function(e, n) {
            t.next(e, n);
        }));
    }, t.prototype.sn = function(e) {
        try {
            var n = e();
            return n instanceof t ? n : t.resolve(n);
        } catch (e) {
            return t.reject(e);
        }
    }, t.prototype.tn = function(e, n) {
        return e ? this.sn((function() {
            return e(n);
        })) : t.resolve(n);
    }, t.prototype.Zs = function(e, n) {
        return e ? this.sn((function() {
            return e(n);
        })) : t.reject(n);
    }, t.resolve = function(e) {
        return new t((function(t, n) {
            t(e);
        }));
    }, t.reject = function(e) {
        return new t((function(t, n) {
            n(e);
        }));
    }, t.nn = function(
    // Accept all Promise types in waitFor().
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    e) {
        return new t((function(t, n) {
            var r = 0, i = 0, o = !1;
            e.forEach((function(e) {
                ++r, e.next((function() {
                    ++i, o && i === r && t();
                }), (function(t) {
                    return n(t);
                }));
            })), o = !0, i === r && t();
        }));
    }, 
    /**
     * Given an array of predicate functions that asynchronously evaluate to a
     * boolean, implements a short-circuiting `or` between the results. Predicates
     * will be evaluated until one of them returns `true`, then stop. The final
     * result will be whether any of them returned `true`.
     */
    t.rn = function(e) {
        for (var n = t.resolve(!1), r = function(e) {
            n = n.next((function(n) {
                return n ? t.resolve(n) : e();
            }));
        }, i = 0, o = e; i < o.length; i++) {
            r(o[i]);
        }
        return n;
    }, t.forEach = function(t, e) {
        var n = this, r = [];
        return t.forEach((function(t, i) {
            r.push(e.call(n, t, i));
        })), this.nn(r);
    }, t;
}(), nn = /** @class */ function() {
    function t() {
        // A mapping of document key to the new cache entry that should be written (or null if any
        // existing cache entry should be removed).
        this.on = new A((function(t) {
            return t.toString();
        }), (function(t, e) {
            return t.isEqual(e);
        })), this.hn = !1;
    }
    return Object.defineProperty(t.prototype, "readTime", {
        get: function() {
            return this.an;
        },
        set: function(t) {
            this.an = t;
        },
        enumerable: !0,
        configurable: !0
    }), 
    /**
     * Buffers a `RemoteDocumentCache.addEntry()` call.
     *
     * You can only modify documents that have already been retrieved via
     * `getEntry()/getEntries()` (enforced via IndexedDbs `apply()`).
     */
    t.prototype.un = function(t, e) {
        this.cn(), this.readTime = e, this.on.set(t.key, t);
    }, 
    /**
     * Buffers a `RemoteDocumentCache.removeEntry()` call.
     *
     * You can only remove documents that have already been retrieved via
     * `getEntry()/getEntries()` (enforced via IndexedDbs `apply()`).
     */
    t.prototype.ln = function(t, e) {
        this.cn(), e && (this.readTime = e), this.on.set(t, null);
    }, 
    /**
     * Looks up an entry in the cache. The buffered changes will first be checked,
     * and if no buffered change applies, this will forward to
     * `RemoteDocumentCache.getEntry()`.
     *
     * @param transaction The transaction in which to perform any persistence
     *     operations.
     * @param documentKey The key of the entry to look up.
     * @return The cached Document or NoDocument entry, or null if we have nothing
     * cached.
     */
    t.prototype._n = function(t, e) {
        this.cn();
        var n = this.on.get(e);
        return void 0 !== n ? en.resolve(n) : this.fn(t, e);
    }, 
    /**
     * Looks up several entries in the cache, forwarding to
     * `RemoteDocumentCache.getEntry()`.
     *
     * @param transaction The transaction in which to perform any persistence
     *     operations.
     * @param documentKeys The keys of the entries to look up.
     * @return A map of cached `Document`s or `NoDocument`s, indexed by key. If an
     *     entry cannot be found, the corresponding key will be mapped to a null
     *     value.
     */
    t.prototype.getEntries = function(t, e) {
        return this.dn(t, e);
    }, 
    /**
     * Applies buffered changes to the underlying RemoteDocumentCache, using
     * the provided transaction.
     */
    t.prototype.apply = function(t) {
        return this.cn(), this.hn = !0, this.wn(t);
    }, 
    /** Helper to assert this.changes is not null  */ t.prototype.cn = function() {}, 
    t;
}(), rn = "The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.", on = /** @class */ function() {
    function t() {
        this.Tn = [];
    }
    return t.prototype.En = function(t) {
        this.Tn.push(t);
    }, t.prototype.In = function() {
        this.Tn.forEach((function(t) {
            return t();
        }));
    }, t;
}(), sn = /** @class */ function() {
    function t(t, e, n) {
        this.An = t, this.Rn = e, this.mn = n
        /**
     * Get the local view of the document identified by `key`.
     *
     * @return Local view of the document or null if we don't have any cached
     * state for it.
     */;
    }
    return t.prototype.Pn = function(t, e) {
        var n = this;
        return this.Rn.Vn(t, e).next((function(r) {
            return n.gn(t, e, r);
        }));
    }, 
    /** Internal version of `getDocument` that allows reusing batches. */ t.prototype.gn = function(t, e, n) {
        return this.An._n(t, e).next((function(t) {
            for (var r = 0, i = n; r < i.length; r++) {
                t = i[r].je(e, t);
            }
            return t;
        }));
    }, 
    // Returns the view of the given `docs` as they would appear after applying
    // all mutations in the given `batches`.
    t.prototype.pn = function(t, e, n) {
        var r = Z();
        return e.forEach((function(t, e) {
            for (var i = 0, o = n; i < o.length; i++) {
                e = o[i].je(t, e);
            }
            r = r.et(t, e);
        })), r;
    }, 
    /**
     * Gets the local view of the documents identified by `keys`.
     *
     * If we don't have cached state for a document in `keys`, a NoDocument will
     * be stored for that key in the resulting set.
     */
    t.prototype.yn = function(t, e) {
        var n = this;
        return this.An.getEntries(t, e).next((function(e) {
            return n.bn(t, e);
        }));
    }, 
    /**
     * Similar to `getDocuments`, but creates the local view from the given
     * `baseDocs` without retrieving documents from the local store.
     */
    t.prototype.bn = function(t, e) {
        var n = this;
        return this.Rn.vn(t, e).next((function(r) {
            var i = n.pn(t, e, r), o = J();
            return i.forEach((function(t, e) {
                // TODO(http://b/32275378): Don't conflate missing / deleted.
                e || (e = new Ue(t, k.min())), o = o.et(t, e);
            })), o;
        }));
    }, 
    /**
     * Performs a query against the local view of all documents.
     *
     * @param transaction The persistence transaction.
     * @param query The query to match documents against.
     * @param sinceReadTime If not set to SnapshotVersion.min(), return only
     *     documents that have been read since this snapshot version (exclusive).
     */
    t.prototype.Sn = function(t, e, n) {
        return e.Os() ? this.Dn(t, e.path) : e.Bs() ? this.Cn(t, e, n) : this.Fn(t, e, n);
    }, t.prototype.Dn = function(t, e) {
        // Just do a simple document lookup.
        return this.Pn(t, new L(e)).next((function(t) {
            var e = et();
            return t instanceof Oe && (e = e.et(t.key, t)), e;
        }));
    }, t.prototype.Cn = function(t, e, n) {
        var r = this, i = e.collectionGroup, o = et();
        return this.mn.Nn(t, i).next((function(s) {
            return en.forEach(s, (function(s) {
                var u = e.vs(s.child(i));
                return r.Fn(t, u, n).next((function(t) {
                    t.forEach((function(t, e) {
                        o = o.et(t, e);
                    }));
                }));
            })).next((function() {
                return o;
            }));
        }));
    }, t.prototype.Fn = function(t, e, n) {
        var r, i, o = this;
        // Query the remote documents and overlay mutations.
                return this.An.Sn(t, e, n).next((function(n) {
            return r = n, o.Rn.$n(t, e);
        })).next((function(e) {
            return i = e, o.kn(t, i, r).next((function(t) {
                r = t;
                for (var e = 0, n = i; e < n.length; e++) for (var o = n[e], s = 0, u = o.mutations; s < u.length; s++) {
                    var a = u[s], c = a.key, h = r.get(c), f = a.je(h, h, o.Ws);
                    r = f instanceof Oe ? r.et(c, f) : r.remove(c);
                }
            }));
        })).next((function() {
            // Finally, filter out any documents that don't actually match
            // the query.
            return r.forEach((function(t, n) {
                e.matches(n) || (r = r.remove(t));
            })), r;
        }));
    }, t.prototype.kn = function(t, e, n) {
        for (var r = it(), i = 0, o = e; i < o.length; i++) for (var s = 0, u = o[i].mutations; s < u.length; s++) {
            var a = u[s];
            a instanceof Ne && null === n.get(a.key) && (r = r.add(a.key));
        }
        var c = n;
        return this.An.getEntries(t, r).next((function(t) {
            return t.forEach((function(t, e) {
                null !== e && e instanceof Oe && (c = c.et(t, e));
            })), c;
        }));
    }, t;
}(), un = /** @class */ function() {
    function t(t, e, n, r) {
        this.targetId = t, this.fromCache = e, this.xn = n, this.Mn = r;
    }
    return t.Ln = function(e, n) {
        for (var r = it(), i = it(), o = 0, s = n.docChanges; o < s.length; o++) {
            var u = s[o];
            switch (u.type) {
              case 0 /* Added */ :
                r = r.add(u.doc.key);
                break;

              case 1 /* Removed */ :
                i = i.add(u.doc.key);
                // do nothing
                        }
        }
        return new t(e, n.fromCache, r, i);
    }, t;
}(), an = /** @class */ function() {
    function t(t, e) {
        var n = this;
        this.previousValue = t, e && (e.On = function(t) {
            return n.Bn(t);
        }, this.qn = function(t) {
            return e.Un(t);
        });
    }
    return t.prototype.Bn = function(t) {
        return this.previousValue = Math.max(t, this.previousValue), this.previousValue;
    }, t.prototype.next = function() {
        var t = ++this.previousValue;
        return this.qn && this.qn(t), t;
    }, t;
}();

/** The result of applying a mutation batch to the backend. */ an.Qn = -1;

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var cn = function() {
    var t = this;
    this.promise = new Promise((function(e, n) {
        t.resolve = e, t.reject = n;
    }));
}, hn = /** @class */ function() {
    function t(
    /**
     * The AsyncQueue to run backoff operations on.
     */
    t, 
    /**
     * The ID to use when scheduling backoff operations on the AsyncQueue.
     */
    e, 
    /**
     * The initial delay (used as the base delay on the first retry attempt).
     * Note that jitter will still be applied, so the actual delay could be as
     * little as 0.5*initialDelayMs.
     */
    n
    /**
     * The multiplier to use to determine the extended base delay after each
     * attempt.
     */ , r
    /**
     * The maximum base delay after which no further backoff is performed.
     * Note that jitter will still be applied, so the actual delay could be as
     * much as 1.5*maxDelayMs.
     */ , i) {
        void 0 === n && (n = 1e3), void 0 === r && (r = 1.5), void 0 === i && (i = 6e4), 
        this.Wn = t, this.jn = e, this.Kn = n, this.Gn = r, this.zn = i, this.Hn = 0, this.Yn = null, 
        /** The last backoff attempt, as epoch milliseconds. */
        this.Jn = Date.now(), this.reset();
    }
    /**
     * Resets the backoff delay.
     *
     * The very next backoffAndWait() will have no delay. If it is called again
     * (i.e. due to an error), initialDelayMs (plus jitter) will be used, and
     * subsequent ones will increase according to the backoffFactor.
     */    return t.prototype.reset = function() {
        this.Hn = 0;
    }, 
    /**
     * Resets the backoff delay to the maximum delay (e.g. for use after a
     * RESOURCE_EXHAUSTED error).
     */
    t.prototype.Xn = function() {
        this.Hn = this.zn;
    }, 
    /**
     * Returns a promise that resolves after currentDelayMs, and increases the
     * delay for any subsequent attempts. If there was a pending backoff operation
     * already, it will be canceled.
     */
    t.prototype.Zn = function(t) {
        var e = this;
        // Cancel any pending backoff operation.
                this.cancel();
        // First schedule using the current base (which may be 0 and should be
        // honored as such).
        var n = Math.floor(this.Hn + this.ti()), r = Math.max(0, Date.now() - this.Jn), i = Math.max(0, n - r);
        // Guard against lastAttemptTime being in the future due to a clock change.
                i > 0 && h("ExponentialBackoff", "Backing off for " + i + " ms (base delay: " + this.Hn + " ms, delay with jitter: " + n + " ms, last attempt: " + r + " ms ago)"), 
        this.Yn = this.Wn.ei(this.jn, i, (function() {
            return e.Jn = Date.now(), t();
        })), 
        // Apply backoff factor to determine next delay and ensure it is within
        // bounds.
        this.Hn *= this.Gn, this.Hn < this.Kn && (this.Hn = this.Kn), this.Hn > this.zn && (this.Hn = this.zn);
    }, t.prototype.si = function() {
        null !== this.Yn && (this.Yn.ni(), this.Yn = null);
    }, t.prototype.cancel = function() {
        null !== this.Yn && (this.Yn.cancel(), this.Yn = null);
    }, 
    /** Returns a random value in the range [-currentBaseMs/2, currentBaseMs/2] */ t.prototype.ti = function() {
        return (Math.random() - .5) * this.Hn;
    }, t;
}();

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A helper for running delayed tasks following an exponential backoff curve
 * between attempts.
 *
 * Each delay is made up of a "base" delay which follows the exponential
 * backoff curve, and a +/- 50% "jitter" that is calculated and added to the
 * base delay. This prevents clients from accidentally synchronizing their
 * delays causing spikes of load to the backend.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Encodes a resource path into a IndexedDb-compatible string form.
 */
function fn(t) {
    for (var e = "", n = 0; n < t.length; n++) e.length > 0 && (e = pn(e)), e = ln(t.get(n), e);
    return pn(e);
}

/** Encodes a single segment of a resource path into the given result */ function ln(t, e) {
    for (var n = e, r = t.length, i = 0; i < r; i++) {
        var o = t.charAt(i);
        switch (o) {
          case "\0":
            n += "";
            break;

          case "":
            n += "";
            break;

          default:
            n += o;
        }
    }
    return n;
}

/** Encodes a path separator into the given result */ function pn(t) {
    return t + "";
}

/**
 * Decodes the given IndexedDb-compatible string form of a resource path into
 * a ResourcePath instance. Note that this method is not suitable for use with
 * decoding resource names from the server; those are One Platform format
 * strings.
 */ function dn(t) {
    // Event the empty path must encode as a path of at least length 2. A path
    // with exactly 2 must be the empty path.
    var e = t.length;
    if (d(e >= 2), 2 === e) return d("" === t.charAt(0) && "" === t.charAt(1)), R.k;
    // Escape characters cannot exist past the second-to-last position in the
    // source value.
        for (var n = e - 2, r = [], i = "", o = 0; o < e; ) {
        // The last two characters of a valid encoded path must be a separator, so
        // there must be an end to this segment.
        var s = t.indexOf("", o);
        switch ((s < 0 || s > n) && p(), t.charAt(s + 1)) {
          case "":
            var u = t.substring(o, s), a = void 0;
            0 === i.length ? 
            // Avoid copying for the common case of a segment that excludes \0
            // and \001
            a = u : (a = i += u, i = ""), r.push(a);
            break;

          case "":
            i += t.substring(o, s), i += "\0";
            break;

          case "":
            // The escape character can be used in the output to encode itself.
            i += t.substring(o, s + 1);
            break;

          default:
            p();
        }
        o = s + 2;
    }
    return new R(r);
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * An in-memory implementation of IndexManager.
 */ var yn = /** @class */ function() {
    function t() {
        this.ii = new vn;
    }
    return t.prototype.ri = function(t, e) {
        return this.ii.add(e), en.resolve();
    }, t.prototype.Nn = function(t, e) {
        return en.resolve(this.ii.getEntries(e));
    }, t;
}(), vn = /** @class */ function() {
    function t() {
        this.index = {};
    }
    // Returns false if the entry already existed.
        return t.prototype.add = function(t) {
        var e = t.S(), n = t.p(), r = this.index[e] || new Y(R.P), i = !r.has(n);
        return this.index[e] = r.add(n), i;
    }, t.prototype.has = function(t) {
        var e = t.S(), n = t.p(), r = this.index[e];
        return r && r.has(n);
    }, t.prototype.getEntries = function(t) {
        return (this.index[t] || new Y(R.P)).F();
    }, t;
}(), gn = /** @class */ function() {
    function t() {
        /**
         * An in-memory copy of the index entries we've already written since the SDK
         * launched. Used to avoid re-writing the same entry repeatedly.
         *
         * This is *NOT* a complete cache of what's in persistence and so can never be used to
         * satisfy reads.
         */
        this.oi = new vn;
    }
    /**
     * Adds a new entry to the collection parent index.
     *
     * Repeated calls for the same collectionPath should be avoided within a
     * transaction as IndexedDbIndexManager only caches writes once a transaction
     * has been committed.
     */    return t.prototype.ri = function(t, e) {
        var n = this;
        if (!this.oi.has(e)) {
            var r = e.S(), i = e.p();
            t.En((function() {
                // Add the collection to the in memory cache only if the transaction was
                // successfully committed.
                n.oi.add(e);
            }));
            var o = {
                collectionId: r,
                parent: fn(i)
            };
            return mn(t).put(o);
        }
        return en.resolve();
    }, t.prototype.Nn = function(t, e) {
        var n = [], r = IDBKeyRange.bound([ e, "" ], [ _(e), "" ], 
        /*lowerOpen=*/ !1, 
        /*upperOpen=*/ !0);
        return mn(t).hi(r).next((function(t) {
            for (var r = 0, i = t; r < i.length; r++) {
                var o = i[r];
                // This collectionId guard shouldn't be necessary (and isn't as long
                // as we're running in a real browser), but there's a bug in
                // indexeddbshim that breaks our range in our tests running in node:
                // https://github.com/axemclion/IndexedDBShim/issues/334
                                if (o.collectionId !== e) break;
                n.push(dn(o.parent));
            }
            return n;
        }));
    }, t;
}();

/**
 * Internal implementation of the collection-parent index exposed by MemoryIndexManager.
 * Also used for in-memory caching by IndexedDbIndexManager and initial index population
 * in indexeddb_schema.ts
 */
/**
 * Helper to get a typed SimpleDbStore for the collectionParents
 * document store.
 */
function mn(t) {
    return jn.ai(t, lr.store);
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** Serializer for values stored in the LocalStore. */ var wn = function(t) {
    this.ui = t;
};

/** Decodes a remote document from storage locally to a Document. */ function _n(t, e) {
    if (e.document) return function(t, e, n) {
        var r = Xt(t, e.name), i = Wt(e.updateTime), o = new De({
            mapValue: {
                fields: e.fields
            }
        });
        return new Oe(r, i, o, {
            hasCommittedMutations: !!n
        });
    }(t.ui, e.document, !!e.hasCommittedMutations);
    if (e.noDocument) {
        var n = L.j(e.noDocument.path), r = Nn(e.noDocument.readTime);
        return new Ue(n, r, {
            hasCommittedMutations: !!e.hasCommittedMutations
        });
    }
    if (e.unknownDocument) {
        var i = L.j(e.unknownDocument.path), o = Nn(e.unknownDocument.version);
        return new Le(i, o);
    }
    return p();
}

/** Encodes a document for storage locally. */ function bn(t, e, n) {
    var r = In(n), i = e.key.path.p().F();
    if (e instanceof Oe) {
        var o = function(t, e) {
            return {
                name: Yt(t, e.key),
                fields: e.fs().mapValue.fields,
                updateTime: Bt(t, e.version.R())
            };
        }(t.ui, e), s = e.hasCommittedMutations;
        return new ur(
        /* unknownDocument= */ null, 
        /* noDocument= */ null, o, s, r, i);
    }
    if (e instanceof Ue) {
        var u = e.key.path.F(), a = Tn(e.version), c = e.hasCommittedMutations;
        return new ur(
        /* unknownDocument= */ null, new or(u, a), 
        /* document= */ null, c, r, i);
    }
    if (e instanceof Le) {
        var h = e.key.path.F(), f = Tn(e.version);
        return new ur(new sr(h, f), 
        /* noDocument= */ null, 
        /* document= */ null, 
        /* hasCommittedMutations= */ !0, r, i);
    }
    return p();
}

function In(t) {
    var e = t.R();
    return [ e.seconds, e.nanoseconds ];
}

function En(t) {
    var e = new D(t[0], t[1]);
    return k.I(e);
}

function Tn(t) {
    var e = t.R();
    return new tr(e.seconds, e.nanoseconds);
}

function Nn(t) {
    var e = new D(t.seconds, t.nanoseconds);
    return k.I(e);
}

/** Encodes a batch of mutations into a DbMutationBatch for local storage. */
/** Decodes a DbMutationBatch into a MutationBatch */ function An(t, e) {
    var n = (e.baseMutations || []).map((function(e) {
        return re(t.ui, e);
    })), r = e.mutations.map((function(e) {
        return re(t.ui, e);
    })), i = D.fromMillis(e.localWriteTimeMs);
    return new Ze(e.batchId, i, n, r);
}

/** Decodes a DbTarget into TargetData */ function xn(t) {
    var e, n = Nn(t.readTime), r = void 0 !== t.lastLimboFreeSnapshotVersion ? Nn(t.lastLimboFreeSnapshotVersion) : k.min();
    return e = void 0 !== t.query.documents ? function(t) {
        d(1 === t.documents.length);
        var e = t.documents[0];
        return Ve.As(Jt(e)).We();
    }(t.query) : function(t) {
        var e = Jt(t.parent), n = t.structuredQuery, r = n.from ? n.from.length : 0, i = null;
        if (r > 0) {
            d(1 === r);
            var o = n.from[0];
            o.allDescendants ? i = o.collectionId : e = e.child(o.collectionId);
        }
        var s = [];
        n.where && (s = function t(e) {
            return e ? void 0 !== e.unaryFilter ? [ fe(e) ] : void 0 !== e.fieldFilter ? [ he(e) ] : void 0 !== e.compositeFilter ? e.compositeFilter.filters.map((function(e) {
                return t(e);
            })).reduce((function(t, e) {
                return t.concat(e);
            })) : p() : [];
        }(n.where));
        var u = [];
        n.orderBy && (u = n.orderBy.map((function(t) {
            return new He(ce((e = t).field), 
            // visible for testing
            function(t) {
                switch (t) {
                  case "ASCENDING":
                    return "asc" /* ASCENDING */;

                  case "DESCENDING":
                    return "desc" /* DESCENDING */;

                  default:
                    return;
                }
            }(e.direction));
            var e;
        })));
        var a = null;
        n.limit && (a = function(t) {
            var e;
            return V(e = "object" == typeof t ? t.value : t) ? null : e;
        }(n.limit));
        var c = null;
        n.startAt && (c = ue(n.startAt));
        var h = null;
        return n.endAt && (h = ue(n.endAt)), new Ve(e, i, u, s, a, "F" /* First */ , c, h).We();
    }(t.query), new B(e, t.targetId, 0 /* Listen */ , t.lastListenSequenceNumber, n, r, F.fromBase64String(t.resumeToken))
    /** Encodes TargetData into a DbTarget for storage locally. */;
}

function Sn(t, e) {
    var n, r = Tn(e.J), i = Tn(e.lastLimboFreeSnapshotVersion);
    n = Je(e.target) ? ie(t.ui, e.target) : oe(t.ui, e.target);
    // We can't store the resumeToken as a ByteString in IndexedDb, so we
    // convert it to a base64 string for storage.
    var o = e.resumeToken.toBase64();
    // lastListenSequenceNumber is always 0 until we do real GC.
        return new cr(e.targetId, Xe(e.target), r, o, e.sequenceNumber, i, n);
}

/**
 * A helper function for figuring out what kind of query has been stored.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var Dn = /** @class */ function() {
    /**
     * @param {LocalSerializer} serializer The document serializer.
     * @param {IndexManager} indexManager The query indexes that need to be maintained.
     */
    function t(t, e) {
        this.serializer = t, this.mn = e
        /**
     * Adds the supplied entries to the cache.
     *
     * All calls of `addEntry` are required to go through the RemoteDocumentChangeBuffer
     * returned by `newChangeBuffer()` to ensure proper accounting of metadata.
     */;
    }
    return t.prototype.un = function(t, e, n) {
        return Pn(t).put(Rn(e), n);
    }, 
    /**
     * Removes a document from the cache.
     *
     * All calls of `removeEntry`  are required to go through the RemoteDocumentChangeBuffer
     * returned by `newChangeBuffer()` to ensure proper accounting of metadata.
     */
    t.prototype.ln = function(t, e) {
        var n = Pn(t), r = Rn(e);
        return n.delete(r);
    }, 
    /**
     * Updates the current cache size.
     *
     * Callers to `addEntry()` and `removeEntry()` *must* call this afterwards to update the
     * cache's metadata.
     */
    t.prototype.updateMetadata = function(t, e) {
        var n = this;
        return this.getMetadata(t).next((function(r) {
            return r.byteSize += e, n.ci(t, r);
        }));
    }, t.prototype._n = function(t, e) {
        var n = this;
        return Pn(t).get(Rn(e)).next((function(t) {
            return n.li(t);
        }));
    }, 
    /**
     * Looks up an entry in the cache.
     *
     * @param documentKey The key of the entry to look up.
     * @return The cached MaybeDocument entry and its size, or null if we have nothing cached.
     */
    t.prototype._i = function(t, e) {
        var n = this;
        return Pn(t).get(Rn(e)).next((function(t) {
            var e = n.li(t);
            return e ? {
                fi: e,
                size: On(t)
            } : null;
        }));
    }, t.prototype.getEntries = function(t, e) {
        var n = this, r = Z();
        return this.di(t, e, (function(t, e) {
            var i = n.li(e);
            r = r.et(t, i);
        })).next((function() {
            return r;
        }));
    }, 
    /**
     * Looks up several entries in the cache.
     *
     * @param documentKeys The set of keys entries to look up.
     * @return A map of MaybeDocuments indexed by key (if a document cannot be
     *     found, the key will be mapped to null) and a map of sizes indexed by
     *     key (zero if the key cannot be found).
     */
    t.prototype.wi = function(t, e) {
        var n = this, r = Z(), i = new W(L.P);
        return this.di(t, e, (function(t, e) {
            var o = n.li(e);
            o ? (r = r.et(t, o), i = i.et(t, On(e))) : (r = r.et(t, null), i = i.et(t, 0));
        })).next((function() {
            return {
                Ti: r,
                Ei: i
            };
        }));
    }, t.prototype.di = function(t, e, n) {
        if (e._()) return en.resolve();
        var r = IDBKeyRange.bound(e.first().path.F(), e.last().path.F()), i = e.at(), o = i.dt();
        return Pn(t).Ii({
            range: r
        }, (function(t, e, r) {
            // Go through keys not found in cache.
            for (var s = L.j(t); o && L.P(o, s) < 0; ) n(o, null), o = i.dt();
            o && o.isEqual(s) && (
            // Key found in cache.
            n(o, e), o = i.wt() ? i.dt() : null), 
            // Skip to the next key (if there is one).
            o ? r.Ai(o.path.F()) : r.done();
        })).next((function() {
            // The rest of the keys are not in the cache. One case where `iterate`
            // above won't go through them is when the cache is empty.
            for (;o; ) n(o, null), o = i.wt() ? i.dt() : null;
        }));
    }, t.prototype.Sn = function(t, e, n) {
        var r = this, i = et(), o = e.path.length + 1, s = {};
        if (n.isEqual(k.min())) {
            // Documents are ordered by key, so we can use a prefix scan to narrow
            // down the documents we need to match the query against.
            var u = e.path.F();
            s.range = IDBKeyRange.lowerBound(u);
        } else {
            // Execute an index-free query and filter by read time. This is safe
            // since all document changes to queries that have a
            // lastLimboFreeSnapshotVersion (`sinceReadTime`) have a read time set.
            var a = e.path.F(), c = In(n);
            s.range = IDBKeyRange.lowerBound([ a, c ], 
            /* open= */ !0), s.index = ur.collectionReadTimeIndex;
        }
        return Pn(t).Ii(s, (function(t, n, s) {
            // The query is actually returning any path that starts with the query
            // path prefix which may include documents in subcollections. For
            // example, a query on 'rooms' will return rooms/abc/messages/xyx but we
            // shouldn't match it. Fix this by discarding rows with document keys
            // more than one segment longer than the query path.
            if (t.length === o) {
                var u = _n(r.serializer, n);
                e.path.D(u.key.path) ? u instanceof Oe && e.matches(u) && (i = i.et(u.key, u)) : s.done();
            }
        })).next((function() {
            return i;
        }));
    }, 
    /**
     * Returns the set of documents that have changed since the specified read
     * time.
     */
    // PORTING NOTE: This is only used for multi-tab synchronization.
    t.prototype.Ri = function(t, e) {
        var n = this, r = J(), i = In(e), o = Pn(t), s = IDBKeyRange.lowerBound(i, !0);
        return o.Ii({
            index: ur.readTimeIndex,
            range: s
        }, (function(t, e) {
            // Unlike `getEntry()` and others, `getNewDocumentChanges()` parses
            // the documents directly since we want to keep sentinel deletes.
            var o = _n(n.serializer, e);
            r = r.et(o.key, o), i = e.readTime;
        })).next((function() {
            return {
                mi: r,
                readTime: En(i)
            };
        }));
    }, 
    /**
     * Returns the read time of the most recently read document in the cache, or
     * SnapshotVersion.min() if not available.
     */
    // PORTING NOTE: This is only used for multi-tab synchronization.
    t.prototype.Pi = function(t) {
        var e = Pn(t), n = k.min();
        // If there are no existing entries, we return SnapshotVersion.min().
                return e.Ii({
            index: ur.readTimeIndex,
            reverse: !0
        }, (function(t, e, r) {
            e.readTime && (n = En(e.readTime)), r.done();
        })).next((function() {
            return n;
        }));
    }, t.prototype.Vi = function(e) {
        return new t.gi(this, !!e && e.pi);
    }, t.prototype.yi = function(t) {
        return this.getMetadata(t).next((function(t) {
            return t.byteSize;
        }));
    }, t.prototype.getMetadata = function(t) {
        return kn(t).get(ar.key).next((function(t) {
            return d(!!t), t;
        }));
    }, t.prototype.ci = function(t, e) {
        return kn(t).put(ar.key, e);
    }, 
    /**
     * Decodes `remoteDoc` and returns the document (or null, if the document
     * corresponds to the format used for sentinel deletes).
     */
    t.prototype.li = function(t) {
        if (t) {
            var e = _n(this.serializer, t);
            return e instanceof Ue && e.version.isEqual(k.min()) ? null : e;
        }
        return null;
    }, t;
}();

/**
 * Handles the details of adding and updating documents in the IndexedDbRemoteDocumentCache.
 *
 * Unlike the MemoryRemoteDocumentChangeBuffer, the IndexedDb implementation computes the size
 * delta for all submitted changes. This avoids having to re-read all documents from IndexedDb
 * when we apply the changes.
 */ function kn(t) {
    return jn.ai(t, ar.store);
}

/**
 * Helper to get a typed SimpleDbStore for the remoteDocuments object store.
 */ function Pn(t) {
    return jn.ai(t, ur.store);
}

function Rn(t) {
    return t.path.F();
}

/**
 * Retrusn an approximate size for the given document.
 */ function On(t) {
    var e;
    if (t.document) e = t.document; else if (t.unknownDocument) e = t.unknownDocument; else {
        if (!t.noDocument) throw p();
        e = t.noDocument;
    }
    return JSON.stringify(e).length;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** Offset to ensure non-overlapping target ids. */ Dn.gi = /** @class */ function(t) {
    /**
     * @param documentCache The IndexedDbRemoteDocumentCache to apply the changes to.
     * @param trackRemovals Whether to create sentinel deletes that can be tracked by
     * `getNewDocumentChanges()`.
     */
    function n(e, n) {
        var r = this;
        return (r = t.call(this) || this).bi = e, r.pi = n, 
        // A map of document sizes prior to applying the changes in this buffer.
        r.vi = new A((function(t) {
            return t.toString();
        }), (function(t, e) {
            return t.isEqual(e);
        })), r;
    }
    return e.__extends(n, t), n.prototype.wn = function(t) {
        var e = this, n = [], r = 0, i = new Y((function(t, e) {
            return m(t.N(), e.N());
        }));
        return this.on.forEach((function(o, s) {
            var u = e.vi.get(o);
            if (s) {
                var a = bn(e.bi.serializer, s, e.readTime);
                i = i.add(o.path.p());
                var c = On(a);
                r += c - u, n.push(e.bi.un(t, o, a));
            } else if (r -= u, e.pi) {
                // In order to track removals, we store a "sentinel delete" in the
                // RemoteDocumentCache. This entry is represented by a NoDocument
                // with a version of 0 and ignored by `maybeDecodeDocument()` but
                // preserved in `getNewDocumentChanges()`.
                var h = bn(e.bi.serializer, new Ue(o, k.min()), e.readTime);
                n.push(e.bi.un(t, o, h));
            } else n.push(e.bi.ln(t, o));
        })), i.forEach((function(r) {
            n.push(e.bi.mn.ri(t, r));
        })), n.push(this.bi.updateMetadata(t, r)), en.nn(n);
    }, n.prototype.fn = function(t, e) {
        var n = this;
        // Record the size of everything we load from the cache so we can compute a delta later.
                return this.bi._i(t, e).next((function(t) {
            return null === t ? (n.vi.set(e, 0), null) : (n.vi.set(e, t.size), t.fi);
        }));
    }, n.prototype.dn = function(t, e) {
        var n = this;
        // Record the size of everything we load from the cache so we can compute
        // a delta later.
                return this.bi.wi(t, e).next((function(t) {
            var e = t.Ti;
            // Note: `getAllFromCache` returns two maps instead of a single map from
            // keys to `DocumentSizeEntry`s. This is to allow returning the
            // `NullableMaybeDocumentMap` directly, without a conversion.
            return t.Ei.forEach((function(t, e) {
                n.vi.set(t, e);
            })), e;
        }));
    }, n;
}(nn);

/**
 * Generates monotonically increasing target IDs for sending targets to the
 * watch stream.
 *
 * The client constructs two generators, one for the target cache, and one for
 * for the sync engine (to generate limbo documents targets). These
 * generators produce non-overlapping IDs (by using even and odd IDs
 * respectively).
 *
 * By separating the target ID space, the query cache can generate target IDs
 * that persist across client restarts, while sync engine can independently
 * generate in-memory target IDs that are transient and can be reused after a
 * restart.
 */
var Un = /** @class */ function() {
    function t(t) {
        this.Si = t;
    }
    return t.prototype.next = function() {
        return this.Si += 2, this.Si;
    }, t.Di = function() {
        // The target cache generator must return '2' in its first call to `next()`
        // as there is no differentiation in the protocol layer between an unset
        // number and the number '0'. If we were to sent a target with target ID
        // '0', the backend would consider it unset and replace it with its own ID.
        return new t(0);
    }, t.Ci = function() {
        // Sync engine assigns target IDs for limbo document detection.
        return new t(-1);
    }, t;
}(), Ln = /** @class */ function() {
    function t(t, e) {
        this.Fi = t, this.serializer = e;
    }
    // PORTING NOTE: We don't cache global metadata for the target cache, since
    // some of it (in particular `highestTargetId`) can be modified by secondary
    // tabs. We could perhaps be more granular (and e.g. still cache
    // `lastRemoteSnapshotVersion` in memory) but for simplicity we currently go
    // to IndexedDb whenever we need to read metadata. We can revisit if it turns
    // out to have a meaningful performance impact.
        return t.prototype.Ni = function(t) {
        var e = this;
        return this.$i(t).next((function(n) {
            var r = new Un(n.highestTargetId);
            return n.highestTargetId = r.next(), e.ki(t, n).next((function() {
                return n.highestTargetId;
            }));
        }));
    }, t.prototype.xi = function(t) {
        return this.$i(t).next((function(t) {
            return k.I(new D(t.lastRemoteSnapshotVersion.seconds, t.lastRemoteSnapshotVersion.nanoseconds));
        }));
    }, t.prototype.Mi = function(t) {
        return this.$i(t).next((function(t) {
            return t.highestListenSequenceNumber;
        }));
    }, t.prototype.Li = function(t, e, n) {
        var r = this;
        return this.$i(t).next((function(i) {
            return i.highestListenSequenceNumber = e, n && (i.lastRemoteSnapshotVersion = n.R()), 
            e > i.highestListenSequenceNumber && (i.highestListenSequenceNumber = e), r.ki(t, i);
        }));
    }, t.prototype.Oi = function(t, e) {
        var n = this;
        return this.Bi(t, e).next((function() {
            return n.$i(t).next((function(r) {
                return r.targetCount += 1, n.qi(e, r), n.ki(t, r);
            }));
        }));
    }, t.prototype.Ui = function(t, e) {
        return this.Bi(t, e);
    }, t.prototype.Qi = function(t, e) {
        var n = this;
        return this.Wi(t, e.targetId).next((function() {
            return Vn(t).delete(e.targetId);
        })).next((function() {
            return n.$i(t);
        })).next((function(e) {
            return d(e.targetCount > 0), e.targetCount -= 1, n.ki(t, e);
        }));
    }, 
    /**
     * Drops any targets with sequence number less than or equal to the upper bound, excepting those
     * present in `activeTargetIds`. Document associations for the removed targets are also removed.
     * Returns the number of targets removed.
     */
    t.prototype.ji = function(t, e, n) {
        var r = this, i = 0, o = [];
        return Vn(t).Ii((function(s, u) {
            var a = xn(u);
            a.sequenceNumber <= e && null === n.get(a.targetId) && (i++, o.push(r.Qi(t, a)));
        })).next((function() {
            return en.nn(o);
        })).next((function() {
            return i;
        }));
    }, 
    /**
     * Call provided function with each `TargetData` that we have cached.
     */
    t.prototype.ye = function(t, e) {
        return Vn(t).Ii((function(t, n) {
            var r = xn(n);
            e(r);
        }));
    }, t.prototype.$i = function(t) {
        return Cn(t).get(fr.key).next((function(t) {
            return d(null !== t), t;
        }));
    }, t.prototype.ki = function(t, e) {
        return Cn(t).put(fr.key, e);
    }, t.prototype.Bi = function(t, e) {
        return Vn(t).put(Sn(this.serializer, e));
    }, 
    /**
     * In-place updates the provided metadata to account for values in the given
     * TargetData. Saving is done separately. Returns true if there were any
     * changes to the metadata.
     */
    t.prototype.qi = function(t, e) {
        var n = !1;
        return t.targetId > e.highestTargetId && (e.highestTargetId = t.targetId, n = !0), 
        t.sequenceNumber > e.highestListenSequenceNumber && (e.highestListenSequenceNumber = t.sequenceNumber, 
        n = !0), n;
    }, t.prototype.Ki = function(t) {
        return this.$i(t).next((function(t) {
            return t.targetCount;
        }));
    }, t.prototype.Gi = function(t, e) {
        // Iterating by the canonicalId may yield more than one result because
        // canonicalId values are not required to be unique per target. This query
        // depends on the queryTargets index to be efficient.
        var n = Xe(e), r = IDBKeyRange.bound([ n, Number.NEGATIVE_INFINITY ], [ n, Number.POSITIVE_INFINITY ]), i = null;
        return Vn(t).Ii({
            range: r,
            index: cr.queryTargetsIndexName
        }, (function(t, n, r) {
            var o = xn(n);
            // After finding a potential match, check that the target is
            // actually equal to the requested target.
                        $e(e, o.target) && (i = o, r.done());
        })).next((function() {
            return i;
        }));
    }, t.prototype.zi = function(t, e, n) {
        var r = this, i = [], o = qn(t);
        // PORTING NOTE: The reverse index (documentsTargets) is maintained by
        // IndexedDb.
                return e.forEach((function(e) {
            var s = fn(e.path);
            i.push(o.put(new hr(n, s))), i.push(r.Fi.Hi(t, n, e));
        })), en.nn(i);
    }, t.prototype.Yi = function(t, e, n) {
        var r = this, i = qn(t);
        // PORTING NOTE: The reverse index (documentsTargets) is maintained by
        // IndexedDb.
                return en.forEach(e, (function(e) {
            var o = fn(e.path);
            return en.nn([ i.delete([ n, o ]), r.Fi.Ji(t, n, e) ]);
        }));
    }, t.prototype.Wi = function(t, e) {
        var n = qn(t), r = IDBKeyRange.bound([ e ], [ e + 1 ], 
        /*lowerOpen=*/ !1, 
        /*upperOpen=*/ !0);
        return n.delete(r);
    }, t.prototype.Xi = function(t, e) {
        var n = IDBKeyRange.bound([ e ], [ e + 1 ], 
        /*lowerOpen=*/ !1, 
        /*upperOpen=*/ !0), r = qn(t), i = it();
        return r.Ii({
            range: n,
            Zi: !0
        }, (function(t, e, n) {
            var r = dn(t[1]), o = new L(r);
            i = i.add(o);
        })).next((function() {
            return i;
        }));
    }, t.prototype.tr = function(t, e) {
        var n = fn(e.path), r = IDBKeyRange.bound([ n ], [ _(n) ], 
        /*lowerOpen=*/ !1, 
        /*upperOpen=*/ !0), i = 0;
        return qn(t).Ii({
            index: hr.documentTargetsIndex,
            Zi: !0,
            range: r
        }, (function(t, e, n) {
            var r = t[0];
            // Having a sentinel row for a document does not count as containing that document;
            // For the target cache, containing the document means the document is part of some
            // target.
                        t[1];
            0 !== r && (i++, n.done());
        })).next((function() {
            return i > 0;
        }));
    }, 
    /**
     * Looks up a TargetData entry by target ID.
     *
     * @param targetId The target ID of the TargetData entry to look up.
     * @return The cached TargetData entry, or null if the cache has no entry for
     * the target.
     */
    // PORTING NOTE: Multi-tab only.
    t.prototype.Me = function(t, e) {
        return Vn(t).get(e).next((function(t) {
            return t ? xn(t) : null;
        }));
    }, t;
}();

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Helper to get a typed SimpleDbStore for the queries object store.
 */
function Vn(t) {
    return jn.ai(t, cr.store);
}

/**
 * Helper to get a typed SimpleDbStore for the target globals object store.
 */ function Cn(t) {
    return jn.ai(t, fr.store);
}

/**
 * Helper to get a typed SimpleDbStore for the document target object store.
 */ function qn(t) {
    return jn.ai(t, hr.store);
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var Fn = "Failed to obtain exclusive access to the persistence layer. To allow shared access, make sure to invoke `enablePersistence()` with `synchronizeTabs:true` in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.", Mn = /** @class */ function(t) {
    function n(e, n) {
        var r = this;
        return (r = t.call(this) || this).er = e, r.sr = n, r;
    }
    return e.__extends(n, t), n;
}(on), jn = /** @class */ function() {
    function t(
    /**
     * Whether to synchronize the in-memory state of multiple tabs and share
     * access to local persistence.
     */
    e, n, r, i, o, s, u, a, c, 
    /**
     * If set to true, forcefully obtains database access. Existing tabs will
     * no longer be able to access IndexedDB.
     */
    h) {
        if (this.allowTabSynchronization = e, this.persistenceKey = n, this.clientId = r, 
        this.Wn = o, this.window = s, this.document = u, this.nr = c, this.ir = h, this.rr = null, 
        this.or = !1, this.isPrimary = !1, this.networkEnabled = !0, 
        /** Our window.unload handler, if registered. */
        this.hr = null, this.inForeground = !1, 
        /** Our 'visibilitychange' listener if registered. */
        this.ar = null, 
        /** The client metadata refresh task. */
        this.ur = null, 
        /** The last time we garbage collected the client metadata object store. */
        this.cr = Number.NEGATIVE_INFINITY, 
        /** A listener to notify on primary state changes. */
        this.lr = function(t) {
            return Promise.resolve();
        }, !t._r()) throw new S(x.UNIMPLEMENTED, "This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");
        this.Fi = new Gn(this, i), this.dr = n + t.wr, this.serializer = new wn(a), this.Tr = new Ln(this.Fi, this.serializer), 
        this.mn = new gn, this.An = new Dn(this.serializer, this.mn), this.window && this.window.localStorage ? this.Er = this.window.localStorage : (this.Er = null, 
        !1 === h && f("IndexedDbPersistence", "LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."));
    }
    return t.ai = function(t, e) {
        if (t instanceof Mn) return vr.ai(t.er, e);
        throw p();
    }, 
    /**
     * Attempt to start IndexedDb persistence.
     *
     * @return {Promise<void>} Whether persistence was enabled.
     */
    t.prototype.start = function() {
        var t = this;
        return vr.Ir(this.dr, Jn, new Zn(this.serializer)).then((function(e) {
            return t.Ar = e, t.Rr();
        })).then((function() {
            if (!t.isPrimary && !t.allowTabSynchronization) 
            // Fail `start()` if `synchronizeTabs` is disabled and we cannot
            // obtain the primary lease.
            throw new S(x.FAILED_PRECONDITION, Fn);
            return t.mr(), t.Pr(), t.Vr(), t.runTransaction("getHighestListenSequenceNumber", "readonly", (function(e) {
                return t.Tr.Mi(e);
            }));
        })).then((function(e) {
            t.rr = new an(e, t.nr);
        })).then((function() {
            t.or = !0;
        })).catch((function(e) {
            return t.Ar && t.Ar.close(), Promise.reject(e);
        }));
    }, 
    /**
     * Registers a listener that gets called when the primary state of the
     * instance changes. Upon registering, this listener is invoked immediately
     * with the current primary state.
     *
     * PORTING NOTE: This is only used for Web multi-tab.
     */
    t.prototype.gr = function(t) {
        var n = this;
        return this.lr = function(r) {
            return e.__awaiter(n, void 0, void 0, (function() {
                return e.__generator(this, (function(e) {
                    return this.pr ? [ 2 /*return*/ , t(r) ] : [ 2 /*return*/ ];
                }));
            }));
        }, t(this.isPrimary);
    }, 
    /**
     * Registers a listener that gets called when the database receives a
     * version change event indicating that it has deleted.
     *
     * PORTING NOTE: This is only used for Web multi-tab.
     */
    t.prototype.yr = function(t) {
        var n = this;
        this.Ar.br((function(r) {
            return e.__awaiter(n, void 0, void 0, (function() {
                return e.__generator(this, (function(e) {
                    switch (e.label) {
                      case 0:
                        return null === r.newVersion ? [ 4 /*yield*/ , t() ] : [ 3 /*break*/ , 2 ];

                      case 1:
                        e.sent(), e.label = 2;

                      case 2:
                        return [ 2 /*return*/ ];
                    }
                }));
            }));
        }));
    }, 
    /**
     * Adjusts the current network state in the client's metadata, potentially
     * affecting the primary lease.
     *
     * PORTING NOTE: This is only used for Web multi-tab.
     */
    t.prototype.vr = function(t) {
        var n = this;
        this.networkEnabled !== t && (this.networkEnabled = t, 
        // Schedule a primary lease refresh for immediate execution. The eventual
        // lease update will be propagated via `primaryStateListener`.
        this.Wn.Sr((function() {
            return e.__awaiter(n, void 0, void 0, (function() {
                return e.__generator(this, (function(t) {
                    switch (t.label) {
                      case 0:
                        return this.pr ? [ 4 /*yield*/ , this.Rr() ] : [ 3 /*break*/ , 2 ];

                      case 1:
                        t.sent(), t.label = 2;

                      case 2:
                        return [ 2 /*return*/ ];
                    }
                }));
            }));
        })));
    }, 
    /**
     * Updates the client metadata in IndexedDb and attempts to either obtain or
     * extend the primary lease for the local client. Asynchronously notifies the
     * primary state listener if the client either newly obtained or released its
     * primary lease.
     */
    t.prototype.Rr = function() {
        var t = this;
        return this.runTransaction("updateClientMetadataAndTryBecomePrimary", "readwrite", (function(e) {
            return Qn(e).put(new dr(t.clientId, Date.now(), t.networkEnabled, t.inForeground)).next((function() {
                if (t.isPrimary) return t.Dr(e).next((function(e) {
                    e || (t.isPrimary = !1, t.Wn.Cr((function() {
                        return t.lr(!1);
                    })));
                }));
            })).next((function() {
                return t.Fr(e);
            })).next((function(n) {
                return t.isPrimary && !n ? t.Nr(e).next((function() {
                    return !1;
                })) : !!n && t.$r(e).next((function() {
                    return !0;
                }));
            }));
        })).catch((function(e) {
            if (wr(e)) 
            // Proceed with the existing state. Any subsequent access to
            // IndexedDB will verify the lease.
            return h("IndexedDbPersistence", "Failed to extend owner lease: ", e), t.isPrimary;
            if (!t.allowTabSynchronization) throw e;
            return h("IndexedDbPersistence", "Releasing owner lease after error during lease refresh", e), 
            /* isPrimary= */ !1;
        })).then((function(e) {
            t.isPrimary !== e && t.Wn.Cr((function() {
                return t.lr(e);
            })), t.isPrimary = e;
        }));
    }, t.prototype.Dr = function(t) {
        var e = this;
        return Bn(t).get(er.key).next((function(t) {
            return en.resolve(e.kr(t));
        }));
    }, t.prototype.xr = function(t) {
        return Qn(t).delete(this.clientId);
    }, 
    /**
     * If the garbage collection threshold has passed, prunes the
     * RemoteDocumentChanges and the ClientMetadata store based on the last update
     * time of all clients.
     */
    t.prototype.Mr = function() {
        return e.__awaiter(this, void 0, void 0, (function() {
            var n, r, i, o, s = this;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return !this.isPrimary || this.Lr(this.cr, 18e5) ? [ 3 /*break*/ , 2 ] : (this.cr = Date.now(), 
                    [ 4 /*yield*/ , this.runTransaction("maybeGarbageCollectMultiClientState", "readwrite-primary", (function(e) {
                        var n = t.ai(e, dr.store);
                        return n.hi().next((function(t) {
                            var e = s.Or(t, 18e5), r = t.filter((function(t) {
                                return -1 === e.indexOf(t);
                            }));
                            // Delete metadata for clients that are no longer considered active.
                                                        return en.forEach(r, (function(t) {
                                return n.delete(t.clientId);
                            })).next((function() {
                                return r;
                            }));
                        }));
                    })).catch((function() {
                        return [];
                    })) ]);

                  case 1:
                    // Delete potential leftover entries that may continue to mark the
                    // inactive clients as zombied in LocalStorage.
                    // Ideally we'd delete the IndexedDb and LocalStorage zombie entries for
                    // the client atomically, but we can't. So we opt to delete the IndexedDb
                    // entries first to avoid potentially reviving a zombied client.
                    if (n = e.sent(), this.Er) for (r = 0, i = n; r < i.length; r++) o = i[r], this.Er.removeItem(this.Br(o.clientId));
                    e.label = 2;

                  case 2:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * Schedules a recurring timer to update the client metadata and to either
     * extend or acquire the primary lease if the client is eligible.
     */
    t.prototype.Vr = function() {
        var t = this;
        this.ur = this.Wn.ei("client_metadata_refresh" /* ClientMetadataRefresh */ , 4e3, (function() {
            return t.Rr().then((function() {
                return t.Mr();
            })).then((function() {
                return t.Vr();
            }));
        }));
    }, 
    /** Checks whether `client` is the local client. */ t.prototype.kr = function(t) {
        return !!t && t.ownerId === this.clientId;
    }, 
    /**
     * Evaluate the state of all active clients and determine whether the local
     * client is or can act as the holder of the primary lease. Returns whether
     * the client is eligible for the lease, but does not actually acquire it.
     * May return 'false' even if there is no active leaseholder and another
     * (foreground) client should become leaseholder instead.
     */
    t.prototype.Fr = function(t) {
        var e = this;
        return this.ir ? en.resolve(!0) : Bn(t).get(er.key).next((function(n) {
            // A client is eligible for the primary lease if:
            // - its network is enabled and the client's tab is in the foreground.
            // - its network is enabled and no other client's tab is in the
            //   foreground.
            // - every clients network is disabled and the client's tab is in the
            //   foreground.
            // - every clients network is disabled and no other client's tab is in
            //   the foreground.
            // - the `forceOwningTab` setting was passed in.
            if (null !== n && e.Lr(n.leaseTimestampMs, 5e3) && !e.qr(n.ownerId)) {
                if (e.kr(n) && e.networkEnabled) return !0;
                if (!e.kr(n)) {
                    if (!n.allowTabSynchronization) 
                    // Fail the `canActAsPrimary` check if the current leaseholder has
                    // not opted into multi-tab synchronization. If this happens at
                    // client startup, we reject the Promise returned by
                    // `enablePersistence()` and the user can continue to use Firestore
                    // with in-memory persistence.
                    // If this fails during a lease refresh, we will instead block the
                    // AsyncQueue from executing further operations. Note that this is
                    // acceptable since mixing & matching different `synchronizeTabs`
                    // settings is not supported.
                    // TODO(b/114226234): Remove this check when `synchronizeTabs` can
                    // no longer be turned off.
                    throw new S(x.FAILED_PRECONDITION, Fn);
                    return !1;
                }
            }
            return !(!e.networkEnabled || !e.inForeground) || Qn(t).hi().next((function(t) {
                return void 0 === e.Or(t, 5e3).find((function(t) {
                    if (e.clientId !== t.clientId) {
                        var n = !e.networkEnabled && t.networkEnabled, r = !e.inForeground && t.inForeground, i = e.networkEnabled === t.networkEnabled;
                        if (n || r && i) return !0;
                    }
                    return !1;
                }));
            }));
        })).next((function(t) {
            return e.isPrimary !== t && h("IndexedDbPersistence", "Client " + (t ? "is" : "is not") + " eligible for a primary lease."), 
            t;
        }));
    }, t.prototype.Ur = function() {
        return e.__awaiter(this, void 0, void 0, (function() {
            var t = this;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    // The shutdown() operations are idempotent and can be called even when
                    // start() aborted (e.g. because it couldn't acquire the persistence lease).
                    return this.or = !1, this.Qr(), this.ur && (this.ur.cancel(), this.ur = null), this.Wr(), 
                    this.jr(), [ 4 /*yield*/ , this.runTransaction("shutdown", "readwrite", (function(e) {
                        return t.Nr(e).next((function() {
                            return t.xr(e);
                        }));
                    })).catch((function(t) {
                        h("IndexedDbPersistence", "Proceeding with shutdown despite failure: ", t);
                    })) ];

                  case 1:
                    // The shutdown() operations are idempotent and can be called even when
                    // start() aborted (e.g. because it couldn't acquire the persistence lease).
                    return e.sent(), this.Ar.close(), 
                    // Remove the entry marking the client as zombied from LocalStorage since
                    // we successfully deleted its metadata from IndexedDb.
                    this.Kr(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * Returns clients that are not zombied and have an updateTime within the
     * provided threshold.
     */
    t.prototype.Or = function(t, e) {
        var n = this;
        return t.filter((function(t) {
            return n.Lr(t.updateTimeMs, e) && !n.qr(t.clientId);
        }));
    }, 
    /**
     * Returns the IDs of the clients that are currently active. If multi-tab
     * is not supported, returns an array that only contains the local client's
     * ID.
     *
     * PORTING NOTE: This is only used for Web multi-tab.
     */
    t.prototype.Gr = function() {
        var t = this;
        return this.runTransaction("getActiveClients", "readonly", (function(e) {
            return Qn(e).hi().next((function(e) {
                return t.Or(e, 18e5).map((function(t) {
                    return t.clientId;
                }));
            }));
        }));
    }, t.clearPersistence = function(n) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var r;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return t._r() ? (r = n + t.wr, [ 4 /*yield*/ , vr.delete(r) ]) : [ 2 /*return*/ , Promise.resolve() ];

                  case 1:
                    return e.sent(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, Object.defineProperty(t.prototype, "pr", {
        get: function() {
            return this.or;
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.zr = function(t) {
        return Wn.Hr(t, this.serializer, this.mn, this.Fi);
    }, t.prototype.Yr = function() {
        return this.Tr;
    }, t.prototype.Jr = function() {
        return this.An;
    }, t.prototype.Xr = function() {
        return this.mn;
    }, t.prototype.runTransaction = function(t, e, n) {
        var r = this;
        h("IndexedDbPersistence", "Starting transaction:", t);
        var i, o = "readonly" === e ? "readonly" : "readwrite";
        // Do all transactions as readwrite against all object stores, since we
        // are the only reader/writer.
        return this.Ar.runTransaction(o, yr, (function(o) {
            return i = new Mn(o, r.rr ? r.rr.next() : an.Qn), "readwrite-primary" === e ? r.Dr(i).next((function(t) {
                return !!t || r.Fr(i);
            })).next((function(e) {
                if (!e) throw f("Failed to obtain primary lease for action '" + t + "'."), r.isPrimary = !1, 
                r.Wn.Cr((function() {
                    return r.lr(!1);
                })), new S(x.FAILED_PRECONDITION, rn);
                return n(i);
            })).next((function(t) {
                return r.$r(i).next((function() {
                    return t;
                }));
            })) : r.Zr(i).next((function() {
                return n(i);
            }));
        })).then((function(t) {
            return i.In(), t;
        }));
    }, 
    /**
     * Verifies that the current tab is the primary leaseholder or alternatively
     * that the leaseholder has opted into multi-tab synchronization.
     */
    // TODO(b/114226234): Remove this check when `synchronizeTabs` can no longer
    // be turned off.
    t.prototype.Zr = function(t) {
        var e = this;
        return Bn(t).get(er.key).next((function(t) {
            if (null !== t && e.Lr(t.leaseTimestampMs, 5e3) && !e.qr(t.ownerId) && !e.kr(t) && !(e.ir || e.allowTabSynchronization && t.allowTabSynchronization)) throw new S(x.FAILED_PRECONDITION, Fn);
        }));
    }, 
    /**
     * Obtains or extends the new primary lease for the local client. This
     * method does not verify that the client is eligible for this lease.
     */
    t.prototype.$r = function(t) {
        var e = new er(this.clientId, this.allowTabSynchronization, Date.now());
        return Bn(t).put(er.key, e);
    }, t._r = function() {
        return vr._r();
    }, 
    /**
     * Generates a string used as a prefix when storing data in IndexedDB and
     * LocalStorage.
     */
    t.to = function(t) {
        // Use two different prefix formats:
        //   * firestore / persistenceKey / projectID . databaseID / ...
        //   * firestore / persistenceKey / projectID / ...
        // projectIDs are DNS-compatible names and cannot contain dots
        // so there's no danger of collisions.
        var e = t.s.projectId;
        return t.s.i || (e += "." + t.s.database), "firestore/" + t.persistenceKey + "/" + e + "/";
    }, 
    /** Checks the primary lease and removes it if we are the current primary. */ t.prototype.Nr = function(t) {
        var e = this, n = Bn(t);
        return n.get(er.key).next((function(t) {
            return e.kr(t) ? (h("IndexedDbPersistence", "Releasing primary lease."), n.delete(er.key)) : en.resolve();
        }));
    }, 
    /** Verifies that `updateTimeMs` is within `maxAgeMs`. */ t.prototype.Lr = function(t, e) {
        var n = Date.now();
        return !(t < n - e || t > n && (f("Detected an update time that is in the future: " + t + " > " + n), 
        1));
    }, t.prototype.mr = function() {
        var t = this;
        null !== this.document && "function" == typeof this.document.addEventListener && (this.ar = function() {
            t.Wn.Sr((function() {
                return t.inForeground = "visible" === t.document.visibilityState, t.Rr();
            }));
        }, this.document.addEventListener("visibilitychange", this.ar), this.inForeground = "visible" === this.document.visibilityState);
    }, t.prototype.Wr = function() {
        this.ar && (this.document.removeEventListener("visibilitychange", this.ar), this.ar = null);
    }, 
    /**
     * Attaches a window.unload handler that will synchronously write our
     * clientId to a "zombie client id" location in LocalStorage. This can be used
     * by tabs trying to acquire the primary lease to determine that the lease
     * is no longer valid even if the timestamp is recent. This is particularly
     * important for the refresh case (so the tab correctly re-acquires the
     * primary lease). LocalStorage is used for this rather than IndexedDb because
     * it is a synchronous API and so can be used reliably from  an unload
     * handler.
     */
    t.prototype.Pr = function() {
        var t, e = this;
        "function" == typeof (null === (t = this.window) || void 0 === t ? void 0 : t.addEventListener) && (this.hr = function() {
            // Note: In theory, this should be scheduled on the AsyncQueue since it
            // accesses internal state. We execute this code directly during shutdown
            // to make sure it gets a chance to run.
            e.Qr(), e.Wn.Sr((function() {
                return e.Ur();
            }));
        }, this.window.addEventListener("unload", this.hr));
    }, t.prototype.jr = function() {
        this.hr && (this.window.removeEventListener("unload", this.hr), this.hr = null);
    }, 
    /**
     * Returns whether a client is "zombied" based on its LocalStorage entry.
     * Clients become zombied when their tab closes without running all of the
     * cleanup logic in `shutdown()`.
     */
    t.prototype.qr = function(t) {
        var e;
        try {
            var n = null !== (null === (e = this.Er) || void 0 === e ? void 0 : e.getItem(this.Br(t)));
            return h("IndexedDbPersistence", "Client '" + t + "' " + (n ? "is" : "is not") + " zombied in LocalStorage"), 
            n;
        } catch (t) {
            // Gracefully handle if LocalStorage isn't working.
            return f("IndexedDbPersistence", "Failed to get zombied client id.", t), !1;
        }
    }, 
    /**
     * Record client as zombied (a client that had its tab closed). Zombied
     * clients are ignored during primary tab selection.
     */
    t.prototype.Qr = function() {
        if (this.Er) try {
            this.Er.setItem(this.Br(this.clientId), String(Date.now()));
        } catch (t) {
            // Gracefully handle if LocalStorage isn't available / working.
            f("Failed to set zombie client id.", t);
        }
    }, 
    /** Removes the zombied client entry if it exists. */ t.prototype.Kr = function() {
        if (this.Er) try {
            this.Er.removeItem(this.Br(this.clientId));
        } catch (t) {
            // Ignore
        }
    }, t.prototype.Br = function(t) {
        return "firestore_zombie_" + this.persistenceKey + "_" + t;
    }, t;
}();

/**
 * Oldest acceptable age in milliseconds for client metadata before the client
 * is considered inactive and its associated data is garbage collected.
 */
/**
 * The name of the main (and currently only) IndexedDB database. this name is
 * appended to the prefix provided to the IndexedDbPersistence constructor.
 */
/**
 * Helper to get a typed SimpleDbStore for the primary client object store.
 */
function Bn(t) {
    return jn.ai(t, er.store);
}

/**
 * Helper to get a typed SimpleDbStore for the client metadata object store.
 */ function Qn(t) {
    return jn.ai(t, dr.store);
}

/** Provides LRU functionality for IndexedDB persistence. */ jn.wr = "main";

var Gn = /** @class */ function() {
    function t(t, e) {
        this.db = t, this.eo = new Ur(this, e);
    }
    return t.prototype.so = function(t) {
        var e = this.no(t);
        return this.db.Yr().Ki(t).next((function(t) {
            return e.next((function(e) {
                return t + e;
            }));
        }));
    }, t.prototype.no = function(t) {
        var e = 0;
        return this.io(t, (function(t) {
            e++;
        })).next((function() {
            return e;
        }));
    }, t.prototype.ye = function(t, e) {
        return this.db.Yr().ye(t, e);
    }, t.prototype.io = function(t, e) {
        return this.ro(t, (function(t, n) {
            return e(n);
        }));
    }, t.prototype.Hi = function(t, e, n) {
        return zn(t, n);
    }, t.prototype.Ji = function(t, e, n) {
        return zn(t, n);
    }, t.prototype.ji = function(t, e, n) {
        return this.db.Yr().ji(t, e, n);
    }, t.prototype.oo = function(t, e) {
        return zn(t, e);
    }, 
    /**
     * Returns true if anything would prevent this document from being garbage
     * collected, given that the document in question is not present in any
     * targets and has a sequence number less than or equal to the upper bound for
     * the collection run.
     */
    t.prototype.ho = function(t, e) {
        /** Returns true if any mutation queue contains the given document. */
        return function(t, e) {
            var n = !1;
            return $n(t).ao((function(r) {
                return Hn(t, r, e).next((function(t) {
                    return t && (n = !0), en.resolve(!t);
                }));
            })).next((function() {
                return n;
            }));
        }(t, e);
    }, t.prototype.uo = function(t, e) {
        var n = this, r = this.db.Jr().Vi(), i = [], o = 0;
        return this.ro(t, (function(s, u) {
            if (u <= e) {
                var a = n.ho(t, s).next((function(e) {
                    if (!e) 
                    // Our size accounting requires us to read all documents before
                    // removing them.
                    return o++, r._n(t, s).next((function() {
                        return r.ln(s), qn(t).delete([ 0, fn(s.path) ]);
                    }));
                }));
                i.push(a);
            }
        })).next((function() {
            return en.nn(i);
        })).next((function() {
            return r.apply(t);
        })).next((function() {
            return o;
        }));
    }, t.prototype.removeTarget = function(t, e) {
        var n = e.X(t.sr);
        return this.db.Yr().Ui(t, n);
    }, t.prototype.co = function(t, e) {
        return zn(t, e);
    }, 
    /**
     * Call provided function for each document in the cache that is 'orphaned'. Orphaned
     * means not a part of any target, so the only entry in the target-document index for
     * that document will be the sentinel row (targetId 0), which will also have the sequence
     * number for the last time the document was accessed.
     */
    t.prototype.ro = function(t, e) {
        var n, r = qn(t), i = an.Qn;
        return r.Ii({
            index: hr.documentTargetsIndex
        }, (function(t, r) {
            var o = t[0], s = (t[1], r.path), u = r.sequenceNumber;
            0 === o ? (
            // if nextToReport is valid, report it, this is a new key so the
            // last one must not be a member of any targets.
            i !== an.Qn && e(new L(dn(n)), i), 
            // set nextToReport to be this sequence number. It's the next one we
            // might report, if we don't find any targets for this document.
            // Note that the sequence number must be defined when the targetId
            // is 0.
            i = u, n = s) : 
            // set nextToReport to be invalid, we know we don't need to report
            // this one since we found a target for it.
            i = an.Qn;
        })).next((function() {
            // Since we report sequence numbers after getting to the next key, we
            // need to check if the last key we iterated over was an orphaned
            // document and report it.
            i !== an.Qn && e(new L(dn(n)), i);
        }));
    }, t.prototype.lo = function(t) {
        return this.db.Jr().yi(t);
    }, t;
}();

function zn(t, e) {
    return qn(t).put(
    /**
 * @return A value suitable for writing a sentinel row in the target-document
 * store.
 */
    function(t, e) {
        return new hr(0, fn(t.path), e);
    }(e, t.sr));
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** A mutation queue for a specific user, backed by IndexedDB. */ var Wn = /** @class */ function() {
    function t(
    /**
     * The normalized userId (e.g. null UID => "" userId) used to store /
     * retrieve mutations.
     */
    t, e, n, r) {
        this.userId = t, this.serializer = e, this.mn = n, this.Fi = r, 
        /**
             * Caches the document keys for pending mutation batches. If the mutation
             * has been removed from IndexedDb, the cached value may continue to
             * be used to retrieve the batch's document keys. To remove a cached value
             * locally, `removeCachedMutationKeys()` should be invoked either directly
             * or through `removeMutationBatches()`.
             *
             * With multi-tab, when the primary client acknowledges or rejects a mutation,
             * this cache is used by secondary clients to invalidate the local
             * view of the documents that were previously affected by the mutation.
             */
        // PORTING NOTE: Multi-tab only.
        this._o = {}
        /**
     * Creates a new mutation queue for the given user.
     * @param user The user for which to create a mutation queue.
     * @param serializer The serializer to use when persisting to IndexedDb.
     */;
    }
    return t.Hr = function(e, n, r, i) {
        // TODO(mcg): Figure out what constraints there are on userIDs
        // In particular, are there any reserved characters? are empty ids allowed?
        // For the moment store these together in the same mutations table assuming
        // that empty userIDs aren't allowed.
        return d("" !== e.uid), new t(e.fo() ? e.uid : "", n, r, i);
    }, t.prototype.do = function(t) {
        var e = !0, n = IDBKeyRange.bound([ this.userId, Number.NEGATIVE_INFINITY ], [ this.userId, Number.POSITIVE_INFINITY ]);
        return Yn(t).Ii({
            index: rr.userMutationsIndex,
            range: n
        }, (function(t, n, r) {
            e = !1, r.done();
        })).next((function() {
            return e;
        }));
    }, t.prototype.wo = function(t, e, n, r) {
        var i = this, o = Xn(t), s = Yn(t);
        // The IndexedDb implementation in Chrome (and Firefox) does not handle
        // compound indices that include auto-generated keys correctly. To ensure
        // that the index entry is added correctly in all browsers, we perform two
        // writes: The first write is used to retrieve the next auto-generated Batch
        // ID, and the second write populates the index and stores the actual
        // mutation batch.
        // See: https://bugs.chromium.org/p/chromium/issues/detail?id=701972
        // We write an empty object to obtain key
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return s.add({}).next((function(u) {
            d("number" == typeof u);
            for (var a = new Ze(u, e, n, r), c = function(t, e, n) {
                var r = n.baseMutations.map((function(e) {
                    return ne(t.ui, e);
                })), i = n.mutations.map((function(e) {
                    return ne(t.ui, e);
                }));
                return new rr(e, n.batchId, n.Ws.toMillis(), r, i);
            }(i.serializer, i.userId, a), h = [], f = new Y((function(t, e) {
                return m(t.N(), e.N());
            })), l = 0, p = r; l < p.length; l++) {
                var y = p[l], v = ir.key(i.userId, y.key.path, u);
                f = f.add(y.key.path.p()), h.push(s.put(c)), h.push(o.put(v, ir.PLACEHOLDER));
            }
            return f.forEach((function(e) {
                h.push(i.mn.ri(t, e));
            })), t.En((function() {
                i._o[u] = a.keys();
            })), en.nn(h).next((function() {
                return a;
            }));
        }));
    }, t.prototype.To = function(t, e) {
        var n = this;
        return Yn(t).get(e).next((function(t) {
            return t ? (d(t.userId === n.userId), An(n.serializer, t)) : null;
        }));
    }, 
    /**
     * Returns the document keys for the mutation batch with the given batchId.
     * For primary clients, this method returns `null` after
     * `removeMutationBatches()` has been called. Secondary clients return a
     * cached result until `removeCachedMutationKeys()` is invoked.
     */
    // PORTING NOTE: Multi-tab only.
    t.prototype.Eo = function(t, e) {
        var n = this;
        return this._o[e] ? en.resolve(this._o[e]) : this.To(t, e).next((function(t) {
            if (t) {
                var r = t.keys();
                return n._o[e] = r, r;
            }
            return null;
        }));
    }, t.prototype.Io = function(t, e) {
        var n = this, r = e + 1, i = IDBKeyRange.lowerBound([ this.userId, r ]), o = null;
        return Yn(t).Ii({
            index: rr.userMutationsIndex,
            range: i
        }, (function(t, e, i) {
            e.userId === n.userId && (d(e.batchId >= r), o = An(n.serializer, e)), i.done();
        })).next((function() {
            return o;
        }));
    }, t.prototype.Ao = function(t) {
        var e = IDBKeyRange.upperBound([ this.userId, Number.POSITIVE_INFINITY ]), n = -1;
        return Yn(t).Ii({
            index: rr.userMutationsIndex,
            range: e,
            reverse: !0
        }, (function(t, e, r) {
            n = e.batchId, r.done();
        })).next((function() {
            return n;
        }));
    }, t.prototype.Ro = function(t) {
        var e = this, n = IDBKeyRange.bound([ this.userId, -1 ], [ this.userId, Number.POSITIVE_INFINITY ]);
        return Yn(t).hi(rr.userMutationsIndex, n).next((function(t) {
            return t.map((function(t) {
                return An(e.serializer, t);
            }));
        }));
    }, t.prototype.Vn = function(t, e) {
        var n = this, r = ir.prefixForPath(this.userId, e.path), i = IDBKeyRange.lowerBound(r), o = [];
        // Scan the document-mutation index starting with a prefix starting with
        // the given documentKey.
                return Xn(t).Ii({
            range: i
        }, (function(r, i, s) {
            var u = r[0], a = r[1], c = r[2], h = dn(a);
            // Only consider rows matching exactly the specific key of
            // interest. Note that because we order by path first, and we
            // order terminators before path separators, we'll encounter all
            // the index rows for documentKey contiguously. In particular, all
            // the rows for documentKey will occur before any rows for
            // documents nested in a subcollection beneath documentKey so we
            // can stop as soon as we hit any such row.
                        if (u === n.userId && e.path.isEqual(h)) 
            // Look up the mutation batch in the store.
            return Yn(t).get(c).next((function(t) {
                if (!t) throw p();
                d(t.userId === n.userId), o.push(An(n.serializer, t));
            }));
            s.done();
        })).next((function() {
            return o;
        }));
    }, t.prototype.vn = function(t, e) {
        var n = this, r = new Y(m), i = [];
        return e.forEach((function(e) {
            var o = ir.prefixForPath(n.userId, e.path), s = IDBKeyRange.lowerBound(o), u = Xn(t).Ii({
                range: s
            }, (function(t, i, o) {
                var s = t[0], u = t[1], a = t[2], c = dn(u);
                // Only consider rows matching exactly the specific key of
                // interest. Note that because we order by path first, and we
                // order terminators before path separators, we'll encounter all
                // the index rows for documentKey contiguously. In particular, all
                // the rows for documentKey will occur before any rows for
                // documents nested in a subcollection beneath documentKey so we
                // can stop as soon as we hit any such row.
                                s === n.userId && e.path.isEqual(c) ? r = r.add(a) : o.done();
            }));
            i.push(u);
        })), en.nn(i).next((function() {
            return n.mo(t, r);
        }));
    }, t.prototype.$n = function(t, e) {
        var n = this, r = e.path, i = r.length + 1, o = ir.prefixForPath(this.userId, r), s = IDBKeyRange.lowerBound(o), u = new Y(m);
        return Xn(t).Ii({
            range: s
        }, (function(t, e, o) {
            var s = t[0], a = t[1], c = t[2], h = dn(a);
            s === n.userId && r.D(h) ? 
            // Rows with document keys more than one segment longer than the
            // query path can't be matches. For example, a query on 'rooms'
            // can't match the document /rooms/abc/messages/xyx.
            // TODO(mcg): we'll need a different scanner when we implement
            // ancestor queries.
            h.length === i && (u = u.add(c)) : o.done();
        })).next((function() {
            return n.mo(t, u);
        }));
    }, t.prototype.mo = function(t, e) {
        var n = this, r = [], i = [];
        // TODO(rockwood): Implement this using iterate.
        return e.forEach((function(e) {
            i.push(Yn(t).get(e).next((function(t) {
                if (null === t) throw p();
                d(t.userId === n.userId), r.push(An(n.serializer, t));
            })));
        })), en.nn(i).next((function() {
            return r;
        }));
    }, t.prototype.Po = function(t, e) {
        var n = this;
        return Kn(t.er, this.userId, e).next((function(r) {
            return t.En((function() {
                n.Vo(e.batchId);
            })), en.forEach(r, (function(e) {
                return n.Fi.oo(t, e);
            }));
        }));
    }, 
    /**
     * Clears the cached keys for a mutation batch. This method should be
     * called by secondary clients after they process mutation updates.
     *
     * Note that this method does not have to be called from primary clients as
     * the corresponding cache entries are cleared when an acknowledged or
     * rejected batch is removed from the mutation queue.
     */
    // PORTING NOTE: Multi-tab only
    t.prototype.Vo = function(t) {
        delete this._o[t];
    }, t.prototype.po = function(t) {
        var e = this;
        return this.do(t).next((function(n) {
            if (!n) return en.resolve();
            // Verify that there are no entries in the documentMutations index if
            // the queue is empty.
                        var r = IDBKeyRange.lowerBound(ir.prefixForUser(e.userId)), i = [];
            return Xn(t).Ii({
                range: r
            }, (function(t, n, r) {
                if (t[0] === e.userId) {
                    var o = dn(t[1]);
                    i.push(o);
                } else r.done();
            })).next((function() {
                d(0 === i.length);
            }));
        }));
    }, t.prototype.tr = function(t, e) {
        return Hn(t, this.userId, e);
    }, 
    // PORTING NOTE: Multi-tab only (state is held in memory in other clients).
    /** Returns the mutation queue's metadata from IndexedDb. */
    t.prototype.yo = function(t) {
        var e = this;
        return $n(t).get(this.userId).next((function(t) {
            return t || new nr(e.userId, -1, 
            /*lastStreamToken=*/ "");
        }));
    }, t;
}();

/**
 * @return true if the mutation queue for the given user contains a pending
 *         mutation for the given key.
 */ function Hn(t, e, n) {
    var r = ir.prefixForPath(e, n.path), i = r[1], o = IDBKeyRange.lowerBound(r), s = !1;
    return Xn(t).Ii({
        range: o,
        Zi: !0
    }, (function(t, n, r) {
        var o = t[0], u = t[1];
        t[2];
        o === e && u === i && (s = !0), r.done();
    })).next((function() {
        return s;
    }));
}

function Kn(t, e, n) {
    var r = t.store(rr.store), i = t.store(ir.store), o = [], s = IDBKeyRange.only(n.batchId), u = 0, a = r.Ii({
        range: s
    }, (function(t, e, n) {
        return u++, n.delete();
    }));
    o.push(a.next((function() {
        d(1 === u);
    })));
    for (var c = [], h = 0, f = n.mutations; h < f.length; h++) {
        var l = f[h], p = ir.key(e, l.key.path, n.batchId);
        o.push(i.delete(p)), c.push(l.key);
    }
    return en.nn(o).next((function() {
        return c;
    }));
}

/**
 * Helper to get a typed SimpleDbStore for the mutations object store.
 */ function Yn(t) {
    return jn.ai(t, rr.store);
}

/**
 * Helper to get a typed SimpleDbStore for the mutationQueues object store.
 */ function Xn(t) {
    return jn.ai(t, ir.store);
}

/**
 * Helper to get a typed SimpleDbStore for the mutationQueues object store.
 */ function $n(t) {
    return jn.ai(t, nr.store);
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Schema Version for the Web client:
 * 1.  Initial version including Mutation Queue, Query Cache, and Remote
 *     Document Cache
 * 2.  Used to ensure a targetGlobal object exists and add targetCount to it. No
 *     longer required because migration 3 unconditionally clears it.
 * 3.  Dropped and re-created Query Cache to deal with cache corruption related
 *     to limbo resolution. Addresses
 *     https://github.com/firebase/firebase-ios-sdk/issues/1548
 * 4.  Multi-Tab Support.
 * 5.  Removal of held write acks.
 * 6.  Create document global for tracking document cache size.
 * 7.  Ensure every cached document has a sentinel row with a sequence number.
 * 8.  Add collection-parent index for Collection Group queries.
 * 9.  Change RemoteDocumentChanges store to be keyed by readTime rather than
 *     an auto-incrementing ID. This is required for Index-Free queries.
 * 10. Rewrite the canonical IDs to the explicit Protobuf-based format.
 */ var Jn = 10, Zn = /** @class */ function() {
    function t(t) {
        this.serializer = t;
    }
    /**
     * Performs database creation and schema upgrades.
     *
     * Note that in production, this method is only ever used to upgrade the schema
     * to SCHEMA_VERSION. Different values of toVersion are only used for testing
     * and local feature development.
     */    return t.prototype.createOrUpgrade = function(t, e, n, r) {
        var i = this;
        d(n < r && n >= 0 && r <= Jn);
        var o = new _r(e);
        n < 1 && r >= 1 && (function(t) {
            t.createObjectStore(er.store);
        }(t), function(t) {
            t.createObjectStore(nr.store, {
                keyPath: nr.keyPath
            }), t.createObjectStore(rr.store, {
                keyPath: rr.keyPath,
                autoIncrement: !0
            }).createIndex(rr.userMutationsIndex, rr.userMutationsKeyPath, {
                unique: !0
            }), t.createObjectStore(ir.store);
        }(t), pr(t), function(t) {
            t.createObjectStore(ur.store);
        }(t));
        // Migration 2 to populate the targetGlobal object no longer needed since
        // migration 3 unconditionally clears it.
        var s = en.resolve();
        return n < 3 && r >= 3 && (
        // Brand new clients don't need to drop and recreate--only clients that
        // potentially have corrupt data.
        0 !== n && (function(t) {
            t.deleteObjectStore(hr.store), t.deleteObjectStore(cr.store), t.deleteObjectStore(fr.store);
        }(t), pr(t)), s = s.next((function() {
            /**
     * Creates the target global singleton row.
     *
     * @param {IDBTransaction} txn The version upgrade transaction for indexeddb
     */
            return function(t) {
                var e = t.store(fr.store), n = new fr(
                /*highestTargetId=*/ 0, 
                /*lastListenSequenceNumber=*/ 0, k.min().R(), 
                /*targetCount=*/ 0);
                return e.put(fr.key, n);
            }(o);
        }))), n < 4 && r >= 4 && (0 !== n && (
        // Schema version 3 uses auto-generated keys to generate globally unique
        // mutation batch IDs (this was previously ensured internally by the
        // client). To migrate to the new schema, we have to read all mutations
        // and write them back out. We preserve the existing batch IDs to guarantee
        // consistency with other object stores. Any further mutation batch IDs will
        // be auto-generated.
        s = s.next((function() {
            return function(t, e) {
                return e.store(rr.store).hi().next((function(n) {
                    t.deleteObjectStore(rr.store), t.createObjectStore(rr.store, {
                        keyPath: rr.keyPath,
                        autoIncrement: !0
                    }).createIndex(rr.userMutationsIndex, rr.userMutationsKeyPath, {
                        unique: !0
                    });
                    var r = e.store(rr.store), i = n.map((function(t) {
                        return r.put(t);
                    }));
                    return en.nn(i);
                }));
            }(t, o);
        }))), s = s.next((function() {
            !function(t) {
                t.createObjectStore(dr.store, {
                    keyPath: dr.keyPath
                });
            }(t);
        }))), n < 5 && r >= 5 && (s = s.next((function() {
            return i.removeAcknowledgedMutations(o);
        }))), n < 6 && r >= 6 && (s = s.next((function() {
            return function(t) {
                t.createObjectStore(ar.store);
            }(t), i.addDocumentGlobal(o);
        }))), n < 7 && r >= 7 && (s = s.next((function() {
            return i.ensureSequenceNumbers(o);
        }))), n < 8 && r >= 8 && (s = s.next((function() {
            return i.createCollectionParentIndex(t, o);
        }))), n < 9 && r >= 9 && (s = s.next((function() {
            // Multi-Tab used to manage its own changelog, but this has been moved
            // to the DbRemoteDocument object store itself. Since the previous change
            // log only contained transient data, we can drop its object store.
            !function(t) {
                t.objectStoreNames.contains("remoteDocumentChanges") && t.deleteObjectStore("remoteDocumentChanges");
            }(t), function(t) {
                var e = t.objectStore(ur.store);
                e.createIndex(ur.readTimeIndex, ur.readTimeIndexPath, {
                    unique: !1
                }), e.createIndex(ur.collectionReadTimeIndex, ur.collectionReadTimeIndexPath, {
                    unique: !1
                });
            }(e);
        }))), n < 10 && r >= 10 && (s = s.next((function() {
            return i.rewriteCanonicalIds(o);
        }))), s;
    }, t.prototype.addDocumentGlobal = function(t) {
        var e = 0;
        return t.store(ur.store).Ii((function(t, n) {
            e += On(n);
        })).next((function() {
            var n = new ar(e);
            return t.store(ar.store).put(ar.key, n);
        }));
    }, t.prototype.removeAcknowledgedMutations = function(t) {
        var e = this, n = t.store(nr.store), r = t.store(rr.store);
        return n.hi().next((function(n) {
            return en.forEach(n, (function(n) {
                var i = IDBKeyRange.bound([ n.userId, -1 ], [ n.userId, n.lastAcknowledgedBatchId ]);
                return r.hi(rr.userMutationsIndex, i).next((function(r) {
                    return en.forEach(r, (function(r) {
                        d(r.userId === n.userId);
                        var i = An(e.serializer, r);
                        return Kn(t, n.userId, i).next((function() {}));
                    }));
                }));
            }));
        }));
    }, 
    /**
     * Ensures that every document in the remote document cache has a corresponding sentinel row
     * with a sequence number. Missing rows are given the most recently used sequence number.
     */
    t.prototype.ensureSequenceNumbers = function(t) {
        var e = t.store(hr.store), n = t.store(ur.store);
        return t.store(fr.store).get(fr.key).next((function(t) {
            var r = [];
            return n.Ii((function(n, i) {
                var o = new R(n), s = function(t) {
                    return [ 0, fn(t) ];
                }(o);
                r.push(e.get(s).next((function(n) {
                    return n ? en.resolve() : function(n) {
                        return e.put(new hr(0, fn(n), t.highestListenSequenceNumber));
                    }(o);
                })));
            })).next((function() {
                return en.nn(r);
            }));
        }));
    }, t.prototype.createCollectionParentIndex = function(t, e) {
        // Create the index.
        t.createObjectStore(lr.store, {
            keyPath: lr.keyPath
        });
        var n = e.store(lr.store), r = new vn, i = function(t) {
            if (r.add(t)) {
                var e = t.S(), i = t.p();
                return n.put({
                    collectionId: e,
                    parent: fn(i)
                });
            }
        };
        // Helper to add an index entry iff we haven't already written it.
        // Index existing remote documents.
                return e.store(ur.store).Ii({
            Zi: !0
        }, (function(t, e) {
            var n = new R(t);
            return i(n.p());
        })).next((function() {
            return e.store(ir.store).Ii({
                Zi: !0
            }, (function(t, e) {
                t[0];
                var n = t[1], r = (t[2], dn(n));
                return i(r.p());
            }));
        }));
    }, t.prototype.rewriteCanonicalIds = function(t) {
        var e = this, n = t.store(cr.store);
        return n.Ii((function(t, r) {
            var i = xn(r), o = Sn(e.serializer, i);
            return n.put(o);
        }));
    }, t;
}(), tr = function(t, e) {
    this.seconds = t, this.nanoseconds = e;
}, er = function(t, 
/** Whether to allow shared access from multiple tabs. */
e, n) {
    this.ownerId = t, this.allowTabSynchronization = e, this.leaseTimestampMs = n;
};

/** Performs database creation and schema upgrades. */
/**
 * Name of the IndexedDb object store.
 *
 * Note that the name 'owner' is chosen to ensure backwards compatibility with
 * older clients that only supported single locked access to the persistence
 * layer.
 */
er.store = "owner", 
/**
     * The key string used for the single object that exists in the
     * DbPrimaryClient store.
     */
er.key = "owner";

var nr = function(
/**
     * The normalized user ID to which this queue belongs.
     */
t, 
/**
     * An identifier for the highest numbered batch that has been acknowledged
     * by the server. All MutationBatches in this queue with batchIds less
     * than or equal to this value are considered to have been acknowledged by
     * the server.
     *
     * NOTE: this is deprecated and no longer used by the code.
     */
e, 
/**
     * A stream token that was previously sent by the server.
     *
     * See StreamingWriteRequest in datastore.proto for more details about
     * usage.
     *
     * After sending this token, earlier tokens may not be used anymore so
     * only a single stream token is retained.
     *
     * NOTE: this is deprecated and no longer used by the code.
     */
n) {
    this.userId = t, this.lastAcknowledgedBatchId = e, this.lastStreamToken = n;
};

/** Name of the IndexedDb object store.  */ nr.store = "mutationQueues", 
/** Keys are automatically assigned via the userId property. */
nr.keyPath = "userId";

/**
 * An object to be stored in the 'mutations' store in IndexedDb.
 *
 * Represents a batch of user-level mutations intended to be sent to the server
 * in a single write. Each user-level batch gets a separate DbMutationBatch
 * with a new batchId.
 */
var rr = function(
/**
     * The normalized user ID to which this batch belongs.
     */
t, 
/**
     * An identifier for this batch, allocated using an auto-generated key.
     */
e, 
/**
     * The local write time of the batch, stored as milliseconds since the
     * epoch.
     */
n, 
/**
     * A list of "mutations" that represent a partial base state from when this
     * write batch was initially created. During local application of the write
     * batch, these baseMutations are applied prior to the real writes in order
     * to override certain document fields from the remote document cache. This
     * is necessary in the case of non-idempotent writes (e.g. `increment()`
     * transforms) to make sure that the local view of the modified documents
     * doesn't flicker if the remote document cache receives the result of the
     * non-idempotent write before the write is removed from the queue.
     *
     * These mutations are never sent to the backend.
     */
r, 
/**
     * A list of mutations to apply. All mutations will be applied atomically.
     *
     * Mutations are serialized via toMutation().
     */
i) {
    this.userId = t, this.batchId = e, this.localWriteTimeMs = n, this.baseMutations = r, 
    this.mutations = i;
};

/** Name of the IndexedDb object store.  */ rr.store = "mutations", 
/** Keys are automatically assigned via the userId, batchId properties. */
rr.keyPath = "batchId", 
/** The index name for lookup of mutations by user. */
rr.userMutationsIndex = "userMutationsIndex", 
/** The user mutations index is keyed by [userId, batchId] pairs. */
rr.userMutationsKeyPath = [ "userId", "batchId" ];

var ir = /** @class */ function() {
    function t() {}
    /**
     * Creates a [userId] key for use in the DbDocumentMutations index to iterate
     * over all of a user's document mutations.
     */    return t.prefixForUser = function(t) {
        return [ t ];
    }, 
    /**
     * Creates a [userId, encodedPath] key for use in the DbDocumentMutations
     * index to iterate over all at document mutations for a given path or lower.
     */
    t.prefixForPath = function(t, e) {
        return [ t, fn(e) ];
    }, 
    /**
     * Creates a full index key of [userId, encodedPath, batchId] for inserting
     * and deleting into the DbDocumentMutations index.
     */
    t.key = function(t, e, n) {
        return [ t, fn(e), n ];
    }, t;
}();

ir.store = "documentMutations", 
/**
     * Because we store all the useful information for this store in the key,
     * there is no useful information to store as the value. The raw (unencoded)
     * path cannot be stored because IndexedDb doesn't store prototype
     * information.
     */
ir.PLACEHOLDER = new ir;

var or = function(t, e) {
    this.path = t, this.readTime = e;
}, sr = function(t, e) {
    this.path = t, this.version = e;
}, ur = 
// TODO: We are currently storing full document keys almost three times
// (once as part of the primary key, once - partly - as `parentPath` and once
// inside the encoded documents). During our next migration, we should
// rewrite the primary key as parentPath + document ID which would allow us
// to drop one value.
function(
/**
     * Set to an instance of DbUnknownDocument if the data for a document is
     * not known, but it is known that a document exists at the specified
     * version (e.g. it had a successful update applied to it)
     */
t, 
/**
     * Set to an instance of a DbNoDocument if it is known that no document
     * exists.
     */
e, 
/**
     * Set to an instance of a Document if there's a cached version of the
     * document.
     */
n, 
/**
     * Documents that were written to the remote document store based on
     * a write acknowledgment are marked with `hasCommittedMutations`. These
     * documents are potentially inconsistent with the backend's copy and use
     * the write's commit version as their document version.
     */
r, 
/**
     * When the document was read from the backend. Undefined for data written
     * prior to schema version 9.
     */
i, 
/**
     * The path of the collection this document is part of. Undefined for data
     * written prior to schema version 9.
     */
o) {
    this.unknownDocument = t, this.noDocument = e, this.document = n, this.hasCommittedMutations = r, 
    this.readTime = i, this.parentPath = o;
};

/**
 * Represents a document that is known to exist but whose data is unknown.
 * Stored in IndexedDb as part of a DbRemoteDocument object.
 */ ur.store = "remoteDocuments", 
/**
     * An index that provides access to all entries sorted by read time (which
     * corresponds to the last modification time of each row).
     *
     * This index is used to provide a changelog for Multi-Tab.
     */
ur.readTimeIndex = "readTimeIndex", ur.readTimeIndexPath = "readTime", 
/**
     * An index that provides access to documents in a collection sorted by read
     * time.
     *
     * This index is used to allow the RemoteDocumentCache to fetch newly changed
     * documents in a collection.
     */
ur.collectionReadTimeIndex = "collectionReadTimeIndex", ur.collectionReadTimeIndexPath = [ "parentPath", "readTime" ];

/**
 * Contains a single entry that has metadata about the remote document cache.
 */
var ar = 
/**
     * @param byteSize Approximately the total size in bytes of all the documents in the document
     * cache.
     */
function(t) {
    this.byteSize = t;
};

ar.store = "remoteDocumentGlobal", ar.key = "remoteDocumentGlobalKey";

var cr = function(
/**
     * An auto-generated sequential numeric identifier for the query.
     *
     * Queries are stored using their canonicalId as the key, but these
     * canonicalIds can be quite long so we additionally assign a unique
     * queryId which can be used by referenced data structures (e.g.
     * indexes) to minimize the on-disk cost.
     */
t, 
/**
     * The canonical string representing this query. This is not unique.
     */
e, 
/**
     * The last readTime received from the Watch Service for this query.
     *
     * This is the same value as TargetChange.read_time in the protos.
     */
n, 
/**
     * An opaque, server-assigned token that allows watching a query to be
     * resumed after disconnecting without retransmitting all the data
     * that matches the query. The resume token essentially identifies a
     * point in time from which the server should resume sending results.
     *
     * This is related to the snapshotVersion in that the resumeToken
     * effectively also encodes that value, but the resumeToken is opaque
     * and sometimes encodes additional information.
     *
     * A consequence of this is that the resumeToken should be used when
     * asking the server to reason about where this client is in the watch
     * stream, but the client should use the snapshotVersion for its own
     * purposes.
     *
     * This is the same value as TargetChange.resume_token in the protos.
     */
r, 
/**
     * A sequence number representing the last time this query was
     * listened to, used for garbage collection purposes.
     *
     * Conventionally this would be a timestamp value, but device-local
     * clocks are unreliable and they must be able to create new listens
     * even while disconnected. Instead this should be a monotonically
     * increasing number that's incremented on each listen call.
     *
     * This is different from the queryId since the queryId is an
     * immutable identifier assigned to the Query on first use while
     * lastListenSequenceNumber is updated every time the query is
     * listened to.
     */
i, 
/**
     * Denotes the maximum snapshot version at which the associated query view
     * contained no limbo documents.  Undefined for data written prior to
     * schema version 9.
     */
o, 
/**
     * The query for this target.
     *
     * Because canonical ids are not unique we must store the actual query. We
     * use the proto to have an object we can persist without having to
     * duplicate translation logic to and from a `Query` object.
     */
s) {
    this.targetId = t, this.canonicalId = e, this.readTime = n, this.resumeToken = r, 
    this.lastListenSequenceNumber = i, this.lastLimboFreeSnapshotVersion = o, this.query = s;
};

cr.store = "targets", 
/** Keys are automatically assigned via the targetId property. */
cr.keyPath = "targetId", 
/** The name of the queryTargets index. */
cr.queryTargetsIndexName = "queryTargetsIndex", 
/**
     * The index of all canonicalIds to the targets that they match. This is not
     * a unique mapping because canonicalId does not promise a unique name for all
     * possible queries, so we append the targetId to make the mapping unique.
     */
cr.queryTargetsKeyPath = [ "canonicalId", "targetId" ];

/**
 * An object representing an association between a target and a document, or a
 * sentinel row marking the last sequence number at which a document was used.
 * Each document cached must have a corresponding sentinel row before lru
 * garbage collection is enabled.
 *
 * The target associations and sentinel rows are co-located so that orphaned
 * documents and their sequence numbers can be identified efficiently via a scan
 * of this store.
 */
var hr = function(
/**
     * The targetId identifying a target or 0 for a sentinel row.
     */
t, 
/**
     * The path to the document, as encoded in the key.
     */
e, 
/**
     * If this is a sentinel row, this should be the sequence number of the last
     * time the document specified by `path` was used. Otherwise, it should be
     * `undefined`.
     */
n) {
    this.targetId = t, this.path = e, this.sequenceNumber = n;
};

/** Name of the IndexedDb object store.  */ hr.store = "targetDocuments", 
/** Keys are automatically assigned via the targetId, path properties. */
hr.keyPath = [ "targetId", "path" ], 
/** The index name for the reverse index. */
hr.documentTargetsIndex = "documentTargetsIndex", 
/** We also need to create the reverse index for these properties. */
hr.documentTargetsKeyPath = [ "path", "targetId" ];

/**
 * A record of global state tracked across all Targets, tracked separately
 * to avoid the need for extra indexes.
 *
 * This should be kept in-sync with the proto used in the iOS client.
 */
var fr = function(
/**
     * The highest numbered target id across all targets.
     *
     * See DbTarget.targetId.
     */
t, 
/**
     * The highest numbered lastListenSequenceNumber across all targets.
     *
     * See DbTarget.lastListenSequenceNumber.
     */
e, 
/**
     * A global snapshot version representing the last consistent snapshot we
     * received from the backend. This is monotonically increasing and any
     * snapshots received from the backend prior to this version (e.g. for
     * targets resumed with a resumeToken) should be suppressed (buffered)
     * until the backend has caught up to this snapshot version again. This
     * prevents our cache from ever going backwards in time.
     */
n, 
/**
     * The number of targets persisted.
     */
r) {
    this.highestTargetId = t, this.highestListenSequenceNumber = e, this.lastRemoteSnapshotVersion = n, 
    this.targetCount = r;
};

/**
 * The key string used for the single object that exists in the
 * DbTargetGlobal store.
 */ fr.key = "targetGlobalKey", fr.store = "targetGlobal";

/**
 * An object representing an association between a Collection id (e.g. 'messages')
 * to a parent path (e.g. '/chats/123') that contains it as a (sub)collection.
 * This is used to efficiently find all collections to query when performing
 * a Collection Group query.
 */
var lr = function(
/**
     * The collectionId (e.g. 'messages')
     */
t, 
/**
     * The path to the parent (either a document location or an empty path for
     * a root-level collection).
     */
e) {
    this.collectionId = t, this.parent = e;
};

/** Name of the IndexedDb object store. */ function pr(t) {
    t.createObjectStore(hr.store, {
        keyPath: hr.keyPath
    }).createIndex(hr.documentTargetsIndex, hr.documentTargetsKeyPath, {
        unique: !0
    }), 
    // NOTE: This is unique only because the TargetId is the suffix.
    t.createObjectStore(cr.store, {
        keyPath: cr.keyPath
    }).createIndex(cr.queryTargetsIndexName, cr.queryTargetsKeyPath, {
        unique: !0
    }), t.createObjectStore(fr.store);
}

lr.store = "collectionParents", 
/** Keys are automatically assigned via the collectionId, parent properties. */
lr.keyPath = [ "collectionId", "parent" ];

var dr = function(
// Note: Previous schema versions included a field
// "lastProcessedDocumentChangeId". Don't use anymore.
/** The auto-generated client id assigned at client startup. */
t, 
/** The last time this state was updated. */
e, 
/** Whether the client's network connection is enabled. */
n, 
/** Whether this client is running in a foreground tab. */
r) {
    this.clientId = t, this.updateTimeMs = e, this.networkEnabled = n, this.inForeground = r;
};

/** Name of the IndexedDb object store. */ dr.store = "clientMetadata", 
/** Keys are automatically assigned via the clientId properties. */
dr.keyPath = "clientId";

var yr = e.__spreadArrays(e.__spreadArrays(e.__spreadArrays([ nr.store, rr.store, ir.store, ur.store, cr.store, er.store, fr.store, hr.store ], [ dr.store ]), [ ar.store ]), [ lr.store ]), vr = /** @class */ function() {
    function t(e) {
        this.db = e, 
        // NOTE: According to https://bugs.webkit.org/show_bug.cgi?id=197050, the
        // bug we're checking for should exist in iOS >= 12.2 and < 13, but for
        // whatever reason it's much harder to hit after 12.2 so we only proactively
        // log on 12.2.
        12.2 === t.bo(i.getUA()) && f("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")
        /**
     * Opens the specified database, creating or upgrading it if necessary.
     *
     * Note that `version` must not be a downgrade. IndexedDB does not support downgrading the schema
     * version. We currently do not support any way to do versioning outside of IndexedDB's versioning
     * mechanism, as only version-upgrade transactions are allowed to do things like create
     * objectstores.
     */;
    }
    return t.Ir = function(e, n, r) {
        return h("SimpleDb", "Opening database:", e), new en((function(i, o) {
            // TODO(mikelehen): Investigate browser compatibility.
            // https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
            // suggests IE9 and older WebKit browsers handle upgrade
            // differently. They expect setVersion, as described here:
            // https://developer.mozilla.org/en-US/docs/Web/API/IDBVersionChangeRequest/setVersion
            var s = indexedDB.open(e, n);
            s.onsuccess = function(e) {
                var n = e.target.result;
                i(new t(n));
            }, s.onblocked = function() {
                o(new S(x.FAILED_PRECONDITION, "Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."));
            }, s.onerror = function(t) {
                var e = t.target.error;
                "VersionError" === e.name ? o(new S(x.FAILED_PRECONDITION, "A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")) : o(e);
            }, s.onupgradeneeded = function(t) {
                h("SimpleDb", 'Database "' + e + '" requires upgrade from version:', t.oldVersion);
                var n = t.target.result;
                r.createOrUpgrade(n, s.transaction, t.oldVersion, Jn).next((function() {
                    h("SimpleDb", "Database upgrade to version " + Jn + " complete");
                }));
            };
        })).en();
    }, 
    /** Deletes the specified database. */ t.delete = function(t) {
        return h("SimpleDb", "Removing database:", t), Ir(window.indexedDB.deleteDatabase(t)).en();
    }, 
    /** Returns true if IndexedDB is available in the current environment. */ t._r = function() {
        if ("undefined" == typeof indexedDB) return !1;
        if (t.vo()) return !0;
        // We extensively use indexed array values and compound keys,
        // which IE and Edge do not support. However, they still have indexedDB
        // defined on the window, so we need to check for them here and make sure
        // to return that persistence is not enabled for those browsers.
        // For tracking support of this feature, see here:
        // https://developer.microsoft.com/en-us/microsoft-edge/platform/status/indexeddbarraysandmultientrysupport/
        // Check the UA string to find out the browser.
                var e = i.getUA(), n = t.bo(e), r = 0 < n && n < 10, o = t.So(e), s = 0 < o && o < 4.5;
        // IE 10
        // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
        // IE 11
        // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
        // Edge
        // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML,
        // like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
        // iOS Safari: Disable for users running iOS version < 10.
                return !(e.indexOf("MSIE ") > 0 || e.indexOf("Trident/") > 0 || e.indexOf("Edge/") > 0 || r || s);
    }, 
    /**
     * Returns true if the backing IndexedDB store is the Node IndexedDBShim
     * (see https://github.com/axemclion/IndexedDBShim).
     */
    t.vo = function() {
        var t;
        return "undefined" != typeof __PRIVATE_process && "YES" === (null === (t = __PRIVATE_process.__PRIVATE_env) || void 0 === t ? void 0 : t.Do);
    }, 
    /** Helper to get a typed SimpleDbStore from a transaction. */ t.ai = function(t, e) {
        return t.store(e);
    }, 
    // visible for testing
    /** Parse User Agent to determine iOS version. Returns -1 if not found. */
    t.bo = function(t) {
        var e = t.match(/i(?:phone|pad|pod) os ([\d_]+)/i), n = e ? e[1].split("_").slice(0, 2).join(".") : "-1";
        return Number(n);
    }, 
    // visible for testing
    /** Parse User Agent to determine Android version. Returns -1 if not found. */
    t.So = function(t) {
        var e = t.match(/Android ([\d.]+)/i), n = e ? e[1].split(".").slice(0, 2).join(".") : "-1";
        return Number(n);
    }, t.prototype.br = function(t) {
        this.db.onversionchange = function(e) {
            return t(e);
        };
    }, t.prototype.runTransaction = function(t, n, r) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var i, o, s, u, a;
            return e.__generator(this, (function(c) {
                switch (c.label) {
                  case 0:
                    i = "readonly" === t, o = 0, s = function() {
                        var t, s, a, c, f;
                        return e.__generator(this, (function(e) {
                            switch (e.label) {
                              case 0:
                                ++o, t = _r.open(u.db, i ? "readonly" : "readwrite", n), e.label = 1;

                              case 1:
                                // Wait for the transaction to complete (i.e. IndexedDb's onsuccess event to
                                // fire), but still return the original transactionFnResult back to the
                                // caller.
                                return e.trys.push([ 1, 3, , 4 ]), s = r(t).catch((function(e) {
                                    // Abort the transaction if there was an error.
                                    return t.abort(e), en.reject(e);
                                })).en(), a = {}, s.catch((function() {})), [ 4 /*yield*/ , t.Co ];

                              case 2:
                                return [ 2 /*return*/ , (a.value = (
                                // Wait for the transaction to complete (i.e. IndexedDb's onsuccess event to
                                // fire), but still return the original transactionFnResult back to the
                                // caller.
                                e.sent(), s), a) ];

                              case 3:
                                return c = e.sent(), f = "FirebaseError" !== c.name && o < 3, h("SimpleDb", "Transaction failed with error: %s. Retrying: %s.", c.message, f), 
                                f ? [ 3 /*break*/ , 4 ] : [ 2 /*return*/ , {
                                    value: Promise.reject(c)
                                } ];

                              case 4:
                                return [ 2 /*return*/ ];
                            }
                        }));
                    }, u = this, c.label = 1;

                  case 1:
                    return [ 5 /*yield**/ , s() ];

                  case 2:
                    if ("object" == typeof (a = c.sent())) return [ 2 /*return*/ , a.value ];
                    c.label = 3;

                  case 3:
                    return [ 3 /*break*/ , 1 ];

                  case 4:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.close = function() {
        this.db.close();
    }, t;
}(), gr = /** @class */ function() {
    function t(t) {
        this.Fo = t, this.No = !1, this.$o = null;
    }
    return Object.defineProperty(t.prototype, "Js", {
        get: function() {
            return this.No;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "ko", {
        get: function() {
            return this.$o;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "cursor", {
        set: function(t) {
            this.Fo = t;
        },
        enumerable: !0,
        configurable: !0
    }), 
    /**
     * This function can be called to stop iteration at any point.
     */
    t.prototype.done = function() {
        this.No = !0;
    }, 
    /**
     * This function can be called to skip to that next key, which could be
     * an index or a primary key.
     */
    t.prototype.Ai = function(t) {
        this.$o = t;
    }, 
    /**
     * Delete the current cursor value from the object store.
     *
     * NOTE: You CANNOT do this with a keysOnly query.
     */
    t.prototype.delete = function() {
        return Ir(this.Fo.delete());
    }, t;
}(), mr = /** @class */ function(t) {
    function n(e) {
        var n = this;
        return (n = t.call(this, x.UNAVAILABLE, "IndexedDB transaction failed: " + e) || this).name = "IndexedDbTransactionError", 
        n;
    }
    return e.__extends(n, t), n;
}(S);

// V2 is no longer usable (see comment at top of file)
// Visible for testing
/**
 * Provides a wrapper around IndexedDb with a simplified interface that uses
 * Promise-like return values to chain operations. Real promises cannot be used
 * since .then() continuations are executed asynchronously (e.g. via
 * .setImmediate), which would cause IndexedDB to end the transaction.
 * See PersistencePromise for more details.
 */
/** Verifies whether `e` is an IndexedDbTransactionError. */ function wr(t) {
    // Use name equality, as instanceof checks on errors don't work with errors
    // that wrap other errors.
    return "IndexedDbTransactionError" === t.name;
}

/**
 * Wraps an IDBTransaction and exposes a store() method to get a handle to a
 * specific object store.
 */ var _r = /** @class */ function() {
    function t(t) {
        var e = this;
        this.transaction = t, this.aborted = !1, 
        /**
             * A promise that resolves with the result of the IndexedDb transaction.
             */
        this.xo = new cn, this.transaction.oncomplete = function() {
            e.xo.resolve();
        }, this.transaction.onabort = function() {
            t.error ? e.xo.reject(new mr(t.error)) : e.xo.resolve();
        }, this.transaction.onerror = function(t) {
            var n = Tr(t.target.error);
            e.xo.reject(new mr(n));
        };
    }
    return t.open = function(e, n, r) {
        return new t(e.transaction(r, n));
    }, Object.defineProperty(t.prototype, "Co", {
        get: function() {
            return this.xo.promise;
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.abort = function(t) {
        t && this.xo.reject(t), this.aborted || (h("SimpleDb", "Aborting transaction:", t ? t.message : "Client-initiated abort"), 
        this.aborted = !0, this.transaction.abort());
    }, 
    /**
     * Returns a SimpleDbStore<KeyType, ValueType> for the specified store. All
     * operations performed on the SimpleDbStore happen within the context of this
     * transaction and it cannot be used anymore once the transaction is
     * completed.
     *
     * Note that we can't actually enforce that the KeyType and ValueType are
     * correct, but they allow type safety through the rest of the consuming code.
     */
    t.prototype.store = function(t) {
        var e = this.transaction.objectStore(t);
        return new br(e);
    }, t;
}(), br = /** @class */ function() {
    function t(t) {
        this.store = t;
    }
    return t.prototype.put = function(t, e) {
        var n;
        return void 0 !== e ? (h("SimpleDb", "PUT", this.store.name, t, e), n = this.store.put(e, t)) : (h("SimpleDb", "PUT", this.store.name, "<auto-key>", t), 
        n = this.store.put(t)), Ir(n);
    }, 
    /**
     * Adds a new value into an Object Store and returns the new key. Similar to
     * IndexedDb's `add()`, this method will fail on primary key collisions.
     *
     * @param value The object to write.
     * @return The key of the value to add.
     */
    t.prototype.add = function(t) {
        return h("SimpleDb", "ADD", this.store.name, t, t), Ir(this.store.add(t));
    }, 
    /**
     * Gets the object with the specified key from the specified store, or null
     * if no object exists with the specified key.
     *
     * @key The key of the object to get.
     * @return The object with the specified key or null if no object exists.
     */
    t.prototype.get = function(t) {
        var e = this;
        // We're doing an unsafe cast to ValueType.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return Ir(this.store.get(t)).next((function(n) {
            // Normalize nonexistence to null.
            return void 0 === n && (n = null), h("SimpleDb", "GET", e.store.name, t, n), n;
        }));
    }, t.prototype.delete = function(t) {
        return h("SimpleDb", "DELETE", this.store.name, t), Ir(this.store.delete(t));
    }, 
    /**
     * If we ever need more of the count variants, we can add overloads. For now,
     * all we need is to count everything in a store.
     *
     * Returns the number of rows in the store.
     */
    t.prototype.count = function() {
        return h("SimpleDb", "COUNT", this.store.name), Ir(this.store.count());
    }, t.prototype.hi = function(t, e) {
        var n = this.cursor(this.options(t, e)), r = [];
        return this.Mo(n, (function(t, e) {
            r.push(e);
        })).next((function() {
            return r;
        }));
    }, t.prototype.Lo = function(t, e) {
        h("SimpleDb", "DELETE ALL", this.store.name);
        var n = this.options(t, e);
        n.Zi = !1;
        var r = this.cursor(n);
        return this.Mo(r, (function(t, e, n) {
            return n.delete();
        }));
    }, t.prototype.Ii = function(t, e) {
        var n;
        e ? n = t : (n = {}, e = t);
        var r = this.cursor(n);
        return this.Mo(r, e);
    }, 
    /**
     * Iterates over a store, but waits for the given callback to complete for
     * each entry before iterating the next entry. This allows the callback to do
     * asynchronous work to determine if this iteration should continue.
     *
     * The provided callback should return `true` to continue iteration, and
     * `false` otherwise.
     */
    t.prototype.ao = function(t) {
        var e = this.cursor({});
        return new en((function(n, r) {
            e.onerror = function(t) {
                var e = Tr(t.target.error);
                r(e);
            }, e.onsuccess = function(e) {
                var r = e.target.result;
                r ? t(r.primaryKey, r.value).next((function(t) {
                    t ? r.continue() : n();
                })) : n();
            };
        }));
    }, t.prototype.Mo = function(t, e) {
        var n = [];
        return new en((function(r, i) {
            t.onerror = function(t) {
                i(t.target.error);
            }, t.onsuccess = function(t) {
                var i = t.target.result;
                if (i) {
                    var o = new gr(i), s = e(i.primaryKey, i.value, o);
                    if (s instanceof en) {
                        var u = s.catch((function(t) {
                            return o.done(), en.reject(t);
                        }));
                        n.push(u);
                    }
                    o.Js ? r() : null === o.ko ? i.continue() : i.continue(o.ko);
                } else r();
            };
        })).next((function() {
            return en.nn(n);
        }));
    }, t.prototype.options = function(t, e) {
        var n = void 0;
        return void 0 !== t && ("string" == typeof t ? n = t : e = t), {
            index: n,
            range: e
        };
    }, t.prototype.cursor = function(t) {
        var e = "next";
        if (t.reverse && (e = "prev"), t.index) {
            var n = this.store.index(t.index);
            return t.Zi ? n.openKeyCursor(t.range, e) : n.openCursor(t.range, e);
        }
        return this.store.openCursor(t.range, e);
    }, t;
}();

/**
 * A wrapper around an IDBObjectStore providing an API that:
 *
 * 1) Has generic KeyType / ValueType parameters to provide strongly-typed
 * methods for acting against the object store.
 * 2) Deals with IndexedDB's onsuccess / onerror event callbacks, making every
 * method return a PersistencePromise instead.
 * 3) Provides a higher-level API to avoid needing to do excessive wrapping of
 * intermediate IndexedDB types (IDBCursorWithValue, etc.)
 */
/**
 * Wraps an IDBRequest in a PersistencePromise, using the onsuccess / onerror
 * handlers to resolve / reject the PersistencePromise as appropriate.
 */
function Ir(t) {
    return new en((function(e, n) {
        t.onsuccess = function(t) {
            var n = t.target.result;
            e(n);
        }, t.onerror = function(t) {
            var e = Tr(t.target.error);
            n(e);
        };
    }));
}

// Guard so we only report the error once.
var Er = !1;

function Tr(t) {
    var e = vr.bo(i.getUA());
    if (e >= 12.2 && e < 13) {
        var n = "An internal error was encountered in the Indexed Database server";
        if (t.message.indexOf(n) >= 0) {
            // Wrap error in a more descriptive one.
            var r = new S("internal", "IOS_INDEXEDDB_BUG1: IndexedDb has thrown '" + n + "'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.");
            return Er || (Er = !0, 
            // Throw a global exception outside of this promise chain, for the user to
            // potentially catch.
            setTimeout((function() {
                throw r;
            }), 0)), r;
        }
    }
    return t;
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** The Platform's 'window' implementation or null if not available. */ function Nr() {
    // `window` is not always available, e.g. in ReactNative and WebWorkers.
    // eslint-disable-next-line no-restricted-globals
    return "undefined" != typeof window ? window : null;
}

/** The Platform's 'document' implementation or null if not available. */
/**
 * Represents an operation scheduled to be run in the future on an AsyncQueue.
 *
 * It is created via DelayedOperation.createAndSchedule().
 *
 * Supports cancellation (via cancel()) and early execution (via skipDelay()).
 *
 * Note: We implement `PromiseLike` instead of `Promise`, as the `Promise` type
 * in newer versions of TypeScript defines `finally`, which is not available in
 * IE.
 */ var Ar = /** @class */ function() {
    function t(t, e, n, r, i) {
        this.Oo = t, this.jn = e, this.Bo = n, this.op = r, this.qo = i, this.Uo = new cn, 
        this.then = this.Uo.promise.then.bind(this.Uo.promise), 
        // It's normal for the deferred promise to be canceled (due to cancellation)
        // and so we attach a dummy catch callback to avoid
        // 'UnhandledPromiseRejectionWarning' log spam.
        this.Uo.promise.catch((function(t) {}))
        /**
     * Creates and returns a DelayedOperation that has been scheduled to be
     * executed on the provided asyncQueue after the provided delayMs.
     *
     * @param asyncQueue The queue to schedule the operation on.
     * @param id A Timer ID identifying the type of operation this is.
     * @param delayMs The delay (ms) before the operation should be scheduled.
     * @param op The operation to run.
     * @param removalCallback A callback to be called synchronously once the
     *   operation is executed or canceled, notifying the AsyncQueue to remove it
     *   from its delayedOperations list.
     *   PORTING NOTE: This exists to prevent making removeDelayedOperation() and
     *   the DelayedOperation class public.
     */;
    }
    return t.Qo = function(e, n, r, i, o) {
        var s = new t(e, n, Date.now() + r, i, o);
        return s.start(r), s;
    }, 
    /**
     * Starts the timer. This is called immediately after construction by
     * createAndSchedule().
     */
    t.prototype.start = function(t) {
        var e = this;
        this.Wo = setTimeout((function() {
            return e.jo();
        }), t);
    }, 
    /**
     * Queues the operation to run immediately (if it hasn't already been run or
     * canceled).
     */
    t.prototype.ni = function() {
        return this.jo();
    }, 
    /**
     * Cancels the operation if it hasn't already been executed or canceled. The
     * promise will be rejected.
     *
     * As long as the operation has not yet been run, calling cancel() provides a
     * guarantee that the operation will not be run.
     */
    t.prototype.cancel = function(t) {
        null !== this.Wo && (this.clearTimeout(), this.Uo.reject(new S(x.CANCELLED, "Operation cancelled" + (t ? ": " + t : ""))));
    }, t.prototype.jo = function() {
        var t = this;
        this.Oo.Sr((function() {
            return null !== t.Wo ? (t.clearTimeout(), t.op().then((function(e) {
                return t.Uo.resolve(e);
            }))) : Promise.resolve();
        }));
    }, t.prototype.clearTimeout = function() {
        null !== this.Wo && (this.qo(this), clearTimeout(this.Wo), this.Wo = null);
    }, t;
}(), xr = /** @class */ function() {
    function t() {
        var t = this;
        // The last promise in the queue.
                this.Ko = Promise.resolve(), 
        // The last retryable operation. Retryable operation are run in order and
        // retried with backoff.
        this.Go = Promise.resolve(), 
        // Is this AsyncQueue being shut down? Once it is set to true, it will not
        // be changed again.
        this.zo = !1, 
        // Operations scheduled to be queued in the future. Operations are
        // automatically removed after they are run or canceled.
        this.Ho = [], 
        // visible for testing
        this.Yo = null, 
        // Flag set while there's an outstanding AsyncQueue operation, used for
        // assertion sanity-checks.
        this.Jo = !1, 
        // List of TimerIds to fast-forward delays for.
        this.Xo = [], 
        // Backoff timer used to schedule retries for retryable operations
        this.Zo = new hn(this, "async_queue_retry" /* AsyncQueueRetry */), 
        // Visibility handler that triggers an immediate retry of all retryable
        // operations. Meant to speed up recovery when we regain file system access
        // after page comes into foreground.
        this.th = function() {
            return t.Zo.si();
        };
        var e = Nr();
        e && "function" == typeof e.addEventListener && e.addEventListener("visibilitychange", this.th);
    }
    return Object.defineProperty(t.prototype, "eh", {
        // Is this AsyncQueue being shut down? If true, this instance will not enqueue
        // any new operations, Promises from enqueue requests will not resolve.
        get: function() {
            return this.zo;
        },
        enumerable: !0,
        configurable: !0
    }), 
    /**
     * Adds a new operation to the queue without waiting for it to complete (i.e.
     * we ignore the Promise result).
     */
    t.prototype.Sr = function(t) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.enqueue(t);
    }, 
    /**
     * Regardless if the queue has initialized shutdown, adds a new operation to the
     * queue without waiting for it to complete (i.e. we ignore the Promise result).
     */
    t.prototype.sh = function(t) {
        this.nh(), 
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.ih(t);
    }, 
    /**
     * Regardless if the queue has initialized shutdown, adds a new operation to the
     * queue.
     */
    t.prototype.rh = function(t) {
        return this.nh(), this.ih(t);
    }, 
    /**
     * Adds a new operation to the queue and initialize the shut down of this queue.
     * Returns a promise that will be resolved when the promise returned by the new
     * operation is (with its value).
     * Once this method is called, the only possible way to request running an operation
     * is through `enqueueAndForgetEvenAfterShutdown`.
     */
    t.prototype.oh = function(t) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var n;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return this.nh(), this.zo ? [ 3 /*break*/ , 2 ] : (this.zo = !0, (n = Nr()) && n.removeEventListener("visibilitychange", this.th), 
                    [ 4 /*yield*/ , this.rh(t) ]);

                  case 1:
                    e.sent(), e.label = 2;

                  case 2:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * Adds a new operation to the queue. Returns a promise that will be resolved
     * when the promise returned by the new operation is (with its value).
     */
    t.prototype.enqueue = function(t) {
        return this.nh(), this.zo ? new Promise((function(t) {})) : this.ih(t);
    }, 
    /**
     * Enqueue a retryable operation.
     *
     * A retryable operation is rescheduled with backoff if it fails with a
     * IndexedDbTransactionError (the error type used by SimpleDb). All
     * retryable operations are executed in order and only run if all prior
     * operations were retried successfully.
     */
    t.prototype.Cr = function(t) {
        var n = this;
        this.nh(), this.zo || (this.Go = this.Go.then((function() {
            var r = new cn, i = function() {
                return e.__awaiter(n, void 0, void 0, (function() {
                    var n;
                    return e.__generator(this, (function(e) {
                        switch (e.label) {
                          case 0:
                            return e.trys.push([ 0, 2, , 3 ]), [ 4 /*yield*/ , t() ];

                          case 1:
                            return e.sent(), r.resolve(), this.Zo.reset(), [ 3 /*break*/ , 3 ];

                          case 2:
                            if (!wr(n = e.sent())) throw r.resolve(), n;
                            // Failure will be handled by AsyncQueue
                                                        return h("AsyncQueue", "Operation failed with retryable error: " + n), 
                            this.Zo.Zn(i), [ 3 /*break*/ , 3 ];

                          case 3:
                            return [ 2 /*return*/ ];
                        }
                    }));
                }));
            };
            return n.Sr(i), r.promise;
        })));
    }, t.prototype.ih = function(t) {
        var e = this, n = this.Ko.then((function() {
            return e.Jo = !0, t().catch((function(t) {
                // Re-throw the error so that this.tail becomes a rejected Promise and
                // all further attempts to chain (via .then) will just short-circuit
                // and return the rejected Promise.
                throw e.Yo = t, e.Jo = !1, f("INTERNAL UNHANDLED ERROR: ", 
                /**
 * Chrome includes Error.message in Error.stack. Other browsers do not.
 * This returns expected output of message + stack when available.
 * @param error Error or FirestoreError
 */
                function(t) {
                    var e = t.message || "";
                    return t.stack && (e = t.stack.includes(t.message) ? t.stack : t.message + "\n" + t.stack), 
                    e;
                }(t)), t;
            })).then((function(t) {
                return e.Jo = !1, t;
            }));
        }));
        return this.Ko = n, n;
    }, 
    /**
     * Schedules an operation to be queued on the AsyncQueue once the specified
     * `delayMs` has elapsed. The returned DelayedOperation can be used to cancel
     * or fast-forward the operation prior to its running.
     */
    t.prototype.ei = function(t, e, n) {
        var r = this;
        this.nh(), 
        // Fast-forward delays for timerIds that have been overriden.
        this.Xo.indexOf(t) > -1 && (e = 0);
        var i = Ar.Qo(this, t, e, n, (function(t) {
            return r.hh(t);
        }));
        return this.Ho.push(i), i;
    }, t.prototype.nh = function() {
        this.Yo && p();
    }, 
    /**
     * Verifies there's an operation currently in-progress on the AsyncQueue.
     * Unfortunately we can't verify that the running code is in the promise chain
     * of that operation, so this isn't a foolproof check, but it should be enough
     * to catch some bugs.
     */
    t.prototype.ah = function() {}, 
    /**
     * Waits until all currently queued tasks are finished executing. Delayed
     * operations are not run.
     */
    t.prototype.uh = function() {
        return e.__awaiter(this, void 0, void 0, (function() {
            var t;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return [ 4 /*yield*/ , t = this.Ko ];

                  case 1:
                    e.sent(), e.label = 2;

                  case 2:
                    if (t !== this.Ko) return [ 3 /*break*/ , 0 ];
                    e.label = 3;

                  case 3:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * For Tests: Determine if a delayed operation with a particular TimerId
     * exists.
     */
    t.prototype.lh = function(t) {
        for (var e = 0, n = this.Ho; e < n.length; e++) {
            if (n[e].jn === t) return !0;
        }
        return !1;
    }, 
    /**
     * For Tests: Runs some or all delayed operations early.
     *
     * @param lastTimerId Delayed operations up to and including this TimerId will
     *  be drained. Pass TimerId.All to run all delayed operations.
     * @returns a Promise that resolves once all operations have been run.
     */
    t.prototype._h = function(t) {
        var e = this;
        // Note that draining may generate more delayed ops, so we do that first.
                return this.uh().then((function() {
            // Run ops in the same order they'd run if they ran naturally.
            e.Ho.sort((function(t, e) {
                return t.Bo - e.Bo;
            }));
            for (var n = 0, r = e.Ho; n < r.length; n++) {
                var i = r[n];
                if (i.ni(), "all" /* All */ !== t && i.jn === t) break;
            }
            return e.uh();
        }));
    }, 
    /**
     * For Tests: Skip all subsequent delays for a timer id.
     */
    t.prototype.fh = function(t) {
        this.Xo.push(t);
    }, 
    /** Called once a DelayedOperation is run or canceled. */ t.prototype.hh = function(t) {
        // NOTE: indexOf / slice are O(n), but delayedOperations is expected to be small.
        var e = this.Ho.indexOf(t);
        this.Ho.splice(e, 1);
    }, t;
}();

/**
 * Returns a FirestoreError that can be surfaced to the user if the provided
 * error is an IndexedDbTransactionError. Re-throws the error otherwise.
 */
function Sr(t, e) {
    if (f("AsyncQueue", e + ": " + t), wr(t)) return new S(x.UNAVAILABLE, e + ": " + t);
    throw t;
}

function Dr(t, e) {
    var n = t[0], r = t[1], i = e[0], o = e[1], s = m(n, i);
    return 0 === s ? m(r, o) : s;
}

/**
 * Used to calculate the nth sequence number. Keeps a rolling buffer of the
 * lowest n values passed to `addElement`, and finally reports the largest of
 * them in `maxValue`.
 */ var kr = /** @class */ function() {
    function t(t) {
        this.dh = t, this.buffer = new Y(Dr), this.wh = 0;
    }
    return t.prototype.Th = function() {
        return ++this.wh;
    }, t.prototype.Eh = function(t) {
        var e = [ t, this.Th() ];
        if (this.buffer.size < this.dh) this.buffer = this.buffer.add(e); else {
            var n = this.buffer.last();
            Dr(e, n) < 0 && (this.buffer = this.buffer.delete(n).add(e));
        }
    }, Object.defineProperty(t.prototype, "maxValue", {
        get: function() {
            // Guaranteed to be non-empty. If we decide we are not collecting any
            // sequence numbers, nthSequenceNumber below short-circuits. If we have
            // decided that we are collecting n sequence numbers, it's because n is some
            // percentage of the existing sequence numbers. That means we should never
            // be in a situation where we are collecting sequence numbers but don't
            // actually have any.
            return this.buffer.last()[0];
        },
        enumerable: !0,
        configurable: !0
    }), t;
}(), Pr = {
    Ih: !1,
    Ah: 0,
    Rh: 0,
    mh: 0
}, Rr = /** @class */ function() {
    function t(
    // When we attempt to collect, we will only do so if the cache size is greater than this
    // threshold. Passing `COLLECTION_DISABLED` here will cause collection to always be skipped.
    t, 
    // The percentage of sequence numbers that we will attempt to collect
    e, 
    // A cap on the total number of sequence numbers that will be collected. This prevents
    // us from collecting a huge number of sequence numbers if the cache has grown very large.
    n) {
        this.Ph = t, this.Vh = e, this.gh = n;
    }
    return t.ph = function(e) {
        return new t(e, t.yh, t.bh);
    }, t;
}();

Rr.vh = -1, Rr.Sh = 1048576, Rr.Dh = 41943040, Rr.yh = 10, Rr.bh = 1e3, Rr.Ch = new Rr(Rr.Dh, Rr.yh, Rr.bh), 
Rr.DISABLED = new Rr(Rr.vh, 0, 0);

/**
 * This class is responsible for the scheduling of LRU garbage collection. It handles checking
 * whether or not GC is enabled, as well as which delay to use before the next run.
 */
var Or = /** @class */ function() {
    function t(t, e) {
        this.eo = t, this.Oo = e, this.Fh = !1, this.Nh = null;
    }
    return t.prototype.start = function(t) {
        this.eo.$h.Ph !== Rr.vh && this.kh(t);
    }, t.prototype.stop = function() {
        this.Nh && (this.Nh.cancel(), this.Nh = null);
    }, Object.defineProperty(t.prototype, "pr", {
        get: function() {
            return null !== this.Nh;
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.kh = function(t) {
        var n = this, r = this.Fh ? 3e5 : 6e4;
        h("LruGarbageCollector", "Garbage collection scheduled in " + r + "ms"), this.Nh = this.Oo.ei("lru_garbage_collection" /* LruGarbageCollection */ , r, (function() {
            return e.__awaiter(n, void 0, void 0, (function() {
                var n;
                return e.__generator(this, (function(e) {
                    switch (e.label) {
                      case 0:
                        this.Nh = null, this.Fh = !0, e.label = 1;

                      case 1:
                        return e.trys.push([ 1, 3, , 7 ]), [ 4 /*yield*/ , t.xh(this.eo) ];

                      case 2:
                        return e.sent(), [ 3 /*break*/ , 7 ];

                      case 3:
                        return wr(n = e.sent()) ? (h("LruGarbageCollector", "Ignoring IndexedDB error during garbage collection: ", n), 
                        [ 3 /*break*/ , 6 ]) : [ 3 /*break*/ , 4 ];

                      case 4:
                        return [ 4 /*yield*/ , Cr(n) ];

                      case 5:
                        e.sent(), e.label = 6;

                      case 6:
                        return [ 3 /*break*/ , 7 ];

                      case 7:
                        return [ 4 /*yield*/ , this.kh(t) ];

                      case 8:
                        return e.sent(), [ 2 /*return*/ ];
                    }
                }));
            }));
        }));
    }, t;
}(), Ur = /** @class */ function() {
    function t(t, e) {
        this.Mh = t, this.$h = e
        /** Given a percentile of target to collect, returns the number of targets to collect. */;
    }
    return t.prototype.Lh = function(t, e) {
        return this.Mh.so(t).next((function(t) {
            return Math.floor(e / 100 * t);
        }));
    }, 
    /** Returns the nth sequence number, counting in order from the smallest. */ t.prototype.Oh = function(t, e) {
        var n = this;
        if (0 === e) return en.resolve(an.Qn);
        var r = new kr(e);
        return this.Mh.ye(t, (function(t) {
            return r.Eh(t.sequenceNumber);
        })).next((function() {
            return n.Mh.io(t, (function(t) {
                return r.Eh(t);
            }));
        })).next((function() {
            return r.maxValue;
        }));
    }, 
    /**
     * Removes targets with a sequence number equal to or less than the given upper bound, and removes
     * document associations with those targets.
     */
    t.prototype.ji = function(t, e, n) {
        return this.Mh.ji(t, e, n);
    }, 
    /**
     * Removes documents that have a sequence number equal to or less than the upper bound and are not
     * otherwise pinned.
     */
    t.prototype.uo = function(t, e) {
        return this.Mh.uo(t, e);
    }, t.prototype.Bh = function(t, e) {
        var n = this;
        return this.$h.Ph === Rr.vh ? (h("LruGarbageCollector", "Garbage collection skipped; disabled"), 
        en.resolve(Pr)) : this.lo(t).next((function(r) {
            return r < n.$h.Ph ? (h("LruGarbageCollector", "Garbage collection skipped; Cache size " + r + " is lower than threshold " + n.$h.Ph), 
            Pr) : n.qh(t, e);
        }));
    }, t.prototype.lo = function(t) {
        return this.Mh.lo(t);
    }, t.prototype.qh = function(t, e) {
        var n, i, o, s, u, a, f, l = this, p = Date.now();
        return this.Lh(t, this.$h.Vh).next((function(e) {
            // Cap at the configured max
            return e > l.$h.gh ? (h("LruGarbageCollector", "Capping sequence numbers to collect down to the maximum of " + l.$h.gh + " from " + e), 
            i = l.$h.gh) : i = e, s = Date.now(), l.Oh(t, i);
        })).next((function(r) {
            return n = r, u = Date.now(), l.ji(t, n, e);
        })).next((function(e) {
            return o = e, a = Date.now(), l.uo(t, n);
        })).next((function(t) {
            return f = Date.now(), c() <= r.LogLevel.DEBUG && h("LruGarbageCollector", "LRU Garbage Collection\n\tCounted targets in " + (s - p) + "ms\n\tDetermined least recently used " + i + " in " + (u - s) + "ms\n\tRemoved " + o + " targets in " + (a - u) + "ms\n\tRemoved " + t + " documents in " + (f - a) + "ms\nTotal Duration: " + (f - p) + "ms"), 
            en.resolve({
                Ih: !0,
                Ah: i,
                Rh: o,
                mh: t
            });
        }));
    }, t;
}(), Lr = /** @class */ function() {
    function t(
    /** Manages our in-memory or durable persistence. */
    t, e, n) {
        this.persistence = t, this.Uh = e, 
        /**
             * Maps a targetID to data about its target.
             *
             * PORTING NOTE: We are using an immutable data structure on Web to make re-runs
             * of `applyRemoteEvent()` idempotent.
             */
        this.Qh = new W(m), 
        /** Maps a target to its targetID. */
        // TODO(wuandy): Evaluate if TargetId can be part of Target.
        this.Wh = new A((function(t) {
            return Xe(t);
        }), $e), 
        /**
             * The read time of the last entry processed by `getNewDocumentChanges()`.
             *
             * PORTING NOTE: This is only used for multi-tab synchronization.
             */
        this.jh = k.min(), this.Rn = t.zr(n), this.Kh = t.Jr(), this.Tr = t.Yr(), this.Gh = new sn(this.Kh, this.Rn, this.persistence.Xr()), 
        this.Uh.zh(this.Gh)
        /** Starts the LocalStore. */;
    }
    return t.prototype.start = function() {
        return Promise.resolve();
    }, 
    /**
     * Tells the LocalStore that the currently authenticated user has changed.
     *
     * In response the local store switches the mutation queue to the new user and
     * returns any resulting document changes.
     */
    // PORTING NOTE: Android and iOS only return the documents affected by the
    // change.
    t.prototype.Hh = function(t) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var n, r, i, o = this;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return n = this.Rn, r = this.Gh, [ 4 /*yield*/ , this.persistence.runTransaction("Handle user change", "readonly", (function(e) {
                        // Swap out the mutation queue, grabbing the pending mutation batches
                        // before and after.
                        var i;
                        return o.Rn.Ro(e).next((function(s) {
                            return i = s, n = o.persistence.zr(t), 
                            // Recreate our LocalDocumentsView using the new
                            // MutationQueue.
                            r = new sn(o.Kh, n, o.persistence.Xr()), n.Ro(e);
                        })).next((function(t) {
                            for (var n = [], o = [], s = it(), u = 0, a = i
                            // Union the old/new changed keys.
                            ; u < a.length; u++) {
                                var c = a[u];
                                n.push(c.batchId);
                                for (var h = 0, f = c.mutations; h < f.length; h++) {
                                    var l = f[h];
                                    s = s.add(l.key);
                                }
                            }
                            for (var p = 0, d = t; p < d.length; p++) {
                                var y = d[p];
                                o.push(y.batchId);
                                for (var v = 0, g = y.mutations; v < g.length; v++) {
                                    var m = g[v];
                                    s = s.add(m.key);
                                }
                            }
                            // Return the set of all (potentially) changed documents and the list
                            // of mutation batch IDs that were affected by change.
                                                        return r.yn(e, s).next((function(t) {
                                return {
                                    Yh: t,
                                    Jh: n,
                                    Xh: o
                                };
                            }));
                        }));
                    })) ];

                  case 1:
                    return i = e.sent(), [ 2 /*return*/ , (this.Rn = n, this.Gh = r, this.Uh.zh(this.Gh), 
                    i) ];
                }
            }));
        }));
    }, 
    /* Accept locally generated Mutations and commit them to storage. */ t.prototype.Zh = function(t) {
        var e, n = this, r = D.now(), i = t.reduce((function(t, e) {
            return t.add(e.key);
        }), it());
        return this.persistence.runTransaction("Locally write mutations", "readwrite", (function(o) {
            return n.Gh.yn(o, i).next((function(i) {
                e = i;
                for (
                // For non-idempotent mutations (such as `FieldValue.increment()`),
                // we record the base state in a separate patch mutation. This is
                // later used to guarantee consistent values and prevents flicker
                // even if the backend sends us an update that already includes our
                // transform.
                var s = [], u = 0, a = t; u < a.length; u++) {
                    var c = a[u], h = c.Ze(e.get(c.key));
                    null != h && 
                    // NOTE: The base state should only be applied if there's some
                    // existing document to override, so use a Precondition of
                    // exists=true
                    s.push(new Ne(c.key, h, Pe(h.proto.mapValue), Ie.exists(!0)));
                }
                return n.Rn.wo(o, r, s, t);
            }));
        })).then((function(t) {
            var n = t.Ks(e);
            return {
                batchId: t.batchId,
                on: n
            };
        }));
    }, 
    /**
     * Acknowledge the given batch.
     *
     * On the happy path when a batch is acknowledged, the local store will
     *
     *  + remove the batch from the mutation queue;
     *  + apply the changes to the remote document cache;
     *  + recalculate the latency compensated view implied by those changes (there
     *    may be mutations in the queue that affect the documents but haven't been
     *    acknowledged yet); and
     *  + give the changed documents back the sync engine
     *
     * @returns The resulting (modified) documents.
     */
    t.prototype.ta = function(t) {
        var e = this;
        return this.persistence.runTransaction("Acknowledge batch", "readwrite-primary", (function(n) {
            var r = t.batch.keys(), i = e.Kh.Vi({
                pi: !0
            });
            return e.ea(n, t, i).next((function() {
                return i.apply(n);
            })).next((function() {
                return e.Rn.po(n);
            })).next((function() {
                return e.Gh.yn(n, r);
            }));
        }));
    }, 
    /**
     * Remove mutations from the MutationQueue for the specified batch;
     * LocalDocuments will be recalculated.
     *
     * @returns The resulting modified documents.
     */
    t.prototype.sa = function(t) {
        var e = this;
        return this.persistence.runTransaction("Reject batch", "readwrite-primary", (function(n) {
            var r;
            return e.Rn.To(n, t).next((function(t) {
                return d(null !== t), r = t.keys(), e.Rn.Po(n, t);
            })).next((function() {
                return e.Rn.po(n);
            })).next((function() {
                return e.Gh.yn(n, r);
            }));
        }));
    }, 
    /**
     * Returns the largest (latest) batch id in mutation queue that is pending server response.
     * Returns `BATCHID_UNKNOWN` if the queue is empty.
     */
    t.prototype.Ao = function() {
        var t = this;
        return this.persistence.runTransaction("Get highest unacknowledged batch id", "readonly", (function(e) {
            return t.Rn.Ao(e);
        }));
    }, 
    /**
     * Returns the last consistent snapshot processed (used by the RemoteStore to
     * determine whether to buffer incoming snapshots from the backend).
     */
    t.prototype.xi = function() {
        var t = this;
        return this.persistence.runTransaction("Get last remote snapshot version", "readonly", (function(e) {
            return t.Tr.xi(e);
        }));
    }, 
    /**
     * Update the "ground-state" (remote) documents. We assume that the remote
     * event reflects any write batches that have been acknowledged or rejected
     * (i.e. we do not re-apply local mutations to updates from this event).
     *
     * LocalDocuments are re-calculated if there are remaining mutations in the
     * queue.
     */
    t.prototype.na = function(e) {
        var n = this, r = e.J, i = this.Qh;
        return this.persistence.runTransaction("Apply remote event", "readwrite-primary", (function(o) {
            var s = n.Kh.Vi({
                pi: !0
            });
            // Reset newTargetDataByTargetMap in case this transaction gets re-run.
                        i = n.Qh;
            var u = [];
            e.Qt.forEach((function(e, s) {
                var a = i.get(s);
                if (a) {
                    // Only update the remote keys if the target is still active. This
                    // ensures that we can persist the updated target data along with
                    // the updated assignment.
                    u.push(n.Tr.Yi(o, e.Xt, s).next((function() {
                        return n.Tr.zi(o, e.Yt, s);
                    })));
                    var c = e.resumeToken;
                    // Update the resume token if the change includes one.
                                        if (c.G() > 0) {
                        var h = a.Z(c, r).X(o.sr);
                        i = i.et(s, h), 
                        // Update the target data if there are target changes (or if
                        // sufficient time has passed since the last update).
                        t.ia(a, h, e) && u.push(n.Tr.Ui(o, h));
                    }
                }
            }));
            var a = J(), c = it();
            // HACK: The only reason we allow a null snapshot version is so that we
            // can synthesize remote events when we get permission denied errors while
            // trying to resolve the state of a locally cached document that is in
            // limbo.
                        if (e.jt.forEach((function(t, e) {
                c = c.add(t);
            })), 
            // Each loop iteration only affects its "own" doc, so it's safe to get all the remote
            // documents in advance in a single call.
            u.push(s.getEntries(o, c).next((function(t) {
                e.jt.forEach((function(i, c) {
                    var f = t.get(i);
                    // Note: The order of the steps below is important, since we want
                    // to ensure that rejected limbo resolutions (which fabricate
                    // NoDocuments with SnapshotVersion.min()) never add documents to
                    // cache.
                                        c instanceof Ue && c.version.isEqual(k.min()) ? (
                    // NoDocuments with SnapshotVersion.min() are used in manufactured
                    // events. We remove these documents from cache since we lost
                    // access.
                    s.ln(i, r), a = a.et(i, c)) : null == f || c.version.o(f.version) > 0 || 0 === c.version.o(f.version) && f.hasPendingWrites ? (s.un(c, r), 
                    a = a.et(i, c)) : h("LocalStore", "Ignoring outdated watch update for ", i, ". Current version:", f.version, " Watch version:", c.version), 
                    e.Kt.has(i) && u.push(n.persistence.Fi.co(o, i));
                }));
            }))), !r.isEqual(k.min())) {
                var f = n.Tr.xi(o).next((function(t) {
                    return n.Tr.Li(o, o.sr, r);
                }));
                u.push(f);
            }
            return en.nn(u).next((function() {
                return s.apply(o);
            })).next((function() {
                return n.Gh.bn(o, a);
            }));
        })).then((function(t) {
            return n.Qh = i, t;
        }));
    }, 
    /**
     * Returns true if the newTargetData should be persisted during an update of
     * an active target. TargetData should always be persisted when a target is
     * being released and should not call this function.
     *
     * While the target is active, TargetData updates can be omitted when nothing
     * about the target has changed except metadata like the resume token or
     * snapshot version. Occasionally it's worth the extra write to prevent these
     * values from getting too stale after a crash, but this doesn't have to be
     * too frequent.
     */
    t.ia = function(t, e, n) {
        // Always persist target data if we don't already have a resume token.
        return d(e.resumeToken.G() > 0), 0 === t.resumeToken.G() || (e.J.A() - t.J.A() >= this.ra || n.Yt.size + n.Jt.size + n.Xt.size > 0);
        // Don't allow resume token changes to be buffered indefinitely. This
        // allows us to be reasonably up-to-date after a crash and avoids needing
        // to loop over all active queries on shutdown. Especially in the browser
        // we may not get time to do anything interesting while the current tab is
        // closing.
        }, 
    /**
     * Notify local store of the changed views to locally pin documents.
     */
    t.prototype.oa = function(t) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var n, r, i, o, s, u, a, c, f = this;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return e.trys.push([ 0, 2, , 3 ]), [ 4 /*yield*/ , this.persistence.runTransaction("notifyLocalViewChanges", "readwrite", (function(e) {
                        return en.forEach(t, (function(t) {
                            return en.forEach(t.xn, (function(n) {
                                return f.persistence.Fi.Hi(e, t.targetId, n);
                            })).next((function() {
                                return en.forEach(t.Mn, (function(n) {
                                    return f.persistence.Fi.Ji(e, t.targetId, n);
                                }));
                            }));
                        }));
                    })) ];

                  case 1:
                    return e.sent(), [ 3 /*break*/ , 3 ];

                  case 2:
                    if (!wr(n = e.sent())) throw n;
                    // If `notifyLocalViewChanges` fails, we did not advance the sequence
                    // number for the documents that were included in this transaction.
                    // This might trigger them to be deleted earlier than they otherwise
                    // would have, but it should not invalidate the integrity of the data.
                                        return h("LocalStore", "Failed to update sequence numbers: " + n), 
                    [ 3 /*break*/ , 3 ];

                  case 3:
                    for (r = 0, i = t; r < i.length; r++) o = i[r], s = o.targetId, o.fromCache || (u = this.Qh.get(s), 
                    a = u.J, c = u.tt(a), 
                    // Advance the last limbo free snapshot version
                    this.Qh = this.Qh.et(s, c));
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * Gets the mutation batch after the passed in batchId in the mutation queue
     * or null if empty.
     * @param afterBatchId If provided, the batch to search after.
     * @returns The next mutation or null if there wasn't one.
     */
    t.prototype.ha = function(t) {
        var e = this;
        return this.persistence.runTransaction("Get next mutation batch", "readonly", (function(n) {
            return void 0 === t && (t = -1), e.Rn.Io(n, t);
        }));
    }, 
    /**
     * Read the current value of a Document with a given key or null if not
     * found - used for testing.
     */
    t.prototype.aa = function(t) {
        var e = this;
        return this.persistence.runTransaction("read document", "readonly", (function(n) {
            return e.Gh.Pn(n, t);
        }));
    }, 
    /**
     * Assigns the given target an internal ID so that its results can be pinned so
     * they don't get GC'd. A target must be allocated in the local store before
     * the store can be used to manage its view.
     *
     * Allocating an already allocated `Target` will return the existing `TargetData`
     * for that `Target`.
     */
    t.prototype.ua = function(t) {
        var e = this;
        return this.persistence.runTransaction("Allocate target", "readwrite", (function(n) {
            var r;
            return e.Tr.Gi(n, t).next((function(i) {
                return i ? (
                // This target has been listened to previously, so reuse the
                // previous targetID.
                // TODO(mcg): freshen last accessed date?
                r = i, en.resolve(r)) : e.Tr.Ni(n).next((function(i) {
                    return r = new B(t, i, 0 /* Listen */ , n.sr), e.Tr.Oi(n, r).next((function() {
                        return r;
                    }));
                }));
            }));
        })).then((function(n) {
            // If Multi-Tab is enabled, the existing target data may be newer than
            // the in-memory data
            var r = e.Qh.get(n.targetId);
            return (null === r || n.J.o(r.J) > 0) && (e.Qh = e.Qh.et(n.targetId, n), e.Wh.set(t, n.targetId)), 
            n;
        }));
    }, 
    /**
     * Returns the TargetData as seen by the LocalStore, including updates that may
     * have not yet been persisted to the TargetCache.
     */
    // Visible for testing.
    t.prototype.Gi = function(t, e) {
        var n = this.Wh.get(e);
        return void 0 !== n ? en.resolve(this.Qh.get(n)) : this.Tr.Gi(t, e);
    }, 
    /**
     * Unpin all the documents associated with the given target. If
     * `keepPersistedTargetData` is set to false and Eager GC enabled, the method
     * directly removes the associated target data from the target cache.
     *
     * Releasing a non-existing `Target` is a no-op.
     */
    // PORTING NOTE: `keepPersistedTargetData` is multi-tab only.
    t.prototype.ca = function(t, e) {
        var n = this, r = this.Qh.get(t), i = e ? "readwrite" : "readwrite-primary";
        return this.persistence.runTransaction("Release target", i, (function(t) {
            return e ? en.resolve() : n.persistence.Fi.removeTarget(t, r);
        })).then((function() {
            n.Qh = n.Qh.remove(t), n.Wh.delete(r.target);
        }));
    }, 
    /**
     * Runs the specified query against the local store and returns the results,
     * potentially taking advantage of query data from previous executions (such
     * as the set of remote keys).
     *
     * @param usePreviousResults Whether results from previous executions can
     * be used to optimize this query execution.
     */
    t.prototype.la = function(t, e) {
        var n = this, r = k.min(), i = it();
        return this.persistence.runTransaction("Execute query", "readonly", (function(o) {
            return n.Gi(o, t.We()).next((function(t) {
                if (t) return r = t.lastLimboFreeSnapshotVersion, n.Tr.Xi(o, t.targetId).next((function(t) {
                    i = t;
                }));
            })).next((function() {
                return n.Uh.Sn(o, t, e ? r : k.min(), e ? i : it());
            })).next((function(t) {
                return {
                    documents: t,
                    _a: i
                };
            }));
        }));
    }, t.prototype.ea = function(t, e, n) {
        var r = this, i = e.batch, o = i.keys(), s = en.resolve();
        return o.forEach((function(r) {
            s = s.next((function() {
                return n._n(t, r);
            })).next((function(t) {
                var o = t, s = e.zs.get(r);
                d(null !== s), (!o || o.version.o(s) < 0) && ((o = i.Ke(r, o, e)) && 
                // We use the commitVersion as the readTime rather than the
                // document's updateTime since the updateTime is not advanced
                // for updates that do not modify the underlying document.
                n.un(o, e.Gs));
            }));
        })), s.next((function() {
            return r.Rn.Po(t, i);
        }));
    }, t.prototype.xh = function(t) {
        var e = this;
        return this.persistence.runTransaction("Collect garbage", "readwrite-primary", (function(n) {
            return t.Bh(n, e.Qh);
        }));
    }, t;
}();

/** Implements the steps for LRU garbage collection. */
/**
 * The maximum time to leave a resume token buffered without writing it out.
 * This value is arbitrary: it's long enough to avoid several writes
 * (possibly indefinitely if updates come more frequently than this) but
 * short enough that restarting after crashing will still have a pretty
 * recent resume token.
 */
Lr.ra = 3e8;

/**
 * An implementation of LocalStore that provides additional functionality
 * for MultiTabSyncEngine.
 */
// PORTING NOTE: Web only.
var Vr = /** @class */ function(t) {
    function n(e, n, r) {
        var i = this;
        return (i = t.call(this, e, n, r) || this).persistence = e, i.Rn = e.zr(r), i.Kh = e.Jr(), 
        i.Tr = e.Yr(), i;
    }
    /** Starts the LocalStore. */    return e.__extends(n, t), n.prototype.start = function() {
        return this.fa();
    }, 
    /** Returns the local view of the documents affected by a mutation batch. */ n.prototype.da = function(t) {
        var e = this;
        return this.persistence.runTransaction("Lookup mutation documents", "readonly", (function(n) {
            return e.Rn.Eo(n, t).next((function(t) {
                return t ? e.Gh.yn(n, t) : en.resolve(null);
            }));
        }));
    }, n.prototype.wa = function(t) {
        this.Rn.Vo(t);
    }, n.prototype.vr = function(t) {
        this.persistence.vr(t);
    }, n.prototype.Gr = function() {
        return this.persistence.Gr();
    }, n.prototype.Ta = function(t) {
        var e = this, n = this.Qh.get(t);
        return n ? Promise.resolve(n.target) : this.persistence.runTransaction("Get target data", "readonly", (function(n) {
            return e.Tr.Me(n, t).next((function(t) {
                return t ? t.target : null;
            }));
        }));
    }, 
    /**
     * Returns the set of documents that have been updated since the last call.
     * If this is the first call, returns the set of changes since client
     * initialization. Further invocations will return document changes since
     * the point of rejection.
     */
    n.prototype.Ri = function() {
        var t = this;
        return this.persistence.runTransaction("Get new document changes", "readonly", (function(e) {
            return t.Kh.Ri(e, t.jh);
        })).then((function(e) {
            var n = e.mi, r = e.readTime;
            return t.jh = r, n;
        }));
    }, 
    /**
     * Reads the newest document change from persistence and forwards the internal
     * synchronization marker so that calls to `getNewDocumentChanges()`
     * only return changes that happened after client initialization.
     */
    n.prototype.fa = function() {
        return e.__awaiter(this, void 0, void 0, (function() {
            var t, n = this;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return t = this, [ 4 /*yield*/ , this.persistence.runTransaction("Synchronize last document change read time", "readonly", (function(t) {
                        return n.Kh.Pi(t);
                    })) ];

                  case 1:
                    return t.jh = e.sent(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, n;
}(Lr);

/**
 * Verifies the error thrown by a LocalStore operation. If a LocalStore
 * operation fails because the primary lease has been taken by another client,
 * we ignore the error (the persistence layer will immediately call
 * `applyPrimaryLease` to propagate the primary state change). All other errors
 * are re-thrown.
 *
 * @param err An error returned by a LocalStore operation.
 * @return A Promise that resolves after we recovered, or the original error.
 */ function Cr(t) {
    return e.__awaiter(this, void 0, void 0, (function() {
        return e.__generator(this, (function(e) {
            if (t.code !== x.FAILED_PRECONDITION || t.message !== rn) throw t;
            return h("LocalStore", "Unexpectedly lost primary lease"), [ 2 /*return*/ ];
        }));
    }));
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A collection of references to a document from some kind of numbered entity
 * (either a target ID or batch ID). As references are added to or removed from
 * the set corresponding events are emitted to a registered garbage collector.
 *
 * Each reference is represented by a DocumentReference object. Each of them
 * contains enough information to uniquely identify the reference. They are all
 * stored primarily in a set sorted by key. A document is considered garbage if
 * there's no references in that set (this can be efficiently checked thanks to
 * sorting by key).
 *
 * ReferenceSet also keeps a secondary set that contains references sorted by
 * IDs. This one is used to efficiently implement removal of all references by
 * some target ID.
 */ var qr = /** @class */ function() {
    function t() {
        // A set of outstanding references to a document sorted by key.
        this.Ea = new Y(Fr.Ia), 
        // A set of outstanding references to a document sorted by target id.
        this.Aa = new Y(Fr.Ra)
        /** Returns true if the reference set contains no references. */;
    }
    return t.prototype._ = function() {
        return this.Ea._();
    }, 
    /** Adds a reference to the given document key for the given ID. */ t.prototype.Hi = function(t, e) {
        var n = new Fr(t, e);
        this.Ea = this.Ea.add(n), this.Aa = this.Aa.add(n);
    }, 
    /** Add references to the given document keys for the given ID. */ t.prototype.ma = function(t, e) {
        var n = this;
        t.forEach((function(t) {
            return n.Hi(t, e);
        }));
    }, 
    /**
     * Removes a reference to the given document key for the given
     * ID.
     */
    t.prototype.Ji = function(t, e) {
        this.Pa(new Fr(t, e));
    }, t.prototype.Va = function(t, e) {
        var n = this;
        t.forEach((function(t) {
            return n.Ji(t, e);
        }));
    }, 
    /**
     * Clears all references with a given ID. Calls removeRef() for each key
     * removed.
     */
    t.prototype.ga = function(t) {
        var e = this, n = L.EMPTY, r = new Fr(n, t), i = new Fr(n, t + 1), o = [];
        return this.Aa.vt([ r, i ], (function(t) {
            e.Pa(t), o.push(t.key);
        })), o;
    }, t.prototype.pa = function() {
        var t = this;
        this.Ea.forEach((function(e) {
            return t.Pa(e);
        }));
    }, t.prototype.Pa = function(t) {
        this.Ea = this.Ea.delete(t), this.Aa = this.Aa.delete(t);
    }, t.prototype.ya = function(t) {
        var e = L.EMPTY, n = new Fr(e, t), r = new Fr(e, t + 1), i = it();
        return this.Aa.vt([ n, r ], (function(t) {
            i = i.add(t.key);
        })), i;
    }, t.prototype.tr = function(t) {
        var e = new Fr(t, 0), n = this.Ea.Dt(e);
        return null !== n && t.isEqual(n.key);
    }, t;
}(), Fr = /** @class */ function() {
    function t(t, e) {
        this.key = t, this.ba = e
        /** Compare by key then by ID */;
    }
    return t.Ia = function(t, e) {
        return L.P(t.key, e.key) || m(t.ba, e.ba);
    }, 
    /** Compare by ID then by key */ t.Ra = function(t, e) {
        return m(t.ba, e.ba) || L.P(t.key, e.key);
    }, t;
}();

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Validates that no arguments were passed in the invocation of functionName.
 *
 * Forward the magic "arguments" variable as second parameter on which the
 * parameter validation is performed:
 * validateNoArgs('myFunction', arguments);
 */
function Mr(t, e) {
    if (0 !== e.length) throw new S(x.INVALID_ARGUMENT, "Function " + t + "() does not support arguments, but was called with " + ii(e.length, "argument") + ".");
}

/**
 * Validates the invocation of functionName has the exact number of arguments.
 *
 * Forward the magic "arguments" variable as second parameter on which the
 * parameter validation is performed:
 * validateExactNumberOfArgs('myFunction', arguments, 2);
 */ function jr(t, e, n) {
    if (e.length !== n) throw new S(x.INVALID_ARGUMENT, "Function " + t + "() requires " + ii(n, "argument") + ", but was called with " + ii(e.length, "argument") + ".");
}

/**
 * Validates the invocation of functionName has at least the provided number of
 * arguments (but can have many more).
 *
 * Forward the magic "arguments" variable as second parameter on which the
 * parameter validation is performed:
 * validateAtLeastNumberOfArgs('myFunction', arguments, 2);
 */ function Br(t, e, n) {
    if (e.length < n) throw new S(x.INVALID_ARGUMENT, "Function " + t + "() requires at least " + ii(n, "argument") + ", but was called with " + ii(e.length, "argument") + ".");
}

/**
 * Validates the invocation of functionName has number of arguments between
 * the values provided.
 *
 * Forward the magic "arguments" variable as second parameter on which the
 * parameter validation is performed:
 * validateBetweenNumberOfArgs('myFunction', arguments, 2, 3);
 */ function Qr(t, e, n, r) {
    if (e.length < n || e.length > r) throw new S(x.INVALID_ARGUMENT, "Function " + t + "() requires between " + n + " and " + r + " arguments, but was called with " + ii(e.length, "argument") + ".");
}

/**
 * Validates the provided argument is an array and has as least the expected
 * number of elements.
 */
/**
 * Validates the provided positional argument has the native JavaScript type
 * using typeof checks.
 */ function Gr(t, e, n, r) {
    Xr(t, e, ri(n) + " argument", r);
}

/**
 * Validates the provided argument has the native JavaScript type using
 * typeof checks or is undefined.
 */ function zr(t, e, n, r) {
    void 0 !== r && Gr(t, e, n, r);
}

/**
 * Validates the provided named option has the native JavaScript type using
 * typeof checks.
 */ function Wr(t, e, n, r) {
    Xr(t, e, n + " option", r);
}

/**
 * Validates the provided named option has the native JavaScript type using
 * typeof checks or is undefined.
 */ function Hr(t, e, n, r) {
    void 0 !== r && Wr(t, e, n, r);
}

/**
 * Validates that the provided named option equals one of the expected values.
 */
/**
 * Validates that the provided named option equals one of the expected values or
 * is undefined.
 */
function Kr(t, e, n, r, i) {
    void 0 !== r && function(t, e, n, r, i) {
        for (var o = [], s = 0, u = i; s < u.length; s++) {
            var a = u[s];
            if (a === r) return;
            o.push(Jr(a));
        }
        var c = Jr(r);
        throw new S(x.INVALID_ARGUMENT, "Invalid value " + c + " provided to function " + t + '() for option "' + n + '". Acceptable values: ' + o.join(", "));
    }(t, 0, n, r, i);
}

/**
 * Validates that the provided argument is a valid enum.
 *
 * @param functionName Function making the validation call.
 * @param enums Array containing all possible values for the enum.
 * @param position Position of the argument in `functionName`.
 * @param argument Argument to validate.
 * @return The value as T if the argument can be converted.
 */ function Yr(t, e, n, r) {
    if (!e.some((function(t) {
        return t === r;
    }))) throw new S(x.INVALID_ARGUMENT, "Invalid value " + Jr(r) + " provided to function " + t + "() for its " + ri(n) + " argument. Acceptable values: " + e.join(", "));
    return r;
}

/** Helper to validate the type of a provided input. */ function Xr(t, e, n, r) {
    if (!("object" === e ? $r(r) : "non-empty string" === e ? "string" == typeof r && "" !== r : typeof r === e)) {
        var i = Jr(r);
        throw new S(x.INVALID_ARGUMENT, "Function " + t + "() requires its " + n + " to be of type " + e + ", but it was: " + i);
    }
}

/**
 * Returns true if it's a non-null object without a custom prototype
 * (i.e. excludes Array, Date, etc.).
 */ function $r(t) {
    return "object" == typeof t && null !== t && (Object.getPrototypeOf(t) === Object.prototype || null === Object.getPrototypeOf(t));
}

/** Returns a string describing the type / value of the provided input. */ function Jr(t) {
    if (void 0 === t) return "undefined";
    if (null === t) return "null";
    if ("string" == typeof t) return t.length > 20 && (t = t.substring(0, 20) + "..."), 
    JSON.stringify(t);
    if ("number" == typeof t || "boolean" == typeof t) return "" + t;
    if ("object" == typeof t) {
        if (t instanceof Array) return "an array";
        var e = 
        /** Hacky method to try to get the constructor name for an object. */
        function(t) {
            if (t.constructor) {
                var e = /function\s+([^\s(]+)\s*\(/.exec(t.constructor.toString());
                if (e && e.length > 1) return e[1];
            }
            return null;
        }(t);
        return e ? "a custom " + e + " object" : "an object";
    }
    return "function" == typeof t ? "a function" : p();
}

function Zr(t, e, n) {
    if (void 0 === n) throw new S(x.INVALID_ARGUMENT, "Function " + t + "() requires a valid " + ri(e) + " argument, but it was undefined.");
}

/**
 * Validates the provided positional argument is an object, and its keys and
 * values match the expected keys and types provided in optionTypes.
 */ function ti(t, e, n) {
    T(e, (function(e, r) {
        if (n.indexOf(e) < 0) throw new S(x.INVALID_ARGUMENT, "Unknown option '" + e + "' passed to function " + t + "(). Available options: " + n.join(", "));
    }));
}

/**
 * Helper method to throw an error that the provided argument did not pass
 * an instanceof check.
 */ function ei(t, e, n, r) {
    var i = Jr(r);
    return new S(x.INVALID_ARGUMENT, "Function " + t + "() requires its " + ri(n) + " argument to be a " + e + ", but it was: " + i);
}

function ni(t, e, n) {
    if (n <= 0) throw new S(x.INVALID_ARGUMENT, "Function " + t + "() requires its " + ri(e) + " argument to be a positive number, but it was: " + n + ".");
}

/** Converts a number to its english word representation */ function ri(t) {
    switch (t) {
      case 1:
        return "first";

      case 2:
        return "second";

      case 3:
        return "third";

      default:
        return t + "th";
    }
}

/**
 * Formats the given word as plural conditionally given the preceding number.
 */ function ii(t, e) {
    return t + " " + e + (1 === t ? "" : "s");
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** Helper function to assert Uint8Array is available at runtime. */ function oi() {
    if ("undefined" == typeof Uint8Array) throw new S(x.UNIMPLEMENTED, "Uint8Arrays are not available in this environment.");
}

/** Helper function to assert Base64 functions are available at runtime. */ function si() {
    if ("undefined" == typeof atob) throw new S(x.UNIMPLEMENTED, "Blobs are unavailable in Firestore in this environment.");
}

/**
 * Immutable class holding a blob (binary data).
 * This class is directly exposed in the public API.
 *
 * Note that while you can't hide the constructor in JavaScript code, we are
 * using the hack above to make sure no-one outside this module can call it.
 */ var ui = /** @class */ function() {
    function t(t) {
        si(), this.va = t;
    }
    return t.fromBase64String = function(e) {
        jr("Blob.fromBase64String", arguments, 1), Gr("Blob.fromBase64String", "string", 1, e), 
        si();
        try {
            return new t(F.fromBase64String(e));
        } catch (e) {
            throw new S(x.INVALID_ARGUMENT, "Failed to construct Blob from Base64 string: " + e);
        }
    }, t.fromUint8Array = function(e) {
        if (jr("Blob.fromUint8Array", arguments, 1), oi(), !(e instanceof Uint8Array)) throw ei("Blob.fromUint8Array", "Uint8Array", 1, e);
        return new t(F.fromUint8Array(e));
    }, t.prototype.toBase64 = function() {
        return jr("Blob.toBase64", arguments, 0), si(), this.va.toBase64();
    }, t.prototype.toUint8Array = function() {
        return jr("Blob.toUint8Array", arguments, 0), oi(), this.va.toUint8Array();
    }, t.prototype.toString = function() {
        return "Blob(base64: " + this.toBase64() + ")";
    }, t.prototype.isEqual = function(t) {
        return this.va.isEqual(t.va);
    }, t;
}(), ai = function(t) {
    !function(t, e, n, r) {
        if (!(e instanceof Array) || e.length < 1) throw new S(x.INVALID_ARGUMENT, "Function FieldPath() requires its fieldNames argument to be an array with at least " + ii(1, "element") + ".");
    }(0, t);
    for (var e = 0; e < t.length; ++e) if (Gr("FieldPath", "string", e, t[e]), 0 === t[e].length) throw new S(x.INVALID_ARGUMENT, "Invalid field name at argument $(i + 1). Field names must not be empty.");
    this.Sa = new U(t);
}, ci = /** @class */ function(t) {
    /**
     * Creates a FieldPath from the provided field names. If more than one field
     * name is provided, the path will point to a nested field in a document.
     *
     * @param fieldNames A list of field names.
     */
    function n() {
        for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
        return t.call(this, e) || this;
    }
    return e.__extends(n, t), n.documentId = function() {
        return n.Da;
    }, n.prototype.isEqual = function(t) {
        if (!(t instanceof n)) throw ei("isEqual", "FieldPath", 1, t);
        return this.Sa.isEqual(t.Sa);
    }, n;
}(ai);

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// The objects that are a part of this API are exposed to third-parties as
// compiled javascript so we want to flag our private members with a leading
// underscore to discourage their use.
/**
 * A field class base class that is shared by the lite, full and legacy SDK,
 * which supports shared code that deals with FieldPaths.
 */
/**
 * Internal Note: The backend doesn't technically support querying by
 * document ID. Instead it queries by the entire document name (full path
 * included), but in the cases we currently support documentId(), the net
 * effect is the same.
 */
ci.Da = new ci(U.O().N());

/**
 * Matches any characters in a field path string that are reserved.
 */
var hi = new RegExp("[~\\*/\\[\\]]"), fi = function() {
    /** A pointer to the implementing class. */
    this.Ca = this;
}, li = /** @class */ function(t) {
    function n(e) {
        var n = this;
        return (n = t.call(this) || this).Fa = e, n;
    }
    return e.__extends(n, t), n.prototype.Na = function(t) {
        if (2 /* MergeSet */ !== t.$a) throw 1 /* Update */ === t.$a ? t.ka(this.Fa + "() can only appear at the top level of your update data") : t.ka(this.Fa + "() cannot be used with set() unless you pass {merge:true}");
        // No transform to add for a delete, but we need to add it to our
        // fieldMask so it gets deleted.
                return t.Oe.push(t.path), null;
    }, n.prototype.isEqual = function(t) {
        return t instanceof n;
    }, n;
}(fi), pi = /** @class */ function(t) {
    function n(e) {
        var n = this;
        return (n = t.call(this) || this).Fa = e, n;
    }
    return e.__extends(n, t), n.prototype.Na = function(t) {
        return new _e(t.path, de.instance);
    }, n.prototype.isEqual = function(t) {
        return t instanceof n;
    }, n;
}(fi), di = /** @class */ function(t) {
    function n(e, n) {
        var r = this;
        return (r = t.call(this) || this).Fa = e, r.xa = n, r;
    }
    return e.__extends(n, t), n.prototype.Na = function(t) {
        // Although array transforms are used with writes, the actual elements
        // being uniomed or removed are not considered writes since they cannot
        // contain any FieldValue sentinels, etc.
        var e = new Ai({
            $a: 3 /* Argument */ ,
            methodName: this.Fa,
            Ma: !0
        }, t.s, t.serializer, t.ignoreUndefinedProperties), n = this.xa.map((function(t) {
            return Si(t, e);
        })), r = new ye(n);
        return new _e(t.path, r);
    }, n.prototype.isEqual = function(t) {
        // TODO(mrschmidt): Implement isEquals
        return this === t;
    }, n;
}(fi), yi = /** @class */ function(t) {
    function n(e, n) {
        var r = this;
        return (r = t.call(this) || this).Fa = e, r.xa = n, r;
    }
    return e.__extends(n, t), n.prototype.Na = function(t) {
        // Although array transforms are used with writes, the actual elements
        // being unioned or removed are not considered writes since they cannot
        // contain any FieldValue sentinels, etc.
        var e = new Ai({
            $a: 3 /* Argument */ ,
            methodName: this.Fa,
            Ma: !0
        }, t.s, t.serializer, t.ignoreUndefinedProperties), n = this.xa.map((function(t) {
            return Si(t, e);
        })), r = new ve(n);
        return new _e(t.path, r);
    }, n.prototype.isEqual = function(t) {
        // TODO(mrschmidt): Implement isEquals
        return this === t;
    }, n;
}(fi), vi = /** @class */ function(t) {
    function n(e, n) {
        var r = this;
        return (r = t.call(this) || this).Fa = e, r.La = n, r;
    }
    return e.__extends(n, t), n.prototype.Na = function(t) {
        var e = new Ai({
            $a: 3 /* Argument */ ,
            methodName: this.Fa
        }, t.s, t.serializer, t.ignoreUndefinedProperties), n = Si(this.La, e), r = new ge(t.serializer, n);
        return new _e(t.path, r);
    }, n.prototype.isEqual = function(t) {
        // TODO(mrschmidt): Implement isEquals
        return this === t;
    }, n;
}(fi), gi = /** @class */ function(t) {
    function n() {
        return null !== t && t.apply(this, arguments) || this;
    }
    return e.__extends(n, t), n.delete = function() {
        return Mr("FieldValue.delete", arguments), new mi(new li("FieldValue.delete"));
    }, n.serverTimestamp = function() {
        return Mr("FieldValue.serverTimestamp", arguments), new mi(new pi("FieldValue.serverTimestamp"));
    }, n.arrayUnion = function() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        // NOTE: We don't actually parse the data until it's used in set() or
        // update() since we'd need the Firestore instance to do this.
                return Br("FieldValue.arrayUnion", arguments, 1), new mi(new di("FieldValue.arrayUnion", t));
    }, n.arrayRemove = function() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        // NOTE: We don't actually parse the data until it's used in set() or
        // update() since we'd need the Firestore instance to do this.
                return Br("FieldValue.arrayRemove", arguments, 1), new mi(new yi("FieldValue.arrayRemove", t));
    }, n.increment = function(t) {
        return Gr("FieldValue.increment", "number", 1, t), jr("FieldValue.increment", arguments, 1), 
        new mi(new vi("FieldValue.increment", t));
    }, n;
}(fi), mi = /** @class */ function(t) {
    function n(e) {
        var n = this;
        return (n = t.call(this) || this).Ca = e, n.Fa = e.Fa, n;
    }
    return e.__extends(n, t), n.prototype.Na = function(t) {
        return this.Ca.Na(t);
    }, n.prototype.isEqual = function(t) {
        return t instanceof n && this.Ca.isEqual(t.Ca);
    }, n;
}(gi), wi = /** @class */ function() {
    function t(t, e) {
        if (jr("GeoPoint", arguments, 2), Gr("GeoPoint", "number", 1, t), Gr("GeoPoint", "number", 2, e), 
        !isFinite(t) || t < -90 || t > 90) throw new S(x.INVALID_ARGUMENT, "Latitude must be a number between -90 and 90, but was: " + t);
        if (!isFinite(e) || e < -180 || e > 180) throw new S(x.INVALID_ARGUMENT, "Longitude must be a number between -180 and 180, but was: " + e);
        this.Oa = t, this.Ba = e;
    }
    return Object.defineProperty(t.prototype, "latitude", {
        /**
         * Returns the latitude of this geo point, a number between -90 and 90.
         */
        get: function() {
            return this.Oa;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "longitude", {
        /**
         * Returns the longitude of this geo point, a number between -180 and 180.
         */
        get: function() {
            return this.Ba;
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.isEqual = function(t) {
        return this.Oa === t.Oa && this.Ba === t.Ba;
    }, 
    /**
     * Actually private to JS consumers of our API, so this function is prefixed
     * with an underscore.
     */
    t.prototype.T = function(t) {
        return m(this.Oa, t.Oa) || m(this.Ba, t.Ba);
    }, t;
}();

/**
 * Parses a field path string into a FieldPath, treating dots as separators.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * An opaque base class for FieldValue sentinel objects in our public API that
 * is shared between the full, lite and legacy SDK.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _i(t) {
    return new Ft(t, /* useProto3Json= */ !0);
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var bi = /^__.*__$/, Ii = function(t, e, n) {
    this.qa = t, this.Ua = e, this.Qa = n;
}, Ei = /** @class */ function() {
    function t(t, e, n) {
        this.data = t, this.Oe = e, this.fieldTransforms = n;
    }
    return t.prototype.Wa = function(t, e) {
        var n = [];
        return null !== this.Oe ? n.push(new Ne(t, this.data, this.Oe, e)) : n.push(new Te(t, this.data, e)), 
        this.fieldTransforms.length > 0 && n.push(new Ae(t, this.fieldTransforms)), n;
    }, t;
}(), Ti = /** @class */ function() {
    function t(t, e, n) {
        this.data = t, this.Oe = e, this.fieldTransforms = n;
    }
    return t.prototype.Wa = function(t, e) {
        var n = [ new Ne(t, this.data, this.Oe, e) ];
        return this.fieldTransforms.length > 0 && n.push(new Ae(t, this.fieldTransforms)), 
        n;
    }, t;
}();

/**
 * A reference to a document in a Firebase project.
 *
 * This class serves as a common base class for the public DocumentReferences
 * exposed in the lite, full and legacy SDK.
 */ function Ni(t) {
    switch (t) {
      case 0 /* Set */ :
 // fall through
              case 2 /* MergeSet */ :
 // fall through
              case 1 /* Update */ :
        return !0;

      case 3 /* Argument */ :
      case 4 /* ArrayArgument */ :
        return !1;

      default:
        throw p();
    }
}

/** A "context" object passed around while parsing user data. */ var Ai = /** @class */ function() {
    /**
     * Initializes a ParseContext with the given source and path.
     *
     * @param settings The settings for the parser.
     * @param databaseId The database ID of the Firestore instance.
     * @param serializer The serializer to use to generate the Value proto.
     * @param ignoreUndefinedProperties Whether to ignore undefined properties
     * rather than throw.
     * @param fieldTransforms A mutable list of field transforms encountered while
     *     parsing the data.
     * @param fieldMask A mutable list of field paths encountered while parsing
     *     the data.
     *
     * TODO(b/34871131): We don't support array paths right now, so path can be
     * null to indicate the context represents any location within an array (in
     * which case certain features will not work and errors will be somewhat
     * compromised).
     */
    function t(t, e, n, r, i, o) {
        this.settings = t, this.s = e, this.serializer = n, this.ignoreUndefinedProperties = r, 
        // Minor hack: If fieldTransforms is undefined, we assume this is an
        // external call and we need to validate the entire path.
        void 0 === i && this.ja(), this.fieldTransforms = i || [], this.Oe = o || [];
    }
    return Object.defineProperty(t.prototype, "path", {
        get: function() {
            return this.settings.path;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "$a", {
        get: function() {
            return this.settings.$a;
        },
        enumerable: !0,
        configurable: !0
    }), 
    /** Returns a new context with the specified settings overwritten. */ t.prototype.Ka = function(e) {
        return new t(Object.assign(Object.assign({}, this.settings), e), this.s, this.serializer, this.ignoreUndefinedProperties, this.fieldTransforms, this.Oe);
    }, t.prototype.Ga = function(t) {
        var e, n = null === (e = this.path) || void 0 === e ? void 0 : e.child(t), r = this.Ka({
            path: n,
            Ma: !1
        });
        return r.za(t), r;
    }, t.prototype.Ha = function(t) {
        var e, n = null === (e = this.path) || void 0 === e ? void 0 : e.child(t), r = this.Ka({
            path: n,
            Ma: !1
        });
        return r.ja(), r;
    }, t.prototype.Ya = function(t) {
        // TODO(b/34871131): We don't support array paths right now; so make path
        // undefined.
        return this.Ka({
            path: void 0,
            Ma: !0
        });
    }, t.prototype.ka = function(t) {
        var e = !this.path || this.path._() ? "" : " (found in field " + this.path.toString() + ")";
        return new S(x.INVALID_ARGUMENT, "Function " + this.settings.methodName + "() called with invalid data. " + t + e);
    }, 
    /** Returns 'true' if 'fieldPath' was traversed when creating this context. */ t.prototype.contains = function(t) {
        return void 0 !== this.Oe.find((function(e) {
            return t.D(e);
        })) || void 0 !== this.fieldTransforms.find((function(e) {
            return t.D(e.field);
        }));
    }, t.prototype.ja = function() {
        // TODO(b/34871131): Remove null check once we have proper paths for fields
        // within arrays.
        if (this.path) for (var t = 0; t < this.path.length; t++) this.za(this.path.get(t));
    }, t.prototype.za = function(t) {
        if (0 === t.length) throw this.ka("Document fields must not be empty");
        if (Ni(this.$a) && bi.test(t)) throw this.ka('Document fields cannot begin and end with "__"');
    }, t;
}(), xi = /** @class */ function() {
    function t(t, e, n) {
        this.s = t, this.ignoreUndefinedProperties = e, this.serializer = n || _i(t)
        /** Parse document data from a set() call. */;
    }
    return t.prototype.Ja = function(t, e, n) {
        void 0 === n && (n = {});
        var r = this.Xa(n.merge || n.mergeFields ? 2 /* MergeSet */ : 0 /* Set */ , t);
        Pi("Data must be an object, but it was:", r, e);
        var i, o, s = Di(e, r);
        if (n.merge) i = new we(r.Oe), o = r.fieldTransforms; else if (n.mergeFields) {
            for (var u = [], a = 0, c = n.mergeFields; a < c.length; a++) {
                var h = c[a], f = void 0;
                if (h instanceof ai) f = h.Sa; else {
                    if ("string" != typeof h) throw p();
                    f = Oi(t, h);
                }
                if (!r.contains(f)) throw new S(x.INVALID_ARGUMENT, "Field '" + f + "' is specified in your field mask but missing from your input data.");
                Ui(u, f) || u.push(f);
            }
            i = new we(u), o = r.fieldTransforms.filter((function(t) {
                return i.ze(t.field);
            }));
        } else i = null, o = r.fieldTransforms;
        return new Ei(new De(s), i, o);
    }, 
    /** Parse update data from an update() call. */ t.prototype.Za = function(t, e) {
        var n = this.Xa(1 /* Update */ , t);
        Pi("Data must be an object, but it was:", n, e);
        var r = [], i = new ke;
        T(e, (function(e, o) {
            var s = Oi(t, e), u = n.Ha(s);
            if (o instanceof fi && o.Ca instanceof li) 
            // Add it to the field mask, but don't add anything to updateData.
            r.push(s); else {
                var a = Si(o, u);
                null != a && (r.push(s), i.set(s, a));
            }
        }));
        var o = new we(r);
        return new Ti(i.ss(), o, n.fieldTransforms);
    }, 
    /** Parse update data from a list of field/value arguments. */ t.prototype.tu = function(t, e, n, r) {
        var i = this.Xa(1 /* Update */ , t), o = [ Ri(t, e) ], s = [ n ];
        if (r.length % 2 != 0) throw new S(x.INVALID_ARGUMENT, "Function " + t + "() needs to be called with an even number of arguments that alternate between field names and values.");
        for (var u = 0; u < r.length; u += 2) o.push(Ri(t, r[u])), s.push(r[u + 1]);
        // We iterate in reverse order to pick the last value for a field if the
        // user specified the field multiple times.
        for (var a = [], c = new ke, h = o.length - 1; h >= 0; --h) if (!Ui(a, o[h])) {
            var f = o[h], l = s[h], p = i.Ha(f);
            if (l instanceof fi && l.Ca instanceof li) 
            // Add it to the field mask, but don't add anything to updateData.
            a.push(f); else {
                var d = Si(l, p);
                null != d && (a.push(f), c.set(f, d));
            }
        }
        var y = new we(a);
        return new Ti(c.ss(), y, i.fieldTransforms);
    }, 
    /** Creates a new top-level parse context. */ t.prototype.Xa = function(t, e) {
        return new Ai({
            $a: t,
            methodName: e,
            path: U.k,
            Ma: !1
        }, this.s, this.serializer, this.ignoreUndefinedProperties);
    }, 
    /**
     * Parse a "query value" (e.g. value in a where filter or a value in a cursor
     * bound).
     *
     * @param allowArrays Whether the query value is an array that may directly
     * contain additional arrays (e.g. the operand of an `in` query).
     */
    t.prototype.eu = function(t, e, n) {
        return void 0 === n && (n = !1), Si(e, this.Xa(n ? 4 /* ArrayArgument */ : 3 /* Argument */ , t));
    }, t;
}();

/**
 * Helper for parsing raw user input (provided via the API) into internal model
 * classes.
 */
/**
 * Parses user data to Protobuf Values.
 *
 * @param input Data to be parsed.
 * @param context A context object representing the current path being parsed,
 * the source of the data being parsed, etc.
 * @return The parsed value, or null if the value was a FieldValue sentinel
 * that should not be included in the resulting parsed data.
 */
function Si(t, e) {
    if (ki(t)) return Pi("Unsupported field value:", e, t), Di(t, e);
    if (t instanceof fi) 
    // FieldValues usually parse into transforms (except FieldValue.delete())
    // in which case we do not want to include this field in our parsed data
    // (as doing so will overwrite the field directly prior to the transform
    // trying to transform it). So we don't add this location to
    // context.fieldMask and we return null as our parsing result.
    /**
     * "Parses" the provided FieldValueImpl, adding any necessary transforms to
     * context.fieldTransforms.
     */
    return function(t, e) {
        // Sentinels are only supported with writes, and not within arrays.
        if (!Ni(e.$a)) throw e.ka(t.Fa + "() can only be used with update() and set()");
        if (!e.path) throw e.ka(t.Fa + "() is not currently supported inside arrays");
        var n = t.Na(e);
        n && e.fieldTransforms.push(n);
    }(t, e), null;
    if (
    // If context.path is null we are inside an array and we don't support
    // field mask paths more granular than the top-level array.
    e.path && e.Oe.push(e.path), t instanceof Array) {
        // TODO(b/34871131): Include the path containing the array in the error
        // message.
        // In the case of IN queries, the parsed data is an array (representing
        // the set of values to be included for the IN query) that may directly
        // contain additional arrays (each representing an individual field
        // value), so we disable this validation.
        if (e.settings.Ma && 4 /* ArrayArgument */ !== e.$a) throw e.ka("Nested arrays are not supported");
        return function(t, e) {
            for (var n = [], r = 0, i = 0, o = t; i < o.length; i++) {
                var s = Si(o[i], e.Ya(r));
                null == s && (
                // Just include nulls in the array for fields being replaced with a
                // sentinel.
                s = {
                    nullValue: "NULL_VALUE"
                }), n.push(s), r++;
            }
            return {
                arrayValue: {
                    values: n
                }
            };
        }(t, e);
    }
    return function(t, e) {
        if (null === t) return {
            nullValue: "NULL_VALUE"
        };
        if ("number" == typeof t) return function(t, e) {
            return q(e) ? Mt(e) : jt(t, e);
        }(e.serializer, t);
        if ("boolean" == typeof t) return {
            booleanValue: t
        };
        if ("string" == typeof t) return {
            stringValue: t
        };
        if (t instanceof Date) {
            var n = D.fromDate(t);
            return {
                timestampValue: Bt(e.serializer, n)
            };
        }
        if (t instanceof D) {
            // Firestore backend truncates precision down to microseconds. To ensure
            // offline mode works the same with regards to truncation, perform the
            // truncation immediately without waiting for the backend to do that.
            var r = new D(t.seconds, 1e3 * Math.floor(t.nanoseconds / 1e3));
            return {
                timestampValue: Bt(e.serializer, r)
            };
        }
        if (t instanceof wi) return {
            geoPointValue: {
                latitude: t.latitude,
                longitude: t.longitude
            }
        };
        if (t instanceof ui) return {
            bytesValue: Qt(e.serializer, t)
        };
        if (t instanceof Ii) {
            var i = e.s, o = t.qa;
            if (!o.isEqual(i)) throw e.ka("Document reference is for database " + o.projectId + "/" + o.database + " but should be for database " + i.projectId + "/" + i.database);
            return {
                referenceValue: Ht(t.qa || e.s, t.Ua.path)
            };
        }
        if (void 0 === t && e.ignoreUndefinedProperties) return null;
        throw e.ka("Unsupported field value: " + Jr(t));
    }(t, e);
}

function Di(t, e) {
    var n = {};
    return N(t) ? 
    // If we encounter an empty object, we explicitly add it to the update
    // mask to ensure that the server creates a map entry.
    e.path && e.path.length > 0 && e.Oe.push(e.path) : T(t, (function(t, r) {
        var i = Si(r, e.Ga(t));
        null != i && (n[t] = i);
    })), {
        mapValue: {
            fields: n
        }
    };
}

function ki(t) {
    return !("object" != typeof t || null === t || t instanceof Array || t instanceof Date || t instanceof D || t instanceof wi || t instanceof ui || t instanceof Ii || t instanceof fi);
}

function Pi(t, e, n) {
    if (!ki(n) || !$r(n)) {
        var r = Jr(n);
        throw "an object" === r ? e.ka(t + " a custom object") : e.ka(t + " " + r);
    }
}

/**
 * Helper that calls fromDotSeparatedString() but wraps any error thrown.
 */ function Ri(t, e) {
    if (e instanceof ai) return e.Sa;
    if ("string" == typeof e) return Oi(t, e);
    throw new S(x.INVALID_ARGUMENT, "Function " + t + "() called with invalid data. Field path arguments must be of type string or FieldPath.");
}

/**
 * Wraps fromDotSeparatedString with an error message about the method that
 * was thrown.
 * @param methodName The publicly visible method name
 * @param path The dot-separated string form of a field path which will be split
 * on dots.
 */ function Oi(t, n) {
    try {
        return function(t) {
            if (t.search(hi) >= 0) throw new S(x.INVALID_ARGUMENT, "Invalid field path (" + t + "). Paths must not contain '~', '*', '/', '[', or ']'");
            try {
                return new (ci.bind.apply(ci, e.__spreadArrays([ void 0 ], t.split("."))));
            } catch (e) {
                throw new S(x.INVALID_ARGUMENT, "Invalid field path (" + t + "). Paths must not be empty, begin with '.', end with '.', or contain '..'");
            }
        }(n).Sa;
    } catch (n) {
        var r = (i = n) instanceof Error ? i.message : i.toString();
        throw new S(x.INVALID_ARGUMENT, "Function " + t + "() called with invalid data. " + r);
    }
    /**
 * Extracts the message from a caught exception, which should be an Error object
 * though JS doesn't guarantee that.
 */    var i;
    /** Checks `haystack` if FieldPath `needle` is present. Runs in O(n). */}

function Ui(t, e) {
    return t.some((function(t) {
        return t.isEqual(e);
    }));
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Simple wrapper around a nullable UID. Mostly exists to make code more
 * readable.
 */ var Li = /** @class */ function() {
    function t(t) {
        this.uid = t;
    }
    return t.prototype.fo = function() {
        return null != this.uid;
    }, 
    /**
     * Returns a key representing this user, suitable for inclusion in a
     * dictionary.
     */
    t.prototype.su = function() {
        return this.fo() ? "uid:" + this.uid : "anonymous-user";
    }, t.prototype.isEqual = function(t) {
        return t.uid === this.uid;
    }, t;
}();

/** A user with a null UID. */ Li.UNAUTHENTICATED = new Li(null), 
// TODO(mikelehen): Look into getting a proper uid-equivalent for
// non-FirebaseAuth providers.
Li.nu = new Li("google-credentials-uid"), Li.iu = new Li("first-party-uid");

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Vi = function(t, e) {
    this.user = e, this.type = "OAuth", this.ru = {}, 
    // Set the headers using Object Literal notation to avoid minification
    this.ru.Authorization = "Bearer " + t;
}, Ci = /** @class */ function() {
    function t() {
        /**
         * Stores the listener registered with setChangeListener()
         * This isn't actually necessary since the UID never changes, but we use this
         * to verify the listen contract is adhered to in tests.
         */
        this.ou = null;
    }
    return t.prototype.getToken = function() {
        return Promise.resolve(null);
    }, t.prototype.hu = function() {}, t.prototype.au = function(t) {
        this.ou = t, 
        // Fire with initial user.
        t(Li.UNAUTHENTICATED);
    }, t.prototype.uu = function() {
        this.ou = null;
    }, t;
}(), qi = /** @class */ function() {
    function t(t) {
        var e = this;
        /**
         * The auth token listener registered with FirebaseApp, retained here so we
         * can unregister it.
         */        this.cu = null, 
        /** Tracks the current User. */
        this.currentUser = Li.UNAUTHENTICATED, this.lu = !1, 
        /**
             * Counter used to detect if the token changed while a getToken request was
             * outstanding.
             */
        this._u = 0, 
        /** The listener registered with setChangeListener(). */
        this.ou = null, this.forceRefresh = !1, this.cu = function() {
            e._u++, e.currentUser = e.fu(), e.lu = !0, e.ou && e.ou(e.currentUser);
        }, this._u = 0, this.auth = t.getImmediate({
            optional: !0
        }), this.auth ? this.auth.addAuthTokenListener(this.cu) : (
        // if auth is not available, invoke tokenListener once with null token
        this.cu(null), t.get().then((function(t) {
            e.auth = t, e.cu && 
            // tokenListener can be removed by removeChangeListener()
            e.auth.addAuthTokenListener(e.cu);
        }), (function() {})));
    }
    return t.prototype.getToken = function() {
        var t = this, e = this._u, n = this.forceRefresh;
        // Take note of the current value of the tokenCounter so that this method
        // can fail (with an ABORTED error) if there is a token change while the
        // request is outstanding.
                return this.forceRefresh = !1, this.auth ? this.auth.getToken(n).then((function(n) {
            // Cancel the request since the token changed while the request was
            // outstanding so the response is potentially for a previous user (which
            // user, we can't be sure).
            return t._u !== e ? (h("FirebaseCredentialsProvider", "getToken aborted due to token change."), 
            t.getToken()) : n ? (d("string" == typeof n.accessToken), new Vi(n.accessToken, t.currentUser)) : null;
        })) : Promise.resolve(null);
    }, t.prototype.hu = function() {
        this.forceRefresh = !0;
    }, t.prototype.au = function(t) {
        this.ou = t, 
        // Fire the initial event
        this.lu && t(this.currentUser);
    }, t.prototype.uu = function() {
        this.auth && this.auth.removeAuthTokenListener(this.cu), this.cu = null, this.ou = null;
    }, 
    // Auth.getUid() can return null even with a user logged in. It is because
    // getUid() is synchronous, but the auth code populating Uid is asynchronous.
    // This method should only be called in the AuthTokenListener callback
    // to guarantee to get the actual user.
    t.prototype.fu = function() {
        var t = this.auth && this.auth.getUid();
        return d(null === t || "string" == typeof t), new Li(t);
    }, t;
}(), Fi = /** @class */ function() {
    function t(t, e) {
        this.du = t, this.wu = e, this.type = "FirstParty", this.user = Li.iu;
    }
    return Object.defineProperty(t.prototype, "ru", {
        get: function() {
            var t = {
                "X-Goog-AuthUser": this.wu
            }, e = this.du.auth.Tu([]);
            return e && (t.Authorization = e), t;
        },
        enumerable: !0,
        configurable: !0
    }), t;
}(), Mi = /** @class */ function() {
    function t(t, e) {
        this.du = t, this.wu = e;
    }
    return t.prototype.getToken = function() {
        return Promise.resolve(new Fi(this.du, this.wu));
    }, t.prototype.au = function(t) {
        // Fire with initial uid.
        t(Li.iu);
    }, t.prototype.uu = function() {}, t.prototype.hu = function() {}, t;
}(), ji = /** @class */ function() {
    function t(t, e, n, r, i, o) {
        this.Wn = t, this.Eu = n, this.Iu = r, this.Au = i, this.listener = o, this.state = 0 /* Initial */ , 
        /**
             * A close count that's incremented every time the stream is closed; used by
             * getCloseGuardedDispatcher() to invalidate callbacks that happen after
             * close.
             */
        this.Ru = 0, this.mu = null, this.stream = null, this.Zo = new hn(t, e)
        /**
     * Returns true if start() has been called and no error has occurred. True
     * indicates the stream is open or in the process of opening (which
     * encompasses respecting backoff, getting auth tokens, and starting the
     * actual RPC). Use isOpen() to determine if the stream is open and ready for
     * outbound requests.
     */;
    }
    return t.prototype.Pu = function() {
        return 1 /* Starting */ === this.state || 2 /* Open */ === this.state || 4 /* Backoff */ === this.state;
    }, 
    /**
     * Returns true if the underlying RPC is open (the onOpen() listener has been
     * called) and the stream is ready for outbound requests.
     */
    t.prototype.Vu = function() {
        return 2 /* Open */ === this.state;
    }, 
    /**
     * Starts the RPC. Only allowed if isStarted() returns false. The stream is
     * not immediately ready for use: onOpen() will be invoked when the RPC is
     * ready for outbound requests, at which point isOpen() will return true.
     *
     * When start returns, isStarted() will return true.
     */
    t.prototype.start = function() {
        3 /* Error */ !== this.state ? this.auth() : this.gu();
    }, 
    /**
     * Stops the RPC. This call is idempotent and allowed regardless of the
     * current isStarted() state.
     *
     * When stop returns, isStarted() and isOpen() will both return false.
     */
    t.prototype.stop = function() {
        return e.__awaiter(this, void 0, void 0, (function() {
            return e.__generator(this, (function(t) {
                switch (t.label) {
                  case 0:
                    return this.Pu() ? [ 4 /*yield*/ , this.close(0 /* Initial */) ] : [ 3 /*break*/ , 2 ];

                  case 1:
                    t.sent(), t.label = 2;

                  case 2:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * After an error the stream will usually back off on the next attempt to
     * start it. If the error warrants an immediate restart of the stream, the
     * sender can use this to indicate that the receiver should not back off.
     *
     * Each error will call the onClose() listener. That function can decide to
     * inhibit backoff if required.
     */
    t.prototype.pu = function() {
        this.state = 0 /* Initial */ , this.Zo.reset();
    }, 
    /**
     * Marks this stream as idle. If no further actions are performed on the
     * stream for one minute, the stream will automatically close itself and
     * notify the stream's onClose() handler with Status.OK. The stream will then
     * be in a !isStarted() state, requiring the caller to start the stream again
     * before further use.
     *
     * Only streams that are in state 'Open' can be marked idle, as all other
     * states imply pending network operations.
     */
    t.prototype.yu = function() {
        var t = this;
        // Starts the idle time if we are in state 'Open' and are not yet already
        // running a timer (in which case the previous idle timeout still applies).
                this.Vu() && null === this.mu && (this.mu = this.Wn.ei(this.Eu, 6e4, (function() {
            return t.bu();
        })));
    }, 
    /** Sends a message to the underlying stream. */ t.prototype.vu = function(t) {
        this.Su(), this.stream.send(t);
    }, 
    /** Called by the idle timer when the stream should close due to inactivity. */ t.prototype.bu = function() {
        return e.__awaiter(this, void 0, void 0, (function() {
            return e.__generator(this, (function(t) {
                return this.Vu() ? [ 2 /*return*/ , this.close(0 /* Initial */) ] : [ 2 /*return*/ ];
            }));
        }));
    }, 
    /** Marks the stream as active again. */ t.prototype.Su = function() {
        this.mu && (this.mu.cancel(), this.mu = null);
    }, 
    /**
     * Closes the stream and cleans up as necessary:
     *
     * * closes the underlying GRPC stream;
     * * calls the onClose handler with the given 'error';
     * * sets internal stream state to 'finalState';
     * * adjusts the backoff timer based on the error
     *
     * A new stream can be opened by calling start().
     *
     * @param finalState the intended state of the stream after closing.
     * @param error the error the connection was closed with.
     */
    t.prototype.close = function(t, n) {
        return e.__awaiter(this, void 0, void 0, (function() {
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    // Notify the listener that the stream closed.
                    // Cancel any outstanding timers (they're guaranteed not to execute).
                    return this.Su(), this.Zo.cancel(), 
                    // Invalidates any stream-related callbacks (e.g. from auth or the
                    // underlying stream), guaranteeing they won't execute.
                    this.Ru++, 3 /* Error */ !== t ? 
                    // If this is an intentional close ensure we don't delay our next connection attempt.
                    this.Zo.reset() : n && n.code === x.RESOURCE_EXHAUSTED ? (
                    // Log the error. (Probably either 'quota exceeded' or 'max queue length reached'.)
                    f(n.toString()), f("Using maximum backoff delay to prevent overloading the backend."), 
                    this.Zo.Xn()) : n && n.code === x.UNAUTHENTICATED && 
                    // "unauthenticated" error means the token was rejected. Try force refreshing it in case it
                    // just expired.
                    this.Au.hu(), 
                    // Clean up the underlying stream because we are no longer interested in events.
                    null !== this.stream && (this.Du(), this.stream.close(), this.stream = null), 
                    // This state must be assigned before calling onClose() to allow the callback to
                    // inhibit backoff or otherwise manipulate the state in its non-started state.
                    this.state = t, [ 4 /*yield*/ , this.listener.Cu(n) ];

                  case 1:
                    // Cancel any outstanding timers (they're guaranteed not to execute).
                    // Notify the listener that the stream closed.
                    return e.sent(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * Can be overridden to perform additional cleanup before the stream is closed.
     * Calling super.tearDown() is not required.
     */
    t.prototype.Du = function() {}, t.prototype.auth = function() {
        var t = this;
        this.state = 1 /* Starting */;
        var e = this.Fu(this.Ru), n = this.Ru;
        // TODO(mikelehen): Just use dispatchIfNotClosed, but see TODO below.
                this.Au.getToken().then((function(e) {
            // Stream can be stopped while waiting for authentication.
            // TODO(mikelehen): We really should just use dispatchIfNotClosed
            // and let this dispatch onto the queue, but that opened a spec test can
            // of worms that I don't want to deal with in this PR.
            t.Ru === n && 
            // Normally we'd have to schedule the callback on the AsyncQueue.
            // However, the following calls are safe to be called outside the
            // AsyncQueue since they don't chain asynchronous calls
            t.Nu(e);
        }), (function(n) {
            e((function() {
                var e = new S(x.UNKNOWN, "Fetching auth token failed: " + n.message);
                return t.$u(e);
            }));
        }));
    }, t.prototype.Nu = function(t) {
        var e = this, n = this.Fu(this.Ru);
        this.stream = this.ku(t), this.stream.xu((function() {
            n((function() {
                return e.state = 2 /* Open */ , e.listener.xu();
            }));
        })), this.stream.Cu((function(t) {
            n((function() {
                return e.$u(t);
            }));
        })), this.stream.onMessage((function(t) {
            n((function() {
                return e.onMessage(t);
            }));
        }));
    }, t.prototype.gu = function() {
        var t = this;
        this.state = 4 /* Backoff */ , this.Zo.Zn((function() {
            return e.__awaiter(t, void 0, void 0, (function() {
                return e.__generator(this, (function(t) {
                    return this.state = 0 /* Initial */ , this.start(), [ 2 /*return*/ ];
                }));
            }));
        }));
    }, 
    // Visible for tests
    t.prototype.$u = function(t) {
        // In theory the stream could close cleanly, however, in our current model
        // we never expect this to happen because if we stop a stream ourselves,
        // this callback will never be called. To prevent cases where we retry
        // without a backoff accidentally, we set the stream to error in all cases.
        return h("PersistentStream", "close with error: " + t), this.stream = null, this.close(3 /* Error */ , t);
    }, 
    /**
     * Returns a "dispatcher" function that dispatches operations onto the
     * AsyncQueue but only runs them if closeCount remains unchanged. This allows
     * us to turn auth / stream callbacks into no-ops if the stream is closed /
     * re-opened, etc.
     */
    t.prototype.Fu = function(t) {
        var e = this;
        return function(n) {
            e.Wn.Sr((function() {
                return e.Ru === t ? n() : (h("PersistentStream", "stream callback skipped by getCloseGuardedDispatcher."), 
                Promise.resolve());
            }));
        };
    }, t;
}(), Bi = /** @class */ function(t) {
    function n(e, n, r, i, o) {
        var s = this;
        return (s = t.call(this, e, "listen_stream_connection_backoff" /* ListenStreamConnectionBackoff */ , "listen_stream_idle" /* ListenStreamIdle */ , n, r, o) || this).serializer = i, 
        s;
    }
    return e.__extends(n, t), n.prototype.ku = function(t) {
        return this.Iu.Mu("Listen", t);
    }, n.prototype.onMessage = function(t) {
        // A successful response means the stream is healthy
        this.Zo.reset();
        var e = function(t, e) {
            var n;
            if ("targetChange" in e) {
                e.targetChange;
                // proto3 default value is unset in JSON (undefined), so use 'NO_CHANGE'
                // if unset
                var r = function(t) {
                    return "NO_CHANGE" === t ? 0 /* NoChange */ : "ADD" === t ? 1 /* Added */ : "REMOVE" === t ? 2 /* Removed */ : "CURRENT" === t ? 3 /* Current */ : "RESET" === t ? 4 /* Reset */ : p();
                }(e.targetChange.targetChangeType || "NO_CHANGE"), i = e.targetChange.targetIds || [], o = Gt(t, e.targetChange.resumeToken), s = e.targetChange.cause, u = s && function(t) {
                    var e = void 0 === t.code ? x.UNKNOWN : z(t.code);
                    return new S(e, t.message || "");
                }(s);
                n = new dt(r, i, o, u || null);
            } else if ("documentChange" in e) {
                e.documentChange;
                var a = e.documentChange;
                a.document, a.document.name, a.document.updateTime;
                var c = Xt(t, a.document.name), h = Wt(a.document.updateTime), f = new De({
                    mapValue: {
                        fields: a.document.fields
                    }
                }), l = new Oe(c, h, f, {}), d = a.targetIds || [], y = a.removedTargetIds || [];
                n = new lt(d, y, l.key, l);
            } else if ("documentDelete" in e) {
                e.documentDelete;
                var v = e.documentDelete;
                v.document;
                var g = Xt(t, v.document), m = v.readTime ? Wt(v.readTime) : k.min(), w = new Ue(g, m), _ = v.removedTargetIds || [];
                n = new lt([], _, w.key, w);
            } else if ("documentRemove" in e) {
                e.documentRemove;
                var b = e.documentRemove;
                b.document;
                var I = Xt(t, b.document), E = b.removedTargetIds || [];
                n = new lt([], E, I, null);
            } else {
                if (!("filter" in e)) return p();
                e.filter;
                var T = e.filter;
                T.targetId;
                var N = T.count || 0, A = new Q(N), D = T.targetId;
                n = new pt(D, A);
            }
            return n;
        }(this.serializer, t), n = function(t) {
            // We have only reached a consistent snapshot for the entire stream if there
            // is a read_time set and it applies to all targets (i.e. the list of
            // targets is empty). The backend is guaranteed to send such responses.
            if (!("targetChange" in t)) return k.min();
            var e = t.targetChange;
            return e.targetIds && e.targetIds.length ? k.min() : e.readTime ? Wt(e.readTime) : k.min();
        }(t);
        return this.listener.Lu(e, n);
    }, 
    /**
     * Registers interest in the results of the given target. If the target
     * includes a resumeToken it will be included in the request. Results that
     * affect the target will be streamed back as WatchChange messages that
     * reference the targetId.
     */
    n.prototype.Ou = function(t) {
        var e = {};
        e.database = Zt(this.serializer), e.addTarget = function(t, e) {
            var n, r = e.target;
            return (n = Je(r) ? {
                documents: ie(t, r)
            } : {
                query: oe(t, r)
            }).targetId = e.targetId, e.resumeToken.G() > 0 && (n.resumeToken = Qt(t, e.resumeToken)), 
            n;
        }(this.serializer, t);
        var n = function(t, e) {
            var n = function(t, e) {
                switch (e) {
                  case 0 /* Listen */ :
                    return null;

                  case 1 /* ExistenceFilterMismatch */ :
                    return "existence-filter-mismatch";

                  case 2 /* LimboResolution */ :
                    return "limbo-document";

                  default:
                    return p();
                }
            }(0, e.Y);
            return null == n ? null : {
                "goog-listen-tags": n
            };
        }(this.serializer, t);
        n && (e.labels = n), this.vu(e);
    }, 
    /**
     * Unregisters interest in the results of the target associated with the
     * given targetId.
     */
    n.prototype.Bu = function(t) {
        var e = {};
        e.database = Zt(this.serializer), e.removeTarget = t, this.vu(e);
    }, n;
}(ji), Qi = /** @class */ function(t) {
    function n(e, n, r, i, o) {
        var s = this;
        return (s = t.call(this, e, "write_stream_connection_backoff" /* WriteStreamConnectionBackoff */ , "write_stream_idle" /* WriteStreamIdle */ , n, r, o) || this).serializer = i, 
        s.qu = !1, 
        /**
             * The last received stream token from the server, used to acknowledge which
             * responses the client has processed. Stream tokens are opaque checkpoint
             * markers whose only real value is their inclusion in the next request.
             *
             * PersistentWriteStream manages propagating this value from responses to the
             * next request.
             */
        s.lastStreamToken = F.H, s;
    }
    return e.__extends(n, t), Object.defineProperty(n.prototype, "Uu", {
        /**
         * Tracks whether or not a handshake has been successfully exchanged and
         * the stream is ready to accept mutations.
         */
        get: function() {
            return this.qu;
        },
        enumerable: !0,
        configurable: !0
    }), 
    // Override of PersistentStream.start
    n.prototype.start = function() {
        this.qu = !1, this.lastStreamToken = F.H, t.prototype.start.call(this);
    }, n.prototype.Du = function() {
        this.qu && this.Qu([]);
    }, n.prototype.ku = function(t) {
        return this.Iu.Mu("Write", t);
    }, n.prototype.onMessage = function(t) {
        if (
        // Always capture the last stream token.
        d(!!t.streamToken), this.lastStreamToken = Gt(this.serializer, t.streamToken), this.qu) {
            // A successful first write response means the stream is healthy,
            // Note, that we could consider a successful handshake healthy, however,
            // the write itself might be causing an error we want to back off from.
            this.Zo.reset();
            var e = function(t, e) {
                return t && t.length > 0 ? (d(void 0 !== e), t.map((function(t) {
                    return function(t, e) {
                        // NOTE: Deletes don't have an updateTime.
                        var n = t.updateTime ? Wt(t.updateTime) : Wt(e);
                        n.isEqual(k.min()) && (
                        // The Firestore Emulator currently returns an update time of 0 for
                        // deletes of non-existing documents (rather than null). This breaks the
                        // test "get deleted doc while offline with source=cache" as NoDocuments
                        // with version 0 are filtered by IndexedDb's RemoteDocumentCache.
                        // TODO(#2149): Remove this when Emulator is fixed
                        n = Wt(e));
                        var r = null;
                        return t.transformResults && t.transformResults.length > 0 && (r = t.transformResults), 
                        new be(n, r);
                    }(t, e);
                }))) : [];
            }(t.writeResults, t.commitTime), n = Wt(t.commitTime);
            return this.listener.Wu(n, e);
        }
        // The first response is always the handshake response
                return d(!t.writeResults || 0 === t.writeResults.length), this.qu = !0, 
        this.listener.ju();
    }, 
    /**
     * Sends an initial streamToken to the server, performing the handshake
     * required to make the StreamingWrite RPC work. Subsequent
     * calls should wait until onHandshakeComplete was called.
     */
    n.prototype.Ku = function() {
        // TODO(dimond): Support stream resumption. We intentionally do not set the
        // stream token on the handshake, ignoring any stream token we might have.
        var t = {};
        t.database = Zt(this.serializer), this.vu(t);
    }, 
    /** Sends a group of mutations to the Firestore backend to apply. */ n.prototype.Qu = function(t) {
        var e = this, n = {
            streamToken: Qt(this.serializer, this.lastStreamToken),
            writes: t.map((function(t) {
                return ne(e.serializer, t);
            }))
        };
        this.vu(n);
    }, n;
}(ji), Gi = /** @class */ function(t) {
    function n(e, n, r) {
        var i = this;
        return (i = t.call(this) || this).Iu = e, i.credentials = n, i.serializer = r, i.zu = !1, 
        i;
    }
    return e.__extends(n, t), n.prototype.Hu = function() {
        if (this.zu) throw new S(x.FAILED_PRECONDITION, "The client has already been terminated.");
    }, 
    /** Gets an auth token and invokes the provided RPC. */ n.prototype.Yu = function(t, e) {
        var n = this;
        return this.Hu(), this.credentials.getToken().then((function(r) {
            return n.Iu.Yu(t, e, r);
        })).catch((function(t) {
            throw t.code === x.UNAUTHENTICATED && n.credentials.hu(), t;
        }));
    }, 
    /** Gets an auth token and invokes the provided RPC with streamed results. */ n.prototype.Ju = function(t, e) {
        var n = this;
        return this.Hu(), this.credentials.getToken().then((function(r) {
            return n.Iu.Ju(t, e, r);
        })).catch((function(t) {
            throw t.code === x.UNAUTHENTICATED && n.credentials.hu(), t;
        }));
    }, n;
}((function() {
    // Make sure that the structural type of `Datastore` is unique.
    // See https://github.com/microsoft/TypeScript/issues/5451
    this.Gu = void 0;
})), zi = /** @class */ function() {
    function t(t) {
        this.Xu = t, 
        // The version of each document that was read during this transaction.
        this.Zu = new Map, this.mutations = [], this.tc = !1, 
        /**
             * A deferred usage error that occurred previously in this transaction that
             * will cause the transaction to fail once it actually commits.
             */
        this.ec = null, 
        /**
             * Set of documents that have been written in the transaction.
             *
             * When there's more than one write to the same key in a transaction, any
             * writes after the first are handled differently.
             */
        this.sc = new Set;
    }
    return t.prototype.nc = function(t) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var n, r = this;
            return e.__generator(this, (function(i) {
                switch (i.label) {
                  case 0:
                    if (this.ic(), this.mutations.length > 0) throw new S(x.INVALID_ARGUMENT, "Firestore transactions require all reads to be executed before all writes.");
                    return [ 4 /*yield*/ , function(t, n) {
                        return e.__awaiter(this, void 0, void 0, (function() {
                            var r, i, o, s, u;
                            return e.__generator(this, (function(e) {
                                switch (e.label) {
                                  case 0:
                                    return r = y(t), i = {
                                        database: Zt(r.serializer),
                                        documents: n.map((function(t) {
                                            return Yt(r.serializer, t);
                                        }))
                                    }, [ 4 /*yield*/ , r.Ju("BatchGetDocuments", i) ];

                                  case 1:
                                    return o = e.sent(), s = new Map, o.forEach((function(t) {
                                        var e = function(t, e) {
                                            return "found" in e ? function(t, e) {
                                                d(!!e.found), e.found.name, e.found.updateTime;
                                                var n = Xt(t, e.found.name), r = Wt(e.found.updateTime), i = new De({
                                                    mapValue: {
                                                        fields: e.found.fields
                                                    }
                                                });
                                                return new Oe(n, r, i, {});
                                            }(t, e) : "missing" in e ? function(t, e) {
                                                d(!!e.missing), d(!!e.readTime);
                                                var n = Xt(t, e.missing), r = Wt(e.readTime);
                                                return new Ue(n, r);
                                            }(t, e) : p();
                                        }(r.serializer, t);
                                        s.set(e.key.toString(), e);
                                    })), u = [], [ 2 /*return*/ , (n.forEach((function(t) {
                                        var e = s.get(t.toString());
                                        d(!!e), u.push(e);
                                    })), u) ];
                                }
                            }));
                        }));
                    }(this.Xu, t) ];

                  case 1:
                    return [ 2 /*return*/ , ((n = i.sent()).forEach((function(t) {
                        t instanceof Ue || t instanceof Oe ? r.rc(t) : p();
                    })), n) ];
                }
            }));
        }));
    }, t.prototype.set = function(t, e) {
        this.write(e.Wa(t, this.Ue(t))), this.sc.add(t);
    }, t.prototype.update = function(t, e) {
        try {
            this.write(e.Wa(t, this.oc(t)));
        } catch (t) {
            this.ec = t;
        }
        this.sc.add(t);
    }, t.prototype.delete = function(t) {
        this.write([ new xe(t, this.Ue(t)) ]), this.sc.add(t);
    }, t.prototype.commit = function() {
        return e.__awaiter(this, void 0, void 0, (function() {
            var t, n = this;
            return e.__generator(this, (function(r) {
                switch (r.label) {
                  case 0:
                    if (this.ic(), this.ec) throw this.ec;
                    return t = this.Zu, 
                    // For each mutation, note that the doc was written.
                    this.mutations.forEach((function(e) {
                        t.delete(e.key.toString());
                    })), 
                    // For each document that was read but not written to, we want to perform
                    // a `verify` operation.
                    t.forEach((function(t, e) {
                        var r = new L(R.$(e));
                        n.mutations.push(new Se(r, n.Ue(r)));
                    })), [ 4 /*yield*/ , function(t, n) {
                        return e.__awaiter(this, void 0, void 0, (function() {
                            var r, i;
                            return e.__generator(this, (function(e) {
                                switch (e.label) {
                                  case 0:
                                    return r = y(t), i = {
                                        database: Zt(r.serializer),
                                        writes: n.map((function(t) {
                                            return ne(r.serializer, t);
                                        }))
                                    }, [ 4 /*yield*/ , r.Yu("Commit", i) ];

                                  case 1:
                                    return e.sent(), [ 2 /*return*/ ];
                                }
                            }));
                        }));
                    }(this.Xu, this.mutations) ];

                  case 1:
                    // For each mutation, note that the doc was written.
                    return r.sent(), this.tc = !0, [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.rc = function(t) {
        var e;
        if (t instanceof Oe) e = t.version; else {
            if (!(t instanceof Ue)) throw p();
            // For deleted docs, we must use baseVersion 0 when we overwrite them.
                        e = k.min();
        }
        var n = this.Zu.get(t.key.toString());
        if (n) {
            if (!e.isEqual(n)) 
            // This transaction will fail no matter what.
            throw new S(x.ABORTED, "Document version changed between two reads.");
        } else this.Zu.set(t.key.toString(), e);
    }, 
    /**
     * Returns the version of this document when it was read in this transaction,
     * as a precondition, or no precondition if it was not read.
     */
    t.prototype.Ue = function(t) {
        var e = this.Zu.get(t.toString());
        return !this.sc.has(t) && e ? Ie.updateTime(e) : Ie.Qe();
    }, 
    /**
     * Returns the precondition for a document if the operation is an update.
     */
    t.prototype.oc = function(t) {
        var e = this.Zu.get(t.toString());
        // The first time a document is written, we want to take into account the
        // read time and existence
                if (!this.sc.has(t) && e) {
            if (e.isEqual(k.min())) 
            // The document doesn't exist, so fail the transaction.
            // This has to be validated locally because you can't send a
            // precondition that a document does not exist without changing the
            // semantics of the backend write to be an insert. This is the reverse
            // of what we want, since we want to assert that the document doesn't
            // exist but then send the update and have it fail. Since we can't
            // express that to the backend, we have to validate locally.
            // Note: this can change once we can send separate verify writes in the
            // transaction.
            throw new S(x.INVALID_ARGUMENT, "Can't update a document that doesn't exist.");
            // Document exists, base precondition on document update time.
                        return Ie.updateTime(e);
        }
        // Document was not read, so we just use the preconditions for a blind
        // update.
                return Ie.exists(!0);
    }, t.prototype.write = function(t) {
        this.ic(), this.mutations = this.mutations.concat(t);
    }, t.prototype.ic = function() {}, t;
}(), Wi = /** @class */ function() {
    function t(t, e) {
        this.Oo = t, this.hc = e, 
        /** The current OnlineState. */
        this.state = "Unknown" /* Unknown */ , 
        /**
             * A count of consecutive failures to open the stream. If it reaches the
             * maximum defined by MAX_WATCH_STREAM_FAILURES, we'll set the OnlineState to
             * Offline.
             */
        this.ac = 0, 
        /**
             * A timer that elapses after ONLINE_STATE_TIMEOUT_MS, at which point we
             * transition from OnlineState.Unknown to OnlineState.Offline without waiting
             * for the stream to actually fail (MAX_WATCH_STREAM_FAILURES times).
             */
        this.uc = null, 
        /**
             * Whether the client should log a warning message if it fails to connect to
             * the backend (initially true, cleared after a successful stream, or if we've
             * logged the message already).
             */
        this.cc = !0
        /**
     * Called by RemoteStore when a watch stream is started (including on each
     * backoff attempt).
     *
     * If this is the first attempt, it sets the OnlineState to Unknown and starts
     * the onlineStateTimer.
     */;
    }
    return t.prototype.lc = function() {
        var t = this;
        0 === this.ac && (this._c("Unknown" /* Unknown */), this.uc = this.Oo.ei("online_state_timeout" /* OnlineStateTimeout */ , 1e4, (function() {
            return t.uc = null, t.fc("Backend didn't respond within 10 seconds."), t._c("Offline" /* Offline */), 
            Promise.resolve();
        })));
    }, 
    /**
     * Updates our OnlineState as appropriate after the watch stream reports a
     * failure. The first failure moves us to the 'Unknown' state. We then may
     * allow multiple failures (based on MAX_WATCH_STREAM_FAILURES) before we
     * actually transition to the 'Offline' state.
     */
    t.prototype.dc = function(t) {
        "Online" /* Online */ === this.state ? this._c("Unknown" /* Unknown */) : (this.ac++, 
        this.ac >= 1 && (this.wc(), this.fc("Connection failed 1 times. Most recent error: " + t.toString()), 
        this._c("Offline" /* Offline */)));
    }, 
    /**
     * Explicitly sets the OnlineState to the specified state.
     *
     * Note that this resets our timers / failure counters, etc. used by our
     * Offline heuristics, so must not be used in place of
     * handleWatchStreamStart() and handleWatchStreamFailure().
     */
    t.prototype.set = function(t) {
        this.wc(), this.ac = 0, "Online" /* Online */ === t && (
        // We've connected to watch at least once. Don't warn the developer
        // about being offline going forward.
        this.cc = !1), this._c(t);
    }, t.prototype._c = function(t) {
        t !== this.state && (this.state = t, this.hc(t));
    }, t.prototype.fc = function(t) {
        var e = "Could not reach Cloud Firestore backend. " + t + "\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.";
        this.cc ? (f(e), this.cc = !1) : h("OnlineStateTracker", e);
    }, t.prototype.wc = function() {
        null !== this.uc && (this.uc.cancel(), this.uc = null);
    }, t;
}(), Hi = /** @class */ function() {
    function t(
    /**
     * The local store, used to fill the write pipeline with outbound mutations.
     */
    t, 
    /** The client-side proxy for interacting with the backend. */
    n, r, i, o) {
        var s = this;
        this.Tc = t, this.Xu = n, this.Oo = r, 
        /**
             * A list of up to MAX_PENDING_WRITES writes that we have fetched from the
             * LocalStore via fillWritePipeline() and have or will send to the write
             * stream.
             *
             * Whenever writePipeline.length > 0 the RemoteStore will attempt to start or
             * restart the write stream. When the stream is established the writes in the
             * pipeline will be sent in order.
             *
             * Writes remain in writePipeline until they are acknowledged by the backend
             * and thus will automatically be re-sent if the stream is interrupted /
             * restarted before they're acknowledged.
             *
             * Write responses from the backend are linked to their originating request
             * purely based on order, and so we can just shift() writes from the front of
             * the writePipeline as we receive responses.
             */
        this.Ec = [], 
        /**
             * A mapping of watched targets that the client cares about tracking and the
             * user has explicitly called a 'listen' for this target.
             *
             * These targets may or may not have been sent to or acknowledged by the
             * server. On re-establishing the listen stream, these targets should be sent
             * to the server. The targets removed with unlistens are removed eagerly
             * without waiting for confirmation from the listen stream.
             */
        this.Ic = new Map, this.Ac = null, 
        /**
             * A set of reasons for why the RemoteStore may be offline. If empty, the
             * RemoteStore may start its network connections.
             */
        this.Rc = new Set, this.mc = o, this.mc.Pc((function(t) {
            r.Sr((function() {
                return e.__awaiter(s, void 0, void 0, (function() {
                    return e.__generator(this, (function(t) {
                        switch (t.label) {
                          case 0:
                            return this.Vc() ? (h("RemoteStore", "Restarting streams for network reachability change."), 
                            [ 4 /*yield*/ , this.gc() ]) : [ 3 /*break*/ , 2 ];

                          case 1:
                            t.sent(), t.label = 2;

                          case 2:
                            return [ 2 /*return*/ ];
                        }
                    }));
                }));
            }));
        })), this.pc = new Wi(r, i), 
        // Create streams (but note they're not started yet).
        this.yc = function(t, e, n) {
            var r = y(t);
            return new Bi(e, r.Iu, r.credentials, r.serializer, n);
        }(this.Xu, r, {
            xu: this.bc.bind(this),
            Cu: this.vc.bind(this),
            Lu: this.Sc.bind(this)
        }), this.Dc = function(t, e, n) {
            var r = y(t);
            return new Qi(e, r.Iu, r.credentials, r.serializer, n);
        }(this.Xu, r, {
            xu: this.Cc.bind(this),
            Cu: this.Fc.bind(this),
            ju: this.Nc.bind(this),
            Wu: this.Wu.bind(this)
        });
    }
    /**
     * Starts up the remote store, creating streams, restoring state from
     * LocalStore, etc.
     */    return t.prototype.start = function() {
        return this.enableNetwork();
    }, 
    /** Re-enables the network. Idempotent. */ t.prototype.enableNetwork = function() {
        return this.Rc.delete(0 /* UserDisabled */), this.$c();
    }, t.prototype.$c = function() {
        return e.__awaiter(this, void 0, void 0, (function() {
            return e.__generator(this, (function(t) {
                switch (t.label) {
                  case 0:
                    return this.Vc() ? (this.kc() ? this.xc() : this.pc.set("Unknown" /* Unknown */), 
                    [ 4 /*yield*/ , this.Mc() ]) : [ 3 /*break*/ , 2 ];

                  case 1:
                    // This will start the write stream if necessary.
                    t.sent(), t.label = 2;

                  case 2:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * Temporarily disables the network. The network can be re-enabled using
     * enableNetwork().
     */
    t.prototype.disableNetwork = function() {
        return e.__awaiter(this, void 0, void 0, (function() {
            return e.__generator(this, (function(t) {
                switch (t.label) {
                  case 0:
                    return this.Rc.add(0 /* UserDisabled */), [ 4 /*yield*/ , this.Lc() ];

                  case 1:
                    return t.sent(), 
                    // Set the OnlineState to Offline so get()s return from cache, etc.
                    this.pc.set("Offline" /* Offline */), [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.Lc = function() {
        return e.__awaiter(this, void 0, void 0, (function() {
            return e.__generator(this, (function(t) {
                switch (t.label) {
                  case 0:
                    return [ 4 /*yield*/ , this.Dc.stop() ];

                  case 1:
                    return t.sent(), [ 4 /*yield*/ , this.yc.stop() ];

                  case 2:
                    return t.sent(), this.Ec.length > 0 && (h("RemoteStore", "Stopping write stream with " + this.Ec.length + " pending writes"), 
                    this.Ec = []), this.Oc(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.Ur = function() {
        return e.__awaiter(this, void 0, void 0, (function() {
            return e.__generator(this, (function(t) {
                switch (t.label) {
                  case 0:
                    return h("RemoteStore", "RemoteStore shutting down."), this.Rc.add(5 /* Shutdown */), 
                    [ 4 /*yield*/ , this.Lc() ];

                  case 1:
                    return t.sent(), this.mc.Ur(), 
                    // Set the OnlineState to Unknown (rather than Offline) to avoid potentially
                    // triggering spurious listener events with cached data, etc.
                    this.pc.set("Unknown" /* Unknown */), [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * Starts new listen for the given target. Uses resume token if provided. It
     * is a no-op if the target of given `TargetData` is already being listened to.
     */
    t.prototype.listen = function(t) {
        this.Ic.has(t.targetId) || (
        // Mark this as something the client is currently listening for.
        this.Ic.set(t.targetId, t), this.kc() ? 
        // The listen will be sent in onWatchStreamOpen
        this.xc() : this.yc.Vu() && this.Bc(t));
    }, 
    /**
     * Removes the listen from server. It is a no-op if the given target id is
     * not being listened to.
     */
    t.prototype.qc = function(t) {
        this.Ic.delete(t), this.yc.Vu() && this.Uc(t), 0 === this.Ic.size && (this.yc.Vu() ? this.yc.yu() : this.Vc() && 
        // Revert to OnlineState.Unknown if the watch stream is not open and we
        // have no listeners, since without any listens to send we cannot
        // confirm if the stream is healthy and upgrade to OnlineState.Online.
        this.pc.set("Unknown" /* Unknown */));
    }, 
    /** {@link TargetMetadataProvider.getTargetDataForTarget} */ t.prototype.Me = function(t) {
        return this.Ic.get(t) || null;
    }, 
    /** {@link TargetMetadataProvider.getRemoteKeysForTarget} */ t.prototype.xe = function(t) {
        return this.Qc.xe(t);
    }, 
    /**
     * We need to increment the the expected number of pending responses we're due
     * from watch so we wait for the ack to process any messages from this target.
     */
    t.prototype.Bc = function(t) {
        this.Ac.de(t.targetId), this.yc.Ou(t);
    }, 
    /**
     * We need to increment the expected number of pending responses we're due
     * from watch so we wait for the removal on the server before we process any
     * messages from this target.
     */
    t.prototype.Uc = function(t) {
        this.Ac.de(t), this.yc.Bu(t);
    }, t.prototype.xc = function() {
        this.Ac = new vt(this), this.yc.start(), this.pc.lc();
    }, 
    /**
     * Returns whether the watch stream should be started because it's necessary
     * and has not yet been started.
     */
    t.prototype.kc = function() {
        return this.Vc() && !this.yc.Pu() && this.Ic.size > 0;
    }, t.prototype.Vc = function() {
        return 0 === this.Rc.size;
    }, t.prototype.Oc = function() {
        this.Ac = null;
    }, t.prototype.bc = function() {
        return e.__awaiter(this, void 0, void 0, (function() {
            var t = this;
            return e.__generator(this, (function(e) {
                return this.Ic.forEach((function(e, n) {
                    t.Bc(e);
                })), [ 2 /*return*/ ];
            }));
        }));
    }, t.prototype.vc = function(t) {
        return e.__awaiter(this, void 0, void 0, (function() {
            return e.__generator(this, (function(e) {
                return this.Oc(), 
                // If we still need the watch stream, retry the connection.
                this.kc() ? (this.pc.dc(t), this.xc()) : 
                // No need to restart watch stream because there are no active targets.
                // The online state is set to unknown because there is no active attempt
                // at establishing a connection
                this.pc.set("Unknown" /* Unknown */), [ 2 /*return*/ ];
            }));
        }));
    }, t.prototype.Sc = function(t, n) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var r, i, o;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    if (this.pc.set("Online" /* Online */), !(t instanceof dt && 2 /* Removed */ === t.state && t.cause)) 
                    // Mark the client as online since we got a message from the server
                    return [ 3 /*break*/ , 6 ];
                    e.label = 1;

                  case 1:
                    return e.trys.push([ 1, 3, , 5 ]), [ 4 /*yield*/ , this.Wc(t) ];

                  case 2:
                    return e.sent(), [ 3 /*break*/ , 5 ];

                  case 3:
                    return r = e.sent(), h("RemoteStore", "Failed to remove targets %s: %s ", t.targetIds.join(","), r), 
                    [ 4 /*yield*/ , this.jc(r) ];

                  case 4:
                    return e.sent(), [ 3 /*break*/ , 5 ];

                  case 5:
                    return [ 3 /*break*/ , 13 ];

                  case 6:
                    if (t instanceof lt ? this.Ac.Pe(t) : t instanceof pt ? this.Ac.De(t) : this.Ac.pe(t), 
                    n.isEqual(k.min())) return [ 3 /*break*/ , 13 ];
                    e.label = 7;

                  case 7:
                    return e.trys.push([ 7, 11, , 13 ]), [ 4 /*yield*/ , this.Tc.xi() ];

                  case 8:
                    return i = e.sent(), n.o(i) >= 0 ? [ 4 /*yield*/ , this.Kc(n) ] : [ 3 /*break*/ , 10 ];

                    // We have received a target change with a global snapshot if the snapshot
                    // version is not equal to SnapshotVersion.min().
                                      case 9:
                    // We have received a target change with a global snapshot if the snapshot
                    // version is not equal to SnapshotVersion.min().
                    e.sent(), e.label = 10;

                  case 10:
                    return [ 3 /*break*/ , 13 ];

                  case 11:
                    return h("RemoteStore", "Failed to raise snapshot:", o = e.sent()), [ 4 /*yield*/ , this.jc(o) ];

                  case 12:
                    return e.sent(), [ 3 /*break*/ , 13 ];

                  case 13:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * Recovery logic for IndexedDB errors that takes the network offline until
     * `op` succeeds. Retries are scheduled with backoff using
     * `enqueueRetryable()`. If `op()` is not provided, IndexedDB access is
     * validated via a generic operation.
     *
     * The returned Promise is resolved once the network is disabled and before
     * any retry attempt.
     */
    t.prototype.jc = function(t, n) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var r = this;
            return e.__generator(this, (function(i) {
                switch (i.label) {
                  case 0:
                    if (!wr(t)) throw t;
                    // Disable network and raise offline snapshots
                    return this.Rc.add(1 /* IndexedDbFailed */), [ 4 /*yield*/ , this.Lc() ];

                  case 1:
                    // Disable network and raise offline snapshots
                    return i.sent(), this.pc.set("Offline" /* Offline */), n || (
                    // Use a simple read operation to determine if IndexedDB recovered.
                    // Ideally, we would expose a health check directly on SimpleDb, but
                    // RemoteStore only has access to persistence through LocalStore.
                    n = function() {
                        return r.Tc.xi();
                    }), 
                    // Probe IndexedDB periodically and re-enable network
                    this.Oo.Cr((function() {
                        return e.__awaiter(r, void 0, void 0, (function() {
                            return e.__generator(this, (function(t) {
                                switch (t.label) {
                                  case 0:
                                    return h("RemoteStore", "Retrying IndexedDB access"), [ 4 /*yield*/ , n() ];

                                  case 1:
                                    return t.sent(), this.Rc.delete(1 /* IndexedDbFailed */), [ 4 /*yield*/ , this.$c() ];

                                  case 2:
                                    return t.sent(), [ 2 /*return*/ ];
                                }
                            }));
                        }));
                    })), [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * Executes `op`. If `op` fails, takes the network offline until `op`
     * succeeds. Returns after the first attempt.
     */
    t.prototype.Gc = function(t) {
        var e = this;
        return t().catch((function(n) {
            return e.jc(n, t);
        }));
    }, 
    /**
     * Takes a batch of changes from the Datastore, repackages them as a
     * RemoteEvent, and passes that on to the listener, which is typically the
     * SyncEngine.
     */
    t.prototype.Kc = function(t) {
        var e = this, n = this.Ac.Ne(t);
        // Update in-memory resume tokens. LocalStore will update the
        // persistent view of these when applying the completed RemoteEvent.
        // Finally raise remote event
        return n.Qt.forEach((function(n, r) {
            if (n.resumeToken.G() > 0) {
                var i = e.Ic.get(r);
                // A watched target might have been removed already.
                                i && e.Ic.set(r, i.Z(n.resumeToken, t));
            }
        })), 
        // Re-establish listens for the targets that have been invalidated by
        // existence filter mismatches.
        n.Wt.forEach((function(t) {
            var n = e.Ic.get(t);
            if (n) {
                // Clear the resume token for the target, since we're in a known mismatch
                // state.
                e.Ic.set(t, n.Z(F.H, n.J)), 
                // Cause a hard reset by unwatching and rewatching immediately, but
                // deliberately don't send a resume token so that we get a full update.
                e.Uc(t);
                // Mark the target we send as being on behalf of an existence filter
                // mismatch, but don't actually retain that in listenTargets. This ensures
                // that we flag the first re-listen this way without impacting future
                // listens of this target (that might happen e.g. on reconnect).
                var r = new B(n.target, t, 1 /* ExistenceFilterMismatch */ , n.sequenceNumber);
                e.Bc(r);
            }
        })), this.Qc.na(n);
    }, 
    /** Handles an error on a target */ t.prototype.Wc = function(t) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var n, r, i, o;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    n = t.cause, r = 0, i = t.targetIds, e.label = 1;

                  case 1:
                    return r < i.length ? (o = i[r], this.Ic.has(o) ? [ 4 /*yield*/ , this.Qc.zc(o, n) ] : [ 3 /*break*/ , 3 ]) : [ 3 /*break*/ , 5 ];

                  case 2:
                    e.sent(), this.Ic.delete(o), this.Ac.removeTarget(o), e.label = 3;

                  case 3:
                    e.label = 4;

                  case 4:
                    return r++, [ 3 /*break*/ , 1 ];

                  case 5:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * Attempts to fill our write pipeline with writes from the LocalStore.
     *
     * Called internally to bootstrap or refill the write pipeline and by
     * SyncEngine whenever there are new mutations to process.
     *
     * Starts the write stream if necessary.
     */
    t.prototype.Mc = function() {
        return e.__awaiter(this, void 0, void 0, (function() {
            var t, n, r;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    t = this.Ec.length > 0 ? this.Ec[this.Ec.length - 1].batchId : -1, e.label = 1;

                  case 1:
                    if (!this.Hc()) return [ 3 /*break*/ , 7 ];
                    e.label = 2;

                  case 2:
                    return e.trys.push([ 2, 4, , 6 ]), [ 4 /*yield*/ , this.Tc.ha(t) ];

                  case 3:
                    return null === (n = e.sent()) ? (0 === this.Ec.length && this.Dc.yu(), [ 3 /*break*/ , 7 ]) : (t = n.batchId, 
                    this.Yc(n), [ 3 /*break*/ , 6 ]);

                  case 4:
                    return r = e.sent(), [ 4 /*yield*/ , this.jc(r) ];

                  case 5:
                    return e.sent(), [ 3 /*break*/ , 6 ];

                  case 6:
                    return [ 3 /*break*/ , 1 ];

                  case 7:
                    return this.Jc() && this.Xc(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * Returns true if we can add to the write pipeline (i.e. the network is
     * enabled and the write pipeline is not full).
     */
    t.prototype.Hc = function() {
        return this.Vc() && this.Ec.length < 10;
    }, 
    // For testing
    t.prototype.Zc = function() {
        return this.Ec.length;
    }, 
    /**
     * Queues additional writes to be sent to the write stream, sending them
     * immediately if the write stream is established.
     */
    t.prototype.Yc = function(t) {
        this.Ec.push(t), this.Dc.Vu() && this.Dc.Uu && this.Dc.Qu(t.mutations);
    }, t.prototype.Jc = function() {
        return this.Vc() && !this.Dc.Pu() && this.Ec.length > 0;
    }, t.prototype.Xc = function() {
        this.Dc.start();
    }, t.prototype.Cc = function() {
        return e.__awaiter(this, void 0, void 0, (function() {
            return e.__generator(this, (function(t) {
                return this.Dc.Ku(), [ 2 /*return*/ ];
            }));
        }));
    }, t.prototype.Nc = function() {
        return e.__awaiter(this, void 0, void 0, (function() {
            var t, n, r;
            return e.__generator(this, (function(e) {
                // Send the write pipeline now that the stream is established.
                for (t = 0, n = this.Ec; t < n.length; t++) r = n[t], this.Dc.Qu(r.mutations);
                return [ 2 /*return*/ ];
            }));
        }));
    }, t.prototype.Wu = function(t, n) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var r, i, o = this;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return r = this.Ec.shift(), i = tn.from(r, t, n), [ 4 /*yield*/ , this.Gc((function() {
                        return o.Qc.tl(i);
                    })) ];

                  case 1:
                    // It's possible that with the completion of this mutation another
                    // slot has freed up.
                    return e.sent(), [ 4 /*yield*/ , this.Mc() ];

                  case 2:
                    // It's possible that with the completion of this mutation another
                    // slot has freed up.
                    return e.sent(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.Fc = function(t) {
        return e.__awaiter(this, void 0, void 0, (function() {
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return t && this.Dc.Uu ? [ 4 /*yield*/ , this.el(t) ] : [ 3 /*break*/ , 2 ];

                    // This error affects the actual write.
                                      case 1:
                    // This error affects the actual write.
                    e.sent(), e.label = 2;

                  case 2:
                    // If the write stream closed after the write handshake completes, a write
                    // operation failed and we fail the pending operation.
                    // The write stream might have been started by refilling the write
                    // pipeline for failed writes
                    return this.Jc() && this.Xc(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.el = function(t) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var n, r, i = this;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return G(r = t.code) && r !== x.ABORTED ? (n = this.Ec.shift(), 
                    // In this case it's also unlikely that the server itself is melting
                    // down -- this was just a bad request so inhibit backoff on the next
                    // restart.
                    this.Dc.pu(), [ 4 /*yield*/ , this.Gc((function() {
                        return i.Qc.sl(n.batchId, t);
                    })) ]) : [ 3 /*break*/ , 3 ];

                  case 1:
                    // It's possible that with the completion of this mutation
                    // another slot has freed up.
                    return e.sent(), [ 4 /*yield*/ , this.Mc() ];

                  case 2:
                    // In this case it's also unlikely that the server itself is melting
                    // down -- this was just a bad request so inhibit backoff on the next
                    // restart.
                    // It's possible that with the completion of this mutation
                    // another slot has freed up.
                    e.sent(), e.label = 3;

                  case 3:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.nl = function() {
        return new zi(this.Xu);
    }, t.prototype.gc = function() {
        return e.__awaiter(this, void 0, void 0, (function() {
            return e.__generator(this, (function(t) {
                switch (t.label) {
                  case 0:
                    return this.Rc.add(4 /* ConnectivityChange */), [ 4 /*yield*/ , this.Lc() ];

                  case 1:
                    return t.sent(), this.pc.set("Unknown" /* Unknown */), this.Rc.delete(4 /* ConnectivityChange */), 
                    [ 4 /*yield*/ , this.$c() ];

                  case 2:
                    return t.sent(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.il = function(t) {
        return e.__awaiter(this, void 0, void 0, (function() {
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return this.Oo.ah(), 
                    // Tear down and re-create our network streams. This will ensure we get a
                    // fresh auth token for the new user and re-fill the write pipeline with
                    // new mutations from the LocalStore (since mutations are per-user).
                    h("RemoteStore", "RemoteStore received new credentials"), this.Rc.add(3 /* CredentialChange */), 
                    [ 4 /*yield*/ , this.Lc() ];

                  case 1:
                    return e.sent(), this.pc.set("Unknown" /* Unknown */), [ 4 /*yield*/ , this.Qc.il(t) ];

                  case 2:
                    return e.sent(), this.Rc.delete(3 /* CredentialChange */), [ 4 /*yield*/ , this.$c() ];

                  case 3:
                    return e.sent(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * Toggles the network state when the client gains or loses its primary lease.
     */
    t.prototype.rl = function(t) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var n;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return t ? (this.Rc.delete(2 /* IsSecondary */), [ 4 /*yield*/ , this.$c() ]) : [ 3 /*break*/ , 2 ];

                  case 1:
                    return e.sent(), [ 3 /*break*/ , 5 ];

                  case 2:
                    return (n = t) ? [ 3 /*break*/ , 4 ] : (this.Rc.add(2 /* IsSecondary */), [ 4 /*yield*/ , this.Lc() ]);

                  case 3:
                    e.sent(), n = this.pc.set("Unknown" /* Unknown */), e.label = 4;

                  case 4:
                    n, e.label = 5;

                  case 5:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, t;
}();

/** A CredentialsProvider that always yields an empty token. */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// The format of the LocalStorage key that stores the client state is:
//     firestore_clients_<persistence_prefix>_<instance_key>
/** Assembles the key for a client state in WebStorage */
function Ki(t, e) {
    return "firestore_clients_" + t + "_" + e;
}

// The format of the WebStorage key that stores the mutation state is:
//     firestore_mutations_<persistence_prefix>_<batch_id>
//     (for unauthenticated users)
// or: firestore_mutations_<persistence_prefix>_<batch_id>_<user_uid>
// 'user_uid' is last to avoid needing to escape '_' characters that it might
// contain.
/** Assembles the key for a mutation batch in WebStorage */ function Yi(t, e, n) {
    var r = "firestore_mutations_" + t + "_" + n;
    return e.fo() && (r += "_" + e.uid), r;
}

// The format of the WebStorage key that stores a query target's metadata is:
//     firestore_targets_<persistence_prefix>_<target_id>
/** Assembles the key for a query state in WebStorage */ function Xi(t, e) {
    return "firestore_targets_" + t + "_" + e;
}

// The WebStorage prefix that stores the primary tab's online state. The
// format of the key is:
//     firestore_online_state_<persistence_prefix>
/**
 * Holds the state of a mutation batch, including its user ID, batch ID and
 * whether the batch is 'pending', 'acknowledged' or 'rejected'.
 */
// Visible for testing
var $i = /** @class */ function() {
    function t(t, e, n, r) {
        this.user = t, this.batchId = e, this.state = n, this.error = r
        /**
     * Parses a MutationMetadata from its JSON representation in WebStorage.
     * Logs a warning and returns null if the format of the data is not valid.
     */;
    }
    return t.ol = function(e, n, r) {
        var i = JSON.parse(r), o = "object" == typeof i && -1 !== [ "pending", "acknowledged", "rejected" ].indexOf(i.state) && (void 0 === i.error || "object" == typeof i.error), s = void 0;
        return o && i.error && ((o = "string" == typeof i.error.message && "string" == typeof i.error.code) && (s = new S(i.error.code, i.error.message))), 
        o ? new t(e, n, i.state, s) : (f("SharedClientState", "Failed to parse mutation state for ID '" + n + "': " + r), 
        null);
    }, t.prototype.hl = function() {
        var t = {
            state: this.state,
            updateTimeMs: Date.now()
        };
        return this.error && (t.error = {
            code: this.error.code,
            message: this.error.message
        }), JSON.stringify(t);
    }, t;
}(), Ji = /** @class */ function() {
    function t(t, e, n) {
        this.targetId = t, this.state = e, this.error = n
        /**
     * Parses a QueryTargetMetadata from its JSON representation in WebStorage.
     * Logs a warning and returns null if the format of the data is not valid.
     */;
    }
    return t.ol = function(e, n) {
        var r = JSON.parse(n), i = "object" == typeof r && -1 !== [ "not-current", "current", "rejected" ].indexOf(r.state) && (void 0 === r.error || "object" == typeof r.error), o = void 0;
        return i && r.error && ((i = "string" == typeof r.error.message && "string" == typeof r.error.code) && (o = new S(r.error.code, r.error.message))), 
        i ? new t(e, r.state, o) : (f("SharedClientState", "Failed to parse target state for ID '" + e + "': " + n), 
        null);
    }, t.prototype.hl = function() {
        var t = {
            state: this.state,
            updateTimeMs: Date.now()
        };
        return this.error && (t.error = {
            code: this.error.code,
            message: this.error.message
        }), JSON.stringify(t);
    }, t;
}(), Zi = /** @class */ function() {
    function t(t, e) {
        this.clientId = t, this.activeTargetIds = e
        /**
     * Parses a RemoteClientState from the JSON representation in WebStorage.
     * Logs a warning and returns null if the format of the data is not valid.
     */;
    }
    return t.ol = function(e, n) {
        for (var r = JSON.parse(n), i = "object" == typeof r && r.activeTargetIds instanceof Array, o = st(), s = 0; i && s < r.activeTargetIds.length; ++s) i = q(r.activeTargetIds[s]), 
        o = o.add(r.activeTargetIds[s]);
        return i ? new t(e, o) : (f("SharedClientState", "Failed to parse client data for instance '" + e + "': " + n), 
        null);
    }, t;
}(), to = /** @class */ function() {
    function t(t, e) {
        this.clientId = t, this.onlineState = e
        /**
     * Parses a SharedOnlineState from its JSON representation in WebStorage.
     * Logs a warning and returns null if the format of the data is not valid.
     */;
    }
    return t.ol = function(e) {
        var n = JSON.parse(e);
        return "object" == typeof n && -1 !== [ "Unknown", "Online", "Offline" ].indexOf(n.onlineState) && "string" == typeof n.clientId ? new t(n.clientId, n.onlineState) : (f("SharedClientState", "Failed to parse online state: " + e), 
        null);
    }, t;
}(), eo = /** @class */ function() {
    function t() {
        this.activeTargetIds = st();
    }
    return t.prototype.al = function(t) {
        this.activeTargetIds = this.activeTargetIds.add(t);
    }, t.prototype.ul = function(t) {
        this.activeTargetIds = this.activeTargetIds.delete(t);
    }, 
    /**
     * Converts this entry into a JSON-encoded format we can use for WebStorage.
     * Does not encode `clientId` as it is part of the key in WebStorage.
     */
    t.prototype.hl = function() {
        var t = {
            activeTargetIds: this.activeTargetIds.F(),
            updateTimeMs: Date.now()
        };
        return JSON.stringify(t);
    }, t;
}(), no = /** @class */ function() {
    function t(t, e, n, r, i) {
        this.window = t, this.Wn = e, this.persistenceKey = n, this.cl = r, this.Qc = null, 
        this.hc = null, this.On = null, this.ll = this._l.bind(this), this.fl = new W(m), 
        this.pr = !1, 
        /**
             * Captures WebStorage events that occur before `start()` is called. These
             * events are replayed once `WebStorageSharedClientState` is started.
             */
        this.dl = [];
        // Escape the special characters mentioned here:
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
        var o = n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        this.storage = this.window.localStorage, this.currentUser = i, this.wl = Ki(this.persistenceKey, this.cl), 
        this.Tl = 
        /** Assembles the key for the current sequence number. */
        function(t) {
            return "firestore_sequence_number_" + t;
        }(this.persistenceKey), this.fl = this.fl.et(this.cl, new eo), this.El = new RegExp("^firestore_clients_" + o + "_([^_]*)$"), 
        this.Il = new RegExp("^firestore_mutations_" + o + "_(\\d+)(?:_(.*))?$"), this.Al = new RegExp("^firestore_targets_" + o + "_(\\d+)$"), 
        this.Rl = 
        /** Assembles the key for the online state of the primary tab. */
        function(t) {
            return "firestore_online_state_" + t;
        }(this.persistenceKey), 
        // Rather than adding the storage observer during start(), we add the
        // storage observer during initialization. This ensures that we collect
        // events before other components populate their initial state (during their
        // respective start() calls). Otherwise, we might for example miss a
        // mutation that is added after LocalStore's start() processed the existing
        // mutations but before we observe WebStorage events.
        this.window.addEventListener("storage", this.ll);
    }
    /** Returns 'true' if WebStorage is available in the current environment. */    return t._r = function(t) {
        return !(!t || !t.localStorage);
    }, t.prototype.start = function() {
        return e.__awaiter(this, void 0, void 0, (function() {
            var t, n, r, i, o, s, u, a, c, h, f, l = this;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return [ 4 /*yield*/ , this.Qc.Gr() ];

                  case 1:
                    for (t = e.sent(), n = 0, r = t; n < r.length; n++) (i = r[n]) !== this.cl && (o = this.getItem(Ki(this.persistenceKey, i))) && (s = Zi.ol(i, o)) && (this.fl = this.fl.et(s.clientId, s));
                    for (this.ml(), (u = this.storage.getItem(this.Rl)) && (a = this.Pl(u)) && this.Vl(a), 
                    c = 0, h = this.dl; c < h.length; c++) f = h[c], this._l(f);
                    return this.dl = [], 
                    // Register a window unload hook to remove the client metadata entry from
                    // WebStorage even if `shutdown()` was not called.
                    this.window.addEventListener("unload", (function() {
                        return l.Ur();
                    })), this.pr = !0, [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.Un = function(t) {
        this.setItem(this.Tl, JSON.stringify(t));
    }, t.prototype.gl = function() {
        return this.pl(this.fl);
    }, t.prototype.yl = function(t) {
        var e = !1;
        return this.fl.forEach((function(n, r) {
            r.activeTargetIds.has(t) && (e = !0);
        })), e;
    }, t.prototype.bl = function(t) {
        this.vl(t, "pending");
    }, t.prototype.Sl = function(t, e, n) {
        this.vl(t, e, n), 
        // Once a final mutation result is observed by other clients, they no longer
        // access the mutation's metadata entry. Since WebStorage replays events
        // in order, it is safe to delete the entry right after updating it.
        this.Dl(t);
    }, t.prototype.Cl = function(t) {
        var e = "not-current";
        // Lookup an existing query state if the target ID was already registered
        // by another tab
                if (this.yl(t)) {
            var n = this.storage.getItem(Xi(this.persistenceKey, t));
            if (n) {
                var r = Ji.ol(t, n);
                r && (e = r.state);
            }
        }
        return this.Fl.al(t), this.ml(), e;
    }, t.prototype.Nl = function(t) {
        this.Fl.ul(t), this.ml();
    }, t.prototype.$l = function(t) {
        return this.Fl.activeTargetIds.has(t);
    }, t.prototype.kl = function(t) {
        this.removeItem(Xi(this.persistenceKey, t));
    }, t.prototype.xl = function(t, e, n) {
        this.Ml(t, e, n);
    }, t.prototype.Hh = function(t, e, n) {
        var r = this;
        e.forEach((function(t) {
            r.Dl(t);
        })), this.currentUser = t, n.forEach((function(t) {
            r.bl(t);
        }));
    }, t.prototype.Ll = function(t) {
        this.Ol(t);
    }, t.prototype.Ur = function() {
        this.pr && (this.window.removeEventListener("storage", this.ll), this.removeItem(this.wl), 
        this.pr = !1);
    }, t.prototype.getItem = function(t) {
        var e = this.storage.getItem(t);
        return h("SharedClientState", "READ", t, e), e;
    }, t.prototype.setItem = function(t, e) {
        h("SharedClientState", "SET", t, e), this.storage.setItem(t, e);
    }, t.prototype.removeItem = function(t) {
        h("SharedClientState", "REMOVE", t), this.storage.removeItem(t);
    }, t.prototype._l = function(t) {
        var n = this, r = t;
        // Note: The function is typed to take Event to be interface-compatible with
        // `Window.addEventListener`.
                if (r.storageArea === this.storage) {
            if (h("SharedClientState", "EVENT", r.key, r.newValue), r.key === this.wl) return void f("Received WebStorage notification for local change. Another client might have garbage-collected our state");
            this.Wn.Cr((function() {
                return e.__awaiter(n, void 0, void 0, (function() {
                    var t, n, i, o, s, u;
                    return e.__generator(this, (function(e) {
                        if (this.pr) {
                            if (null !== r.key) if (this.El.test(r.key)) {
                                if (null == r.newValue) return t = this.Bl(r.key), [ 2 /*return*/ , this.ql(t, null) ];
                                if (n = this.Ul(r.key, r.newValue)) return [ 2 /*return*/ , this.ql(n.clientId, n) ];
                            } else if (this.Il.test(r.key)) {
                                if (null !== r.newValue && (i = this.Ql(r.key, r.newValue))) return [ 2 /*return*/ , this.Wl(i) ];
                            } else if (this.Al.test(r.key)) {
                                if (null !== r.newValue && (o = this.jl(r.key, r.newValue))) return [ 2 /*return*/ , this.Kl(o) ];
                            } else if (r.key === this.Rl) {
                                if (null !== r.newValue && (s = this.Pl(r.newValue))) return [ 2 /*return*/ , this.Vl(s) ];
                            } else r.key === this.Tl && (u = function(t) {
                                var e = an.Qn;
                                if (null != t) try {
                                    var n = JSON.parse(t);
                                    d("number" == typeof n), e = n;
                                } catch (t) {
                                    f("SharedClientState", "Failed to read sequence number from WebStorage", t);
                                }
                                return e;
                            }(r.newValue)) !== an.Qn && this.On(u);
                        } else this.dl.push(r);
                        return [ 2 /*return*/ ];
                    }));
                }));
            }));
        }
    }, Object.defineProperty(t.prototype, "Fl", {
        get: function() {
            return this.fl.get(this.cl);
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.ml = function() {
        this.setItem(this.wl, this.Fl.hl());
    }, t.prototype.vl = function(t, e, n) {
        var r = new $i(this.currentUser, t, e, n), i = Yi(this.persistenceKey, this.currentUser, t);
        this.setItem(i, r.hl());
    }, t.prototype.Dl = function(t) {
        var e = Yi(this.persistenceKey, this.currentUser, t);
        this.removeItem(e);
    }, t.prototype.Ol = function(t) {
        var e = {
            clientId: this.cl,
            onlineState: t
        };
        this.storage.setItem(this.Rl, JSON.stringify(e));
    }, t.prototype.Ml = function(t, e, n) {
        var r = Xi(this.persistenceKey, t), i = new Ji(t, e, n);
        this.setItem(r, i.hl());
    }, 
    /**
     * Parses a client state key in WebStorage. Returns null if the key does not
     * match the expected key format.
     */
    t.prototype.Bl = function(t) {
        var e = this.El.exec(t);
        return e ? e[1] : null;
    }, 
    /**
     * Parses a client state in WebStorage. Returns 'null' if the value could not
     * be parsed.
     */
    t.prototype.Ul = function(t, e) {
        var n = this.Bl(t);
        return Zi.ol(n, e);
    }, 
    /**
     * Parses a mutation batch state in WebStorage. Returns 'null' if the value
     * could not be parsed.
     */
    t.prototype.Ql = function(t, e) {
        var n = this.Il.exec(t), r = Number(n[1]), i = void 0 !== n[2] ? n[2] : null;
        return $i.ol(new Li(i), r, e);
    }, 
    /**
     * Parses a query target state from WebStorage. Returns 'null' if the value
     * could not be parsed.
     */
    t.prototype.jl = function(t, e) {
        var n = this.Al.exec(t), r = Number(n[1]);
        return Ji.ol(r, e);
    }, 
    /**
     * Parses an online state from WebStorage. Returns 'null' if the value
     * could not be parsed.
     */
    t.prototype.Pl = function(t) {
        return to.ol(t);
    }, t.prototype.Wl = function(t) {
        return e.__awaiter(this, void 0, void 0, (function() {
            return e.__generator(this, (function(e) {
                return t.user.uid === this.currentUser.uid ? [ 2 /*return*/ , this.Qc.Gl(t.batchId, t.state, t.error) ] : (h("SharedClientState", "Ignoring mutation for non-active user " + t.user.uid), 
                [ 2 /*return*/ ]);
            }));
        }));
    }, t.prototype.Kl = function(t) {
        return this.Qc.zl(t.targetId, t.state, t.error);
    }, t.prototype.ql = function(t, e) {
        var n = this, r = e ? this.fl.et(t, e) : this.fl.remove(t), i = this.pl(this.fl), o = this.pl(r), s = [], u = [];
        return o.forEach((function(t) {
            i.has(t) || s.push(t);
        })), i.forEach((function(t) {
            o.has(t) || u.push(t);
        })), this.Qc.Hl(s, u).then((function() {
            n.fl = r;
        }));
    }, t.prototype.Vl = function(t) {
        // We check whether the client that wrote this online state is still active
        // by comparing its client ID to the list of clients kept active in
        // IndexedDb. If a client does not update their IndexedDb client state
        // within 5 seconds, it is considered inactive and we don't emit an online
        // state event.
        this.fl.get(t.clientId) && this.hc(t.onlineState);
    }, t.prototype.pl = function(t) {
        var e = st();
        return t.forEach((function(t, n) {
            e = e.Ct(n.activeTargetIds);
        })), e;
    }, t;
}(), ro = /** @class */ function() {
    function t() {
        this.Yl = new eo, this.Jl = {}, this.Qc = null, this.hc = null, this.On = null;
    }
    return t.prototype.bl = function(t) {
        // No op.
    }, t.prototype.Sl = function(t, e, n) {
        // No op.
    }, t.prototype.Cl = function(t) {
        return this.Yl.al(t), this.Jl[t] || "not-current";
    }, t.prototype.xl = function(t, e, n) {
        this.Jl[t] = e;
    }, t.prototype.Nl = function(t) {
        this.Yl.ul(t);
    }, t.prototype.$l = function(t) {
        return this.Yl.activeTargetIds.has(t);
    }, t.prototype.kl = function(t) {
        delete this.Jl[t];
    }, t.prototype.gl = function() {
        return this.Yl.activeTargetIds;
    }, t.prototype.yl = function(t) {
        return this.Yl.activeTargetIds.has(t);
    }, t.prototype.start = function() {
        return this.Yl = new eo, Promise.resolve();
    }, t.prototype.Hh = function(t, e, n) {
        // No op.
    }, t.prototype.Ll = function(t) {
        // No op.
    }, t.prototype.Ur = function() {}, t.prototype.Un = function(t) {}, t;
}(), io = function(t) {
    this.key = t;
}, oo = function(t) {
    this.key = t;
}, so = /** @class */ function() {
    function t(t, 
    /** Documents included in the remote target */
    e) {
        this.query = t, this.Xl = e, this.Zl = null, 
        /**
             * A flag whether the view is current with the backend. A view is considered
             * current after it has seen the current flag from the backend and did not
             * lose consistency within the watch stream (e.g. because of an existence
             * filter mismatch).
             */
        this.Ht = !1, 
        /** Documents in the view but not in the remote target */
        this.t_ = it(), 
        /** Document Keys that have local changes */
        this.Ot = it(), this.e_ = new ut(t.Ds.bind(t));
    }
    return Object.defineProperty(t.prototype, "s_", {
        /**
         * The set of remote documents that the server has told us belongs to the target associated with
         * this view.
         */
        get: function() {
            return this.Xl;
        },
        enumerable: !0,
        configurable: !0
    }), 
    /**
     * Iterates over a set of doc changes, applies the query limit, and computes
     * what the new results should be, what the changes were, and whether we may
     * need to go back to the local cache for more results. Does not make any
     * changes to the view.
     * @param docChanges The doc changes to apply to this view.
     * @param previousChanges If this is being called with a refill, then start
     *        with this set of docs and changes instead of the current view.
     * @return a new set of docs, changes, and refill flag.
     */
    t.prototype.n_ = function(t, e) {
        var n = this, r = e ? e.i_ : new at, i = e ? e.e_ : this.e_, o = e ? e.Ot : this.Ot, s = i, u = !1, a = this.query.ks() && i.size === this.query.limit ? i.last() : null, c = this.query.xs() && i.size === this.query.limit ? i.first() : null;
        // Drop documents out to meet limit/limitToLast requirement.
        if (t.ot((function(t, e) {
            var h = i.get(t), f = e instanceof Oe ? e : null;
            f && (f = n.query.matches(f) ? f : null);
            var l = !!h && n.Ot.has(h.key), p = !!f && (f.Xe || 
            // We only consider committed mutations for documents that were
            // mutated during the lifetime of the view.
            n.Ot.has(f.key) && f.hasCommittedMutations), d = !1;
            // Calculate change
            h && f ? h.data().isEqual(f.data()) ? l !== p && (r.track({
                type: 3 /* Metadata */ ,
                doc: f
            }), d = !0) : n.r_(h, f) || (r.track({
                type: 2 /* Modified */ ,
                doc: f
            }), d = !0, (a && n.query.Ds(f, a) > 0 || c && n.query.Ds(f, c) < 0) && (
            // This doc moved from inside the limit to outside the limit.
            // That means there may be some other doc in the local cache
            // that should be included instead.
            u = !0)) : !h && f ? (r.track({
                type: 0 /* Added */ ,
                doc: f
            }), d = !0) : h && !f && (r.track({
                type: 1 /* Removed */ ,
                doc: h
            }), d = !0, (a || c) && (
            // A doc was removed from a full limit query. We'll need to
            // requery from the local cache to see if we know about some other
            // doc that should be in the results.
            u = !0)), d && (f ? (s = s.add(f), o = p ? o.add(t) : o.delete(t)) : (s = s.delete(t), 
            o = o.delete(t)));
        })), this.query.ks() || this.query.xs()) for (;s.size > this.query.limit; ) {
            var h = this.query.ks() ? s.last() : s.first();
            s = s.delete(h.key), o = o.delete(h.key), r.track({
                type: 1 /* Removed */ ,
                doc: h
            });
        }
        return {
            e_: s,
            i_: r,
            o_: u,
            Ot: o
        };
    }, t.prototype.r_ = function(t, e) {
        // We suppress the initial change event for documents that were modified as
        // part of a write acknowledgment (e.g. when the value of a server transform
        // is applied) as Watch will send us the same document again.
        // By suppressing the event, we only raise two user visible events (one with
        // `hasPendingWrites` and the final state of the document) instead of three
        // (one with `hasPendingWrites`, the modified document with
        // `hasPendingWrites` and the final state of the document).
        return t.Xe && e.hasCommittedMutations && !e.Xe;
    }, 
    /**
     * Updates the view with the given ViewDocumentChanges and optionally updates
     * limbo docs and sync state from the provided target change.
     * @param docChanges The set of changes to make to the view's docs.
     * @param updateLimboDocuments Whether to update limbo documents based on this
     *        change.
     * @param targetChange A target change to apply for computing limbo docs and
     *        sync state.
     * @return A new ViewChange with the given docs, changes, and sync state.
     */
    // PORTING NOTE: The iOS/Android clients always compute limbo document changes.
    t.prototype.wn = function(t, e, n) {
        var r = this, i = this.e_;
        this.e_ = t.e_, this.Ot = t.Ot;
        // Sort changes based on type and query comparator
        var o = t.i_.Mt();
        o.sort((function(t, e) {
            return function(t, e) {
                var n = function(t) {
                    switch (t) {
                      case 0 /* Added */ :
                        return 1;

                      case 2 /* Modified */ :
                      case 3 /* Metadata */ :
                        // A metadata change is converted to a modified change at the public
                        // api layer.  Since we sort by document key and then change type,
                        // metadata and modified changes must be sorted equivalently.
                        return 2;

                      case 1 /* Removed */ :
                        return 0;

                      default:
                        return p();
                    }
                };
                return n(t) - n(e);
            }(t.type, e.type) || r.query.Ds(t.doc, e.doc);
        })), this.h_(n);
        var s = e ? this.a_() : [], u = 0 === this.t_.size && this.Ht ? 1 /* Synced */ : 0 /* Local */ , a = u !== this.Zl;
        return this.Zl = u, 0 !== o.length || a ? {
            snapshot: new ct(this.query, t.e_, i, o, t.Ot, 0 /* Local */ === u, a, 
            /* excludesMetadataChanges= */ !1),
            u_: s
        } : {
            u_: s
        };
        // no changes
        }, 
    /**
     * Applies an OnlineState change to the view, potentially generating a
     * ViewChange if the view's syncState changes as a result.
     */
    t.prototype.c_ = function(t) {
        return this.Ht && "Offline" /* Offline */ === t ? (
        // If we're offline, set `current` to false and then call applyChanges()
        // to refresh our syncState and generate a ViewChange as appropriate. We
        // are guaranteed to get a new TargetChange that sets `current` back to
        // true once the client is back online.
        this.Ht = !1, this.wn({
            e_: this.e_,
            i_: new at,
            Ot: this.Ot,
            o_: !1
        }, 
        /* updateLimboDocuments= */ !1)) : {
            u_: []
        };
    }, 
    /**
     * Returns whether the doc for the given key should be in limbo.
     */
    t.prototype.l_ = function(t) {
        // If the remote end says it's part of this query, it's not in limbo.
        return !this.Xl.has(t) && 
        // The local store doesn't think it's a result, so it shouldn't be in limbo.
        !!this.e_.has(t) && !this.e_.get(t).Xe;
    }, 
    /**
     * Updates syncedDocuments, current, and limbo docs based on the given change.
     * Returns the list of changes to which docs are in limbo.
     */
    t.prototype.h_ = function(t) {
        var e = this;
        t && (t.Yt.forEach((function(t) {
            return e.Xl = e.Xl.add(t);
        })), t.Jt.forEach((function(t) {})), t.Xt.forEach((function(t) {
            return e.Xl = e.Xl.delete(t);
        })), this.Ht = t.Ht);
    }, t.prototype.a_ = function() {
        var t = this;
        // We can only determine limbo documents when we're in-sync with the server.
                if (!this.Ht) return [];
        // TODO(klimt): Do this incrementally so that it's not quadratic when
        // updating many documents.
                var e = this.t_;
        this.t_ = it(), this.e_.forEach((function(e) {
            t.l_(e.key) && (t.t_ = t.t_.add(e.key));
        }));
        // Diff the new limbo docs with the old limbo docs.
        var n = [];
        return e.forEach((function(e) {
            t.t_.has(e) || n.push(new oo(e));
        })), this.t_.forEach((function(t) {
            e.has(t) || n.push(new io(t));
        })), n;
    }, 
    /**
     * Update the in-memory state of the current view with the state read from
     * persistence.
     *
     * We update the query view whenever a client's primary status changes:
     * - When a client transitions from primary to secondary, it can miss
     *   LocalStorage updates and its query views may temporarily not be
     *   synchronized with the state on disk.
     * - For secondary to primary transitions, the client needs to update the list
     *   of `syncedDocuments` since secondary clients update their query views
     *   based purely on synthesized RemoteEvents.
     *
     * @param queryResult.documents - The documents that match the query according
     * to the LocalStore.
     * @param queryResult.remoteKeys - The keys of the documents that match the
     * query according to the backend.
     *
     * @return The ViewChange that resulted from this synchronization.
     */
    // PORTING NOTE: Multi-tab only.
    t.prototype.__ = function(t) {
        this.Xl = t._a, this.t_ = it();
        var e = this.n_(t.documents);
        return this.wn(e, /*updateLimboDocuments=*/ !0);
    }, 
    /**
     * Returns a view snapshot as if this query was just listened to. Contains
     * a document add for every existing document and the `fromCache` and
     * `hasPendingWrites` status of the already established view.
     */
    // PORTING NOTE: Multi-tab only.
    t.prototype.f_ = function() {
        return ct.Ut(this.query, this.e_, this.Ot, 0 /* Local */ === this.Zl);
    }, t;
}(), uo = /** @class */ function() {
    function t(t, e, n, r) {
        this.Oo = t, this.Xu = e, this.updateFunction = n, this.Uo = r, this.d_ = 5, this.Zo = new hn(this.Oo, "transaction_retry" /* TransactionRetry */)
        /** Runs the transaction and sets the result on deferred. */;
    }
    return t.prototype.w_ = function() {
        this.T_();
    }, t.prototype.T_ = function() {
        var t = this;
        this.Zo.Zn((function() {
            return e.__awaiter(t, void 0, void 0, (function() {
                var t, n, r = this;
                return e.__generator(this, (function(e) {
                    return t = new zi(this.Xu), (n = this.E_(t)) && n.then((function(e) {
                        r.Oo.Sr((function() {
                            return t.commit().then((function() {
                                r.Uo.resolve(e);
                            })).catch((function(t) {
                                r.I_(t);
                            }));
                        }));
                    })).catch((function(t) {
                        r.I_(t);
                    })), [ 2 /*return*/ ];
                }));
            }));
        }));
    }, t.prototype.E_ = function(t) {
        try {
            var e = this.updateFunction(t);
            return !V(e) && e.catch && e.then ? e : (this.Uo.reject(Error("Transaction callback must return a Promise")), 
            null);
        } catch (t) {
            // Do not retry errors thrown by user provided updateFunction.
            return this.Uo.reject(t), null;
        }
    }, t.prototype.I_ = function(t) {
        var e = this;
        this.d_ > 0 && this.A_(t) ? (this.d_ -= 1, this.Oo.Sr((function() {
            return e.T_(), Promise.resolve();
        }))) : this.Uo.reject(t);
    }, t.prototype.A_ = function(t) {
        if ("FirebaseError" === t.name) {
            // In transactions, the backend will fail outdated reads with FAILED_PRECONDITION and
            // non-matching document versions with ABORTED. These errors should be retried.
            var e = t.code;
            return "aborted" === e || "failed-precondition" === e || !G(e);
        }
        return !1;
    }, t;
}(), ao = function(
/**
     * The query itself.
     */
t, 
/**
     * The target number created by the client that is used in the watch
     * stream to identify this query.
     */
e, 
/**
     * The view is responsible for computing the final merged truth of what
     * docs are in the query. It gets notified of local and remote changes,
     * and applies the query filters and limits to determine the most correct
     * possible results.
     */
n) {
    this.query = t, this.targetId = e, this.view = n;
}, co = function(t) {
    this.key = t, 
    /**
             * Set to true once we've received a document. This is used in
             * getRemoteKeysForTarget() and ultimately used by WatchChangeAggregator to
             * decide whether it needs to manufacture a delete event for the target once
             * the target is CURRENT.
             */
    this.R_ = !1;
}, ho = /** @class */ function() {
    function t(t, e, n, 
    // PORTING NOTE: Manages state synchronization in multi-tab environments.
    r, i, o) {
        this.Tc = t, this.m_ = e, this.Xu = n, this.P_ = r, this.currentUser = i, this.V_ = o, 
        this.g_ = null, this.p_ = new A((function(t) {
            return t.canonicalId();
        }), (function(t, e) {
            return t.isEqual(e);
        })), this.y_ = new Map, 
        /**
             * The keys of documents that are in limbo for which we haven't yet started a
             * limbo resolution query.
             */
        this.b_ = [], 
        /**
             * Keeps track of the target ID for each document that is in limbo with an
             * active target.
             */
        this.v_ = new W(L.P), 
        /**
             * Keeps track of the information about an active limbo resolution for each
             * active target ID that was started for the purpose of limbo resolution.
             */
        this.S_ = new Map, this.D_ = new qr, 
        /** Stores user completion handlers, indexed by User and BatchId. */
        this.C_ = {}, 
        /** Stores user callbacks waiting for all pending writes to be acknowledged. */
        this.F_ = new Map, this.N_ = Un.Ci(), this.onlineState = "Unknown" /* Unknown */;
    }
    return Object.defineProperty(t.prototype, "k_", {
        get: function() {
            return !0;
        },
        enumerable: !0,
        configurable: !0
    }), 
    /** Subscribes to SyncEngine notifications. Has to be called exactly once. */ t.prototype.subscribe = function(t) {
        this.g_ = t;
    }, 
    /**
     * Initiates the new listen, resolves promise when listen enqueued to the
     * server. All the subsequent view snapshots or errors are sent to the
     * subscribed handlers. Returns the initial snapshot.
     */
    t.prototype.listen = function(t) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var n, r, i, o, s;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return this.x_("listen()"), (i = this.p_.get(t)) ? (
                    // PORTING NOTE: With Multi-Tab Web, it is possible that a query view
                    // already exists when EventManager calls us for the first time. This
                    // happens when the primary tab is already listening to this query on
                    // behalf of another tab and the user of the primary also starts listening
                    // to the query. EventManager will not have an assigned target ID in this
                    // case and calls `listen` to obtain this ID.
                    n = i.targetId, this.P_.Cl(n), r = i.view.f_(), [ 3 /*break*/ , 4 ]) : [ 3 /*break*/ , 1 ];

                  case 1:
                    return [ 4 /*yield*/ , this.Tc.ua(t.We()) ];

                  case 2:
                    return o = e.sent(), s = this.P_.Cl(o.targetId), n = o.targetId, [ 4 /*yield*/ , this.M_(t, n, "current" === s) ];

                  case 3:
                    r = e.sent(), this.k_ && this.m_.listen(o), e.label = 4;

                  case 4:
                    return [ 2 /*return*/ , r ];
                }
            }));
        }));
    }, 
    /**
     * Registers a view for a previously unknown query and computes its initial
     * snapshot.
     */
    t.prototype.M_ = function(t, n, r) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var i, o, s, u, a, c;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return [ 4 /*yield*/ , this.Tc.la(t, 
                    /* usePreviousResults= */ !0) ];

                  case 1:
                    return i = e.sent(), o = new so(t, i._a), s = o.n_(i.documents), u = ft.zt(n, r && "Offline" /* Offline */ !== this.onlineState), 
                    a = o.wn(s, 
                    /* updateLimboDocuments= */ this.k_, u), this.L_(n, a.u_), c = new ao(t, n, o), 
                    [ 2 /*return*/ , (this.p_.set(t, c), this.y_.has(n) ? this.y_.get(n).push(t) : this.y_.set(n, [ t ]), 
                    a.snapshot) ];
                }
            }));
        }));
    }, 
    /** Stops listening to the query. */ t.prototype.qc = function(t) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var n, r, i = this;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    // Only clean up the query view and target if this is the only query mapped
                    // to the target.
                    return this.x_("unlisten()"), n = this.p_.get(t), (r = this.y_.get(n.targetId)).length > 1 ? [ 2 /*return*/ , (this.y_.set(n.targetId, r.filter((function(e) {
                        return !e.isEqual(t);
                    }))), void this.p_.delete(t)) ] : this.k_ ? (
                    // We need to remove the local query target first to allow us to verify
                    // whether any other client is still interested in this target.
                    this.P_.Nl(n.targetId), this.P_.yl(n.targetId) ? [ 3 /*break*/ , 2 ] : [ 4 /*yield*/ , this.Tc.ca(n.targetId, /*keepPersistedTargetData=*/ !1).then((function() {
                        i.P_.kl(n.targetId), i.m_.qc(n.targetId), i.O_(n.targetId);
                    })).catch(Cr) ]) : [ 3 /*break*/ , 3 ];

                  case 1:
                    e.sent(), e.label = 2;

                  case 2:
                    return [ 3 /*break*/ , 5 ];

                  case 3:
                    return this.O_(n.targetId), [ 4 /*yield*/ , this.Tc.ca(n.targetId, 
                    /*keepPersistedTargetData=*/ !0) ];

                  case 4:
                    e.sent(), e.label = 5;

                  case 5:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * Initiates the write of local mutation batch which involves adding the
     * writes to the mutation queue, notifying the remote store about new
     * mutations and raising events for any changes this write caused.
     *
     * The promise returned by this call is resolved when the above steps
     * have completed, *not* when the write was acked by the backend. The
     * userCallback is resolved once the write was acked/rejected by the
     * backend (or failed locally for any other reason).
     */
    t.prototype.write = function(t, n) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var r, i, o;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    this.x_("write()"), e.label = 1;

                  case 1:
                    return e.trys.push([ 1, 5, , 6 ]), [ 4 /*yield*/ , this.Tc.Zh(t) ];

                  case 2:
                    return r = e.sent(), this.P_.bl(r.batchId), this.B_(r.batchId, n), [ 4 /*yield*/ , this.q_(r.on) ];

                  case 3:
                    return e.sent(), [ 4 /*yield*/ , this.m_.Mc() ];

                  case 4:
                    return e.sent(), [ 3 /*break*/ , 6 ];

                  case 5:
                    return i = e.sent(), o = Sr(i, "Failed to persist write"), n.reject(o), [ 3 /*break*/ , 6 ];

                  case 6:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * Takes an updateFunction in which a set of reads and writes can be performed
     * atomically. In the updateFunction, the client can read and write values
     * using the supplied transaction object. After the updateFunction, all
     * changes will be committed. If a retryable error occurs (ex: some other
     * client has changed any of the data referenced), then the updateFunction
     * will be called again after a backoff. If the updateFunction still fails
     * after all retries, then the transaction will be rejected.
     *
     * The transaction object passed to the updateFunction contains methods for
     * accessing documents and collections. Unlike other datastore access, data
     * accessed with the transaction will not reflect local changes that have not
     * been committed. For this reason, it is required that all reads are
     * performed before any writes. Transactions must be performed while online.
     *
     * The Deferred input is resolved when the transaction is fully committed.
     */
    t.prototype.runTransaction = function(t, e, n) {
        new uo(t, this.Xu, e, n).w_();
    }, t.prototype.na = function(t) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var n, r = this;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    this.x_("applyRemoteEvent()"), e.label = 1;

                  case 1:
                    return e.trys.push([ 1, 4, , 6 ]), [ 4 /*yield*/ , this.Tc.na(t) ];

                  case 2:
                    return n = e.sent(), 
                    // Update `receivedDocument` as appropriate for any limbo targets.
                    t.Qt.forEach((function(t, e) {
                        var n = r.S_.get(e);
                        n && (
                        // Since this is a limbo resolution lookup, it's for a single document
                        // and it could be added, modified, or removed, but not a combination.
                        d(t.Yt.size + t.Jt.size + t.Xt.size <= 1), t.Yt.size > 0 ? n.R_ = !0 : t.Jt.size > 0 ? d(n.R_) : t.Xt.size > 0 && (d(n.R_), 
                        n.R_ = !1));
                    })), [ 4 /*yield*/ , this.q_(n, t) ];

                  case 3:
                    // Update `receivedDocument` as appropriate for any limbo targets.
                    return e.sent(), [ 3 /*break*/ , 6 ];

                  case 4:
                    return [ 4 /*yield*/ , Cr(e.sent()) ];

                  case 5:
                    return e.sent(), [ 3 /*break*/ , 6 ];

                  case 6:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * Applies an OnlineState change to the sync engine and notifies any views of
     * the change.
     */
    t.prototype.c_ = function(t, e) {
        this.x_("applyOnlineStateChange()");
        var n = [];
        this.p_.forEach((function(e, r) {
            var i = r.view.c_(t);
            i.snapshot && n.push(i.snapshot);
        })), this.g_.U_(t), this.g_.Lu(n), this.onlineState = t;
    }, t.prototype.zc = function(t, n) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var r, i, o, s, u, a = this;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return this.x_("rejectListens()"), 
                    // PORTING NOTE: Multi-tab only.
                    this.P_.xl(t, "rejected", n), r = this.S_.get(t), (i = r && r.key) ? (o = (o = new W(L.P)).et(i, new Ue(i, k.min())), 
                    s = it().add(i), u = new ht(k.min(), 
                    /* targetChanges= */ new Map, 
                    /* targetMismatches= */ new Y(m), o, s), [ 4 /*yield*/ , this.na(u) ]) : [ 3 /*break*/ , 2 ];

                  case 1:
                    return e.sent(), 
                    // Since this query failed, we won't want to manually unlisten to it.
                    // We only remove it from bookkeeping after we successfully applied the
                    // RemoteEvent. If `applyRemoteEvent()` throws, we want to re-listen to
                    // this query when the RemoteStore restarts the Watch stream, which should
                    // re-trigger the target failure.
                    this.v_ = this.v_.remove(i), this.S_.delete(t), this.Q_(), [ 3 /*break*/ , 4 ];

                  case 2:
                    return [ 4 /*yield*/ , this.Tc.ca(t, /* keepPersistedTargetData */ !1).then((function() {
                        return a.O_(t, n);
                    })).catch(Cr) ];

                  case 3:
                    e.sent(), e.label = 4;

                  case 4:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.tl = function(t) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var n, r;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    this.x_("applySuccessfulWrite()"), n = t.batch.batchId, e.label = 1;

                  case 1:
                    return e.trys.push([ 1, 4, , 6 ]), [ 4 /*yield*/ , this.Tc.ta(t) ];

                  case 2:
                    return r = e.sent(), 
                    // The local store may or may not be able to apply the write result and
                    // raise events immediately (depending on whether the watcher is caught
                    // up), so we raise user callbacks first so that they consistently happen
                    // before listen events.
                    this.W_(n, /*error=*/ null), this.j_(n), this.P_.Sl(n, "acknowledged"), [ 4 /*yield*/ , this.q_(r) ];

                  case 3:
                    // The local store may or may not be able to apply the write result and
                    // raise events immediately (depending on whether the watcher is caught
                    // up), so we raise user callbacks first so that they consistently happen
                    // before listen events.
                    return e.sent(), [ 3 /*break*/ , 6 ];

                  case 4:
                    return [ 4 /*yield*/ , Cr(e.sent()) ];

                  case 5:
                    return e.sent(), [ 3 /*break*/ , 6 ];

                  case 6:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.sl = function(t, n) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var r;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    this.x_("rejectFailedWrite()"), e.label = 1;

                  case 1:
                    return e.trys.push([ 1, 4, , 6 ]), [ 4 /*yield*/ , this.Tc.sa(t) ];

                  case 2:
                    return r = e.sent(), 
                    // The local store may or may not be able to apply the write result and
                    // raise events immediately (depending on whether the watcher is caught up),
                    // so we raise user callbacks first so that they consistently happen before
                    // listen events.
                    this.W_(t, n), this.j_(t), this.P_.Sl(t, "rejected", n), [ 4 /*yield*/ , this.q_(r) ];

                  case 3:
                    // The local store may or may not be able to apply the write result and
                    // raise events immediately (depending on whether the watcher is caught up),
                    // so we raise user callbacks first so that they consistently happen before
                    // listen events.
                    return e.sent(), [ 3 /*break*/ , 6 ];

                  case 4:
                    return [ 4 /*yield*/ , Cr(e.sent()) ];

                  case 5:
                    return e.sent(), [ 3 /*break*/ , 6 ];

                  case 6:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * Registers a user callback that resolves when all pending mutations at the moment of calling
     * are acknowledged .
     */
    t.prototype.K_ = function(t) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var n, r, i, o;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    this.m_.Vc() || h("SyncEngine", "The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled."), 
                    e.label = 1;

                  case 1:
                    return e.trys.push([ 1, 3, , 4 ]), [ 4 /*yield*/ , this.Tc.Ao() ];

                  case 2:
                    return -1 === (n = e.sent()) ? [ 2 /*return*/ , void t.resolve() ] : ((r = this.F_.get(n) || []).push(t), 
                    this.F_.set(n, r), [ 3 /*break*/ , 4 ]);

                  case 3:
                    return i = e.sent(), o = Sr(i, "Initialization of waitForPendingWrites() operation failed"), 
                    t.reject(o), [ 3 /*break*/ , 4 ];

                  case 4:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * Triggers the callbacks that are waiting for this batch id to get acknowledged by server,
     * if there are any.
     */
    t.prototype.j_ = function(t) {
        (this.F_.get(t) || []).forEach((function(t) {
            t.resolve();
        })), this.F_.delete(t);
    }, 
    /** Reject all outstanding callbacks waiting for pending writes to complete. */ t.prototype.G_ = function(t) {
        this.F_.forEach((function(e) {
            e.forEach((function(e) {
                e.reject(new S(x.CANCELLED, t));
            }));
        })), this.F_.clear();
    }, t.prototype.B_ = function(t, e) {
        var n = this.C_[this.currentUser.su()];
        n || (n = new W(m)), n = n.et(t, e), this.C_[this.currentUser.su()] = n;
    }, 
    /**
     * Resolves or rejects the user callback for the given batch and then discards
     * it.
     */
    t.prototype.W_ = function(t, e) {
        var n = this.C_[this.currentUser.su()];
        // NOTE: Mutations restored from persistence won't have callbacks, so it's
        // okay for there to be no callback for this ID.
                if (n) {
            var r = n.get(t);
            r && (e ? r.reject(e) : r.resolve(), n = n.remove(t)), this.C_[this.currentUser.su()] = n;
        }
    }, t.prototype.O_ = function(t, e) {
        var n = this;
        void 0 === e && (e = null), this.P_.Nl(t);
        for (var r = 0, i = this.y_.get(t); r < i.length; r++) {
            var o = i[r];
            this.p_.delete(o), e && this.g_.z_(o, e);
        }
        this.y_.delete(t), this.k_ && this.D_.ga(t).forEach((function(t) {
            n.D_.tr(t) || 
            // We removed the last reference for this key
            n.H_(t);
        }));
    }, t.prototype.H_ = function(t) {
        // It's possible that the target already got removed because the query failed. In that case,
        // the key won't exist in `limboTargetsByKey`. Only do the cleanup if we still have the target.
        var e = this.v_.get(t);
        null !== e && (this.m_.qc(e), this.v_ = this.v_.remove(t), this.S_.delete(e), this.Q_());
    }, t.prototype.L_ = function(t, e) {
        for (var n = 0, r = e; n < r.length; n++) {
            var i = r[n];
            i instanceof io ? (this.D_.Hi(i.key, t), this.Y_(i)) : i instanceof oo ? (h("SyncEngine", "Document no longer in limbo: " + i.key), 
            this.D_.Ji(i.key, t), this.D_.tr(i.key) || 
            // We removed the last reference for this key
            this.H_(i.key)) : p();
        }
    }, t.prototype.Y_ = function(t) {
        var e = t.key;
        this.v_.get(e) || (h("SyncEngine", "New document in limbo: " + e), this.b_.push(e), 
        this.Q_());
    }, 
    /**
     * Starts listens for documents in limbo that are enqueued for resolution,
     * subject to a maximum number of concurrent resolutions.
     *
     * Without bounding the number of concurrent resolutions, the server can fail
     * with "resource exhausted" errors which can lead to pathological client
     * behavior as seen in https://github.com/firebase/firebase-js-sdk/issues/2683.
     */
    t.prototype.Q_ = function() {
        for (;this.b_.length > 0 && this.v_.size < this.V_; ) {
            var t = this.b_.shift(), e = this.N_.next();
            this.S_.set(e, new co(t)), this.v_ = this.v_.et(t, e), this.m_.listen(new B(Ve.As(t.path).We(), e, 2 /* LimboResolution */ , an.Qn));
        }
    }, 
    // Visible for testing
    t.prototype.J_ = function() {
        return this.v_;
    }, 
    // Visible for testing
    t.prototype.X_ = function() {
        return this.b_;
    }, t.prototype.q_ = function(t, n) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var r, i, o, s = this;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return r = [], i = [], o = [], this.p_.forEach((function(e, u) {
                        o.push(Promise.resolve().then((function() {
                            var e = u.view.n_(t);
                            return e.o_ ? s.Tc.la(u.query, /* usePreviousResults= */ !1).then((function(t) {
                                var n = t.documents;
                                return u.view.n_(n, e);
                            })) : e;
                            // The query has a limit and some docs were removed, so we need
                            // to re-run the query against the local store to make sure we
                            // didn't lose any good docs that had been past the limit.
                                                })).then((function(t) {
                            var e = n && n.Qt.get(u.targetId), o = u.view.wn(t, 
                            /* updateLimboDocuments= */ s.k_, e);
                            if (s.L_(u.targetId, o.u_), o.snapshot) {
                                s.k_ && s.P_.xl(u.targetId, o.snapshot.fromCache ? "not-current" : "current"), r.push(o.snapshot);
                                var a = un.Ln(u.targetId, o.snapshot);
                                i.push(a);
                            }
                        })));
                    })), [ 4 /*yield*/ , Promise.all(o) ];

                  case 1:
                    return e.sent(), this.g_.Lu(r), [ 4 /*yield*/ , this.Tc.oa(i) ];

                  case 2:
                    return e.sent(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.x_ = function(t) {}, t.prototype.il = function(t) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var n;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return this.currentUser.isEqual(t) ? [ 3 /*break*/ , 3 ] : (h("SyncEngine", "User change. New user:", t.su()), 
                    [ 4 /*yield*/ , this.Tc.Hh(t) ]);

                  case 1:
                    return n = e.sent(), this.currentUser = t, 
                    // Fails tasks waiting for pending writes requested by previous user.
                    this.G_("'waitForPendingWrites' promise is rejected due to a user change."), 
                    // TODO(b/114226417): Consider calling this only in the primary tab.
                    this.P_.Hh(t, n.Jh, n.Xh), [ 4 /*yield*/ , this.q_(n.Yh) ];

                  case 2:
                    e.sent(), e.label = 3;

                  case 3:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.enableNetwork = function() {
        return this.m_.enableNetwork();
    }, t.prototype.disableNetwork = function() {
        return this.m_.disableNetwork();
    }, t.prototype.xe = function(t) {
        var e = this.S_.get(t);
        if (e && e.R_) return it().add(e.key);
        var n = it(), r = this.y_.get(t);
        if (!r) return n;
        for (var i = 0, o = r; i < o.length; i++) {
            var s = o[i], u = this.p_.get(s);
            n = n.Ct(u.view.s_);
        }
        return n;
    }, t;
}(), fo = /** @class */ function(t) {
    function n(e, n, r, i, o, s) {
        var u = this;
        return (u = t.call(this, e, n, r, i, o, s) || this).Tc = e, 
        // The primary state is set to `true` or `false` immediately after Firestore
        // startup. In the interim, a client should only be considered primary if
        // `isPrimary` is true.
        u.Z_ = void 0, u;
    }
    return e.__extends(n, t), Object.defineProperty(n.prototype, "k_", {
        get: function() {
            return !0 === this.Z_;
        },
        enumerable: !0,
        configurable: !0
    }), n.prototype.enableNetwork = function() {
        return this.Tc.vr(!0), t.prototype.enableNetwork.call(this);
    }, n.prototype.disableNetwork = function() {
        return this.Tc.vr(!1), t.prototype.disableNetwork.call(this);
    }, 
    /**
     * Reconcile the list of synced documents in an existing view with those
     * from persistence.
     */
    n.prototype.tf = function(t) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var n, r;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return [ 4 /*yield*/ , this.Tc.la(t.query, 
                    /* usePreviousResults= */ !0) ];

                  case 1:
                    return n = e.sent(), r = t.view.__(n), [ 2 /*return*/ , (this.Z_ && this.L_(t.targetId, r.u_), 
                    r) ];
                }
            }));
        }));
    }, n.prototype.c_ = function(e, n) {
        // If we are the primary client, the online state of all clients only
        // depends on the online state of the local RemoteStore.
        this.k_ && 0 /* RemoteStore */ === n && (t.prototype.c_.call(this, e, n), this.P_.Ll(e)), 
        // If we are the secondary client, we explicitly ignore the remote store's
        // online state (the local client may go offline, even though the primary
        // tab remains online) and only apply the primary tab's online state from
        // SharedClientState.
        this.k_ || 1 /* SharedClientState */ !== n || t.prototype.c_.call(this, e, n);
    }, n.prototype.Gl = function(t, n, r) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var i;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return this.x_("applyBatchState()"), [ 4 /*yield*/ , this.Tc.da(t) ];

                  case 1:
                    return null === (i = e.sent()) ? [ 3 /*break*/ , 6 ] : "pending" !== n ? [ 3 /*break*/ , 3 ] : [ 4 /*yield*/ , this.m_.Mc() ];

                  case 2:
                    // If we are the primary client, we need to send this write to the
                    // backend. Secondary clients will ignore these writes since their remote
                    // connection is disabled.
                    return e.sent(), [ 3 /*break*/ , 4 ];

                  case 3:
                    "acknowledged" === n || "rejected" === n ? (
                    // NOTE: Both these methods are no-ops for batches that originated from
                    // other clients.
                    this.W_(t, r || null), this.Tc.wa(t)) : p(), e.label = 4;

                  case 4:
                    return [ 4 /*yield*/ , this.q_(i) ];

                  case 5:
                    return e.sent(), [ 3 /*break*/ , 7 ];

                  case 6:
                    // A throttled tab may not have seen the mutation before it was completed
                    // and removed from the mutation queue, in which case we won't have cached
                    // the affected documents. In this case we can safely ignore the update
                    // since that means we didn't apply the mutation locally at all (if we
                    // had, we would have cached the affected documents), and so we will just
                    // see any resulting document changes via normal remote document updates
                    // as applicable.
                    h("SyncEngine", "Cannot apply mutation batch with id: " + t), e.label = 7;

                  case 7:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, n.prototype.rl = function(t) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var n, r, i, o, s, u, a, c = this;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return !0 !== t || !0 === this.Z_ ? [ 3 /*break*/ , 3 ] : (n = this.P_.gl(), [ 4 /*yield*/ , this.ef(n.F(), 
                    /*transitionToPrimary=*/ !0) ]);

                  case 1:
                    return r = e.sent(), this.Z_ = !0, [ 4 /*yield*/ , this.m_.rl(!0) ];

                  case 2:
                    for (e.sent(), i = 0, o = r; i < o.length; i++) s = o[i], this.m_.listen(s);
                    return [ 3 /*break*/ , 7 ];

                  case 3:
                    return !1 !== t || !1 === this.Z_ ? [ 3 /*break*/ , 7 ] : (u = [], a = Promise.resolve(), 
                    this.y_.forEach((function(t, e) {
                        c.P_.$l(e) ? u.push(e) : a = a.then((function() {
                            return c.O_(e), c.Tc.ca(e, 
                            /*keepPersistedTargetData=*/ !0);
                        })), c.m_.qc(e);
                    })), [ 4 /*yield*/ , a ]);

                  case 4:
                    return e.sent(), [ 4 /*yield*/ , this.ef(u, 
                    /*transitionToPrimary=*/ !1) ];

                  case 5:
                    return e.sent(), this.sf(), this.Z_ = !1, [ 4 /*yield*/ , this.m_.rl(!1) ];

                  case 6:
                    e.sent(), e.label = 7;

                  case 7:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, n.prototype.sf = function() {
        var t = this;
        this.S_.forEach((function(e, n) {
            t.m_.qc(n);
        })), this.D_.pa(), this.S_ = new Map, this.v_ = new W(L.P);
    }, 
    /**
     * Reconcile the query views of the provided query targets with the state from
     * persistence. Raises snapshots for any changes that affect the local
     * client and returns the updated state of all target's query data.
     *
     * @param targets the list of targets with views that need to be recomputed
     * @param transitionToPrimary `true` iff the tab transitions from a secondary
     * tab to a primary tab
     */
    n.prototype.ef = function(t, n) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var n, r, i, o, s, u, a, c, h, f, l, p, d;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    n = [], r = [], i = 0, o = t, e.label = 1;

                  case 1:
                    return i < o.length ? (s = o[i], u = void 0, (a = this.y_.get(s)) && 0 !== a.length ? [ 4 /*yield*/ , this.Tc.ua(a[0].We()) ] : [ 3 /*break*/ , 7 ]) : [ 3 /*break*/ , 13 ];

                  case 2:
                    // For queries that have a local View, we fetch their current state
                    // from LocalStore (as the resume token and the snapshot version
                    // might have changed) and reconcile their views with the persisted
                    // state (the list of syncedDocuments may have gotten out of sync).
                    u = e.sent(), c = 0, h = a, e.label = 3;

                  case 3:
                    return c < h.length ? (f = h[c], l = this.p_.get(f), [ 4 /*yield*/ , this.tf(l) ]) : [ 3 /*break*/ , 6 ];

                  case 4:
                    (p = e.sent()).snapshot && r.push(p.snapshot), e.label = 5;

                  case 5:
                    return c++, [ 3 /*break*/ , 3 ];

                  case 6:
                    return [ 3 /*break*/ , 11 ];

                  case 7:
                    return [ 4 /*yield*/ , this.Tc.Ta(s) ];

                  case 8:
                    return d = e.sent(), [ 4 /*yield*/ , this.Tc.ua(d) ];

                  case 9:
                    return u = e.sent(), [ 4 /*yield*/ , this.M_(this.nf(d), s, 
                    /*current=*/ !1) ];

                  case 10:
                    e.sent(), e.label = 11;

                  case 11:
                    n.push(u), e.label = 12;

                  case 12:
                    return i++, [ 3 /*break*/ , 1 ];

                  case 13:
                    return [ 2 /*return*/ , (this.g_.Lu(r), n) ];
                }
            }));
        }));
    }, 
    /**
     * Creates a `Query` object from the specified `Target`. There is no way to
     * obtain the original `Query`, so we synthesize a `Query` from the `Target`
     * object.
     *
     * The synthesized result might be different from the original `Query`, but
     * since the synthesized `Query` should return the same results as the
     * original one (only the presentation of results might differ), the potential
     * difference will not cause issues.
     */
    n.prototype.nf = function(t) {
        return new Ve(t.path, t.collectionGroup, t.orderBy, t.filters, t.limit, "F" /* First */ , t.startAt, t.endAt);
    }, n.prototype.Gr = function() {
        return this.Tc.Gr();
    }, n.prototype.zl = function(t, n, r) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var i, o;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return this.Z_ ? (
                    // If we receive a target state notification via WebStorage, we are
                    // either already secondary or another tab has taken the primary lease.
                    h("SyncEngine", "Ignoring unexpected query state notification."), [ 3 /*break*/ , 8 ]) : [ 3 /*break*/ , 1 ];

                  case 1:
                    if (!this.y_.has(t)) return [ 3 /*break*/ , 8 ];
                    switch (n) {
                      case "current":
                      case "not-current":
                        return [ 3 /*break*/ , 2 ];

                      case "rejected":
                        return [ 3 /*break*/ , 5 ];
                    }
                    return [ 3 /*break*/ , 7 ];

                  case 2:
                    return [ 4 /*yield*/ , this.Tc.Ri() ];

                  case 3:
                    return i = e.sent(), o = ht.Gt(t, "current" === n), [ 4 /*yield*/ , this.q_(i, o) ];

                  case 4:
                    return e.sent(), [ 3 /*break*/ , 8 ];

                  case 5:
                    return [ 4 /*yield*/ , this.Tc.ca(t, 
                    /* keepPersistedTargetData */ !0) ];

                  case 6:
                    return e.sent(), this.O_(t, r), [ 3 /*break*/ , 8 ];

                  case 7:
                    p(), e.label = 8;

                  case 8:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, n.prototype.Hl = function(t, n) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var r, i, o, s, u, a, c, f, l, p, d = this;
            return e.__generator(this, (function(y) {
                switch (y.label) {
                  case 0:
                    if (!this.Z_) return [ 3 /*break*/ , 10 ];
                    r = 0, i = t, y.label = 1;

                  case 1:
                    return r < i.length ? (o = i[r], this.y_.has(o) ? (
                    // A target might have been added in a previous attempt
                    h("SyncEngine", "Adding an already active target " + o), [ 3 /*break*/ , 5 ]) : [ 4 /*yield*/ , this.Tc.Ta(o) ]) : [ 3 /*break*/ , 6 ];

                  case 2:
                    return s = y.sent(), [ 4 /*yield*/ , this.Tc.ua(s) ];

                  case 3:
                    return u = y.sent(), [ 4 /*yield*/ , this.M_(this.nf(s), u.targetId, 
                    /*current=*/ !1) ];

                  case 4:
                    y.sent(), this.m_.listen(u), y.label = 5;

                  case 5:
                    return r++, [ 3 /*break*/ , 1 ];

                  case 6:
                    a = function(t) {
                        return e.__generator(this, (function(e) {
                            switch (e.label) {
                              case 0:
                                return c.y_.has(t) ? [ 4 /*yield*/ , c.Tc.ca(t, /* keepPersistedTargetData */ !1).then((function() {
                                    d.m_.qc(t), d.O_(t);
                                })).catch(Cr) ] : [ 3 /*break*/ , 2 ];

                                // Release queries that are still active.
                                                              case 1:
                                // Release queries that are still active.
                                e.sent(), e.label = 2;

                              case 2:
                                return [ 2 /*return*/ ];
                            }
                        }));
                    }, c = this, f = 0, l = n, y.label = 7;

                  case 7:
                    return f < l.length ? (p = l[f], [ 5 /*yield**/ , a(p) ]) : [ 3 /*break*/ , 10 ];

                  case 8:
                    y.sent(), y.label = 9;

                  case 9:
                    return f++, [ 3 /*break*/ , 7 ];

                  case 10:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, n;
}(ho), lo = function() {
    this.if = void 0, this.rf = [];
}, po = /** @class */ function() {
    function t(t) {
        this.Qc = t, this.hf = new A((function(t) {
            return t.canonicalId();
        }), (function(t, e) {
            return t.isEqual(e);
        })), this.onlineState = "Unknown" /* Unknown */ , this.af = new Set, this.Qc.subscribe(this);
    }
    return t.prototype.listen = function(t) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var n, r, i, o, s, u;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    if (n = t.query, r = !1, (i = this.hf.get(n)) || (r = !0, i = new lo), !r) return [ 3 /*break*/ , 4 ];
                    e.label = 1;

                  case 1:
                    return e.trys.push([ 1, 3, , 4 ]), o = i, [ 4 /*yield*/ , this.Qc.listen(n) ];

                  case 2:
                    return o.if = e.sent(), [ 3 /*break*/ , 4 ];

                  case 3:
                    return s = e.sent(), u = Sr(s, "Initialization of query '" + t.query + "' failed"), 
                    [ 2 /*return*/ , void t.onError(u) ];

                  case 4:
                    return this.hf.set(n, i), i.rf.push(t), 
                    // Run global snapshot listeners if a consistent snapshot has been emitted.
                    t.c_(this.onlineState), i.if && t.uf(i.if) && this.cf(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.qc = function(t) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var n, r, i, o;
            return e.__generator(this, (function(e) {
                return n = t.query, r = !1, (i = this.hf.get(n)) && (o = i.rf.indexOf(t)) >= 0 && (i.rf.splice(o, 1), 
                r = 0 === i.rf.length), r ? [ 2 /*return*/ , (this.hf.delete(n), this.Qc.qc(n)) ] : [ 2 /*return*/ ];
            }));
        }));
    }, t.prototype.Lu = function(t) {
        for (var e = !1, n = 0, r = t; n < r.length; n++) {
            var i = r[n], o = i.query, s = this.hf.get(o);
            if (s) {
                for (var u = 0, a = s.rf; u < a.length; u++) {
                    a[u].uf(i) && (e = !0);
                }
                s.if = i;
            }
        }
        e && this.cf();
    }, t.prototype.z_ = function(t, e) {
        var n = this.hf.get(t);
        if (n) for (var r = 0, i = n.rf; r < i.length; r++) {
            i[r].onError(e);
        }
        // Remove all listeners. NOTE: We don't need to call syncEngine.unlisten()
        // after an error.
                this.hf.delete(t);
    }, t.prototype.U_ = function(t) {
        this.onlineState = t;
        var e = !1;
        this.hf.forEach((function(n, r) {
            for (var i = 0, o = r.rf; i < o.length; i++) {
                // Run global snapshot listeners if a consistent snapshot has been emitted.
                o[i].c_(t) && (e = !0);
            }
        })), e && this.cf();
    }, t.prototype.lf = function(t) {
        this.af.add(t), 
        // Immediately fire an initial event, indicating all existing listeners
        // are in-sync.
        t.next();
    }, t.prototype._f = function(t) {
        this.af.delete(t);
    }, 
    // Call all global snapshot listeners that have been set.
    t.prototype.cf = function() {
        this.af.forEach((function(t) {
            t.next();
        }));
    }, t;
}(), yo = /** @class */ function() {
    function t(t, e, n) {
        this.query = t, this.ff = e, 
        /**
             * Initial snapshots (e.g. from cache) may not be propagated to the wrapped
             * observer. This flag is set to true once we've actually raised an event.
             */
        this.df = !1, this.wf = null, this.onlineState = "Unknown" /* Unknown */ , this.options = n || {}
        /**
     * Applies the new ViewSnapshot to this listener, raising a user-facing event
     * if applicable (depending on what changed, whether the user has opted into
     * metadata-only changes, etc.). Returns true if a user-facing event was
     * indeed raised.
     */;
    }
    return t.prototype.uf = function(t) {
        if (!this.options.includeMetadataChanges) {
            for (
            // Remove the metadata only changes.
            var e = [], n = 0, r = t.docChanges; n < r.length; n++) {
                var i = r[n];
                3 /* Metadata */ !== i.type && e.push(i);
            }
            t = new ct(t.query, t.docs, t.Lt, e, t.Ot, t.fromCache, t.Bt, 
            /* excludesMetadataChanges= */ !0);
        }
        var o = !1;
        return this.df ? this.Tf(t) && (this.ff.next(t), o = !0) : this.Ef(t, this.onlineState) && (this.If(t), 
        o = !0), this.wf = t, o;
    }, t.prototype.onError = function(t) {
        this.ff.error(t);
    }, 
    /** Returns whether a snapshot was raised. */ t.prototype.c_ = function(t) {
        this.onlineState = t;
        var e = !1;
        return this.wf && !this.df && this.Ef(this.wf, t) && (this.If(this.wf), e = !0), 
        e;
    }, t.prototype.Ef = function(t, e) {
        // Always raise the first event when we're synced
        if (!t.fromCache) return !0;
        // NOTE: We consider OnlineState.Unknown as online (it should become Offline
        // or Online if we wait long enough).
                var n = "Offline" /* Offline */ !== e;
        // Don't raise the event if we're online, aren't synced yet (checked
        // above) and are waiting for a sync.
                return !(this.options.Af && n || t.docs._() && "Offline" /* Offline */ !== e);
        // Raise data from cache if we have any documents or we are offline
        }, t.prototype.Tf = function(t) {
        // We don't need to handle includeDocumentMetadataChanges here because
        // the Metadata only changes have already been stripped out if needed.
        // At this point the only changes we will see are the ones we should
        // propagate.
        if (t.docChanges.length > 0) return !0;
        var e = this.wf && this.wf.hasPendingWrites !== t.hasPendingWrites;
        return !(!t.Bt && !e) && !0 === this.options.includeMetadataChanges;
        // Generally we should have hit one of the cases above, but it's possible
        // to get here if there were only metadata docChanges and they got
        // stripped out.
        }, t.prototype.If = function(t) {
        t = ct.Ut(t.query, t.docs, t.Ot, t.fromCache), this.df = !0, this.ff.next(t);
    }, t;
}(), vo = /** @class */ function() {
    function t() {}
    return t.prototype.zh = function(t) {
        this.Rf = t;
    }, t.prototype.Sn = function(t, e, n, i) {
        var o = this;
        // Queries that match all documents don't benefit from using
        // IndexFreeQueries. It is more efficient to scan all documents in a
        // collection, rather than to perform individual lookups.
                return e.Ss() || n.isEqual(k.min()) ? this.mf(t, e) : this.Rf.yn(t, i).next((function(s) {
            var u = o.Pf(e, s);
            return (e.ks() || e.xs()) && o.o_(e.ws, u, i, n) ? o.mf(t, e) : (c() <= r.LogLevel.DEBUG && h("IndexFreeQueryEngine", "Re-using previous result from %s to execute query: %s", n.toString(), e.toString()), 
            o.Rf.Sn(t, e, n).next((function(t) {
                // We merge `previousResults` into `updateResults`, since
                // `updateResults` is already a DocumentMap. If a document is
                // contained in both lists, then its contents are the same.
                return u.forEach((function(e) {
                    t = t.et(e.key, e);
                })), t;
            })));
        }));
        // Queries that have never seen a snapshot without limbo free documents
        // should also be run as a full collection scan.
        }, 
    /** Applies the query filter and sorting to the provided documents.  */ t.prototype.Pf = function(t, e) {
        // Sort the documents and re-apply the query filter since previously
        // matching documents do not necessarily still match the query.
        var n = new Y((function(e, n) {
            return t.Ds(e, n);
        }));
        return e.forEach((function(e, r) {
            r instanceof Oe && t.matches(r) && (n = n.add(r));
        })), n;
    }, 
    /**
     * Determines if a limit query needs to be refilled from cache, making it
     * ineligible for index-free execution.
     *
     * @param sortedPreviousResults The documents that matched the query when it
     * was last synchronized, sorted by the query's comparator.
     * @param remoteKeys The document keys that matched the query at the last
     * snapshot.
     * @param limboFreeSnapshotVersion The version of the snapshot when the query
     * was last synchronized.
     */
    t.prototype.o_ = function(t, e, n, r) {
        // The query needs to be refilled if a previously matching document no
        // longer matches.
        if (n.size !== e.size) return !0;
        // Limit queries are not eligible for index-free query execution if there is
        // a potential that an older document from cache now sorts before a document
        // that was previously part of the limit. This, however, can only happen if
        // the document at the edge of the limit goes out of limit.
        // If a document that is not the limit boundary sorts differently,
        // the boundary of the limit itself did not change and documents from cache
        // will continue to be "rejected" by this boundary. Therefore, we can ignore
        // any modifications that don't affect the last document.
                var i = "F" /* First */ === t ? e.last() : e.first();
        return !!i && (i.hasPendingWrites || i.version.o(r) > 0);
    }, t.prototype.mf = function(t, e) {
        return c() <= r.LogLevel.DEBUG && h("IndexFreeQueryEngine", "Using full collection scan to execute query:", e.toString()), 
        this.Rf.Sn(t, e, k.min());
    }, t;
}(), go = /** @class */ function() {
    function t(t, e) {
        this.mn = t, this.Fi = e, 
        /**
             * The set of all mutations that have been sent but not yet been applied to
             * the backend.
             */
        this.Rn = [], 
        /** Next value to use when assigning sequential IDs to each mutation batch. */
        this.Vf = 1, 
        /** An ordered mapping between documents and the mutations batch IDs. */
        this.gf = new Y(Fr.Ia);
    }
    return t.prototype.do = function(t) {
        return en.resolve(0 === this.Rn.length);
    }, t.prototype.wo = function(t, e, n, r) {
        var i = this.Vf;
        this.Vf++, this.Rn.length > 0 && this.Rn[this.Rn.length - 1];
        var o = new Ze(i, e, n, r);
        this.Rn.push(o);
        // Track references by document key and index collection parents.
        for (var s = 0, u = r; s < u.length; s++) {
            var a = u[s];
            this.gf = this.gf.add(new Fr(a.key, i)), this.mn.ri(t, a.key.path.p());
        }
        return en.resolve(o);
    }, t.prototype.To = function(t, e) {
        return en.resolve(this.pf(e));
    }, t.prototype.Io = function(t, e) {
        var n = e + 1, r = this.yf(n), i = r < 0 ? 0 : r;
        // The requested batchId may still be out of range so normalize it to the
        // start of the queue.
                return en.resolve(this.Rn.length > i ? this.Rn[i] : null);
    }, t.prototype.Ao = function() {
        return en.resolve(0 === this.Rn.length ? -1 : this.Vf - 1);
    }, t.prototype.Ro = function(t) {
        return en.resolve(this.Rn.slice());
    }, t.prototype.Vn = function(t, e) {
        var n = this, r = new Fr(e, 0), i = new Fr(e, Number.POSITIVE_INFINITY), o = [];
        return this.gf.vt([ r, i ], (function(t) {
            var e = n.pf(t.ba);
            o.push(e);
        })), en.resolve(o);
    }, t.prototype.vn = function(t, e) {
        var n = this, r = new Y(m);
        return e.forEach((function(t) {
            var e = new Fr(t, 0), i = new Fr(t, Number.POSITIVE_INFINITY);
            n.gf.vt([ e, i ], (function(t) {
                r = r.add(t.ba);
            }));
        })), en.resolve(this.bf(r));
    }, t.prototype.$n = function(t, e) {
        // Use the query path as a prefix for testing if a document matches the
        // query.
        var n = e.path, r = n.length + 1, i = n;
        // Construct a document reference for actually scanning the index. Unlike
        // the prefix the document key in this reference must have an even number of
        // segments. The empty segment can be used a suffix of the query path
        // because it precedes all other segments in an ordered traversal.
                L.W(i) || (i = i.child(""));
        var o = new Fr(new L(i), 0), s = new Y(m);
        // Find unique batchIDs referenced by all documents potentially matching the
        // query.
                return this.gf.St((function(t) {
            var e = t.key.path;
            return !!n.D(e) && (
            // Rows with document keys more than one segment longer than the query
            // path can't be matches. For example, a query on 'rooms' can't match
            // the document /rooms/abc/messages/xyx.
            // TODO(mcg): we'll need a different scanner when we implement
            // ancestor queries.
            e.length === r && (s = s.add(t.ba)), !0);
        }), o), en.resolve(this.bf(s));
    }, t.prototype.bf = function(t) {
        var e = this, n = [];
        // Construct an array of matching batches, sorted by batchID to ensure that
        // multiple mutations affecting the same document key are applied in order.
                return t.forEach((function(t) {
            var r = e.pf(t);
            null !== r && n.push(r);
        })), n;
    }, t.prototype.Po = function(t, e) {
        var n = this;
        d(0 === this.vf(e.batchId, "removed")), this.Rn.shift();
        var r = this.gf;
        return en.forEach(e.mutations, (function(i) {
            var o = new Fr(i.key, e.batchId);
            return r = r.delete(o), n.Fi.oo(t, i.key);
        })).next((function() {
            n.gf = r;
        }));
    }, t.prototype.Vo = function(t) {
        // No-op since the memory mutation queue does not maintain a separate cache.
    }, t.prototype.tr = function(t, e) {
        var n = new Fr(e, 0), r = this.gf.Dt(n);
        return en.resolve(e.isEqual(r && r.key));
    }, t.prototype.po = function(t) {
        return this.Rn.length, en.resolve();
    }, 
    /**
     * Finds the index of the given batchId in the mutation queue and asserts that
     * the resulting index is within the bounds of the queue.
     *
     * @param batchId The batchId to search for
     * @param action A description of what the caller is doing, phrased in passive
     * form (e.g. "acknowledged" in a routine that acknowledges batches).
     */
    t.prototype.vf = function(t, e) {
        return this.yf(t);
    }, 
    /**
     * Finds the index of the given batchId in the mutation queue. This operation
     * is O(1).
     *
     * @return The computed index of the batch with the given batchId, based on
     * the state of the queue. Note this index can be negative if the requested
     * batchId has already been remvoed from the queue or past the end of the
     * queue if the batchId is larger than the last added batch.
     */
    t.prototype.yf = function(t) {
        return 0 === this.Rn.length ? 0 : t - this.Rn[0].batchId;
        // Examine the front of the queue to figure out the difference between the
        // batchId and indexes in the array. Note that since the queue is ordered
        // by batchId, if the first batch has a larger batchId then the requested
        // batchId doesn't exist in the queue.
        }, 
    /**
     * A version of lookupMutationBatch that doesn't return a promise, this makes
     * other functions that uses this code easier to read and more efficent.
     */
    t.prototype.pf = function(t) {
        var e = this.yf(t);
        return e < 0 || e >= this.Rn.length ? null : this.Rn[e];
    }, t;
}(), mo = /** @class */ function() {
    /**
     * @param sizer Used to assess the size of a document. For eager GC, this is expected to just
     * return 0 to avoid unnecessarily doing the work of calculating the size.
     */
    function t(t, e) {
        this.mn = t, this.Sf = e, 
        /** Underlying cache of documents and their read times. */
        this.docs = new W(L.P), 
        /** Size of all cached documents. */
        this.size = 0
        /**
     * Adds the supplied entry to the cache and updates the cache size as appropriate.
     *
     * All calls of `addEntry`  are required to go through the RemoteDocumentChangeBuffer
     * returned by `newChangeBuffer()`.
     */;
    }
    return t.prototype.un = function(t, e, n) {
        var r = e.key, i = this.docs.get(r), o = i ? i.size : 0, s = this.Sf(e);
        return this.docs = this.docs.et(r, {
            fi: e,
            size: s,
            readTime: n
        }), this.size += s - o, this.mn.ri(t, r.path.p());
    }, 
    /**
     * Removes the specified entry from the cache and updates the cache size as appropriate.
     *
     * All calls of `removeEntry` are required to go through the RemoteDocumentChangeBuffer
     * returned by `newChangeBuffer()`.
     */
    t.prototype.ln = function(t) {
        var e = this.docs.get(t);
        e && (this.docs = this.docs.remove(t), this.size -= e.size);
    }, t.prototype._n = function(t, e) {
        var n = this.docs.get(e);
        return en.resolve(n ? n.fi : null);
    }, t.prototype.getEntries = function(t, e) {
        var n = this, r = Z();
        return e.forEach((function(t) {
            var e = n.docs.get(t);
            r = r.et(t, e ? e.fi : null);
        })), en.resolve(r);
    }, t.prototype.Sn = function(t, e, n) {
        for (var r = et(), i = new L(e.path.child("")), o = this.docs.ut(i)
        // Documents are ordered by key, so we can use a prefix scan to narrow down
        // the documents we need to match the query against.
        ; o.wt(); ) {
            var s = o.dt(), u = s.key, a = s.value, c = a.fi, h = a.readTime;
            if (!e.path.D(u.path)) break;
            h.o(n) <= 0 || c instanceof Oe && e.matches(c) && (r = r.et(c.key, c));
        }
        return en.resolve(r);
    }, t.prototype.Df = function(t, e) {
        return en.forEach(this.docs, (function(t) {
            return e(t);
        }));
    }, t.prototype.Vi = function(e) {
        // `trackRemovals` is ignores since the MemoryRemoteDocumentCache keeps
        // a separate changelog and does not need special handling for removals.
        return new t.gi(this);
    }, t.prototype.yi = function(t) {
        return en.resolve(this.size);
    }, t;
}();

/**
 * Holds the state of a query target, including its target ID and whether the
 * target is 'not-current', 'current' or 'rejected'.
 */
// Visible for testing
/**
 * Handles the details of adding and updating documents in the MemoryRemoteDocumentCache.
 */
mo.gi = /** @class */ function(t) {
    function n(e) {
        var n = this;
        return (n = t.call(this) || this).bi = e, n;
    }
    return e.__extends(n, t), n.prototype.wn = function(t) {
        var e = this, n = [];
        return this.on.forEach((function(r, i) {
            i ? n.push(e.bi.un(t, i, e.readTime)) : e.bi.ln(r);
        })), en.nn(n);
    }, n.prototype.fn = function(t, e) {
        return this.bi._n(t, e);
    }, n.prototype.dn = function(t, e) {
        return this.bi.getEntries(t, e);
    }, n;
}(nn);

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var wo = /** @class */ function() {
    function t(t) {
        this.persistence = t, 
        /**
             * Maps a target to the data about that target
             */
        this.Cf = new A((function(t) {
            return Xe(t);
        }), $e), 
        /** The last received snapshot version. */
        this.lastRemoteSnapshotVersion = k.min(), 
        /** The highest numbered target ID encountered. */
        this.highestTargetId = 0, 
        /** The highest sequence number encountered. */
        this.Ff = 0, 
        /**
             * A ordered bidirectional mapping between documents and the remote target
             * IDs.
             */
        this.Nf = new qr, this.targetCount = 0, this.$f = Un.Di();
    }
    return t.prototype.ye = function(t, e) {
        return this.Cf.forEach((function(t, n) {
            return e(n);
        })), en.resolve();
    }, t.prototype.xi = function(t) {
        return en.resolve(this.lastRemoteSnapshotVersion);
    }, t.prototype.Mi = function(t) {
        return en.resolve(this.Ff);
    }, t.prototype.Ni = function(t) {
        return this.highestTargetId = this.$f.next(), en.resolve(this.highestTargetId);
    }, t.prototype.Li = function(t, e, n) {
        return n && (this.lastRemoteSnapshotVersion = n), e > this.Ff && (this.Ff = e), 
        en.resolve();
    }, t.prototype.Bi = function(t) {
        this.Cf.set(t.target, t);
        var e = t.targetId;
        e > this.highestTargetId && (this.$f = new Un(e), this.highestTargetId = e), t.sequenceNumber > this.Ff && (this.Ff = t.sequenceNumber);
    }, t.prototype.Oi = function(t, e) {
        return this.Bi(e), this.targetCount += 1, en.resolve();
    }, t.prototype.Ui = function(t, e) {
        return this.Bi(e), en.resolve();
    }, t.prototype.Qi = function(t, e) {
        return this.Cf.delete(e.target), this.Nf.ga(e.targetId), this.targetCount -= 1, 
        en.resolve();
    }, t.prototype.ji = function(t, e, n) {
        var r = this, i = 0, o = [];
        return this.Cf.forEach((function(s, u) {
            u.sequenceNumber <= e && null === n.get(u.targetId) && (r.Cf.delete(s), o.push(r.Wi(t, u.targetId)), 
            i++);
        })), en.nn(o).next((function() {
            return i;
        }));
    }, t.prototype.Ki = function(t) {
        return en.resolve(this.targetCount);
    }, t.prototype.Gi = function(t, e) {
        var n = this.Cf.get(e) || null;
        return en.resolve(n);
    }, t.prototype.zi = function(t, e, n) {
        return this.Nf.ma(e, n), en.resolve();
    }, t.prototype.Yi = function(t, e, n) {
        this.Nf.Va(e, n);
        var r = this.persistence.Fi, i = [];
        return r && e.forEach((function(e) {
            i.push(r.oo(t, e));
        })), en.nn(i);
    }, t.prototype.Wi = function(t, e) {
        return this.Nf.ga(e), en.resolve();
    }, t.prototype.Xi = function(t, e) {
        var n = this.Nf.ya(e);
        return en.resolve(n);
    }, t.prototype.tr = function(t, e) {
        return en.resolve(this.Nf.tr(e));
    }, t;
}(), _o = /** @class */ function() {
    /**
     * The constructor accepts a factory for creating a reference delegate. This
     * allows both the delegate and this instance to have strong references to
     * each other without having nullable fields that would then need to be
     * checked or asserted on every access.
     */
    function t(t) {
        var e = this;
        this.kf = {}, this.rr = new an(0), this.or = !1, this.or = !0, this.Fi = t(this), 
        this.Tr = new wo(this), this.mn = new yn, this.An = new mo(this.mn, (function(t) {
            return e.Fi.xf(t);
        }));
    }
    return t.prototype.start = function() {
        return Promise.resolve();
    }, t.prototype.Ur = function() {
        // No durable state to ensure is closed on shutdown.
        return this.or = !1, Promise.resolve();
    }, Object.defineProperty(t.prototype, "pr", {
        get: function() {
            return this.or;
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.yr = function() {
        // No op.
    }, t.prototype.Xr = function() {
        return this.mn;
    }, t.prototype.zr = function(t) {
        var e = this.kf[t.su()];
        return e || (e = new go(this.mn, this.Fi), this.kf[t.su()] = e), e;
    }, t.prototype.Yr = function() {
        return this.Tr;
    }, t.prototype.Jr = function() {
        return this.An;
    }, t.prototype.runTransaction = function(t, e, n) {
        var r = this;
        h("MemoryPersistence", "Starting transaction:", t);
        var i = new bo(this.rr.next());
        return this.Fi.Mf(), n(i).next((function(t) {
            return r.Fi.Lf(i).next((function() {
                return t;
            }));
        })).en().then((function(t) {
            return i.In(), t;
        }));
    }, t.prototype.Of = function(t, e) {
        return en.rn(Object.values(this.kf).map((function(n) {
            return function() {
                return n.tr(t, e);
            };
        })));
    }, t;
}(), bo = /** @class */ function(t) {
    function n(e) {
        var n = this;
        return (n = t.call(this) || this).sr = e, n;
    }
    return e.__extends(n, t), n;
}(on), Io = /** @class */ function() {
    function t(t) {
        this.persistence = t, 
        /** Tracks all documents that are active in Query views. */
        this.Bf = new qr, 
        /** The list of documents that are potentially GCed after each transaction. */
        this.qf = null;
    }
    return t.Uf = function(e) {
        return new t(e);
    }, Object.defineProperty(t.prototype, "Qf", {
        get: function() {
            if (this.qf) return this.qf;
            throw p();
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.Hi = function(t, e, n) {
        return this.Bf.Hi(n, e), this.Qf.delete(n), en.resolve();
    }, t.prototype.Ji = function(t, e, n) {
        return this.Bf.Ji(n, e), this.Qf.add(n), en.resolve();
    }, t.prototype.oo = function(t, e) {
        return this.Qf.add(e), en.resolve();
    }, t.prototype.removeTarget = function(t, e) {
        var n = this;
        this.Bf.ga(e.targetId).forEach((function(t) {
            return n.Qf.add(t);
        }));
        var r = this.persistence.Yr();
        return r.Xi(t, e.targetId).next((function(t) {
            t.forEach((function(t) {
                return n.Qf.add(t);
            }));
        })).next((function() {
            return r.Qi(t, e);
        }));
    }, t.prototype.Mf = function() {
        this.qf = new Set;
    }, t.prototype.Lf = function(t) {
        var e = this, n = this.persistence.Jr().Vi();
        // Remove newly orphaned documents.
                return en.forEach(this.Qf, (function(r) {
            return e.Wf(t, r).next((function(t) {
                t || n.ln(r);
            }));
        })).next((function() {
            return e.qf = null, n.apply(t);
        }));
    }, t.prototype.co = function(t, e) {
        var n = this;
        return this.Wf(t, e).next((function(t) {
            t ? n.Qf.delete(e) : n.Qf.add(e);
        }));
    }, t.prototype.xf = function(t) {
        // For eager GC, we don't care about the document size, there are no size thresholds.
        return 0;
    }, t.prototype.Wf = function(t, e) {
        var n = this;
        return en.rn([ function() {
            return en.resolve(n.Bf.tr(e));
        }, function() {
            return n.persistence.Yr().tr(t, e);
        }, function() {
            return n.persistence.Of(t, e);
        } ]);
    }, t;
}(), Eo = /** @class */ function() {
    function t(t) {
        this.jf = t.jf, this.Kf = t.Kf;
    }
    return t.prototype.xu = function(t) {
        this.Gf = t;
    }, t.prototype.Cu = function(t) {
        this.zf = t;
    }, t.prototype.onMessage = function(t) {
        this.Hf = t;
    }, t.prototype.close = function() {
        this.Kf();
    }, t.prototype.send = function(t) {
        this.jf(t);
    }, t.prototype.Yf = function() {
        this.Gf();
    }, t.prototype.Jf = function(t) {
        this.zf(t);
    }, t.prototype.Xf = function(t) {
        this.Hf(t);
    }, t;
}(), To = {
    BatchGetDocuments: "batchGet",
    Commit: "commit"
}, No = "gl-js/ fire/" + u, Ao = /** @class */ function() {
    function t(t) {
        this.s = t.s;
        var e = t.ssl ? "https" : "http";
        this.Zf = e + "://" + t.host, this.forceLongPolling = t.forceLongPolling;
    }
    /**
     * Modifies the headers for a request, adding any authorization token if
     * present and any additional headers for the request.
     */    return t.prototype.td = function(t, e) {
        if (e) for (var n in e.ru) e.ru.hasOwnProperty(n) && (t[n] = e.ru[n]);
        t["X-Goog-Api-Client"] = No;
    }, t.prototype.Yu = function(t, e, n) {
        var r = this, i = this.ed(t);
        return new Promise((function(s, u) {
            var a = new o.XhrIo;
            a.listenOnce(o.EventType.COMPLETE, (function() {
                try {
                    switch (a.getLastErrorCode()) {
                      case o.ErrorCode.NO_ERROR:
                        var e = a.getResponseJson();
                        h("Connection", "XHR received:", JSON.stringify(e)), s(e);
                        break;

                      case o.ErrorCode.TIMEOUT:
                        h("Connection", 'RPC "' + t + '" timed out'), u(new S(x.DEADLINE_EXCEEDED, "Request time out"));
                        break;

                      case o.ErrorCode.HTTP_ERROR:
                        var n = a.getStatus();
                        if (h("Connection", 'RPC "' + t + '" failed with status:', n, "response text:", a.getResponseText()), 
                        n > 0) {
                            var r = a.getResponseJson().error;
                            if (r && r.status && r.message) {
                                var i = function(t) {
                                    var e = t.toLowerCase().replace("_", "-");
                                    return Object.values(x).indexOf(e) >= 0 ? e : x.UNKNOWN;
                                }(r.status);
                                u(new S(i, r.message));
                            } else u(new S(x.UNKNOWN, "Server responded with status " + a.getStatus()));
                        } else 
                        // If we received an HTTP_ERROR but there's no status code,
                        // it's most probably a connection issue
                        h("Connection", 'RPC "' + t + '" failed'), u(new S(x.UNAVAILABLE, "Connection failed."));
                        break;

                      default:
                        p();
                    }
                } finally {
                    h("Connection", 'RPC "' + t + '" completed.');
                }
            }));
            // The database field is already encoded in URL. Specifying it again in
            // the body is not necessary in production, and will cause duplicate field
            // errors in the Firestore Emulator. Let's remove it.
            var c = Object.assign({}, e);
            delete c.database;
            var f = JSON.stringify(c);
            h("Connection", "XHR sending: ", i + " " + f);
            // Content-Type: text/plain will avoid preflight requests which might
            // mess with CORS and redirects by proxies. If we add custom headers
            // we will need to change this code to potentially use the
            // $httpOverwrite parameter supported by ESF to avoid
            // triggering preflight requests.
            var l = {
                "Content-Type": "text/plain"
            };
            r.td(l, n), a.send(i, "POST", f, l, 15);
        }));
    }, t.prototype.Ju = function(t, e, n) {
        // The REST API automatically aggregates all of the streamed results, so we
        // can just use the normal invoke() method.
        return this.Yu(t, e, n);
    }, t.prototype.Mu = function(t, n) {
        var s = [ this.Zf, "/", "google.firestore.v1.Firestore", "/", t, "/channel" ], c = o.createWebChannelTransport(), f = {
            // Required for backend stickiness, routing behavior is based on this
            // parameter.
            httpSessionIdParam: "gsessionid",
            initMessageHeaders: {},
            messageUrlParams: {
                // This param is used to improve routing and project isolation by the
                // backend and must be included in every request.
                database: "projects/" + this.s.projectId + "/databases/" + this.s.database
            },
            sendRawJson: !0,
            supportsCrossDomainXhr: !0,
            internalChannelParams: {
                // Override the default timeout (randomized between 10-20 seconds) since
                // a large write batch on a slow internet connection may take a long
                // time to send to the backend. Rather than have WebChannel impose a
                // tight timeout which could lead to infinite timeouts and retries, we
                // set it very large (5-10 minutes) and rely on the browser's builtin
                // timeouts to kick in if the request isn't working.
                forwardChannelRequestTimeoutMs: 6e5
            },
            forceLongPolling: this.forceLongPolling
        };
        this.td(f.initMessageHeaders, n), 
        // Sending the custom headers we just added to request.initMessageHeaders
        // (Authorization, etc.) will trigger the browser to make a CORS preflight
        // request because the XHR will no longer meet the criteria for a "simple"
        // CORS request:
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Simple_requests
        // Therefore to avoid the CORS preflight request (an extra network
        // roundtrip), we use the httpHeadersOverwriteParam option to specify that
        // the headers should instead be encoded into a special "$httpHeaders" query
        // parameter, which is recognized by the webchannel backend. This is
        // formally defined here:
        // https://github.com/google/closure-library/blob/b0e1815b13fb92a46d7c9b3c30de5d6a396a3245/closure/goog/net/rpc/httpcors.js#L32
        // TODO(b/145624756): There is a backend bug where $httpHeaders isn't respected if the request
        // doesn't have an Origin header. So we have to exclude a few browser environments that are
        // known to (sometimes) not include an Origin. See
        // https://github.com/firebase/firebase-js-sdk/issues/1491.
        i.isMobileCordova() || i.isReactNative() || i.isElectron() || i.isIE() || i.isUWP() || i.isBrowserExtension() || (f.httpHeadersOverwriteParam = "$httpHeaders");
        var p = s.join("");
        h("Connection", "Creating WebChannel: " + p + " " + f);
        var y = c.createWebChannel(p, f), v = !1, g = !1, m = new Eo({
            jf: function(t) {
                g ? h("Connection", "Not sending because WebChannel is closed:", t) : (v || (h("Connection", "Opening WebChannel transport."), 
                y.open(), v = !0), h("Connection", "WebChannel sending:", t), y.send(t));
            },
            Kf: function() {
                return y.close();
            }
        }), w = function(t, e) {
            // TODO(dimond): closure typing seems broken because WebChannel does
            // not implement goog.events.Listenable
            y.listen(t, (function(t) {
                try {
                    e(t);
                } catch (t) {
                    setTimeout((function() {
                        throw t;
                    }), 0);
                }
            }));
        };
        // WebChannel supports sending the first message with the handshake - saving
        // a network round trip. However, it will have to call send in the same
        // JS event loop as open. In order to enforce this, we delay actually
        // opening the WebChannel until send is called. Whether we have called
        // open is tracked with this variable.
                // Closure events are guarded and exceptions are swallowed, so catch any
        // exception and rethrow using a setTimeout so they become visible again.
        // Note that eventually this function could go away if we are confident
        // enough the code is exception free.
        return w(o.WebChannel.EventType.OPEN, (function() {
            g || h("Connection", "WebChannel transport opened.");
        })), w(o.WebChannel.EventType.CLOSE, (function() {
            g || (g = !0, h("Connection", "WebChannel transport closed"), m.Jf());
        })), w(o.WebChannel.EventType.ERROR, (function(t) {
            g || (g = !0, function(t) {
                for (var n = [], i = 1; i < arguments.length; i++) n[i - 1] = arguments[i];
                if (a.logLevel <= r.LogLevel.WARN) {
                    var o = n.map(l);
                    a.warn.apply(a, e.__spreadArrays([ "Firestore (" + u + "): " + t ], o));
                }
            }("Connection", "WebChannel transport errored:", t), m.Jf(new S(x.UNAVAILABLE, "The operation could not be completed")));
        })), w(o.WebChannel.EventType.MESSAGE, (function(t) {
            var e;
            if (!g) {
                var n = t.data[0];
                d(!!n);
                // TODO(b/35143891): There is a bug in One Platform that caused errors
                // (and only errors) to be wrapped in an extra array. To be forward
                // compatible with the bug we need to check either condition. The latter
                // can be removed once the fix has been rolled out.
                // Use any because msgData.error is not typed.
                var r = n, i = r.error || (null === (e = r[0]) || void 0 === e ? void 0 : e.error);
                if (i) {
                    h("Connection", "WebChannel received error:", i);
                    // error.status will be a string like 'OK' or 'NOT_FOUND'.
                    var o = i.status, s = function(t) {
                        // lookup by string
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        var e = M[t];
                        if (void 0 !== e) return z(e);
                    }(o), u = i.message;
                    void 0 === s && (s = x.INTERNAL, u = "Unknown error status: " + o + " with message " + i.message), 
                    // Mark closed so no further events are propagated
                    g = !0, m.Jf(new S(s, u)), y.close();
                } else h("Connection", "WebChannel received:", n), m.Xf(n);
            }
        })), setTimeout((function() {
            // Technically we could/should wait for the WebChannel opened event,
            // but because we want to send the first message with the WebChannel
            // handshake we pretend the channel opened here (asynchronously), and
            // then delay the actual open until the first message is sent.
            m.Yf();
        }), 0), m;
    }, 
    // visible for testing
    t.prototype.ed = function(t) {
        var e = To[t];
        return this.Zf + "/v1/projects/" + this.s.projectId + "/databases/" + this.s.database + "/documents:" + e;
    }, t;
}(), xo = /** @class */ function() {
    function t() {
        var t = this;
        this.sd = function() {
            return t.nd();
        }, this.rd = function() {
            return t.od();
        }, this.hd = [], this.ad();
    }
    return t.prototype.Pc = function(t) {
        this.hd.push(t);
    }, t.prototype.Ur = function() {
        window.removeEventListener("online", this.sd), window.removeEventListener("offline", this.rd);
    }, t.prototype.ad = function() {
        window.addEventListener("online", this.sd), window.addEventListener("offline", this.rd);
    }, t.prototype.nd = function() {
        h("ConnectivityMonitor", "Network connectivity changed: AVAILABLE");
        for (var t = 0, e = this.hd; t < e.length; t++) {
            (0, e[t])(0 /* AVAILABLE */);
        }
    }, t.prototype.od = function() {
        h("ConnectivityMonitor", "Network connectivity changed: UNAVAILABLE");
        for (var t = 0, e = this.hd; t < e.length; t++) {
            (0, e[t])(1 /* UNAVAILABLE */);
        }
    }, 
    // TODO(chenbrian): Consider passing in window either into this component or
    // here for testing via FakeWindow.
    /** Checks that all used attributes of window are available. */
    t._r = function() {
        return "undefined" != typeof window && void 0 !== window.addEventListener && void 0 !== window.removeEventListener;
    }, t;
}(), So = /** @class */ function() {
    function t() {}
    return t.prototype.Pc = function(t) {
        // No-op.
    }, t.prototype.Ur = function() {
        // No-op.
    }, t;
}(), Do = "You are using the memory-only build of Firestore. Persistence support is only available via the @firebase/firestore bundle or the firebase-firestore.js build.", ko = /** @class */ function() {
    function t() {}
    return t.prototype.initialize = function(t) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var n = this;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return this.P_ = this.ud(t), this.persistence = this.ld(t), [ 4 /*yield*/ , this.persistence.start() ];

                  case 1:
                    return e.sent(), this._d = this.fd(t), this.Tc = this.dd(t), this.m_ = this.wd(t), 
                    this.Qc = this.Td(t), this.Ed = this.Id(t), this.P_.hc = function(t) {
                        return n.Qc.c_(t, 1 /* SharedClientState */);
                    }, this.m_.Qc = this.Qc, [ 4 /*yield*/ , this.Tc.start() ];

                  case 2:
                    return e.sent(), [ 4 /*yield*/ , this.P_.start() ];

                  case 3:
                    return e.sent(), [ 4 /*yield*/ , this.m_.start() ];

                  case 4:
                    return e.sent(), [ 4 /*yield*/ , this.m_.rl(this.Qc.k_) ];

                  case 5:
                    return e.sent(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.Id = function(t) {
        return new po(this.Qc);
    }, t.prototype.fd = function(t) {
        return null;
    }, t.prototype.dd = function(t) {
        return new Lr(this.persistence, new vo, t.Ad);
    }, t.prototype.ld = function(t) {
        if (t.md.Rd) throw new S(x.FAILED_PRECONDITION, Do);
        return new _o(Io.Uf);
    }, t.prototype.wd = function(t) {
        var e = this;
        return new Hi(this.Tc, t.Xu, t.Oo, (function(t) {
            return e.Qc.c_(t, 0 /* RemoteStore */);
        }), xo._r() ? new xo : new So);
    }, t.prototype.ud = function(t) {
        return new ro;
    }, t.prototype.Td = function(t) {
        return new ho(this.Tc, this.m_, t.Xu, this.P_, t.Ad, t.V_);
    }, t.prototype.clearPersistence = function(t) {
        throw new S(x.FAILED_PRECONDITION, Do);
    }, t;
}(), Po = /** @class */ function(t) {
    function n() {
        return null !== t && t.apply(this, arguments) || this;
    }
    return e.__extends(n, t), n.prototype.initialize = function(n) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var r = this;
            return e.__generator(this, (function(i) {
                switch (i.label) {
                  case 0:
                    return [ 4 /*yield*/ , t.prototype.initialize.call(this, n) ];

                  case 1:
                    // NOTE: This will immediately call the listener, so we make sure to
                    // set it after localStore / remoteStore are started.
                    return i.sent(), [ 4 /*yield*/ , this.persistence.gr((function(t) {
                        return e.__awaiter(r, void 0, void 0, (function() {
                            return e.__generator(this, (function(e) {
                                switch (e.label) {
                                  case 0:
                                    return [ 4 /*yield*/ , this.Qc.rl(t) ];

                                  case 1:
                                    return e.sent(), this._d && (t && !this._d.pr ? this._d.start(this.Tc) : t || this._d.stop()), 
                                    [ 2 /*return*/ ];
                                }
                            }));
                        }));
                    })) ];

                  case 2:
                    // NOTE: This will immediately call the listener, so we make sure to
                    // set it after localStore / remoteStore are started.
                    return i.sent(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, n.prototype.dd = function(t) {
        return new Vr(this.persistence, new vo, t.Ad);
    }, n.prototype.Td = function(t) {
        var e = new fo(this.Tc, this.m_, t.Xu, this.P_, t.Ad, t.V_);
        return this.P_ instanceof no && (this.P_.Qc = e), e;
    }, n.prototype.fd = function(t) {
        var e = this.persistence.Fi.eo;
        return new Or(e, t.Oo);
    }, n.prototype.ld = function(t) {
        var e = jn.to(t.Pd), n = _i(t.Pd.s);
        return new jn(t.md.synchronizeTabs, e, t.clientId, Rr.ph(t.md.cacheSizeBytes), t.Oo, Nr(), "undefined" != typeof document ? document : null, n, this.P_, t.md.ir);
    }, n.prototype.ud = function(t) {
        if (t.md.Rd && t.md.synchronizeTabs) {
            var e = Nr();
            if (!no._r(e)) throw new S(x.UNIMPLEMENTED, "IndexedDB persistence is only available on platforms that support LocalStorage.");
            var n = jn.to(t.Pd);
            return new no(e, t.Oo, n, t.clientId, t.Ad);
        }
        return new ro;
    }, n.prototype.clearPersistence = function(t) {
        var e = jn.to(t);
        return jn.clearPersistence(e);
    }, n;
}(ko), Ro = /** @class */ function() {
    function t(t, e, 
    /**
     * Asynchronous queue responsible for all of our internal processing. When
     * we get incoming work from the user (via public API) or the network
     * (incoming GRPC messages), we should always schedule onto this queue.
     * This ensures all of our work is properly serialized (e.g. we don't
     * start processing a new operation while the previous one is waiting for
     * an async I/O to complete).
     */
    n) {
        this.Pd = t, this.credentials = e, this.Oo = n, this.clientId = g.t()
        /**
     * Starts up the FirestoreClient, returning only whether or not enabling
     * persistence succeeded.
     *
     * The intent here is to "do the right thing" as far as users are concerned.
     * Namely, in cases where offline persistence is requested and possible,
     * enable it, but otherwise fall back to persistence disabled. For the most
     * part we expect this to succeed one way or the other so we don't expect our
     * users to actually wait on the firestore.enablePersistence Promise since
     * they generally won't care.
     *
     * Of course some users actually do care about whether or not persistence
     * was successfully enabled, so the Promise returned from this method
     * indicates this outcome.
     *
     * This presents a problem though: even before enablePersistence resolves or
     * rejects, users may have made calls to e.g. firestore.collection() which
     * means that the FirestoreClient in there will be available and will be
     * enqueuing actions on the async queue.
     *
     * Meanwhile any failure of an operation on the async queue causes it to
     * panic and reject any further work, on the premise that unhandled errors
     * are fatal.
     *
     * Consequently the fallback is handled internally here in start, and if the
     * fallback succeeds we signal success to the async queue even though the
     * start() itself signals failure.
     *
     * @param componentProvider Provider that returns all core components.
     * @param persistenceSettings Settings object to configure offline
     *     persistence.
     * @returns A deferred result indicating the user-visible result of enabling
     *     offline persistence. This method will reject this if IndexedDB fails to
     *     start for any reason. If usePersistence is false this is
     *     unconditionally resolved.
     */;
    }
    return t.prototype.start = function(t, e) {
        var n = this;
        this.Hu();
        // We defer our initialization until we get the current user from
        // setChangeListener(). We block the async queue until we got the initial
        // user and the initialization is completed. This will prevent any scheduled
        // work from happening before initialization is completed.
        // If initializationDone resolved then the FirestoreClient is in a usable
        // state.
        var r = new cn, i = new cn, o = !1;
        // If usePersistence is true, certain classes of errors while starting are
        // recoverable but only by falling back to persistence disabled.
        // If there's an error in the first case but not in recovery we cannot
        // reject the promise blocking the async queue because this will cause the
        // async queue to panic.
                // Return only the result of enabling persistence. Note that this does not
        // need to await the completion of initializationDone because the result of
        // this method should not reflect any other kind of failure to start.
        return this.credentials.au((function(s) {
            if (!o) return o = !0, h("FirestoreClient", "Initializing. user=", s.uid), n.Vd(t, e, s, i).then(r.resolve, r.reject);
            n.Oo.Cr((function() {
                return n.m_.il(s);
            }));
        })), 
        // Block the async queue until initialization is done
        this.Oo.Sr((function() {
            return r.promise;
        })), i.promise;
    }, 
    /** Enables the network connection and requeues all pending operations. */ t.prototype.enableNetwork = function() {
        var t = this;
        return this.Hu(), this.Oo.enqueue((function() {
            return t.Qc.enableNetwork();
        }));
    }, 
    /**
     * Initializes persistent storage, attempting to use IndexedDB if
     * usePersistence is true or memory-only if false.
     *
     * If IndexedDB fails because it's already open in another tab or because the
     * platform can't possibly support our implementation then this method rejects
     * the persistenceResult and falls back on memory-only persistence.
     *
     * @param componentProvider The provider that provides all core componennts
     *     for IndexedDB or memory-backed persistence
     * @param persistenceSettings Settings object to configure offline persistence
     * @param user The initial user
     * @param persistenceResult A deferred result indicating the user-visible
     *     result of enabling offline persistence. This method will reject this if
     *     IndexedDB fails to start for any reason. If usePersistence is false
     *     this is unconditionally resolved.
     * @returns a Promise indicating whether or not initialization should
     *     continue, i.e. that one of the persistence implementations actually
     *     succeeded.
     */
    t.prototype.Vd = function(t, n, r, i) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var o, s, u, a, c, h = this;
            return e.__generator(this, (function(f) {
                switch (f.label) {
                  case 0:
                    return f.trys.push([ 0, 3, , 4 ]), [ 4 /*yield*/ , (c = this.Pd, Promise.resolve(new Ao(c))) ];

                  case 1:
                    return o = f.sent(), s = _i(this.Pd.s), u = function(t, e, n) {
                        return new Gi(t, e, n);
                    }(o, this.credentials, s), [ 4 /*yield*/ , t.initialize({
                        Oo: this.Oo,
                        Pd: this.Pd,
                        Xu: u,
                        clientId: this.clientId,
                        Ad: r,
                        V_: 100,
                        md: n
                    }) ];

                  case 2:
                    return f.sent(), this.persistence = t.persistence, this.P_ = t.P_, this.Tc = t.Tc, 
                    this.m_ = t.m_, this.Qc = t.Qc, this._d = t._d, this.gd = t.Ed, 
                    // When a user calls clearPersistence() in one client, all other clients
                    // need to be terminated to allow the delete to succeed.
                    this.persistence.yr((function() {
                        return e.__awaiter(h, void 0, void 0, (function() {
                            return e.__generator(this, (function(t) {
                                switch (t.label) {
                                  case 0:
                                    return [ 4 /*yield*/ , this.terminate() ];

                                  case 1:
                                    return t.sent(), [ 2 /*return*/ ];
                                }
                            }));
                        }));
                    })), i.resolve(), [ 3 /*break*/ , 4 ];

                  case 3:
                    // An unknown failure on the first stage shuts everything down.
                    if (a = f.sent(), 
                    // Regardless of whether or not the retry succeeds, from an user
                    // perspective, offline persistence has failed.
                    i.reject(a), !this.pd(a)) throw a;
                    return [ 2 /*return*/ , (console.warn("Error enabling offline persistence. Falling back to persistence disabled: " + a), 
                    this.Vd(new ko, {
                        Rd: !1
                    }, r, i)) ];

                  case 4:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * Decides whether the provided error allows us to gracefully disable
     * persistence (as opposed to crashing the client).
     */
    t.prototype.pd = function(t) {
        return "FirebaseError" === t.name ? t.code === x.FAILED_PRECONDITION || t.code === x.UNIMPLEMENTED : !("undefined" != typeof DOMException && t instanceof DOMException) || 
        // When the browser is out of quota we could get either quota exceeded
        // or an aborted error depending on whether the error happened during
        // schema migration.
        22 === t.code || 20 === t.code || 
        // Firefox Private Browsing mode disables IndexedDb and returns
        // INVALID_STATE for any usage.
        11 === t.code;
    }, 
    /**
     * Checks that the client has not been terminated. Ensures that other methods on
     * this class cannot be called after the client is terminated.
     */
    t.prototype.Hu = function() {
        if (this.Oo.eh) throw new S(x.FAILED_PRECONDITION, "The client has already been terminated.");
    }, 
    /** Disables the network connection. Pending operations will not complete. */ t.prototype.disableNetwork = function() {
        var t = this;
        return this.Hu(), this.Oo.enqueue((function() {
            return t.Qc.disableNetwork();
        }));
    }, t.prototype.terminate = function() {
        var t = this;
        return this.Oo.oh((function() {
            return e.__awaiter(t, void 0, void 0, (function() {
                return e.__generator(this, (function(t) {
                    switch (t.label) {
                      case 0:
                        // PORTING NOTE: LocalStore does not need an explicit shutdown on web.
                        return this._d && this._d.stop(), [ 4 /*yield*/ , this.m_.Ur() ];

                      case 1:
                        return t.sent(), [ 4 /*yield*/ , this.P_.Ur() ];

                      case 2:
                        return t.sent(), [ 4 /*yield*/ , this.persistence.Ur() ];

                      case 3:
                        // PORTING NOTE: LocalStore does not need an explicit shutdown on web.
                        return t.sent(), 
                        // `removeChangeListener` must be called after shutting down the
                        // RemoteStore as it will prevent the RemoteStore from retrieving
                        // auth tokens.
                        this.credentials.uu(), [ 2 /*return*/ ];
                    }
                }));
            }));
        }));
    }, 
    /**
     * Returns a Promise that resolves when all writes that were pending at the time this
     * method was called received server acknowledgement. An acknowledgement can be either acceptance
     * or rejection.
     */
    t.prototype.waitForPendingWrites = function() {
        var t = this;
        this.Hu();
        var e = new cn;
        return this.Oo.Sr((function() {
            return t.Qc.K_(e);
        })), e.promise;
    }, t.prototype.listen = function(t, e, n) {
        var r = this;
        this.Hu();
        var i = new yo(t, e, n);
        return this.Oo.Sr((function() {
            return r.gd.listen(i);
        })), i;
    }, t.prototype.qc = function(t) {
        var e = this;
        // Checks for termination but does not raise error, allowing unlisten after
        // termination to be a no-op.
                this.yd || this.Oo.Sr((function() {
            return e.gd.qc(t);
        }));
    }, t.prototype.bd = function(t) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var n, r = this;
            return e.__generator(this, (function(i) {
                switch (i.label) {
                  case 0:
                    return this.Hu(), n = new cn, [ 4 /*yield*/ , this.Oo.enqueue((function() {
                        return e.__awaiter(r, void 0, void 0, (function() {
                            var r, i, o;
                            return e.__generator(this, (function(e) {
                                switch (e.label) {
                                  case 0:
                                    return e.trys.push([ 0, 2, , 3 ]), [ 4 /*yield*/ , this.Tc.aa(t) ];

                                  case 1:
                                    return (r = e.sent()) instanceof Oe ? n.resolve(r) : r instanceof Ue ? n.resolve(null) : n.reject(new S(x.UNAVAILABLE, "Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)")), 
                                    [ 3 /*break*/ , 3 ];

                                  case 2:
                                    return i = e.sent(), o = Sr(i, "Failed to get document '" + t + " from cache"), 
                                    n.reject(o), [ 3 /*break*/ , 3 ];

                                  case 3:
                                    return [ 2 /*return*/ ];
                                }
                            }));
                        }));
                    })) ];

                  case 1:
                    return [ 2 /*return*/ , (i.sent(), n.promise) ];
                }
            }));
        }));
    }, t.prototype.vd = function(t) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var n, r = this;
            return e.__generator(this, (function(i) {
                switch (i.label) {
                  case 0:
                    return this.Hu(), n = new cn, [ 4 /*yield*/ , this.Oo.enqueue((function() {
                        return e.__awaiter(r, void 0, void 0, (function() {
                            var r, i, o, s, u, a;
                            return e.__generator(this, (function(e) {
                                switch (e.label) {
                                  case 0:
                                    return e.trys.push([ 0, 2, , 3 ]), [ 4 /*yield*/ , this.Tc.la(t, 
                                    /* usePreviousResults= */ !0) ];

                                  case 1:
                                    return r = e.sent(), i = new so(t, r._a), o = i.n_(r.documents), s = i.wn(o, 
                                    /* updateLimboDocuments= */ !1), n.resolve(s.snapshot), [ 3 /*break*/ , 3 ];

                                  case 2:
                                    return u = e.sent(), a = Sr(u, "Failed to execute query '" + t + " against cache"), 
                                    n.reject(a), [ 3 /*break*/ , 3 ];

                                  case 3:
                                    return [ 2 /*return*/ ];
                                }
                            }));
                        }));
                    })) ];

                  case 1:
                    return [ 2 /*return*/ , (i.sent(), n.promise) ];
                }
            }));
        }));
    }, t.prototype.write = function(t) {
        var e = this;
        this.Hu();
        var n = new cn;
        return this.Oo.Sr((function() {
            return e.Qc.write(t, n);
        })), n.promise;
    }, t.prototype.s = function() {
        return this.Pd.s;
    }, t.prototype.lf = function(t) {
        var e = this;
        this.Hu(), this.Oo.Sr((function() {
            return e.gd.lf(t), Promise.resolve();
        }));
    }, t.prototype._f = function(t) {
        var e = this;
        // Checks for shutdown but does not raise error, allowing remove after
        // shutdown to be a no-op.
                this.yd || this.Oo.Sr((function() {
            return e.gd._f(t), Promise.resolve();
        }));
    }, Object.defineProperty(t.prototype, "yd", {
        get: function() {
            // Technically, the asyncQueue is still running, but only accepting operations
            // related to termination or supposed to be run after termination. It is effectively
            // terminated to the eyes of users.
            return this.Oo.eh;
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.transaction = function(t) {
        var e = this;
        this.Hu();
        var n = new cn;
        return this.Oo.Sr((function() {
            return e.Qc.runTransaction(e.Oo, t, n), Promise.resolve();
        })), n.promise;
    }, t;
}(), Oo = /** @class */ function() {
    function t(t) {
        this.observer = t, 
        /**
             * When set to true, will not raise future events. Necessary to deal with
             * async detachment of listener.
             */
        this.muted = !1;
    }
    return t.prototype.next = function(t) {
        this.Sd(this.observer.next, t);
    }, t.prototype.error = function(t) {
        this.Sd(this.observer.error, t);
    }, t.prototype.Dd = function() {
        this.muted = !0;
    }, t.prototype.Sd = function(t, e) {
        var n = this;
        this.muted || setTimeout((function() {
            n.muted || t(e);
        }), 0);
    }, t;
}();

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A memory-backed instance of Persistence. Data is stored only in RAM and
 * not persisted across sessions.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Uo(t) {
    /**
 * Returns true if obj is an object and contains at least one of the specified
 * methods.
 */
    return function(t, e) {
        if ("object" != typeof t || null === t) return !1;
        for (var n = t, r = 0, i = [ "next", "error", "complete" ]; r < i.length; r++) {
            var o = i[r];
            if (o in n && "function" == typeof n[o]) return !0;
        }
        return !1;
    }(t);
}

var Lo = /** @class */ function() {
    function t(t, e, n, r) {
        this.s = t, this.timestampsInSnapshots = e, this.Cd = n, this.Fd = r;
    }
    return t.prototype.Nd = function(t) {
        switch (It(t)) {
          case 0 /* NullValue */ :
            return null;

          case 1 /* BooleanValue */ :
            return t.booleanValue;

          case 2 /* NumberValue */ :
            return Dt(t.integerValue || t.doubleValue);

          case 3 /* TimestampValue */ :
            return this.$d(t.timestampValue);

          case 4 /* ServerTimestampValue */ :
            return this.kd(t);

          case 5 /* StringValue */ :
            return t.stringValue;

          case 6 /* BlobValue */ :
            return new ui(kt(t.bytesValue));

          case 7 /* RefValue */ :
            return this.xd(t.referenceValue);

          case 8 /* GeoPointValue */ :
            return this.Md(t.geoPointValue);

          case 9 /* ArrayValue */ :
            return this.Ld(t.arrayValue);

          case 10 /* ObjectValue */ :
            return this.Od(t.mapValue);

          default:
            throw p();
        }
    }, t.prototype.Od = function(t) {
        var e = this, n = {};
        return T(t.fields || {}, (function(t, r) {
            n[t] = e.Nd(r);
        })), n;
    }, t.prototype.Md = function(t) {
        return new wi(Dt(t.latitude), Dt(t.longitude));
    }, t.prototype.Ld = function(t) {
        var e = this;
        return (t.values || []).map((function(t) {
            return e.Nd(t);
        }));
    }, t.prototype.kd = function(t) {
        switch (this.Cd) {
          case "previous":
            var e = function t(e) {
                var n = e.mapValue.fields.__previous_value__;
                return wt(n) ? t(n) : n;
            }(t);
            return null == e ? null : this.Nd(e);

          case "estimate":
            return this.$d(_t(t));

          default:
            return null;
        }
    }, t.prototype.$d = function(t) {
        var e = St(t), n = new D(e.seconds, e.nanos);
        return this.timestampsInSnapshots ? n : n.toDate();
    }, t.prototype.xd = function(t) {
        var e = R.$(t);
        d(pe(e));
        var n = new I(e.get(1), e.get(3)), r = new L(e.g(5));
        return n.isEqual(this.s) || 
        // TODO(b/64130202): Somehow support foreign references.
        f("Document " + r + " contains a document reference within a different database (" + n.projectId + "/" + n.database + ") which is not supported. It will be treated as a reference in the current database (" + this.s.projectId + "/" + this.s.database + ") instead."), 
        this.Fd(r);
    }, t;
}(), Vo = Rr.vh, Co = /** @class */ function() {
    function t(t) {
        var e, n, r, i;
        if (void 0 === t.host) {
            if (void 0 !== t.ssl) throw new S(x.INVALID_ARGUMENT, "Can't provide ssl option if host option is not set");
            this.host = "firestore.googleapis.com", this.ssl = !0;
        } else Wr("settings", "non-empty string", "host", t.host), this.host = t.host, Hr("settings", "boolean", "ssl", t.ssl), 
        this.ssl = null === (e = t.ssl) || void 0 === e || e;
        if (ti("settings", t, [ "host", "ssl", "credentials", "timestampsInSnapshots", "cacheSizeBytes", "experimentalForceLongPolling", "ignoreUndefinedProperties" ]), 
        Hr("settings", "object", "credentials", t.credentials), this.credentials = t.credentials, 
        Hr("settings", "boolean", "timestampsInSnapshots", t.timestampsInSnapshots), Hr("settings", "boolean", "ignoreUndefinedProperties", t.ignoreUndefinedProperties), 
        // Nobody should set timestampsInSnapshots anymore, but the error depends on
        // whether they set it to true or false...
        !0 === t.timestampsInSnapshots ? f("The setting 'timestampsInSnapshots: true' is no longer required and should be removed.") : !1 === t.timestampsInSnapshots && f("Support for 'timestampsInSnapshots: false' will be removed soon. You must update your code to handle Timestamp objects."), 
        this.timestampsInSnapshots = null === (n = t.timestampsInSnapshots) || void 0 === n || n, 
        this.ignoreUndefinedProperties = null !== (r = t.ignoreUndefinedProperties) && void 0 !== r && r, 
        Hr("settings", "number", "cacheSizeBytes", t.cacheSizeBytes), void 0 === t.cacheSizeBytes) this.cacheSizeBytes = Rr.Dh; else {
            if (t.cacheSizeBytes !== Vo && t.cacheSizeBytes < Rr.Sh) throw new S(x.INVALID_ARGUMENT, "cacheSizeBytes must be at least " + Rr.Sh);
            this.cacheSizeBytes = t.cacheSizeBytes;
        }
        Hr("settings", "boolean", "experimentalForceLongPolling", t.experimentalForceLongPolling), 
        this.forceLongPolling = null !== (i = t.experimentalForceLongPolling) && void 0 !== i && i;
    }
    return t.prototype.isEqual = function(t) {
        return this.host === t.host && this.ssl === t.ssl && this.timestampsInSnapshots === t.timestampsInSnapshots && this.credentials === t.credentials && this.cacheSizeBytes === t.cacheSizeBytes && this.forceLongPolling === t.forceLongPolling && this.ignoreUndefinedProperties === t.ignoreUndefinedProperties;
    }, t;
}(), qo = /** @class */ function() {
    // Note: We are using `MemoryComponentProvider` as a default
    // ComponentProvider to ensure backwards compatibility with the format
    // expected by the console build.
    function t(n, r, i) {
        var o = this;
        if (void 0 === i && (i = new ko), this.Bd = null, 
        // Public for use in tests.
        // TODO(mikelehen): Use modularized initialization instead.
        this.qd = new xr, this.INTERNAL = {
            delete: function() {
                return e.__awaiter(o, void 0, void 0, (function() {
                    return e.__generator(this, (function(t) {
                        switch (t.label) {
                          case 0:
                            // The client must be initalized to ensure that all subsequent API usage
                            // throws an exception.
                            return this.Ud(), [ 4 /*yield*/ , this.Qd.terminate() ];

                          case 1:
                            // The client must be initalized to ensure that all subsequent API usage
                            // throws an exception.
                            return t.sent(), [ 2 /*return*/ ];
                        }
                    }));
                }));
            }
        }, "object" == typeof n.options) {
            // This is very likely a Firebase app object
            // TODO(b/34177605): Can we somehow use instanceof?
            var s = n;
            this.Bd = s, this.qa = t.Wd(s), this.jd = s.name, this.Kd = new qi(r);
        } else {
            var u = n;
            if (!u.projectId) throw new S(x.INVALID_ARGUMENT, "Must provide projectId");
            this.qa = new I(u.projectId, u.database), 
            // Use a default persistenceKey that lines up with FirebaseApp.
            this.jd = "[DEFAULT]", this.Kd = new Ci;
        }
        this.Gd = i, this.zd = new Co({});
    }
    return Object.defineProperty(t.prototype, "Hd", {
        get: function() {
            return this.Yd || (
            // Lazy initialize UserDataReader once the settings are frozen
            this.Yd = new xi(this.qa, this.zd.ignoreUndefinedProperties)), this.Yd;
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.settings = function(t) {
        jr("Firestore.settings", arguments, 1), Gr("Firestore.settings", "object", 1, t);
        var e = new Co(t);
        if (this.Qd && !this.zd.isEqual(e)) throw new S(x.FAILED_PRECONDITION, "Firestore has already been started and its settings can no longer be changed. You can only call settings() before calling any other methods on a Firestore object.");
        this.zd = e, void 0 !== e.credentials && (this.Kd = function(t) {
            if (!t) return new Ci;
            switch (t.type) {
              case "gapi":
                var e = t.Jd;
                // Make sure this really is a Gapi client.
                                return d(!("object" != typeof e || null === e || !e.auth || !e.auth.getAuthHeaderValueForFirstParty)), 
                new Mi(e, t.wu || "0");

              case "provider":
                return t.Jd;

              default:
                throw new S(x.INVALID_ARGUMENT, "makeCredentialsProvider failed due to invalid credential type");
            }
        }(e.credentials));
    }, t.prototype.enableNetwork = function() {
        return this.Ud(), this.Qd.enableNetwork();
    }, t.prototype.disableNetwork = function() {
        return this.Ud(), this.Qd.disableNetwork();
    }, t.prototype.enablePersistence = function(t) {
        var e, n;
        if (this.Qd) throw new S(x.FAILED_PRECONDITION, "Firestore has already been started and persistence can no longer be enabled. You can only call enablePersistence() before calling any other methods on a Firestore object.");
        var r = !1, i = !1;
        if (t && (void 0 !== t.experimentalTabSynchronization && f("The 'experimentalTabSynchronization' setting will be removed. Use 'synchronizeTabs' instead."), 
        r = null !== (n = null !== (e = t.synchronizeTabs) && void 0 !== e ? e : t.experimentalTabSynchronization) && void 0 !== n && n, 
        i = !!t.experimentalForceOwningTab && t.experimentalForceOwningTab, r && i)) throw new S(x.INVALID_ARGUMENT, "The 'experimentalForceOwningTab' setting cannot be used with 'synchronizeTabs'.");
        return this.Xd(this.Gd, {
            Rd: !0,
            cacheSizeBytes: this.zd.cacheSizeBytes,
            synchronizeTabs: r,
            ir: i
        });
    }, t.prototype.clearPersistence = function() {
        return e.__awaiter(this, void 0, void 0, (function() {
            var t, n = this;
            return e.__generator(this, (function(r) {
                if (void 0 !== this.Qd && !this.Qd.yd) throw new S(x.FAILED_PRECONDITION, "Persistence cannot be cleared after this Firestore instance is initialized.");
                return t = new cn, [ 2 /*return*/ , (this.qd.sh((function() {
                    return e.__awaiter(n, void 0, void 0, (function() {
                        var n, r;
                        return e.__generator(this, (function(e) {
                            switch (e.label) {
                              case 0:
                                return e.trys.push([ 0, 2, , 3 ]), n = this.Zd(), [ 4 /*yield*/ , this.Gd.clearPersistence(n) ];

                              case 1:
                                return e.sent(), t.resolve(), [ 3 /*break*/ , 3 ];

                              case 2:
                                return r = e.sent(), t.reject(r), [ 3 /*break*/ , 3 ];

                              case 3:
                                return [ 2 /*return*/ ];
                            }
                        }));
                    }));
                })), t.promise) ];
            }));
        }));
    }, t.prototype.terminate = function() {
        return this.app._removeServiceInstance("firestore"), this.INTERNAL.delete();
    }, Object.defineProperty(t.prototype, "tw", {
        get: function() {
            return this.Ud(), this.Qd.yd;
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.waitForPendingWrites = function() {
        return this.Ud(), this.Qd.waitForPendingWrites();
    }, t.prototype.onSnapshotsInSync = function(t) {
        if (this.Ud(), Uo(t)) return this.ew(t);
        Gr("Firestore.onSnapshotsInSync", "function", 1, t);
        var e = {
            next: t
        };
        return this.ew(e);
    }, t.prototype.ew = function(t) {
        var e = this, n = new Oo({
            next: function() {
                t.next && t.next();
            },
            error: function(t) {
                throw p();
            }
        });
        return this.Qd.lf(n), function() {
            n.Dd(), e.Qd._f(n);
        };
    }, t.prototype.Ud = function() {
        return this.Qd || 
        // Kick off starting the client but don't actually wait for it.
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.Xd(new ko, {
            Rd: !1
        }), this.Qd;
    }, t.prototype.Zd = function() {
        return new b(this.qa, this.jd, this.zd.host, this.zd.ssl, this.zd.forceLongPolling);
    }, t.prototype.Xd = function(t, e) {
        var n = this.Zd();
        return this.Qd = new Ro(n, this.Kd, this.qd), this.Qd.start(t, e);
    }, t.Wd = function(t) {
        if (e = t.options, "projectId", !Object.prototype.hasOwnProperty.call(e, "projectId")) throw new S(x.INVALID_ARGUMENT, '"projectId" not provided in firebase.initializeApp.');
        var e, n = t.options.projectId;
        /**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
        /** List of JavaScript builtins that cannot be reassigned. */        if (!n || "string" != typeof n) throw new S(x.INVALID_ARGUMENT, "projectId must be a string in FirebaseApp.options");
        return new I(n);
    }, Object.defineProperty(t.prototype, "app", {
        get: function() {
            if (!this.Bd) throw new S(x.FAILED_PRECONDITION, "Firestore was not initialized using the Firebase SDK. 'app' is not available");
            return this.Bd;
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.collection = function(t) {
        return jr("Firestore.collection", arguments, 1), Gr("Firestore.collection", "non-empty string", 1, t), 
        this.Ud(), new Ho(R.$(t), this, 
        /* converter= */ null);
    }, t.prototype.doc = function(t) {
        return jr("Firestore.doc", arguments, 1), Gr("Firestore.doc", "non-empty string", 1, t), 
        this.Ud(), jo.sw(R.$(t), this, 
        /* converter= */ null);
    }, t.prototype.collectionGroup = function(t) {
        if (jr("Firestore.collectionGroup", arguments, 1), Gr("Firestore.collectionGroup", "non-empty string", 1, t), 
        t.indexOf("/") >= 0) throw new S(x.INVALID_ARGUMENT, "Invalid collection ID '" + t + "' passed to function Firestore.collectionGroup(). Collection IDs must not contain '/'.");
        return this.Ud(), new zo(new Ve(R.k, t), this, 
        /* converter= */ null);
    }, t.prototype.runTransaction = function(t) {
        var e = this;
        return jr("Firestore.runTransaction", arguments, 1), Gr("Firestore.runTransaction", "function", 1, t), 
        this.Ud().transaction((function(n) {
            return t(new Fo(e, n));
        }));
    }, t.prototype.batch = function() {
        return this.Ud(), new Mo(this);
    }, Object.defineProperty(t, "logLevel", {
        get: function() {
            switch (c()) {
              case r.LogLevel.DEBUG:
                return "debug";

              case r.LogLevel.ERROR:
                return "error";

              case r.LogLevel.SILENT:
                return "silent";

              case r.LogLevel.WARN:
                return "warn";

              case r.LogLevel.INFO:
                return "info";

              case r.LogLevel.VERBOSE:
                return "verbose";

              default:
                // The default log level is error
                return "error";
            }
        },
        enumerable: !0,
        configurable: !0
    }), t.setLogLevel = function(t) {
        var e;
        jr("Firestore.setLogLevel", arguments, 1), Yr("setLogLevel", [ "debug", "error", "silent", "warn", "info", "verbose" ], 1, t), 
        e = t, a.setLogLevel(e);
    }, 
    // Note: this is not a property because the minifier can't work correctly with
    // the way TypeScript compiler outputs properties.
    t.prototype.nw = function() {
        return this.zd.timestampsInSnapshots;
    }, t;
}(), Fo = /** @class */ function() {
    function t(t, e) {
        this.iw = t, this.rw = e;
    }
    return t.prototype.get = function(t) {
        var e = this;
        jr("Transaction.get", arguments, 1);
        var n = $o("Transaction.get", t, this.iw);
        return this.rw.nc([ n.Ua ]).then((function(t) {
            if (!t || 1 !== t.length) return p();
            var r = t[0];
            if (r instanceof Ue) return new Qo(e.iw, n.Ua, null, 
            /* fromCache= */ !1, 
            /* hasPendingWrites= */ !1, n.Qa);
            if (r instanceof Oe) return new Qo(e.iw, n.Ua, r, 
            /* fromCache= */ !1, 
            /* hasPendingWrites= */ !1, n.Qa);
            throw p();
        }));
    }, t.prototype.set = function(t, e, n) {
        Qr("Transaction.set", arguments, 2, 3);
        var r = $o("Transaction.set", t, this.iw);
        n = Ko("Transaction.set", n);
        var i = Zo(r.Qa, e, "Transaction.set"), o = i[0], s = i[1], u = this.iw.Hd.Ja(s, o, n);
        return this.rw.set(r.Ua, u), this;
    }, t.prototype.update = function(t, e, n) {
        for (var r, i, o = [], s = 3; s < arguments.length; s++) o[s - 3] = arguments[s];
        return "string" == typeof e || e instanceof ci ? (Br("Transaction.update", arguments, 3), 
        r = $o("Transaction.update", t, this.iw), i = this.iw.Hd.tu("Transaction.update", e, n, o)) : (jr("Transaction.update", arguments, 2), 
        r = $o("Transaction.update", t, this.iw), i = this.iw.Hd.Za("Transaction.update", e)), 
        this.rw.update(r.Ua, i), this;
    }, t.prototype.delete = function(t) {
        jr("Transaction.delete", arguments, 1);
        var e = $o("Transaction.delete", t, this.iw);
        return this.rw.delete(e.Ua), this;
    }, t;
}(), Mo = /** @class */ function() {
    function t(t) {
        this.iw = t, this.ow = [], this.hw = !1;
    }
    return t.prototype.set = function(t, e, n) {
        Qr("WriteBatch.set", arguments, 2, 3), this.aw();
        var r = $o("WriteBatch.set", t, this.iw);
        n = Ko("WriteBatch.set", n);
        var i = Zo(r.Qa, e, "WriteBatch.set"), o = i[0], s = i[1], u = this.iw.Hd.Ja(s, o, n);
        return this.ow = this.ow.concat(u.Wa(r.Ua, Ie.Qe())), this;
    }, t.prototype.update = function(t, e, n) {
        for (var r, i, o = [], s = 3; s < arguments.length; s++) o[s - 3] = arguments[s];
        return this.aw(), "string" == typeof e || e instanceof ci ? (Br("WriteBatch.update", arguments, 3), 
        r = $o("WriteBatch.update", t, this.iw), i = this.iw.Hd.tu("WriteBatch.update", e, n, o)) : (jr("WriteBatch.update", arguments, 2), 
        r = $o("WriteBatch.update", t, this.iw), i = this.iw.Hd.Za("WriteBatch.update", e)), 
        this.ow = this.ow.concat(i.Wa(r.Ua, Ie.exists(!0))), this;
    }, t.prototype.delete = function(t) {
        jr("WriteBatch.delete", arguments, 1), this.aw();
        var e = $o("WriteBatch.delete", t, this.iw);
        return this.ow = this.ow.concat(new xe(e.Ua, Ie.Qe())), this;
    }, t.prototype.commit = function() {
        return this.aw(), this.hw = !0, this.ow.length > 0 ? this.iw.Ud().write(this.ow) : Promise.resolve();
    }, t.prototype.aw = function() {
        if (this.hw) throw new S(x.FAILED_PRECONDITION, "A write batch can no longer be used after commit() has been called.");
    }, t;
}(), jo = /** @class */ function(t) {
    function n(e, n, r) {
        var i = this;
        return (i = t.call(this, n.qa, e, r) || this).Ua = e, i.firestore = n, i.Qa = r, 
        i.Qd = i.firestore.Ud(), i;
    }
    return e.__extends(n, t), n.sw = function(t, e, r) {
        if (t.length % 2 != 0) throw new S(x.INVALID_ARGUMENT, "Invalid document reference. Document references must have an even number of segments, but " + t.N() + " has " + t.length);
        return new n(new L(t), e, r);
    }, Object.defineProperty(n.prototype, "id", {
        get: function() {
            return this.Ua.path.S();
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(n.prototype, "parent", {
        get: function() {
            return new Ho(this.Ua.path.p(), this.firestore, this.Qa);
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(n.prototype, "path", {
        get: function() {
            return this.Ua.path.N();
        },
        enumerable: !0,
        configurable: !0
    }), n.prototype.collection = function(t) {
        if (jr("DocumentReference.collection", arguments, 1), Gr("DocumentReference.collection", "non-empty string", 1, t), 
        !t) throw new S(x.INVALID_ARGUMENT, "Must provide a non-empty collection name to collection()");
        var e = R.$(t);
        return new Ho(this.Ua.path.child(e), this.firestore, 
        /* converter= */ null);
    }, n.prototype.isEqual = function(t) {
        if (!(t instanceof n)) throw ei("isEqual", "DocumentReference", 1, t);
        return this.firestore === t.firestore && this.Ua.isEqual(t.Ua) && this.Qa === t.Qa;
    }, n.prototype.set = function(t, e) {
        Qr("DocumentReference.set", arguments, 1, 2), e = Ko("DocumentReference.set", e);
        var n = Zo(this.Qa, t, "DocumentReference.set"), r = n[0], i = n[1], o = this.firestore.Hd.Ja(i, r, e);
        return this.Qd.write(o.Wa(this.Ua, Ie.Qe()));
    }, n.prototype.update = function(t, e) {
        for (var n, r = [], i = 2; i < arguments.length; i++) r[i - 2] = arguments[i];
        return "string" == typeof t || t instanceof ci ? (Br("DocumentReference.update", arguments, 2), 
        n = this.firestore.Hd.tu("DocumentReference.update", t, e, r)) : (jr("DocumentReference.update", arguments, 1), 
        n = this.firestore.Hd.Za("DocumentReference.update", t)), this.Qd.write(n.Wa(this.Ua, Ie.exists(!0)));
    }, n.prototype.delete = function() {
        return jr("DocumentReference.delete", arguments, 0), this.Qd.write([ new xe(this.Ua, Ie.Qe()) ]);
    }, n.prototype.onSnapshot = function() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        Qr("DocumentReference.onSnapshot", arguments, 1, 4);
        var n, r = {
            includeMetadataChanges: !1
        }, i = 0;
        "object" != typeof t[i] || Uo(t[i]) || (ti("DocumentReference.onSnapshot", r = t[i], [ "includeMetadataChanges" ]), 
        Hr("DocumentReference.onSnapshot", "boolean", "includeMetadataChanges", r.includeMetadataChanges), 
        i++);
        var o = {
            includeMetadataChanges: r.includeMetadataChanges
        };
        return Uo(t[i]) ? n = t[i] : (Gr("DocumentReference.onSnapshot", "function", i, t[i]), 
        zr("DocumentReference.onSnapshot", "function", i + 1, t[i + 1]), zr("DocumentReference.onSnapshot", "function", i + 2, t[i + 2]), 
        n = {
            next: t[i],
            error: t[i + 1],
            complete: t[i + 2]
        }), this.uw(o, n);
    }, n.prototype.uw = function(t, e) {
        var n = this, r = function(t) {
            console.error("Uncaught Error in onSnapshot:", t);
        };
        e.error && (r = e.error.bind(e));
        var i = new Oo({
            next: function(t) {
                if (e.next) {
                    var r = t.docs.get(n.Ua);
                    e.next(new Qo(n.firestore, n.Ua, r, t.fromCache, t.hasPendingWrites, n.Qa));
                }
            },
            error: r
        }), o = this.Qd.listen(Ve.As(this.Ua.path), i, t);
        return function() {
            i.Dd(), n.Qd.qc(o);
        };
    }, n.prototype.get = function(t) {
        var e = this;
        return Qr("DocumentReference.get", arguments, 0, 1), Xo("DocumentReference.get", t), 
        new Promise((function(n, r) {
            t && "cache" === t.source ? e.firestore.Ud().bd(e.Ua).then((function(t) {
                n(new Qo(e.firestore, e.Ua, t, 
                /*fromCache=*/ !0, t instanceof Oe && t.Xe, e.Qa));
            }), r) : e.cw(n, r, t);
        }));
    }, n.prototype.cw = function(t, e, n) {
        var r = this.uw({
            includeMetadataChanges: !0,
            Af: !0
        }, {
            next: function(i) {
                // Remove query first before passing event to user to avoid
                // user actions affecting the now stale query.
                r(), !i.exists && i.metadata.fromCache ? 
                // TODO(dimond): If we're online and the document doesn't
                // exist then we resolve with a doc.exists set to false. If
                // we're offline however, we reject the Promise in this
                // case. Two options: 1) Cache the negative response from
                // the server so we can deliver that even when you're
                // offline 2) Actually reject the Promise in the online case
                // if the document doesn't exist.
                e(new S(x.UNAVAILABLE, "Failed to get document because the client is offline.")) : i.exists && i.metadata.fromCache && n && "server" === n.source ? e(new S(x.UNAVAILABLE, 'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')) : t(i);
            },
            error: e
        });
    }, n.prototype.withConverter = function(t) {
        return new n(this.Ua, this.firestore, t);
    }, n;
}(Ii), Bo = /** @class */ function() {
    function t(t, e) {
        this.hasPendingWrites = t, this.fromCache = e;
    }
    return t.prototype.isEqual = function(t) {
        return this.hasPendingWrites === t.hasPendingWrites && this.fromCache === t.fromCache;
    }, t;
}(), Qo = /** @class */ function() {
    function t(t, e, n, r, i, o) {
        this.iw = t, this.Ua = e, this.lw = n, this._w = r, this.fw = i, this.Qa = o;
    }
    return t.prototype.data = function(t) {
        var e = this;
        if (Qr("DocumentSnapshot.data", arguments, 0, 1), t = Yo("DocumentSnapshot.data", t), 
        this.lw) {
            // We only want to use the converter and create a new DocumentSnapshot
            // if a converter has been provided.
            if (this.Qa) {
                var n = new Go(this.iw, this.Ua, this.lw, this._w, this.fw, 
                /* converter= */ null);
                return this.Qa.fromFirestore(n, t);
            }
            return new Lo(this.iw.qa, this.iw.nw(), t.serverTimestamps || "none", (function(t) {
                return new jo(t, e.iw, /* converter= */ null);
            })).Nd(this.lw.fs());
        }
    }, t.prototype.get = function(t, e) {
        var n = this;
        if (Qr("DocumentSnapshot.get", arguments, 1, 2), e = Yo("DocumentSnapshot.get", e), 
        this.lw) {
            var r = this.lw.data().field(Ri("DocumentSnapshot.get", t));
            if (null !== r) return new Lo(this.iw.qa, this.iw.nw(), e.serverTimestamps || "none", (function(t) {
                return new jo(t, n.iw, n.Qa);
            })).Nd(r);
        }
    }, Object.defineProperty(t.prototype, "id", {
        get: function() {
            return this.Ua.path.S();
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "ref", {
        get: function() {
            return new jo(this.Ua, this.iw, this.Qa);
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "exists", {
        get: function() {
            return null !== this.lw;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "metadata", {
        get: function() {
            return new Bo(this.fw, this._w);
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.isEqual = function(e) {
        if (!(e instanceof t)) throw ei("isEqual", "DocumentSnapshot", 1, e);
        return this.iw === e.iw && this._w === e._w && this.Ua.isEqual(e.Ua) && (null === this.lw ? null === e.lw : this.lw.isEqual(e.lw)) && this.Qa === e.Qa;
    }, t;
}(), Go = /** @class */ function(t) {
    function n() {
        return null !== t && t.apply(this, arguments) || this;
    }
    return e.__extends(n, t), n.prototype.data = function(e) {
        return t.prototype.data.call(this, e);
    }, n;
}(Qo), zo = /** @class */ function(t) {
    function n(e, n, r) {
        var i = this;
        return (i = t.call(this, n.qa, n.Hd, e) || this).dw = e, i.firestore = n, i.Qa = r, 
        i;
    }
    return e.__extends(n, t), n.prototype.where = function(t, e, r) {
        jr("Query.where", arguments, 3), Zr("Query.where", 3, r);
        // Enumerated from the WhereFilterOp type in index.d.ts.
        var i = Yr("Query.where", [ "<" /* LESS_THAN */ , "<=" /* LESS_THAN_OR_EQUAL */ , "==" /* EQUAL */ , ">=" /* GREATER_THAN_OR_EQUAL */ , ">" /* GREATER_THAN */ , "array-contains" /* ARRAY_CONTAINS */ , "in" /* IN */ , "array-contains-any" /* ARRAY_CONTAINS_ANY */ ], 2, e), o = Ri("Query.where", t), s = this.ww(o, i, r);
        return new n(this.dw.Ps(s), this.firestore, this.Qa);
    }, n.prototype.orderBy = function(t, e) {
        var r;
        if (Qr("Query.orderBy", arguments, 1, 2), zr("Query.orderBy", "non-empty string", 2, e), 
        void 0 === e || "asc" === e) r = "asc" /* ASCENDING */; else {
            if ("desc" !== e) throw new S(x.INVALID_ARGUMENT, "Function Query.orderBy() has unknown direction '" + e + "', expected 'asc' or 'desc'.");
            r = "desc" /* DESCENDING */;
        }
        var i = Ri("Query.orderBy", t), o = this.Aw(i, r);
        return new n(this.dw.Vs(o), this.firestore, this.Qa);
    }, n.prototype.limit = function(t) {
        return jr("Query.limit", arguments, 1), Gr("Query.limit", "number", 1, t), ni("Query.limit", 1, t), 
        new n(this.dw.gs(t), this.firestore, this.Qa);
    }, n.prototype.limitToLast = function(t) {
        return jr("Query.limitToLast", arguments, 1), Gr("Query.limitToLast", "number", 1, t), 
        ni("Query.limitToLast", 1, t), new n(this.dw.ps(t), this.firestore, this.Qa);
    }, n.prototype.startAt = function(t) {
        for (var e = [], r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
        Br("Query.startAt", arguments, 1);
        var i = this.pw("Query.startAt", t, e, 
        /*before=*/ !0);
        return new n(this.dw.ys(i), this.firestore, this.Qa);
    }, n.prototype.startAfter = function(t) {
        for (var e = [], r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
        Br("Query.startAfter", arguments, 1);
        var i = this.pw("Query.startAfter", t, e, 
        /*before=*/ !1);
        return new n(this.dw.ys(i), this.firestore, this.Qa);
    }, n.prototype.endBefore = function(t) {
        for (var e = [], r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
        Br("Query.endBefore", arguments, 1);
        var i = this.pw("Query.endBefore", t, e, 
        /*before=*/ !0);
        return new n(this.dw.bs(i), this.firestore, this.Qa);
    }, n.prototype.endAt = function(t) {
        for (var e = [], r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
        Br("Query.endAt", arguments, 1);
        var i = this.pw("Query.endAt", t, e, 
        /*before=*/ !1);
        return new n(this.dw.bs(i), this.firestore, this.Qa);
    }, n.prototype.isEqual = function(t) {
        if (!(t instanceof n)) throw ei("isEqual", "Query", 1, t);
        return this.firestore === t.firestore && this.dw.isEqual(t.dw) && this.Qa === t.Qa;
    }, n.prototype.withConverter = function(t) {
        return new n(this.dw, this.firestore, t);
    }, 
    /** Helper function to create a bound from a document or fields */ n.prototype.pw = function(t, n, r, i) {
        if (Zr(t, 1, n), n instanceof Qo) return jr(t, e.__spreadArrays([ n ], r), 1), this.mw(t, n.lw, i);
        var o = [ n ].concat(r);
        return this.Pw(t, o, i);
    }, n.prototype.onSnapshot = function() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        Qr("Query.onSnapshot", arguments, 1, 4);
        var n, r = {}, i = 0;
        return "object" != typeof t[i] || Uo(t[i]) || (ti("Query.onSnapshot", r = t[i], [ "includeMetadataChanges" ]), 
        Hr("Query.onSnapshot", "boolean", "includeMetadataChanges", r.includeMetadataChanges), 
        i++), Uo(t[i]) ? n = t[i] : (Gr("Query.onSnapshot", "function", i, t[i]), zr("Query.onSnapshot", "function", i + 1, t[i + 1]), 
        zr("Query.onSnapshot", "function", i + 2, t[i + 2]), n = {
            next: t[i],
            error: t[i + 1],
            complete: t[i + 2]
        }), this.Vw(this.dw), this.uw(r, n);
    }, n.prototype.uw = function(t, e) {
        var n = this, r = function(t) {
            console.error("Uncaught Error in onSnapshot:", t);
        };
        e.error && (r = e.error.bind(e));
        var i = new Oo({
            next: function(t) {
                e.next && e.next(new Wo(n.firestore, n.dw, t, n.Qa));
            },
            error: r
        }), o = this.firestore.Ud(), s = o.listen(this.dw, i, t);
        return function() {
            i.Dd(), o.qc(s);
        };
    }, n.prototype.get = function(t) {
        var e = this;
        return Qr("Query.get", arguments, 0, 1), Xo("Query.get", t), this.Vw(this.dw), new Promise((function(n, r) {
            t && "cache" === t.source ? e.firestore.Ud().vd(e.dw).then((function(t) {
                n(new Wo(e.firestore, e.dw, t, e.Qa));
            }), r) : e.cw(n, r, t);
        }));
    }, n.prototype.cw = function(t, e, n) {
        var r = this.uw({
            includeMetadataChanges: !0,
            Af: !0
        }, {
            next: function(i) {
                // Remove query first before passing event to user to avoid
                // user actions affecting the now stale query.
                r(), i.metadata.fromCache && n && "server" === n.source ? e(new S(x.UNAVAILABLE, 'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')) : t(i);
            },
            error: e
        });
    }, n;
}(/** @class */ function() {
    function t(t, e, n) {
        this.qa = t, this.Hd = e, this.dw = n;
    }
    return t.prototype.ww = function(t, e, n) {
        var r;
        if (t.L()) {
            if ("array-contains" /* ARRAY_CONTAINS */ === e || "array-contains-any" /* ARRAY_CONTAINS_ANY */ === e) throw new S(x.INVALID_ARGUMENT, "Invalid Query. You can't perform '" + e + "' queries on FieldPath.documentId().");
            if ("in" /* IN */ === e) {
                this.Tw(n, e);
                for (var i = [], o = 0, s = n; o < s.length; o++) {
                    var u = s[o];
                    i.push(this.Ew(u));
                }
                r = {
                    arrayValue: {
                        values: i
                    }
                };
            } else r = this.Ew(n);
        } else "in" /* IN */ !== e && "array-contains-any" /* ARRAY_CONTAINS_ANY */ !== e || this.Tw(n, e), 
        r = this.Hd.eu("Query.where", n, 
        // We only allow nested arrays for IN queries.
        /** allowArrays = */ "in" /* IN */ === e);
        var a = Ce.create(t, e, r);
        return this.Iw(a), a;
    }, t.prototype.Aw = function(t, e) {
        if (null !== this.dw.startAt) throw new S(x.INVALID_ARGUMENT, "Invalid query. You must not call Query.startAt() or Query.startAfter() before calling Query.orderBy().");
        if (null !== this.dw.endAt) throw new S(x.INVALID_ARGUMENT, "Invalid query. You must not call Query.endAt() or Query.endBefore() before calling Query.orderBy().");
        var n = new He(t, e);
        return this.Rw(n), n;
    }, 
    /**
     * Create a Bound from a query and a document.
     *
     * Note that the Bound will always include the key of the document
     * and so only the provided document will compare equal to the returned
     * position.
     *
     * Will throw if the document does not contain all fields of the order by
     * of the query or if any of the fields in the order by are an uncommitted
     * server timestamp.
     */
    t.prototype.mw = function(t, e, n) {
        if (!e) throw new S(x.NOT_FOUND, "Can't use a DocumentSnapshot that doesn't exist for " + t + "().");
        // Because people expect to continue/end a query at the exact document
        // provided, we need to use the implicit sort order rather than the explicit
        // sort order, because it's guaranteed to contain the document key. That way
        // the position becomes unambiguous and the query continues/ends exactly at
        // the provided document. Without the key (by using the explicit sort
        // orders), multiple documents could match the position, yielding duplicate
        // results.
        for (var r = [], i = 0, o = this.dw.orderBy; i < o.length; i++) {
            var s = o[i];
            if (s.field.L()) r.push(Pt(this.qa, e.key)); else {
                var u = e.field(s.field);
                if (wt(u)) throw new S(x.INVALID_ARGUMENT, 'Invalid query. You are trying to start or end a query using a document for which the field "' + s.field + '" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');
                if (null === u) {
                    var a = s.field.N();
                    throw new S(x.INVALID_ARGUMENT, "Invalid query. You are trying to start or end a query using a document for which the field '" + a + "' (used as the orderBy) does not exist.");
                }
                r.push(u);
            }
        }
        return new Qe(r, n);
    }, 
    /**
     * Converts a list of field values to a Bound for the given query.
     */
    t.prototype.Pw = function(t, e, n) {
        // Use explicit order by's because it has to match the query the user made
        var r = this.dw.ds;
        if (e.length > r.length) throw new S(x.INVALID_ARGUMENT, "Too many arguments provided to " + t + "(). The number of arguments must be less than or equal to the number of Query.orderBy() clauses");
        for (var i = [], o = 0; o < e.length; o++) {
            var s = e[o];
            if (r[o].field.L()) {
                if ("string" != typeof s) throw new S(x.INVALID_ARGUMENT, "Invalid query. Expected a string for document ID in " + t + "(), but got a " + typeof s);
                if (!this.dw.Bs() && -1 !== s.indexOf("/")) throw new S(x.INVALID_ARGUMENT, "Invalid query. When querying a collection and ordering by FieldPath.documentId(), the value passed to " + t + "() must be a plain document ID, but '" + s + "' contains a slash.");
                var u = this.dw.path.child(R.$(s));
                if (!L.W(u)) throw new S(x.INVALID_ARGUMENT, "Invalid query. When querying a collection group and ordering by FieldPath.documentId(), the value passed to " + t + "() must result in a valid document path, but '" + u + "' is not because it contains an odd number of segments.");
                var a = new L(u);
                i.push(Pt(this.qa, a));
            } else {
                var c = this.Hd.eu(t, s);
                i.push(c);
            }
        }
        return new Qe(i, n);
    }, t.prototype.Vw = function(t) {
        if (t.xs() && 0 === t.ds.length) throw new S(x.UNIMPLEMENTED, "limitToLast() queries require specifying at least one orderBy() clause");
    }, 
    /**
     * Parses the given documentIdValue into a ReferenceValue, throwing
     * appropriate errors if the value is anything other than a DocumentReference
     * or String, or if the string is malformed.
     */
    t.prototype.Ew = function(t) {
        if ("string" == typeof t) {
            if ("" === t) throw new S(x.INVALID_ARGUMENT, "Invalid query. When querying with FieldPath.documentId(), you must provide a valid document ID, but it was an empty string.");
            if (!this.dw.Bs() && -1 !== t.indexOf("/")) throw new S(x.INVALID_ARGUMENT, "Invalid query. When querying a collection by FieldPath.documentId(), you must provide a plain document ID, but '" + t + "' contains a '/' character.");
            var e = this.dw.path.child(R.$(t));
            if (!L.W(e)) throw new S(x.INVALID_ARGUMENT, "Invalid query. When querying a collection group by FieldPath.documentId(), the value provided must result in a valid document path, but '" + e + "' is not because it has an odd number of segments (" + e.length + ").");
            return Pt(this.qa, new L(e));
        }
        if (t instanceof Ii) return Pt(this.qa, t.Ua);
        throw new S(x.INVALID_ARGUMENT, "Invalid query. When querying with FieldPath.documentId(), you must provide a valid string or a DocumentReference, but it was: " + Jr(t) + ".");
    }, 
    /**
     * Validates that the value passed into a disjunctrive filter satisfies all
     * array requirements.
     */
    t.prototype.Tw = function(t, e) {
        if (!Array.isArray(t) || 0 === t.length) throw new S(x.INVALID_ARGUMENT, "Invalid Query. A non-empty array is required for '" + e.toString() + "' filters.");
        if (t.length > 10) throw new S(x.INVALID_ARGUMENT, "Invalid Query. '" + e.toString() + "' filters support a maximum of 10 elements in the value array.");
        if (t.indexOf(null) >= 0) throw new S(x.INVALID_ARGUMENT, "Invalid Query. '" + e.toString() + "' filters cannot contain 'null' in the value array.");
        if (t.filter((function(t) {
            return Number.isNaN(t);
        })).length > 0) throw new S(x.INVALID_ARGUMENT, "Invalid Query. '" + e.toString() + "' filters cannot contain 'NaN' in the value array.");
    }, t.prototype.Iw = function(t) {
        if (t instanceof Ce) {
            var e = [ "array-contains" /* ARRAY_CONTAINS */ , "array-contains-any" /* ARRAY_CONTAINS_ANY */ ], n = [ "in" /* IN */ , "array-contains-any" /* ARRAY_CONTAINS_ANY */ ], r = e.indexOf(t.op) >= 0, i = n.indexOf(t.op) >= 0;
            if (t.Ms()) {
                var o = this.dw.Rs();
                if (null !== o && !o.isEqual(t.field)) throw new S(x.INVALID_ARGUMENT, "Invalid query. All where filters with an inequality (<, <=, >, or >=) must be on the same field. But you have inequality filters on '" + o.toString() + "' and '" + t.field.toString() + "'");
                var s = this.dw.ms();
                null !== s && this.gw(t.field, s);
            } else if (i || r) {
                // You can have at most 1 disjunctive filter and 1 array filter. Check if
                // the new filter conflicts with an existing one.
                var u = null;
                if (i && (u = this.dw.Ls(n)), null === u && r && (u = this.dw.Ls(e)), null != u) 
                // We special case when it's a duplicate op to give a slightly clearer error message.
                throw u === t.op ? new S(x.INVALID_ARGUMENT, "Invalid query. You cannot use more than one '" + t.op.toString() + "' filter.") : new S(x.INVALID_ARGUMENT, "Invalid query. You cannot use '" + t.op.toString() + "' filters with '" + u.toString() + "' filters.");
            }
        }
    }, t.prototype.Rw = function(t) {
        if (null === this.dw.ms()) {
            // This is the first order by. It must match any inequality.
            var e = this.dw.Rs();
            null !== e && this.gw(e, t.field);
        }
    }, t.prototype.gw = function(t, e) {
        if (!e.isEqual(t)) throw new S(x.INVALID_ARGUMENT, "Invalid query. You have a where filter with an inequality (<, <=, >, or >=) on field '" + t.toString() + "' and so you must also use '" + t.toString() + "' as your first Query.orderBy(), but your first Query.orderBy() is on field '" + e.toString() + "' instead.");
    }, t;
}()), Wo = /** @class */ function() {
    function t(t, e, n, r) {
        this.iw = t, this.yw = e, this.bw = n, this.Qa = r, this.vw = null, this.Sw = null, 
        this.metadata = new Bo(n.hasPendingWrites, n.fromCache);
    }
    return Object.defineProperty(t.prototype, "docs", {
        get: function() {
            var t = [];
            return this.forEach((function(e) {
                return t.push(e);
            })), t;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "empty", {
        get: function() {
            return this.bw.docs._();
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "size", {
        get: function() {
            return this.bw.docs.size;
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.forEach = function(t, e) {
        var n = this;
        Qr("QuerySnapshot.forEach", arguments, 1, 2), Gr("QuerySnapshot.forEach", "function", 1, t), 
        this.bw.docs.forEach((function(r) {
            t.call(e, n.Dw(r));
        }));
    }, Object.defineProperty(t.prototype, "query", {
        get: function() {
            return new zo(this.yw, this.iw, this.Qa);
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.docChanges = function(t) {
        t && (ti("QuerySnapshot.docChanges", t, [ "includeMetadataChanges" ]), Hr("QuerySnapshot.docChanges", "boolean", "includeMetadataChanges", t.includeMetadataChanges));
        var e = !(!t || !t.includeMetadataChanges);
        if (e && this.bw.qt) throw new S(x.INVALID_ARGUMENT, "To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");
        return this.vw && this.Sw === e || (this.vw = 
        /**
     * Calculates the array of firestore.DocumentChange's for a given ViewSnapshot.
     *
     * Exported for testing.
     */
        function(t, e, n, r) {
            if (n.Lt._()) {
                // Special case the first snapshot because index calculation is easy and
                // fast
                var i = 0;
                return n.docChanges.map((function(e) {
                    var o = new Go(t, e.doc.key, e.doc, n.fromCache, n.Ot.has(e.doc.key), r);
                    return e.doc, {
                        type: "added",
                        doc: o,
                        oldIndex: -1,
                        newIndex: i++
                    };
                }));
            }
            // A DocumentSet that is updated incrementally as changes are applied to use
            // to lookup the index of a document.
            var o = n.Lt;
            return n.docChanges.filter((function(t) {
                return e || 3 /* Metadata */ !== t.type;
            })).map((function(e) {
                var i = new Go(t, e.doc.key, e.doc, n.fromCache, n.Ot.has(e.doc.key), r), s = -1, u = -1;
                return 0 /* Added */ !== e.type && (s = o.indexOf(e.doc.key), o = o.delete(e.doc.key)), 
                1 /* Removed */ !== e.type && (u = (o = o.add(e.doc)).indexOf(e.doc.key)), {
                    type: Jo(e.type),
                    doc: i,
                    oldIndex: s,
                    newIndex: u
                };
            }));
        }(this.iw, e, this.bw, this.Qa), this.Sw = e), this.vw;
    }, 
    /** Check the equality. The call can be very expensive. */ t.prototype.isEqual = function(e) {
        if (!(e instanceof t)) throw ei("isEqual", "QuerySnapshot", 1, e);
        return this.iw === e.iw && this.yw.isEqual(e.yw) && this.bw.isEqual(e.bw) && this.Qa === e.Qa;
    }, t.prototype.Dw = function(t) {
        return new Go(this.iw, t.key, t, this.metadata.fromCache, this.bw.Ot.has(t.key), this.Qa);
    }, t;
}(), Ho = /** @class */ function(t) {
    function n(e, n, r) {
        var i = this;
        if ((i = t.call(this, Ve.As(e), n, r) || this).Cw = e, e.length % 2 != 1) throw new S(x.INVALID_ARGUMENT, "Invalid collection reference. Collection references must have an odd number of segments, but " + e.N() + " has " + e.length);
        return i;
    }
    return e.__extends(n, t), Object.defineProperty(n.prototype, "id", {
        get: function() {
            return this.dw.path.S();
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(n.prototype, "parent", {
        get: function() {
            var t = this.dw.path.p();
            return t._() ? null : new jo(new L(t), this.firestore, 
            /* converter= */ null);
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(n.prototype, "path", {
        get: function() {
            return this.dw.path.N();
        },
        enumerable: !0,
        configurable: !0
    }), n.prototype.doc = function(t) {
        Qr("CollectionReference.doc", arguments, 0, 1), 
        // We allow omission of 'pathString' but explicitly prohibit passing in both
        // 'undefined' and 'null'.
        0 === arguments.length && (t = g.t()), Gr("CollectionReference.doc", "non-empty string", 1, t);
        var e = R.$(t);
        return jo.sw(this.dw.path.child(e), this.firestore, this.Qa);
    }, n.prototype.add = function(t) {
        jr("CollectionReference.add", arguments, 1), Gr("CollectionReference.add", "object", 1, this.Qa ? this.Qa.toFirestore(t) : t);
        var e = this.doc();
        return e.set(t).then((function() {
            return e;
        }));
    }, n.prototype.withConverter = function(t) {
        return new n(this.Cw, this.firestore, t);
    }, n;
}(zo);

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// settings() defaults:
function Ko(t, e) {
    if (void 0 === e) return {
        merge: !1
    };
    if (ti(t, e, [ "merge", "mergeFields" ]), Hr(t, "boolean", "merge", e.merge), function(t, e, n, r, i) {
        void 0 !== r && function(t, e, n, r, i) {
            if (!(r instanceof Array)) throw new S(x.INVALID_ARGUMENT, "Function " + t + "() requires its " + e + " option to be an array, but it was: " + Jr(r));
            for (var o = 0; o < r.length; ++o) if (!i(r[o])) throw new S(x.INVALID_ARGUMENT, "Function " + t + "() requires all " + e + " elements to be " + n + ", but the value at index " + o + " was: " + Jr(r[o]));
        }(t, e, n, r, i);
    }(t, "mergeFields", "a string or a FieldPath", e.mergeFields, (function(t) {
        return "string" == typeof t || t instanceof ci;
    })), void 0 !== e.mergeFields && void 0 !== e.merge) throw new S(x.INVALID_ARGUMENT, "Invalid options passed to function " + t + '(): You cannot specify both "merge" and "mergeFields".');
    return e;
}

function Yo(t, e) {
    return void 0 === e ? {} : (ti(t, e, [ "serverTimestamps" ]), Kr(t, 0, "serverTimestamps", e.serverTimestamps, [ "estimate", "previous", "none" ]), 
    e);
}

function Xo(t, e) {
    zr(t, "object", 1, e), e && (ti(t, e, [ "source" ]), Kr(t, 0, "source", e.source, [ "default", "server", "cache" ]));
}

function $o(t, e, n) {
    if (e instanceof Ii) {
        if (e.firestore !== n) throw new S(x.INVALID_ARGUMENT, "Provided document reference is from a different Firestore instance.");
        return e;
    }
    throw ei(t, "DocumentReference", 1, e);
}

function Jo(t) {
    switch (t) {
      case 0 /* Added */ :
        return "added";

      case 2 /* Modified */ :
      case 3 /* Metadata */ :
        return "modified";

      case 1 /* Removed */ :
        return "removed";

      default:
        return p();
    }
}

/**
 * Converts custom model object of type T into DocumentData by applying the
 * converter if it exists.
 *
 * This function is used when converting user objects to DocumentData
 * because we want to provide the user with a more specific error message if
 * their set() or fails due to invalid data originating from a toFirestore()
 * call.
 */ function Zo(t, e, n) {
    var r;
    return t ? (r = t.toFirestore(e), n = "toFirestore() in " + n) : r = e, [ r, n ];
}

var ts = [ "length", "name" ];

/**
 * Helper function to prevent instantiation through the constructor.
 *
 * This method creates a new constructor that throws when it's invoked.
 * The prototype of that constructor is then set to the prototype of the hidden
 * "class" to expose all the prototype methods and allow for instanceof
 * checks.
 *
 * To also make all the static methods available, all properties of the
 * original constructor are copied to the new constructor.
 */ function es(t, e) {
    function n() {
        var t = "This constructor is private.";
        throw e && (t += " ", t += e), new S(x.INVALID_ARGUMENT, t);
    }
    // Copy static members and prototype
        for (var r = 0, i = Object.getOwnPropertyNames(t); r < i.length; r++) {
        var o = i[r];
        -1 === ts.indexOf(o) && (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        n[o] = t[o]);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return n;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Public instance that disallows construction at runtime. Note that this still
// allows instanceof checks.
var ns = es(qo, "Use firebase.firestore() instead."), rs = es(Fo, "Use firebase.firestore().runTransaction() instead."), is = es(Mo, "Use firebase.firestore().batch() instead."), os = es(jo, "Use firebase.firestore().doc() instead."), ss = es(Qo), us = es(Go), as = es(zo), cs = es(Wo), hs = es(Ho, "Use firebase.firestore().collection() instead."), fs = es(gi, "Use FieldValue.<field>() instead."), ls = es(ui, "Use Blob.fromUint8Array() or Blob.fromBase64String() instead."), ps = {
    Firestore: ns,
    GeoPoint: wi,
    Timestamp: D,
    Blob: ls,
    Transaction: rs,
    WriteBatch: is,
    DocumentReference: os,
    DocumentSnapshot: ss,
    Query: as,
    QueryDocumentSnapshot: us,
    QuerySnapshot: cs,
    CollectionReference: hs,
    FieldPath: ci,
    FieldValue: fs,
    setLogLevel: qo.setLogLevel,
    CACHE_SIZE_UNLIMITED: Vo
};

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Registers the main Firestore build with the components framework.
 * Persistence can be enabled via `firebase.firestore().enablePersistence()`.
 */ function ds(t) {
    /**
 * Configures Firestore as part of the Firebase SDK by calling registerService.
 *
 * @param firebase The FirebaseNamespace to register Firestore with
 * @param firestoreFactory A factory function that returns a new Firestore
 *    instance.
 */
    !function(t, e) {
        t.INTERNAL.registerComponent(new s.Component("firestore", (function(t) {
            return function(t, e) {
                return new qo(t, e, new Po);
            }(t.getProvider("app").getImmediate(), t.getProvider("auth-internal"));
        }), "PUBLIC" /* PUBLIC */).setServiceProps(Object.assign({}, ps)));
    }(t), t.registerVersion("@firebase/firestore", "1.15.5");
}

ds(n), exports.__PRIVATE_registerFirestore = ds;


},{"@firebase/app":1,"@firebase/component":2,"@firebase/logger":4,"@firebase/util":5,"@firebase/webchannel-wrapper":6,"tslib":7}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var _a;
/**
 * A container for all of the Logger instances
 */
var instances = [];
(function (LogLevel) {
    LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
    LogLevel[LogLevel["VERBOSE"] = 1] = "VERBOSE";
    LogLevel[LogLevel["INFO"] = 2] = "INFO";
    LogLevel[LogLevel["WARN"] = 3] = "WARN";
    LogLevel[LogLevel["ERROR"] = 4] = "ERROR";
    LogLevel[LogLevel["SILENT"] = 5] = "SILENT";
})(exports.LogLevel || (exports.LogLevel = {}));
var levelStringToEnum = {
    'debug': exports.LogLevel.DEBUG,
    'verbose': exports.LogLevel.VERBOSE,
    'info': exports.LogLevel.INFO,
    'warn': exports.LogLevel.WARN,
    'error': exports.LogLevel.ERROR,
    'silent': exports.LogLevel.SILENT
};
/**
 * The default log level
 */
var defaultLogLevel = exports.LogLevel.INFO;
/**
 * By default, `console.debug` is not displayed in the developer console (in
 * chrome). To avoid forcing users to have to opt-in to these logs twice
 * (i.e. once for firebase, and once in the console), we are sending `DEBUG`
 * logs to the `console.log` function.
 */
var ConsoleMethod = (_a = {},
    _a[exports.LogLevel.DEBUG] = 'log',
    _a[exports.LogLevel.VERBOSE] = 'log',
    _a[exports.LogLevel.INFO] = 'info',
    _a[exports.LogLevel.WARN] = 'warn',
    _a[exports.LogLevel.ERROR] = 'error',
    _a);
/**
 * The default log handler will forward DEBUG, VERBOSE, INFO, WARN, and ERROR
 * messages on to their corresponding console counterparts (if the log method
 * is supported by the current log level)
 */
var defaultLogHandler = function (instance, logType) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    if (logType < instance.logLevel) {
        return;
    }
    var now = new Date().toISOString();
    var method = ConsoleMethod[logType];
    if (method) {
        console[method].apply(console, __spreadArrays(["[" + now + "]  " + instance.name + ":"], args));
    }
    else {
        throw new Error("Attempted to log a message with an invalid logType (value: " + logType + ")");
    }
};
var Logger = /** @class */ (function () {
    /**
     * Gives you an instance of a Logger to capture messages according to
     * Firebase's logging scheme.
     *
     * @param name The name that the logs will be associated with
     */
    function Logger(name) {
        this.name = name;
        /**
         * The log level of the given Logger instance.
         */
        this._logLevel = defaultLogLevel;
        /**
         * The main (internal) log handler for the Logger instance.
         * Can be set to a new function in internal package code but not by user.
         */
        this._logHandler = defaultLogHandler;
        /**
         * The optional, additional, user-defined log handler for the Logger instance.
         */
        this._userLogHandler = null;
        /**
         * Capture the current instance for later use
         */
        instances.push(this);
    }
    Object.defineProperty(Logger.prototype, "logLevel", {
        get: function () {
            return this._logLevel;
        },
        set: function (val) {
            if (!(val in exports.LogLevel)) {
                throw new TypeError("Invalid value \"" + val + "\" assigned to `logLevel`");
            }
            this._logLevel = val;
        },
        enumerable: true,
        configurable: true
    });
    // Workaround for setter/getter having to be the same type.
    Logger.prototype.setLogLevel = function (val) {
        this._logLevel = typeof val === 'string' ? levelStringToEnum[val] : val;
    };
    Object.defineProperty(Logger.prototype, "logHandler", {
        get: function () {
            return this._logHandler;
        },
        set: function (val) {
            if (typeof val !== 'function') {
                throw new TypeError('Value assigned to `logHandler` must be a function');
            }
            this._logHandler = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Logger.prototype, "userLogHandler", {
        get: function () {
            return this._userLogHandler;
        },
        set: function (val) {
            this._userLogHandler = val;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * The functions below are all based on the `console` interface
     */
    Logger.prototype.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays([this, exports.LogLevel.DEBUG], args));
        this._logHandler.apply(this, __spreadArrays([this, exports.LogLevel.DEBUG], args));
    };
    Logger.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays([this, exports.LogLevel.VERBOSE], args));
        this._logHandler.apply(this, __spreadArrays([this, exports.LogLevel.VERBOSE], args));
    };
    Logger.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays([this, exports.LogLevel.INFO], args));
        this._logHandler.apply(this, __spreadArrays([this, exports.LogLevel.INFO], args));
    };
    Logger.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays([this, exports.LogLevel.WARN], args));
        this._logHandler.apply(this, __spreadArrays([this, exports.LogLevel.WARN], args));
    };
    Logger.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays([this, exports.LogLevel.ERROR], args));
        this._logHandler.apply(this, __spreadArrays([this, exports.LogLevel.ERROR], args));
    };
    return Logger;
}());
function setLogLevel(level) {
    instances.forEach(function (inst) {
        inst.setLogLevel(level);
    });
}
function setUserLogHandler(logCallback, options) {
    var _loop_1 = function (instance) {
        var customLogLevel = null;
        if (options && options.level) {
            customLogLevel = levelStringToEnum[options.level];
        }
        if (logCallback === null) {
            instance.userLogHandler = null;
        }
        else {
            instance.userLogHandler = function (instance, level) {
                var args = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    args[_i - 2] = arguments[_i];
                }
                var message = args
                    .map(function (arg) {
                    if (arg == null) {
                        return null;
                    }
                    else if (typeof arg === 'string') {
                        return arg;
                    }
                    else if (typeof arg === 'number' || typeof arg === 'boolean') {
                        return arg.toString();
                    }
                    else if (arg instanceof Error) {
                        return arg.message;
                    }
                    else {
                        try {
                            return JSON.stringify(arg);
                        }
                        catch (ignored) {
                            return null;
                        }
                    }
                })
                    .filter(function (arg) { return arg; })
                    .join(' ');
                if (level >= (customLogLevel !== null && customLogLevel !== void 0 ? customLogLevel : instance.logLevel)) {
                    logCallback({
                        level: exports.LogLevel[level].toLowerCase(),
                        message: message,
                        args: args,
                        type: instance.name
                    });
                }
            };
        }
    };
    for (var _i = 0, instances_1 = instances; _i < instances_1.length; _i++) {
        var instance = instances_1[_i];
        _loop_1(instance);
    }
}

exports.Logger = Logger;
exports.setLogLevel = setLogLevel;
exports.setUserLogHandler = setUserLogHandler;


},{}],5:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @fileoverview Firebase constants.  Some of these (@defines) can be overridden at compile-time.
 */
var CONSTANTS = {
    /**
     * @define {boolean} Whether this is the client Node.js SDK.
     */
    NODE_CLIENT: false,
    /**
     * @define {boolean} Whether this is the Admin Node.js SDK.
     */
    NODE_ADMIN: false,
    /**
     * Firebase SDK Version
     */
    SDK_VERSION: '${JSCORE_VERSION}'
};

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Throws an error if the provided assertion is falsy
 */
var assert = function (assertion, message) {
    if (!assertion) {
        throw assertionError(message);
    }
};
/**
 * Returns an Error object suitable for throwing.
 */
var assertionError = function (message) {
    return new Error('Firebase Database (' +
        CONSTANTS.SDK_VERSION +
        ') INTERNAL ASSERT FAILED: ' +
        message);
};

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var stringToByteArray = function (str) {
    // TODO(user): Use native implementations if/when available
    var out = [];
    var p = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        if (c < 128) {
            out[p++] = c;
        }
        else if (c < 2048) {
            out[p++] = (c >> 6) | 192;
            out[p++] = (c & 63) | 128;
        }
        else if ((c & 0xfc00) === 0xd800 &&
            i + 1 < str.length &&
            (str.charCodeAt(i + 1) & 0xfc00) === 0xdc00) {
            // Surrogate Pair
            c = 0x10000 + ((c & 0x03ff) << 10) + (str.charCodeAt(++i) & 0x03ff);
            out[p++] = (c >> 18) | 240;
            out[p++] = ((c >> 12) & 63) | 128;
            out[p++] = ((c >> 6) & 63) | 128;
            out[p++] = (c & 63) | 128;
        }
        else {
            out[p++] = (c >> 12) | 224;
            out[p++] = ((c >> 6) & 63) | 128;
            out[p++] = (c & 63) | 128;
        }
    }
    return out;
};
/**
 * Turns an array of numbers into the string given by the concatenation of the
 * characters to which the numbers correspond.
 * @param bytes Array of numbers representing characters.
 * @return Stringification of the array.
 */
var byteArrayToString = function (bytes) {
    // TODO(user): Use native implementations if/when available
    var out = [];
    var pos = 0, c = 0;
    while (pos < bytes.length) {
        var c1 = bytes[pos++];
        if (c1 < 128) {
            out[c++] = String.fromCharCode(c1);
        }
        else if (c1 > 191 && c1 < 224) {
            var c2 = bytes[pos++];
            out[c++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
        }
        else if (c1 > 239 && c1 < 365) {
            // Surrogate Pair
            var c2 = bytes[pos++];
            var c3 = bytes[pos++];
            var c4 = bytes[pos++];
            var u = (((c1 & 7) << 18) | ((c2 & 63) << 12) | ((c3 & 63) << 6) | (c4 & 63)) -
                0x10000;
            out[c++] = String.fromCharCode(0xd800 + (u >> 10));
            out[c++] = String.fromCharCode(0xdc00 + (u & 1023));
        }
        else {
            var c2 = bytes[pos++];
            var c3 = bytes[pos++];
            out[c++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        }
    }
    return out.join('');
};
// We define it as an object literal instead of a class because a class compiled down to es5 can't
// be treeshaked. https://github.com/rollup/rollup/issues/1691
// Static lookup maps, lazily populated by init_()
var base64 = {
    /**
     * Maps bytes to characters.
     */
    byteToCharMap_: null,
    /**
     * Maps characters to bytes.
     */
    charToByteMap_: null,
    /**
     * Maps bytes to websafe characters.
     * @private
     */
    byteToCharMapWebSafe_: null,
    /**
     * Maps websafe characters to bytes.
     * @private
     */
    charToByteMapWebSafe_: null,
    /**
     * Our default alphabet, shared between
     * ENCODED_VALS and ENCODED_VALS_WEBSAFE
     */
    ENCODED_VALS_BASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz' + '0123456789',
    /**
     * Our default alphabet. Value 64 (=) is special; it means "nothing."
     */
    get ENCODED_VALS() {
        return this.ENCODED_VALS_BASE + '+/=';
    },
    /**
     * Our websafe alphabet.
     */
    get ENCODED_VALS_WEBSAFE() {
        return this.ENCODED_VALS_BASE + '-_.';
    },
    /**
     * Whether this browser supports the atob and btoa functions. This extension
     * started at Mozilla but is now implemented by many browsers. We use the
     * ASSUME_* variables to avoid pulling in the full useragent detection library
     * but still allowing the standard per-browser compilations.
     *
     */
    HAS_NATIVE_SUPPORT: typeof atob === 'function',
    /**
     * Base64-encode an array of bytes.
     *
     * @param input An array of bytes (numbers with
     *     value in [0, 255]) to encode.
     * @param webSafe Boolean indicating we should use the
     *     alternative alphabet.
     * @return The base64 encoded string.
     */
    encodeByteArray: function (input, webSafe) {
        if (!Array.isArray(input)) {
            throw Error('encodeByteArray takes an array as a parameter');
        }
        this.init_();
        var byteToCharMap = webSafe
            ? this.byteToCharMapWebSafe_
            : this.byteToCharMap_;
        var output = [];
        for (var i = 0; i < input.length; i += 3) {
            var byte1 = input[i];
            var haveByte2 = i + 1 < input.length;
            var byte2 = haveByte2 ? input[i + 1] : 0;
            var haveByte3 = i + 2 < input.length;
            var byte3 = haveByte3 ? input[i + 2] : 0;
            var outByte1 = byte1 >> 2;
            var outByte2 = ((byte1 & 0x03) << 4) | (byte2 >> 4);
            var outByte3 = ((byte2 & 0x0f) << 2) | (byte3 >> 6);
            var outByte4 = byte3 & 0x3f;
            if (!haveByte3) {
                outByte4 = 64;
                if (!haveByte2) {
                    outByte3 = 64;
                }
            }
            output.push(byteToCharMap[outByte1], byteToCharMap[outByte2], byteToCharMap[outByte3], byteToCharMap[outByte4]);
        }
        return output.join('');
    },
    /**
     * Base64-encode a string.
     *
     * @param input A string to encode.
     * @param webSafe If true, we should use the
     *     alternative alphabet.
     * @return The base64 encoded string.
     */
    encodeString: function (input, webSafe) {
        // Shortcut for Mozilla browsers that implement
        // a native base64 encoder in the form of "btoa/atob"
        if (this.HAS_NATIVE_SUPPORT && !webSafe) {
            return btoa(input);
        }
        return this.encodeByteArray(stringToByteArray(input), webSafe);
    },
    /**
     * Base64-decode a string.
     *
     * @param input to decode.
     * @param webSafe True if we should use the
     *     alternative alphabet.
     * @return string representing the decoded value.
     */
    decodeString: function (input, webSafe) {
        // Shortcut for Mozilla browsers that implement
        // a native base64 encoder in the form of "btoa/atob"
        if (this.HAS_NATIVE_SUPPORT && !webSafe) {
            return atob(input);
        }
        return byteArrayToString(this.decodeStringToByteArray(input, webSafe));
    },
    /**
     * Base64-decode a string.
     *
     * In base-64 decoding, groups of four characters are converted into three
     * bytes.  If the encoder did not apply padding, the input length may not
     * be a multiple of 4.
     *
     * In this case, the last group will have fewer than 4 characters, and
     * padding will be inferred.  If the group has one or two characters, it decodes
     * to one byte.  If the group has three characters, it decodes to two bytes.
     *
     * @param input Input to decode.
     * @param webSafe True if we should use the web-safe alphabet.
     * @return bytes representing the decoded value.
     */
    decodeStringToByteArray: function (input, webSafe) {
        this.init_();
        var charToByteMap = webSafe
            ? this.charToByteMapWebSafe_
            : this.charToByteMap_;
        var output = [];
        for (var i = 0; i < input.length;) {
            var byte1 = charToByteMap[input.charAt(i++)];
            var haveByte2 = i < input.length;
            var byte2 = haveByte2 ? charToByteMap[input.charAt(i)] : 0;
            ++i;
            var haveByte3 = i < input.length;
            var byte3 = haveByte3 ? charToByteMap[input.charAt(i)] : 64;
            ++i;
            var haveByte4 = i < input.length;
            var byte4 = haveByte4 ? charToByteMap[input.charAt(i)] : 64;
            ++i;
            if (byte1 == null || byte2 == null || byte3 == null || byte4 == null) {
                throw Error();
            }
            var outByte1 = (byte1 << 2) | (byte2 >> 4);
            output.push(outByte1);
            if (byte3 !== 64) {
                var outByte2 = ((byte2 << 4) & 0xf0) | (byte3 >> 2);
                output.push(outByte2);
                if (byte4 !== 64) {
                    var outByte3 = ((byte3 << 6) & 0xc0) | byte4;
                    output.push(outByte3);
                }
            }
        }
        return output;
    },
    /**
     * Lazy static initialization function. Called before
     * accessing any of the static map variables.
     * @private
     */
    init_: function () {
        if (!this.byteToCharMap_) {
            this.byteToCharMap_ = {};
            this.charToByteMap_ = {};
            this.byteToCharMapWebSafe_ = {};
            this.charToByteMapWebSafe_ = {};
            // We want quick mappings back and forth, so we precompute two maps.
            for (var i = 0; i < this.ENCODED_VALS.length; i++) {
                this.byteToCharMap_[i] = this.ENCODED_VALS.charAt(i);
                this.charToByteMap_[this.byteToCharMap_[i]] = i;
                this.byteToCharMapWebSafe_[i] = this.ENCODED_VALS_WEBSAFE.charAt(i);
                this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[i]] = i;
                // Be forgiving when decoding and correctly decode both encodings.
                if (i >= this.ENCODED_VALS_BASE.length) {
                    this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(i)] = i;
                    this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(i)] = i;
                }
            }
        }
    }
};
/**
 * URL-safe base64 encoding
 */
var base64Encode = function (str) {
    var utf8Bytes = stringToByteArray(str);
    return base64.encodeByteArray(utf8Bytes, true);
};
/**
 * URL-safe base64 decoding
 *
 * NOTE: DO NOT use the global atob() function - it does NOT support the
 * base64Url variant encoding.
 *
 * @param str To be decoded
 * @return Decoded result, if possible
 */
var base64Decode = function (str) {
    try {
        return base64.decodeString(str, true);
    }
    catch (e) {
        console.error('base64Decode failed: ', e);
    }
    return null;
};

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Do a deep-copy of basic JavaScript Objects or Arrays.
 */
function deepCopy(value) {
    return deepExtend(undefined, value);
}
/**
 * Copy properties from source to target (recursively allows extension
 * of Objects and Arrays).  Scalar values in the target are over-written.
 * If target is undefined, an object of the appropriate type will be created
 * (and returned).
 *
 * We recursively copy all child properties of plain Objects in the source- so
 * that namespace- like dictionaries are merged.
 *
 * Note that the target can be a function, in which case the properties in
 * the source Object are copied onto it as static properties of the Function.
 */
function deepExtend(target, source) {
    if (!(source instanceof Object)) {
        return source;
    }
    switch (source.constructor) {
        case Date:
            // Treat Dates like scalars; if the target date object had any child
            // properties - they will be lost!
            var dateValue = source;
            return new Date(dateValue.getTime());
        case Object:
            if (target === undefined) {
                target = {};
            }
            break;
        case Array:
            // Always copy the array source and overwrite the target.
            target = [];
            break;
        default:
            // Not a plain Object - treat it as a scalar.
            return source;
    }
    for (var prop in source) {
        if (!source.hasOwnProperty(prop)) {
            continue;
        }
        target[prop] = deepExtend(target[prop], source[prop]);
    }
    return target;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Deferred = /** @class */ (function () {
    function Deferred() {
        var _this = this;
        this.reject = function () { };
        this.resolve = function () { };
        this.promise = new Promise(function (resolve, reject) {
            _this.resolve = resolve;
            _this.reject = reject;
        });
    }
    /**
     * Our API internals are not promiseified and cannot because our callback APIs have subtle expectations around
     * invoking promises inline, which Promises are forbidden to do. This method accepts an optional node-style callback
     * and returns a node-style callback which will resolve or reject the Deferred's promise.
     */
    Deferred.prototype.wrapCallback = function (callback) {
        var _this = this;
        return function (error, value) {
            if (error) {
                _this.reject(error);
            }
            else {
                _this.resolve(value);
            }
            if (typeof callback === 'function') {
                // Attaching noop handler just in case developer wasn't expecting
                // promises
                _this.promise.catch(function () { });
                // Some of our callbacks don't expect a value and our own tests
                // assert that the parameter length is 1
                if (callback.length === 1) {
                    callback(error);
                }
                else {
                    callback(error, value);
                }
            }
        };
    };
    return Deferred;
}());

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Returns navigator.userAgent string or '' if it's not defined.
 * @return user agent string
 */
function getUA() {
    if (typeof navigator !== 'undefined' &&
        typeof navigator['userAgent'] === 'string') {
        return navigator['userAgent'];
    }
    else {
        return '';
    }
}
/**
 * Detect Cordova / PhoneGap / Ionic frameworks on a mobile device.
 *
 * Deliberately does not rely on checking `file://` URLs (as this fails PhoneGap
 * in the Ripple emulator) nor Cordova `onDeviceReady`, which would normally
 * wait for a callback.
 */
function isMobileCordova() {
    return (typeof window !== 'undefined' &&
        // @ts-ignore Setting up an broadly applicable index signature for Window
        // just to deal with this case would probably be a bad idea.
        !!(window['cordova'] || window['phonegap'] || window['PhoneGap']) &&
        /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(getUA()));
}
/**
 * Detect Node.js.
 *
 * @return true if Node.js environment is detected.
 */
// Node detection logic from: https://github.com/iliakan/detect-node/
function isNode() {
    try {
        return (Object.prototype.toString.call(global.process) === '[object process]');
    }
    catch (e) {
        return false;
    }
}
/**
 * Detect Browser Environment
 */
function isBrowser() {
    return typeof self === 'object' && self.self === self;
}
function isBrowserExtension() {
    var runtime = typeof chrome === 'object'
        ? chrome.runtime
        : typeof browser === 'object'
            ? browser.runtime
            : undefined;
    return typeof runtime === 'object' && runtime.id !== undefined;
}
/**
 * Detect React Native.
 *
 * @return true if ReactNative environment is detected.
 */
function isReactNative() {
    return (typeof navigator === 'object' && navigator['product'] === 'ReactNative');
}
/** Detects Electron apps. */
function isElectron() {
    return getUA().indexOf('Electron/') >= 0;
}
/** Detects Internet Explorer. */
function isIE() {
    var ua = getUA();
    return ua.indexOf('MSIE ') >= 0 || ua.indexOf('Trident/') >= 0;
}
/** Detects Universal Windows Platform apps. */
function isUWP() {
    return getUA().indexOf('MSAppHost/') >= 0;
}
/**
 * Detect whether the current SDK build is the Node version.
 *
 * @return true if it's the Node SDK build.
 */
function isNodeSdk() {
    return CONSTANTS.NODE_CLIENT === true || CONSTANTS.NODE_ADMIN === true;
}
/** Returns true if we are running in Safari. */
function isSafari() {
    return (!isNode() &&
        navigator.userAgent.includes('Safari') &&
        !navigator.userAgent.includes('Chrome'));
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var ERROR_NAME = 'FirebaseError';
// Based on code from:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types
var FirebaseError = /** @class */ (function (_super) {
    tslib.__extends(FirebaseError, _super);
    function FirebaseError(code, message) {
        var _this = _super.call(this, message) || this;
        _this.code = code;
        _this.name = ERROR_NAME;
        // Fix For ES5
        // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        Object.setPrototypeOf(_this, FirebaseError.prototype);
        // Maintains proper stack trace for where our error was thrown.
        // Only available on V8.
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, ErrorFactory.prototype.create);
        }
        return _this;
    }
    return FirebaseError;
}(Error));
var ErrorFactory = /** @class */ (function () {
    function ErrorFactory(service, serviceName, errors) {
        this.service = service;
        this.serviceName = serviceName;
        this.errors = errors;
    }
    ErrorFactory.prototype.create = function (code) {
        var data = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            data[_i - 1] = arguments[_i];
        }
        var customData = data[0] || {};
        var fullCode = this.service + "/" + code;
        var template = this.errors[code];
        var message = template ? replaceTemplate(template, customData) : 'Error';
        // Service Name: Error message (service/code).
        var fullMessage = this.serviceName + ": " + message + " (" + fullCode + ").";
        var error = new FirebaseError(fullCode, fullMessage);
        // Keys with an underscore at the end of their name are not included in
        // error.data for some reason.
        // TODO: Replace with Object.entries when lib is updated to es2017.
        for (var _a = 0, _b = Object.keys(customData); _a < _b.length; _a++) {
            var key = _b[_a];
            if (key.slice(-1) !== '_') {
                if (key in error) {
                    console.warn("Overwriting FirebaseError base field \"" + key + "\" can cause unexpected behavior.");
                }
                error[key] = customData[key];
            }
        }
        return error;
    };
    return ErrorFactory;
}());
function replaceTemplate(template, data) {
    return template.replace(PATTERN, function (_, key) {
        var value = data[key];
        return value != null ? String(value) : "<" + key + "?>";
    });
}
var PATTERN = /\{\$([^}]+)}/g;

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Evaluates a JSON string into a javascript object.
 *
 * @param {string} str A string containing JSON.
 * @return {*} The javascript object representing the specified JSON.
 */
function jsonEval(str) {
    return JSON.parse(str);
}
/**
 * Returns JSON representing a javascript object.
 * @param {*} data Javascript object to be stringified.
 * @return {string} The JSON contents of the object.
 */
function stringify(data) {
    return JSON.stringify(data);
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Decodes a Firebase auth. token into constituent parts.
 *
 * Notes:
 * - May return with invalid / incomplete claims if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */
var decode = function (token) {
    var header = {}, claims = {}, data = {}, signature = '';
    try {
        var parts = token.split('.');
        header = jsonEval(base64Decode(parts[0]) || '');
        claims = jsonEval(base64Decode(parts[1]) || '');
        signature = parts[2];
        data = claims['d'] || {};
        delete claims['d'];
    }
    catch (e) { }
    return {
        header: header,
        claims: claims,
        data: data,
        signature: signature
    };
};
/**
 * Decodes a Firebase auth. token and checks the validity of its time-based claims. Will return true if the
 * token is within the time window authorized by the 'nbf' (not-before) and 'iat' (issued-at) claims.
 *
 * Notes:
 * - May return a false negative if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */
var isValidTimestamp = function (token) {
    var claims = decode(token).claims;
    var now = Math.floor(new Date().getTime() / 1000);
    var validSince = 0, validUntil = 0;
    if (typeof claims === 'object') {
        if (claims.hasOwnProperty('nbf')) {
            validSince = claims['nbf'];
        }
        else if (claims.hasOwnProperty('iat')) {
            validSince = claims['iat'];
        }
        if (claims.hasOwnProperty('exp')) {
            validUntil = claims['exp'];
        }
        else {
            // token will expire after 24h by default
            validUntil = validSince + 86400;
        }
    }
    return (!!now &&
        !!validSince &&
        !!validUntil &&
        now >= validSince &&
        now <= validUntil);
};
/**
 * Decodes a Firebase auth. token and returns its issued at time if valid, null otherwise.
 *
 * Notes:
 * - May return null if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */
var issuedAtTime = function (token) {
    var claims = decode(token).claims;
    if (typeof claims === 'object' && claims.hasOwnProperty('iat')) {
        return claims['iat'];
    }
    return null;
};
/**
 * Decodes a Firebase auth. token and checks the validity of its format. Expects a valid issued-at time.
 *
 * Notes:
 * - May return a false negative if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */
var isValidFormat = function (token) {
    var decoded = decode(token), claims = decoded.claims;
    return !!claims && typeof claims === 'object' && claims.hasOwnProperty('iat');
};
/**
 * Attempts to peer into an auth token and determine if it's an admin auth token by looking at the claims portion.
 *
 * Notes:
 * - May return a false negative if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */
var isAdmin = function (token) {
    var claims = decode(token).claims;
    return typeof claims === 'object' && claims['admin'] === true;
};

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function contains(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}
function safeGet(obj, key) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return obj[key];
    }
    else {
        return undefined;
    }
}
function isEmpty(obj) {
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
}
function map(obj, fn, contextObj) {
    var res = {};
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            res[key] = fn.call(contextObj, obj[key], key, obj);
        }
    }
    return res;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Returns a querystring-formatted string (e.g. &arg=val&arg2=val2) from a
 * params object (e.g. {arg: 'val', arg2: 'val2'})
 * Note: You must prepend it with ? when adding it to a URL.
 */
function querystring(querystringParams) {
    var params = [];
    var _loop_1 = function (key, value) {
        if (Array.isArray(value)) {
            value.forEach(function (arrayVal) {
                params.push(encodeURIComponent(key) + '=' + encodeURIComponent(arrayVal));
            });
        }
        else {
            params.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
        }
    };
    for (var _i = 0, _a = Object.entries(querystringParams); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        _loop_1(key, value);
    }
    return params.length ? '&' + params.join('&') : '';
}
/**
 * Decodes a querystring (e.g. ?arg=val&arg2=val2) into a params object
 * (e.g. {arg: 'val', arg2: 'val2'})
 */
function querystringDecode(querystring) {
    var obj = {};
    var tokens = querystring.replace(/^\?/, '').split('&');
    tokens.forEach(function (token) {
        if (token) {
            var key = token.split('=');
            obj[key[0]] = key[1];
        }
    });
    return obj;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @fileoverview SHA-1 cryptographic hash.
 * Variable names follow the notation in FIPS PUB 180-3:
 * http://csrc.nist.gov/publications/fips/fips180-3/fips180-3_final.pdf.
 *
 * Usage:
 *   var sha1 = new sha1();
 *   sha1.update(bytes);
 *   var hash = sha1.digest();
 *
 * Performance:
 *   Chrome 23:   ~400 Mbit/s
 *   Firefox 16:  ~250 Mbit/s
 *
 */
/**
 * SHA-1 cryptographic hash constructor.
 *
 * The properties declared here are discussed in the above algorithm document.
 * @constructor
 * @final
 * @struct
 */
var Sha1 = /** @class */ (function () {
    function Sha1() {
        /**
         * Holds the previous values of accumulated variables a-e in the compress_
         * function.
         * @private
         */
        this.chain_ = [];
        /**
         * A buffer holding the partially computed hash result.
         * @private
         */
        this.buf_ = [];
        /**
         * An array of 80 bytes, each a part of the message to be hashed.  Referred to
         * as the message schedule in the docs.
         * @private
         */
        this.W_ = [];
        /**
         * Contains data needed to pad messages less than 64 bytes.
         * @private
         */
        this.pad_ = [];
        /**
         * @private {number}
         */
        this.inbuf_ = 0;
        /**
         * @private {number}
         */
        this.total_ = 0;
        this.blockSize = 512 / 8;
        this.pad_[0] = 128;
        for (var i = 1; i < this.blockSize; ++i) {
            this.pad_[i] = 0;
        }
        this.reset();
    }
    Sha1.prototype.reset = function () {
        this.chain_[0] = 0x67452301;
        this.chain_[1] = 0xefcdab89;
        this.chain_[2] = 0x98badcfe;
        this.chain_[3] = 0x10325476;
        this.chain_[4] = 0xc3d2e1f0;
        this.inbuf_ = 0;
        this.total_ = 0;
    };
    /**
     * Internal compress helper function.
     * @param buf Block to compress.
     * @param offset Offset of the block in the buffer.
     * @private
     */
    Sha1.prototype.compress_ = function (buf, offset) {
        if (!offset) {
            offset = 0;
        }
        var W = this.W_;
        // get 16 big endian words
        if (typeof buf === 'string') {
            for (var i = 0; i < 16; i++) {
                // TODO(user): [bug 8140122] Recent versions of Safari for Mac OS and iOS
                // have a bug that turns the post-increment ++ operator into pre-increment
                // during JIT compilation.  We have code that depends heavily on SHA-1 for
                // correctness and which is affected by this bug, so I've removed all uses
                // of post-increment ++ in which the result value is used.  We can revert
                // this change once the Safari bug
                // (https://bugs.webkit.org/show_bug.cgi?id=109036) has been fixed and
                // most clients have been updated.
                W[i] =
                    (buf.charCodeAt(offset) << 24) |
                        (buf.charCodeAt(offset + 1) << 16) |
                        (buf.charCodeAt(offset + 2) << 8) |
                        buf.charCodeAt(offset + 3);
                offset += 4;
            }
        }
        else {
            for (var i = 0; i < 16; i++) {
                W[i] =
                    (buf[offset] << 24) |
                        (buf[offset + 1] << 16) |
                        (buf[offset + 2] << 8) |
                        buf[offset + 3];
                offset += 4;
            }
        }
        // expand to 80 words
        for (var i = 16; i < 80; i++) {
            var t = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
            W[i] = ((t << 1) | (t >>> 31)) & 0xffffffff;
        }
        var a = this.chain_[0];
        var b = this.chain_[1];
        var c = this.chain_[2];
        var d = this.chain_[3];
        var e = this.chain_[4];
        var f, k;
        // TODO(user): Try to unroll this loop to speed up the computation.
        for (var i = 0; i < 80; i++) {
            if (i < 40) {
                if (i < 20) {
                    f = d ^ (b & (c ^ d));
                    k = 0x5a827999;
                }
                else {
                    f = b ^ c ^ d;
                    k = 0x6ed9eba1;
                }
            }
            else {
                if (i < 60) {
                    f = (b & c) | (d & (b | c));
                    k = 0x8f1bbcdc;
                }
                else {
                    f = b ^ c ^ d;
                    k = 0xca62c1d6;
                }
            }
            var t = (((a << 5) | (a >>> 27)) + f + e + k + W[i]) & 0xffffffff;
            e = d;
            d = c;
            c = ((b << 30) | (b >>> 2)) & 0xffffffff;
            b = a;
            a = t;
        }
        this.chain_[0] = (this.chain_[0] + a) & 0xffffffff;
        this.chain_[1] = (this.chain_[1] + b) & 0xffffffff;
        this.chain_[2] = (this.chain_[2] + c) & 0xffffffff;
        this.chain_[3] = (this.chain_[3] + d) & 0xffffffff;
        this.chain_[4] = (this.chain_[4] + e) & 0xffffffff;
    };
    Sha1.prototype.update = function (bytes, length) {
        // TODO(johnlenz): tighten the function signature and remove this check
        if (bytes == null) {
            return;
        }
        if (length === undefined) {
            length = bytes.length;
        }
        var lengthMinusBlock = length - this.blockSize;
        var n = 0;
        // Using local instead of member variables gives ~5% speedup on Firefox 16.
        var buf = this.buf_;
        var inbuf = this.inbuf_;
        // The outer while loop should execute at most twice.
        while (n < length) {
            // When we have no data in the block to top up, we can directly process the
            // input buffer (assuming it contains sufficient data). This gives ~25%
            // speedup on Chrome 23 and ~15% speedup on Firefox 16, but requires that
            // the data is provided in large chunks (or in multiples of 64 bytes).
            if (inbuf === 0) {
                while (n <= lengthMinusBlock) {
                    this.compress_(bytes, n);
                    n += this.blockSize;
                }
            }
            if (typeof bytes === 'string') {
                while (n < length) {
                    buf[inbuf] = bytes.charCodeAt(n);
                    ++inbuf;
                    ++n;
                    if (inbuf === this.blockSize) {
                        this.compress_(buf);
                        inbuf = 0;
                        // Jump to the outer loop so we use the full-block optimization.
                        break;
                    }
                }
            }
            else {
                while (n < length) {
                    buf[inbuf] = bytes[n];
                    ++inbuf;
                    ++n;
                    if (inbuf === this.blockSize) {
                        this.compress_(buf);
                        inbuf = 0;
                        // Jump to the outer loop so we use the full-block optimization.
                        break;
                    }
                }
            }
        }
        this.inbuf_ = inbuf;
        this.total_ += length;
    };
    /** @override */
    Sha1.prototype.digest = function () {
        var digest = [];
        var totalBits = this.total_ * 8;
        // Add pad 0x80 0x00*.
        if (this.inbuf_ < 56) {
            this.update(this.pad_, 56 - this.inbuf_);
        }
        else {
            this.update(this.pad_, this.blockSize - (this.inbuf_ - 56));
        }
        // Add # bits.
        for (var i = this.blockSize - 1; i >= 56; i--) {
            this.buf_[i] = totalBits & 255;
            totalBits /= 256; // Don't use bit-shifting here!
        }
        this.compress_(this.buf_);
        var n = 0;
        for (var i = 0; i < 5; i++) {
            for (var j = 24; j >= 0; j -= 8) {
                digest[n] = (this.chain_[i] >> j) & 255;
                ++n;
            }
        }
        return digest;
    };
    return Sha1;
}());

/**
 * Helper to make a Subscribe function (just like Promise helps make a
 * Thenable).
 *
 * @param executor Function which can make calls to a single Observer
 *     as a proxy.
 * @param onNoObservers Callback when count of Observers goes to zero.
 */
function createSubscribe(executor, onNoObservers) {
    var proxy = new ObserverProxy(executor, onNoObservers);
    return proxy.subscribe.bind(proxy);
}
/**
 * Implement fan-out for any number of Observers attached via a subscribe
 * function.
 */
var ObserverProxy = /** @class */ (function () {
    /**
     * @param executor Function which can make calls to a single Observer
     *     as a proxy.
     * @param onNoObservers Callback when count of Observers goes to zero.
     */
    function ObserverProxy(executor, onNoObservers) {
        var _this = this;
        this.observers = [];
        this.unsubscribes = [];
        this.observerCount = 0;
        // Micro-task scheduling by calling task.then().
        this.task = Promise.resolve();
        this.finalized = false;
        this.onNoObservers = onNoObservers;
        // Call the executor asynchronously so subscribers that are called
        // synchronously after the creation of the subscribe function
        // can still receive the very first value generated in the executor.
        this.task
            .then(function () {
            executor(_this);
        })
            .catch(function (e) {
            _this.error(e);
        });
    }
    ObserverProxy.prototype.next = function (value) {
        this.forEachObserver(function (observer) {
            observer.next(value);
        });
    };
    ObserverProxy.prototype.error = function (error) {
        this.forEachObserver(function (observer) {
            observer.error(error);
        });
        this.close(error);
    };
    ObserverProxy.prototype.complete = function () {
        this.forEachObserver(function (observer) {
            observer.complete();
        });
        this.close();
    };
    /**
     * Subscribe function that can be used to add an Observer to the fan-out list.
     *
     * - We require that no event is sent to a subscriber sychronously to their
     *   call to subscribe().
     */
    ObserverProxy.prototype.subscribe = function (nextOrObserver, error, complete) {
        var _this = this;
        var observer;
        if (nextOrObserver === undefined &&
            error === undefined &&
            complete === undefined) {
            throw new Error('Missing Observer.');
        }
        // Assemble an Observer object when passed as callback functions.
        if (implementsAnyMethods(nextOrObserver, [
            'next',
            'error',
            'complete'
        ])) {
            observer = nextOrObserver;
        }
        else {
            observer = {
                next: nextOrObserver,
                error: error,
                complete: complete
            };
        }
        if (observer.next === undefined) {
            observer.next = noop;
        }
        if (observer.error === undefined) {
            observer.error = noop;
        }
        if (observer.complete === undefined) {
            observer.complete = noop;
        }
        var unsub = this.unsubscribeOne.bind(this, this.observers.length);
        // Attempt to subscribe to a terminated Observable - we
        // just respond to the Observer with the final error or complete
        // event.
        if (this.finalized) {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            this.task.then(function () {
                try {
                    if (_this.finalError) {
                        observer.error(_this.finalError);
                    }
                    else {
                        observer.complete();
                    }
                }
                catch (e) {
                    // nothing
                }
                return;
            });
        }
        this.observers.push(observer);
        return unsub;
    };
    // Unsubscribe is synchronous - we guarantee that no events are sent to
    // any unsubscribed Observer.
    ObserverProxy.prototype.unsubscribeOne = function (i) {
        if (this.observers === undefined || this.observers[i] === undefined) {
            return;
        }
        delete this.observers[i];
        this.observerCount -= 1;
        if (this.observerCount === 0 && this.onNoObservers !== undefined) {
            this.onNoObservers(this);
        }
    };
    ObserverProxy.prototype.forEachObserver = function (fn) {
        if (this.finalized) {
            // Already closed by previous event....just eat the additional values.
            return;
        }
        // Since sendOne calls asynchronously - there is no chance that
        // this.observers will become undefined.
        for (var i = 0; i < this.observers.length; i++) {
            this.sendOne(i, fn);
        }
    };
    // Call the Observer via one of it's callback function. We are careful to
    // confirm that the observe has not been unsubscribed since this asynchronous
    // function had been queued.
    ObserverProxy.prototype.sendOne = function (i, fn) {
        var _this = this;
        // Execute the callback asynchronously
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.task.then(function () {
            if (_this.observers !== undefined && _this.observers[i] !== undefined) {
                try {
                    fn(_this.observers[i]);
                }
                catch (e) {
                    // Ignore exceptions raised in Observers or missing methods of an
                    // Observer.
                    // Log error to console. b/31404806
                    if (typeof console !== 'undefined' && console.error) {
                        console.error(e);
                    }
                }
            }
        });
    };
    ObserverProxy.prototype.close = function (err) {
        var _this = this;
        if (this.finalized) {
            return;
        }
        this.finalized = true;
        if (err !== undefined) {
            this.finalError = err;
        }
        // Proxy is no longer needed - garbage collect references
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.task.then(function () {
            _this.observers = undefined;
            _this.onNoObservers = undefined;
        });
    };
    return ObserverProxy;
}());
/** Turn synchronous function into one called asynchronously. */
function async(fn, onError) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        Promise.resolve(true)
            .then(function () {
            fn.apply(void 0, args);
        })
            .catch(function (error) {
            if (onError) {
                onError(error);
            }
        });
    };
}
/**
 * Return true if the object passed in implements any of the named methods.
 */
function implementsAnyMethods(obj, methods) {
    if (typeof obj !== 'object' || obj === null) {
        return false;
    }
    for (var _i = 0, methods_1 = methods; _i < methods_1.length; _i++) {
        var method = methods_1[_i];
        if (method in obj && typeof obj[method] === 'function') {
            return true;
        }
    }
    return false;
}
function noop() {
    // do nothing
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Check to make sure the appropriate number of arguments are provided for a public function.
 * Throws an error if it fails.
 *
 * @param fnName The function name
 * @param minCount The minimum number of arguments to allow for the function call
 * @param maxCount The maximum number of argument to allow for the function call
 * @param argCount The actual number of arguments provided.
 */
var validateArgCount = function (fnName, minCount, maxCount, argCount) {
    var argError;
    if (argCount < minCount) {
        argError = 'at least ' + minCount;
    }
    else if (argCount > maxCount) {
        argError = maxCount === 0 ? 'none' : 'no more than ' + maxCount;
    }
    if (argError) {
        var error = fnName +
            ' failed: Was called with ' +
            argCount +
            (argCount === 1 ? ' argument.' : ' arguments.') +
            ' Expects ' +
            argError +
            '.';
        throw new Error(error);
    }
};
/**
 * Generates a string to prefix an error message about failed argument validation
 *
 * @param fnName The function name
 * @param argumentNumber The index of the argument
 * @param optional Whether or not the argument is optional
 * @return The prefix to add to the error thrown for validation.
 */
function errorPrefix(fnName, argumentNumber, optional) {
    var argName = '';
    switch (argumentNumber) {
        case 1:
            argName = optional ? 'first' : 'First';
            break;
        case 2:
            argName = optional ? 'second' : 'Second';
            break;
        case 3:
            argName = optional ? 'third' : 'Third';
            break;
        case 4:
            argName = optional ? 'fourth' : 'Fourth';
            break;
        default:
            throw new Error('errorPrefix called with argumentNumber > 4.  Need to update it?');
    }
    var error = fnName + ' failed: ';
    error += argName + ' argument ';
    return error;
}
/**
 * @param fnName
 * @param argumentNumber
 * @param namespace
 * @param optional
 */
function validateNamespace(fnName, argumentNumber, namespace, optional) {
    if (optional && !namespace) {
        return;
    }
    if (typeof namespace !== 'string') {
        //TODO: I should do more validation here. We only allow certain chars in namespaces.
        throw new Error(errorPrefix(fnName, argumentNumber, optional) +
            'must be a valid firebase namespace.');
    }
}
function validateCallback(fnName, argumentNumber, callback, optional) {
    if (optional && !callback) {
        return;
    }
    if (typeof callback !== 'function') {
        throw new Error(errorPrefix(fnName, argumentNumber, optional) +
            'must be a valid function.');
    }
}
function validateContextObject(fnName, argumentNumber, context, optional) {
    if (optional && !context) {
        return;
    }
    if (typeof context !== 'object' || context === null) {
        throw new Error(errorPrefix(fnName, argumentNumber, optional) +
            'must be a valid context object.');
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Code originally came from goog.crypt.stringToUtf8ByteArray, but for some reason they
// automatically replaced '\r\n' with '\n', and they didn't handle surrogate pairs,
// so it's been modified.
// Note that not all Unicode characters appear as single characters in JavaScript strings.
// fromCharCode returns the UTF-16 encoding of a character - so some Unicode characters
// use 2 characters in Javascript.  All 4-byte UTF-8 characters begin with a first
// character in the range 0xD800 - 0xDBFF (the first character of a so-called surrogate
// pair).
// See http://www.ecma-international.org/ecma-262/5.1/#sec-15.1.3
/**
 * @param {string} str
 * @return {Array}
 */
var stringToByteArray$1 = function (str) {
    var out = [];
    var p = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        // Is this the lead surrogate in a surrogate pair?
        if (c >= 0xd800 && c <= 0xdbff) {
            var high = c - 0xd800; // the high 10 bits.
            i++;
            assert(i < str.length, 'Surrogate pair missing trail surrogate.');
            var low = str.charCodeAt(i) - 0xdc00; // the low 10 bits.
            c = 0x10000 + (high << 10) + low;
        }
        if (c < 128) {
            out[p++] = c;
        }
        else if (c < 2048) {
            out[p++] = (c >> 6) | 192;
            out[p++] = (c & 63) | 128;
        }
        else if (c < 65536) {
            out[p++] = (c >> 12) | 224;
            out[p++] = ((c >> 6) & 63) | 128;
            out[p++] = (c & 63) | 128;
        }
        else {
            out[p++] = (c >> 18) | 240;
            out[p++] = ((c >> 12) & 63) | 128;
            out[p++] = ((c >> 6) & 63) | 128;
            out[p++] = (c & 63) | 128;
        }
    }
    return out;
};
/**
 * Calculate length without actually converting; useful for doing cheaper validation.
 * @param {string} str
 * @return {number}
 */
var stringLength = function (str) {
    var p = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        if (c < 128) {
            p++;
        }
        else if (c < 2048) {
            p += 2;
        }
        else if (c >= 0xd800 && c <= 0xdbff) {
            // Lead surrogate of a surrogate pair.  The pair together will take 4 bytes to represent.
            p += 4;
            i++; // skip trail surrogate.
        }
        else {
            p += 3;
        }
    }
    return p;
};

exports.CONSTANTS = CONSTANTS;
exports.Deferred = Deferred;
exports.ErrorFactory = ErrorFactory;
exports.FirebaseError = FirebaseError;
exports.Sha1 = Sha1;
exports.assert = assert;
exports.assertionError = assertionError;
exports.async = async;
exports.base64 = base64;
exports.base64Decode = base64Decode;
exports.base64Encode = base64Encode;
exports.contains = contains;
exports.createSubscribe = createSubscribe;
exports.decode = decode;
exports.deepCopy = deepCopy;
exports.deepExtend = deepExtend;
exports.errorPrefix = errorPrefix;
exports.getUA = getUA;
exports.isAdmin = isAdmin;
exports.isBrowser = isBrowser;
exports.isBrowserExtension = isBrowserExtension;
exports.isElectron = isElectron;
exports.isEmpty = isEmpty;
exports.isIE = isIE;
exports.isMobileCordova = isMobileCordova;
exports.isNode = isNode;
exports.isNodeSdk = isNodeSdk;
exports.isReactNative = isReactNative;
exports.isSafari = isSafari;
exports.isUWP = isUWP;
exports.isValidFormat = isValidFormat;
exports.isValidTimestamp = isValidTimestamp;
exports.issuedAtTime = issuedAtTime;
exports.jsonEval = jsonEval;
exports.map = map;
exports.querystring = querystring;
exports.querystringDecode = querystringDecode;
exports.safeGet = safeGet;
exports.stringLength = stringLength;
exports.stringToByteArray = stringToByteArray$1;
exports.stringify = stringify;
exports.validateArgCount = validateArgCount;
exports.validateCallback = validateCallback;
exports.validateContextObject = validateContextObject;
exports.validateNamespace = validateNamespace;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"tslib":7}],6:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var cjs = createCommonjsModule(function (module) {
    (function () {
        var g, goog = goog || {}, k = this || self;
        function aa() { }
        function ba(a) {
            var b = typeof a;
            if ("object" == b)
                if (a) {
                    if (a instanceof Array)
                        return "array";
                    if (a instanceof Object)
                        return b;
                    var c = Object.prototype.toString.call(a);
                    if ("[object Window]" == c)
                        return "object";
                    if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice"))
                        return "array";
                    if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call"))
                        return "function";
                }
                else
                    return "null";
            else if ("function" == b && "undefined" == typeof a.call)
                return "object";
            return b;
        }
        function da(a) { var b = ba(a); return "array" == b || "object" == b && "number" == typeof a.length; }
        function m(a) { var b = typeof a; return "object" == b && null != a || "function" == b; }
        function ea(a) { return Object.prototype.hasOwnProperty.call(a, fa) && a[fa] || (a[fa] = ++ha); }
        var fa = "closure_uid_" + (1E9 * Math.random() >>> 0), ha = 0;
        function ia(a, b, c) { return a.call.apply(a.bind, arguments); }
        function ja(a, b, c) { if (!a)
            throw Error(); if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function () { var e = Array.prototype.slice.call(arguments); Array.prototype.unshift.apply(e, d); return a.apply(b, e); };
        } return function () { return a.apply(b, arguments); }; }
        function n(a, b, c) { Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? n = ia : n = ja; return n.apply(null, arguments); }
        function ka(a, b) { var c = Array.prototype.slice.call(arguments, 1); return function () { var d = c.slice(); d.push.apply(d, arguments); return a.apply(this, d); }; }
        var q = Date.now || function () { return +new Date; };
        function r(a, b) { function c() { } c.prototype = b.prototype; a.M = b.prototype; a.prototype = new c; a.prototype.constructor = a; }
        function t() { this.j = this.j; this.i = this.i; }
        var la = 0;
        t.prototype.j = !1;
        t.prototype.da = function () { if (!this.j && (this.j = !0, this.C(), 0 != la)) {
            var a = ea(this);
        } };
        t.prototype.C = function () { if (this.i)
            for (; this.i.length;)
                this.i.shift()(); };
        var na = Array.prototype.indexOf ? function (a, b) { return Array.prototype.indexOf.call(a, b, void 0); } : function (a, b) { if ("string" === typeof a)
            return "string" !== typeof b || 1 != b.length ? -1 : a.indexOf(b, 0); for (var c = 0; c < a.length; c++)
            if (c in a && a[c] === b)
                return c; return -1; }, oa = Array.prototype.forEach ? function (a, b, c) { Array.prototype.forEach.call(a, b, c); } : function (a, b, c) { for (var d = a.length, e = "string" === typeof a ? a.split("") : a, f = 0; f < d; f++)
            f in e && b.call(c, e[f], f, a); };
        function pa(a) { a: {
            var b = qa;
            for (var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0; e < c; e++)
                if (e in d && b.call(void 0, d[e], e, a)) {
                    b = e;
                    break a;
                }
            b = -1;
        } return 0 > b ? null : "string" === typeof a ? a.charAt(b) : a[b]; }
        function ra(a) { return Array.prototype.concat.apply([], arguments); }
        function sa(a) { var b = a.length; if (0 < b) {
            for (var c = Array(b), d = 0; d < b; d++)
                c[d] = a[d];
            return c;
        } return []; }
        function wa(a) { return /^[\s\xa0]*$/.test(a); }
        var xa = String.prototype.trim ? function (a) { return a.trim(); } : function (a) { return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]; };
        function u(a, b) { return -1 != a.indexOf(b); }
        function ya(a, b) { return a < b ? -1 : a > b ? 1 : 0; }
        var v;
        a: {
            var za = k.navigator;
            if (za) {
                var Aa = za.userAgent;
                if (Aa) {
                    v = Aa;
                    break a;
                }
            }
            v = "";
        }
        function Ba(a, b, c) { for (var d in a)
            b.call(c, a[d], d, a); }
        function Ca(a) { var b = {}; for (var c in a)
            b[c] = a[c]; return b; }
        var Da = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
        function Ea(a, b) { var c, d; for (var e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d)
                a[c] = d[c];
            for (var f = 0; f < Da.length; f++)
                c = Da[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
        } }
        function Fa(a) { Fa[" "](a); return a; }
        Fa[" "] = aa;
        function Ga(a, b) { var c = Ha; return Object.prototype.hasOwnProperty.call(c, a) ? c[a] : c[a] = b(a); }
        var Ia = u(v, "Opera"), w = u(v, "Trident") || u(v, "MSIE"), Ja = u(v, "Edge"), Ka = Ja || w, La = u(v, "Gecko") && !(u(v.toLowerCase(), "webkit") && !u(v, "Edge")) && !(u(v, "Trident") || u(v, "MSIE")) && !u(v, "Edge"), Ma = u(v.toLowerCase(), "webkit") && !u(v, "Edge");
        function Na() { var a = k.document; return a ? a.documentMode : void 0; }
        var Oa;
        a: {
            var Pa = "", Qa = function () { var a = v; if (La)
                return /rv:([^\);]+)(\)|;)/.exec(a); if (Ja)
                return /Edge\/([\d\.]+)/.exec(a); if (w)
                return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a); if (Ma)
                return /WebKit\/(\S+)/.exec(a); if (Ia)
                return /(?:Version)[ \/]?(\S+)/.exec(a); }();
            Qa && (Pa = Qa ? Qa[1] : "");
            if (w) {
                var Ra = Na();
                if (null != Ra && Ra > parseFloat(Pa)) {
                    Oa = String(Ra);
                    break a;
                }
            }
            Oa = Pa;
        }
        var Ha = {};
        function Sa(a) { return Ga(a, function () { {
            var b = 0;
            var e = xa(String(Oa)).split("."), f = xa(String(a)).split("."), h = Math.max(e.length, f.length);
            for (var l = 0; 0 == b && l < h; l++) {
                var c = e[l] || "", d = f[l] || "";
                do {
                    c = /(\d*)(\D*)(.*)/.exec(c) || ["", "", "", ""];
                    d = /(\d*)(\D*)(.*)/.exec(d) || ["", "", "", ""];
                    if (0 == c[0].length && 0 == d[0].length)
                        break;
                    b = ya(0 == c[1].length ? 0 : parseInt(c[1], 10), 0 == d[1].length ? 0 : parseInt(d[1], 10)) || ya(0 == c[2].length, 0 == d[2].length) || ya(c[2], d[2]);
                    c = c[3];
                    d = d[3];
                } while (0 == b);
            }
        } return 0 <= b; }); }
        var Ta;
        if (k.document && w) {
            var Ua = Na();
            Ta = Ua ? Ua : parseInt(Oa, 10) || void 0;
        }
        else
            Ta = void 0;
        var Va = Ta;
        var Wa = !w || 9 <= Number(Va), Xa = w && !Sa("9"), Ya = function () { if (!k.addEventListener || !Object.defineProperty)
            return !1; var a = !1, b = Object.defineProperty({}, "passive", { get: function () { a = !0; } }); try {
            k.addEventListener("test", aa, b), k.removeEventListener("test", aa, b);
        }
        catch (c) { } return a; }();
        function x(a, b) { this.type = a; this.a = this.target = b; this.defaultPrevented = !1; }
        x.prototype.b = function () { this.defaultPrevented = !0; };
        function y(a, b) {
            x.call(this, a ? a.type : "");
            this.relatedTarget = this.a = this.target = null;
            this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
            this.key = "";
            this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
            this.pointerId = 0;
            this.pointerType = "";
            this.c = null;
            if (a) {
                var c = this.type = a.type, d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null;
                this.target = a.target || a.srcElement;
                this.a = b;
                if (b = a.relatedTarget) {
                    if (La) {
                        a: {
                            try {
                                Fa(b.nodeName);
                                var e = !0;
                                break a;
                            }
                            catch (f) { }
                            e = !1;
                        }
                        e || (b = null);
                    }
                }
                else
                    "mouseover" ==
                        c ? b = a.fromElement : "mouseout" == c && (b = a.toElement);
                this.relatedTarget = b;
                d ? (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX, this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY, this.screenX = d.screenX || 0, this.screenY = d.screenY || 0) : (this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX, this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0);
                this.button = a.button;
                this.key = a.key || "";
                this.ctrlKey = a.ctrlKey;
                this.altKey = a.altKey;
                this.shiftKey = a.shiftKey;
                this.metaKey =
                    a.metaKey;
                this.pointerId = a.pointerId || 0;
                this.pointerType = "string" === typeof a.pointerType ? a.pointerType : Za[a.pointerType] || "";
                this.c = a;
                a.defaultPrevented && this.b();
            }
        }
        r(y, x);
        var Za = { 2: "touch", 3: "pen", 4: "mouse" };
        y.prototype.b = function () { y.M.b.call(this); var a = this.c; if (a.preventDefault)
            a.preventDefault();
        else if (a.returnValue = !1, Xa)
            try {
                if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode)
                    a.keyCode = -1;
            }
            catch (b) { } };
        var A = "closure_listenable_" + (1E6 * Math.random() | 0), $a = 0;
        function ab(a, b, c, d, e) { this.listener = a; this.proxy = null; this.src = b; this.type = c; this.capture = !!d; this.aa = e; this.key = ++$a; this.V = this.X = !1; }
        function bb(a) { a.V = !0; a.listener = null; a.proxy = null; a.src = null; a.aa = null; }
        function cb(a) { this.src = a; this.a = {}; this.b = 0; }
        cb.prototype.add = function (a, b, c, d, e) { var f = a.toString(); a = this.a[f]; a || (a = this.a[f] = [], this.b++); var h = db(a, b, d, e); -1 < h ? (b = a[h], c || (b.X = !1)) : (b = new ab(b, this.src, f, !!d, e), b.X = c, a.push(b)); return b; };
        function eb(a, b) { var c = b.type; if (c in a.a) {
            var d = a.a[c], e = na(d, b), f;
            (f = 0 <= e) && Array.prototype.splice.call(d, e, 1);
            f && (bb(b), 0 == a.a[c].length && (delete a.a[c], a.b--));
        } }
        function db(a, b, c, d) { for (var e = 0; e < a.length; ++e) {
            var f = a[e];
            if (!f.V && f.listener == b && f.capture == !!c && f.aa == d)
                return e;
        } return -1; }
        var fb = "closure_lm_" + (1E6 * Math.random() | 0), gb = {};
        function ib(a, b, c, d, e) { if (d && d.once)
            return jb(a, b, c, d, e); if (Array.isArray(b)) {
            for (var f = 0; f < b.length; f++)
                ib(a, b[f], c, d, e);
            return null;
        } c = kb(c); return a && a[A] ? a.ra(b, c, m(d) ? !!d.capture : !!d, e) : lb(a, b, c, !1, d, e); }
        function lb(a, b, c, d, e, f) {
            if (!b)
                throw Error("Invalid event type");
            var h = m(e) ? !!e.capture : !!e;
            if (h && !Wa)
                return null;
            var l = mb(a);
            l || (a[fb] = l = new cb(a));
            c = l.add(b, c, d, h, f);
            if (c.proxy)
                return c;
            d = nb();
            c.proxy = d;
            d.src = a;
            d.listener = c;
            if (a.addEventListener)
                Ya || (e = h), void 0 === e && (e = !1), a.addEventListener(b.toString(), d, e);
            else if (a.attachEvent)
                a.attachEvent(ob(b.toString()), d);
            else if (a.addListener && a.removeListener)
                a.addListener(d);
            else
                throw Error("addEventListener and attachEvent are unavailable.");
            return c;
        }
        function nb() { var a = pb, b = Wa ? function (c) { return a.call(b.src, b.listener, c); } : function (c) { c = a.call(b.src, b.listener, c); if (!c)
            return c; }; return b; }
        function jb(a, b, c, d, e) { if (Array.isArray(b)) {
            for (var f = 0; f < b.length; f++)
                jb(a, b[f], c, d, e);
            return null;
        } c = kb(c); return a && a[A] ? a.sa(b, c, m(d) ? !!d.capture : !!d, e) : lb(a, b, c, !0, d, e); }
        function qb(a, b, c, d, e) { if (Array.isArray(b))
            for (var f = 0; f < b.length; f++)
                qb(a, b[f], c, d, e);
        else
            (d = m(d) ? !!d.capture : !!d, c = kb(c), a && a[A]) ? (a = a.c, b = String(b).toString(), b in a.a && (f = a.a[b], c = db(f, c, d, e), -1 < c && (bb(f[c]), Array.prototype.splice.call(f, c, 1), 0 == f.length && (delete a.a[b], a.b--)))) : a && (a = mb(a)) && (b = a.a[b.toString()], a = -1, b && (a = db(b, c, d, e)), (c = -1 < a ? b[a] : null) && rb(c)); }
        function rb(a) { if ("number" !== typeof a && a && !a.V) {
            var b = a.src;
            if (b && b[A])
                eb(b.c, a);
            else {
                var c = a.type, d = a.proxy;
                b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent ? b.detachEvent(ob(c), d) : b.addListener && b.removeListener && b.removeListener(d);
                (c = mb(b)) ? (eb(c, a), 0 == c.b && (c.src = null, b[fb] = null)) : bb(a);
            }
        } }
        function ob(a) { return a in gb ? gb[a] : gb[a] = "on" + a; }
        function sb(a, b) { var c = a.listener, d = a.aa || a.src; a.X && rb(a); return c.call(d, b); }
        function pb(a, b) { if (a.V)
            return !0; if (!Wa) {
            if (!b)
                a: {
                    b = ["window", "event"];
                    for (var c = k, d = 0; d < b.length; d++)
                        if (c = c[b[d]], null == c) {
                            b = null;
                            break a;
                        }
                    b = c;
                }
            b = new y(b, this);
            return sb(a, b);
        } return sb(a, new y(b, this)); }
        function mb(a) { a = a[fb]; return a instanceof cb ? a : null; }
        var tb = "__closure_events_fn_" + (1E9 * Math.random() >>> 0);
        function kb(a) { if ("function" == ba(a))
            return a; a[tb] || (a[tb] = function (b) { return a.handleEvent(b); }); return a[tb]; }
        function B() { t.call(this); this.c = new cb(this); this.J = this; this.A = null; }
        r(B, t);
        B.prototype[A] = !0;
        g = B.prototype;
        g.addEventListener = function (a, b, c, d) { ib(this, a, b, c, d); };
        g.removeEventListener = function (a, b, c, d) { qb(this, a, b, c, d); };
        g.dispatchEvent = function (a) { var b, c = this.A; if (c)
            for (b = []; c; c = c.A)
                b.push(c); c = this.J; var d = a.type || a; if ("string" === typeof a)
            a = new x(a, c);
        else if (a instanceof x)
            a.target = a.target || c;
        else {
            var e = a;
            a = new x(d, c);
            Ea(a, e);
        } e = !0; if (b)
            for (var f = b.length - 1; 0 <= f; f--) {
                var h = a.a = b[f];
                e = ub(h, d, !0, a) && e;
            } h = a.a = c; e = ub(h, d, !0, a) && e; e = ub(h, d, !1, a) && e; if (b)
            for (f = 0; f < b.length; f++)
                h = a.a = b[f], e = ub(h, d, !1, a) && e; return e; };
        g.C = function () { B.M.C.call(this); if (this.c) {
            var a = this.c, c;
            for (c in a.a) {
                for (var d = a.a[c], e = 0; e < d.length; e++)
                    bb(d[e]);
                delete a.a[c];
                a.b--;
            }
        } this.A = null; };
        g.ra = function (a, b, c, d) { return this.c.add(String(a), b, !1, c, d); };
        g.sa = function (a, b, c, d) { return this.c.add(String(a), b, !0, c, d); };
        function ub(a, b, c, d) { b = a.c.a[String(b)]; if (!b)
            return !0; b = b.concat(); for (var e = !0, f = 0; f < b.length; ++f) {
            var h = b[f];
            if (h && !h.V && h.capture == c) {
                var l = h.listener, p = h.aa || h.src;
                h.X && eb(a.c, h);
                e = !1 !== l.call(p, d) && e;
            }
        } return e && !d.defaultPrevented; }
        var vb = k.JSON.stringify;
        function wb() { this.b = this.a = null; }
        var yb = new /** @class */ (function () {
            function class_1(a, b, c) {
                this.f = c;
                this.c = a;
                this.g = b;
                this.b = 0;
                this.a = null;
            }
            class_1.prototype.get = function () { var a; 0 < this.b ? (this.b--, a = this.a, this.a = a.next, a.next = null) : a = this.c(); return a; };
            return class_1;
        }())(function () { return new xb; }, function (a) { a.reset(); }, 100);
        wb.prototype.add = function (a, b) { var c = yb.get(); c.set(a, b); this.b ? this.b.next = c : this.a = c; this.b = c; };
        function zb() { var a = Ab, b = null; a.a && (b = a.a, a.a = a.a.next, a.a || (a.b = null), b.next = null); return b; }
        function xb() { this.next = this.b = this.a = null; }
        xb.prototype.set = function (a, b) { this.a = a; this.b = b; this.next = null; };
        xb.prototype.reset = function () { this.next = this.b = this.a = null; };
        function Bb(a) { k.setTimeout(function () { throw a; }, 0); }
        function Cb(a, b) { Db || Eb(); Fb || (Db(), Fb = !0); Ab.add(a, b); }
        var Db;
        function Eb() { var a = k.Promise.resolve(void 0); Db = function () { a.then(Gb); }; }
        var Fb = !1, Ab = new wb;
        function Gb() { for (var a; a = zb();) {
            try {
                a.a.call(a.b);
            }
            catch (c) {
                Bb(c);
            }
            var b = yb;
            b.g(a);
            b.b < b.f && (b.b++, a.next = b.a, b.a = a);
        } Fb = !1; }
        function Hb(a, b) { B.call(this); this.b = a || 1; this.a = b || k; this.f = n(this.Ua, this); this.g = q(); }
        r(Hb, B);
        g = Hb.prototype;
        g.Z = !1;
        g.L = null;
        g.Ua = function () { if (this.Z) {
            var a = q() - this.g;
            0 < a && a < .8 * this.b ? this.L = this.a.setTimeout(this.f, this.b - a) : (this.L && (this.a.clearTimeout(this.L), this.L = null), this.dispatchEvent("tick"), this.Z && (Ib(this), this.start()));
        } };
        g.start = function () { this.Z = !0; this.L || (this.L = this.a.setTimeout(this.f, this.b), this.g = q()); };
        function Ib(a) { a.Z = !1; a.L && (a.a.clearTimeout(a.L), a.L = null); }
        g.C = function () { Hb.M.C.call(this); Ib(this); delete this.a; };
        function Jb(a, b, c) { if ("function" == ba(a))
            c && (a = n(a, c));
        else if (a && "function" == typeof a.handleEvent)
            a = n(a.handleEvent, a);
        else
            throw Error("Invalid listener argument"); return 2147483647 < Number(b) ? -1 : k.setTimeout(a, b || 0); }
        function Kb(a, b, c) { t.call(this); this.f = null != c ? n(a, c) : a; this.c = b; this.b = n(this.Pa, this); this.a = []; }
        r(Kb, t);
        g = Kb.prototype;
        g.ba = !1;
        g.T = null;
        g.Ia = function (a) { this.a = arguments; this.T ? this.ba = !0 : Lb(this); };
        g.C = function () { Kb.M.C.call(this); this.T && (k.clearTimeout(this.T), this.T = null, this.ba = !1, this.a = []); };
        g.Pa = function () { this.T = null; this.ba && (this.ba = !1, Lb(this)); };
        function Lb(a) { a.T = Jb(a.b, a.c); a.f.apply(null, a.a); }
        function C(a) { t.call(this); this.b = a; this.a = {}; }
        r(C, t);
        var Mb = [];
        function Nb(a, b, c, d) { Array.isArray(c) || (c && (Mb[0] = c.toString()), c = Mb); for (var e = 0; e < c.length; e++) {
            var f = ib(b, c[e], d || a.handleEvent, !1, a.b || a);
            if (!f)
                break;
            a.a[f.key] = f;
        } }
        function Ob(a) { Ba(a.a, function (b, c) { this.a.hasOwnProperty(c) && rb(b); }, a); a.a = {}; }
        C.prototype.C = function () { C.M.C.call(this); Ob(this); };
        C.prototype.handleEvent = function () { throw Error("EventHandler.handleEvent not implemented"); };
        function Pb() { }
        var Qb = null;
        function Rb() { return Qb = Qb || new B; }
        function Sb(a) { x.call(this, "serverreachability", a); }
        r(Sb, x);
        function E(a) { var b = Rb(); b.dispatchEvent(new Sb(b, a)); }
        function Tb(a) { x.call(this, "statevent", a); }
        r(Tb, x);
        function F(a) { var b = Rb(); b.dispatchEvent(new Tb(b, a)); }
        function Ub(a) { x.call(this, "timingevent", a); }
        r(Ub, x);
        function Vb(a, b) { if ("function" != ba(a))
            throw Error("Fn must not be null and must be a function"); return k.setTimeout(function () { a(); }, b); }
        var Wb = { NO_ERROR: 0, Va: 1, bb: 2, ab: 3, Ya: 4, $a: 5, cb: 6, za: 7, TIMEOUT: 8, gb: 9 };
        var Xb = { Xa: "complete", kb: "success", Aa: "error", za: "abort", ib: "ready", jb: "readystatechange", TIMEOUT: "timeout", eb: "incrementaldata", hb: "progress", Za: "downloadprogress", lb: "uploadprogress" };
        function Yb() { }
        Yb.prototype.a = null;
        function Zb(a) { var b; (b = a.a) || (b = a.a = {}); return b; }
        function $b() { }
        var G = { OPEN: "a", Wa: "b", Aa: "c", fb: "d" };
        function ac() { x.call(this, "d"); }
        r(ac, x);
        function bc() { x.call(this, "c"); }
        r(bc, x);
        var cc;
        function dc() { }
        r(dc, Yb);
        cc = new dc;
        function H(a, b, c) { this.g = a; this.W = b; this.U = c || 1; this.G = new C(this); this.N = ec; a = Ka ? 125 : void 0; this.O = new Hb(a); this.m = null; this.b = !1; this.j = this.A = this.f = this.B = this.s = this.P = this.h = null; this.i = []; this.a = null; this.w = 0; this.c = this.v = null; this.H = -1; this.l = !1; this.J = 0; this.D = null; this.o = this.R = this.F = !1; }
        var ec = 45E3, fc = {}, gc = {};
        g = H.prototype;
        g.setTimeout = function (a) { this.N = a; };
        function hc(a, b, c) { a.B = 1; a.f = ic(I(b)); a.j = c; a.F = !0; jc(a, null); }
        function jc(a, b) { a.s = q(); J(a); a.A = I(a.f); var c = a.A, d = a.U; Array.isArray(d) || (d = [String(d)]); kc(c.b, "t", d); a.w = 0; a.a = lc(a.g, a.g.w ? b : null); 0 < a.J && (a.D = new Kb(n(a.ya, a, a.a), a.J)); Nb(a.G, a.a, "readystatechange", a.Sa); b = a.m ? Ca(a.m) : {}; a.j ? (a.v || (a.v = "POST"), b["Content-Type"] = "application/x-www-form-urlencoded", a.a.$(a.A, a.v, a.j, b)) : (a.v = "GET", a.a.$(a.A, a.v, null, b)); E(1); }
        g.Sa = function (a) { a = a.target; var b = this.D; b && 3 == K(a) ? b.Ia() : this.ya(a); };
        g.ya = function (a) {
            try {
                if (a == this.a)
                    a: {
                        var b = K(this.a), c = this.a.qa(), d = this.a.S();
                        if (!(3 > b || 3 == b && !Ka && !this.a.Y())) {
                            this.l || 4 != b || 7 == c || (8 == c || 0 >= d ? E(3) : E(2));
                            mc(this);
                            var e = this.a.S();
                            this.H = e;
                            var f = this.a.Y();
                            if (this.b = 200 == e) {
                                if (this.R && !this.o) {
                                    b: {
                                        if (this.a) {
                                            var h, l = this.a;
                                            if ((h = l.a ? l.a.getResponseHeader("X-HTTP-Initial-Response") : null) && !wa(h)) {
                                                var p = h;
                                                break b;
                                            }
                                        }
                                        p = null;
                                    }
                                    if (p)
                                        this.o = !0, nc(this, p);
                                    else {
                                        this.b = !1;
                                        this.c = 3;
                                        F(12);
                                        L(this);
                                        pc(this);
                                        break a;
                                    }
                                }
                                this.F ? (qc(this, b, f), Ka && this.b && 3 == b && (Nb(this.G, this.O, "tick", this.Ra), this.O.start())) : nc(this, f);
                                4 == b && L(this);
                                this.b && !this.l && (4 == b ? rc(this.g, this) : (this.b = !1, J(this)));
                            }
                            else
                                400 == e && 0 < f.indexOf("Unknown SID") ? (this.c = 3, F(12)) : (this.c = 0, F(13)), L(this), pc(this);
                        }
                    }
            }
            catch (D) { }
            finally { }
        };
        function qc(a, b, c) { for (var d = !0; !a.l && a.w < c.length;) {
            var e = tc(a, c);
            if (e == gc) {
                4 == b && (a.c = 4, F(14), d = !1);
                break;
            }
            else if (e == fc) {
                a.c = 4;
                F(15);
                d = !1;
                break;
            }
            else
                nc(a, e);
        } 4 == b && 0 == c.length && (a.c = 1, F(16), d = !1); a.b = a.b && d; d || (L(a), pc(a)); }
        g.Ra = function () { if (this.a) {
            var a = K(this.a), b = this.a.Y();
            this.w < b.length && (mc(this), qc(this, a, b), this.b && 4 != a && J(this));
        } };
        function tc(a, b) { var c = a.w, d = b.indexOf("\n", c); if (-1 == d)
            return gc; c = Number(b.substring(c, d)); if (isNaN(c))
            return fc; d += 1; if (d + c > b.length)
            return gc; b = b.substr(d, c); a.w = d + c; return b; }
        g.cancel = function () { this.l = !0; L(this); };
        function J(a) { a.P = q() + a.N; uc(a, a.N); }
        function uc(a, b) { if (null != a.h)
            throw Error("WatchDog timer not null"); a.h = Vb(n(a.Qa, a), b); }
        function mc(a) { a.h && (k.clearTimeout(a.h), a.h = null); }
        g.Qa = function () { this.h = null; var a = q(); 0 <= a - this.P ? (2 != this.B && (E(3), F(17)), L(this), this.c = 2, pc(this)) : uc(this, this.P - a); };
        function pc(a) { 0 == a.g.u || a.l || rc(a.g, a); }
        function L(a) { mc(a); var b = a.D; b && "function" == typeof b.da && b.da(); a.D = null; Ib(a.O); Ob(a.G); a.a && (b = a.a, a.a = null, b.abort(), b.da()); }
        function nc(a, b) {
            try {
                var c = a.g;
                if (0 != c.u && (c.a == a || vc(c.b, a)))
                    if (c.A = a.H, !a.o && vc(c.b, a) && 3 == c.u) {
                        try {
                            var d = c.ja.a.parse(b);
                        }
                        catch (oc) {
                            d = null;
                        }
                        if (Array.isArray(d) && 3 == d.length) {
                            var e = d;
                            if (0 == e[0])
                                a: {
                                    if (!c.i) {
                                        if (c.a)
                                            if (c.a.s + 3E3 < a.s)
                                                wc(c), c.a.cancel(), c.a = null;
                                            else
                                                break a;
                                        xc(c);
                                        F(18);
                                    }
                                }
                            else
                                c.ia = e[1], 0 < c.ia - c.G && 37500 > e[2] && c.U && 0 == c.m && !c.l && (c.l = Vb(n(c.Na, c), 6E3));
                            if (1 >= yc(c.b) && c.O) {
                                try {
                                    c.O();
                                }
                                catch (oc) { }
                                c.O = void 0;
                            }
                        }
                        else
                            M(c, 11);
                    }
                    else if ((a.o || c.a == a) && wc(c), !wa(b))
                        for (b = d = c.ja.a.parse(b), d = 0; d < b.length; d++)
                            if (e =
                                b[d], c.G = e[0], e = e[1], 2 == c.u)
                                if ("c" == e[0]) {
                                    c.B = e[1];
                                    c.R = e[2];
                                    var f = e[3];
                                    null != f && (c.oa = f);
                                    var h = e[5];
                                    null != h && "number" === typeof h && 0 < h && (c.D = 1.5 * h);
                                    var l = c, p = a.a;
                                    if (p) {
                                        var D = p.a ? p.a.getResponseHeader("X-Client-Wire-Protocol") : null;
                                        if (D) {
                                            var z = l.b;
                                            !z.a && (u(D, "spdy") || u(D, "quic") || u(D, "h2")) && (z.f = z.g, z.a = new Set, z.b && (zc(z, z.b), z.b = null));
                                        }
                                        if (l.s) {
                                            var ta = p.a ? p.a.getResponseHeader("X-HTTP-Session-Id") : null;
                                            ta && (l.ha = ta, N(l.v, l.s, ta));
                                        }
                                    }
                                    c.u = 3;
                                    c.c && c.c.na();
                                    l = c;
                                    var ua = a;
                                    l.ea = Ac(l, l.w ? l.R : null, l.P);
                                    if (ua.o) {
                                        Bc(l.b, ua);
                                        var va = ua, sc = l.D;
                                        sc && va.setTimeout(sc);
                                        va.h && (mc(va), J(va));
                                        l.a = ua;
                                    }
                                    else
                                        Cc(l);
                                    0 < c.f.length && Dc(c);
                                }
                                else
                                    "stop" != e[0] && "close" != e[0] || M(c, 7);
                            else
                                3 == c.u && ("stop" == e[0] || "close" == e[0] ? "stop" == e[0] ? M(c, 7) : Ec(c) : "noop" != e[0] && c.c && c.c.ma(e), c.m = 0);
                E(4);
            }
            catch (oc) { }
        }
        function Fc(a) { if (a.I && "function" == typeof a.I)
            return a.I(); if ("string" === typeof a)
            return a.split(""); if (da(a)) {
            for (var b = [], c = a.length, d = 0; d < c; d++)
                b.push(a[d]);
            return b;
        } b = []; c = 0; for (d in a)
            b[c++] = a[d]; return a = b; }
        function Gc(a, b) { if (a.forEach && "function" == typeof a.forEach)
            a.forEach(b, void 0);
        else if (da(a) || "string" === typeof a)
            oa(a, b, void 0);
        else {
            if (a.K && "function" == typeof a.K)
                var c = a.K();
            else if (a.I && "function" == typeof a.I)
                c = void 0;
            else if (da(a) || "string" === typeof a) {
                c = [];
                for (var d = a.length, e = 0; e < d; e++)
                    c.push(e);
            }
            else
                for (e in c = [], d = 0, a)
                    c[d++] = e;
            d = Fc(a);
            e = d.length;
            for (var f = 0; f < e; f++)
                b.call(void 0, d[f], c && c[f], a);
        } }
        function O(a, b) { this.b = {}; this.a = []; this.c = 0; var c = arguments.length; if (1 < c) {
            if (c % 2)
                throw Error("Uneven number of arguments");
            for (var d = 0; d < c; d += 2)
                this.set(arguments[d], arguments[d + 1]);
        }
        else if (a)
            if (a instanceof O)
                for (c = a.K(), d = 0; d < c.length; d++)
                    this.set(c[d], a.get(c[d]));
            else
                for (d in a)
                    this.set(d, a[d]); }
        g = O.prototype;
        g.I = function () { Hc(this); for (var a = [], b = 0; b < this.a.length; b++)
            a.push(this.b[this.a[b]]); return a; };
        g.K = function () { Hc(this); return this.a.concat(); };
        function Hc(a) { if (a.c != a.a.length) {
            for (var b = 0, c = 0; b < a.a.length;) {
                var d = a.a[b];
                P(a.b, d) && (a.a[c++] = d);
                b++;
            }
            a.a.length = c;
        } if (a.c != a.a.length) {
            var e = {};
            for (c = b = 0; b < a.a.length;)
                d = a.a[b], P(e, d) || (a.a[c++] = d, e[d] = 1), b++;
            a.a.length = c;
        } }
        g.get = function (a, b) { return P(this.b, a) ? this.b[a] : b; };
        g.set = function (a, b) { P(this.b, a) || (this.c++, this.a.push(a)); this.b[a] = b; };
        g.forEach = function (a, b) { for (var c = this.K(), d = 0; d < c.length; d++) {
            var e = c[d], f = this.get(e);
            a.call(b, f, e, this);
        } };
        function P(a, b) { return Object.prototype.hasOwnProperty.call(a, b); }
        var Ic = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;
        function Jc(a, b) { if (a) {
            a = a.split("&");
            for (var c = 0; c < a.length; c++) {
                var d = a[c].indexOf("="), e = null;
                if (0 <= d) {
                    var f = a[c].substring(0, d);
                    e = a[c].substring(d + 1);
                }
                else
                    f = a[c];
                b(f, e ? decodeURIComponent(e.replace(/\+/g, " ")) : "");
            }
        } }
        function Q(a, b) { this.c = this.j = this.f = ""; this.h = null; this.i = this.g = ""; this.a = !1; if (a instanceof Q) {
            this.a = void 0 !== b ? b : a.a;
            Kc(this, a.f);
            this.j = a.j;
            Lc(this, a.c);
            Mc(this, a.h);
            this.g = a.g;
            b = a.b;
            var c = new R;
            c.c = b.c;
            b.a && (c.a = new O(b.a), c.b = b.b);
            Nc(this, c);
            this.i = a.i;
        }
        else
            a && (c = String(a).match(Ic)) ? (this.a = !!b, Kc(this, c[1] || "", !0), this.j = S(c[2] || ""), Lc(this, c[3] || "", !0), Mc(this, c[4]), this.g = S(c[5] || "", !0), Nc(this, c[6] || "", !0), this.i = S(c[7] || "")) : (this.a = !!b, this.b = new R(null, this.a)); }
        Q.prototype.toString = function () { var a = [], b = this.f; b && a.push(T(b, Oc, !0), ":"); var c = this.c; if (c || "file" == b)
            a.push("//"), (b = this.j) && a.push(T(b, Oc, !0), "@"), a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")), c = this.h, null != c && a.push(":", String(c)); if (c = this.g)
            this.c && "/" != c.charAt(0) && a.push("/"), a.push(T(c, "/" == c.charAt(0) ? Pc : Qc, !0)); (c = this.b.toString()) && a.push("?", c); (c = this.i) && a.push("#", T(c, Rc)); return a.join(""); };
        function I(a) { return new Q(a); }
        function Kc(a, b, c) { a.f = c ? S(b, !0) : b; a.f && (a.f = a.f.replace(/:$/, "")); }
        function Lc(a, b, c) { a.c = c ? S(b, !0) : b; }
        function Mc(a, b) { if (b) {
            b = Number(b);
            if (isNaN(b) || 0 > b)
                throw Error("Bad port number " + b);
            a.h = b;
        }
        else
            a.h = null; }
        function Nc(a, b, c) { b instanceof R ? (a.b = b, Sc(a.b, a.a)) : (c || (b = T(b, Tc)), a.b = new R(b, a.a)); }
        function N(a, b, c) { a.b.set(b, c); }
        function ic(a) { N(a, "zx", Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ q()).toString(36)); return a; }
        function Uc(a) { return a instanceof Q ? I(a) : new Q(a, void 0); }
        function Vc(a, b, c, d) { var e = new Q(null, void 0); a && Kc(e, a); b && Lc(e, b); c && Mc(e, c); d && (e.g = d); return e; }
        function S(a, b) { return a ? b ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a) : ""; }
        function T(a, b, c) { return "string" === typeof a ? (a = encodeURI(a).replace(b, Wc), c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), a) : null; }
        function Wc(a) { a = a.charCodeAt(0); return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16); }
        var Oc = /[#\/\?@]/g, Qc = /[#\?:]/g, Pc = /[#\?]/g, Tc = /[#\?@]/g, Rc = /#/g;
        function R(a, b) { this.b = this.a = null; this.c = a || null; this.f = !!b; }
        function U(a) { a.a || (a.a = new O, a.b = 0, a.c && Jc(a.c, function (b, c) { a.add(decodeURIComponent(b.replace(/\+/g, " ")), c); })); }
        g = R.prototype;
        g.add = function (a, b) { U(this); this.c = null; a = V(this, a); var c = this.a.get(a); c || this.a.set(a, c = []); c.push(b); this.b += 1; return this; };
        function Xc(a, b) { U(a); b = V(a, b); P(a.a.b, b) && (a.c = null, a.b -= a.a.get(b).length, a = a.a, P(a.b, b) && (delete a.b[b], a.c--, a.a.length > 2 * a.c && Hc(a))); }
        function Yc(a, b) { U(a); b = V(a, b); return P(a.a.b, b); }
        g.forEach = function (a, b) { U(this); this.a.forEach(function (c, d) { oa(c, function (e) { a.call(b, e, d, this); }, this); }, this); };
        g.K = function () { U(this); for (var a = this.a.I(), b = this.a.K(), c = [], d = 0; d < b.length; d++)
            for (var e = a[d], f = 0; f < e.length; f++)
                c.push(b[d]); return c; };
        g.I = function (a) { U(this); var b = []; if ("string" === typeof a)
            Yc(this, a) && (b = ra(b, this.a.get(V(this, a))));
        else {
            a = this.a.I();
            for (var c = 0; c < a.length; c++)
                b = ra(b, a[c]);
        } return b; };
        g.set = function (a, b) { U(this); this.c = null; a = V(this, a); Yc(this, a) && (this.b -= this.a.get(a).length); this.a.set(a, [b]); this.b += 1; return this; };
        g.get = function (a, b) { if (!a)
            return b; a = this.I(a); return 0 < a.length ? String(a[0]) : b; };
        function kc(a, b, c) { Xc(a, b); 0 < c.length && (a.c = null, a.a.set(V(a, b), sa(c)), a.b += c.length); }
        g.toString = function () { if (this.c)
            return this.c; if (!this.a)
            return ""; for (var a = [], b = this.a.K(), c = 0; c < b.length; c++) {
            var d = b[c], e = encodeURIComponent(String(d));
            d = this.I(d);
            for (var f = 0; f < d.length; f++) {
                var h = e;
                "" !== d[f] && (h += "=" + encodeURIComponent(String(d[f])));
                a.push(h);
            }
        } return this.c = a.join("&"); };
        function V(a, b) { b = String(b); a.f && (b = b.toLowerCase()); return b; }
        function Sc(a, b) { b && !a.f && (U(a), a.c = null, a.a.forEach(function (c, d) { var e = d.toLowerCase(); d != e && (Xc(this, d), kc(this, e, c)); }, a)); a.f = b; }
        function Zc(a, b) { this.b = a; this.a = b; }
        function $c(a) { this.g = a || ad; k.PerformanceNavigationTiming ? (a = k.performance.getEntriesByType("navigation"), a = 0 < a.length && ("hq" == a[0].nextHopProtocol || "h2" == a[0].nextHopProtocol)) : a = !!(k.ca && k.ca.ua && k.ca.ua() && k.ca.ua().mb); this.f = a ? this.g : 1; this.a = null; 1 < this.f && (this.a = new Set); this.b = null; this.c = []; }
        var ad = 10;
        function bd(a) { return a.b ? !0 : a.a ? a.a.size >= a.f : !1; }
        function yc(a) { return a.b ? 1 : a.a ? a.a.size : 0; }
        function vc(a, b) { return a.b ? a.b == b : a.a ? a.a.has(b) : !1; }
        function zc(a, b) { a.a ? a.a.add(b) : a.b = b; }
        function Bc(a, b) { a.b && a.b == b ? a.b = null : a.a && a.a.has(b) && a.a.delete(b); }
        $c.prototype.cancel = function () {
            var e_1, _a;
            this.c = cd(this);
            if (this.b)
                this.b.cancel(), this.b = null;
            else if (this.a && 0 !== this.a.size) {
                try {
                    for (var _b = __values(this.a.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var a = _c.value;
                        a.cancel();
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                this.a.clear();
            }
        };
        function cd(a) {
            var e_2, _a;
            if (null != a.b)
                return a.c.concat(a.b.i);
            if (null != a.a && 0 !== a.a.size) {
                var b = a.c;
                try {
                    for (var _b = __values(a.a.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var c = _c.value;
                        b = b.concat(c.i);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                return b;
            }
            return sa(a.c);
        }
        function dd() { }
        dd.prototype.stringify = function (a) { return k.JSON.stringify(a, void 0); };
        dd.prototype.parse = function (a) { return k.JSON.parse(a, void 0); };
        function ed() { this.a = new dd; }
        function fd(a, b, c) { var d = c || ""; try {
            Gc(a, function (e, f) { var h = e; m(e) && (h = vb(e)); b.push(d + f + "=" + encodeURIComponent(h)); });
        }
        catch (e) {
            throw b.push(d + "type=" + encodeURIComponent("_badmap")), e;
        } }
        function gd(a, b) { var c = new Pb; if (k.Image) {
            var d = new Image;
            d.onload = ka(hd, c, d, "TestLoadImage: loaded", !0, b);
            d.onerror = ka(hd, c, d, "TestLoadImage: error", !1, b);
            d.onabort = ka(hd, c, d, "TestLoadImage: abort", !1, b);
            d.ontimeout = ka(hd, c, d, "TestLoadImage: timeout", !1, b);
            k.setTimeout(function () { if (d.ontimeout)
                d.ontimeout(); }, 1E4);
            d.src = a;
        }
        else
            b(!1); }
        function hd(a, b, c, d, e) { try {
            b.onload = null, b.onerror = null, b.onabort = null, b.ontimeout = null, e(d);
        }
        catch (f) { } }
        var id = k.JSON.parse;
        function W(a) { B.call(this); this.headers = new O; this.G = a || null; this.b = !1; this.s = this.a = null; this.D = ""; this.h = 0; this.f = ""; this.g = this.w = this.l = this.v = !1; this.o = 0; this.m = null; this.H = jd; this.B = this.F = !1; }
        r(W, B);
        var jd = "", kd = /^https?$/i, ld = ["POST", "PUT"];
        g = W.prototype;
        g.$ = function (a, b, c, d) {
            if (this.a)
                throw Error("[goog.net.XhrIo] Object is active with another request=" + this.D + "; newUri=" + a);
            b = b ? b.toUpperCase() : "GET";
            this.D = a;
            this.f = "";
            this.h = 0;
            this.v = !1;
            this.b = !0;
            this.a = new XMLHttpRequest;
            this.s = this.G ? Zb(this.G) : Zb(cc);
            this.a.onreadystatechange = n(this.va, this);
            try {
                this.w = !0, this.a.open(b, String(a), !0), this.w = !1;
            }
            catch (f) {
                md(this, f);
                return;
            }
            a = c || "";
            var e = new O(this.headers);
            d && Gc(d, function (f, h) { e.set(h, f); });
            d = pa(e.K());
            c = k.FormData && a instanceof k.FormData;
            !(0 <=
                na(ld, b)) || d || c || e.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
            e.forEach(function (f, h) { this.a.setRequestHeader(h, f); }, this);
            this.H && (this.a.responseType = this.H);
            "withCredentials" in this.a && this.a.withCredentials !== this.F && (this.a.withCredentials = this.F);
            try {
                nd(this), 0 < this.o && ((this.B = od(this.a)) ? (this.a.timeout = this.o, this.a.ontimeout = n(this.ta, this)) : this.m = Jb(this.ta, this.o, this)), this.l = !0, this.a.send(a), this.l = !1;
            }
            catch (f) {
                md(this, f);
            }
        };
        function od(a) { return w && Sa(9) && "number" === typeof a.timeout && void 0 !== a.ontimeout; }
        function qa(a) { return "content-type" == a.toLowerCase(); }
        g.ta = function () { "undefined" != typeof goog && this.a && (this.f = "Timed out after " + this.o + "ms, aborting", this.h = 8, this.dispatchEvent("timeout"), this.abort(8)); };
        function md(a, b) { a.b = !1; a.a && (a.g = !0, a.a.abort(), a.g = !1); a.f = b; a.h = 5; pd(a); qd(a); }
        function pd(a) { a.v || (a.v = !0, a.dispatchEvent("complete"), a.dispatchEvent("error")); }
        g.abort = function (a) { this.a && this.b && (this.b = !1, this.g = !0, this.a.abort(), this.g = !1, this.h = a || 7, this.dispatchEvent("complete"), this.dispatchEvent("abort"), qd(this)); };
        g.C = function () { this.a && (this.b && (this.b = !1, this.g = !0, this.a.abort(), this.g = !1), qd(this, !0)); W.M.C.call(this); };
        g.va = function () { this.j || (this.w || this.l || this.g ? rd(this) : this.Oa()); };
        g.Oa = function () { rd(this); };
        function rd(a) {
            if (a.b && "undefined" != typeof goog && (!a.s[1] || 4 != K(a) || 2 != a.S()))
                if (a.l && 4 == K(a))
                    Jb(a.va, 0, a);
                else if (a.dispatchEvent("readystatechange"), 4 == K(a)) {
                    a.b = !1;
                    try {
                        var b = a.S();
                        a: switch (b) {
                            case 200:
                            case 201:
                            case 202:
                            case 204:
                            case 206:
                            case 304:
                            case 1223:
                                var c = !0;
                                break a;
                            default: c = !1;
                        }
                        var d;
                        if (!(d = c)) {
                            var e;
                            if (e = 0 === b) {
                                var f = String(a.D).match(Ic)[1] || null;
                                if (!f && k.self && k.self.location) {
                                    var h = k.self.location.protocol;
                                    f = h.substr(0, h.length - 1);
                                }
                                e = !kd.test(f ? f.toLowerCase() : "");
                            }
                            d = e;
                        }
                        if (d)
                            a.dispatchEvent("complete"),
                                a.dispatchEvent("success");
                        else {
                            a.h = 6;
                            try {
                                var l = 2 < K(a) ? a.a.statusText : "";
                            }
                            catch (p) {
                                l = "";
                            }
                            a.f = l + " [" + a.S() + "]";
                            pd(a);
                        }
                    }
                    finally {
                        qd(a);
                    }
                }
        }
        function qd(a, b) { if (a.a) {
            nd(a);
            var c = a.a, d = a.s[0] ? aa : null;
            a.a = null;
            a.s = null;
            b || a.dispatchEvent("ready");
            try {
                c.onreadystatechange = d;
            }
            catch (e) { }
        } }
        function nd(a) { a.a && a.B && (a.a.ontimeout = null); a.m && (k.clearTimeout(a.m), a.m = null); }
        function K(a) { return a.a ? a.a.readyState : 0; }
        g.S = function () { try {
            return 2 < K(this) ? this.a.status : -1;
        }
        catch (a) {
            return -1;
        } };
        g.Y = function () { try {
            return this.a ? this.a.responseText : "";
        }
        catch (a) {
            return "";
        } };
        g.Ja = function (a) { if (this.a) {
            var b = this.a.responseText;
            a && 0 == b.indexOf(a) && (b = b.substring(a.length));
            return id(b);
        } };
        g.qa = function () { return this.h; };
        g.Ma = function () { return "string" === typeof this.f ? this.f : String(this.f); };
        function sd(a) { var b = ""; Ba(a, function (c, d) { b += d; b += ":"; b += c; b += "\r\n"; }); return b; }
        function td(a, b, c) { a: {
            for (d in c) {
                var d = !1;
                break a;
            }
            d = !0;
        } d || (c = sd(c), "string" === typeof a ? (null != c && encodeURIComponent(String(c))) : N(a, b, c)); }
        function X(a, b, c) { return c && c.internalChannelParams ? c.internalChannelParams[a] || b : b; }
        function ud(a) {
            this.f = [];
            this.R = this.ea = this.v = this.P = this.a = this.ha = this.s = this.N = this.h = this.F = this.j = null;
            this.Fa = this.H = 0;
            this.Ca = X("failFast", !1, a);
            this.U = this.l = this.i = this.g = this.c = null;
            this.W = !0;
            this.A = this.ia = this.G = -1;
            this.J = this.m = this.o = 0;
            this.Ba = X("baseRetryDelayMs", 5E3, a);
            this.Ga = X("retryDelaySeedMs", 1E4, a);
            this.Da = X("forwardChannelMaxRetries", 2, a);
            this.ga = X("forwardChannelRequestTimeoutMs", 2E4, a);
            this.Ea = a && a.nb || void 0;
            this.D = void 0;
            this.w = a && a.supportsCrossDomainXhr || !1;
            this.B = "";
            this.b = new $c(a && a.concurrentRequestLimit);
            this.ja = new ed;
            this.fa = a && a.fastHandshake || !1;
            a && a.forceLongPolling && (this.W = !1);
            this.O = void 0;
        }
        g = ud.prototype;
        g.oa = 8;
        g.u = 1;
        function Ec(a) { vd(a); if (3 == a.u) {
            var b = a.H++, c = I(a.v);
            N(c, "SID", a.B);
            N(c, "RID", b);
            N(c, "TYPE", "terminate");
            wd(a, c);
            b = new H(a, b, void 0);
            b.B = 2;
            b.f = ic(I(c));
            c = !1;
            k.navigator && k.navigator.sendBeacon && (c = k.navigator.sendBeacon(b.f.toString(), ""));
            !c && k.Image && ((new Image).src = b.f, c = !0);
            c || (b.a = lc(b.g, null), b.a.$(b.f));
            b.s = q();
            J(b);
        } xd(a); }
        function vd(a) { a.a && (a.a.cancel(), a.a = null); a.i && (k.clearTimeout(a.i), a.i = null); wc(a); a.b.cancel(); a.g && ("number" === typeof a.g && k.clearTimeout(a.g), a.g = null); }
        function yd(a, b) { a.f.push(new Zc(a.Fa++, b)); 3 == a.u && Dc(a); }
        function Dc(a) { bd(a.b) || a.g || (a.g = !0, Cb(a.xa, a), a.o = 0); }
        function zd(a, b) { if (yc(a.b) >= a.b.f - (a.g ? 1 : 0))
            return !1; if (a.g)
            return a.f = b.i.concat(a.f), !0; if (1 == a.u || 2 == a.u || a.o >= (a.Ca ? 0 : a.Da))
            return !1; a.g = Vb(n(a.xa, a, b), Ad(a, a.o)); a.o++; return !0; }
        g.xa = function (a) {
            if (this.g)
                if (this.g = null, 1 == this.u) {
                    if (!a) {
                        this.H = Math.floor(1E5 * Math.random());
                        a = this.H++;
                        var b = new H(this, a, void 0), c = this.j;
                        this.F && (c ? (c = Ca(c), Ea(c, this.F)) : c = this.F);
                        null === this.h && (b.m = c);
                        var d;
                        if (this.fa)
                            a: {
                                for (var e = d = 0; e < this.f.length; e++) {
                                    b: {
                                        var f = this.f[e];
                                        if ("__data__" in f.a && (f = f.a.__data__, "string" === typeof f)) {
                                            f = f.length;
                                            break b;
                                        }
                                        f = void 0;
                                    }
                                    if (void 0 === f)
                                        break;
                                    d += f;
                                    if (4096 < d) {
                                        d = e;
                                        break a;
                                    }
                                    if (4096 === d || e === this.f.length - 1) {
                                        d = e + 1;
                                        break a;
                                    }
                                }
                                d = 1E3;
                            }
                        else
                            d = 1E3;
                        d = Bd(this, b, d);
                        e = I(this.v);
                        N(e, "RID", a);
                        N(e, "CVER", 22);
                        this.s && N(e, "X-HTTP-Session-Id", this.s);
                        wd(this, e);
                        this.h && c && td(e, this.h, c);
                        zc(this.b, b);
                        this.fa ? (N(e, "$req", d), N(e, "SID", "null"), b.R = !0, hc(b, e, null)) : hc(b, e, d);
                        this.u = 2;
                    }
                }
                else
                    3 == this.u && (a ? Cd(this, a) : 0 == this.f.length || bd(this.b) || Cd(this));
        };
        function Cd(a, b) { var c; b ? c = b.W : c = a.H++; var d = I(a.v); N(d, "SID", a.B); N(d, "RID", c); N(d, "AID", a.G); wd(a, d); a.h && a.j && td(d, a.h, a.j); c = new H(a, c, a.o + 1); null === a.h && (c.m = a.j); b && (a.f = b.i.concat(a.f)); b = Bd(a, c, 1E3); c.setTimeout(Math.round(.5 * a.ga) + Math.round(.5 * a.ga * Math.random())); zc(a.b, c); hc(c, d, b); }
        function wd(a, b) { a.c && Gc({}, function (c, d) { N(b, d, c); }); }
        function Bd(a, b, c) { c = Math.min(a.f.length, c); var d = a.c ? n(a.c.Ha, a.c, a) : null; a: for (var e = a.f, f = -1;;) {
            var h = ["count=" + c];
            -1 == f ? 0 < c ? (f = e[0].b, h.push("ofs=" + f)) : f = 0 : h.push("ofs=" + f);
            for (var l = !0, p = 0; p < c; p++) {
                var D = e[p].b, z = e[p].a;
                D -= f;
                if (0 > D)
                    f = Math.max(0, e[p].b - 100), l = !1;
                else
                    try {
                        fd(z, h, "req" + D + "_");
                    }
                    catch (ta) {
                        d && d(z);
                    }
            }
            if (l) {
                d = h.join("&");
                break a;
            }
        } a = a.f.splice(0, c); b.i = a; return d; }
        function Cc(a) { a.a || a.i || (a.J = 1, Cb(a.wa, a), a.m = 0); }
        function xc(a) { if (a.a || a.i || 3 <= a.m)
            return !1; a.J++; a.i = Vb(n(a.wa, a), Ad(a, a.m)); a.m++; return !0; }
        g.wa = function () { this.i = null; this.a = new H(this, "rpc", this.J); null === this.h && (this.a.m = this.j); this.a.J = 0; var a = I(this.ea); N(a, "RID", "rpc"); N(a, "SID", this.B); N(a, "CI", this.U ? "0" : "1"); N(a, "AID", this.G); wd(this, a); N(a, "TYPE", "xmlhttp"); this.h && this.j && td(a, this.h, this.j); this.D && this.a.setTimeout(this.D); var b = this.a, c = this.R; b.B = 1; b.f = ic(I(a)); b.j = null; b.F = !0; jc(b, c); };
        g.Na = function () { null != this.l && (this.l = null, this.a.cancel(), this.a = null, xc(this), F(19)); };
        function wc(a) { null != a.l && (k.clearTimeout(a.l), a.l = null); }
        function rc(a, b) { var c = null; if (a.a == b) {
            wc(a);
            a.a = null;
            var d = 2;
        }
        else if (vc(a.b, b))
            c = b.i, Bc(a.b, b), d = 1;
        else
            return; a.A = b.H; if (0 != a.u)
            if (b.b)
                if (1 == d) {
                    c = b.j ? b.j.length : 0;
                    b = q() - b.s;
                    var e = a.o;
                    d = Rb();
                    d.dispatchEvent(new Ub(d, c, b, e));
                    Dc(a);
                }
                else
                    Cc(a);
            else if (e = b.c, 3 == e || 0 == e && 0 < a.A || !(1 == d && zd(a, b) || 2 == d && xc(a)))
                switch (c && 0 < c.length && (b = a.b, b.c = b.c.concat(c)), e) {
                    case 1:
                        M(a, 5);
                        break;
                    case 4:
                        M(a, 10);
                        break;
                    case 3:
                        M(a, 6);
                        break;
                    default: M(a, 2);
                } }
        function Ad(a, b) { var c = a.Ba + Math.floor(Math.random() * a.Ga); a.c || (c *= 2); return c * b; }
        function M(a, b) { if (2 == b) {
            var c = null;
            a.c && (c = null);
            var d = n(a.Ta, a);
            c || (c = new Q("//www.google.com/images/cleardot.gif"), k.location && "http" == k.location.protocol || Kc(c, "https"), ic(c));
            gd(c.toString(), d);
        }
        else
            F(2); a.u = 0; a.c && a.c.la(b); xd(a); vd(a); }
        g.Ta = function (a) { a ? F(2) : F(1); };
        function xd(a) { a.u = 0; a.A = -1; if (a.c) {
            if (0 != cd(a.b).length || 0 != a.f.length)
                a.b.c.length = 0, sa(a.f), a.f.length = 0;
            a.c.ka();
        } }
        function Ac(a, b, c) { var d = Uc(c); if ("" != d.c)
            b && Lc(d, b + "." + d.c), Mc(d, d.h);
        else {
            var e = k.location;
            d = Vc(e.protocol, b ? b + "." + e.hostname : e.hostname, +e.port, c);
        } a.N && Ba(a.N, function (f, h) { N(d, h, f); }); b = a.s; c = a.ha; b && c && N(d, b, c); N(d, "VER", a.oa); wd(a, d); return d; }
        function lc(a, b) { if (b && !a.w)
            throw Error("Can't create secondary domain capable XhrIo object."); b = new W(a.Ea); b.F = a.w; return b; }
        function Dd() { }
        g = Dd.prototype;
        g.na = function () { };
        g.ma = function () { };
        g.la = function () { };
        g.ka = function () { };
        g.Ha = function () { };
        function Ed() { if (w && !(10 <= Number(Va)))
            throw Error("Environmental error: no available transport."); }
        Ed.prototype.a = function (a, b) { return new Y(a, b); };
        function Y(a, b) {
            B.call(this);
            this.a = new ud(b);
            this.l = a;
            this.b = b && b.messageUrlParams || null;
            a = b && b.messageHeaders || null;
            b && b.clientProtocolHeaderRequired && (a ? a["X-Client-Protocol"] = "webchannel" : a = { "X-Client-Protocol": "webchannel" });
            this.a.j = a;
            a = b && b.initMessageHeaders || null;
            b && b.messageContentType && (a ? a["X-WebChannel-Content-Type"] = b.messageContentType : a = { "X-WebChannel-Content-Type": b.messageContentType });
            b && b.pa && (a ? a["X-WebChannel-Client-Profile"] = b.pa : a = { "X-WebChannel-Client-Profile": b.pa });
            this.a.F =
                a;
            (a = b && b.httpHeadersOverwriteParam) && !wa(a) && (this.a.h = a);
            this.h = b && b.supportsCrossDomainXhr || !1;
            this.g = b && b.sendRawJson || !1;
            (b = b && b.httpSessionIdParam) && !wa(b) && (this.a.s = b, a = this.b, null !== a && b in a && (a = this.b, b in a && delete a[b]));
            this.f = new Z(this);
        }
        r(Y, B);
        g = Y.prototype;
        g.addEventListener = function (a, b, c, d) { Y.M.addEventListener.call(this, a, b, c, d); };
        g.removeEventListener = function (a, b, c, d) { Y.M.removeEventListener.call(this, a, b, c, d); };
        g.Ka = function () { this.a.c = this.f; this.h && (this.a.w = !0); var a = this.a, b = this.l, c = this.b || void 0; F(0); a.P = b; a.N = c || {}; a.U = a.W; a.v = Ac(a, null, a.P); Dc(a); };
        g.close = function () { Ec(this.a); };
        g.La = function (a) { if ("string" === typeof a) {
            var b = {};
            b.__data__ = a;
            yd(this.a, b);
        }
        else
            this.g ? (b = {}, b.__data__ = vb(a), yd(this.a, b)) : yd(this.a, a); };
        g.C = function () { this.a.c = null; delete this.f; Ec(this.a); delete this.a; Y.M.C.call(this); };
        function Fd(a) { ac.call(this); var b = a.__sm__; if (b) {
            a: {
                for (var c in b) {
                    a = c;
                    break a;
                }
                a = void 0;
            }
            (this.c = a) ? (a = this.c, this.data = null !== b && a in b ? b[a] : void 0) : this.data = b;
        }
        else
            this.data = a; }
        r(Fd, ac);
        function Gd() { bc.call(this); this.status = 1; }
        r(Gd, bc);
        function Z(a) { this.a = a; }
        r(Z, Dd);
        Z.prototype.na = function () { this.a.dispatchEvent("a"); };
        Z.prototype.ma = function (a) { this.a.dispatchEvent(new Fd(a)); };
        Z.prototype.la = function (a) { this.a.dispatchEvent(new Gd(a)); };
        Z.prototype.ka = function () { this.a.dispatchEvent("b"); }; /*
        
         Copyright 2017 Google Inc.
        
         Licensed under the Apache License, Version 2.0 (the "License");
         you may not use this file except in compliance with the License.
         You may obtain a copy of the License at
        
           http://www.apache.org/licenses/LICENSE-2.0
        
         Unless required by applicable law or agreed to in writing, software
         distributed under the License is distributed on an "AS IS" BASIS,
         WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         See the License for the specific language governing permissions and
         limitations under the License.
        */
        Ed.prototype.createWebChannel = Ed.prototype.a;
        Y.prototype.send = Y.prototype.La;
        Y.prototype.open = Y.prototype.Ka;
        Y.prototype.close = Y.prototype.close;
        Wb.NO_ERROR = 0;
        Wb.TIMEOUT = 8;
        Wb.HTTP_ERROR = 6;
        Xb.COMPLETE = "complete";
        $b.EventType = G;
        G.OPEN = "a";
        G.CLOSE = "b";
        G.ERROR = "c";
        G.MESSAGE = "d";
        B.prototype.listen = B.prototype.ra;
        W.prototype.listenOnce = W.prototype.sa;
        W.prototype.getLastError = W.prototype.Ma;
        W.prototype.getLastErrorCode = W.prototype.qa;
        W.prototype.getStatus = W.prototype.S;
        W.prototype.getResponseJson = W.prototype.Ja;
        W.prototype.getResponseText = W.prototype.Y;
        W.prototype.send = W.prototype.$;
        module.exports = { createWebChannelTransport: function () { return new Ed; }, ErrorCode: Wb, EventType: Xb, WebChannel: $b, XhrIo: W };
    }).apply(typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {});
    
});
var cjs_1 = cjs.createWebChannelTransport;
var cjs_2 = cjs.ErrorCode;
var cjs_3 = cjs.EventType;
var cjs_4 = cjs.WebChannel;
var cjs_5 = cjs.XhrIo;

exports.ErrorCode = cjs_2;
exports.EventType = cjs_3;
exports.WebChannel = cjs_4;
exports.XhrIo = cjs_5;
exports.createWebChannelTransport = cjs_1;
exports.default = cjs;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],7:[function(require,module,exports){
(function (global){
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

/* global global, define, System, Reflect, Promise */
var __extends;
var __assign;
var __rest;
var __decorate;
var __param;
var __metadata;
var __awaiter;
var __generator;
var __exportStar;
var __values;
var __read;
var __spread;
var __spreadArrays;
var __await;
var __asyncGenerator;
var __asyncDelegator;
var __asyncValues;
var __makeTemplateObject;
var __importStar;
var __importDefault;
var __classPrivateFieldGet;
var __classPrivateFieldSet;
var __createBinding;
(function (factory) {
    var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
    if (typeof define === "function" && define.amd) {
        define("tslib", ["exports"], function (exports) { factory(createExporter(root, createExporter(exports))); });
    }
    else if (typeof module === "object" && typeof module.exports === "object") {
        factory(createExporter(root, createExporter(module.exports)));
    }
    else {
        factory(createExporter(root));
    }
    function createExporter(exports, previous) {
        if (exports !== root) {
            if (typeof Object.create === "function") {
                Object.defineProperty(exports, "__esModule", { value: true });
            }
            else {
                exports.__esModule = true;
            }
        }
        return function (id, v) { return exports[id] = previous ? previous(id, v) : v; };
    }
})
(function (exporter) {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

    __extends = function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };

    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };

    __rest = function (s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    };

    __decorate = function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };

    __param = function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };

    __metadata = function (metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    };

    __awaiter = function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };

    __generator = function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };

    __createBinding = function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    };

    __exportStar = function (m, exports) {
        for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
    };

    __values = function (o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };

    __read = function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };

    __spread = function () {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    };

    __spreadArrays = function () {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    __await = function (v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    };

    __asyncGenerator = function (thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);  }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    };

    __asyncDelegator = function (o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    };

    __asyncValues = function (o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    };

    __makeTemplateObject = function (cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    __importStar = function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result["default"] = mod;
        return result;
    };

    __importDefault = function (mod) {
        return (mod && mod.__esModule) ? mod : { "default": mod };
    };

    __classPrivateFieldGet = function (receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    };

    __classPrivateFieldSet = function (receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    };

    exporter("__extends", __extends);
    exporter("__assign", __assign);
    exporter("__rest", __rest);
    exporter("__decorate", __decorate);
    exporter("__param", __param);
    exporter("__metadata", __metadata);
    exporter("__awaiter", __awaiter);
    exporter("__generator", __generator);
    exporter("__exportStar", __exportStar);
    exporter("__createBinding", __createBinding);
    exporter("__values", __values);
    exporter("__read", __read);
    exporter("__spread", __spread);
    exporter("__spreadArrays", __spreadArrays);
    exporter("__await", __await);
    exporter("__asyncGenerator", __asyncGenerator);
    exporter("__asyncDelegator", __asyncDelegator);
    exporter("__asyncValues", __asyncValues);
    exporter("__makeTemplateObject", __makeTemplateObject);
    exporter("__importStar", __importStar);
    exporter("__importDefault", __importDefault);
    exporter("__classPrivateFieldGet", __classPrivateFieldGet);
    exporter("__classPrivateFieldSet", __classPrivateFieldSet);
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],8:[function(require,module,exports){
// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Initialize Firebase and its related product we use using the provided
// Firebase project configuation.
// import firebase from '@firebase/app'
// import '@firebase/firestore';
const firebase = require('@firebase/app');
require('@firebase/firestore');

// TO USE THE EMULATOR:
// - Set USE_EMULATOR to true
// - Change FIREBASE_EMULATOR_PORT to a desired port where the firestore db
//   emulator should run on when you run firebase emulators:start.
const USE_EMULATOR = true;
const FIREBASE_EMULATOR_PORT = 8000;

const RUN_LOCALLY = USE_EMULATOR &&
    (typeof window === 'undefined' || location.hostname === 'localhost' ||
     location.hostname === '');
const PROJECT_ID = 'step53-2020';

let firebaseConfig;
if (RUN_LOCALLY) {
  firebaseConfig = {
    projectId: PROJECT_ID,
  };
} else {
  firebaseConfig = {
    apiKey: 'AIzaSyAAJgRhJY_rRn_q_On1HdA3hx15YHSkEJg',
    authDomain: 'step53-2020.firebaseapp.com',
    databaseURL: 'https://step53-2020.firebaseio.com',
    projectId: PROJECT_ID,
    storageBucket: 'step53-2020.appspot.com',
    messagingSenderId: '905834221913',
    appId: '1:905834221913:web:25e711f1132b2c0537fc48',
    measurementId: 'G-PLVY991DHW'
  };
}
const app = firebase.default.initializeApp(firebaseConfig);
const db = app.firestore();

if (RUN_LOCALLY) {
  db.settings({host: 'localhost:' + FIREBASE_EMULATOR_PORT, ssl: false});
}

},{"@firebase/app":1,"@firebase/firestore":3}]},{},[8]);
