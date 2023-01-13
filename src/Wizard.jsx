import React, { useState } from 'react'
import { Form } from 'react-final-form'
import useUnload from './hooks/useUnload';
import Button from '@mui/material/Button';

const Wizard = (props) => {
  const [state, setState] = useState({
    page: 0,
    values: props.initialValues || {}
  })

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);



  const next = values => setState(state => ({
      // page: Math.min(state.page + 1, props.children.length - 1),
      page: state.page + 1, 
      values
    }))

  const previous = () => setState(state => ({
      // page: Math.max(state.page - 1, 0)
      page: state.page - 1, 
      values
    }))

  const validate = values => {
    const activePage = React.Children.toArray(props.children)[state.page]
    return activePage.props.validate ? activePage.props.validate(values) : {}
  }

  const handleSubmit = (values, form) => {    
    const { children, onSubmit } = props
    const { page } = state
    const isLastPage = page === React.Children.count(children) - 1
    if (isLastPage) {
      // as far as we cannot reset all form (we render a bunch of fields, not all in one form, so reset last ones), 
      // we remove "previous button" and add link to start
      form.reset();
      setIsFormSubmitted(true);
      return onSubmit(values);
    } else {
      next(values)
    }
  }
  
  const { children } = props
  const { page, values } = state
  const activePage = React.Children.toArray(children)[page]
  const isLastPage = page === React.Children.count(children) - 1
  return (
    <Form
      initialValues={values}
      validate={validate}
      onSubmit={handleSubmit}
      render={({ handleSubmit, form, submitting, values }) => (
        <form onSubmit={handleSubmit}>
          {activePage}
          <br />
          <div className="buttons">
            {page > 0 && !isFormSubmitted && (
              <Button variant="contained" onClick={previous}>Previous</Button>
            )}
            {!isLastPage && 
              <Button variant="contained" type="submit">Next</Button>
            }
            {isLastPage && (
              <Button variant="contained" type="submit" disabled={submitting }>Submit</Button> // || isFormSubmitted
            )}
            {isFormSubmitted &&
              <a href='#'><br/>Go to start</a>
            }
          </div>

          <pre>{JSON.stringify(values, 0, 2)}</pre>
        </form>
      )}>
    </Form>
  )
}

export default Wizard;
