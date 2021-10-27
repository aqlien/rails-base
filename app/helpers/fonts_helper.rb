module FontsHelper

  def fa_icon(names, style = 'fa', text = nil, html_options = {})
    text, html_options = nil, text if text.is_a?(Hash)

    names = names.split(' ').collect{|n| "fa-#{n}"}.join(' ')

    intepreted_styles = {'brand' => 'fab', 'regular' => 'far', 'solid' => 'fas'}
    style = intepreted_styles[style] || style

    content_class = "#{style} #{names}"
    content_class << " #{html_options[:class]}" if html_options.key?(:class)
    html_options[:class] = content_class

    html = content_tag(:i, nil, html_options)
    html << ' ' << text.to_s unless text.blank?
    html
  end

end
