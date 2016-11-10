import React from 'react';
import $ from 'jquery'
import Notifications from './Notifications';
import MediaTable from './MediaDataTable';
import MediaForm from './MediaForm';
import Paginator from './Paginator';



module.exports = React.createClass({
    
    propTypes: {
        urls: React.PropTypes.object,
        dataset: React.PropTypes.arrayOf(React.PropTypes.object),
        onMount: React.PropTypes.func
    },
    
    getDefaultProps: function() {
        return {
            dataset: [],
            onMount: function() {}
        };
    },
    getInitialState: function () {
        return {
            pageNum:  this.props.dataset.number || 1,
            resultsPerPage: this.props.dataset.size || 0,
            totalPages: this.props.dataset.totalPages -1 || 0,
            dataset: this.props.dataset.content || [],
            action: "",
            formBanner: null,
            selectedRowId: ''
        };
    },

    componentDidMount() {
        var self = this;
        $.ajax({
            url: self.props.urls.list,
            type: "GET",
            dataType: 'json',
            success: function (data) {
                self._onChange(data);
            },
            error: function (jqXhr, textStatus, exception) {
                console.log("ERROR");
            },
            complete: function() {
                self.props.onMount();
            }
        });
    },
    
    _onChange: function(dataset) {
        this.setState( {
            pageNum:  dataset.number || 1,
            resultsPerPage: dataset.size || 0,
            totalPages: dataset.totalPages -1 || 0,
            dataset: dataset.content || [],
            formBanner: null
        });
    },

    _renderBanners: function() {
        var formBanner = "";
        
        if(this.state.formBanner!==null) {
            formBanner = <Notifications.Banner {...this.state.formBanner} />
        }
        
        if(formBanner ==="") {
            return "";
        }

        return (
                <div className="notification-container">
                    {formBanner}
                </div>
        );
    },
    
    _onAdd: function() {
        this.setState({action: "add",  formBanner: null});
    },
    
    _onCancelEdit: function() {
        this.setState({action: ""});
    },
    
    _onEditError: function(data) {
        /**
        var notification = {
            type: "error",
            title: data.message || "An Unexpected Error has occurred",
            errors: data.validationErrors || []
        };
        
        this._setNotification(notification);   
        
        **/
    },
    
    _onEditComplete: function(data) {
        var prevSelectedRowId = this.state.selectedRowId;
        
        this.setState({
            dataset: this.state.dataset.concat(data.result),
            formBanner: {
                title: data.message || "File Added Successfully",
                type: "success"
            },
            action: "",
            selectedRowId: data.result.id
        });
    },

    _renderForm: function() {
        if(this.state.action==='add') {
            return <MediaForm action={this.props.urls.add}  onCancel={this._onCancelEdit} onSuccess={this._onEditComplete} onError={this._onEditError} />;
        }

        return "";
    },
 
    _renderToolbar: function() {
        return (
                <div className="toolbar clearfix">
                    <button onClick={this._onAdd} type="button" className="btn btn-default">Add File</button>
                </div>  
        );
    },
    
    _renderDataTable: function() {
        return (
            <MediaTable selectedRowId={this.state.selectedRowId} dataset={this.state.dataset} />
        );
    },
    
    _renderPaginator: function() {
        if(this.props.paginate==='no' || this.state.dataset.length ===0) {
            return "";
        }
        
        return (
                <div className="paginator">
                    <Paginator.Paginate pageNumber={this.state.pageNum} totalPages={this.state.totalPages} url={this.props.urls.list} onChange={this._onChange}/>
		</div>         
        );
    },
    
    render: function () {
        return (
            <div>
                {this._renderToolbar()} 
                {this._renderBanners()} 
                {this._renderForm()} 
                <div className="panel panel-default"> 
                    <div className="panel-heading">
                        <h4>{this.props.title}</h4>
                    </div>
                    <div className="panel-body content_to-load">
                        {this._renderDataTable()}    
                    </div>
                    <div className="panel-footer">
                        {this._renderPaginator()}
                    </div>
                </div>
            </div>
        );
    }
});
