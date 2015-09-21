class MarkStory
  def self.as(story, state, user)
    story.owner = user if state.name == "Started"
    story.owner = nil if state.name == "Unstarted"

    story.state = state
    story.save
  end
end
