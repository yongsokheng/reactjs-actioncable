var MessageForm = React.createClass({
  getInitialState: function() {
    return {content: ""};
  },
  handleContentChange: function(e) {
    this.setState({content: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var content = this.state.content.trim();
    if (!content) {
      return;
    }
    this.props.onMessageSubmit({content: content});
    this.setState({content: ""});
  },
  render: function() {
    return(
      <div>
        <form className="message" onSubmit={this.handleSubmit}>
          <input type="text" name="content" placeholder="Chat here ..." onChange={this.handleContentChange}/>
          <input type="submit" value="Send" />
        </form>
      </div>
    )
  }
});

var MessageList = React.createClass({
  render: function() {
    var messages = this.props.messages.map(function(message) {
      return(
        <li key={message.id}>{message.content}</li>
      )
    });
    return(
      <ul>{messages}</ul>
    )
  }
});

var MessageBox = React.createClass({
  loadMessages: function() {
    $.ajax({
      url: "/messages",
      dataType: "json",
      cache: false,
      success: function(data) {
        this.setState({messages: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("Cannot load data.");
      }.bind(this)
    });
  },
  handleMessageSubmit: function(data) {
    $.ajax({
      url: "/messages",
      dataType: 'json',
      type: 'POST',
      data: {message: data},
      success: function(data) {
        this.setState({messages: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("Cannot load data.");
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {messages: []};
  },
  componentDidMount: function() {
    this.loadMessages();
  },
  render: function() {
    return(
      <div>
        <MessageList messages={this.state.messages}/>
        <MessageForm onMessageSubmit={this.handleMessageSubmit}/>
      </div>
    )
  }
});

