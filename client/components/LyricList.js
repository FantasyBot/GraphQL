import React, { component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class LyricList extends React.Component {
  onLike(id, likes) {
    this.props.mutate({
      variables: { id },
      // to update likes faster(Update UI as in apollo store, guessing the result)
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id: id,
          likes: likes + 1,
          __typename: 'LyricType',
        },
      },
    });
  }

  renderLyrics() {
    return this.props.lyrics.map(({ id, content, likes }) => {
      return (
        <li className="collection-item" key={id}>
          {content}
          <div className="vote-box">
            <i
              className="material-icons"
              onClick={() => this.onLike(id, likes)}
            >
              thumb_up
            </i>
            {likes}
          </div>
        </li>
      );
    });
  }
  render() {
    return <ul className="collection">{this.renderLyrics()}</ul>;
  }
}

const mutation = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

export default graphql(mutation)(LyricList);
