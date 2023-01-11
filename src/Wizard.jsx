import React, { useState } from 'react'
import { Form } from 'react-final-form'
import useUnload from './hooks/useUnload'

const Wizard = (props) => {
  const [state, setState] = useState({
    page: 0,
    values: props.initialValues || {}
  })

  // we call this if user wants to leave page without submitting the form 
  // console.log(formSubmitted)
  // window.onbeforeunload = function(e){
  //   var message = "Submit form before leaving the page";
  //   return message; // doesn't work in Chrome
  // }
  
  // onbeforeunload version using hook
  // useUnload(e => {
  //   e.preventDefault();
  //   e.returnValue = '';
  // });


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
    form.reset();
    const { children, onSubmit } = props
    const { page } = state
    const isLastPage = page === React.Children.count(children) - 1
    if (isLastPage) {
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
          <div className="buttons">
            {page > 0 && (
              <button type="button" onClick={previous}>
                « Previous
              </button>
            )}
            {!isLastPage && <button type="submit">Next »</button>}
            {isLastPage && (
              <button type="submit" disabled={submitting}>
                Submit
              </button>
            )}
          </div>

          <pre>{JSON.stringify(values, 0, 2)}</pre>
        </form>
      )}>
    </Form>
  )
}

export default Wizard;
