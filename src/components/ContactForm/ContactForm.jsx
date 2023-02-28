import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// import { ErrorMessage } from '@hookform/error-message';
import { object, string } from 'yup';
import {
  StyledLabel,
  StyledForm,
  StyledInput,
  StyledButton,
} from './ContactForm.styled';

const nameRegex = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;

const numberRegex =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

const schema = object().shape({
  name: string().max(20).required('Name is required').matches(nameRegex, {
    message:
      "Invalid name. Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan.",
  }),
  number: string().required('Number is required').min(5).matches(numberRegex, {
    message:
      'Invalid number. Phone number must be digits and can contain spaces, dashes, parentheses and can start with +.',
  }),
});

function ContactForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    formState,
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {    
    if (formState.isSubmitSuccessful && formState.isValid) {
      reset();
    }
  }, [formState, reset]);

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <StyledLabel>
        Name
        <StyledInput
          type="text"
          placeholder="Enter a contact name"
          {...register('name')}
        />
        {errors.name && <div>{errors.name?.message}</div>}
      </StyledLabel>

      <StyledLabel>
        Number
        <StyledInput
          type="tel"
          placeholder="Enter a contact number"
          {...register('number')}
        />
        {errors.number && <div>{errors.number?.message}</div>}
      </StyledLabel>

      <StyledButton type="submit" />
    </StyledForm>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
