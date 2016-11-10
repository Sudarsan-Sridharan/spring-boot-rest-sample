import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import MediaView from './components/MediaView';
import Loaders from './components/Loader';

(function($) {
    
    function App() {
        
        function init() {
           initPage();
          
        }

        function initPage() {
          
            var pageLoader = new Loaders.PageLoader();
            pageLoader.show();
            var pageLoaded = function() { pageLoader.hide();};

            var page = $("body").attr("id");
            if(page === 'file-manager') {
                initFileManager(pageLoaded);
            }
        }

        function initFileManager(pageReady) {
            var dataset = [];
            var urls = {
                list: '/api/files',
                add: '/api/files'
            };
            
            ReactDOM.render(<MediaView onMount={pageReady} title="Media Files" dataset={dataset} urls={urls} />, document.getElementById('file-manager_view'));
        }

        init();
    }
    
    new App();
}($));