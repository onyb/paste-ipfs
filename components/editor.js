import React from 'react'
import PropTypes from 'prop-types'

if (typeof window !== 'undefined') {
  const ace = require('brace')
}

class AceEditor extends React.Component {
  initialize () {
    if (typeof window !== 'undefined') {
      const { onChange, setReadOnly, setValue, theme, mode } = this.props

      require(`brace/mode/${mode}`)
      require(`brace/theme/${theme}`)

      const editor = ace.edit('ace-editor')
      this.editor = editor
      editor.getSession().setMode(`ace/mode/${mode}`)
      editor.setTheme(`ace/theme/${theme}`)
      editor.on('change', e => onChange(editor.getValue(), e))
      editor.setReadOnly(setReadOnly)
      editor.setValue(setValue)
    }
  }

  componentDidMount () {
    this.initialize()
  }
  componentDidUpdate (prevProps, prevState, snapshot) {
    this.initialize()
  }

  render () {
    const { style, editorId } = this.props
    return <div id={editorId} style={style}></div>
  }
}

AceEditor.propTypes = {
  editorId: PropTypes.string,
  onChange: PropTypes.func,
  setReadOnly: PropTypes.bool,
  setValue: PropTypes.string,
  theme: PropTypes.string,
  mode: PropTypes.string,
  style: PropTypes.object
}

AceEditor.defaultProps = {
  editorId: 'ace-editor',
  onChange: () => {},
  setValue: '',
  setReadOnly: false,
  theme: 'eclipse',
  mode: 'javascript',
  style: { height: '300px', width: '400px' }
}

module.exports = AceEditor
