import React from 'react';
import $ from 'jquery';
import jqueryForm from 'jquery-form';
import Notifications from './Notifications';
import Loaders from './Loader';


module.exports = React.createClass({
    
    propTypes: {
        action: React.PropTypes.string,
        show: React.PropTypes.bool,
        onCancel: React.PropTypes.func,
        onSuccess: React.PropTypes.func,
        loader: React.PropTypes.object
    },
    
    getDefaultProps: function() {
        return {
            action: '',
            show:  true,
            onCancel: function(e) {
                
            },
            onSuccess: function(data) {
                
            },
            loader: new Loaders.ContentLoading({containerSelector: '.panel-footer'}),
        };
    },
    
    getInitialState: function () {
        return {title: "", description: "", file: "", inProgress: false, errors: {}, banner: null};
    },
    

    _onChange: function (e) {
        var state = {};
        state[e.target.name] =  $.trim(e.target.value);
        this.setState(state);
    },
    
    
    _onCancel: function (e) {
        if(this.state.inProgress) {
            return false;
        }
       
        this.setState({
            errors: [],
            banner: null
        });
        
        this.props.onCancel(e);
    },
    
    _renderBanner: function() {
        if(this.state.banner===null) {
            return "";
        }
        
        return <Notifications.Banner {...this.state.banner} />
    },
    
    _onFormError: function(data) {
        var notification = {
            type: "error",
            title: data.message || "An Unexpected Error has occurred",
            errors: data.validationErrors || []
        };
        
        this.setState({
            errors: data.validationErrors || [],
            banner: notification
        });
    },
    
    _renderTitle: function() {
        return (
                <div className="panel-heading"><h4>Add File</h4></div>
        );
    },
    
    _formGroupClass: function(field) {
        var className = "form-group ";
        if(field) {
          className += " has-error";
        }
        return className;
    },
    
    _renderError: function(field) {
        if(field) {
            return <span className="help-block">{field.errors.join()}</span>;
        }
        
        return;
    },
        
    _renderBody: function() {
        return (
            <div className="panel-body">
                 <div className={this._formGroupClass(this.state.errors.title)}>
                    <label htmlFor="inputTitle">Title:</label>
                    <input type="text" name="title" ref="title" onChange={this._onChange} className="form-control" id="inputTitle" placeholder="Enter Title" />
                    {this._renderError(this.state.errors.title)}
                    <div className="help-block">Enter an optional title</div>
                 </div>
                 <div className={this._formGroupClass(this.state.errors.description)}>
                    <label htmlFor="inputDescription">Description:</label>
                    <textarea name="description" ref="description" onChange={this._onChange} className="form-control" rows="5" id="inputDescription" placeholder="Enter Description" ></textarea>
                    <div className="help-block">Enter an optional description</div>
                    {this._renderError(this.state.errors.description)}
                 </div>
                 <div className={this._formGroupClass(this.state.errors.file)}>
                    <label htmlFor="inputFile">Select File:</label>
                    <input ref="fileUpload" type="file" name="file"  id="inputFile"/>
                   {this._renderError(this.state.errors.file)} 
                 </div>
            </div>
        );
    },
    
    _renderFooter: function() {
        return (
                <div className="panel-footer">
                    <button type="submit" className="btn btn-default">Add</button>
                    <span> or </span>
                    <button onClick={this._onCancel} type="button" className="btn">Cancel</button>
                </div>
        );
    },
    
    handleSubmit: function(e) {
        var self = this;
        e.preventDefault();
        
        if(this.state.inProgress) {
            return false;
        }
        
        $(this.refs.form).ajaxSubmit({
            dataType: "json",
            beforeSubmit: function(arr, $form, options) { 
                if(self.refs.fileUpload.files.length ===0) {
                    self._onFormError({message: "Validation Failed",
                        validationErrors: {file: {label: "file", errors: ["Required"]}}});  
                    return false;
                }
                
                self.props.loader.show();
                self.setState({inProgress: true, errors: []});
                
                
                
            },
            success: function (data) {
                if (data.success) {
                    self.setState({inProgress: false});
                    self.props.onSuccess(data);
                    return;
                }   
            },
            error: function (xhr, status, error) {
                self.setState({inProgress: false});
                try {
                    var data = JSON.parse(xhr.responseText);
                    if (data && data.error && data.validationErrors) {
                         self._onFormError(data);
                    } else {
                        self._onFormError(data);
                    }
                }
                catch (e) {
                     self._onFormError(data);
                }
            },
            complete: function() {
                self.props.loader.hide();
            }
        });
        
    },
    
    render: function () {
        var style = {};
        
        if(!this.props.show) {style.display = 'none';}
        
        return (
                <div> 
                    {this._renderBanner()}
                    <div style={style} className="panel panel-default">
                        {this._renderTitle()}
                        <form ref="form" method="POST" action={this.props.action} onSubmit={this.handleSubmit}>
                            {this._renderBody()}
                            {this._renderFooter()}
                        </form>
                    </div>
                </div>
        );
    }
});
