['Feature', 'Chore', 'Bug'].each do |name|
  Category.create({name: name})
end

['Unstarted', 'Started', 'Finished',
 'Delivered', 'Rejected', 'Accepted'].each do |state|
  StoryState.create({name: state})
end
