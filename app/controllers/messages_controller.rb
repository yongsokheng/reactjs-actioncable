class MessagesController < ApplicationController
  def index
    load_messages
  end

  def new
  end

  def create
    @message = Message.new message_attributes
    @message.save
    load_messages
  end

  private
  def message_attributes
    params.require(:message).permit :content
  end

  def load_messages
    @messages = Message.all
    render json: @messages
  end
end
