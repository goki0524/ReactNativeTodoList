import React, { Component, PropTypes } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import CheckBox from './CheckBox'

export default class List extends Comment {

  static propTypes = {
    items: PropTypes.array.isRequired,
    onRemoveItem: PropTypes.func.isRequired,
    onToggleItemCompleted: PropTypes.func.isRequired
  }

  renderItem (item, i) {
    const {onRemoveItem, onToggleItemCompleted} = this.props
    const itemStyle = item.completed ? [styles.item, styles.completed] : styles.item

    return (
      <View key={i} style={itemStyle}>
        <Text>{item.label}</Text>
        <View style={styles.rightSection}>
          <CheckBox
            isChecked={item.completed}
            onToggle={() => onToggleItemCompleted(i)}
          />
          <TouchableOpacity onPress={() => onRemoveItem(i)}>
            <Text style={styles.remove}> &times; </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render () {
    const {items} = this.props

    return (
      <ScrollView style={styles.container}>
        {items.map(this.renderItem)}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'whitesmoke',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  remove: {
    marginLeft: 10,
    marginBottom: 2,
    color: '#CD5C5C',
    fontSize: 26,
  },
  completed: {
    backgroundColor: 'whitesmoke',
  },
})