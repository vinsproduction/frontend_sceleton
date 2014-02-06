/* Prototype Model*/

var Models, PrototypeModel, User, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

PrototypeModel = (function() {
  function PrototypeModel() {
    this.fish = window.location.host === "" || /localhost/.test(window.location.host);
  }

  PrototypeModel.prototype.getFish = function(url, data, res, callback) {
    var json, obj, response;
    json = JSON.stringify(res);
    obj = $.parseJSON(json);
    response = obj.data || [];
    console.warn('[WARNING Api FISH!]', url, '| request:', data, '| response:', response);
    return callback(response);
  };

  return PrototypeModel;

})();

/* Models*/


User = (function(_super) {
  __extends(User, _super);

  function User() {
    _ref = User.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  return User;

})(PrototypeModel);

/* ============ Объявляем классы! ===========*/


Models = (function() {
  function Models() {
    this.user = new User;
  }

  return Models;

})();

/* Prototype View*/

var IndexView, PrototypeView, Views, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

PrototypeView = (function() {
  PrototypeView.prototype.render_debug = true;

  function PrototypeView() {
    var _this = this;
    this.varconstants = {};
    this.doResize();
    $(window).resize(function() {
      return _this.doResize();
    });
    this.init();
  }

  PrototypeView.prototype.generateRenders = function(template) {
    var _this = this;
    if (template == null) {
      template = this.template;
    }
    _.each(template, function(val, key) {
      if (!_this.templateSourse) {
        _this.templateSourse = {};
      }
      _this.templateSourse[key] = $.trim(val.html());
      if (!_this.render) {
        _this.render = {};
      }
      _this.render[key] = function() {
        return _this.doRender(key, _this.template[key], _this.templateSourse[key]);
      };
      if (!_this.preRender) {
        _this.preRender = {};
      }
      return _this.preRender[key] = function(options) {
        if (options == null) {
          options = {};
        }
        return _this.doPreRender(key, _this.template[key], options);
      };
    });
    return this.renderAll = function(options) {
      return _.each(template, function(val, key) {
        return _this.render[key]();
      });
    };
  };

  PrototypeView.prototype.doPreRender = function(templateName, $el, options) {
    var color, error, height, loadtext, margin, width;
    try {
      color = options && options.c ? options.c : "#000";
      loadtext = options && options.t ? options.t : false;
      width = options && options.w ? parseInt(options.w) + "px" : "auto";
      height = options && options.h ? parseInt(options.h) + "px" : "100px";
      margin = options && options.m ? parseInt(options.m) + "px" : (parseInt(height) / 2 - 10) + "px";
      if (this.render_debug) {
        console.log("[preRender " + templateName + "] loadtext:", loadtext);
      }
      if (loadtext) {
        return $el.html("<div class=\"prerender\" style=\"position:relative;height:" + height + ";width:" + width + ";text-align:center;\">\n	<p style=\"position: relative; top:" + margin + "; color:" + color + "\">" + loadtext + "</p>\n</div>");
      } else {
        return $el.empty();
      }
    } catch (_error) {
      error = _error;
      console.error('[preRender] template undefined');
      return console.error(error);
    }
  };

  PrototypeView.prototype.doRender = function(templateName, $el, sourse, vars) {
    if (vars == null) {
      vars = this.vars;
    }
    if (this.render_debug) {
      console.log("[Render " + templateName + "]", '| @vars:', vars);
    }
    return $el.removeAttr('style').html(Mustache.to_html(sourse, vars));
  };

  PrototypeView.prototype.doResize = function(callback) {
    var footerH, headerH, sectionsH;
    this.sections = {
      el: $('body > main > .sections')
    };
    headerH = parseInt($('body > main > header').height());
    footerH = parseInt($('body > main > footer').height());
    sectionsH = parseInt($('body > main > .sections').height());
    app.debugBox.log("sect", "header: " + headerH + "px | sections: " + sectionsH + "px | footer: " + footerH + "px");
    app.debugBox.log("res", "" + ($(window).width()) + "px x " + ($(window).height()) + "px");
    return this.resize();
  };

  PrototypeView.prototype.resize = function() {};

  PrototypeView.prototype.init = function() {};

  PrototypeView.prototype.controller = function(opt) {
    this.opt = opt != null ? opt : {};
  };

  PrototypeView.prototype.actions = function() {};

  return PrototypeView;

})();

/* Views*/


IndexView = (function(_super) {
  __extends(IndexView, _super);

  function IndexView() {
    _ref = IndexView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  return IndexView;

})(PrototypeView);

/* ============ Объявляем классы! ===========*/


Views = (function() {
  function Views() {
    this.index = new IndexView;
  }

  return Views;

})();

/* Router*/

var Router, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Router = (function(_super) {
  __extends(Router, _super);

  function Router() {
    _ref = Router.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  /* маршруты*/


  Router.prototype.routes = {
    "": "index",
    "!": "index",
    "!/": "index",
    "!/page/:id": "page",
    "!/page/:id/": "page",
    "!/ooops": "ooops",
    "!/ooops/": "ooops",
    "*path": "notFound"
  };

  /* инициализация*/


  Router.prototype.initialize = function() {
    var _this = this;
    this.bind("all", function(route, router) {});
    if (typeof VK !== "undefined" && VK !== null) {
      return VK.init(function() {
        /* следить за изменениями хеша вконтакте*/

        VK.addCallback('onLocationChanged', function(location) {
          console.debug('[VKONTAKTE > onLocationChanged]', location);
          return app.redirect(location.replace("!", ""));
        });
        /* следить за скроллом*/

        VK.callMethod('scrollSubscribe', true);
        /* событие после скролла*/

        return VK.addCallback('onScroll', function(scroll, heigh) {
          return console.log('[VKONTAKTE > onScroll]', scroll, heigh);
        });
      });
    }
  };

  /* до перехода*/


  Router.prototype.before = function(route) {
    if (route !== '') {
      console.debug('[Route]', route);
    }
    if (typeof VK !== "undefined" && VK !== null) {
      /* выставить хеш*/

      return VK.callMethod('setLocation', route);
    }
  };

  /* после перехода*/


  Router.prototype.after = function() {};

  Router.prototype.scrollTop = function(speed) {
    if (speed == null) {
      speed = 400;
    }
    if (speed) {
      $('html,body').animate({
        scrollTop: 0
      }, speed);
      if (typeof VK !== "undefined" && VK !== null) {
        return VK.callMethod('scrollWindow', 0, speed);
      }
    } else {
      $('body').scrollTop(0);
      if (typeof VK !== "undefined" && VK !== null) {
        return VK.callMethod('scrollWindow', 0);
      }
    }
  };

  Router.prototype.resize = function(el) {
    if (typeof VK !== "undefined" && VK !== null) {
      /* ресайз окна Вконтакте*/

      return window.onload = function() {
        return setTimeout(function() {
          var diff, elH, h;
          diff = 530;
          elH = $(el).height();
          h = elH + diff;
          console.debug("[VKONTAKTE > resizeWindow] '" + el + "' height:", h, '| elHeight:', elH, '| diff:', diff);
          return VK.callMethod("resizeWindow", 1000, h);
        }, 1000);
      };
    }
  };

  /*  404 страница*/


  Router.prototype.notFound = function(path) {
    var el;
    el = $('section#notFound');
    this.scrollTop();
    el.show();
    return this.resize(el);
  };

  /* Серверная ошибка*/


  Router.prototype.ooops = function() {
    var el;
    el = $('section#notFound');
    this.scrollTop();
    el.show();
    return this.resize(el);
  };

  Router.prototype.index = function() {
    var el;
    el = $('section#index');
    this.scrollTop();
    el.show();
    return this.resize(el);
  };

  Router.prototype.page = function(id) {
    var el;
    el = $('section#page');
    this.scrollTop();
    el.show();
    return this.resize(el);
  };

  return Router;

})(Backbone.Router);

var App,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

App = (function() {
  function App() {
    /* Имя проекта*/

    var livereloadPort,
      _this = this;
    this.name = 'Frontend Skeleton';
    /* Хеш навигация в проекте*/

    this.hashNavigate = false;
    /* Если хоста нет, значит - локальный просмотр!*/

    this.localhost = window.location.host === "" || /localhost/.test(window.location.host);
    /* Если localhost - проставляем настоящий хост*/

    this.host = this.localhost ? "http://vinsproduction.com" : "http://" + window.location.host;
    /* Путь до картинок и прочей статики*/

    this.root = "";
    /* Возвращает параметры дебага, напр. ?debug=test -> вернет test*/

    this.debug = (function() {
      var debug;
      debug = $$.urlParam('debug');
      if (debug) {
        return debug.split(',');
      } else {
        return [];
      }
    })();
    /* Только для локальной разработки!*/

    if (!$$.browser.msie && this.localhost) {
      livereloadPort = 777;
      $$.includeJS("http://localhost:" + livereloadPort + "/livereload.js");
      console.debug("[Livereload] http://localhost:" + livereloadPort + "/livereload.js");
    }
    /* Если Ie!*/

    if ($$.browser.msie6 || $$.browser.msie7) {
      return;
    }
    /* Настройки библиотек*/

    this.libs();
  }

  /* основная инизиализация*/


  App.prototype.init = function() {
    var _this = this;
    return $(function() {
      /* Дебагер*/

      if (__indexOf.call(_this.debug, 'box') >= 0) {
        _this.debugBox.init();
      }
      /* модели/api*/

      if (Models) {
        _this.models = new Models;
      }
      /* контроллеры/рендеры*/

      if (Views) {
        _this.views = new Views;
      }
      /* Роутер/хеш навигация*/

      if (_this.hashNavigate) {
        _this.router = new Router;
        Backbone.history.start();
      }
      /* Настройки соцсетей*/

      _this.social.init();
      return console.debug('[App::init] debug:', _this.debug, _this);
    });
  };

  /* Hash навигация*/


  App.prototype.redirect = function(page) {
    if (page == null) {
      page = "";
    }
    if (window.location.hash === "#!" + page) {
      return window.location.reload();
    } else {
      return this.router.navigate("!" + page, true);
    }
  };

  /* @API
  	Пример запроса: app.api.request 'user/details', 'GET', {}, (res) =>
  		if res.error
  				return app.errors.popup res.error
  			else
  				console.log res
  */


  /* API pefix, например номер версии серверного api /api/v1/*/


  App.prototype.api_prefix = "";

  App.prototype.api = function(url, type, data, callback) {
    var _this = this;
    if (type == null) {
      type = "GET";
    }
    if (data == null) {
      data = {};
    }
    url = app.host + this.api_prefix + url;
    return $.ajax({
      type: type,
      url: url,
      data: data
    }).done(function(res) {
      var response;
      response = $$.browser.msie ? JSON.stringify(res) : res;
      if (res.status === 'success') {
        if (!res.data) {
          res.data = [];
        }
        console.debug("[Api] " + url + " | " + type + ":", data, "| success: ", response);
        if (callback) {
          return callback(res.data);
        }
      } else if (res.status === 'error') {
        console.error("[Api] " + url + " | " + type + ":", data, "| error: ", response);
        if (callback) {
          return callback({
            error: res.error
          });
        }
      }
    }).fail(function(res) {
      var response;
      response = $$.browser.msie ? JSON.stringify(res) : res;
      console.error("[Api] " + url + " | " + type + ":", data, "| fail: ", response);
      if (res.readyState === 4 && res.status === 404) {
        /* запрос в никуда*/

        if (_this.hashNavigate) {
          return app.redirect('/404');
        }
      } else {
        /* серверная ошибка*/

        if (_this.hashNavigate) {
          return app.redirect('/ooops');
        }
      }
    });
  };

  /* Debug monitor*/


  App.prototype.debugBox = {
    init: function() {
      return $('body').append("<div id=\"debugBox\" style=\"font-size: 14px;background: rgba(0,0,0,0.6);position:fixed;z-index:10000; right:5px; bottom:5px;color:white; padding: 10px;\">\n	debug box\n	<pre class=\"res\">resolution: <span></span></pre>\n	<div class=\"sect\"></div>\n	<div class=\"log\"></div>\n	<pre class=\"mediaHeight\" style=\"color:red;\"></pre>\n	<pre class=\"mediaWidth\" style=\"color:red;\"></pre>\n</div>");
    },
    color: function() {
      return $('#debugBox').find(".log pre:nth-child(2n)").css({
        color: 'gray'
      });
    },
    log: function(place, log) {
      if (place === 'log') {
        $('#debugBox .log').append("<pre>" + log + "</pre>");
      } else if (place === 'sect') {
        $('#debugBox .sect').html("<pre>" + log + "</pre>");
      } else if (place === 'res') {
        $('#debugBox .res span').html("" + log);
      }
      return app.debugBox.color();
    }
  };

  /* Всякие библиотеки для общего пользования*/


  App.prototype.libs = function() {
    /* Крайне важная штука для ajax запросов в рамках разных доменов, в IE!*/

    jQuery.support.cors = true;
    return jQuery.ajaxSetup({
      cache: false,
      crossDomain: true
    });
  };

  /* Социальные настройки*/


  App.prototype.social = {
    defaults: {
      vkontakteApiId: '',
      facebookApiId: '',
      odnoklassnikiApiId: ''
    },
    init: function() {
      return app.social.url = this.host;
    },
    /* Пост на стенку в соц. сети*/

    wallPost: {
      vkontakte: function(options) {
        if (options == null) {
          options = {};
        }
        if (typeof VK === "undefined" || VK === null) {
          return console.warn('[App > social > wallPost] VK is not defined');
        }
        /*
        				в attachments должна быть только 1 ссылка! Если надо прекрепить фото, 
        				оно должно быть залито в сам ВКонтакте
        */

        return VK.api("wall.post", {
          owner_id: options.owner_id,
          message: options.message,
          attachments: "photo131380871_321439116,http://vk.com/app4132371_1748598"
        }, function(r) {
          if (!r || r.error) {
            console.error('[VKONTAKTE > wall.post]', r);
            if (options.error) {
              options.error(r.error);
            }
            if (popup && r.error && r.error.error_msg && r.error.error_code) {
              if (r.error.error_code === 214) {
                app.errors.popup("Стенка закрыта", false);
              }
            }
          } else {
            console.debug('[VKONTAKTE > wall.post] success');
            if (options.success) {
              options.success();
            }
          }
          if (options.allways) {
            return options.allways();
          }
        });
      },
      facebook: function(options) {
        if (options == null) {
          options = {};
        }
        if (typeof FB === "undefined" || FB === null) {
          return console.warn('[FB > social > wallPost] FB is not defined');
        }
        return FB.ui({
          to: options.to,
          method: "feed",
          link: options.link || app.social.url,
          picture: options.picture || "",
          name: options.name || "",
          description: options.description || "",
          caption: options.caption || ""
        }, function(r) {
          if (!r) {
            console.error('[socWallPost Facebook] error', r);
            if (options.error) {
              options.error();
            }
          } else {
            console.debug('[socWallPost Facebook] success');
            if (options.success) {
              options.success();
            }
          }
          if (options.allways) {
            return options.allways();
          }
        });
      },
      odnoklassniki: function(options) {
        var url;
        if (options == null) {
          options = {};
        }
        url = options.url || app.social.url;
        return window.open("http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1&st._surl=" + encodeURIComponent(url) + "&st.comments=" + encodeURIComponent(options.comments), "", "toolbar=0,status=0,width=626,height=436");
      }
    },
    /* Шаринг в сосетях*/

    share: {
      /* 
      			просто хелпер для всего приложения для навешивания на ссылки, например:
      			app.social.share.it()
      */

      itVk: function() {
        var options;
        options = {};
        options.title = "Выигрывай призы вместе с подругой!";
        options.description = "Clean&Clear дарит подарки тем, кто умеет по-настоящему дружить! Расскажи историю о том, как вы с подружкой преодолеваете сложности, добавь вашу совместную фотку и подключи к голосованию всех знакомых. Каждый голос – шаг к победе!";
        options.url = "http://vk.com/app4132371_1748598";
        return options.image = "" + app.host + "/img/for_post.png";
      },
      vkontakte: function(options) {
        var url;
        if (options == null) {
          options = {};
        }
        options.url = options.url || app.social.url;
        url = "http://vkontakte.ru/share.php?";
        url += "url=" + encodeURIComponent(options.url);
        url += "&title=" + encodeURIComponent(options.title);
        url += "&description=" + encodeURIComponent(options.description);
        url += "&image=" + encodeURIComponent(options.image);
        url += "&noparse=true";
        return this.popup(url);
      },
      odnoklassniki: function(options) {
        var url;
        if (options == null) {
          options = {};
        }
        options.url = options.url || app.social.url;
        url = "http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1";
        url += "&st.comments=" + encodeURIComponent(options.description);
        url += "&st._surl=" + encodeURIComponent(options.url);
        return this.popup(url);
      },
      facebook: function(options) {
        var url;
        if (options == null) {
          options = {};
        }
        options.url = options.url || app.social.url;
        url = "http://www.facebook.com/sharer.php?s=100";
        url += "&p[title]=" + encodeURIComponent(options.title);
        url += "&p[summary]=" + encodeURIComponent(options.description);
        url += "&p[url]=" + encodeURIComponent(options.url);
        url += "&p[images][0]=" + encodeURIComponent(options.image);
        return this.popup(url);
      },
      twitter: function(options) {
        var url;
        if (options == null) {
          options = {};
        }
        options.url = options.url || app.social.url;
        url = "http://twitter.com/share?";
        url += "text=" + encodeURIComponent(options.title);
        url += "&url=" + encodeURIComponent(options.url);
        url += "&counturl=" + encodeURIComponent(options.url);
        return this.popup(url);
      },
      mailru: function(options) {
        var url;
        if (options == null) {
          options = {};
        }
        options.url = options.url || app.social.url;
        url = "http://connect.mail.ru/share?";
        url += "url=" + encodeURIComponent(options.url);
        url += "&title=" + encodeURIComponent(options.title);
        url += "&description=" + encodeURIComponent(options.description);
        url += "&imageurl=" + encodeURIComponent(options.image);
        return this.popup(url);
      },
      popup: function(url) {
        return window.open(url, "", "toolbar=0,status=0,width=626,height=436");
      }
    }
  };

  App.prototype.errors = {
    popup: function(error, ru) {
      var text;
      if (ru == null) {
        ru = true;
      }
      text = ru ? this.get(error) : error;
      return popup.custom('Ошибка!', text);
    },
    get: function(error) {
      var list,
        _this = this;
      if ($$.isObject(error)) {
        list = "";
        _.each(error, function(text) {
          text = _this.rus[text] || text;
          return list += text + "<br/><br/>";
        });
      } else {
        list = this.rus[error];
      }
      return list || "Неизвестная ошибка";
    },
    /* Русификатор*/

    rus: {
      "Story doesn't exist": "Истории не существует",
      "User is not authenticated": "Юзер не авторизован"
    }
  };

  return App;

})();
