import React, { Component } from 'react'
import AudioReactRecorder, { RecordState } from 'audio-react-recorder'

class ReactRecorder extends Component {
  constructor(props) {
    super(props)

    this.state = {
      recordState: null
    }
  }

  start = () => {
    this.setState({
      recordState: RecordState.START
    })
  }

  stop = () => {
    this.setState({
      recordState: RecordState.STOP
    })
  }

  onStop = (audioData) => {
    console.log('audioData', audioData)
  }

  render() {
    const { recordState } = this.state

    return (
      <div>
        <AudioReactRecorder state={recordState} onStop={this.onStop} />
        <button onClick={this.start}>Start</button>
        <button onClick={this.stop}>Stop</button>
      </div>
    )
  }
}
export default ReactRecorder;
