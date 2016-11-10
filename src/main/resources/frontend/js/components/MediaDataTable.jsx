var React = require('react');
var ReactDom  = require('react-dom');
var $ = require('jquery');


module.exports = React.createClass({
    
    propTypes: {
        dataset: React.PropTypes.arrayOf(React.PropTypes.object),
        selectedRowId: React.PropTypes.any,
    },

    getDefaultProps: function() {
        return {
            dataset: [],
            selectedRowId: ''
        };
    },
    getInitialState: function () {
        return {
            prevSelectedRowId: ''
        };
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({prevSelectedRowId: this.props.selectedRowId});
    },

    componentDidUpdate(prevProps) {
        if (this.props.selectedRowId  && this.props.selectedRowId !== this.state.prevSelectedRowId) {
            this._scrollToItem();
        }
    },
   
    _scrollToItem: function() {
        var dataTable = this.refs.datatable;
   
        var selRow = this.refs.selectedRow;
        
        if (selRow) {
            var rowNode = ReactDom.findDOMNode(selRow);
            if (dataTable && rowNode) {
                var offset = $(rowNode).offset(); 
                $('html, body').animate({
                    scrollTop: offset.top,
                    scrollLeft: offset.left
		});  
            }
        }
    },
    
    
    _renderHeader: function() {
        return (
                <thead>
                    <tr>
                        <th>Date Created</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Download Link</th>
                    </tr>
                </thead>
        );
    },
    
    _renderBody: function() {
        var self = this;
        
        if(this.props.dataset.length===0) {
            return (
                    <tbody>
                         <tr><td colSpan="4" >No Files Avaliable</td></tr>
                    </tbody>
            );
        }
        
        var rows = this.props.dataset.map(function(file, index) {
            var selected = file.id === self.props.selectedRowId;
            var ref = selected ? "selectedRow" : "";
            
            return (
                    <tr ref={ref} key={"tr_" + file.id}>
                        <td>{file.creationDate}</td>
                        <td>{file.title}</td>
                        <td>{file.description}</td>
                        <td><a href={"/files/" + file.reference}>Download</a></td>
                    </tr>  
            ); 
        });
        
        return (
            <tbody>
                {rows}
            </tbody>
        );
    },
    
    render: function () {
        return (
            <table ref="datatable" className="table table-striped"> 
                {this._renderHeader()}
                {this._renderBody()}
            </table>
        );
    }
});
