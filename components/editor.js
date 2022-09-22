import React from 'react'
import PropTypes from 'prop-types'

if (typeof window !== 'undefined') {
  const ace = require('brace')
}

class AceEditor extends React.Component {
  initialize (props) {
    if (typeof window !== 'undefined') {
      const { onChange, setReadOnly, setValue, theme, mode, persist } = props

      require(`brace/mode/${mode}`)
      require(`brace/theme/${theme}`)

      const editor = ace.edit('ace-editor')
      this.editor = editor

      editor.getSession().setMode(`ace/mode/${mode}`)
      editor.setTheme(`ace/theme/${theme}`)
      editor.setValue(persist ? editor.getValue() : setValue)
      editor.on('change', e => onChange(editor.getValue(), e))
      editor.setReadOnly(setReadOnly)
    }
  }

  componentDidMount () {
    this.initialize(this.props)
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    this.initialize(
      this.props.mode !== prevProps.mode ? { ...this.props, persist: true } : this.props
    )
  }

  // We will lose all state if component is
  shouldComponentUpdate (nextProps, nextState, nextContext) {
    return this.props.mode !== nextProps.mode
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
