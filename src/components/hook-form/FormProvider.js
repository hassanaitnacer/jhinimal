import PropTypes from 'prop-types';
// form
import { FormProvider as Form } from 'react-hook-form';

// ----------------------------------------------------------------------

const FormProvider = ({ children, onSubmit, methods }) => (
  <Form {...methods}>
    <form onSubmit={onSubmit}>{children}</form>
  </Form>
);

FormProvider.propTypes = {
  children: PropTypes.node.isRequired,
  methods: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
};

export default FormProvider;
