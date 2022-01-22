class Todo < ApplicationRecord
  belongs_to :user
  has_many :taggings, :dependent => :destroy
  has_many :tags, through: :taggings

  def self.tagged_with(name)
    Tag.find_by!(name: name).todos.joins(:tags).select("string_agg(tags.name, ',') as tag_list, todos.*").group("todos.id")
  end

  def self.tag_counts
    Tag.select('tags.*, count(taggings.tag_id) as count').joins(:taggings).group('taggings.tag_id')
  end

  def tag_list
    tags.map(&:name).join(',')
  end

  def tag_list=(names)
    tag_names = names.split(",").collect{|s| s.strip.downcase}.uniq
    new_or_found_tags = tag_names.collect { |name| Tag.find_or_create_by(name: name) }
    self.tags = new_or_found_tags
  end
end
