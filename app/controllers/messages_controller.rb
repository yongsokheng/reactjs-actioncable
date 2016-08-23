class MessagesController < ApplicationController
  before_action :load_messages, only: [:new, :create]

  def index
    @messages = Message.all
    render json: @messages
  end

  def new
    @message = Message.new
  end

  def create
    @message = Message.new message_attributes
    @message.save
    @messages = Message.all
    render json: @messages
  end

  private
  def message_attributes
    params.require(:message).permit :content
  end

  def load_messages
    @messages = Message.all
  end
end
