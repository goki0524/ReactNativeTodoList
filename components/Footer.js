import React, { Component, PropTypes } from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

export default class Footer extends Component {

  static propTypes = {
    onRemovedCompleted: PropTypes.func,
  }

  render() {
    const {onRemovedCompleted} = this.props

    return (
      <TouchableOpacity 
        onPress={onRemovedCompleted}
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