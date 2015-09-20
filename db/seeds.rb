['Feature', 'Chore', 'Bug'].each do |name|
  Category.create({name: name})
end

['Unestarted', 'Started', 'Finished',
 'Delivered', 'Rejected', 'Accepted'].each do |state|
  StoryState.create({name: state})
end
