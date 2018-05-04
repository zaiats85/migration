require 'jekyll_asset_pipeline'

module JekyllAssetPipeline
  class SassConverter < JekyllAssetPipeline::Converter
    require 'sass'

    def self.filetype
      '.scss'
    end

    def convert
      return Sass::Engine.new(@content, syntax: :scss, load_paths: ['_assets/stylesheets']).render
    end
  end


  class CssCompressor < JekyllAssetPipeline::Compressor
    require 'yui/compressor'

    def self.filetype
      '.css'
    end

    def compress
      return YUI::CssCompressor.new.compress(@content)
    end
  end


  class JavaScriptCompressor < JekyllAssetPipeline::Compressor
    require 'yui/compressor'

    def self.filetype
      '.js'
    end

    def compress
      return YUI::JavaScriptCompressor.new(munge: true).compress(@content)
    end
  end
end

module JekyllAssetPipeline
  class CssTagTemplate < JekyllAssetPipeline::Template

    def self.filetype
      '.css'
    end

    def html
      "<link href='/#{@path}/#{@filename}' rel='stylesheet' type='text/css' />\n"
    end
  end
end

module JekyllAssetPipeline
  class JavaScriptTagTemplate < JekyllAssetPipeline::Template

    def self.filetype
      '.js'
    end

    def html
      "/#{@path}/#{@filename}"
    end
  end
end