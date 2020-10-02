/* 
* <license header>
*/

// Note from Meryll: the Shipment component implementation was the 4th and last change I did during the demo

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Flex,
  Heading,
  Form,
  Button,
  ProgressCircle,
  Text,
  View, TextField
} from '@adobe/react-spectrum'
import { actionWebInvoke } from '../utils'

const Shipment = (props) => {
  const [state, setState] = useState({
  actionHeaders: null,
  actionParams: null,
  actionResponse: null,
  actionResponseError: null,
  actionError: null,
  actionInvokeInProgress: false
  })

  return (
  <View width="size-6000">
  <Heading level={1}>Get Shipment Information</Heading>
  <Form necessityIndicator="label">
    <TextField label="Reference Id:" isRequired="true"></TextField>
    <Flex>
      <Button
        variant="primary"
        onPress={invokeAction.bind(this)}
        isDisabled={state.actionInvokeInProgress}
      >
        Find It!
      </Button>
      <ProgressCircle
        aria-label="loading"
        isIndeterminate
        isHidden={!state.actionInvokeInProgress}
        marginStart="size-100"
      />
    </Flex>
  </Form>
  {state.actionResponseError && (
    <View backgroundColor={`negative`} padding={`size-100`} marginTop={`size-100`} marginBottom={`size-100`} borderRadius={`small `}>
      <Text>Failure! See the error in your browser console.</Text>
    </View>
  )}
  {!state.actionError && state.actionResponse && (
    <View padding={`size-100`} marginTop={`size-100`} marginBottom={`size-100`} borderRadius={`small `}>
      <Heading level={3}>Reference Id:</Heading>
      <Text><a href={state.actionResponse.currentLocation} target='_blank'>{state.actionResponse.referenceId}</a></Text>
      <Heading level={3}>Label:</Heading>
      <Text><a href={state.actionResponse.shippingAddress} target='_blank'>{state.actionResponse.shippingLabel}</a></Text>
      <Heading level={3}>Type:</Heading> 
      <Text>{state.actionResponse.package.box}</Text>
      <Heading level={3}>Dimensions:</Heading>
      <Text>{state.actionResponse.package.dimensions.height}x{state.actionResponse.package.dimensions.width}x{state.actionResponse.package.dimensions.height}x{state.actionResponse.package.dimensions.length} {state.actionResponse.package.dimensions.unit}</Text>
      <Heading level={3}>Weight:</Heading>
      <Text>{state.actionResponse.package.weight.weight} {state.actionResponse.package.weight.unit}</Text> 
    </View>
  )}
  </View>
  )

  // Methods
  // invokes a the selected backend actions with input headers and params
  async function invokeAction () {
    setState({ actionInvokeInProgress: true })
    const action = 'generic'
    const headers = state.actionHeaders || {}
    const params = state.actionParams || {}
    // all headers to lowercase
    Object.keys(headers).forEach((h) => {
      const lowercase = h.toLowerCase()
      if (lowercase !== h) {
        headers[lowercase] = headers[h]
        headers[h] = undefined
        delete headers[h]
      }
    })
    // set the authorization header and org from the ims props object
    if (props.ims.token && !headers.authorization) {
      headers.authorization = `Bearer ${props.ims.token}`
    }
    if (props.ims.org && !headers['x-gw-ims-org-id']) {
      headers['x-gw-ims-org-id'] = props.ims.org
    }
    try {
      // invoke backend action
      const actionResponse = await actionWebInvoke(action, headers, params)
      // store the response
      setState({
        actionResponse,
        actionResponseError: null,
        actionInvokeInProgress: false
      })
      console.log(`Response from ${action}:`, actionResponse)
    } catch (e) {
      // log and store any error message
      console.error(e)
      setState({
        actionResponse: null,
        actionResponseError: e.message,
        actionInvokeInProgress: false
      })
    }
  }
}

Shipment.propTypes = {
  runtime: PropTypes.any,
  ims: PropTypes.any
}

export default Shipment
