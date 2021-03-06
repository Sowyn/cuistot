import React from 'react';
import { gql, graphql } from 'react-apollo';
import { Form } from 'formsy-react';

import Input from './textarea';
import Select from './select';
import Submit from './submitStyled';
import Container from './container';

class AddComment extends React.Component {
  constructor(props) {
    super(props);

    this.post = this.post.bind(this);
  }

  post(values) {
    this.props
      .mutate({
        variables: {
          rating: values.rating,
          commentary: values.comment,
          cook_id: this.props.id
        },
        refetchQueries: [
          {
            query: gql`
              query commentary($id: ID!) {
                commentary(cook_id: $id) {
                  comment_id
                  rating
                  commentary
                  cook_id
                  workshop_id
                }
              }
            `,
            variables: { id: this.props.id }
          }
        ]
      })
      .then(({ data }) => {
        console.log('got data', data);
      })
      .catch(error => {
        console.log('there was an error sending the query', error);
      });
  }

  render() {
    return (
      <Form onSubmit={this.post} style={{ width: '80%' }}>
        <Container>
          <Input value="" name="comment" title="Commentary" required />
          <Select
            name="rating"
            title="Rating"
            options={[
              { value: 5, title: '5' },
              { value: 4.5, title: '4.5' },
              { value: 4, title: '4' },
              { value: 3.5, title: '3.5' },
              { value: 3, title: '3' },
              { value: 2.5, title: '2.5' },
              { value: 2, title: '2' },
              { value: 1.5, title: '1.5' },
              { value: 1, title: '1' },
              { value: 0.5, title: '0.5' },
              { value: 0, title: '0' }
            ]}
            required
          />
          <Submit type="submit">Submit</Submit>
        </Container>
      </Form>
    );
  }
}

const addCommentMutation = gql`
  mutation submitCommentary(
    $rating: Float!
    $commentary: String!
    $cook_id: ID!
  ) {
    addCommentary(rating: $rating, commentary: $commentary, cook_id: $cook_id) {
      comment_id
      rating
      commentary
      cook_id
      workshop_id
    }
  }
`;

const addCommentWithMutation = graphql(addCommentMutation)(AddComment);

export default addCommentWithMutation;
