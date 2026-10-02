export const environment = {
  production: true,
  // En producción (cPanel): usa el PHP proxy — el email real NUNCA se expone al cliente
  contactEndpoint: '/send-contact.php',
};
