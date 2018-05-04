require 'json'

module CreateJson
  @result_array = []
  def self.parse
    file_name_array = []

    Dir.glob("#{Dir.pwd}/docs/**/*.md") do |file_path|
      file = File.read(file_path)

      permalink_value = file.match(/\bpermalink:\s([^\n]*)/)
      priority_value = file.match(/\bpriority:\s([^\n]*)/)
      title_value = file.match(/\btitle:\s([^\n]*)/)
      description_value = file.match(/\bdescription:\s([^\n]*)/)

      unless permalink_value.nil? || priority_value.nil? || title_value.nil? || description_value.nil?

        h2_array = file.scan(/^##\s([^\n]*)/)
        h2_value = []
        h3_array = file.scan(/^###\s([^\n]*)/)
        h3_value = []

        unless h2_array.empty?
          h2_array.each do |text|
            h2_value << text[0]
          end
        end

        unless h3_array.empty?
          h3_array.each do |text|
            h3_value << text[0]
          end
        end

        temp_hash = { permalink: permalink_value[1], priority: priority_value[1].to_f, title: title_value[1], description: description_value[1], h2: h2_value, h3: h3_value }

        @result_array << temp_hash
      else
        next
      end
    end
  end

  def self.write_to_json_file
    result_file_path = Dir.pwd + '/data-search.json'
    @result_array.sort_by! {|e| e[:priority]}.reverse!

    File.open(result_file_path, 'w') do |f|
      f.write(@result_array.to_json)
    end
  end
end
CreateJson.parse
CreateJson.write_to_json_file