import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

export default class Footer extends Component {

  static propTypes = {
    onRemoveCompleted: PropTypes.func,
  }

  render() {
    const {onRemoveCompleted} = this.props

    return (
      <TouchableOpacity 
        onPress={onRemoveCompleted}
        style={styles.footer}
      >
        <Text style={styles.remove}>Removed completed items</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  remove: {
    color: '#CD5C5C',
  },
})