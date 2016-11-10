import React from 'react';
import $ from 'jquery';

import Loaders from './Loader';

module.exports.Paginate = React.createClass({
    propTypes: {
        paginate: React.PropTypes.oneOf(['client', "sever"]),
        url: React.PropTypes.string,
        model: React.PropTypes.object,
        cssClass: React.PropTypes.string,
        pageParamName: React.PropTypes.string,
        pageNumber: React.PropTypes.number,
        totalPages: React.PropTypes.number,
        totalResults: React.PropTypes.number,
        onChange: React.PropTypes.func,
        onError: React.PropTypes.func,
        loader: React.PropTypes.object
    },

    getDefaultProps: function () {
        return {
            paginate: "client",
            pageParamName: "page",
            cssClass: 'paginator',
            url: '/',
            totalPages: 0,
            pageNumber: 0,
            loader: new Loaders.ContainerLoader({}),
            onError: function (data, exception) {

            },
            onChange: function (data) {

            }
        };
    },
    getInitialState: function () {
        var state = {};

        return state;
    },

    _createPageRange: function (from, to) {
        var rangeLength = to - from;
        var range = new Array(rangeLength);

        for (var i = 0; i < range.length; i++) {
            range[i] = from;
            from++;
        }

        return range;

    },

    _createUrl: function (url, pn, pnParam) {
        var queryStr = url;
        var queryStringNoParams = queryStr.indexOf("?") === -1

        if (queryStr.indexOf(pnParam + "=") === -1) {
            if (queryStringNoParams) {
                queryStr += "?" + pnParam + "=" + pn + "";
            } else {
                queryStr += "&" + pnParam + "=" + pn + "";
            }
        } else {
            queryStr = queryStr.replace(new RegExp(pnParam + "=\\d+"), pnParam + "=" + pn);
        }

        return queryStr;
    },

    _handleClick: function (url) {
        var self = this;

        return function (e) {
            if (!this.props.paginate === 'client') {
                return false;
            }

            e.preventDefault();
            var inProgress = false;

            $.ajax({
                url: url,
                type: "GET",
                dataType: 'json',
                success: function (data) {
                    self.props.onChange(data);
                },
                beforeSend: function (jqXhr, settings) {
                    if (inProgress) {
                        return;
                    }
                    self.props.loader.show();
                    inProgress = true;

                },
                error: function (jqXhr, textStatus, exception) {
                    
                },
                complete: function (jqXhr, textStatus) {
                    self.props.loader.hide();
                    inProgress = false;
                }
            });

        }.bind(this);

    },

    _renderControls: function () {
        var self = this;
        var pageNum = parseInt(this.props.pageNumber);
        
 
        var numPages = parseInt(this.props.totalPages);
        var paginationRequired = numPages > 1;
        var pageRange = [];
        var ON_EACH_SIDE = 10;
        var ON_ENDS = 10;
        var DOT = '.';
        var url = this.props.url;

        if (numPages <= 10) {
            pageRange = this._createPageRange(0, numPages);
        } else {
            //Insert "smart" pagination links, so that there are always ON_ENDS
            //links at either end of the list of pages, and there are always
            //ON_EACH_SIDE links at either end of the "current page" link.
            pageRange = [];
            if (pageNum > (ON_EACH_SIDE + ON_ENDS)) {
                pageRange = pageRange.concat(this._createPageRange(0, ON_EACH_SIDE - 1));
                pageRange = pageRange.concat(new Array(DOT));
                pageRange = pageRange.concat(this._createPageRange(pageNum - ON_EACH_SIDE, pageNum + 1));
            } else {
                pageRange = pageRange.concat(this._createPageRange(0, pageNum + 1));
            }
            if (pageNum < (numPages - ON_EACH_SIDE - ON_ENDS - 1)) {
                pageRange = pageRange.concat(this._createPageRange(pageNum + 1, pageNum + ON_EACH_SIDE + 1));
                pageRange = pageRange.concat(new Array(DOT));
                pageRange = pageRange.concat(this._createPageRange(numPages - ON_ENDS, numPages));
            } else {
                pageRange = pageRange.concat(this._createPageRange(pageNum + 1, numPages));
            }
        }


        return pageRange.map(function (item, index) {

            if (item === DOT) {
                return <span key="page-dot" className="separtor"> ...</span>
            }

            pageNum = pageRange[index] + 1;
            if (index === self.props.pageNumber - 1 || self.props.totalPages<=1) {
                return <span key={"page-" + pageNum} className="currentStep">{pageNum}</span>;
            } else {
                var url = self._createUrl(self.props.url, pageNum, self.props.pageParamName);
                return <a key={"page-" + pageNum} onClick={self._handleClick(url)} href={url}>{pageNum}</a>;
              
            }
        });
    },

    render: function () {
        return (
                <div className={this.props.cssClass}>
                    {this._renderControls()}
                </div>
     );
    }
});

