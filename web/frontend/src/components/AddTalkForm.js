import React from 'react';
import axios from 'axios';

export default class AddTalkForm extends React.Component {
    constructor(props) {
      super(props);
      const { setOpen } = props;

      this.state = {title: '',
                    orator: '',
                    date: '',
                    start: '',
                    end: '',
                    room: ''};
  
      this.handleTitle = this.handleTitle.bind(this);
      this.handleOrator = this.handleOrator.bind(this);
      this.handleDate = this.handleDate.bind(this);
      this.handleStart = this.handleStart.bind(this);
      this.handleEnd = this.handleEnd.bind(this);
      this.handleRoom = this.handleRoom.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

      this.handleClose = () => {
        setOpen(false);
      };
    }
  
    handleTitle(event) {
      this.setState({title: event.target.value});
    }
    handleOrator(event) {
      this.setState({orator: event.target.value});
    }
    handleDate(event) {
      let date_s = new Date(event.target.value).getTime();
      this.setState({date: date_s});
    }
    handleStart(event) {
      let start_time = event.target.value;
      let aux = start_time.split(':');
      start_time = aux[0] * 3600 + aux[1] * 60 + this.state.date;
      this.setState({start: start_time});
    }
    handleEnd(event) {
      let end_time = event.target.value;
      let aux = end_time.split(':');
      end_time = aux[0] * 3600 + aux[1] * 60 + this.state.date;
      this.setState({end: end_time});
    }
    handleRoom(event) {
      this.setState({room: event.target.value});
    }

    addTalkToDataBase(){
      let params = {
        title: this.state.title,
        orator: this.state.orator,
        room: this.state.room,
        start: this.state.start,
        end: this.state.end
      }
    
      axios.post('http://127.0.0.1:6200/api/talk/create', params)
      .then((response) => {
        console.log(response);
      })
      .catch(error => {
      console.log(error.message);
      });
    }
  
    handleSubmit(event) {
      alert('Added talk: ' + this.state.title + 
            ' by ' + this.state.orator +
            ' in ' + this.state.date +
            ' starting at ' + this.state.start + 
            ' and finishing at ' + this.state.end +
            ' in ' + this.state.room);
      event.preventDefault();
      this.addTalkToDataBase();
      this.handleClose();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Add a talk</legend>
            <label>
              Title:
              <input type="text" title={this.state.title} onChange={this.handleTitle}/>
            </label>
            <label>
              Orator:
              <input type="text" orator={this.state.orator} onChange={this.handleOrator}/>
            </label>
            <label>
              Date:
              <input type="date" date={this.state.date} onChange={this.handleDate}/>
            </label>
            <label>
              Start:
              <input type="time" start={this.state.start} onChange={this.handleStart}/>
            </label>
            <label>
              End:
              <input type="time" end={this.state.end} onChange={this.handleEnd}/>
            </label>
            <label>
              Room:
              <input type="text" room={this.state.room} onChange={this.handleRoom}/>
            </label>
            <input type="submit" value="Submit" />
          </fieldset>
        </form>
      );
    }
}