class Message < ApplicationRecord
  after_commit :broadcast

  private
  def broadcast
    MessageJob.perform_later self
  end
end
