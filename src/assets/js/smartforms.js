var smartforms = { api: {} };
smartforms.api.viewer = function (params) {
    return _loader("view", params)
}
smartforms.api.designer = function (params) {
    return _loader("designer", params)
}

smartforms.api.print = function (params) {
    return _loader("print", params)
}

_loader = function (mode, params) {

    var iframe = document.createElement("iframe");
    var uid = new Date().getTime();
    iframe.style.border = "none";
    iframe.style.width = params.width ? params.width : "100%";
    iframe.style.minHeight = "600px";
    iframe.style.height = params.height ? params.height : "100%";
    iframe.src = (params.url ? params.url : "http://test.smartforms.online/") + (mode !== "designer" ? `view?mode=${mode}&uid=` : "designer?uid=") + uid;
    iframe.addEventListener('load', function () {
        if (params.theme) {
            iframe.contentWindow.postMessage({ action: 'theme', theme: params.theme }, '*');
        }
    });
    var target = document.getElementById(params.target);
    if (target) {
        target.appendChild(iframe);
        window.addEventListener("message", function (e) {
            if (!e.data || !e.data.action || e.data.uid != uid)
                return;
            var action = e.data.action;
            var reqId = e.data.reqId;
            var options = e.data.data ? JSON.parse(e.data.data) : {};
            switch (action) {
                case "getModel":
                    _getModel();
                    break;
                case "load":
                    _getSchema(options.id);
                    break;
                case "save":
                    _saveSchema(options);
                    break;
                case "getList":
                    if (options.name == "ds-list") {
                        _getDSNames();
                    }
                    else {
                        _getDSItems(options.name, options.params);
                    }
                    break;
                case "getWidgetList":
                    _getWidgetList();
                    break;
                case "getFormList":
                    _getFormList();
                    break;
                case "submit":
                    _submit();
                    break;
                case "sync":
                    _sync(options);
                    break;
                case "readProps":
                    _readProps(options);
                    break;
                case "print":
                    _print();
                    break;
                case "resolveUrl":
                    _resolveUrl(options);
                    break;
                case "uploadFile":
                    _uploadFile(options);
                    break;
                case "callEvent":
                    _callEvent();
                    break;  
                default:
                    break;
            }

            function _sendMessage(action, data) {
                iframe.contentWindow.postMessage({
                    uid: uid,
                    action: action,
                    data: data ? JSON.stringify(data) : null,
                    reqId: reqId
                }, "*")
            }

            function _submit() {
                if (params.submit) {
                    var callback = {};
                    callback.data = options.data;
                    callback.html = options.html;
                    callback.resolve = function () {
                        _sendMessage("submit");
                    };
                    params.submit(callback)
                }
                else {
                    _sendMessage("submit")
                }
            }

            function _callEvent()
            {
                if (params.callEvent) {
                    var callback = {};
                    callback.config = options.config;
                    callback.eventName = options.eventName;
                    callback.value = options.value;
                    callback.resolve = function () {
                        _sendMessage("callEvent");
                    };
                    params.callEvent(callback)
                }
                else {
                    _sendMessage("callEvent")
                }
            }


            function _print() {
                if (params.print) {
                    var callback = {};
                    callback.data = options.data;
                    callback.resolve = function () {
                        _sendMessage("print");
                    };
                    params.print(callback)
                }
                else {
                    _sendMessage("print")
                }
            }




            function _getModel() {
                if (params.getModel) {
                    var callback = {};
                    callback.resolve = function (list) {
                        _sendMessage("getModel", list);
                    };
                    params.getModel(callback)
                }
                else {
                    _sendMessage("getModel", {})
                }
            }


            function _getSchema(id) {
                debugger;
                if (params.getSchema) {
                    var callback = { id: id };
                    callback.resolve = function (data) {
                        _sendMessage("load", {
                            widgets: data && data.template ? data.template : [],
                            name: data && data.name ? data.name : null
                        })
                    };
                    params.getSchema(callback)
                }
                else {
                    _sendMessage("load", {
                        widgets: []
                    })
                }

            }

            function _saveSchema(options) {
                if (params.saveSchema) {
                    var callback = {};
                    Object.assign(callback, options);
                    callback.resolve = function (widgets) {
                        _sendMessage("save")
                    };
                    params.saveSchema(callback)
                }
                else {
                    _sendMessage("save")
                }
            }

            function _getDSNames() {
                if (params.getDSNames) {
                    var callback = {};
                    callback.resolve = function (items) {
                        _sendMessage("getList", {
                            items: items
                        })
                    };
                    params.getDSNames(callback)
                }
                else {
                    _sendMessage("getList", {
                        items: []
                    })
                }
            }

            function _getDSItems(name, data) {
                if (params.getDSItems) {
                    var callback = {};
                    callback.name = name;
                    callback.params = data;
                    callback.resolve = function (items) {
                        _sendMessage("getList", {
                            items: items
                        })
                    };
                    params.getDSItems(callback)
                }
                else {
                    _sendMessage("getList", {
                        items: []
                    })
                }
            }

            function _getWidgetList(id) {
                if (params.getWidgetList) {
                    var callback = {};
                    callback.resolve = function (items) {
                        _sendMessage("getWidgetList", {
                            items: items
                        })
                    };
                    params.getWidgetList(callback)
                }
                else {
                    _sendMessage("getWidgetList", {
                        items: []
                    })
                }
            }

            function _getFormList() {
                if (params.getFormList) {
                    var callback = {};
                    callback.resolve = function (items) {
                        _sendMessage("getFormList", {
                            items: items
                        })
                    };
                    params.getFormList(callback)
                }
                else {
                    _sendMessage("getFormList", {
                        items: []
                    })
                }
            }

            function _sync(options) {
                if (options.height) {
                    iframe.style.height = (options.height) + "px";
                }
            }

            function _readProps(options) {
                if (params.readProps) {
                    var callback = {};
                    Object.assign(callback, options);
                    callback.resolve = function (list) {
                        _sendMessage("readProps", list);
                    };
                    params.readProps(callback)
                }
                else {
                    _sendMessage("readProps", {})
                }
            }

            function _resolveUrl(options) {
                if (params.resolveUrl) {
                    var callback = {};
                    Object.assign(callback, options);
                    callback.resolve = function (list) {
                        _sendMessage("resolveUrl", list);
                    };
                    params.resolveUrl(callback)
                }
                else {
                    _sendMessage("resolveUrl", {})
                }
            }

            function _uploadFile(options) {
                if (params.uploadFile) {
                    var callback = {};
                    Object.assign(callback, options);
                    callback.resolve = function (list) {
                        _sendMessage("uploadFile", list);
                    };
                    params.uploadFile(callback)
                }
                else {
                    _sendMessage("uploadFile", {})
                }
            }

        });

    }



    var call = function (action, data) {
        console.log("call");
        iframe.contentWindow.postMessage({
            uid: uid,
            action: action,
            data: data ? JSON.stringify(data) : null
        }, "*")
    }

    return {
        call: call
    }
}