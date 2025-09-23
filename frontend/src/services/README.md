# EmailJS Integration

This directory contains the EmailJS service configuration for sending emails from the contact form.

## Files

- `emailService.js` - Main EmailJS service configuration and functions

## Configuration

The EmailJS service is configured with:
- **Service ID**: `service_xxbj3sv`
- **Template ID**: `template_sk6yw4m`
- **Public Key**: `61WpC-MTI2cvq-BE_`

## Usage

The contact form automatically sends emails using this service when users submit the form. The service handles:

1. Form validation
2. Email sending via EmailJS
3. Success/error handling
4. User feedback

## Template Parameters

The following parameters are sent to the EmailJS template:
- `from_name` - User's name
- `from_email` - User's email
- `phone` - User's phone number
- `message` - User's message
- `to_name` - Recipient name (Shyara Team)
- `reply_to` - User's email for reply

## Error Handling

The service includes comprehensive error handling for:
- EmailJS not loaded
- Authentication failures
- Service unavailability
- Invalid configurations
- Network errors
