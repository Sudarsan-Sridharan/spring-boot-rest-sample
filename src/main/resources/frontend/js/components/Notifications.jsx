import React from 'react';
import $ from 'jquery'


module.exports.Banner = React.createClass({
    propTypes: {
        title: React.PropTypes.string,
        type: React.PropTypes.oneOf(['error', "success"]),
        messages: React.PropTypes.array,
        errors: React.PropTypes.object
    },
    
    getDefaultProps: function() {
        return {
            title: '',
            type: 'error',
            messages: [],
            errors: {}
        };
    },
    
    
    _getClassName: function() {
        if(this.props.type==='success') {
            return "notification-block notification-block-success";
        }
        else if(this.props.type==='error') {
            return "notification-block notification-block-error";
        }
        else {
            return "notification-block";
        }
    },
    
    _renderBody: function() {
        if(this.props.messages.length ===0 && this.props.errors.length ===0 ) {
            return;
        }
        
        var messages = this.props.messages.map(function(message, index) {
            return <li key={"message_" + i}>{message}</li>;
        });
        
        var errors = [];
        
        $.each(this.props.errors, function(field_name, error){
            errors.push(<li key={"error_" + field_name}><span className="notify-label">{error.label}</span>: <span className="notify-message">{error.errors.join()}</span></li>);
	});
        

        return (
                <ul>
                    {messages}
                    {errors}
                </ul>
        );
    },

    render: function () {
        return (
                <div className={this._getClassName()}>
                    <div className="inner">
                        <h3><span className="message-text">{this.props.title}</span></h3>
                        {this._renderBody()}
                    </div>
                </div>
        );
    }
});

