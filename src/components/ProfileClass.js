import React from "react";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
     
    };
    console.log("COnstructor")
  }

  componentDidMount(){
    console.log("Component Did Mount")

  }

  render() {
    console.log("Render");
    return (
      <div>
        <h1>Profile Class Component</h1>
        <h2>name: {this.props.name}</h2>
        <button
          onClick={() => {
            this.setState({ count: 1 });
          }}
        >
          Setcount: {this.state.count}
        </button>
      </div>
    );
  }
}

export default Profile;
