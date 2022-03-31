import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchSong from '../queries/fetchSong';
import LyricCreate from '../components/LyricCreate';
import LyricList from '../components/LyricList';

class SongDetail extends React.Component {
  render() {
    const { song } = this.props.data;
    if (!song) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <Link to="/">Back</Link>
        <h2>{song.title}</h2>
        <LyricList lyrics={song.lyrics} />
        <LyricCreate songId={this.props.params.id} />
      </div>
    );
  }
}

export default graphql(fetchSong, {
  options: (props) => {
    return { variables: { id: props.params.id } };
  },
})(SongDetail);
