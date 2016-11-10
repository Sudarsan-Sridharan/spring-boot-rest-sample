var $ = require('jquery');

(function ($) {
    
    function PageLoader(options) {
        var self = this;
        var loading = false;

        var defaultOptions = {
            contentSelector: '.screen_content',
            loadingSelector: '.screen_loading',
            containerSelector: 'body',
            inject: true
        };
       
        self.showHide = function (initCallback, doneCallback) {

            if (self.show()) {
                setTimeout(function () {
                    initCallback();

                    self.hide();

                    if (doneCallback) {
                        doneCallback();
                    }
                }, 500);

            }
        },
        
        self.show = function() {
            if(loading) {
                return false;
            }

            if (self.$screenContainer.length <= 0) {
                return false;
            }

            if (self.$screenLoading.length > 0) {
                var windowHeight = $(window).height();
		var screenTop = self.$screenContainer.offset().top;
		var documentHeight = Math.abs(windowHeight - screenTop);
                self.$screenLoading.css({ "height": documentHeight + "px" });
                self.$screenLoading.show();
                self.$screenContent.hide();
                loading = true;
            }
            
            
            return true;
        };
        
        self.hide = function() {
            self.$screenLoading.hide();
            self.$screenContent.show();
            
            loading = false;
        };
        
 
        function init(options) {
            self.options = $.extend(true, {}, defaultOptions, options);
            
            _injectLoader();
            self.$screenContainer =  $(self.options.containerSelector);
            self.$screenLoading = $(self.options.loadingSelector);
            self.$screenContent = $(self.options.contentSelector);
        }
        
        function _injectLoader() {
            if(!self.options.inject || 
                    $(self.options.loadingSelector).length > 0) {
                return;
            }
            
            var $body = $('body');
            
            if(!$body) {
                console.log("Error Page Body Element Not Found");
                return;
            }
            
            $body.append($('<div class="' + self.options.loadingSelector.replace(".", "") + '" style="display:none;"></div>'));
        }
       
       init(options);
    }
    
    
    function ContainerLoader(options) {
        var self = this;
        var loading = false;
        
        var defaultOptions = {
            contentSelector: '.content_to-load',
            loadingSelector: '.content_loading',
            containerSelector: 'body',
            injectPoint: "after",
            resize: true,
            inject: true
        };
        
        
        self.showHide = function (initCallback, doneCallback) {

            if (self.show()) {
                setTimeout(function () {
                    initCallback();

                    self.hide();

                    if (readyCallback) {
                        doneCallback();
                    }
                }, 500);

            }
        },
        
        self.show = function() {
            if(loading) {
                return;
            }
            
            _injectLoader();


            if (self.$screenContainer.length <= 0) {
                return false;
            }

            if (self.$screenLoading.length > 0) {
                var windowHeight = self.$screenContent.height();
		var screenTop = self.$screenContainer.offset().top;
		var documentHeight = Math.abs(windowHeight - screenTop);
                self.$screenLoading.css({ "height": documentHeight + "px" });
                self.$screenLoading.show();
                self.$screenContent.hide();
                loading = true;
            }
        };
        
        self.hide = function() {
            self.$screenLoading.hide();
            self.$screenContent.show();
            
            loading = false;
        };
        

        function init(options) {
            self.$screenLoading = [];
            self.options = $.extend(true, {}, defaultOptions, options);
            _injectLoader();
           
        }
        
        function _injectLoader() {
          
            if(self.$screenLoading.length > 0) {
                self.$screenLoading.remove();
                self.$screenLoading = [];
            }


            if(!self.$screenContainer || self.$screenContainer.length===0)  { self.$screenContainer = $(self.options.containerSelector);}
            
            if(!self.$screenContainer.length > 0) {
                return;
            }

            if(!self.$screenContent || self.$screenContent.length===0) { self.$screenContent = self.$screenContainer.find(self.options.contentSelector);}
       
            if(!self.options.inject || !self.$screenContainer || !self.$screenContent || 
                    self.$screenLoading.length > 0) {
                return;
            }
            
            if(self.options.injectPoint ==='after') {
                self.$screenLoading = $('<div class="' + self.options.loadingSelector.replace(".","") + '" style="display:none;"></div>');
                self.$screenContent.after(self.$screenLoading);
            }
        }
       
       init(options);
    }
    
    function ContentLoading(options) {
        var self = this;
        var loading = false;
        
        var defaultOptions = {
            containerSelector: 'body',
            loadingSelector: '.content_loader',
            inject: true
        };
        
        
        self.showHide = function (initCallback, doneCallback) {

            if (self.show()) {
                setTimeout(function () {
                    initCallback();

                    self.hide();

                    if (readyCallback) {
                        doneCallback();
                    }
                }, 500);

            }
        },
        
        self.show = function() {
            if(loading) {
                return;
            }
            
            _injectLoader();
            
            self.$screenContainer = $(self.options.containerSelector);
            

            if (self.$screenContainer.length <= 0) {
                return false;
            }
            
            self.$screenLoading = self.$screenContainer.find(self.options.loadingSelector);
            

            if (self.$screenLoading.length > 0) {
                self.$screenLoading.show();
                loading = true;
            }
        };
        
        self.hide = function() {
            self.$screenLoading.hide();
            loading = false;
        };
        
 
        function init(options) {
            self.$screenLoading = [];
            self.options = $.extend(true, {}, defaultOptions, options);
            _injectLoader();
           
        }
        
        function _injectLoader() {
            if(self.$screenLoading.length > 0) {
                self.$screenLoading.remove();
                self.$screenLoading = [];
            }
            
            self.$screenContainer = $(self.options.containerSelector);

            if(!self.$screenContainer || self.$screenContainer.length===0)  { self.$screenContainer = $(self.options.containerSelector);}
            
            if(!self.$screenContainer.length < 0) {
                return;
            }
            
            self.$screenLoading = self.$screenContainer.find(self.options.loadingSelector);
            
            
            
            if(!self.options.inject || !self.$screenContainer || 
                    self.$screenLoading.length > 0) {
                return;
            }
            
            self.$screenLoading = $('<div class="' + self.options.loadingSelector.replace(".","") + '" style="display:none;"></div>');
            self.$screenContainer.append(self.$screenLoading);
 
        }
       
       init(options);
    }
    
    module.exports.ContentLoading = ContentLoading;
    module.exports.ContainerLoader = ContainerLoader;
    module.exports.PageLoader = PageLoader;
}($));
